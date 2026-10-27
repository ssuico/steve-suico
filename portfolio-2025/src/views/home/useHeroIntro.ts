import { useLayoutEffect } from 'react';
import type { RefObject } from 'react';
import { createScope } from 'animejs/scope';
import { createTimeline } from 'animejs/timeline';
import { set, stagger } from 'animejs/utils';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * Hero entrance. One timeline replaces separate fades per block:
 * badge and eyebrow, the name sliding up word by word out of a clip mask,
 * then the supporting copy, buttons and socials in a quick cascade, with the
 * photo card settling in underneath.
 *
 * Targets are marked with `data-hero` inside `rootRef`:
 *   badge | eyebrow | word | item | social | photo
 *
 * Start states are applied in a layout effect so the finished hero never
 * flashes before the animation begins. Reduced motion skips all of it, and
 * the markup is already in its finished state if this never runs.
 */
export function useHeroIntro(rootRef: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;

    const scope = createScope({ root }).add(() => {
      set('[data-hero="badge"], [data-hero="eyebrow"], [data-hero="item"], [data-hero="social"], [data-hero="photo"]', {
        opacity: 0,
      });
      set('[data-hero="word"]', { y: '115%' });

      createTimeline({ defaults: { ease: 'outExpo', duration: 900 } })
        .add('[data-hero="badge"]', { opacity: 1, y: [14, 0], duration: 700 }, 0)
        .add('[data-hero="eyebrow"]', { opacity: 1, x: [-10, 0], duration: 700 }, 120)
        .add('[data-hero="word"]', { y: '0%', duration: 1000 }, stagger(110, { start: 220 }))
        .add('[data-hero="item"]', { opacity: 1, y: [18, 0] }, stagger(90, { start: 640 }))
        .add('[data-hero="social"]', { opacity: 1, y: [10, 0], duration: 600 }, stagger(60, { start: 1000 }))
        .add('[data-hero="photo"]', { opacity: 1, scale: [0.95, 1], duration: 1300 }, 280);
    });

    return () => scope.revert();
  }, [rootRef]);
}
