import { useState } from 'react';
import { motion } from 'framer-motion';
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

const Projects = () => {
  const [filter, setFilter] = useState<FilterId>('all');
  const visible = filter === 'all' ? projects : projects.filter((project) => project.category === filter);

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
                onClick={() => setFilter(item.id)}
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
          <div className="grid gap-6 md:grid-cols-2">
            {visible.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                viewport={{ once: true, margin: '-40px' }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
