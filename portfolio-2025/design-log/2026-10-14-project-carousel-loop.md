# Project carousel loop

**Date:** 2026-10-14
**Status:** accepted
**Author:** collaborative

## Context

Selected Work already pages two cards at a time, as decided in [Projects section paging](2026-10-14-projects-section-paging.md). The pages should keep turning on their own, and the change should read as one motion rather than a cut.

## Decision

- While more than one page is showing, the row advances every 4 seconds and wraps to the first page.
- Previous and Next wrap as well.
- The outgoing row slides aside and fades while the incoming row arrives from the other side. A pink line fills across the 4 seconds and empties when the row changes.
- Hovering or focusing the section pauses the line and the advance, so a case study link can be used. The timer resumes from where it stopped.
- Reduced motion skips the slide and still changes the row on the same interval.

## Alternatives Considered

- A third-party carousel. Rejected: framer-motion is already in the page, and the pager controls stay.
- Advancing one card instead of the row. Rejected: the section is already a two-card page, and the loop should turn that page.

## Consequences

- The count text is not a live region. Announcing every page change would interrupt someone using a screen reader.
- The loop does not run when the filtered list fits on one page.
