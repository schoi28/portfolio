---
title: Send remote commands
doc_type: 개념 + 절차
sidebar_label: 5. Send remote commands
---

# Send remote commands

The API for instructing a vehicle. It needs the `write:commands` scope. The remote control features in VELA Drive use this API internally.

## Send a command

```bash
curl -X POST https://api.vela.example.com/v1/vehicles/{vehicle_id}/commands \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "command": "set_climate",
    "parameters": { "target_temp": 22 }
  }'
```

The response means the command was received. It does not mean the command has run.

```json
{
  "command_id": "cmd_7f3a2b",
  "status": "pending",
  "created_at": "2026-09-03T02:20:00Z"
}
```

## List of commands

| Command | Parameters | Target zone | Description |
| --- | --- | --- | --- |
| `lock_doors` | None | front, rear, left, right | Lock all doors |
| `unlock_doors` | None | front, rear, left, right | Unlock all doors (relocks automatically after 30 seconds) |
| `set_climate` | `target_temp` (17 to 28) | front | Start climate control |
| `stop_climate` | None | front | Stop climate control |
| `schedule_climate` | `departure_time`, `target_temp`, `repeat_days` | front | Schedule climate control |
| `start_charging` | None | rear | Start charging |
| `stop_charging` | None | rear | Stop charging |
| `schedule_charging` | `start_time`, `target_soc` | rear | Schedule charging |
| `locate` | `alert` (boolean) | front, rear | Find the vehicle. With `alert: true` the horn and hazard lights activate |
| `share_key` | `recipient_email`, `permissions` | Not applicable (handled by VELA Cloud) | Share a digital key |
| `revoke_key` | `key_id` | Not applicable (handled by VELA Cloud) | Revoke a digital key |

`Target zone` shows how far into the vehicle a command travels, meaning which zonal ECU receives it. Commands marked `Not applicable (handled by VELA Cloud)` are handled by the account system in VELA Cloud rather than by the vehicle.

## Preconditions by command

A command fails depending on the state of the vehicle. Checking the related signal before you send the request reduces needless failures.

| Command | Precondition | Signal to check |
| --- | --- | --- |
| All commands | The vehicle can communicate | `stale` on the latest `vehicle.location` |
| All commands | 12V auxiliary battery at 20% or above | `powertrain.aux_battery_soc` |
| `unlock_doors`, `lock_doors` | None | None |
| `set_climate` | Ignition off, or the vehicle is parked | `vehicle.parked` |
| `start_charging` | A charging cable is connected | `battery.charging_state`. Anything other than `idle` means a cable is connected |
| `share_key` | The requester is the vehicle owner or an administrator | Not applicable. Decided by account permissions |

Sending a command without meeting its precondition returns `422 precondition_failed` immediately. The command never reaches the vehicle, so resolve the cause before retrying.

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

## Handle asynchronous results

Once a command is received, there are three ways to find out what actually happened.

### Option 1: polling

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

| `status` value | Meaning |
| --- | --- |
| `pending` | On its way to the vehicle |
| `executing` | The vehicle is carrying it out. The VELA OS service framework has passed it to a zonal ECU |
| `succeeded` | Finished |
| `failed` | Execution failed. The cause is in the `error` field |
| `timed_out` | The vehicle did not respond within 30 seconds |

Frequent polling counts against the [rate limit](./reference.md#rate-limits). If you handle many commands, we recommend webhooks.

### Option 2: webhooks

Subscribe to the `command.completed` event and VELA Cloud notifies a URL you nominate whenever the status changes. For how to set this up, see [Receive events through webhooks](./webhooks.md).

### Option 3: `wait()` in the SDK

The Python SDK introduced in the [quickstart](./quickstart.md#call-the-api-with-the-python-sdk) provides `wait()`, which wraps polling. It suits scripts that handle a small number of commands.

## Timeout and retry policy

- A vehicle must respond within **30 seconds** of a command being received. With no response, the command becomes `timed_out`.
- `timed_out` and communication failures (`vehicle_unreachable`) are safe to retry. A precondition failure (`precondition_failed`) returns the same result until the cause is resolved.
- If a command is already in progress for the same vehicle, a new one is rejected with `409 command_in_progress`. Send commands one at a time.
- If you implement automatic retries, we recommend exponential backoff. The VELA SDK does this by default.

## Next

- For how a command travels through the real vehicle, see [Where this API sits in the system](./overview.md#where-this-api-sits-in-the-system).
- To update the software itself remotely, see [Control OTA deployment](./ota.md).
