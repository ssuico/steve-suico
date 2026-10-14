# Project cover images for Obseron, Delos, and Agora

**Date:** 2026-10-14
**Status:** accepted
**Author:** collaborative

## Context

[The work-project entry](2026-10-14-work-projects-obseron-delos-agora.md) left these three case studies on the gradient placeholder. Screenshots are now in `src/assets/projects/`.

## Decision

Set `cover` from the files that were added:

- Obseron: `obseron-prod.png` (products page)
- Delos: `delos-login.png`
- Agora: `agora-login.png`

The card and the case-study banner both read `cover`, same as Astraeus. The Amazon API and monitoring-dashboard entries stay on the gradient.

## Alternatives Considered

- Converting the PNGs to WebP before wiring them. Deferred: use the files as added.

## Consequences

- The three cards and their case studies show the screenshot instead of the gradient.
- Agora’s PNG is much larger than the Astraeus WebP, so that card costs more to load.
