import { Project, Skill, TimelineEvent } from './types';

export const personalInfo = {
  name: 'Anderson Chiesa',
  title: 'Creative Developer, Interaction Designer & AI Specialist',
  subtitle: 'A interseção perfeita entre design modular, sistemas de inteligência artificial, automações e mídias interativas.',
  about: 'Lidero e desenvolvo projetos amplos de tecnologia e criatividade, englobando design, animações cinemáticas, e-books e audiobooks profissionais de autoria própria, criação de sites responsivos de alta escala, desenvolvimento de sistemas robustos, inteligência artificial integrada e automações otimizadas.',
  email: 'andersonchiesa12@gmail.com',
  github: 'https://andchiesa.github.io/portfolio_andersonchiesa',
  linkedin: 'https://www.linkedin.com/in/achiesa12',
  location: 'Rio de Janeiro, RJ - Brasil',
  phone: '21 99121-4678',
  birthYear: '1998',
  profileImage: 'https://github.com/andchiesa.png',
};

export const skills: Skill[] = [
  { name: 'React / Next.js', category: 'frontend', level: 96, yearExperience: 6 },
  { name: 'TypeScript', category: 'frontend', level: 92, yearExperience: 5 },
  { name: 'Tailwind CSS', category: 'frontend', level: 98, yearExperience: 6 },
  { name: 'Framer Motion / GSAP', category: 'design', level: 95, yearExperience: 4 },
  { name: 'Three.js / WebGL', category: 'frontend', level: 85, yearExperience: 3 },
  { name: 'Node.js / Express', category: 'backend', level: 88, yearExperience: 5 },
  { name: 'Design de Interação', category: 'design', level: 94, yearExperience: 6 },
  { name: 'Animação e Ritmo UI', category: 'design', level: 97, yearExperience: 5 },
  { name: 'Git & workflows CI/CD', category: 'tools', level: 90, yearExperience: 5 },
  { name: 'Inteligência artificial', category: 'tools', level: 98, yearExperience: 6 }
];

