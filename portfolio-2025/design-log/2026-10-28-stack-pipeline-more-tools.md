# Stack pipeline: more tools under React, backend and a dev tools strip

**Date:** 2026-10-28
**Status:** accepted
**Author:** collaborative

## Context

[Pipeline decision](2026-10-28-tech-stack-pipeline-decision.md) put the stack on the home page as a pipeline with six main nodes and a few chips. The owner listed more tools in daily use that the diagram left out, mostly around React.

## Decision

Add these as chips, using the same chip component, hover/focus caption and count logic:

- **Under React:** Zustand (state management), shadcn/ui (components), Vite (build tool), Astro. Existing chips stay: TypeScript, Tailwind CSS, Next.js. The chips wrap into two rows.
- **Under FastAPI:** MongoDB and RESTful APIs, next to Python and Node.js. The chips are left-aligned to the node and wrap into two rows, so they stay under their own column.
- **New "Dev tools" strip** below the Google Cloud box: Cursor AI and Postman (API testing). They are not part of the request path, so they sit outside the pipeline instead of getting arrows.

Supporting details:

- `src/data/stack.ts` gets the new items, a `tools` group, and an optional `note` ("state management", "build tool"). The note shows in the hover caption and the accessible label.
- Usage counts keep coming from `projects.ts`. Vite, Zustand, Astro and MongoDB match real case studies. shadcn/ui, RESTful APIs, Cursor AI and Postman show "daily tooling, not tagged on a case study". Radix UI is not counted as shadcn/ui, even though shadcn/ui is built on it, because that would claim something the project data does not say.
- Zustand has no brand logo in the icon set. It uses a bear (Zustand's mascot). RESTful APIs uses a generic API icon.
- The archived constellation now filters to the tools it has positions for, so adding items here cannot break it.

## Alternatives Considered

- **A separate "details" panel or tabs:** more clicks to see the same list. The About section already has the full text list.
- **One flat row of every chip:** about 600px wide, which runs under neighboring nodes and reads as belonging to the wrong one.
- **Arrows from the dev tools to the pipeline:** it would imply a data flow that is not there.

## Consequences

- The diagram is taller (viewBox 466 instead of 336), so the hero is longer. Phones still scroll it sideways.
- The hover caption now says what each added tool is for, in addition to its usage.
- The list can drift from the About section's Tech stack list. They are written separately.
