---
title: 레퍼런스 찾아보기
doc_type: 레퍼런스
sidebar_label: 9. 레퍼런스 찾아보기
---

# 레퍼런스 찾아보기

에러 코드, 요청 제한, 페이지네이션, 변경 이력을 모아 둔 장입니다. 각 항목은 독립적으로 검색해서 볼 수 있도록 작성했습니다.

## 시그널 카탈로그

시그널은 네 그룹으로 나뉩니다. 그룹은 VELA OS 센서 추상화 계층의 분류를 그대로 따릅니다.

### 차량 상태

| 시그널 | 설명 | 단위 | 갱신 주기 | 보고 존 |
| --- | --- | --- | --- | --- |
| `vehicle.odometer` | 누적 주행 거리 | km | 변경 시 | 해당 없음 (CCU 집계) |
| `vehicle.speed` | 현재 속도 | km/h | 100ms | 해당 없음 (CCU 집계) |
| `vehicle.gear` | 현재 기어 위치 | enum: `p`\|`r`\|`n`\|`d` | 변경 시 | 해당 없음 (CCU 집계) |
| `vehicle.ignition_state` | 시동 상태 | enum: `off`\|`accessory`\|`on` | 변경 시 | 해당 없음 (CCU 집계) |
| `vehicle.parked` | 주차 여부 (기어 P + 속도 0) | boolean | 변경 시 | 해당 없음 (CCU 집계) |
| `vehicle.location` | GPS 좌표 | `{lat, lon}` | 5s (주행 중) | front |

### 바디

| 시그널 | 설명 | 단위 | 갱신 주기 | 보고 존 |
| --- | --- | --- | --- | --- |
| `body.doors.locked` | 전체 도어 잠금 상태 | boolean | 변경 시 | front, rear, left, right |
| `body.door.driver.open` | 운전석 도어 열림 여부 | boolean | 변경 시 | left |
| `body.windows.position` | 창문별 개폐 위치 | percent (0~100) × 4 | 변경 시 | left, right |
| `body.climate.cabin_temp` | 실내 온도 | °C | 10s | front |
| `body.climate.target_temp` | 설정 목표 온도 | °C | 변경 시 | front |
| `body.tire_pressure` | 타이어별 공기압 | kPa × 4 | 60s | front, rear |
| `body.lights.exterior` | 외장 등화 상태 | enum: `off`\|`low`\|`high`\|`hazard` | 변경 시 | front, rear |

### 파워트레인 · 배터리

| 시그널 | 설명 | 단위 | 갱신 주기 | 보고 존 |
| --- | --- | --- | --- | --- |
| `battery.soc` | 배터리 잔량 | percent | 30s | rear |
| `battery.range_estimate` | 추정 주행 가능 거리 | km | 30s | rear |
| `battery.charging_state` | 충전 상태 | enum: `idle`\|`charging`\|`scheduled`\|`complete` | 변경 시 | rear |
| `battery.charge_power` | 충전 중 순간 출력 | kW | 5s (충전 중) | rear |
| `battery.health` | 배터리 건강도 (초기 용량 대비) | percent | 일 1회 | rear |
| `powertrain.aux_battery_soc` | 12V 보조 배터리 잔량 | percent | 60s | front |

### 센서 (VELA Sense)

| 시그널 | 설명 | 단위 | 갱신 주기 | 보고 존 |
| --- | --- | --- | --- | --- |
| `sensor.lidar.status` | 라이다 상태 | enum: `ok`\|`degraded`\|`fault` | 변경 시 | front |
| `sensor.lidar.point_rate` | 초당 포인트 수 | points/s | 5s | front |
| `sensor.camera.status` | 카메라별 상태 | enum × 4 | 변경 시 | front, rear, left, right |
| `sensor.calibration.state` | 최근 캘리브레이션 상태 | enum: `valid`\|`stale`\|`failed`\|`never_run` | 변경 시 | front |
| `sensor.time_sync.offset` | PTP 시간 동기화 오차 | microseconds | 10s | front |

전체 시그널은 130개 이상이며, 위 표는 자주 쓰이는 항목의 발췌입니다. 전체 목록은 OpenAPI 스펙의 `/v1/signals/catalog` 응답에서 확인할 수 있습니다.

