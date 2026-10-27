# Home page motion with Anime.js

**Date:** 2026-10-28
**Status:** accepted
**Author:** collaborative

## Context

[The visual system refresh](2026-10-23-visual-system-refresh.md) gave the hero a canvas constellation, a rotating focus line, a floating-card pair, and a stat strip. Its entrance is two `framer-motion` fades (text column, photo) and the stats just appear. The refresh also said no new dependencies.

`animejs` has been in `package.json` since the project started (`^4.0.2`) but nothing imports it. The installed 4.0.2 predates the independent subpath imports (4.2), so importing only what is used needs a bump. Dependencies are managed with npm in this repo (not Yarn).

The Anime.js "Engine parameters" page the request pointed to documents `engine.fps`, `engine.speed`, `engine.precision`, `engine.timeUnit`, and `engine.pauseOnDocumentHidden`. Those are global tuning knobs, not effects. They are worth setting once, but the visible improvement comes from `stagger`, `createTimeline`, `createScope`, and animating plain numbers.

## Decision

Use Anime.js for the home hero's intro, the stat strip, every scroll reveal, the section headings, and the pipeline diagram. Keep `framer-motion` for interaction and mount/unmount animation (the rotating focus line, the projects filter fade, the navbar, the scroll-to-top button, the scroll progress bar), because it already does those jobs well and replacing them would be churn. The marquee (CSS) and the constellation (its own canvas loop) are unchanged on purpose.

- Bump `animejs` to `^4.5.0` (installed with npm) and import only the subpaths used (`animejs/engine`, `/scope`, `/timeline`, `/utils`, `/animation`), so the bundle does not carry the whole library.
- **Intro timeline** (`createTimeline`, scoped with `createScope` and reverted on unmount so StrictMode's double effect is safe): availability badge, `// hello, world`, then the name's four words sliding up out of a clip mask with a stagger, then role, description, buttons, and social icons with a shorter stagger, and the photo card last. This replaces the two `framer-motion` entrance wrappers in `Home.tsx`, so the hero has one choreographer, not two.
- **Stat strip:** numeric stats count up from zero once, when the strip first scrolls into view. The final value is always present in the DOM for screen readers; the animated copy is `aria-hidden`. The live clock is left alone.
- **Scroll reveals:** `Reveal` keeps its props (`delay`, `y`) and call sites but now runs on Anime.js: it fades and lifts a block the first time it scrolls into view. A new `each` prop reveals a block's children one after another; the Experience timeline uses it so the rows cascade. Transforms are cleared when a reveal finishes so sticky and fixed descendants are not trapped.
- **Section headings:** `Section` runs its own sequence when the heading scrolls into view: the `// 04 label` slides in, the title rises, the highlight underline wipes across from the left, and the description and aside follow.
- **Pipeline diagram:** when it scrolls into view, the Google Cloud boundary fades in, the ten nodes fade up in flow order, and the connectors draw themselves with `createDrawable`. The drawable helper writes `stroke-dasharray`, `stroke-dashoffset`, and `pathLength` onto the paths, which would fight the CSS dash animation, so the intro removes the animated-dash class while drawing and then restores the original attributes so the continuous flow resumes. Arrowheads are hidden until their line has drawn.
- **Engine settings** in one small module: cap `engine.fps` at 60 (the default is 240, which does needless work on high-refresh displays) and leave `pauseOnDocumentHidden` on (its default) so background tabs do nothing. `speed`, `precision`, and `timeUnit` stay at defaults.
- **Reduced motion:** with `prefers-reduced-motion`, no timeline is created and the final state is shown immediately. Stat numbers show their final values.
- Elements are put in their starting state before first paint (layout effect) so there is no flash of the finished layout, and the finished state is the default markup so the page is complete if the script fails.

## Alternatives Considered

- Replace `framer-motion` entirely. Rejected: large rewrite across `Reveal`, layout, and route transitions for no visible gain, and two libraries on the page is already the status quo.
- Leave the hero as is and only set the engine parameters. Rejected: they change performance, not the look.
- `splitText` on the name. Tried first and rejected: it wraps every word in its own span, and the surname's `background-clip: text` gradient on the parent stops painting (the word disappeared). The name is now four explicit word wrappers in `Home.tsx`, with the gradient on the moving word itself and a little bottom padding so the clip mask does not cut the descender of the y in Bryan. `splitText` and `scrambleText` remain available if a plain-text element wants them later.

## Consequences

- One dependency bump (`animejs` 4.0.2 to 4.5.0). It was unused, so nothing existing changes behavior. `yarn.lock` still pins 4.0.2 and `package-lock.json` is untracked, so which lockfile the repo keeps needs deciding separately.
- Both libraries stay in the bundle. Only the Anime.js subpaths in use are included. `framer-motion` can only be dropped if the remaining interaction animations (navbar, filter, scroll-to-top, scroll progress, rotating focus) are also moved, which is not planned.
- The intro adds a short delay (about one second end to end) before the hero is fully settled. Content is readable from the first frame of each step, and nothing waits on network.
- `Reveal` now hides its content (opacity 0) before first paint until it scrolls into view, as the previous version did. If the script fails to load, content stays visible because the hiding happens in script, not in CSS.
- A new reveal on a tall element reveals as soon as one pixel enters the viewport; very long blocks should use `each` on their children instead.
