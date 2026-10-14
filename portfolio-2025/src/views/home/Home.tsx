import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone, FaTwitter } from 'react-icons/fa';
import { site } from '@/data/site';

const socials = [
  { label: 'GitHub', href: site.github, icon: FaGithub },
  { label: 'LinkedIn', href: site.linkedin, icon: FaLinkedin },
  { label: 'X', href: site.twitter, icon: FaTwitter },
  { label: 'Email', href: `mailto:${site.email}`, icon: FaEnvelope },
  { label: 'Phone', href: site.phoneHref, icon: FaPhone },
];

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} id="home" className="relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-black to-gray-900">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <svg className="absolute top-20 left-10 w-24 h-24 text-pink-500/20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          <svg className="absolute bottom-20 right-10 w-32 h-32 text-pink-500/20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center gap-8 px-4 py-24 text-white md:flex-row">
        <div className="w-full md:w-[40%] flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-pink-500/20 blur-2xl rounded-full transform scale-110" />
            <img
              src="/hero.webp"
              alt="Steve Suico"
              width={300}
              height={400}
              fetchPriority="high"
              decoding="async"
              className="w-[300px] h-[400px] object-cover rounded-xl relative z-10"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left w-full md:w-[60%]"
        >
          <p className="text-pink-400 text-sm md:text-base font-medium tracking-widest uppercase mb-2">
            Hello, I'm
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Steve Bryan <span className="text-pink-500">Suico</span> Jr.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Software Developer
          </p>
          <p className="text-sm md:text-base text-gray-300 mb-8 max-w-lg">
            Building and deploying full-stack web applications from concept to production.
            I use modern tooling, including AI-assisted workflows, to ship work people can rely on.
          </p>

          <div className="flex justify-center md:justify-start gap-6 mb-8">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={social.label}
                className="text-2xl text-gray-400 hover:text-white transition-colors"
              >
                <social.icon />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <Link
              to="/contact"
              className="px-8 py-3 bg-pink-500 rounded-lg font-medium hover:bg-pink-600 transition-colors text-sm"
            >
              Get In Touch
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3 border border-gray-600 rounded-lg font-medium hover:border-pink-500 hover:text-pink-400 transition-colors text-sm"
            >
              View Projects
            </Link>
            <a
              href={site.cvPath}
              download
              className="px-8 py-3 rounded-lg font-medium text-gray-300 hover:text-white transition-colors text-sm"
            >
              Download CV
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex justify-center pb-8 pointer-events-none"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              className="w-1 h-2 bg-gray-400 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;
