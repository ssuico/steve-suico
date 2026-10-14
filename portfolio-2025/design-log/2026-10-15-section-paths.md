# Section paths without a hash

**Date:** 2026-10-15
**Status:** accepted
**Author:** collaborative

## Context

Section links use `/#about` and similar hashes. The scroll runs once, so a later layout shift (images, the contribution graph) leaves the wrong section on screen. The hash also stays in the address bar.

## Decision

- Each section has a path: `/`, `/about`, `/services`, `/experience`, `/education`, `/projects`, `/contributions`, `/contact`. The page is still one document.
- Opening a path scrolls to that section, then corrects for a short time if the layout moves. Corrections jump instead of restarting a smooth scroll. The browser's own scroll restoration is turned off so it does not pull the page back. A click on the current path scrolls again.
- Old `/#section` addresses are replaced with the matching path.
- Scrolling updates the path with history replace, so the bar matches the section without adding a back-button stop for every section. A clicked path is a normal history entry.
- `/projects/:slug` stays the case study. Unknown paths stay the 404.

## Alternatives Considered

- Keep hashes and only retry the scroll. Rejected: the address would still show `#`.
- A separate page per section. Rejected: the portfolio is one scrolling page, and the case-study route already owns real page changes.

## Consequences

- Refreshing `/contact` opens on Contact. The navbar highlight follows the path.
- While a clicked scroll is in motion, the address does not hop through the sections in between.
