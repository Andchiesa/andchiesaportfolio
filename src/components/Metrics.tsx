import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Settings, RefreshCw, CheckCircle, Flame, Shield, Zap } from 'lucide-react';

export default function Metrics() {
  // Ajuste interativo de 3 estatísticas chaves
  const [efficiency, setEfficiency] = useState(97);
  const [tasks, setTasks] = useState(12000);
  const [industries, setIndustries] = useState(30);

  const [calibrating, setCalibrating] = useState(false);
  const [systemState, setSystemState] = useState('ESTÁVEL');

  const containerRef = useRef<HTMLDivElement>(null);

  // Manipuladores de recalibração simulando IA cinematográfica
  const triggerAutoCalibration = () => {
    if (calibrating) return;
    setCalibrating(true);
    setSystemState('RECALIBRANDO...');

    let start = 0;
    const interval = setInterval(() => {
      setEfficiency(Math.floor(Math.random() * 15) + 85);
      setTasks(Math.floor(Math.random() * 4000) + 10000);
      setIndustries(Math.floor(Math.random() * 20) + 20);
      start++;

      if (start > 12) {
        clearInterval(interval);
        setEfficiency(98);
        setTasks(12500);
        setIndustries(32);
        setCalibrating(false);
        setSystemState('PERFEITO');
        setTimeout(() => setSystemState('ESTÁVEL'), 3000);
      }
    }, 150);
  };

  return (
    <section 
      id="metrics" 
      className="py-24 px-6 md:px-12 xl:px-24 bg-[#fafafb] relative overflow-hidden"
      ref={containerRef}
    >
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      
      {/* Luz ambiente de fundo cor vermelha delicada */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10 relative">
        
        {/* Título de Seção & Status de Controle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs text-red-600 tracking-[0.2em] uppercase font-bold">Módulos de Controle</span>
            <h2 className="font-sans font-extrabold text-4xl uppercase tracking-tight text-gray-900 mt-2">
              Performance & Impacto
            </h2>
          </div>
          
          {/* Painel de Controle de Sinal */}
          <div className="flex items-center gap-4 bg-black/[0.02] border border-black/10 py-2.5 px-4 rounded-full font-mono text-xs">
            <span className="text-gray-500">SINAL CORE:</span>
            <span className={`w-2.5 h-2.5 rounded-full ${calibrating ? 'bg-red-500 animate-ping' : 'bg-green-500'}`} />
            <span className={calibrating ? 'text-red-600 font-bold' : 'text-green-600'}>{systemState}</span>
            <button
              onClick={triggerAutoCalibration}
              disabled={calibrating}
              className="ml-2 text-gray-700 hover:text-black transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${calibrating ? 'animate-spin text-red-500' : 'text-gray-500'}`} />
              <span className="text-[10px] hidden sm:inline font-bold">RECALIBRAR</span>
            </button>
          </div>
        </div>

        {/* Layout De Métricas Baseado em MachinaFusion (Imagens 0 e 1) */}
        <div className="space-y-12">
          
          {/* Métrica 01: Eficiência Operacional */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 border-b border-black/10 group">
            {/* Esquerda: Número Gigante e Descrição */}
            <div className="lg:col-span-4 flex items-center gap-6">
              <div className="text-left">
                <span className="font-mono text-[10px] text-gray-400 uppercase">Módulo 01</span>
                <h3 id="efficiency_value" className="font-sans font-extrabold text-6xl md:text-7xl text-gray-900 tracking-tight leading-none mt-1">
                  {efficiency}%
                </h3>
                <p className="font-sans font-light text-xs text-gray-600 mt-2 tracking-wider uppercase">Eficiência Operacional</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-black/[0.02] border border-black/10 flex items-center justify-center text-red-600">
                <Zap className="w-4 h-4" />
              </div>
            </div>

            {/* Direita: Slider Interativo com rounded pills e gradientes suaves */}
            <div className="lg:col-span-8 flex items-center gap-4">
              <div className="flex-1 h-10 rounded-full bg-black/[0.01] border border-black/10 p-1 relative flex items-center overflow-hidden">
                {/* Linha preenchida com gradiente */}
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-red-600/20 via-red-500 to-red-600/80 transition-all duration-300"
                  style={{ width: `${efficiency}%` }}
                />
                {/* Marcador de Node Flutuante */}
                <div 
                  className="absolute w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg border border-black/10 transition-all duration-300 pointer-events-none"
                  style={{ left: `calc(${efficiency}% - 34px)` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                </div>

                {/* Input Invisível para Arraste Nativo */}
                <input 
                  type="range"
                  min="50"
                  max="100"
                  value={efficiency}
                  onChange={(e) => setEfficiency(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-15"
                />
              </div>
              <span className="font-mono text-xs text-gray-500 min-w-[35px] text-right">CALIBRADA</span>
            </div>
          </div>

          {/* Métrica 02: Atribuições Ativas / Tarefas */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 border-b border-black/10 group">
            <div className="lg:col-span-4 flex items-center gap-6">
              <div className="text-left">
                <span className="font-mono text-[10px] text-gray-400 uppercase">Módulo 02</span>
                <h3 id="tasks_value" className="font-sans font-extrabold text-6xl md:text-7xl text-gray-900 tracking-tight leading-none mt-1">
                  {(tasks / 1000).toFixed(1)} K
                </h3>
                <p className="font-sans font-light text-xs text-gray-600 mt-2 tracking-wider uppercase">Módulos & Tarefas Coordenados</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-black/[0.02] border border-black/10 flex items-center justify-center text-red-500">
                <Settings className="w-4 h-4" />
              </div>
            </div>

            <div className="lg:col-span-8 flex items-center gap-4">
              <div className="flex-1 h-10 rounded-full bg-black/[0.01] border border-black/10 p-1 relative flex items-center overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-red-500/20 via-red-400 to-red-600 transition-all duration-300"
                  style={{ width: `${(tasks / 15000) * 100}%` }}
                />
                <div 
                  className="absolute w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg border border-black/10 transition-all duration-300 pointer-events-none"
                  style={{ left: `calc(${(tasks / 15000) * 100}% - 34px)` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                </div>

                <input 
                  type="range"
                  min="5000"
                  max="15000"
                  step="100"
                  value={tasks}
                  onChange={(e) => setTasks(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-15"
                />
              </div>
              <span className="font-mono text-xs text-gray-500 min-w-[35px] text-right">LATIVO</span>
            </div>
          </div>

          {/* Métrica 03: Integração Industrial */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 border-b border-black/10 group">
            <div className="lg:col-span-4 flex items-center gap-6">
              <div className="text-left">
                <span className="font-mono text-[10px] text-gray-400 uppercase">Módulo 03</span>
                <h3 id="industries_value" className="font-sans font-extrabold text-6xl md:text-7xl text-gray-900 tracking-tight leading-none mt-1">
                  {industries}+
                </h3>
                <p className="font-sans font-light text-xs text-gray-600 mt-2 tracking-wider uppercase">Sistemas Industriais Conectados</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-black/[0.02] border border-black/10 flex items-center justify-center text-red-600">
                <Shield className="w-4 h-4" />
              </div>
            </div>

            <div className="lg:col-span-8 flex items-center gap-4">
              <div className="flex-1 h-10 rounded-full bg-black/[0.01] border border-black/10 p-1 relative flex items-center overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-red-600/20 via-red-500 to-red-700 transition-all duration-300"
                  style={{ width: `${(industries / 50) * 100}%` }}
                />
                <div 
                  className="absolute w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg border border-black/10 transition-all duration-300 pointer-events-none"
                  style={{ left: `calc(${(industries / 50) * 100}% - 34px)` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                </div>

                <input 
                  type="range"
                  min="10"
                  max="50"
                  value={industries}
                  onChange={(e) => setIndustries(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-15"
                />
              </div>
              <span className="font-mono text-xs text-gray-500 min-w-[35px] text-right">GLOBAL</span>
            </div>
          </div>

        </div>

        {/* Nota explicativa de engenharia de sistema interativo */}
        <p className="mt-12 text-center text-mono text-[10px] text-gray-400 tracking-wider font-light">
          *AS BARRAS DE SELEÇÃO ACIMA SÃO INTERATIVAS. EXPLORE E MODIFIQUE OS PARÂMETROS PARA AJUSTAR A COORDENAÇÃO DE HARDWARE.
        </p>

      </div>
    </section>
  );
}
