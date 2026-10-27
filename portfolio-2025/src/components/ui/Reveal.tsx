import { useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { animate } from 'animejs/animation';
import { set, stagger } from 'animejs/utils';
import { prefersReducedMotion, useOnceInView } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait once the block is in view. */
  delay?: number;
  y?: number;
  /**
   * CSS selector (relative to this block, `:scope` allowed) for children to
   * reveal one after another instead of fading the whole block at once.
   */
  each?: string;
}

/** Fades and lifts a block (or its children, one by one) the first time it scrolls into view. */
const Reveal = ({ children, className, delay = 0, y = 18, each }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const targetsOf = (root: Element): HTMLElement[] =>
    each ? Array.from(root.querySelectorAll<HTMLElement>(each)) : [root as HTMLElement];

  // Hide before first paint so the finished block never flashes before it animates.
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const targets = targetsOf(root);
    set(targets, { opacity: 0 });
    return () => {
      for (const el of targets) {
        el.style.opacity = '';
        el.style.transform = '';
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [each]);

  useOnceInView(ref, (root) => {
    const targets = targetsOf(root);
    const anim = animate(targets, {
      opacity: [0, 1],
      y: [y, 0],
      duration: 800,
      delay: each ? stagger(90, { start: delay * 1000 }) : delay * 1000,
      ease: 'outExpo',
      onComplete: () => {
        // Leave no transform behind: it would trap sticky and fixed descendants.
        for (const el of targets) el.style.transform = '';
      },
    });
    return () => anim.revert();
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Reveal;
