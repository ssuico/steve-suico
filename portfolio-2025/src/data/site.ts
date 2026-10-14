export const site = {
  name: 'Steve Bryan Suico Jr.',
  shortName: 'Steve Suico',
  role: 'Software Developer',
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
} as const;

export const pageSections = [
  { id: 'home', name: 'Home', path: '/' },
  { id: 'about', name: 'About', path: '/about' },
  { id: 'services', name: 'Services', path: '/services' },
  { id: 'experience', name: 'Experience', path: '/experience' },
  { id: 'education', name: 'Education', path: '/education' },
  { id: 'projects', name: 'Projects', path: '/projects' },
  { id: 'contributions', name: 'Contributions', path: '/contributions' },
  { id: 'contact', name: 'Contact', path: '/contact' },
] as const;

export const navLinks = pageSections
  .filter((section) => section.id !== 'education')
  .map((section) => ({ name: section.name, href: section.path }));

export const footerLinks = pageSections.map((section) => ({ name: section.name, href: section.path }));

export function sectionFromPath(pathname: string) {
  return pageSections.find((section) => section.path === pathname) ?? null;
}
