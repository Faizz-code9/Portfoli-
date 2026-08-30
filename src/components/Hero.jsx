import React from 'react';
import { motion } from 'framer-motion';
import { heroData } from '../data/portfolioData';
import { Hero3DCanvas } from './Hero3DCanvas';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export function Hero({ onOpenResume }) {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center px-6 overflow-hidden"
    >
      {/* 3D Wireframe Canvas */}
      <Hero3DCanvas />

      {/* Grid Pattern Overlay */}
      <div className="hero-grid absolute inset-0 -z-10 pointer-events-none" />

      {/* Hero Content */}
      <div className="text-center max-w-6xl mx-auto z-10 pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-tight px-2"
        >
          {heroData.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mt-4 sm:mt-6 text-gray-300 text-base sm:text-2xl md:text-3xl font-medium px-4"
        >
          {heroData.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="px-8 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition-transform shadow-lg shadow-white/10"
          >
            Contact Me
          </a>
          <button
            onClick={onOpenResume}
            className="px-8 py-3 rounded-full border border-white/30 text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm shadow-lg shadow-black/40"
          >
            Resume
          </button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hero-social mt-8 flex items-center justify-center gap-6 text-gray-400 text-2xl"
        >
          <a
            href={heroData.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="hover:text-white hover:scale-110 transition-all"
          >
            <FaGithub size={24} />
          </a>
          <a
            href={heroData.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="hover:text-white hover:scale-110 transition-all"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href={heroData.social.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            title="Twitter"
            className="hover:text-white hover:scale-110 transition-all"
          >
            <FaTwitter size={24} />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-400/60 flex items-start justify-center p-1">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
        </div>
        <span className="text-xs text-gray-400 font-medium tracking-wide">Scroll</span>
      </motion.div>
    </section>
  );
}
