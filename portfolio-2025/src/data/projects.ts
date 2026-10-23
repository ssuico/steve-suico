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
    tagline: 'Marketplace apps for price, orders, brand traffic, Amazon report pipelines, and financial reporting.',
    category: 'work',
    year: '2024 – Present',
    role: 'Software Developer',
    summary:
      'The product frontend for Obseron at Channel Precision Inc. It gives a marketplace brand one place to watch prices, orders, and brand traffic, check whether today’s Amazon reports finished, and read profit and loss down to the SKU.',
    problem:
      'Pricing, wholesale orders, brand performance, and Amazon report jobs lived in separate tools. Finance was still reconciling sales, freight, and tax in spreadsheets, and pipeline failures were hard to see without an engineer.',
    solution:
      'I built the React app that fronts those workflows. Public pages preview each product on a sample catalog. Signed-in workspaces call the hosted Obseron API and the company’s Amazon pipeline services. Recharts and Vega draw the analytics, and comparisons can be exported to Excel.',
    features: [
      'Price Sentry for Amazon and Target deltas, price history, and a competitor catalog',
      'Sales Sync for retail-partner and direct-to-consumer orders, including cancels and returns',
      'Brand Analytics for catalog performance, sales concentration, and order geography',
      'SP-API and Amazon Ads report matrices that show finished, open, and failed runs',
      'Financial reporting with SKU-level margin, freight allocation, and tax reconciliation',
    ],
    outcomes: [
      'Brand and finance teams open one suite instead of a stack of exports',
      'Unfinished and failed Amazon report runs are visible in the browser',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Vite', 'Radix UI', 'Zustand', 'Vega'],
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
    year: '2024 – Present',
    role: 'Software Developer',
    summary:
      'A conversational frontend at Channel Precision Inc. Delos answers questions from the reports already on an account, and only lists the tools that account has been granted.',
    problem:
      'Brand reports were spread across separate products. Getting an answer meant knowing which tool to open, and nothing stopped a person from wandering into data they were not meant to change.',
    solution:
      'I built a React dashboard with Google sign-in, a home conversation, and a My Tools gallery. Questions stream an answer, with the report Delos used kept on the reply. The app reaches the Amazon pipelines through MCP. A question that would update data waits until the person confirms it.',
    features: [
      'Plain-language questions with a streaming answer and the source report attached',
      'My Tools limited to granted products such as Brand Analytics, Listing Health, and Data Status',
      'A confirmation step before any question changes data',
      'Conversations that stay on the account, including ones pinned for later',
      'Light, dark, and system appearance, plus an admin view of accounts and system health',
    ],
    outcomes: [
      'A brand question starts in chat instead of a search across report tools',
      'People only see, and can only act on, the products granted to their account',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'MCP', 'Vite', 'Zustand', 'Radix UI'],
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
    tagline: 'Neighborhood stores take reservations and pre-orders before the customer walks in.',
    category: 'work',
    year: '2024 – Present',
    role: 'Software Developer',
    summary:
      'A full-stack ordering app for neighborhood retail. Shoppers pick a store, reserve what is on the shelf or up for pre-order, pay with that store’s QR options, and claim the order in person. Store managers run the same shop from a dashboard.',
    problem:
      'Those orders were being taken at the counter and in chat. Stock, pre-order deadlines, and who had already paid were easy to lose once more than one person was involved.',
    solution:
      'I built an Astro and React storefront and an Express API on MongoDB. Customers browse, reserve, and follow their purchases. An admin can add the Store Manager role, which opens inventory, transactions, and store status. Socket.IO keeps stock and new orders current, and JWT plus the usual API hardening protect the accounts.',
    features: [
      'Location and store browsing, including pre-orders while a store is closed',
      'Cart, reservation, QR payment details, ratings, and store chat',
      'Purchase history with cancellation requests on active orders',
      'Store dashboard for revenue, top products, and a live order feed',
      'Inventory with realtime counts, pre-order listings, and walk-in plus registered sales',
    ],
    outcomes: [
      'A store can publish shelf stock and pre-orders without a separate ordering channel',
      'Managers review stock, payments, and cancellation requests in one place',
    ],
    tech: ['Astro', 'React', 'Express', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Socket.IO', 'JWT'],
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
    tagline: 'Reliable ingestion from Amazon SP-API and Ads API into a cloud analytics stack.',
    category: 'work',
    year: '2024 – Present',
    role: 'Software Developer',
    summary:
      'Internal platform at Channel Precision Inc. It pulls seller and advertising data from Amazon, lands it in Google Cloud, and keeps the pipelines observable for the rest of the company.',
    problem:
      'Amazon reports were arriving through manual exports. That was slow, easy to get wrong, and hard to join into one picture of catalog, orders, and ad spend.',
    solution:
      'I maintained SP-API and Ads API ingestion, then served the data through a FastAPI layer on Google Cloud. Docker kept each piece the same in local and production, and Cloud Build handled the release path.',
    features: [
      'Scheduled ingestion from Amazon SP-API and Ads API',
      'FastAPI services in front of the cloud data store',
      'Docker images so local and production environments match',
      'Cloud Build pipelines for repeatable deploys',
      'Room for cleaning, filtering, and joining raw exports into usable tables',
    ],
    outcomes: [
      'Company analytics no longer depends on one-off spreadsheet exports',
      'Releases go out through Cloud Build instead of a manual server update',
    ],
    tech: ['FastAPI', 'Python', 'GCP', 'BigQuery', 'Docker', 'Cloud Build', 'SP-API', 'Ads API'],
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
