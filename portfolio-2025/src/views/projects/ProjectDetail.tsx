import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaCheck, FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import Reveal from '@/components/ui/Reveal';
import { categoryLabels, getAdjacentProjects, getProject } from '@/data/projects';
import { site } from '@/data/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import ProjectArt from './ProjectArt';

const Heading = ({ children }: { children: string }) => (
  <h2 className="eyebrow mb-3 flex items-center gap-2 text-pink-400">
    <span aria-hidden="true">//</span>
    {children}
  </h2>
);

const ProjectDetail = () => {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const { previous, next } = getAdjacentProjects(slug);

  useDocumentTitle(
    project ? `${project.title} | ${site.name}` : `Project not found | ${site.name}`,
  );

  if (!project) {
    return (
      <main className="min-h-screen px-5 pt-32 text-center text-white">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <p className="mt-3 text-muted">That case study is not on this site.</p>
        <Link to="/projects" className="btn btn-outline mt-8">
          Back to projects
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-32">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
        >
          <FaArrowLeft aria-hidden="true" className="text-xs" />
          back to projects
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">
            <span className="text-pink-400">{categoryLabels[project.category]}</span> · {project.year}
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.05] sm:text-6xl">{project.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{project.tagline}</p>
        </header>

        <Reveal className="card mt-10 overflow-hidden">
          <ProjectArt project={project} variant="banner" />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
          <article className="space-y-12">
            <section>
              <Heading>Overview</Heading>
              <p className="text-lg leading-relaxed text-gray-300">{project.summary}</p>
            </section>

            <div className="grid gap-8 sm:grid-cols-2">
              <section className="card p-6">
                <Heading>Problem</Heading>
                <p className="leading-relaxed text-gray-300">{project.problem}</p>
              </section>
              <section className="card p-6">
                <Heading>Solution</Heading>
                <p className="leading-relaxed text-gray-300">{project.solution}</p>
              </section>
            </div>

            <section>
              <Heading>Key features</Heading>
              <ul className="space-y-3 text-gray-300">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <FaCheck className="mt-1.5 shrink-0 text-xs text-pink-400" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <Heading>Outcomes</Heading>
              <ul className="space-y-3 text-gray-300">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3">
                    <span className="mt-3 h-px w-3 shrink-0 bg-pink-400" aria-hidden="true" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.gallery.length > 0 && (
              <section>
                <Heading>Gallery</Heading>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt=""
                      loading="lazy"
                      className="w-full rounded-xl border border-line object-cover"
                    />
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="card h-fit space-y-6 p-6 lg:sticky lg:top-28">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="eyebrow">Role</dt>
                <dd className="mt-1 text-white">{project.role}</dd>
              </div>
              <div>
                <dt className="eyebrow">Year</dt>
                <dd className="mt-1 text-white">{project.year}</dd>
              </div>
              <div>
                <dt className="eyebrow">Category</dt>
                <dd className="mt-1 text-white">{categoryLabels[project.category]}</dd>
              </div>
            </dl>

            <div>
              <h2 className="eyebrow">Tech</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <FaExternalLinkAlt aria-hidden="true" className="text-xs" />
                  Live site
                </a>
              )}
              {project.links.repo && (
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  View code
                </a>
              )}
              {project.links.isPrivate && (
                <p className="inline-flex items-center gap-2 text-sm text-muted">
                  <FaLock className="text-pink-400" aria-hidden="true" />
                  Private codebase
                </p>
              )}
            </div>
          </aside>
        </div>

        <nav className="mt-20 grid gap-4 border-t border-line pt-8 sm:grid-cols-2" aria-label="More projects">
          {previous ? (
            <Link to={`/projects/${previous.slug}`} className="card group p-5 transition-colors hover:border-pink-500/40">
              <span className="eyebrow inline-flex items-center gap-2">
                <FaArrowLeft aria-hidden="true" />
                Previous
              </span>
              <span className="mt-2 block font-display text-lg font-semibold transition-colors group-hover:text-pink-300">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/projects/${next.slug}`}
              className="card group p-5 text-right transition-colors hover:border-pink-500/40 sm:col-start-2"
            >
              <span className="eyebrow inline-flex items-center gap-2">
                Next
                <FaArrowRight aria-hidden="true" />
              </span>
              <span className="mt-2 block font-display text-lg font-semibold transition-colors group-hover:text-pink-300">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
};

export default ProjectDetail;
