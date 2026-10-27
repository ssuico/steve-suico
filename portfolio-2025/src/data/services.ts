export type ServiceId = 'web' | 'data' | 'cloud' | 'automation';

export interface Service {
  id: ServiceId;
  title: string;
  pitch: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    id: 'web',
    title: 'Full-stack web applications',
    pitch: 'From a first layout to a production deploy, with a frontend people can actually use.',
    deliverables: [
      'React and TypeScript interfaces built around the workflow, not a generic template',
      'Astro sites with React islands, where a page should load fast and still be interactive',
      'An API behind it, FastAPI or Express, with live updates over Socket.IO where the app needs them',
      'A release on Vercel, Railway, or your existing host',
    ],
  },
  {
    id: 'data',
    title: 'Dashboards and data pipelines',
    pitch: 'Turn exports and third-party APIs into a view the business can check itself.',
    deliverables: [
      'Ingestion from Amazon SP-API, Vendor Central, and Ads API into BigQuery',
      'Scheduled and queued jobs with retries, and MERGE writes so a rerun does not duplicate rows',
      'Dashboards for report runs, price tracking, and brand analytics instead of a spreadsheet',
      'A VitePress docs site so the next developer can see how it works',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud and DevOps',
    pitch: 'Get a service onto Google Cloud, Railway, or Vercel, and make the next release routine.',
    deliverables: [
      'Cloud Run services, with BigQuery for the data, Cloud Scheduler for triggers, and Cloud Tasks for job queues',
      'Each release shipped as one Docker image, built and deployed by Cloud Build',
      'Status endpoints and Cloud Logging, so a failed run is easy to find',
    ],
  },
  {
    id: 'automation',
    title: 'Automation and AI-assisted workflows',
    pitch: 'Remove the repeated clicks, and put an assistant on your own data where it helps.',
    deliverables: [
      'Scripts and internal tools that collapse a multi-step chore',
      'Zapier-style glue between the tools a team already uses',
      'A chat assistant that calls your APIs as MCP tools, with Claude on Vertex AI',
      'Per-account access and a confirm step before anything is written',
    ],
  },
];
