---
title: Run a rollout
doc_type: 개념 + 절차
sidebar_label: 4. Run a rollout
---

# Run a rollout

This chapter covers what happens after a deployment starts: **planning how to widen it, setting the gate criteria, reading the dashboard, pausing and resuming, and closing the campaign.** Because each stage carries a minimum observation period, running one campaign to the end usually takes between 3 and 7 days.

## Plan how to widen the rollout

![How a rollout widens from one percent to one hundred percent](/img/deploy-rollout-stages.en.svg)

:::note[Note]
Each gate judges the success rate and the error rate. If they fall short of the criteria, the campaign does not advance and pauses automatically.
:::

The reason for not deploying to the whole fleet at once is to limit how many vehicles are affected when you find a problem.

### Recommended stages by type

| Deployment type | Recommended stages | Why |
| --- | --- | --- |
| Feature update | 1%, 10%, 50%, 100% | You need time to see how users react |
| Bug fix | 5%, 50%, 100% | The change is already validated, so move quickly |
| Urgent security patch | 10%, 100% | Reducing the exposure window comes first |
| Component firmware | 0.5%, 5%, 25%, 100% | The hardest thing to undo |

:::note[Note]
Component firmware is treated most cautiously because zonal ECU firmware applies only while the vehicle is fully stopped, and takes a long time to undo. There is more on this in [Core concepts in chapter 1](./overview.md#core-concepts).
:::

### Waiting time per stage

We recommend a minimum observation period for each stage.

| Stage | Minimum observation period | Reasoning |
| --- | --- | --- |
| Stage 1 | 48 hours | Installation happens after a vehicle parks. Looking sooner leaves many vehicles yet to install, which makes the success rate look lower than it is |
| Middle stages | 24 hours | To catch problems that surface late |
| Final stage | None | Keep watching until it completes |

## Set the gate criteria

A gate is the condition that decides automatically whether to advance to the next stage.

| Metric | How it is calculated | Recommended criterion |
| --- | --- | --- |
| Success rate | Installed ÷ (installed + failed) | 98% or above |
| Error rate | Failed ÷ targeted | 2% or below |
| Boot failure rate | Boot failures after installing ÷ installed | 0.1% or below |
| Rollback rate | Automatic rollbacks ÷ installed | 0.5% or below |

:::note[Note]
The numbers above are examples. Set them against your organisation's risk tolerance, and it is normal to set them differently per deployment type. Component firmware takes a stricter boot failure criterion.
:::

### Minimum sample size

Judging on a ratio alone distorts the picture when the target is small. One failure out of 10 vehicles gives a success rate of 90%, which reads as falling short.

- A gate also carries a **minimum number of completions**. The default is 50.
- While completions are below the minimum sample, the gate holds its judgement and waits.

## Read the monitoring dashboard

Selecting a campaign name in the **Campaigns** list opens its detail screen. Every task in this chapter and in [Respond to an incident](./incident-response.md) is carried out on that screen.

| Area | How to read it |
| --- | --- |
| Progress graph | Cumulative completions over time. A sudden change in slope needs investigating |
| State distribution | The proportion downloading, waiting to install, complete, and failed |
| Failure code distribution | Which causes are common. A concentration on one code points to a shared cause |
| Distribution by region | Whether failures cluster in one region |

### Signals to watch for

| Signal | Possible cause |
| --- | --- |
| Waiting to install is not decreasing | The preconditions are too strict |
| Stuck at the download | A connectivity problem relative to the package size |
| Concentration on one failure code | A problem with the package or the compatibility rules |
| Boot failures rising slowly | A conflict with a particular hardware revision |

The last item is the most dangerous. The ratio is low, but the absolute number grows as the target widens. Break the figures down by hardware revision before you widen the stage.

## Pause and resume

### Pause

:::info[Caution]
A pause does not stop installations already in progress. If you need everything to stop at once, use [Stop a deployment urgently](./incident-response.md#stop-a-deployment-urgently).
:::

1. On the campaign detail screen, select **Pause**.
2. Enter a reason. It is recorded in the audit log.

While paused, no new vehicles begin the deployment. Vehicles already downloading or installing complete as normal.

### Resume

1. Select **Resume**.
2. Select the stage to resume at. You can continue at the same stage or return to an earlier one.

Resuming a campaign that a gate paused requires a reason. Why the campaign continued despite failing the gate is the key material for any later analysis.

## Close a campaign

Once every stage completes, the state changes to **Complete**. That does not mean every target vehicle has finished installing.

| Situation | How it is handled |
| --- | --- |
| A vehicle that has not parked for a long time | Stays in the waiting state until it meets the conditions |
| A vehicle that cannot communicate | Retried for up to 90 days |
| After 90 days | Removed from the target automatically. Handled in the next campaign |

You can download the **list of incomplete vehicles** and use it as the target group for your next campaign.

## Next

- If a gate paused the campaign, or failures occurred, see [Respond to an incident](./incident-response.md).
