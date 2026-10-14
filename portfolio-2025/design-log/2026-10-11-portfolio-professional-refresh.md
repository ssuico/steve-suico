# Portfolio Professional Refresh

**Date:** 2026-10-11
**Status:** accepted
**Author:** collaborative

## Context

The portfolio at `portfolio-2025` is the public site for freelance clients and employers. The neon identity and hero are worth keeping. The rest reads as a student template: a gaming GIF behind About, emoji tabs, a hobbies gallery, placeholder project features, one project, a clipped mobile bio, a global text-shadow on every paragraph, and no way to add case studies without editing layout code.

The approved direction is in the implementation plan: keep the hero, tone the rest down, add a data-driven projects grid with `/projects/:slug` pages, and add Services, a CV download, and an availability badge.

## Decision

- Stay on the current stack (React 18, Vite 6, Tailwind 4, framer-motion, react-router-dom). Do not add dependencies.
- One typed module, `src/data/projects.ts`, feeds both the grid and case-study pages.
- Home stays a single scrolling page. Case studies are real routes, with a Vercel SPA rewrite so deep links work.
- Navbar and footer live outside the page routes so they appear on case studies.
- About drops the GIF and the hobbies tab. Hobbies become a short "Outside of work" chip row inside About Me.
- Education keeps the degree entries visible and tucks tech-voc and high school behind a toggle.
- The "Research & Development" role is labeled **Nov 2024 – Present**. That is inferred from "Year 2" of employment that started Nov 2023, and should be corrected if the transfer date differs.
- Astraeus Esports is dated **2025** on the case study. Correct the year in `src/data/projects.ts` if the engagement was earlier.
- Services copy is four offers grounded in existing experience: full-stack web apps, dashboards and data pipelines, cloud and DevOps, automation and AI-assisted workflows.
- The CV button points at `public/Steve-Suico-CV.pdf`. The file is supplied separately; the link is in place before the PDF exists.
- Work projects without a public screenshot use a gradient cover instead of a fabricated image. Outcomes stay qualitative where no measured result was provided.

## Alternatives Considered

- Project detail in a modal. Rejected: case studies need a URL that can be shared with a client.
- Replacing the neon theme. Rejected: the hero identity should stay.
- Testimonials. Rejected for this pass.

## Consequences

- Adding a project is a data entry plus images, documented in the README.
- `Nov 2024 – Present` may be wrong until confirmed.
- The CV link 404s until `public/Steve-Suico-CV.pdf` is added.
- Image compression is a one-time asset change, not a runtime dependency.
