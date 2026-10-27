import { useLayoutEffect, useRef, useState } from 'react';

interface TechChipsProps {
  items: string[];
  /** Rows of chips to show before the rest collapse into "+n more". */
  maxRows?: number;
  className?: string;
}

/** How many rows a left-to-right wrapped layout of these widths would take. */
const countRows = (widths: number[], available: number, gap: number) => {
  let rows = 1;
  let used = 0;
  for (const width of widths) {
    if (used === 0) {
      used = width;
    } else if (used + gap + width <= available) {
      used += gap + width;
    } else {
      rows += 1;
      used = width;
    }
  }
  return rows;
};

/**
 * Tech tags that show every item when they fit, otherwise as many as fit in
 * `maxRows` followed by a "+n more" chip. Widths are measured on an invisible
 * copy of the list, so the result matches what the browser would lay out.
 */
const TechChips = ({ items, maxRows = 2, className = '' }: TechChipsProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLUListElement>(null);
  const [shown, setShown] = useState(items.length);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const probe = probeRef.current;
    if (!wrap || !probe) return undefined;

    const measure = () => {
      const available = wrap.clientWidth;
      if (available === 0) return;
      const chips = Array.from(probe.children) as HTMLElement[];
      const moreWidth = chips[chips.length - 1].offsetWidth;
      const widths = chips.slice(0, -1).map((chip) => chip.offsetWidth);
      const gap = parseFloat(getComputedStyle(probe).columnGap) || 0;

      let fit = widths.length;
      if (countRows(widths, available, gap) > maxRows) {
        fit = widths.length - 1;
        while (fit > 0 && countRows([...widths.slice(0, fit), moreWidth], available, gap) > maxRows) {
          fit -= 1;
        }
      }
      setShown(fit);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    void document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [items, maxRows]);

  const hidden = items.slice(shown);

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <ul className="flex flex-wrap gap-2">
        {items.slice(0, shown).map((item) => (
          <li key={item} className="chip whitespace-nowrap">
            {item}
          </li>
        ))}
        {hidden.length > 0 && (
          <li className="chip chip-neutral whitespace-nowrap" title={hidden.join(', ')}>
            +{hidden.length} more
            <span className="sr-only">: {hidden.join(', ')}</span>
          </li>
        )}
      </ul>

      {/* Invisible copy used only for measuring; the last item is the widest possible "+n more". */}
      <ul
        ref={probeRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 flex w-full flex-wrap gap-2"
      >
        {items.map((item) => (
          <li key={item} className="chip whitespace-nowrap">
            {item}
          </li>
        ))}
        <li className="chip chip-neutral whitespace-nowrap">+{items.length} more</li>
      </ul>
    </div>
  );
};

export default TechChips;
