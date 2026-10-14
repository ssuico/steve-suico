import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import { categoryLabels, getAdjacentProjects, getProject } from '@/data/projects';
import { site } from '@/data/site';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const ProjectDetail = () => {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const { previous, next } = getAdjacentProjects(slug);

  useDocumentTitle(
    project ? `${project.title} | ${site.name}` : `Project not found | ${site.name}`,
  );

  if (!project) {
    return (
      <main className="min-h-screen bg-black px-4 pt-28 text-center text-white">
        <h1 className="text-3xl font-bold">Project not found</h1>
        <p className="mt-3 text-gray-400">That case study is not on this site.</p>
        <Link to="/#projects" className="mt-8 inline-block text-pink-400 hover:text-pink-300">
          Back to projects
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-28">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-pink-300 transition-colors"
        >
          <FaArrowLeft aria-hidden="true" />
          Back to projects
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900">
          {project.cover ? (
            <img
              src={project.cover}
              alt={`${project.title} cover`}
              width={1400}
              height={788}
              className="max-h-[420px] w-full object-cover"
            />
          ) : (
            <div className="flex h-56 items-end bg-gradient-to-br from-pink-500/25 via-gray-900 to-purple-500/20 p-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-pink-200">
                {categoryLabels[project.category]} · Private engagement
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="space-y-10">
            <header>
              <p className="text-sm font-medium uppercase tracking-widest text-pink-400">
                {categoryLabels[project.category]}
              </p>
              <h1 className="mt-2 text-4xl font-bold">{project.title}</h1>
              <p className="mt-4 text-lg text-gray-300">{project.tagline}</p>
            </header>

            <section>
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-3 leading-relaxed text-gray-300">{project.summary}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Problem</h2>
              <p className="mt-3 leading-relaxed text-gray-300">{project.problem}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Solution</h2>
              <p className="mt-3 leading-relaxed text-gray-300">{project.solution}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Key features</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-300">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold">Outcomes</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-300">
                {project.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </section>

            {project.gallery.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold">Gallery</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt=""
                      className="w-full rounded-xl border border-gray-700/50 object-cover"
                    />
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="h-fit space-y-5 rounded-xl border border-gray-700/50 bg-gray-800/60 p-6 lg:sticky lg:top-24">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-gray-500">Role</dt>
                <dd className="mt-1 text-white">{project.role}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Year</dt>
                <dd className="mt-1 text-white">{project.year}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Category</dt>
                <dd className="mt-1 text-white">{categoryLabels[project.category]}</dd>
              </div>
            </dl>

            <div>
              <h2 className="text-sm text-gray-500">Tech</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <li key={item} className="rounded-full border border-gray-600/40 bg-gray-700/40 px-2.5 py-1 text-xs text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium hover:bg-pink-600 transition-colors"
                >
                  <FaExternalLinkAlt aria-hidden="true" />
                  Live site
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-600 px-4 py-2 text-sm hover:border-pink-500 transition-colors"
                >
                  View code
                </a>
              )}
              {project.links.isPrivate && (
                <p className="inline-flex items-center gap-2 text-sm text-gray-400">
                  <FaLock className="text-pink-400" aria-hidden="true" />
                  Private codebase
                </p>
              )}
            </div>
          </aside>
        </div>

        <nav className="mt-16 grid gap-4 border-t border-gray-800 pt-8 sm:grid-cols-2" aria-label="More projects">
          {previous ? (
            <Link to={`/projects/${previous.slug}`} className="group rounded-xl border border-gray-700/50 p-4 hover:border-pink-500/40 transition-colors">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
                <FaArrowLeft aria-hidden="true" />
                Previous
              </span>
              <span className="mt-2 block font-medium group-hover:text-pink-300 transition-colors">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/projects/${next.slug}`}
              className="group rounded-xl border border-gray-700/50 p-4 text-right hover:border-pink-500/40 transition-colors sm:col-start-2"
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500">
                Next
                <FaArrowRight aria-hidden="true" />
              </span>
              <span className="mt-2 block font-medium group-hover:text-pink-300 transition-colors">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
};

export default ProjectDetail;
