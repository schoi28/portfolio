---
title: Get started with the REST API
doc_type: 튜토리얼
sidebar_label: 3. Get started with the REST API
---

# Get started with the REST API

A tutorial for sending `curl` requests against a simulated vehicle in the staging environment. You will obtain a token, read data, and have a remote command accepted, all without a real vehicle. If you are using an official SDK, start from [Use an SDK](./sdk.md) instead.

## Check what you need

- A `client_id` and `client_secret` issued in the **staging environment**, following [Set up authentication](./authentication.md#1-register-a-client)
- A client granted the `read:signals` and `write:commands` scopes
- A terminal with `curl` and Python 3 installed

Enter your credentials in a Bash terminal as follows. The secret is not shown on screen.

```bash
read -r -p "client_id: " VELA_CLIENT_ID
read -r -s -p "client_secret: " VELA_CLIENT_SECRET
echo
export VELA_CLIENT_ID VELA_CLIENT_SECRET
```

:::warning[Warning]
Do not put `client_secret` into example code or a Git repository. This document uses the value held in an environment variable.
:::

## Send your first request

### 1. Get a token

The command below extracts the access token from the authentication response and stores it in the `VELA_ACCESS_TOKEN` environment variable.

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
  "timestamp": "2026-09-03T02:14:00Z",
  "stale": false
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

Command results are handled asynchronously. For how to read the result, see [Remote commands · handle asynchronous results](./remote-commands.md#handle-asynchronous-results).

That covers the flow from obtaining a token through reading a signal to having a remote command accepted. `pending` is an acceptance state and does not mean the command succeeded.

If you would rather not implement token refresh and retry handling in your application yourself, see [Use an SDK](./sdk.md).

## Next

- For the full list of data a vehicle reports, see [Read vehicle data](./vehicle-data.md).
- For the full list of remote commands and their preconditions, see [Send remote commands](./remote-commands.md).
