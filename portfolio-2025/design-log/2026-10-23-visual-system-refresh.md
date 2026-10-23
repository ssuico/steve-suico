# Visual system refresh from portfolio references

**Date:** 2026-10-23
**Status:** accepted
**Author:** collaborative

## Context

The request was to study three portfolios, [diogotc.com](https://diogotc.com/), [tamalsen.dev](https://tamalsen.dev/) and [brittanychiang.com](https://brittanychiang.com/), and apply what makes them consistent, simple and eye-catching to this site.

What the references have in common:

- **One repeated section pattern.** Every section opens the same way (a small label, a title, a short line) and holds the same kind of content block. Nothing is decorated differently from its neighbour.
- **One accent colour, used with restraint.** Neutral surfaces carry the page; the accent marks what is interactive or current.
- **Scannable lists instead of hidden content.** Experience is a dated list with tech chips (Brittany Chiang, Diogo Correia). Work is a grid you can see all of (Tamal Sen). Nothing waits behind a tab or a timer.
- **Clear availability and a direct call to action.** Tamal Sen closes on "available for select freelance opportunities". Diogo Correia leads with a one-line identity.
- **Small touches of personality.** Hover focus on lists, a quiet motion detail, a personal line. They never compete with the content.

What the browser review added (layout and visual detail, not visible in page text):

- **Brittany Chiang:** a fixed left column holds name, role and nav; the right column scrolls. Nav items are a short line plus a small-caps label, and the line grows on the active item. Dates sit in their own column in small uppercase. Tech tags are small pills tinted with the accent. Hovering one row of a list dims the rest. Project rows use a small thumbnail and a ↗ on the title.
- **Tamal Sen:** everything is monospace with numbered `// home` nav. Expertise cards pair an icon with a title and a coloured highlighter underline, and use code-comment motifs. Work is a two-column grid of large screenshots with the title and category underneath.
- **Diogo Correia:** a centred avatar and a row of social icons over an animated constellation background. Project cards each have their own colour and a plain action label.

The pattern across them: dates, labels and tags are small and mono or uppercase; titles are large and plain; the accent only tints chips and marks the current item; one ambient motion detail sits behind the hero.

This site already has a good identity (the neon portrait, pink accent, floating nav dock from [2026-10-15-floating-nav-dock](2026-10-15-floating-nav-dock.md)). The gaps were consistency and hierarchy:

- Every section had a different heading treatment (icon or no icon, centred, different gradients) and the page alternated black and grey gradients, which produced visible bands.
- About hid the tech stack behind a tab, over a 1.3 MB looping GIF.
- Experience used a zig-zag timeline with three dot colours and long bullet walls.
- Selected Work showed two of five projects at a time on a four-second timer ([2026-10-14-projects-section-paging](2026-10-14-projects-section-paging.md), [2026-10-14-project-carousel-loop](2026-10-14-project-carousel-loop.md)).
- Comfortaa, a rounded display face, made the whole page read as playful rather than professional.
- The footer repeated the nav and the contact block.

## Decision

**System**

- Type: Space Grotesk for headings, Inter for body, JetBrains Mono for small labels and dates. Replaces Comfortaa.
- Colour: one ink background for the whole page, with a fixed ambient glow and dot grid behind it. Sections are separated by hairlines, not gradient swaps. Pink stays the single accent; cyan appears only inside the hero and the name gradient, echoing the portrait.
- Shared building blocks: `Section` (numbered label, title, description, same spacing everywhere), `Reveal` (one fade-up), `SpotlightCard` (a cursor-following highlight on cards). All sections use them.
- Section headers use a code-comment label (`// 01 about`, from Tamal Sen) over a large plain title, with one highlighted keyword underlined in pink. Dates, labels and chips use the mono face. Chips are tinted with the accent (from Brittany Chiang).
- Two section layouts, chosen by content: **split** (a sticky header column on the left, content on the right, from Brittany Chiang) for lists and prose: About, Experience, Education, Contact. **Stacked** (header above, full-width content) for grids: Services, Projects, Contributions.
- The nav dock numbers its links in mono (`01`, `02`, ...), matching the section labels.
- The hero gets a quiet constellation canvas behind it (Diogo Correia), drawn with a plain `<canvas>`: nodes drift, and lines join nodes near each other and near the cursor. It pauses off-screen and draws one still frame under `prefers-reduced-motion`.
- No new dependencies. Motion respects `prefers-reduced-motion`.

**Content structure**

- Hero: availability badge, name, a rotating one-line focus, short bio, three actions, a portrait with two floating context cards, and a stat strip (years in production, case studies, reply time, live Cebu time). A tech marquee closes the hero. The floating SVG shapes and the "Scroll Down" mouse go.
- About: bio, facts and the tech stack on one screen. The tab switcher and the GIF are removed (the GIF file is deleted).
- Section order becomes About, Services, Projects, Experience, Education, Contributions, Contact, so proof of work comes before the work history. Paths are unchanged; only their order in `pageSections` and `Layout` moves.
- Projects: every project is visible in one grid with the existing category filter. Paging, the timer and the name rail are removed. This supersedes the two project paging entries above.
- Experience and Education share one row pattern: a date column on the left, the content on the right, hover dims the other rows. Experience shows the first three bullets and expands for the rest.
- Contact: a headline, a copy-email action, and the same form logic in restyled inputs.
- Footer: one slim row. The nav already lives in the dock.
- Case study pages adopt the same type, colours and card style.

**Things that did not change**

- Routes, the section scroll logic, the contribution heatmap data flow, the contact form and EmailJS wiring, and the project data model.
- Copy for experience, services and projects. Only the hero tagline cycle and the new stat strip are new text, and every figure in the strip is computed from existing data (start date of the first full-time role, `projects.length`, the stated reply time).

**Scroll spy fixes (found while testing the new layout)**

- The spy only fired when 15% of a section sat inside a thin band near the top of the screen. The new sections are taller than that allows, so the nav stayed on "Home". The spy now reads the active section from geometry (the last section whose top has passed 35% of the viewport) and uses the band only to wake up. Behaviour for short sections is unchanged.
- The "do not scroll again after a spy-driven path change" skip was an 80 ms timer. A slow render let the scroll through and the page snapped back to a section top while someone was reading. The skip is now tied to the specific path and lasts until that path change is handled.

## Alternatives Considered

- **Brittany Chiang's sticky left column.** It suits a content-light page. This site has eight sections and a floating dock, and a fixed column would fight the dock and the hero portrait.
- **A light theme.** Rejected: the portrait and the pink accent are built for dark.
- **Keeping the carousel and only restyling it.** Rejected: hiding three of five projects is the largest content problem on the page.
- **Adding a component library or a smooth-scroll library.** Rejected: nothing here needs it.

## Consequences

- The Projects section is taller than before. That is the cost of showing all the work at once; with more projects it can return to a featured row plus an archive link.
- The home route now loads three web fonts instead of one. They are `display=swap` and loaded non-blocking, as Comfortaa was.
- The years figure in the stat strip counts from Nov 2023 and changes by itself over time. If the true start date differs, edit `careerStart` in `src/data/site.ts`.
- `src/index.css` now holds the design tokens. New sections should use `Section` rather than their own heading markup.
