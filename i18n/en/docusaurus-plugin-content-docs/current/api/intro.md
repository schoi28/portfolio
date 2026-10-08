---
title: VELA Vehicle API
doc_type: 개념
sidebar_label: Preface
---

# VELA Vehicle API

## About this reference

This is the reference for the REST API and SDKs that VELA Cloud exposes. It covers reading vehicle data, sending remote commands, and controlling software deployment.

| Area | Detail |
| --- | --- |
| Covered | Authentication, reading vehicle data, remote commands, sensor state, OTA campaigns, webhooks, error handling |
| Not covered | Communication inside the vehicle (zonal ECUs, internal VELA OS APIs), operating the console by hand (see [VELA Deploy](../deploy/intro.md)), mounting sensors (see [VELA Sense](../sensor/intro.md)) |
| API version | `v1` |
| Base URL | `https://api.vela.example.com/v1` |

## Who this reference is for

It is written for developers integrating the VELA platform into their own systems. **It assumes you know REST and OAuth 2.0, and assumes VELA is new to you.**

| Role | What they do | Where to start |
| --- | --- | --- |
| **OEM application developer** | Uses vehicle data in a branded app | [What the VELA Vehicle API is](./overview.md), then [Get started quickly](./quickstart.md), then [Read vehicle data](./vehicle-data.md) |
| **Supplier developer** | Builds features on the VELA platform | [Send remote commands](./remote-commands.md), [Receive events through webhooks](./webhooks.md) |
| **Release automation owner** | Runs deployment from code rather than the console | [Control OTA deployment](./ota.md), [VELA Deploy operations guide](../deploy/intro.md) |
| **Validation engineer** | Checks sensor state on development vehicles | [Check sensor state](./sensors.md), [VELA Sense installation guide](../sensor/intro.md) |

The reference assumes you can do the following:

- Read and write JSON, and work with HTTP methods and status codes
- Use the OAuth 2.0 client credentials flow
- Implement asynchronous handling, either by polling or by receiving webhooks

**No prior knowledge of autonomous driving or vehicle electronics is assumed.** The concepts you need are explained in [What the VELA Vehicle API is](./overview.md) and [Look up a term](./glossary.md).

## Conventions

### Admonitions

| Level | When this reference uses it |
| --- | --- |
| **Warning** | Leaked credentials, irreversible commands: anything that leads to serious harm |
| **Caution** | Expired tokens, duplicate events: recoverable errors |
| **Note** | Information that makes implementation easier |

**Danger never appears in this reference,** because there is no physical hazard. The full definition of all four levels is in [Conventions](../#conventions).

### Text formatting

| Format | Meaning |
| --- | --- |
| `GET /vehicles` | A method and path |
| `vehicle_id` | A parameter or field name |
| `{vehicle_id}` | A placeholder you replace with a value |
| **Bold** | The name of an element shown in the console |

Every example request is given as `curl`, with the same call shown through the Python SDK.

## Related documents

| Document | When to read it |
| --- | --- |
| [VELA Deploy operations guide](../deploy/intro.md) | When moving console deployment work into code |
| [VELA Sense installation guide](../sensor/intro.md) | When you need the physical meaning behind a sensor value |
| [Look up a term](./glossary.md) | When you meet a vehicle term or abbreviation you do not know |

---

## Design note

> A record of why this document is built the way it is. It is not part of the product documentation.

**Reader**: a developer doing the integration. I assumed they know REST and OAuth but are meeting VELA for the first time. They do not read in order; they search for the one thing they need.

**Structure**: the resource model table comes before the endpoint list. The first thing a developer needs is what the data model looks like. The architecture diagram sits right after it for the same reason: knowing which part of the system this API owns is what makes the scope of every later chapter legible.

**Why the preface and chapter 1 are separate**: a developer arriving from a search result never reads the preface. So **how to read the document** (reader definition, conventions) is split from **what you need to understand the product** (resource model, architecture). The second is something you return to from any chapter, so it has to be a chapter of its own.

**Information typing**: each chapter is a procedural document covering one resource, and every value you look up is collected in [Browse the reference](./reference.md). Moving the signal catalogue out of the vehicle data chapter into the reference is one example. A developer searches for "how do I fetch this" and "what values exist" at different moments: the first once, the second continuously throughout the work. Keeping both in one chapter lets a long table interrupt a procedure.

**Why there is a terminology mapping table**: the users of this API are carmakers and their suppliers. They call the same things by different names than operators and end users do. Providing the mapping once removes the translation burden from the rest of the document.

**Why the glossary holds domain terms rather than API terms**: what `vehicle_id` means is the reference's job. What stops a developer is not that; it is **vehicle domain vocabulary such as CCU, zonal ECU, and OTA campaign**. The glossary is written for a junior developer whose experience is entirely web and server work.

**Why the signal catalogue is generated from the specification**: a signal table maintained by hand always drifts from the real API. Generating the documents from the OpenAPI specification removes the chance of drift. **Building a structure that cannot be wrong** is more reliable than trying to write accurately.

**Why staging behaviour is documented**: without stating how staging differs, a developer meets a precondition failure for the first time in production. Telling the reader about failure in advance is the single biggest factor in reducing support questions, and that principle applies to API documentation as much as to anything else.
