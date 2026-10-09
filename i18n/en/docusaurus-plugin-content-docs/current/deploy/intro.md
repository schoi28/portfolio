---
title: VELA Deploy operations guide
sidebar_label: Design note
---

# VELA Deploy operations guide

:::note[Note]
This page is not part of the product documentation. It records how that documentation was designed. The manual itself starts with the next chapter.
:::

## How this was designed

| Design criterion | Decision |
| --- | --- |
| **Primary reader** | A release operator who runs and manages vehicle software deployment |
| **Prior knowledge** | Comfortable with business consoles and release concepts, but not assumed to use code |
| **Reading context** | Follows procedures day to day, and looks up one action immediately during an incident |
| **Direction** | Follow the life cycle of a campaign and make the criteria quick to find |

### Ordering the contents by how a campaign proceeds

Chapter 1 collects the concepts a deployment needs, and the chapters after it follow the order **from creating a campaign through running it to closing it.** The aim is to keep long conceptual explanations from interrupting a procedure.

Information that is looked up repeatedly, such as state values, is separated into [Browse the reference](./reference.md). The preface explains who the document is for and how to read it, while chapter 1 explains the product concepts an operator returns to during an operation.

### Making incident response readable on its own

During an incident an operator does not read the earlier chapters in order. [Respond to an incident](./incident-response.md) therefore re-explains the concepts it needs on the spot, so that **an action can be found without reading the chapters before it.** Repetition is allowed deliberately in this one case.

### Presenting criteria as tables and reference values

Instead of wording that needs interpreting, such as "stop if the error rate is high", the criteria are given as **tables that show the figure and the action together.** The figures differ by organisation, so they are marked as examples.

State values seen in the log, such as `in_progress`, sit in the reference, and concepts sit in [Look up a term](./glossary.md), separated by what the reader is looking for. Deployment decisions that are hard to undo carry a Warning.
---

## The preface this produced

The following preface applies the decisions above. In the manual it appears before chapter 1.

### About this guide

VELA Deploy is the operations console that rolls vehicle software out in stages and rolls it back when something goes wrong. This guide covers the whole path from creating a campaign to running it and closing it.

| Area | Detail |
| --- | --- |
| Covered | Uploading packages, target groups, creating campaigns, staged rollout, gate decisions, rollback and emergency stop, audit logs |
| Not covered | The build process that produces a package, doing the same work through the API (see [VELA Vehicle API: control OTA deployment](../api/ota.md)), what happens on the vehicle side |
| Applies to | VELA Deploy 2.4 |

### Who this guide is for

It is written for the release operator who actually runs deployments. **It does not assume you can read code.**

| Role | What they do | Where to start |
| --- | --- | --- |
| **Release operator** | Creates campaigns and advances the stages | [What VELA Deploy is](./overview.md), then [Run your first campaign](./first-campaign.md) |
| **Release owner** | Approves the scope and decides when to stop | [Run a rollout](./rollout.md), [Respond to problems](./incident-response.md) |
| **Quality and compliance owner** | Submits deployment history as evidence | [Manage audit records](./audit.md) |
| **Automation developer** | Does the same work through the API | [VELA Vehicle API: control OTA deployment](../api/ota.md) |

The guide assumes you can do the following:

- Work in a business web console
- Understand version numbers and release notes
- Read a percentage and make a decision from it

**No knowledge of vehicle electronics or how over-the-air updates work internally is assumed.** The concepts you need are explained in [What VELA Deploy is](./overview.md) and [Look up a term](./glossary.md).

### Conventions

#### Admonitions

| Level | When this guide uses it |
| --- | --- |
| **Warning** | Emergency stop, conditions that make rollback impossible: decisions that cannot be undone |
| **Caution** | Misconfigured conditions, misreading the scope of a pause: recoverable errors |
| **Note** | Background that supports a decision |

Because there is no physical hazard, **Danger is never used.** Warning is applied instead to deployment decisions that are hard to undo.

#### Text formatting

| Format | Meaning |
| --- | --- |
| **Bold** | The name of an element shown in the console |
| **Packages > New package** | A menu path, selected in order |
| `in_progress` | A state value the system records. The screen shows it in your own language |

Numeric thresholds in this guide, such as success rates and waiting times, are **examples**. Set them against your own organisation's tolerance for risk.

### Related documents

| Document | When to read it |
| --- | --- |
| [VELA Vehicle API: control OTA deployment](../api/ota.md) | When moving console work into code |
| [VELA Drive app: update the vehicle software](../app/software-update.md) | To see how a deployment appears to the vehicle owner |
| [Look up a term](./glossary.md) | When you meet a term or state value you do not know |
