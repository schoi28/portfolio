---
title: VELA Drive app guide
sidebar_label: Design note
---

# VELA Drive app guide

:::note[Note]
This page is not part of the product documentation. It records how that documentation was designed. The manual itself starts with the next chapter.
:::

## How this was designed

| Design criterion | Decision |
| --- | --- |
| **Primary reader** | An ordinary owner who bought the vehicle |
| **Prior knowledge** | Assumes no knowledge of vehicle servicing or software |
| **Reading context** | On a phone, usually a short read to finish one task or fix one problem |
| **Direction** | Navigate by the user's goal or symptom rather than by product feature name |

### Leading with what the reader wants to do

Chapter 1 opens with **what you want to do** rather than with the names of product features. The reader should find the procedure they need without first translating their problem into the app's feature names.

### Grouping explanations so a task can be finished in one place

For a reader on a phone screen, the concepts and procedures needed for a task are kept together in one chapter rather than scattered across several pages. Error situations, by contrast, are collected in [Troubleshooting](./troubleshooting.md) **by symptom** instead of being spread across features.

### Keeping unfamiliar terms and safety warnings to a minimum

Plain wording is used in the body rather than sending the reader to a glossary. For example, 'OTA (Over-The-Air)', the term for updating vehicle software wirelessly, is explained as 'a software update'. How these map to the technical terms used in the other documents is managed in the shared terminology standard for the product family.

Danger warnings for hardware work that a vehicle owner never performs are not used. Warning and Caution are applied instead, separating actions that cannot be undone from situations that recover on their own.

### Writing for OEM screen differences and a long shelf life

VELA Drive is a reference app that a carmaker can rebrand as its own. The documentation therefore concentrates on **shared behaviour and failure conditions** rather than on elements that vary, such as colours, logos, and exact UI wording.

So that the documentation does not age every time a screen changes, it refers to UI elements by name instead of relying on screenshots.
---

## The preface this produced

The following preface applies the decisions above. In the manual it appears before chapter 1.

### About this guide

VELA Drive is a mobile app for checking your vehicle and controlling it remotely. This guide covers everything from installing the app and connecting your vehicle to everyday use and what to do when something goes wrong.

| Area | Detail |
| --- | --- |
| Covered | Installing the app and connecting a vehicle, checking vehicle status, remote control, digital key management, software updates, service reminders, data management |
| Not covered | Operating the vehicle itself, servicing work, warranty and service policy |

:::note[VELA Drive is a reference app]
VELA supplies software platforms to carmakers, known in the industry as OEMs, and does not build vehicles. VELA Drive is a **reference implementation** that an OEM works from before releasing an app under its own brand. Each OEM can customise this app and release it as their own. The features and screen layout stay the same, but colours, names, and some wording may differ. This guide describes the original, before any such customisation.
:::

### Who this guide is for

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

### What you need

- A vehicle running the VELA platform
- iOS 16 or later, or Android 12 or later
- An email address to register with the vehicle

### Conventions

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
