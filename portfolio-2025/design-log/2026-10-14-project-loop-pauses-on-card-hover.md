# Project loop pauses on card hover

**Date:** 2026-10-14
**Status:** accepted
**Author:** collaborative

## Context

[Project carousel loop](2026-10-14-project-carousel-loop.md) paused the whole Selected Work section on hover. [Project loop keeps playing on hover](2026-10-14-project-loop-keeps-playing-on-hover.md) then removed that pause. The row should keep turning while someone reads the heading, filters, or controls, and hold still only on a project card.

## Decision

- The 4-second advance pauses while the pointer is over a project card, and while keyboard focus is inside that card.
- Hovering or focusing the heading, filters, progress line, Previous, Next, or project names does not pause the loop.
- A hidden browser tab still pauses. The line resumes from where it stopped.

## Alternatives Considered

- Pause for the whole card row, including the gap between the two cards. Rejected: the hold should be the card, so the gap and the empty side of a short last page keep playing.
- Leave the loop running over the cards as well. Rejected: a case-study link is hard to use if the card slides away under the pointer.

## Consequences

- Moving from one card to the other keeps the loop paused. Leaving both cards resumes it.
