---
title: Check your vehicle
doc_type: 개념
sidebar_label: 3. Check your vehicle
---

# Check your vehicle

The app shows you **the battery level and range, the door lock state, tyre pressures, vehicle warning lights, and your recent driving.** Every value appears with the time your vehicle last reported it.

## How the home screen is laid out

This is the first screen you see when you open the app. It has three areas.

![The three areas of the home screen](/img/app-home-layout.en.svg)

:::note[Note]
Some of the quick control buttons can look switched off, depending on the state of the vehicle. That means a condition is unmet and the control is unavailable for now.
:::

| Area | Position | What you see | Selecting it |
| --- | --- | --- | --- |
| Vehicle summary | Top | Battery level, range, door lock state, last communication time | Opens the vehicle detail screen |
| Quick controls | Middle | Locking, cabin temperature, charging, finding your vehicle | Runs that feature. See [Control your vehicle remotely](./remote-control.md) |
| Alerts | Bottom | Software updates, service due, sensor cleaning, vehicle warning lights | Opens an explanation of that item and what to do |

Selecting **Vehicle summary** opens a detail screen with battery, tyres, and your driving report as tabs. The first line of each section below gives the path to it.

## Check when a value was last updated

Below the vehicle summary area is **the time your vehicle last communicated.** Every value on the screen is what the vehicle reported at that moment.

> **Where to find it** Home screen, below the vehicle summary area

| Display | Meaning |
| --- | --- |
| Just now | Communicated within the last 5 minutes |
| 12 minutes ago | The value as of then. The vehicle's state may have changed since |
| Disconnected | No communication for 30 minutes or more |

Parked above ground after a drive, you will usually see **within 5 minutes**. In an underground car park, or anywhere the signal is weak, a longer gap is normal, and it recovers on its own once the vehicle comes back above ground.

:::info[Caution]
If the time does not change for **30 minutes or more** while parked somewhere with a good signal, or it stays on "Disconnected", something needs checking. See [Troubleshooting](./troubleshooting.md#my-vehicle-will-not-connect).
:::

## Battery and range

> **Where to find it** The vehicle summary area on the home screen. For detail, **Vehicle summary > Battery**

| Item | Description | Where |
| --- | --- | --- |
| Battery level | The percentage left in the drive battery | Home screen vehicle summary |
| Range | The estimated distance you can travel on the current charge | Home screen vehicle summary |
| Charging state | Whether charging is under way, and the time remaining | Vehicle summary > Battery |
| Battery health | Current capacity against the capacity when new | Settings > Vehicle information |

Range is calculated from your recent driving and the outside temperature. At the same battery level, the figure is lower in winter. This is not a fault.

:::note[Note]
Scheduling the cabin temperature lowers the range for a while. It does not if the charging cable is connected.
:::

## Tyre pressures

> **Where to find it** Vehicle summary > Tyres

The pressure in each of the four tyres is shown separately. A tyre outside the correct range is highlighted.

| State | Display | What to do |
| --- | --- | --- |
| Normal | Grey | Nothing |
| Low | Amber | Add air |
| Very low | Red | Have it checked before driving |

Pressures can read high just after a drive, because the temperature has risen. For an accurate reading, check 30 minutes after parking.

## Vehicle warning lights

> **Where to find it** The alerts area on the home screen

When a warning light comes on in the instrument cluster, the same item appears in the app's alerts area. Select it to see what the light means and what to do.

A warning light that affects driving appears at the top of the alerts area, and selecting it leads to directions to your nearest service centre.

## Driving report

> **Where to find it** Vehicle summary > Driving report

This summarises your recent driving.

1. On the home screen, select **Vehicle summary**.
2. Select the **Driving report** tab.
3. Select a period. You can choose weekly or monthly.

| Item | Description |
| --- | --- |
| Total distance | The distance accumulated over the period you chose |
| Average efficiency | Distance travelled per unit of energy |
| Driving time | The time the vehicle was switched on |
| Harsh acceleration and braking | The number of inputs stronger than the threshold |

The driving report is recalculated once a day, at **6 am**. Today's driving appears after 6 am tomorrow.

## Next

- To control your vehicle remotely, see [Control your vehicle remotely](./remote-control.md).
- If a value is not changing, see [Troubleshooting](./troubleshooting.md).
