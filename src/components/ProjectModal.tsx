import React, { useEffect } from 'react';
import { X, ExternalLink, ArrowRight, CheckCircle, Layers, Cpu, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}

const modalEase = [0.16, 1, 0.3, 1] as const;

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onInquire }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          id="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            id="project-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: modalEase }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-[#1A1A1A] p-6 sm:p-8 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              type="button"
              id="close-project-modal-btn"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 bg-[#111111] hover:bg-[#1A1A1A] text-gray-400 hover:text-white transition-colors border border-[#222222] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Header Badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest bg-[#111111] text-[#CCFF00] border border-[#222222]">
                {project.categoryLabel}
              </span>
              <span className="font-mono text-xs text-gray-600">
                TECHNICAL SPECIFICATION
              </span>
            </div>

            {/* Project Title & Subtitle */}
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-3 h-[1px] bg-[#CCFF00]" />
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wide">
                {project.title}
              </h3>
            </div>
            <p className="text-xs font-mono text-gray-500 mb-6 uppercase tracking-wider">
              {project.subtitle}
            </p>

            {/* Project Visual Display */}
            <div className="relative overflow-hidden border border-[#1A1A1A] bg-[#050505] mb-8 aspect-video max-h-[340px]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-[#111111] border border-[#1A1A1A] mb-8">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="text-center">
                  <div className="font-mono font-bold text-lg sm:text-xl text-[#CCFF00]">
                    {m.value}
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Overview */}
            <div className="space-y-6 mb-8 text-sm sm:text-base text-gray-300 leading-relaxed">
              <div>
                <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#CCFF00]" />
                  Project Scope & Architecture
                </h4>
                <p className="text-sm text-gray-400 leading-relaxed">{project.fullOverview}</p>
              </div>

              <div>
                <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#CCFF00]" />
                  Engineering Deliverables
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 bg-[#CCFF00] shrink-0 mt-2" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#CCFF00]" />
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 bg-[#111111] text-gray-300 border border-[#1A1A1A] font-mono text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-6 border-t border-[#1A1A1A] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500 font-mono text-center sm:text-left">
                Ready to build something similar for your company?
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                id="modal-inquire-btn"
                onClick={() => {
                  onClose();
                  onInquire(project.title);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                <span>Request Similar Build</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
