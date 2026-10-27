# Experience and tech list aligned with the project case studies

**Date:** 2026-10-28
**Status:** accepted
**Author:** collaborative

## Context

[Project copy from source](2026-10-28-project-copy-from-source.md) rewrote the four case studies from the repos and listed what was still out of step. This entry covers that remainder. The Experience section and the About tech list were written before Delos, the MCP work, the docs site and the newer stack existed, and some of their wording was not supported by the code.

## Decision

**Experience, Research & Development role** (the one that already owned the pipelines and the React dashboard bullet):

- The first two bullets (pipelines, FastAPI on Google Cloud) become one concrete bullet: SP-API, Vendor Central, Ads API, Marketing Cloud and pricing reports ingested into BigQuery on Cloud Run, through Cloud Tasks queues, with retries and MERGE writes.
- New bullet for Delos, built end to end: React frontend, FastAPI backend, Claude on Vertex AI, MCP, per-account grants, confirm before write.
- The "real-time monitoring dashboard ... deployed via Vercel" bullet becomes the Obseron frontend: report-run dashboards, price tracking and brand analytics. "Real-time" is dropped because the repo shows no live updates besides the chat stream (no WebSockets). Vercel stays, because the Obseron client has a `vercel.json`.
- The VitePress documentation site gets its own bullet.
- Wording that the code does not back up is replaced:
  - "significantly improving deployment speed and system reliability" has no measurement, so it now says what happens (a Cloud Build run builds the image and deploys it).
  - "CI/CD workflows": the build is started by hand with `gcloud builds submit`, so it is called release builds.
  - "Consistent environments across local and production": local runs mostly use a virtualenv, so it now says each release ships as one image.
  - "Proactive system monitoring" becomes what exists: status endpoints, a report coverage matrix and Cloud Logging.
- Tags gain Python, BigQuery, Cloud Run, MCP.

**Experience, the other role (Nov 2023):** unchanged. Its bullets are general and the repos do not say which of them (for example Agora) belong to it.

**About tech list:**

- Frontend adds TypeScript, Astro, shadcn/ui and Recharts, and Zustand gets a bear icon instead of the Framer Motion icon it was borrowing.
- Backend adds Express, MongoDB, Socket.IO, REST APIs and VitePress. Cursor AI gets its own icon.
- Cloud and data uses the BigQuery icon for BigQuery.
- A new "AI & integrations" row holds Claude, MCP, Vertex AI, Amazon SP-API and Amazon Ads API.
- Core adds LLM apps and MCP integration, and technical documentation.
- Everything added is in a repo. Next.js, which no repo shows, stays because the owner lists it as a tool they use.

**Left alone:** the Services page and `index.html` metadata. Their claims are general offers and a keyword list, and they stay true.

## Alternatives Considered

- **Add Obseron, Delos and Agora as separate experience entries:** they are products inside the same employer and period, so separate entries would imply separate jobs.
- **Assign Agora to a role:** nothing in the repo says which role it belongs to, so it stays out until the owner decides.
- **Drop the Vercel tag from the R&D role:** the Obseron frontend ships on Vercel, so it stays.

## Consequences

- The R&D role still has six bullets, but each is longer and more specific, and three show before "Show 3 more".
- The tech list is longer, with a fifth row. It still reads as a list of things used on shipped work.
- If Agora or Obseron should appear under a specific role, add a bullet there.
