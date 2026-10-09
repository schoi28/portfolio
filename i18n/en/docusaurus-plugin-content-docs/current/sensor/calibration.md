---
title: Calibrate the sensors
doc_type: 개념 + 절차
sidebar_label: 7. Calibrate the sensors
---

# Calibrate the sensors

Calibration works out exactly where each sensor is looking, relative to the vehicle, and registers that. Carry out [static calibration](#run-the-static-calibration) and then [dynamic calibration](#run-the-dynamic-calibration), in that order.

## What you need

| Item | Specification |
| --- | --- |
| Calibration target board | Supplied in the kit, 3 boards |
| Tape measure | 10 m or longer |
| Laptop | For access to the VELA Deploy console |

- **Conditions:** 2 people · about 60 minutes · an indoor area for static calibration and a route for dynamic calibration
- **Before you start:** the initial diagnostics in [6. Power up and check](./power-check.md) passed

## Why calibration is needed

However precisely you align things during mounting, deviations of a millimetre or so remain. If the LiDAR and a camera place the same object in different positions, their data cannot be combined.

Calibration measures that deviation and registers it as a correction. There is a limit to what can be corrected, so staying within the mounting tolerances is a precondition.

:::info[Caution]
Calibration fails if the mounting is outside tolerance. Software can correct up to **±0.5°** on each axis.
:::

## Run the static calibration

### Conditions for the work area

:::info[Caution]
Tyre pressures that differ from the specification change the ride height and make the result inaccurate. Set the pressures before you check the table below.
:::

| Item | Criterion |
| --- | --- |
| Floor | Level. Gradient of 0.5% or less |
| Lighting | 300 lux or more, even |
| Space | At least 8 m in front of the vehicle and 4 m either side |
| Reflective surfaces nearby | No glass or mirrored surfaces |
| Vehicle condition | Unloaded, tyre pressures at the specified values |

### Position the target boards

![Target board positions for static calibration](/img/sensor-calibration-layout.svg)

| Target | Position | Distance from the vehicle | Tolerance |
| --- | --- | --- | --- |
| A | Front left | 3.0 m | ± 5 cm |
| B | Front right | 3.0 m | ± 5 cm |
| C | Straight ahead | 6.0 m | ± 5 cm |

1. Align the vehicle squarely at the designated position. Lateral deviation must be within **± 2 cm**.
2. Stand the target boards at the positions in the table.
3. Check with a level that each board is **vertical** to the ground. The tolerance is ± 1°.
4. Set the centre height of each board to **1.2 m**.

### Run it

1. Connect a laptop to the `DIAG` port and open `http://192.168.10.1`.
2. Select **Calibration > Static calibration**.
3. Enter the vehicle type and the bracket code.
4. Select **Start**.

The measurement takes about 5 minutes. Do not move the vehicle or the target boards during that time, and stay out of the cameras' field of view.

### Pass criteria

| Item | Pass criterion | What it means |
| --- | --- | --- |
| LiDAR angular deviation | 0.30° or less | The size of the calculated correction angle |
| Camera reprojection error | 0.50 px or less | The difference between the predicted and actual position |
| LiDAR to camera registration error | 0.60° or less | How closely the two sensors agree |
| Target detection rate | 100% | All three boards detected |

When every item passes, the result is saved automatically and the state changes to `valid`.

## Run the dynamic calibration

Static calibration alone does not account for the vibration and changes in attitude that occur while driving. Real driving fills that gap.

### Driving conditions

| Item | Criterion |
| --- | --- |
| Distance | At least 15 km |
| Speed | More than half the distance at 40 to 80 km/h |
| Road | Both straight and curved sections |
| Lane markings | A road with clear lane markings |
| Weather | Clear or overcast. Not possible in rain or snow |
| Time of day | Daylight |

### Run it

:::warning[Warning]
Do not operate the laptop while driving. Work as a pair, with the passenger operating it.
:::

1. Select **Calibration > Dynamic calibration**, then select **Start**.
2. Drive on a road that meets the conditions.
3. Follow the progress on the vehicle screen or on the laptop.
4. The calculation begins automatically at 100%.

Progress does not increase while the driving conditions are unmet. In stop-start traffic, for example, the speed condition is not met, so the distance grows while the progress stays where it is.

### Pass criteria

| Item | Pass criterion |
| --- | --- |
| Attitude estimate convergence | Standard deviation of 0.15° or less |
| Lane registration error | 0.25 m or less |
| Proportion of valid data | 60% or more |

## Interpret the result

### If it passes

The result is saved on the vehicle and can be read through the API. For how to read it, see [VELA Vehicle API: Check sensor state](../api/sensors.md).

| State | Meaning |
| --- | --- |
| `valid` | Valid |
| `stale` | 90 days have passed, or 500 km have been driven. Running it again is recommended |

### If it fails

| Failed item | Possible cause | What to do |
| --- | --- | --- |
| Target detection rate below criterion | A problem with board position or lighting | Check the positions and the lighting again |
| LiDAR angular deviation exceeded | Poor mounting tilt | Repeat step 3 of [Mount the LiDAR](./lidar-mount.md) |
| Camera reprojection error exceeded | A poor camera angle, or a dirty lens | Clean the lens and check the angle again |
| Registration error exceeded | Camera positions swapped | Check [the initial camera position mapping](./power-check.md#check-the-camera-position-mapping) again |
| Attitude estimate did not converge | The driving conditions were not met | Drive again on a road that meets them |

:::info[Caution]
Do not operate the vehicle with a failed calibration. Inaccurate sensor data lowers the reliability of every feature that uses it.
:::

## When to calibrate again

| Situation | Calibration needed |
| --- | --- |
| A sensor was removed and refitted | Static and dynamic |
| The body was deformed in an accident | Static and dynamic |
| The windscreen was replaced | Static and dynamic, for the front camera |
| A door mirror was replaced | Static and dynamic, for that side camera |
| Tyres of a different size were fitted | Dynamic |
| The state changed to `stale` | Dynamic |
| The suspension was replaced | Static and dynamic |

## Next

- [Inspect and maintain the kit](./maintenance.md)
