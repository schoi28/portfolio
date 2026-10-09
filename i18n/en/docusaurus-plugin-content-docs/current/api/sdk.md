---
title: Use an SDK
doc_type: 개념 + 절차
sidebar_label: 4. Use an SDK
---

# Use an SDK

How to call VELA Cloud's REST API through an official SDK. An SDK obtains and refreshes the access token and builds the request headers for you, and it also supports retrying read requests and waiting for asynchronous command results.

This chapter uses **Python as the representative example language.** Node.js and Java developers should check how to install the SDK and create a client, then refer to the mapping in [REST operations and SDK methods](#rest-operations-and-sdk-methods). The other feature chapters explain calls with `curl`.

## Supported SDKs and their scope

| SDK | Supported environment | What it is for |
| --- | --- | --- |
| Python | Python 3.9 or later | Server applications and analysis scripts |
| Node.js | Node.js 18 LTS or later | Web backends |
| Java | Java 17 or later | OEM system integration |

All of the above call **VELA Cloud's REST API.** If you are not using an SDK, see [Set up authentication](./authentication.md) and [Get started with the REST API](./quickstart.md).

:::note[The scope of the in-vehicle C++ SDK]
VELA also provides a C++ SDK that lets an in-vehicle application reach the local signal bus. That SDK does not call VELA Cloud; it uses VELA OS service registration, which makes it a separate interface from the REST API and the server-side SDKs covered in this developer guide. **This chapter does not cover installing or calling the C++ SDK.**
:::

## Before you start

- Register an API client in the **staging environment**, following [Set up authentication](./authentication.md#1-register-a-client).
- Store `client_id` and `client_secret` in a secure environment variable or secret manager.
- Reading vehicle data requires the `read:signals` scope.
- The examples use `sim_001`, a simulated vehicle in staging.

:::warning[Warning]
Do not put `client_secret` directly into source code or commit it to a public repository. The examples below read the credentials from environment variables.
:::

## Install an SDK and create a client

### Python

```bash
python3 -m pip install vela-sdk
```

```python
import os
from vela import VelaClient

client = VelaClient(
    client_id=os.environ["VELA_CLIENT_ID"],
    client_secret=os.environ["VELA_CLIENT_SECRET"],
    environment="staging",
    scopes=["read:signals"],
)
```

### Node.js

```bash
npm install @vela/sdk
```

```javascript
import { VelaClient } from '@vela/sdk';

const client = new VelaClient({
  clientId: process.env.VELA_CLIENT_ID,
  clientSecret: process.env.VELA_CLIENT_SECRET,
  environment: 'staging',
  scopes: ['read:signals'],
});
```

For Java, add the Maven dependency `com.vela:vela-sdk:1.x`. The remaining examples in this chapter are written in Python.

**Create the client once and reuse it.** Creating a new one for every request can repeat token issuance needlessly. When you move to production, change both the environment and the credentials to their production values.

## Read your first vehicle data with an SDK

The example below uses the Python `client` created above.

1. Get the vehicle object for vehicle ID `sim_001`.
2. Read the latest value of the `battery.soc` signal.
3. Print the result.

```python
vehicle = client.vehicles.get("sim_001")
reading = vehicle.signals.latest("battery.soc")
print(reading)
```

This example corresponds to the REST call `GET /vehicles/{id}/signals/{signal}/latest`. For what the value and the time fields mean, see [Read vehicle data](./vehicle-data.md#read-the-latest-value).

:::note[Note]
`sim_001` in staging is an example vehicle. In production, use a real `vehicle_id` you have access to.
:::

## Understand authentication and scopes

The SDK obtains a token using the credentials passed when the client is created, and refreshes it **60 seconds before** it expires.

| Calling the REST API directly | Using an SDK |
| --- | --- |
| Send the token request | Handled by the SDK |
| Check expiry and reissue | Handled by the SDK |
| Add the `Authorization` header | Handled by the SDK |
| Specify the scopes | Pass `scopes=[...]` when creating the client |

Set the smallest scope the features you use require. What each scope allows is set out in [Set up authentication · choose your scopes](./authentication.md#choose-your-scopes).

## REST operations and SDK methods

The calls that the later feature chapters explain with `curl` correspond to the following Python SDK methods.

| What you want to do | REST API | Python SDK |
| --- | --- | --- |
| List vehicles | `GET /vehicles` | `client.vehicles.list()` |
| One vehicle | `GET /vehicles/{id}` | `client.vehicles.get(id)` |
| Read the latest value | `GET /vehicles/{id}/signals/{signal}/latest` | `vehicle.signals.latest(signal)` |
| Read a time series | `GET /vehicles/{id}/signals/{signal}/history` | `vehicle.signals.history(signal, ...)` |
| Subscribe to a stream | `wss://stream.../signals/stream` | `vehicle.signals.stream([...])` |
| Send a remote command | `POST /vehicles/{id}/commands` | `vehicle.commands.send(name, **params)` |
| Read command status | `GET /vehicles/{id}/commands/{cid}` | `result.refresh()` |
| List sensors | `GET /vehicles/{id}/sensors` | `vehicle.sensors.list()` |
| Calibration state | `GET /vehicles/{id}/sensors/calibration` | `vehicle.sensors.calibration()` |
| Create a campaign | `POST /campaigns` | `client.campaigns.create(...)` |
| Start a campaign | `POST /campaigns/{id}/start` | `campaign.start()` |
| Register a webhook | `POST /webhooks` | `client.webhooks.create(...)` |

`vehicle` in the table is the vehicle object fetched in the earlier example. `result` is the return value of sending a remote command. Method names and calling conventions vary by language: Node.js uses `vehicle.signals.latest(signal)`, while Java uses `vehicle.signals().latest(signal)`.

Use this table to find the Python SDK method for each REST operation. For request parameters and preconditions, and what a response means, see the **feature chapters** such as [Read vehicle data](./vehicle-data.md) and [Send remote commands](./remote-commands.md). The signal catalogue and the common error codes are in [Browse the reference](./reference.md).

## Handle exceptions

The SDK surfaces failure responses from the REST API as exceptions.

| Exception | HTTP status | What to do |
| --- | --- | --- |
| `VelaAuthError` | 401, 403 | Check the credentials and the scopes |
| `VelaNotFoundError` | 404 | Check the vehicle or resource identifier |
| `VelaConflictError` | 409 | Check whether a command in progress has finished |
| `VelaPreconditionError` | 422 `precondition_failed` | Meet the precondition and request again |
| `VelaUnreachableError` | 422 `vehicle_unreachable` | Check the vehicle's connection state |
| `VelaRateLimitError` | 429 | Wait as long as `retry_after` says |
| `VelaServerError` | 500, 503 | Check whether this is a temporary outage |

Remote commands need the `write:commands` scope. The client created earlier holds `read:signals` only, so create it again.

```python
client = VelaClient(
    client_id=os.environ["VELA_CLIENT_ID"],
    client_secret=os.environ["VELA_CLIENT_SECRET"],
    environment="staging",
    scopes=["read:signals", "write:commands"],
)
vehicle = client.vehicles.get("sim_001")
```

```python
from vela import VelaPreconditionError, VelaRateLimitError

try:
    result = vehicle.commands.send("start_charging")
except VelaPreconditionError as error:
    print(f"Precondition not met: {error.signal} = {error.current_value}")
except VelaRateLimitError as error:
    print(f"Rate limited: check again in {error.retry_after} seconds")
```

For the full set of failure codes and what they mean, see [Reference · error codes](./reference.md#error-codes).

## Configure retries and timeouts

The SDK applies exponential backoff **to retryable failures among read requests.** It does not apply automatic retries to remote commands.

| Setting | Default | Python example |
| --- | --- | --- |
| Read request retries | Up to 3 | `VelaClient(max_retries=0)` |
| Backoff | Starts at 1 second and doubles | `VelaClient(backoff_factor=2.0)` |
| Request timeout | 10 seconds | `VelaClient(timeout=30)` |

:::info[Caution]
A remote command is an action carried out on a real vehicle. Do not conclude from a request timeout alone that the command did not run and send the same command again. Read [the command status](./remote-commands.md#handle-asynchronous-results) first, then proceed according to [the retry policy](./remote-commands.md#timeout-and-retry-policy).
:::

## Wait for an asynchronous result

With a remote command, acceptance of the request and completion by the vehicle are separate. The SDK's `wait()` reads the command status until a result arrives.

```python
result = vehicle.commands.send("lock_doors")
result.wait(timeout=30)
print(result.status)  # "succeeded" | "failed" | "timed_out"
```

Internally, `wait()` **polls every two seconds.** It suits a script checking a single command, but handling many commands at once can affect your [rate limit](./reference.md#rate-limits).

For large volumes of commands, we recommend [Receive events through webhooks](./webhooks.md). `wait()` is **a way to wait for a command to finish**, not a way to resend a failed command automatically.

## Check the SDK and API versions

An SDK's major version corresponds to an API version: `vela-sdk 1.x` calls API `v1`.

- A minor SDK update (`1.4` to `1.5`) is compatible with existing code.
- When a field is added to the API, it can appear in responses even on an existing SDK.
- When the API's major version changes, so does the SDK's. Support periods follow [the API versioning policy](./overview.md#versioning-policy).

## Next

- To see which signals you can read, see [Read vehicle data](./vehicle-data.md).
- For command preconditions and result handling, see [Send remote commands](./remote-commands.md).
- The signal catalogue, error codes, and pagination rules are in [Browse the reference](./reference.md).
