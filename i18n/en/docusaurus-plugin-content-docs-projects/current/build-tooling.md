---
title: Building documentation build and check tooling
sidebar_label: Build and check tooling
description: I turned the failures that kept recurring in documentation work from something people had to be careful about into something the build checks.
---

# Building documentation build and check tooling

> Autonomous driving solution software company · Technical Writer · Jan 2025 to present

**I moved the documentation errors people had to remember and watch out for into automatic verification during the build. I designed the failure conditions, the requirements, and the verification criteria myself, and used AI during implementation.**

<Skills>Requirements specification · conditional content design · documentation check automation · static site generator design · OpenAPI · technical judgement</Skills>

| | |
| --- | --- |
| What I built | Static site generator · check tool · API document generator · build GUI |
| Failures removed | Customer information leaking across · web and PDF drifting apart · API documents going stale · broken links |
| Result | The widest delivery package is produced **in about 2 minutes** by a single build |

## What was difficult

**Some errors cannot be prevented by writing well.**

As products and versions multiplied, so did the things that had to be checked over and over while producing documents. The trouble was that almost all of it was for a person to remember and verify by hand.

- **Each customer gets a different set of features.** Delivery packages for several customers come from the same source, so the author had to remember which feature descriptions to include or exclude. Leave something out and the customer cannot learn about a feature they bought; include something wrongly and information meant for another customer is exposed.
- **Producing the web and the PDF separately let them drift apart.** Fix only one and the two outputs of the same document no longer match.
- **API schemas and lists of configuration values were hard to maintain by hand.** With the product changing constantly, documents were likely to fall behind the actual specification.
- **Link and anchor errors were hard to spot.** Across products and versions there are hundreds of documents, and no one can check every reference by hand.

What these have in common is that **document quality depended far too much on the author's attention.**

My initial plan was to use an open static site generator such as MkDocs. But the customisation we needed kept growing, and because the network in the deployment environment was unreliable, fully offline operation became a requirement too.

Rather than piling exceptions onto an existing tool, I judged it more appropriate to build one whose conditions I could control directly, and moved to building it myself.

## How I solved it

### Defining the failures first

Instead of writing code and then looking for bugs, I first listed the failures that could arise from the document structure, and used that list as the implementation requirements and the verification conditions.

For example:

- Conditional content markers nested inside each other
- A glossary term appearing inside a table
- An anchor pointing at a section in another file
- The appendix order changing, so the glossary file moves
- A development version accidentally included in a customer delivery package

What mattered in this work was less the coding than **defining valid input and every exceptional case without gaps.**

I specified up front what should be allowed, what counts as an error, and how far the tool should intervene when an error occurs.

### Separating design from implementation

I used AI during implementation, but I decided myself what problems the tool had to solve and how it had to behave.

| What I designed | What implementation used |
| --- | --- |
| The axes of conditional content: customer · internal/external · feature | AI-assisted writing of the implementation code |
| The levels it applies at: section · page · format | Parsing and processing logic |
| The syntax of the conditional content markers | Build scripts |
| Which errors to check for, and in what order of priority | Individual check routines |
| How to verify that an output matches its declared exposure scope | |
| How far automatic correction is allowed | |
| Whether the glossary is applied automatically or opt in | |
| Finding files by name rather than by location | |
| The decision to move from MkDocs to building our own | |

The crux here was not the implementation but **deciding what the system has to take responsibility for.**

If I had not defined customer information leaking across as the most dangerous failure, for example, there would be no reason to check whether an output's actual content matches its declared exposure scope.

Likewise, because I judged that results are hard to trust if an automation tool edits document content on its own, I limited how far it fixes the problems it finds.

### Turning recurring failures into check rules

| Failure point | How it is handled |
| --- | --- |
| Customer information leaking across | Each piece of content declares its exposure scope, and the build result is verified against that declaration. Three axes, customer, internal/external, and feature, are controlled at section, page, and format level |
| Web and PDF drifting apart | Both are generated from one source. The PDF is compressed after rendering, cutting its size by about 44% |
| API documents going stale | Endpoint and schema documents are generated from the OpenAPI specification, and additions, removals, and changes to types, constraints, and enum values are reported |
| Broken links and anchors | Target files and anchors are cross-checked across files to confirm they really exist |
| Terms readers will not know | A hover tooltip is applied at the first appearance of a registered glossary term. Not every term is processed automatically; only the entries specified |
| A development version delivered by mistake | The default build target is the latest release excluding development versions, and a development version is included only if explicitly selected |

### Making it usable by people who do not write docs

So that colleagues unfamiliar with the command line could build and check the same way, I built a web-based GUI.

I also added locking so that a build and a check running at the same time cannot collide over file state.

The scope included not only building the tool but **creating a workflow that gives the same result whoever runs it.**

## What I produced

| Tool | What it does |
| --- | --- |
| Static site generator | Generates web and PDF from one source and assembles per-customer content according to conditions |
| Check tool | Cross-checks links and anchors, validates conditional content markers, and verifies that outputs match their declared exposure scope |
| API document generator | Generates documents from the OpenAPI specification and reports what changed |
| Build GUI | Runs documentation builds and checks without the command line |
| Contributor documentation | A configuration guide and an authoring guide covering how to set up the tooling and how to write |

## Results

- Even the widest delivery package, covering the whole solution plus a combined PDF, **can now be produced in about 2 minutes by one build after selecting the settings.**
- Instead of the author remembering and checking each customer's content scope, **the build verifies the actual output.**
- Generating web and PDF from one source reduced the mismatches that came from maintaining two formats separately.
- One production environment now supports **documentation work on 3 to 4 products in parallel.**
- OpenAPI-based generation and change reports make differences between the product specification and the API documentation visible.
