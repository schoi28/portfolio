---
title: 빠르게 시작하기
doc_type: 튜토리얼
sidebar_label: 3. 빠르게 시작하기
---

# 빠르게 시작하기

스테이징 환경의 시뮬레이션 차량으로 5분 안에 첫 요청을 보내 봅니다. 실제 차량 없이 API 동작을 확인할 수 있습니다.

## 준비물 확인하기

- [인증 설정하기](./authentication.md)에서 발급받은 `client_id`, `client_secret`
- 터미널 또는 Python 3.9 이상

## 5분 만에 첫 요청 보내기

### 1. 토큰 발급받기

```bash
export VELA_ACCESS_TOKEN=$(curl -s -X POST \
  https://api.staging.vela.example.com/v1/oauth/token \
  -d "grant_type=client_credentials" \
  -d "client_id=$VELA_CLIENT_ID" \
  -d "client_secret=$VELA_CLIENT_SECRET" \
  -d "scope=read:signals write:commands" \
  | python3 -c "import sys, json; print(json.load(sys.stdin)['access_token'])")
```

### 2. 시뮬레이션 차량 목록 조회하기

```bash
curl https://api.staging.vela.example.com/v1/vehicles \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "data": [
    {
      "vehicle_id": "sim_001",
      "model": "Hanul Motors EV Sedan",
      "software_version": "2026.8.2",
      "zones": ["front", "rear", "left", "right"]
    }
  ]
}
```

### 3. 배터리 잔량 조회하기

```bash
curl https://api.staging.vela.example.com/v1/vehicles/sim_001/signals/battery.soc/latest \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "signal": "battery.soc",
  "value": 68,
  "unit": "percent",
  "timestamp": "2026-09-03T02:14:00Z"
}
```

### 4. 원격 명령 보내기

도어를 잠그는 명령을 보냅니다. 스테이징 환경에서는 2초 뒤 항상 성공합니다.

```bash
curl -X POST https://api.staging.vela.example.com/v1/vehicles/sim_001/commands \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"command": "lock_doors"}'
```

```json
{
  "command_id": "cmd_7f3a2b",
  "status": "pending"
}
```

명령 결과는 비동기로 처리됩니다. 결과를 확인하는 방법은 [원격 명령 · 비동기 결과 처리하기](./remote-commands.md#비동기-결과-처리하기)를 참고하십시오.

여기까지가 API의 기본 왕복입니다. 실제 연동에서는 SDK를 사용하는 것을 권장합니다.

## Python SDK로 호출하기

서버 애플리케이션에서 사용합니다. 토큰 발급과 갱신을 자동으로 처리합니다.

```bash
pip install vela-sdk
```

```python
from vela import VelaClient

client = VelaClient(
    client_id="...",
    client_secret="...",
    environment="staging",  # 프로덕션에서는 "production"
)

vehicle = client.vehicles.get("sim_001")
soc = vehicle.signals.latest("battery.soc")
print(f"배터리 잔량: {soc.value}{soc.unit}")

result = vehicle.commands.send("lock_doors")
result.wait(timeout=30)  # 완료될 때까지 대기
print(result.status)  # "succeeded" | "failed" | "timed_out"
```

SDK의 `wait()`는 내부적으로 명령 상태 조회 엔드포인트를 짧은 간격으로 호출합니다. 프로덕션에서 다수의 명령을 다룬다면 폴링 대신 [웹훅으로 이벤트 받기](./webhooks.md)으로 결과를 받는 것을 권장합니다.

## C++ SDK로 차량 내에서 호출하기

VELA OS 위에서 동작하는 서비스가 VELA Cloud를 거치지 않고 로컬 시그널 버스에 직접 접근할 때 사용합니다. 이 SDK는 차량 내부에서만 동작하며, VELA Cloud로 나가는 요청에는 앞서 설명한 REST API를 사용합니다.

```cpp
#include <vela/signal_client.hpp>

vela::SignalClient client;
auto soc = client.get_latest("battery.soc");
std::cout << "배터리 잔량: " << soc.value << soc.unit << std::endl;
```

C++ SDK는 VELA OS 서비스 프레임워크에 등록된 서비스에서만 사용할 수 있습니다. 일반 서버 애플리케이션은 Python SDK 또는 REST API를 사용하십시오.

## 다음 단계

- 차량이 보고하는 전체 데이터 목록은 [차량 데이터 조회하기](./vehicle-data.md)를 참고하십시오.
- 원격 명령의 전체 목록과 사전 조건은 [원격 명령 보내기](./remote-commands.md)을 참고하십시오.
