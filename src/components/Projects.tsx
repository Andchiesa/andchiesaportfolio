import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data';
import { Project } from '../types';
import { 
  ArrowUpRight, 
  X, 
  Sparkles, 
  AlertCircle, 
  Layout, 
  Code, 
  Activity, 
  ShieldCheck, 
  Play, 
  Eye, 
  ExternalLink, 
  Globe, 
  Book, 
  Languages, 
  Check, 
  Copy 
} from 'lucide-react';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  
  // Custom states inside modal for active video and buy link
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeBuyUrl, setActiveBuyUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Sync state whenever selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      if (selectedProject.ytVideos && selectedProject.ytVideos.length > 0) {
        setActiveVideoId(selectedProject.ytVideos[0].id);
        setActiveBuyUrl(selectedProject.ytVideos[0].buyUrl || selectedProject.buyUrl || null);
      } else {
        setActiveVideoId(selectedProject.youtubeId || null);
        setActiveBuyUrl(selectedProject.buyUrl || null);
      }
    } else {
      document.body.style.overflow = '';
      setActiveVideoId(null);
      setActiveBuyUrl(null);
    }
    setCopied(false);

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const handleCopyLink = () => {
    if (!selectedProject) return;
    const shareText = `Explore o projeto "${selectedProject.title}" desenvolvido por Anderson Chiesa. Client: ${selectedProject.client || 'Autoral'}.`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Unique categories of projects based on updated items
  const categories = ['todos', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filters of projects based on active categories
  const filteredProjects = activeCategory === 'todos'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 xl:px-24 bg-[#ffffff] relative overflow-hidden">
      {/* Cinematic subtle background glowing meshes */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-red-500/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10 relative">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-mono text-xs text-red-600 tracking-[0.2em] uppercase font-bold">Portfólio Selecionado</span>
            <h2 className="font-sans font-extrabold text-4xl uppercase tracking-tight text-gray-900 mt-1">
              Laboratório de Projetos
            </h2>
            <p className="text-gray-500 font-sans text-xs mt-1">
              Explore sistemas, e-books, áudio-guias e treinamentos interativos desenvolvidos com máxima performance.
            </p>
          </div>

          {/* Filtros de Categoria estilo "Barratt" e "NeoVision" */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                id={`filter_${category.replace(/\s+/g, '_').toLowerCase()}`}
                onClick={() => setActiveCategory(category)}
                className={`py-2 px-4 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#111217] text-white font-bold shadow-md'
                    : 'bg-black/[0.02] border border-black/10 text-gray-600 hover:text-black hover:border-black/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grelha de Projetos com transição fluida */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                id={`project_card_${project.id}`}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="group relative cursor-pointer border border-black/10 bg-white/60 rounded-2xl overflow-hidden glass-panel hover:border-red-500/30 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                {/* Imagem do Projeto com zoom cinemático e sobreposição de sombra */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 flex items-center justify-center">
                  {/* Linha laser de scan ao deitar hover */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500 to-transparent translate-y-[-10px] group-hover:animate-[pan-laser_2s_ease-in-out_infinite] z-20" />
                  
                  {!failedImages[project.id] ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImages(prev => ({ ...prev, [project.id]: true }))}
                      className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-neutral-50 via-gray-100 to-red-50/40 flex flex-col justify-between p-4 relative font-mono text-[9px] text-gray-500">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.03)_0%,_transparent_75%)] pointer-events-none" />
                      <div className="flex justify-between items-start z-10 select-none">
                        <span>SYSTEM: AC_GRID // PROJ_{project.id}</span>
                        <span className="text-red-500 font-bold animate-pulse uppercase">REDATIVE_COVER</span>
                      </div>
                      <div className="flex-1 flex flex-col items-center justify-center my-2 text-center z-10 px-2 space-y-1 select-none">
                        <span className="font-sans font-extrabold text-[#111217] uppercase text-xs tracking-tight line-clamp-2">
                          {project.title}
                        </span>
                        <span className="text-red-600 font-bold tracking-widest text-[8px] uppercase">
                          {project.client || 'CREATIVE PROJECT'}
                        </span>
                      </div>
                      <div className="flex justify-between items-end z-10 border-t border-black/5 pt-1.5 text-[8px] select-none">
                        <span>LAT: 22.9068° S</span>
                        <span className="font-bold text-gray-700">RIO DE JANEIRO</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                  
                  {/* Tag Flutuante de Categoria */}
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md border border-black/10 py-1 px-2.5 rounded-md font-mono text-[9px] text-gray-800 tracking-wider uppercase">
                    {project.category}
                  </div>

                  {/* Play Video / View Info Hover Overlay Indicator */}
                  <div className="absolute inset-0 bg-[#111217]/20 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center pointer-events-none z-10">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-red-600 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all">
                      {project.youtubeId || project.ytVideos ? <Play className="w-5 h-5 fill-red-600" /> : <Eye className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Info Text */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                       <span className="font-mono text-xs text-red-600 font-semibold uppercase tracking-wider">
                         {project.client || 'Projeto Autoral'}
                       </span>
                      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-red-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <h3 className="font-sans font-bold text-lg text-gray-950 group-hover:text-red-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 font-sans font-light text-xs leading-relaxed mt-2 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Etiquetas Técnicas */}
                  <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-black/5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="font-mono text-[9px] text-red-700 font-medium py-0.5 px-2 rounded-md bg-red-100/30 border border-red-500/10">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="font-mono text-[9px] text-gray-500 py-0.5 px-1 font-semibold">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal de Detalhe de Projeto Cinemático */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#0a0b0d]/90 backdrop-blur-md p-4 md:p-8 flex items-center justify-center"
              id="project_details_modal"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl bg-white border border-black/10 rounded-2xl overflow-hidden shadow-2xl relative max-h-full flex flex-col"
              >
                {/* Adorno Cinematográfico de Scanner */}
                <div className="h-[3px] w-full shrink-0 bg-gradient-to-r from-red-500/20 via-red-600 to-red-500/20" />

                {/* Botão de Fechar */}
                <button
                  id="close_modal"
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-20 w-8 h-8 rounded-full border border-neutral-200 bg-white/90 flex items-center justify-center text-gray-500 hover:text-black hover:border-neutral-300 transition-all cursor-pointer shadow-md"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 overflow-y-auto flex-1">
                  {/* Esquerda: Banner / Player de Vídeo Interativo */}
                  <div className="lg:col-span-7 space-y-6">
                    {activeVideoId ? (
                      <div className="space-y-4">
                        {/* Monitor / Bezel Estilo Cinema com som sutil */}
                        <div className="relative aspect-[16/10] bg-black rounded-xl overflow-hidden border-2 border-[#111217] shadow-xl flex flex-col justify-between">
                          <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(0,0,0,0.5)_100%)] opacity-40" />
                          <div className="w-full h-full relative z-0">
                            <iframe
                              key={activeVideoId}
                              src={`https://www.youtube.com/embed/${activeVideoId}?rel=0&modestbranding=1&autoplay=0`}
                              title={selectedProject.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="w-full h-full border-none"
                            />
                          </div>
                        </div>

                        {/* Versões de Vídeo Disponíveis (para LinkedIn PT/EN) */}
                        {selectedProject.ytVideos && selectedProject.ytVideos.length > 0 && (
                          <div className="p-3 bg-neutral-50 border border-neutral-200/60 rounded-xl space-y-2">
                            <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1.5">
                              <Languages className="w-3.5 h-3.5 text-red-600" /> VERSÕES INTEGRADAS (SELECIONE IDIOMA)
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {selectedProject.ytVideos.map((vid) => (
                                <button
                                  key={vid.id}
                                  onClick={() => {
                                    setActiveVideoId(vid.id);
                                    if (vid.buyUrl) setActiveBuyUrl(vid.buyUrl);
                                  }}
                                  className={`py-2 px-3 rounded-lg font-mono text-[10px] text-left transition-all cursor-pointer border flex items-center justify-between ${
                                    activeVideoId === vid.id
                                      ? 'bg-red-50 text-red-700 border-red-500/20 font-bold'
                                      : 'bg-white text-gray-600 border-neutral-200 hover:bg-neutral-100 hover:text-black'
                                  }`}
                                >
                                  <span className="truncate">{vid.label}</span>
                                  {activeVideoId === vid.id && <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Painel de Controle de Instrumentos ("Telemetry Console") */}
                        <div className="p-4 bg-neutral-900 text-white rounded-xl space-y-3 shadow-inner relative overflow-hidden">
                          {/* Grid e laser overlay sutil */}
                          <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.02] to-transparent pointer-events-none" />
                          <div className="flex justify-between items-center pb-2 border-b border-white/5">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                              <span className="font-mono text-[10px] text-gray-400 tracking-wider">MÓDULO DE TRANSMISSÃO INTERATIVA</span>
                            </div>
                            <span className="font-mono text-[9px] text-red-400 font-bold bg-red-500/10 py-0.5 px-2 rounded">
                              CONSOLE LIVE
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="space-y-0.5">
                              <span className="font-mono text-[8px] text-gray-500 block uppercase">Canal de Vídeo</span>
                              <span className="font-mono text-[11px] text-gray-300 font-semibold block truncate">ID_{activeVideoId}</span>
                            </div>
                            <div className="space-y-0.5">
                              <span className="font-mono text-[8px] text-gray-500 block uppercase">Qualidade UI</span>
                              <span className="font-mono text-[11px] text-gray-300 font-semibold block">FHD 1080p</span>
                            </div>
                            <div className="space-y-0.5">
                              <span className="font-mono text-[8px] text-gray-500 block uppercase">Latência Processamento</span>
                              <span className="font-mono text-[11px] text-gray-300 font-semibold block">12 ms (Estável)</span>
                            </div>
                            <div className="space-y-0.5">
                              <span className="font-mono text-[8px] text-gray-500 block uppercase">Sincronia Áudio</span>
                              <span className="font-mono text-[11px] text-gray-300 font-semibold block">Linear PCM</span>
                            </div>
                          </div>

                          {/* Soundwave wave visualizer */}
                          <div className="pt-2 border-t border-white/5 space-y-1.5">
                            <span className="font-mono text-[8px] text-gray-500 block uppercase">Frequência Térmica Digital (Visualização Dinâmica)</span>
                            <div className="h-6 flex items-end gap-1 px-1 py-0.5 bg-black/60 rounded border border-white/5 group overflow-hidden">
                              {[35, 60, 45, 90, 75, 40, 60, 85, 30, 50, 75, 95, 40, 65, 80, 55, 35, 70, 90, 45, 60].map((h, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ height: "20%" }}
                                  animate={{ height: [`${h * 0.4}%`, `${h * 0.9}%`, `${h * 0.5}%`, `${h * 0.4}%`] }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 1.2 + (i % 3) * 0.2,
                                    ease: "easeInOut",
                                    delay: i * 0.05
                                  }}
                                  className="flex-1 bg-gradient-to-t from-red-600 via-red-500 to-red-400 rounded-sm"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Sem vídeo configurado (Ex: Metalurgia Física)
                      <div className="space-y-4">
                        <div className="relative aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden border border-black/10 flex items-center justify-center">
                          {!failedImages[selectedProject.id] ? (
                            <img
                              src={selectedProject.image}
                              alt={selectedProject.title}
                              referrerPolicy="no-referrer"
                              onError={() => setFailedImages(prev => ({ ...prev, [selectedProject.id]: true }))}
                              className="w-full h-full object-cover object-center"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-tr from-neutral-50 via-gray-100 to-red-50/40 flex flex-col justify-between p-6 relative font-mono text-[9px] text-gray-500">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.03)_0%,_transparent_75%)] pointer-events-none" />
                              <div className="flex justify-between items-start z-10 select-none">
                                <span>SYSTEM: AC_GRID // PROJ_{selectedProject.id}</span>
                                <span className="text-red-500 font-bold animate-pulse uppercase">REDATIVE_COVER</span>
                              </div>
                              <div className="flex-1 flex flex-col items-center justify-center my-2 text-center z-10 px-4 space-y-1 select-none">
                                <span className="font-sans font-extrabold text-[#111217] uppercase text-sm tracking-tight line-clamp-2">
                                  {selectedProject.title}
                                </span>
                                <span className="text-red-650 font-bold tracking-widest text-[9px] uppercase">
                                  {selectedProject.client || 'CREATIVE PROJECT'}
                                </span>
                              </div>
                              <div className="flex justify-between items-end z-10 border-t border-black/5 pt-1.5 text-[8px] select-none">
                                <span>LAT: 22.9068° S</span>
                                <span className="font-bold text-gray-700">RIO DE JANEIRO</span>
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                        </div>
                        {/* Painel informativo alternativo estilo livro digital ou material corporativo */}
                        <div className="p-4 bg-[#fafafb] border border-black/10 rounded-xl space-y-3 shadow-sm">
                          <div className="flex items-center gap-2">
                            <Book className="w-4 h-4 text-red-600" />
                            <span className="font-mono text-[10px] text-gray-700 tracking-wider font-extrabold uppercase">Massa Teórica: E-Book Científico</span>
                          </div>
                          <p className="text-gray-600 font-sans text-xs leading-relaxed">
                            Este projeto foi estruturado utilizando conceitos editoriais modernos de tipografia e diagramação técnica científica. Consolida dados analíticos profundos de engenharia térmica e metalúrgica de forma clara, harmônica e visualmente elegante para engenheiros e inspetores técnicos.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Tecnologias */}
                    <div>
                      <h4 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-3">CONECTIVIDADES E FERRAMENTAS</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs text-red-700 font-medium py-1 px-3 rounded-full border border-red-200 bg-red-100/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Direita: Textos, Escopo Técnico e Dados de Impacto */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
                    <div>
                      <span className="font-mono text-xs text-red-600 uppercase tracking-widest font-bold block mb-1">
                        SISTEMA DE PORTFÓLIO / PROJETO 0{selectedProject.id}
                      </span>
                      <h3 className="font-sans font-extrabold text-2xl text-gray-900 leading-tight">
                        {selectedProject.title}
                      </h3>
                      
                      <div className="mt-2 flex items-center gap-2">
                        <span className="bg-neutral-100 text-neutral-800 text-[10px] font-semibold py-0.5 px-2.5 rounded border border-neutral-200">
                          PARCEIRO: {selectedProject.client || 'AUTORAL'}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 font-sans font-light text-sm leading-relaxed mt-4">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    {/* Tabela de Estatísticas do Projeto */}
                    <div>
                      <h4 className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-3">DADOS DE PERFORMANCE E ESCOPO</h4>
                      <div className="space-y-2">
                        {selectedProject.metrics && selectedProject.metrics.length > 0 ? (
                          selectedProject.metrics.map((metric, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center py-2 px-3 rounded-lg bg-black/[0.01] border border-black/5 font-mono text-xs"
                            >
                              <span className="text-gray-500 font-medium">{metric.label.toUpperCase()}</span>
                              <span className="text-gray-900 font-extrabold">{metric.value}</span>
                            </div>
                          ))
                        ) : (
                          <div className="py-2.5 px-3 rounded-lg bg-black/[0.01] border border-black/5 font-mono text-[11px] text-gray-400 italic text-center">
                            Apresentação interativa e audiovisual sem dados estatísticos obrigatórios.
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Ações e Links */}
                    <div className="space-y-3 pt-4 border-t border-black/5">
                      {activeBuyUrl && (
                        <a
                          href={activeBuyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-red-500/10 hover:-translate-y-0.5"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>
                            {selectedProject.title.includes('Audiobook')
                              ? 'Adquirir Audiobook / Ver Conteúdo'
                              : selectedProject.category === 'E-books & Audiobooks'
                              ? 'Adquirir E-book / Ver Conteúdo'
                              : selectedProject.title.toLowerCase().includes('coleta')
                              ? 'Acessar Coleta Onhold'
                              : 'Visitar Sistema On-line'}
                          </span>
                        </a>
                      )}

                      <button
                        onClick={handleCopyLink}
                        className={`w-full py-3 px-4 rounded-xl border font-mono text-xs uppercase cursor-pointer flex items-center justify-center gap-2 transition-all ${
                          copied
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'bg-white text-gray-700 border-neutral-300 hover:bg-neutral-100 hover:text-black'
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span>COPIADO COMPACTO!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-gray-500" />
                            <span>COMPARTILHAR TRANSMISSÃO</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2 font-mono text-[9px] text-gray-500 leading-normal pt-1 justify-center">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-500/60" />
                        <span>PROJETO AUDITADO E INTEGRADO AO CANAL PRINCIPAL.</span>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
