---
title: A documentation set for the fictional VELA product family
sidebar_label: Fictional product family VELA
description: I designed the documentation for a fictional vehicle software product family and automated its quality checks and deployment.
---

# A documentation set for the fictional VELA product family

> Personal project · 2025 · planned and written entirely by me

**Because my professional documents cannot be published, I designed VELA, a vehicle software product family, myself and wrote a technical documentation set for four kinds of reader. I also defined the quality criteria for the documents and built a tool that checks them automatically, so every change is reviewed.**

<Skills>Information architecture · per-reader content design · technical writing · quality criteria · automated document checking · GitHub Actions</Skills>

| | |
| --- | --- |
| Scope | Four fictional vehicle software products |
| Size | 44 documents × 2 languages · about 92,000 characters · 17 diagrams |
| Readers | Vehicle owner · release operator · developer · field engineer |
| Quality criteria | A 79-entry glossary · style rules · reader definitions · admonition levels |
| Automation | Document checking · Korean/English structure comparison · CI build and deployment |
| Published documents | [Sample Docs](/samples) |

## What was difficult

**I could not publish the documents I wrote at work.**

Showing what a technical writer can do takes more than finished documents: it has to be possible to see how the readers were defined and on what basis the information was organised.

A few unrelated documents cannot show that design process. So I needed a documentation set where several products and readers connect to each other, like a real product family.

**Quality had to stay consistent as the documents grew.**

When the readers and document types differ per product, so do the level of explanation, the terminology, and the way warnings are phrased.

Maintaining Korean and English together also invites its own problems: a table or an admonition dropped during translation, or the source edited while the translation is left behind.

Rather than having a person check all of this on every change, I needed **a structure that checks automatically wherever the criteria are unambiguous.**

## How I solved it

### Writing for four kinds of reader

I designed VELA, a fictional supplier of vehicle software platforms, along with four products.

For each product I wrote a different type of technical documentation, matched to its purpose and its users.

| Document set | Reader | Main contents and document types |
| --- | --- | --- |
| VELA Drive app guide | Vehicle owner | How to use the vehicle management app · tutorials · FAQ |
| VELA Deploy operations guide | Release operator | Wireless update deployment · operating procedures · criteria to judge by |
| VELA Vehicle API | Developer | Vehicle data and control API · quickstart · reference |
| VELA Sense installation guide | Field engineer | Sensor kit installation · diagnostics · troubleshooting · specifications |

The four belong to one product family, but they do not explain the same information the same way.

For the wireless update feature, for example, the vehicle owner is told **what to do when an update alert arrives**, the operator **the criteria for deciding how far to deploy**, the developer **how to use the API**, and the field engineer **the firmware recovery procedure.**

In other words, the scope of information and the document type were decided **by the task the reader has to perform rather than by the feature itself.**

The finished Korean and English documents are in [Sample Docs](/samples).

### Defining the document quality criteria

So that the same criteria apply to every document, the quality rules are kept in separate configuration files.

| Configuration file | What it defines |
| --- | --- |
| `glossary.csv` | Standard terms, banned expressions, and where they apply |
| `audience.yaml` | Prior knowledge per reader, terms not to use, the maximum number of procedure steps |
| `admonitions.yaml` | Definitions of danger, warning, caution, and note, and which levels each document may use |
| `style-rules.yaml` | Style and image rules, translation comparison criteria, check exemptions |

The reason the criteria are separated from the code is **to manage what counts as a correct document independently of the mechanism that checks it.**

When the product or the reader changes, the configuration changes instead of the checking program.

I also separated what a machine can confirm from what a person has to judge.

Whether a banned expression is used, or whether a link resolves, can be confirmed automatically. Whether an explanation is easy enough to follow, or whether a reader really needs that information, is for the author to judge.

The principle, then, was **to automate only what is checkable and to leave judgements of meaning and appropriateness to people.**

### Checking documents automatically against the configuration

I wrote a script that reads the configuration files and checks all 88 language-specific files: 44 in Korean and 44 in English.

