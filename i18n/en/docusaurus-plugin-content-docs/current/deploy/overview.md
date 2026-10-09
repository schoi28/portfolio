---
title: What VELA Deploy is
doc_type: 개념
sidebar_label: 1. What VELA Deploy is
---

# What VELA Deploy is

VELA Deploy is the operations console for releasing vehicle software **in stages rather than all at once.**

Deploying vehicle software is not like an app store update. Bad software can leave a vehicle immobile or unable to start, and undoing it can take days. So rather than going straight to the whole fleet, you **deploy to a small group first, check the result, and then widen the rollout.**

![How a deployment is widened from one percent to one hundred percent](/img/deploy-staged-rollout.en.svg)

:::note[Note]
A gate between each stage decides automatically whether to advance, based on success rate and error rate.
:::

So that nobody has to make that judgement by eye every time, a **gate** sits between stages and decides automatically from the success rate and the error rate.

## Core concepts

Every decision in a deployment rests on the five concepts below.

| Concept | Description |
| --- | --- |
| **Package** | The bundle of software installed on a vehicle. Its signature must be verified before you can deploy it |
| **Campaign** | One unit of deploying a single package to a defined set of vehicles |
| **Target group** | The conditions that define which vehicles a deployment goes to: model, hardware configuration, and current version |
| **Rollout stage** | The order in which the audience widens. For example 1%, then 10%, then 100% |
| **Gate** | The criteria that decide whether to advance to the next stage. Defined by success rate and error rate |

The five relate to each other as follows.

![How a package and a target group form a campaign that runs as rollout stages](/img/deploy-concept-map.en.svg)

**A package and a target group exist before a campaign does.** You can create several campaigns that send the same package to different target groups, and equally you can send several packages to the same target group one after another.

## The validation and production environments

VELA Deploy has two environments. Switch between them with the environment selector at the top of the same console.

| Environment | Vehicles it covers | What it is for |
| --- | --- | --- |
| **Validation** | The internal validation fleet | Running a campaign configuration for real and checking it |
| **Production** | Vehicles sold to customers | Carrying out real deployments |

A **production deployment** means a deployment started in the production environment. Because it affects customer vehicles directly, it needs approval, unlike the validation environment, and its audit records are kept for longer.

:::warning[Warning]
Always run a new campaign in the validation environment first. Starting straight in production applies any configuration mistake directly to customer vehicles.
:::

## How a deployment proceeds

![The whole flow from uploading a package to finishing a deployment](/img/deploy-flow.en.svg)

| Stage | What you do | Chapter |
| --- | --- | --- |
| Prepare | Upload the package, verify its signature, and decide who receives it | [3. Prepare a deployment](./prepare.md) |
| Operate | Advance the stages, watch the metrics, and judge the gates | [4. Run a rollout](./rollout.md) |
| Respond | Pause or roll back when something goes wrong | [5. Respond to an incident](./incident-response.md) |
| Record | Keep approvals and change history as evidence | [6. Manage audit records](./audit.md) |

## What happens on the vehicle

Pressing "Deploy" in the console does not install the software straight away.

| State shown in the console | What is actually happening on the vehicle |
| --- | --- |
| Deploying | The vehicle is downloading the files. This continues while driving |
| Waiting to install | The download has finished and **the vehicle is waiting to be parked** |
| Installing | Being applied to the vehicle. The vehicle cannot be used during this time |
| Complete | Applied, and the vehicle has reported the result |

:::info[Caution]
A long wait in the waiting-to-install state is usually not a failure. The vehicle is not parked, or its battery level is too low. Preconditions are set in [Prepare a deployment](./prepare.md#set-the-preconditions).
:::

What the vehicle owner sees is in [VELA Drive app: Update the software](../app/software-update.md).

## What you can find in this document

| What you want to do | Where to look |
| --- | --- |
| Run a deployment end to end in the validation environment | [2. Create your first campaign](./first-campaign.md) |
| Upload a package and check its signature | [3. Prepare a deployment](./prepare.md#upload-a-package-and-verify-its-signature) |
| Set the conditions for which vehicles receive it | [3. Prepare a deployment](./prepare.md#create-a-target-group) |
| Specify the installation window and battery conditions | [3. Prepare a deployment](./prepare.md#set-the-preconditions) |
| Widen the scope from 1% to 10% to 100% | [4. Run a rollout](./rollout.md) |
| Decide the criteria for advancing a stage | [4. Run a rollout](./rollout.md#set-the-gate-criteria) |
| Judge whether to pause or roll back when metrics worsen | [5. Respond to an incident](./incident-response.md) |
| Return to the previous version | [5. Respond to an incident](./incident-response.md#perform-a-rollback) |
| Get sign-off before a deployment | [6. Manage audit records](./audit.md#get-approval-before-a-deployment) |
| Submit evidence of who did what and when | [6. Manage audit records](./audit.md#read-the-audit-log) |
| Look up a state value or failure code on screen | [7. Browse the reference](./reference.md) |
| Look up a term you do not know | [8. Look up a term](./glossary.md) |

## Next

If this is your first time, start with [Create your first campaign](./first-campaign.md). It is a tutorial that takes one deployment from start to finish in the validation environment.
