---
title: Control your vehicle remotely
doc_type: 절차
sidebar_label: 4. Control your vehicle remotely
---

# Control your vehicle remotely

From the app you can **lock and unlock the doors, set the cabin temperature, start and schedule charging, and find where you parked.** You do not have to be next to your vehicle, but it does have to be somewhere it can get a signal.

## Conditions that apply to every remote command

A remote command fails depending on the state of the vehicle. It runs only when the conditions below are met.

| Condition | Why |
| --- | --- |
| The vehicle can get a signal | The command has to reach the vehicle |
| The 12V auxiliary battery is at 20% or above | At a low level the vehicle stops communicating |
| The last command has finished | Commands are handled one at a time |

When you send a command, the app shows "Sending", and changes to "Done" once the vehicle has carried it out. A command that does not finish within 30 seconds is treated as failed.

## Lock and unlock the doors

:::info[Caution]
Locking remotely while someone is inside the vehicle can set the alarm off when they open a door from inside.
:::

1. On the home screen, select **Lock** or **Unlock**.
2. The hazard lights flash once when the lock state changes.

After an unlock from the app, the doors relock on their own 30 seconds later. If no door is opened in that time, the vehicle returns to locked.

## Set the cabin temperature before you get in

This brings the cabin to the temperature you want before you drive. In an electric vehicle it can reduce your range.

1. On the home screen, select **Cabin temperature**.
2. Set the target temperature. The range is 17 to 28 °C.
3. Select **Start now**.

Cabin temperature control runs for up to 30 minutes and then switches off on its own.

### Schedule it for your departure time

1. On the **Cabin temperature** screen, select **Schedule**.
2. Set your departure time and the days to repeat.
3. Select **Save**.

The vehicle starts early enough to reach the target temperature by the departure time you set. The start time is worked out from the outside temperature.

:::note[Note]
Scheduling the cabin temperature with the charging cable connected does not reduce your range.
:::

## Start and stop charging

The charging cable has to be connected.

1. On the home screen, select **Charging**.
2. Select **Start charging** or **Stop charging**.

### Schedule charging

To charge when electricity is cheaper, use a schedule.

1. On the **Charging** screen, select **Schedule**.
2. Set the time to start charging and the target charge level.
3. Select **Save**.

Even with a schedule set, selecting **Charge now** just after connecting the cable starts charging straight away.

## Find where you parked

1. On the home screen, select **Find vehicle**.
2. Your last parking position appears on the map.
3. If you are close by, select **Horn and hazards**. The hazard lights flash three times and the horn sounds once.

The parking position is recorded at the moment you switched the vehicle off. If the vehicle was towed after that, the position does not change.

## When a command does not run

| Symptom | Cause | What to do |
| --- | --- | --- |
| "Cannot reach your vehicle" | It is parked somewhere with no signal | Try again once the vehicle is above ground |
| "Your vehicle is not responding" | The auxiliary battery level is too low | Switch the vehicle on to charge it, then try again |
| "The previous command is still running" | Commands overlapped | Wait 30 seconds and try again |
| Cabin temperature control switches off after 30 minutes | This is normal | Start it again if you need to |
| A cabin temperature schedule does not run | A software update is installing | It runs again once the update finishes |
