import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Matter from 'matter-js';
import { skillsData } from '../data/portfolioData';
import { Sparkles, RotateCcw, ArrowDownUp } from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGit,
  SiPython,
  SiCplusplus,
  SiFastapi,
  SiKubernetes,
  SiLinux,
} from 'react-icons/si';
import { Cpu, ShieldCheck, Database, BrainCircuit } from 'lucide-react';

const iconMap = {
  python: SiPython,
  langgraph: BrainCircuit,
  c: SiCplusplus,
  react: SiReact,
  next: SiNextdotjs,
  fastapi: SiFastapi,
  wazuh: ShieldCheck,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  postgres: SiPostgresql,
  mongodb: SiMongodb,
  chromadb: Database,
  tailwind: SiTailwindcss,
  linux: SiLinux,
  git: SiGit,
};

export function SkillsPlayground() {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const bodiesMap = useRef(new Map());
  const [gravityDirection, setGravityDirection] = useState(1); // 1 = down, -1 = up, 0 = zero-g
  const [tileState, setTileState] = useState({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Create Engine & World
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.98 * gravityDirection, scale: 0.001 },
      enableSleeping: false,
    });
    engineRef.current = engine;

    // 2. Create Runner
    const runner = Matter.Runner.create({ delta: 1000 / 60 });
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // 3. Create Boundary Walls
    const wallThickness = 100;
    const floor = Matter.Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width * 2,
      wallThickness,
      { isStatic: true, restitution: 0.6, friction: 0.1 }
    );
    const ceiling = Matter.Bodies.rectangle(
      width / 2,
      -wallThickness / 2,
      width * 2,
      wallThickness,
      { isStatic: true, restitution: 0.4, friction: 0.1 }
    );
    const leftWall = Matter.Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height * 3,
      { isStatic: true, restitution: 0.5, friction: 0.1 }
    );
    const rightWall = Matter.Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height * 3,
      { isStatic: true, restitution: 0.5, friction: 0.1 }
    );

    Matter.World.add(engine.world, [floor, ceiling, leftWall, rightWall]);

    // 4. Determine Tile Size based on container width
    const tileSize = width < 480 ? 75 : width < 640 ? 85 : width < 768 ? 100 : 120;
    const cols = width < 640 ? 3 : width < 768 ? 4 : 5;

    // 5. Create Skill Bodies
    skillsData.forEach((skill, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const startX = 60 + col * (tileSize + 16) + (Math.random() - 0.5) * 20;
      const startY = 50 + row * (tileSize + 20) + (Math.random() - 0.5) * 10;

      const body = Matter.Bodies.rectangle(startX, startY, tileSize, tileSize, {
        restitution: 0.55,
        friction: 0.08,
        frictionAir: 0.02,
        density: 0.003,
        chamfer: { radius: 14 },
      });

      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.3);
      bodiesMap.current.set(skill.key, body);
      Matter.World.add(engine.world, body);
    });

    // 6. Mouse / Touch Drag Constraint
    let activeConstraint = null;

    const handlePointerDown = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY;
      if (clientX === undefined || clientY === undefined) return;

      const mousePos = { x: clientX - rect.left, y: clientY - rect.top };

      // Find if clicked on any body
      bodiesMap.current.forEach((body) => {
        if (Matter.Bounds.contains(body.bounds, mousePos)) {
          activeConstraint = Matter.Constraint.create({
            pointA: mousePos,
            bodyB: body,
            stiffness: 0.1,
            damping: 0.1,
            length: 0,
          });
          Matter.World.add(engine.world, activeConstraint);
        }
      });
    };

    const handlePointerMove = (e) => {
      if (!activeConstraint) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY;
      if (clientX === undefined || clientY === undefined) return;

      activeConstraint.pointA = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handlePointerUp = () => {
      if (activeConstraint) {
        Matter.World.remove(engine.world, activeConstraint);
        activeConstraint = null;
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // 7. Render Tick Loop for React Elements
    let animId = 0;
    const updateLoop = () => {
      const nextState = {};
      bodiesMap.current.forEach((body, key) => {
        nextState[key] = {
          x: body.position.x - tileSize / 2,
          y: body.position.y - tileSize / 2,
          angle: body.angle,
          size: tileSize,
        };
      });
      setTileState(nextState);
      animId = requestAnimationFrame(updateLoop);
    };

    updateLoop();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, [gravityDirection]);

  // Reset Physics Bodies
  const handleReset = () => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const tileSize = width < 480 ? 75 : width < 640 ? 85 : width < 768 ? 100 : 120;
    const cols = width < 640 ? 3 : width < 768 ? 4 : 5;

    skillsData.forEach((skill, idx) => {
      const body = bodiesMap.current.get(skill.key);
      if (body) {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const startX = 60 + col * (tileSize + 16) + (Math.random() - 0.5) * 20;
        const startY = 50 + row * (tileSize + 20);

        Matter.Body.setPosition(body, { x: startX, y: startY });
        Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: 2 });
        Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.3);
      }
    });
  };

  // Toggle Gravity
  const handleToggleGravity = () => {
    setGravityDirection((prev) => (prev === 1 ? -1 : 1));
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-pink-500/10 border border-pink-500/20 text-pink-400">
          Interactive Sandbox
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold mt-4 tracking-tight">
          Skills Playground
        </h2>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
          Drag, throw, and watch them bounce. Nothing escapes!
        </p>

        {/* Physics Control Buttons */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={handleToggleGravity}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all cursor-pointer shadow-md"
          >
            <ArrowDownUp size={14} className="text-cyan-400" />
            <span>{gravityDirection === 1 ? 'Invert Gravity (Up)' : 'Normal Gravity (Down)'}</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white/10 border border-white/20 hover:bg-white/20 text-white transition-all cursor-pointer shadow-md"
          >
            <RotateCcw size={14} className="text-purple-400" />
            <span>Reset Physics</span>
          </button>
        </div>
      </motion.div>

      {/* Physics Container Arena */}
      <div
        ref={containerRef}
        className="ps2d-scene relative select-none touch-none"
        id="project-skills-2d"
      >
        {/* Helper Hint Tag */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none px-3 py-1 rounded-lg bg-black/50 border border-white/10 text-[11px] text-gray-300 font-mono flex items-center gap-1.5">
          <Sparkles size={12} className="text-cyan-400" />
          <span>Tap & Drag Skill Blocks</span>
        </div>

        {/* Rendered Skill Blocks */}
        {skillsData.map((skill) => {
          const state = tileState[skill.key];
          if (!state) return null;

          const IconComponent = iconMap[skill.key] || SiReact;
          const size = state.size || 100;
          const iconSize = size > 100 ? 36 : size > 85 ? 30 : 24;

          return (
            <div
              key={skill.key}
              data-key={skill.key}
              className="ps2d-tile"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: skill.color,
                borderColor: 'rgba(255, 255, 255, 0.4)',
                transform: `translate3d(${state.x}px, ${state.y}px, 0) rotate(${state.angle}rad)`,
              }}
            >
              <div className="ps2d-row">
                <div className="ps2d-logo-wrap">
                  <IconComponent size={iconSize} color="#111827" />
                </div>
                <span className="ps2d-text">{skill.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
