---
title: VELA Drive app guide
doc_type: 개념
sidebar_label: Preface
---

# VELA Drive app guide

## About this guide

VELA Drive is a mobile app for checking your vehicle and controlling it remotely. This guide covers everything from installing the app and connecting your vehicle to everyday use and what to do when something goes wrong.

| Area | Detail |
| --- | --- |
| Covered | Installing the app and connecting a vehicle, checking vehicle status, remote control, digital key management, software updates, service reminders, data management |
| Not covered | Operating the vehicle itself, servicing work, warranty and service policy |

:::note[VELA Drive is a reference app]
VELA supplies software platforms to carmakers, known in the industry as OEMs, and does not build vehicles. VELA Drive is a **reference implementation** that an OEM works from before releasing an app under its own brand. Each OEM can customise this app and release it as their own. The features and screen layout stay the same, but colours, names, and some wording may differ. This guide describes the original, before any such customisation.
:::

## Who this guide is for

This guide is written for the owner of the vehicle. **It assumes no knowledge of car servicing and no knowledge of software.**

| If you want to | Start here |
| --- | --- |
| See what the app is first | [1. What the VELA Drive app is](./overview.md) |
| Install the app for the first time | [2. Get started](./getting-started.md) |
| Learn the everyday features | [3. Check your vehicle status](./vehicle-status.md), [4. Control your vehicle remotely](./remote-control.md) |
| Lend the car to family | [5. Manage your digital key](./digital-key.md) |
| Keep the software up to date | [6. Update the vehicle software](./software-update.md) |
| Fix something that is not working | [8. Solve problems](./troubleshooting.md) |
| Find a short answer | [9. Browse frequently asked questions](./faq.md) |

## What you need

- A vehicle running the VELA platform
- iOS 16 or later, or Android 12 or later
- An email address to register with the vehicle

## Conventions

| Level | When this guide uses it |
| --- | --- |
| **Warning** | Revoking a digital key, deleting data: anything that cannot be undone |
| **Caution** | An interrupted installation, points to watch when locking remotely: recoverable situations |
| **Note** | Information that makes things easier |

**Danger never appears in this guide.** Vehicle owners do not handle the hardware directly.

| Format | Meaning |
| --- | --- |
| **Bold** | The name of a button or menu shown in the app |
| **Settings > Vehicle** | A menu path, selected in order |

---

## Design note

> A record of why this document is built the way it is. It is not part of the product documentation.

**Reader**: the vehicle owner. I assumed no knowledge of car servicing and none of software. They read on a phone screen, standing next to the car, usually in a hurry.

**Structure**: chapter 1 opens with a table of **"what you want to do"** rather than "what the app can do". Starting from a feature list forces the reader to translate their own problem into a feature name. Leading with intent means the document does that translation for them.

**Why this is the only set without a glossary**: vehicle owners do not look things up in a glossary. When they meet a word they do not know, they close the document. So instead of building a glossary I chose **not to use difficult terms in the first place**. This guide says "software update" rather than OTA, and "sensor check" rather than calibration. The other three sets do have glossaries.

**Terminology**: the same concept is called "over-the-air update (OTA)" in the [VELA Deploy operations guide](../deploy/intro.md) and `campaign` in the [API documentation](../api/intro.md). All three spellings are registered in the glossary, along with a record of which document uses which.

**Information typing**: each chapter is typed against the DITA information types of concept, procedure, and reference. This set has an unusual number of chapters typed as concept plus procedure, because a reader standing beside the car with a phone cannot be sent to a second page. The file stays one feature wide, and the types are separated by section inside it. In the opposite direction, **everything about failure is collected into [Solve problems](./troubleshooting.md)**, because when something breaks the reader searches by symptom, not by feature name.

**Different from the other sets**: this guide never uses Danger. Owners do not handle the hardware. Warning is reserved for what cannot be undone, such as revoking a shared key or damaging a lens coating with the wrong cleaner, while anything that recovers on its own, such as an interrupted update, is lowered to Caution. The full definition of all four levels is in [Conventions](../#conventions).

**Deliberately left out**: this guide is written without assuming screenshots. App interfaces change often, and a stale screenshot costs the whole document its credibility. Screen elements are named, and their position is described only when it matters.

**How the reference-app premise shaped the writing**: because VELA Drive is customised and rebranded by each OEM, the guide never describes brand-specific visuals such as colours, logos, or exact wording. It stays on how features behave and when they fail, which is **what does not change in any OEM version**. Limiting scope to "what survives rebranding" means the guide does not have to be rewritten when an OEM changes its brand.
