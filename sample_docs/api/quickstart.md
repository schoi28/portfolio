---
title: REST API 빠르게 시작하기
doc_type: 튜토리얼
sidebar_label: 3. REST API 빠르게 시작하기
---

# REST API 빠르게 시작하기

스테이징 환경의 시뮬레이션 차량을 대상으로 `curl` 요청을 보내는 튜토리얼입니다. 실제 차량 없이 토큰 발급, 데이터 조회, 원격 명령 접수까지 확인합니다. 공식 SDK를 사용할 경우 [SDK로 연동하기](./sdk.md)에서 시작하십시오.

## 준비물 확인하기

- [인증 설정하기](./authentication.md#1-클라이언트-등록하기)에 따라 **스테이징 환경**에서 발급받은 `client_id`, `client_secret`
- `read:signals` 및 `write:commands` 스코프가 허용된 클라이언트
- `curl`과 Python 3가 설치된 터미널

Bash 터미널에서 다음과 같이 자격 증명을 입력하십시오. 비밀값은 화면에 표시되지 않습니다.

```bash
read -r -p "client_id: " VELA_CLIENT_ID
read -r -s -p "client_secret: " VELA_CLIENT_SECRET
echo
export VELA_CLIENT_ID VELA_CLIENT_SECRET
```

:::warning[경고]
`client_secret`을 예제 코드나 Git 저장소에 입력하지 마십시오. 이 문서에서는 환경 변수에 저장된 값을 사용합니다.
:::

## 첫 요청 보내기

### 1. 토큰 발급받기

다음 명령은 인증 응답에서 액세스 토큰을 추출해 `VELA_ACCESS_TOKEN` 환경 변수에 저장합니다.

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
  "timestamp": "2026-09-03T02:14:00Z",
  "stale": false
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

여기까지 토큰 발급, 시그널 조회, 원격 명령 접수 흐름을 확인했습니다. `pending`은 접수 상태이며 실행 성공을 뜻하지 않습니다.

애플리케이션에서 토큰 갱신과 재시도 처리를 직접 구현하지 않으려면 [SDK로 연동하기](./sdk.md)를 참고하십시오.

## 다음 단계

- 차량이 보고하는 전체 데이터 목록은 [차량 데이터 조회하기](./vehicle-data.md)를 참고하십시오.
- 원격 명령의 전체 목록과 사전 조건은 [원격 명령 보내기](./remote-commands.md)를 참고하십시오.
