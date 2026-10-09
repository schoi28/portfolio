---
title: SDK로 연동하기
doc_type: 개념 + 절차
sidebar_label: 4. SDK로 연동하기
---

# SDK로 연동하기

공식 SDK를 사용해 VELA Cloud의 REST API를 호출하는 방법을 설명합니다. SDK는 액세스 토큰 발급·갱신과 요청 헤더 구성을 대신 처리하며, 조회 요청의 재시도와 비동기 명령 결과 대기도 지원합니다.

이 장에서는 **Python을 대표 예제 언어**로 사용합니다. Node.js와 Java 개발자는 설치·클라이언트 생성 방법을 확인한 뒤, [REST 동작과 SDK 메서드](#rest-동작과-sdk-메서드)의 대응표를 참고하십시오. 다른 기능별 장은 `curl` 예제를 기준으로 설명합니다.

## 지원 SDK와 사용 범위

| SDK | 지원 환경 | 사용 목적 |
| --- | --- | --- |
| Python | Python 3.9 이상 | 서버 애플리케이션·분석 스크립트 |
| Node.js | Node.js 18 LTS 이상 | 웹 백엔드 |
| Java | Java 17 이상 | OEM 시스템 연동 |

위 SDK는 모두 **VELA Cloud의 REST API**를 호출합니다. SDK를 사용하지 않는 경우 [인증 설정하기](./authentication.md)와 [REST API 빠르게 시작하기](./quickstart.md)를 참고하십시오.

:::note[차량 내부 C++ SDK의 범위]
VELA는 차량 내 애플리케이션에서 로컬 시그널 버스에 접근하는 C++ SDK도 제공합니다. 이 SDK는 VELA Cloud를 호출하지 않고 VELA OS 서비스 등록을 사용하므로, 이 개발자 가이드에서 다루는 REST API 및 외부 서버용 SDK와는 별도의 인터페이스입니다. **이 장에서는 C++ SDK의 설치·호출 방법을 다루지 않습니다.**
:::

## 시작하기 전에

- [인증 설정하기](./authentication.md#1-클라이언트-등록하기)에 따라 **스테이징 환경**에서 API 클라이언트를 등록합니다.
- `client_id`와 `client_secret`을 안전한 환경 변수 또는 비밀 관리 서비스에 저장합니다.
- 차량 데이터 조회에는 `read:signals` 스코프가 필요합니다.
- 예시에서는 스테이징의 시뮬레이션 차량 `sim_001`을 사용합니다.

:::warning[경고]
`client_secret`을 소스 코드에 직접 입력하거나 공개 저장소에 커밋하지 마십시오. 아래 예제는 환경 변수에서 자격 증명을 읽습니다.
:::

## SDK 설치하고 클라이언트 만들기

### Python

```bash
python3 -m pip install vela-sdk
```

```python
import os
from vela import VelaClient

client = VelaClient(
    client_id=os.environ["VELA_CLIENT_ID"],
    client_secret=os.environ["VELA_CLIENT_SECRET"],
    environment="staging",
    scopes=["read:signals"],
)
```

### Node.js

```bash
npm install @vela/sdk
```

```javascript
import { VelaClient } from '@vela/sdk';

const client = new VelaClient({
  clientId: process.env.VELA_CLIENT_ID,
  clientSecret: process.env.VELA_CLIENT_SECRET,
  environment: 'staging',
  scopes: ['read:signals'],
});
```

Java에서는 Maven 의존성 `com.vela:vela-sdk:1.x`를 추가합니다. 이 장의 후속 예제는 Python을 기준으로 작성했습니다.

**클라이언트는 한 번 생성해 재사용하십시오.** 요청마다 새로 생성하면 불필요하게 토큰 발급을 반복할 수 있습니다. 프로덕션에 연결할 때는 환경과 자격 증명을 모두 프로덕션용으로 변경해야 합니다.

## SDK로 첫 차량 데이터 조회하기

다음 예제는 앞에서 만든 Python `client`를 사용합니다.

1. 차량 ID `sim_001`로 차량 객체를 가져옵니다.
2. `battery.soc` 시그널의 최신값을 조회합니다.
3. 결과를 출력합니다.

```python
vehicle = client.vehicles.get("sim_001")
reading = vehicle.signals.latest("battery.soc")
print(reading)
```

이 예제는 REST API의 `GET /vehicles/{id}/signals/{signal}/latest` 호출에 대응합니다. 응답 값과 시각 정보의 의미는 [차량 데이터 조회하기](./vehicle-data.md#최신값-조회하기)를 참고하십시오.

:::note[참고]
스테이징의 `sim_001`은 예제용 차량입니다. 프로덕션에서는 접근 권한이 있는 실제 `vehicle_id`를 사용하십시오.
:::

## 인증과 스코프 이해하기

SDK는 클라이언트를 생성할 때 전달한 자격 증명으로 토큰을 발급받고, 만료 **60초 전**에 갱신합니다.

| REST API를 직접 호출할 때 | SDK를 사용할 때 |
| --- | --- |
| 토큰 발급 요청 전송 | SDK가 처리 |
| 만료 시점 확인과 재발급 | SDK가 처리 |
| `Authorization` 헤더 추가 | SDK가 처리 |
| 권한 스코프 지정 | 클라이언트 생성 시 `scopes=[...]` 지정 |

사용하려는 기능에 필요한 최소 스코프를 설정하십시오. 스코프별 권한은 [인증 설정하기 · 스코프 지정하기](./authentication.md#스코프-지정하기)에 정리되어 있습니다.

## REST 동작과 SDK 메서드

이후 기능별 장에서 `curl`로 설명하는 호출은 Python SDK의 다음 메서드에 대응합니다.

| 하는 일 | REST API | Python SDK |
| --- | --- | --- |
| 차량 목록 | `GET /vehicles` | `client.vehicles.list()` |
| 차량 한 대 | `GET /vehicles/{id}` | `client.vehicles.get(id)` |
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

표의 `vehicle`은 앞 예제에서 가져온 차량 객체입니다. `result`는 원격 명령 전송의 반환값입니다. 메서드 이름과 호출 방식은 언어에 따라 다를 수 있습니다. 예를 들어 Node.js는 `vehicle.signals.latest(signal)`, Java는 `vehicle.signals().latest(signal)` 형식을 사용합니다.

REST 동작에 대응하는 Python SDK 메서드를 이 표에서 찾습니다. 요청의 파라미터·사전 조건과 응답의 의미는 [차량 데이터 조회하기](./vehicle-data.md), [원격 명령 보내기](./remote-commands.md) 등 **기능별 장**에서 확인하십시오. 시그널 카탈로그와 공통 에러 코드는 [레퍼런스 찾아보기](./reference.md)에 있습니다.

## 예외 처리하기

SDK는 REST API의 실패 응답을 예외로 전달합니다.

| 예외 | 대응 HTTP 상태 | 필요한 조치 |
| --- | --- | --- |
| `VelaAuthError` | 401, 403 | 자격 증명과 스코프 확인 |
| `VelaNotFoundError` | 404 | 차량·리소스 식별자 확인 |
| `VelaConflictError` | 409 | 진행 중인 명령 종료 확인 |
| `VelaPreconditionError` | 422 `precondition_failed` | 사전 조건 충족 후 다시 요청 |
| `VelaUnreachableError` | 422 `vehicle_unreachable` | 차량 연결 상태 확인 |
| `VelaRateLimitError` | 429 | `retry_after`만큼 대기 |
| `VelaServerError` | 500, 503 | 일시적 장애 여부 확인 |

원격 명령에는 `write:commands` 스코프가 필요합니다. 앞의 클라이언트는 `read:signals`만 가지고 있으므로 다시 만듭니다.

```python
client = VelaClient(
    client_id=os.environ["VELA_CLIENT_ID"],
    client_secret=os.environ["VELA_CLIENT_SECRET"],
    environment="staging",
    scopes=["read:signals", "write:commands"],
)
vehicle = client.vehicles.get("sim_001")
```

```python
from vela import VelaPreconditionError, VelaRateLimitError

try:
    result = vehicle.commands.send("start_charging")
except VelaPreconditionError as error:
    print(f"사전 조건 미충족: {error.signal} = {error.current_value}")
except VelaRateLimitError as error:
    print(f"요청 제한: {error.retry_after}초 뒤 확인")
```

전체 실패 코드와 의미는 [레퍼런스 · 에러 코드](./reference.md#에러-코드)를 참고하십시오.

## 재시도와 타임아웃 설정하기

SDK는 **조회 요청 중 재시도가 가능한 실패**에 지수 백오프를 적용합니다. 원격 명령에는 자동 재시도를 적용하지 않습니다.

| 설정 | 기본값 | Python 설정 예 |
| --- | --- | --- |
| 조회 요청 재시도 | 최대 3회 | `VelaClient(max_retries=0)` |
| 백오프 | 1초부터 시작해 2배씩 증가 | `VelaClient(backoff_factor=2.0)` |
| 요청 타임아웃 | 10초 | `VelaClient(timeout=30)` |

:::info[주의]
원격 명령은 실제 차량에서 수행되는 동작입니다. 요청 타임아웃만으로 명령이 실행되지 않았다고 단정하고 같은 명령을 다시 보내지 마십시오. 먼저 [명령 상태](./remote-commands.md#비동기-결과-처리하기)를 확인하고, [재시도 정책](./remote-commands.md#타임아웃과-재시도-정책)에 따라 처리하십시오.
:::

## 비동기 결과 기다리기

원격 명령은 요청 접수와 차량의 실행 완료가 분리되어 있습니다. SDK의 `wait()`는 결과가 나올 때까지 명령 상태를 조회합니다.

```python
result = vehicle.commands.send("lock_doors")
result.wait(timeout=30)
print(result.status)  # "succeeded" | "failed" | "timed_out"
```

`wait()`는 내부적으로 **2초 간격으로 폴링**합니다. 단일 명령을 확인하는 스크립트에 적합하지만, 많은 명령을 동시에 처리하면 [레이트 리밋](./reference.md#레이트-리밋)에 영향을 줄 수 있습니다.

대량의 명령을 처리할 때는 [웹훅으로 이벤트 받기](./webhooks.md)를 사용하는 것을 권장합니다. `wait()`는 **명령의 실행 완료를 기다리는 기능**이며, 실패한 명령을 자동으로 다시 보내는 기능이 아닙니다.

## SDK와 API 버전 확인하기

SDK의 주 버전은 API 버전에 대응합니다. 예를 들어 `vela-sdk 1.x`는 API `v1`을 호출합니다.

- SDK의 부 버전 업데이트(`1.4` → `1.5`)는 기존 코드와 호환됩니다.
- API에 필드가 추가되면 기존 SDK에서도 응답에 포함될 수 있습니다.
- API 주 버전이 변경되면 SDK의 주 버전도 변경됩니다. 지원 기간은 [API 버전 정책](./overview.md#버전-정책)에 따릅니다.

## 다음 단계

- 조회 가능한 시그널을 확인하려면 [차량 데이터 조회하기](./vehicle-data.md)를 참고하십시오.
- 원격 명령의 사전 조건과 결과 처리는 [원격 명령 보내기](./remote-commands.md)를 참고하십시오.
- 시그널 카탈로그, 에러 코드, 페이지네이션 규칙은 [레퍼런스 찾아보기](./reference.md)에 있습니다.
