import React from 'react';
import { ArrowRight, ArrowUpRight, Terminal, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { VexrynLogo } from './VexrynLogo';

interface HeroProps {
  onStartProject: () => void;
  onViewWork: () => void;
}

const heroEase = [0.16, 1, 0.3, 1] as const;

export const Hero: React.FC<HeroProps> = ({ onStartProject, onViewWork }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#050505]"
    >
      {/* Subtle geometric background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Decorative skewed geometric lines from Sophisticated Dark design */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1.2, ease: heroEase }}
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-full h-full border-t border-r border-[#CCFF00] skew-x-[20deg]" />
        <div className="absolute top-8 right-8 w-full h-full border-t border-r border-[#CCFF00] skew-x-[20deg]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Brand Messaging with Sequential Staggered Entrance */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                },
              },
            }}
            className="lg:col-span-7 flex flex-col items-start z-10 text-left"
          >
            
            {/* Studio Eyebrow Tag */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -14 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: heroEase } },
              }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-4 h-[1px] bg-[#CCFF00]" />
              <span
                id="hero-studio-tag"
                className="text-[#CCFF00] text-xs font-bold uppercase tracking-[0.4em]"
              >
                VEXRYN LABS
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              id="hero-main-heading"
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: heroEase } },
              }}
              className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-white leading-[0.92] mb-6"
            >
              Design.<br />
              Develop.<br />
              <span className="text-[#CCFF00]">Deliver.</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              id="hero-supporting-text"
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: heroEase } },
              }}
              className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed max-w-xl mb-9"
            >
              We build modern digital experiences, powerful applications and smart automation solutions. Premium futuristic tech for industry leaders.
            </motion.p>

            {/* Call To Action Buttons */}
            <motion.div
              id="hero-cta-group"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: heroEase } },
              }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                whileTap={{ scale: 0.98 }}
                type="button"
                id="hero-view-work-btn"
                onClick={onViewWork}
                className="group inline-flex items-center justify-center gap-3 bg-[#CCFF00] text-black px-7 py-3.5 font-bold text-xs uppercase tracking-widest hover:bg-[#b8e600] transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]"
              >
                <span>View Our Work</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-black" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
                whileTap={{ scale: 0.98 }}
                type="button"
                id="hero-start-project-btn"
                onClick={onStartProject}
                className="group inline-flex items-center justify-center gap-3 border border-white text-white px-7 py-3.5 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-current transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.button>
            </motion.div>

            {/* Studio Capabilities Positioning */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: heroEase } },
              }}
              className="mt-12 pt-6 border-t border-[#1A1A1A] w-full"
            >
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 font-mono text-[11px] sm:text-xs text-gray-300">
                <span className="text-white font-medium">WEB</span>
                <span className="text-[#CCFF00] font-bold">•</span>
                <span className="text-white font-medium">APPS</span>
                <span className="text-[#CCFF00] font-bold">•</span>
                <span className="text-white font-medium">AI</span>
                <span className="text-[#CCFF00] font-bold">•</span>
                <span className="text-white font-medium">IoT</span>
                <span className="text-[#CCFF00] font-bold">•</span>
                <span className="text-white font-medium">EMBEDDED</span>
                <span className="text-[#CCFF00] font-bold">•</span>
                <span className="text-white font-medium">ROBOTICS</span>
                <span className="text-[#CCFF00] font-bold">•</span>
                <span className="text-white font-medium">AUTOMATION</span>
                <span className="text-[#CCFF00] font-bold">•</span>
                <span className="text-white font-medium">FINAL YEAR PROJECTS</span>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Hero Column: Subtle Futuristic Geometric V-Shaped Animated Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: heroEase, delay: 0.25 }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            
            {/* Outer Geometric Frame */}
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center bg-[#0A0A0A] border border-[#1A1A1A]">
              
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#CCFF00]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#222222]" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#222222]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#CCFF00]" />

              {/* HUD Coordinates */}
              <div className="absolute top-3 left-4 font-mono text-[10px] text-gray-500 tracking-[0.3em] uppercase select-none">
                SYS // VEXRYN-LABS
              </div>
              <div className="absolute bottom-3 right-4 font-mono text-[10px] text-gray-500 tracking-[0.3em] uppercase select-none">
                STATUS // READY
              </div>

              {/* Concentric Geometric Concentric Elements inspired by VEXRYN V-monogram */}
              <div className="relative w-[320px] h-[320px] flex items-center justify-center">
                
                {/* Rotating subtle outer orbital ring */}
                <svg
                  className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite] opacity-35 pointer-events-none"
                  viewBox="0 0 340 340"
                >
                  <circle
                    cx="170"
                    cy="170"
                    r="150"
                    fill="none"
                    stroke="#222222"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                  />
                  <circle
                    cx="170"
                    cy="170"
                    r="130"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="1"
                  />
                  <circle cx="170" cy="20" r="3" fill="#CCFF00" />
                  <circle cx="170" cy="320" r="2" fill="#444444" />
                </svg>

                {/* Second reverse ring */}
                <svg
                  className="absolute inset-0 w-full h-full animate-[spin_45s_linear_infinite_reverse] opacity-25 pointer-events-none"
                  viewBox="0 0 340 340"
                >
                  <circle
                    cx="170"
                    cy="170"
                    r="110"
                    fill="none"
                    stroke="#222222"
                    strokeWidth="1.5"
                    strokeDasharray="25 160"
                  />
                </svg>

                {/* Geometric V Contour Layers */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 340 340"
                >
                  <path
                    d="M 60 90 L 170 270 L 280 90"
                    fill="none"
                    stroke="#1A1A1A"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />

                  <path
                    d="M 80 105 L 170 250 L 260 105"
                    fill="none"
                    stroke="#222222"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M 100 120 L 170 230 L 240 120"
                    fill="none"
                    stroke="rgba(204,255,0,0.3)"
                    strokeWidth="1"
                  />

                  <line x1="40" y1="170" x2="300" y2="170" stroke="#161616" strokeWidth="1" />
                  <line x1="170" y1="40" x2="170" y2="300" stroke="#161616" strokeWidth="1" />
                </svg>

                {/* Central VEXRYN Iconic Monogram with subtle hover interaction */}
                <div className="relative z-10 w-44 h-44 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)] transition-transform duration-500 hover:scale-105">
                  <VexrynLogo size={176} showText={false} />
                  
                  {/* Pulsing core accent */}
                  <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-10 h-10 bg-[#CCFF00] opacity-20 blur-md rounded-full pointer-events-none animate-pulse" />
                </div>

                {/* Floating Status Badges with sharp borders */}
                <div className="absolute -bottom-3 left-4 bg-[#0A0A0A] border border-[#1A1A1A] px-3 py-1.5 text-[10px] font-mono text-gray-400 flex items-center gap-2 shadow-xl">
                  <Terminal className="w-3 h-3 text-[#CCFF00]" />
                  <span>OUTPUT // PROD_READY</span>
                </div>

                <div className="absolute -top-3 right-4 bg-[#0A0A0A] border border-[#1A1A1A] px-3 py-1.5 text-[10px] font-mono text-gray-400 flex items-center gap-2 shadow-xl">
                  <Sparkles className="w-3 h-3 text-[#CCFF00]" />
                  <span>PRECISION: 100%</span>
                </div>

              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
