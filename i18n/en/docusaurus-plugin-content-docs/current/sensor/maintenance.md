---
title: Inspect and maintain the kit
doc_type: 절차
sidebar_label: 8. Inspect and maintain the kit
---

# Inspect and maintain the kit

Once the installation is finished, this chapter covers **inspection intervals, cleaning the optical window and lenses, checking connectors and brackets, replacing a module, and long-term storage.** A routine inspection takes about 30 minutes. After replacing a module you must always calibrate again.

## Inspection intervals

| Item | Interval | Time taken |
| --- | --- | --- |
| Clean the lenses and optical window | Every 2 weeks, or on a contamination alert | 10 minutes |
| Check connector engagement | Every 3 months | 15 minutes |
| Check bracket torque | Every 6 months | 20 minutes |
| Check the sealant | Every 6 months | 10 minutes |
| Check the calibration state | Every 3 months | 5 minutes |
| Run the full diagnostics | Every 6 months | 15 minutes |

If the validation vehicle is often used on rough roads or in wet conditions, halve these intervals.

## Clean the optical window and lenses

### What you need

| Item | Specification |
| --- | --- |
| Microfibre cloth | Lint free |
| Lens cleaning fluid | A neutral optical cleaner |
| Blower | A canned gas or a manual blower |

:::danger[Danger]
Always cut the power before cleaning. While the unit is running, do not look into the optical window with a magnifier or a camera that magnifies (Class 1M).
:::

### Procedure

:::warning[Warning]
Do not use a cleaner containing alcohol, acetone, or ammonia. Damage to the optical coating means replacing the part. Directing a pressure washer at a sensor is also prohibited.
:::

1. Switch the vehicle off and wait at least 5 minutes. Sensor surfaces can be hot.
2. Blow the dry dust off the surface with the blower.
3. Put a small amount of cleaning fluid on the microfibre cloth. Do not spray it on the surface.
4. Wipe gently in one direction. Do not rub in circles.
5. Remove any remaining fluid with a dry part of the cloth.

### Check after cleaning

1. Switch the vehicle on and run [the initial diagnostics](./power-check.md#4-run-the-initial-diagnostics).
2. Confirm the sensor state has returned to `ok`.

If it remains `degraded` after cleaning, the surface may be damaged or the problem may be internal.

## Check the connectors and brackets

### Connectors

1. Check each connector's lock by hand.
2. Look for moisture or corrosion around each connector.
3. Check that no cable tie has broken.

If you see corrosion, disconnect the connector and dry it. Where the contacts themselves have corroded, replace the cable.

### Bracket torque

| Part | Specified torque | When to retighten |
| --- | --- | --- |
| LiDAR bracket | 18 N·m ± 2 | Retighten below 16 N·m |
| LiDAR body | 9 N·m ± 1 | Retighten below 8 N·m |
| Camera side bracket | 2.5 N·m | Retighten below 2.0 N·m |
| Interface box | 8 N·m | Retighten below 7 N·m |

:::info[Caution]
If you retightened a bracket, check the calibration state and, if necessary, [calibrate again](./calibration.md#when-to-calibrate-again).
:::

## When to calibrate again

| Situation | What is needed |
| --- | --- |
| The state changed to `stale` | Dynamic calibration |
| A bracket was retightened | Static and dynamic |
| A sensor was removed and refitted | Static and dynamic |
| The windscreen or a door mirror was replaced | Static and dynamic |
| An accident or a heavy impact | Static and dynamic |

## Replace a module

### When a replacement is needed

| Symptom | Assessment |
| --- | --- |
| Still `degraded` after cleaning | The surface may be damaged |
| State is `fault` and a reboot does not recover it | A hardware failure |
| Physical damage | Replace immediately |
| Signs of water ingress | Replace immediately |

### Replacement procedure

1. Disconnect the negative terminal of the vehicle's 12V battery.
2. Disconnect that module's connector.
3. Remove the module from its bracket. Leave the bracket in place.
4. Fit the new module, to the specified torque.
5. Connect the connector and reconnect the battery.
6. Run [the initial diagnostics](./power-check.md#4-run-the-initial-diagnostics).
7. Carry out [static calibration](./calibration.md#run-the-static-calibration) and dynamic calibration.

:::warning[Warning]
Replacing a module invalidates the previous calibration values. Always calibrate again. Skipping it leaves the old module's corrections applied, which widens the error.
:::

### Record the replacement

Enter the serial number of the replaced module under **Module replacement history** on the diagnostic screen. It lets a later investigation trace what was replaced and when.

## Long-term storage

For a vehicle left unused for a month or more, do the following.

1. Clean the sensor surfaces.
2. Disconnect the `PWR` connector from the interface box.
3. Store the vehicle indoors, or fit a cover.

When bringing it back into use, run the full diagnostics and a dynamic calibration.

## Next

- [Troubleshoot a problem](./troubleshooting.md)
