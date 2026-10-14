import { Link } from 'react-router-dom';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaTwitter } from 'react-icons/fa';
import { footerLinks, site } from '@/data/site';

const socials = [
  { label: 'GitHub', icon: FaGithub, href: site.github },
  { label: 'LinkedIn', icon: FaLinkedin, href: site.linkedin },
  { label: 'X', icon: FaTwitter, href: site.twitter },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Steve<span className="text-pink-500">Suico</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Software Developer specializing in full-stack web applications, cloud infrastructure, and AI-driven workflows.
            </p>
            <p className="mt-3 text-sm text-pink-300">{site.availability}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 text-sm hover:text-pink-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Get In Touch</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-pink-400 transition-colors">
                <FaEnvelope className="text-pink-500" />
                {site.email}
              </a>
              <a href={site.phoneHref} className="flex items-center gap-2 hover:text-pink-400 transition-colors">
                <FaPhone className="text-pink-500" />
                {site.phoneDisplay}
              </a>
            </div>
            <div className="flex gap-4 mt-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-lg text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Steve Bryan L. Suico Jr. Built with React and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
