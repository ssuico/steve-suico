# Floating navigation dock

**Date:** 2026-10-15
**Status:** accepted
**Author:** collaborative

## Context

The header is a full-width strip of text links. The rest of the page is dark cards with a pink accent: project cards, the contribution panel, and the round filter controls.

## Decision

The header becomes a floating card, inset from the edges, using the same rounded panel and border as the other cards. Section links sit in that card. The current section is a pink pill that slides to the chosen link. Below the desktop width, the card keeps the name and a menu button, and the links open inside the same card.

## Alternatives Considered

- A vertical index along the side of the page. Rejected: it crowds the hero and the scroll-to-top control.
- A full-width bar with only a new type treatment. Rejected: the layout would still read as a default header.

## Consequences

- The card sits over the hero, so section scroll offset stays large enough to clear it.
- On a case study, no section pill is shown.
