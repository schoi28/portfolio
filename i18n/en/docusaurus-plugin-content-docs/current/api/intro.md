---
title: VELA Vehicle API developer guide
sidebar_label: Design note
---

# VELA Vehicle API developer guide

:::note[Note]
This page is not part of the product documentation. It records how that documentation was designed. The manual itself starts with the next chapter.
:::

## How this was designed

| Design criterion | Decision |
| --- | --- |
| **Primary reader** | A developer integrating VELA into their own service |
| **Prior knowledge** | Assumes REST and OAuth, but treats vehicle electronics and VELA as new |
| **How they read** | Searches for the feature or value they need rather than reading in order |
| **Direction** | Teach the data model first, then separate procedures from reference values |

### Teaching the data model first

To use the API, a developer needs to understand **which resources exist and how they connect** before seeing a list of endpoints. Chapter 1 therefore carries the resource model and the system architecture, and the chapters after it cover individual features and how to use them.

The preface also states the prior knowledge expected. It assumes a working knowledge of REST APIs and OAuth 2.0, but requires no prior knowledge of the VELA platform or the vehicle domain.

This **keeps repetition of what the reader already knows to a minimum and concentrates on what is needed to understand a new product and a new domain.**

### Separating procedures from reference values

Reading vehicle data and sending remote commands are covered in task chapters, and values that are looked up repeatedly are collected in [Browse the reference](./reference.md). The **signal catalogue**, the full list of data items a vehicle reports, is separated from the procedures for the same reason.

**How to call it** is needed once, while first implementing a feature. **Which values exist** is needed again and again during implementation.

### Explaining vehicle terms that are new to developers

The glossary leads with **vehicle domain terms** such as CCU, zonal ECU, and OTA campaign rather than with elements a developer already knows, such as HTTP methods or `vehicle_id`. Where OEM and partner developers call the same thing by a different name from operators, a term mapping table is provided.

### Separating the REST and SDK paths

[Choose a starting path](./overview.md#choose-a-starting-path) is signposted so that developers calling the REST API directly and developers using an official Cloud SDK can each start from what they need.

The feature chapters explain requests and responses with `curl`, while SDK installation, authentication, exception handling, and a first usage example are collected in [Use an SDK](./sdk.md). **Rather than repeating the same feature as a per-language example**, the two paths are connected through a mapping between REST operations and Python SDK methods. The in-vehicle C++ SDK targets a different interface and is scoped out.

### Accounting for differences between environments

VELA provides a separate **staging environment** for testing an integration and a **production environment** connected to real vehicles. The conditions that differ between the two are explained in advance, so that a failure does not appear for the first time in production after passing in staging.
---

## The preface this produced

The following preface applies the decisions above. In the manual it appears before chapter 1.

### About this reference

This is the developer guide for the REST API and the official Cloud SDKs that VELA Cloud provides externally. It covers reading vehicle data, sending remote commands, and controlling software deployment.

| Area | Detail |
| --- | --- |
| Covered | Authentication, the official SDKs, reading vehicle data, remote commands, sensor state, OTA campaigns, webhooks, error handling |
| Not covered | Communication inside the vehicle and the local C++ SDK (zonal ECUs, internal VELA OS interfaces), operating the console by hand (see [VELA Deploy](../deploy/intro.md)), mounting sensors (see [VELA Sense](../sensor/intro.md)) |
| API version | `v1` |
| Base URL | `https://api.vela.example.com/v1` |

### Who this reference is for

It is written for developers integrating the VELA platform into their own systems. **It assumes you know REST and OAuth 2.0, and assumes VELA is new to you.**

| Role | What they do | Where to start |
| --- | --- | --- |
| **OEM application developer** | Uses vehicle data in a branded app | [What the VELA Vehicle API is](./overview.md), then [Choose a starting path](./overview.md#choose-a-starting-path), then [Read vehicle data](./vehicle-data.md) |
| **Supplier developer** | Builds features on the VELA platform | [Send remote commands](./remote-commands.md), [Receive events through webhooks](./webhooks.md) |
| **Release automation owner** | Runs deployment from code rather than the console | [Control OTA deployment](./ota.md), [VELA Deploy operations guide](../deploy/intro.md) |
| **Validation engineer** | Checks sensor state on development vehicles | [Check sensor state](./sensors.md), [VELA Sense installation guide](../sensor/intro.md) |

The reference assumes you can do the following:

- Read and write JSON, and work with HTTP methods and status codes
- Use the OAuth 2.0 client credentials flow
- Implement asynchronous handling, either by polling or by receiving webhooks

**No prior knowledge of autonomous driving or vehicle electronics is assumed.** The concepts you need are explained in [What the VELA Vehicle API is](./overview.md) and [Look up a term](./glossary.md).

Your first exercise depends on whether you call the REST API directly or use an SDK. See [Choose a starting path](./overview.md#choose-a-starting-path) for the reading order that matches your approach.

### Conventions

#### Admonitions

| Level | When this reference uses it |
| --- | --- |
| **Warning** | Leaked credentials, irreversible commands: anything that leads to serious harm |
| **Caution** | Expired tokens, duplicate events: recoverable errors |
| **Note** | Information that makes implementation easier |

**Danger never appears in this reference,** because there is no physical hazard.

#### Text formatting

| Format | Meaning |
| --- | --- |
| `GET /vehicles` | A method and path |
| `vehicle_id` | A parameter or field name |
| `{vehicle_id}` | A placeholder you replace with a value |
| **Bold** | The name of an element shown in the console |

Example requests are given as `curl`. SDK usage and the method mapping are collected in [Use an SDK](./sdk.md).

### Related documents

| Document | When to read it |
| --- | --- |
| [VELA Deploy operations guide](../deploy/intro.md) | When moving console deployment work into code |
| [VELA Sense installation guide](../sensor/intro.md) | When you need the physical meaning behind a sensor value |
| [Look up a term](./glossary.md) | When you meet a vehicle term or abbreviation you do not know |
