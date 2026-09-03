---
title: OTA
sidebar_label: 7. OTA
---

# OTA

소프트웨어 배포는 보통 [VELA Deploy 콘솔](../deploy/intro.md)에서 운영자가 수행하지만, 이 API로 캠페인을 생성하고 차량별 배포 상태를 조회할 수도 있습니다. CI 파이프라인에서 자동으로 캠페인을 만드는 경우에 사용합니다. `write:campaigns`, `read:campaigns` 스코프가 필요합니다.

## 배포 대상: CCU와 존 ECU

캠페인을 만들기 전에 배포 대상을 이해해야 합니다. VELA OS 소프트웨어(CCU에서 구동)와 존 ECU 펌웨어는 처리 방식이 다릅니다.

| | CCU 소프트웨어 | 존 ECU 펌웨어 |
| --- | --- | --- |
| 적용 시점 | 다운로드 후 재부팅 시 (A/B 파티션 전환) | 차량이 완전히 정지하고 시동이 꺼진 상태에서만 |
| 적용 중 차량 사용 | 재부팅 전까지 이전 버전으로 정상 사용 가능 | 적용 중 해당 존 기능 일시 정지 |
| 롤백 | 이전 파티션으로 즉시 전환 | 이전 펌웨어 이미지로 재적용 |
| `target_type` 값 | `ccu` | `zone_ecu` |

캠페인 생성 시 `target_type`을 지정하면 이 차이가 자동으로 반영됩니다.

## 캠페인 생성

```bash
curl -X POST https://api.vela.example.com/v1/campaigns \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "package_id": "pkg_2026_9_1",
    "target_type": "ccu",
    "target_group": {
      "model": "Hanul Motors EV Sedan",
      "software_version_before": "2026.8.2"
    },
    "rollout_stages": [
      { "percentage": 1 },
      { "percentage": 10 },
      { "percentage": 100 }
    ],
    "gate": {
      "min_success_rate": 0.98,
      "max_error_rate": 0.02
    }
  }'
```

```json
{
  "campaign_id": "cmp_9a1b2c",
  "status": "created",
  "current_stage": 0
}
```

캠페인은 생성 직후 자동으로 시작되지 않습니다. 콘솔 또는 API로 명시적으로 시작해야 합니다.

```bash
curl -X POST https://api.vela.example.com/v1/campaigns/cmp_9a1b2c/start \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

패키지 업로드와 서명, 호환성 규칙, 게이트 기준을 조직 차원에서 어떻게 운영하는지는 [VELA Deploy 운영 가이드](../deploy/intro.md)에서 다룹니다. 이 API 문서는 엔드포인트 사용법만 다룹니다.

## 차량별 배포 상태 조회

특정 차량이 특정 캠페인에서 어느 단계인지 확인합니다.

```bash
curl https://api.vela.example.com/v1/vehicles/{vehicle_id}/campaigns/cmp_9a1b2c \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "campaign_id": "cmp_9a1b2c",
  "vehicle_id": "veh_4471",
  "state": "installed",
  "attempts": 1,
  "installed_at": "2026-09-03T03:10:00Z"
}
```

| `state` 값 | 의미 |
| --- | --- |
| `not_targeted` | 이 차량은 캠페인 대상 그룹에 속하지 않음 |
| `pending_precondition` | 대상이지만 사전 조건 미충족 (주차 상태 등) |
| `downloading` | 패키지 다운로드 중 |
| `installing` | 설치 중 |
| `installed` | 설치 완료 |
| `failed` | 설치 실패. `failure_code` 필드에 원인 |
| `rolled_back` | 실패 후 이전 버전으로 복구됨 |

## 캠페인 전체 진행률 조회

```bash
curl https://api.vela.example.com/v1/campaigns/cmp_9a1b2c \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "campaign_id": "cmp_9a1b2c",
  "status": "in_progress",
  "current_stage": 1,
  "stage_percentage": 10,
  "summary": {
    "targeted": 4200,
    "installed": 398,
    "failed": 4,
    "success_rate": 0.99
  }
}
```

`summary.success_rate`가 캠페인 생성 시 지정한 `gate.min_success_rate`를 밑돌면 다음 단계로 자동 진행되지 않고 `paused_by_gate` 상태가 됩니다.

## 다음 단계

- 배포 실패 시 대응 절차와 운영 판단 기준은 [VELA Deploy 운영 가이드](../deploy/intro.md)를 참고하십시오.
- 배포 상태 변화를 실시간으로 받으려면 [웹훅](./webhooks.md)의 `campaign.stage_changed` 이벤트를 구독하십시오.
