---
title: Portfolio
description: Projects, the problems inside them, how I solved them, and what shipped
slug: /projects
toc_max_heading_level: 2
---

![Portfolio](/img/hero/portfolio.svg)
# Portfolio

I turn complex software into a structure readers can follow, and **design the system that keeps those documents being written and verified inside the organisation**. My work covers information architecture, reader definition, writing in Korean and English, terminology policy, the move to docs-as-code, and automation of documentation builds and reviews.

| | |
| --- | --- |
| Products | 5 (autonomous driving solution) and a database product family |
| Writing | 171 English documents, about 187,000 words, 310 images, of which **75 percent were written from scratch** |
| Documentation operations | 113 pull requests submitted, 101 merged (previous employer) |
| Systems | Single-source web and PDF output, OpenAPI-generated documentation, per-customer conditional content verification |

### Project list

**Projects 1 to 3 are one continuous effort at the same company.** I designed the documentation structure (1), changed how documents are written and reviewed (3), and removed recurring failures with tooling (2). They are listed separately because each is a different kind of work.

| # | Project | What it demonstrates | Company and period |
| --- | --- | --- | --- |
| 1 | Building a unified solution documentation set | Information architecture and seeing it through | Autonomous driving solution company, Jan 2025 to present |
| 2 | Developing the documentation build and review tooling | Removing recurring failure by design | Autonomous driving solution company, Jan 2025 to present |
| 3 | Documentation governance and the move to docs-as-code | Leaving work others can continue | Autonomous driving solution company, Jan 2025 to present |
| 4 | Running and translating database product manuals | Delivering inside an existing system | Database software company, Nov 2023 to Dec 2024 |
| 5 | The VELA fictional product documentation set | Evidence that can be published | Personal project, 2025 |

Each project follows the same order: **summary, what was hard, how I solved it, what shipped, and the result.**

:::note
Documents and source code from my current employer are confidential and are not published here. Instead I rebuilt a documentation set of the same structure and complexity as a fictional product and published it in full at [Sample Docs](/samples).
:::

---

## 1. Building a unified solution documentation set

> Autonomous driving solution company · Technical Writer · Jan 2025 to present

I designed and wrote the English user documentation for five autonomous driving software products. Some products had no documentation at all; others had material scattered across different formats. I designed a new structure and completed **171 documents, 310 images, and about 187,000 words**. Of those, **128 documents (75 percent) were written from scratch**; the rest were rewritten from the structure up.

<Skills>Information architecture · Reader analysis · Technical writing in English · UI naming · Glossary design · IEC/IEEE 82079-1 · Stakeholder interviews · Field research</Skills>

### What was hard

**The products are sold as a bundle, but documentation was also needed per product.**

This company sells several autonomous driving software products bundled into one "solution" for enterprise customers. Each customer buys a different combination. Some take everything, some take part of it, and a few products are also sold on their own.

A single solution-level document would push irrelevant content at customers who bought only part of it. Per-product documents alone would leave nothing that explains what the products do together.

**Every product started from a different place.**

| Product | State of documentation at the start |
| --- | --- |
| LiDAR perception engine | A Google Docs manual written by developers. Comments were not visible at a glance, so reviews stalled for weeks |
| Operations application | No documentation. Development started after I joined, so even the names of on-screen buttons had to be decided |
| Motion planning software | Only an informal five-page guide sent to customers ad hoc |
| The solution as a whole | Nothing described the products together |

**Nobody knew who the readers were.**

Because the products are delivered to enterprise customers, no one inside the company could say who actually reads the documentation. Customers also differ in how they are organised and what they call each role. Without knowing the reader, you cannot decide what level to write at or which terms need explaining.

### How I solved it

**I designed a two-tier structure and left assembly to the build tooling.**

