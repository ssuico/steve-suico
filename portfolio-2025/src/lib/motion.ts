import { useEffect } from 'react';
import type { RefObject } from 'react';
import { engine } from 'animejs/engine';

/**
 * Global Anime.js engine settings. Importing this module applies them once.
 *
 * - fps: the engine default is 240, which does needless work on high-refresh
 *   displays. 60 looks identical for UI motion and costs less CPU and battery.
 * - pauseOnDocumentHidden: already the default; set explicitly so background
 *   tabs do no animation work and the intent is visible.
 * speed, precision, and timeUnit stay at their defaults.
 */
engine.fps = 60;
engine.pauseOnDocumentHidden = true;

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface InViewOptions {
  /** Shrinks the viewport so the callback fires a little after the element appears. */
  margin?: string;
  threshold?: number;
}

/**
 * Calls `onEnter` once, the first time `ref` scrolls into view. Returns whatever
 * cleanup `onEnter` returns when the component unmounts. Skipped entirely under
 * reduced motion, so callers only set up animation states when they will play.
 */
export function useOnceInView(
  ref: RefObject<Element>,
  onEnter: (el: Element) => void | (() => void),
  { margin = '-60px', threshold = 0 }: InViewOptions = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let cleanup: void | (() => void);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        cleanup = onEnter(el);
      },
      { rootMargin: margin, threshold },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (cleanup) cleanup();
    };
    // onEnter is intentionally read once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, margin, threshold]);
}
