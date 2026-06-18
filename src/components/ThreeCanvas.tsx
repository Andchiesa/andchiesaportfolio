import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ThreeCanvasProps {
  activeStage?: number;
  isGlitching?: boolean;
}

export default function ThreeCanvas({ activeStage = 0, isGlitching = false }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const linesRef = useRef<THREE.LineSegments | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  // Coordenadas do mouse suavizadas
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Monitorar movimento do mouse para parallax 3D interativo
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalizado de -1 a 1
      mouse.current.targetX = (e.clientX / innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Efeito principal de Setup do Three.js
  useEffect(() => {
    if (!containerRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let meshGroup: THREE.Group;
    let particles: THREE.Points;
    let lineMat: THREE.LineBasicMaterial;
    let particleGeo: THREE.BufferGeometry;
    let particleMat: THREE.PointsMaterial;
    let meshGeo: THREE.IcosahedronGeometry;
    let resizeObserver: ResizeObserver;

    try {
      const width = containerRef.current.clientWidth || 800;
      const height = containerRef.current.clientHeight || 600;

      // 1. Criar Scena e Renderizador transparente
      scene = new THREE.Scene();
      sceneRef.current = scene;

      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.z = 25;
      cameraRef.current = camera;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // 2. Luzes para dar profundidade estética
      const hLight = new THREE.HemisphereLight(0xffffff, 0x111122, 1.2);
      scene.add(hLight);

      const pLight1 = new THREE.PointLight(0xe21b5a, 2.5, 45);
      pLight1.position.set(10, 10, 10);
      scene.add(pLight1);

      const pLight2 = new THREE.PointLight(0x00f0ff, 2.0, 45);
      pLight2.position.set(-10, -10, 10);
      scene.add(pLight2);

      // 3. Sistema de Cyber Partículas (Nuvem de dados/estrelas)
      const particleCount = 700;
      particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const randomSpeeds = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        // Distribuição esférica e dispersa
        const r = 12 + Math.random() * 18;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);

        randomSpeeds[i] = 0.2 + Math.random() * 0.8;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      // Textura circular programada para evitar carregar arquivos externos
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(226, 27, 90, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      const particleTexture = new THREE.CanvasTexture(canvas);

      particleMat = new THREE.PointsMaterial({
        size: 0.28,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: 0xff4488,
      });

      particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);
      particlesRef.current = particles;

      // 4. Geometria Principal Central: Icosaedro Futurista Composto
      meshGeo = new THREE.IcosahedronGeometry(7, 1);
      
      // Material de estrutura (Wireframe brilhante)
      lineMat = new THREE.LineBasicMaterial({
        color: 0xe21b5a,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
      });
      
      const lines = new THREE.LineSegments(
        new THREE.WireframeGeometry(meshGeo),
        lineMat
      );

      // Material de pontos da estrutura principal (vértices luminosos)
      const meshPointsMat = new THREE.PointsMaterial({
        size: 0.4,
        color: 0x00f5ff,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });
      const meshPoints = new THREE.Points(meshGeo, meshPointsMat);

      // Guardar referência do Icosaedro agrupado
      meshGroup = new THREE.Group();
      meshGroup.add(lines);
      meshGroup.add(meshPoints);
      scene.add(meshGroup);
      meshRef.current = meshGroup as any;

      // 5. Loop de Renderização e Animação Fluida (Parallax + Noise)
      const animate = () => {
        if (!rendererRef.current) return;
        const elapsedTime = clockRef.current.getElapsedTime();

        // Suavização do mouse com interpolação linear (lerp)
        mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
        mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

        // Parallax sutil na câmera alimentado por GSAP e Mouse
        if (cameraRef.current) {
          cameraRef.current.position.x = mouse.current.x * 3.5;
          cameraRef.current.position.y = mouse.current.y * 3.5;
          cameraRef.current.lookAt(0, 0, 0);
        }

        // Rotações constantes e orbitais enriquecidas
        if (meshRef.current) {
          meshRef.current.rotation.y = elapsedTime * 0.12 + mouse.current.x * 0.3;
          meshRef.current.rotation.x = elapsedTime * 0.08 + mouse.current.y * 0.3;
        }

        if (particlesRef.current) {
          particlesRef.current.rotation.y = elapsedTime * 0.03;
          // Agitar partículas individuais sutilmente usando seno
          const positionsArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < particleCount; i++) {
            const index = i * 3;
            const speed = randomSpeeds[i];
            positionsArr[index + 1] += Math.sin(elapsedTime * speed + i) * 0.005;
          }
          particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }

        renderer.render(scene, camera);
        animationFrameId.current = requestAnimationFrame(animate);
      };
      animate();

      // 6. Monitoramento de Redimensionamento do Canvas
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
    } catch (e) {
      console.warn("WebGL initialization failed, falling back gracefully without Three.js Canvas: ", e);
    }

    // Limpeza ao desmontar
    return () => {
      try {
        if (resizeObserver) resizeObserver.disconnect();
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        if (renderer && renderer.domElement) {
          renderer.domElement.remove();
        }
        // Disposal para evitar memory leaks
        if (scene) scene.clear();
        if (meshGeo) meshGeo.dispose();
        if (lineMat) lineMat.dispose();
        if (particleGeo) particleGeo.dispose();
        if (particleMat) particleMat.dispose();
      } catch (e) {
        // Silent catch for cleanup
      }
    };
  }, []);

  // Efeito interativo GSAP engatado nos estágios ativos do painel cyber
  useEffect(() => {
    if (!sceneRef.current || !meshRef.current || !particlesRef.current || !cameraRef.current) return;

    // Paleta de CORES Cyberpunk que alternam conforme a etapa atualizada
    const cyberpunkColors = [
      { primary: 0xe21b5a, accent: 0x00f5ff }, // Normal (Clean)
      { primary: 0xff007f, accent: 0xff5500 }, // Pink Cyber
      { primary: 0x00ffcc, accent: 0x3300ff }, // Blue HUD
      { primary: 0x8800ff, accent: 0x00ff66 }, // Iris Pulse
      { primary: 0xffd700, accent: 0xff3300 }, // Banana Metal/Gold
      { primary: 0xff003c, accent: 0x00f0ff }, // Full Cyber Supremo
    ];

    const colors = cyberpunkColors[activeStage % cyberpunkColors.length];

    // Timeline GSAP sincronizada com o stage change
    const tl = gsap.timeline();

    // 1. Zoom na câmera (efeito de impacto de sintonia laser)
    tl.to(cameraRef.current.position, {
      z: 21,
      duration: 0.15,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(cameraRef.current!.position, {
          z: 25,
          duration: 0.45,
          ease: 'elastic.out(1, 0.6)',
        });
      }
    });

    // 2. Rotação súbita no Icosaedro (Spins ultra luxuosos)
    tl.to(meshRef.current.rotation, {
      y: `+=2.1`,
      x: `+=1.4`,
      duration: 0.5,
      ease: 'bounce.out',
    }, 0);

    // 3. Modulação de cores nos materiais via GSAP
    const pMaterial = particlesRef.current.material as THREE.PointsMaterial;
    tl.to(pMaterial.color, {
      r: new THREE.Color(colors.primary).r,
      g: new THREE.Color(colors.primary).g,
      b: new THREE.Color(colors.primary).b,
      duration: 0.4,
      ease: 'sine.out',
    }, 0);

    // Modificar o tamanho das partículas temporariamente no switch
    tl.to(pMaterial, {
      size: 0.5,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
      ease: 'power1.inOut',
    }, 0);

  }, [activeStage]);

  // Efeito GSAP para o Glitch e Vibração Sísmica Cyber
  useEffect(() => {
    if (!cameraRef.current || !meshRef.current || !particlesRef.current || !isGlitching) return;

    // Disparar uma explosão/vibração de câmera quando o glitch está ativo
    const glitchShake = () => {
      gsap.to(cameraRef.current!.position, {
        x: `+=${(Math.random() - 0.5) * 1.8}`,
        y: `+=${(Math.random() - 0.5) * 1.8}`,
        z: 25 + (Math.random() - 0.5) * 3,
        duration: 0.05,
        repeat: 4,
        yoyo: true,
        ease: 'none',
        onComplete: () => {
          gsap.to(cameraRef.current!.position, {
            x: mouse.current.x * 3.5,
            y: mouse.current.y * 3.5,
            z: 25,
            duration: 0.25,
            ease: 'power1.out',
          });
        }
      });

      // Modula a escala do Icosaedro central no glitch
      gsap.to(meshRef.current!.scale, {
        x: 1.35,
        y: 1.35,
        z: 1.35,
        duration: 0.08,
        yoyo: true,
        repeat: 3,
        ease: 'none',
        onComplete: () => {
          gsap.to(meshRef.current!.scale, { x: 1, y: 1, z: 1, duration: 0.1 });
        }
      });
    };

    glitchShake();
  }, [isGlitching]);

  return (
    <div 
      id="three-interactive-canvas-container"
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-80"
    />
  );
}
