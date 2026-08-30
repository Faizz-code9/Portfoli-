import React, { useEffect, useRef, useState } from 'react';
import { sectionAccents } from '../data/portfolioData';

export function BackgroundParticles({ showCursorGlow = true }) {
  const canvasRef = useRef(null);
  const [accents, setAccents] = useState(sectionAccents.default);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [isPointer, setIsPointer] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // Detect Touch Device
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  // Section Observer for dynamic ambient gradient blobs
  useEffect(() => {
    const handleSectionEnter = (e) => {
      const id = e.detail?.id || 'default';
      setAccents(sectionAccents[id] || sectionAccents.default);
    };

    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'experience', 'skills', 'certificates', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const sId of sections) {
        const el = document.getElementById(sId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setAccents(sectionAccents[sId] || sectionAccents.default);
            break;
          }
        }
      }
    };

    document.addEventListener('section-enter', handleSectionEnter);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('section-enter', handleSectionEnter);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Interactive Constellation Canvas Particles with Connection Lines
  useEffect(() => {
    if (isTouch) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const particleColors = ['#22d3ee', '#a855f7', '#38bdf8', '#818cf8', '#ffffff'];
    const count = Math.min(65, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 1 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      alpha: 0.15 + Math.random() * 0.35,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    let animationFrameId = 0;
    const maxDistance = 115;
    const mouseMaxDistance = 140;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update and Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();

        // Connect with other particles within maxDistance
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#38bdf8';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 0.75;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }

        // Connect with mouse cursor
        if (mx > 0 && my > 0) {
          const mdx = p.x - mx;
          const mdy = p.y - my;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < mouseMaxDistance) {
            const mLineAlpha = (1 - mDist / mouseMaxDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = '#22d3ee';
            ctx.globalAlpha = mLineAlpha;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isTouch]);

  // Smooth Cursor Follower & Hover Detection
  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setCursorPos({ x, y });
      mouseRef.current = { x, y };

      const target = e.target;
      const isInteractive = target && (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.classList?.contains('ps2d-tile')
      );
      setIsPointer(!!isInteractive);
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouch]);

  return (
    <>
      {/* ─── Seamless Cosmic Black Gradient Mesh & Starlight Canvas ─── */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#020408]" aria-hidden="true">
        {/* Deep Space Ambient Top Left Nebula */}
        <div
          className="absolute -left-28 -top-28 w-[55rem] h-[32rem] rounded-full opacity-[0.14] transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, ${accents.a}, transparent 70%)`,
            filter: 'blur(75px)',
          }}
        />

        {/* Deep Space Ambient Center Right Nebula */}
        <div
          className="absolute -right-28 top-1/4 w-[50rem] h-[30rem] rounded-full opacity-[0.12] transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, ${accents.b}, transparent 70%)`,
            filter: 'blur(75px)',
          }}
        />

        {/* Deep Space Ambient Bottom Left Nebula */}
        <div
          className="absolute left-1/4 bottom-10 w-[45rem] h-[25rem] rounded-full opacity-[0.12] transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(circle, ${accents.c}, transparent 70%)`,
            filter: 'blur(70px)',
          }}
        />

        {/* Starlight Constellation Particle Canvas */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 w-full h-full -z-[4]"
        />
      </div>

      {/* Interactive Cursor Glow & Dot */}
      {showCursorGlow && !isTouch && (
        <>
          <div
            className="cursor-glow"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
              background: `radial-gradient(circle, rgba(34, 211, 238, 0.28), transparent 65%)`,
            }}
          />
          <div
            className="cursor-dot"
            style={{
              left: `${cursorPos.x}px`,
              top: `${cursorPos.y}px`,
              width: isPointer ? '16px' : '8px',
              height: isPointer ? '16px' : '8px',
              background: 'linear-gradient(135deg, #22d3ee, #a855f7)',
              boxShadow: '0 0 16px rgba(34, 211, 238, 0.9), 0 0 24px rgba(168, 85, 247, 0.7)',
            }}
          />
        </>
      )}
    </>
  );
}

