import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { motion } from 'motion/react';
import { ArrowUp, Github, Linkedin, Mail, Cpu, Globe, Disc } from 'lucide-react';
import { personalInfo } from '../data';

export default function Footer3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isEngaged, setIsEngaged] = useState(false);
  const [currentYear] = useState(() => new Date().getFullYear());

  // Three.js References
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  const materialRef = useRef<THREE.PointsMaterial | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  // Mouse interaction speed and vectors
  const touchCoords = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, force: 0, targetForce: 0 });

  // Grid sizing constants
  const gridWidth = 45;
  const gridDepth = 45;
  const totalCount = gridWidth * gridDepth;

  useEffect(() => {
    if (!containerRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let geometry: THREE.BufferGeometry;
    let material: THREE.PointsMaterial;
    let points: THREE.Points;
    let resizeObserver: ResizeObserver;

    try {
      const width = containerRef.current.clientWidth || 800;
      const height = containerRef.current.clientHeight || 260;

      // 1. Initial Scene Setup
      scene = new THREE.Scene();
      sceneRef.current = scene;

      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 10, 16);
      camera.lookAt(0, -2, 0);
      cameraRef.current = camera;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // 2. Generate custom Grid Topology position buffers
      geometry = new THREE.BufferGeometry();
      geometryRef.current = geometry;

      const positions = new Float32Array(totalCount * 3);
      const originalY = new Float32Array(totalCount);

      let index = 0;
      for (let x = 0; x < gridWidth; x++) {
        for (let z = 0; z < gridDepth; z++) {
          // Centered coordinate mapping
          const posX = (x - gridWidth / 2) * 0.7;
          const posZ = (z - gridDepth / 2) * 0.7;
          
          // Slight natural curved depression in center
          const distToCenter = Math.sqrt(posX * posX + posZ * posZ);
          const posY = -1.5 + Math.sin(distToCenter * 0.2) * 0.4;

          positions[index] = posX;
          positions[index + 1] = posY;
          positions[index + 2] = posZ;

          originalY[x * gridDepth + z] = posY;
          index += 3;
        }
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // 3. Dynamic radial lighting texture for dots
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.4, 'rgba(226, 27, 90, 0.8)'); // Elegant Crimson
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 16, 16);
      }
      const pTexture = new THREE.CanvasTexture(canvas);

      material = new THREE.PointsMaterial({
        size: 0.16,
        map: pTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      materialRef.current = material;

      points = new THREE.Points(geometry, material);
      scene.add(points);
      pointsRef.current = points;

      // 4. Multi-Sine Math Wave Loop with interactive deformation ripples
      const animate = () => {
        const time = clockRef.current.getElapsedTime();

        // Safe interpolation loops (Damped tracking)
        touchCoords.current.x += (touchCoords.current.targetX - touchCoords.current.x) * 0.05;
        touchCoords.current.y += (touchCoords.current.targetY - touchCoords.current.y) * 0.05;
        touchCoords.current.force += (touchCoords.current.targetForce - touchCoords.current.force) * 0.04;

        if (geometryRef.current) {
          const posAttr = geometryRef.current.attributes.position;
          const arr = posAttr.array as Float32Array;

          let vertexIndex = 0;
          for (let x = 0; x < gridWidth; x++) {
            for (let z = 0; z < gridDepth; z++) {
              const ox = arr[vertexIndex];
              const oz = arr[vertexIndex + 2];

              // Base natural wave math using compound sin/cos for complexity
              let yValue = originalY[x * gridDepth + z];
              
              // Animated terrain swells
              yValue += Math.sin(ox * 0.3 + time * 1.2) * 0.25;
              yValue += Math.cos(oz * 0.4 + time * 0.8) * 0.15;

              // Localized mouse deformation ripple with force scalar
              const dx = ox - touchCoords.current.x * 12;
              const dz = oz - touchCoords.current.y * 12;
              const distFromMouse = Math.sqrt(dx * dx + dz * dz);

              if (distFromMouse < 6.0) {
                const deformation = (6.0 - distFromMouse) / 6.0;
                // Add neat pulsing ring/wave around target point
                yValue += Math.sin(distFromMouse * 1.5 - time * 4.0) * 0.45 * deformation * touchCoords.current.force;
              }

              // Apply calculated value back to BufferAttribute array
              arr[vertexIndex + 1] = yValue;
              vertexIndex += 3;
            }
          }

          posAttr.needsUpdate = true;
        }

        // Camera subtle sway
        if (cameraRef.current) {
          cameraRef.current.position.x = Math.sin(time * 0.15) * 1.2;
          cameraRef.current.lookAt(0, -1.5, 0);
        }

        renderer.render(scene, camera);
        animationFrameId.current = requestAnimationFrame(animate);
      };

      animate();

      // 5. Grid boundary observer for responsive element scale
      const handleResize = () => {
        if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
      };

      resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(containerRef.current);

    } catch (err) {
      console.warn("Unable to initialize Three.js 3D wave footer scenario:", err);
    }

    return () => {
      try {
        if (resizeObserver) resizeObserver.disconnect();
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        if (rendererRef.current && rendererRef.current.domElement) {
          rendererRef.current.domElement.remove();
        }
        if (sceneRef.current) sceneRef.current.clear();
        if (geometry) geometry.dispose();
        if (material) material.dispose();
      } catch (inner) {
        // Safe tear down
      }
    };
  }, []);

  // Tracking mouse over entire footer container section
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalized coordinates from -1 to +1
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    touchCoords.current.targetX = nx;
    touchCoords.current.targetY = ny;
  };

  const handleMouseEnter = () => {
    setIsEngaged(true);
    touchCoords.current.targetForce = 1.0;
    
    if (materialRef.current) {
      // Trigger smooth GSAP color/brightness spike on hover
      gsap.to(materialRef.current, {
        size: 0.28,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    setIsEngaged(false);
    touchCoords.current.targetForce = 0.0;
    touchCoords.current.targetX = 0;
    touchCoords.current.targetY = 0;
    
    if (materialRef.current) {
      gsap.to(materialRef.current, {
        size: 0.16,
        duration: 0.8,
        ease: 'power2.out',
      });
    }
  };

  // Smooth scroll back to top of the screen
  const scrollBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="bg-[#090a0e] text-white pt-20 pb-12 px-6 md:px-12 xl:px-24 relative overflow-hidden border-t border-white/5 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background stencils & grid alignments */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(226,27,90,0.1)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

      {/* THREE.js canvas rendering area strictly in background layer */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full z-0 opacity-70 pointer-events-none" 
      />

      {/* Main Structural Navigation & Details Block */}
      <div className="w-full max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
        
        {/* Left Column: Branding / Customized Stylized Logo */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-baseline font-sans select-none mb-3">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white uppercase">
                Anderson
              </span>
              <span className="font-serif italic text-xl sm:text-2xl text-red-500 font-medium tracking-wide ml-1">
                Chiesa
              </span>
              <span className="w-2 h-2 bg-red-650 rounded-full ml-1" />
            </div>
            
            <p className="text-gray-400 font-sans font-light text-xs leading-relaxed max-w-sm">
              Criando experiências web inovadoras, combinando arte matemática tridimensional a códigos de alto rendimento.
            </p>
          </div>

          {/* Core system details HUD readout */}
          <div className="flex flex-wrap gap-4 text-gray-500 font-mono text-[9px]">
            <span className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 py-1 px-2.5 rounded-md">
              <Cpu className="w-3 h-3 text-red-500 animate-pulse" /> ENGINE: WebGL_2
            </span>
            <span className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 py-1 px-2.5 rounded-md">
              <Globe className="w-3 h-3 text-blue-400" /> SENSORS: {isEngaged ? "ACTIVE" : "STANDBY"}
            </span>
            <span className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 py-1 px-2.5 rounded-md">
              <Disc className="w-3 h-3 text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} /> RATIO: FPS_OK
            </span>
          </div>
        </div>

        {/* Center/Right Sections: Links and Smooth Scrolling navigation hub */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          
          {/* Quick Nav list */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest font-bold">Menu Escopo</span>
            <ul className="space-y-2.5 font-sans text-xs text-gray-400">
              <li>
                <button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer block">
                  Voltar ao Início
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer block">
                  Dashboard Eficiência
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('lab3d')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer block">
                  Laboratório 3D
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer block">
                  Portfólio Projetos
                </button>
              </li>
            </ul>
          </div>

          {/* Social Network coordinates */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest font-bold">Sociais</span>
            <div className="flex flex-col space-y-2.5 font-sans text-xs text-gray-400">
              <a 
                href={personalInfo.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Github className="w-3.5 h-3.5" /> <span>GitHub</span>
              </a>
              <a 
                href={personalInfo.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-3.5 h-3.5" /> <span>LinkedIn</span>
              </a>
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" /> <span>Email</span>
              </a>
            </div>
          </div>

          {/* Action column: Scroll to top styled beautifully with floating trigger */}
          <div className="col-span-2 sm:col-span-1 flex flex-col justify-between items-start sm:items-end">
            <div />
            <motion.button
              onClick={scrollBackToTop}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-4 py-3 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.02] text-xs font-mono text-gray-300 hover:text-white transition-all cursor-pointer shadow-md"
            >
              <span>SUBIR SITE</span>
              <ArrowUp className="w-3.5 h-3.5 text-red-500 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>

        </div>

      </div>

      {/* Footer system details info, copyright and core data */}
      <div className="w-full max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-mono text-[9px] text-gray-500 gap-4 relative z-10">
        <p className="uppercase tracking-wide font-medium">
          © {currentYear} ANDERSON CHIESA • DESIGN & HARDWARE ENGAGEMENT, RIO DE JANEIRO
        </p>
        <div className="flex gap-4">
          <p>TEC: THREE.JS & GSAP CORE</p>
          <p className="text-red-500/80 font-bold tracking-wider animate-pulse flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> SYSTEM REALTIME
          </p>
        </div>
      </div>
    </footer>
  );
}
