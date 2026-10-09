---
title: Maintaining and translating DBMS product manuals
sidebar_label: DBMS manuals · translation
description: I maintained the DBMS manuals across two languages and three version trees, and created English editions of manuals that had none.
---

# Maintaining and translating DBMS product manuals

> Database software company · Technical Writer · Nov 2023 to Dec 2024

**Within an already established DBMS manual system, I updated 31 documents in Korean and English. For manuals that had no English edition I created one, and where an existing explanation was inaccurate I fixed the Korean source as well.**

<Skills>Technical documentation maintenance · technical translation (Korean ↔ English) · SQL and API documentation · terminology consistency · change tracking · Git/GitHub · MkDocs</Skills>

| | |
| --- | --- |
| Volume | **113 pull requests submitted / 101 merged** (Dec 2023 to Nov 2024) |
| Document scope | **31 documents** · SQL reference · API/JDBC/CLI · replication · log analyzer · tools · installation · release and patch notes |
| Maintained in parallel | Korean · English × the `7.1`, `7.3`, and `trunk` version trees |
| Public history | [ALTIBASE/Documents](https://github.com/ALTIBASE/Documents) · [my pull requests](https://github.com/ALTIBASE/Documents/pulls?q=is%3Apr+author%3ASoyoon-Choi) |

## What was difficult

**The same content existed in several copies.**

The manuals were split into Korean and English, and again into the `7.1`, `7.3`, and `trunk` versions. One feature change meant finding and fixing the same paragraph in several places, and once related documents were included, a single change could touch more than ten files. Miss one of them and the fact only surfaces much later.

**Some manuals had no English edition.**

Finishing a translation once is not enough: as the Korean source keeps changing, the two languages drift apart again. Keeping both languages in the same state was the harder problem, harder than completing the translation.

**Each document type had readers who expected something different.**

A reference has to make syntax and constraints quick to find; an installation guide has to get the order and the preconditions exactly right; release notes have to convey the change and its blast radius briefly. Working across 31 documents, I had to avoid blurring what each one is for.

**The improvements had to fit the existing system.**

This was not a project designed from scratch. There was a long-established style and structure, and changes had to improve things without breaking what existing readers and authors were used to.

## How I solved it

### Creating and maintaining the English editions

I created English editions of the manuals and patch notes that had none. From then on, instead of treating translation as follow-up work, I handled the Korean edit and its English counterpart **inside a single pull request.**

- One feature change, carried into Korean and English across three version trees in one pull request
- When a `.md` file changed, the distributed `PDF` was regenerated in the same pull request
- English patch notes kept inside the maintained scope rather than postponed

With both languages in the same diff, a reviewer can see the difference on one screen. Rather than reconciling later, this reduces the opportunity to drift.

### Improving the quality of the existing documents

When translating or updating turned up an explanation that was inaccurate or ambiguous, **I did not just polish the translation; I fixed the Korean source.** If the source is ambiguous, Korean readers stumble at the same point.

The description of the `ILOADER_PARTITION` property in `iLoader` was one such case.

| | |
| --- | --- |
| Before | This property decides whether to create an SQL script and a shell script **for creating partitions** |
| After | This property decides whether, when the source database has partitioned tables, **iLoader scripts are generated per partition** |

"A script for creating partitions" reads two ways: *a script that creates partitions*, and *a script generated for each partition*. The actual behaviour was the latter. The same piece of work also fixed:

- the ON/OFF description, replacing abstract prose with the names of the files actually generated (`run_il_out.sh`, `run_il_in.sh`)
- inconsistent Korean wording for "source database", unified to one term
- a stray space in `ILOADER\_ PARTITION` that was breaking the rendering

### Keeping terminology consistent

When a term changed, I found and updated every document it appeared in. Changing `SQL Reflection Mode` to `SQL Apply Mode` meant fixing not only the Replication Manual but the New Features Guide, the Patch Notes, and the Release Notes, across all three version trees.

A term change applied to only one document leaves the same feature called different things in different places.

### Tracking the change history

Every piece of work was linked to a request number in the issue tracker.

| Prefix | Kind of work |
| --- | --- |
| `BUG-#####` | Documentation change following a defect fix |
| `PROJ-####` | Manual rework following a feature development project |
| `INC-#####` | Documentation improvement arising from a customer enquiry |
| `Comment ######` | A change made for one review comment |

Even review comment numbers went into the pull request titles, so it is possible to work backwards from a change to the remark that prompted it. Changes that turned out to be wrong kept their revert history too.

### Writing to suit the document type

- **SQL reference**: syntax, options, and constraints made easy to find. Accuracy and navigability first
- **API, JDBC, and CLI manuals**: features and usage set out from the caller's point of view
- **Installation guide**: built around order and preconditions
- **Replication, log analyzer, and tool manuals**: concepts presented alongside how to operate them
- **Release and patch notes**: the change and its blast radius, short and clear

### Setting up a web manual environment

Using MkDocs and Read the Docs, I made the existing documents browsable on the web. Doing so showed me first hand what an open static site generator can and cannot do.

## What I produced

| Item | Contents |
| --- | --- |
| Reference | SQL Reference · General Reference 1 and 2 |
| Developer documentation | API · JDBC · CLI · C Interface · Precompiler · Stored/External Procedures |
| Operations documentation | Replication · Log Analyzer · Administrator's · Performance Tuning · DB Link |
| Tool documentation | Utilities · iLoader · iSQL · Migration Center · Adapter (JDBC/Oracle) · Tools |
| Installation and environment | Installation Guide · Getting Started Guide · Supported Platforms · SSL/TLS Guide · 3rd Party Connector Guide · Spring Data JPA Guide |
| Product introduction | New Features Guide |
| Change documentation | Release Notes · Patch Notes (Korean and English) |
| Languages and versions | Korean · English × `7.1`, `7.3`, `trunk` |
| Web documentation | A manual site built on MkDocs and Read the Docs |
| Public history | 113 pull requests submitted · 101 merged |

## Results

- **Created the English editions** of manuals that had none, and from then on maintained Korean and English together in one pull request.
- Fixed inaccurate explanations found while translating and updating **in the source, not only in the translation**, resolving the problem for readers of both languages.
- Applied term changes across every related document, so the same feature is not called different things in different places.
- Linked every change to a request number and a review comment, leaving the history in a state where any sentence can be traced back to the request behind it.
- Working across every document type, from reference to release notes, gave me the principle that **different document types carry different reader expectations**, which fed into the structure of [the combined solution documentation set](./solution-docs.md).
- Running into MkDocs's limits here became the basis for the decision to build our own tooling in [the documentation build and check tooling](./build-tooling.md) project.
