---
title: 인증 설정하기
doc_type: 절차
sidebar_label: 2. 인증 설정하기
---

# 인증 설정하기

VELA Vehicle API는 두 가지 인증 방식을 사용합니다. 서버 애플리케이션이 API를 호출할 때는 **OAuth 2.0 클라이언트 자격 증명**을, 차량이 VELA Cloud와 직접 통신할 때는 **상호 TLS**(mTLS)를 사용합니다. 이 문서는 첫 번째, 서버 대 서버 인증을 다룹니다.

## OAuth 2.0으로 인증하기

사람이 로그인하는 흐름이 아니라, 등록된 애플리케이션이 자신의 자격으로 토큰을 발급받는 방식입니다.

### 1. 클라이언트 등록하기

:::warning[경고]
`client_secret`을 클라이언트 코드나 공개 저장소에 포함하지 마십시오. 서버 환경 변수 또는 시크릿 관리 시스템에 보관하십시오.
:::

클라이언트 등록은 VELA Deploy 콘솔에서 합니다. 콘솔 주소와 최초 계정은 계약 체결 시 담당 계정 관리자가 발급합니다.

| 환경 | 콘솔 주소 |
| --- | --- |
| 스테이징 | `https://console.staging.vela.example.com` |
| 프로덕션 | `https://console.vela.example.com` |

:::note[참고]
API 클라이언트를 만들려면 콘솔 계정에 **관리자** 권한이 있어야 합니다. 권한이 없으면 **설정** 메뉴에 **API 클라이언트** 항목이 보이지 않습니다. 조직의 콘솔 관리자에게 요청하십시오.
:::

1. 콘솔에 로그인한 뒤 **설정 > API 클라이언트**를 선택합니다.
2. **새 클라이언트 만들기**를 선택하고 이름과 필요한 스코프를 지정합니다.
3. 생성된 `client_id`와 `client_secret`을 안전한 곳에 보관합니다. `client_secret`은 생성 직후 한 번만 표시됩니다.

### 2. 액세스 토큰 발급받기

다음 예제는 앞 단계에서 발급한 `VELA_CLIENT_ID`, `VELA_CLIENT_SECRET` 환경 변수를 사용합니다. `curl`로 직접 인증할 때만 수행하십시오. 공식 SDK를 사용하는 경우 토큰 발급과 갱신은 SDK가 처리합니다.

```bash
curl -X POST https://api.vela.example.com/v1/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=$VELA_CLIENT_ID" \
  -d "client_secret=$VELA_CLIENT_SECRET" \
  -d "scope=read:signals write:commands"
```

응답:

```json
{
  "access_token": "vla_at_9f2c...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read:signals write:commands"
}
```

### 3. 요청에 토큰 포함하기

앞 단계에서 발급받은 `access_token` 값을 `VELA_ACCESS_TOKEN` 환경 변수에 보관한 뒤 요청에 사용하십시오.

```bash
curl https://api.vela.example.com/v1/vehicles \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

## 스코프 지정하기

클라이언트를 등록할 때 필요한 최소 범위만 부여하십시오. 스코프는 리소스 모델의 각 리소스에 대응합니다.

| 스코프 | 허용되는 작업 |
| --- | --- |
| `read:signals` | 시그널 최신값·시계열 조회 |
| `stream:signals` | 시그널 스트리밍 구독 |
| `write:commands` | 원격 명령 전송 |
| `read:sensors` | 센서 상태·캘리브레이션 조회 |
| `write:campaigns` | OTA 캠페인 생성·수정 |
| `read:campaigns` | OTA 캠페인·배포 상태 조회 |
| `manage:webhooks` | 웹훅 등록·삭제 |

같은 `client_id`라도 스코프에 없는 작업을 요청하면 `403 insufficient_scope`가 반환됩니다.

## 토큰 갱신하기

액세스 토큰의 유효 기간은 1시간입니다. 만료되면 2단계를 반복해 새 토큰을 발급받습니다. 별도의 리프레시 토큰은 없습니다. 클라이언트 자격 증명 흐름에서는 재요청이 곧 갱신입니다.

:::info[주의]
토큰 만료 전에 갱신하지 않으면 진행 중인 요청이 `401 token_expired`로 실패합니다. 만료 10분 전부터 갱신하는 것을 권장합니다.
:::

## 차량 측 인증 이해하기

차량의 VELA OS가 VELA Cloud와 통신할 때는 이 문서의 방식과 다른, 인증서 기반 mTLS를 사용합니다. 차량 제조 시점에 고유 인증서가 발급되며, 개발자가 별도로 설정할 필요는 없습니다. 이 흐름은 애플리케이션 개발자가 다룰 일이 없으므로 별도 문서로 다루지 않습니다.

## 인증 실패 처리하기

| 상태 코드 | `error.code` | 원인 |
| --- | --- | --- |
| 401 | `missing_credentials` | Authorization 헤더가 없음 |
| 401 | `invalid_client` | `client_id` 또는 `client_secret`이 잘못됨 |
| 401 | `token_expired` | 액세스 토큰 유효 기간 만료 |
| 403 | `insufficient_scope` | 토큰에 해당 스코프가 없음 |
| 403 | `client_disabled` | 클라이언트가 비활성화됨 (콘솔에서 재활성화) |

```json
{
  "error": {
    "code": "insufficient_scope",
    "message": "This token does not have the write:commands scope.",
    "required_scope": "write:commands"
  }
}
```

## 다음 단계

REST API를 직접 호출한다면 [REST API 빠르게 시작하기](./quickstart.md)로 이동하십시오. SDK를 사용한다면 토큰 발급 단계를 생략하고 [SDK로 연동하기](./sdk.md)에서 클라이언트를 생성하십시오.
