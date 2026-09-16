import React from 'react';
import { Globe, Smartphone, Cpu, Check, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { servicesData } from '../data/services';

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

const transitionEase = [0.16, 1, 0.3, 1] as const;

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'globe':
        return <Globe className="w-6 h-6 text-[#CCFF00] stroke-[1.5]" />;
      case 'smartphone':
        return <Smartphone className="w-6 h-6 text-[#CCFF00] stroke-[1.5]" />;
      case 'cpu':
        return <Cpu className="w-6 h-6 text-[#CCFF00] stroke-[1.5]" />;
      default:
        return <Globe className="w-6 h-6 text-[#CCFF00] stroke-[1.5]" />;
    }
  };

  return (
    <section id="services" className="relative py-28 bg-[#050505] border-t border-[#1A1A1A]">
      {/* Background subtle dots */}
      <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

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
                Core Capabilities
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              What We Build
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-gray-400 max-w-md text-sm sm:text-base leading-relaxed">
            Tailored digital engineering designed to scale, perform under load, and elevate modern brands.
          </p>
        </motion.div>

        {/* 3 Premium Service Cards with Staggered Entrance & Elevation on Hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: transitionEase }}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: transitionEase } }}
              className="group relative flex flex-col justify-between p-8 bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#CCFF00] hover:shadow-[0_12px_30px_rgba(204,255,0,0.06)] transition-[border-color,box-shadow] duration-300"
            >
              <div>
                {/* Top Row: Index and Minimal Line Icon */}
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 bg-[#111111] border border-[#222222] group-hover:border-[#CCFF00]/40 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold text-gray-600 group-hover:text-[#CCFF00] transition-colors">
                    {service.number}
                  </span>
                </div>

                {/* Service Title with Accent Marker */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-[1px] bg-[#CCFF00]" />
                  <h3 className="font-display font-bold text-xl text-white tracking-wide uppercase">
                    {service.title}
                  </h3>
                </div>

                {/* Tagline */}
                <p className="text-[11px] font-mono text-[#CCFF00] mb-4 tracking-wider uppercase">
                  {service.tagline}
                </p>

                {/* Core Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                {/* Key Deliverables / Capabilities */}
                <div className="space-y-2.5 mb-8 pt-4 border-t border-[#1A1A1A]">
                  {service.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <Check className="w-3.5 h-3.5 text-[#CCFF00] shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Tech Stack Pills & CTA */}
              <div className="pt-6 border-t border-[#1A1A1A]">
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono bg-[#111111] text-gray-400 border border-[#1A1A1A]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  id={`service-inquire-btn-${service.id}`}
                  onClick={() => onSelectService && onSelectService(service.title)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#111111] border border-[#222222] group-hover:bg-[#CCFF00] text-white group-hover:text-black font-bold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer"
                >
                  <span>Inquire for {service.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
