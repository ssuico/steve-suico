import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { site } from '@/data/site';

type ContributionLevel =
  | 'NONE'
  | 'FIRST_QUARTILE'
  | 'SECOND_QUARTILE'
  | 'THIRD_QUARTILE'
  | 'FOURTH_QUARTILE';

type ContributionDay = {
  date: string;
  weekday: number;
  count: number;
  level: ContributionLevel;
};

type ContributionCalendar = {
  total: number;
  months: { name: string; year: number; totalWeeks: number }[];
  weeks: { firstDay: string; days: ContributionDay[] }[];
};

const levelClass: Record<ContributionLevel, string> = {
  NONE: 'bg-gray-800',
  FIRST_QUARTILE: 'bg-pink-900',
  SECOND_QUARTILE: 'bg-pink-700',
  THIRD_QUARTILE: 'bg-pink-500',
  FOURTH_QUARTILE: 'bg-pink-300',
};

const legend: ContributionLevel[] = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
];

const weekdayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function localISODate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDayLabel(date: string, count: number) {
  const [year, month, day] = date.split('-').map(Number);
  const formatted = new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (count === 0) return `No contributions on ${formatted}`;
  const noun = count === 1 ? 'contribution' : 'contributions';
  return `${count.toLocaleString('en-US')} ${noun} on ${formatted}`;
}

function isCalendar(value: unknown): value is ContributionCalendar {
  if (typeof value !== 'object' || value === null) return false;
  const calendar = value as ContributionCalendar;
  return typeof calendar.total === 'number' && Array.isArray(calendar.weeks) && Array.isArray(calendar.months);
}

const Contributions = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState<{ label: string; top: number; left: number } | null>(null);
  const today = localISODate();

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/contributions', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('unavailable');
        return response.json() as Promise<unknown>;
      })
      .then((payload) => {
        if (!isCalendar(payload)) throw new Error('unavailable');
        setCalendar(payload);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setFailed(true);
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!active) return;
    const hide = () => setActive(null);
    window.addEventListener('scroll', hide, { passive: true });
    return () => window.removeEventListener('scroll', hide);
  }, [active]);

  const showTip = (cell: HTMLButtonElement, day: ContributionDay) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cellBox = cell.getBoundingClientRect();
    const visible = scroller.getBoundingClientRect();
    if (cellBox.right < visible.left || cellBox.left > visible.right) return;

    const gutter = 120;
    const center = cellBox.left + cellBox.width / 2;
    const left = Math.min(Math.max(center, gutter), window.innerWidth - gutter);
    setActive({
      label: formatDayLabel(day.date, day.count),
      top: cellBox.top,
      left,
    });
  };

  return (
    <section id="contributions" className="scroll-mt-20 w-full bg-black py-20 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold">Contributions</h2>
          <p className="mx-auto max-w-2xl text-gray-300">
            {calendar
              ? `${calendar.total.toLocaleString('en-US')} contributions in the last year.`
              : 'A year of commits, pull requests, issues, and reviews.'}
          </p>
        </motion.div>

        <div className="relative mx-auto w-fit max-w-full rounded-2xl border border-gray-800 bg-gray-950 px-4 pb-4 pt-6">
          {active && (
            <div
              role="tooltip"
              className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[calc(100%+8px)] whitespace-nowrap rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1 text-xs text-white shadow-lg"
              style={{ top: active.top, left: active.left }}
            >
              {active.label}
            </div>
          )}

          {failed ? (
            <p className="py-16 text-center text-gray-300">
              The contribution graph is unavailable right now.{' '}
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">
                Open the GitHub profile
              </a>
              .
            </p>
          ) : !calendar ? (
            <div className="h-40 animate-pulse rounded-xl bg-gray-900" aria-hidden="true" />
          ) : (
            <>
              <div ref={scrollerRef} className="overflow-x-auto pb-2" onScroll={() => setActive(null)}>
                <div className="inline-grid w-max gap-y-2 pr-3">
                  <div className="grid grid-cols-[2rem_auto] items-end">
                    <div />
                    <div className="flex text-[10px] leading-none text-gray-500">
                      {calendar.months.map((month, index) => {
                        const isLast = index === calendar.months.length - 1;
                        const width = month.totalWeeks * 14 - (isLast ? 3 : 0);
                        return (
                          <div key={`${month.year}-${month.name}-${month.totalWeeks}-${index}`} style={{ width }} className="shrink-0">
                            {month.totalWeeks >= 2 ? month.name : ''}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-[2rem_auto]">
                    <div className="grid grid-rows-7 gap-[3px] pr-2 text-[9px] leading-[11px] text-gray-500">
                      {weekdayLabels.map((label, index) => (
                        <span key={`${label}-${index}`} className="h-[11px]">
                          {label}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-[3px]" role="grid" aria-label="Daily contributions for the last year">
                      {calendar.weeks.map((week) => {
                        const byWeekday = new Map(week.days.map((day) => [day.weekday, day]));
                        return (
                          <div key={week.firstDay} className="grid grid-rows-7 gap-[3px]" role="row">
                            {Array.from({ length: 7 }, (_, weekday) => {
                              const day = byWeekday.get(weekday);
                              if (!day) return <span key={weekday} className="size-[11px]" />;
                              const isToday = day.date === today;
                              return (
                                <button
                                  key={day.date}
                                  type="button"
                                  role="gridcell"
                                  aria-label={formatDayLabel(day.date, day.count)}
                                  aria-current={isToday ? 'date' : undefined}
                                  className={`size-[11px] rounded-[2px] outline-offset-2 hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-300 ${levelClass[day.level]} ${isToday ? 'outline outline-1 outline-white' : ''}`}
                                  onMouseEnter={(event) => showTip(event.currentTarget, day)}
                                  onMouseLeave={() => setActive(null)}
                                  onFocus={(event) => showTip(event.currentTarget, day)}
                                  onBlur={() => setActive(null)}
                                />
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300">
                  View on GitHub
                </a>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  {legend.map((level) => (
                    <span key={level} className={`size-[11px] rounded-[2px] ${levelClass[level]}`} />
                  ))}
                  <span>More</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contributions;
