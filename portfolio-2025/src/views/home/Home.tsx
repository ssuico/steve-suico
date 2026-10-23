import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaDownload, FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaTwitter } from 'react-icons/fa';
import { projects } from '@/data/projects';
import { site, yearsInProduction } from '@/data/site';
import HeroConstellation from './HeroConstellation';
import TechMarquee from './TechMarquee';

const socials = [
  { label: 'GitHub', href: site.github, icon: FaGithub },
  { label: 'LinkedIn', href: site.linkedin, icon: FaLinkedin },
  { label: 'X', href: site.twitter, icon: FaTwitter },
  { label: 'Email', href: `mailto:${site.email}`, icon: FaEnvelope },
  { label: 'Phone', href: site.phoneHref, icon: FaPhone },
];

const focuses = ['full-stack web apps', 'data pipelines', 'cloud infrastructure', 'AI-assisted workflows'];

function RotatingFocus() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setIndex((current) => (current + 1) % focuses.length), 2600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <>
      <span className="sr-only">{focuses.join(', ')}</span>
      <span aria-hidden="true" className="relative inline-block min-w-[16ch] align-bottom">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={focuses[index]}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="inline-block font-medium text-pink-300"
          >
            {focuses[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}

function formatLocalTime() {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: site.timeZone,
  }).format(new Date());
}

function useLocalTime() {
  const [time, setTime] = useState(formatLocalTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatLocalTime()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

const Home = () => {
  const time = useLocalTime();
  const reduceMotion = useReducedMotion();

  const stats = [
    { value: `${yearsInProduction()}+`, label: 'Years in production' },
    { value: String(projects.length), label: 'Case studies' },
    { value: '24h', label: 'Typical reply' },
    { value: time, label: `${site.location} · GMT+8` },
  ];

  return (
    <section id="home" className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <HeroConstellation />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-14 px-5 pb-16 pt-32 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/5 px-3.5 py-1.5 text-xs text-pink-100">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {site.availability}
          </p>

          <p className="eyebrow mt-8 text-pink-400">{'// hello, world'}</p>
          <h1 className="mt-3 text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Steve Bryan{' '}
            <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              Suico
            </span>{' '}
            Jr.
          </h1>

          <p className="mt-6">
            <span className="block font-display text-2xl font-semibold text-white sm:text-3xl">{site.role}</span>
            <span className="mt-1 block text-lg text-gray-300 sm:text-xl">
              I build <RotatingFocus />
            </span>
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            Building and deploying full-stack web applications from concept to production. I use modern tooling,
            including AI-assisted workflows, to ship work people can rely on.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/contact" className="btn btn-primary">
              Get in touch
            </Link>
            <Link to="/projects" className="btn btn-outline">
              View projects
            </Link>
            <a href={site.cvPath} download className="btn text-muted hover:text-white">
              <FaDownload aria-hidden="true" className="text-xs" />
              Download CV
            </a>
          </div>

          <ul className="mt-9 flex gap-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-lg text-muted transition-colors hover:border-pink-500/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
                >
                  <social.icon />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[340px]"
        >
          <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-pink-500/30 via-violet-500/20 to-cyan-400/20 blur-2xl" />
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-1.5">
            <img
              src="/hero.webp"
              alt="Steve Suico"
              width={300}
              height={400}
              fetchPriority="high"
              decoding="async"
              className="aspect-[3/4] w-full rounded-[1.25rem] object-cover"
            />
          </div>

          <div className="absolute -right-3 top-10 rounded-xl border border-white/10 bg-ink/75 px-3.5 py-2.5 shadow-xl backdrop-blur-md motion-safe:animate-float sm:-right-8">
            <p className="eyebrow">Stack</p>
            <p className="mt-0.5 font-mono text-xs text-white">React · TypeScript · GCP</p>
          </div>
          <div
            className="absolute -left-3 bottom-12 rounded-xl border border-white/10 bg-ink/75 px-3.5 py-2.5 shadow-xl backdrop-blur-md motion-safe:animate-float sm:-left-8"
            style={{ animationDelay: '-3s' }}
          >
            <p className="eyebrow">Currently</p>
            <p className="mt-0.5 text-xs text-white">R&amp;D Developer, Channel Precision</p>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 border-y border-line bg-ink/60 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-5 py-6 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="eyebrow mt-1">{stat.label}</dt>
              <dd className="font-display text-3xl font-semibold text-white tabular-nums">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="relative z-10">
        <TechMarquee />
      </div>
    </section>
  );
};

export default Home;
