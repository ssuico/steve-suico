# Project loop keeps playing on hover

**Date:** 2026-10-14
**Status:** accepted
**Author:** collaborative

## Context

[Project carousel loop](2026-10-14-project-carousel-loop.md) pauses the 4-second advance while the pointer is over Selected Work. That makes the row feel stuck as soon as someone reads a card.

## Decision

Hovering the section no longer pauses the progress line or the page change. Keyboard focus inside the section still pauses, and so does a hidden browser tab. Both resume from the point where the line stopped.

## Alternatives Considered

- Pause only while the pointer is on a project card. Rejected: the request is for the loop to keep running across the section.
- Remove every pause, including focus. Rejected: a keyboard user landing on a case-study link still needs the row to hold still.

## Consequences

- A card can slide away while the pointer is over it. Previous, Next, and the project names still jump to a specific page.
