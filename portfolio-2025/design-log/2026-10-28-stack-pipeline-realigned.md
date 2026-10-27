# Stack pipeline realigned with the verified project stacks

**Date:** 2026-10-28
**Status:** accepted
**Author:** collaborative

## Context

The home pipeline ([pipeline decision](2026-10-28-tech-stack-pipeline-decision.md), [more tools](2026-10-28-stack-pipeline-more-tools.md)) was drawn before the repos were read. [Project copy from source](2026-10-28-project-copy-from-source.md) then showed where it was off:

- **Hosting is drawn backwards.** The Google Cloud row read FastAPI → BigQuery → Cloud Run, as if Cloud Run came after the data. Cloud Run is where the FastAPI service runs, and BigQuery is what it reads and writes.
- **Agora's stack sits in the wrong place.** Node.js and MongoDB were chips under FastAPI inside the Google Cloud box. They belong to Agora (Express on MongoDB), which runs on Railway.
- **Tools that are in the repos are missing:** Claude, Vertex AI and MCP (Delos), Cloud Tasks, Cloud Build and Pydantic (Amazon platform), Express, Socket.IO and JWT (Agora), and VitePress (docs).

## Decision

- **Google Cloud row, left to right:** Cloud Run (hosts the API) → FastAPI (API) → BigQuery (data), which follows a request in. Chips: Docker and Cloud Build under Cloud Run; Python, Pydantic, RESTful APIs and Cloud Tasks under FastAPI. The "API calls" connector from the interface row now lands on Cloud Run, and is labelled REST and MCP calls, because Obseron calls the REST API and Delos reaches the platform through MCP.
- **A Railway strip** below the cloud box holds Agora's backend: Express, Node.js, MongoDB, Socket.IO and JWT. It is a strip with no arrows, because it is a separate stack, not part of the Amazon pipeline.
- **A two-part band** below it: **AI** (Claude, Vertex AI, MCP) and **Dev tools** (Cursor AI, Postman, VitePress).
- `src/data/stack.ts` gets the new tools. Each one matches the tag the case studies already use, so the hover counts stay computed from `projects.ts`: MCP and FastAPI show 2 of 5, Cloud Tasks, Cloud Build, Pydantic, Claude, Vertex AI, Socket.IO, JWT, VitePress and Express show 1.
- Not added: Cloud Scheduler as a chip (still unconfirmed as live, see the project copy entry) and Railway as a node. Railway is the strip's label.
- Astro's hover note changes from "content-focused sites" to "server-rendered sites with React islands", which is how Agora uses it.

## Alternatives Considered

- **Keep three nodes in the cloud row and only move chips:** it would keep the Cloud Run-after-BigQuery order, which is the main mistake.
- **A second lane with arrows for Railway:** the frontends in this pipeline ship on Vercel, and Agora's frontend is served by its own Express server, so any arrow would invent a data flow.
- **Put AI under the FastAPI node:** Delos's backend is its own service, so the AI layer gets its own strip instead of implying it is part of the Amazon platform.

## Consequences

- The diagram is a little taller (about 530 in viewBox units, up from 466).
- Colleagues and clients reading it see Google Cloud, Railway, AI and tooling as separate stacks, which matches how the work is split.
- Cloud Scheduler stays out until it is confirmed.
