import React from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../data/portfolioData';
import { Briefcase, Laptop, Layers, Terminal } from 'lucide-react';

const icons = [
  <Laptop className="w-5 h-5 text-cyan-400" />,
  <Layers className="w-5 h-5 text-emerald-400" />,
  <Briefcase className="w-5 h-5 text-purple-400" />,
  <Terminal className="w-5 h-5 text-amber-400" />,
];

export function Experience() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          Career Journey
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold mt-4 tracking-tight">
          Work Experience & Roles
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
          A track record of engineering scalable frontend architectures, high-traffic APIs, and delightful web animations.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Center Vertical Timeline Bar */}
        <div className="pointer-events-none absolute left-4 sm:left-6 lg:left-1/2 top-0 -translate-x-1/2 h-full w-0.5">
          <div
            className="h-full w-full"
            style={{
              background:
                'linear-gradient(180deg, rgba(34,211,238,0) 0%, rgba(34,211,238,0.5) 10%, rgba(168,85,247,0.5) 90%, rgba(168,85,247,0) 100%)',
            }}
          />
        </div>

        {/* Timeline Items */}
        <div className="space-y-12 sm:space-y-16">
          {experienceData.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8 pl-12 sm:pl-16 lg:pl-0 ${
                  isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >
                {/* Milestone Node Icon on Timeline */}
                <div className="absolute left-4 sm:left-6 lg:left-1/2 -translate-x-1/2 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0d0e1a] border-2 border-white/30 backdrop-blur-md shadow-lg shadow-cyan-500/20 z-10">
                  {icons[idx % icons.length]}
                </div>

                {/* Card Container */}
                <div className="bg-white/5 border border-white/15 rounded-2xl p-5 sm:p-7 backdrop-blur-xl w-full lg:w-[calc(50%-2.5rem)] transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 text-cyan-300">
                      {exp.year}
                    </span>
                    <span className="text-sm font-semibold text-gray-400">
                      {exp.company}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {exp.role}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-neutral-300 font-medium whitespace-nowrap"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
