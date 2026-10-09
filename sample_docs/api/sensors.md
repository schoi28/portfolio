---
title: 센서 상태 조회하기
doc_type: 절차
sidebar_label: 7. 센서 상태 조회하기
---

# 센서 상태 조회하기

VELA Sense로 장착된 센서(라이다, 카메라)의 상태와 캘리브레이션 정보를 조회하는 API입니다. `read:sensors` 스코프가 필요합니다.

:::note[참고]
이 장은 개발·검증 차량에 VELA Sense가 장착된 경우에만 유효합니다. 양산 차량은 OEM이 선정한 별도 하드웨어를 사용하며, 해당 하드웨어가 이 API와 동일한 인터페이스로 노출되는지는 OEM과의 통합 계약에 따라 달라집니다.
:::

## 센서 목록 조회하기

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

| `status` 값 | 의미 |
| --- | --- |
| `ok` | 정상 |
| `degraded` | 동작 중이나 성능 저하 (예: 렌즈 오염, 진동 임계값 초과) |
| `fault` | 동작 불가 |

`degraded`는 [VELA Sense 설치 가이드 · 유지보수](../sensor/intro.md)의 청소 주기와 연결됩니다. 카메라 렌즈 오염이 이 상태의 가장 흔한 원인입니다.

## 개별 센서 상태 조회하기

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

`time_sync_offset_us`는 PTP(IEEE 802.1AS) 기준 시간과의 오차입니다. 10마이크로초를 넘으면 센서 융합 정확도에 영향을 줄 수 있습니다.

## 캘리브레이션 상태 조회하기

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

| `state` 값 | 의미 | 조치 |
| --- | --- | --- |
| `valid` | 최근 캘리브레이션이 유효함 | 없음 |
| `stale` | 마지막 캘리브레이션 후 90일 경과 또는 500km 이상 주행 | 재캘리브레이션 권장 |
| `failed` | 마지막 캘리브레이션이 합격 기준 미달 | [VELA Sense · 캘리브레이션](../sensor/intro.md) 절차 재수행 필요 |
| `never_run` | 캘리브레이션 이력 없음 | 최초 캘리브레이션 필요 |

캘리브레이션 절차 자체(타깃 보드 배치, 정적·동적 캘리브레이션 수행)는 API로 트리거하지 않습니다. 물리적인 작업이 필요하므로 [VELA Sense 설치 가이드](../sensor/intro.md)의 절차를 따라 현장에서 수행합니다. 이 API는 그 결과를 조회하는 용도입니다.

## 진단 스냅숏 내려받기

문제를 분석할 때, 특정 시점의 센서 원시 데이터와 로그를 묶어 내려받을 수 있습니다.

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

스냅숏 생성은 차량 내부에서 데이터를 수집해 압축하는 작업이라 즉시 완료되지 않습니다. 아래 엔드포인트로 상태를 확인하고, 준비되면 다운로드 URL을 받습니다.

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

:::note[참고]
스냅숏에는 원시 라이다·카메라 데이터가 포함되어 용량이 큽니다(보통 500MB~2GB). 다운로드 URL은 24시간 뒤 만료됩니다.
:::

## 다음 단계

- 이 API가 조회하는 캘리브레이션을 실제로 수행하는 절차는 [VELA Sense 설치 가이드](../sensor/intro.md)를 참고하십시오.
- 센서 펌웨어도 다른 소프트웨어와 함께 [OTA 배포 제어하기](./ota.md)로 갱신됩니다.
