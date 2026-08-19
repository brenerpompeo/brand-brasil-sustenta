import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tokens from "./data/tokens.json";
import { CopyChip } from "./components/primitives";
import { Logo } from "./components/Logo";
import { ODSBadge } from "./components/ODSBadge";
import { Grain, SectionGlow, Dot } from "./components/Atmosphere";
import { FlowDemo } from "./components/FlowDemo";
import { EaseDemo } from "./components/EaseDemo";
import { Header } from "./layouts/Header";
import { Hero } from "./layouts/Hero";
import { TaxonomicMetadata } from "./components/TaxonomicMetadata";

const EASE = [0.16, 1, 0.3, 1] as const;



// ============================================================================
// 01. SEÇÃO: VISÃO, TESE & MANIFESTO
// ============================================================================

interface SquadVertical {
  id: string;
  title: string;
  tag: string;
  color: string;
  what: string;
  how: string;
  deliverables: string[];
}

const SQUADS_VERTICALS: SquadVertical[] = [
  {
    id: "tech-data",
    title: "Tech & Data (Código Real & IA)",
    tag: "SQUADS DE ENGENHARIA",
    color: "#2979FF",
    what: "Construção de aplicações web/mobile de alto desempenho, arquiteturas de dados georreferenciados e motores de matching com IA explicável.",
    how: "Sprints de 6 semanas sob a governança da Tríade. Stack moderna com TypeScript, React 19, Vite, Tailwind v4 e pgvector no Supabase, garantindo conformidade WCAG e acessibilidade.",
    deliverables: [
      "Plataformas Web & PWAs de Alto Desempenho",
      "Motor Vetorial Suzely (Matching Explicável)",
      "Dashboards de Evidências ESG em Tempo Real",
      "Auditorias Técnicas de Código e Acessibilidade"
    ]
  },
  {
    id: "territorio-campo",
    title: "Território & Campo (MEC 10%)",
    tag: "SQUADS DE EXTENSÃO & IMPACTO",
    color: "#00E676",
    what: "Diagnóstico in loco de vulnerabilidades, escuta ativa comunitária e articulação institucional para curricularização de extensão (MEC 10%).",
    how: "Alocação direta de universitários e lideranças comunitárias em hubs territoriais e calçadas parceiras. Aplicação de metodologia científica com rastreabilidade integral.",
    deliverables: [
      "Validação Territorial com Rastreabilidade Fotográfica",
      "Dossiês de Curricularização de Extensão (Lei 13.005 / MEC 10%)",
      "Planos de Ação Comunitária e Mapeamento Local",
      "Workshops de Co-criação com Lideranças Regionais"
    ]
  },
  {
    id: "gestao-financas",
    title: "Gestão & Finanças (Shared Value)",
    tag: "SQUADS DE NEGÓCIOS & ESG",
    color: "#FFD600",
    what: "Estruturação de modelos de negócios regenerativos, compliance com frameworks globais (GRI, SASB) e monetização de valor socioambiental.",
    how: "Aplicação da tese de Shared Value: lucro legítimo financiando impacto sustentável contínuo. Projeções de ROI social e captação via blended finance.",
    deliverables: [
      "Matrizes de Materialidade e Alinhamento aos 18 ODS",
      "Modelagem Financeira de Shared Value & ROI Social",
      "Relatórios de Sustentabilidade em Padrão Global",
      "Estruturação de Projetos para Editais e Captação ESG"
    ]
  },
  {
    id: "design-comunicacao",
    title: "Design & Identidade Digital",
    tag: "SQUADS DE IDENTIDADE & PRODUTO",
    color: "#FF9100",
    what: "Design de produtos digitais de alta fidelidade, branding anti-greenwashing e narrativas de marca ancoradas na verdade da calçada.",
    how: "Criação de design systems modulares com grid suíço de 1px e tipografia escultural. Interfaces intuitivas que valorizam a identidade nacional com elegância contemporânea.",
    deliverables: [
      "Design Systems Completos (Tokens, Componentes e Brand Books)",
      "Protótipos de Alta Fidelidade e Arquitetura de Informação",
      "Guias de Tom de Voz e Diretrizes Anti-Greenwashing",
      "Tratamento Documental de Fotografia e Ativos Visuais"
    ]
  },
  {
    id: "pr-relacoes-publicas",
    title: "PR & Relações Públicas (Voz Soberana)",
    tag: "SQUADS DE COMUNICAÇÃO DE IMPACTO",
    color: "#00E676",
    what: "Posicionamento institucional e amplificação da verdade territorial na grande mídia e redes de liderança ESG.",
    how: "Articulação de narrativas com protagonismo universitário e comunitário, combatendo o paternalismo assistencialista com métricas de entrega.",
    deliverables: [
      "Press Kits e Artigos de Opinião Ancorados em Evidências",
      "Cobertura de Campo e Registro Documental em Tempo Real",
      "Posicionamento C-Suite para Executivos de Sustentabilidade",
      "Gestão de Reputação e Blindagem Anti-Greenwashing"
    ]
  },
  {
    id: "govtech-politicas",
    title: "GovTech & Políticas Públicas (Smart Cities)",
    tag: "SQUADS B2G & PREFEITURAS",
    color: "#2979FF",
    what: "Digitalização de serviços públicos municipais, alinhamento aos ODS locais e conformidade com marcos regulatórios de sustentabilidade.",
    how: "Co-criação com secretarias municipais e prefeituras, conectando demandas da população a soluções tecnológicas viáveis e auditáveis.",
    deliverables: [
      "Planos Municipais de Descarbonização e Transição Justa",
      "Integrações de Dados Abertos para Monitoramento ODS",
      "Capacitação Técnica de Servidores Públicos em Inovação",
      "Modelos de Convênio Universidade-Prefeitura-Empresa"
    ]
  }
];

const MANIFESTO_CARDS = [
  {
    id: "soberania",
    title: "Quem sustenta é nóis",
    tag: "SOBERANIA POPULAR",
    body: "O mercado corporativo desenha as diretrizes no slide. A juventude universitária e a comunidade aplicam a transição prática no território. Nossa voz não pede licença: ela assume a autoria e o rigor da execução de ponta a ponta.",
    highlight: "Menos discursos conceituais, mais engenharia de impacto em campo.",
    color: "#00E676",
    stat: "100% de Autoria Local"
  },
  {
    id: "shared-value",
    title: "Shared Value na Veia",
    tag: "ROI + IMPACTO SOCIOAMBIENTAL",
    body: "Lucro e impacto socioambiental não são antagônicos. São motores síncronos. Projetos reais geram valor econômico legítimo para as marcas participantes enquanto resolvem problemas urgentes nos territórios. Lucro financia impacto; impacto valida o lucro.",
    highlight: "Não é caridade, é uma nova categoria de negócios de R$ 50 bilhões.",
    color: "#2979FF",
    stat: "R$ 50 Bi em Descarbonização"
  },
  {
    id: "voluntariado",
    title: "Voluntariado de Impacto",
    tag: "CAUSA SOCIAL & MENTORIA",
    body: "Conectamos jovens voluntários em diagnósticos territoriais locais como funil de entrada, enquanto colaboradores seniores das empresas B2B atuam como mentores de negócios. Fortalece o 'S' do ESG com impacto mensurável e desenvolve a juventude.",
    highlight: "Engajamento comunitário na base + Mentoria estratégica no topo.",
    color: "#FFD600",
    stat: "Mentoria B2B Ativa"
  },
  {
    id: "match-definitivo",
    title: "O Match Definitivo",
    tag: "EMPREGABILIDADE & TALENT POOL",
    body: "Não apenas treinamos talentos; aceleramos a colocação definitiva de jovens periféricos e criativos no mercado corporativo. As marcas parceiras que financiam os squads ganham acesso à nossa vitrine de talentos auditados in loco pela Tríade. É a liquidação do greenwashing e do racismo de slide.",
    highlight: "Dados reais de campo gerando contratações de alto nível.",
    color: "#FF9100",
    stat: "Placement SaaS Auditado"
  }
];

