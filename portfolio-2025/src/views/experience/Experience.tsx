import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import Section from '@/components/ui/Section';
import TimelineRow from '@/components/ui/TimelineRow';

interface Experience {
  title: string;
  subtitle?: string;
  company: string;
  note?: string;
  period: string;
  current?: boolean;
  highlights: string[];
  tags: string[];
}

const experiences: Experience[] = [
  {
    title: 'Software Developer',
    subtitle: 'Research & Development Project',
    company: 'Channel Precision Inc',
    note: 'Internal Transfer',
    period: 'Nov 2025 – Present',
    current: true,
    highlights: [
      'Built and maintained the Amazon data platform: SP-API, Vendor Central, Ads API, Marketing Cloud, and pricing reports ingested into BigQuery by a FastAPI service on Cloud Run. Cloud Scheduler triggers the jobs, Cloud Tasks queues run them with retries, and MERGE writes keep reruns from duplicating rows.',
      'Built Delos end to end: a React and TypeScript chat app and a FastAPI backend that runs Claude on Vertex AI and reaches the pipelines through MCP, with per-account tool grants and a confirm step before any write.',
      'Set up release builds with Google Cloud Build that build the Docker image and deploy it to Cloud Run, and containerized the services so each release ships as one image.',
      'Added status endpoints, a report coverage matrix with gap-fill, and Cloud Logging so failed or missing runs are easy to find.',
      'Wrote the platform’s VitePress documentation site: report catalogs, runbooks, and design decisions.',
    ],
    tags: [
      'FastAPI',
      'Python',
      'GCP',
      'BigQuery',
      'Cloud Run',
      'Docker',
      'Cloud Build',
      'Cloud Scheduler',
      'Cloud Tasks',
      'MCP',
      'ReactJS',
      'SP-API',
      'Ads API',
    ],
  },
  {
    title: 'Software Developer',
    company: 'Channel Precision Inc',
    period: 'Nov 2023 – Present',
    current: true,
    highlights: [
      'Built the React frontend for Obseron, a suite of marketplace apps: dashboards for Amazon report runs that show finished, in-progress, and failed jobs, plus price tracking and brand analytics, deployed on Vercel.',
      'Built complex internal web applications to streamline cross-department workflows, heavily improving overall operational efficiency.',
      'Developed automated scripts and custom internal tools to eliminate manual, repetitive tasks and consolidate multi-step processes.',
      'Created highly reusable modular code libraries for shared features, accelerating development turnarounds across multiple parallel projects.',
      'Transformed expansive raw datasets into structured, usable business assets through deep data cleaning, filtering, aggregation, and relational joins.',
      'Researched emerging software technologies and shared actionable insights to continuously improve core team development practices.',
    ],
    tags: ['ReactJS', 'TypeScript', 'Vercel', 'Node.js', 'Automation', 'Data Processing'],
  },
  {
    title: 'UI Developer Intern',
    company: 'DNA Micro',
    period: 'Jan 2023 – Apr 2023',
    highlights: [
      'Completed rigorous, hands-on UI development training leveraging ReactJS, PugJS, and SASS.',
      'Gained practical enterprise experience with structural GitLab git workflows and component-driven architecture using Storybook.',
    ],
    tags: ['ReactJS', 'PugJS', 'SASS', 'Storybook', 'GitLab'],
  },
];

const visibleCount = 3;

function ExperienceItem({ item }: { item: Experience }) {
  const [expanded, setExpanded] = useState(false);
  const hidden = item.highlights.length - visibleCount;
  const shown = expanded ? item.highlights : item.highlights.slice(0, visibleCount);

  return (
    <TimelineRow period={item.period} current={item.current}>
      <h3 className="text-lg font-semibold text-white">{item.title}</h3>
      {item.subtitle && <p className="text-sm font-medium text-pink-300">{item.subtitle}</p>}
      <p className="text-sm text-muted">
        {item.company}
        {item.note && <span className="text-gray-500"> ({item.note})</span>}
      </p>

      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-gray-300">
        {shown.map((highlight) => (
          <li key={highlight} className="flex gap-3">
            <span className="mt-2.5 h-px w-3 shrink-0 bg-pink-400" aria-hidden="true" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          className="mt-3 text-sm font-medium text-pink-300 transition-colors hover:text-pink-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
        >
          {expanded ? 'Show less' : `Show ${hidden} more`}
        </button>
      )}

      <ul className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <li key={tag} className="chip">
            {tag}
          </li>
        ))}
      </ul>
    </TimelineRow>
  );
}

const Experience = () => (
  <Section
    id="experience"
    index={4}
    label="experience"
    title="Where I've worked"
    highlight="worked"
    description="What I've built, and the tools I used to ship it."
    layout="split"
  >
    <Reveal each=":scope > ul > li">
      <ul className="focus-list">
        {experiences.map((item) => (
          <ExperienceItem key={`${item.title}-${item.period}`} item={item} />
        ))}
      </ul>
    </Reveal>
  </Section>
);

export default Experience;
