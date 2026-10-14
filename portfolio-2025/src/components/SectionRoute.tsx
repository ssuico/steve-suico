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
    if (shouldSkipSectionScroll()) return;
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

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        if (sectionSpyLocked()) {
          ratios.clear();
          return;
        }

        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId = '';
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        const next = pageSections.find((section) => section.id === bestId);
        if (!next || next.path === window.location.pathname) return;

        skipNextSectionScroll();
        navigate(next.path, { replace: true });
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: [0.15, 0.35, 0.6] },
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
