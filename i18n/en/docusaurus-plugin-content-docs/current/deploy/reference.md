---
title: Browse the reference
doc_type: 레퍼런스
sidebar_label: 7. Browse the reference
---

# Browse the reference

The chapter to look at when you need the meaning of a state value or a code on screen. It holds **campaign state values, per-vehicle deployment state values, the 15 failure codes, and the permission matrix.**

Definitions of terms are in [Look up a term](./glossary.md), and what to do about each code is in [Respond to an incident](./incident-response.md#read-failure-codes).

## Campaign state values

![The paths a campaign state can take](/img/deploy-campaign-states.svg)

:::warning[Warning]
`aborted` is entered only by stopping urgently, and it cannot be undone.
:::

| State | Meaning | States it can move to |
| --- | --- | --- |
| `created` | Created, not yet started | `in_progress`, or deletion |
| `in_progress` | The deployment is running | `paused_by_gate`, `paused_by_user`, `completed`, `aborted` |
| `paused_by_gate` | Paused automatically for falling short of the gate criteria | `in_progress` on resuming, `rolled_back`, `aborted` |
| `paused_by_user` | Paused by an operator | `in_progress`, `rolled_back`, `aborted` |
| `completed` | Every stage has finished | `rolled_back` |
| `rolled_back` | Restored to the previous version | None |
| `aborted` | Stopped urgently | None |

`rolled_back` and `aborted` are terminal states. They cannot be started again.

## Per-vehicle deployment state values

| State | Meaning |
| --- | --- |
| `not_targeted` | Does not match the target group conditions |
| `excluded` | On the exclusion list |
| `waiting_prerequisite` | Waiting for a prerequisite package to be installed |
| `pending_precondition` | A precondition is unmet, such as being parked or battery level |
| `downloading` | Downloading |
| `ready_to_install` | The download has finished, waiting for a moment to install |
| `installing` | Installing |
| `installed` | Installed |
| `failed` | The installation failed |
| `rolled_back` | Restored to the previous version |

## List of failure codes

### Precondition codes, retried automatically

| Code | Meaning |
| --- | --- |
| `E_PRECOND_BATTERY` | The drive battery level is too low |
| `E_PRECOND_AUX_BATTERY` | The auxiliary battery level is too low |
| `E_PRECOND_PARKED` | The vehicle is not parked |
| `E_PRECOND_IGNITION` | The ignition is on, for a zonal ECU target |
| `E_PRECOND_TIME_WINDOW` | Outside the permitted window |

### Communication codes, retried automatically

| Code | Meaning |
| --- | --- |
| `E_DOWNLOAD_TIMEOUT` | The download timed out |
| `E_DOWNLOAD_INTERRUPTED` | The connection dropped during the download |
| `E_VEHICLE_UNREACHABLE` | The vehicle cannot be reached |

### Codes to investigate, not retried automatically

| Code | Meaning | Priority |
| --- | --- | --- |
| `E_SIGNATURE_INVALID` | Signature verification failed | High |
| `E_BOOT_FAILED` | The vehicle failed to boot after installing. Rolled back automatically | Highest |
| `E_INCOMPATIBLE_HW` | Incompatible hardware | High |
| `E_INSUFFICIENT_STORAGE` | Not enough storage space | Medium |
| `E_INSTALL_ABORTED` | The installation was interrupted | Medium |
| `E_ECU_NO_RESPONSE` | A zonal ECU is not responding | High |
| `E_UNKNOWN` | An unclassified error | High |

## Permission matrix

| Action | Viewer | Deployment operator | Release manager | Administrator |
| --- | --- | --- | --- | --- |
| View campaigns | ● | ● | ● | ● |
| View the audit log | ● | ● | ● | ● |
| Upload a package | | ● | ● | ● |
| Create and edit target groups | | ● | ● | ● |
| Create a campaign | | ● | ● | ● |
| Start a validation deployment | | ● | ● | ● |
| Start a production deployment | | | ● | ● |
| Pause | | ● | ● | ● |
| Resume after a gate pause | | | ● | ● |
| Run a rollback | | | ● | ● |
| Stop urgently | | ● | ● | ● |
| Handle approvals | | | ● | ● |
| Manage permissions | | | | ● |
| Change gate defaults | | | | ● |

A deployment operator can stop a deployment urgently so that a safety action is never delayed.

## Do the same work through the API

Most of what you do in the console can also be done through the API. If a CI pipeline creates campaigns automatically, see [VELA Vehicle API: Control OTA deployment](../api/ota.md).
