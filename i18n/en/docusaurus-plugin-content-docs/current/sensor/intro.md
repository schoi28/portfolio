---
title: VELA Sense installation guide
doc_type: 개념
sidebar_label: Preface
---

# VELA Sense installation guide

:::danger[Danger]
Do not look into the optical window with a magnifying optic such as a loupe, binoculars, or a telephoto lens while the LiDAR is running. Doing so can cause blindness (Class 1M, IEC 60825-1). Do not disassemble the module, and disconnect power before any inspection.
:::

## About this guide

This guide covers the full process of mounting the VELA Sense reference sensor kit on a vehicle, wiring it, and calibrating it until normal operation is confirmed.

| Area | Detail |
| --- | --- |
| Covered | Choosing mounting positions, mechanical mounting, wiring, powering on, calibration, scheduled inspection, field diagnostics |
| Not covered | Using the sensor data (see [VELA Vehicle API](../api/intro.md)), installing the vehicle platform software, sensor configuration on OEM production vehicles |
| Applies to | VELA Sense kit R2 (LR-40 LiDAR, CM-20 camera, interface box IB-2) |
| Environment | Development and validation vehicles. Not for production vehicles |

## Intended audience

This guide is written for field engineers who mount hardware on vehicles. **No prior knowledge of autonomous driving systems is assumed.**

| Role | What they do | Where to start |
| --- | --- | --- |
| **Field installation engineer** | Mounts and wires the sensors on the vehicle | [What VELA Sense is](./overview.md), then [Plan the installation](./planning.md) |
| **Validation engineer** | Runs calibration and decides whether it passes | [Calibrate the sensors](./calibration.md), [Check the specifications](./specifications.md) |
| **Fleet maintenance owner** | Inspects a fitted kit on schedule and replaces modules | [Inspect and maintain the kit](./maintenance.md), [Troubleshoot a problem](./troubleshooting.md) |
| **Integration developer** | Reads sensor state from software | [VELA Vehicle API: check sensor state](../api/sensors.md) |

The guide assumes the following skills:

- Comfortable removing and refitting vehicle trim, using a torque wrench, and routing a wiring harness
- Able to check continuity and shorts with a multimeter
- Able to run a configuration tool on a laptop. **Command line use is not assumed.**

## Conventions

### Admonitions

| Level | When this guide uses it |
| --- | --- |
| **Danger** | Laser source, airbag deployment path, fire: anything that causes death or serious injury |
| **Warning** | 12 V electrical work, harness damage, running without recalibrating after a module change: irreversible damage |
| **Caution** | Tolerance exceeded, a mistake that forces rework: recoverable errors |
| **Note** | Information that makes the work easier |

The full definition of all four levels is in [Conventions](../#conventions). All four documentation sets use the same standard.

### Text formatting

| Format | Meaning |
| --- | --- |
| **Bold** | The name of an element shown on a screen or on the equipment |
| **Settings > Sensors** | A menu path, selected in order |
| `LR-40` | Model names, connector names, file names |
| 18 N·m ± 2 | A value with its tolerance. Any value given with a tolerance must be measured and confirmed |

## Related documents

| Document | When to read it |
| --- | --- |
| [VELA Vehicle API: check sensor state](../api/sensors.md) | When reading the state of a fitted sensor from software |
| [VELA Drive app: check service timing](../app/maintenance.md) | To see how a sensor cleaning alert appears to the owner |
| [Glossary](./glossary.md) | When you meet a term or abbreviation you do not know |

---

## Design note

> A record of why this document is built the way it is. It is not part of the product documentation.

**Reader**: a field engineer. Skilled with hardware, less so with software and networking. Reads on a tablet, at the work site, wearing gloves, often in poor light.

**Structure**: that reading context decided the structure. Sections are small enough that one unit of work fits on one screen, and tables replace long paragraphs. Every value carries its unit and its tolerance.

**Why the preface and chapter 1 are separate**: the preface is information about *how to read this document*. Chapter 1 is information about *what the product is*. Putting both on one page forces a reader deciding "is this document for me?" to read the same text as a reader asking "what is this product?". The preface is read once and never again. Chapter 1 is returned to during the work.

**Information typing**: everything from mounting to calibration is procedural and follows the **irreversible physical order** of the work. Values looked up in the field, such as dimensions, torque, and pass criteria, are collected in [Check the specifications](./specifications.md), so nobody has to scroll through a long procedure to find a number. Only calibration is typed as concept plus procedure, because a reader who does not understand why it matters will quietly relax the pass criteria.

**Why safety warnings are not collected at the front**: a page of warnings at the start of a document gets turned past once and never read again. Each warning is repeated immediately before the step it applies to. That repetition is deliberate in this document.

**The only set that uses Danger**: physical hazards are real here. Danger is reserved for the cases that **cause death or serious injury**, such as the laser source, the airbag deployment path, and fire. Working on 12 V circuits or damaging the harness is irreversible equipment damage, so it is a Warning. The other three sets not using Danger is the result of the same standard.

**Why there is a separate glossary**: readers of this document are skilled at mechanical work but may be meeting networking and time synchronisation for the first time. Spelling out GMSL2, PTP, or extrinsic parameters in the body every time would be noise for an expert. They are collected in one place and linked at first appearance.

**Connections to other documents**: calibration results from this guide are readable through the sensor state endpoints in the [API documentation](../api/intro.md), and cleaning intervals reach the owner as a sensor cleaning alert in the [VELA Drive app](../app/intro.md).
