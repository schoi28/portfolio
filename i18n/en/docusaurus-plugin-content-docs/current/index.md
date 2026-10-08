---
id: index
slug: /
title: Sample Docs
sidebar_label: Overview
sidebar_position: 0
---

# Sample Docs

One fictional product family, explained four different ways for four different readers.

:::note[Note]
VELA is a fictional company created for these documents. It has no relation to any real product or organisation.
:::

## The VELA product family

### What VELA does

VELA **builds vehicle software and supplies it to carmakers**. It does not build vehicles.

A carmaker, known in the industry as an OEM, builds the vehicle. VELA supplies the software platform that runs inside it. Supplier developers build their own features on top of that platform. After the vehicle ships, VELA updates the software over the air from its servers, and the owner checks the vehicle from a mobile app.

![How VELA Cloud, the vehicle, and the mobile app connect](/img/architecture-overview.svg)

Sensors are mounted on the vehicle (**VELA Sense**), the software platform runs on top of them, developers reach the data (**Vehicle API**), operators deploy new software to the fleet (**VELA Deploy**), and owners see the result in the app (**VELA Drive**).

| Set | What it covers | Size |
| --- | --- | --- |
| VELA Drive app | The app the end user holds | Preface plus 10 chapters |
| VELA Vehicle API | The interface VELA Cloud exposes | Preface plus 10 chapters |
| VELA Deploy | The console that deploys software to vehicles | Preface plus 8 chapters |
| VELA Sense | The sensor kit fitted to development vehicles | Preface plus 11 chapters |

Because of this structure VELA has more than one kind of customer. **Carmakers, supplier developers, the consumer who bought the vehicle, and the field engineers who work on development vehicles** all read VELA documentation.

### The four products and their documents

| Product | What it is | Who reads it | Document types |
| --- | --- | --- | --- |
| [VELA Drive app](./app/intro.md) | Mobile app for managing a vehicle | Vehicle owners | Tutorial, how-to, FAQ |
| [VELA Vehicle API](./api/intro.md) | Vehicle data and control API with SDKs | Developers | Reference, quickstart |
| [VELA Deploy](./deploy/intro.md) | Over-the-air deployment console | Release operators | Concept, procedure, reference |
| [VELA Sense](./sensor/intro.md) | Reference sensor kit (hardware) | Field engineers | Procedure, diagnostics, specifications |

## Conventions

All four sets share the same four levels of admonition. The level is decided by **how much harm is possible and whether it can be undone**.

| Level | Meaning |
| --- | --- |
| **Danger** | An immediate hazard that **causes death or serious injury** if not avoided: high voltage, laser sources, fire, moving vehicles |
| **Warning** | A situation that can lead to **injury, significant data loss, or irreversible equipment damage** |
| **Caution** | A situation that can lead to **minor injury, a recoverable error, or degraded data** |
| **Note** | Not a hazard. Information that improves the outcome if you know it |

Each set uses a different range. Only the [VELA Sense installation guide](./sensor/intro.md), where physical hazards are real, uses Danger. The other three sets stay at Warning or below. That difference is the result of applying one standard, not four.

Anything the reader needs to know **before** performing a step goes before the first step of that section, never after it.

## Why each document is built the way it is

Every set carries a design note. It records how the reader was defined, why that structure was chosen, and what was handled differently from the other sets. The equivalent record for my professional work is in [Portfolio](/projects).
