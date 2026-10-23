import type { IconType } from 'react-icons';
import {
  SiDocker,
  SiFastapi,
  SiFigma,
  SiGooglebigquery,
  SiGooglecloud,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';

interface Tech {
  name: string;
  icon: IconType;
  /** Brand color. Brands that are black on white use white so they read on the dark background. */
  color: string;
}

const stack: Tech[] = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Python', icon: SiPython, color: '#FFD43B' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
  { name: 'BigQuery', icon: SiGooglebigquery, color: '#669DF6' },
  // No Cloud Run mark in the icon set, so it shares the Google Cloud logo.
  { name: 'Cloud Run', icon: SiGooglecloud, color: '#4285F4' },
  { name: 'Vercel', icon: SiVercel, color: '#FFFFFF' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
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
          {stack.map(({ name, icon: Icon, color }) => (
            <li key={name} className="flex items-center gap-10 pr-10 font-mono text-sm text-muted">
              <span className="flex items-center gap-2.5">
                <Icon className="text-lg" style={{ color }} aria-hidden="true" />
                {name}
              </span>
              <span className="h-1 w-1 rounded-full bg-pink-500/70" aria-hidden="true" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

export default TechMarquee;
