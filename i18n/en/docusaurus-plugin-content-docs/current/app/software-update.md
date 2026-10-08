---
title: Update the software
doc_type: 개념 + 절차
sidebar_label: 6. Update the software
---

# Update the software

You can update your vehicle's software through the app. An alert arrives when new software is ready, and you can either choose when to install it or schedule it.

## Understand the update alerts

When new software is ready, it appears in the app's alerts area.

![The states an update moves through](/img/app-update-flow.svg)

:::note[Note]
The download continues while you drive. Only the installation requires the vehicle to be parked.
:::

| State | Meaning | What you need to do |
| --- | --- | --- |
| Downloading | The vehicle is downloading the files | Nothing. It continues while you drive |
| Waiting to install | The download has finished and it is waiting for a moment to install | Park, then start the installation |
| Installing | Being applied to the vehicle | You cannot use the vehicle |
| Complete | Applied | Nothing |

### Types of update

| Type | Description | Installation time |
| --- | --- | --- |
| Standard | Improvements and bug fixes | 15 to 30 minutes |
| Required | Safety or security related. Installs automatically after a set period | 20 to 40 minutes |
| Component firmware | Control software for individual components such as the doors or air conditioning | 30 to 60 minutes |

:::note[Note]
A component firmware update runs only while the vehicle is fully stopped with the ignition off. It takes longer than the other types, so it is best scheduled for a time when you will not need the vehicle for a while.
:::

## Schedule and install an update

### Install now

1. Select **Software update** in the alerts.
2. Read what is changing.
3. Select **Install now**.

Every condition below has to be met before an installation starts.

| Condition | Why |
| --- | --- |
| Parked, meaning gear P | The vehicle cannot be moved during the installation |
| Battery level at 30% or above | Running short of power during the installation makes it fail |
| Somewhere it can get a signal | The result has to be reported |

### Schedule it

You can have it install automatically overnight.

1. On the update screen, select **Scheduled installation**.
2. Set the time to install.

If the conditions are unmet at the scheduled time, the installation is deferred and tried again at the same time the next day.

## While the installation runs

:::info[Caution]
Do not start or move the vehicle during an installation. An interrupted installation is restored to the previous version automatically, but you cannot use the vehicle while that happens.
:::

The following are restricted during an installation.

- Remote commands do not run.
- A cabin temperature schedule does not run.
- You cannot start the vehicle with your digital key.

Unlocking the doors with the physical smart key works throughout.

If an installation fails, the vehicle returns to the previous version on its own and you can use it as normal. For what to do about each alert message, see [Troubleshooting](./troubleshooting.md#my-update-failed).

## Check earlier versions

**Settings > Software information** shows your current version and the recent update history. Selecting an entry shows what that update changed.

## Next

- For service alerts, see [Check when service is due](./maintenance.md).
