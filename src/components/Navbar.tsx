import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VexrynLogo } from './VexrynLogo';

interface NavbarProps {
  onStartProjectClick?: () => void;
  onViewWorkClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartProjectClick, onViewWorkClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Process', href: '#process', id: 'process' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const scrollToSection = (targetId: string, updateHistory = true) => {
    const cleanId = targetId.replace('#', '') || 'home';

    // 1. Immediately close mobile menu
    setMobileMenuOpen(false);

    // 2. Set active section immediately for responsive visual feedback
    setActiveSection(cleanId);

    // 3. Update browser history if requested for back/forward navigation
    if (updateHistory) {
      const newHash = cleanId === 'home' ? '#home' : `#${cleanId}`;
      if (window.location.hash !== newHash) {
        window.history.pushState({ section: cleanId }, '', newHash);
      }
    }

    // 4. Perform smooth scroll
    const performScroll = () => {
      if (cleanId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const element = document.getElementById(cleanId);
      if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = Math.max(0, elementPosition - navHeight);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    };

    performScroll();

    // Secondary frame execution ensures mobile viewport settles if menu collapse causes reflow
    requestAnimationFrame(() => {
      performScroll();
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href, true);
  };

  const handleStartProject = () => {
    scrollToSection('contact', true);
    if (onStartProjectClick) {
      onStartProjectClick();
    }
  };

  // Synchronize with browser back/forward and initial anchor hash
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validSections = ['home', 'services', 'projects', 'about', 'process', 'contact'];
      if (hash && validSections.includes(hash)) {
        scrollToSection(hash, false);
      } else if (!hash) {
        scrollToSection('home', false);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    if (window.location.hash) {
      const initialHash = window.location.hash.replace('#', '');
      const validSections = ['home', 'services', 'projects', 'about', 'process', 'contact'];
      if (validSections.includes(initialHash)) {
        setTimeout(() => {
          scrollToSection(initialHash, false);
        }, 150);
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

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
          href="#home"
          id="nav-logo"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] rounded"
          aria-label="VEXRYN LABS Home"
        >
          <VexrynLogo size={36} showText={true} animated={true} />
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-navigation" className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-gray-400" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`transition-colors duration-200 relative py-1 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-[#CCFF00]'
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
            className="p-2.5 rounded text-gray-400 hover:text-white hover:bg-[#111111] border border-[#222222] transition-colors focus:outline-none focus:ring-1 focus:ring-[#CCFF00]"
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
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[#0A0A0A] border-b border-[#222222] px-6 py-6"
          >
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    id={`mobile-nav-link-${link.id}`}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-xs uppercase tracking-widest font-medium py-2.5 px-3 transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#111111] text-[#CCFF00] font-bold border-l-2 border-[#CCFF00]'
                        : 'text-gray-400 hover:text-white hover:bg-[#0E0E0E]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 bg-[#CCFF00]" />}
                  </a>
                );
              })}

              <div className="pt-4 border-t border-[#1A1A1A]">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  id="mobile-start-project-btn"
                  onClick={handleStartProject}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#b8e600] transition-colors"
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
