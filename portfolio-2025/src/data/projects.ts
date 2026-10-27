import agoraCover from '../assets/projects/agora-login.webp';
import astraeusCover from '../assets/projects/astraeus.webp';
import delosCover from '../assets/projects/delos-login.webp';
import obseronCover from '../assets/projects/obseron-prod.webp';

export type ProjectCategory = 'client' | 'personal' | 'work';

export interface ProjectLinks {
  live?: string;
  repo?: string;
  isPrivate?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  year: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  outcomes: string[];
  tech: string[];
  cover?: string;
  /** Drawn cover for projects with no screenshot. A `cover` image wins if both are set. */
  art?: 'amazon-pipeline';
  gallery: string[];
  links: ProjectLinks;
  featured: boolean;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  client: 'Client',
  personal: 'Personal',
  work: 'Work',
};

export const projects: Project[] = [
  {
    slug: 'astraeus-esports',
    title: 'Astraeus Esports Official Site',
    tagline: 'The public site for an esports organization — teams, events, and achievements.',
    category: 'client',
    year: '2025',
    role: 'Web Developer',
    summary:
      'A marketing site for Astraeus Esports. It gives the organization one public home for its brand, roster, events, and results, instead of scattering that information across social posts.',
    problem:
      'The organization needed a site that new players, partners, and fans could trust. Social profiles showed activity, but not a clear picture of the teams, the events, or what the org stood for.',
    solution:
      'I designed and built a React site that leads with the brand and then walks visitors through the roster and the organization’s record. Tailwind kept the layout consistent, and Vercel hosts the public build.',
    features: [
      'Brand-led homepage with a clear introduction to the organization',
      'Team section so visitors can meet the roster',
      'Space for events and achievements in the esports community',
      'Responsive layout that stays readable on a phone',
    ],
    outcomes: [
      'The organization has a public URL it can share with partners and recruits',
      'Team and event information lives on a site the org controls',
    ],
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Vercel'],
    cover: astraeusCover,
    gallery: [],
    links: {
      live: 'https://astraeus-esports.vercel.app/',
      isPrivate: true,
    },
    featured: true,
  },
  {
    slug: 'obseron',
    title: 'Obseron',
    tagline: 'Marketplace apps for price tracking, orders, brand analytics, and the health of Amazon report runs.',
    category: 'work',
    year: '2025 – Present',
    role: 'Frontend Developer',
    summary:
      'The product frontend for Obseron at Channel Precision Inc. A signed-in brand team gets a set of workspace apps: price tracking against competitors, wholesale and direct-to-consumer orders, brand analytics with a streaming chat, listing health, and dashboards that show whether each day’s Amazon report runs finished. Public pages preview every app on a sample catalog.',
    problem:
      'Price checks, order tables, brand performance, and the status of Amazon report jobs lived in separate tools. Pipeline failures were hard to see without an engineer, and each person needed access to some apps but not others.',
    solution:
      'I built the frontend as a Vite single-page app in React and TypeScript, using shadcn-style components on Tailwind 4. Zustand holds the session, theme, and dashboard layout. Axios calls the hosted Obseron API and the company’s Amazon pipeline service, signing in with a cookie and a CSRF token, and the apps menu is filtered by each person’s permissions. Recharts draws the time series and distribution charts, and Vega draws the order-geography map and the charts inside the chat.',
    features: [
      'Price Sentry compares your prices with competitors on Amazon, Walmart, and Target, with a price-history chart and Excel export',
      'Sales Sync for wholesale and direct-to-consumer orders, with channel-share summaries',
      'Brand Analytics with time series and moving averages, parent and child ASIN metrics, sales distribution, and an order map that zooms to state and county',
      'A conversational analytics chat in Brand Analytics that streams its answer and draws Vega charts',
      'SP-API and Amazon Ads report dashboards with a matrix of accomplished, in-progress, failed, and remaining runs, plus run logs',
      'Listings Health and Competitive Landscape views for catalog condition and ASIN ownership',
      'Admin tools for users, workspaces, and Amazon SP-API connections, including Vendor Central',
    ],
    outcomes: [
      'Brand teams reach pricing, orders, and brand analytics in one suite, and each person sees only the apps they have been granted',
      'Unfinished and failed Amazon report runs show up in the browser, with run logs beside them',
    ],
    tech: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Recharts',
      'Vega',
      'Vite',
      'shadcn/ui',
      'Zustand',
      'Axios',
      'ExcelJS',
      'REST API',
      'Vercel',
    ],
    cover: obseronCover,
    gallery: [],
    links: {
      live: 'https://obseron.channelprecision.com/products',
      isPrivate: true,
    },
    featured: true,
  },
  {
    slug: 'delos',
    title: 'Delos',
    tagline: 'Ask questions about the brand reports your account is allowed to see.',
    category: 'work',
    year: '2026 – Present',
    role: 'Full-stack Developer',
    summary:
      'A conversational app at Channel Precision Inc. A person signs in with Google, asks about their Amazon brand data in plain language, and gets a streamed answer from Claude. Delos only offers the tools that person’s account has been granted, and anything that would change data waits for a confirmation.',
    problem:
      'Brand reports were spread across separate products. Getting an answer meant knowing which tool to open, and nothing stopped a person from wandering into data they were not meant to change.',
    solution:
      'I built both halves. The frontend is a Vite app in React and TypeScript, with shadcn/ui on Tailwind 4, one Zustand store, and Google sign-in that renews its token quietly. It talks only to a FastAPI backend on Cloud Run, which verifies the Google token, runs Claude through Vertex AI, and calls the Amazon pipelines’ MCP server as a client. Answers arrive as server-sent events. Every tool call re-checks the account’s grants, and a tool that writes runs as a preview first, then waits for the person to confirm.',
    features: [
      'Plain-language questions with a streamed answer, a stop button, retry, and a queue so several threads can run at once',
      'Badges on each reply that name the tools that produced the answer',
      'My Tools limited to the products an admin has granted, each opening as a form built from the tool’s schema',
      'A preview-then-confirm step before any tool that changes data, with the pending change expiring after a day',
      'Conversations saved on the account, with pinned threads that follow the person across devices',
      'An admin area with a people directory, per-person tool grants, and a system panel for MCP health, model, and granted tools',
      'Light, dark, and match-device themes',
    ],
    outcomes: [
      'A brand question starts in chat instead of a search across report tools',
      'People only see, and can only act on, the products granted to their account, and the server enforces it on every call',
      'Data changes are previewed first, so nothing is written until a person confirms',
    ],
    tech: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Vite',
      'shadcn/ui',
      'Zustand',
      'FastAPI',
      'Python',
      'MCP',
      'Claude',
      'Vertex AI',
      'GCP',
      'Cloud Run',
      'Docker',
    ],
    cover: delosCover,
    gallery: [],
    links: {
      live: 'https://delos.channelprecision.com/',
      isPrivate: true,
    },
    featured: true,
  },
  {
    slug: 'agora',
    title: 'Agora',
    tagline: 'Ordering, pre-orders, and point of sale for neighborhood stores and stalls.',
    category: 'personal',
    year: '2026 – Present',
    role: 'Full-stack Developer',
    summary:
      'A full-stack ordering and point-of-sale app for neighborhood stores and stalls. Shoppers pick a location and store, reserve what is on the shelf or pre-order what is not, choose cash or QR payment, and claim the order in person. Store managers run inventory, orders, and reports from a dashboard, and admins manage locations, stores, and people.',
    problem:
      'Orders were being taken at the counter, in chat, and in spreadsheets. Stock, pre-order deadlines, and who had already paid were easy to lose once more than one person was involved.',
    solution:
      'I built an Astro and React frontend and an Express API on MongoDB, all in TypeScript. Astro runs in server mode with React islands, and its middleware gates each route by role. Orders are placed inside MongoDB transactions, and Socket.IO pushes stock, order, and pre-order changes to people in the same store. Sessions use a JWT in an httpOnly cookie with hashed passwords, role and store-assignment checks, Helmet, and rate-limited sign-in routes. It runs on Railway, with Express serving the Astro build.',
    features: [
      'Location and store browsing, with pre-orders open while a store is closed',
      'Cart and reservations, cash or QR payment, product ratings, and questions or recommendations sent to the store',
      'Purchase history, with cancellation requests that the store manager approves or rejects',
      'Manager dashboard with revenue, profit, top products, and customer feedback, plus Excel reports',
      'Inventory with realtime counts, pre-order listings with cutoff times, and walk-in plus registered-customer sales',
      'Admin, store manager, and customer roles, with a view switcher for people who hold more than one, and managers limited to the stores assigned to them',
      'An automatic store close at local midnight, and a record of who changed each order',
    ],
    outcomes: [
      'A store can publish shelf stock and pre-orders without a separate ordering channel',
      'Managers review stock, payments, and cancellation requests in one place',
    ],
    tech: [
      'Astro',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'shadcn/ui',
      'Express',
      'MongoDB',
      'Socket.IO',
      'JWT',
      'Recharts',
      'REST API',
      'Railway',
    ],
    cover: agoraCover,
    gallery: [],
    links: {
      live: 'https://agora.outdoorequippedservice.com/login',
      isPrivate: true,
    },
    featured: true,
  },
  {
    slug: 'amazon-api-pipelines',
    title: 'Amazon API Data Platform',
    tagline: 'Amazon SP-API, Ads API, and Vendor Central data, ingested on a schedule into BigQuery and served to apps and agents.',
    category: 'work',
    year: '2025 – Present',
    role: 'Backend Developer',
    summary:
      'Internal platform at Channel Precision Inc. A FastAPI service on Google Cloud pulls seller, vendor, advertising, Marketing Cloud, and pricing data from Amazon for many brand accounts, lands it in BigQuery, and serves it through a REST API and an MCP server. A VitePress site documents how it works and how to run it.',
    problem:
      'Amazon reports were arriving through manual exports. That was slow, easy to get wrong, and hard to join into one picture of catalog, orders, and ad spend.',
    solution:
      'The service runs on Cloud Run. Cloud Scheduler calls dispatch endpoints, which fan out to Cloud Tasks queues so each account and report type runs as its own job. Workers request the report, poll for it, and retry with backoff, then write through a staging table and a MERGE into BigQuery, so reruns do not duplicate rows. Pydantic models type the data, and Cloud Build builds the Docker image and deploys it.',
    features: [
      'SP-API seller reports (sales and traffic, listings, orders, returns, FBA inventory) and Vendor Central retail analytics',
      'Amazon Ads API reports across Sponsored Products, Sponsored Brands, and Sponsored Display',
      'Amazon Marketing Cloud path-to-conversion queries and competitive pricing snapshots',
      'Job fan-out with rate limiting, exponential backoff, Retry-After handling, and checks that skip duplicate runs',
      'A coverage matrix per account and report type, with gap-fill dispatch for the days that are missing',
      'Close to 90 REST endpoints for Brand Analytics, Listings Health, Competitive Landscape, and report status, plus an MCP server for agent clients',
      'A VitePress documentation site with report catalogs, a data reference, runbooks, and design decisions',
    ],
    outcomes: [
      'Company analytics no longer depends on one-off spreadsheet exports',
      'Releases go out through Cloud Build instead of a manual server update',
      'Obseron and Delos both run on this platform, one through its REST API and the other through MCP',
    ],
    tech: [
      'FastAPI',
      'Python',
      'GCP',
      'BigQuery',
      'Cloud Run',
      'Cloud Tasks',
      'Cloud Scheduler',
      'Docker',
      'Cloud Build',
      'Pydantic',
      'MCP',
      'REST API',
      'VitePress',
      'SP-API',
      'Ads API',
    ],
    art: 'amazon-pipeline',
    gallery: [],
    links: { isPrivate: true },
    featured: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): { previous?: Project; next?: Project } {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