```bash
curl https://api.vela.example.com/v1/signals/catalog \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

:::note[참고]
`보고 존`이 여러 개인 시그널(예: `body.tire_pressure`)은 존별로 개별 측정값을 가지며, 응답에 `zone` 필드가 함께 반환됩니다. `해당 없음 (CCU 집계)`로 표시된 시그널은 여러 존의 데이터를 CCU가 종합한 값으로, 특정 존에 속하지 않습니다.
:::

## 에러 코드

모든 에러 응답은 같은 형식을 따릅니다.

```json
{
  "error": {
    "code": "precondition_failed",
    "message": "사람이 읽을 수 있는 설명",
    "...": "코드별 추가 필드"
  }
}
```

| HTTP 상태 | `error.code` | 의미 | 관련 장 |
| --- | --- | --- | --- |
| 400 | `invalid_request` | 요청 형식이 잘못됨 (필수 필드 누락 등) | 공통 |
| 401 | `missing_credentials` | 인증 헤더 없음 | [인증 설정하기](./authentication.md) |
| 401 | `invalid_client` | 클라이언트 자격 증명 오류 | [인증 설정하기](./authentication.md) |
| 401 | `token_expired` | 액세스 토큰 만료 | [인증 설정하기](./authentication.md) |
| 403 | `insufficient_scope` | 스코프 부족 | [인증 설정하기](./authentication.md) |
| 403 | `client_disabled` | 클라이언트 비활성화됨 | [인증 설정하기](./authentication.md) |
| 404 | `vehicle_not_found` | 존재하지 않는 `vehicle_id` | 공통 |
| 404 | `signal_not_found` | 존재하지 않는 시그널 이름 | [차량 데이터 조회하기](./vehicle-data.md) |
| 409 | `command_in_progress` | 같은 차량에 처리 중인 명령이 있음 | [원격 명령 보내기](./remote-commands.md) |
| 422 | `precondition_failed` | 명령 실행 조건 미충족 | [원격 명령 보내기](./remote-commands.md) |
| 422 | `vehicle_unreachable` | 차량이 통신되지 않는 상태 | 공통 |
| 429 | `rate_limited` | 요청 제한 초과 | [레이트 리밋](#레이트-리밋) |
| 500 | `internal_error` | VELA Cloud 내부 오류. 재시도 가능 | 공통 |
| 503 | `service_unavailable` | 일시적 장애. `Retry-After` 헤더 확인 | 공통 |

## 레이트 리밋

| 항목 | 제한 |
| --- | --- |
| 클라이언트당 요청 수 | 분당 600건 |
| 차량 한 대당 명령 전송 | 분당 10건 |
| 시계열 조회 범위 | 요청당 최대 30일 |
| 스트리밍 동시 연결 | 클라이언트당 50개 |

제한을 초과하면 `429 rate_limited`와 함께 아래 헤더가 반환됩니다.

| 헤더 | 설명 |
| --- | --- |
| `X-RateLimit-Limit` | 현재 적용 중인 제한 |
| `X-RateLimit-Remaining` | 남은 요청 수 |
| `X-RateLimit-Reset` | 제한이 초기화되는 Unix 타임스탬프 |
| `Retry-After` | 재시도까지 대기할 초 |

대량의 차량을 다루는 배치 작업에는 개별 요청보다 [시계열 조회](./vehicle-data.md#시계열-조회하기)의 `interval` 파라미터로 집계된 데이터를 받는 것을 권장합니다.

## 페이지네이션

목록을 반환하는 엔드포인트는 커서 기반 페이지네이션을 사용합니다.

```bash
curl "https://api.vela.example.com/v1/vehicles?limit=50" \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "data": [ "..." ],
  "next_page": "eyJvZmZzZXQiOjUwfQ=="
}
```

`next_page`가 있으면 다음 요청의 `page` 파라미터에 그대로 전달합니다.

```bash
curl "https://api.vela.example.com/v1/vehicles?limit=50&page=eyJvZmZzZXQiOjUwfQ==" \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

`next_page`가 `null`이면 마지막 페이지입니다. 페이지 번호를 직접 계산하지 말고 반환된 커서를 그대로 사용하십시오. 그래야 조회 중 데이터가 추가되어도 순서가 어긋나지 않습니다.

| 파라미터 | 기본값 | 최대값 |
| --- | --- | --- |
| `limit` | 20 | 200 |

## 변경 이력

| 날짜 | 변경 | 하위 호환성 |
| --- | --- | --- |
| 2026-08-15 | `sensor.calibration_state_changed` 웹훅 이벤트 추가 | 호환됨 |
| 2026-07-01 | 시그널 카탈로그에 `body.lights.exterior` 추가 | 호환됨 |
| 2026-05-10 | 캠페인 생성 시 `target_type` 필드 필수화 | **호환 깨짐**. v1 릴리스 시점부터 필수 |
| 2026-03-01 | `v1` 최초 릴리스 | 없음 |

`v1`은 현재 유일한 지원 버전입니다. 하위 호환을 깨는 변경이 발생하면 이 표와 [1장 · 버전 정책](./overview.md#버전-정책)에 먼저 반영합니다.
