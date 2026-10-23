import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { site } from '@/data/site';

const socials = [
  { label: 'GitHub', icon: FaGithub, href: site.github },
  { label: 'LinkedIn', icon: FaLinkedin, href: site.linkedin },
  { label: 'X', icon: FaTwitter, href: site.twitter },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <Link to="/" className="font-display text-lg font-bold text-white">
            Steve<span className="text-pink-500">Suico</span>
          </Link>
          <p className="mt-1 font-mono text-xs text-muted">
            © {currentYear} Steve Bryan L. Suico Jr. · Built with React and Tailwind CSS.
          </p>
        </div>

        <ul className="flex items-center gap-3">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-pink-500/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
              >
                <social.icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
