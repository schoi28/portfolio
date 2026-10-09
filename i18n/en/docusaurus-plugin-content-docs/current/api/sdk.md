---
title: Use an SDK
doc_type: 개념 + 절차
sidebar_label: 4. Use an SDK
---

# Use an SDK

VELA provides official SDKs for four languages. You can call the HTTP interface directly, but an SDK handles **obtaining and refreshing tokens, retries, and waiting for results** for you.

This chapter covers the SDKs as a whole. Every example request in the chapters that follow is written as `curl`, so if you are using an SDK, read them alongside the mapping in [REST operations and SDK methods](#rest-operations-and-sdk-methods).

## Supported languages and runtimes

| SDK | Supported | Used for |
| --- | --- | --- |
| Python | 3.9 or later | Server applications, analysis scripts |
| Node.js | 18 LTS or later | Web back ends |
| Java | 17 or later | OEM enterprise system integration |
| C++ | C++17, Linux (aarch64, x86_64) | In-vehicle applications |

:::note[Note]
The REST API itself can be called from any environment that has an HTTP client. The table above lists **the runtimes an SDK is provided for**. For a language that is not listed, implement the flow yourself using [Set up authentication](./authentication.md).
:::

## Install and create a client

Create the client once and reuse it. Creating one per request obtains a new token every time.

```bash
pip install vela-sdk          # Python
npm install @vela/sdk         # Node.js
```

For Java, add `com.vela:vela-sdk:1.x` from the Maven repository.

```python
from vela import VelaClient

client = VelaClient(
    client_id="...",
    client_secret="...",
    environment="staging",  # use "production" in production
)
```

```javascript
import { VelaClient } from '@vela/sdk';

const client = new VelaClient({
  clientId: '...',
  clientSecret: '...',
  environment: 'staging',
});
```

:::warning[Warning]
Do not put `client_secret` in source code or a repository. Read it from an environment variable or a secret management service.
:::

## The SDK handles authentication

The SDK obtains a token with the credentials you passed when creating the client, and **refreshes it 60 seconds before expiry**. You do not have to handle token expiry yourself.

| Implementing it yourself | Using an SDK |
| --- | --- |
| Send a token request | Automatic when the client is created |
| Remember the expiry time and refresh | Automatic |
| Attach the `Authorization` header to every request | Automatic |
| Specify scopes on the request | `scopes=[...]` when creating the client |

What each scope means and how to choose is in [Set up authentication](./authentication.md#choose-your-scopes).

## REST operations and SDK methods

The operations the following chapters describe with `curl` map to these SDK methods.

| What you do | REST | Python SDK |
| --- | --- | --- |
| List vehicles | `GET /vehicles` | `client.vehicles.list()` |
| Get one vehicle | `GET /vehicles/{id}` | `client.vehicles.get(id)` |
| Read the latest value | `GET /vehicles/{id}/signals/{signal}/latest` | `vehicle.signals.latest(signal)` |
| Read a time series | `GET /vehicles/{id}/signals/{signal}/history` | `vehicle.signals.history(signal, ...)` |
| Subscribe to a stream | `wss://stream.../signals/stream` | `vehicle.signals.stream([...])` |
| Send a remote command | `POST /vehicles/{id}/commands` | `vehicle.commands.send(name, **params)` |
| Read command status | `GET /vehicles/{id}/commands/{cid}` | `result.refresh()` |
| List sensors | `GET /vehicles/{id}/sensors` | `vehicle.sensors.list()` |
| Read calibration state | `GET /vehicles/{id}/sensors/calibration` | `vehicle.sensors.calibration()` |
| Create a campaign | `POST /campaigns` | `client.campaigns.create(...)` |
| Start a campaign | `POST /campaigns/{id}/start` | `campaign.start()` |
| Register a webhook | `POST /webhooks` | `client.webhooks.create(...)` |

Method names and arguments follow each language's own conventions. In Node.js it is `vehicle.signals.latest(signal)`, and in Java `vehicle.signals().latest(signal)`.

:::note[Note]
Parameter meanings, formats, and constraints are the same for the SDK and for REST. See [Browse the reference](./reference.md). This table tells you only **which method to call**.
:::

## Handle errors

The SDK turns a failure response into an exception. You do not need to check HTTP status codes yourself.

| Exception | HTTP | Safe to retry |
| --- | --- | --- |
| `VelaAuthError` | 401, 403 | No. Check the credentials and scopes |
| `VelaNotFoundError` | 404 | No |
| `VelaConflictError` | 409 | Yes, once the command in progress finishes |
| `VelaPreconditionError` | 422 `precondition_failed` | Yes, once the cause is resolved |
| `VelaUnreachableError` | 422 `vehicle_unreachable` | Yes |
| `VelaRateLimitError` | 429 | Yes. See the `retry_after` attribute |
| `VelaServerError` | 500, 503 | Yes |

```python
from vela import VelaPreconditionError, VelaRateLimitError

try:
    vehicle.commands.send("start_charging")
except VelaPreconditionError as e:
    print(f"Precondition unmet: {e.signal} = {e.current_value}")
except VelaRateLimitError as e:
    print(f"Retry in {e.retry_after} seconds")
```

An exception carries the `error.code` from the original response unchanged, in its `code` attribute. The full list of codes is in [Browse the reference](./reference.md#error-codes).

## Configure retries and timeouts

For failures that are safe to retry, the SDK applies **exponential backoff up to 3 times** by default.

| Setting | Default | How to change it |
| --- | --- | --- |
| Retry count | 3 | `VelaClient(max_retries=0)` |
| Backoff | Starts at 1 second and doubles | `VelaClient(backoff_factor=2.0)` |
| Request timeout | 10 seconds | `VelaClient(timeout=30)` |

:::info[Caution]
Retries apply automatically to read requests only. Remote commands are not retried automatically, to prevent duplicate execution. To retry a command, check the criteria in [Send remote commands](./remote-commands.md#timeout-and-retry-policy) and call it yourself.
:::

## Wait for an asynchronous result

A remote command separates acceptance from execution. The SDK's `wait()` checks the status for you until the command finishes.

```python
result = vehicle.commands.send("lock_doors")
result.wait(timeout=30)
print(result.status)  # "succeeded" | "failed" | "timed_out"
```

Internally `wait()` **polls the status endpoint every 2 seconds.** That suits a script waiting on a single command, but handling many commands at once raises the request count quickly and runs into the [rate limit](./reference.md#rate-limits).

**If you handle many commands in production, use [webhooks](./webhooks.md) instead of polling.**

## Call from inside the vehicle (C++)

The C++ SDK is for a service running on VELA OS that reaches **the local signal bus inside the vehicle** directly, without going through VELA Cloud.

```cpp
#include <vela/signal_client.hpp>

vela::SignalClient client;
auto soc = client.get_latest("battery.soc");
std::cout << "Battery level: " << soc.value << soc.unit << std::endl;
```

It differs from the other three SDKs.

| | Python · Node.js · Java | C++ |
| --- | --- | --- |
| What it calls | VELA Cloud | The signal bus inside the vehicle |
| Where it runs | An external server | Inside the vehicle |
| Authentication | Client credentials | VELA OS service registration |
| Network | Required | Not required |

The C++ SDK is available only to services registered with the VELA OS service framework. Ordinary server applications use the Python SDK or the REST API.

## SDK versions and API versions

**The SDK's major version corresponds to the API version.** `vela-sdk 1.x` calls API `v1`.

- A minor version increase in the SDK (`1.4` to `1.5`) does not break existing code.
- When a field is added to the API, it passes through in the response without an SDK update.
- When the API's major version increases, the SDK's major version increases too, and the previous version is supported according to the [versioning policy](./overview.md#versioning-policy).

## Next

- To read the data a vehicle reports, see [Read vehicle data](./vehicle-data.md).
- To instruct a vehicle, see [Send remote commands](./remote-commands.md).
