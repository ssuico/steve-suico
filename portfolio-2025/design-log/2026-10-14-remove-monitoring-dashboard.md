# Remove the monitoring dashboard project

**Date:** 2026-10-14
**Status:** accepted
**Author:** collaborative

## Context

The projects list included a Real-Time Monitoring Dashboard case study. [The Obseron, Delos, and Agora entry](2026-10-14-work-projects-obseron-delos-agora.md) kept it beside the Amazon API platform. That case study is no longer wanted on the public site.

## Decision

Remove the `monitoring-dashboard` entry from `src/data/projects.ts` and its URL from `public/sitemap.xml`. Leave the Amazon API Data Platform entry. Leave the experience section as it is.

## Alternatives Considered

- Folding the dashboard copy into the Amazon API case study. Rejected: the request is to remove the project, not to merge it.

## Consequences

- `/projects/monitoring-dashboard` renders the not-found state.
- The grid now has five projects.
