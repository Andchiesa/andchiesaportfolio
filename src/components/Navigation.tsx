import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Cpu, User, Film, Mail, Sparkles } from 'lucide-react';
import { personalInfo } from '../data';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localTime, setLocalTime] = useState('');

  // Sincronizar o relógio local do usuário para um ar de precisão de estúdio cinematográfico
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('pt-BR', { hour12: false });
      setLocalTime(timeStr);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Sobre', icon: User },
    { id: 'metrics', label: 'Eficiência', icon: Cpu },
    { id: 'lab3d', label: 'Lab 3D', icon: Sparkles },
    { id: 'projects', label: 'Portfólio', icon: Film },
    { id: 'contact', label: 'Contato', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    onSectionChange(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 glass-panel-light py-4 px-6 md:px-12 flex justify-between items-center transition-all bg-gradient-to-b from-white/70 via-white/40 to-transparent">
        {/* Logo / Stylized Branding */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center cursor-pointer group select-none"
          id="nav_logo"
        >
          <div className="flex items-baseline font-sans">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight uppercase animate-text-reflect">
              Anderson
            </span>
            <span className="inline-block animate-typewriter ml-1 group-hover:translate-x-1.5 transition-all duration-300">
              <span className="font-serif italic text-lg sm:text-xl text-red-600 font-medium tracking-wide group-hover:font-sans group-hover:font-extrabold group-hover:not-italic group-hover:uppercase group-hover:tracking-tight animate-text-reflect-chiesa inline-block">
                Chiesa
              </span>
            </span>
            <span className="w-1.5 h-1.5 bg-red-600 rounded-full ml-1 shrink-0 group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </div>

        {/* Tags de status e filtros (inspiradas no topo da imagem 0/1) */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono">
          <div className="border border-black/10 px-3 py-1.5 rounded-full bg-black/[0.02] text-gray-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span>Creative R&D</span>
          </div>
          <div className="border border-black/10 px-3 py-1.5 rounded-full bg-black/[0.02] text-gray-700">
            <span>Adaptive UI</span>
          </div>
          <div className="border border-black/10 px-3 py-1.5 rounded-full bg-black/[0.02] text-gray-700">
            <span>Cinematic Quality</span>
          </div>
        </div>

        {/* Botão Menu Interativo (reprodução fiel das imagens 0/1) */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right font-mono text-[10px] text-gray-600">
            <p>LATENCY: 12MS</p>
            <p>UTC: {localTime || '...'}</p>
          </div>

          <button 
            id="menu_toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 bg-[#111217] text-white px-4 py-2 rounded-full font-bold text-xs tracking-wider uppercase transition-all hover:bg-black hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
            </span>
            <span>{isOpen ? 'Fechar' : 'Menu'}</span>
          </button>
        </div>
      </header>

      {/* Menu Overlay Cinemático */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="menu_overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 overflow-y-auto flex flex-col justify-start md:justify-center items-center px-6 pt-36 pb-12 md:py-12 md:px-24"
          >
            {/* Grid circular de fundo */}
            <div className="absolute inset-0 grid-overlay opacity-50 pointer-events-none" />
            
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 z-10">
              {/* Esquerda: Links grandes */}
              <div className="flex flex-col justify-center space-y-6">
                <span className="font-mono text-xs text-gray-400 tracking-[0.2em] uppercase">Módulos Nav</span>
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => handleNavClick(item.id)}
                        className="text-left py-2 font-sans font-bold text-4xl md:text-5xl tracking-tight text-gray-500 hover:text-red-600 transition-colors flex items-center gap-4 group cursor-pointer"
                      >
                        <span className="font-mono text-sm text-black/20 group-hover:text-red-500 transition-colors">0{index + 1}</span>
                        <span>{item.label}</span>
                        <ArrowUpRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all w-8 h-8 text-red-500" />
                      </motion.button>
                    );
                  })}
                </nav>
              </div>

              {/* Direita: Card de detalhes - Estilo Editorial Barratt */}
              <div className="border border-black/10 p-8 pt-12 rounded-2xl bg-[#f4f5f7]/80 backdrop-blur-md flex flex-col justify-between space-y-8 relative overflow-hidden text-gray-900 mt-4 md:mt-0">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="pt-8 block">
                  <h3 className="font-serif italic text-3xl text-gray-900 mb-6">{personalInfo.name}</h3>
                  <p className="font-mono text-xs text-red-600 tracking-wider mb-8 uppercase leading-relaxed">{personalInfo.title}</p>
                  <p className="text-sm text-gray-700 leading-relaxed font-sans font-light mt-4">
                    {personalInfo.about}
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-black/10 font-mono text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>EMAIL:</span>
                    <a href={`mailto:${personalInfo.email}`} className="text-gray-900 hover:underline">{personalInfo.email}</a>
                  </div>
                  <div className="flex justify-between">
                    <span>LOCAL:</span>
                    <span className="text-gray-900">{personalInfo.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ESTADO:</span>
                    <span className="text-red-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span> Disponível para Projetos
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
