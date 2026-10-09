---
title: Power up and check
doc_type: 절차
sidebar_label: 6. Power up and check
---

# Power up and check

Apply power for the first time after wiring, and confirm every sensor is detected.

:::info[Caution]
Do this chapter **before** refitting the mouldings and covers. If there is a problem you have to take them off again.
:::

## What you need

| Item | Specification |
| --- | --- |
| Multimeter | Resistance and voltage |
| Laptop | For access to the VELA Deploy console |

- **Conditions:** 1 person · about 30 minutes · before the mouldings and covers are refitted
- **Before you start:** [5. Wire the kit](./wiring.md) complete

## 1. Check before applying power

| Check | How |
| --- | --- |
| Power polarity | Check the `PWR` connector with a multimeter |
| Shorts | Measure the resistance between +12V and GND. 1 kΩ or more |
| Connector engagement | Inspect every port by eye |
| Tools left behind | Clear the work area |

:::warning[Warning]
Do not skip the short check. Connecting the battery with the wiring wrong damages the harness.
:::

## 2. Apply power

1. Reconnect the negative terminal of the vehicle's 12V battery.
2. Switch the vehicle on.
3. Watch the status LED on the interface box.

A normal boot follows the sequence below.

| Time | LED state | What is happening |
| --- | --- | --- |
| 0 s | Off, then white | Power applied |
| 3 s | White, flashing | Running self-checks |
| 15 s | Still flashing white | Detecting the sensors |
| 30 to 45 s | Green, steady | Normal. Every sensor is detected |

If it has not turned green after 45 seconds, something is wrong.

## 3. How to read the status LED

![What each status LED colour means](/img/sensor-led-states.svg)

| LED | Meaning | What to do |
| --- | --- | --- |
| White, flashing | Booting, or waiting for a link | Wait up to 45 seconds |
| Green, steady | Normal | Move on to the next step |
| Amber, flashing | Some sensors are not detected, or time synchronisation failed | Run the diagnostics in step 4 |
| Red, steady | A power fault or a hardware failure | Cut the power immediately |
| Off | No power is reaching the box | See "When no power reaches the box" below |

:::warning[Warning]
If the LED turns red, cut the power immediately. Leaving the circuit live makes the damage worse.
:::

### How to cut the power

This kit has no power switch of its own. **Disconnecting the negative (−) terminal of the vehicle's 12V battery** cuts the power.

### When no power reaches the box

If the LED stays off after you switch the vehicle on, no power is being supplied. Check in the following order.

1. Disconnect the negative terminal of the vehicle's 12V battery. **Do not touch a connector on a live circuit.**
2. Confirm the 15 A fuse at the take-off point has not blown.
3. Confirm the `PWR` connector is pushed fully into the interface box. A click means it is engaged.
4. Reconnect the negative terminal and switch the vehicle on.

If the LED is still off, see the "No power" entry in [Troubleshoot a problem](./troubleshooting.md#diagnostic-table-by-symptom).

## 4. Run the initial diagnostics

Run these with a laptop connected to the `DIAG` port.

1. Connect the laptop to the `DIAG` port with a USB-C cable.
2. Open `http://192.168.10.1` in a browser.
3. Select **Run initial diagnostics**.

The diagnostics take about 2 minutes and check the following.

| Item | Pass criterion |
| --- | --- |
| Supply voltage | 11.0 to 15.0 V |
| LiDAR link | Connected, with points being received |
| Camera links, 4 channels | Video on all 4 channels |
| Camera position mapping | Each channel's video matches its assigned position |
| Time synchronisation | Deviation of 10 microseconds or less |
| Ethernet output | A link to the central computing unit |
| Temperature | 70 °C or below inside the interface box |

### Check the camera position mapping

The diagnostic screen shows all four channels at once. Confirm for yourself that each one matches its actual position.

:::info[Caution]
The automatic diagnostics only check that video is arriving. They cannot tell which camera it came from. Follow the procedure below to **look at the diagnostic screen yourself and confirm the position of all four images.** A swapped cable that you do not catch here is hard to trace at the calibration stage.
:::

1. Have someone stand in front of the vehicle and raise a hand.
2. Confirm that person appears in the `CAM1` image.
3. Check the rear, left, and right the same way.

## 5. Respond to a diagnostic failure

| Result | Cause | What to do |
| --- | --- | --- |
| Supply voltage low | Undersized wiring or a poor contact | Check the wire size and that the terminals are properly tightened |
| No LiDAR link | The connector is not fully seated | Refit the locking ring |
| One camera channel missing | A problem with that connector | Refit the connector and run the diagnostics again |
| Camera positions swapped | A connector in the wrong port | Reconnect according to the colour table |
| Time synchronisation failed | Ethernet cable quality, or the `SYNC` wiring | Confirm shielded cable is being used |
| Temperature high | Not enough ventilation | Clear the space around the interface box |

Run the diagnostics again once you have fixed the problem. Move on when every item passes.

## 6. Refit the mouldings and covers

Refit them only after every diagnostic passes.

1. Refit in the reverse order of removal, checking that no cable is being pinched by a moulding.
2. Run the diagnostics **once more** afterwards. A connector can come loose during this work.

## Next

- [Calibrate the sensors](./calibration.md)
