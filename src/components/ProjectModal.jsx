import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-3xl w-full rounded-3xl border border-white/20 bg-[#0d0e1a] shadow-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Category & Title */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="px-3 py-0.5 rounded-full text-xs font-bold uppercase text-black"
              style={{
                background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
              }}
            >
              {project.category}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {project.title}
          </h3>

          {/* Project Large Screenshot */}
          <div className="rounded-2xl overflow-hidden border border-white/15 mb-6 bg-black/50 aspect-[16/9]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Feature Highlights */}
          <div className="mb-6 space-y-2.5 p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <Sparkles size={14} className="text-cyan-400" />
              Core Architecture & Highlights
            </div>
            {project.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200">
                <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="mb-6">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">
              Technologies Used
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-black bg-white hover:bg-cyan-400 transition-colors text-sm"
            >
              <span>Visit Live Application</span>
              <ExternalLink size={16} />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white border border-white/20 hover:bg-white/10 transition-colors text-sm"
            >
              <FaGithub size={16} />
              <span>GitHub Repository</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
