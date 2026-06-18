import { personalInfo } from '../data';
import { Mail, MapPin, Phone, Linkedin, Github } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 xl:px-24 bg-[#ffffff] relative overflow-hidden">
      {/* Luz ambiente de fundo cor de vermelha sutil */}
      <div className="absolute top-1/4 right-[10%] w-96 h-96 bg-red-500/[0.02] rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 left-[5%] w-[450px] h-[450px] bg-red-500/[0.01] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto z-10 relative flex flex-col items-center text-center">
        <span className="font-mono text-xs text-red-600 tracking-[0.2em] uppercase font-bold">Comunicação e Sinais</span>
        <h2 className="font-sans font-extrabold text-4xl uppercase tracking-tight text-gray-900 mt-1 mb-6">
          Construa Conexões
        </h2>
        <p className="text-gray-600 font-sans font-light text-base leading-relaxed max-w-lg mb-12">
          Estou sempre em busca de novas parcerias, propostas de projetos revolucionários ou apenas trocar ideias sobre o futuro do web dev e animações. Sinta-se à vontade para se conectar.
        </p>

        {/* Detalhes de contato */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-16 w-full">
          
          {/* Email */}
          <div className="flex flex-col items-center gap-3 group">
            <a href={`mailto:${personalInfo.email}`} className="w-16 h-16 rounded-2xl border border-black/10 bg-black/[0.02] flex items-center justify-center text-red-600 transition-all hover:border-red-500/50 hover:bg-red-50 hover:scale-105 cursor-pointer shadow-sm">
              <Mail className="w-6 h-6" />
            </a>
            <div className="space-y-1">
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">EMAIL DIRECT</p>
              <a href={`mailto:${personalInfo.email}`} className="text-gray-900 hover:text-red-600 font-mono text-sm transition-colors break-all">
                {personalInfo.email}
              </a>
            </div>
          </div>

          {/* Localização */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl border border-black/10 bg-black/[0.02] flex items-center justify-center text-gray-800 shadow-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">LOCAL CONCENTRATION</p>
              <p className="text-gray-900 font-sans text-sm">{personalInfo.location}</p>
            </div>
          </div>

          {/* Telefone */}
          <div className="flex flex-col items-center gap-3 group">
            <a href="https://wa.me/5521991214678" target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-2xl border border-black/10 bg-black/[0.02] flex items-center justify-center text-emerald-600 transition-all hover:border-emerald-500/50 hover:bg-emerald-50 hover:scale-105 cursor-pointer shadow-sm">
              <Phone className="w-6 h-6" />
            </a>
            <div className="space-y-1">
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">WHATSAPP</p>
              <a href="https://wa.me/5521991214678" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-emerald-600 font-mono text-sm transition-colors">
                +55 (21) 99121-4678
              </a>
            </div>
          </div>

        </div>

        {/* Redes Sociais */}
        <div className="mt-16 pt-8 border-t border-black/10 w-full max-w-sm">
          <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-4">SINAIS SOCIAIS</span>
          <div className="flex justify-center gap-4">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/10 hover:border-black/30 hover:text-black hover:scale-105 transition-all bg-black/[0.02] flex items-center justify-center text-gray-600 cursor-pointer shadow-sm">
              <Github className="w-5 h-5" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-black/10 hover:border-black/30 hover:text-black hover:scale-105 transition-all bg-black/[0.02] flex items-center justify-center text-gray-600 cursor-pointer shadow-sm">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
