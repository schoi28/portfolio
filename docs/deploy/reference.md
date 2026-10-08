---
title: 레퍼런스 찾아보기
doc_type: 레퍼런스
sidebar_label: 7. 레퍼런스 찾아보기
---

# 레퍼런스 찾아보기

화면에 뜬 상태 값이나 코드의 뜻을 찾을 때 보는 장입니다. **캠페인 상태 값, 차량별 배포 상태 값, 실패 코드 15종, 권한 매트릭스**가 들어 있습니다.

용어의 뜻은 [용어 찾아보기](./glossary.md)에, 코드별 대응 방법은 [문제에 대응하기](./incident-response.md#실패-코드-해석하기)에 있습니다.

## 캠페인 상태 값

![캠페인 상태가 전이되는 경로](/img/deploy-campaign-states.svg)

:::warning[경고]
`aborted`는 긴급 중단했을 때만 들어가는 상태이며, 되돌릴 수 없습니다.
:::

| 상태 | 의미 | 다음으로 갈 수 있는 상태 |
| --- | --- | --- |
| `created` | 생성됨. 아직 시작하지 않음 | `in_progress`, 삭제 |
| `in_progress` | 배포 진행 중 | `paused_by_gate`, `paused_by_user`, `completed`, `aborted` |
| `paused_by_gate` | 게이트 기준 미달로 자동 중지 | `in_progress` (재개), `rolled_back`, `aborted` |
| `paused_by_user` | 운영자가 일시 중지 | `in_progress`, `rolled_back`, `aborted` |
| `completed` | 모든 단계 완료 | `rolled_back` |
| `rolled_back` | 이전 버전으로 복구됨 | 없음 |
| `aborted` | 긴급 중단됨 | 없음 |

`rolled_back`과 `aborted`는 종료 상태입니다. 다시 시작할 수 없습니다.

## 차량별 배포 상태 값

| 상태 | 의미 |
| --- | --- |
| `not_targeted` | 타깃 그룹 조건에 맞지 않음 |
| `excluded` | 제외 목록에 포함됨 |
| `waiting_prerequisite` | 선행 패키지 설치 대기 중 |
| `pending_precondition` | 사전 조건 미충족 (주차·배터리 등) |
| `downloading` | 다운로드 중 |
| `ready_to_install` | 다운로드 완료. 설치 시점 대기 |
| `installing` | 설치 중 |
| `installed` | 설치 완료 |
| `failed` | 설치 실패 |
| `rolled_back` | 이전 버전으로 복구됨 |

## 실패 코드 목록

### 사전 조건 계열 (자동 재시도됨)

| 코드 | 의미 |
| --- | --- |
| `E_PRECOND_BATTERY` | 구동 배터리 잔량 부족 |
| `E_PRECOND_AUX_BATTERY` | 보조 배터리 잔량 부족 |
| `E_PRECOND_PARKED` | 주차 상태가 아님 |
| `E_PRECOND_IGNITION` | 시동이 켜져 있음 (존 ECU 대상) |
| `E_PRECOND_TIME_WINDOW` | 허용 시간대가 아님 |

### 통신 계열 (자동 재시도됨)

| 코드 | 의미 |
| --- | --- |
| `E_DOWNLOAD_TIMEOUT` | 다운로드 시간 초과 |
| `E_DOWNLOAD_INTERRUPTED` | 다운로드 중 연결 끊김 |
| `E_VEHICLE_UNREACHABLE` | 차량과 통신 불가 |

### 조사 대상 (자동 재시도되지 않음)

| 코드 | 의미 | 우선순위 |
| --- | --- | --- |
| `E_SIGNATURE_INVALID` | 서명 검증 실패 | 높음 |
| `E_BOOT_FAILED` | 설치 후 부팅 실패. 자동 롤백됨 | 최상 |
| `E_INCOMPATIBLE_HW` | 하드웨어 비호환 | 높음 |
| `E_INSUFFICIENT_STORAGE` | 저장 공간 부족 | 중간 |
| `E_INSTALL_ABORTED` | 설치 중 중단됨 | 중간 |
| `E_ECU_NO_RESPONSE` | 존 ECU가 응답하지 않음 | 높음 |
| `E_UNKNOWN` | 분류되지 않은 오류 | 높음 |

## 권한 매트릭스

| 작업 | 조회자 | 배포 담당자 | 릴리스 관리자 | 관리자 |
| --- | --- | --- | --- | --- |
| 캠페인 조회 | ● | ● | ● | ● |
| 감사 로그 조회 | ● | ● | ● | ● |
| 패키지 업로드 | | ● | ● | ● |
| 타깃 그룹 생성·수정 | | ● | ● | ● |
| 캠페인 생성 | | ● | ● | ● |
| 검증 환경 배포 시작 | | ● | ● | ● |
| 프로덕션 배포 시작 | | | ● | ● |
| 일시 중지 | | ● | ● | ● |
| 게이트 중지 후 재개 | | | ● | ● |
| 롤백 실행 | | | ● | ● |
| 긴급 중단 | | ● | ● | ● |
| 승인 처리 | | | ● | ● |
| 권한 관리 | | | | ● |
| 게이트 기본값 변경 | | | | ● |

긴급 중단을 배포 담당자도 실행할 수 있게 한 이유는 안전 조치의 지연을 막기 위해서입니다.

## API로 같은 작업 수행하기

콘솔에서 하는 대부분의 작업은 API로도 가능합니다. CI 파이프라인에서 캠페인을 자동 생성하는 경우 [VELA Vehicle API · OTA 배포 제어하기](../api/ota.md)를 참고하십시오.
