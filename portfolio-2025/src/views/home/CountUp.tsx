import { useEffect, useRef } from 'react';
import { animate } from 'animejs/animation';
import { prefersReducedMotion } from '@/lib/motion';

interface CountUpProps {
  to: number;
  suffix?: string;
  /** Wait this long after the strip is visible, so the hero intro leads. */
  delay?: number;
}

/**
 * Counts from 0 to `to` once, when first scrolled into view. The final value
 * is always in the DOM for screen readers; the animated copy is aria-hidden
 * and filled in by the effect (it is left empty in the markup so React and
 * Anime.js never write to the same text node).
 */
const CountUp = ({ to, suffix = '', delay = 700 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const final = `${to}${suffix}`;
    el.textContent = final;
    if (prefersReducedMotion()) return;

    let anim: ReturnType<typeof animate> | undefined;
    const counter = { value: 0 };

    el.textContent = `0${suffix}`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        anim = animate(counter, {
          value: to,
          duration: 1400,
          delay,
          ease: 'outExpo',
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${suffix}`;
          },
          onComplete: () => {
            el.textContent = final;
          },
        });
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      anim?.revert();
      el.textContent = final;
    };
  }, [to, suffix, delay]);

  return (
    <>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
      <span ref={ref} aria-hidden="true" />
    </>
  );
};

export default CountUp;
