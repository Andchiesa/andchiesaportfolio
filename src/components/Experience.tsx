import { motion } from 'motion/react';
import { timeline, skills } from '../data';
import { Briefcase, Milestone, Award, CircleDot } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 xl:px-24 bg-[#fafafb] relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-red-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Esquerda: Linha do Tempo Profissional (Estilo Editorial Barratt) */}
          <div className="lg:col-span-7">
            <span className="font-mono text-xs text-red-600 tracking-[0.2em] uppercase font-bold">Histórico Profissional</span>
            <h2 className="font-sans font-extrabold text-4xl uppercase tracking-tight text-gray-900 mt-1 mb-12">
              Linhagem de Desenvolvimento
            </h2>

            <div className="space-y-12 relative border-l border-black/10 ml-4 pl-8 pt-2">
              {timeline.map((event, index) => (
                <div key={index} className="relative group">
                  {/* Círculo Indicador no Trilho Lateral */}
                  <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full border-2 border-black/10 bg-[#fafafb] flex items-center justify-center transition-all group-hover:border-red-500">
                    <CircleDot className="w-2.5 h-2.5 text-gray-400 group-hover:text-red-500 transition-colors" />
                  </div>

                  {/* Detalhes da Experiência */}
                  <span className="font-mono text-xs text-red-600 font-bold">{event.year}</span>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1 mb-4">
                    <h3 className="font-sans font-bold text-xl text-gray-950 group-hover:text-red-600 transition-colors">
                      {event.role}
                    </h3>
                    <span className="hidden sm:inline text-gray-400">/</span>
                    <span className="font-mono text-sm text-gray-600 font-light italic">{event.company}</span>
                  </div>

                  <p className="text-gray-600 font-sans font-light text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {/* Listagem de Conquistas */}
                  <ul className="space-y-2 font-mono text-[11px] text-gray-500 pl-4 border-l border-black/5">
                    {event.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">▪</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Direita: Inventário de Skills & Stack Ativa */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-red-600 tracking-[0.2em] uppercase font-bold">Níveis de Sincronia</span>
              <h2 className="font-sans font-extrabold text-4xl uppercase tracking-tight text-gray-900 mt-1 mb-12">
                Habilidades Técnicas
              </h2>

              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-end font-mono text-xs">
                      <span className="text-gray-700 font-bold hover:text-black transition-colors">{skill.name}</span>
                      <span className="text-red-600 font-semibold">{skill.level}%</span>
                    </div>
                    {/* Barra de progresso micro-indicadora com brilho sutil */}
                    <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.05, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selo editorial de Integridade */}
            <div className="mt-12 p-6 border border-black/10 rounded-xl bg-white/60 flex items-center gap-4 shadow-sm">
              <Award className="w-10 h-10 text-red-500/70" />
              <div className="font-mono text-[10px] text-gray-500 leading-normal">
                <p className="text-gray-900 font-bold mb-1 uppercase">CERTIFICADO E ATIVO</p>
                <p>PRODUÇÕES OTIMIZADAS PARA SUPORTAR RENDERIZAÇÃO EM ARQUITETURAS MODERNAS DE ALTO DESEMPENHO.</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
