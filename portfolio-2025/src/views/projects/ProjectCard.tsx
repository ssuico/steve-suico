import { Link } from 'react-router-dom';
import { FaArrowRight, FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { categoryLabels } from '@/data/projects';
import type { Project } from '@/data/projects';
import ProjectArt from './ProjectArt';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Wide layout that fills the row when the grid would leave an orphan. */
  featured?: boolean;
}

const ProjectCard = ({ project, index, featured = false }: ProjectCardProps) => {
  const tech = project.tech.slice(0, featured ? 6 : 4);
  const caseStudy = `/projects/${project.slug}`;

  return (
    <SpotlightCard className={`group flex h-full flex-col ${featured ? 'md:col-span-2 md:flex-row' : ''}`}>
      <div
        className={`relative aspect-video overflow-hidden bg-surface-2 ${featured ? 'md:aspect-auto md:w-[55%]' : ''}`}
        aria-hidden="true"
      >
        <ProjectArt project={project} variant="card" />
        {!project.art && (
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface to-transparent" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow flex items-center justify-between">
          <span>
            <span className="text-pink-400">{String(index + 1).padStart(2, '0')}</span> ·{' '}
            {categoryLabels[project.category]}
          </span>
          <span>{project.year}</span>
        </p>

        <h3 className="mt-3 text-xl font-semibold text-white">
          <Link
            to={caseStudy}
            className="after:absolute after:inset-0 after:z-0 after:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{project.tagline}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {tech.map((item) => (
            <li key={item} className="chip">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm">
          <span
            className="inline-flex items-center gap-2 font-medium text-pink-300 transition-colors group-hover:text-pink-200"
            aria-hidden="true"
          >
            View case study
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </span>
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-muted transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
            >
              <FaExternalLinkAlt className="text-xs" aria-hidden="true" />
              Live site
            </a>
          ) : project.links.isPrivate ? (
            <span className="inline-flex items-center gap-1.5 text-gray-500">
              <FaLock className="text-xs" aria-hidden="true" />
              Private
            </span>
          ) : null}
        </div>
      </div>
    </SpotlightCard>
  );
};

export default ProjectCard;
