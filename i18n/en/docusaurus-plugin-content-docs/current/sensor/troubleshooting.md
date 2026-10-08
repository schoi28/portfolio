---
title: Troubleshoot a problem
doc_type: 문제 해결
sidebar_label: 9. Troubleshoot a problem
---

# Troubleshoot a problem

The chapter for finding a cause from the symptom you are seeing. It holds **a diagnostic table by symptom, the list of error codes, and how to build a diagnostic snapshot for the support team.**

:::warning[Warning]
Always cut the power before disconnecting a connector for an inspection.
:::

## Diagnostic table by symptom

### No power

| Order | What to check | Normal reading | What to do if not |
| --- | --- | --- | --- |
| 1 | The LED | Lit | If it is off, go to the next check |
| 2 | The fuse | Continuity | If blown, find the cause of the short, then replace it |
| 3 | Voltage at the `PWR` connector | 11.0 to 15.0 V | With no voltage, check the take-off point |
| 4 | Connector engagement | Locked | Refit it |
| 5 | Ground resistance | 0.1 Ω or less | Redo the ground point |

:::warning[Warning]
A fuse that blows repeatedly means there is a short. Do not fit a higher rated fuse.
:::

### The LED flashes amber

Some sensors are not detected, or time synchronisation has failed.

| Order | What to check | What to do |
| --- | --- | --- |
| 1 | Run the diagnostics | See which item failed |
| 2 | The connector of the failed sensor | Refit it and run the diagnostics again |
| 3 | Cable damage | Inspect by eye and replace if damaged |
| 4 | Time synchronisation deviation | Above 10 µs, check the shielded cable |
| 5 | The sensor's own state | If `fault`, consider replacing the module |

### One camera has no video

| Cause | How to check | What to do |
| --- | --- | --- |
| The connector is not fully seated | Inspect that port by eye | Refit it |
| A broken cable | Swap it into a port known to work | Video appearing means the cable is at fault |
| A failed camera | Still no video with a known good cable | Replace the camera |
| A failed port | No video even with a known good camera | Replace the interface box |

Swapping into a port known to work is the quickest way to narrow down the cause.

### The camera positions look swapped

The cables are connected the wrong way round.

1. Check the connector colour on each camera cable.
2. Reconnect according to the colour table in [Wire the kit](./wiring.md#3-connect-the-data-cables).
3. Run [the camera position mapping check](./power-check.md#check-the-camera-position-mapping) in the diagnostics.
4. Calibrate again.

### Calibration keeps failing

| Failed item | What to check | What to do |
| --- | --- | --- |
| Target not detected | Board positions and lighting | Check the distances and the lighting again |
| LiDAR angular deviation exceeded | Mounting tilt | Measure again with a level and remount |
| Reprojection error exceeded | A dirty lens, or the angle | Clean it and try again |
| Registration error exceeded | Camera position mapping | Check the cable connections again |
| Attitude estimate did not converge | The driving conditions | Drive again on a road that meets them |
| Tyre pressures | Whether they are at the specified values | Set them and try again |

Tyre pressure is an often overlooked cause. A change in ride height throws off the reference position of every sensor.

### A sensor drops out intermittently while driving

This is most likely a poor contact caused by vibration.

| Check | How |
| --- | --- |
| Slack at the connector | Whether the 100 mm nearest the connector has slack |
| Cable fixing | Whether it is secured at 300 mm intervals or less |
| Bracket torque | Whether the specified torque is being held |
| Connector lock | Whether the locking ring is fully engaged |

A cable secured while pulled tight passes vibration straight into the connector.

### Performance drops only in the rain

| Cause | What to do |
| --- | --- |
| The front camera is outside the wiper sweep | Reposition the mounting |
| The optical window repels water less well | Clean it and check again |
| Moisture entering through damaged sealant | Reapply the sealant |

## Error codes

These are the codes shown on the diagnostic screen.

### Power and hardware

| Code | Meaning | What to do |
| --- | --- | --- |
| `HW_001` | Input voltage out of range | Check the wiring and the voltage |
| `HW_002` | Internal temperature exceeded | Clear the ventilation |
| `HW_003` | The interface box failed its self-check | Replace the module |
| `HW_004` | A power surge was detected | Inspect the wiring |

### Sensor links

| Code | Meaning | What to do |
| --- | --- | --- |
| `LNK_101` | No LiDAR link | Refit the connector |
| `LNK_102` | LiDAR data loss rate exceeded | Check the cable quality |
| `LNK_201` | No signal on a camera channel | Check that connector |
| `LNK_202` | Camera frames being dropped | Check the cable length and quality |
| `LNK_301` | Time synchronisation failed | Confirm shielded cable is in use |
| `LNK_302` | Time synchronisation deviation exceeded | Check the `SYNC` wiring |

### Sensor state

| Code | Meaning | What to do |
| --- | --- | --- |
| `SEN_401` | The LiDAR optical window is dirty | Clean it |
| `SEN_402` | LiDAR point count too low | Clean it and check again. Replace if it does not recover |
| `SEN_403` | Camera exposure fault | Check the lens |
| `SEN_404` | Camera focus fault | Replace the module |
| `SEN_405` | Sensor internal temperature exceeded | Check for exposure to direct sunlight |

### Calibration

| Code | Meaning | What to do |
| --- | --- | --- |
| `CAL_501` | Target detection failed | Check the board positions and the lighting |
| `CAL_502` | Angular deviation outside tolerance | Remount |
| `CAL_503` | Reprojection error exceeded | Clean the lens and try again |
| `CAL_504` | Registration error exceeded | Check the camera position mapping |
| `CAL_505` | The dynamic calibration values did not converge | Check the driving conditions again |
| `CAL_506` | The calibration data is corrupted | Start again from the static calibration |

## Send a diagnostic snapshot

If you cannot resolve the problem on site, build a diagnostic snapshot and pass it to the support team.

1. On the diagnostic screen, select **Generate diagnostic snapshot**.
2. Wait for it to finish. It takes between 3 and 10 minutes, and the file is usually between 500 MB and 2 GB.
3. Once it finishes, select **Download to laptop**.

If the vehicle is somewhere it can communicate, the snapshot is sent to the server automatically and you do not need to download it.

For how to collect a snapshot through the API, see [VELA Vehicle API: sensors](../api/sensors.md#download-a-diagnostic-snapshot).

## Next

- [Check the specifications](./specifications.md)
