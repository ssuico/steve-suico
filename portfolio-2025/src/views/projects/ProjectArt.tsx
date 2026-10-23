import { categoryLabels } from '@/data/projects';
import type { Project } from '@/data/projects';
import PipelineDiagram from './PipelineDiagram';

interface ProjectArtProps {
  project: Project;
  /** `card` fills a fixed-ratio frame; `banner` sits at the top of a case study. */
  variant: 'card' | 'banner';
}

const diagrams = {
  'amazon-pipeline': PipelineDiagram,
} as const;

/** Cover for a project: screenshot if there is one, else a drawn diagram, else a gradient. */
const ProjectArt = ({ project, variant }: ProjectArtProps) => {
  if (project.cover) {
    return variant === 'card' ? (
      <img
        src={project.cover}
        alt=""
        width={1400}
        height={700}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
      />
    ) : (
      <img
        src={project.cover}
        alt={`${project.title} cover`}
        width={1400}
        height={788}
        className="max-h-[480px] w-full object-cover object-top"
      />
    );
  }

  if (project.art) {
    const Diagram = diagrams[project.art];
    return variant === 'card' ? (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-500/10 via-surface to-violet-500/10 p-3">
        <Diagram className="h-full w-full" />
      </div>
    ) : (
      <div className="overflow-x-auto bg-gradient-to-br from-pink-500/10 via-surface to-violet-500/10 p-4 sm:p-8">
        <Diagram className="mx-auto h-auto w-full min-w-[34rem] max-w-3xl" />
      </div>
    );
  }

  return variant === 'card' ? (
    <div className="flex h-full min-h-48 items-end bg-gradient-to-br from-pink-500/25 via-surface to-violet-500/20 p-5">
      <span className="eyebrow text-pink-200">{categoryLabels[project.category]}</span>
    </div>
  ) : (
    <div className="flex h-56 items-end bg-gradient-to-br from-pink-500/25 via-surface to-violet-500/20 p-8">
      <p className="eyebrow text-pink-200">{categoryLabels[project.category]} · Private engagement</p>
    </div>
  );
};

export default ProjectArt;
