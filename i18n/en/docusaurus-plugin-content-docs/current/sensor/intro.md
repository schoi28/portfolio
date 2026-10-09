---
title: VELA Sense installation guide
sidebar_label: Design note
---

# VELA Sense installation guide

:::note[Note]
This page is not part of the product documentation. It records how that documentation was designed. The manual itself starts with the next chapter.
:::

## How this was designed

| Design criterion | Decision |
| --- | --- |
| **Primary reader** | A field engineer who fits and inspects the sensor kit on a vehicle |
| **Prior knowledge** | Experienced with mechanical and wiring work, with limited software and networking knowledge |
| **Reading context** | On a tablet at a work site, mid-task, with poor lighting and restricted handling |
| **Direction** | Follow the real order of work and put figures and hazards where they are needed |

### Following the real order of fitting and validation

The chapters follow the **physical order of work**: mounting, wiring, applying power, and calibration. Sections are kept short and tables are used heavily so that one task can be checked at a time on site.

Dimensions, torques, and pass criteria are collected in [Check the specifications](./specifications.md) rather than repeated inside the procedures. For calibration, the concepts and the procedure are explained together so that the pass criteria are not relaxed arbitrarily.

### Placing safety warnings immediately before the work

Collecting hazard information at the front of the document means it can be missed during the work itself. Each warning is therefore **placed immediately before the task it applies to**, and repeated where necessary.

Danger is used only where serious harm to a person is possible, and equipment damage or recoverable problems are separated into Warning and Caution. Of the four documentation sets, only this guide, which deals directly with physical hazards, uses the Danger level.

### Connecting unfamiliar technology and follow-up work

Even a reader skilled in mechanical work may find terms such as GMSL2, PTP, and extrinsic parameters unfamiliar. Rather than lengthening the body, a glossary is provided and linked at the first point where each term is needed.

For checking sensor state after installation and calibration, the documentation links to the [Vehicle API](../api/intro.md), and for the cleaning alerts a vehicle owner sees, to the [VELA Drive app](../app/intro.md).
---

## The preface this produced

The preface built from the decisions above. In the manual itself this sits before chapter 1.

### About this guide

This guide covers the full process of mounting the VELA Sense reference sensor kit on a vehicle, wiring it, and calibrating it until normal operation is confirmed.

| Area | Detail |
| --- | --- |
| Covered | Choosing mounting positions, mechanical mounting, wiring, powering on, calibration, scheduled inspection, field diagnostics |
| Not covered | Using the sensor data (see [VELA Vehicle API](../api/intro.md)), installing the vehicle platform software, sensor configuration on OEM production vehicles |
| Applies to | VELA Sense kit R2 (LR-40 LiDAR, CM-20 camera, interface box IB-2) |
| Environment | Development and validation vehicles. Not for production vehicles |

### Intended audience

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

### Conventions

#### Admonitions

| Level | When this guide uses it |
| --- | --- |
| **Danger** | Laser source, airbag deployment path, fire: anything that causes death or serious injury |
| **Warning** | 12 V electrical work, harness damage, running without recalibrating after a module change: irreversible damage |
| **Caution** | Tolerance exceeded, a mistake that forces rework: recoverable errors |
| **Note** | Information that makes the work easier |

Of the level criteria shared by the four documentation sets, this installation guide also uses the Danger level, which covers physical hazards.

#### Text formatting

| Format | Meaning |
| --- | --- |
| **Bold** | The name of an element shown on a screen or on the equipment |
| **Settings > Sensors** | A menu path, selected in order |
| `LR-40` | Model names, connector names, file names |
| 18 N·m ± 2 | A value with its tolerance. Any value given with a tolerance must be measured and confirmed |

### Related documents

| Document | When to read it |
| --- | --- |
| [VELA Vehicle API: check sensor state](../api/sensors.md) | When reading the state of a fitted sensor from software |
| [VELA Drive app: check service timing](../app/maintenance.md) | To see how a sensor cleaning alert appears to the owner |
| [Glossary](./glossary.md) | When you meet a term or abbreviation you do not know |
