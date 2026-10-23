import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pageSections, sectionFromPath } from '@/data/site';
import { holdSectionSpy, scrollToSection, sectionSpyLocked, shouldSkipSectionScroll, skipNextSectionScroll } from '@/lib/sectionScroll';

const SectionRoute = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const opened = useRef(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest('a');
      if (!link) return;
      const url = new URL(link.href, window.location.origin);
      if (url.origin !== window.location.origin || !sectionFromPath(url.pathname)) return;
      holdSectionSpy(1600);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const match = pageSections.find((section) => section.id === id);
      if (match) {
        navigate(match.path, { replace: true });
        return;
      }
    }

    const section = sectionFromPath(pathname);
    if (shouldSkipSectionScroll(pathname)) return;
    if (!section) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const behavior = opened.current ? 'smooth' : 'auto';
    opened.current = true;
    scrollToSection(section.id, behavior);
  }, [pathname, hash, navigate]);

  const tracking = sectionFromPath(pathname) !== null;

  useEffect(() => {
    if (!tracking) return;

    // A thin band at 35% of the viewport height. Sections are far taller than the band, so
    // intersection ratio is useless; the band only wakes the callback when a section edge
    // crosses it, and the active section is then read from geometry.
    const observer = new IntersectionObserver(
      () => {
        if (sectionSpyLocked()) return;

        const line = window.innerHeight * 0.35;
        let bestId = '';
        for (const section of pageSections) {
          const element = document.getElementById(section.id);
          if (element && element.getBoundingClientRect().top <= line) bestId = section.id;
        }

        const next = pageSections.find((section) => section.id === bestId);
        if (!next || next.path === window.location.pathname) return;

        skipNextSectionScroll(next.path);
        navigate(next.path, { replace: true });
      },
      { rootMargin: '-35% 0px -64% 0px', threshold: 0 },
    );

    pageSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tracking, navigate]);

  return null;
};

export default SectionRoute;
