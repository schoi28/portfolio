---
title: Resume
description: Experience, skills, education, and downloadable resume files
---

# Resume

I am a technical writer who has written Korean and English technical documentation in the database and autonomous driving solution fields. Since November 2023 I have written product references, user and installation guides, API documentation, and release notes. My strength is not only in writing the documents but in **building the system that assembles them correctly for each customer, keeps them verified as the products change, and lets a colleague pick up the work.** I write directly in both languages rather than translating.

## Download the resume

<CtaRow>
  <Cta href="/portfolio/resume/soyoon-choi-resume-ko.pdf">Download the Korean resume</Cta>
  <Cta href="/portfolio/resume/soyoon-choi-resume-en.pdf" variant="ghost">Download the English resume</Cta>
</CtaRow>

---

## Skills

| Area | Details |
| --- | --- |
| Documentation design | Information architecture, defining and tiering readers, separating document types, conditional content design |
| Writing | Markdown, structured reference documents, release notes, installation and operations guides, troubleshooting |
| Tooling | Docusaurus, MkDocs, Read the Docs, in-house static site generator |
| Standards and methods | IEC/IEEE 82079-1, DITA information typing (concept, task, reference), establishing glossaries and style guides |
| API documentation | OpenAPI-based references, webhook documentation, error code schemes |
| Collaboration | Git, GitHub, GitHub Actions, pull request review for docs, issue tracker integration |
| Automation | Documentation build and check pipelines, translation consistency checking, generated documentation, AI-assisted tool development |
| Programming | JavaScript, Python, SQL, C, C++ |
| Languages | Korean (native), English (technical writing and Korean ↔ English translation) |

---

## Experience

### Autonomous driving solution software company · Technical Writer

**January 2025 to present**

I own the English user documentation for an autonomous driving solution made up of five products. Starting from a state where documents were missing or scattered across several places, I unified the documentation system and built the tools needed to produce and check it.

- **Documentation design and writing**: designed and wrote a two-tier documentation system of a solution manual plus per-product manuals. 171 documents, 310 images, and roughly 187,000 words, of which 128 (about 75 percent) were written from scratch.
- **Korean documentation**: Korean documents for internal sharing are maintained separately in Confluence.
- **Reader analysis and document design**: split readers into three types, defined the prior knowledge each type brings, and applied that consistently across every product document.
- **Writing principles and standards**: established three writing principles, including the glossary policy, and applied them across all products. Restructured the documentation against IEC/IEEE 82079-1.
- **Documentation build environment**: built a static site generator that produces web documents and PDFs from a single source. The output can be used without an internet connection.
- **Conditional content system**: designed a system that outputs content according to customer, internal or external use, and feature. Implemented a step that verifies each output contains only content within its declared scope.
- **API documentation automation**: built a pipeline that generates the API reference from the OpenAPI specification, with changes shown as a diff report.
- **Automated document checking**: added build steps that cross-check across files whether links and anchors really exist and that validate the structure of conditional content markers. Automatic correction is deliberately limited: the tool reports the location and the reason only.
- **Build environment for non-authors**: built a web GUI so colleagues who do not use the command line can build and check documents.
- **Contribution environment**: produced a configuration guide and an authoring guide so other colleagues can take part in documentation work. Both are organised around what the author is trying to do rather than around a feature list.
- **Content criteria**: wrote a Technical Writing Guide in Confluence so the team can judge, on the same basis, what belongs in the body, the appendix, or a reference, and what falls outside the documentation.
- **Review process**: moved review from Google Docs to Markdown and pull requests. As a result, reviews that used to be delayed now finish within one or two days in most cases.

### Database software company · Technical Writer

**November 2023 to December 2024**

I wrote and maintained the DBMS product manuals in Korean and English. The documents were version-controlled in a public GitHub repository.

- **Technical writing**: wrote and updated 31 documents, including the SQL reference, the API, JDBC, and CLI manuals, the replication and log analyzer manuals, tool manuals, the installation guide, and release and patch notes.
- **Korean and English maintenance**: created English editions of manuals that had none. From then on, Korean edits and their English counterparts were handled in a single pull request, so both languages appeared in the same diff.
- **Multiple versions in parallel**: the same manual existed in the `7.1`, `7.3`, and `trunk` version trees, so one change was carried into Korean and English across all three.
- **Improving existing quality**: when translating or updating turned up an explanation that was inaccurate or could be read two ways, I fixed the Korean source as well, not only the translation.
- **Terminology consistency**: when a term changed, I found every document it appeared in and updated them together.
- **Collaboration and change tracking**: as a collaborator on the [ALTIBASE/Documents](https://github.com/ALTIBASE/Documents) repository, submitted 113 pull requests of which 101 were merged. Each pull request was linked to a request number in the issue tracker, and review comments were addressed item by item.
- **Documentation site**: built a new web manual site with MkDocs and Read the Docs. The limits of open tooling that I found here became the basis for later moving to an in-house generator.

---

## Education

| Programme | Institution | Period | Notes |
| --- | --- | --- | --- |
| BS in Computer Science | Oregon State University, United States | Jan 2021 to Mar 2023 | **Transferred** from Pellissippi State Community College |
| General AS, Computer Science / Engineering Path | Pellissippi State Community College, United States | Aug 2018 to Aug 2020 | Left partway through on transfer |
| BA in Creative Writing | Soongsil University, Seoul | Mar 2012 to Aug 2018 | |

---

## Certifications and language

| Item | Issued by | Year | Notes |
| --- | --- | --- | --- |
| Engineer Information Processing | Human Resources Development Service of Korea | 2023 | |
| Advanced Data Analytics Semi-Professional (ADsP) | Korea Data Agency | 2023 | |
| OPIc AL | ACTFL | 2022 | **Expired** |

The OPIc score has expired. My English can be assessed from the work itself: the 171 English user documents at my current employer and the English edition of [Sample Docs](/samples) were all written by me.

---

## Personal project

### A documentation set for the fictional VELA product family

Because my current employer's work is confidential, I designed a fictional product family at a similar complexity and completed the whole documentation set on my own.

- **44 documents · about 92,000 characters · 17 diagrams.** Four readers, the vehicle owner, the release operator, the developer, and the field engineer, are each served with a different document type and depth.
- **The quality criteria are separated into configuration files.** A 79-entry glossary, the style rules, the reader definitions, and the admonition level scheme live in `_config/` rather than in the documents.
- **A script reads that configuration and checks the documents**, wired in ahead of the build. It checks banned expressions, terms above the reader's level, the number of procedure steps, admonition levels, numbered list structure, and whether links and anchors really exist.
- **The same tool checks translation consistency.** With Korean declared as the source and English as the translation, it compares the number of headings, tables, images, links, and admonitions plus the heading levels, and reports untranslated Korean text and cases where the source changed after the translation.
- **Connected to GitHub Actions**, so one error in the checks stops the build and the deployment.

---

If you need the resume in another format, or have questions about any of this, please get in touch.

<CtaRow>
  <Cta to="/contact">Get in touch</Cta>
  <Cta to="/projects" variant="ghost">See the projects</Cta>
</CtaRow>
