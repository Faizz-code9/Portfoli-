import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/portfolioData';
import { ChevronLeft, ChevronRight, Check, Eye } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { ProjectModal } from './ProjectModal';

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const currentProject = projectsData[currentIndex];

  const nextProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % projectsData.length);
    setTimeout(() => setIsTransitioning(false), 450);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
    setTimeout(() => setIsTransitioning(false), 450);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning]);

  // 3D Tilt calculation on mockup card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x: x * 6, y: -y * 6 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
          Featured Work
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold mt-4 tracking-tight">
          Featured Projects
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
          Explore interactive applications built with cutting-edge AI, embedded security, and scalable architectures.
        </p>
      </motion.div>

      {/* Main Project Showcase Layout (Matches Reference Screenshot) */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* ─── LEFT COLUMN: Project Mockup Preview with Nav Arrows ─── */}
            <div className="lg:col-span-6 relative">
              {/* Outer Card with subtle glow & tilt */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setSelectedProject(currentProject)}
                style={{
                  transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
                  transition: 'transform 0.15s ease-out',
                }}
                className="relative rounded-3xl overflow-hidden border border-white/20 bg-[#0B0F1C] shadow-2xl group cursor-pointer aspect-[16/10]"
              >
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle dark ambient gradient hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                {/* Minimal preview indicator badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] text-gray-200 font-medium">
                  Click to Expand ✦
                </div>
              </div>

              {/* Prev Project Arrow Button (<) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevProject();
                }}
                aria-label="Previous project"
                className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-black/95 border border-white/25 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl z-20 backdrop-blur-md cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Next Project Arrow Button (>) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextProject();
                }}
                aria-label="Next project"
                className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/80 hover:bg-black/95 border border-white/25 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl z-20 backdrop-blur-md cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* ─── RIGHT COLUMN: Project Details & Tech Stack ─── */}
            <div className="lg:col-span-6 space-y-6">
              {/* Category Pill Badge */}
              <div>
                <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-300 border border-cyan-500/40 bg-cyan-500/10">
                  {currentProject.category}
                </span>
              </div>

              {/* Main Heading */}
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {currentProject.title}
              </h3>

              {/* Subtitle / Description */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {currentProject.description}
              </p>

              {/* Key Features List with Cyan Checkmark Badges */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                  KEY FEATURES
                </div>
                <div className="space-y-2.5">
                  {currentProject.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-200">
                      <div className="w-4 h-4 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center shrink-0">
                        <Check size={10} className="text-cyan-400 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-2">
                <div className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-3">
                  TECH STACK
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {currentProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-medium text-gray-300 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Live Preview & GitHub */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 text-sm cursor-pointer"
                >
                  <Eye size={17} />
                  <span>Live Preview</span>
                </a>
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all hover:scale-105 active:scale-95 text-sm cursor-pointer"
                >
                  <FaGithub size={17} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {projectsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to project ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex ? 'w-8 bg-cyan-400' : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Deep Zoom Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

