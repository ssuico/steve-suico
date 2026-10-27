# Services copy aligned with the verified projects

**Date:** 2026-10-28
**Status:** accepted
**Author:** collaborative

## Context

[Experience and skills alignment](2026-10-28-experience-and-skills-alignment.md) left the Services section alone because its claims were "general offers". On a second read against [the project copy](2026-10-28-project-copy-from-source.md) that is only half true. The four offers are right, but several bullets are vaguer than the work behind them, and a few say things the repos do not show:

- "CI/CD so a release is a pipeline, not a checklist": releases are started by hand with `gcloud builds submit`, and Cloud Build then builds the image and deploys it. That is a release build, not a CI/CD pipeline.
- "Ship the same artifact locally and in production": local runs mostly use a virtualenv.
- "Cleaning, joins, and tables people can query": the platform stages data and writes with BigQuery `MERGE`; that is the concrete claim.
- "AI-assisted delivery when it speeds up a real workflow": says nothing about the one AI product that exists (Delos).
- The web card names only React and Vercel, but Agora is Astro with React islands and an Express API on Railway.

## Decision

Keep the four offers, their ids, titles, order and layout. Rewrite the pitch lines that over-claim and the bullets, each tied to something in a repo:

- **Full-stack web applications (4 bullets):** React and TypeScript interfaces; Astro sites with React islands (Agora); an API behind it, FastAPI or Express, with live updates over Socket.IO where needed; a release on Vercel, Railway or the client's host.
- **Dashboards and data pipelines (4 bullets):** ingestion from SP-API, Vendor Central and Ads API into BigQuery; queued jobs with retries and `MERGE` writes so a rerun does not duplicate rows; dashboards for report runs, price tracking and brand analytics; a VitePress docs site.
- **Cloud and DevOps (3 bullets):** Cloud Run with BigQuery and Cloud Tasks; each release one Docker image built and deployed by Cloud Build; status endpoints and Cloud Logging. Pitch changes to "Get a service onto Google Cloud, Railway, or Vercel, and make the next release routine."
- **Automation and AI-assisted workflows (4 bullets):** the two automation bullets stay (Zapier is on the owner's tool list). The AI bullet becomes a chat assistant that calls your APIs as MCP tools with Claude on Vertex AI, plus per-account access and a confirm step before writes (both in Delos).

The same wording fix applies elsewhere on the site: the About tech list item "CI/CD & Monitoring" becomes "Release Builds & Monitoring", and the Amazon diagram's Cloud Build node reads "Docker builds" instead of "Docker CI/CD". The "CI/CD" keyword in the `index.html` `knowsAbout` metadata stays: it is a search term, and Cloud Build is a CI/CD product.

Wording avoids "on a schedule" and "CI/CD": Cloud Scheduler is still unconfirmed in production, and releases are started by hand.

## Alternatives Considered

- **Add a fifth card for AI assistants over your data:** it is the most distinctive offer, but five cards leave an orphan in the two-column grid and the AI work sits naturally with automation.
- **Add a tool chip row to each card:** useful, but the home pipeline and project cards already show the stack; it would repeat it.
- **Leave it:** keeps unsupported claims on the public page.

## Consequences

- Cards are slightly taller. The top row has 4 bullets each; the bottom row has 3 and 4, and the grid stretches both cards to the same height.
- If Cloud Scheduler is confirmed live, the data card can say jobs run on a schedule.
- If releases move to an automated trigger, the Cloud card can go back to calling it CI/CD.
