---
title: 인증
sidebar_label: 인증
---

# 인증

모든 요청에는 API 키가 필요합니다. 키는 Bearer 토큰으로 전달합니다.

## API 키 발급하기

1. Aeris Console에서 **설정 > API 키**를 선택합니다.
2. **새 키 만들기**를 선택하고 이름과 권한 범위를 지정합니다.
3. 생성 직후 한 번만 표시되는 키 값을 복사해 안전한 곳에 보관합니다. 다시 확인할 수 없습니다.

:::warning
API 키를 클라이언트 코드나 공개 저장소에 포함하지 마십시오. 서버 환경 변수에 보관하십시오.
:::

## 요청에 키 포함하기

```bash
curl https://api.aeris.example.com/v1/sites \
  -H "Authorization: Bearer $AERIS_API_KEY"
```

## 권한 범위

키를 만들 때 범위를 지정합니다. 필요한 최소 범위만 부여하십시오.

| 범위 | 허용되는 작업 |
| --- | --- |
| `read:readings` | 측정값 조회 |
| `read:sites` | 설치 지점과 센서 조회 |
| `write:sites` | 설치 지점과 센서 생성·수정·삭제 |
| `write:alerts` | 알림 규칙 관리 |

## 인증 실패 응답

| 상태 코드 | `error.code` | 원인 |
| --- | --- | --- |
| 401 | `missing_credentials` | Authorization 헤더가 없음 |
| 401 | `invalid_key` | 키가 잘못되었거나 폐기됨 |
| 403 | `insufficient_scope` | 키에 해당 범위가 없음 |

```json
{
  "error": {
    "code": "insufficient_scope",
    "message": "This key does not have the write:sites scope.",
    "required_scope": "write:sites"
  }
}
```

## 요청 한도

키 하나당 분당 600건입니다. 초과하면 `429`와 함께 `Retry-After` 헤더가 반환됩니다.
