---
title: Wire the kit
doc_type: 절차
sidebar_label: 5. Wire the kit
---

# Wire the kit

Connect the sensor cables to the interface box and wire the power.

:::danger[Danger]
Before any power wiring, check again that the negative terminal of the vehicle's 12V battery is disconnected. Working on a live circuit can cause a fire through a short.
:::

## What you need

| Item | Specification |
| --- | --- |
| Torque wrench | 5 to 25 N·m |
| Multimeter | Resistance and voltage |
| Cable ties | Heat resistant |

- **Conditions:** 1 person · about 90 minutes · vehicle battery negative terminal disconnected
- **Before you start:** [4. Mount the cameras](./camera-mount.md) complete, mouldings and covers removed

## Wiring layout

![How the sensors, the interface box and the central computing unit are wired](/img/sensor-wiring.en.svg)

:::note[Note]
The cameras have no separate power cable. The interface box sends video and power together down a single coaxial cable.
:::

Each camera receives video and power over one coaxial cable. No separate power cable is needed.

## 1. Fix the interface box

:::warning[Warning]
Do not place the interface box on the floor of the spare wheel well. It is damaged if water gets in.
:::

1. Fix the bracket to the left wall of the boot with four bolts, to **8 N·m**.
2. Fit the interface box into the bracket and lower the locking lever.
3. Confirm the vents are not blocked. Leave at least 100 mm clear around them.

## 2. Connector pin map

This is the connector layout on the back of the interface box.

| Port | Type | What it connects to |
| --- | --- | --- |
| `PWR` | 2 pin | Vehicle 12V power |
| `LIDAR` | RJ45, shielded | LR-40 LiDAR |
| `CAM1` to `CAM4` | FAKRA coaxial | The four cameras |
| `ETH-OUT` | RJ45, shielded | Central computing unit |
| `SYNC` | 4 pin | Time synchronisation, optional |
| `DIAG` | USB-C | Diagnostic laptop |

### PWR connector pinout

| Pin | Colour | Signal | Specification |
| --- | --- | --- | --- |
| 1 | Red | +12V | 8 A maximum |
| 2 | Black | GND | None |

### SYNC connector pinout

Connect this only when using an external GNSS time source. Without it, the interface box runs on its own time source.

| Pin | Signal | Description |
| --- | --- | --- |
| 1 | PPS+ | One pulse per second signal |
| 2 | PPS− | Signal ground |
| 3 | NMEA | Time information |
| 4 | GND | Ground |

## 3. Connect the data cables

:::info[Caution]
A camera connector in the wrong port works electrically but leaves the positions detected the wrong way round. The cause is hard to find at the calibration stage, so always check it here.
:::

1. Connect the LiDAR Ethernet cable to the `LIDAR` port.
2. Connect the camera cables to `CAM1` through `CAM4` by colour.

   | Connector colour | Port | Position |
   | --- | --- | --- |
   | Blue | `CAM1` | Front |
   | Green | `CAM2` | Rear |
   | Yellow | `CAM3` | Left |
   | White | `CAM4` | Right |

3. Connect `ETH-OUT` to the expansion Ethernet port on the central computing unit.

## 4. Wire the power

### Where to take power from

| Item | Value |
| --- | --- |
| Take-off point | A permanent live terminal in the boot junction box |
| Fuse rating | 15 A |
| Fuse position | Within 300 mm of the take-off point |
| Wire size | 2.0 sq or larger |

:::danger[Danger]
Do not omit the fuse or fit one with a higher rating. A short can set the harness alight.
:::

1. Take power from a permanent live terminal in the junction box.
2. Install a 15 A fuse holder within 300 mm of the take-off point.
3. Connect the power wire to pin 1 of the `PWR` connector.

### Ground

:::warning[Warning]
Do not drill a new hole in the body to make a ground point. Corrosion starts there and the anti-corrosion warranty is void.
:::

1. Connect the ground wire to a factory ground point on the body.
2. Remove the paint at the ground point to expose bare metal.
3. Tighten the bolt to **9 N·m**.

| Check | Criterion |
| --- | --- |
| Ground resistance | 0.1 Ω or less |
| Ground point | A factory ground point. No new holes |

## 5. Secure the cables

1. Secure every cable to the factory harness with cable ties, at **300 mm intervals or less**.
2. Leave the 100 mm nearest each connector unsecured, with slack.
3. Fit protective sleeving where a cable passes a sharp sheet metal edge.

## Checks

Confirm the following before reconnecting the battery.

| Check | Criterion |
| --- | --- |
| Power polarity | Pin 1 red (+), pin 2 black (GND) |
| Fuse | 15 A, within 300 mm of the take-off point |
| Ground resistance | 0.1 Ω or less |
| Camera port colours | Matching the table |
| Connector engagement | Every port locked |
| Cable fixing | At 300 mm intervals or less |
| Tools and parts left behind | None in the boot or engine bay |

Always check the last item. A tool left behind moves around while driving and causes noise and damage.

## Next

- [Power up and check](./power-check.md)
