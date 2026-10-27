import type { ReactNode } from 'react';
import { FaDocker, FaFigma, FaNodeJs, FaPython, FaReact } from 'react-icons/fa';
import { GiBearFace } from 'react-icons/gi';
import {
  SiAstro,
  SiClaude,
  SiCursor,
  SiExpress,
  SiFastapi,
  SiGoogleappsscript,
  SiGooglebigquery,
  SiGooglecloud,
  SiModelcontextprotocol,
  SiMongodb,
  SiNextdotjs,
  SiPostman,
  SiRailway,
  SiSass,
  SiShadcnui,
  SiSocketdotio,
  SiStorybook,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitepress,
  SiZapier,
} from 'react-icons/si';
import { TbApi, TbChartBar } from 'react-icons/tb';

type SkillItem = string | { name: string; icon: ReactNode };

const skillCategories: { title: string; dot: string; items: SkillItem[] }[] = [
  {
    title: 'Core',
    dot: 'bg-pink-500',
    items: [
      'Full-Stack Development (Frontend-focused)',
      'UI/UX Design & Prototyping',
      'API Integration & Data Pipelines',
      'Cloud Infrastructure',
      'LLM Apps & MCP Integration',
      'Technical Documentation',
      'Workflow Automation',
      'Release Builds & Monitoring',
    ],
  },
  {
    title: 'Frontend',
    dot: 'bg-sky-400',
    items: [
      { name: 'ReactJS', icon: <FaReact /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'NextJS', icon: <SiNextdotjs /> },
      { name: 'Astro', icon: <SiAstro /> },
      { name: 'Vite', icon: <SiVite /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { name: 'shadcn/ui', icon: <SiShadcnui /> },
      { name: 'Zustand', icon: <GiBearFace /> },
      { name: 'Recharts', icon: <TbChartBar /> },
      { name: 'PugJS', icon: null },
      { name: 'SASS', icon: <SiSass /> },
      { name: 'Storybook', icon: <SiStorybook /> },
    ],
  },
  {
    title: 'Backend & tools',
    dot: 'bg-emerald-400',
    items: [
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'Express', icon: <SiExpress /> },
      { name: 'Python', icon: <FaPython /> },
      { name: 'FastAPI', icon: <SiFastapi /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'Socket.IO', icon: <SiSocketdotio /> },
      { name: 'REST APIs', icon: <TbApi /> },
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'Cursor AI', icon: <SiCursor /> },
      { name: 'Figma', icon: <FaFigma /> },
      { name: 'Zapier', icon: <SiZapier /> },
      { name: 'Google Apps Script', icon: <SiGoogleappsscript /> },
      { name: 'Postman', icon: <SiPostman /> },
      { name: 'VitePress', icon: <SiVitepress /> },
    ],
  },
  {
    title: 'Cloud & data',
    dot: 'bg-violet-400',
    items: [
      { name: 'GCP', icon: <SiGooglecloud /> },
      { name: 'Cloud Run', icon: <SiGooglecloud /> },
      { name: 'BigQuery', icon: <SiGooglebigquery /> },
      { name: 'Cloud Tasks', icon: <SiGooglecloud /> },
      { name: 'Cloud Schedulers', icon: <SiGooglecloud /> },
      { name: 'Cloud Build', icon: <SiGooglecloud /> },
      { name: 'Vercel', icon: <SiVercel /> },
      { name: 'Railway', icon: <SiRailway /> },
    ],
  },
  {
    title: 'AI & integrations',
    dot: 'bg-amber-400',
    items: [
      { name: 'Claude', icon: <SiClaude /> },
      { name: 'MCP', icon: <SiModelcontextprotocol /> },
      { name: 'Vertex AI', icon: <SiGooglecloud /> },
      { name: 'Amazon SP-API', icon: null },
      { name: 'Amazon Ads API', icon: null },
    ],
  },
];

const Skills = () => (
  <ul className="divide-y divide-line border-y border-line">
    {skillCategories.map((category) => (
      <li key={category.title} className="grid gap-3 py-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
        <h4 className="eyebrow flex items-center gap-2 pt-1">
          <span className={`h-1.5 w-1.5 rounded-full ${category.dot}`} aria-hidden="true" />
          {category.title}
        </h4>
        <ul className="flex flex-wrap gap-2">
          {category.items.map((item) => {
            const name = typeof item === 'string' ? item : item.name;
            const icon = typeof item === 'string' ? null : item.icon;
            return (
              <li
                key={name}
                className="chip chip-neutral transition-colors hover:bg-pink-500/15 hover:text-pink-100"
              >
                {icon && (
                  <span className="text-sm text-pink-300" aria-hidden="true">
                    {icon}
                  </span>
                )}
                {name}
              </li>
            );
          })}
        </ul>
      </li>
    ))}
  </ul>
);

export default Skills;
