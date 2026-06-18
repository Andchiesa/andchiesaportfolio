import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { motion } from 'motion/react';
import { Cpu, Zap, Activity, ShieldAlert, Sparkles, Sliders, Play, Eye } from 'lucide-react';

interface Lab3DPreset {
  id: string;
  name: string;
  desc: string;
  primaryColor: string;
  accentColor: string;
  warp: number;
  freq: number;
  speed: number;
  pSize: number;
}

const PRESETS: Lab3DPreset[] = [
  {
    id: 'plasma',
    name: 'Fluxo de Plasma',
    desc: 'Onda térmica orgânica e contínua',
    primaryColor: '#ff0055',
    accentColor: '#00f5ff',
    warp: 1.8,
    freq: 2.5,
    speed: 1.2,
    pSize: 0.35,
  },
  {
    id: 'nebula',
    name: 'Turbulência Cósmica',
    desc: 'Explosão estelar com alta dispersão',
    primaryColor: '#8800ff',
    accentColor: '#00ffaa',
    warp: 3.5,
    freq: 5.0,
    speed: 0.8,
    pSize: 0.5,
  },
  {
    id: 'quantum',
    name: 'Nódulo Quântico',
    desc: 'Simetria geométrica de alta frequência',
    primaryColor: '#00d2ff',
    accentColor: '#ffbb00',
    warp: 0.8,
    freq: 8.0,
    speed: 2.2,
    pSize: 0.22,
  },
  {
    id: 'singularity',
    name: 'Singularidade',
    desc: 'Colapso gravitacional de ultra densidade',
    primaryColor: '#ffffff',
    accentColor: '#ff003c',
    warp: 0.2,
    freq: 1.0,
    speed: 0.4,
    pSize: 0.12,
  },
];

