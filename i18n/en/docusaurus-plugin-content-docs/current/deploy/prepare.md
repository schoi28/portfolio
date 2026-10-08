---
title: Prepare a deployment
doc_type: 절차
sidebar_label: 3. Prepare a deployment
---

# Prepare a deployment

This chapter covers the four things you decide before creating a campaign: **uploading the package and checking its signature, setting the compatibility rules, choosing the target vehicles, and setting the installation preconditions.** It takes between 30 minutes and an hour in total.

A wrong decision here is hard to undo once the deployment has started. Before you start one, work through **every item** in [Check before you deploy](#check-before-you-deploy).

## Upload a package and verify its signature

### Upload

:::info[Caution]
End users read the release notes. Do not put internal issue numbers or code names in them.
:::

1. Select **Packages > New package**.
2. Upload the `.vpk` file. Files up to 4 GB are supported.
3. Enter the release notes. What you enter here appears in the vehicle owner's app.

### Signature verification

This runs automatically as soon as the upload finishes. A signature is verified in two places.

| Stage | What is verified | On failure |
| --- | --- | --- |
| First, in the console | That the package is signed with a registered build key | The upload is rejected |
| Second, on the vehicle | The vehicle verifies again immediately before installing | The installation fails on that vehicle only |

The second check means a package that passed in the console can still fail on a vehicle. It is there to catch corruption during transfer.

## Define the compatibility rules

Define which vehicle states can receive this package. These conditions attach to the package itself, separately from the target group.

| Rule | Example | Behaviour when unmet |
| --- | --- | --- |
| Minimum current version | `>= 2026.6.0` | Excluded from the target |
| Maximum current version | `< 2026.9.0` | Excluded from the target |
| Hardware revision | `rev_b` or above | Excluded from the target |
| Prerequisite package | `pkg_2026_8_1` must be installed | Held in a waiting state |

Use a **prerequisite package** when installations have to happen in order. For a software update that needs component firmware in place first, for example, name the firmware package as the prerequisite. A vehicle that does not meet the condition is not a failure. It moves to a **waiting** state and proceeds on its own once the prerequisite is installed.

:::warning[Warning]
Without compatibility rules, vehicles on every version are targeted. An installation that jumps straight from an old version to the latest one is very likely an untested path.
:::

## Create a target group

### Combine the conditions

Conditions combine with AND. The more you specify, the narrower the target.

| Condition | Example value | Note |
| --- | --- | --- |
| Model | `Hanul EV Sedan` | Required |
| Current version | `2026.8.2` | Several values can be given |
| Region | `KR`, `US` | Separate them where regulations differ |
| Hardware configuration | `sensor_kit: installed` | For targeting validation vehicles only |
| Vehicle list | VINs entered directly | For testing against a small number of vehicles |

### Exclusion list

Use this when particular vehicles have to be kept out of the target.

1. On the target group editing screen, select **Exclusion list**.
2. Enter VINs, or upload a CSV.

The exclusion list takes priority over the conditions. A vehicle on the list is not deployed to even if it matches the conditions. Use it to keep out vehicles under incident investigation or in special use.

### Check the size of the target

**Preview** shows the number of target vehicles as things stand. That number changes over time, because a vehicle whose version changes through another campaign falls outside the conditions.

## Set the preconditions

These are the states a vehicle must be in before it can start installing.

| Precondition | Default | Adjustable range |
| --- | --- | --- |
| Parked | Required | Cannot be turned off |
| Drive battery level | 30% or above | 20% to 60% |
| Auxiliary battery level | 40% or above | 30% to 70% |
| Network | Required | Cannot be turned off |
| Ignition off | Required for zonal ECUs only | Set automatically by what you deploy to |
| Permitted installation window | No limit | A window can be specified |

### Permitted installation window

You can restrict installations to overnight hours.

- The judgement uses the vehicle's local time.
- A narrow window lengthens the time a deployment takes to complete.
- A campaign that takes longer is one you have to watch for longer.

:::note[Note]
The stricter the preconditions, the lower the failure rate and the slower the deployment. For an urgent security patch, lower the battery conditions. For a large feature update, raise them.
:::

## Check before you deploy

Confirm the following before you press the start button.

| What to check | How to check |
| --- | --- |
| The package passed signature verification | The package state is **Verified** |
| The release notes suit a user | No internal terms |
| The target size matches what you expected | The preview number |
| The exclusion list has been applied | The number of entries in the list |
| Rollout stage 1 is small enough | 1% or below recommended |
| The gate criteria are set | The success rate and error rate values |
| A rollback package is ready | The previous version package is in the **Verified** state |

The last item matters most. A rollback can only run if the previous version package exists.

## Next

- For operating a deployment once it has started, see [Run a rollout](./rollout.md).
