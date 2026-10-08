---
title: Respond to an incident
doc_type: 개념 + 절차
sidebar_label: 5. Respond to an incident
---

# Respond to an incident

The procedures for when something goes wrong during a deployment: **deciding whether to pause or roll back, rolling back or stopping urgently, reading failure codes, and recording a post-incident analysis.** It is written to make sense without the earlier chapters, so you can come straight here when you are in a hurry.

:::note[Note]
This chapter re-explains the concepts it needs so that it stands on its own. During an incident there is no time to read a document from the beginning.
:::

## Decide whether to pause or roll back

There are three options. They differ in how far their effects reach and in what they cost to undo.

| Action | What it does | Vehicles already installed | When to use it |
| --- | --- | --- | --- |
| Pause | Stops new deployments only | Left as they are | When you need to investigate a cause |
| Roll back | Returns vehicles to the previous version | Returned | When the installed version is confirmed to have a problem |
| Urgent stop | Stops installations in progress immediately | Left as they are | When you suspect a safety problem |

### How to decide

| Situation | Recommended action |
| --- | --- |
| The failure rate is high but installed vehicles are fine | Pause, then analyse the failure codes |
| Functional faults reported on installed vehicles | Roll back |
| Driving-related faults reported on installed vehicles | Stop urgently, then roll back |
| You do not know the cause and the impact is growing | Stop urgently |

If you cannot decide, choose to stop. A stopped deployment can be started again, but a widened impact takes time to undo.

## Perform a rollback

### Check first

:::warning[Warning]
A rollback can only run if the previous version package is registered in the verified state. If it is not registered, you cannot start one.
:::

1. In the **Packages** list, confirm the previous version is in the **Verified** state.
2. Decide the scope of the rollback.

   | Scope | Description |
   | --- | --- |
   | This whole campaign | Every vehicle installed by this campaign |
   | A particular stage | Only vehicles installed in stage 2, for example |
   | A list of vehicles | Specified by a list of VINs |

### Which version a rollback returns to

It returns vehicles to **the package version the operator chooses.** It does not rewind to the state at an earlier stage.

Rolling back during stage 2, for example, does not return things to how they were when stage 1 ended. **The package you nominate is installed afresh on every target vehicle.** A rollback is a deployment in its own right, and you choose the version to return to yourself.

| Version you can choose | Condition |
| --- | --- |
| The immediately previous version | The most common choice |
| An older version | The package must still be in the **Verified** state |
| A different version per vehicle | Not possible. Every vehicle in the rollback receives the same version |

### Run it

:::info[Caution]
Do not resume the original campaign until the rollback finishes. Installing and rolling back in turn on the same vehicle makes its state impossible to follow.
:::

1. On the campaign detail screen, select **Roll back**.
2. Select the previous version package.
3. Select the rollback scope.
4. Enter a reason. This is required.
5. Nominate an approver. Depending on your organisation's settings, two approvals may be needed.
6. Select **Start rollback**.

### How long a rollback takes

| Target | Time taken | Why |
| --- | --- | --- |
| Central computing unit | 5 to 10 minutes per vehicle | Switches to the previous partition and reboots |
| Zonal ECU | 30 to 60 minutes per vehicle | The previous firmware has to be written again |

A rollback requires the same preconditions as an installation. It proceeds once the vehicle is parked, so completing it across the fleet takes a period similar to the deployment itself.

## Stop a deployment urgently

This is the strongest action. It stops downloads and installations in progress immediately.

:::warning[Warning]
A campaign stopped urgently cannot be resumed. To deploy again you have to create a new campaign. Vehicles that were mid-installation are restored to the previous version automatically.
:::

1. On the campaign detail screen, select **Urgent stop**.
2. Type the confirmation phrase.
3. Enter a reason.

An urgent stop propagates immediately, but a vehicle that cannot communicate receives it the next time it connects.

## Read failure codes

### Failures on the vehicle

| Code | Meaning | What to do |
| --- | --- | --- |
| `E_PRECOND_BATTERY` | The battery level is too low | Normal. Retried automatically once the condition is met |
| `E_PRECOND_PARKED` | The vehicle is not parked | Normal. Retried automatically |
| `E_DOWNLOAD_TIMEOUT` | The download timed out | A connectivity problem. Retried automatically |
| `E_SIGNATURE_INVALID` | Signature verification failed | Needs investigating. Suspect corruption during transfer |
| `E_INSTALL_ABORTED` | The installation was interrupted | The user may have switched the ignition on |
| `E_BOOT_FAILED` | The vehicle failed to boot after installing | **Investigate immediately.** Rolled back automatically |
| `E_INCOMPATIBLE_HW` | Incompatible hardware | Review the compatibility rules |

`E_PRECOND_*` and `E_DOWNLOAD_TIMEOUT` are normal failures. They count towards the failure rate but are not something to investigate. When judging a gate, look at the **effective failure rate** with these excluded as well.

The table above covers only the codes that come up often. **All 15 codes** are in [Browse the reference: list of failure codes](./reference.md#list-of-failure-codes).

### Codes that need investigating

Investigate `E_SIGNATURE_INVALID`, `E_BOOT_FAILED`, and `E_INCOMPATIBLE_HW` as soon as they occur, however low the rate.

## Write a post-incident report

Write this once a campaign has closed or been stopped.

1. On the campaign detail screen, select **Generate post-incident report**.
2. Check the fields that are filled in for you.

   | Collected automatically | Contents |
   | --- | --- |
   | Timeline | The times of the start, stage transitions, pauses, and rollbacks |
   | Metrics | Success rate per stage and the failure code distribution |
   | Action history | Who did what and when |
   | Recorded reasons | The reasons entered when pausing, resuming, or rolling back |

3. Write the following three yourself.

   - What the problem was
   - Why it was not found earlier
   - What you will change next time

4. Select **Finalise**. A finalised report cannot be edited and forms part of the audit record.

## Next

- For the approval procedure and record retention, see [Manage audit records](./audit.md).
- For the full list of codes and state values, see [Browse the reference](./reference.md).
