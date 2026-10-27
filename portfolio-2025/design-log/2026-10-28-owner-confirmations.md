# Owner confirmations: Cloud Scheduler, dates, and where each project belongs

**Date:** 2026-10-28
**Status:** accepted
**Author:** collaborative

## Context

The earlier alignment entries ([project copy](2026-10-28-project-copy-from-source.md), [experience and skills](2026-10-28-experience-and-skills-alignment.md), [pipeline](2026-10-28-stack-pipeline-realigned.md), [services](2026-10-28-services-aligned-with-projects.md)) each left open questions. The owner answered them:

- **Cloud Scheduler is live in production.** It had been held back from the pipeline and the services copy because only the docs mentioned it.
- **The Amazon platform started in November 2025.** The project said 2024; the repo's first commit is also Nov 2025.
- **The role labels are right** (Frontend, Full-stack, Backend).
- **Agora is not part of the R&D role.** It is a side project, built during the R&D period.
- **Obseron predates the move to R&D** and continues to the present.

Read-only check of the repos' first commits: the Obseron frontend starts May 2025 (the owner's first commit is 12 May 2025), and Agora starts Mar 2026.

## Decision

- **R&D role start date: Nov 2024 becomes Nov 2025.** This supersedes the date in [the professional refresh](2026-10-11-portfolio-professional-refresh.md), which was inferred from "year 2 of employment" and flagged for correction. The owner's answers force it: Obseron started in May 2025 and came before the transfer, and the platform the role is about started in Nov 2025. If the transfer date is actually different, only this one string changes.
- **Obseron moves from the R&D role to the Nov 2023 Software Developer role.** Its bullet is rewritten as the React frontend work (report-run dashboards, price tracking, brand analytics, on Vercel) and put first in that role. The R&D role drops the Obseron bullet and the Vercel tag, since nothing else in it deploys on Vercel (Delos runs on Cloud Run). The Nov 2023 role gains TypeScript and Vercel tags.
- **Agora becomes a Personal project** (`category: 'personal'`). The "Personal" filter tab appears on its own (tabs with no projects are hidden), and the section description now mentions side projects. Nothing about Agora is added to Experience.
- **Amazon platform year: 2025 – Present.**
- **Cloud Scheduler is added everywhere it was held back:** a tag on the Amazon case study, a `Cloud Scheduler` item in the stack data and a chip beside Cloud Tasks in the home pipeline, the R&D "ingested on a schedule" bullet (now says what triggers it), and the data and cloud Services bullets ("Scheduled and queued jobs"). The About list typo "Cloud Schedulers" becomes "Cloud Scheduler".

## Alternatives Considered

- **Keep the R&D date and only move Obseron:** leaves a role that starts six months before the project it is about.
- **Ask before changing the date:** the answers imply it, the change is one string, and it is called out in the hand-off for confirmation.
- **End the Nov 2023 role at the transfer:** not implied by the answers (Obseron continues to the present), so both roles still read "Present" as before.

## Consequences

- Experience now reads: R&D (Nov 2025 – Present) holds the platform, Delos, release builds, status tooling and docs; the Nov 2023 role holds Obseron and the internal tools.
- Open: whether the Nov 2023 role should end at the transfer date.
- Open: the earlier design logs still say Nov 2024. They are history; this entry supersedes the date.
