import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Steve<span className="text-pink-500">Suico</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Software Developer specializing in full-stack web applications, cloud infrastructure, and AI-driven workflows.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Experience', 'Education', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 text-sm hover:text-pink-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Get In Touch</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="mailto:ssuico78@gmail.com" className="flex items-center gap-2 hover:text-pink-400 transition-colors">
                <FaEnvelope className="text-pink-500" />
                ssuico78@gmail.com
              </a>
              <a href="tel:+639165370713" className="flex items-center gap-2 hover:text-pink-400 transition-colors">
                <FaPhone className="text-pink-500" />
                +63 916 537 0713
              </a>
            </div>
            <div className="flex gap-4 mt-4">
              {[
                { icon: <FaGithub />, href: 'https://github.com/ssuico' },
                { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/steve-bryan-suico-97454a276/' },
                { icon: <FaTwitter />, href: 'https://x.com/Steve46168146' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="text-lg text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            © {currentYear} Steve Bryan L. Suico Jr. Built with
            <FaHeart className="text-pink-500 text-xs" />
            using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;