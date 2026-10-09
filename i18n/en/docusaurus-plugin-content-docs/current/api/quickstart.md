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

That is the basic round trip.

For a real integration, we recommend using an SDK rather than implementing token refresh and retries yourself. Installation and usage are in [Use an SDK](./sdk.md).

## Next

- For the full list of data a vehicle reports, see [Read vehicle data](./vehicle-data.md).
- For the full list of remote commands and their preconditions, see [Send remote commands](./remote-commands.md).
