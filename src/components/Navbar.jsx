import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems, heroData } from '../data/portfolioData';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['about', 'projects', 'experience', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logo = useMemo(
    () => (
      <div className="flex items-center gap-2">
        <div className="text-lg md:text-xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            {heroData.name}
          </span>
        </div>
      </div>
    ),
    []
  );

  return (
    <div className="relative">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className={`mx-4 mt-4 rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? 'border-white/10 bg-black/60 backdrop-blur-2xl shadow-lg shadow-black/20'
              : 'border-white/5 bg-black/20 backdrop-blur-sm'
          }`}
        >
          <nav className="flex items-center justify-between px-5 md:px-7 h-16 md:h-[72px]">
            {/* Logo */}
            <a href="#hero" className="select-none relative z-10">
              {logo}
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`relative px-4 py-2.5 text-[15px] font-medium rounded-xl transition-all duration-200 ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-xl border border-white/10"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(168,85,247,0.08))',
                          boxShadow: '0 0 20px rgba(34,211,238,0.1)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* CTA Button: Let's Talk */}
            <div className="hidden md:block">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#contact"
                  className="relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[15px] font-semibold overflow-hidden group"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(168,85,247,0.15))',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="relative z-10"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="url(#gradient-arrow)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient id="gradient-arrow" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="relative z-10 text-white">Let's Talk</span>
                </a>
              </motion.div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="md:hidden h-11 w-11 grid place-items-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-sm text-gray-300 cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </nav>
        </div>

        {/* Mobile Slide-Down Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.aside
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mx-4 mt-2 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl p-4 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 text-center py-3 rounded-xl text-base font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 text-white"
                >
                  Let's Talk
                </a>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
