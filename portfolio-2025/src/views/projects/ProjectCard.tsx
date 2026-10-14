import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import { categoryLabels } from '@/data/projects';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const tech = project.tech.slice(0, 4);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-700/50 bg-gray-800/60 shadow-lg transition-colors hover:border-pink-500/30">
      <Link to={`/projects/${project.slug}`} aria-label={project.title} className="relative block aspect-video bg-gray-900">
        {project.cover ? (
          <img
            src={project.cover}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-end bg-gradient-to-br from-pink-500/25 via-gray-900 to-purple-500/20 p-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-pink-200" aria-hidden="true">
              {categoryLabels[project.category]}
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-xs text-pink-200" aria-hidden="true">
          {categoryLabels[project.category]}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold text-white">
          <Link to={`/projects/${project.slug}`} className="hover:text-pink-300 transition-colors">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-300 line-clamp-3">{project.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {tech.map((item) => (
            <li key={item} className="rounded-full bg-gray-700/50 px-2.5 py-1 text-xs text-gray-300">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-4 pt-5 text-sm">
          <Link
            to={`/projects/${project.slug}`}
            className="font-medium text-pink-400 hover:text-pink-300 transition-colors"
          >
            View case study
          </Link>
          {project.links.live ? (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
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
    </article>
  );
};

export default ProjectCard;
