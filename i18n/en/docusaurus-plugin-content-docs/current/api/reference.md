---
title: Browse the reference
doc_type: 레퍼런스
sidebar_label: 9. Browse the reference
---

# Browse the reference

This chapter collects error codes, request limits, pagination, and the change history. Each section is written to be read on its own, so you can search straight to it.

## Signal catalogue

Signals fall into four groups. The groups follow the classification used by the sensor abstraction layer in VELA OS.

### Vehicle state

| Signal | Description | Unit | Update interval | Reporting zone |
| --- | --- | --- | --- | --- |
| `vehicle.odometer` | Total distance driven | km | On change | Not applicable. Aggregated by the CCU |
| `vehicle.speed` | Current speed | km/h | 100 ms | Not applicable. Aggregated by the CCU |
| `vehicle.gear` | Current gear position | enum: `p`\|`r`\|`n`\|`d` | On change | Not applicable. Aggregated by the CCU |
| `vehicle.ignition_state` | Ignition state | enum: `off`\|`accessory`\|`on` | On change | Not applicable. Aggregated by the CCU |
| `vehicle.parked` | Whether the vehicle is parked, meaning gear P and speed 0 | boolean | On change | Not applicable. Aggregated by the CCU |
| `vehicle.location` | GPS coordinates | `{lat, lon}` | 5 s while driving | front |

### Body

| Signal | Description | Unit | Update interval | Reporting zone |
| --- | --- | --- | --- | --- |
| `body.doors.locked` | Lock state of all doors | boolean | On change | front, rear, left, right |
| `body.door.driver.open` | Whether the driver's door is open | boolean | On change | left |
| `body.windows.position` | Open position of each window | percent (0 to 100) × 4 | On change | left, right |
| `body.climate.cabin_temp` | Cabin temperature | °C | 10 s | front |
| `body.climate.target_temp` | Target temperature set | °C | On change | front |
| `body.tire_pressure` | Pressure in each tyre | kPa × 4 | 60 s | front, rear |
| `body.lights.exterior` | State of the exterior lights | enum: `off`\|`low`\|`high`\|`hazard` | On change | front, rear |

### Powertrain and battery

| Signal | Description | Unit | Update interval | Reporting zone |
| --- | --- | --- | --- | --- |
| `battery.soc` | Battery level | percent | 30 s | rear |
| `battery.range_estimate` | Estimated range | km | 30 s | rear |
| `battery.charging_state` | Charging state | enum: `idle`\|`charging`\|`scheduled`\|`complete` | On change | rear |
| `battery.charge_power` | Instantaneous power while charging | kW | 5 s while charging | rear |
| `battery.health` | Battery health against original capacity | percent | Once a day | rear |
| `powertrain.aux_battery_soc` | 12V auxiliary battery level | percent | 60 s | front |

### Sensors (VELA Sense)

| Signal | Description | Unit | Update interval | Reporting zone |
| --- | --- | --- | --- | --- |
| `sensor.lidar.status` | LiDAR state | enum: `ok`\|`degraded`\|`fault` | On change | front |
| `sensor.lidar.point_rate` | Points per second | points/s | 5 s | front |
| `sensor.camera.status` | State of each camera | enum × 4 | On change | front, rear, left, right |
| `sensor.calibration.state` | State of the most recent calibration | enum: `valid`\|`stale`\|`failed`\|`never_run` | On change | front |
| `sensor.time_sync.offset` | PTP time synchronisation deviation | microseconds | 10 s | front |

There are more than 130 signals in total, and the tables above are an extract of the ones used most often. The full list is in the response from `/v1/signals/catalog` in the OpenAPI spec.

```bash
curl https://api.vela.example.com/v1/signals/catalog \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

:::note[Note]
A signal with several reporting zones, such as `body.tire_pressure`, holds a separate measurement per zone, and the response carries a `zone` field alongside the value. A signal marked `Not applicable. Aggregated by the CCU` is a value the CCU assembles from several zones and does not belong to any one zone.
:::

## Error codes

Every error response follows the same shape.

```json
{
  "error": {
    "code": "precondition_failed",
    "message": "A human readable explanation",
    "...": "Additional fields, which vary by code"
  }
}
```

| HTTP status | `error.code` | Meaning | Related chapter |
| --- | --- | --- | --- |
| 400 | `invalid_request` | The request is malformed, such as a missing required field | Common |
| 401 | `missing_credentials` | No authentication header | [Set up authentication](./authentication.md) |
| 401 | `invalid_client` | The client credentials are wrong | [Set up authentication](./authentication.md) |
| 401 | `token_expired` | The access token has expired | [Set up authentication](./authentication.md) |
| 403 | `insufficient_scope` | The scope is not sufficient | [Set up authentication](./authentication.md) |
| 403 | `client_disabled` | The client has been disabled | [Set up authentication](./authentication.md) |
| 404 | `vehicle_not_found` | No such `vehicle_id` | Common |
| 404 | `signal_not_found` | No such signal name | [Read vehicle data](./vehicle-data.md) |
| 409 | `command_in_progress` | A command is already in progress for the same vehicle | [Send remote commands](./remote-commands.md) |
| 422 | `precondition_failed` | A precondition for the command is unmet | [Send remote commands](./remote-commands.md) |
| 422 | `vehicle_unreachable` | The vehicle cannot be reached | Common |
| 429 | `rate_limited` | The request limit has been exceeded | [Rate limits](#rate-limits) |
| 500 | `internal_error` | An internal VELA Cloud error. Safe to retry | Common |
| 503 | `service_unavailable` | A temporary outage. Check the `Retry-After` header | Common |

## Rate limits

| Item | Limit |
| --- | --- |
| Requests per client | 600 per minute |
| Commands sent to one vehicle | 10 per minute |
| Time series range | Up to 30 days per request |
| Concurrent streaming connections | 50 per client |

Exceeding a limit returns `429 rate_limited` with the headers below.

| Header | Description |
| --- | --- |
| `X-RateLimit-Limit` | The limit currently in force |
| `X-RateLimit-Remaining` | Requests remaining |
| `X-RateLimit-Reset` | The Unix timestamp at which the limit resets |
| `Retry-After` | Seconds to wait before retrying |

For batch work covering many vehicles, we recommend taking aggregated data through the `interval` parameter in [Read a time series](./vehicle-data.md#read-a-time-series) rather than requesting each vehicle separately.

## Pagination

Endpoints that return a list use cursor based pagination.

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

If `next_page` is present, pass it unchanged as the `page` parameter on your next request.

```bash
curl "https://api.vela.example.com/v1/vehicles?limit=50&page=eyJvZmZzZXQiOjUwfQ==" \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

A `next_page` of `null` means the last page. Do not calculate page numbers yourself. Use the cursor as returned, so that the ordering holds even if data is added while you are reading.

| Parameter | Default | Maximum |
| --- | --- | --- |
| `limit` | 20 | 200 |

## Change history

| Date | Change | Backward compatibility |
| --- | --- | --- |
| 2026-08-15 | Added the `sensor.calibration_state_changed` webhook event | Compatible |
| 2026-07-01 | Added `body.lights.exterior` to the signal catalogue | Compatible |
| 2026-05-10 | Made the `target_type` field required when creating a campaign | **Breaking**. Required since the v1 release |
| 2026-03-01 | First release of `v1` | None |

`v1` is currently the only supported version. Any breaking change appears first in this table and in [Versioning policy in chapter 1](./overview.md#versioning-policy).
