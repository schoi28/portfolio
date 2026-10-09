---
id: index
slug: /
title: Sample Docs
sidebar_label: Overview
sidebar_position: 0
---

# Sample Docs

**VELA is a fictional company that supplies vehicle software to carmakers.** Published here are four kinds of technical documentation written for VELA's mobile app, vehicle API, wireless update console, and sensor kit.

Each set is built differently, **according to what its reader does and what they already know.**

:::note[About these fictional products]
VELA and the products below are a fictional company and fictional products, created to show how documentation is designed. They do not describe any real product or organisation.
:::

## How to read this tab

Selecting a product brings up its **design note** first. **Chapter 1 onward is the manual itself,** written for real users.

| Part | What you can see | Who it is for |
| --- | --- | --- |
| **Design note** | Who it was written for, and why the contents, wording, and information layout were decided that way | A portfolio visitor assessing documentation design |
| **The manual from chapter 1** | Concepts, procedures, and reference material written as though VELA products were really in use | A visitor assessing how complete and usable the documentation is |

**For a quick look,** pick a product from the table below, read its design note, and then compare a chapter or two of the manual itself.

## What VELA does

VELA does not build cars. It supplies **the software that connects to a vehicle, and the products around it,** so that carmakers can develop and sell their vehicles.

Sensors go on development and validation vehicles, and developers use the API to work with vehicle data. Once a vehicle is on the road, operators deploy software to it wirelessly, and owners check its status from a mobile app. **The four products connect to each other inside one vehicle service this way.**

![How VELA Cloud, the vehicle, and the mobile app connect](/img/architecture-overview.en.svg)

## Four products, four kinds of document

| Document set | What the product does | Primary reader | What you can find |
| --- | --- | --- | --- |
| [VELA Drive app guide](./app/intro.md) | Checking vehicle status and controlling it remotely | Vehicle owner | App procedures · FAQ · troubleshooting |
| [VELA Vehicle API developer guide](./api/intro.md) | An API for reading and controlling vehicle data | Developer | Quickstart · API procedures · reference |
| [VELA Deploy operations guide](./deploy/intro.md) | Staged deployment of vehicle software, with pausing and recovery | Release operator | Deployment procedures · criteria to judge by · state and setting values |
| [VELA Sense installation guide](./sensor/intro.md) | A sensor kit for development and validation vehicles | Field engineer | Installation · wiring · inspection · diagnostics · specifications |

**The same feature is explained differently for each reader.** A wireless update, for example, is explained to a vehicle owner as *what to do once an alert arrives*, to an operator as *how to judge whether to widen or stop a deployment*, to a developer as *the API request format*, and to a field engineer as *the procedure for recovering from a failure*.

Seeing that difference first hand is the point of these Sample Docs.
