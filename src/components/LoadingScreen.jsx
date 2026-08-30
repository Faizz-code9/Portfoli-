import React, { useState, useEffect, useRef, useCallback } from 'react';

const terminalLines = [
  { text: '~/workspace', color: '#22d3ee', delay: 300 },
  { text: '$ git init && git add .', color: '#a1a1aa', delay: 600 },
  { text: '$ git commit -m "chore: bootstrap"', color: '#a1a1aa', delay: 800 },
  { text: '$ pnpm i && pnpm dev', color: '#a1a1aa', delay: 600 },
  { text: '⏳ compiling...', color: '#facc15', delay: 1000 },
  { text: '✓ types ok · ✓ lint ok · ✓ built in 1.23s', color: '#4ade80', delay: 800 },
  { text: 'localhost:5173 — ready', color: '#22d3ee', delay: 500 },
  { text: '', color: 'transparent', delay: 200 },
  { text: 'const app = init(skills) => {', color: '#c084fc', delay: 400 },
  { text: '  return skills.map(s) && deploy(s)', color: '#c084fc', delay: 400 },
  { text: '}', color: '#c084fc', delay: 600 },
];

// Matrix Rain Character Set
const MATRIX_CHARS = '01+}[]~/ABCDEFabcdef0123456789<>|\\;:';

export const LoadingScreen = ({ onFinish }) => {
  const canvasRef = useRef(null);
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentTyping, setCurrentTyping] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const animFrameRef = useRef(null);

  // Matrix Rain Canvas Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 11, 22, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'rgba(34, 211, 238, 0.15)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Only render ~30% of columns for sparse effect
        if (i % 3 !== 0) continue;

        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Random green/cyan tint
        const alpha = 0.08 + Math.random() * 0.12;
        ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + Math.random() * 0.5;
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Terminal Typing Effect
  useEffect(() => {
    if (!isTyping || lineIndex >= terminalLines.length) {
      // All lines typed, trigger fadeout and finish
      if (lineIndex >= terminalLines.length) {
        const timer = setTimeout(() => {
          setFadeOut(true);
          setTimeout(onFinish, 600);
        }, 500);
        return () => clearTimeout(timer);
      }
      return;
    }

    const currentLine = terminalLines[lineIndex];

    if (charIndex < currentLine.text.length) {
      const speed = 15 + Math.random() * 25;
      const timer = setTimeout(() => {
        setCurrentTyping((prev) => prev + currentLine.text[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      // Line finished, move to next
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [
          ...prev,
          { text: currentLine.text, color: currentLine.color },
        ]);
        setCurrentTyping('');
        setCharIndex(0);
        setLineIndex((prev) => prev + 1);
      }, currentLine.delay);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, charIndex, isTyping, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#020408] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Matrix Rain Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Terminal Box */}
      <div className="relative z-10 w-full max-w-xl mx-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl shadow-cyan-900/30 overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-3 text-xs text-gray-400 font-mono">terminal — zsh</span>
        </div>

        {/* Terminal Content */}
        <div className="p-5 sm:p-6 font-mono text-sm leading-relaxed min-h-[280px]">
          {visibleLines.map((line, idx) => (
            <div key={idx} style={{ color: line.color }} className="whitespace-pre">
              {line.text || '\u00A0'}
            </div>
          ))}
          {/* Currently Typing Line */}
          {lineIndex < terminalLines.length && (
            <div style={{ color: terminalLines[lineIndex]?.color || '#a1a1aa' }} className="whitespace-pre">
              {currentTyping}
              <span className="inline-block w-2 h-4 bg-cyan-400 ml-0.5 animate-pulse align-middle" />
            </div>
          )}
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={() => {
          setFadeOut(true);
          setTimeout(onFinish, 300);
        }}
        className="absolute bottom-8 text-xs text-gray-500 hover:text-gray-300 transition-colors cursor-pointer z-10 font-mono"
      >
        click to skip →
      </button>
    </div>
  );
};

export default LoadingScreen;
