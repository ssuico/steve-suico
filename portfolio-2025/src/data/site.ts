export const site = {
  name: 'Steve Bryan Suico Jr.',
  shortName: 'Steve Suico',
  role: 'Software Developer',
  location: 'Cebu, Philippines',
  timeZone: 'Asia/Manila',
  availability: 'Open to freelance and full-time roles',
  replyTime: 'I usually reply within 24 hours.',
  cvPath: '/Steve-Suico-CV.pdf',
  email: 'ssuico78@gmail.com',
  phoneDisplay: '+63 916 537 0713',
  phoneHref: 'tel:+639165370713',
  github: 'https://github.com/ssuico',
  linkedin: 'https://www.linkedin.com/in/steve-bryan-suico-97454a276/',
  twitter: 'https://x.com/Steve46168146',
  url: 'https://steve-suico-taupe.vercel.app/',
  // First full-time developer role (Channel Precision Inc, Nov 2023).
  careerStart: '2023-11-01',
} as const;

export function yearsInProduction(now = new Date()) {
  const start = new Date(site.careerStart);
  const years = (now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.max(0, Math.floor(years));
}

export const pageSections = [
  { id: 'home', name: 'Home', path: '/' },
  { id: 'about', name: 'About', path: '/about' },
  { id: 'services', name: 'Services', path: '/services' },
  { id: 'projects', name: 'Projects', path: '/projects' },
  { id: 'experience', name: 'Experience', path: '/experience' },
  { id: 'education', name: 'Education', path: '/education' },
  { id: 'contributions', name: 'Contributions', path: '/contributions' },
  { id: 'contact', name: 'Contact', path: '/contact' },
] as const;

// `number` is the section's position on the page, matching the "// 01" label on each section.
export const navLinks = pageSections
  .map((section, number) => ({ name: section.name, href: section.path, number, id: section.id }))
  .filter((section) => section.id !== 'education')
  .map(({ name, href, number }) => ({ name, href, number }));

export function sectionFromPath(pathname: string) {
  return pageSections.find((section) => section.path === pathname) ?? null;
}