Rather than interpreting what a sentence means, the checker confirms expression and document structure against predefined rules.

| Area | Main checks |
| --- | --- |
| Terms and expressions | Banned expressions, non-standard terms, terms above the reader's level |
| Procedures and structure | Number of procedure steps, numbered list structure, document type declaration |
| Safety and admonitions | Permitted admonition levels, marker pairing, warning placement |
| References and images | Validity of links and anchors, image alternative text |
| Document management | Unresolved values, sentences duplicated across documents |
| Translation consistency | Comparison of heading, table, image, link, and admonition structure |

Korean and English are not only checked as separate documents but compared against each other.

- **Structure comparison:** a difference in heading levels, or in the number of tables, images, links, or admonitions, is treated as an error.
- **History comparison:** if the source was edited after the translation, a warning asks whether the change was carried over.
- **Per-language rules:** Korean and English each get their own glossary and banned expressions.

A change timestamp alone cannot establish that a translation was missed. So the fact that the source is more recent is treated as **a signal to check, not an error.**

### Deciding how errors and warnings are handled

Not every finding is treated the same way; results are split into **errors** and **warnings**.

| | Error | Warning |
| --- | --- | --- |
| Basis | The rule is clearly broken | There may be a legitimate exception |
| Examples | A link that does not exist, a malformed admonition, a mismatch in the number of tables between source and translation | Too many procedure steps, a duplicated sentence, the source changed more recently than the translation |
| Effect | The build stops | The result is reported and the build continues |
| Follow-up | Fix the problem and check again | The author decides whether a fix is actually needed |

When an error appears, you read the report, fix the cause, and run the check again.

At that point I distinguished between the two cases: **if the document broke the rule, fix the document; if the rule itself is wrong, fix the configuration file or the check logic.**

Treating everything as an error means the build stops again and again over legitimate exceptions. Treating everything as a warning lets problems that really must be fixed reach deployment.

So each check was graded by whether it **should block deployment automatically or needs a person to look at it.**

### Wiring the checks into build and deployment

Rather than leaving the checker to be run by hand, I connected it to GitHub Actions so it runs automatically on every documentation change.

![Pushing a documentation change makes GitHub Actions run the checks first, and build and deploy only when there are no errors](/img/vela-pipeline.en.svg)

If the results contain warnings only, they are reported and the build continues. If even one error is found, the build and the deployment stop.

| Stage | What it does |
| --- | --- |
| Prepare the environment | Set up Node.js and the required dependencies |
| Check the documents | Check all 88 documents against the configuration files |
| Build the site | On passing, generate static HTML for Korean and English |
| Deploy | On a successful build, publish to GitHub Pages |

Locally, the same check script runs before `npm run build`.

**Because local and CI use the same rules and the same check logic**, the criteria are identical whether the author checks the documents or the deployment pipeline does.

This structure applies the core principles of the [documentation build and check tooling](./build-tooling.md) I designed at work to a project that can be published.

## What I produced

| Item | Contents |
| --- | --- |
| Product family | VELA, a fictional vehicle software platform · 4 products |
| Documents | 44 in Korean · 44 in English |
| Volume | About 92,000 characters · 17 diagrams |
| Quality criteria | A 79-entry glossary · reader definitions · style rules · admonition levels |
| Check tool | A configuration-driven Node.js document check script |
| Automation | Checking, building, and deployment through GitHub Actions |
| Published site | Docusaurus · GitHub Pages · [Sample Docs](/samples) |

## Results

- Designed four fictional vehicle software products and **built 44 technical documents for four kinds of reader, in Korean and English.**
- Within one product family, varied the scope of information and the document type according to each reader's goal.
- Built **a tool that checks terms, expressions, document structure, references, and translation consistency automatically against the configured criteria.**
- Split findings into errors and warnings so that **only problems that must be fixed stop the build and the deployment.**
- Connected the checks to GitHub Actions, so the same quality criteria apply on every documentation change.
- Implemented, in a publishable form, **a documentation system that runs from defining quality criteria through checking to deployment**, not just the writing.

The finished documents are in [Sample Docs](/samples).
