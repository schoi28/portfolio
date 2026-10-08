---
title: VELA Deploy operations guide
doc_type: 개념
sidebar_label: Preface
---

# VELA Deploy operations guide

## About this guide

VELA Deploy is the operations console that rolls vehicle software out in stages and rolls it back when something goes wrong. This guide covers the whole path from creating a campaign to running it and closing it.

| Area | Detail |
| --- | --- |
| Covered | Uploading packages, target groups, creating campaigns, staged rollout, gate decisions, rollback and emergency stop, audit logs |
| Not covered | The build process that produces a package, doing the same work through the API (see [VELA Vehicle API: control OTA deployment](../api/ota.md)), what happens on the vehicle side |
| Applies to | VELA Deploy 2.4 |

## Who this guide is for

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

## Conventions

### Admonitions

| Level | When this guide uses it |
| --- | --- |
| **Warning** | Emergency stop, conditions that make rollback impossible: decisions that cannot be undone |
| **Caution** | Misconfigured conditions, misreading the scope of a pause: recoverable errors |
| **Note** | Background that supports a decision |

Because there is no physical hazard, **Danger is never used.** Warning appears more often here than in the other sets, because deployment has many actions that are hard to undo. The full definition of all four levels is in [Conventions](../#conventions).

### Text formatting

| Format | Meaning |
| --- | --- |
| **Bold** | The name of an element shown in the console |
| **Packages > New package** | A menu path, selected in order |
| `in_progress` | A state value the system records. The screen shows it in your own language |

Numeric thresholds in this guide, such as success rates and waiting times, are **examples**. Set them against your own organisation's tolerance for risk.

## Related documents

| Document | When to read it |
| --- | --- |
| [VELA Vehicle API: control OTA deployment](../api/ota.md) | When moving console work into code |
| [VELA Drive app: update the vehicle software](../app/software-update.md) | To see how a deployment appears to the vehicle owner |
| [Look up a term](./glossary.md) | When you meet a term or state value you do not know |

---

## Design note

> A record of why this document is built the way it is. It is not part of the product documentation.

**Reader**: a release operator. Comfortable with business tools, unable to read code. On a normal day they follow the procedure; on a bad day they are searching in a hurry.

**Structure**: the concepts are collected in chapter 1 and never mixed into the procedures. The most common reason deployment documentation becomes hard to read is a concept explanation interrupting a procedure. Settling the concepts once makes every procedure afterwards shorter.

**Why the preface and chapter 1 are separate**: the preface is used to decide *whether this document is for you*. Chapter 1 is used *to do the work*. When an incident happens, an operator comes back to chapter 1 to re-check what a state value means. Nobody comes back to a preface.

**Information typing**: this is the cleanest set of the four. Concepts are in chapter 1, procedures in chapters 2 to 6, and values you look up in [Browse the reference](./reference.md). That was possible because the chapters are ordered by **the life cycle of a campaign**. Order by time and there is no room for a concept to interrupt. The ordering axis decides how hard the type separation becomes.

**Why the incident chapter stands alone**: when something goes wrong, nobody reads a document from the beginning. The incident chapter re-explains the concepts it needs so it can be understood without the earlier chapters. The duplication avoided everywhere else is deliberate here.

**Why decision thresholds are tables**: a sentence such as "stop if the error rate is high" does not get read under pressure. Numbers and actions are given as a table. The numbers differ by organisation, so the guide states that they are examples.

**Why there is a separate glossary**: readers of this guide cannot read code, yet they still meet state values such as `in_progress` in logs. State values live in [Browse the reference](./reference.md) and concepts live in [Look up a term](./glossary.md), because the two are looked up at different moments.
