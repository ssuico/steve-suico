import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { categoryLabels, projects } from '@/data/projects';
import type { ProjectCategory } from '@/data/projects';
import ProjectCard from './ProjectCard';

type FilterId = 'all' | ProjectCategory;

const filters: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'client', label: categoryLabels.client },
  { id: 'personal', label: categoryLabels.personal },
  { id: 'work', label: categoryLabels.work },
];

const desktopPageQuery = '(min-width: 768px)';
const cycleMs = 4000;

const slide = {
  enter: (direction: number) => ({ x: direction > 0 ? 72 : -72, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -72 : 72, opacity: 0 }),
};

function usePageSize() {
  const [pageSize, setPageSize] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(desktopPageQuery).matches ? 2 : 1,
  );

  useEffect(() => {
    const media = window.matchMedia(desktopPageQuery);
    const update = () => setPageSize(media.matches ? 2 : 1);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return pageSize;
}

function staysInside(current: HTMLElement, next: EventTarget | null) {
  return next instanceof Node && current.contains(next);
}

const Projects = () => {
  const [filter, setFilter] = useState<FilterId>('all');
  const [anchor, setAnchor] = useState(0);
  const [direction, setDirection] = useState(1);
  const [cardHold, setCardHold] = useState(0);
  const [hidden, setHidden] = useState(false);
  const reduceMotion = useReducedMotion();
  const pageSize = usePageSize();
  const visible = filter === 'all' ? projects : projects.filter((project) => project.category === filter);
  const safeAnchor = Math.min(anchor, Math.max(visible.length - 1, 0));
  const page = Math.floor(safeAnchor / pageSize);
  const start = page * pageSize;
  const pageItems = visible.slice(start, start + pageSize);
  const paged = visible.length > pageSize;
  const holding = cardHold > 0 || hidden;

  const holdCard = (event: { currentTarget: HTMLElement; relatedTarget: EventTarget | null }, delta: 1 | -1) => {
    if (staysInside(event.currentTarget, event.relatedTarget)) return;
    setCardHold((count) => Math.max(0, count + delta));
  };

  const go = (nextDirection: 1 | -1) => {
    setDirection(nextDirection);
    setAnchor((current) => {
      const length = visible.length;
      if (length === 0) return 0;
      const safe = Math.min(Math.max(current, 0), length - 1);
      const currentPage = Math.floor(safe / pageSize);
      const count = Math.ceil(length / pageSize);
      const nextPage = (currentPage + nextDirection + count) % count;
      return nextPage * pageSize;
    });
  };

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (!paged || !reduceMotion || holding) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setAnchor((current) => {
        const length = visible.length;
        if (length === 0) return 0;
        const safe = Math.min(Math.max(current, 0), length - 1);
        const currentPage = Math.floor(safe / pageSize);
        const count = Math.ceil(length / pageSize);
        return ((currentPage + 1) % count) * pageSize;
      });
    }, cycleMs);
    return () => window.clearInterval(id);
  }, [paged, reduceMotion, holding, pageSize, visible.length]);

  const selectFilter = (next: FilterId) => {
    setDirection(1);
    setFilter(next);
    setAnchor(0);
  };

  const showProject = (index: number) => {
    const targetPage = Math.floor(index / pageSize);
    setDirection(targetPage >= page ? 1 : -1);
    setAnchor(index);
  };

  return (
    <section id="projects" className="scroll-mt-20 w-full bg-gradient-to-b from-gray-900 to-black py-20 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold mb-4">Selected Work</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Client sites, internal platforms, and the systems behind them. Open a case study for the problem, the build, and the result.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
          {filters.map((item) => {
            const selected = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectFilter(item.id)}
                aria-pressed={selected}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  selected
                    ? 'bg-pink-500 text-white'
                    : 'border border-gray-700 text-gray-300 hover:border-pink-500/50 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="text-center text-gray-400">No projects in this category yet.</p>
        ) : (
          <>
            <div className="relative grid overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={`${filter}-${page}`}
                  custom={direction}
                  variants={slide}
                  initial={reduceMotion ? false : 'enter'}
                  animate="center"
                  exit="exit"
                  transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="col-start-1 row-start-1 grid w-full gap-6 md:grid-cols-2"
                >
                  {pageItems.map((project) => (
                    <div
                      key={project.slug}
                      className="h-full"
                      onMouseEnter={(event) => holdCard(event, 1)}
                      onMouseLeave={(event) => holdCard(event, -1)}
                      onFocusCapture={(event) => holdCard(event, 1)}
                      onBlurCapture={(event) => holdCard(event, -1)}
                    >
                      <ProjectCard project={project} />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {paged && (
              <>
                <div className="mt-6 h-px overflow-hidden rounded-full bg-gray-800" aria-hidden="true">
                  <div
                    key={`${filter}-${page}`}
                    className="project-cycle h-full w-full bg-pink-500"
                    data-paused={holding ? 'true' : 'false'}
                    onAnimationEnd={(event) => {
                      if (event.target !== event.currentTarget || holding) return;
                      go(1);
                    }}
                  />
                </div>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous projects"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-4 py-1.5 text-sm text-gray-200 transition-colors hover:border-pink-500/50 hover:text-white"
                  >
                    <FaChevronLeft className="text-xs" aria-hidden="true" />
                    Previous
                  </button>
                  <p className="min-w-24 text-center text-sm text-gray-400">
                    {start + 1}–{start + pageItems.length} of {visible.length}
                  </p>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next projects"
                    className="inline-flex items-center gap-2 rounded-full border border-gray-700 px-4 py-1.5 text-sm text-gray-200 transition-colors hover:border-pink-500/50 hover:text-white"
                  >
                    Next
                    <FaChevronRight className="text-xs" aria-hidden="true" />
                  </button>
                </div>

                <nav aria-label="All projects" className="mt-5">
                  <ul className="flex gap-2 overflow-x-auto pb-1">
                    {visible.map((project, index) => {
                      const onPage = Math.floor(index / pageSize) === page;
                      return (
                        <li key={project.slug} className="shrink-0">
                          <button
                            type="button"
                            onClick={() => showProject(index)}
                            aria-current={onPage ? 'true' : undefined}
                            className={`rounded-full px-3 py-1 text-xs transition-colors ${
                              onPage
                                ? 'bg-pink-500/20 text-pink-200'
                                : 'text-gray-400 hover:text-white'
                            }`}
                          >
                            {project.title}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
