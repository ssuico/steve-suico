import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Section from '@/components/ui/Section';
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

function countFor(id: FilterId) {
  return id === 'all' ? projects.length : projects.filter((project) => project.category === id).length;
}

const Projects = () => {
  const [filter, setFilter] = useState<FilterId>('all');
  const reduceMotion = useReducedMotion();
  const visible = filter === 'all' ? projects : projects.filter((project) => project.category === filter);
  // An odd count would leave one card alone on the last row, so the first one takes the full width.
  const featureFirst = visible.length % 2 === 1;

  return (
    <Section
      id="projects"
      index={3}
      label="projects"
      title="Selected work"
      highlight="work"
      description="Client sites, internal platforms, and side projects. Open a case study for the problem, the build, and the result."
    >
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters
          .filter((item) => countFor(item.id) > 0)
          .map((item) => {
            const selected = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={selected}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300 ${
                  selected
                    ? 'border-pink-500/60 bg-pink-500/15 text-pink-100'
                    : 'border-line text-muted hover:border-white/20 hover:text-white'
                }`}
              >
                {item.label}
                <span className="font-mono text-xs opacity-70">{countFor(item.id)}</span>
              </button>
            );
          })}
      </div>

      <motion.div
        key={filter}
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-5 md:grid-cols-2"
      >
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} featured={featureFirst && index === 0} />
        ))}
      </motion.div>
    </Section>
  );
};

export default Projects;
