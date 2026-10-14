import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { navLinks } from '@/data/site';
import { scrollToSection } from '@/lib/sectionScroll';

const desktopQuery = '(min-width: 1024px)';

function useDesktopNav() {
  const [desktop, setDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(desktopQuery).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return desktop;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const desktop = useDesktopNav();
  const reduceMotion = useReducedMotion();
  const location = useLocation();
  const onHome = location.pathname === '/';
  const solid = scrolled || !onHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (desktop) setIsOpen(false);
  }, [desktop]);

  const followSection = (event: { preventDefault: () => void }, href: string) => {
    setIsOpen(false);
    if (location.pathname !== href) return;
    event.preventDefault();
    scrollToSection(href === '/' ? 'home' : href.slice(1));
  };

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        aria-label="Sections"
        className={`pointer-events-auto mx-auto max-w-6xl border transition-colors duration-300 ${
          isOpen ? 'rounded-3xl' : 'rounded-full'
        } ${
          solid
            ? 'border-gray-800 bg-[#131417]/90 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-md'
            : 'border-white/10 bg-black/35 backdrop-blur-md'
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
          <Link
            to="/"
            onClick={(event) => followSection(event, '/')}
            className="shrink-0 rounded-full px-2 py-1 text-lg font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
          >
            Steve<span className="text-pink-500">Suico</span>
          </Link>

          {desktop ? (
            <div className="flex items-center gap-0.5">
              {navLinks.map((link) => {
                const active = location.pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={(event) => followSection(event, link.href)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative rounded-full px-3 py-1.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300 ${
                      active ? 'text-pink-100' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="section-pill"
                        className="absolute inset-0 rounded-full bg-pink-500/15 ring-1 ring-pink-400/40"
                        transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{link.name}</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          )}
        </div>

        <AnimatePresence>
          {!desktop && isOpen && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-1 px-3 pb-3">
                {navLinks.map((link) => {
                  const active = location.pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={(event) => followSection(event, link.href)}
                      aria-current={active ? 'page' : undefined}
                      className={`relative rounded-full px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300 ${
                        active ? 'text-pink-100' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="section-pill"
                          className="absolute inset-0 rounded-full bg-pink-500/15 ring-1 ring-pink-400/40"
                          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
