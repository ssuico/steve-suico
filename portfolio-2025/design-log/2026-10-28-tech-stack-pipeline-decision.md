# Tech stack: pipeline replaces the marquee, constellation archived

**Date:** 2026-10-28
**Status:** accepted
**Author:** collaborative

## Context

[Tech stack showcase options](2026-10-28-tech-stack-showcase-options.md) built three samples on a temporary `/stack-lab` page so they could be compared against the marquee ([marquee logos](2026-10-23-visual-system-refresh.md)). The decision after seeing them: use the pipeline, and keep the logo constellation around in case the choice changes.

## Decision

1. **The pipeline replaces the marquee** at the bottom of the home hero, under the stat strip. It moves from `src/views/stack-lab/StackPipeline.tsx` to `src/views/home/StackPipeline.tsx`, and keeps its behavior: `Figma → React → Vercel`, down to `FastAPI → BigQuery → Cloud Run` inside a Google Cloud boundary, supporting tools as chips, hover/focus/tap for the real case-study count, draw-in on first view, static under `prefers-reduced-motion`. It sits below the fold on most screens, so the draw-in plays when it scrolls into view.
2. **The constellation is archived, not deleted.** It moves to `src/archive/StackConstellation.tsx`. It is imported by nothing, so it is not bundled, but it stays inside `src/`, so `tsc` and `eslint` keep it compiling against `src/data/stack.ts` (which keeps the `relations` list it needs). To bring it back, import it where the pipeline is used.
3. **Deleted:** the terminal sample, the `/stack-lab` page and its route, `TechMarquee.tsx`, and the marquee keyframes, animation token and reduced-motion rule in `src/index.css`. Nothing else used them.
4. The About section's Tech stack list is unchanged. It is the complete, text-searchable list; the pipeline is the highlight reel.

## Alternatives Considered

- **Terminal readout:** dropped. It was the least visual of the three and has no logos.
- **Keep the marquee beside the pipeline:** it would repeat the same logos twice on one screen and keep the thing the redesign was meant to remove.
- **Move the pipeline into About, next to the Tech stack list:** it would sit near the list it summarizes, but the hero is where the marquee was and where visitors see the stack first.

## Consequences

- The hero is now taller than one screen (the pipeline is about 400px). The hero's first screen is unchanged.
- The constellation can drift out of sync with the rest of the app. Type checking and linting catch API breaks, but nothing exercises it at runtime while it is archived.
- Figma, Next.js and Cloud Run still show "daily tooling, not tagged on a case study" on hover, because no case study lists them. Adding them to a project's `tech` list changes that automatically.
- The sample page's `noindex` tag, route and chunk are gone, so there is nothing temporary left to remember to delete.
