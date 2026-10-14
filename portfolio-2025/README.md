# Steve Suico — Portfolio

Personal portfolio for Steve Bryan Suico Jr. React, TypeScript, Vite, and Tailwind CSS. Deployed on Vercel.

## Scripts

```bash
yarn dev         # local dev server
yarn typecheck   # tsc -b --noEmit
yarn lint        # eslint
yarn build       # production build
yarn run check   # typecheck, lint, and build
yarn preview     # preview the production build
```

Yarn 1 treats `yarn check` as its own integrity command, so the project pipeline is `yarn run check`. That pipeline does not run a security audit or a formatter. There is no unit-test runner in this repo.

## Environment

The contact form sends mail through EmailJS. Create `.env.local`:

```bash
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

Without those values the form shows an error and asks visitors to email directly.

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