The solution manual and the per-product manuals are separate, but any of the four parts can be built alone or together. I decided the documentation structure had to follow the sales structure, and handled per-customer differences with the [build tooling](#2-developing-the-documentation-build-and-review-tooling) rather than by duplicating documents.

```
Solution manual
├── Business overview                       ← readers evaluating adoption
└── Operator concepts, operations, troubleshooting ← readers running the solution
Per-product manuals × 3
└── Product detail                          ← readers working with the product directly
```

**I researched readers in the field instead of deciding at my desk.**

- Joining real customer projects to find out which roles touch which product
- Converting those findings into general types that do not depend on one customer
- Defining three reader tiers (**understanding, operating, technical**) and stating the prior knowledge each one assumes
- Declaring "no prior knowledge of autonomous driving is assumed" as the shared baseline across every product

| Tier | Who | Prior knowledge assumed |
| --- | --- | --- |
| Understanding | Readers evaluating whether to adopt the solution | None |
| Operating | Administrators, operators, viewers, including on-site operators and remote drivers | Basic computer literacy, experience with software interfaces |
| Technical | Field application engineers, vehicle integration engineers, developers, IT administrators | Varies by role: Linux command line, networking, vehicle controller integration, REST APIs |

That baseline became the basis of the glossary policy. To judge whether a term is "above the reader's level" you need something to compare against.

**I made it possible for readers to find their own place.**

- Adding a "related sections" column to the role table, so finding your role also sets your reading scope
- Stating that the role table **is reading guidance, not a definition of account permissions**. Mixing the two causes confusion such as "my account is read-only, am I allowed to read the operator manual?"
- Using general role names, with a note to pick the closest row when a customer's titles differ
- Stating the reading order between documents

**I chose a different approach for each product based on where it started.**

- **Operations application**: designed the information architecture from scratch and wrote everything, joining planning meetings to name UI elements
- **LiDAR perception engine**: moved the documents to Markdown and extended scope to the SDK and API documentation
- **Motion planning software**: the deepest product technically, so I built the glossary policy while writing it and applied that policy to every product afterwards
- **Solution manual**: wrote the business overview plus operator concepts, procedures, and troubleshooting from scratch

### What shipped

| Item | Scale |
| --- | --- |
| Products | 5, sold as 2 bundled solutions |
| Documents | 171, about 187,000 words (latest version of each product) |
| Breakdown | 128 written from scratch (75 percent), 43 rewritten |
| Images | 310 |
| Versions | 2 to 3 releases per product plus a development branch |
| Formats | Web (static HTML) and PDF, generated from a single source |
| Language | English. The product has no Korean edition for customers |

Customer-facing manuals exist only in English for this product. Korean documents for internal use are written separately in Confluence. My experience running Korean and English in both directions is in [project 4](#4-running-and-translating-database-product-manuals).

### Result

- Even when customer configurations differ, **documents are never reassembled by hand.** The scope is set in configuration and built.
- Field deployment and field application engineers reported that search in the web manual gets them to what they need quickly, and **the manuals are now used for onboarding.**
- You can read the same design approach applied to a fictional product in [Sample Docs](/samples).

---

## 2. Developing the documentation build and review tooling

> Autonomous driving solution company · Technical Writer · Jan 2025 to present

I turned recurring documentation failures **from something people have to be careful about into something the build checks**. I designed what gets checked, which conditions are allowed, and how far automatic correction may go; the implementation was done with AI.

<Skills>Requirements specification · Conditional content system design · Documentation review automation · OpenAPI · Static site generator design · JavaScript · Python · AI-assisted tool development · Technology selection</Skills>

### What was hard

Four failures could not be prevented by writing well. All four **relied on human attention.**

**Each customer receives a different set of features.** When building per-customer deliverables from one source, the writer had to remember which feature descriptions belonged in which document. Leaving one out means a customer never learns about a feature they paid for; putting the wrong one in **exposes another customer's information.** The second is an incident.

**Web and PDF built separately always drift apart,** because sooner or later only one of them gets fixed.

**API schemas and configuration lists maintained by hand always drift from the product.** When development moves quickly, documentation cannot keep up.

**Links and anchors break silently.** Across products and versions the set runs into the hundreds of documents, and no person can tell which ones are broken.

I first intended to use MkDocs, a public static site generator. As customisation requests kept growing and **fully offline operation became a requirement because networks at deployment sites are unreliable**, I judged that a public tool could not carry it and moved to building our own.

### How I solved it

**I listed the edge cases first and handed that list to the AI as a generation requirement.**

This was the central working method of the project. Instead of receiving code and then hunting for problems, I wrote out every failure the structure predicted and presented it as requirements.

- Nested markers
- A term that appears inside a table
- An anchor that points into another file
- The glossary file moving because appendix order changed
- A development build accidentally reaching a customer deliverable

**Writing those edge cases precisely is the same work as technical writing:** stating exactly what is input and what is an exception, leaving nothing out. Because verification became a condition of generation rather than a step afterwards, almost nothing had to be reverted.

**I kept the line between design and implementation explicit.**

My job on this tool was not typing code. It was **deciding what to build and describing it without error.**

| What I designed | What the AI implemented |
| --- | --- |
| The axes of conditional content (customer, internal, feature) and the levels it applies at (section, page, format) | Implementation code |
| Marker syntax | Parsing logic |
| Which checks to run, in particular checking that output matches the declared scope | Build scripts |
| How far automatic correction may go | |
| The glossary opt-in principle | |
| Finding files by name rather than position | |
| The decision to move from MkDocs to an in-house generator | |

Every item on the left is **a judgement only someone who knows the documentation can make.** Without recognising that mixing customer information is the most dangerous failure, that check never makes the list. Without the judgement that a tool which edits documents on its own loses trust, automatic correction is never limited.

**I moved each failure point to a machine check.**

| Failure | Solution |
| --- | --- |
| Customer information mixed in | Declare the exposure scope inside the document, then **add a step that checks the build output against that declaration.** Three axes (customer, internal, feature), three levels (section, page, format) |
| Web and PDF drift | Generate both formats from one source. PDFs are compressed after rendering, cutting size by about 44 percent |
| Stale API documentation | Generate endpoint and schema documents from the OpenAPI specification and **report additions, removals, type changes, constraint changes, and enum changes as a diff** |
| Broken links and anchors | Cross-verify that target files and anchors exist |
| Readers blocked by terminology | Read the glossary table and attach a hover tooltip at each term's first appearance. Opt-in: only terms marked in the table |
| Development builds shipped by mistake | Default to "latest release excluding development builds"; a development build is included only when explicitly selected |

**I set a limit on automatic correction.** Anchor drift in configuration lists could have been fixed automatically, but the tool **only reports it.** A tool that edits documents on its own loses trust.

**I made sure it was not a tool only I could use.** Team members who do not use the command line can run builds through a web interface, and builds and checks are locked so they cannot run at the same time.

### What shipped

| Tool | What it does |
| --- | --- |
| Static site generator | Web and PDF from one source, assembled per customer |
| Review tool | Cross-verifies links and anchors, validates marker structure, checks output against declared scope |
| API documentation generator | Generates documents from the OpenAPI specification and reports changes |
| Build interface | Runs builds and checks without the command line |
| Contributor documentation | Configuration guide, authoring guide |

### Result

- The largest deliverable, the full solution plus a combined PDF, **is produced in about two minutes by one build after a configuration change.**
- **Nobody has to remember** which customer gets what. The build verifies it.
- Because web and PDF are not built separately, **three to four products can be documented in parallel.**

---

## 3. Documentation governance and the move to docs-as-code

> Autonomous driving solution company · Technical Writer · Jan 2025 to present

I wrote the quality standards down and moved documentation review into the environment developers already work in. The goal was to reach a state where other people can contribute to the documentation.

<Skills>Documentation governance · Style guide programs · DITA information typing · IEC/IEEE 82079-1 · Git · GitHub pull request workflow · Process improvement · Building consensus</Skills>

### What was hard

**Reviews had stalled.** The manuals lived in Google Docs, where comments scattered beside the document and were not visible at a glance. Tracking who asked for what was difficult, so reviews dragged on for weeks.

**The standards existed only in people's heads.** As products multiplied and writers changed, tone and structure drifted. Agreements are not remembered.

### How I solved it

**I kept the number of principles small enough to be followed.**

Three. More than that and nobody remembers them.

1. Any term above the defined reader level goes into the glossary, **without exception**
2. Concepts and procedures are not mixed
3. Contents are ordered by **what the reader is trying to do**, not by the order features were built

The overall manual structure was reworked against **IEC/IEEE 82079-1**, the international standard for instructions for use.

**I left the standards as guides rather than memory.**

| Guide | Contents |
| --- | --- |
| Configuration guide | Scenarios for adding a version, product, solution, or feature; navigation configuration reference; conditional content marker syntax |
| Authoring guide | Markdown syntax, image handling, glossary tooltips, glossary maintenance |

The configuration guide is organised as **"what are you trying to do" scenarios** rather than a feature list, applying the third principle to the documentation of my own tool.

**I moved reviews into the tool developers use every day.**

- Moving documents to Markdown and taking reviews through GitHub pull requests
- Switching to branch-based version tracking
- Listing the points to check in final review so feedback concentrates there

### Result

- Reviewers no longer have to be chased individually, and most reviews now finish **within one or two days.**
- Reviewers said comparison became easier because diffs show exactly what changed.
- Frequent small review requests turned out to improve the quality of communication rather than burden it.

---

## 4. Running and translating database product manuals

> Database software company · Technical Writer · Nov 2023 to Dec 2024

I owned the product manuals for a database product in Korean and English, covering every document type from references to release notes, and produced the first English edition of manuals that had none.

<Skills>SQL references · API manuals · Release notes · Technical translation (KO↔EN) · Terminology consistency · MkDocs · Read the Docs · Git · GitHub · Managing parallel work</Skills>

### What was hard

**Several products had to be updated at once.** The SQL reference, API manual, replication and log analyzer manuals, tool manuals, installation guide, and release notes were all in scope. Each document type carries different reader expectations.

**Translations drift from the source easily.** Some manuals had no English edition at all, and even once translated they fall behind as soon as the source is updated.

**An existing system had to be respected.** Unlike starting fresh, improvements had to fit the tone and structure already in place.

### How I solved it

**I made the source and the translation one unit of work.**

The hardest part of translation is not the translation itself but keeping the source and the translation from drifting apart. So fixing the source and fixing the translation became a single, inseparable task. English patch notes were brought into the same scope.

The machine-checked version of this same problem is the translation parity check in [project 5](#5-the-vela-fictional-product-documentation-set).

**When a sentence could be translated two ways, I fixed the source.**

The most valuable finding in translation work was never a mistranslation. It was **a source sentence vague enough that translations diverged.** Those sentences were fixed in the source, not in the translation, because a vague source confuses Korean readers just as much.

**I made each unit of work traceable.**

- Handling each task as a pull request linked to an issue tracker ticket
- Revising comment by comment so the reason for each change is recorded
- Building the web manual site with MkDocs and Read the Docs

### What shipped

| Item | Detail |
| --- | --- |
| Volume | 113 pull requests submitted, 101 merged, as a repository collaborator |
| Document types | SQL reference, API user manual, replication and log analyzer, tool manuals, installation guide, release notes |
| Languages | Korean and English maintained together |
| Public history | [ALTIBASE/Documents](https://github.com/ALTIBASE/Documents) |

### Result

Having handled references, guides, and release notes all at once became the foundation for everything afterwards. That is where I learned that each document type carries a different expectation.

MkDocs and Read the Docs were also the starting point for building an in-house generator later. Having first found out what a public tool can and cannot do, I could judge when to switch.

---

## 5. The VELA fictional product documentation set

> Personal project · 2025 · Designed and written alone

Because I cannot publish work documents, I designed a product myself and completed its documentation set alone. Four reader types are served by four different document types across **36 documents, about 90,000 Korean characters, and 10 illustrations**.

<Skills>Product design · Information architecture · Document typing by reader · Glossary and style guide programs · Documentation review automation · Node.js · Docusaurus · GitHub Actions · CI-based verification</Skills>

### What was hard

**Unrelated samples show very little.** A handful of separate documents only demonstrates how well each one is written. How documentation changes with the reader, whether terminology holds, and whether documents connect to each other stay invisible.

**It had to match real complexity without any confidential material.** Something too simple proves nothing. The product itself had to be designed at the level of real B2B software.

### How I solved it

**I tied everything to one product family and explained the same feature four different ways.**

I designed VELA, a vehicle software platform supplier, with four products, then had the same feature — over-the-air updates — covered at a different depth in each document. Vehicle owners get "what to do when the notification appears"; operators get "how to judge how far to expand a rollout"; developers get "the request format for creating a campaign"; field engineers get "how to recover firmware manually".

| Documentation set | Reader | Document types |
| --- | --- | --- |
| VELA Drive app guide | Vehicle owners | Tutorial, how-to, FAQ |
| VELA Vehicle API | Developers | Reference, quickstart |
| VELA Deploy operations guide | Release operators | Concept, procedure, reference |
| VELA Sense installation guide | Field engineers | Procedure, diagnostics, specifications |

**I separated the quality standards into configuration files, then wrote the tool that checks them.**

The glossary of 79 entries, style rules, reader definitions, and the admonition severity scheme live in configuration files rather than in prose. A script reads that configuration and checks all 44 documents, running ahead of the build. It checks forbidden expressions, terms above the reader's level, procedure length, admonition severity and count, warning placement, list structure, information type declarations, sentences inside diagrams, and duplication across documents.

The rules live in configuration, not in code. A different organisation would only need to replace the configuration. A single error fails the build and nothing is deployed.

**The same tool checks whether the translation has drifted from the source.** With Korean declared as the source and English as the translation, it compares the number of headings, tables, images, links, and admonitions against the source, finds untranslated Korean text, and uses git history to detect when the source changed more recently than the translation. Forbidden expressions and the glossary are applied per language.

A machine cannot judge whether a sentence reads well, but **it can see when the structure has drifted.** Dropping a few table rows or a whole warning box during translation is the most common failure, and it is exactly what a human reviewer misses.

**I put link verification into the deployment pipeline.** Building and deploying with Docusaurus and GitHub Actions, a broken link fails the build.

### Result

You can read all four documentation sets in full at [Sample Docs](/samples). Each one carries a design note explaining how the reader was defined and why that structure was chosen.

---

If you need an example from a particular field or document type, let me know and I will check what can be shared.

<CtaRow>
  <Cta to="/contact">Request an excerpt or example</Cta>
  <Cta to="/samples" variant="ghost">Read the sample docs</Cta>
</CtaRow>
