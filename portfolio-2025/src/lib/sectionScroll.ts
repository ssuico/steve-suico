const NAV_OFFSET = 80;

let skipScrollUntil = 0;
let spyLockedUntil = 0;
let scrollJob = 0;

export function skipNextSectionScroll() {
  skipScrollUntil = performance.now() + 80;
}

export function shouldSkipSectionScroll() {
  return performance.now() < skipScrollUntil;
}

export function sectionSpyLocked() {
  return performance.now() < spyLockedUntil;
}

export function holdSectionSpy(ms: number) {
  spyLockedUntil = Math.max(spyLockedUntil, performance.now() + ms);
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function alignSection(id: string, behavior: ScrollBehavior) {
  const top = id === 'home' ? 0 : sectionOffset(id);
  if (top === null) return false;
  window.scrollTo({ top, behavior });
  return true;
}

function sectionOffset(id: string) {
  const target = document.getElementById(id);
  if (!target) return null;
  return Math.max(0, target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);
}

export function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth') {
  const job = ++scrollJob;
  const mode: ScrollBehavior = prefersReducedMotion() || behavior === 'auto' ? 'instant' : 'smooth';
  holdSectionSpy(mode === 'smooth' ? 1400 : 600);

  const align = (how: ScrollBehavior) => {
    if (job !== scrollJob) return false;
    return alignSection(id, how);
  };

  if (!align(mode)) {
    window.setTimeout(() => align(mode), 50);
  }

  let settled = false;
  const started = performance.now();
  const settle = () => {
    if (job !== scrollJob || settled) return;
    settled = true;
    align('instant');
    holdSectionSpy(250);
  };

  if (mode === 'smooth') {
    window.addEventListener('scrollend', settle, { once: true });
    window.setTimeout(settle, 1100);
  } else {
    window.setTimeout(settle, 60);
  }

  const observer = new ResizeObserver(() => {
    if (job !== scrollJob || !settled || performance.now() - started > 2000) {
      observer.disconnect();
      return;
    }
    align('instant');
  });
  observer.observe(document.body);
  window.setTimeout(() => observer.disconnect(), 2000);
}
