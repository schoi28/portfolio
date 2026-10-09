---
title: SDK로 연동하기
doc_type: 개념 + 절차
sidebar_label: 4. SDK로 연동하기
---

# SDK로 연동하기

VELA는 네 가지 언어로 공식 SDK를 제공합니다. HTTP를 직접 호출해도 되지만, SDK는 **토큰 발급과 갱신, 재시도, 결과 대기**를 대신 처리합니다.

이 장은 SDK 전반을 다룹니다. 이후 장의 예시 요청은 모두 `curl`로 적혀 있으므로, SDK를 쓰신다면 [REST 동작과 SDK 메서드](#rest-동작과-sdk-메서드)의 대응표를 함께 보십시오.

## 지원 언어와 런타임

| SDK | 지원 범위 | 용도 |
| --- | --- | --- |
| Python | 3.9 이상 | 서버 애플리케이션, 분석 스크립트 |
| Node.js | 18 LTS 이상 | 웹 백엔드 |
| Java | 17 이상 | OEM 기간계 연동 |
| C++ | C++17, Linux (aarch64 · x86_64) | 차량 내 애플리케이션 |

:::note[참고]
REST API 자체는 HTTP 클라이언트가 있는 어떤 환경에서도 호출할 수 있습니다. 위 표는 **SDK를 제공하는 런타임**의 목록입니다. 목록에 없는 언어에서는 [인증 설정하기](./authentication.md)를 참고해 직접 구현하십시오.
:::

## 설치하고 클라이언트 만들기

클라이언트를 한 번 만들어 재사용하십시오. 요청마다 새로 만들면 매번 토큰을 발급받습니다.

```bash
pip install vela-sdk          # Python
npm install @vela/sdk         # Node.js
```

Java는 Maven 저장소에서 `com.vela:vela-sdk:1.x` 를 추가합니다.

```python
from vela import VelaClient

client = VelaClient(
    client_id="...",
    client_secret="...",
    environment="staging",  # 프로덕션에서는 "production"
)
```

```javascript
import { VelaClient } from '@vela/sdk';

const client = new VelaClient({
  clientId: '...',
  clientSecret: '...',
  environment: 'staging',
});
```

:::warning[경고]
`client_secret`을 소스 코드나 저장소에 넣지 마십시오. 환경 변수나 비밀 관리 서비스에서 읽어 오십시오.
:::

## 인증은 SDK가 처리합니다

클라이언트를 만들 때 넘긴 자격 증명으로 SDK가 토큰을 발급받고, 만료 **60초 전에 자동으로 갱신**합니다. 토큰 만료를 직접 처리할 필요가 없습니다.

| 직접 구현할 때 | SDK를 쓸 때 |
| --- | --- |
| 토큰 발급 요청을 보낸다 | 클라이언트 생성 시 자동 |
| 만료 시각을 기억하고 갱신한다 | 자동 |
| 요청마다 `Authorization` 헤더를 붙인다 | 자동 |
| 스코프를 요청에 지정한다 | 클라이언트 생성 시 `scopes=[...]` |

스코프의 의미와 선택 기준은 [인증 설정하기](./authentication.md#스코프-지정하기)에 있습니다.

## REST 동작과 SDK 메서드

이후 장에서 `curl`로 설명하는 동작은 SDK에서 다음 메서드에 대응합니다.

| 하는 일 | REST | Python SDK |
| --- | --- | --- |
| 차량 목록 | `GET /vehicles` | `client.vehicles.list()` |
| 차량 하나 | `GET /vehicles/{id}` | `client.vehicles.get(id)` |
| 최신값 조회 | `GET /vehicles/{id}/signals/{signal}/latest` | `vehicle.signals.latest(signal)` |
| 시계열 조회 | `GET /vehicles/{id}/signals/{signal}/history` | `vehicle.signals.history(signal, ...)` |
| 스트리밍 구독 | `wss://stream.../signals/stream` | `vehicle.signals.stream([...])` |
| 원격 명령 전송 | `POST /vehicles/{id}/commands` | `vehicle.commands.send(name, **params)` |
| 명령 상태 조회 | `GET /vehicles/{id}/commands/{cid}` | `result.refresh()` |
| 센서 목록 | `GET /vehicles/{id}/sensors` | `vehicle.sensors.list()` |
| 캘리브레이션 상태 | `GET /vehicles/{id}/sensors/calibration` | `vehicle.sensors.calibration()` |
| 캠페인 생성 | `POST /campaigns` | `client.campaigns.create(...)` |
| 캠페인 시작 | `POST /campaigns/{id}/start` | `campaign.start()` |
| 웹훅 등록 | `POST /webhooks` | `client.webhooks.create(...)` |

메서드 이름과 인자는 언어마다 표기 규칙을 따릅니다. Node.js는 `vehicle.signals.latest(signal)`, Java는 `vehicle.signals().latest(signal)` 입니다.

:::note[참고]
파라미터의 의미, 형식, 제약 조건은 SDK와 REST가 같습니다. [레퍼런스 찾아보기](./reference.md)를 보십시오. 이 표는 **어느 메서드를 부를지**만 알려 줍니다.
:::

## 에러 처리하기

SDK는 실패 응답을 예외로 바꿔 던집니다. HTTP 상태 코드를 직접 확인하지 않아도 됩니다.

| 예외 | 대응 HTTP | 재시도 |
| --- | --- | --- |
| `VelaAuthError` | 401, 403 | 안 됨. 자격 증명과 스코프를 확인 |
| `VelaNotFoundError` | 404 | 안 됨 |
| `VelaConflictError` | 409 | 진행 중인 명령이 끝난 뒤 가능 |
| `VelaPreconditionError` | 422 `precondition_failed` | 원인 해소 후 가능 |
| `VelaUnreachableError` | 422 `vehicle_unreachable` | 가능 |
| `VelaRateLimitError` | 429 | 가능. `retry_after` 속성 참고 |
| `VelaServerError` | 500, 503 | 가능 |

```python
from vela import VelaPreconditionError, VelaRateLimitError

try:
    vehicle.commands.send("start_charging")
except VelaPreconditionError as e:
    print(f"조건 미충족: {e.signal} = {e.current_value}")
except VelaRateLimitError as e:
    print(f"{e.retry_after}초 뒤 재시도")
```

예외는 원본 응답의 `error.code`를 `code` 속성으로 그대로 전달합니다. 코드의 전체 목록은 [레퍼런스 찾아보기](./reference.md#에러-코드)에 있습니다.

## 재시도와 타임아웃 설정하기

재시도가 가능한 실패에 대해 **지수 백오프로 최대 3회**를 기본 적용합니다.

| 설정 | 기본값 | 바꾸는 법 |
| --- | --- | --- |
| 재시도 횟수 | 3 | `VelaClient(max_retries=0)` |
| 백오프 | 1초에서 시작해 2배씩 | `VelaClient(backoff_factor=2.0)` |
| 요청 타임아웃 | 10초 | `VelaClient(timeout=30)` |

:::info[주의]
재시도는 조회 요청에만 자동으로 적용됩니다. 원격 명령은 중복 실행을 막기 위해 자동 재시도하지 않습니다. 명령을 재시도하려면 [원격 명령 보내기](./remote-commands.md#타임아웃과-재시도-정책)의 기준을 확인하고 직접 호출하십시오.
:::

## 비동기 결과 기다리기

원격 명령은 접수와 실행이 분리되어 있습니다. SDK의 `wait()`는 명령이 끝날 때까지 상태를 대신 확인합니다.

```python
result = vehicle.commands.send("lock_doors")
result.wait(timeout=30)
print(result.status)  # "succeeded" | "failed" | "timed_out"
```

`wait()`는 내부적으로 상태 조회 엔드포인트를 **2초 간격으로 폴링**합니다. 명령 하나를 기다리는 스크립트에는 적합하지만, 다수의 명령을 동시에 다루면 요청 수가 빠르게 늘어 [레이트 리밋](./reference.md#레이트-리밋)에 걸립니다.

**프로덕션에서 명령을 다수 처리한다면 폴링 대신 [웹훅으로 이벤트 받기](./webhooks.md)를 사용하십시오.**

## 차량 안에서 호출하기 (C++)

C++ SDK는 VELA OS 위에서 동작하는 서비스가 VELA Cloud를 거치지 않고 **차량 내부의 로컬 시그널 버스**에 직접 접근할 때 사용합니다.

```cpp
#include <vela/signal_client.hpp>

vela::SignalClient client;
auto soc = client.get_latest("battery.soc");
std::cout << "배터리 잔량: " << soc.value << soc.unit << std::endl;
```

다른 세 SDK와 성격이 다릅니다.

| | Python · Node.js · Java | C++ |
| --- | --- | --- |
| 호출 대상 | VELA Cloud | 차량 내부 시그널 버스 |
| 동작 위치 | 외부 서버 | 차량 안 |
| 인증 | 클라이언트 자격 증명 | VELA OS 서비스 등록 |
| 네트워크 | 필요 | 필요 없음 |

C++ SDK는 VELA OS 서비스 프레임워크에 등록된 서비스에서만 사용할 수 있습니다. 일반 서버 애플리케이션은 Python SDK나 REST API를 사용하십시오.

## SDK 버전과 API 버전

SDK의 **주 버전이 API 버전에 대응**합니다. `vela-sdk 1.x`는 API `v1`을 호출합니다.

- SDK의 부 버전 상승(`1.4` → `1.5`)은 기존 코드를 깨지 않습니다.
- API에 필드가 추가되면 SDK 갱신 없이도 응답에 그대로 전달됩니다.
- API의 주 버전이 올라가면 SDK도 주 버전이 올라가고, 이전 버전은 [버전 정책](./overview.md#버전-정책)에 따라 지원됩니다.

## 다음 단계

- 차량이 보고하는 데이터를 읽으려면 [차량 데이터 조회하기](./vehicle-data.md)를 참고하십시오.
- 차량에 지시를 내리려면 [원격 명령 보내기](./remote-commands.md)를 참고하십시오.
