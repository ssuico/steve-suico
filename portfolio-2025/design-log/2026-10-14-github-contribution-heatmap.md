# GitHub contribution heatmap

**Date:** 2026-10-14
**Status:** accepted
**Author:** collaborative

## Context

The portfolio should show the same trailing-year contribution calendar as the GitHub profile for `ssuico`, including private contribution counts. GitHub exposes that calendar only through GraphQL (`user.contributionsCollection.contributionCalendar`), and the API requires a token. The token belongs in server-side configuration, not the Vite bundle.

## Decision

- A Vercel function at `/api/contributions` calls GitHub with `GITHUB_TOKEN` and returns the calendar totals, months, and daily counts. The dev server exposes the same route.
- The query asks only for calendar fields. Private repository names and commit details are not requested.
- The token is read from `portfolio-2025/.env` locally and must be set as `GITHUB_TOKEN` on the Vercel project for production. `.env` is gitignored.
- The section sits between Projects and Contact, uses the existing dark and pink palette, and colors days by `contributionLevel` instead of GitHub's green scale.
- The window is the API default: the trailing year. Hover and focus show the date and count.

## Alternatives Considered

- Calling GraphQL from the browser. Rejected because the token would be public.
- Scraping the profile SVG. Rejected because the GraphQL calendar is the documented source and already includes private counts when the token has `read:user`.
- Rendering GitHub's returned hex colors. Rejected so the graph matches the portfolio instead of GitHub's green theme.

## Consequences

- Production stays empty until `GITHUB_TOKEN` is added in Vercel.
- The token expires in 90 days and has to be replaced in both places.
- Private days appear as counts only, and only while the profile setting "Private contributions" stays on.
