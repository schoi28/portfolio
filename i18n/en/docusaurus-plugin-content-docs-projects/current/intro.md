---
title: Portfolio
sidebar_label: Overview
description: I built the documentation for products that had none, and then built the system that keeps it maintained.
# slug is resolved under routeBasePath (projects).
# Writing '/projects' would produce /projects/projects.
slug: /
hide_table_of_contents: true
---

# Portfolio

I wrote 171 English documents for five products whose documentation was missing or scattered. I then designed the system that produces, checks, and maintains them, so that documents are assembled correctly for each customer, remain verifiable and current as the products change, and can be picked up by a colleague.

The projects below set out the problems I ran into along the way, how I solved them, and what each one demonstrates.

**Projects 1 to 3 are a single continuous effort at one company.** They run from building the documentation system, to automating its production and review, to making it something other people can keep running.

<ProjectList>

<ProjectRow
  n="1"
  icon="structure"
  to="/projects/solution-docs"
  title="Building a combined solution documentation set"
  proves="Information architecture · reader analysis · English technical writing"
  meta="I redesigned product documents that had each gone their own way into one system that reflects its readers and how the products fit together.">

- Completed 171 English user documents across five products. 128 of them were written from scratch.
- Designed a two-layer solution and product structure, and defined three reader tiers by researching real customer projects.

</ProjectRow>

<ProjectRow
  n="2"
  icon="tool"
  to="/projects/build-tooling"
  title="Developing documentation build and validation tools"
  proves="Requirements specification · documentation automation design · technical judgement"
  meta="Mistakes people had to remember and watch out for are now caught by the build.">

- Turned errors writers had to catch by memory — leaked customer-specific content, broken links, outdated API docs — into checks the build runs on every output.
- Designed a static site generator, a validation tool, and a build GUI that produce web and PDF from one source, building the largest delivery set in about two minutes.

</ProjectRow>

<ProjectRow
  n="3"
  icon="flow"
  to="/projects/docs-as-code"
  title="Setting up documentation governance and moving to docs-as-code"
  proves="Documentation governance · writing standards · collaboration process improvement"
  meta="Instead of leaving quality and review to whatever the person in charge happened to remember, I turned them into something the team can keep following.">

- Replaced individual judgment on what belongs in a manual, and where, with shared criteria: three writing principles and a Technical Writing Guide.
- Moved reviews from scattered Google Docs comments that could stall for weeks into Markdown and GitHub pull requests, closing most of them within one to two days.

</ProjectRow>

<ProjectRow
  n="4"
  icon="translate"
  to="/projects/dbms-manuals"
  title="Maintaining and translating DBMS product manuals"
  proves="Technical writing · Korean to English technical translation · Git-based collaboration"
  meta="I treated ambiguity found during translation as a problem in the source, and improved the sentences themselves.">

- Wrote and maintained a wide range of document types in Korean and English, from the SQL reference to API manuals, installation guides, and release notes.
- Tracked the work as issues and pull requests, submitting 113 pull requests of which 101 were merged.

</ProjectRow>

<ProjectRow
  n="5"
  icon="sample"
  to="/projects/vela"
  title="A documentation set for the fictional VELA product family"
  proves="Per-reader content design · documentation quality management · automated checking"
  meta="In place of professional work that cannot be published, I built a public example where the design and the quality checks can both be inspected.">

- Designed a fictional product family and four kinds of reader, and wrote 44 documents. The same feature is explained with a different document type and depth for each reader.
- Separated a 79-entry glossary and the style rules into configuration files, and wired scripts that check document structure and translation consistency into the build.

</ProjectRow>

</ProjectList>

---

My current employer's documents and code are confidential, so they are not published here. Instead, I designed the fictional VELA product family myself, at a complexity close to real work, and published the whole documentation set.

<CtaRow>
  <Cta to="/samples" variant="ghost">Read the sample docs</Cta>
</CtaRow>
