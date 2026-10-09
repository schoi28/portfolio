---
title: What the VELA Drive app is
doc_type: 개념
sidebar_label: 1. What the VELA Drive app is
---

# What the VELA Drive app is

VELA Drive is **an app that puts your car in your hand**.

Without walking out to the car you can see how much battery is left, whether the doors are locked, and whether the tyre pressures are fine. You can warm or cool the cabin before you set off, and use your phone as the key to open the doors. When you lend the car to family, you send them a key and take it back when they are done.

When new vehicle software is released the app tells you, and when a service is due it reminds you in advance. It also tells you whether the job needs a service centre or whether you can do it yourself.

## What you can find in this guide

| What you want to do | Where to look |
| --- | --- |
| Install the app and connect your vehicle | [2. Get started](./getting-started.md) |
| Check the battery and driving range | [3. Check your vehicle status](./vehicle-status.md) |
| Check tyre pressures and warning lights | [3. Check your vehicle status](./vehicle-status.md) |
| Lock or unlock the doors | [4. Control your vehicle remotely](./remote-control.md) |
| Set the cabin temperature before you drive | [4. Control your vehicle remotely](./remote-control.md) |
| Start or schedule charging | [4. Control your vehicle remotely](./remote-control.md) |
| Find where you parked | [4. Control your vehicle remotely](./remote-control.md) |
| Use your phone as the car key | [5. Manage your digital key](./digital-key.md) |
| Lend the car to family | [5. Manage your digital key](./digital-key.md) |
| Keep the software up to date | [6. Update the vehicle software](./software-update.md) |
| Check when a service is due | [7. Check service timing](./maintenance.md) |
| Work out why something is not working | [8. Solve problems](./troubleshooting.md) |
| Find a quick answer | [9. Browse frequently asked questions](./faq.md) |
| Manage the data that is collected | [10. Manage data and privacy](./privacy.md) |

## How the app reaches your vehicle

The app does not connect to the vehicle directly. A server called **VELA Cloud** sits between them.

![How the phone app, VELA Cloud and the vehicle connect](/img/app-connection.en.svg)

**The vehicle has to be somewhere it can communicate.** In an underground car park, where the signal does not reach, commands do not arrive and the values in the app do not change. You do not have to be near the car, but the car has to be where it has signal.

You can check the vehicle's connection from **Last contact** at the top of the home screen. The detail is in [Check your vehicle status](./vehicle-status.md#check-when-a-value-was-last-updated).

When you choose a remote control action, the app sends the command through VELA Cloud to the vehicle and shows you the result the vehicle actually reports back. So when the app shows **Done**, the vehicle really did it. If the vehicle cannot be reached, the action never turns into Done and is treated as a failure.

:::info[Caution]
If the vehicle is not driven for more than two weeks, it reports less often to save the battery. A slow response in the app is not a fault.
:::

## Next

[Get started](./getting-started.md) walks you through installing the app and connecting your vehicle. It takes about ten minutes.
