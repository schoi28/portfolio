---
title: Check sensor state
doc_type: 절차
sidebar_label: 6. Check sensor state
---

# Check sensor state

The API for reading the state and calibration details of sensors fitted through VELA Sense, meaning LiDAR units and cameras. It needs the `read:sensors` scope.

:::note[Note]
This chapter applies only to development and validation vehicles with VELA Sense fitted. Production vehicles use hardware the OEM selects, and whether that hardware is exposed through the same interface as this API depends on the integration agreement with the OEM.
:::

## List the sensors

```bash
curl https://api.vela.example.com/v1/vehicles/{vehicle_id}/sensors \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "data": [
    { "sensor_id": "lidar_01", "type": "lidar", "zone": "front", "status": "ok" },
    { "sensor_id": "camera_front", "type": "camera", "zone": "front", "status": "ok" },
    { "sensor_id": "camera_rear", "type": "camera", "zone": "rear", "status": "ok" },
    { "sensor_id": "camera_left", "type": "camera", "zone": "left", "status": "degraded" },
    { "sensor_id": "camera_right", "type": "camera", "zone": "right", "status": "ok" }
  ]
}
```

| `status` value | Meaning |
| --- | --- |
| `ok` | Working normally |
| `degraded` | Working, but with reduced performance. A dirty lens or vibration above the threshold, for example |
| `fault` | Not working |

`degraded` connects to the cleaning intervals in [the VELA Sense installation guide](../sensor/intro.md). A dirty camera lens is the most common cause of this state.

## Check one sensor

```bash
curl https://api.vela.example.com/v1/vehicles/{vehicle_id}/sensors/lidar_01 \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "sensor_id": "lidar_01",
  "type": "lidar",
  "zone": "front",
  "status": "ok",
  "point_rate": 1180000,
  "time_sync_offset_us": 3.2,
  "last_updated": "2026-09-03T02:20:00Z"
}
```

`time_sync_offset_us` is the deviation from the PTP (IEEE 802.1AS) reference clock. Above 10 microseconds it can affect the accuracy of sensor fusion.

## Check calibration state

```bash
curl https://api.vela.example.com/v1/vehicles/{vehicle_id}/sensors/calibration \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "state": "valid",
  "last_calibrated_at": "2026-08-20T09:00:00Z",
  "calibration_type": "dynamic",
  "results": {
    "lidar_01": { "passed": true, "deviation_deg": 0.08 },
    "camera_front": { "passed": true, "reprojection_error_px": 0.31 }
  }
}
```

| `state` value | Meaning | What to do |
| --- | --- | --- |
| `valid` | The most recent calibration is valid | Nothing |
| `stale` | 90 days have passed, or 500 km have been driven, since the last calibration | Recalibration recommended |
| `failed` | The last calibration did not meet the pass criteria | Run the [VELA Sense calibration](../sensor/intro.md) procedure again |
| `never_run` | No calibration history | A first calibration is needed |

The calibration procedure itself, meaning placing the target boards and running static and dynamic calibration, cannot be triggered through the API. It involves physical work, so follow the procedure in [the VELA Sense installation guide](../sensor/intro.md) on site. This API reads the result.

## Download a diagnostic snapshot

When you are investigating a problem, you can download the raw sensor data and logs for a point in time as a single bundle.

```bash
curl -X POST https://api.vela.example.com/v1/vehicles/{vehicle_id}/sensors/diagnostic-snapshot \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "snapshot_id": "snap_a1b2c3",
  "status": "generating",
  "estimated_ready_at": "2026-09-03T02:25:00Z"
}
```

Building a snapshot gathers and compresses data inside the vehicle, so it does not finish immediately. Check the status at the endpoint below and collect a download URL once it is ready.

```bash
curl https://api.vela.example.com/v1/vehicles/{vehicle_id}/sensors/diagnostic-snapshot/snap_a1b2c3 \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "snapshot_id": "snap_a1b2c3",
  "status": "ready",
  "download_url": "https://storage.vela.example.com/snapshots/snap_a1b2c3.tar.gz",
  "expires_at": "2026-09-04T02:25:00Z",
  "size_mb": 842
}
```

:::note[Note]
A snapshot contains raw LiDAR and camera data, so it is large: usually between 500 MB and 2 GB. The download URL expires after 24 hours.
:::

## Next

- For the procedure that actually performs the calibration this API reads, see [the VELA Sense installation guide](../sensor/intro.md).
- Sensor firmware is updated alongside other software through [Control OTA deployment](./ota.md).
