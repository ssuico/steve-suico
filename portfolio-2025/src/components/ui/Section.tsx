import { useLayoutEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { createTimeline } from 'animejs/timeline';
import { set } from 'animejs/utils';
import { prefersReducedMotion, useOnceInView } from '@/lib/motion';

interface SectionProps {
  id: string;
  index: number;
  label: string;
  title: string;
  highlight?: string;
  description?: ReactNode;
  /** split: sticky header on the left, content on the right. stacked: header above. */
  layout?: 'split' | 'stacked';
  aside?: ReactNode;
  children: ReactNode;
}

function Title({ title, highlight }: { title: string; highlight?: string }) {
  const at = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || at === -1) return <>{title}</>;

  return (
    <>
      {title.slice(0, at)}
      <span className="relative inline-block">
        <span className="relative z-10">{highlight}</span>
        <span
          aria-hidden="true"
          data-sec="underline"
          className="absolute inset-x-0 bottom-[0.06em] h-[0.2em] origin-left rounded-sm bg-gradient-to-r from-pink-500 to-violet-500"
        />
      </span>
      {title.slice(at + highlight.length)}
    </>
  );
}

/**
 * Section heading block. When it scrolls into view the label slides in, the
 * title rises, the highlight underline wipes across, then the description and
 * any aside follow. Hidden before first paint; reduced motion skips it.
 */
const SectionHeader = ({ className, children }: { className: string; children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const parts = (root: Element, name: string) => Array.from(root.querySelectorAll<HTMLElement>(`[data-sec="${name}"]`));

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    set([...parts(root, 'eyebrow'), ...parts(root, 'title'), ...parts(root, 'rest')], { opacity: 0 });
    set(parts(root, 'underline'), { scaleX: 0 });
  }, []);

  useOnceInView(ref, (root) => {
    const timeline = createTimeline({ defaults: { ease: 'outExpo', duration: 900 } })
      .add(parts(root, 'eyebrow'), { opacity: 1, x: [-14, 0], duration: 700 }, 0)
      .add(parts(root, 'title'), { opacity: 1, y: [28, 0] }, 120)
      .add(parts(root, 'underline'), { scaleX: [0, 1], duration: 800, ease: 'inOutExpo' }, 520)
      .add(parts(root, 'rest'), { opacity: 1, y: [16, 0] }, 300);
    return () => timeline.revert();
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

const Section = ({
  id,
  index,
  label,
  title,
  highlight,
  description,
  layout = 'stacked',
  aside,
  children,
}: SectionProps) => {
  const split = layout === 'split';

  const header = (
    <SectionHeader className={split ? 'lg:sticky lg:top-28 lg:self-start' : 'mb-12 max-w-2xl'}>
      <p data-sec="eyebrow" className="eyebrow mb-4 flex items-center gap-2">
        <span className="text-pink-400">{`// ${String(index).padStart(2, '0')}`}</span>
        <span>{label}</span>
      </p>
      <h2 data-sec="title" className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
        <Title title={title} highlight={highlight} />
      </h2>
      {description && (
        <p data-sec="rest" className="mt-5 leading-relaxed text-muted">
          {description}
        </p>
      )}
      {aside && (
        <div data-sec="rest" className="mt-6">
          {aside}
        </div>
      )}
    </SectionHeader>
  );

  return (
    <section id={id} className="relative scroll-mt-20 border-t border-line py-24 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        {split ? (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-20">
            {header}
            <div>{children}</div>
          </div>
        ) : (
          <>
            {header}
            {children}
          </>
        )}
      </div>
    </section>
  );
};

export default Section;
