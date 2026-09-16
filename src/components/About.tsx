import React from 'react';
import { Lightbulb, Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { VexrynLogo } from './VexrynLogo';

const transitionEase = [0.16, 1, 0.3, 1] as const;

export const About: React.FC = () => {
  const pillars = [
    {
      id: 'creative',
      title: 'Creative',
      subtitle: 'Original Design Direction',
      description: 'Zero cookie-cutter templates. Every layout, typography scale, and micro-interaction is custom crafted for your brand presence.',
      highlight: '100% Bespoke',
      icon: <Lightbulb className="w-5 h-5 text-[#CCFF00]" />,
    },
    {
      id: 'modern',
      title: 'Modern',
      subtitle: 'Production-Grade Tech',
      description: 'Built with React, TypeScript, high-speed API backends, and lightweight cloud runtimes engineered for lightning execution.',
      highlight: 'Cutting-Edge',
      icon: <Zap className="w-5 h-5 text-[#CCFF00]" />,
    },
    {
      id: 'reliable',
      title: 'Reliable',
      subtitle: 'Engineered for Longevity',
      description: 'Battle-tested architecture, rigorous type-safety, and automated workflows designed to operate seamlessly without continuous maintenance.',
      highlight: 'Zero Compromises',
      icon: <ShieldCheck className="w-5 h-5 text-[#CCFF00]" />,
    },
  ];

  return (
    <section id="about" className="relative py-28 bg-[#050505] border-t border-[#1A1A1A]">
      {/* Background accents */}
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Section with Scroll Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: transitionEase }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-[1px] bg-[#CCFF00]" />
              <span className="text-[#CCFF00] text-[10px] uppercase font-bold tracking-[0.3em]">
                Studio Philosophy
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.05] mb-8">
              Built for Ideas That Matter.
            </h2>

            <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed mb-8">
              VEXRYN LABS is a digital technology studio focused on turning ideas into practical, modern and reliable digital products.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-gray-400">
              <div className="flex items-center gap-3 p-3.5 bg-[#0A0A0A] border border-[#1A1A1A]">
                <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>Transparent timelines & fixed milestones</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-[#0A0A0A] border border-[#1A1A1A]">
                <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>Full code ownership & pristine repositories</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-[#0A0A0A] border border-[#1A1A1A]">
                <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>Mobile-first & accessibility compliant</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-[#0A0A0A] border border-[#1A1A1A]">
                <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                <span>Direct communication with engineers</span>
              </div>
            </div>
          </motion.div>

          {/* Right Brand Badge / Metrics & Studio Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: transitionEase }}
            className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center"
          >
            
            <div className="relative w-full p-8 bg-[#0A0A0A] border border-[#1A1A1A] shadow-2xl">
              {/* Corner tech marks */}
              <div className="absolute top-2 left-2 font-mono text-[9px] text-gray-600">VXR // STUDIO</div>
              <div className="absolute bottom-2 right-2 font-mono text-[9px] text-gray-600">SYS.VER 2.4</div>

              <div className="flex flex-col items-center text-center pt-2">
                <div className="mb-6 p-4 bg-[#050505] border border-[#1A1A1A]">
                  <VexrynLogo size={64} showText={false} />
                </div>

                <div className="font-display font-bold text-2xl text-white tracking-widest uppercase mb-1">
                  VEXRYN <span className="text-[#CCFF00] font-light">LABS</span>
                </div>
                <div className="font-mono text-[10px] text-[#CCFF00] uppercase tracking-[0.3em] mb-5">
                  Design. Develop. Deliver.
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  Operating at the intersection of minimalist aesthetic craft and rigorous engineering discipline.
                </p>

                <div className="w-full pt-4 border-t border-[#1A1A1A] flex justify-between text-[10px] font-mono text-gray-500">
                  <span>FOUNDED: 2026</span>
                  <span>GLOBAL REMOTE</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Bar from Sophisticated Dark Layout */}
            <div className="bg-[#111111] border border-[#1A1A1A] p-4 flex justify-around items-center">
              <div className="text-center">
                <div className="text-xl font-bold text-[#CCFF00]">100%</div>
                <div className="text-[9px] uppercase tracking-widest text-gray-400">Reliable</div>
              </div>
              <div className="h-8 w-[1px] bg-[#222222]" />
              <div className="text-center">
                <div className="text-xl font-bold text-[#CCFF00]">24/7</div>
                <div className="text-[9px] uppercase tracking-widest text-gray-400">Support</div>
              </div>
              <div className="h-8 w-[1px] bg-[#222222]" />
              <div className="text-center">
                <div className="text-xl font-bold text-[#CCFF00]">0.9s</div>
                <div className="text-[9px] uppercase tracking-widest text-gray-400">Load Time</div>
              </div>
            </div>

          </motion.div>

        </div>

        {/* 3 Core Pillars with Scroll Reveal & Hover Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              id={`stat-card-${pillar.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: transitionEase }}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: transitionEase } }}
              className="group p-8 bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#CCFF00] hover:shadow-[0_12px_30px_rgba(204,255,0,0.06)] transition-[border-color,box-shadow] duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-[#111111] border border-[#222222] group-hover:border-[#CCFF00]/40 transition-colors">
                  {pillar.icon}
                </div>
                <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#111111] text-[#CCFF00] border border-[#1A1A1A]">
                  {pillar.highlight}
                </span>
              </div>

              {/* Pillar Title with Accent Marker */}
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-3 h-[1px] bg-[#CCFF00]" />
                <h3 className="font-display font-bold text-2xl text-white tracking-wide uppercase">
                  {pillar.title}
                </h3>
              </div>
              
              <div className="text-[11px] font-mono text-gray-500 uppercase tracking-widest mb-4">
                {pillar.subtitle}
              </div>

              <p className="text-sm text-gray-400 leading-relaxed font-normal">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
