---
title: Building a combined solution documentation set
sidebar_label: Combined solution docs
description: I designed the English user documentation for five products and completed 171 documents.
---

# Building a combined solution documentation set

> Autonomous driving solution software company · Technical Writer · Jan 2025 to present

**I brought five autonomous driving products, whose documentation was either missing or scattered across different formats, into a single documentation system. I researched how the products are sold and who actually reads the documents, redesigned the information architecture, and built the English user documentation.**

<Skills>Information architecture · reader analysis · B2B product documentation design · English technical writing · stakeholder interviews</Skills>

| | |
| --- | --- |
| Scope | Five autonomous driving software products |
| Document structure | Solution manual plus a user manual per product |
| Size | About 170 Markdown documents · about 310 images |
| Formats | Web · PDF |
| Language | English |

## What was difficult

**The products are sold as one solution, but documentation was needed per product as well.**

The company bundles several autonomous driving software products into a single solution and sells it to enterprise customers. Each customer buys a different combination of products, though, and some products are also sold on their own, separately from the solution.

Documenting only at the solution level hands a customer who bought a few products a pile of information they do not need. Documenting only per product makes it impossible to explain what solution the products add up to when combined.

The document structure therefore had to reflect **not only the products themselves but how they are sold and how customers use them.**

**Each product also started from a different place.**

| Product | State of its documentation at the start |
| --- | --- |
| LiDAR perception engine | A Google Docs manual written by a developer existed, but its review had been stalled for a long time |
| Operations application | No existing documentation; documentation started alongside early product development |
| Motion planning software | Only an informal five-page guide, sent to customers as needed |
| The solution as a whole | No document explaining the several products as one system |

Applying one template to every product was not going to work, because the quality of the existing material, the readers, and the technical depth all differed.

**It was not clearly defined who the readers were.**

Because these products are delivered to enterprise customers, there was no clear picture of who actually reads the documents. Organisational structures and job titles differed from customer to customer, too.

Without defined readers there is no basis for deciding how far to explain something, which terms need an explanation, or what content belongs in the same document.

## How I solved it

### Splitting the documentation by how the products are sold

I designed the documentation in two layers: **a solution manual and a user manual per product.**

```text
Solution manual
├── A business-level overview of the solution
└── Core concepts, operation, and troubleshooting for operators

Per-product user manuals
└── Detailed information for the readers who use each product directly
```

The solution manual explains what system the several products form together; the per-product user manuals carry the detail needed to actually use each product.

That way, both a customer who bought the whole solution and a customer who uses only some of it get documentation at the scope they need.

Rather than duplicating documents to manage each customer's product combination, I separated that out so the required scope is assembled by the [documentation build and check tooling](./build-tooling.md).

### Researching readers on real projects

Instead of guessing internally, I joined real customer projects and confirmed which roles reach for which product.

Rather than adopting each customer's own job titles, I generalised them into three reader tiers that apply across projects.

| Tier | Who they are | Prior knowledge assumed |
| --- | --- | --- |
| Understanding | Readers evaluating whether to adopt the solution | None |
| Operation | Administrators · operators · viewers · field operators · remote drivers | General computer literacy and experience with software user interfaces |
| Technical | Field deployment engineers · vehicle integration engineers · developers · IT administrators | Depending on the role: the Linux command line, networking, vehicle controller integration, REST APIs, and so on |

Every product document applies the same baseline: **no prior knowledge of autonomous driving is assumed.**

That baseline later became the basis for deciding the glossary and the depth of explanations. To judge which terms are unfamiliar to a reader, the reader's prior knowledge has to be defined first.

### Connecting readers to what they should read

I did not stop at defining roles; I connected them to how people actually navigate the documents.

- The role table lists the related sections, so finding your role also shows you the scope you should read.
- I stated explicitly that the role split is guidance for reading the documentation, not a statement about system account permissions.
- Instead of each customer's own job titles, I used generalised role names and told readers to refer to the closest one.
- Where several documents have to be read in order, I stated the order between them.

The aim was **not for readers to read everything from the beginning, but for them to find where their own information starts.**

### Documenting each product from where it stood

I kept the shared information structure and reader criteria, but varied the approach to each product according to its existing state.

- **Operations application:** starting from nothing, I designed the information architecture and wrote the whole user documentation from scratch. I also took part in product planning and helped decide the names of UI elements.
- **LiDAR perception engine:** I moved the existing documentation into a Markdown-based structure and widened its scope to cover the SDK and API.
- **Motion planning software:** documenting the most technically demanding product is where I settled the criteria for explaining terminology, which I then applied to the other products.
- **Solution manual:** I wrote, from scratch, the overall structure, core concepts, operating procedures, and troubleshooting that no individual product document could cover.

Rather than forcing every product into one template, **I kept the differences between products while applying shared criteria so that readers navigate information in a consistent way.**

## What I produced

| Item | Size |
| --- | --- |
| Products | 5, making up 2 solutions |
| Documents | About 170 Markdown files |
| Images | About 310 |
| Versions | 2 to 3 releases per product plus a development version |
| Formats | Web (static HTML) · PDF |
| Language | English |

## Results

- Documentation that had been scattered by product **can now be operated under one information structure of solutions and products.**
- Even when a customer's product combination differs, documentation can be delivered by specifying the required scope, with no copying or hand assembly.
- Field deployment and field application engineers reported that the web manual's search lets them find what they need quickly.
- The documentation is also **used as onboarding material** in day-to-day work.
- The reader model and the information architecture principles defined here carried over into later product documentation and into the documentation governance system.
