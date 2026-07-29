import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Metrics from './components/Metrics';
import Lab3D from './components/Lab3D';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer3D from './components/Footer3D';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  // Rastrear rolagem para atualizar o item de menu ativo em tempo real (scroll spy)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'metrics', 'lab3d', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionChange = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-[#111217] font-sans antialiased relative">
      
      {/* Grade de varredura CRT sutil para acentuar a qualidade cinematográfica */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.15)_100%)] mix-blend-multiply opacity-20" />
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.06)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.01),_rgba(0,255,0,0.005),_rgba(0,0,255,0.01))] bg-[length:100%_4px,_6px_100%] opacity-20" />

      {/* Navegação Global */}
      <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* Conteúdo Principal */}
      <main className="relative">
        
        {/* Seção Hero - Estilo Editorial Barratt + NeoVision */}
        <Hero onScrollToSection={handleSectionChange} />

        {/* Seção de Métricas de Performance - Estilo MachinaFusion */}
        <Metrics />

        {/* Laboratório 3D Interativo - Experiência Imersiva em Three.js & GSAP */}
        <Lab3D />

        {/* Seção de Portfólio de Projetos - Estilo NeoVision */}
        <Projects />

        {/* Linha do Tempo de Experiência e Certificações */}
        <Experience />

        {/* Formulário de Contato e Comunicação */}
        <Contact />

        {/* Rodapé Dinâmico e Interativo com Three.js & GSAP */}
        <Footer3D />

      </main>
    </div>
  );
}
