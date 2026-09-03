---
title: 차량 데이터
sidebar_label: 4. 차량 데이터
---

# 차량 데이터

차량이 보고하는 데이터는 VELA OS의 센서 추상화 계층을 거쳐 표준화된 **시그널**로 노출됩니다. 이 장에서는 시그널 카탈로그와 조회·구독 방법을 다룹니다.

## 시그널 카탈로그

시그널은 네 그룹으로 나뉩니다. 그룹은 VELA OS 센서 추상화 계층의 분류를 그대로 따릅니다.

### 차량 상태

| 시그널 | 설명 | 단위 | 갱신 주기 | 보고 존 |
| --- | --- | --- | --- | --- |
| `vehicle.odometer` | 누적 주행 거리 | km | 변경 시 | — (CCU 집계) |
| `vehicle.speed` | 현재 속도 | km/h | 100ms | — (CCU 집계) |
| `vehicle.gear` | 현재 기어 위치 | enum: `p`\|`r`\|`n`\|`d` | 변경 시 | — (CCU 집계) |
| `vehicle.ignition_state` | 시동 상태 | enum: `off`\|`accessory`\|`on` | 변경 시 | — (CCU 집계) |
| `vehicle.parked` | 주차 여부 (기어 P + 속도 0) | boolean | 변경 시 | — (CCU 집계) |
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

:::note
`보고 존`이 여러 개인 시그널(예: `body.tire_pressure`)은 존별로 개별 측정값을 가지며, 응답에 `zone` 필드가 함께 반환됩니다. `— (CCU 집계)`로 표시된 시그널은 여러 존의 데이터를 CCU가 종합한 값으로, 특정 존에 속하지 않습니다.
:::

## 최신값 조회

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

`stale`이 `true`이면 마지막 갱신 이후 해당 시그널의 정상 갱신 주기의 3배가 지났다는 뜻입니다. 차량이 통신되지 않는 상태일 가능성이 높습니다.

## 시계열 조회

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

| 파라미터 | 필수 | 설명 |
| --- | --- | --- |
| `from`, `to` | 예 | 조회 범위. 최대 30일 |
| `interval` | 아니오 | 집계 간격(`raw`, `1m`, `5m`, `1h`, `1d`). 기본값 `raw` |

`raw`로 조회하면 원본 갱신 주기 그대로 반환되어 데이터량이 클 수 있습니다. [페이지네이션](./reference.md#페이지네이션)을 참고하십시오.

## 스트리밍 구독

실시간으로 변화하는 시그널(예: 주행 중 속도)은 폴링 대신 웹소켓 스트림을 사용합니다. `stream:signals` 스코프가 필요합니다.

```bash
wscat -c "wss://stream.vela.example.com/v1/vehicles/{vehicle_id}/signals/stream" \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

연결 후 구독할 시그널을 지정합니다.

```json
{ "action": "subscribe", "signals": ["vehicle.speed", "vehicle.location"] }
```

이후 값이 갱신될 때마다 메시지가 전송됩니다.

```json
{ "signal": "vehicle.speed", "value": 62, "unit": "km/h", "timestamp": "2026-09-03T02:14:03Z" }
```

연결은 유휴 상태로 5분이 지나면 종료됩니다. `{ "action": "ping" }`을 주기적으로 보내 유지하십시오.

## 다음 단계

- 차량에 지시를 내리려면 [원격 명령](./remote-commands.md)을 참고하십시오.
- VELA Sense 센서의 상태를 조회하려면 [센서](./sensors.md)를 참고하십시오.
