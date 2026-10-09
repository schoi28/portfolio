---
title: Documentation governance and the move to docs-as-code
sidebar_label: Governance · docs-as-code
description: I turned documentation criteria that each person judged differently into shared rules, and moved review into a GitHub pull request workflow.
---

# Documentation governance and the move to docs-as-code

> Autonomous driving solution software company · Technical Writer · Jan 2025 to present

**I replaced a way of running documentation that depended on memory and individual judgement with criteria and a review workflow the team can share. I documented how to operate the documentation repository and how to judge the content itself as two separate things, and moved review from Google Docs into GitHub pull requests.**

<Skills>Documentation governance · content criteria · docs-as-code · GitHub pull requests · process improvement</Skills>

| | |
| --- | --- |
| What changed | Document structure criteria · content criteria · how review happens |
| Before | Individual memory · individual judgement · Google Docs comments |
| After | Written guides · Markdown · GitHub pull requests |
| Result | Most document reviews now finish **within one or two days** |

## What was difficult

**People judged the quality and the scope of a document differently.**

As the products and the documents grew, the questions that needed answering went deeper than how to word a sentence.

Questions like these needed clear criteria.

- Does this belong in the user manual at all
- Should it be explained in the body, or moved to an appendix
- How far should information for developers be separated from information for general users
- Can internal implementation detail appear in user documentation
- Should configuration values be explained in the body, or split into a separate reference
- How do we decide whether a new feature is added to an existing document or gets a page of its own

Without those answers written down, every review repeats the same argument.

One person says "this matters, put it in the body"; another says "it is too technical, leave it out." With no basis for the judgement, it comes down to one person's opinion against another's.

**How to operate the documentation repository also needed writing down separately.**

As products and versions multiplied, adding a new product, release, or feature to the documentation system became complicated in itself.

An author had to understand a structure like this.

- Where new products and versions are added
- How the navigation structure is configured
- Which markers manage conditional content
- Where images and files belong
- How the glossary and tooltips are wired up

This is a different kind of problem from judging whether content is right or wrong.

**Reviews also stalled for long stretches.**

The existing manuals were reviewed in Google Docs.

Comments were scattered through the document, so it was hard to see at a glance which parts still needed attention, and hard to track who had said what.

Because each feature owner had to be asked for a review separately, a review could slip by weeks depending on when it was asked for and who was asked.

**Requesting and tracking reviews had become the bottleneck**, rather than the documents themselves.

## How I solved it

### Keeping the writing principles few

Rather than turning every situation into a detailed rule, I started from principles that hold across products.

I reduced the core set to three.

1. Any term beyond the prior knowledge defined for the reader is **explained in the glossary, without exception**
2. **Separate concepts from procedures**
3. Organise information by **the order of what the reader is trying to do**, not by the order of product features

Making many rules mattered less than having criteria that could actually be applied again and again while writing and reviewing.

When reorganising the structure of the manuals, I also referred to **IEC/IEEE 82079-1**, the international standard for preparing instructions for use.

I used it as a basis for examining what structure these products and readers needed, rather than applying it verbatim.

### Writing down how the documentation is assembled

First I wrote a separate guide covering **how the documentation system is put together and used**.

This guide is less about judging content and more about operating a Markdown-based repository and its build environment in a consistent way.

| Guide | Main contents |
| --- | --- |
| Configuration guide | Adding a new version, product, solution, or feature; configuring navigation; setting up conditional content |
| Authoring guide | Markdown syntax, handling images, applying glossary tooltips, file and directory layout |

Rather than listing features, the guide is organised around **what the author is trying to do**.

Instead of explaining settings one by one, for example, it starts from tasks like these.

- Add a new product
- Add a new version
- Attach a product to a solution
- Manage a particular feature as conditional content
- Add a new document to the navigation

I applied the same **goal-oriented information structure** used in the product manuals to the internal authoring guide.

### Creating criteria for judging content

Separately from how to use the repository, we needed criteria for **what actually goes into a manual and where it is placed**.

For that I wrote a **Technical Writing Guide** in Confluence and used it as the team's shared basis.

Its purpose was not only to make the writing style consistent. What mattered more was that technical writers and the teams they work with could answer questions like these the same way during review.

- What information falls inside the scope of a user manual
- What information is left out of a manual
- How the core usage flow is separated from reference material
- What stays in the body, and what is split into an appendix or a reference
- How internal implementation detail is separated from technical information the user needs
- Whether information only one role needs should be shown to every reader
- Whether detailed configuration values are explained in the body or split into a separate reference

The key was to judge **not by "is this information important" but by "does this reader need it to achieve their goal."**

Technically important information can still be kept out of the body of a user manual if the user does not need it to install, operate, or troubleshoot the product.

Conversely, even fine technical detail has to be included in a document or reference for a particular reader if that reader cannot complete their task without it.

These criteria made it possible to tell apart `body / appendix / separate reference / outside the scope of the documentation`.

### Sharing the basis for review decisions

The Technical Writing Guide also served as the basis for decisions in real reviews.

A writer and a feature owner can see things differently.

The feature owner may want to convey as much detail as possible about the feature they built, while the technical writer wants to keep only what the reader needs.

Rather than saying simply "this is too technical," the discussion could now run on

- who the target reader is
- what task that reader has to perform
- whether this information is needed to perform it
- whether it has to be in the body or can be split out as reference

This made it possible to explain decisions about scope and structure as **judgements grounded in shared principles rather than personal taste**.

### Moving review into pull requests

Once the content criteria were set, I moved the review process itself into the GitHub workflow the developers were already using.

- Manage documents in Markdown
- Have changes reviewed as pull requests
- Track the version of the documents at a given point through branches
- See the files and the exact changes needing review directly in the diff
- Decide in advance what the final review has to confirm, so the scope of review is clear

Rather than making people learn a separate review environment, I set it up to resemble the way developers review code as closely as possible.

Reviewers could then **start from what had actually changed**, without rereading the whole document.

### Keeping review requests small

Instead of having a large document reviewed in one go, I kept each change small.

Even for a minor update I opened a pull request when it was needed, and asked the owner of the related feature to review only that part.

This increases the number of review requests but reduces how much has to be reviewed at once.

It also shortens the gap between a change being made and being reviewed, so feedback arrives while the feature owner still remembers the context.

## Results

- Separating how the documentation system is operated from how its content is judged **made it clear what an author has to decide, and how.**
- The Technical Writing Guide in Confluence **established shared criteria** for telling apart body content, appendix content, reference content, and content outside the scope of the documentation.
- Reviews of scope and information placement now have **a basis for discussing readers and goals** instead of personal preference.
- Document reviews that had sometimes slipped by weeks now **finish within one or two days in most cases.**
- Being able to see changes directly in the pull request diff drew **feedback that comparing and reviewing had become intuitive.**
- Recording the writing principles and the operating guides laid **a basis for applying the same criteria repeatedly** as products and authors change.
- Moving documentation work into the existing development workflow let feature owners take part in review without using a separate review tool.