export function VisionManifestoSection() {
  const [activeManifestoTab, setActiveManifestoTab] = useState(0);
  const [selectedSquad, setSelectedSquad] = useState<string | null>(null);
  const activeManifesto = MANIFESTO_CARDS[activeManifestoTab];

  return (
    <section
      id="01-visao-manifesto"
      className="relative py-20 md:py-28 border-t border-white/[0.06] bg-[#08090A]"
      aria-label="01. Visão, Tese & Manifesto"
    >
      <span id="visao-manifesto" className="sr-only" />
      <span id="negocio" className="sr-only" />
      <span id="manifesto" className="sr-only" />

      <SectionGlow color="#00E676" position="15% 20%" opacity={0.05} size="45%" />
      <SectionGlow color="#2979FF" position="85% 75%" opacity={0.04} size="40%" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Cabeçalho Editorial */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 rounded-full bg-[#00E676]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#00E676]">
              01 · VISÃO, TESE & MANIFESTO
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#F3F4F6] leading-[0.92] mb-6">
            Inovação territorial que gera <span className="text-[#00E676]">ROI socioambiental real</span>.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#9CA3AF] leading-[1.65] font-light">
            Substituímos o greenwashing e a teoria inócua das consultorias de slides por squads integrados (embedded) e auditáveis no território. O Brasil Sustenta é o matching engine de talentos e o compliance prático das suas metas ESG. Unimos o brilhantismo universitário sob governança de mercado para entregar em semanas o que o seu RH/Sustentabilidade levaria meses para estruturar.
          </p>
        </div>

        {/* Faixa de Métricas Estratégicas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16">
          {[
            { value: "R$ 50 BI", label: "Mercado de Descarbonização", accent: "#00E676" },
            { value: "10% MEC", label: "Creditação Curricular (Lei 13.005)", accent: "#2979FF" },
            { value: "6 SEMANAS", label: "Ciclo de Sprint de Impacto", accent: "#FFD600" },
            { value: "100% REAL", label: "Evidências Auditadas na Calçada", accent: "#FF9100" }
          ].map((metric) => (
            <div
              key={metric.label}
              className="p-4 sm:p-5 rounded-2xl bg-[#121417] border border-white/[0.06] hover:border-white/[0.14] transition-colors"
            >
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#F3F4F6] block leading-none mb-1.5" style={{ color: metric.accent }}>
                {metric.value}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#9CA3AF] uppercase tracking-wider block">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* 4 Pilares do Playbook de Negócios */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">
              // PLAYBOOK ESTRATÉGICO · PILARES DE NEGÓCIO
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                num: "01",
                title: "Modelo Embedded",
                subtitle: "Super Teammates",
                desc: "Não entregamos relatórios conceituais. Alocamos squads de impacto integrados ao seu fluxo corporativo, sob governança da Tríade (Embaixador + Coordenador + Empresa).",
                accent: "#00E676"
              },
              {
                num: "02",
                title: "Engine Suzely",
                subtitle: "Fit Score Explicável",
                desc: "O matching de competências, disponibilidade e relevância ODS territorial é calculado via Inteligência Artificial baseada em pgvector e dados reais das calçadas parceiras.",
                accent: "#2979FF"
              },
              {
                num: "03",
                title: "Talent Pool & SaaS",
                subtitle: "Placement Auditado",
                desc: "Os squads atuam como funil prático de talentos e voluntariado de mentoria corporativa. O RH assina a Suzely para contratar jovens pré-avaliados in loco.",
                accent: "#FFD600"
              },
              {
                num: "04",
                title: "Compliance & ROI",
                subtitle: "Impacto Síncrono",
                desc: "Lucro e impacto andam juntos. A entrega técnica atende às exigências de inovação da marca e gera as métricas ODS auditadas exigidas pela regulação.",
                accent: "#FF9100"
              }
            ].map((pillar) => (
              <div
                key={pillar.num}
                className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-white/30 font-semibold">{pillar.num}</span>
                    <span className="size-2 rounded-full" style={{ background: pillar.accent }} />
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-[#F3F4F6] mb-1">
                    {pillar.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-3" style={{ color: pillar.accent }}>
                    {pillar.subtitle}
                  </span>
                  <p className="font-body text-sm text-[#9CA3AF] leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Squads Territoriais — Bento Grid */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8 pb-4 border-b border-white/[0.06]">
            <div>
              <div className="flex items-center gap-2">
                <Dot color="#2979FF" size={6} />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#2979FF] font-semibold">
                  VERTICAIS TERRITORIAIS
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F3F4F6] mt-1">
                Squads de Engenharia & Impacto de Campo
              </h3>
            </div>
            <p className="font-mono text-[11px] text-white/40">
              6 Verticais · Sprints de 6 Semanas · Governança Tríade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SQUADS_VERTICALS.map((squad) => {
              const isSelected = selectedSquad === squad.id;
              return (
                <div
                  key={squad.id}
                  onClick={() => setSelectedSquad(isSelected ? null : squad.id)}
                  className={`bs-card rounded-2xl bg-[#121417] border p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                    isSelected ? "border-white/[0.24] bg-[#1C1F24] shadow-[0_12px_36px_rgba(0,0,0,0.6)]" : "border-white/[0.06] hover:border-white/[0.14]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]"
                        style={{ color: squad.color }}
                      >
                        {squad.tag}
                      </span>
                      <Dot color={squad.color} size={6} />
                    </div>

                    <h4 className="font-display text-xl font-bold uppercase text-[#F3F4F6] mb-2 leading-tight">
                      {squad.title}
                    </h4>

                    <p className="font-body text-xs text-[#9CA3AF] leading-relaxed mb-3 font-light">
                      {squad.what}
                    </p>

                    <p className="font-body text-[11px] text-[#6B7280] leading-relaxed mb-4 italic">
                      {squad.how}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06]">
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40 block mb-2 font-medium">
                      Entregáveis Técnicos Auditados:
                    </span>
                    <ul className="space-y-1.5 font-mono text-[11px] text-white/80">
                      {squad.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-tight">
                          <span style={{ color: squad.color }} className="shrink-0 mt-0.5">▪</span>
                          <span className="text-white/70">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Manifesto Interativo em Cards Táteis */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="size-2 rounded-full bg-[#FFD600]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFD600] font-semibold">
              MANIFESTO INTERATIVO
            </span>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#F3F4F6] mb-8">
            A Visão e os Compromissos Inegociáveis
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Seletor de Cards Táteis */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {MANIFESTO_CARDS.map((card, idx) => {
                const isActive = activeManifestoTab === idx;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setActiveManifestoTab(idx)}
                    className={`text-left p-5 min-h-[52px] rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden select-none ${
                      isActive
                        ? "bg-[#1C1F24] border-white/[0.18] shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                        : "bg-[#121417] border-white/[0.06] hover:bg-[#1C1F24]/60 hover:border-white/[0.12]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="manifestoActiveBar"
                        className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full"
                        style={{ background: card.color }}
                        transition={{ duration: 0.2 }}
                      />
                    )}

                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] font-semibold" style={{ color: card.color }}>
                        {card.tag}
                      </span>
                      <span className="font-mono text-[9px] text-white/30 uppercase">
                        {card.stat}
                      </span>
                    </div>

                    <h4 className="font-display text-lg sm:text-xl font-bold uppercase text-[#F3F4F6] leading-snug">
                      {card.title}
                    </h4>
                  </button>
                );
              })}
            </div>

            {/* Painel de Conteúdo */}
            <div className="lg:col-span-7 rounded-3xl bg-[#121417] border border-white/[0.08] p-6 sm:p-8 md:p-10 relative overflow-hidden flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
              <SectionGlow color={activeManifesto.color} position="90% 10%" opacity={0.08} size="50%" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeManifesto.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative z-10 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: activeManifesto.color }}>
                        // MANIFESTO · {activeManifesto.tag}
                      </span>
                      <span className="font-mono text-[11px] text-white/40">
                        {activeManifesto.stat}
                      </span>
                    </div>

                    <p className="font-body text-lg sm:text-xl text-[#F3F4F6] font-light leading-[1.65] mb-8">
                      {activeManifesto.body}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 block mb-2">
                      Diretriz Executiva:
                    </span>
                    <p className="font-display text-2xl sm:text-3xl font-extrabold uppercase leading-tight" style={{ color: activeManifesto.color }}>
                      "{activeManifesto.highlight}"
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

// ============================================================================
// 02. SEÇÃO: LOGOMARCA & CONSTRUÇÃO GEOMÉTRICA
// ============================================================================

export function LogoGeometrySection() {
  const [showGrid, setShowGrid] = useState(true);
  const [showCircles, setShowCircles] = useState(true);
  const [showAxes, setShowAxes] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [opticalSize, setOpticalSize] = useState<number>(44);

  return (
    <section
      id="02-logo-geometria"
      className="relative py-20 md:py-28 border-t border-white/[0.06] bg-[#08090A]"
      aria-label="02. Logomarca & Geometria"
    >
      <span id="logo-geometria" className="sr-only" />
      <span id="logo" className="sr-only" />

      <SectionGlow color="#00E676" position="20% 15%" opacity={0.05} size="45%" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 rounded-full bg-[#00E676]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#00E676]">
              02 · LOGOMARCA & CONSTRUÇÃO GEOMÉTRICA
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#F3F4F6] leading-[0.92] mb-6">
            A Assinatura Visual & <span className="text-[#00E676]">Malha Matemática</span>.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#9CA3AF] leading-[1.65] font-light">
            A marca do Brasil Sustenta é construída sobre um rigoroso grid cartesiano milimétrico. A tipografia escultural Antonio Black é empilhada com line-height monumental de 0.88, ancorada pelo ponto final verde amazônia tech (#00E676) e pelo símbolo monograma Match-Net com eixos ortogonais e curvas áureas.
          </p>
        </div>

        {/* Blueprint Interativo: Malha Matemática do Símbolo */}
        <div className="mb-16 rounded-3xl bg-[#121417] border border-white/[0.08] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.06] mb-6">
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full bg-[#00E676] animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                BLUEPRINT VETORIAL CARTESIANO (ESCALA 1:1)
              </span>
            </div>

            {/* Toggles de Camadas Técnicas */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              {[
                { label: "Grade Milimétrica", state: showGrid, toggle: () => setShowGrid(!showGrid), color: "#00E676" },
                { label: "Círculos Áureos", state: showCircles, toggle: () => setShowCircles(!showCircles), color: "#2979FF" },
                { label: "Eixos X/Y", state: showAxes, toggle: () => setShowAxes(!showAxes), color: "#FFD600" },
                { label: "Cotas Técnicas", state: showDimensions, toggle: () => setShowDimensions(!showDimensions), color: "#FF9100" },
                { label: "Safe-Zone (1X)", state: showSafeZone, toggle: () => setShowSafeZone(!showSafeZone), color: "#FF1744" }
              ].map((layer) => (
                <button
                  key={layer.label}
                  type="button"
                  onClick={layer.toggle}
                  className={`min-h-[44px] px-3 py-1.5 rounded-full border transition-all cursor-pointer flex items-center gap-1.5 ${
                    layer.state
                      ? "bg-white/[0.08] text-white border-white/[0.20]"
                      : "bg-transparent text-white/40 border-white/[0.06] hover:text-white/70"
                  }`}
                >
                  <span className="size-1.5 rounded-full" style={{ background: layer.state ? layer.color : "#4B5563" }} />
                  <span>{layer.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Canvas Blueprint SVG */}
          <div className="relative h-[340px] sm:h-[420px] rounded-2xl bg-[#08090A] border border-white/[0.06] overflow-hidden flex items-center justify-center">
            <svg
              viewBox="0 0 400 300"
              className="w-full h-full max-w-[500px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid10" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                </pattern>
                <linearGradient id="matchNetGrad" x1="120" y1="80" x2="280" y2="220" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00E676" />
                  <stop offset="50%" stopColor="#FFD600" />
                  <stop offset="100%" stopColor="#2979FF" />
                </linearGradient>
              </defs>

              {/* Camada 1: Grade Cartesiana */}
              {showGrid && <rect width="400" height="300" fill="url(#grid10)" />}

              {/* Camada 2: Safe-Zone 1X */}
              {showSafeZone && (
                <g opacity="0.8">
                  <rect x="70" y="30" width="260" height="240" fill="rgba(255,23,68,0.03)" stroke="#FF1744" strokeWidth="1" strokeDasharray="4 4" />
                  <text x="75" y="45" fill="#FF1744" fontSize="9" fontFamily="var(--font-mono)">1X MARGEM DE PROTEÇÃO</text>
                  <line x1="70" y1="30" x2="100" y2="30" stroke="#FF1744" strokeWidth="2" />
                  <line x1="70" y1="30" x2="70" y2="60" stroke="#FF1744" strokeWidth="2" />
                  <line x1="330" y1="270" x2="300" y2="270" stroke="#FF1744" strokeWidth="2" />
                  <line x1="330" y1="270" x2="330" y2="240" stroke="#FF1744" strokeWidth="2" />
                </g>
              )}

              {/* Camada 3: Círculos Áureos Concêntricos */}
              {showCircles && (
                <g stroke="rgba(41, 121, 255, 0.3)" strokeWidth="1" fill="none" strokeDasharray="3 3">
                  <circle cx="200" cy="150" r="100" />
                  <circle cx="200" cy="150" r="70" />
                  <circle cx="200" cy="150" r="40" />
                  <circle cx="225" cy="120" r="32" stroke="rgba(0, 230, 118, 0.4)" />
                  <circle cx="200" cy="220" r="28" stroke="rgba(255, 214, 0, 0.4)" />
                  <circle cx="255" cy="175" r="28" stroke="rgba(41, 121, 255, 0.4)" />
                </g>
              )}

              {/* Camada 4: Eixos Ortogonais X/Y */}
              {showAxes && (
                <g stroke="#FFD600" strokeWidth="1" opacity="0.5">
                  <line x1="0" y1="150" x2="400" y2="150" strokeDasharray="6 3" />
                  <line x1="200" y1="0" x2="200" y2="300" strokeDasharray="6 3" />
                  <text x="380" y="145" fill="#FFD600" fontSize="8" fontFamily="var(--font-mono)">+X</text>
                  <text x="205" y="15" fill="#FFD600" fontSize="8" fontFamily="var(--font-mono)">+Y</text>
                  <circle cx="200" cy="150" r="3" fill="#FFD600" />
                </g>
              )}

              {/* O Símbolo Oficial Match-Net em Alta Precisão */}
              <g id="officialSymbol">
                <path
                  d="M140 85 H220 C260 85 260 135 220 135 C260 135 260 185 220 185 H140 V85 Z"
                  stroke="url(#matchNetGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  d="M140 185 C140 220 170 245 200 245 C240 245 265 220 265 185"
                  stroke="url(#matchNetGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="6 6"
                  fill="none"
                />
                <circle cx="220" cy="135" r="9" fill="#00E676" />
                <circle cx="200" cy="245" r="9" fill="#FFD600" />
                <circle cx="265" cy="185" r="9" fill="#2979FF" />
              </g>

              {/* Camada 5: Cotas Dimensionais & Ângulos */}
              {showDimensions && (
                <g fill="#FF9100" fontSize="8" fontFamily="var(--font-mono)">
                  <line x1="140" y1="70" x2="220" y2="70" stroke="#FF9100" strokeWidth="1" markerEnd="arrow" />
                  <text x="165" y="65">W = 2.4X</text>
                  <line x1="125" y1="85" x2="125" y2="185" stroke="#FF9100" strokeWidth="1" />
                  <text x="85" y="140">H = 3.0X</text>
                  <text x="235" y="132">R = 32mm</text>
                  <text x="275" y="190">θ = 90°</text>
                </g>
              )}
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 text-white/40 font-mono text-[10px]">
            <span>Proporção Áurea: Φ = 1.618</span>
            <span>Espessura de Traço Canônica: 8px (Escala 100) / 6px (Escala 64)</span>
            <span>Offset do Ponto Verde: 0.12X em relação ao glifo base</span>
          </div>
        </div>

        {/* Safe-Zone Proporcional 'X' & Redução Óptica Interativa */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          
          {/* Card 1: Safe-Zone 1X */}
          <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF1744] font-semibold block mb-3">
                MARGEM DE SEGURANÇA · SAFE-ZONE (1X)
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-[#F3F4F6] mb-3">
                Isolamento Espacial Inegociável
              </h3>
              <p className="font-body text-sm text-[#9CA3AF] leading-relaxed font-light mb-6">
                A safe-zone garante a legibilidade e a soberania visual da marca. O valor <strong>'X'</strong> equivale exatamente à altura do glifo 'B' na logo tipográfica ou ao diâmetro do ponto final. Nenhum texto, hairline secundária ou elemento gráfico pode invadir este raio.
              </p>

              {/* Demonstração Visual de Safe-Zone */}
              <div className="p-8 rounded-xl bg-[#08090A] border border-dashed border-[#FF1744]/40 flex items-center justify-center relative">
                <div className="border border-white/[0.12] p-4 rounded bg-[#121417]">
                  <Logo size={1.8} />
                </div>
                <span className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#FF1744]">1X (TOPO)</span>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#FF1744]">1X (BASE)</span>
                <span className="absolute left-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#FF1744]">1X</span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[9px] text-[#FF1744]">1X</span>
              </div>
            </div>

            <span className="font-mono text-[11px] text-white/40 block mt-6 pt-4 border-t border-white/[0.06]">
              Regra: Margem mínima = 1X em todas as aplicações institucionais.
            </span>
          </div>

          {/* Card 2: Redução Óptica Interativa (16px a 64px) */}
          <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E676] font-semibold">
                  TESTADOR DE REDUÇÃO ÓPTICA
                </span>
                <span className="font-mono text-xs text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded border border-[#00E676]/20">
                  {opticalSize}px
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold uppercase text-[#F3F4F6] mb-2">
                Nitidez de Ponto & Traço em Escala
              </h3>
              <p className="font-body text-sm text-[#9CA3AF] leading-relaxed font-light mb-5">
                Verifique a retenção dos detalhes e do ponto verde nas 5 escalas críticas de renderização do ecossistema.
              </p>

              {/* Botões de Escalas Rápidas */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { size: 16, label: "16px (Favicon)" },
                  { size: 24, label: "24px (Mobile Bar)" },
                  { size: 32, label: "32px (App Header)" },
                  { size: 44, label: "44px (Touch Target)" },
                  { size: 64, label: "64px (Hero Display)" }
                ].map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setOpticalSize(s.size)}
                    className={`min-h-[44px] px-3 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      opticalSize === s.size
                        ? "bg-white text-[#08090A] font-bold"
                        : "bg-white/[0.04] text-white/70 hover:bg-white/[0.08]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Preview Real 1:1 e Preview Lupa Ampliada */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#08090A] border border-white/[0.06]">
                <div className="flex flex-col items-center justify-center p-4 border-r border-white/[0.06] min-h-[120px]">
                  <span className="font-mono text-[9px] text-white/40 uppercase mb-3">Tamanho Real (1:1)</span>
                  <div style={{ width: opticalSize, height: opticalSize }} className="flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                      <path d="M25 20H55C70 20 70 38 55 38C70 38 70 56 55 56H25V20Z" stroke="#00E676" strokeWidth={opticalSize <= 24 ? 12 : 8} strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="55" cy="38" r={opticalSize <= 24 ? 10 : 8} fill="#FFD600" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4 min-h-[120px]">
                  <span className="font-mono text-[9px] text-white/40 uppercase mb-3">Zoom 4x (Inspeção)</span>
                  <div style={{ width: opticalSize * 2.5, height: opticalSize * 2.5, maxHeight: 90 }} className="flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                      <path d="M25 20H55C70 20 70 38 55 38C70 38 70 56 55 56H25V20Z" stroke="#00E676" strokeWidth={opticalSize <= 24 ? 12 : 8} strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="55" cy="38" r={opticalSize <= 24 ? 10 : 8} fill="#FFD600" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="font-mono text-[10px] text-[#00E676] mt-4 flex items-center justify-between">
              <span>Nitidez Vetorial: 100% Preservada</span>
              <span>Render: GPU Accelerated</span>
            </div>
          </div>

        </div>

        {/* 5 Versões Oficiais da Marca */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 font-semibold block mb-6">
            // AS 5 VERSÕES OFICIAIS DA IDENTIDADE
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* 1. Principal */}
            <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] overflow-hidden flex flex-col justify-between">
              <div className="bg-[#08090A] p-8 flex items-center justify-center min-h-[180px] border-b border-white/[0.06]">
                <Logo size={2.2} />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display text-lg font-bold uppercase text-[#F3F4F6]">Principal</h4>
                  <span className="font-mono text-[10px] text-[#00E676]">CANÔNICA</span>
                </div>
                <p className="font-body text-xs text-[#9CA3AF] mb-4 font-light">
                  Empilhado sobre fundo escuro (#08090A). Uso preferencial em 90% das aplicações.
                </p>
                <CopyChip value="BRASIL SUSTENTA." label="Copiar Lockup" />
              </div>
            </div>

            {/* 2. Negativo */}
            <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] overflow-hidden flex flex-col justify-between">
              <div className="bg-[#F3F4F6] p-8 flex items-center justify-center min-h-[180px] border-b border-white/[0.06]">
                <span className="font-display flex flex-col leading-[0.88] text-[2.2rem] font-black text-[#08090A]">
                  <span>BRASIL</span>
                  <span>SUSTENTA<span className="text-[#00E676]">.</span></span>
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display text-lg font-bold uppercase text-[#F3F4F6]">Negativo</h4>
                  <span className="font-mono text-[10px] text-white/50">FUNDO CLARO</span>
                </div>
                <p className="font-body text-xs text-[#9CA3AF] mb-4 font-light">
                  Para impressos, papéis timbrados e superfícies claras (#F3F4F6).
                </p>
                <CopyChip value="BRASIL SUSTENTA." label="Copiar Lockup" />
              </div>
            </div>

            {/* 3. Monocromático */}
            <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] overflow-hidden flex flex-col justify-between">
              <div className="bg-[#121417] p-8 flex items-center justify-center min-h-[180px] border-b border-white/[0.06]">
                <span className="font-display flex flex-col leading-[0.88] text-[2.2rem] font-black text-[#F3F4F6]">
                  <span>BRASIL</span>
                  <span>SUSTENTA<span className="text-[#F3F4F6]">.</span></span>
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display text-lg font-bold uppercase text-[#F3F4F6]">Monocromático</h4>
                  <span className="font-mono text-[10px] text-white/50">1-COR</span>
                </div>
                <p className="font-body text-xs text-[#9CA3AF] mb-4 font-light">
                  Para serigrafia, corte a laser, carimbos e aplicações com restrição de cor.
                </p>
                <CopyChip value="BRASIL SUSTENTA." label="Copiar Lockup" />
              </div>
            </div>

            {/* 4. Símbolo Match-Net */}
            <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] overflow-hidden flex flex-col justify-between">
              <div className="bg-[#08090A] p-8 flex items-center justify-center min-h-[180px] border-b border-white/[0.06]">
                <div className="size-20">
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                    <path d="M25 20H55C70 20 70 38 55 38C70 38 70 56 55 56H25V20Z" stroke="#00E676" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M25 56C25 70 38 80 50 80C65 80 75 70 75 56" stroke="#2979FF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"/>
                    <circle cx="55" cy="38" r="6" fill="#00E676" />
                    <circle cx="50" cy="80" r="6" fill="#FFD600" />
                    <circle cx="75" cy="56" r="6" fill="#2979FF" />
                  </svg>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display text-lg font-bold uppercase text-[#F3F4F6]">Match-Net</h4>
                  <span className="font-mono text-[10px] text-[#2979FF]">MONOGRAMA</span>
                </div>
                <p className="font-body text-xs text-[#9CA3AF] mb-4 font-light">
                  Símbolo de inteligência e rede territorial. Conecta talentos, ODS e empresas.
                </p>
                <CopyChip value='<svg viewBox="0 0 100 100"><path d="M25 20H55C70 20 70 38 55 38C70 38 70 56 55 56H25V20Z" stroke="#00E676" strokeWidth="6"/></svg>' label="Copiar SVG" />
              </div>
            </div>

            {/* 5. Favicon v8 / App Icon */}
            <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] overflow-hidden flex flex-col justify-between">
              <div className="bg-[#08090A] p-8 flex items-center justify-center min-h-[180px] border-b border-white/[0.06]">
                <div className="size-16 rounded-2xl bg-[#121417] border border-white/[0.14] flex items-center justify-center shadow-[0_0_20px_rgba(0,230,118,0.2)]">
                  <svg viewBox="0 0 100 100" className="size-9">
                    <path d="M25 20H55C70 20 70 38 55 38C70 38 70 56 55 56H25V20Z" stroke="#00E676" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="55" cy="38" r="8" fill="#FFD600" />
                  </svg>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-display text-lg font-bold uppercase text-[#F3F4F6]">Favicon / App Icon</h4>
                  <span className="font-mono text-[10px] text-[#FFD600]">APP & BROWSER</span>
                </div>
                <p className="font-body text-xs text-[#9CA3AF] mb-4 font-light">
                  Ícone de alta densidade otimizado para abas de navegador e telas Retina.
                </p>
                <CopyChip value="/favicon.svg" label="Copiar Path" />
              </div>
            </div>

          </div>
        </div>

        {/* Do's & Don'ts com Diagnósticos Técnicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Do's */}
          <div className="rounded-2xl bg-[#00E676]/[0.02] border border-[#00E676]/20 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="size-2 rounded-full bg-[#00E676]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E676] font-bold">
                ✓ DIRETRIZES DE USO (DO'S)
              </span>
            </div>
            <ul className="space-y-3 text-sm text-[#9CA3AF] font-body font-light">
              <li className="flex items-start gap-2.5">
                <span className="text-[#00E676] font-bold">✓</span>
                <span><strong>Alinhamento Empilhado:</strong> BRASIL sempre centralizado/empilhado sobre SUSTENTA.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#00E676] font-bold">✓</span>
                <span><strong>Ponto Final Pátria:</strong> Manter estritamente o ponto verde #00E676 na assinatura principal.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#00E676] font-bold">✓</span>
                <span><strong>Safe-Zone Mínima:</strong> Preservar 1X de raio livre em qualquer layout.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#00E676] font-bold">✓</span>
                <span><strong>Contraste WCAG:</strong> Garantir contraste mínimo de 4.5:1 contra fundos da interface.</span>
              </li>
            </ul>
          </div>

          {/* Don'ts */}
          <div className="rounded-2xl bg-[#FF1744]/[0.02] border border-[#FF1744]/20 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="size-2 rounded-full bg-[#FF1744]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF1744] font-bold">
                ✕ USOS NÃO AUTORIZADOS (DON'TS)
              </span>
            </div>
            <ul className="space-y-3 text-sm text-[#9CA3AF] font-body font-light">
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF1744] font-bold">✕</span>
                <span><strong>Distorção Não-Proporcional:</strong> Nunca esticar horizontalmente ou achatar o lockup.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF1744] font-bold">✕</span>
                <span><strong>Rotação Angular:</strong> Nunca rotacionar a logo fora do eixo ortogonal (0°).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF1744] font-bold">✕</span>
                <span><strong>Cores Não Oficiais:</strong> Nunca aplicar gradientes arco-íris, neon saturado ou magenta.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF1744] font-bold">✕</span>
                <span><strong>Efeitos Decorativos:</strong> Proibido aplicar sombras projetadas pesadas, chanfros ou bisel.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}

// ============================================================================
// 03. SEÇÃO: SISTEMA CROMÁTICO & ELEVAÇÃO TONAL
// ============================================================================

interface ColorSwatch {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  cmyk: string;
  hsl: string;
  wcagDark: string;
  wcagLight: string;
  persona: string;
  token: string;
}

const PATRIA_COLORS: ColorSwatch[] = [
  {
    name: "Verde Amazônia Tech",
    role: "B2B / Empresas / Acentos de Sucesso",
    hex: "#00E676",
    rgb: "rgb(0, 230, 118)",
    cmyk: "100%, 0%, 49%, 10%",
    hsl: "151°, 100%, 45%",
    wcagDark: "13.8:1 (AAA)",
    wcagLight: "1.5:1 (Falha)",
    persona: "B2B / Empresas",
    token: "--color-leaf"
  },
  {
    name: "Azul Atlântico Deep",
    role: "B2G / Prefeituras / Universidades",
    hex: "#2979FF",
    rgb: "rgb(41, 121, 255)",
    cmyk: "84%, 53%, 0%, 0%",
    hsl: "218°, 100%, 58%",
    wcagDark: "6.4:1 (AA)",
    wcagLight: "3.3:1 (Falha)",
    persona: "B2G / Academia",
    token: "--color-atlantic"
  },
  {
    name: "Amarelo Ouro Solar",
    role: "Talentos / Juventude / Scores Suzely",
    hex: "#FFD600",
    rgb: "rgb(255, 214, 0)",
    cmyk: "0%, 16%, 100%, 0%",
    hsl: "50°, 100%, 50%",
    wcagDark: "15.2:1 (AAA)",
    wcagLight: "1.4:1 (Falha)",
    persona: "Talentos / Juventude",
    token: "--color-sun"
  },
  {
    name: "Vermelho Alerta",
    role: "Governança / Risco / Don'ts",
    hex: "#FF1744",
    rgb: "rgb(255, 23, 68)",
    cmyk: "0%, 91%, 73%, 0%",
    hsl: "348°, 100%, 55%",
    wcagDark: "4.8:1 (AA)",
    wcagLight: "4.4:1 (AA)",
    persona: "Governança & Risco",
    token: "--color-clay"
  },
  {
    name: "Laranja Termográfico",
    role: "Sprints em Andamento / Transição",
    hex: "#FF9100",
    rgb: "rgb(255, 145, 0)",
    cmyk: "0%, 43%, 100%, 0%",
    hsl: "34°, 100%, 50%",
    wcagDark: "9.8:1 (AAA)",
    wcagLight: "2.1:1 (Falha)",
    persona: "Transição & Sprints",
    token: "--color-orange"
  }
];

export function ColorPaletteSection() {
  const [activeElevation, setActiveElevation] = useState<number>(1);

  return (
    <section
      id="03-sistema-cromatico"
      className="relative py-20 md:py-28 border-t border-white/[0.06] bg-[#08090A]"
      aria-label="03. Sistema Cromático & Elevação Tonal"
    >
      <span id="sistema-cromatico" className="sr-only" />
      <span id="cores" className="sr-only" />

      <SectionGlow color="#00E676" position="15% 15%" opacity={0.04} size="40%" />
      <SectionGlow color="#2979FF" position="85% 65%" opacity={0.04} size="40%" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 rounded-full bg-[#00E676]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#00E676]">
              03 · SISTEMA CROMÁTICO & ELEVAÇÃO TONAL
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#F3F4F6] leading-[0.92] mb-6">
            Swatches de Luminância & <span className="text-[#00E676]">Cores Pátria</span>.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#9CA3AF] leading-[1.65] font-light">
            Especificações físico-ópticas das Cores Pátria com conformidade WCAG AA/AAA auditada contra nosso canvas escuro (#08090A). A elevação tonal Obsidian organiza as 3 camadas espaciais de interface com hairlines suíças de 1px.
          </p>
        </div>

        {/* 5 Swatches Principais Pátria com Ficha Técnica Completa */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">
              // PALETA PÁTRIA · ESPECIFICAÇÕES TÉCNICAS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PATRIA_COLORS.map((color) => (
              <div
                key={color.name}
                className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] overflow-hidden flex flex-col justify-between shadow-lg"
              >
                {/* Visualizador de Cor */}
                <div
                  className="h-28 relative flex items-end justify-between p-4"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="font-mono text-xs font-bold bg-[#08090A]/85 text-white px-2.5 py-1 rounded-full backdrop-blur-md">
                    {color.hex}
                  </span>
                  <span className="font-mono text-[10px] bg-[#08090A]/85 text-white/80 px-2 py-0.5 rounded-full backdrop-blur-md uppercase">
                    {color.persona}
                  </span>
                </div>

                {/* Dados Técnicos */}
                <div className="p-5 space-y-4">
                  <div>
                    <h4 className="font-display text-lg font-bold uppercase text-[#F3F4F6] leading-tight">
                      {color.name}
                    </h4>
                    <p className="font-body text-xs text-[#9CA3AF] mt-0.5 font-light">
                      {color.role}
                    </p>
                  </div>

                  {/* Tabela de Valores Cromáticos */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#08090A] border border-white/[0.04] font-mono text-[11px]">
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase">RGB:</span>
                      <span className="text-white/80">{color.rgb}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[9px] uppercase">HSL:</span>
                      <span className="text-white/80">{color.hsl}</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-white/[0.04]">
                      <span className="text-white/40 block text-[9px] uppercase">CMYK:</span>
                      <span className="text-white/80">{color.cmyk}</span>
                    </div>
                  </div>

                  {/* Contrastes WCAG */}
                  <div className="flex items-center justify-between font-mono text-[11px] pt-1">
                    <span className="text-white/50">WCAG vs #08090A:</span>
                    <span className="text-[#00E676] font-bold">{color.wcagDark}</span>
                  </div>

                  {/* Chips de Cópia */}
                  <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                    <CopyChip value={color.hex} label={color.hex} />
                    <CopyChip value={`var(${color.token})`} label="CSS Var" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Elevação Tonal Obsidian (Layer Stack 3D) */}
        <div className="mb-16 rounded-3xl bg-[#121417] border border-white/[0.08] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.06] mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E676] font-semibold block">
                ELEVAÇÃO TONAL OBSIDIAN
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F3F4F6] mt-1">
                As 4 Camadas Físicas de Profundidade
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setActiveElevation(level)}
                  className={`min-h-[44px] px-3.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                    activeElevation === level
                      ? "bg-white text-[#08090A] font-bold shadow-sm"
                      : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08]"
                  }`}
                >
                  Nível {level}
                </button>
              ))}
            </div>
          </div>

          {/* Visualizador de Camadas Físicas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                lvl: 1,
                name: "Canvas Base",
                hex: "#08090A",
                token: "--color-paper",
                use: "Fundo monumental escuro sem preto absoluto esmagado."
              },
              {
                lvl: 2,
                name: "Card Surface",
                hex: "#121417",
                token: "--color-paper-2",
                use: "Superfície de Bento Cards, painéis e contêineres táteis."
              },
              {
                lvl: 3,
                name: "Active / Hover",
                hex: "#1C1F24",
                token: "--color-paper-3",
                use: "Estado ativo, hover de cards, inputs e botões secundários."
              },
              {
                lvl: 4,
                name: "Floating / Modais",
                hex: "#262A30",
                token: "--color-paper-4",
                use: "Dropdowns flutuantes, modais de governança e tooltips."
              }
            ].map((layer) => {
              const isCurrent = activeElevation === layer.lvl;
              return (
                <div
                  key={layer.lvl}
                  onClick={() => setActiveElevation(layer.lvl)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isCurrent
                      ? "border-white/[0.24] shadow-[0_12px_32px_rgba(0,0,0,0.8)] scale-[1.02]"
                      : "border-white/[0.06] hover:border-white/[0.14]"
                  }`}
                  style={{ backgroundColor: layer.hex }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-white/50">
                      CAMADA {layer.lvl}
                    </span>
                    <span className="font-mono text-xs text-white/80 bg-white/[0.10] px-2 py-0.5 rounded">
                      {layer.hex}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold uppercase text-[#F3F4F6] mb-1">
                    {layer.name}
                  </h4>
                  <p className="font-body text-xs text-[#9CA3AF] mb-4 font-light leading-relaxed">
                    {layer.use}
                  </p>
                  <CopyChip value={`var(${layer.token})`} label={layer.token} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Sub-Tokens Soft & Gradientes Aurora Pátria */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Sub-tokens Soft */}
          <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E676] font-semibold block mb-2">
              SUB-TOKENS SOFT (ALPHA 0.08)
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#F3F4F6] mb-4">
              Superfícies Bioluminescentes Suaves
            </h3>
            <div className="space-y-3">
              {[
                { name: "Leaf Soft", val: "rgba(0, 230, 118, 0.08)", hex: "#00E676", token: "--color-leaf-soft" },
                { name: "Atlantic Soft", val: "rgba(41, 121, 255, 0.08)", hex: "#2979FF", token: "--color-atlantic-soft" },
                { name: "Sun Soft", val: "rgba(255, 214, 0, 0.08)", hex: "#FFD600", token: "--color-sun-soft" },
                { name: "Clay Soft", val: "rgba(255, 23, 68, 0.08)", hex: "#FF1744", token: "--color-clay-soft" }
              ].map((sub) => (
                <div
                  key={sub.name}
                  className="p-3 rounded-xl border border-white/[0.06] flex items-center justify-between"
                  style={{ backgroundColor: sub.val }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-3 rounded-full" style={{ backgroundColor: sub.hex }} />
                    <span className="font-mono text-xs font-medium text-white">{sub.name}</span>
                  </div>
                  <CopyChip value={`var(${sub.token})`} label={sub.token} />
                </div>
              ))}
            </div>
          </div>

          {/* Gradientes Aurora Pátria */}
          <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FFD600] font-semibold block mb-2">
              GRADIENTES AURORA PÁTRIA
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#F3F4F6] mb-4">
              Transições Ópticas Contidas (≤5%)
            </h3>
            <div className="space-y-3">
              {[
                { name: "Verde Aurora", grad: "linear-gradient(135deg, #00E676 0%, #00C832 100%)", token: "--gradient-verde-aurora" },
                { name: "Azul Aurora", grad: "linear-gradient(135deg, #2979FF 0%, #0047FF 100%)", token: "--gradient-azul-aurora" },
                { name: "Amarelo Aurora", grad: "linear-gradient(135deg, #FFD600 0%, #E6C200 100%)", token: "--gradient-amarelo-aurora" }
              ].map((g) => (
                <div
                  key={g.name}
                  className="p-3 rounded-xl border border-white/[0.06] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg shadow-sm" style={{ background: g.grad }} />
                    <span className="font-mono text-xs font-medium text-white">{g.name}</span>
                  </div>
                  <CopyChip value={`var(${g.token})`} label="Copiar Token" />
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// ============================================================================
// 04. SEÇÃO: TIPOGRAFIA ESCULTURAL & PLAYGROUND
// ============================================================================

export function TypographySection() {
  const [playText, setPlayText] = useState<string>("QUEM SUSTENTA É NÓIS.");
  const [playSize, setPlaySize] = useState<number>(3.8);
  const [playFont, setPlayFont] = useState<"display" | "body" | "mono">("display");
  const [playTracking, setPlayTracking] = useState<number>(-0.04);
  const [playWeight, setPlayWeight] = useState<number>(900);

  const QUICK_PHRASES = [
    "QUEM SUSTENTA É NÓIS.",
    "ENGENHARIA DE IMPACTO TERRITORIAL",
    "FIT SCORE SUZELY 87/100",
    "SOBERANIA POPULAR & SHARED VALUE",
    "R$ 50 BILHÕES EM TRANSIÇÃO JUSTA"
  ];

  return (
    <section
      id="04-tipografia-escultural"
      className="relative py-20 md:py-28 border-t border-white/[0.06] bg-[#08090A]"
      aria-label="04. Tipografia Escultural"
    >
      <span id="tipografia-escultural" className="sr-only" />
      <span id="tipografia" className="sr-only" />

      <SectionGlow color="#FFD600" position="80% 20%" opacity={0.04} size="45%" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Cabeçalho */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 rounded-full bg-[#FFD600]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#FFD600]">
              04 · TIPOGRAFIA ESCULTURAL
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#F3F4F6] leading-[0.92] mb-6">
            A Escala Monumental & <span className="text-[#FFD600]">Matriz de Fontes</span>.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#9CA3AF] leading-[1.65] font-light">
            Três famílias canônicas organizam o ecossistema. <strong>Antonio Display</strong> para headlines monumentais em All-Caps (-0.04em tracking), <strong>Outfit Body</strong> para leitura editorial arejada com line-height 1.65, e <strong>Geist Mono</strong> para scores algorítmicos da Suzely, metadados e tags.
          </p>
        </div>

        {/* Matriz Comparativa das 3 Fontes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16">
          
          {/* Card 1: Antonio Display */}
          <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00E676] font-bold">
                  01 · HEADLINES & H1/H2
                </span>
                <span className="font-mono text-[9px] text-white/40">ALL-CAPS</span>
              </div>
              <div className="font-display text-4xl sm:text-5xl font-black text-[#F3F4F6] tracking-[-0.04em] leading-[0.88] uppercase mb-4">
                ANTONIO DISPLAY
              </div>
              <p className="font-body text-xs text-[#9CA3AF] leading-relaxed font-light mb-4">
                Tipografia industrial de luxo. Rigorosa, condensada e monumental. Usada estritamente em maiúsculas com tracking de -0.04em.
              </p>
            </div>
            <div className="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-white/50 flex justify-between">
              <span>Pesos: 400 · 600 · 700 · 900</span>
              <span className="text-[#00E676]">var(--font-display)</span>
            </div>
          </div>

          {/* Card 2: Outfit Body */}
          <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#2979FF] font-bold">
                  02 · CORPO EDITORIAL & LABELS
                </span>
                <span className="font-mono text-[9px] text-white/40">LH 1.65</span>
              </div>
              <div className="font-body text-2xl sm:text-3xl font-light text-[#F3F4F6] leading-[1.2] mb-4">
                Outfit Editorial Body
              </div>
              <p className="font-body text-xs text-[#9CA3AF] leading-relaxed font-light mb-4">
                Leitura arejada, proporções geométricas suaves e legibilidade impecável para grandes blocos de texto e teses de Shared Value.
              </p>
            </div>
            <div className="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-white/50 flex justify-between">
              <span>Pesos: 300 · 400 · 500 · 700</span>
              <span className="text-[#2979FF]">var(--font-body)</span>
            </div>
          </div>

          {/* Card 3: Geist Mono */}
          <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FFD600] font-bold">
                  03 · SCORES, TAGS & DADOS
                </span>
                <span className="font-mono text-[9px] text-white/40">TABULAR</span>
              </div>
              <div className="font-mono text-xl sm:text-2xl font-bold text-[#FFD600] tracking-wide mb-4">
                FIT SCORE: 94.8%
              </div>
              <p className="font-body text-xs text-[#9CA3AF] leading-relaxed font-light mb-4">
                Família monospaçada técnica. Utilizada exclusivamente para números do Fit Score da Suzely, coordenadas territoriais e códigos.
              </p>
            </div>
            <div className="pt-3 border-t border-white/[0.06] font-mono text-[11px] text-white/50 flex justify-between">
              <span>Pesos: 400 · 700</span>
              <span className="text-[#FFD600]">var(--font-mono)</span>
            </div>
          </div>

        </div>

        {/* Playground Tipográfico Tátil */}
        <div className="mb-16 rounded-3xl bg-[#121417] border border-white/[0.08] overflow-hidden shadow-2xl">
          
          {/* Barra de Controles */}
          <div className="p-6 border-b border-white/[0.06] bg-[#0D0E0E] flex flex-wrap items-center justify-between gap-4">
            
            {/* Seletor de Família */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-white/50 uppercase">Fonte:</span>
              {[
                { id: "display", label: "Antonio (Display)" },
                { id: "body", label: "Outfit (Body)" },
                { id: "mono", label: "Geist Mono" }
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    setPlayFont(f.id as any);
                    if (f.id === "display") {
                      setPlayWeight(900);
                      setPlayTracking(-0.04);
                    } else if (f.id === "body") {
                      setPlayWeight(400);
                      setPlayTracking(0);
                    } else {
                      setPlayWeight(700);
                      setPlayTracking(0.05);
                    }
                  }}
                  className={`min-h-[44px] px-3.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                    playFont === f.id
                      ? "bg-[#00E676] text-[#08090A] font-bold"
                      : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sliders de Ajuste */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2 font-mono text-xs text-white/60">
                <span>Tamanho:</span>
                <input
                  type="range"
                  min="1.2"
                  max="6.0"
                  step="0.1"
                  value={playSize}
                  onChange={(e) => setPlaySize(parseFloat(e.target.value))}
                  className="w-24 accent-[#00E676]"
                />
                <span className="w-12 text-right text-white">{playSize}rem</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-white/60">
                <span>Tracking:</span>
                <input
                  type="range"
                  min="-0.06"
                  max="0.20"
                  step="0.01"
                  value={playTracking}
                  onChange={(e) => setPlayTracking(parseFloat(e.target.value))}
                  className="w-24 accent-[#00E676]"
                />
                <span className="w-12 text-right text-white">{playTracking}em</span>
              </div>
            </div>

          </div>

          {/* Botões de Frases Rápidas de Marca */}
          <div className="px-6 py-3 border-b border-white/[0.04] bg-[#08090A] flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] text-white/40 uppercase">Inserir Frase:</span>
            {QUICK_PHRASES.map((phrase) => (
              <button
                key={phrase}
                type="button"
                onClick={() => setPlayText(phrase)}
                className="min-h-[44px] px-3 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white font-mono text-[10px] transition-all cursor-pointer"
              >
                "{phrase}"
              </button>
            ))}
          </div>

          {/* Área de Visualização e Edição em Tempo Real */}
          <div className="p-8 sm:p-12 bg-[#050505] min-h-[220px] flex items-center justify-center">
            <textarea
              value={playText}
              onChange={(e) => setPlayText(e.target.value)}
              placeholder="Digite seu texto aqui..."
              rows={3}
              style={{
                fontSize: `${playSize}rem`,
                fontFamily: playFont === "display" ? "var(--font-display)" : playFont === "mono" ? "var(--font-mono)" : "var(--font-body)",
                fontWeight: playWeight,
                letterSpacing: `${playTracking}em`,
                textTransform: playFont === "display" ? "uppercase" : "none",
                lineHeight: playFont === "display" ? "0.92" : "1.4"
              }}
              className="w-full bg-transparent text-[#F3F4F6] resize-none outline-none border-none text-center font-bold"
            />
          </div>

          {/* Barra de Saída de Tokens CSS e Tailwind */}
          <div className="p-5 border-t border-white/[0.06] bg-[#0D0E0E] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="text-white/60">
              CSS: <span className="text-[#00E676]">font-family: {playFont === "display" ? "var(--font-display)" : playFont === "mono" ? "var(--font-mono)" : "var(--font-body)"}; font-size: {playSize}rem; letter-spacing: {playTracking}em;</span>
            </div>
            <CopyChip
              value={`font-family: ${playFont === "display" ? "var(--font-display)" : playFont === "mono" ? "var(--font-mono)" : "var(--font-body)"}; font-size: ${playSize}rem; letter-spacing: ${playTracking}em;`}
              label="Copiar CSS"
            />
          </div>

        </div>

        {/* Tabela da Escala Tipográfica Responsiva */}
        <div className="rounded-2xl bg-[#121417] border border-white/[0.06] p-6 sm:p-8">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 font-semibold block mb-6">
            // HIERARQUIA DA ESCALA TIPOGRÁFICA
          </span>

          <div className="space-y-4">
            {[
              { level: "Display", size: "6.5rem", font: "var(--font-display)", tracking: "-0.05em", weight: 900, text: "BRASIL SUSTENTA", role: "Monumental Hero" },
              { level: "H1", size: "4.0rem", font: "var(--font-display)", tracking: "-0.04em", weight: 700, text: "DESIGN SYSTEM PÁTRIA", role: "Títulos de Seção" },
              { level: "H2", size: "2.5rem", font: "var(--font-display)", tracking: "-0.03em", weight: 600, text: "ENGENHARIA TERRITORIAL", role: "Sub-cabeçalhos" },
              { level: "H3", size: "1.5rem", font: "var(--font-body)", tracking: "normal", weight: 700, text: "Tese de Shared Value e ROI Socioambiental", role: "Títulos de Cards" },
              { level: "Body", size: "1.0625rem", font: "var(--font-body)", tracking: "normal", weight: 400, text: "A juventude universitária e a comunidade aplicam a transição prática no território.", role: "Texto Corrido / Parágrafos" },
              { level: "Score", size: "2.0rem", font: "var(--font-mono)", tracking: "-0.02em", weight: 700, text: "87/100 · 94.8% FIT", role: "Scores e Métricas" },
              { level: "Eyebrow", size: "0.6875rem", font: "var(--font-mono)", tracking: "0.22em", weight: 700, text: "04 · TIPOGRAFIA ESCULTURAL", role: "Metadados e Tags" }
            ].map((row) => (
              <div
                key={row.level}
                className="p-4 rounded-xl bg-[#08090A] border border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-xs font-bold text-[#00E676]">{row.level}</span>
                    <span className="font-mono text-[10px] text-white/30">{row.role}</span>
                  </div>
                  <div
                    style={{
                      fontFamily: row.font,
                      fontSize: `min(${row.size}, 8vw)`,
                      fontWeight: row.weight,
                      letterSpacing: row.tracking,
                      lineHeight: "1.1"
                    }}
                    className="text-[#F3F4F6] truncate"
                  >
                    {row.text}
                  </div>
                </div>
                <div className="font-mono text-[10px] text-white/40 md:text-right shrink-0">
                  <span>{row.size} · {row.tracking}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ============================================================================
// 05. SEÇÃO: TOM DE VOZ & FILTRO ANTI-GREENWASHING
// ============================================================================

interface PersonaTonePair {
  id: string;
  context: string;
  cliche: {
    text: string;
    critique: string;
  };
  soberano: {
    text: string;
    rationale: string;
  };
}

interface PersonaData {
  id: string;
  title: string;
  role: string;
  accent: string;
  tag: string;
  description: string;
  pairs: PersonaTonePair[];
}

const PERSONAS_DATA: PersonaData[] = [
  {
    id: "b2b",
    title: "B2B Corporativo",
    role: "Diretorias de Sustentabilidade, ESG & Inovação",
    accent: "#00E676",
    tag: "EMPRESAS & IMPACTO SÍNCRONO",
    description: "Comunicação com executivos C-Level, gestores de risco e conselhos de administração focados em ROI socioambiental auditável e cumprimento de metas ESG sem maquiagem verde.",
    pairs: [
      {
        id: "b2b-1",
        context: "Apresentação da Tese de Impacto",
        cliche: {
          text: "Nossa empresa tem o orgulho de plantar um futuro mais verde e sustentável para as próximas gerações através de ações sociais integradas.",
          critique: "Abstrato, clichê de marketing verde, paternalista e sem métricas auditáveis."
        },
        soberano: {
          text: "Alocamos squads universitários de alto rendimento diretamente na calçada para descarbonizar sua cadeia e gerar evidências auditadas em 6 semanas.",
          rationale: "Focado em ação operacional precisa, prazo definido (6 semanas) e rigor de conformidade."
        }
      },
      {
        id: "b2b-2",
        context: "Justificativa Financeira (Shared Value)",
        cliche: {
          text: "Fazer o bem faz bem para a imagem corporativa da sua marca perante os consumidores conscientes.",
          critique: "Trata sustentabilidade como custo de RP cosmético e caridade assistencialista."
        },
        soberano: {
          text: "Lucro e impacto socioambiental são motores síncronos: o lucro financia a transição territorial e a solução de campo valida a perenidade do negócio.",
          rationale: "Tese sólida de Shared Value, posicionando impacto como motor econômico de R$ 50 bilhões."
        }
      },
      {
        id: "b2b-3",
        context: "Contratação & Talent Pool",
        cliche: {
          text: "Apoiamos a inclusão social dando oportunidade e capacitação a jovens menos favorecidos.",
          critique: "Linguagem condescendente que diminui a competência técnica dos talentos periféricos."
        },
        soberano: {
          text: "Nossos squads funcionam como o funil prático de contratação: o RH acessa talentos pré-auditados em campo pela Tríade com Fit Score algorítmico comprovado.",
          rationale: "Foco no mérito técnico, competência validada in loco e inteligência de dados Suzely."
        }
      }
    ]
  },
  {
    id: "b2g",
    title: "B2G Governamental",
    role: "Prefeituras, Secretarias & Gestão Pública",
    accent: "#2979FF",
    tag: "SMART CITIES & POLÍTICAS PÚBLICAS",
    description: "Comunicação técnica e institucional com secretarias municipais, órgãos reguladores e prefeituras, priorizando segurança jurídica, transparência e adesão aos marcos regulatórios.",
    pairs: [
      {
        id: "b2g-1",
        context: "Convênios e Cooperação Técnica",
        cliche: {
          text: "Queremos ser o parceiro que ajuda a prefeitura a cuidar da nossa cidade com carinho e dedicação.",
          critique: "Tom sentimentalista inócuo, sem amparo técnico-jurídico ou metodologia de entrega."
        },
        soberano: {
          text: "Estruturamos convênios tripartite (Universidade-Prefeitura-Empresa) com rastreabilidade de dados abertos para cumprimento das metas municipais dos 18 ODS.",
          rationale: "Baseado em segurança jurídica institucional, governança pública e conformidade com metas."
        }
      },
      {
        id: "b2g-2",
        context: "Transição Justa & Descarbonização",
        cliche: {
          text: "Um plano para transformar nossa cidade em um modelo ecológico internacional sem poluição.",
          critique: "Promessa utópica de palanque sem viabilidade orçamentária ou diagnóstico local."
        },
        soberano: {
          text: "Diagnosticamos vulnerabilidades climáticas por georreferenciamento e implementamos intervenções urbanas de baixo custo com governança auditável.",
          rationale: "Realismo orçamentário, dados geoespaciais e rigor técnico de engenharia territorial."
        }
      }
    ]
  },
  {
    id: "academico",
    title: "Acadêmico / MEC 10%",
    role: "Pró-Reitorias, Coordenadores & Docentes",
    accent: "#FFD600",
    tag: "CURRICULARIZAÇÃO DE EXTENSÃO",
    description: "Alinhamento com a Lei 13.005 e Resolução CNE/CES nº 7/2018 para creditação de 10% da carga horária curricular dos cursos de graduação em projetos territoriais reais.",
    pairs: [
      {
        id: "acad-1",
        context: "Creditação Curricular (Lei 13.005)",
        cliche: {
          text: "Atividades extracurriculares voluntárias para os alunos somarem horas complementares no final do semestre.",
          critique: "Trata extensão como mero preenchimento burocrático de horas sem método científico."
        },
        soberano: {
          text: "Integralização pedagógica de 10% da matriz curricular com rigor metodológico, dosimetria de horas e emissão de dossiês de impacto auditáveis pelo MEC.",
          rationale: "Conformidade direta com o marco regulatório do MEC e respeito à produção científica."
        }
      },
      {
        id: "acad-2",
        context: "Papel do Estudante",
        cliche: {
          text: "Os estudantes vão a campo para levar conhecimento aos bairros que precisam de instrução.",
          critique: "Arrogância acadêmica paternalista que ignora o saber ancestral e empírico do território."
        },
        soberano: {
          text: "Os estudantes entram no território desprovidos de viés para escutar a comunidade e co-criar soluções de engenharia com a liderança local.",
          rationale: "Princípio de 'Entrar Sem Viés': escuta ativa e diálogo de saberes entre universidade e calçada."
        }
      }
    ]
  },
  {
    id: "territorio",
    title: "Território / Comunidade",
    role: "Lideranças Locais, Coletivos & Juventude",
    accent: "#FF9100",
    tag: "SOBERANIA POPULAR & AUTORIA",
    description: "A linguagem da calçada, do corre e da vida real. Rejeição veemente ao assistencialismo e garantia de protagonismo na decisão dos projetos que transformam a vizinhança.",
    pairs: [
      {
        id: "terr-1",
        context: "Engajamento Comunitário",
        cliche: {
          text: "Chegamos para ajudar a salvar e dar voz à população carente da periferia.",
          critique: "Paternalismo colonial que pressupõe que a comunidade é carente de voz ou incapaz de pensar."
        },
        soberano: {
          text: "A voz e a decisão são de quem vive aqui. O Brasil Sustenta entra com método e tecnologia; a autoria da transformação é 100% da comunidade.",
          rationale: "Adoção do princípio 'Quem sustenta é nóis': autonomia, respeito e soberania territorial."
        }
      },
      {
        id: "terr-2",
        context: "Remuneração e Reconhecimento",
        cliche: {
          text: "Trabalho voluntário lindo para enriquecer a alma e gerar gratidão coletiva.",
          critique: "Romantização da precariedade que nega o valor econômico do trabalho comunitário."
        },
        soberano: {
          text: "Impacto territorial gera remuneração digna, formação técnica de ponta e inserção direta no mercado de tecnologia e descarbonização.",
          rationale: "Garantia de que o trabalho de campo gera mobilidade econômica real e perene."
        }
      }
    ]
  }
];

export function VoiceToneSection() {
  const [activePersonaId, setActivePersonaId] = useState<string>("b2b");
  const currentPersona = PERSONAS_DATA.find((p) => p.id === activePersonaId) || PERSONAS_DATA[0];

  return (
    <section
      id="05-tom-de-voz"
      className="relative py-20 md:py-28 border-t border-white/[0.06] bg-[#08090A]"
      aria-label="05. Tom de Voz & Filtro Anti-Greenwashing"
    >
      <span id="tom-de-voz" className="sr-only" />
      <span id="tom" className="sr-only" />

      <SectionGlow color="#2979FF" position="15% 15%" opacity={0.04} size="45%" />
      <SectionGlow color="#00E676" position="85% 70%" opacity={0.04} size="40%" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Cabeçalho Editorial */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 rounded-full bg-[#2979FF]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#2979FF]">
              05 · TOM DE VOZ & FILTRO ANTI-GREENWASHING
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#F3F4F6] leading-[0.92] mb-6">
            Inconformismo Soberano & <span className="text-[#2979FF]">Rigor Técnico</span>.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#9CA3AF] leading-[1.65] font-light">
            Falamos com a autoridade de quem opera no chão da fábrica e na calçada da periferia. Eliminamos terminologias vazias de consultoria corporativa e paternalismos assistencialistas. Nossa redação é afirmativa, provocativa, orientada a negócios e rigorosamente ancorada em evidências científicas auditáveis.
          </p>
        </div>

        {/* 4 Pilares Inegociáveis da Voz Brasil Sustenta */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            {
              title: "Quem Sustenta é Nóis",
              subtitle: "Soberania Popular",
              desc: "A comunidade e a juventude universitária não são beneficiárias passivas: são as autoras e executoras da transição justa.",
              accent: "#00E676"
            },
            {
              title: "Entrar Sem Viés",
              subtitle: "Desaprendizado de Slide",
              desc: "Rejeitamos respostas prontas de PowerPoint. Escutamos o território antes de formular qualquer linha de código ou projeto.",
              accent: "#2979FF"
            },
            {
              title: "Sprints de Evidência",
              subtitle: "Execução em 6 Semanas",
              desc: "Construímos sob risco calculado, validando hipóteses com dados reais de campo e corrigindo a rota de imediato.",
              accent: "#FFD600"
            },
            {
              title: "Shared Value na Veia",
              subtitle: "Lucro + Impacto Síncronos",
              desc: "Lucro não é pecado corporativo: é o combustível que financia o impacto perene. Sem filantropia de vitrine.",
              accent: "#FF9100"
            }
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: pillar.accent }}>
                    {pillar.subtitle}
                  </span>
                  <Dot color={pillar.accent} size={6} />
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#F3F4F6] mb-2 leading-tight">
                  {pillar.title}
                </h3>
                <p className="font-body text-xs text-[#9CA3AF] leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Matriz Interativa Comparativa: Filtro Anti-Greenwashing por Persona */}
        <div className="rounded-3xl bg-[#121417] border border-white/[0.08] p-6 sm:p-8 md:p-10 mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#2979FF] animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#2979FF]">
                  MATRIZ INTERATIVA DE TRADUÇÃO DE TOM
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#F3F4F6] mt-1">
                Corporativês Clichê vs. Linguagem Soberana
              </h3>
            </div>

            {/* Seletor de 4 Personas com Touch Target >= 44px */}
            <div className="flex flex-wrap items-center gap-2">
              {PERSONAS_DATA.map((persona) => {
                const isSelected = activePersonaId === persona.id;
                return (
                  <button
                    key={persona.id}
                    type="button"
                    onClick={() => setActivePersonaId(persona.id)}
                    className={`min-h-[44px] px-4 py-2 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "bg-white text-[#08090A] shadow-md scale-[1.02]"
                        : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                    }`}
                  >
                    <span className="size-2 rounded-full" style={{ background: isSelected ? "#08090A" : persona.accent }} />
                    <span>{persona.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Descritivo da Persona Ativa */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#08090A] border border-white/[0.06] mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: currentPersona.accent }}>
                  {currentPersona.tag}
                </span>
                <span className="text-white/30 text-xs">·</span>
                <span className="font-mono text-xs text-white/80">{currentPersona.role}</span>
              </div>
              <p className="font-body text-xs text-[#9CA3AF] font-light">
                {currentPersona.description}
              </p>
            </div>
          </div>

          {/* Lista Comparativa de Pares da Persona */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPersona.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="space-y-6"
            >
              {currentPersona.pairs.map((pair) => (
                <div
                  key={pair.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0D0E0E] border border-white/[0.06] space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.04] pb-3">
                    <span className="font-mono text-xs uppercase tracking-wider text-white/50 font-medium">
                      Contexto: <strong className="text-white">{pair.context}</strong>
                    </span>
                    <CopyChip value={pair.soberano.text} label="Copiar Versão Oficial" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Lado Esquerdo: Clichê / Erro */}
                    <div className="p-4 rounded-xl bg-[#FF1744]/[0.03] border border-[#FF1744]/20 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="size-1.5 rounded-full bg-[#FF1744]" />
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF1744]">
                            ✕ Corporativês Clichê / Greenwashing
                          </span>
                        </div>
                        <p className="font-body text-sm text-[#F3F4F6]/80 italic mb-3 leading-relaxed">
                          "{pair.cliche.text}"
                        </p>
                      </div>
                      <div className="pt-2 border-t border-[#FF1744]/10">
                        <span className="font-mono text-[10px] text-[#FF1744] block">
                          Diagnóstico: {pair.cliche.critique}
                        </span>
                      </div>
                    </div>

                    {/* Lado Direito: Soberano / Brasil Sustenta */}
                    <div className="p-4 rounded-xl bg-[#00E676]/[0.03] border border-[#00E676]/20 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="size-1.5 rounded-full bg-[#00E676]" />
                          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#00E676]">
                            ✓ Versão Soberana Brasil Sustenta
                          </span>
                        </div>
                        <p className="font-body text-sm text-[#F3F4F6] font-medium mb-3 leading-relaxed">
                          "{pair.soberano.text}"
                        </p>
                      </div>
                      <div className="pt-2 border-t border-[#00E676]/10">
                        <span className="font-mono text-[10px] text-[#00E676] block">
                          Fundamento: {pair.soberano.rationale}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Guia Definitivo de Do's & Don'ts de Redação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Do's */}
          <div className="rounded-2xl bg-[#00E676]/[0.02] border border-[#00E676]/20 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="size-2 rounded-full bg-[#00E676]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E676] font-bold">
                ✓ DIRETRIZES DE REDAÇÃO (DO'S)
              </span>
            </div>
            <ul className="space-y-3.5 text-sm text-[#9CA3AF] font-body font-light">
              <li className="flex items-start gap-2.5">
                <span className="text-[#00E676] font-bold mt-0.5">✓</span>
                <span><strong>Ancoragem em Evidências:</strong> Citar métricas precisas (ODS, Fit Score, semanas de sprint, descarbonização auditada).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#00E676] font-bold mt-0.5">✓</span>
                <span><strong>Autoria Comunitária:</strong> Tratar lideranças locais e estudantes como protagonistas e detentores do saber de campo.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#00E676] font-bold mt-0.5">✓</span>
                <span><strong>Verdade da Calçada:</strong> Usar vocabulário direto, real e transparente ("corre real", "chão de fábrica", "in loco").</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#00E676] font-bold mt-0.5">✓</span>
                <span><strong>Lógica de Shared Value:</strong> Demonstrar com clareza o retorno sobre investimento socioambiental e a geração de receita limpa.</span>
              </li>
            </ul>
          </div>

          {/* Don'ts */}
          <div className="rounded-2xl bg-[#FF1744]/[0.02] border border-[#FF1744]/20 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="size-2 rounded-full bg-[#FF1744]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF1744] font-bold">
                ✕ O QUE ELIMINAR (DON'TS)
              </span>
            </div>
            <ul className="space-y-3.5 text-sm text-[#9CA3AF] font-body font-light">
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF1744] font-bold mt-0.5">✕</span>
                <span><strong>Paternalismo Assistencialista:</strong> Nunca usar expressões como "ajudar os carentes", "população desfavorecida", "dar voz".</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF1744] font-bold mt-0.5">✕</span>
                <span><strong>Jargões Corporativos Vazios:</strong> Banir termos como "sinergia 360", "ecossistema disruptivo", "mindset holístico".</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF1744] font-bold mt-0.5">✕</span>
                <span><strong>Greenwashing Abstrato:</strong> Proibido prometer "salvar o planeta", "futuro verde" ou "abraçar a natureza" sem entrega técnica.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF1744] font-bold mt-0.5">✕</span>
                <span><strong>Superioridade Acadêmica:</strong> Rejeitar a postura de "levar conhecimento" de forma unilateral à comunidade.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}

// ============================================================================
// 06. SEÇÃO: DIRETRIZ FOTOGRÁFICA & FILTRO DE IMAGEM
// ============================================================================

interface PhotoScenario {
  id: string;
  title: string;
  location: string;
  tag: string;
  image: string;
  aspectRatio: string;
  description: string;
  metadata: {
    territory: string;
    ods: string;
    focus: string;
  };
}

const PHOTO_SCENARIOS: PhotoScenario[] = [
  {
    id: "campinas",
    title: "Diagnóstico de Campo & Hub Territorial",
    location: "Campinas / SP — Bairro Campo Grande",
    tag: "DIAGNÓSTICO IN LOCO",
    image: "/imagery/territorio-campinas.jpg",
    aspectRatio: "16:9",
    description: "Pesquisadores e estudantes mapeando vulnerabilidades climáticas e infraestrutura hídrica com a comunidade local.",
    metadata: {
      territory: "Polo Tecnológico de Campinas",
      ods: "ODS 11 & ODS 6",
      focus: "Mapeamento Comunitário"
    }
  },
  {
    id: "cop30",
    title: "Juventude COP 30 & Liderança Climática",
    location: "Belém / PA — Amazônia Urbana",
    tag: "PROTAGONISMO JOVEM",
    image: "/imagery/juventude-cop30.jpg",
    aspectRatio: "4:5",
    description: "Estudantes e coletivos periféricos estruturando planos de descarbonização e bioeconomia para a conferência climática.",
    metadata: {
      territory: "Amazônia Oriental / Belém",
      ods: "ODS 13 & ODS 18",
      focus: "Engenharia de Transição Justa"
    }
  },
  {
    id: "ufrj",
    title: "Extensão Curricular MEC 10% no Campus",
    location: "Rio de Janeiro / RJ — Praia Vermelha",
    tag: "RIGOR CIENTÍFICO MEC",
    image: "/imagery/campus-praia-vermelha.jpg",
    aspectRatio: "1:1",
    description: "Bancada universitária integrando pesquisa acadêmica de laboratório com aplicação direta em comunidades vizinhas.",
    metadata: {
      territory: "Campus Universitário / Rio",
      ods: "ODS 4 & ODS 9",
      focus: "Curricularização Lei 13.005"
    }
  }
];

export function ImagerySection() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("campinas");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const activeScenario = PHOTO_SCENARIOS.find((s) => s.id === activeScenarioId) || PHOTO_SCENARIOS[0];

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <section
      id="06-diretriz-fotografica"
      className="relative py-20 md:py-28 border-t border-white/[0.06] bg-[#08090A]"
      aria-label="06. Diretriz Fotográfica & Filtro de Imagem"
    >
      <span id="diretriz-fotografica" className="sr-only" />
      <span id="fotografia" className="sr-only" />

      <SectionGlow color="#00E676" position="20% 20%" opacity={0.04} size="45%" />
      <SectionGlow color="#2979FF" position="80% 80%" opacity={0.04} size="40%" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Cabeçalho Editorial */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 rounded-full bg-[#00E676]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#00E676]">
              06 · DIRETRIZ FOTOGRÁFICA & FILTRO DE IMAGEM
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#F3F4F6] leading-[0.92] mb-6">
            Realidade Documental & <span className="text-[#00E676]">Tratamento Canônico</span>.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#9CA3AF] leading-[1.65] font-light">
            Retratamos pessoas reais, estudantes no campus e bairros brasileiros sem maquiagem publicitária. O tratamento fotográfico canônico aplica leve dessaturação, contraste aprimorado, granulação orgânica e overlays bioluminescentes contidos que garantem legibilidade tipográfica superior sobre qualquer imagem.
          </p>
        </div>

        {/* Showcase Interativo: Antes / Depois com Slider Responsivo */}
        <div className="rounded-3xl bg-[#121417] border border-white/[0.08] p-6 sm:p-8 md:p-10 mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#00E676] animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#00E676]">
                  SHOWCASE INTERATIVO ANTES / DEPOIS
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#F3F4F6] mt-1">
                Filtro Documental em 3 Cenários Reais
              </h3>
            </div>

            {/* Seletor de Cenários Reais (Touch Target >= 44px) */}
            <div className="flex flex-wrap items-center gap-2">
              {PHOTO_SCENARIOS.map((scenario) => {
                const isSelected = activeScenarioId === scenario.id;
                return (
                  <button
                    key={scenario.id}
                    type="button"
                    onClick={() => setActiveScenarioId(scenario.id)}
                    className={`min-h-[44px] px-4 py-2 rounded-full font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#00E676] text-[#08090A] shadow-md font-bold scale-[1.02]"
                        : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                    }`}
                  >
                    {scenario.title.split("&")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Canvas do Slider Antes / Depois */}
          <div
            className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] rounded-2xl overflow-hidden select-none border border-white/[0.08] cursor-ew-resize bg-[#08090A]"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={(e) => {
              if (isDragging || e.buttons === 1) {
                const rect = e.currentTarget.getBoundingClientRect();
                handleSliderMove(e.clientX, rect);
              }
            }}
            onTouchMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              if (e.touches[0]) {
                handleSliderMove(e.touches[0].clientX, rect);
              }
            }}
          >
            {/* Camada 1: Original Bruto (Fundo Base) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={activeScenario.image}
                alt={`${activeScenario.title} - Original`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest bg-[#08090A]/85 text-[#FF1744] px-3 py-1.5 rounded-full border border-[#FF1744]/30 backdrop-blur-md">
                  ✕ ANTES: FOTOGRAFIA BRUTA (NÃO TRATADA)
                </span>
              </div>
            </div>

            {/* Camada 2: Tratamento Documental Canônico (Clip Path pela Posição do Slider) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img
                src={activeScenario.image}
                alt={`${activeScenario.title} - Tratada`}
                className="w-full h-full object-cover"
                style={{
                  filter: "grayscale(0.15) contrast(1.08) brightness(0.92)"
                }}
              />
              {/* Overlays de Aurora e Granulação */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(circle at 15% 25%, rgba(0, 230, 118, 0.12) 0%, transparent 60%),
                    radial-gradient(circle at 85% 75%, rgba(41, 121, 255, 0.12) 0%, transparent 60%),
                    linear-gradient(to bottom, rgba(8, 9, 10, 0.2) 0%, rgba(8, 9, 10, 0.6) 100%)
                  `
                }}
              />
              <div className="absolute top-4 left-4 z-10">
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest bg-[#08090A]/85 text-[#00E676] px-3 py-1.5 rounded-full border border-[#00E676]/30 backdrop-blur-md">
                  ✓ DEPOIS: TRATAMENTO DOCUMENTAL SOBERANO
                </span>
              </div>
            </div>

            {/* Linha Divisória e Handle Central de Arraste (Touch Target >= 44px) */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-11 rounded-full bg-[#08090A] border-2 border-white flex items-center justify-center shadow-2xl cursor-ew-resize pointer-events-auto">
                <div className="flex items-center gap-1">
                  <span className="text-white text-xs font-bold font-mono">◀</span>
                  <span className="text-white text-xs font-bold font-mono">▶</span>
                </div>
              </div>
            </div>

            {/* Legenda Informativa no Canto Inferior */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl bg-[#08090A]/85 backdrop-blur-md border border-white/[0.08]">
              <div>
                <span className="font-display text-sm sm:text-base font-bold uppercase text-white block">
                  {activeScenario.title}
                </span>
                <span className="font-mono text-[11px] text-white/60">
                  {activeScenario.location} · {activeScenario.metadata.ods}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded border border-[#00E676]/20">
                  {sliderPosition.toFixed(0)}% Revelado
                </span>
              </div>
            </div>
          </div>

          {/* Instrução Interativa & Metadados do Cenário */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 text-white/50 font-mono text-xs">
            <span>Arraste o divisor central ou toque na imagem para comparar o tratamento óptico.</span>
            <span className="text-[#00E676]">Filtro: grayscale(0.15) contrast(1.08) + Overlays Aurora</span>
          </div>
        </div>

        {/* 3 Enquadramentos Canônicos & Proporções */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 font-semibold block mb-6">
            // GUIAS VISUAIS DE ENQUADRAMENTO CANÔNICO
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                ratio: "16:9",
                name: "Editorial & Paisagem",
                use: "Banners monumentais, heróis de página, apresentações executivas e visão ampla do território.",
                specs: "1920x1080px (Landscape) · Regra dos Terços Obrigatória",
                accent: "#00E676"
              },
              {
                ratio: "4:5",
                name: "Social Portrait & Liderança",
                use: "Retratos de lideranças comunitárias, jovens universitários em campo e cards de divulgação social.",
                specs: "1080x1350px (Vertical) · Foco nos Olhos e Expressão Genuína",
                accent: "#2979FF"
              },
              {
                ratio: "1:1",
                name: "Território & Bento Grid",
                use: "Avatares de squad, fichas de evidência técnica, miniaturas de projetos e selos ODS.",
                specs: "1080x1080px (Square) · Composição Centralizada / Close-up",
                accent: "#FFD600"
              }
            ].map((frame) => (
              <div
                key={frame.ratio}
                className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold uppercase tracking-wider" style={{ color: frame.accent }}>
                      PROPORÇÃO {frame.ratio}
                    </span>
                    <span className="size-2 rounded-full" style={{ background: frame.accent }} />
                  </div>

                  {/* Wireframe Ilustrativo da Proporção */}
                  <div className="h-32 rounded-xl bg-[#08090A] border border-white/[0.06] mb-4 flex items-center justify-center p-3">
                    <div
                      className="border border-dashed rounded flex items-center justify-center transition-all"
                      style={{
                        borderColor: frame.accent,
                        aspectRatio: frame.ratio === "16:9" ? "16/9" : frame.ratio === "4:5" ? "4/5" : "1/1",
                        height: frame.ratio === "16:9" ? "60%" : "85%"
                      }}
                    >
                      <span className="font-mono text-[10px] font-bold" style={{ color: frame.accent }}>
                        {frame.ratio}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-display text-lg font-bold uppercase text-[#F3F4F6] mb-2">
                    {frame.name}
                  </h4>
                  <p className="font-body text-xs text-[#9CA3AF] leading-relaxed font-light mb-3">
                    {frame.use}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.06] font-mono text-[10px] text-white/40">
                  {frame.specs}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Snippet de Código CSS para Fotografia */}
        <div className="rounded-2xl bg-[#121417] border border-white/[0.06] p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E676] font-semibold">
              // CSS TOKENS OFICIAIS PARA FOTOGRAFIA
            </span>
            <CopyChip
              value={`.photo-brand-filter {
  filter: grayscale(0.15) contrast(1.08) brightness(0.92);
  background: radial-gradient(circle at 15% 25%, rgba(0, 230, 118, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 85% 75%, rgba(41, 121, 255, 0.12) 0%, transparent 60%);
}`}
              label="Copiar CSS"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <p className="font-body text-sm text-[#9CA3AF] leading-relaxed font-light">
                Todas as fotografias de pessoas ou do território devem ser dessaturadas para neutralizar cores estranhas ao design system e receber overlays sutis dos nossos gradientes semânticos (Leaf ou Atlantic) para fixar a assinatura visual da marca.
              </p>
            </div>
            <div className="lg:col-span-7">
              <pre className="p-4 rounded-xl bg-[#08090A] border border-white/[0.06] text-xs font-mono text-[#00E676] overflow-x-auto leading-relaxed">
{`.photo-brand-filter {
  filter: grayscale(0.15) contrast(1.08) brightness(0.92);
  /* Overlay Canônico Aurora Leaf & Atlantic */
  background: radial-gradient(circle at 15% 25%, rgba(0, 230, 118, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 85% 75%, rgba(41, 121, 255, 0.12) 0%, transparent 60%);
}`}
              </pre>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ============================================================================
// 07. SEÇÃO: COMPONENTES & BENTO UI (COM SIMULADOR SUZELY 5 PESOS EXATOS)
// ============================================================================

export function ComponentsBentoSection() {
  // 5 Fatores Canônicos do Fit Score Suzely com os Pesos Matemáticos Exatos:
  // 1. Skills Técnicas: 35%
  // 2. Alinhamento ODS: 25%
  // 3. Contexto Territorial: 15%
  // 4. Disponibilidade Operacional: 15%
  // 5. Proximidade Territorial: 10%
  const [skillsScore, setSkillsScore] = useState<number>(85);
  const [odsScore, setOdsScore] = useState<number>(90);
  const [contextScore, setContextScore] = useState<number>(80);
  const [availScore, setAvailScore] = useState<number>(75);
  const [territoryScore, setTerritoryScore] = useState<number>(70);

  // Fórmula Matemática Canônica Exata
  const totalFitScore = Math.round(
    skillsScore * 0.35 +
    odsScore * 0.25 +
    contextScore * 0.15 +
    availScore * 0.15 +
    territoryScore * 0.10
  );

  const getScoreStatus = (score: number) => {
    if (score >= 75) {
      return {
        label: "APROVADO PARA ALOCAÇÃO",
        color: "#00E676",
        bg: "rgba(0, 230, 118, 0.10)",
        border: "rgba(0, 230, 118, 0.30)",
        desc: "Match de Alto Nível · Alocação Recomendada Imediata em Squad Territorial."
      };
    }
    if (score >= 60) {
      return {
        label: "ALERTA DE COMPATIBILIDADE",
        color: "#FFD600",
        bg: "rgba(255, 214, 0, 0.10)",
        border: "rgba(255, 214, 0, 0.30)",
        desc: "Compatibilidade Média · Recomendada mentoria técnica ou ajuste de disponibilidade de horas."
      };
    }
    return {
      label: "REPROVADO PARA ESTA VAGA",
      color: "#FF1744",
      bg: "rgba(255, 23, 68, 0.10)",
      border: "rgba(255, 23, 68, 0.30)",
      desc: "Incompatibilidade Operacional · Candidato direcionado para trilha preparatória de capacitação."
    };
  };

  const status = getScoreStatus(totalFitScore);

  const applyPreset = (preset: "ideal" | "academico" | "desalinhado") => {
    if (preset === "ideal") {
      setSkillsScore(95);
      setOdsScore(92);
      setContextScore(88);
      setAvailScore(85);
      setTerritoryScore(90);
    } else if (preset === "academico") {
      setSkillsScore(78);
      setOdsScore(95);
      setContextScore(82);
      setAvailScore(70);
      setTerritoryScore(65);
    } else {
      setSkillsScore(45);
      setOdsScore(55);
      setContextScore(40);
      setAvailScore(50);
      setTerritoryScore(30);
    }
  };

  return (
    <section
      id="07-componentes-bento"
      className="relative py-20 md:py-28 border-t border-white/[0.06] bg-[#08090A]"
      aria-label="07. Componentes & Bento UI"
    >
      <span id="componentes-bento" className="sr-only" />
      <span id="componentes" className="sr-only" />
      <span id="metodo" className="sr-only" />

      <SectionGlow color="#FFD600" position="15% 15%" opacity={0.04} size="45%" />
      <SectionGlow color="#00E676" position="85% 75%" opacity={0.04} size="40%" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Cabeçalho Editorial */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 rounded-full bg-[#FFD600]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#FFD600]">
              07 · COMPONENTES, BENTO UI & MOTOR SUZELY
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#F3F4F6] leading-[0.92] mb-6">
            Primitivos Táteis & <span className="text-[#FFD600]">Simulador da Suzely</span>.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#9CA3AF] leading-[1.65] font-light">
            Componentes interativos modulares com botões cápsula táteis (rounded-full), microinterações de elevação e o simulador ao vivo do motor Suzely com a ponderação matemática exata dos 5 fatores canônicos.
          </p>
        </div>

        {/* Pipeline de Squad Animado (Método Operacional) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">
              // PIPELINE OPERACIONAL · AS 5 ETAPAS DO MÉTODO
            </span>
          </div>
          <FlowDemo />
        </div>

        {/* Simulador Interativo do Fit Score da Suzely (5 Fatores e Pesos Reais) */}
        <div className="rounded-3xl bg-[#121417] border border-white/[0.08] p-6 sm:p-8 md:p-10 mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#FFD600] animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD600]">
                  MOTOR VETORIAL SUZELY · SIMULADOR EM TEMPO REAL
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#F3F4F6] mt-1">
                Fit Score Ponderado (5 Pesos Matemáticos)
              </h3>
            </div>

            {/* Presets Rápidos de Teste com Touch Target >= 44px */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] text-white/40 uppercase hidden lg:inline">Presets:</span>
              <button
                type="button"
                onClick={() => applyPreset("ideal")}
                className="min-h-[44px] px-3.5 rounded-full bg-white/[0.04] hover:bg-[#00E676]/20 text-white hover:text-[#00E676] border border-white/[0.08] font-mono text-xs transition-all cursor-pointer"
              >
                Perfil Ideal (91%)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("academico")}
                className="min-h-[44px] px-3.5 rounded-full bg-white/[0.04] hover:bg-[#2979FF]/20 text-white hover:text-[#2979FF] border border-white/[0.08] font-mono text-xs transition-all cursor-pointer"
              >
                MEC 10% (80%)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("desalinhado")}
                className="min-h-[44px] px-3.5 rounded-full bg-white/[0.04] hover:bg-[#FF1744]/20 text-white hover:text-[#FF1744] border border-white/[0.08] font-mono text-xs transition-all cursor-pointer"
              >
                Desalinhado (46%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Coluna da Esquerda: Sliders Interativos dos 5 Fatores */}
            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  label: "1. Skills Técnicas",
                  weight: "35%",
                  value: skillsScore,
                  setter: setSkillsScore,
                  color: "#00E676",
                  desc: "Domínio de stack, linguagens, ferramentas e entregáveis técnicos."
                },
                {
                  label: "2. Alinhamento ODS",
                  weight: "25%",
                  value: odsScore,
                  setter: setOdsScore,
                  color: "#FFD600",
                  desc: "Aderência do perfil aos 18 objetivos de desenvolvimento sustentável."
                },
                {
                  label: "3. Contexto Territorial",
                  weight: "15%",
                  value: contextScore,
                  setter: setContextScore,
                  color: "#2979FF",
                  desc: "Compreensão da dinâmica local, vulnerabilidades e escuta comunitária."
                },
                {
                  label: "4. Disponibilidade Operacional",
                  weight: "15%",
                  value: availScore,
                  setter: setAvailScore,
                  color: "#FF9100",
                  desc: "Carga horária compatível com a sprint de 6 semanas e rituais da Tríade."
                },
                {
                  label: "5. Proximidade Territorial",
                  weight: "10%",
                  value: territoryScore,
                  setter: setTerritoryScore,
                  color: "#00E676",
                  desc: "Distância geográfica do hub de impacto e vivência na região."
                }
              ].map((factor) => (
                <div key={factor.label} className="p-4 rounded-2xl bg-[#08090A] border border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full" style={{ background: factor.color }} />
                      <span className="font-display text-sm font-bold uppercase text-[#F3F4F6]">
                        {factor.label}
                      </span>
                      <span className="font-mono text-[10px] text-white/50 bg-white/[0.06] px-1.5 py-0.5 rounded">
                        Peso {factor.weight}
                      </span>
                    </div>
                    <span className="font-mono text-sm font-bold" style={{ color: factor.color }}>
                      {factor.value}%
                    </span>
                  </div>

                  <p className="font-body text-[11px] text-[#6B7280] mb-3 font-light">
                    {factor.desc}
                  </p>

                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={factor.value}
                      onChange={(e) => factor.setter(parseInt(e.target.value, 10))}
                      className="w-full accent-[#00E676] min-h-[44px] cursor-pointer"
                      style={{ accentColor: factor.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Coluna da Direita: Scoreboard ao Vivo e Decomposição */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-[#0D0E0E] border border-white/[0.08] min-h-[440px] shadow-2xl relative overflow-hidden">
              <SectionGlow color={status.color} position="50% 30%" opacity={0.12} size="60%" />

              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
                    TELEMETRIA DO FIT SCORE
                  </span>
                  <span
                    className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase"
                    style={{ color: status.color, background: status.bg, borderColor: status.border }}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Score Gigante */}
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-mono text-6xl sm:text-7xl font-extrabold tracking-tight" style={{ color: status.color }}>
                    {totalFitScore}
                  </span>
                  <span className="font-mono text-xl text-white/40">/100</span>
                </div>

                <p className="font-body text-xs text-[#9CA3AF] leading-relaxed mb-6 font-light">
                  {status.desc}
                </p>

                {/* Decomposição Ponderada dos Fatores */}
                <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2 font-medium">
                    Contribuição dos Fatores para o Score:
                  </span>
                  {[
                    { label: "Skills (35%)", val: (skillsScore * 0.35).toFixed(1), max: "35.0", color: "#00E676" },
                    { label: "ODS (25%)", val: (odsScore * 0.25).toFixed(1), max: "25.0", color: "#FFD600" },
                    { label: "Contexto (15%)", val: (contextScore * 0.15).toFixed(1), max: "15.0", color: "#2979FF" },
                    { label: "Disponibilidade (15%)", val: (availScore * 0.15).toFixed(1), max: "15.0", color: "#FF9100" },
                    { label: "Proximidade (10%)", val: (territoryScore * 0.10).toFixed(1), max: "10.0", color: "#00E676" }
                  ].map((row) => (
                    <div key={row.label} className="font-mono text-xs flex items-center justify-between">
                      <span className="text-white/70">{row.label}</span>
                      <span style={{ color: row.color }} className="font-bold">
                        +{row.val} <span className="text-white/30 font-normal">/ {row.max} pts</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] mt-6 flex items-center justify-between">
                <span className="font-mono text-[10px] text-white/40">Algoritmo: pgvector + Cosseno</span>
                <CopyChip value={`FIT_SCORE: ${totalFitScore}% (${status.label})`} label="Copiar Score" />
              </div>
            </div>

          </div>
        </div>

        {/* Bento Grid: Biblioteca de Botões Cápsula & Badges Táteis */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 font-semibold block mb-6">
            // BIBLIOTECA INTERATIVA DE COMPONENTES
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Bento Card 1: Botões Cápsula Primários & Secundários */}
            <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00E676] font-bold block mb-2">
                  BOTÕES CÁPSULA (TOUCH TARGET &gt;= 44PX)
                </span>
                <h4 className="font-display text-xl font-bold uppercase text-[#F3F4F6] mb-3">
                  Pílulas Táteis de Alta Densidade
                </h4>
                <p className="font-body text-xs text-[#9CA3AF] mb-6 font-light leading-relaxed">
                  Botões com raio full (`rounded-full`), touch targets mínimos de 44px e feedback tátil de alta precisão.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  className="w-full min-h-[44px] h-11 px-6 rounded-full bg-[#00E676] text-[#08090A] font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:bg-[#00FF87] active:scale-[0.98] shadow-[0_0_20px_rgba(0,230,118,0.25)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Ativar Squad ESG</span>
                  <span>→</span>
                </button>
                <button
                  type="button"
                  className="w-full min-h-[44px] h-11 px-6 rounded-full bg-white/[0.04] text-white border border-white/[0.10] font-medium text-xs uppercase tracking-wider transition-all duration-200 hover:bg-white/[0.08] hover:border-white/[0.20] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Ver Casos de Sucesso</span>
                </button>
                <button
                  type="button"
                  className="w-full min-h-[44px] h-11 px-6 rounded-full bg-[#FFD600] text-[#08090A] font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:bg-[#FFE033] active:scale-[0.98] shadow-[0_0_20px_rgba(255,214,0,0.25)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Inscrever Campus Universitário</span>
                </button>
              </div>
            </div>

            {/* Bento Card 2: Badges Bioluminescentes & Indicadores */}
            <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#2979FF] font-bold block mb-2">
                  BADGES & INDICADORES DE STATUS
                </span>
                <h4 className="font-display text-xl font-bold uppercase text-[#F3F4F6] mb-3">
                  Bioluminescência Contida
                </h4>
                <p className="font-body text-xs text-[#9CA3AF] mb-6 font-light leading-relaxed">
                  Badges de contexto com pontos luminosos pulsantes para indicação de status operacional em tempo real.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[#08090A] border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Dot color="#00E676" size={8} />
                    <span className="font-mono text-xs text-white">Squad Ativo no Território</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#00E676] bg-[#00E676]/10 px-2 py-0.5 rounded">S-01</span>
                </div>

                <div className="p-3 rounded-xl bg-[#08090A] border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Dot color="#2979FF" size={8} />
                    <span className="font-mono text-xs text-white">Creditação MEC 10% Validada</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#2979FF] bg-[#2979FF]/10 px-2 py-0.5 rounded">LEI 13.005</span>
                </div>

                <div className="p-3 rounded-xl bg-[#08090A] border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Dot color="#FFD600" size={8} />
                    <span className="font-mono text-xs text-white">Score Suzely Auditado</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#FFD600] bg-[#FFD600]/10 px-2 py-0.5 rounded">94.8%</span>
                </div>
              </div>
            </div>

            {/* Bento Card 3: Cards de Elevação & Hairlines Suíças 1px */}
            <div className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#FF9100] font-bold block mb-2">
                  HAIRLINES SUÍÇAS 1PX & VIDRO LÍQUIDO
                </span>
                <h4 className="font-display text-xl font-bold uppercase text-[#F3F4F6] mb-3">
                  Superfície & Microinteração
                </h4>
                <p className="font-body text-xs text-[#9CA3AF] mb-6 font-light leading-relaxed">
                  Hairlines de 1px (`rgba(255,255,255,0.06)` no estado repousado e `0.14` no estado ativo) sem bordas sólidas pesadas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1C1F24] border border-white/[0.14] shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[11px] font-bold text-white">ESTADO ATIVO / HOVER</span>
                  <span className="font-mono text-[10px] text-[#00E676]">1px Hairline</span>
                </div>
                <p className="font-body text-xs text-[#9CA3AF] font-light">
                  Superfície elevada com iluminação direcional sutil e transição em 200ms cubic-bezier.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

// ============================================================================
// 08. SEÇÃO: AGENDA ODS 1-18 & GOVERNANÇA (COM MODAL TERRITORIAL / MEC 10%)
// ============================================================================

interface ODSItem {
  n: number;
  label: string;
  shortLabel: string;
  category: "Social" | "Ambiental" | "Econômico" | "Governança";
  hex: string;
  challenge: string;
  kpi: string;
  mecLink: string;
  deliverable: string;
}

const ODS_FULL_DATA: ODSItem[] = [
  {
    n: 1,
    label: "Erradicação da Pobreza",
    shortLabel: "Sem Pobreza",
    category: "Social",
    hex: "#E5243B",
    challenge: "Superar a extrema vulnerabilidade de renda nas periferias urbanas através da inclusão produtiva e geração de trabalho técnico remunerado.",
    kpi: "R$ 1.2M em bolsas e remuneração direta de squads nos territórios.",
    mecLink: "Cursos de Economia, Administração e Serviço Social em diagnósticos socioeconômicos territoriais.",
    deliverable: "Mapeamento de renda e plano de aceleração de negócios comunitários."
  },
  {
    n: 2,
    label: "Fome Zero e Agricultura Sustentável",
    shortLabel: "Fome Zero",
    category: "Social",
    hex: "#DDA63A",
    challenge: "Garantir segurança alimentar e fomento à agricultura familiar urbana e hortas comunitárias em áreas desassistidas.",
    kpi: "45 toneladas de alimentos orgânicos distribuídos e rastreados.",
    mecLink: "Engenharia Agronômica e Nutrição estruturando hortas comunitárias inteligentes.",
    deliverable: "Plataforma de rastreabilidade de cadeias curtas de abastecimento."
  },
  {
    n: 3,
    label: "Saúde e Bem-Estar",
    shortLabel: "Saúde",
    category: "Social",
    hex: "#4C9F38",
    challenge: "Mitigar gargalos de atendimento na atenção primária e monitorar determinantes sociais de saúde nos bairros parceiros.",
    kpi: "12.000 atendimentos comunitários preventivos mapeados.",
    mecLink: "Medicina, Enfermagem e Saúde Coletiva em campanhas preventivas territoriais.",
    deliverable: "Dossiê de vigilância em saúde ambiental comunitária."
  },
  {
    n: 4,
    label: "Educação de Qualidade",
    shortLabel: "Educação",
    category: "Social",
    hex: "#C5192D",
    challenge: "Superar o déficit de infraestrutura digital em escolas públicas e curricularizar 10% da carga horária acadêmica em campo.",
    kpi: "100% de conformidade com a Lei 13.005 / MEC 10% nos cursos participantes.",
    mecLink: "Pedagogia e Licenciaturas em reforço escolar e letramento digital com jovens locais.",
    deliverable: "Dossiê de Curricularização de Extensão auditável pelo MEC."
  },
  {
    n: 5,
    label: "Igualdade de Gênero",
    shortLabel: "Gênero",
    category: "Social",
    hex: "#FF3A21",
    challenge: "Empoderar mulheres chefes de família no território e garantir liderança feminina técnica nos squads de engenharia.",
    kpi: "62% de mulheres em cargos de liderança nos squads territoriais.",
    mecLink: "Ciências Sociais e Direito em oficinas de autonomia econômica feminina.",
    deliverable: "Programa de microcrédito e aceleração de lideranças femininas."
  },
  {
    n: 6,
    label: "Água Potável e Saneamento",
    shortLabel: "Água Limpa",
    category: "Ambiental",
    hex: "#26BDE2",
    challenge: "Universalizar o acesso ao saneamento básico e monitorar a qualidade da água em áreas de ocupação e mananciais.",
    kpi: "18 nascentes monitoradas com sensores IoT de baixo custo.",
    mecLink: "Engenharia Sanitária e Ambiental em projetos de biodigestores e fossas ecológicas.",
    deliverable: "Painel de telemetria hídrica comunitária em tempo real."
  },
  {
    n: 7,
    label: "Energia Limpa e Acessível",
    shortLabel: "Energia Limpa",
    category: "Ambiental",
    hex: "#FCC30B",
    challenge: "Implantar microgeração solar fotovoltaica compartilhada e combater a pobreza energética nos hubs comunitários.",
    kpi: "120 kWp de energia solar instalada em centros comunitários parceiros.",
    mecLink: "Engenharia Elétrica e de Energia em projetos de eficiência energética comunitária.",
    deliverable: "Projeto executivo de usina solar comunitária distribuída."
  },
  {
    n: 8,
    label: "Trabalho Decente e Crescimento Econômico",
    shortLabel: "Trabalho Decente",
    category: "Econômico",
    hex: "#A21942",
    challenge: "Conectar jovens talentos periféricos a vagas corporativas qualificadas e remuneradas com tese de Shared Value.",
    kpi: "340 colocações profissionais com Fit Score auditado pela Suzely.",
    mecLink: "Administração e Engenharia de Produção em mentoria de carreira e negócios.",
    deliverable: "Banco de talentos e placement SaaS integrado para empresas B2B."
  },
  {
    n: 9,
    label: "Indústria, Inovação e Infraestrutura",
    shortLabel: "Indústria & Inovação",
    category: "Econômico",
    hex: "#FD6925",
    challenge: "Desenvolver infraestrutura tecnológica aberta, soluções digitais sovereign e modernização industrial sustentável.",
    kpi: "28 soluções digitais de código aberto implementadas em campo.",
    mecLink: "Ciência da Computação e Engenharias no desenvolvimento de PWAs e arquiteturas de dados.",
    deliverable: "Repositórios de código aberto com documentação e testes automatizados."
  },
  {
    n: 10,
    label: "Redução das Desigualdades",
    shortLabel: "Redução Desigualdades",
    category: "Social",
    hex: "#DD1367",
    challenge: "Descentralizar o acesso à tecnologia e renda, combatendo disparidades regionais e de classe nos centros urbanos.",
    kpi: "Redução de 35% no gap de inserção digital em 4 bairros parceiros.",
    mecLink: "Políticas Públicas e Relações Internacionais em projetos de equidade territorial.",
    deliverable: "Índice de Vulnerabilidade Territorial Comparado (IVTC)."
  },
  {
    n: 11,
    label: "Cidades e Comunidades Sustentáveis",
    shortLabel: "Cidades Sustentáveis",
    category: "Ambiental",
    hex: "#FD9D24",
    challenge: "Requalificar espaços públicos urbanos, criar parques lineares e reduzir riscos de deslizamento em encostas.",
    kpi: "8 praças e calçadas comunitárias regeneradas com materiais sustentáveis.",
    mecLink: "Arquitetura e Urbanismo em projetos de urbanismo tático e mobilidade ativa.",
    deliverable: "Plano diretor de bairro participativo com georreferenciamento."
  },
  {
    n: 12,
    label: "Consumo e Produção Responsáveis",
    shortLabel: "Consumo Responsável",
    category: "Econômico",
    hex: "#BF8B2E",
    challenge: "Implementar logística reversa comunitária, cooperativas de reciclagem e erradicação do plástico de uso único.",
    kpi: "180 toneladas de resíduos sólidos reciclados e certificados em blockchain.",
    mecLink: "Engenharia de Materiais e Química em processos de economia circular.",
    deliverable: "Sistema de rastreabilidade de créditos de logística reversa."
  },
  {
    n: 13,
    label: "Ação Contra a Mudança Global do Clima",
    shortLabel: "Ação Climática",
    category: "Ambiental",
    hex: "#3F7E44",
    challenge: "Estruturar planos municipais de descarbonização e resiliência climática para eventos extremos nos territórios.",
    kpi: "50.000 mudas de espécies nativas plantadas em áreas de preservação.",
    mecLink: "Ecologia, Biologia e Meteorologia em planos de adaptação climática local.",
    deliverable: "Inventário de emissões de GEE de base territorial com metas de mitigação."
  },
  {
    n: 14,
    label: "Vida na Água",
    shortLabel: "Vida na Água",
    category: "Ambiental",
    hex: "#0A97D9",
    challenge: "Proteger bacias hidrográficas, córregos urbanos e zonas costeiras da poluição por esgoto e microplásticos.",
    kpi: "14 km de cursos d'água urbanos monitorados e desassoreados.",
    mecLink: "Oceanografia e Biologia Marinha em monitoramento de ecossistemas aquáticos.",
    deliverable: "Relatório de bioindicadores de qualidade de água e fauna aquática."
  },
  {
    n: 15,
    label: "Vida Terrestre",
    shortLabel: "Vida Terrestre",
    category: "Ambiental",
    hex: "#56C02B",
    challenge: "Restaurar biomas degradados (Mata Atlântica, Cerrado, Amazônia) e combater a perda de biodiversidade nativa.",
    kpi: "120 hectares de corredores ecológicos em processo de reflorestamento.",
    mecLink: "Engenharia Florestal e Botânica em bancos de sementes nativas comunitárias.",
    deliverable: "Mapeamento genético e fitossociológico de áreas degradadas."
  },
  {
    n: 16,
    label: "Paz, Justiça e Instituições Eficazes",
    shortLabel: "Paz e Justiça",
    category: "Governança",
    hex: "#00689D",
    challenge: "Fortalecer a transparência de dados públicos, combate à corrupção e acesso à justiça comunitária gratuita.",
    kpi: "100% de prestação de contas dos squads em dados abertos auditáveis.",
    mecLink: "Direito e Ciência Política em clínicas jurídicas de direitos fundamentais.",
    deliverable: "Portal da Transparência Comunitária com smart contracts auditados."
  },
  {
    n: 17,
    label: "Parcerias e Meios de Implementação",
    shortLabel: "Parcerias",
    category: "Governança",
    hex: "#19486A",
    challenge: "Articular a governança da Tríade: Universidade, Mercado Corporativo B2B e Comunidade Territorial.",
    kpi: "32 empresas mantenedoras e 14 universidades conveniadas.",
    mecLink: "Relações Institucionais e Governança Corporativa em consórcios de inovação.",
    deliverable: "Modelagem de governança e convênios tripartite com blindagem jurídica."
  },
  {
    n: 18,
    label: "Igualdade Étnico-Racial (Brasil Canônico)",
    shortLabel: "Igualdade Étnico-Racial",
    category: "Social",
    hex: "#795548",
    challenge: "Superar o racismo institucional e ambiental no Brasil, garantindo protagonismo e inclusão de negros e indígenas.",
    kpi: "100% dos squads com liderança paritária étnico-racial e letramento antirracista.",
    mecLink: "História, Sociologia e Direitos Humanos em projetos de memória e justiça racial.",
    deliverable: "Protocolo de Governança Antirracista e Equidade Territorial."
  }
];

export function ODSGovernanceSection() {
  const [selectedODS, setSelectedODS] = useState<ODSItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const filteredODS = activeCategory === "Todos"
    ? ODS_FULL_DATA
    : ODS_FULL_DATA.filter((o) => o.category === activeCategory);

  return (
    <section
      id="08-ods-governanca"
      className="relative py-20 md:py-28 border-t border-white/[0.06] bg-[#08090A]"
      aria-label="08. Agenda ODS 1-18 & Governança"
    >
      <span id="ods-governanca" className="sr-only" />
      <span id="ods" className="sr-only" />
      <span id="governanca" className="sr-only" />

      <SectionGlow color="#FFD600" position="15% 15%" opacity={0.04} size="45%" />
      <SectionGlow color="#00E676" position="85% 75%" opacity={0.04} size="40%" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Cabeçalho Editorial */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="size-2 rounded-full bg-[#FFD600]" />
            <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#FFD600]">
              08 · AGENDA ODS 1-18 & GOVERNANÇA DA MARCA
            </p>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#F3F4F6] leading-[0.92] mb-6">
            A Ancoragem ODS & <span className="text-[#FFD600]">Governança da Tríade</span>.
          </h2>
          <p className="font-body text-base sm:text-lg text-[#9CA3AF] leading-[1.65] font-light">
            Toda operação de campo do Brasil Sustenta é vinculada a uma das 18 metas de desenvolvimento sustentável (1 a 17 da ONU + ODS 18 Igualdade Étnico-Racial). Conectamos a teoria das metas globais à curricularização de extensão universitária (MEC 10% / Lei 13.005) e regemos a identidade através de Architecture Decision Records (ADRs).
          </p>
        </div>

        {/* Grid Interativo das 18 Metas ODS */}
        <div className="rounded-3xl bg-[#121417] border border-white/[0.08] p-6 sm:p-8 md:p-10 mb-16 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#FFD600] animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#FFD600]">
                  GRID INTERATIVO DAS 18 METAS ODS (COM ODS 18 BRASIL)
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#F3F4F6] mt-1">
                Toque em uma meta para ver a conexão territorial e MEC 10%
              </h3>
            </div>

            {/* Filtros de Categoria (Touch Target >= 44px) */}
            <div className="flex flex-wrap items-center gap-2">
              {["Todos", "Social", "Ambiental", "Econômico", "Governança"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`min-h-[44px] px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-white text-[#08090A] shadow-md font-bold"
                      : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Cards ODS (Touch Target >= 44px) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {filteredODS.map((ods) => (
              <button
                key={ods.n}
                type="button"
                onClick={() => setSelectedODS(ods)}
                className="bs-card min-h-[96px] p-3.5 rounded-2xl bg-[#08090A] border border-white/[0.06] hover:border-white/[0.24] flex flex-col justify-between text-left transition-all duration-200 cursor-pointer group"
                style={{ borderColor: selectedODS?.n === ods.n ? ods.hex : undefined }}
              >
                <div className="flex items-center justify-between">
                  <ODSBadge n={ods.n} hex={ods.hex} size={32} />
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/[0.04] text-white/40">
                    {ods.category}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="font-display text-xs sm:text-sm font-bold uppercase text-[#F3F4F6] line-clamp-2 leading-tight group-hover:text-white transition-colors">
                    {ods.shortLabel}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Modal / Drawer Descritivo Interativo de ODS Territorial */}
        <AnimatePresence>
          {selectedODS && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#08090A]/90 backdrop-blur-2xl p-4 sm:p-6 flex items-center justify-center"
              onClick={() => setSelectedODS(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 16 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="bg-[#121417] border border-white/[0.12] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botão Fechar (Touch Target >= 44px) */}
                <button
                  type="button"
                  onClick={() => setSelectedODS(null)}
                  className="absolute top-6 right-6 min-w-[44px] min-h-[44px] size-11 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Fechar Modal ODS"
                >
                  ✕
                </button>

                {/* Cabeçalho do Modal */}
                <div className="flex items-center gap-3 mb-6 pr-12">
                  <ODSBadge n={selectedODS.n} hex={selectedODS.hex} size={48} />
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: selectedODS.hex }}>
                      ODS {selectedODS.n} · {selectedODS.category}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#F3F4F6] leading-tight">
                      {selectedODS.label}
                    </h3>
                  </div>
                </div>

                {/* Conteúdo Detalhado de Impacto */}
                <div className="space-y-5">
                  {/* Desafio Territorial */}
                  <div className="p-4 rounded-2xl bg-[#08090A] border border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-1 font-bold">
                      Desafio Territorial no Brasil:
                    </span>
                    <p className="font-body text-sm text-[#F3F4F6] font-light leading-relaxed">
                      {selectedODS.challenge}
                    </p>
                  </div>

                  {/* Metas Quantificáveis & KPIs */}
                  <div className="p-4 rounded-2xl bg-[#08090A] border border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#00E676] block mb-1 font-bold">
                      Métrica de Impacto Auditada (KPI):
                    </span>
                    <p className="font-mono text-sm text-[#00E676] font-semibold">
                      {selectedODS.kpi}
                    </p>
                  </div>

                  {/* Conexão com MEC 10% / Lei 13.005 */}
                  <div className="p-4 rounded-2xl bg-[#08090A] border border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#2979FF] block mb-1 font-bold">
                      Creditação Curricular MEC 10% (Lei 13.005 / CNE 7/2018):
                    </span>
                    <p className="font-body text-xs text-[#9CA3AF] leading-relaxed font-light">
                      {selectedODS.mecLink}
                    </p>
                  </div>

                  {/* Entregável Técnico de Squad */}
                  <div className="p-4 rounded-2xl bg-[#08090A] border border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#FFD600] block mb-1 font-bold">
                      Entregável Técnico de Squad em 6 Semanas:
                    </span>
                    <p className="font-body text-xs text-white/90 leading-relaxed font-light">
                      {selectedODS.deliverable}
                    </p>
                  </div>
                </div>

                {/* Rodapé do Modal com Botão de Ação */}
                <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/40">Brasil Sustenta · ODS Registry</span>
                  <button
                    type="button"
                    onClick={() => setSelectedODS(null)}
                    className="min-h-[44px] px-6 rounded-full bg-white text-[#08090A] font-semibold text-xs uppercase tracking-wider hover:bg-[#00E676] transition-colors cursor-pointer"
                  >
                    Concluir Inspeção
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Matriz de Governança da Marca da Tríade */}
        <div className="mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 font-semibold block mb-6">
            // FRAMEWORK DE GOVERNANÇA DA TRÍADE
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                level: "🔴 Inalterável (Soberano)",
                color: "#FF1744",
                owner: "Brand Owner / CPO",
                desc: "Logo oficial, nome, paleta cromática Pátria (#00E676, #2979FF, #FFD600), ponto verde e tom de voz anti-greenwashing.",
                rule: "Mudanças requerem aprovação unânime do conselho gestor."
              },
              {
                level: "🟡 Adaptável (Comitê Técnico)",
                color: "#FFD600",
                owner: "Comitê de Design & Tech",
                desc: "Novos componentes do design system, gradientes secundários, escalas tipográficas e integrações de UI.",
                rule: "Propostas submetidas formalmente via Pull Request com Architecture Decision Record (ADR)."
              },
              {
                level: "🟢 Livre (Execução Territorial)",
                color: "#00E676",
                owner: "Squads Territoriais",
                desc: "Composição de tokens existentes para páginas de impacto, relatórios de evidência, posts e diagnósticos locais.",
                rule: "Uso autônomo e ágil desde que respeitados os tokens canônicos."
              }
            ].map((gov) => (
              <div
                key={gov.level}
                className="bs-card rounded-2xl bg-[#121417] border border-white/[0.06] p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold" style={{ color: gov.color }}>
                      {gov.level}
                    </span>
                    <span className="font-mono text-[9px] text-white/40 uppercase bg-white/[0.04] px-2 py-0.5 rounded">
                      {gov.owner}
                    </span>
                  </div>
                  <p className="font-body text-xs text-[#9CA3AF] mb-4 font-light leading-relaxed">
                    {gov.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/[0.06] font-mono text-[10px] text-white/50">
                  {gov.rule}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demonstração de Easing & Transições de Movimento */}
        <div className="rounded-2xl bg-[#121417] border border-white/[0.06] p-6 sm:p-8 mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#2979FF] font-semibold block mb-4">
            // FÍSICA DE MOVIMENTO & TRANSITIONS
          </span>
          <EaseDemo />
        </div>

        {/* Template de ADR (Architecture Decision Record) com Botão de Cópia */}
        <div className="rounded-3xl bg-[#121417] border border-white/[0.08] p-6 sm:p-8 md:p-10">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E676] font-semibold block">
                TEMPLATE DE GOVERNANÇA OPEN-SOURCE
              </span>
              <h3 className="font-display text-2xl font-bold uppercase text-[#F3F4F6] mt-1">
                Architecture Decision Record (ADR)
              </h3>
            </div>
            <CopyChip
              value={`# ADR-003: [Título da Proposta de Mudança de Marca]
Status: Proposto | Data: 2026-08-19
Autor: @seu_github
Revisores: @cpo, @tech_lead

## 1. Contexto e Motivação
[Descreva a necessidade técnica ou territorial encontrada no manual da marca]

## 2. Decisão Proposta
[Apresente a alteração visual, de token ou de componente de forma objetiva]

## 3. Impacto Operacional
- Visual: [Como afeta o Design System e páginas públicas]
- Técnico: [Novos tokens de CSS gerados via scripts/build-tokens.mjs]
- Narrativa: [Alinhamento estrito com "Quem sustenta é nóis" e Shared Value]

## 4. Conformidade e Validação
- [ ] Testes de contraste WCAG AA/AAA aprovados
- [ ] Touch targets >= 44px garantidos
- [ ] Compilação de tokens sem erros`}
              label="Copiar Template ADR"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4">
              <p className="font-body text-sm text-[#9CA3AF] leading-relaxed font-light mb-4">
                Qualquer modificação estrutural na identidade de marca (introduzir novas fontes, propor componentes adicionais ou alterar tokens) deve ser submetida via Pull Request utilizando este modelo formal de ADR.
              </p>
              <div className="font-mono text-xs text-[#00E676] space-y-1">
                <div>✓ Rastreabilidade no Git</div>
                <div>✓ Revisão de Código & Design</div>
                <div>✓ Blindagem Anti-Greenwashing</div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <pre className="p-4 sm:p-6 rounded-2xl bg-[#08090A] border border-white/[0.06] text-xs font-mono text-[#F3F4F6] overflow-x-auto leading-relaxed">
{`# ADR-003: [Título da Proposta de Mudança de Marca]
Status: Proposto | Data: 2026-08-19
Autor: @seu_github
Revisores: @cpo, @tech_lead

## 1. Contexto e Motivação
[Descreva a necessidade técnica ou territorial encontrada no manual da marca]

## 2. Decisão Proposta
[Apresente a alteração visual, de token ou de componente de forma objetiva]

## 3. Impacto Operacional
- Visual: [Como afeta o Design System e páginas públicas]
- Técnico: [Novos tokens de CSS gerados via scripts/build-tokens.mjs]
- Narrativa: [Alinhamento estrito com "Quem sustenta é nóis" e Shared Value]

## 4. Conformidade e Validação
- [ ] Testes de contraste WCAG AA/AAA aprovados
- [ ] Touch targets >= 44px garantidos
- [ ] Compilação de tokens sem erros`}
              </pre>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ============================================================================
// APP ROOT COMPONENT
// ============================================================================

export default function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#08090A", color: "#F3F4F6" }}>
      <Grain />
      <div style={{ position: "relative", zIndex: 2 }}>
        <TaxonomicMetadata />
        <Header />
        <Hero />

        {/* 01. VISÃO, TESE & MANIFESTO */}
        <VisionManifestoSection />

        {/* 02. LOGOMARCA & CONSTRUÇÃO GEOMÉTRICA */}
        <LogoGeometrySection />

        {/* 03. SISTEMA CROMÁTICO & ELEVAÇÃO TONAL */}
        <ColorPaletteSection />

        {/* 04. TIPOGRAFIA ESCULTURAL & PLAYGROUND */}
        <TypographySection />

        {/* 05. TOM DE VOZ & FILTRO ANTI-GREENWASHING */}
        <VoiceToneSection />

        {/* 06. DIRETRIZ FOTOGRÁFICA & FILTRO DE IMAGEM */}
        <ImagerySection />

        {/* 07. COMPONENTES, BENTO UI & SIMULADOR SUZELY */}
        <ComponentsBentoSection />

        {/* 08. AGENDA ODS 1-18 & GOVERNANÇA DA TRÍADE */}
        <ODSGovernanceSection />

        {/* Rodapé Editorial */}
        <footer className="border-t border-white/[0.06] py-16 px-6 text-center bg-[#08090A]">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
            <Logo size={1.2} />
            <p className="font-mono text-xs text-[#9CA3AF] max-w-xl font-light">
              Brasil Sustenta Venture · Design System Obsidian V6 · Grid Suíço de 1px · Quem Sustenta é Nóis.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/40">
              <span>v{tokens._meta.version} High-End</span>
              <span>·</span>
              <span>18 ODS Brasileiros</span>
              <span>·</span>
              <span>MEC 10% (Lei 13.005)</span>
              <span>·</span>
              <span>{tokens._meta.snapshot}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
