import type { ReactNode } from 'react';
import Reveal from './Reveal';

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
          className="absolute inset-x-0 bottom-[0.06em] h-[0.2em] rounded-sm bg-gradient-to-r from-pink-500 to-violet-500"
        />
      </span>
      {title.slice(at + highlight.length)}
    </>
  );
}

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
    <Reveal className={split ? 'lg:sticky lg:top-28 lg:self-start' : 'mb-12 max-w-2xl'}>
      <p className="eyebrow mb-4 flex items-center gap-2">
        <span className="text-pink-400">{`// ${String(index).padStart(2, '0')}`}</span>
        <span>{label}</span>
      </p>
      <h2 className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl">
        <Title title={title} highlight={highlight} />
      </h2>
      {description && <p className="mt-5 leading-relaxed text-muted">{description}</p>}
      {aside && <div className="mt-6">{aside}</div>}
    </Reveal>
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
