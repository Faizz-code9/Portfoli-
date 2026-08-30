import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Hero3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for objects
    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Icosahedron Wireframe
    const icoGeo = new THREE.IcosahedronGeometry(7, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    group.add(icoMesh);

    // 2. Inner Torus Knot
    const torusGeo = new THREE.TorusKnotGeometry(4, 0.8, 100, 16);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    group.add(torusMesh);

    // 3. Floating Particles Field around geometry
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(0x22d3ee);
    const cPurple = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const radius = 10 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = cCyan.clone().lerp(cPurple, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x22d3ee, 3, 50);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 3, 50);
    pointLight2.position.set(-15, -15, 15);
    scene.add(pointLight2);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = mouseX * 0.4;
      targetY = mouseY * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotate towards target mouse pos
      group.rotation.y += 0.003 + (targetX - group.rotation.y) * 0.05;
      group.rotation.x += 0.002 + (targetY - group.rotation.x) * 0.05;

      icoMesh.rotation.y = elapsedTime * 0.15;
      icoMesh.rotation.x = elapsedTime * 0.1;

      torusMesh.rotation.y = -elapsedTime * 0.2;
      torusMesh.rotation.z = elapsedTime * 0.1;

      particles.rotation.y = elapsedTime * 0.05;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" />;
}
