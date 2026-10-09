---
title: Set up authentication
doc_type: 절차
sidebar_label: 2. Set up authentication
---

# Set up authentication

The VELA Vehicle API uses two authentication methods. Server applications calling the API use **OAuth 2.0 client credentials**. Vehicles talking directly to VELA Cloud use **mutual TLS** (mTLS). This chapter covers the first one, server to server.

## Authenticate with OAuth 2.0

This is not a flow where a person signs in. A registered application obtains a token with its own credentials.

### 1. Register a client

:::warning[Warning]
Never put `client_secret` in client-side code or a public repository. Keep it in a server environment variable or a secret management system.
:::

Clients are registered in the VELA Deploy console. Your account manager issues the console address and the first account when the contract is signed.

| Environment | Console address |
| --- | --- |
| Staging | `https://console.staging.vela.example.com` |
| Production | `https://console.vela.example.com` |

:::note[Note]
Creating an API client requires the **Administrator** role on your console account. Without it, **API clients** does not appear under **Settings**. Ask your organisation's console administrator.
:::

1. Sign in to the console and select **Settings > API clients**.
2. Select **Create client**, then give it a name and the scopes it needs.
3. Store the `client_id` and `client_secret` somewhere safe. `client_secret` is shown once, immediately after creation.

### 2. Get an access token

The example below uses the `VELA_CLIENT_ID` and `VELA_CLIENT_SECRET` environment variables from the previous step. Do this only when authenticating directly with `curl`. If you use an official SDK, the SDK obtains and refreshes the token for you.

```bash
curl -X POST https://api.vela.example.com/v1/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=$VELA_CLIENT_ID" \
  -d "client_secret=$VELA_CLIENT_SECRET" \
  -d "scope=read:signals write:commands"
```

Response:

```json
{
  "access_token": "vla_at_9f2c...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "read:signals write:commands"
}
```

### 3. Attach the token to a request

Keep the `access_token` value from the previous step in the `VELA_ACCESS_TOKEN` environment variable and use it in your requests.

```bash
curl https://api.vela.example.com/v1/vehicles \
  -H "Authorization: Bearer $VELA_ACCESS_TOKEN"
```

## Choose your scopes

Grant a client the smallest scope it needs. Scopes map to the resources in the resource model.

| Scope | What it allows |
| --- | --- |
| `read:signals` | Reading the latest value and time series for a signal |
| `stream:signals` | Subscribing to a signal stream |
| `write:commands` | Sending remote commands |
| `read:sensors` | Reading sensor state and calibration results |
| `write:campaigns` | Creating and editing OTA campaigns |
| `read:campaigns` | Reading OTA campaigns and deployment state |
| `manage:webhooks` | Registering and deleting webhooks |

A request outside the granted scopes returns `403 insufficient_scope`, even with a valid `client_id`.

## Refresh the token

An access token is valid for one hour. When it expires, repeat step 2 to obtain a new one. There is no separate refresh token. In the client credentials flow, requesting again is the refresh.

:::info[Caution]
A token that is not refreshed before it expires causes in-flight requests to fail with `401 token_expired`. Refresh from ten minutes before expiry.
:::

## Understand vehicle-side authentication

When VELA OS in a vehicle talks to VELA Cloud, it uses certificate-based mTLS rather than the flow described here. A unique certificate is issued when the vehicle is built, and no developer configuration is required. Application developers never touch this flow, so it is not documented separately.

## Handle authentication failures

| Status code | `error.code` | Cause |
| --- | --- | --- |
| 401 | `missing_credentials` | No Authorization header |
| 401 | `invalid_client` | Wrong `client_id` or `client_secret` |
| 401 | `token_expired` | The access token has expired |
| 403 | `insufficient_scope` | The token does not carry the required scope |
| 403 | `client_disabled` | The client is disabled. Re-enable it in the console |

```json
{
  "error": {
    "code": "insufficient_scope",
    "message": "This token does not have the write:commands scope.",
    "required_scope": "write:commands"
  }
}
```

## Next

If you are calling the REST API directly, continue to [Get started with the REST API](./quickstart.md). If you are using an SDK, skip the token step and create a client in [Use an SDK](./sdk.md).
