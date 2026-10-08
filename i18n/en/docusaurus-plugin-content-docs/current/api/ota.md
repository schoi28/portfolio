---
title: Control OTA deployment
doc_type: 절차
sidebar_label: 7. Control OTA deployment
---

# Control OTA deployment

Software deployment is normally carried out by an operator in [the VELA Deploy console](../deploy/intro.md), but you can also create campaigns and read per-vehicle deployment state through this API. Use it when a CI pipeline creates campaigns automatically. It needs the `write:campaigns` and `read:campaigns` scopes.

## Understand what you are deploying to

Before you create a campaign, you need to know what you are deploying to. VELA OS software, which runs on the CCU, and zonal ECU firmware are handled differently.

| | CCU software | Zonal ECU firmware |
| --- | --- | --- |
| When it applies | On reboot after the download, by switching the A/B partition | Only when the vehicle is fully stopped with the ignition off |
| Using the vehicle while it applies | The previous version works normally until the reboot | The functions in that zone pause while it applies |
| Rollback | Switches back to the previous partition immediately | Reapplies the previous firmware image |
| `target_type` value | `ccu` | `zone_ecu` |

Setting `target_type` when you create the campaign applies this difference for you.

## Create a campaign

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

A campaign does not start on its own once created. Start it explicitly, from the console or through the API.

```bash
curl -X POST https://api.vela.example.com/v1/campaigns/cmp_9a1b2c/start \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

How an organisation handles package upload and signing, compatibility rules, and gate criteria is covered in [the VELA Deploy operations guide](../deploy/intro.md). This API document covers only how to use the endpoints.

## Read deployment state for one vehicle

Check which stage a particular vehicle has reached in a particular campaign.

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

| `state` value | Meaning |
| --- | --- |
| `not_targeted` | This vehicle is not in the campaign's target group |
| `pending_precondition` | Targeted, but a precondition is unmet, such as the vehicle not being parked |
| `downloading` | The package is downloading |
| `installing` | Installing |
| `installed` | Installed |
| `failed` | The installation failed. The cause is in the `failure_code` field |
| `rolled_back` | Restored to the previous version after a failure |

## Read overall campaign progress

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

If `summary.success_rate` falls below the `gate.min_success_rate` set when the campaign was created, the campaign does not advance to the next stage and moves to `paused_by_gate`.

## Next

- For what to do when a deployment fails, and the criteria operators judge by, see [the VELA Deploy operations guide](../deploy/intro.md).
- To receive deployment state changes as they happen, subscribe to the `campaign.stage_changed` event in [Receive events through webhooks](./webhooks.md).
