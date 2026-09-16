import React from 'react';
import { Compass, Layout, Code, Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { processSteps } from '../data/process';

const transitionEase = [0.16, 1, 0.3, 1] as const;

export const Process: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'compass':
        return <Compass className="w-5 h-5 text-[#CCFF00]" />;
      case 'layout':
        return <Layout className="w-5 h-5 text-[#CCFF00]" />;
      case 'code':
        return <Code className="w-5 h-5 text-[#CCFF00]" />;
      case 'rocket':
        return <Rocket className="w-5 h-5 text-[#CCFF00]" />;
      default:
        return <Compass className="w-5 h-5 text-[#CCFF00]" />;
    }
  };

  return (
    <section id="process" className="relative py-28 bg-[#050505] border-t border-[#1A1A1A]">
      {/* Background accents */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: transitionEase }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#1A1A1A]"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-[1px] bg-[#CCFF00]" />
              <span className="text-[#CCFF00] text-[10px] uppercase font-bold tracking-[0.3em]">
                How We Work
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Engineering Process
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-gray-400 max-w-md text-sm sm:text-base leading-relaxed">
            A clear and collaborative process that takes your idea from concept to a working digital or technology solution.
          </p>
        </motion.div>

        {/* 4 Process Steps Grid with Staggered Scroll Reveal & Hover Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              id={`process-step-${step.number}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: transitionEase }}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: transitionEase } }}
              className="group relative flex flex-col justify-between p-7 bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#CCFF00] hover:shadow-[0_12px_30px_rgba(204,255,0,0.06)] transition-[border-color,box-shadow] duration-300"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-[#111111] border border-[#222222] group-hover:border-[#CCFF00]/40 transition-colors">
                    {getStepIcon(step.iconName)}
                  </div>
                  <span className="font-mono text-sm font-bold text-gray-600 group-hover:text-[#CCFF00] transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Step Title with Accent Marker */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-[1px] bg-[#CCFF00]" />
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-6 font-normal">
                  {step.description}
                </p>

                {/* Phase Milestones */}
                <div className="space-y-2 pt-4 border-t border-[#1A1A1A]">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1 h-1 bg-[#CCFF00]" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step indicator footer */}
              <div className="mt-8 pt-4 border-t border-[#1A1A1A] flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>PHASE {step.number} // 04</span>
                <span className="group-hover:text-[#CCFF00] transition-colors">ACTIVE</span>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};
