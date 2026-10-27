# Use npm only and remove Yarn

**Date:** 2026-10-28
**Status:** accepted
**Author:** collaborative

## Context

The Vercel production build failed with `"SiCursor" is not exported by react-icons/si`. The code had been verified locally, so the cause was a different install on Vercel:

- `yarn.lock` was the only lockfile in git, so Vercel ran Yarn. It pinned `react-icons` 5.5.0 (no `SiCursor`, and no guarantee of the other new icons) and `animejs` 4.0.2 (the new motion code needs 4.5).
- All local work was installed with npm, which had `react-icons` 5.7.0 and `animejs` 4.5.0.
- The untracked `package-lock.json` was stale as well: it pinned the same 5.5.0 and 4.0.2, and `npm ci` rejected it as out of sync with `package.json`. Committing it as it was would have left npm on Vercel at `react-icons` 5.5.0 and the build still broken.

[The motion entry](2026-10-28-home-motion-animejs.md) had already left "which lockfile to keep" open. The owner has now decided: remove Yarn, use npm, because Yarn has caused repeated problems.

## Decision

- Delete `yarn.lock`.
- Regenerate `package-lock.json` from scratch (`npm install --package-lock-only`), not edit the stale one. It now resolves `react-icons` 5.7.0, `animejs` 4.5.0 and `resend` 6.35.0, and `npm ci` accepts it. It is committed as the only lockfile.
- `scripts.check` runs `npm run` instead of `yarn run`.
- `README.md` documents npm commands and says not to add a `yarn.lock` (Vercel would choose Yarn again).
- Vercel needs no setting change: with only `package-lock.json` present it installs with npm and runs `vite build` for `vercel-build`.
- Verified by deleting `node_modules`, running `npm ci`, then `npm run check` (typecheck, lint, build).

## Alternatives Considered

- **Regenerate `yarn.lock` and keep Yarn:** works, but the owner wants Yarn gone, and two package managers on one machine is how the two lockfiles drifted.
- **Pin `react-icons` in `package.json` and keep both lockfiles:** hides the drift instead of removing it.
- **Set Vercel's install command to `npm install` and leave `yarn.lock`:** easy to undo by accident, and `yarn.lock` would stay stale.

## Consequences

- Dependency versions on Vercel now match local. Future installs resolve from `package-lock.json`.
- Earlier design-log entries still mention Yarn commands; they are history and are not edited.
- `.gitignore` still lists Yarn log files; harmless, left alone.
- `npm audit` reports vulnerabilities in the dependency tree. That was not part of this change and is not in `check`.
