import type { IconType } from 'react-icons';
import { GiBearFace } from 'react-icons/gi';
import {
  SiAstro,
  SiClaude,
  SiCursor,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiGooglebigquery,
  SiGooglecloud,
  SiJsonwebtokens,
  SiModelcontextprotocol,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiPydantic,
  SiPython,
  SiReact,
  SiShadcnui,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitepress,
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { projects } from './projects';

export type StackGroup = 'design' | 'frontend' | 'backend' | 'data' | 'cloud' | 'tools';

export interface StackItem {
  id: string;
  name: string;
  icon: IconType;
  /** Brand color. White for brands that are black on white, so they read on the dark background. */
  color: string;
  group: StackGroup;
  /** Names this tool goes by in a project's `tech` list. Empty when no case study lists it. */
  match: string[];
  /** What the tool is for, when the name alone does not say ("state management"). */
  note?: string;
}

export const stack: StackItem[] = [
  { id: 'figma', name: 'Figma', icon: SiFigma, color: '#F24E1E', group: 'design', match: [] },
  { id: 'react', name: 'React', icon: SiReact, color: '#61DAFB', group: 'frontend', match: ['React'] },
  { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: '#3178C6', group: 'frontend', match: ['TypeScript'] },
  { id: 'nextjs', name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF', group: 'frontend', match: [] },
  { id: 'tailwind', name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38BDF8', group: 'frontend', match: ['Tailwind CSS'] },
  { id: 'vercel', name: 'Vercel', icon: SiVercel, color: '#FFFFFF', group: 'frontend', match: ['Vercel'] },
  { id: 'node', name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E', group: 'backend', match: ['Express', 'Node.js'] },
  { id: 'python', name: 'Python', icon: SiPython, color: '#FFD43B', group: 'backend', match: ['Python'] },
  { id: 'fastapi', name: 'FastAPI', icon: SiFastapi, color: '#009688', group: 'backend', match: ['FastAPI'] },
  { id: 'docker', name: 'Docker', icon: SiDocker, color: '#2496ED', group: 'cloud', match: ['Docker'] },
  { id: 'gcp', name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4', group: 'cloud', match: ['GCP'] },
  { id: 'bigquery', name: 'BigQuery', icon: SiGooglebigquery, color: '#669DF6', group: 'data', match: ['BigQuery'] },
  { id: 'cloudrun', name: 'Cloud Run', icon: SiGooglecloud, color: '#4285F4', group: 'cloud', match: ['Cloud Run'] },
  {
    id: 'zustand',
    name: 'Zustand',
    // No Zustand mark in the icon set, so it uses a bear, the library's mascot.
    icon: GiBearFace,
    color: '#E8A87C',
    group: 'frontend',
    match: ['Zustand'],
    note: 'state management',
  },
  { id: 'shadcn', name: 'shadcn/ui', icon: SiShadcnui, color: '#FFFFFF', group: 'frontend', match: ['shadcn/ui'], note: 'component library' },
  { id: 'vite', name: 'Vite', icon: SiVite, color: '#A78BFA', group: 'frontend', match: ['Vite'], note: 'build tool' },
  { id: 'astro', name: 'Astro', icon: SiAstro, color: '#FF5D01', group: 'frontend', match: ['Astro'], note: 'server-rendered sites with React islands' },
  { id: 'mongodb', name: 'MongoDB', icon: SiMongodb, color: '#47A248', group: 'backend', match: ['MongoDB'], note: 'database' },
  { id: 'rest', name: 'RESTful APIs', icon: TbApi, color: '#F472B6', group: 'backend', match: ['REST API'], note: 'API design' },
  { id: 'express', name: 'Express', icon: SiExpress, color: '#FFFFFF', group: 'backend', match: ['Express'], note: 'API server' },
  { id: 'socketio', name: 'Socket.IO', icon: SiSocketdotio, color: '#FFFFFF', group: 'backend', match: ['Socket.IO'], note: 'realtime updates' },
  { id: 'jwt', name: 'JWT', icon: SiJsonwebtokens, color: '#FB015B', group: 'backend', match: ['JWT'], note: 'auth tokens' },
  { id: 'pydantic', name: 'Pydantic', icon: SiPydantic, color: '#E92063', group: 'backend', match: ['Pydantic'], note: 'typed models' },
  { id: 'cloudtasks', name: 'Cloud Tasks', icon: SiGooglecloud, color: '#4285F4', group: 'cloud', match: ['Cloud Tasks'], note: 'job queues' },
  { id: 'cloudbuild', name: 'Cloud Build', icon: SiGooglecloud, color: '#4285F4', group: 'cloud', match: ['Cloud Build'], note: 'builds and deploys' },
  { id: 'claude', name: 'Claude', icon: SiClaude, color: '#D97757', group: 'tools', match: ['Claude'], note: 'language model' },
  { id: 'vertexai', name: 'Vertex AI', icon: SiGooglecloud, color: '#4285F4', group: 'cloud', match: ['Vertex AI'], note: 'hosts the model' },
  { id: 'mcp', name: 'MCP', icon: SiModelcontextprotocol, color: '#FFFFFF', group: 'tools', match: ['MCP'], note: 'tools for AI agents' },
  { id: 'vitepress', name: 'VitePress', icon: SiVitepress, color: '#5C73E7', group: 'tools', match: ['VitePress'], note: 'docs site' },
  { id: 'cursor', name: 'Cursor AI', icon: SiCursor, color: '#FFFFFF', group: 'tools', match: [], note: 'AI-assisted coding' },
  { id: 'postman', name: 'Postman', icon: SiPostman, color: '#FF6C37', group: 'tools', match: [], note: 'API testing' },
];

export const stackById = Object.fromEntries(stack.map((item) => [item.id, item])) as Record<string, StackItem>;

/** How many case studies list this tool. Computed from `projects.ts`, never typed in. */
export function projectCount(item: StackItem): number {
  if (item.match.length === 0) return 0;
  return projects.filter((project) => project.tech.some((tech) => item.match.includes(tech))).length;
}

export const totalProjects = projects.length;

/** Short readout used by all three samples: "used in 4 of 5 case studies", or a neutral line when none list it. */
export function usageLabel(item: StackItem): string {
  const count = projectCount(item);
  return count > 0
    ? `used in ${count} of ${totalProjects} case studies`
    : 'daily tooling, not tagged on a case study';
}

/** Pairs that are used together. A simplification of the stack, not of any one project's architecture. */
export const relations: [string, string][] = [
  ['figma', 'react'],
  ['react', 'nextjs'],
  ['react', 'typescript'],
  ['react', 'tailwind'],
  ['react', 'vercel'],
  ['nextjs', 'vercel'],
  ['node', 'typescript'],
  ['python', 'fastapi'],
  ['fastapi', 'docker'],
  ['fastapi', 'bigquery'],
  ['docker', 'cloudrun'],
  ['cloudrun', 'gcp'],
  ['bigquery', 'gcp'],
];
