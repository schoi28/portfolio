---
title: 차량 데이터 조회하기
doc_type: 절차
sidebar_label: 5. 차량 데이터 조회하기
---

# 차량 데이터 조회하기

차량이 보고하는 데이터는 VELA OS의 센서 추상화 계층을 거쳐 표준화된 **시그널**로 노출됩니다. 이 장에서는 시그널 카탈로그와 조회·구독 방법을 다룹니다.


시그널 이름과 단위, 갱신 주기는 [레퍼런스의 시그널 카탈로그](./reference.md#시그널-카탈로그)에 모아 두었습니다. 이 장은 그 값을 **가져오는 방법**만 다룹니다.

## 최신값 조회하기

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

## 시계열 조회하기

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

## 스트리밍 구독하기

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

- 차량에 지시를 내리려면 [원격 명령 보내기](./remote-commands.md)을 참고하십시오.
- VELA Sense 센서의 상태를 조회하려면 [센서 상태 조회하기](./sensors.md)를 참고하십시오.
