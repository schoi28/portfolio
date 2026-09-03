---
title: 웹훅
sidebar_label: 8. 웹훅
---

# 웹훅

명령 실행 결과나 배포 상태 변화를 폴링하지 않고 받으려면 웹훅을 사용합니다. `manage:webhooks` 스코프가 필요합니다.

## 웹훅 등록하기

```bash
curl -X POST https://api.vela.example.com/v1/webhooks \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-service.example.com/vela-events",
    "events": ["command.completed", "campaign.stage_changed"]
  }'
```

```json
{
  "webhook_id": "whk_5d8e1f",
  "url": "https://your-service.example.com/vela-events",
  "events": ["command.completed", "campaign.stage_changed"],
  "signing_secret": "whsec_3f8a...",
  "status": "active"
}
```

`signing_secret`은 이 응답에서 한 번만 표시됩니다. 서명 검증에 사용하므로 안전하게 보관하십시오.

## 이벤트 목록

| 이벤트 | 발생 시점 | 관련 장 |
| --- | --- | --- |
| `command.completed` | 원격 명령이 `succeeded`, `failed`, `timed_out` 중 하나로 종료됨 | [원격 명령](./remote-commands.md) |
| `vehicle.connectivity_changed` | 차량의 통신 상태가 바뀜 (연결됨 ↔ 끊김) | [차량 데이터](./vehicle-data.md) |
| `sensor.status_changed` | 센서 상태가 `ok`에서 `degraded`·`fault`로, 또는 그 반대로 바뀜 | [센서](./sensors.md) |
| `sensor.calibration_state_changed` | 캘리브레이션 상태가 바뀜 (`valid` → `stale` 등) | [센서](./sensors.md) |
| `campaign.stage_changed` | 캠페인이 다음 롤아웃 단계로 진행하거나 게이트에 의해 일시 중지됨 | [OTA](./ota.md) |
| `campaign.vehicle_failed` | 특정 차량에서 설치가 실패함 | [OTA](./ota.md) |

## 페이로드 예시

```json
{
  "event": "command.completed",
  "webhook_id": "whk_5d8e1f",
  "timestamp": "2026-09-03T02:20:05Z",
  "data": {
    "command_id": "cmd_7f3a2b",
    "vehicle_id": "veh_4471",
    "command": "set_climate",
    "status": "succeeded"
  }
}
```

## 서명 검증

요청이 실제로 VELA Cloud에서 왔는지 확인하려면 `X-Vela-Signature` 헤더를 검증해야 합니다. 검증 없이 페이로드를 신뢰하지 마십시오.

```python
import hmac
import hashlib

def verify_signature(payload_body: bytes, signature_header: str, signing_secret: str) -> bool:
    expected = hmac.new(
        signing_secret.encode(),
        payload_body,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature_header)
```

서명은 요청 본문 원문(파싱 전 바이트)을 기준으로 계산됩니다. JSON을 파싱한 뒤 다시 직렬화한 값으로 검증하면 공백 차이로 실패할 수 있습니다.

## 재전송 정책

- 수신 서버가 `2xx` 이외의 응답을 반환하면 실패로 간주하고 재전송합니다.
- 재전송 간격은 1분, 5분, 30분, 2시간, 12시간으로 늘어나며, 최대 5회 시도합니다.
- 5회 모두 실패하면 이벤트는 폐기됩니다. 웹훅으로만 상태를 추적하지 말고, 중요한 판단에는 [상태 조회 API](./remote-commands.md#방법-1-폴링)로 한 번 더 확인하는 것을 권장합니다.
- 수신 서버는 10초 안에 응답해야 합니다. 처리가 오래 걸리는 작업은 응답 후 비동기로 수행하십시오.

:::caution
같은 이벤트가 두 번 이상 전송될 수 있습니다. 페이로드의 `command_id` 또는 그에 준하는 식별자로 중복 처리를 방지하십시오.
:::

## 다음 단계

- 에러 코드와 요청 제한의 전체 목록은 [레퍼런스](./reference.md)를 참고하십시오.
