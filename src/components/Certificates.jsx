import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificatesData } from '../data/portfolioData';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const certGradients = [
  'linear-gradient(180deg, #D97706 0%, #92400E 50%, #451A03 100%)', // Amber
  'linear-gradient(180deg, #06B6D4 0%, #0E7490 50%, #083344 100%)', // Cyan / Teal
  'linear-gradient(180deg, #2563EB 0%, #1D4ED8 50%, #172554 100%)', // Blue
  'linear-gradient(180deg, #E11D48 0%, #BE123C 50%, #4C0519 100%)', // Rose / Red
  'linear-gradient(180deg, #8B5CF6 0%, #6D28D9 50%, #2E1065 100%)', // Purple
  'linear-gradient(180deg, #10B981 0%, #047857 50%, #064E3B 100%)', // Emerald
];

export function Certificates() {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerPage(1);
      else if (w < 1024) setItemsPerPage(2);
      else setItemsPerPage(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.max(1, Math.ceil(certificatesData.length / itemsPerPage));

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  const startIndex = currentPage * itemsPerPage;
  const visibleCerts = certificatesData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="certificates" className="relative w-full py-24 z-10">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 text-amber-400">
            Validated Competence
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold mt-4 tracking-tight text-white">
            Premium Certificates
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
            Hover over any envelope to pull out and inspect the certificate.
          </p>
        </motion.div>

        {/* ─── Envelope Cards Row with Left / Right Navigation Arrows ─── */}
        <div className="relative">
          {/* Left Arrow Button */}
          <button
            onClick={prevPage}
            aria-label="Previous certificates"
            className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/85 hover:bg-black border border-white/25 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl z-40 backdrop-blur-md cursor-pointer"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextPage}
            aria-label="Next certificates"
            className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/85 hover:bg-black border border-white/25 text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-2xl z-40 backdrop-blur-md cursor-pointer"
          >
            <ChevronRight size={22} />
          </button>

          {/* Cards Grid Container (With top padding so popup doesn't get clipped) */}
          <div className="min-h-[460px] pt-20 pb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {visibleCerts.map((cert, idx) => (
                  <EnvelopeCard
                    key={cert.id}
                    cert={cert}
                    gradient={certGradients[(startIndex + idx) % certGradients.length]}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ─── Bottom Center Pagination Indicator (Pill + Dots) ─── */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              aria-label={`Go to certificate page ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentPage
                  ? 'w-10 bg-gradient-to-r from-cyan-400 to-purple-500'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Envelope Card Component (No Top Clipping + View Button on Certificate) ──────
function EnvelopeCard({ cert, gradient }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-[340px] w-full cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ─── 1. Parchment Certificate Paper (Glides Up Above Envelope Without Clipping) ─── */}
      <div
        className="absolute inset-x-3.5 top-0 h-[280px] rounded-xl bg-[#FAF8F5] border border-[#E5E0D5] p-4 text-center shadow-2xl transition-all duration-500 ease-out z-10 flex flex-col items-center justify-between"
        style={{
          transform: isHovered ? 'translateY(-75px) scale(1.03)' : 'translateY(15px)',
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 25px rgba(255, 255, 255, 0.15)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Top Decorative Flourish */}
        <div className="w-full">
          <div className="flex items-center justify-center gap-2 mb-1.5 opacity-60">
            <div className="w-6 h-[1px] bg-[#6B1D2A]" />
            <span className="text-[9px] text-[#6B1D2A] font-serif">❖ ── ❖</span>
            <div className="w-6 h-[1px] bg-[#6B1D2A]" />
          </div>

          {/* Burgundy Wax Seal Stamp */}
          <div className="w-9 h-9 rounded-full bg-[#6B1D2A] border-2 border-[#8B2635] mx-auto flex items-center justify-center text-amber-200 text-xs font-serif font-bold shadow-inner mb-1.5">
            H
          </div>

          {/* Certificate Title Typography */}
          <h4 className="font-serif tracking-widest text-sm sm:text-base font-bold text-[#1F2430] uppercase">
            CERTIFICATE
          </h4>
          <p className="font-serif tracking-wider text-[9px] text-[#555E70] uppercase">
            OF ACHIEVEMENT
          </p>

          {/* Subtext */}
          <p className="text-[8px] text-[#808899] font-sans tracking-wide uppercase mt-1.5">
            THIS CERTIFICATE IS PRESENTED TO
          </p>

          {/* Recipient */}
          <p className="text-xs font-bold text-[#1F2430] font-serif mt-0.5 border-b border-gray-300 pb-1 px-4">
            Mohammed Faizan
          </p>
        </div>

        {/* View Certificate Button (Right on the Certificate Paper) */}
        <div className="w-full pt-2">
          <a
            href={cert.link || '#'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg bg-[#111827] hover:bg-black text-white text-xs font-semibold transition-all shadow-md active:scale-95"
          >
            <span>View Certificate</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* ─── 2. Envelope Pocket Background Shadow ─── */}
      <div
        className="absolute inset-x-0 bottom-0 top-[26%] rounded-2xl z-0 shadow-2xl"
        style={{
          background: 'rgba(5, 8, 18, 0.95)',
        }}
      />

      {/* ─── 3. Front Envelope Pocket with Arched Top Lip ─── */}
      <div
        className="absolute inset-x-0 bottom-0 top-[28%] rounded-b-2xl z-20 flex flex-col items-center justify-between p-5 pt-7 shadow-2xl border-t border-white/20"
        style={{
          background: gradient,
          borderTopLeftRadius: '50% 28px',
          borderTopRightRadius: '50% 28px',
        }}
      >
        {/* Certificate Title on Pocket */}
        <div className="text-center w-full px-2 pt-2">
          <h3 className="text-sm sm:text-base font-bold text-white leading-snug drop-shadow-md line-clamp-2">
            {cert.title}
          </h3>

          {/* Issuer and Date */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-white/90 font-medium mt-2">
            <span>🎓 {cert.issuer}</span>
            <span>•</span>
            <span>📅 {cert.date}</span>
          </div>
        </div>

        {/* Action Button: View on Envelope */}
        <div className="w-full flex justify-center pb-1">
          <a
            href={cert.link || '#'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-6 py-1.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/25 text-white text-xs font-semibold backdrop-blur-md shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>View</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}


