import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Server, 
  Database, 
  Wrench, 
  Sparkles, 
  CheckCircle, 
  Zap, 
  Globe, 
  FileCode, 
  FileCode2, 
  Palette, 
  Layout, 
  Cpu, 
  Terminal, 
  Network, 
  ShieldCheck, 
  HardDrive, 
  Cloud, 
  CloudSun, 
  Box, 
  GitBranch, 
  Send, 
  RefreshCw 
} from 'lucide-react';
import { FigmaIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

const skillIconMap = {
  Code2,
  Globe,
  FileCode,
  FileCode2,
  Palette,
  Layout,
  Sparkles,
  Layers,
  Server,
  Cpu,
  Terminal,
  Network,
  ShieldCheck,
  Zap,
  Database,
  HardDrive,
  Cloud,
  CloudSun,
  Box,
  GitBranch,
  Send,
  Figma: FigmaIcon,
  CheckCircle,
  RefreshCw
};

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...portfolioData.skillCategories.map((c) => c.category)];

  const filteredSkills =
    activeCategory === 'All'
      ? portfolioData.skillCategories.flatMap((c) => c.skills)
      : portfolioData.skillCategories.find((c) => c.category === activeCategory)?.skills || [];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs sm:text-sm font-medium">
            <Zap className="w-3.5 h-3.5" />
            <span>Tech Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-heading">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            A battle-tested stack of modern frameworks, cloud tools, and design technologies.
          </p>
        </div>

        {/* Infinite Tech Stack Marquee Ribbon */}
        <div className="relative w-full overflow-hidden py-4 mb-16 border-y border-white/10 bg-white/[0.02] backdrop-blur-md">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080B16] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080B16] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee gap-8 items-center">
            {[...portfolioData.marqueeTechs, ...portfolioData.marqueeTechs].map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-200 text-sm font-semibold whitespace-nowrap shadow-sm hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30 scale-105'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSkills.map((skill, idx) => {
            const IconComp = skillIconMap[skill.icon] || Code2;
            return (
              <div
                key={`${skill.name}-${idx}`}
                className="glass-card glass-card-hover p-5 rounded-2xl border border-white/10 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: skill.color }}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-cyan-300 transition-colors">
                    {skill.level}%
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 font-heading tracking-wide">
                  {skill.name}
                </h3>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-700 ease-out group-hover:brightness-125"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
export default Skills;
