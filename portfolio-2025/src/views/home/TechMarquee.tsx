const stack = [
  'React',
  'TypeScript',
  'Next.js',
  'Tailwind CSS',
  'Node.js',
  'Python',
  'FastAPI',
  'Docker',
  'Google Cloud',
  'BigQuery',
  'Cloud Run',
  'Vercel',
  'Figma',
];

const copies = [0, 1, 2, 3];

const TechMarquee = () => (
  <div
    className="overflow-hidden border-b border-line py-5 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
    role="group"
    aria-label="Technologies I work with"
  >
    <div className="motion-marquee flex w-max animate-marquee hover:[animation-play-state:paused]">
      {copies.map((copy) => (
        <ul key={copy} className="flex shrink-0" aria-hidden={copy > 0 ? 'true' : undefined}>
          {stack.map((item) => (
            <li key={item} className="flex items-center gap-10 pr-10 font-mono text-sm text-muted">
              {item}
              <span className="h-1 w-1 rounded-full bg-pink-500/70" aria-hidden="true" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

export default TechMarquee;
