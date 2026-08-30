import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonialsData = [
  {
    name: 'Alice Johnson',
    role: 'CTO @ TechNova',
    initials: 'AJ',
    content: 'Working with this developer was like having a secret weapon. The animations and performance optimizations blew us away. Our SaaS platform feels 10x more premium now.',
  },
  {
    name: 'Marcus Lee',
    role: 'Founder @ NeonLabs',
    initials: 'ML',
    content: "Hands down one of the most creative engineers I've worked with. The attention to detail in motion design and interactive storytelling is unmatched.",
  },
  {
    name: 'Sophia Chen',
    role: 'Design Director @ Flow Studio',
    initials: 'SC',
    content: 'When we showcased the new portfolio to our clients, they thought we hired a full-blown agency. Nope, just one insanely talented developer!',
  },
  {
    name: 'Daniel Martinez',
    role: 'Product Lead @ QuantumX',
    initials: 'DM',
    content: 'A developer who not only codes but also understands storytelling, branding, and impact. This is rare, and it shows in the work delivered.',
  },
  {
    name: 'Elena Fischer',
    role: 'Creative Director @ FutureWave',
    initials: 'EF',
    content: 'Every micro-interaction feels alive. The blend of GSAP and Framer Motion made our site unforgettable.',
  },
];

// Client badge items for the scrolling marquee
const clientBadges = testimonialsData.map(t => ({
  initials: t.initials,
  name: t.name,
  role: t.role,
}));

// Double the array for seamless infinite scroll
const marqueeItems = [...clientBadges, ...clientBadges];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 border border-amber-500/20 text-amber-400">
          Client Feedback
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold mt-4 tracking-tight text-white">
          What People Say
        </h2>
      </motion.div>

      {/* Scrolling Marquee of Client Badges */}
      <div className="relative overflow-hidden mb-12">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {marqueeItems.map((badge, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center gap-3 px-5 py-3 mx-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-white/20 flex items-center justify-center text-sm font-bold text-white">
                {badge.initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-white whitespace-nowrap">{badge.name}</div>
                <div className="text-xs text-gray-400 whitespace-nowrap">{badge.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Quote Cards - 2 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonialsData.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-7 flex flex-col justify-between hover:border-purple-400/40 transition-all duration-300 shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-white/20 flex items-center justify-center text-sm font-bold text-white">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                    <p className="text-xs text-gray-400">{item.role}</p>
                  </div>
                </div>
                <Quote size={20} className="text-gray-500 opacity-40" />
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic">
                "{item.content}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
