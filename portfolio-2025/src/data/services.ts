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
      'React interfaces built around the workflow, not a generic template',
      'APIs and data wiring so the UI is not a static mock',
      'A release path onto Vercel or your existing host',
    ],
  },
  {
    id: 'data',
    title: 'Dashboards and data pipelines',
    pitch: 'Turn exports and third-party APIs into a view the business can check itself.',
    deliverables: [
      'Ingestion from sources such as Amazon SP-API and Ads API',
      'Cleaning, joins, and tables people can query',
      'A dashboard for the numbers that used to live in a spreadsheet',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud and DevOps',
    pitch: 'Ship the same artifact locally and in production, and make the next deploy boring.',
    deliverables: [
      'Google Cloud setup, including Cloud Run, BigQuery, and Cloud Build',
      'Docker images for services that have to stay consistent',
      'CI/CD so a release is a pipeline, not a checklist',
    ],
  },
  {
    id: 'automation',
    title: 'Automation and AI-assisted workflows',
    pitch: 'Remove the repeated clicks, and use AI tooling where it shortens the work.',
    deliverables: [
      'Scripts and internal tools that collapse a multi-step chore',
      'Zapier-style glue between the tools a team already uses',
      'AI-assisted delivery when it speeds up a real workflow',
    ],
  },
];
