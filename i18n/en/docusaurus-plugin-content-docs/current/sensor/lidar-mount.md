---
title: Mount the LiDAR
doc_type: 절차
sidebar_label: 3. Mount the LiDAR
---

# Mount the LiDAR

Fix the LR-40 LiDAR to the centre of the roof.

:::danger[Danger]
While the power is on, **do not look into the optical window with a magnifier or a camera that magnifies** (Class 1M). Before starting, confirm the vehicle battery's negative terminal is disconnected.
:::

## What you need

| Item | Specification |
| --- | --- |
| Torque wrench | 5 to 25 N·m |
| Low-range torque wrench | 1 to 6 N·m, for the first pass on the body |
| Hex key | 5 mm |
| Level | Digital recommended, 0.1° resolution |
| Degreaser | Isopropyl alcohol |
| Sealant | Supplied in the kit |

- **Conditions:** 2 people · about 40 minutes · vehicle battery negative terminal disconnected
- **Before you start:** choose the bracket and the cable routes in [2. Plan the installation](./planning.md)

## 1. Fix the bracket

:::warning[Warning]
Do not tighten to the final torque in one pass. A bracket fixed at an angle cannot be brought within the tilt tolerance.
:::

1. Clean the roof mounting surface with degreaser and let it dry completely.
2. Place the bracket you chose in [Plan the installation](./planning.md#choose-the-bracket-for-the-vehicle) at the centre of the roof.
3. Align the centre of the bracket with the vehicle centreline. Lateral deviation must be within **±5 mm**.
4. Tighten the bracket's four bolts in a diagonal sequence.

| Pass | Torque |
| --- | --- |
| First, all bolts | 5 N·m |
| Second, all bolts | 12 N·m |
| Final, all bolts | 18 N·m ± 2 |

## 2. Set the LiDAR on the bracket

1. Position the LiDAR body with its connector facing **towards the rear of the vehicle**.
2. Lower the body onto the guide pins on the bracket.
3. Tighten the four fixing bolts by hand. Do not go to the final torque yet.

## 3. Set the tilt

The tilt of the LiDAR directly affects detection performance.

:::info[Caution]
Continuing outside the tolerance makes the calibration fail. The calibration stage can only correct up to ±0.5° in software.
:::

1. Confirm the vehicle is on level ground.
2. Place the level on the reference surface on top of the LiDAR.
3. Adjust until the readings fall within the tolerances below.

   | Axis | Target | Tolerance |
   | --- | --- | --- |
   | Pitch, meaning fore and aft tilt | 0.0° | ± 0.3° |
   | Roll, meaning side to side tilt | 0.0° | ± 0.3° |
   | Yaw, meaning horizontal rotation | Aligned with the vehicle centreline | ± 0.5° |

4. Once inside the tolerances, tighten the fixing bolts in a diagonal sequence.

   | Pass | Torque |
   | --- | --- |
   | First | 4 N·m |
   | Final | 9 N·m ± 1 |

5. Measure again with the level after tightening. Tightening can shift the alignment.

## 4. Connect the cable

1. Connect the Ethernet cable to the connector on the back of the LiDAR.
2. Turn the connector's locking ring clockwise until it **clicks**.
3. Form a drip loop, a section of cable that hangs below the connector, so that water does not collect at it.
4. Pass the cable along the route you set in [Plan the installation](./planning.md#plan-the-cable-routes).

## 5. Seal against water

1. Apply sealant around the edge where the bracket meets the roof.
2. Cover the bolt heads with sealant as well.
3. Fit a grommet where the cable passes through the roof and finish it with sealant.

:::warning[Warning]
Do not wash the vehicle before the sealant has cured. Curing takes 24 hours.
:::

## Checks

Confirm the following before moving to the next step.

| Check | Criterion |
| --- | --- |
| Lateral centre alignment | Within ± 5 mm |
| Pitch and roll | Within ± 0.3° |
| Yaw | Within ± 0.5° |
| Bolt torque | 18 N·m on the bracket, 9 N·m on the body |
| Connector lock | The locking ring is engaged |
| Sealant | All the way round, with no breaks |
| Optical window | No fingerprints or debris |

If the optical window has fingerprints on it, wipe it with a dry microfibre cloth. A solvent damages the coating.

## Next

- [Mount the cameras](./camera-mount.md)
