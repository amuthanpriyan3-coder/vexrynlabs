import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VexrynLogo } from './VexrynLogo';
import {
  NAV_LINKS,
  navigateTo,
  pathToSectionId,
  sectionIdToPath,
  isNavigating,
  RoutePath,
} from '../utils/navigation';

interface NavbarProps {
  onStartProjectClick?: () => void;
  onViewWorkClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartProjectClick, onViewWorkClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: RoutePath) => {
    e.preventDefault();
    e.stopPropagation();
    // 1. Immediately trigger navigation and smooth scroll
    navigateTo(href);
    // 2. Close mobile menu immediately
    setMobileMenuOpen(false);
  };

  const handleStartProject = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigateTo('/contact');
    setMobileMenuOpen(false);
    if (onStartProjectClick) {
      onStartProjectClick();
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigateTo('/');
    setMobileMenuOpen(false);
  };

  // Synchronize with browser back/forward and initial URL path or anchor hash
  useEffect(() => {
    const handleInitialLocation = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      const target = pathname && pathname !== '/' ? pathname : hash || '/';
      const sectionId = pathToSectionId(target);
      setActiveSection(sectionId);

      if (sectionId !== 'home') {
        setTimeout(() => {
          navigateTo(sectionIdToPath(sectionId), { updateHistory: false });
        }, 150);
      }
    };

    handleInitialLocation();

    const handlePopState = () => {
      setMobileMenuOpen(false);
      const sectionId = pathToSectionId(window.location.pathname || window.location.hash);
      setActiveSection(sectionId);
      navigateTo(sectionIdToPath(sectionId), { updateHistory: false });
    };

    const handleAppNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<{ sectionId: string; path: string }>;
      if (customEvent.detail?.sectionId) {
        setActiveSection(customEvent.detail.sectionId);
      }
      setMobileMenuOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('vexryn:navigate', handleAppNavigate);

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('vexryn:navigate', handleAppNavigate);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update active section on scroll (scroll spy)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Do not override active section while programmatic scroll animation is executing
      if (isNavigating()) return;

      // Bottom boundary check
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // Top boundary check
      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      const sections = ['home', 'services', 'projects', 'about', 'process', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - 100;
          if (window.scrollY >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#222222] py-3.5 shadow-2xl'
          : 'bg-transparent border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo on the left */}
        <a
          href="/"
          id="nav-logo"
          onClick={handleLogoClick}
          className="group flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] rounded cursor-pointer select-none"
          aria-label="VEXRYN LABS Home"
        >
          <VexrynLogo size={36} showText={true} animated={true} />
        </a>

        {/* Desktop Navigation */}
        <nav
          id="desktop-navigation"
          className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-gray-400"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors duration-200 relative py-1 cursor-pointer ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-[#CCFF00]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#CCFF00] shadow-[0_0_8px_rgba(204,255,0,0.5)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
            whileTap={{ scale: 0.98 }}
            type="button"
            id="nav-start-project-btn"
            onClick={handleStartProject}
            className="group relative inline-flex items-center gap-2 bg-transparent border border-[#CCFF00] text-[#CCFF00] px-4 py-2 text-[10px] uppercase font-bold tracking-widest hover:bg-[#CCFF00] hover:text-black transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden items-center">
          <motion.button
            whileTap={{ scale: 0.94 }}
            type="button"
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded text-gray-400 hover:text-white hover:bg-[#111111] border border-[#222222] transition-colors focus:outline-none focus:ring-1 focus:ring-[#CCFF00] cursor-pointer touch-manipulation"
            style={{ touchAction: 'manipulation' }}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#CCFF00]" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[#0A0A0A] border-b border-[#222222] px-6 py-6 touch-manipulation relative z-50 pointer-events-auto"
            style={{ touchAction: 'manipulation' }}
          >
            <div className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    id={`mobile-nav-link-${link.id}`}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`w-full block text-xs uppercase tracking-widest font-medium py-3 px-3.5 transition-colors flex items-center justify-between cursor-pointer select-none touch-manipulation min-h-[44px] ${
                      isActive
                        ? 'bg-[#111111] text-[#CCFF00] font-bold border-l-2 border-[#CCFF00]'
                        : 'text-gray-400 hover:text-white hover:bg-[#0E0E0E] active:bg-[#141414]'
                    }`}
                    style={{ touchAction: 'manipulation' }}
                  >
                    <span className="pointer-events-none">{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 bg-[#CCFF00] pointer-events-none" />}
                  </a>
                );
              })}

              <div className="pt-4 border-t border-[#1A1A1A]">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  id="mobile-start-project-btn"
                  onClick={handleStartProject}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#b8e600] active:bg-[#a6d100] transition-colors cursor-pointer select-none touch-manipulation min-h-[44px]"
                  style={{ touchAction: 'manipulation' }}
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

