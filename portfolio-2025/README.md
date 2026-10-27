# Steve Suico — Portfolio

Personal portfolio for Steve Bryan Suico Jr. React, TypeScript, Vite, and Tailwind CSS. Deployed on Vercel.

## Scripts

```bash
npm install          # install from package-lock.json
npm run dev          # local dev server
npm run typecheck    # tsc -b --noEmit
npm run lint         # eslint
npm run build        # production build
npm run check        # typecheck, lint, and build
npm run preview      # preview the production build
```

This project uses npm only; `package-lock.json` is the lockfile and Vercel installs from it. Do not add a `yarn.lock`: Vercel would pick Yarn and install different versions. The `check` pipeline does not run a security audit or a formatter. There is no unit-test runner in this repo.

## Environment

The contact form posts to `/api/contact`, which sends mail through Resend. Both `npm run dev` and Vercel serve that route. Create `.env` (or `.env.local`) and set the same variables in the Vercel project:

```bash
RESEND_API_KEY=            # sending-only key restricted to mail.ssuico.com
CONTACT_TO_EMAIL=          # where messages are delivered
CONTACT_FROM_EMAIL=        # e.g. Portfolio Contact <contact@mail.ssuico.com>
```

`CONTACT_FROM_EMAIL` falls back to `onboarding@resend.dev`, which Resend only delivers to the account owner's address. Without `RESEND_API_KEY` and `CONTACT_TO_EMAIL` the form shows an error and asks visitors to email directly. See `design-log/2026-10-27-contact-form-resend.md`.

## Add a project

1. Add a cover (and optional gallery images) under `src/assets/projects/` as WebP.
2. Append an entry to `src/data/projects.ts`.
3. Add the case-study URL to `public/sitemap.xml`.

Categories are `client`, `personal`, and `work`. Leave `links.live` and `links.repo` unset and set `links.isPrivate` when the code cannot be shared. Omit `cover` to use the gradient placeholder.

## CV

The Download CV buttons point at `public/Steve-Suico-CV.pdf`. Add that file to enable the download.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about`, `/services`, `/experience`, `/education`, `/projects`, `/contributions`, `/contact` | The same page, scrolled to that section |
| `/projects/:slug` | Case study |
