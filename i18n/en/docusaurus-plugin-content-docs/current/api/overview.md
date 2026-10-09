---
title: What the VELA Vehicle API is
doc_type: 개념
sidebar_label: 1. What the VELA Vehicle API is
---

# What the VELA Vehicle API is

A REST API for reading vehicle data and sending remote commands.

```
https://api.vela.example.com/v1
```

VELA is a Tier 1 supplier that provides vehicle software platforms to carmakers. This API is the interface VELA Cloud exposes, and an OEM's own systems use it exactly as the VELA Drive reference app does. **Every feature of the VELA Drive app can be built with this API.** If you need something that is not here, [get in touch](#support).

## Resource model

API resources map to the names used in the other documents as follows.

| API resource | Operations console | App screen | Description |
| --- | --- | --- | --- |
| `vehicle` | Vehicle | My vehicle | One registered vehicle |
| `signal` | Signal | (not shown) | One data item the vehicle reports |
| `command` | Remote command | Quick controls | An instruction sent to the vehicle |
| `campaign` | Campaign | Software update | One unit of deployment |
| `sensor` | Sensor | (not shown) | A sensor module fitted through VELA Sense |
| `zone` | Zone | (not shown) | A physical area of the vehicle: front, rear, left, right |

## Where this API sits in the system

![The part of the system the VELA Vehicle API covers](/img/api-architecture.svg)

This API is the boundary between VELA Cloud and the applications above it. Communication inside the vehicle below the CCU, meaning the zonal ECUs and VELA Sense, is outside the scope of this API and is handled by VELA OS.

---

## Before you build

The following three points differ from a typical web API. Build without knowing them and **your code passes in staging and fails in production.**

### The vehicle is not always connected

In an underground car park, or once the vehicle enters battery protection mode, the connection drops. A read through this API therefore does not ask the vehicle now. It returns **the last value the vehicle reported**. Every response carries `reported_at` alongside the value.

:::info[Caution]
Using a value without checking `reported_at` means showing someone a battery level from several hours ago as if it were current. Show the reported time next to any value you put on screen.
:::

### Remote commands do not finish immediately

Unlike a read, a command does not return its result straight away.

![How a remote command is handled asynchronously](/img/api-command-flow.svg)

:::warning[Warning]
`202 Accepted` means only that the request was received. It does not mean the vehicle carried out the command. Do not treat this response as success.
:::

If the vehicle is not connected, the command waits in a queue and eventually expires. **Never treat `202` as success.** The full handling pattern is in [Send remote commands](./remote-commands.md).

### Staging does not check preconditions

Simulated vehicles in staging have a `vehicle_id` beginning with `sim_`. A remote command sent to one returns **a success response every time** after a two second delay, skipping precondition checks such as whether the vehicle is parked or how much battery it has.

:::warning[Warning]
Because of this, a response such as "failed because the vehicle is not parked" appears for the first time in production. Build the failure paths in advance from [Preconditions by command](./remote-commands.md#preconditions-by-command) and [Error codes](./reference.md#error-codes).
:::

---

## Request and response format

| Item | Specification |
| --- | --- |
| Protocol | HTTPS only. **TLS 1.2 or later** |
| Request body | `application/json`, UTF-8 |
| Response body | `application/json`, UTF-8 |
| Time | RFC 3339 (`2026-03-04T18:22:31Z`). All times are UTC |
| Units | SI units. Distance in km, temperature in °C, power in kW, ratios as a percentage |
| Identifiers | Strings. Do not parse them as numbers |
| Unknown fields | New fields can appear in a response. Build your client to ignore them |

## Environments

| Environment | Base URL | Purpose |
| --- | --- | --- |
| Staging | `https://api.staging.vela.example.com/v1` | Integration work and testing. Returns simulated vehicle data |
| Production | `https://api.vela.example.com/v1` | Communicates with real vehicles |

Credentials are issued per environment. A staging token does not work in production.

## SDKs

VELA provides official SDKs for four languages: Python, Node.js, Java, and C++. An SDK handles obtaining and refreshing tokens, retries, and waiting for results.

Installation and usage are in [Use an SDK](./sdk.md). Every example request in this guide is written as `curl`, and the mapping to SDK methods is collected in [REST operations and SDK methods](./sdk.md#rest-operations-and-sdk-methods).

## Rate limits and errors

| Item | Summary | Detail |
| --- | --- | --- |
| Rate limit | 600 requests per minute per client. `429` when exceeded | [Reference](./reference.md#rate-limits) |
| Error format | Every failure response carries `error.code` and `error.message` | [Reference](./reference.md#error-codes) |
| Pagination | Cursor based. No `next_cursor` means the last page | [Reference](./reference.md#pagination) |

## Versioning policy

- The API version appears in the URL path (`/v1`).
- The version increases only on a breaking change: removing a field, changing a type, or adding a required parameter. Adding a field does not change the version.
- A previous version is supported for **at least 18 months** after the next one is released. Notice goes to the registered email address six months before support ends.
- End-of-support dates are in [Reference: change history](./reference.md#change-history).

## Support

| Reason | Where to go |
| --- | --- |
| Technical questions, bug reports | VELA Deploy console, **Support > Contact us** |
| New feature requests, additional scopes | Your account manager |
| Incident notices | Status page at `status.vela.example.com` |

## What you can find in this reference

| What you want to do | Where to look |
| --- | --- |
| Get a token and attach it to a request | [2. Set up authentication](./authentication.md) |
| Decide the scopes you need | [2. Set up authentication](./authentication.md#choose-your-scopes) |
| Send your first request in five minutes | [3. Get started quickly](./quickstart.md) |
| Install an SDK and create a client | [4. Use an SDK](./sdk.md#install-and-create-a-client) |
| Translate a curl example into an SDK method | [4. Use an SDK](./sdk.md#rest-operations-and-sdk-methods) |
| Handle the exceptions an SDK raises | [4. Use an SDK](./sdk.md#handle-errors) |
| Read a current value such as battery level or range | [5. Read vehicle data](./vehicle-data.md#read-the-latest-value) |
| Chart how a value changed over a period | [5. Read vehicle data](./vehicle-data.md#read-a-time-series) |
| Receive values as they change | [5. Read vehicle data](./vehicle-data.md#subscribe-to-a-stream) |
| Lock the doors or set the cabin temperature | [6. Send remote commands](./remote-commands.md) |
| Confirm a command actually ran | [6. Send remote commands](./remote-commands.md#handle-asynchronous-results) |
| Read LiDAR and camera state and calibration results | [7. Check sensor state](./sensors.md) |
| Start a software deployment from code and watch its progress | [8. Control OTA deployment](./ota.md) |
| Receive events instead of polling | [9. Receive events through webhooks](./webhooks.md) |
| Verify that a webhook really came from VELA | [9. Receive events through webhooks](./webhooks.md#verify-the-signature) |
| Find the full list of available signals | [10. Browse the reference](./reference.md#signal-catalogue) |
| Look up a failure code and its cause | [10. Browse the reference](./reference.md#error-codes) |
| Look up a vehicle term or abbreviation | [11. Look up a term](./glossary.md) |

## Next

- Set up [authentication](./authentication.md) before sending any request.
- If this is your first time, send a request in five minutes with the [quickstart](./quickstart.md).
