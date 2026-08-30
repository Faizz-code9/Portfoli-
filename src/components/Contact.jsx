import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2, FileText, Download } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { heroData } from '../data/portfolioData';

export function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    // Simulate sending or trigger confetti on success
    setTimeout(() => {
      setStatus('success');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22d3ee', '#a855f7', '#34d399', '#f43f5e'],
      });

      if (formRef.current) formRef.current.reset();
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setStatus('idle'), 5000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-20 md:py-28 text-white overflow-hidden z-10"
    >
      {/* Ambient Pulsating Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-[10%] sm:left-1/4 w-[60vw] sm:w-[40vw] h-[60vw] sm:h-[40vw] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 right-[10%] sm:right-1/4 w-[60vw] sm:w-[40vw] h-[60vw] sm:h-[40vw] bg-purple-500/15 rounded-full blur-[120px] animate-pulse delay-500" />
      </div>

      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-5xl md:text-6xl font-bold text-center mb-6 tracking-tight max-w-4xl"
      >
        Let's Build Something Intelligent Together
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="text-gray-400 text-center max-w-xl mb-12 text-sm sm:text-base"
      >
        Open to AI/ML research collaborations, software engineering roles, and innovative projects. Let's connect!
      </motion.p>

      {/* Contact Grid Container */}
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-5"
        >
          <div className="p-6 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white mb-2">Get in Touch</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Feel free to reach out via email, phone, LinkedIn, or download my official resume below.
            </p>

            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${heroData.email}`}
                className="flex items-center gap-3.5 text-sm text-gray-200 hover:text-cyan-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Email</div>
                  <div className="font-semibold">{heroData.email}</div>
                </div>
              </a>

              <a
                href={`tel:${heroData.phone}`}
                className="flex items-center gap-3.5 text-sm text-gray-200 hover:text-emerald-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Phone</div>
                  <div className="font-semibold">{heroData.phone}</div>
                </div>
              </a>

              <a
                href={heroData.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3.5 text-sm text-gray-200 hover:text-blue-400 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <FaLinkedin size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400">LinkedIn</div>
                  <div className="font-semibold">mohammed-faizan</div>
                </div>
              </a>

              <div className="flex items-center gap-3.5 text-sm text-gray-200">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Location</div>
                  <div className="font-semibold">{heroData.location}</div>
                </div>
              </div>

              {/* PDF Resume & CV Direct Downloads */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <a
                  href={heroData.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  download="Mohammed_Faizan_Resume.pdf"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 text-xs font-semibold text-white transition-all"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={14} className="text-cyan-400" />
                    Download Resume (PDF)
                  </span>
                  <Download size={14} className="text-gray-400" />
                </a>

                <a
                  href={heroData.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  download="Mohammed_Faizan_CV_Photo.pdf"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 text-xs font-semibold text-gray-300 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <FileText size={14} className="text-purple-400" />
                    Download CV with Photo (PDF)
                  </span>
                  <Download size={14} className="text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-xl space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Message *
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project, timeline, and goals..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all resize-none"
              />
            </div>

            {/* Status Alert */}
            {status === 'success' && (
              <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
                <CheckCircle size={18} />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle size={18} />
                <span>Something went wrong. Please try again or email directly.</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-3.5 rounded-xl font-bold text-black bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>Send Message ✦</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
