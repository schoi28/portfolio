---
title: Look up a term
doc_type: 레퍼런스
sidebar_label: 10. Look up a term
---

# Look up a term

The vehicle domain terms and abbreviations used in this document. They are explained for a reader who has web or server development experience but is new to the vehicle field.

The meaning of each API parameter and field is in the tables in the relevant chapter, and error codes are in [the reference](./reference.md#error-codes).

## Vehicle structure

| Term | Description |
| --- | --- |
| CCU (Central Computing Unit) | The central computer in the vehicle. VELA OS runs on it, and it is the only point that communicates with the cloud |
| Zonal ECU | A controller responsible for the devices in one area of the vehicle, where the vehicle is divided into front, rear, left, and right. `zone` in the API refers to this area |
| Zonal architecture | A design that places controllers by **location** rather than by function. Wiring is shorter and weight is lower |
| Automotive Ethernet | Ethernet used inside a vehicle. It needs fewer wires than ordinary Ethernet and is more resistant to electromagnetic interference |
| Telematics | Wireless communication between a vehicle and external servers, taken as a whole |
| VIN (Vehicle Identification Number) | The unique identifier of a vehicle. This API uses `vehicle_id` and does not expose the VIN directly |

## Industry structure

| Term | Description |
| --- | --- |
| OEM (Original Equipment Manufacturer) | A carmaker. A company that builds and sells vehicles, such as Hyundai, Kia, or Tesla |
| Tier 1 | A supplier that delivers parts or software directly to an OEM. VELA is one |
| Tier 2 | A supplier that delivers to a Tier 1 |
| SDV (Software Defined Vehicle) | A structure in which a vehicle's capabilities are determined by software rather than hardware. Features can be added after the vehicle leaves the factory |

## Software deployment

| Term | Description |
| --- | --- |
| OTA (Over-The-Air) | Updating software wirelessly, without bringing the vehicle into a workshop |
| Campaign | One unit of deploying a single package to a defined set of vehicles. It is the `campaign` API resource |
| Target group | The conditions that define which vehicles a deployment goes to: model, hardware configuration, and current version |
| Rollout | A deployment approach that widens the audience in stages, such as 1%, then 10%, then 100% |
| Gate | The criteria that decide whether a deployment advances to the next stage. Defined by success rate and error rate |
| Rollback | Returning deployed software to its previous version |
| Package | The bundle of software installed on a vehicle. Its signature must be verified before it is deployed |

## Communication and authentication

| Term | Description |
| --- | --- |
| mTLS (mutual TLS) | An arrangement in which server and client verify **each other's** certificates. Used between the vehicle and the cloud |
| Client credentials | The OAuth 2.0 flow in which an application obtains a token under its own identity, with nobody signing in |
| Scope | The extent of what a token is permitted to do |
| Webhook | An arrangement in which a server sends a request to a registered address when an event occurs. The opposite of polling |
| Signature verification | The procedure for confirming that a webhook you received really came from VELA |
| Idempotency | The property that sending the same request several times leaves the same result as sending it once |
| Rate limit | The maximum number of requests you can send in a given period |

## Sensors

| Term | Description |
| --- | --- |
| LiDAR | A sensor that measures distance with a laser and draws the surroundings as a collection of points |
| Calibration | The work of measuring where a sensor is actually fitted and at what angle, and telling the software |
| PTP (Precision Time Protocol) | The protocol that aligns the clocks of several sensors to within microseconds. `sensor.time_sync.offset` is that deviation |
| Diagnostic snapshot | A bundle of raw sensor data for one point in time. Used to investigate problems |

More sensor terms are in [the VELA Sense installation guide glossary](../sensor/glossary.md).

## Signals

| Term | Description |
| --- | --- |
| Signal | One data item a vehicle reports, such as `battery.soc` |
| Signal catalogue | The full list of available signals. It is in [the reference](./reference.md#signal-catalogue) |
| SoC (State of Charge) | Battery level, shown as a percentage |
| Reporting interval | How often the vehicle sends a given signal up |
| Latest value | The value the vehicle last reported. Not the current value |
