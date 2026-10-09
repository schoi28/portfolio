---
title: What VELA Sense is
doc_type: 개념
sidebar_label: 1. What VELA Sense is
---

# What VELA Sense is

VELA Sense is a **reference sensor kit fitted to development and validation vehicles**. It consists of one LiDAR unit, four cameras, and an interface box that connects both to the vehicle network.

Calling it a reference kit means **this configuration is a baseline, not a production part**. Carmakers fit sensors of their own choosing to production vehicles. VELA Sense is used in the stage before that.

| Use | Detail |
| --- | --- |
| Feature validation | Confirms platform behaviour with sensors of known performance, before the production sensor is chosen |
| Data collection | Gathers driving data to train and evaluate perception models |
| Baseline for comparison | Measures candidate production sensors against VELA Sense results |

:::note[Note]
Production vehicles do not carry VELA Sense. The sensor endpoints described in [Check sensor state](../api/sensors.md) are valid only on vehicles where the kit is fitted.
:::

## Kit contents

Opening the box gives you the ten items below. Check the quantities in numbered order before you start work.

![VELA Sense kit items, numbered 1 to 10](/img/sensor-kit-items.svg)

| No. | Item | Quantity | Mounting position |
| --- | --- | --- | --- |
| 1 | LR-40 LiDAR module | 1 | Centre of the roof |
| 2 | CM-20 camera module | 4 | Front, rear, left, right |
| 3 | Interface box (IB-2) | 1 | Boot |
| 4 | LiDAR Ethernet cable | 1 | Roof to boot |
| 5 | Camera coaxial cable | 4 | Each camera to the boot |
| 6 | Power harness | 1 | Around the boot fuse box |
| 7 | Output Ethernet cable | 1 | Inside the boot |
| 8 | Bracket set | 1 | Chosen by vehicle type |
| 9 | Sealant | 1 | Waterproofing the roof mount |
| 10 | Calibration target board | 3 | Outside the vehicle, used only during calibration |

These numbers match the ones in [Check the specifications · kit contents](./specifications.md#kit-contents). Full dimensions and electrical specifications are there too.

:::note[Note]
If anything is missing or damaged, do not start the work; contact your supplier. Running short of cable after mounting has begun means stripping the interior trim out again.
:::

## How the kit connects inside the vehicle

![How the sensors, the interface box and the central computing unit connect](/img/sensor-kit-connection.en.svg)

Sensors connect only to the interface box, which reaches the central computing unit (CCU) over a single Ethernet run. When the vehicle type changes, only the **brackets and harness lengths** change. The wiring on the CCU side stays the same.

The interface box does three things.

| Role | Detail |
| --- | --- |
| Power distribution | Takes 12 V from the vehicle and supplies the LiDAR and cameras at the voltage each needs |
| Time synchronisation | Distributes a reference clock so the LiDAR and cameras capture **the same instant** (PTP) |
| Ethernet conversion | Combines the GMSL2 camera signals and the LiDAR data onto one Ethernet link |

:::note[Note]
Time synchronisation matters because it feeds directly into calibration. If the LiDAR and the cameras capture different instants, the two data sets disagree on anything that moves. At 50 km/h, an error of 1 ms puts the two about 1.4 cm apart.
:::

## Overview of the work

The whole job takes **about 5 hours**. Part of it cannot be done alone, so arrange two people in advance.

| Stage | Time | People | Chapter |
| --- | --- | --- | --- |
| Confirm the installation plan | 20 min | 1 | [2. Plan the installation](./planning.md) |
| Mount the LiDAR and cameras | 1 h 40 min | 2 | [3. Mount the LiDAR](./lidar-mount.md), [4. Mount the cameras](./camera-mount.md) |
| Wiring | 1 h 30 min | 1 | [5. Wire the kit](./wiring.md) |
| Power up and first check | 30 min | 1 | [6. Power up and check](./power-check.md) |
| Calibration | 1 h | 2 | [7. Calibrate the sensors](./calibration.md) |

:::info[Caution]
Read [Plan the installation](./planning.md) before starting any work. Mounting before the cable routes are decided means removing the trim a second time. The tools to take to site are collected in [Check the specifications · tools and consumables at a glance](./specifications.md#tools-and-consumables-at-a-glance).
:::

## What you can find in this guide

| What you want to do | Where to look |
| --- | --- |
| Decide where to mount and how to route cables | [2. Plan the installation](./planning.md) |
| Fix the LiDAR to the roof | [3. Mount the LiDAR](./lidar-mount.md) |
| Mount the four cameras | [4. Mount the cameras](./camera-mount.md) |
| Connect power and data cables | [5. Wire the kit](./wiring.md) |
| Power on for the first time and confirm normal operation | [6. Power up and check](./power-check.md) |
| Find out what each status LED colour means | [6. Power up and check](./power-check.md#3-how-to-read-the-status-led) |
| Measure and register sensor position and angle | [7. Calibrate the sensors](./calibration.md) |
| Decide whether calibration passed | [7. Calibrate the sensors](./calibration.md#interpret-the-result) |
| Run scheduled inspection and clean the optical window | [8. Inspect and maintain the kit](./maintenance.md) |
| Replace a module | [8. Inspect and maintain the kit](./maintenance.md#replace-a-module) |
| Find the cause from a symptom | [9. Troubleshoot a problem](./troubleshooting.md#diagnostic-table-by-symptom) |
| Look up an error code | [9. Troubleshoot a problem](./troubleshooting.md#error-codes) |
| Look up a dimension, torque, or tolerance | [10. Check the specifications](./specifications.md) |
| Look up a term or abbreviation | [11. Look up a term](./glossary.md) |

## Next

- If this is a first installation, go to [Plan the installation](./planning.md).
- To inspect a kit that is already fitted, go to [Inspect and maintain the kit](./maintenance.md).
- If you have a symptom, start from the table in [Troubleshoot a problem](./troubleshooting.md).
