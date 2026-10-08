---
title: Receive events through webhooks
doc_type: 개념 + 절차
sidebar_label: 8. Receive events through webhooks
---

# Receive events through webhooks

To receive command results and deployment state changes without polling, use webhooks. This needs the `manage:webhooks` scope.

## Register a webhook

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

The `signing_secret` appears in this response only once. You need it to verify signatures, so store it somewhere safe.

## List of events

| Event | When it fires | Related chapter |
| --- | --- | --- |
| `command.completed` | A remote command ends as `succeeded`, `failed`, or `timed_out` | [Send remote commands](./remote-commands.md) |
| `vehicle.connectivity_changed` | The vehicle's connection state changes, either way | [Read vehicle data](./vehicle-data.md) |
| `sensor.status_changed` | A sensor moves from `ok` to `degraded` or `fault`, or back | [Check sensor state](./sensors.md) |
| `sensor.calibration_state_changed` | Calibration state changes, from `valid` to `stale` for example | [Check sensor state](./sensors.md) |
| `campaign.stage_changed` | A campaign advances to the next rollout stage, or is paused by a gate | [Control OTA deployment](./ota.md) |
| `campaign.vehicle_failed` | An installation fails on a particular vehicle | [Control OTA deployment](./ota.md) |

## Example payload

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

## Verify the signature

To confirm a request really came from VELA Cloud, verify the `X-Vela-Signature` header. Do not trust a payload you have not verified.

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

The signature is calculated over the raw request body, meaning the bytes before parsing. Verifying against JSON you parsed and reserialised can fail on whitespace differences.

## Redelivery policy

- If your receiving server returns anything other than `2xx`, the delivery counts as a failure and is retried.
- The retry interval grows through 1 minute, 5 minutes, 30 minutes, 2 hours, and 12 hours, for up to 5 attempts.
- If all 5 attempts fail, the event is discarded. Do not track state through webhooks alone. For anything important, confirm once more with [the status endpoint](./remote-commands.md#option-1-polling).
- Your receiving server must respond within 10 seconds. Do any slow processing asynchronously, after the response.

:::info[Caution]
The same event can arrive more than once. Use `command_id` in the payload, or the equivalent identifier, to guard against processing it twice.
:::

## Next

- For the full list of error codes and request limits, see [Browse the reference](./reference.md).
