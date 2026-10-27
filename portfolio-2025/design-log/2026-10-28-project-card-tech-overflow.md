# Project card tech tags: show what fits, summarise the rest

**Date:** 2026-10-28
**Status:** accepted
**Author:** collaborative

## Context

`ProjectCard` cut the tech list with `slice(0, featured ? 6 : 4)`. After [the project copy was rewritten from source](2026-10-28-project-copy-from-source.md) each case study lists 11 to 14 tools, so the cards showed a third of them and gave no hint that more existed. The request: show all of them where space allows, otherwise end with a "+ n more" chip.

## Decision

Add `TechChips` (`src/views/projects/TechChips.tsx`) and use it in `ProjectCard`.

- It lays chips out with the real measured widths and shows as many as fit in **two rows**. If any are left out, the last slot is a `+n more` chip.
- Measurement uses an invisible, `aria-hidden` probe list with the same classes. The probe holds every chip plus a worst-case `+N more` chip. The fit is a greedy row packing over those widths against the list's width, so there is no flicker and no hidden-overflow tricks.
- It re-measures on container resize (`ResizeObserver`) and when web fonts finish loading, so the count is right on phones, the wide featured card and after the font swap.
- The `+n more` chip has a `title` listing the hidden tools, and screen readers get the full list through visually hidden text.
- The detail page already lists every tool, so nothing is lost; the card is a preview.
- The old `featured ? 6 : 4` cap is removed. Two rows is the shared limit so card heights stay even.

## Alternatives Considered

- **Fixed counts per card** (the old approach): wrong whenever chip text widths vary or the viewport changes.
- **CSS only** (`max-height` plus `overflow: hidden`): clips a chip mid-way and cannot render a `+n more` count.
- **Show everything**: 14 chips is five rows on a phone and makes the card heights uneven.

## Consequences

- One small client-side measuring component; cost is a hidden second list per card (11 to 14 `li` elements).
- If the chip styling changes, the probe stays in sync because it reuses the `chip` class.
