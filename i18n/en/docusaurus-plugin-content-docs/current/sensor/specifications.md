---
title: Check the specifications
doc_type: 레퍼런스
sidebar_label: 10. Check the specifications
---

# Check the specifications

The chapter that collects the values you look up on site. It holds **the performance, optical, and electrical specifications of the LR-40 LiDAR and the CM-20 camera, the interface box specification, the kit contents, mounting tolerances, tightening torques, and calibration pass criteria.** Come here when you need **a normal range or a tolerance** during installation or an inspection.

## LR-40 LiDAR

### Performance

| Item | Value |
| --- | --- |
| Measurement method | Rotating ToF |
| Channels | 40 |
| Horizontal field of view | 360° |
| Vertical field of view | 40°, from −25° to +15° |
| Angular resolution, horizontal | 0.1° |
| Angular resolution, vertical | 1.0° |
| Maximum range | 200 m at 80% reflectivity |
| Minimum range | 0.3 m |
| Range accuracy | ± 2 cm |
| Point rate | Up to 1,200,000 points/s |
| Rotation rate | 10 Hz or 20 Hz |

### Optical

| Item | Value |
| --- | --- |
| Wavelength | 905 nm |
| Laser class | Class 1M (IEC 60825-1) |

:::danger[Danger]
Class 1M means the product is safe under normal use with the naked eye but **not safe if you look into the beam with magnifying optics.** Do not hold a loupe, binoculars, a telephoto lens, or a microscope against the optical window. The same applies if the unit is disassembled and the internal optics are exposed.
:::

### Electrical and mechanical

| Item | Value |
| --- | --- |
| Input voltage | 9 to 32 V DC |
| Power consumption | 22 W average, 30 W maximum |
| Interface | 10GBASE-T Ethernet |
| Connector | M12 X-coded |
| Dimensions | 110 × 110 × 78 mm |
| Weight | 1.15 kg |
| Ingress protection | IP67 |
| Operating temperature | −40 to +65 °C |
| Storage temperature | −50 to +85 °C |
| Vibration resistance | 5 to 2000 Hz, 3 Grms |

## CM-20 camera

### Performance

| Item | Value |
| --- | --- |
| Image sensor | 1/2.7" CMOS |
| Effective pixels | 1928 × 1208 (2.3 MP) |
| Frame rate | 30 fps |
| Dynamic range | 120 dB |
| Shutter | Rolling |
| Horizontal field of view | 120° |
| Vertical field of view | 75° |
| Minimum illumination | 0.1 lux |

### Electrical and mechanical

| Item | Value |
| --- | --- |
| Interface | GMSL2 coaxial |
| Connector | FAKRA |
| Power | Supplied over the coaxial cable (PoC) |
| Power consumption | 1.8 W |
| Dimensions | 32 × 32 × 40 mm |
| Weight | 62 g |
| Ingress protection | IP69K |
| Operating temperature | −40 to +85 °C |
| Lens coating | Water and dirt repellent |

## Interface box

| Item | Value |
| --- | --- |
| Input voltage | 9 to 16 V DC |
| Power consumption | 18 W average, 45 W maximum with every sensor running |
| Recommended fuse rating | 15 A |
| Camera inputs | GMSL2 × 4 |
| LiDAR input | 10GBASE-T × 1 |
| Output | 1000BASE-T1 × 1 |
| Time synchronisation | IEEE 802.1AS (gPTP) |
| Synchronisation accuracy | Within ± 1 µs |
| External time source | PPS plus NMEA, optional |
| Diagnostic port | USB-C |
| Dimensions | 180 × 140 × 45 mm |
| Weight | 780 g |
| Ingress protection | IP54 |
| Operating temperature | −20 to +70 °C |

:::info[Caution]
The interface box is IP54. Unlike the LiDAR and the cameras it does not withstand water, so mount it inside the vehicle only, meaning in the boot.
:::

## Kit contents

The numbers match the figure in [What VELA Sense is · kit contents](./overview.md#kit-contents).

| No. | Item | Quantity | Note |
| --- | --- | --- | --- |
| 1 | LR-40 LiDAR | 1 | |
| 2 | CM-20 camera | 4 | Positions identified by connector colour |
| 3 | Interface box | 1 | |
| 4 | LiDAR Ethernet cable | 1 | 6.0 m |
| 5 | Camera coaxial cable | 4 | 5.0, 3.0, 4.5, 4.5 m |
| 6 | Power harness | 1 | 2.5 m, fuse holder included |
| 7 | Output Ethernet cable | 1 | 2.0 m |
| 8 | Bracket set | 1 | `BR-S1`, `BR-S2`, `BR-P1` |
| 9 | Sealant | 1 | 80 ml |
| 10 | Calibration target board | 3 | Folding |

## Tools and consumables at a glance

Items not included in the kit. Check them before travelling to site. The same information is split per chapter under each chapter's `What you need`.

| Item | Specification | Chapters that use it |
| --- | --- | --- |
| Torque wrench | 5 to 25 N·m | 3 · 5 · 8 |
| Low-range torque wrench | 1 to 6 N·m | 3 · 4 |
| Hex key | 5 mm | 3 · 8 |
| Spirit level | Digital recommended, 0.1° resolution | 3 |
| Multimeter | Resistance and voltage | 5 · 6 |
| Cable ties | Heat resistant | 5 |
| Tape measure | 10 m or longer | 7 |
| Degreaser | Isopropyl alcohol | 3 · 4 |
| Microfibre cloth | Lint free | 4 · 8 |
| Lens cleaning fluid | Neutral optical cleaner | 8 |
| Blower | Compressed gas can or hand blower | 8 |
| Laptop | For access to the VELA Deploy console | 6 · 7 · 9 |

## Mounting tolerances at a glance

| Part | Item | Tolerance |
| --- | --- | --- |
| LiDAR | Lateral centre alignment | ± 5 mm |
| LiDAR | Pitch and roll | ± 0.3° |
| LiDAR | Yaw | ± 0.5° |
| Front camera | Distance from the top of the windscreen | 40 to 60 mm |
| Front camera | Deviation from the centreline | ± 10 mm |
| Side camera | Lens angle | 45° downwards ± 5° |

## Tightening torques at a glance

| Part | Torque |
| --- | --- |
| LiDAR bracket | 18 N·m ± 2 |
| LiDAR body | 9 N·m ± 1 |
| Side camera bracket | 2.5 N·m |
| Interface box bracket | 8 N·m |
| Ground bolt | 9 N·m |

## Calibration pass criteria at a glance

| Item | Criterion |
| --- | --- |
| LiDAR angular deviation | 0.30° or less |
| Camera reprojection error | 0.50 px or less |
| LiDAR to camera registration error | 0.60° or less |
| Target detection rate | 100% |
| Attitude estimate convergence | Standard deviation of 0.15° or less |
| Lane registration error | 0.25 m or less |

## Related documents

- To read sensor state and calibration results through the API, see [VELA Vehicle API: Check sensor state](../api/sensors.md).
