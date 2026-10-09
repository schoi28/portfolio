---
title: 원격 명령 보내기
doc_type: 개념 + 절차
sidebar_label: 6. 원격 명령 보내기
---

# 원격 명령 보내기

차량에 지시를 내리는 API입니다. `write:commands` 스코프가 필요합니다. VELA Drive의 원격 제어 기능도 내부적으로 이 API를 사용합니다.

## 명령 보내기

```bash
curl -X POST https://api.vela.example.com/v1/vehicles/{vehicle_id}/commands \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "set_climate",
    "parameters": { "target_temp": 22 }
  }'
```

응답은 명령이 접수되었다는 뜻이며, 실행 완료를 의미하지 않습니다.

```json
{
  "command_id": "cmd_7f3a2b",
  "status": "pending",
  "created_at": "2026-09-03T02:20:00Z"
}
```

## 명령 목록

| 명령 | 파라미터 | 대상 존 | 설명 |
| --- | --- | --- | --- |
| `lock_doors` | 없음 | front, rear, left, right | 전체 도어 잠금 |
| `unlock_doors` | 없음 | front, rear, left, right | 전체 도어 잠금 해제 (30초 후 자동 재잠금) |
| `set_climate` | `target_temp` (17~28) | front | 공조 시작 |
| `stop_climate` | 없음 | front | 공조 중지 |
| `schedule_climate` | `departure_time`, `target_temp`, `repeat_days` | front | 예약 공조 설정 |
| `start_charging` | 없음 | rear | 충전 시작 |
| `stop_charging` | 없음 | rear | 충전 중지 |
| `schedule_charging` | `start_time`, `target_soc` | rear | 예약 충전 설정 |
| `locate` | `alert` (boolean) | front, rear | 위치 조회. `alert: true`면 경적·비상등 |
| `share_key` | `recipient_email`, `permissions` | 해당 없음 (VELA Cloud 처리) | 디지털 키 공유 |
| `revoke_key` | `key_id` | 해당 없음 (VELA Cloud 처리) | 디지털 키 회수 |

`대상 존`은 명령이 실제로 어느 존 ECU까지 전달되는지를 나타냅니다. `해당 없음 (VELA Cloud 처리)`로 표시된 명령은 차량이 아니라 VELA Cloud의 계정 시스템에서 처리됩니다.

## 명령별 사전 조건

명령은 차량 상태에 따라 실패합니다. 요청을 보내기 전에 관련 시그널을 확인하면 불필요한 실패를 줄일 수 있습니다.

| 명령 | 사전 조건 | 확인할 시그널 |
| --- | --- | --- |
| 모든 명령 공통 | 차량이 통신 가능 상태 | `vehicle.location` 최신값의 `stale` |
| 모든 명령 공통 | 12V 보조 배터리 20% 이상 | `powertrain.aux_battery_soc` |
| `unlock_doors`, `lock_doors` | 없음 | 없음 |
| `set_climate` | 시동 꺼짐 또는 주차 상태 | `vehicle.parked` |
| `start_charging` | 충전 케이블 연결됨 | `battery.charging_state` != `idle`이면 이미 연결됨 |
| `share_key` | 요청자가 차량 소유자 또는 관리자 권한 | 해당 없음 (계정 권한으로 판단) |

사전 조건을 만족하지 않고 명령을 보내면 즉시 `422 precondition_failed`가 반환됩니다. 이 경우 차량에 명령이 전달되지 않으므로 재시도 전에 원인을 해결해야 합니다.

```json
{
  "error": {
    "code": "precondition_failed",
    "message": "Cannot start charging: no cable connected.",
    "signal": "battery.charging_state",
    "current_value": "idle"
  }
}
```

## 비동기 결과 처리하기

명령이 접수된 뒤 실제 실행 결과는 세 가지 방법으로 확인할 수 있습니다.

### 방법 1: 폴링

```bash
curl https://api.vela.example.com/v1/vehicles/{vehicle_id}/commands/{command_id} \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "command_id": "cmd_7f3a2b",
  "command": "set_climate",
  "status": "succeeded",
  "created_at": "2026-09-03T02:20:00Z",
  "completed_at": "2026-09-03T02:20:04Z"
}
```

| `status` 값 | 의미 |
| --- | --- |
| `pending` | 차량에 전달 중 |
| `executing` | 차량이 실행 중 (VELA OS 서비스 프레임워크가 존 ECU에 전달한 상태) |
| `succeeded` | 완료 |
| `failed` | 실행 실패. `error` 필드에 원인 |
| `timed_out` | 30초 안에 차량이 응답하지 않음 |

빈번한 폴링은 [레이트 리밋](./reference.md#레이트-리밋)에 영향을 줍니다. 다수의 명령을 다룬다면 웹훅을 권장합니다.

### 방법 2: 웹훅

`command.completed` 이벤트를 구독하면 상태가 바뀔 때 VELA Cloud가 지정한 URL로 알려줍니다. 설정 방법은 [웹훅으로 이벤트 받기](./webhooks.md)을 참고하십시오.

### 방법 3: SDK의 `wait()`

[SDK로 연동하기](./sdk.md#비동기-결과-기다리기)에서 설명한 Python SDK는 폴링을 감싼 `wait()`를 제공합니다. 소량의 명령을 다루는 스크립트에 적합합니다.

## 타임아웃과 재시도 정책

- 명령은 접수 후 **30초** 안에 차량이 응답해야 합니다. 응답이 없으면 `timed_out`으로 처리됩니다.
- `timed_out`과 통신 계열 실패(`vehicle_unreachable`)는 재시도가 안전합니다. 사전 조건 실패(`precondition_failed`)는 원인이 해결되기 전까지 재시도해도 같은 결과입니다.
- 같은 차량에 대해 처리 중인 명령이 있으면 새 명령은 `409 command_in_progress`로 거부됩니다. 순차적으로 보내십시오.
- 자동 재시도를 구현한다면 지수 백오프를 권장합니다. VELA SDK는 이를 기본 제공합니다.

## 다음 단계

- 명령이 실제 차량에서 어떻게 전달되는지는 [아키텍처 상의 위치](./overview.md#시스템-안에서-맡는-자리)를 참고하십시오.
- 소프트웨어 자체를 원격으로 갱신하려면 [OTA 배포 제어하기](./ota.md)를 참고하십시오.
