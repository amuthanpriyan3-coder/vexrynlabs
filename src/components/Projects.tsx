import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../data/projects';
import { ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  onInquireProject: (projectName: string) => void;
}

const transitionEase = [0.16, 1, 0.3, 1] as const;

export const Projects: React.FC<ProjectsProps> = ({ onInquireProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = [
    { id: 'all', label: 'ALL PROJECTS' },
    { id: 'web', label: 'WEB' },
    { id: 'mobile', label: 'MOBILE' },
    { id: 'automation', label: 'AUTOMATION' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-28 bg-[#050505] border-t border-[#1A1A1A]">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: transitionEase }}
          className="flex flex-col lg:flex-row lg:items-end justify-between pb-8 border-b border-[#1A1A1A] gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-4 h-[1px] bg-[#CCFF00]" />
              <span className="text-[#CCFF00] text-[10px] uppercase font-bold tracking-[0.3em]">
                OUR WORK
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Selected Projects
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl font-normal leading-relaxed">
              From digital experiences to intelligent systems, we build technology around real-world needs.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.96 }}
                type="button"
                id={`filter-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#CCFF00] text-black shadow-sm'
                    : 'bg-[#111111] text-gray-400 hover:text-white border border-[#1A1A1A] hover:border-[#333333]'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Studio Domains Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: transitionEase }}
          className="mt-6 mb-12 py-3 px-4 sm:px-6 bg-[#0A0A0A] border border-[#1A1A1A] flex items-center justify-between overflow-x-auto scrollbar-none gap-4"
        >
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 bg-[#CCFF00] animate-pulse" />
            <span className="text-[10px] font-mono uppercase font-bold text-[#CCFF00] tracking-widest">
              CAPABILITIES:
            </span>
          </div>
          <div className="text-[11px] font-mono text-gray-400 tracking-wider whitespace-nowrap flex items-center gap-3">
            <span>WEB</span>
            <span className="text-[#333333]">•</span>
            <span>APPS</span>
            <span className="text-[#333333]">•</span>
            <span>AI</span>
            <span className="text-[#333333]">•</span>
            <span>IoT</span>
            <span className="text-[#333333]">•</span>
            <span>EMBEDDED</span>
            <span className="text-[#333333]">•</span>
            <span>ROBOTICS</span>
            <span className="text-[#333333]">•</span>
            <span>AUTOMATION</span>
            <span className="text-[#333333]">•</span>
            <span className="text-white font-semibold">FINAL YEAR PROJECTS</span>
          </div>
        </motion.div>

        {/* Project Cards Grid with Staggered Scroll Reveal & Hover Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                id={`project-card-${project.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: transitionEase }}
                whileHover={{ y: -5, transition: { duration: 0.25, ease: transitionEase } }}
                className="group flex flex-col justify-between bg-[#0A0A0A] border border-[#1A1A1A] hover:border-[#CCFF00] hover:shadow-[0_12px_30px_rgba(204,255,0,0.06)] transition-[border-color,box-shadow] duration-300"
              >
                <div>
                  {/* Project Visual / Mockup Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A0A0A] border-b border-[#1A1A1A]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#050505]/95 backdrop-blur-md text-[#CCFF00] border border-[#222222]">
                        {project.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Project Title */}
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className="w-3 h-[1px] bg-[#CCFF00]" />
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-[#CCFF00] transition-colors uppercase tracking-wide">
                        {project.title}
                      </h3>
                    </div>

                    {/* Subtitle / Focus */}
                    <p className="text-[11px] font-mono text-gray-500 mb-3">
                      {project.subtitle}
                    </p>

                    {/* Short Professional Description */}
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-mono bg-[#111111] text-gray-300 border border-[#1A1A1A]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 pb-6 pt-2">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                    type="button"
                    id={`view-project-btn-${project.id}`}
                    onClick={() => setActiveModalProject(project)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#111111] hover:bg-[#CCFF00] text-white hover:text-black font-bold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer border border-[#222222] hover:border-[#CCFF00]"
                  >
                    <span>VIEW PROJECT</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Callout Section with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: transitionEase }}
          className="mt-20 p-8 sm:p-12 bg-[#0A0A0A] border border-[#1A1A1A] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
              <div className="w-3 h-[1px] bg-[#CCFF00]" />
              <span className="text-[#CCFF00] text-[10px] font-mono uppercase font-bold tracking-[0.25em]">
                Have an idea?
              </span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Let's build it together.
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl">
              Partner with VEXRYN LABS to design, engineer, and deploy your web, mobile, or hardware automation project.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: transitionEase } }}
            whileTap={{ scale: 0.98 }}
            href="/contact"
            id="projects-cta-start-btn"
            onClick={(e) => {
              e.preventDefault();
              onInquireProject('New Project');
              setTimeout(() => {
                const input = document.getElementById('contact-name-input');
                if (input) input.focus();
              }, 300);
            }}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl shrink-0 touch-manipulation"
            style={{ touchAction: 'manipulation' }}
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </motion.a>
        </motion.div>

        {/* Project Modal Dialog */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
          onInquire={onInquireProject}
        />

      </div>
    </section>
  );
};
