import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { heroData } from '../data/portfolioData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative px-6 md:px-12 py-20 overflow-hidden border-t border-white/5 z-10">
      {/* Background Radial Light Effect */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(1200px 600px at 50% 0%, rgba(34,211,238,0.08), transparent 70%)',
        }}
      />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-10">
          {/* Giant Animated Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter select-none"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 animate-gradient">
              {heroData.name}
            </span>
          </motion.div>

          {/* Social Links Big Rounded Tiles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 sm:gap-5"
          >
            <a
              href={heroData.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 hover:scale-110 transition-all duration-300 backdrop-blur-sm text-gray-200 hover:text-cyan-300 shadow-lg shadow-black/20"
            >
              <FaGithub size={22} />
            </a>
            <a
              href={heroData.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 hover:scale-110 transition-all duration-300 backdrop-blur-sm text-gray-200 hover:text-cyan-300 shadow-lg shadow-black/20"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href={heroData.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/50 hover:scale-110 transition-all duration-300 backdrop-blur-sm text-gray-200 hover:text-cyan-300 shadow-lg shadow-black/20"
            >
              <FaTwitter size={22} />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-400/50 hover:scale-110 transition-all duration-300 backdrop-blur-sm text-gray-200 hover:text-purple-300 shadow-lg shadow-black/20 cursor-pointer"
            >
              <ArrowUp size={22} />
            </button>
          </motion.div>

          {/* Copyright Subtext */}
          <div className="pt-6 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
            <div>
              © {new Date().getFullYear()} {heroData.name}. All rights reserved.
            </div>
            <div className="flex items-center gap-1">
              Built with <Heart size={13} className="text-rose-500 fill-rose-500" /> React, TailwindCSS & Three.js
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
