import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { educationData, achievementsData, leetcodeStats, githubStats, heroData } from '../data/portfolioData';
import { GraduationCap, Trophy, ExternalLink } from 'lucide-react';
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

      {/* ─── 2-COLUMN MAIN GRID (Matches Reference Site Screenshot) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ═══════════════ LEFT COLUMN: Revolving Avatar + Education/Achievements ═══════════════ */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Revolving Profile Avatar with Circular Orbit Track (Responsive) */}
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

          {/* Education & Achievements Card */}
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

        {/* ═══════════════ RIGHT COLUMN: LeetCode & GitHub Statistics ═══════════════ */}
        <div className="lg:col-span-5 space-y-8">
          {/* LeetCode Statistics Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0E1322]/85 backdrop-blur-2xl shadow-xl shadow-black/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-lg">💻</div>
              <h3 className="text-xl font-bold text-white">LeetCode</h3>
            </div>

            {/* Circle Gauge + Quick Metrics */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                  <motion.circle
                    cx="48" cy="48" r="40"
                    stroke="url(#lc-grad)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: leetcodeStats.solved / leetcodeStats.total }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="lc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-white">{leetcodeStats.solved}</span>
                  <span className="text-[10px] text-gray-400">/ {leetcodeStats.total}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 flex-1">
                <div className="text-center p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm font-bold text-white">{leetcodeStats.rank}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Rank</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm font-bold text-white">{leetcodeStats.badges}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Badges</div>
                </div>
                <div className="text-center p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-sm font-bold text-white">{leetcodeStats.reputation}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">Reputation</div>
                </div>
              </div>
            </div>

            {/* Easy / Medium / Hard Progress Bars */}
            <div className="space-y-3.5">
              <ProgressBar label="Easy" solved={leetcodeStats.easy.solved} total={leetcodeStats.easy.total} beats={leetcodeStats.easy.beats} color="#22d3ee" />
              <ProgressBar label="Medium" solved={leetcodeStats.medium.solved} total={leetcodeStats.medium.total} beats={leetcodeStats.medium.beats} color="#10B981" />
              <ProgressBar label="Hard" solved={leetcodeStats.hard.solved} total={leetcodeStats.hard.total} beats={leetcodeStats.hard.beats} color="#F87171" />
            </div>
          </motion.div>

          {/* GitHub Statistics Card (Matches Screenshot) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-6 sm:p-7 rounded-3xl border border-white/10 bg-[#0E1322]/85 backdrop-blur-2xl shadow-xl shadow-black/50"
          >
            {/* Header: GitHub with Gradient + Grade Circle B- */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl text-white">🐙</span>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Github
                </h3>
              </div>

              {/* Grade Circle Badge (B-) */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
                  <motion.circle
                    cx="24" cy="24" r="20"
                    stroke="#a855f7"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 0.75 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                  />
                </svg>
                <span className="absolute text-sm font-bold text-white">B-</span>
              </div>
            </div>

            {/* Metrics List Matching Screenshot */}
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-gray-300">
                  <span>⭐</span>
                  <span>Total Stars Earned:</span>
                </div>
                <span className="font-bold text-white font-mono">{githubStats.stars}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-gray-300">
                  <span>💻</span>
                  <span>Total Commits:</span>
                </div>
                <span className="font-bold text-white font-mono">{githubStats.commits}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-gray-300">
                  <span>🔀</span>
                  <span>Total PRs:</span>
                </div>
                <span className="font-bold text-white font-mono">{githubStats.prs}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-gray-300">
                  <span>❗</span>
                  <span>Total Issues:</span>
                </div>
                <span className="font-bold text-white font-mono">{githubStats.issues}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-gray-300">
                  <span>📊</span>
                  <span>Contributed to (last year):</span>
                </div>
                <span className="font-bold text-white font-mono">{githubStats.contributed}</span>
              </div>
            </div>

            {/* Language Breakdown Segmented Bar */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <div className="h-2.5 w-full rounded-full overflow-hidden flex">
                {githubStats.languages.map((lang, idx) => (
                  <div key={idx} style={{ width: `${lang.pct}%`, backgroundColor: lang.color }} className="h-full" />
                ))}
                <div className="h-full flex-1 bg-white/10" />
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                {githubStats.languages.map((lang, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-gray-300">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span>{lang.name}</span>
                    <span className="text-gray-500 font-mono">{lang.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// ─── Subcomponent: LeetCode Progress Bar ─────────────────────────────
function ProgressBar({ label, solved, total, beats, color }) {
  const percentage = Math.min(100, Math.round((solved / total) * 100));
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 text-xs">
        <span className="font-semibold text-white">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-gray-300 font-mono">{solved}/{total}</span>
          <span className="text-gray-400 font-mono">Beats: {beats}%</span>
        </div>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}


