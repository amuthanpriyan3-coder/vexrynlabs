import React from 'react';
import { ArrowUp, Instagram, Youtube, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { VexrynLogo } from './VexrynLogo';
import { navigateTo, RoutePath } from '../utils/navigation';

const transitionEase = [0.16, 1, 0.3, 1] as const;

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    navigateTo('/');
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetPath: RoutePath) => {
    e.preventDefault();
    navigateTo(targetPath);
  };


  return (
    <footer id="main-footer" className="bg-[#050505] text-gray-400 border-t border-[#1A1A1A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#1A1A1A]">
          
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <VexrynLogo size={34} showText={true} />
            </div>

            {/* Tagline */}
            <p className="font-display font-bold text-white text-base tracking-wide pt-2">
              “Design. Develop. Deliver.”
            </p>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              A technology studio building modern websites, mobile apps, AI, IoT, embedded systems, robotics and automation solutions.
            </p>

            {/* Operational Pulse */}
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2 h-2 bg-[#CCFF00] animate-pulse" />
              <span className="font-mono text-xs text-gray-400">
                All systems operational // Accepting projects
              </span>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
              <li>
                <a
                  href="/"
                  id="footer-link-home"
                  onClick={(e) => handleLinkClick(e, '/')}
                  className="text-gray-400 hover:text-[#CCFF00] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  id="footer-link-services"
                  onClick={(e) => handleLinkClick(e, '/services')}
                  className="text-gray-400 hover:text-[#CCFF00] transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  id="footer-link-projects"
                  onClick={(e) => handleLinkClick(e, '/projects')}
                  className="text-gray-400 hover:text-[#CCFF00] transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  id="footer-link-about"
                  onClick={(e) => handleLinkClick(e, '/about')}
                  className="text-gray-400 hover:text-[#CCFF00] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  id="footer-link-contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  className="text-gray-400 hover:text-[#CCFF00] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-4">
              Connect
            </h4>
            
            <div className="flex flex-col space-y-3 text-xs font-mono">
              <a
                href="https://www.instagram.com/vexrynlabs"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-instagram"
                className="inline-flex items-center gap-2.5 text-gray-400 hover:text-[#CCFF00] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#CCFF00]" />
                <span>Instagram</span>
              </a>

              <a
                href="https://youtube.com/@vexrynlabs"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-youtube"
                className="inline-flex items-center gap-2.5 text-gray-400 hover:text-[#CCFF00] transition-colors"
              >
                <Youtube className="w-4 h-4 text-[#CCFF00]" />
                <span>YouTube</span>
              </a>

              <a
                href="mailto:vexrynlabs@gmail.com"
                id="footer-social-email"
                className="inline-flex items-center gap-2.5 text-gray-400 hover:text-[#CCFF00] transition-colors pt-1"
              >
                <Mail className="w-4 h-4 text-[#CCFF00]" />
                <span className="font-mono text-xs">vexrynlabs@gmail.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} VEXRYN LABS. ALL RIGHTS RESERVED. DESIGN. DEVELOP. DELIVER.
          </div>

          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.03 }}
            type="button"
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] hover:bg-[#CCFF00] text-gray-400 hover:text-black border border-[#1A1A1A] hover:border-[#CCFF00] text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
};
