import React, { useState } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { SkillsPlayground } from './components/SkillsPlayground';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#020408] text-white selection:bg-purple-500/30 selection:text-purple-300 overflow-x-hidden">
      {/* Interactive Booting Screen */}
      {isLoading && (
        <LoadingScreen onFinish={() => setIsLoading(false)} />
      )}

      {/* Dynamic Background Particles, Section Colors & Custom Cursor */}
      <BackgroundParticles showCursorGlow={true} />

      {/* Sticky Navigation Bar (Reveals after booting screen) */}
      {!isLoading && <Navbar />}

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenResume={() => setIsResumeModalOpen(true)} />
        <About />
        <SkillsPlayground />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>

      {/* Signature Footer */}
      <Footer />

      {/* Root-Level In-App Resume Preview Modal (Above Navbar & All Layers) */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

export default App;

