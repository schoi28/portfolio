---
title: Plan the installation
doc_type: 개념
sidebar_label: 2. Plan the installation
---

# Plan the installation

Before fitting the sensors, decide **where they go and which route the cables take.** Skip this chapter and you will find yourself back at an earlier step while connecting cables.

:::warning[Warning]
This is vehicle modification work. Disconnect the negative terminal of the vehicle's 12V battery before you start.
:::

## Mounting position criteria

![Where the LiDAR and the four cameras are mounted, seen from above](/img/sensor-mounting-layout.en.svg)

:::note[Note]
The dimensions in the drawing are not to scale and show relative positions only. For actual values, see [Check the specifications](./specifications.md).
:::

| Sensor | Position | Requirement |
| --- | --- | --- |
| LR-40 LiDAR | Centre of the roof | Nothing obstructing the forward 180° field of view |
| C1 front camera | Top centre of the windscreen | Within the wiper sweep |
| C2 rear camera | Top of the boot lid | No interference from the number plate light |
| C3 left camera | Under the left door mirror | No interference when the door opens or closes |
| C4 right camera | Under the right door mirror | No interference when the door opens or closes |
| Interface box | Left wall of the boot | Ventilated, no risk of water ingress |

### Interference checks

Confirm the following before you settle on a mounting position.

| Check | How |
| --- | --- |
| Doors and boot | That nothing touches at full opening |
| Wipers | That they do not catch the camera at their highest speed |
| Existing sensors | That you do not block the field of view of the vehicle's own radar or cameras |
| Antenna | That there is at least 15 cm of clearance from the roof antenna |
| Car washes | Whether the height brings it into contact with automatic car wash brushes |

:::warning[Warning]
Mounting the LiDAR close to the roof antenna can degrade communication quality. Leave at least 15 cm of clearance.
:::

## Choose the bracket for the vehicle

From the bracket set in the kit, pick the one that matches the vehicle.

| Bracket code | Vehicle type | How the LiDAR mounts |
| --- | --- | --- |
| `BR-S1` | Saloon with no roof rails | Suction plus bolts |
| `BR-S2` | SUV with roof rails | Rail clamp |
| `BR-P1` | Pickup, cab roof | Bolts |

The bracket code is stamped on the back of the bracket. A bracket that does not match the vehicle will not bring the sensor within the permitted tolerance.

## Plan the cable routes

The cables from four cameras and one LiDAR all gather at the interface box.

| Run | Recommended route | Watch for |
| --- | --- | --- |
| LiDAR to the interface box | Roof, inside the C pillar, boot | The roof moulding has to come off |
| C1 to the interface box | Top of the windscreen, A pillar, door moulding, boot | Avoid the path an airbag deploys along |
| C2 to the interface box | Boot lid, hinge grommet, boot | Leave enough slack to survive repeated opening |
| C3 and C4 to the interface box | Mirror, door, door grommet, boot | A section that flexes every time the door moves |

:::danger[Danger]
There is a curtain airbag inside the A pillar. A cable routed along the airbag's deployment path is flung out when the airbag fires, which is dangerous. Secure the cable along the same route as the factory harness.
:::

### Check the cable lengths

| Cable | Length supplied in the kit | Slack |
| --- | --- | --- |
| LiDAR Ethernet | 6.0 m | About 1.2 m spare on a saloon |
| Camera coaxial (C1) | 5.0 m | About 0.8 m spare |
| Camera coaxial (C2) | 3.0 m | About 0.5 m spare |
| Camera coaxial (C3 and C4) | 4.5 m | About 0.6 m spare |
| Power | 2.5 m | For wiring inside the boot |

With less than 0.5 m of slack, vibration puts load on the connector. If there is not enough, obtain an extension cable separately.

## Decide the order of work

This is the recommended order.

1. Clear the cable routes first. Remove the mouldings and covers and pass the cables through.
2. Fix the interface box in the boot.
3. Mount the LiDAR and connect its cable.
4. Mount the four cameras and connect their cables.
5. Wire the power.
6. Power up and confirm the sensors are detected, before refitting the mouldings.
7. Refit the mouldings once the check passes.
8. Run the calibration.

:::info[Caution]
Refitting the mouldings without **step 6**, the detection check, means stripping the interior back out if detection failed. Always check before refitting.
:::

:::note[Note]
How mouldings and covers come off and go back on differs by vehicle. This document does not cover it, so follow **the service instructions for that vehicle**. The explanations here assume they are already off.
:::

## Next

- [Mount the LiDAR](./lidar-mount.md)
