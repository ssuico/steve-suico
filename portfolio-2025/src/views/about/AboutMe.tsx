import { FaFilm, FaGamepad, FaHeadphones } from 'react-icons/fa';
import { site } from '@/data/site';
import me from '../../assets/me.webp';

const interests = [
  { name: 'Gaming', icon: FaGamepad },
  { name: 'Music', icon: FaHeadphones },
  { name: 'Movies', icon: FaFilm },
];

const facts = [
  { label: 'Based in', value: site.location },
  { label: 'Currently', value: 'Channel Precision Inc' },
  { label: 'Focus', value: 'Full-stack, frontend-led' },
  { label: 'Studied', value: 'BS Information Technology' },
];

const AboutMe = () => (
  <div className="space-y-10">
    <div className="space-y-5 text-lg leading-relaxed text-gray-300">
      <p>
        I build and ship full-stack web applications, from the interface through deployment. Most of my work is{' '}
        <strong className="font-medium text-white">user-facing React</strong>, backed by APIs, data pipelines, and cloud
        infrastructure on <strong className="font-medium text-white">Google Cloud</strong>.
      </p>
      <p>
        I take a feature from a rough requirement to something a client can use, including the release and the
        monitoring that follows it. I like modern tooling, including AI-assisted workflows, when it makes the product
        more reliable rather than just faster to demo.
      </p>
    </div>

    <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
      <img
        src={me}
        alt="Steve Suico"
        width={96}
        height={96}
        loading="lazy"
        className="h-24 w-24 shrink-0 rounded-2xl object-cover ring-1 ring-white/10"
      />
      <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-4">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="eyebrow">{fact.label}</dt>
            <dd className="mt-1 text-sm text-white">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>

    <div>
      <h3 className="eyebrow mb-3">Outside of work</h3>
      <ul className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <li key={interest.name} className="chip chip-neutral">
            <interest.icon className="text-pink-300" aria-hidden="true" />
            {interest.name}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default AboutMe;
