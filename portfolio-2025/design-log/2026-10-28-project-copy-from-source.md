# Project copy and tech lists rewritten from the source repos

**Date:** 2026-10-28
**Status:** accepted
**Author:** collaborative

## Context

The case studies for Obseron, Delos, Agora and the Amazon API platform were written from memory of the products, not from the code. The owner asked for them to be checked against the repos so the descriptions and the tech stack are accurate. The Astraeus client site is out of scope for now.

Sources read (read-only, no `.env` or credential files opened):

| Case study | Repos |
|---|---|
| Obseron | `obseron-frontend` (React). `obseron-backend` was only skimmed, because the owner built little of it |
| Delos | `research/amazon-pipelines-ops-web` (frontend) and `research/amazon-pipelines-ops-chat` (FastAPI backend) |
| Agora | `agora-app` (Astro, React, Express, MongoDB) |
| Amazon API platform | `research/amazon-pipelines` and `research/amazon-pipelines-webdocs` (VitePress) |

Each repo was checked for the real dependency list, routes and pages, data flow, deployment config and git history. Every claim in the old copy was then marked confirmed, wrong or unverifiable.

## Decision

Rewrite `src/data/projects.ts` for the four projects, and correct the architecture diagram.

**Claims removed or reworded because the code does not support them**

- **Obseron: "financial reporting with SKU-level margin, freight allocation, and tax reconciliation".** It exists only as marketing copy and a static mock on the public Services page. There is no such app in the router. It is removed from the tagline, summary, problem and features.
- **Obseron: "Amazon and Target deltas".** The price forms cover Amazon, Walmart and Target.
- **Obseron: "comparisons can be exported to Excel".** Only Price Sentry exports to Excel. Brand Analytics tables export CSV.
- **Obseron: "cancels and returns" under Sales Sync.** Not found in the dashboard code, so it is dropped.
- **Delos: "the source report attached to the reply".** Replies show badges naming the tools that ran, not a linked report. The copy now says that.
- **Agora: "store chat".** It is a one-shot question or recommendation with a single manager reply, so it is now "questions and recommendations to the store".
- **Agora: "live order feed on the store dashboard".** The socket-driven activity feed is on the customer shop view. The manager's live view is the transactions screen, which is described that way.
- **Agora: "neighborhood stores".** Kept as "neighborhood stores and stalls", and sign-up is described as limited to approved company email domains.
- **Amazon: "room for cleaning and joining raw exports".** The code already does it (pandas transforms, MERGE upserts), so it now says what is built.

**Things the code has that the old copy missed, now included**

- Obseron: the streaming conversational analytics chat with Vega charts, order geography map, Listings Health and Competitive Landscape, role-gated apps with admin and SP-API OAuth (including Vendor Central).
- Delos: the FastAPI backend-for-frontend on Cloud Run, Claude through Vertex AI, MCP client, per-call grant checks, dry-run-then-confirm writes, Datastore, SSE streaming.
- Agora: Mongo transactions, Socket.IO events, midnight store-day close, order audit trail, hybrid roles, Excel reports, SMTP codes.
- Amazon: Vendor Central, Marketing Cloud and pricing pipelines, retry and idempotency design, coverage matrix and gap-fill, MCP server, the VitePress docs site.

**Other changes that follow from the source**

- **Roles** are set to what the repos show: frontend developer on Obseron; full-stack on Delos and Agora; backend and data on the Amazon platform.
- **Years** on Obseron (2025), Delos (2026) and Agora (2026) come from each repo's first commit. The Amazon platform stays at 2024 because the experience entry says the pipelines have been maintained since Nov 2024, even though its repo's history starts in Nov 2025.
- **Tech lists** use the dependency files. `shadcn/ui` replaces `Radix UI`, because every project has a `components.json` and Radix arrives through it. `REST API` is added where the project exposes one. Usage counts on the home pipeline now pick up shadcn/ui, REST APIs and Cloud Run. Cursor AI, Postman and Next.js stay untagged because no repo shows them.
- **No percentages, commit counts or colleague names** are published. They came out of the analysis but are not needed for the case studies.
- **The pipeline diagram** shows one Cloud Run service, not two. `cloudbuild.yaml` deploys a single `amazon-pipelines` service that holds the API, the task workers and the MCP endpoint, and Cloud Tasks calls back into it. BigQuery is read and written by that one service. This supersedes the two-service layout in [the pipeline diagram entry](2026-10-24-amazon-pipeline-diagram.md).

## Alternatives Considered

- **Only fix the wrong claims and leave the rest:** it would leave the tech lists and the diagram out of step with the repos, which is what the owner asked to fix.
- **Publish commit counts and test counts:** they are true, but they invite comparisons and name colleagues. They stay in the analysis, not on the site.
- **Describe Cloud Scheduler as a fact or drop it:** the platform's docs describe Scheduler triggering the dispatch endpoints, but no Scheduler job is defined in code. It stays in the diagram and copy and is listed below for the owner to confirm.

## Consequences

- Open items for the owner: confirm Cloud Scheduler jobs exist in production; confirm the Amazon platform start year; confirm the role labels.
- The experience section and the About tech list still describe these projects in older words (for example "monitoring dashboard ... deployed via Vercel"). A follow-up pass should align them.
- None of the four repos has frontend automated tests. The copy makes no claim about testing.
- Some of the repos are private, so readers cannot verify the copy. The wording sticks to what the code does and avoids outcomes the repos cannot show.
