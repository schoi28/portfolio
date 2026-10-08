---
title: Create your first campaign
doc_type: 튜토리얼
sidebar_label: 2. Create your first campaign
---

# Create your first campaign

Build one campaign from start to finish in the validation environment. It takes about 30 minutes. Once you finish this chapter you are ready to understand the individual settings in the chapters that follow.

:::note[Note]
Carry out this procedure in the **validation environment**. The vehicles it covers are the internal validation fleet, not real customer vehicles. Do not create your first campaign in the production environment.
:::

## Before you start

| What you need | How to check |
| --- | --- |
| Deployment operator permissions | Look for `campaign.create` under **Settings > My permissions** |
| A signed package | The `.vpk` file produced by your build system |
| Details of the target model | The model code and its current software version |

## 1. Upload the package

1. Select **Packages > New package**.
2. Upload the `.vpk` file.
3. Signature verification runs automatically once the upload finishes.

If verification passes, the package state changes to **Verified**. If it fails, you cannot deploy the package.

| What is verified | Cause of a failure |
| --- | --- |
| Signature validity | The build system's signing key is not registered |
| Hardware match | The package was built for different hardware |
| Version format | The version string does not follow the rules |

## 2. Create a target group

Define the conditions for which vehicles receive the deployment.

1. Select **Target groups > New group**.
2. Specify the conditions.

   | Condition | Example value | Description |
   | --- | --- | --- |
   | Model | `Hanul EV Sedan` | The model to target |
   | Current version | `2026.8.2` | Only vehicles on this version |
   | Hardware configuration | `sensor_kit: none` | Whether a sensor kit is fitted |
   | Region | `KR` | The sales region |

3. Select **Preview** to see how many vehicles are covered.

:::info[Caution]
If the preview number is larger than you expected, the conditions are too broad. In particular, leaving the current version condition empty targets every version.
:::

## 3. Create the campaign

1. Select **Campaigns > New campaign**.
2. Select the package from step 1 and the target group from step 2.
3. Select what you are deploying to.

   | Type | When to choose it |
   | --- | --- |
   | Central computing unit | A VELA OS software update |
   | Zonal ECU | A component firmware update, for the doors or climate control for example |

4. Set the rollout stages. Use the defaults below for your first campaign.

   | Stage | Percentage |
   | --- | --- |
   | Stage 1 | 1% |
   | Stage 2 | 10% |
   | Stage 3 | 100% |

5. Set the gate criteria. The defaults are a success rate of 98% or above and an error rate of 2% or below.
6. Select **Save**.

Once the campaign is saved, its state changes to **Created**.

## 4. Start the deployment

1. On the campaign detail screen, select **Start deployment**.
2. In the confirmation dialog, check the number of target vehicles and the first stage percentage again.
3. Select **Start**.

Stage 1 begins. A target vehicle starts downloading as soon as it meets the conditions, and the installation proceeds once the vehicle is parked.

## 5. Check the progress

You can follow it in real time on the campaign detail screen.

| Metric | Meaning |
| --- | --- |
| Targeted | The number of vehicles covered by this stage |
| Installed | The number of vehicles that have finished installing |
| In progress | The number of vehicles downloading or installing |
| Failed | The number of vehicles where the installation failed |
| Success rate | Installed ÷ (installed + failed) |

Watch stage 1 for **at least 48 hours**. While you do, check the progress, and if a vehicle sits in **Waiting to install** for a long time, confirm for yourself that it meets the preconditions below.

| Precondition | Default |
| --- | --- |
| Parked, meaning gear P | Required |
| Drive battery level | 30% or above |
| Auxiliary battery level | 40% or above |
| Able to communicate | Required |

How to change these conditions is in [Prepare a deployment: Set the preconditions](./prepare.md#set-the-preconditions), and the reason for 48 hours is in [Run a rollout: Waiting time per stage](./rollout.md#waiting-time-per-stage).

## 6. Advance to the next stage

Once stage 1 ends, the gate judges it automatically.

- If it meets the criteria, the campaign advances to stage 2 on its own.
- If it falls short, the campaign moves to **Paused by gate** and waits for an operator's decision.

What to check in the paused-by-gate state, and how to decide, is covered in [Respond to an incident](./incident-response.md).

## Summary

You have now done the following.

1. Uploaded a package and verified its signature.
2. Narrowed the target vehicles with a target group.
3. Created a campaign with rollout stages and gate criteria.
4. Started the deployment and checked its progress.

How to refine each of these settings to production standard continues in [Prepare a deployment](./prepare.md).
