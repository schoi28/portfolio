---
title: Look up a term
doc_type: 레퍼런스
sidebar_label: 11. Look up a term
---

# Look up a term

The terms and abbreviations used in this document. They are explained for a reader who is comfortable with hardware work but new to sensors and networking.

## Sensors and optics

| Term | Description |
| --- | --- |
| LiDAR (Light Detection and Ranging) | A sensor that fires a laser and measures the return time to find distance. It draws the surroundings as a collection of points |
| Point cloud | The collection of points a LiDAR produces. Each point carries coordinates and a reflected intensity |
| Point rate | How many points are produced per second. The higher it is, the denser the shape you get |
| Optical window | The transparent cover on the front of the LiDAR. The laser passes through it, and contamination shortens the measuring range |
| FoV (Field of View) | The angular range a sensor can see at once |
| Class 1M | The laser safety class in IEC 60825-1. Safe to the naked eye but **hazardous when viewed with magnifying optics** |
| Intensity | The strength of the returned laser. It varies with the material and colour of the surface |

## Mounting and mechanics

| Term | Description |
| --- | --- |
| Bracket | The metal mount that fixes a sensor to the body. Its shape differs by vehicle |
| Tolerance | The range you may deviate from the design value. `18 N·m ± 2` means 16 to 20 N·m |
| Tightening torque | How hard a bolt is tightened. The unit is N·m, newton metres |
| Cross tightening | Tightening bolts alternately in opposing order. It stops one side seating first and leaving the part at an angle |
| Harness | A bundle of several wires tied into one |
| Coaxial cable | A cable whose central conductor is wrapped in a metal braid. The braid blocks electromagnetic interference, so high-speed video survives a long run without degrading. In this kit it carries camera video and power together in one run |
| FAKRA | The automotive coaxial connector standard. Colours and latch shapes distinguish each use and stop you fitting the wrong one |
| A pillar | The pillar on either side of the windscreen. It often contains a curtain airbag |
| IP rating (Ingress Protection) | How well something withstands dust and water. IP67 covers temporary immersion, IP54 everyday splashing |

## Electrical and communication

| Term | Description |
| --- | --- |
| GMSL2 (Gigabit Multimedia Serial Link 2) | The automotive transmission standard that carries camera video over a single coaxial cable. The same cable supplies power |
| PTP (Precision Time Protocol, IEEE 802.1AS) | The protocol that aligns the clocks of several devices to within microseconds. It makes the LiDAR and the cameras capture the same instant |
| Time sync offset | The difference between the reference clock and each sensor's clock. The larger it is, the more the sensors' data disagrees |
| Constant power | Power that is always supplied, regardless of the ignition |
| Junction box | The point at which vehicle power is distributed |
| Short circuit | Wires touching directly so that excessive current flows. It is a cause of fire |
| Ground | The reference point of an electrical circuit. In a vehicle the body serves as ground |
| CCU (Central Computing Unit) | The central computer in the vehicle. It is the machine VELA OS runs on |
| Zonal ECU | A controller responsible for the devices in one area of the vehicle, where the vehicle is divided into front, rear, left, and right |

## Calibration

| Term | Description |
| --- | --- |
| Calibration | The work of measuring where a sensor is actually fitted and at what angle, and telling the software |
| Extrinsic parameters | The sensor's **position and orientation** values. How far it sits from the vehicle reference point, and at what angle |
| Intrinsic parameters | Values for **the sensor's own characteristics**, such as lens distortion. They are measured at the factory and stored in the module |
| Static calibration | Calibrating with the vehicle stationary, using target boards |
| Dynamic calibration | Calibrating while driving, using the structures around the vehicle |
| Target board | A board printed with a black and white grid. The sensors use it as a reference |
| Reprojection error | How far things disagree when LiDAR points are overlaid on a camera image. It is the key pass criterion |

## Related documents

- Figures and tolerances are in [Check the specifications](./specifications.md).
- Error codes are in [Troubleshoot a problem](./troubleshooting.md).
- How to read sensor state from software is in [VELA Vehicle API: Check sensor state](../api/sensors.md).
