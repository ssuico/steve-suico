# Work projects: Obseron, Delos, and Agora

**Date:** 2026-10-14
**Status:** accepted
**Author:** collaborative

## Context

The projects grid already has Astraeus Esports plus two Channel Precision entries (Amazon API pipelines and a monitoring dashboard). Three product sites were scanned and should be added as their own case studies, using the data shape from [the portfolio refresh](2026-10-11-portfolio-professional-refresh.md).

## Decision

Append three `work` entries to `src/data/projects.ts`, in this order after Astraeus: Obseron, Delos, Agora. Leave the existing pipeline and dashboard entries in place. They describe the data platform; these three describe the product UIs.

- **Obseron** — public product tour at `https://obseron.channelprecision.com/products`. Marketplace suite (price monitoring, orders, brand analytics, SP-API and Ads report status) plus Amazon financial reporting. Frontend-only React app against a hosted backend.
- **Delos** — public entry at `https://delos.channelprecision.com/`. Chat over granted brand-report tools, connected to the Amazon pipelines through MCP.
- **Agora** — public entry at `https://agora.outdoorequippedservice.com/login`. Neighborhood store reservations: Astro storefront, Express API, MongoDB, Socket.IO.

Each entry gets a live URL and `isPrivate: true`. No cover images; the gradient placeholder stays. Years are `2024 – Present`, matching the other Channel Precision work, and should be corrected if a product started later. Outcomes stay qualitative. Case-study URLs go in `public/sitemap.xml`.

## Alternatives Considered

- Replacing the monitoring-dashboard entry with Obseron. Rejected: the dashboard entry is about pipeline visibility for the data platform, and Obseron is a separate product surface.
- Marking Agora as `client` because the domain is Outdoor Equipped. Rejected: it was requested as a work project and is credited to Channel Precision.

## Consequences

- The grid grows from three cards to six.
- Live links open marketing or sign-in pages, not an authenticated workspace.
- Start years may be wrong until confirmed.
