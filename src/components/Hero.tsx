import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Mail, Play } from 'lucide-react';
import { personalInfo } from '../data';
import ThreeCanvas from './ThreeCanvas';

// Componente para simular uma falha na escrita/digitação eletrônica (Malfunctioning Typewriter)
function TypingGlitch() {
  const targetText = 'by Anderson Chiesa';
  const [displayText, setDisplayText] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let active = true;

    const runSequence = async () => {
      while (active) {
        // Início: Limpa e inicia
        setDisplayText('');
        setIsGlitching(false);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const chars = targetText.split('');
        let current = '';

        for (let i = 0; i < chars.length; i++) {
          if (!active) return;

          // Simula uma falha crítica de digitação na metade do nome
          if (i === 11) {
            setIsGlitching(true);
            const errors = [
              'Ch1#se__', 
              'Ch[E_R_R_]', 
              'Chies█', 
              'Chi_v_sa'
            ];
            for (const err of errors) {
              setDisplayText(current + err);
              await new Promise((r) => setTimeout(r, 150 + Math.random() * 120));
            }
            // Deleta o erro e volta a digitar
            setIsGlitching(false);
          }

          current += chars[i];
          setDisplayText(current);
          await new Promise((resolve) => setTimeout(resolve, 80 + Math.random() * 70));
        }

        // Mantém o texto correto por um tempo
        await new Promise((resolve) => setTimeout(resolve, 3000));

        // Interferência rápida de sinal no texto finalizado
        if (active) {
          setIsGlitching(true);
          setDisplayText('by And_rson Chie$a');
          await new Promise((r) => setTimeout(r, 120));
          setDisplayText('by Anderson Ch1e█a');
          await new Promise((r) => setTimeout(r, 80));
          setIsGlitching(false);
          setDisplayText(targetText);
        }

        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    };

    runSequence();

    return () => {
      active = false;
    };
  }, []);

  return (
    <span className={`font-serif italic text-3xl sm:text-4xl tracking-wide select-none transition-all duration-75 ${
      isGlitching ? 'text-orange-500 font-mono line-through opacity-80' : 'text-red-600 drop-shadow-sm'
    }`}>
      {displayText}
      <span className="font-sans font-bold text-red-600 animate-pulse ml-0.5">|</span>
    </span>
  );
}

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  // Configuração de animações stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const photoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex flex-col justify-center items-center pt-24 px-6 md:px-12 xl:px-24 overflow-hidden bg-[#fcfcfd]"
    >
      {/* Interactive 3D Three.js Background Ambient Canvas */}
      <ThreeCanvas />

      {/* Background cinematic radial gradient and dotted patterns */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-1" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-red-500/5 to-purple-500/2 rounded-full blur-[120px] pointer-events-none z-1" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/3 to-teal-500/2 rounded-full blur-[100px] pointer-events-none z-1" />

      {/* Grid de Conteúdo Principal */}
      <div className="w-full max-w-7xl flex flex-col items-center justify-center z-10 px-4 text-center">
        
        {/* Conteúdo de Texto e Título Estilo "NeoVision" */}
        <motion.div 
          className="flex flex-col items-center justify-center max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tag de Indexador Editorial */}
          <motion.div 
            variants={itemVariants} 
            className="flex justify-center items-center gap-3 mb-6"
          >
            <span className="font-mono text-xs text-red-600 tracking-[0.2em] uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              PORTFOLIO CREATIVE // VR_X
            </span>
            <div className="h-[1px] w-12 bg-black/10"></div>
            <span className="font-mono text-xs text-gray-500 uppercase">{personalInfo.location}</span>
          </motion.div>

          {/* Nome e Título Gigantes */}
          <motion.div variants={itemVariants} className="space-y-2 mb-6">
            <h1 className="font-sans font-extrabold text-[11vw] sm:text-[8vw] lg:text-[6vw] leading-[1.0] text-gray-900 tracking-tight uppercase">
              DESIGN &
              <span className="styled-gradient-tecnologia">
                TECNOLOGIA
              </span>
            </h1>
            
            {/* Assinatura Secundária com Efeito de Falha Real na Escrita */}
            <motion.div 
              initial={{ opacity: 0, rotate: -1.5 }}
              animate={{ opacity: 1, rotate: -1.0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-4 inline-block min-h-[48px]"
            >
              <TypingGlitch />
            </motion.div>
          </motion.div>

          {/* Biografia Curta */}
          <motion.p 
            variants={itemVariants} 
            className="text-gray-600 font-sans font-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8"
          >
            {personalInfo.subtitle} {personalInfo.about}
          </motion.p>

          {/* Ações interativas */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap justify-center items-center gap-4"
          >
            <button 
              id="hero_btn_portfolio"
              onClick={() => onScrollToSection('projects')}
              className="flex items-center gap-2 bg-[#111217] text-white px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all hover:bg-black active:scale-95 cursor-pointer shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Ver Projetos</span>
            </button>
            
            <button 
              id="hero_btn_contact"
              onClick={() => onScrollToSection('contact')}
              className="flex items-center gap-2 border border-black/10 hover:border-black/30 px-6 py-3.5 rounded-full font-mono text-xs text-gray-800 uppercase tracking-wider transition-all hover:bg-black/5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Fazer Contato</span>
            </button>
          </motion.div>

          {/* Dados e Estatísticas Reais de Anderson */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-wrap justify-center items-center gap-10 mt-12 pt-8 border-t border-black/10 w-full max-w-lg mx-auto"
          >
            <div className="flex justify-center items-center gap-3">
              <span className="font-mono text-3xl font-extrabold text-red-600">7+</span>
              <div className="font-mono text-[10px] text-gray-500 leading-tight uppercase text-left">
                <p>Projetos</p>
                <p>Otimizados</p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <span className="font-mono text-3xl font-extrabold text-gray-900">RJ</span>
              <div className="font-mono text-[10px] text-gray-500 leading-tight uppercase text-left">
                <p>Sediado no</p>
                <p>Rio de Janeiro</p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Indicador de Rolagem Cinemática no rodapé */}
      <div 
        onClick={() => onScrollToSection('metrics')}
        className="mt-16 mb-4 z-10 flex flex-col items-center gap-2 cursor-pointer text-gray-500 hover:text-black transition-colors"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Rolar para Analisar</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-red-600/80" />
        </motion.div>
      </div>
    </section>
  );
}
