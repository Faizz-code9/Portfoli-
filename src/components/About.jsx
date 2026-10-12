import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { educationData, achievementsData, heroData } from '../data/portfolioData';
import { FaReact, FaPython, FaLinux, FaDocker, FaJs } from 'react-icons/fa';
import { SiCplusplus, SiTailwindcss, SiPostgresql } from 'react-icons/si';

const orbitSkills = [
  { Icon: FaPython, color: '#38BDF8', bg: '#0284C7' },
  { Icon: SiTailwindcss, color: '#22D3EE', bg: '#0EA5E9' },
  { Icon: SiCplusplus, color: '#38BDF8', bg: '#0369A1' },
  { Icon: FaReact, color: '#61DAFB', bg: '#0284C7' },
  { Icon: FaDocker, color: '#F97316', bg: '#EA580C' },
  { Icon: FaJs, color: '#FACC15', bg: '#CA8A04' },
  { Icon: SiPostgresql, color: '#4ADE80', bg: '#16A34A' },
  { Icon: FaLinux, color: '#93C5FD', bg: '#2563EB' },
];

export function About() {
  const [activeTab, setActiveTab] = useState('education'); // 'education' | 'achievements'
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-400">
          About Me
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold mt-4 tracking-tight">
          Engineering Secure & Intelligent Systems
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
          {heroData.bio}
        </p>
      </motion.div>

      {/* ─── 2-COLUMN MAIN GRID: Left = Revolving Avatar, Right = Education & Achievements ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* ═══════════════ LEFT COLUMN: Revolving Profile Avatar ═══════════════ */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center py-4 sm:py-6"
          >
            <div className="relative w-64 h-64 sm:w-[24rem] sm:h-[24rem] md:w-[26rem] md:h-[26rem] flex items-center justify-center">
              {/* Background ambient radial glow */}
              <div className="absolute inset-2 bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-purple-600/25 rounded-full blur-3xl pointer-events-none" />

              {/* Circular Orbit Track Line */}
              <div className="absolute w-56 h-56 sm:w-[20rem] sm:h-[20rem] md:w-[22rem] md:h-[22rem] rounded-full border border-white/15 pointer-events-none" />

              {/* 360° Continuously Revolving Orbit Container */}
              <div className="absolute w-56 h-56 sm:w-[20rem] sm:h-[20rem] md:w-[22rem] md:h-[22rem] rounded-full animate-orbit">
                {orbitSkills.map((item, idx) => {
                  const angle = (360 / orbitSkills.length) * idx;
                  const radius = isMobile ? 112 : 160;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  const badgeSize = isMobile ? 36 : 46;
                  const iconSize = isMobile ? 16 : 20;

                  return (
                    <div
                      key={idx}
                      className="absolute rounded-full bg-[#121729]/95 border border-white/20 flex items-center justify-center shadow-xl shadow-black/70 hover:scale-110 transition-transform"
                      style={{
                        width: `${badgeSize}px`,
                        height: `${badgeSize}px`,
                        top: `calc(50% + ${y}px - ${badgeSize / 2}px)`,
                        left: `calc(50% + ${x}px - ${badgeSize / 2}px)`,
                      }}
                    >
                      {/* Counter-rotation to keep the icon upright as it travels */}
                      <div className="animate-orbit-counter flex items-center justify-center">
                        <item.Icon size={iconSize} color={item.color} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Profile Avatar */}
              <div className="relative z-10 w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_40px_rgba(34,211,238,0.35)]">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0A0D1A] border-2 border-white/15 shadow-2xl">
                  <img
                    src={heroData.photoUrl}
                    alt={heroData.name}
                    className="w-full h-full object-cover object-[68%_16%]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════ RIGHT COLUMN: Education & Achievements Card ═══════════════ */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-[#0E1322]/85 backdrop-blur-2xl p-6 sm:p-7 relative overflow-hidden shadow-2xl shadow-black/50"
          >
            {/* Tab Headers */}
            <div className="relative border-b border-white/10 pb-4 flex items-center justify-around mb-6">
              <button
                onClick={() => setActiveTab('education')}
                className={`flex items-center gap-2 text-sm sm:text-base font-bold transition-all cursor-pointer ${
                  activeTab === 'education' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="text-lg">🎓</span>
                <span>Education</span>
              </button>

              <button
                onClick={() => setActiveTab('achievements')}
                className={`flex items-center gap-2 text-sm sm:text-base font-bold transition-all cursor-pointer ${
                  activeTab === 'achievements' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="text-lg">🏆</span>
                <span>Achievements</span>
              </button>

              {/* Active Sliding Glowing Underline with glowing orb bead */}
              <motion.div
                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                initial={false}
                animate={{
                  left: activeTab === 'education' ? '6%' : '56%',
                  width: '38%',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              >
                <div className="absolute -top-1.5 right-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full bg-cyan-400 blur-[3px] shadow-[0_0_12px_#22d3ee]" />
                <div className="absolute -top-1 right-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
              </motion.div>
            </div>

            {/* Tab Content: Stepped Alternating Timeline */}
            <AnimatePresence mode="wait">
              {activeTab === 'education' ? (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="relative space-y-5"
                >
                  {/* Center Vertical Timeline Divider */}
                  <div className="hidden sm:block absolute left-1/2 top-2 bottom-2 w-px bg-white/10 -translate-x-1/2 pointer-events-none" />

                  {educationData.map((edu, idx) => {
                    const isLeft = idx % 2 === 0;
                    const badgeColor =
                      idx === 0
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                        : idx === 1
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300';

                    const iconBg =
                      idx === 0
                        ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                        : idx === 1
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/10 border-rose-500/20 text-rose-400';

                    const icon = idx === 0 ? '🎓' : idx === 1 ? '📖' : '🏫';

                    return (
                      <div
                        key={idx}
                        className={`flex w-full ${isLeft ? 'sm:justify-start' : 'sm:justify-end'}`}
                      >
                        <div
                          className="w-full sm:w-[48%] rounded-2xl border border-white/10 bg-[#14192A]/90 hover:bg-[#1A2138] p-4 sm:p-5 backdrop-blur-xl shadow-xl transition-all hover:border-white/20 group"
                        >
                          <div className="flex items-start gap-3.5">
                            {/* Icon */}
                            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-lg shrink-0 ${iconBg}`}>
                              <span>{icon}</span>
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeColor}`}>
                                  {edu.period}
                                </span>
                                <span className="text-gray-400 text-xs">•</span>
                                <span className="text-gray-300 text-xs font-medium">
                                  {edu.cgpa}
                                </span>
                              </div>

                              <h4 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                                {edu.degree}
                              </h4>

                              <p className="text-xs text-gray-400 mt-0.5">
                                {edu.institution}
                              </p>

                              {/* Gradient Underline */}
                              <div className="h-1 w-3/4 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mt-3 opacity-90 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {achievementsData.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-2xl border border-white/10 bg-[#121727]/80 hover:bg-[#182035] p-5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-white/20 group overflow-hidden flex flex-col justify-between min-h-[135px]"
                    >
                      {/* ─── Background Certificate Watermark ─── */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.07] flex flex-col items-center justify-center select-none overflow-hidden p-2.5 text-center">
                        <div className="border border-white/40 rounded-lg w-full h-full p-2 flex flex-col items-center justify-center">
                          <span className="font-serif tracking-widest text-[13px] font-bold uppercase text-white">CERTIFICATE</span>
                          <span className="font-serif tracking-wider text-[7px] uppercase text-white/80">OF ACHIEVEMENT</span>
                          <span className="text-[6px] tracking-wider uppercase mt-0.5 text-white/60">THIS CERTIFICATE IS PRESENTED TO</span>
                          <span className="font-serif text-[12px] italic mt-0.5 text-white/90 font-bold">Mohammed Faizan</span>
                          <span className="text-[5px] tracking-widest uppercase mt-0.5 text-white/50">PERSON ABOVE HAS COMPLETED THE PROGRAM IN EXCELLENCE</span>
                        </div>
                      </div>

                      {/* ─── Top Row: Title + Medal Ribbon Badge ─── */}
                      <div className="relative z-10 flex items-start justify-between gap-3">
                        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors leading-snug">
                          {item.title}
                        </h4>
                        <span className="text-base shrink-0 select-none" role="img" aria-label="Medal">
                          🏅
                        </span>
                      </div>

                      {/* ─── Bottom Row: Subtitle / Description ─── */}
                      <div className="relative z-10 mt-2">
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
