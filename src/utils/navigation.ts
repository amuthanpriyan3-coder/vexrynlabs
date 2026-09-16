export type RoutePath = '/' | '/services' | '/projects' | '/about' | '/process' | '/contact';

export interface NavLinkItem {
  id: string;
  label: string;
  href: RoutePath;
}

export const NAV_LINKS: NavLinkItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'process', label: 'Process', href: '/process' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export function pathToSectionId(pathOrHash: string): string {
  if (!pathOrHash) return 'home';
  const clean = pathOrHash.replace(/^[#/]+/, '').toLowerCase().trim();
  if (!clean || clean === 'home') return 'home';
  if (clean.startsWith('service')) return 'services';
  if (clean.startsWith('project')) return 'projects';
  if (clean.startsWith('about')) return 'about';
  if (clean.startsWith('process')) return 'process';
  if (clean.startsWith('contact')) return 'contact';
  return 'home';
}

export function sectionIdToPath(sectionId: string): RoutePath {
  switch (sectionId) {
    case 'services':
      return '/services';
    case 'projects':
      return '/projects';
    case 'about':
      return '/about';
    case 'process':
      return '/process';
    case 'contact':
      return '/contact';
    case 'home':
    default:
      return '/';
  }
}

let isProgrammaticScrolling = false;
let programmaticScrollTimeout: ReturnType<typeof setTimeout> | null = null;

export function isNavigating(): boolean {
  return isProgrammaticScrolling;
}

export function scrollToSection(sectionId: string, smooth = true): void {
  if (typeof window === 'undefined') return;

  if (sectionId === 'home') {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    return;
  }

  const element = document.getElementById(sectionId);
  if (element) {
    const navOffset = 76;
    const rect = element.getBoundingClientRect();
    const targetY = Math.max(0, rect.top + window.scrollY - navOffset);
    window.scrollTo({
      top: targetY,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }
}

export function navigateTo(
  targetPathOrId: string,
  options?: { updateHistory?: boolean; smooth?: boolean; onComplete?: () => void }
): void {
  if (typeof window === 'undefined') return;

  const sectionId = pathToSectionId(targetPathOrId);
  const targetPath = sectionIdToPath(sectionId);
  const shouldUpdate = options?.updateHistory !== false;

  // 1. Immediately update browser URL without full page reload
  if (shouldUpdate && window.location.pathname !== targetPath) {
    window.history.pushState({ section: sectionId, path: targetPath }, '', targetPath);
  }

  // 2. Lock programmatic scrolling so scroll spy doesn't flicker while animating
  isProgrammaticScrolling = true;
  if (programmaticScrollTimeout) {
    clearTimeout(programmaticScrollTimeout);
  }
  programmaticScrollTimeout = setTimeout(() => {
    isProgrammaticScrolling = false;
  }, 900);

  // 3. Dispatch navigation event so Navbar & App stay strictly in sync
  window.dispatchEvent(
    new CustomEvent('vexryn:navigate', {
      detail: { sectionId, path: targetPath },
    })
  );

  // 4. Perform smooth scroll immediately
  scrollToSection(sectionId, options?.smooth !== false);

  // 5. Follow-up passes handle mobile viewport adjustments and drawer collapse
  requestAnimationFrame(() => {
    scrollToSection(sectionId, options?.smooth !== false);
  });
  setTimeout(() => {
    scrollToSection(sectionId, options?.smooth !== false);
    if (options?.onComplete) options.onComplete();
  }, 150);
}
