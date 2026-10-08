---
title: Read vehicle data
doc_type: 절차
sidebar_label: 4. Read vehicle data
---

# Read vehicle data

Data reported by a vehicle passes through the sensor abstraction layer in VELA OS and is exposed as standardised **signals**. This chapter covers how to read and subscribe to them.


Signal names, units, and reporting intervals are collected in [the signal catalogue in the reference](./reference.md#signal-catalogue). This chapter covers only **how to fetch** those values.

## Read the latest value

```bash
curl https://api.vela.example.com/v1/vehicles/{vehicle_id}/signals/{signal}/latest \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "signal": "battery.soc",
  "value": 68,
  "unit": "percent",
  "zone": "rear",
  "timestamp": "2026-09-03T02:14:00Z",
  "stale": false
}
```

A `stale` value of `true` means three times the signal's normal reporting interval has passed since the last update. The vehicle is probably out of contact.

## Read a time series

```bash
curl "https://api.vela.example.com/v1/vehicles/{vehicle_id}/signals/battery.soc/history\
?from=2026-09-01T00:00:00Z&to=2026-09-02T00:00:00Z&interval=1h" \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "signal": "battery.soc",
  "interval": "1h",
  "data": [
    { "timestamp": "2026-09-01T00:00:00Z", "value": 72 },
    { "timestamp": "2026-09-01T01:00:00Z", "value": 71 }
  ],
  "next_page": null
}
```

| Parameter | Required | Description |
| --- | --- | --- |
| `from`, `to` | Yes | The range to read. Up to 30 days |
| `interval` | No | Aggregation interval (`raw`, `1m`, `5m`, `1h`, `1d`). Defaults to `raw` |

Reading with `raw` returns every point at the original reporting interval, which can be a large amount of data. See [Pagination](./reference.md#pagination).

## Subscribe to a stream

For signals that change continuously, such as speed while driving, use a WebSocket stream rather than polling. This needs the `stream:signals` scope.

```bash
wscat -c "wss://stream.vela.example.com/v1/vehicles/{vehicle_id}/signals/stream" \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

Once connected, name the signals you want.

```json
{ "action": "subscribe", "signals": ["vehicle.speed", "vehicle.location"] }
```

A message arrives every time one of those values updates.

```json
{ "signal": "vehicle.speed", "value": 62, "unit": "km/h", "timestamp": "2026-09-03T02:14:03Z" }
```

The connection closes after five idle minutes. Send `{ "action": "ping" }` periodically to keep it open.

## Next

- To send an instruction to a vehicle, see [Send remote commands](./remote-commands.md).
- To read the state of a VELA Sense sensor, see [Check sensor state](./sensors.md).
