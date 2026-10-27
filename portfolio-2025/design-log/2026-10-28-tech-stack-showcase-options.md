# Tech stack showcase: three samples to replace the marquee

**Date:** 2026-10-28
**Status:** superseded by [pipeline decision](2026-10-28-tech-stack-pipeline-decision.md)
**Author:** collaborative

## Context

The home page shows the stack as a scrolling marquee of logos ([marquee logos](2026-10-23-visual-system-refresh.md), `TechMarquee.tsx`). Marquees are on most portfolios, so it does not set this one apart. Three alternatives were shortlisted from a longer list, and the decision is to see them side by side before choosing.

## Decision

Build all three as samples on a temporary, unlinked page at `/stack-lab`, below the current marquee for comparison. Nothing on the real home page changes yet. Once one is chosen, it replaces the marquee in a follow-up entry and the preview page and the other two samples are deleted.

1. **Stack as a pipeline.** `Figma → React → Vercel`, then down to `FastAPI → BigQuery → Cloud Run` inside a Google Cloud boundary, with supporting tools (Tailwind CSS, TypeScript, Next.js, Python, Node.js, Docker) as chips under the node they belong to. Connectors animate like the Amazon pipeline diagram. Hovering or focusing a node shows how many case studies use it.
2. **Logo constellation.** Tech logos as drifting nodes joined by relationship lines (React to Next.js to Vercel, FastAPI to Docker to Cloud Run to BigQuery, and so on). Nodes ease back to a home position, nudge away from the pointer, and hovering one lights up its connections with a moving dot. Logos are real focusable buttons over a canvas that draws only the lines.
3. **Terminal readout.** A small terminal window that types `$ stack --list --by=usage`, then one row per tool with a bar for how many case studies use it. Replay button; a screen-reader list carries the same content.

Shared data lives in `src/data/stack.ts`. Usage counts are computed from `projects.ts`, so they are real, not typed in. Tools that no case study lists (for example Figma, Next.js, Cloud Run) show a dash instead of zero, because they appear in the skills and experience copy but not in a project's `tech` list.

All three respect `prefers-reduced-motion` (static layout, no loops), pause when off-screen, keep the tool names as real text, and work by tap on phones.

## Alternatives Considered

The rest of the shortlist: orbit rings, exploded isometric layers, a periodic table, and a draggable toolbox. They were dropped for build cost (isometric layers), overuse (periodic table), or space and accessibility (draggable tiles). They can come back if none of the three fit.

## Consequences

- The preview page ships with any deploy that includes it. It has `noindex`, is not in the sitemap or the nav, and is meant to be deleted after the decision. It should not be committed long term.
- The pipeline and constellation make claims about how tools relate. The relationship lines are a simplification of the stack, not a statement of every project's architecture.
- Dashes for unused-in-case-studies tools may look like gaps. If the chosen option shows counts, the case-study tech lists could be made more complete.
