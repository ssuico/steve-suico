# Projects section paging

**Date:** 2026-10-14
**Status:** accepted
**Author:** collaborative

## Context

Selected Work renders every project as a full card in a two-column grid. Five cards already make the section long, and each new entry in `src/data/projects.ts` adds another row. Case studies stay on `/projects/:slug`. The section itself should keep a stable height while every project remains reachable without leaving `#projects`.

## Decision

- Show one row: two cards from 768px up, one card below that.
- Previous and Next move through the filtered list. The label reports which projects are on screen, such as "1–2 of 5".
- A horizontal name rail lists every project in the current filter. Choosing a name opens the page that contains that card.
- Category filters still apply and return to the first page.
- The rail and pager stay hidden when the filtered list already fits on one page.

## Alternatives Considered

- A separate "all projects" page. Rejected: the work should stay in the home section.
- "Show more" that expands the grid. Rejected: the section grows again once it is opened.
- A carousel library. Rejected: the site does not add dependencies for this, and paging two existing cards is enough.

## Consequences

- Adding a project is still a data entry. The section height does not grow with the list.
- On a phone, one card is visible at a time and the name rail scrolls sideways.