export const projects: Project[] = [
  {
    id: '01',
    title: 'E-book: Guia LinkedIn Para Iniciantes',
    category: 'E-books & Audiobooks',
    description: 'Guia definitivo em livro digital para iniciantes explorarem ao máximo o LinkedIn gratuitamente antes de migrarem para versões pagas.',
    longDescription: 'Desenvolvimento e autoria do influente E-book idealizado como um roteiro prático e acionável. Ele guia os leitores nos primeiros grandes passos, ensinando estratégias gratuitas cruciais de posicionamento, networking qualificado e atração de leads antes de requerer assinaturas premium. Inclui versões completas em Português e Inglês com materiais complementares.',
    image: 'https://img.youtube.com/vi/JkUfreQSzXM/hqdefault.jpg',
    tags: ['E-book', 'LinkedIn Hacks', 'Branding Pessoal', 'Bilingue'],
    metrics: [
      { label: 'Formato Principal', value: 'E-book' },
      { label: 'Estratégia Pago vs Grátis', value: '100% Orgânico' },
      { label: 'Canal de Venda', value: 'Google Play Books' }
    ],
    client: 'Autoral',
    ytVideos: [
      { 
        label: 'Versão em Português (Review / Teaser)', 
        id: 'JkUfreQSzXM', 
        buyUrl: 'https://play.google.com/store/books/details/Anderson_Chiesa_Um_Guia_Para_Linkedin_Iniciantes?id=aLZxEQAAQBAJ' 
      },
      { 
        label: 'English Version (Overview / preview)', 
        id: 'Uc9q9QOPBDY', 
        buyUrl: 'https://play.google.com/store/books/details/Anderson_Chiesa_The_Beginner_s_Guide_to_LinkedIn?id=Iy54EQAAQBAJ' 
      }
    ],
    buyUrl: 'https://play.google.com/store/books/details/Anderson_Chiesa_Um_Guia_Para_Linkedin_Iniciantes?id=aLZxEQAAQBAJ'
  },
  {
    id: '16',
    title: 'Audiobook: Guia LinkedIn Para Iniciantes',
    category: 'E-books & Audiobooks',
    description: 'Audiolivro completo para iniciantes explorarem ao máximo o LinkedIn gratuitamente antes de migrarem para versões pagas.',
    longDescription: 'Autoria e narração profissional do Audiobook complementar ao Guia LinkedIn para Iniciantes. Voltado ao consumo dinâmico, ele guia os ouvintes em estratégias de posicionamento corporativo, hunting de vagas e atração de leads de alto nível de maneira orgânica.',
    image: 'https://img.youtube.com/vi/Uc9q9QOPBDY/hqdefault.jpg',
    tags: ['Audiobook', 'LinkedIn Hacks', 'Branding Pessoal', 'Bilingue'],
    metrics: [
      { label: 'Formato Principal', value: 'Audiobook' },
      { label: 'Estratégia Pago vs Grátis', value: '100% Orgânico' },
      { label: 'Canal de Venda', value: 'Google Play Audiobooks' }
    ],
    client: 'Autoral',
    ytVideos: [
      { 
        label: 'Versão em Português (Review / Teaser)', 
        id: 'JkUfreQSzXM', 
        buyUrl: 'https://play.google.com/store/audiobooks/details?id=AQAAAEAqDDRMDM' 
      },
      { 
        label: 'English Version (Overview / preview)', 
        id: 'Uc9q9QOPBDY', 
        buyUrl: 'https://play.google.com/store/audiobooks/details?id=AQAAAEA6nUTdbM' 
      }
    ],
    buyUrl: 'https://play.google.com/store/audiobooks/details?id=AQAAAEAqDDRMDM'
  },
  {
    id: '02',
    title: 'Game Teaser: WarSpace',
    category: 'Motion & Games',
    description: 'Teaser cinematográfico e desenvolvimento de jogo ficcional focado em combates espaciais épicos de alta fidelidade visual.',
    longDescription: 'Concepção criativa, modelagem e edição do teaser oficial de "WarSpace", um jogo de simulação e ação tática espacial em desenvolvimento na Lif3 Digital Media. O fluxo de produção envolve design de som imersivo, transições cinemáticas dinâmicas e o desenvolvimento de dinâmicas espaciais detalhadas para PC e consolas.',
    image: 'https://img.youtube.com/vi/MxZHS1PVV1I/hqdefault.jpg',
    tags: ['Game Teaser', '3D Motion', 'Lif3 Digital Media', 'Sci-fi Art Direction', 'VFX'],
    metrics: [
      { label: 'Estúdio / Publisher', value: 'Lif3 Digital' },
      { label: 'Estilo de Animação', value: 'Cinematic Sound' },
      { label: 'Ciclo de Frame', value: '60fps Teaser' }
    ],
    client: 'Lif3 Digital Media',
    youtubeId: 'MxZHS1PVV1I'
  },
  {
    id: '03',
    title: 'Aplicativo Farol de Avarias',
    category: 'Sistemas & Apps',
    description: 'Aplicativo móvel proprietário focado em otimização, controle e triagem de avarias para a operação logística da Shopee.',
    longDescription: 'Desenvolvimento e design de interface do aplicativo móvel "Farol de Avarias", criado exclusivamente para as hubs de triagem e operação da Shopee. O software atua no controle em tempo real, catalogando avarias de mercadorias com fotos, agilizando em mais de 40% a comunicação de avarias com o centro de distribuição principal.',
    image: 'https://img.youtube.com/vi/ffjS3ZGT4wQ/hqdefault.jpg',
    tags: ['Shopee Operation', 'Sistemas Logísticos', 'Gestão de Qualidade', 'Mobile App', 'Automação'],
    metrics: [
      { label: 'Agilidade Operacional', value: '+40% Comunicação' },
      { label: 'Mecanismo de Logs', value: 'Registro Fotográfico' },
      { label: 'Infraestrutura', value: 'Mobile Native Cloud' }
    ],
    client: 'Shopee Brasil',
    youtubeId: 'ffjS3ZGT4wQ'
  },
  {
    id: '04',
    title: 'Assistente Virtual de Treinamentos DHL',
    category: 'Inteligência Artificial',
    description: 'Agente inteligente de treinamento em realidade conversacional e tutor virtual para operários de hub de supply chain.',
    longDescription: 'Concepção técnica e desenvolvimento do assistente virtual de treinamentos integrada aos sistemas corporativos da DHL Supply Chain. Atuando como um tutor virtual cognitivo, o assistente responde dúvidas técnicas de conferência, expedição e picking, auxiliando na integração autônoma de novos colaboradores na operação diária.',
    image: 'https://img.youtube.com/vi/L-3Bw8xPNvc/hqdefault.jpg',
    tags: ['DHL Supply Chain', 'Assistente Virtual', 'AI Training Agent', 'EdTech', 'Enterprise AI'],
    metrics: [
      { label: 'Precisão Cognitiva', value: '96.2%' },
      { label: 'Redução Ombording', value: '-35% no Lead Time' },
      { label: 'Usuários Ativos Hub', value: '300+ Operacionais' }
    ],
    client: 'DHL Supply Chain',
    youtubeId: 'L-3Bw8xPNvc'
  },
  {
    id: '05',
    title: 'Teaser & Logo: Inventário DHL',
    category: 'Motion & Games',
    description: 'Design de logo e animação cinematográfica comemorativa e explicativa para o time de Gestão de Inventário de Supply Chain.',
    longDescription: 'Desenvolvimento de branding completo, englobando a criação da logo oficial de Inventário DHL Supply Chain e uma animação promocional de alta qualidade. A animação foca no valor estratégico da precisão de estoque, empoderando os times de pátio e auditoria com layouts visuais sofisticados e dinamismo de motion graphics.',
    image: 'https://img.youtube.com/vi/rOrbuvs9Hx8/hqdefault.jpg',
    tags: ['Logo Design', 'Motion Graphics', 'DHL Brand Guidelines', 'Branding Corporativo', 'After Effects'],
    metrics: [
      { label: 'Formatos de Entregas', value: 'Teaser + Vetor' },
      { label: 'Retenção Interna', value: 'Engajamento de Equipe' },
      { label: 'Resolução UI', value: '4K UltraHD Vector' }
    ],
    client: 'DHL Supply Chain',
    youtubeId: 'rOrbuvs9Hx8'
  },
  {
    id: '06',
    title: 'Treinamento: Mapeamento de Erros Shopee',
    category: 'Treinamentos & Tutoriais',
    description: 'Vídeo treinamento estratégico de interface focado no ecossistema e formulário de inconsistências e erros operacionais da Shopee.',
    longDescription: 'Treinamento completo em vídeo roteirizado e editado para capacitar o time operacional e supervisores da Shopee no preenchimento e análise do Formulário de Mapeamento de Erros. Essa iniciativa reduziu a taxa de preenchimento nulo de incidentes operacionais, estruturando dados preciosos de R&D de sistemas.',
    image: 'https://img.youtube.com/vi/FBfe637D5vo/hqdefault.jpg',
    tags: ['Video Treinamento', 'Screen Capture UI', 'Mapeamento de Erros', 'Shopee Logística', 'E-Learning'],
    metrics: [
      { label: 'Redução de Bugs Logs', value: '55% Menos Erros' },
      { label: 'Tempo de Absorção', value: '12 Minutos Curso' },
      { label: 'Precisão Estatística', value: 'Logs Estruturados' }
    ],
    client: 'Shopee Brasil',
    youtubeId: 'FBfe637D5vo'
  },
  {
    id: '07',
    title: 'E-book: Metalurgia Física Smartweld',
    category: 'E-books & Audiobooks',
    description: 'Design editorial técnico avançado e produção científica de E-book com foco em engenharia e metalurgia de soldagem industrial.',
    longDescription: 'Estudo editorial sofisticado, digitação científica e diagramação visual do livro digital técnico "Metalurgia Física" elaborado exclusivamente para a empresa Smartweld Brasil. O material funciona como um guia de engenharia metalúrgica estrutural, apresentando esquemas metalográficos e fluxos científicos aplicados na rotina de soldagem industrial.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    tags: ['Design Editorial', 'Diagramação Técnica', 'Welding Physics', 'Smartweld Brasil', 'Enterprise Ebook'],
    metrics: [
      { label: 'Páginas Diagramadas', value: '84 Páginas' },
      { label: 'Padrão Técnico', value: 'ABNT / Engenharia' },
      { label: 'Parceiro Comercial', value: 'Smartweld Brasil' }
    ],
    client: 'Smartweld Brasil',
    buyUrl: 'https://pay.hotmart.com/Y90912018K?off=xc03ygua&_hi=eyJjaWQiOiIxNjUzMTU2MjIxNDUwODI0OTY4NTgxOTQwNjk0MzAwIiwiYmlkIjoiMTY1MzE1NjIyMTQ1MDgyNDk2ODU4MTk0MDY5NDMwMCIsInNpZCI6IjEwMTc2YjA1YjRlOTQ1Y2FiZDBiYTNjODJhMzJkNjI5In0=.1710093304039&bid=1780424277595'
  },
  {
    id: '08',
    title: 'Site Corporativo: Smartweld Brasil',
    category: 'Sistemas & Apps',
    description: 'Website institucional de alta performance desenvolvido para a Smartweld Brasil, agora integrado com inteligência artificial conversacional e ferramenta inteligente de elegibilidade de cursos.',
    longDescription: 'Concepção e desenvolvimento do canal corporativo oficial da Smartweld Brasil. O portal conta com um avançado agente de IA integrado para responder de forma autônoma a dúvidas e consultas de clientes em tempo real, além de uma ferramenta interativa de elegibilidade que guia os usuários na escolha do curso de soldagem ideal com base em suas qualificações e objetivos.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    tags: ['Agente IA Integrado', 'Elegibilidade de Cursos', 'Next-Gen Landing', 'Tailwind CSS', 'Netlify Deploy'],
    metrics: [
      { label: 'Dúvidas Respondidas', value: 'Em Tempo Real' },
      { label: 'Precisão de Elegibilidade', value: '100% Automatizado' },
      { label: 'LCP Load Time', value: '< 1.1s' }
    ],
    client: 'Smartweld Brasil',
    buyUrl: 'https://smartweldbrasil.netlify.app/'
  },
  {
    id: '09',
    title: 'Portal Oficial: Lif3 Digital Media',
    category: 'Sistemas & Apps',
    description: 'Apresentação digital e institucional sob medida criada para a agência inovadora Lif3 Digital Media.',
    longDescription: 'Desenvolvimento do portal institucional para a Lif3 Digital Media. O sistema foca em expor portfolios criativos, jogos ficcionais e campanhas de mídia com um layout futurista premium, aplicando transições suaves baseadas em curvas bezier e design responsivo de ponta a ponta.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    tags: ['Apresentação Criativa', 'Modern UI Grid', 'GSAP Animation', 'Tailwind', 'Storytelling Digital'],
    metrics: [
      { label: 'Engajamento Médio', value: '+52% de Cliques' },
      { label: 'Taxa de Retenção', value: 'Excelente (Lighthouse)' },
      { label: 'Framework Native', value: 'TypeScript / React' }
    ],
    client: 'Lif3 Digital Media',
    buyUrl: 'https://lif3digitalmedia.com.br/'
  },
  {
    id: '10',
    title: 'Coleta Onhold: Logística Shopee',
    category: 'Sistemas & Apps',
    description: 'Sistema operacional e dashboard de monitoramento em tempo real de coletas pendentes e retidas para a Shopee.',
    longDescription: 'Desenvolvimento estratégico do sistema "Coleta Onhold", elaborado exclusivamente para monitorar o status de mercadorias retidas em hubs logísticos e coletas suspensas da Shopee. Ele provê triagem refinada e logs rápidos de monitoria, otimizando em larga escala o tempo de trancamento de encomendas na malha de coleta.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    tags: ['Logística Realtime', 'Dashboard Operacional', 'Vercel Serverless', 'Triagem de Erros', 'Shopee System'],
    metrics: [
      { label: 'Otimização de Retenção', value: '-28% Lead Time' },
      { label: 'Precisão de Inventário', value: '99.4% em Registros' },
      { label: 'Infraestrutura Cloud', value: 'Vercel Deployment' }
    ],
    client: 'Shopee Brasil',
    buyUrl: 'https://coleta-onhold.vercel.app/'
  },
  {
    id: '11',
    title: 'Tapeçaria Rota 21',
    category: 'Motion & Games',
    description: 'Esse projeto incrível usando modelagem 3D para Tapeçaria Rota 21.',
    longDescription: 'Concepção e modelagem 3D exclusiva para a Tapeçaria Rota 21, produzindo um material de forte impacto visual e precisão estética.',
    image: 'https://img.youtube.com/vi/uYmC7inEkYg/hqdefault.jpg',
    tags: ['Apresentação Criativa', 'Modelagem 3D', 'Motion Graphics', 'Blender', 'Design'],
    metrics: [
      { label: 'Modelos e Assets', value: 'Render 3D Complexo' },
      { label: 'Engine de Animação', value: 'Blender Rendering' },
      { label: 'Definição Cinética', value: 'Full HD 60fps' }
    ],
    client: 'Tapeçaria Rota 21',
    youtubeId: 'uYmC7inEkYg'
  },
  {
    id: '12',
    title: 'Nas Daily - Kap (Samoa)',
    category: 'Motion & Games',
    description: 'Criação de um vídeo para o canal NasDaily, contando a história do incrível Kap.',
    longDescription: 'Edição e criação narrativa para um episódio exclusivo do canal NasDaily na região de Samoa. Explorando o storytelling visual da jornada marcante do criador Kap.',
    image: 'https://img.youtube.com/vi/7Q8UOP0HT-k/hqdefault.jpg',
    tags: ['Storytelling Digital', 'Video Editing', 'NasDaily', 'Content Creation', 'Premiere Pro'],
    metrics: [
      { label: 'Impacto de Visualizações', value: 'Retenção Ampliada' },
      { label: 'Ritmo Narrativo', value: 'Cortes Dinâmicos' },
      { label: 'Pós-Produção', value: 'Sound Design & VFX' }
    ],
    client: 'Nas Daily',
    youtubeId: '7Q8UOP0HT-k'
  },
  {
    id: '13',
    title: 'Encerramento da Jornada - MJRE Construtora',
    category: 'Motion & Games',
    description: 'Criação do encerramento da jornada do conhecimento para a MJRE Construtora, desde a criação da canção até o acompanhamento do time nos trechos.',
    longDescription: 'Produção em vídeo para o encerramento da jornada corporativa na MJRE Construtora. O trabalho englobou desde a concepção musical (criação da canção) ao registro das interações do time, valorizando os eventos institucionais.',
    image: 'https://img.youtube.com/vi/avVYy08Bf5Y/hqdefault.jpg',
    tags: ['Corporate Video', 'Criação Musical', 'Video Maker', 'MJRE Construtora', 'Captação'],
    metrics: [
      { label: 'Formato de Captação', value: 'Vídeo Documentário' },
      { label: 'Trilha Sonora', value: 'Composição Autoral' },
      { label: 'Público Interno', value: 'Engajamento Épico' }
    ],
    client: 'MJRE Construtora',
    youtubeId: 'avVYy08Bf5Y'
  },
  {
    id: '14',
    title: 'FormApp - Registro Digital de Desvios',
    category: 'Treinamentos & Tutoriais',
    description: 'Criação deste FormApp para o registro digital de desvios e treinamento dos auditores que foi criado para realização da auditoria, como uma ferramenta para cada auditor.',
    longDescription: 'Desenvolvimento e design do FormApp "Registro Digital de Desvios" voltado para auditores da operação da área logística. O app é uma ferramenta de triagem para otimizar os registros de não conformidades com alta acessibilidade via plataforma PWA ou web e vem acompanhado de material audiovisual para treinamento do corpo técnico.',
    image: 'https://img.youtube.com/vi/yFZjeGfousQ/hqdefault.jpg',
    tags: ['UX/UI Design', 'Treinamento', 'App Web', 'Auditoria Logística', 'FormApp'],
    metrics: [
      { label: 'Tempo de Registro', value: '-60% Redução' },
      { label: 'Acurácia de Triagem', value: '98% de Eficiência' },
      { label: 'Acessibilidade PWA', value: 'Offline-First' }
    ],
    client: 'Audit Logistics',
    youtubeId: 'yFZjeGfousQ'
  },
  {
    id: '15',
    title: 'CTA - Lif3 Digital Media',
    category: 'Motion & Games',
    description: 'Criação da primeira CTA (Call to action) da Lif3 Digital Media.',
    longDescription: 'Direção de arte e edição voltada à campanha de conversão oficial (Call to Action) da Lif3 Digital Media. O resultado final foca em taxa de clipagem de visualizações gerando forte engajamento em social media.',
    image: 'https://img.youtube.com/vi/0ApAAFRYQjM/hqdefault.jpg',
    tags: ['Motion Graphics', 'Marketing Digital', 'Social CTA', 'VFX', 'Lif3 Digital Media'],
    metrics: [
      { label: 'CTR de Conversão', value: 'Excelente Desempenho' },
      { label: 'Taxa de Retenção', value: 'Social Media Optimized' },
      { label: 'Sound FX', value: 'Imersão Premium' }
    ],
    client: 'Lif3 Digital Media',
    youtubeId: '0ApAAFRYQjM'
  }
];

