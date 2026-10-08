---
title: Get started quickly
doc_type: 튜토리얼
sidebar_label: 3. Get started quickly
---

# Get started quickly

Send your first request in five minutes against a simulated vehicle in staging. You can see how the API behaves without a real vehicle.

## Check what you need

- The `client_id` and `client_secret` issued in [Set up authentication](./authentication.md)
- A terminal, or Python 3.9 or later

## Send your first request in five minutes

### 1. Get a token

```bash
export VELA_ACCESS_TOKEN=$(curl -s -X POST \
  https://api.staging.vela.example.com/v1/oauth/token \
  -d "grant_type=client_credentials" \
  -d "client_id=$VELA_CLIENT_ID" \
  -d "client_secret=$VELA_CLIENT_SECRET" \
  -d "scope=read:signals write:commands" \
  | python3 -c "import sys, json; print(json.load(sys.stdin)['access_token'])")
```

### 2. List the simulated vehicles

```bash
curl https://api.staging.vela.example.com/v1/vehicles \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "data": [
    {
      "vehicle_id": "sim_001",
      "model": "Hanul Motors EV Sedan",
      "software_version": "2026.8.2",
      "zones": ["front", "rear", "left", "right"]
    }
  ]
}
```

### 3. Read the battery level

```bash
curl https://api.staging.vela.example.com/v1/vehicles/sim_001/signals/battery.soc/latest \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

```json
{
  "signal": "battery.soc",
  "value": 68,
  "unit": "percent",
  "timestamp": "2026-09-03T02:14:00Z"
}
```

### 4. Send a remote command

Send a command to lock the doors. In staging this always succeeds after two seconds.

```bash
curl -X POST https://api.staging.vela.example.com/v1/vehicles/sim_001/commands \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"command": "lock_doors"}'
```

```json
{
  "command_id": "cmd_7f3a2b",
  "status": "pending"
}
```

Command results are handled asynchronously. To find out how to check the result, see [Send remote commands: handle asynchronous results](./remote-commands.md#handle-asynchronous-results).

That is the basic round trip. For a real integration, we recommend using an SDK.

## Call the API with the Python SDK

Use this from a server application. It obtains and refreshes tokens for you.

```bash
pip install vela-sdk
```

```python
from vela import VelaClient

client = VelaClient(
    client_id="...",
    client_secret="...",
    environment="staging",  # use "production" in production
)

vehicle = client.vehicles.get("sim_001")
soc = vehicle.signals.latest("battery.soc")
print(f"Battery level: {soc.value}{soc.unit}")

result = vehicle.commands.send("lock_doors")
result.wait(timeout=30)  # wait until the command finishes
print(result.status)  # "succeeded" | "failed" | "timed_out"
```

Internally `wait()` polls the command status endpoint at a short interval. If you handle many commands in production, we recommend receiving results through [webhooks](./webhooks.md) rather than polling.

## Call the API from inside the vehicle with the C++ SDK

Use this when a service running on VELA OS reaches the local signal bus directly, without going through VELA Cloud. This SDK runs only inside the vehicle. Requests that leave for VELA Cloud use the REST API described above.

```cpp
#include <vela/signal_client.hpp>

vela::SignalClient client;
auto soc = client.get_latest("battery.soc");
std::cout << "Battery level: " << soc.value << soc.unit << std::endl;
```

The C++ SDK is available only to services registered with the VELA OS service framework. Ordinary server applications use the Python SDK or the REST API.

## Next

- For the full list of data a vehicle reports, see [Read vehicle data](./vehicle-data.md).
- For the full list of remote commands and their preconditions, see [Send remote commands](./remote-commands.md).
