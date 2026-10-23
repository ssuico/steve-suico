import type { ReactNode } from 'react';

interface TimelineRowProps {
  period: string;
  children: ReactNode;
  current?: boolean;
}

/** One dated row: date on the left, content on the right. Used by Experience and Education. */
const TimelineRow = ({ period, children, current = false }: TimelineRowProps) => (
  <li className="group relative grid gap-3 rounded-2xl p-5 sm:grid-cols-[176px_minmax(0,1fr)] sm:gap-6 -mx-5 hover:bg-white/[0.03]">
    <p className="eyebrow flex items-start gap-2 pt-1.5 sm:whitespace-nowrap sm:pt-1">
      {current && <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-400" aria-hidden="true" />}
      {period}
    </p>
    <div>{children}</div>
  </li>
);

export default TimelineRow;