export default function Lab3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parâmetros em estado reativo para a interface de sliders
  const [warpAmplitude, setWarpAmplitude] = useState(1.8);
  const [warpFrequency, setWarpFrequency] = useState(2.5);
  const [pulseSpeed, setPulseSpeed] = useState(1.2);
  const [particleSize, setParticleSize] = useState(0.35);
  const [activePreset, setActivePreset] = useState('plasma');
  const [objectType, setObjectType] = useState<'torus' | 'icosahedron' | 'sphere'>('torus');
  
  // Estatísticas dinâmicas simuladas que batem com as interações do WebGL
  const [gpuLoad, setGpuLoad] = useState(22);
  const [fps, setFps] = useState(60);
  const [vertexCount, setVertexCount] = useState(2400);

  // Referências para o loop Three.js
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particleSystemRef = useRef<THREE.Points | null>(null);
  const wireframeMeshRef = useRef<THREE.LineSegments | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  // Objeto interpolado pelo GSAP para transição suave dos sliders
  const interpParams = useRef({
    warp: 1.8,
    freq: 2.5,
    speed: 1.2,
    pSize: 0.35,
    primaryColor: new THREE.Color('#ff0055'),
    accentColor: new THREE.Color('#00f5ff'),
    rotationSpeedY: 0.15,
  });

  // Listener para monitoramento de FPS e carga de GPU
  useEffect(() => {
    const statInterval = setInterval(() => {
      // Pequenas flutuações realistas de hardware
      setFps(Math.floor(Math.random() * 3) + 58);
      const computedGpu = Math.round(
        15 + 
        (warpAmplitude * 4) + 
        (warpFrequency * 2) + 
        (pulseSpeed * 5) + 
        (objectType === 'torus' ? 10 : 0)
      );
      setGpuLoad(Math.min(computedGpu, 99));
    }, 1000);
    return () => clearInterval(statInterval);
  }, [warpAmplitude, warpFrequency, pulseSpeed, objectType]);

  // Atualizar contagem de vértices baseado no tipo de objeto
  useEffect(() => {
    if (objectType === 'torus') {
      setVertexCount(2400);
    } else if (objectType === 'icosahedron') {
      setVertexCount(642);
    } else {
      setVertexCount(1024);
    }
  }, [objectType]);

  // Sincronizar modificações diretas dos Sliders no Target interpolado
  useEffect(() => {
    interpParams.current.warp = warpAmplitude;
    interpParams.current.freq = warpFrequency;
    interpParams.current.speed = pulseSpeed;
    interpParams.current.pSize = particleSize;
  }, [warpAmplitude, warpFrequency, pulseSpeed, particleSize]);

  // Função para mudar para preset com animação GSAP luxuosa de transição
  const selectPreset = (preset: Lab3DPreset) => {
    setActivePreset(preset.id);

    // Timeline GSAP para animar os parâmetros físicos do holograma 3D suavemente
    const tl = gsap.timeline();

    // Flash visual simulando uma sobrecarga quântica temporária
    tl.to(interpParams.current, {
      warp: preset.warp * 2.2,
      speed: preset.speed * 2.5,
      rotationSpeedY: 1.8,
      duration: 0.25,
      ease: 'power2.out',
      onUpdate: () => {
        // Propaga para os Sliders para feedback visual amigável
        setWarpAmplitude(interpParams.current.warp);
        setPulseSpeed(interpParams.current.speed);
      }
    });

    // Converge os parâmetros para o valor do preset definitivo de forma incrivelmente suave
    tl.to(interpParams.current, {
      warp: preset.warp,
      freq: preset.freq,
      speed: preset.speed,
      pSize: preset.pSize,
      rotationSpeedY: 0.15 + preset.speed * 0.1,
      duration: 1.2,
      ease: 'elastic.out(1, 0.75)',
      onUpdate: () => {
        setWarpAmplitude(interpParams.current.warp);
        setWarpFrequency(interpParams.current.freq);
        setPulseSpeed(interpParams.current.speed);
        setParticleSize(interpParams.current.pSize);
      }
    });

    // Animar transição de cores dos pontos luminosos usando lerp do Three.js
    const targetPrimary = new THREE.Color(preset.primaryColor);
    const targetAccent = new THREE.Color(preset.accentColor);

    gsap.to(interpParams.current.primaryColor, {
      r: targetPrimary.r,
      g: targetPrimary.g,
      b: targetPrimary.b,
      duration: 1.0,
      ease: 'sine.out',
    });

    gsap.to(interpParams.current.accentColor, {
      r: targetAccent.r,
      g: targetAccent.g,
      b: targetAccent.b,
      duration: 1.0,
      ease: 'sine.out',
    });
  };

  // Efeito principal de Setup do Three.js e recriação de geometrias caso o tipo mude
  useEffect(() => {
    if (!containerRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let group: THREE.Group;
    let geometry: THREE.BufferGeometry;
    let particleMaterial: THREE.PointsMaterial;
    let wireframeMaterial: THREE.LineBasicMaterial;
    let particles: THREE.Points;
    let lines: THREE.LineSegments;
    let resizeObserver: ResizeObserver;
    let controls: OrbitControls;

    try {
      const width = containerRef.current.clientWidth || 600;
      const height = containerRef.current.clientHeight || 500;

      // 1. Setup básico
      scene = new THREE.Scene();
      sceneRef.current = scene;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 18;
      cameraRef.current = camera;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      containerRef.current.innerHTML = ''; // Limpa instâncias anteriores
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // 2. Luzes ambientais e direcionais dinâmicas
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
      scene.add(ambientLight);

      const light1 = new THREE.PointLight(0xff00cc, 3, 50);
      light1.position.set(15, 10, 15);
      scene.add(light1);

      const light2 = new THREE.PointLight(0x00f0ff, 3, 50);
      light2.position.set(-15, -10, 15);
      scene.add(light2);

      group = new THREE.Group();
      scene.add(group);

      // Instanciar OrbitControls
      controls = new OrbitControls(camera, containerRef.current);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      // 3. Criar Geometria Base baseada no Tipo de Objeto
      if (objectType === 'torus') {
        // Torus knot com subdivisões finas para alta fidelidade estética
        geometry = new THREE.TorusKnotGeometry(2.8, 0.9, 150, 16, 2, 3);
      } else if (objectType === 'icosahedron') {
        geometry = new THREE.IcosahedronGeometry(3.5, 3);
      } else {
        geometry = new THREE.SphereGeometry(3.5, 32, 32);
      }

      // Guardar cópia dos vértices originais em Float32Array para aplicar deformações matemáticas dinamicamente
      const positionAttr = geometry.attributes.position;
      const originalPositions = positionAttr.array.slice() as Float32Array;

      // 4. Criação dos Materiais Cyber-Glow
      // Textura de círculo suave programada via canvas
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(120, 240, 255, 0.9)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      const particleTexture = new THREE.CanvasTexture(canvas);

      particleMaterial = new THREE.PointsMaterial({
        size: interpParams.current.pSize,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: interpParams.current.primaryColor,
      });

      wireframeMaterial = new THREE.LineBasicMaterial({
        color: interpParams.current.accentColor,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
      });

      // 5. Instanciar Sistema de Pontos e Linha Crystalline do Holograma
      particles = new THREE.Points(geometry, particleMaterial);
      lines = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), wireframeMaterial);

      group.add(particles);
      group.add(lines);

      particleSystemRef.current = particles;
      wireframeMeshRef.current = lines;

      // 6. Loop de Renderização & Cálculo Matemático de Deformação de Ondas
      const animate = () => {
        if (!rendererRef.current || !sceneRef.current || !group) return;

        const time = clockRef.current.getElapsedTime();

        // Rotação suave da geometria no espaço 3D usando parâmetros do GSAP
        group.rotation.x = time * 0.08;
        group.rotation.y = time * interpParams.current.rotationSpeedY;

        // Recupera valores das variáveis de manipulação física
        const warp = interpParams.current.warp;
        const freq = interpParams.current.freq;
        const speed = interpParams.current.speed;
        const pSize = interpParams.current.pSize;

        // Atualiza tamanho das partículas dinamicamente
        particleMaterial.size = pSize;
        
        // Atualiza cor do material integrando interpolação em tempo real
        particleMaterial.color.copy(interpParams.current.primaryColor);
        wireframeMaterial.color.copy(interpParams.current.accentColor);

        // Deformar as posições dos vértices em tempo real baseado em barulho trigonométrico
        const pos = geometry.attributes.position;
        const arr = pos.array as Float32Array;

        for (let i = 0; i < arr.length / 3; i++) {
          const index = i * 3;
          const ox = originalPositions[index];
          const oy = originalPositions[index + 1];
          const oz = originalPositions[index + 2];

          // Distância do vértice ao centro
          const len = Math.sqrt(ox * ox + oy * oy + oz * oz);

          // Algoritmo matemático para ondas senoides tridimensionais (Perlin-noise simulado)
          const wave = Math.sin(len * freq - time * speed * 3.5) * warp * 0.16;
          
          // Aplica deslocamento na direção normalizada para fora/dentro
          arr[index] = ox + (ox / len) * wave;
          arr[index + 1] = oy + (oy / len) * wave;
          arr[index + 2] = oz + (oz / len) * wave;
        }

        pos.needsUpdate = true;

        controls.update();
        renderer.render(scene, camera);
        animationFrameId.current = requestAnimationFrame(animate);
      };

      animate();

      // 7. Resize Observer para garantir layout responsivo à janela
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
      console.error("Erro na inicialização do Lab3D Three.js:", e);
    }

    // Limpeza completa de memória ao desmontar o componente
    return () => {
      try {
        if (resizeObserver) resizeObserver.disconnect();
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        if (controls) controls.dispose();
        if (rendererRef.current && rendererRef.current.domElement) {
          rendererRef.current.domElement.remove();
        }
        if (sceneRef.current) sceneRef.current.clear();
        if (geometry) geometry.dispose();
        if (particleMaterial) particleMaterial.dispose();
        if (wireframeMaterial) wireframeMaterial.dispose();
      } catch (e) {
        // Catch-all silencioso para desmontagem limpa
      }
    };
  }, [objectType]);

  return (
    <section 
      id="lab3d" 
      className="py-24 px-6 md:px-12 xl:px-24 bg-[#0c0d12] text-white relative overflow-hidden"
    >
      {/* Visual cyber mesh de grade de fundo em cor carmim */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(226,27,90,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-l from-red-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10 relative">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-red-500 tracking-[0.25em] uppercase font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              Ambiente de Simulação de Hardware
            </span>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl uppercase tracking-tight text-white mt-3">
              Laboratório Holográfico 3D
            </h2>
            <p className="text-gray-400 mt-2 max-w-2xl font-sans font-light text-sm sm:text-base">
              Explore uma interface interativa de manipulação WebGL em tempo real. Ajuste as forças físicas matemáticas e veja o GSAP suavizar as equações geométricas.
            </p>
          </div>

          {/* Telemetria de Hardware HUD */}
          <div className="flex flex-wrap items-center gap-3 bg-[rgba(255,255,255,0.02)] border border-[#ffffff10] rounded-xl p-3 font-mono text-xs text-gray-300">
            <div className="pr-4 border-r border-[#ffffff10]">
              <span className="text-[10px] text-gray-500 block uppercase font-bold">FPS ENGINE</span>
              <span className="text-green-400 text-sm font-bold flex items-center gap-1.5 mt-0.5">
                <Activity className="w-3.5 h-3.5" /> {fps} HZ
              </span>
            </div>
            <div className="px-4 border-r border-[#ffffff10]">
              <span className="text-[10px] text-gray-500 block uppercase font-bold">CARGA GPU</span>
              <span className={`${gpuLoad > 75 ? 'text-yellow-400' : 'text-blue-400'} text-sm font-bold block mt-0.5`}>
                {gpuLoad}%
              </span>
            </div>
            <div className="pl-4">
              <span className="text-[10px] text-gray-500 block uppercase font-bold">VÉRTICES 3D</span>
              <span className="text-gray-200 text-sm font-bold block mt-0.5">
                {vertexCount}
              </span>
            </div>
          </div>
        </div>

        {/* Grade de Organização Principal: Dashboard lado a lado */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LADO ESQUERDO: Painel de Controles Estilo Cyber Synthesizer (5 Colunas) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* Bloco de Navegação de Geometria */}
            <div className="bg-[#14161f] border border-[#ffffff08] p-5 rounded-2xl shadow-xl">
              <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest block mb-3 font-bold">01 / Selecione a Matriz 3D</span>
              <div className="grid grid-cols-3 gap-2">
                {(['torus', 'icosahedron', 'sphere'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setObjectType(type)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                      objectType === type 
                        ? 'bg-red-500 hover:bg-red-600 text-white border-red-500 shadow-md scale-[1.03]' 
                        : 'bg-[#1a1d27] hover:bg-[#202432] text-gray-400 border-transparent'
                    }`}
                  >
                    {type === 'torus' ? 'Torus Knot' : type === 'icosahedron' ? 'Icosaedro' : 'Esfera'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bloco de Sliders Físicos Lineares */}
            <div className="bg-[#14161f] border border-[#ffffff08] p-5 rounded-2xl shadow-xl space-y-5">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest font-bold">02 / Ajustes Físicos de Ondas</span>
                <Sliders className="w-4 h-4 text-gray-500" />
              </div>

              {/* Slider 1: Amplitude da Onda */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">AMPLITUDE DA ONDA:</span>
                  <span className="text-red-400 font-bold">{warpAmplitude.toFixed(2)}</span>
                </div>
                <div className="relative h-2 bg-[#202330] rounded-full overflow-hidden flex items-center">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${(warpAmplitude / 5.0) * 100}%` }} />
                  <input 
                    type="range" min="0" max="5" step="0.05" value={warpAmplitude} 
                    onChange={(e) => setWarpAmplitude(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                  />
                </div>
              </div>

              {/* Slider 2: Frequência Matemática */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">FREQUÊNCIA TRIGONOMÉTRICA:</span>
                  <span className="text-blue-400 font-bold">{warpFrequency.toFixed(1)} HZ</span>
                </div>
                <div className="relative h-2 bg-[#202330] rounded-full overflow-hidden flex items-center">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(warpFrequency / 10.0) * 100}%` }} />
                  <input 
                    type="range" min="0.5" max="10" step="0.1" value={warpFrequency} 
                    onChange={(e) => setWarpFrequency(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                  />
                </div>
              </div>

              {/* Slider 3: Velocidade de Oscilação */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">VELOCIDADE DE PULSO:</span>
                  <span className="text-green-400 font-bold">{pulseSpeed.toFixed(2)} FPS</span>
                </div>
                <div className="relative h-2 bg-[#202330] rounded-full overflow-hidden flex items-center">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${(pulseSpeed / 3.0) * 100}%` }} />
                  <input 
                    type="range" min="0.1" max="3" step="0.05" value={pulseSpeed} 
                    onChange={(e) => setPulseSpeed(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                  />
                </div>
              </div>

              {/* Slider 4: Diâmetro das Partículas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">TAMANHO DOS PONTOS NEON:</span>
                  <span className="text-yellow-400 font-bold">{particleSize.toFixed(2)}PX</span>
                </div>
                <div className="relative h-2 bg-[#202330] rounded-full overflow-hidden flex items-center">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${(particleSize / 0.8) * 100}%` }} />
                  <input 
                    type="range" min="0.08" max="0.8" step="0.01" value={particleSize} 
                    onChange={(e) => setParticleSize(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Bloco de Presets Core com gatilhos GSAP */}
            <div className="bg-[#14161f] border border-[#ffffff08] p-5 rounded-2xl shadow-xl">
              <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest block mb-4 font-bold">03 / Gatilhos Rápidos de Simulação</span>
              <div className="grid grid-cols-2 gap-3">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => selectPreset(preset)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-20 cursor-pointer group ${
                      activePreset === preset.id 
                        ? 'bg-[rgba(255,10,80,0.06)] border-red-500 shadow-lg scale-[1.02]' 
                        : 'bg-[#181a24] border-[#ffffff05] hover:bg-[#1f2231] hover:border-[#ffffff10]'
                    }`}
                  >
                    {/* Indicador de cor do Preset */}
                    <div className="flex justify-between items-center w-full z-10">
                      <span className="font-sans font-bold text-xs text-white group-hover:text-red-400 transition-colors">{preset.name}</span>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: preset.primaryColor }} />
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: preset.accentColor }} />
                      </div>
                    </div>
                    <span className="text-[9px] text-gray-500 leading-tight block truncate w-full mt-2 z-10">{preset.desc}</span>
                    <div className="absolute right-2 bottom-2 opacity-10 group-hover:opacity-30 transition-opacity">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* LADO DIREITO: O Visualizador WebGL e Console de Telemetria (7 Colunas) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 items-center w-full">
            
            {/* O Container de Renderização WebGL - Frame de Alta Fidelidade */}
            <div className="w-full aspect-[4/3] rounded-3xl bg-[#090a0f] border border-[#ffffff0c] relative shadow-2xl p-4 overflow-hidden group">
              
              {/* Linha técnica circular e stencils */}
              <div className="absolute top-4 left-4 z-20 flex gap-1.5 items-center font-mono text-[9px] text-gray-500">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>DYNAMIC FEED // STREAM: ACTIVE</span>
              </div>
              <div className="absolute top-4 right-4 z-20 font-mono text-[9px] text-gray-500">
                GRID UNIT: AC-F90
              </div>

              {/* Cantoneiras HUD futuristas */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-red-500/40 pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-red-500/40 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-red-500/40 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-red-500/40 pointer-events-none" />

              {/* Canvas Render Element renderizado pelo Three.js */}
              <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing relative z-10" />

              {/* Mensagem flutuante para incentivar interação de arraste */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 font-mono text-[8px] text-gray-400 tracking-wider flex items-center gap-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity select-none uppercase">
                <Play className="w-1.5 h-1.5 transform rotate-90 text-red-500 fill-current" /> CLIQUE E ARRASTE EM 3D PARA ARROTACIONAR O PORTAL
              </div>
            </div>

            {/* Console de Auditoria de Hardware e Depuração */}
            <div className="w-full bg-[#111218] border border-[#ffffff08] p-4 rounded-2xl font-mono text-xs text-gray-400">
              <div className="flex items-center justify-between border-b border-[#ffffff10] pb-2 mb-2">
                <span className="text-[10px] uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 animate-pulse text-red-500" /> CONSOLE DE LOGS DO VETOR 3D (GSAP INTEGRADO)
                </span>
                <span className="text-[9px] text-gray-600 bg-[#ffffff03] px-2 py-0.5 rounded border border-[#ffffff05]">v2.1</span>
              </div>
              
              <div className="space-y-1.5 text-[10px] leading-relaxed">
                <div>
                  <span className="text-gray-600 font-bold">[INFO]</span> SISTEMA INICIALIZADO COM SUCESSO: <span className="text-green-500">CANVAS TRÊS COORDENADAS</span>. (SHADERS DE TEXTURA PROGRAMADOS)
                </div>
                <div>
                  <span className="text-gray-650 font-bold">[GSAP]</span> ONDAS TRIGONOMÉTRICAS SUAVIZADAS COM <span className="text-blue-400">LERO INTERPOLADO cubic-bezier</span>.
                </div>
                <div>
                  <span className="text-gray-600 font-bold">[DATA]</span> MATRIZ SELECIONADA: <span className="text-yellow-400 uppercase font-bold">{objectType} mesh</span>. MODIFICANDO VÉRTICES COM EXPONENCIAIS TRIDIMENSIONAIS.
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-red-500 font-bold animate-pulse">●</span> EXECUTANDO: <span className="text-gray-200">Math.sin(len * {warpFrequency.toFixed(1)} - time * {pulseSpeed.toFixed(2)}) * {warpAmplitude.toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