export const timeline: TimelineEvent[] = [
  {
    year: '2024 - Presente',
    role: 'Founder / Lead Creative Developer',
    company: 'Lif3 Digital Media',
    description: 'Direção e desenvolvimento de soluções web premium e interações de alto nível para marcas internacionais, focando em storytelling digital e animações WebGL estruturais.',
    achievements: [
      'Criação, reestruturação, design system, ferramenta de elegibilidade, agente de IA e plataforma de cursos da Smartweld Brasil, gerando uma receita recorrente.',
      'Configuração de pipelines avançados de animação economizando 25% de uso de CPU de dispositivos mobile.'
    ]
  },
  {
    year: '2022 - 2024',
    role: 'Senior Frontend Engineer',
    company: 'MachinaFusion Inc.',
    description: 'Desenvolvimento e design de material para divulgação.',
    achievements: [
      'Desenho e desenvolvimento técnico do dashboard de monitoria 97% eficiente e escalável.',
      'Adoção em larga escala de protocolos WebSocket para sincronia ultra-rápida em menos de 10ms.'
    ]
  },
  {
    year: '2020 - 2022',
    role: 'UX Developer & Designer',
    company: 'Cliente Oculto',
    description: 'Concepção de material e conteúdo de uma empresa americana voltada para o seguimento logístico.',
    achievements: [
      'Prototipação de interações avançadas com controle ocular e gestual.',
      'Redução do peso de carregamento inicial de bundles da web em 42% utilizando lazy loading estratégico.'
    ]
  }
];
