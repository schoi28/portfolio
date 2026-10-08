---
title: Manage audit records
doc_type: 절차
sidebar_label: 6. Manage audit records
---

# Manage audit records

This chapter covers how to keep deployment history as evidence and how to submit it. It explains, in order, **getting approval before a deployment, reading and exporting the audit log, retaining release records, and preparing material for regulators.**

Every change made in the console is recorded automatically. That covers creating, starting, pausing, resuming, and closing a campaign, package uploads and signature verification results, changes to target group conditions, rollbacks from request through to completion, changes to user permissions, and changes to gate and approval policy settings. Each record carries **who, when, what, and why.**

## Get approval before a deployment

Depending on your organisation's settings, certain actions need approval.

| Action | Default setting | Adjustable |
| --- | --- | --- |
| Creating a campaign | No approval needed | Can be changed to require one |
| Starting a production deployment | One approver | Can be raised to two |
| Resuming after a gate pause | One approver | Required. Cannot be turned off |
| Running a rollback | One approver | Can be raised to two |
| Stopping urgently | No approval needed | Recorded after the fact only |

An urgent stop needs no approval so that a safety action is never delayed. In exchange, you have to enter the reason within 24 hours of running it.

### Request approval

1. Running an action that needs approval opens the approval request screen.
2. Select an approver. You cannot select yourself.
3. Enter the reason for the request.
4. Select **Request**.

The approver is notified, and the action runs on its own once approved.

### States while approval is pending

| State | Meaning |
| --- | --- |
| Awaiting approval | Requested, not yet handled |
| Approved | The action has run |
| Rejected | The approver declined. The reason is recorded with it |
| Expired | Not handled within 24 hours |

An expired request has to be made again.

## Read the audit log

Read it under **Audit > Log**.

### What is recorded

| Category | Examples |
| --- | --- |
| Campaign | Created, edited, started, paused, resumed, closed |
| Package | Uploaded, signature verification result, deleted |
| Target group | Created, conditions changed, exclusion list changed |
| Rollback | Requested, approved, run, completed |
| Permissions | User added or removed, role changed |
| Settings | Gate defaults changed, approval policy changed |

Each record includes who performed the action, when, on what, the values before and after, and the reason entered.

### Search and export

1. Narrow the range by period, person, and target type.
2. Select **Export** to download a CSV.

An export can cover up to 12 months. Older records have to be requested separately from the archive system.

:::note[Note]
Audit log entries cannot be edited or deleted. If an entry is wrong, handle it by adding a new entry that records the correction and its reason.
:::

## Retain release records

For each deployment, the material below is retained as a single bundle.

| Item | Retention period |
| --- | --- |
| Package metadata and signature details | 10 years |
| Campaign configuration, meaning target group and gate criteria | 10 years |
| Deployment results, meaning installation state per vehicle | 10 years |
| Approval records | 10 years |
| Post-incident reports | 10 years |
| The original package file | 5 years |

The retention periods are long because vehicles have long service lives. When you investigate a problem on a vehicle several years after it left the factory, you need to be able to see which software was installed at that point and how it got there.

### Download a release record

1. Select **Audit > Release records**.
2. Select the campaign.
3. Select **Download package**.

Building it takes a few minutes. You are notified when it is ready, and the download link is valid for 7 days.

## Prepare material for regulators

| Request | Where to get it |
| --- | --- |
| The software history of a particular vehicle | Look up the VIN under **Audit > Vehicle history** |
| The approval path for a particular deployment | The approval records in the release record |
| The reason a deployment was stopped and what was done | The post-incident report |
| Which vehicles were excluded, and why | The change history of the target group's exclusion list |

## Next

- For the full list of state values and codes, see [Browse the reference](./reference.md).
