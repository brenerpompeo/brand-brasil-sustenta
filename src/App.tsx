import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tokens from "./data/tokens.json";
import { Section, Eyebrow, CopyChip } from "./components/primitives";
import { Logo } from "./components/Logo";
import { ODSBadge } from "./components/ODSBadge";
import { Grain, SectionGlow, Dot } from "./components/Atmosphere";
import { FlowDemo } from "./components/FlowDemo";
import { EaseDemo } from "./components/EaseDemo";
import { Header } from "./layouts/Header";
import { Hero } from "./layouts/Hero";
import { TaxonomicMetadata } from "./components/TaxonomicMetadata";

const EASE = [0.16, 1, 0.3, 1] as const;


function LogoCard({ label, sub, bg, labelColor = "#9CA3AF", children }: { label: string; sub: string; bg: string; labelColor?: string; children: ReactNode }) {
  return (
    <div className="bs-card" style={{ border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden", background: "#0D0E0E", display: "flex", flexDirection: "column" }}>
      <div style={{ background: bg, padding: "3rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 180, flexGrow: 1 }}>
        {children}
      </div>
      <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--color-border)", background: "#060606" }}>
        <div className="font-mono" style={{ fontSize: "0.75rem", color: "#F3F4F6", textTransform: "uppercase", letterSpacing: "0.1em", display: "flex", alignItems: "center", gap: 6 }}>
          <Dot size={5} /> {label}
        </div>
        <div className="font-mono" style={{ fontSize: "0.625rem", color: labelColor, marginTop: 4 }}>{sub}</div>
      </div>
    </div>
  );
}

function ColorRow({ items }: { items: { name: string; hex?: string; value?: string; label: string; use?: string; persona?: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
      {items.map((c) => {
        const v = c.hex ?? c.value ?? "";
        return (
          <div key={c.name} style={{ border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden", background: "#0D0E0E" }}>
            <div style={{ height: 100, background: v, borderBottom: "1px solid var(--color-border)", position: "relative" }}>
              <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(5,5,5,0.7)", padding: "0.2rem 0.5rem", borderRadius: 4, fontSize: "0.625rem", color: "#fff", fontFamily: "var(--font-mono)" }}>
                {v}
              </div>
            </div>
            <div style={{ padding: "1.25rem" }}>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#F3F4F6" }}>{c.label}</div>
              {c.persona && <div className="font-mono" style={{ fontSize: "0.6875rem", color: "#00FF41", textTransform: "uppercase", letterSpacing: "0.15em", marginTop: 4 }}>{c.persona}</div>}
              {c.use && <div style={{ fontSize: "0.8rem", color: "#9CA3AF", marginTop: 6, lineHeight: 1.5 }}>{c.use}</div>}
              <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
                <CopyChip value={v} />
                <CopyChip value={`var(${c.name.startsWith("--") ? c.name : `--color-${c.name}`})`} label="CSS Var" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Componente: Manifesto Interativo Premium */
function ManifestoSection() {
  const [activeTab, setActiveTab] = useState(0);
  const cards = [
    {
      title: "Quem sustenta é nóis",
      tag: "SOBERANIA POPULAR",
      body: "O mercado corporativo desenha as diretrizes no slide. A juventude universitária e a comunidade aplicam a transição prática no território. Nossa voz não pede licença: ela assume a autoria e o rigor da execução de ponta a ponta.",
      highlight: "Menos discursos conceituais, mais engenharia de impacto em campo.",
      color: "#00FF41"
    },
    {
      title: "Shared Value na Veia",
      tag: "ROI + IMPACTO",
      body: "Lucro e impacto socioambiental não são antagônicos. São motores síncronos. Projetos reais geram valor econômico legítimo para as marcas participantes enquanto resolvem problemas urgentes nos territórios. Lucro financia impacto; impacto valida o lucro.",
      highlight: "Não é caridade, é categoria de negócios.",
      color: "#0055FF"
    },
    {
      title: "Voluntariado de Impacto",
      tag: "CAUSA SOCIAL & MENTORIA",
      body: "Conectamos jovens voluntários em causas e diagnósticos territoriais locais (funil de entrada), enquanto colaboradores seniores das empresas B2B atuam voluntariamente como mentores de negócios. Fortalece o 'S' do ESG e desenvolve a juventude.",
      highlight: "Engajamento comunitário prático + Mentoria corporativa.",
      color: "#E040FB"
    },
    {
      title: "O Match Definitivo (Talent Pool)",
      tag: "EMPREGABILIDADE & IMPACTO",
      body: "Não apenas treinamos talentos; aceleramos a colocação definitiva de jovens periféricos e criativos no mercado corporativo. As marcas parceiras que financiam os squads ganham acesso à nossa vitrine de talentos, recrutando profissionais auditados in loco pela Tríade. É a liquidação do greenwashing e do racismo de slide.",
      highlight: "Dados reais de campo gerando contratações reais.",
      color: "#FFC700"
    }
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "2.5rem", marginTop: "2rem", alignItems: "stretch" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {cards.map((c, i) => (
          <button
            key={c.title}
            onClick={() => setActiveTab(i)}
            className="bs-card"
            style={{
              textAlign: "left",
              padding: "1.5rem",
              borderRadius: 16,
              background: activeTab === i ? "rgba(255,255,255,0.03)" : "#0D0E0E",
              border: activeTab === i ? `1px solid ${c.color}` : "1px solid var(--color-border)",
              cursor: "pointer",
              transition: "all 0.3s",
              position: "relative"
            }}
          >
            {activeTab === i && <span style={{ position: "absolute", left: 0, top: "25%", bottom: "25%", width: 4, borderRadius: "0 4px 4px 0", background: c.color }} />}
            <span className="font-mono" style={{ fontSize: "0.625rem", color: c.color, letterSpacing: "0.15em", textTransform: "uppercase" }}>{c.tag}</span>
            <h3 className="font-display" style={{ fontSize: "1.5rem", color: "#F3F4F6", margin: "0.5rem 0 0" }}>{c.title}</h3>
          </button>
        ))}
      </div>
      
      <div style={{ border: "1px solid var(--color-border)", borderRadius: 24, padding: "2.5rem", background: "#0D0E0E", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
        <SectionGlow color={cards[activeTab].color} position="90% 90%" opacity={0.06} size="45%" />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: EASE }}
            style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 2 }}
          >
            <div>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: cards[activeTab].color, letterSpacing: "0.2em" }}>
                // MANIFESTO · {cards[activeTab].tag}
              </span>
              <p style={{ color: "#F3F4F6", fontSize: "1.25rem", marginTop: "1.5rem", lineHeight: 1.6 }}>
                {cards[activeTab].body}
              </p>
            </div>
            <div style={{ marginTop: "2rem", borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
              <div className="font-display" style={{ fontSize: "2rem", color: cards[activeTab].color, lineHeight: 1.1 }}>
                {cards[activeTab].highlight}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Componente: Tradutor de Tom de Voz */
function ToneTranslator() {
  const [activeIdx, setActiveIdx] = useState(0);
  const translations = [
    {
      before: "Nossa plataforma disruptiva de matching conecta ecossistemas educacionais e corporativos em prol de um amanhã sustentável e inclusivo para todos.",
      after: "Seu desafio ESG vira squad acadêmico, sprint de 6 semanas e relatório de impacto com blockchain de evidências. Direto na calçada.",
      why: "Evitamos termos vazios como 'conectar ecossistemas' ou 'amanhã sustentável'. Nós damos o entregável real de imediato."
    },
    {
      before: "Pretendemos capitanear iniciativas de inclusão comunitária voltadas a jovens em vulnerabilidade sob as diretrizes do pacto global.",
      after: "O mercado corporativo desenha a tese de impacto. A juventude universitária local executa a intervenção e audita o resultado na prática. Quem sustenta é nóis.",
      why: "Substituímos o paternalismo assistencialista pela atitude soberana e profissional do ecossistema estudantil que lidera a transição local de igual para igual."
    },
    {
      before: "Desenvolvemos algoritmos avançados de Inteligência Artificial para catalisar as tomadas de decisões sob métricas ESG.",
      after: "A Suzely calcula o Match Score baseada em skills reais, alinhamento ODS e proximidade territorial. Você vê exatamente o porquê de cada match.",
      why: "Não usamos a palavra 'IA' como buzzword mágica sem rosto. Damos nome ao motor (Suzely), mostramos o score explicável (Fit Score) e seus fatores."
    },
    {
      before: "Promovemos a capacitação e networking horizontal direcionados ao empreendedorismo sustentável de impacto regional.",
      after: "Briefing real, sprint de impacto e progresso compartilhado. Unimos a inquietação criativa da juventude a negócios de valor real.",
      why: "Atitude comercial 'calçada-high-end' (v7): desmistifica jargões acadêmicos e aproxima as partes de forma profissional, viva e direta."
    }
  ];

  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: 24, overflow: "hidden", background: "#0D0E0E", marginTop: "2rem" }}>
      <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid var(--color-border)", background: "#060606", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Dot color="#FF1744" size={7} />
          <span className="font-mono" style={{ fontSize: "0.75rem", color: "#F3F4F6", letterSpacing: "0.15em", textTransform: "uppercase" }}>Filtro Anti-Corporativismo (Greenwash Defeat)</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {translations.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              style={{
                width: 28, height: 28, borderRadius: 9999, border: activeIdx === idx ? "1px solid #00FF41" : "1px solid var(--color-border)",
                background: activeIdx === idx ? "rgba(0,255,65,0.1)" : "transparent", color: activeIdx === idx ? "#00FF41" : "#9CA3AF",
                fontSize: "0.75rem", fontFamily: "var(--font-mono)", cursor: "pointer", transition: "all 0.2s"
              }}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        {/* Lado Esquerdo: O Clichê */}
        <div style={{ padding: "2.5rem 2rem", borderRight: "1px solid var(--color-border)", background: "rgba(255,23,68,0.01)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <span className="font-mono" style={{ fontSize: "0.625rem", color: "#FF1744", letterSpacing: "0.15em" }}>[ X ] CORPORATIVÊS CORPORATIVO / CLICHÊ</span>
            <p style={{ color: "#9CA3AF", fontSize: "1.1rem", marginTop: "1.5rem", lineHeight: 1.6, textDecoration: "line-through", textDecorationColor: "rgba(255,23,68,0.3)" }}>
              "{translations[activeIdx].before}"
            </p>
          </div>
          <div style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "#FF1744", fontFamily: "var(--font-mono)" }}>
            STATUS: SEM VALOR PRÁTICO (GREENWASHING)
          </div>
        </div>
        
        {/* Lado Direito: A Solução */}
        <div style={{ padding: "2.5rem 2rem", background: "rgba(0,255,65,0.01)", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
          <SectionGlow color="#00FF41" position="90% 10%" opacity={0.04} size="35%" />
          <div style={{ zIndex: 2 }}>
            <span className="font-mono" style={{ fontSize: "0.625rem", color: "#00FF41", letterSpacing: "0.15em" }}>[ ✓ ] LINGUAGEM BRASIL SUSTENTA</span>
            <p className="font-display" style={{ color: "#F3F4F6", fontSize: "1.5rem", marginTop: "1.2rem", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
              "{translations[activeIdx].after}"
            </p>
          </div>
          <div style={{ marginTop: "2rem", borderTop: "1px solid var(--color-border)", paddingTop: "1rem", zIndex: 2 }}>
            <div className="font-mono" style={{ fontSize: "0.6875rem", color: "#00FF41", textTransform: "uppercase" }}>Por que dizemos assim:</div>
            <p style={{ color: "#9CA3AF", fontSize: "0.85rem", marginTop: 4, lineHeight: 1.5 }}>
              {translations[activeIdx].why}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Componente: Visualizador de Gradientes Premium */
function GradientShowcase() {
  const grads = [
    {
      name: "Bioluminescent Cyber Glow",
      css: "linear-gradient(135deg, #00FF41 0%, #0055FF 100%)",
      tailwind: "bg-gradient-to-br from-[#00FF41] to-[#0055FF]",
      persona: "B2B corporativo com propósito de impacto"
    },
    {
      name: "Solar Cyber-Glow",
      css: "linear-gradient(135deg, #FFC700 0%, #00FF41 100%)",
      tailwind: "bg-gradient-to-br from-[#FFC700] to-[#00FF41]",
      persona: "Estudantes e tração de engajamento voluntário e squads"
    },
    {
      name: "Atlantic Solar Horizon",
      css: "linear-gradient(135deg, #0055FF 0%, #FFC700 100%)",
      tailwind: "bg-gradient-to-br from-[#0055FF] to-[#FFC700]",
      persona: "Prefeituras e alinhamento ODS governamental"
    },
    {
      name: "Bioluminescent Depth Aurora",
      css: "radial-gradient(circle at 50% 50%, rgba(0, 255, 65, 0.15) 0%, rgba(3, 3, 3, 0) 70%)",
      tailwind: "bg-[radial-gradient(circle_at_center,_var(--color-leaf-soft)_0%,_transparent_70%)]",
      persona: "Glow de fundo para cards, bento e blocos escuros"
    }
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginTop: "1.5rem" }}>
      {grads.map((g) => (
        <div key={g.name} className="bs-card" style={{ border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden", background: "#0D0E0E", display: "flex", flexDirection: "column" }}>
          <div style={{ height: 120, background: g.css, borderBottom: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center" }} />
          <div style={{ padding: "1.25rem", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#F3F4F6" }}>{g.name}</div>
              <div className="font-mono" style={{ fontSize: "0.6875rem", color: "#9CA3AF", marginTop: 4 }}>{g.persona}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 14 }}>
              <CopyChip value={g.css} label="Copiar CSS" />
              <CopyChip value={g.tailwind} label="Copiar Tailwind" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Componente: Playground de Tipografia */
function TypographyPlayground() {
  const [text, setText] = useState("QUEM SUSTENTA É NÓIS.");
  const [size, setSize] = useState(4.5);
  const [font, setFont] = useState("display");

  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: 24, overflow: "hidden", background: "#0D0E0E", marginTop: "2rem" }}>
      <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid var(--color-border)", background: "#060606", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "1rem", alignItems: "center" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
          <span className="font-mono" style={{ fontSize: "0.75rem", color: "#F3F4F6", letterSpacing: "0.1em" }}>FONTE:</span>
          {["display", "body", "mono"].map((f) => (
            <button
              key={f}
              onClick={() => setFont(f)}
              style={{
                background: font === f ? "rgba(0,255,65,0.15)" : "transparent",
                color: font === f ? "#00FF41" : "#9CA3AF",
                border: font === f ? "1px solid #00FF41" : "1px solid var(--color-border)",
                borderRadius: 9999, padding: "0.4rem 1rem", fontSize: "0.6875rem", fontFamily: "var(--font-mono)", cursor: "pointer", textTransform: "uppercase"
              }}
            >
              {f === "display" ? "Antonio (Display)" : f === "body" ? "Outfit (Corpo)" : "Geist Mono (Mono)"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span className="font-mono" style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>Tamanho:</span>
          <input
            type="range"
            min="1.5"
            max="8"
            step="0.1"
            value={size}
            onChange={(e) => setSize(parseFloat(e.target.value))}
            style={{ accentColor: "#00FF41", width: 100 }}
          />
          <span className="font-mono" style={{ fontSize: "0.75rem", color: "#F3F4F6", width: 40, textAlign: "right" }}>{size}rem</span>
        </div>
      </div>
      
      <div style={{ padding: "2.5rem 2rem", background: "#050505" }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite algo para testar..."
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            color: "#F3F4F6",
            lineHeight: 1.0,
            letterSpacing: font === "display" ? "-0.04em" : "normal",
            textTransform: font === "display" ? "uppercase" : "none",
            fontSize: `${size}rem`,
            fontFamily: font === "display" ? "var(--font-display)" : font === "mono" ? "var(--font-mono)" : "var(--font-body)",
            minHeight: 180
          }}
        />
      </div>
      
      <div style={{ padding: "1.25rem 2rem", borderTop: "1px solid var(--color-border)", background: "#0D0E0E", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div className="font-mono" style={{ fontSize: "0.6875rem", color: "#9CA3AF" }}>
          CSS: <span style={{ color: "#00FF41" }}>font-family: {font === "display" ? "var(--font-display)" : font === "mono" ? "var(--font-mono)" : "var(--font-body)"}; font-size: {size}rem;</span>
        </div>
        <div className="font-mono" style={{ fontSize: "0.6875rem", color: "#4B5563" }}>
          Usar classe: {font === "display" ? "font-display" : font === "mono" ? "font-mono" : "corpo-regular"}
        </div>
      </div>
    </div>
  );
}

/** Componente: Slider Antes e Depois para Fotografias */
function PhotoSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeImg, setActiveImg] = useState(0);

  const images = [
    {
      raw: "/imagery/territorio-campinas.jpg",
      treated: "/imagery/territorio-campinas.jpg",
      title: "Trabalho em Campo · Território Campinas",
      desc: "Ação prática de levantamento e diagnóstico socioambiental na calçada periférica de Campinas."
    },
    {
      raw: "/imagery/juventude-cop30.jpg",
      treated: "/imagery/juventude-cop30.jpg",
      title: "Articulação COP30 · Juventude do Impacto",
      desc: "Lideranças e embaixadores universitários da Brasil Sustenta organizando ações e metas ODS."
    },
    {
      raw: "/imagery/campus-praia-vermelha.jpg",
      treated: "/imagery/campus-praia-vermelha.jpg",
      title: "Vivência Universitária · Campus Praia Vermelha UFRJ",
      desc: "Integração acadêmica onde nascem os projetos e squads de engenharia de dados territoriais."
    }
  ];

  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: 24, overflow: "hidden", background: "#0D0E0E", marginTop: "2rem" }}>
      <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--color-border)", background: "#060606", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div className="font-mono" style={{ fontSize: "0.75rem", color: "#F3F4F6", display: "flex", alignItems: "center", gap: 8 }}>
          <Dot color="#0055FF" /> FILTRO FOTOGRÁFICO DE MARCA (DESSATURADO + GRÃO + GLOW)
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImg(idx)}
              className="font-mono"
              style={{
                background: activeImg === idx ? "rgba(41,121,255,0.15)" : "transparent",
                color: activeImg === idx ? "#0055FF" : "#9CA3AF",
                border: activeImg === idx ? "1px solid #0055FF" : "1px solid var(--color-border)",
                borderRadius: 8, padding: "0.3rem 0.75rem", fontSize: "0.6875rem", cursor: "pointer"
              }}
            >
              Cena {idx + 1}
            </button>
          ))}
        </div>
      </div>
      
      <div style={{ position: "relative", height: 350, overflow: "hidden", background: "#050505", userSelect: "none" }}>
        {/* Imagem Tratada (Fundo Completo) */}
        <img
          src={images[activeImg].treated}
          alt="Treated"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(0.15) contrast(1.05) brightness(0.9)"
          }}
        />
        {/* Glow e Grão overlay na imagem tratada */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 10% 20%, rgba(0, 255, 65, 0.12) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 90% 80%, rgba(0, 85, 255, 0.12) 0%, transparent 60%)" }} />
        
        {/* Imagem Pura (Frente Cortada) */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${sliderPos}%`, overflow: "hidden", borderRight: "2px solid #fff" }}>
          <img
            src={images[activeImg].raw}
            alt="Original"
            style={{
              width: "100vw", // truque para não encolher a imagem
              maxWidth: "none",
              height: "100%",
              objectFit: "cover"
            }}
          />
          <div style={{ position: "absolute", right: 10, top: 10, background: "rgba(5,5,5,0.7)", padding: "0.25rem 0.5rem", borderRadius: 4, color: "#fff", fontSize: "0.625rem", fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>
            ORIGINAL (SEM MARCA)
          </div>
        </div>
        
        {/* Tag do Lado Tratado */}
        <div style={{ position: "absolute", left: `${Math.max(sliderPos + 2, 70)}%`, top: 10, background: "rgba(0,255,65,0.8)", padding: "0.25rem 0.5rem", borderRadius: 4, color: "#050505", fontSize: "0.625rem", fontFamily: "var(--font-mono)", fontWeight: 700, letterSpacing: "0.1em" }}>
          TRATAMENTO BRAND DS
        </div>
        
        {/* Slider Controlador Invisível */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(parseInt(e.target.value))}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            cursor: "ew-resize",
            width: "100%",
            height: "100%"
          }}
        />
        
        {/* Efeito visual da linha divisória */}
        <div style={{ position: "absolute", left: `calc(${sliderPos}% - 1px)`, top: 0, bottom: 0, width: 2, background: "#00FF41", pointerEvents: "none", boxShadow: "0 0 10px #00FF41" }} />
        <div style={{ position: "absolute", left: `calc(${sliderPos}% - 12px)`, top: "calc(50% - 12px)", width: 24, height: 24, borderRadius: 9999, background: "#00FF41", pointerEvents: "none", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#050505", fontWeight: 700 }}>
          ↔
        </div>
      </div>
      
      <div style={{ padding: "1.25rem 1.5rem" }}>
        <h4 className="font-display" style={{ fontSize: "1.2rem", color: "#F3F4F6", margin: 0 }}>{images[activeImg].title}</h4>
        <p style={{ color: "#9CA3AF", fontSize: "0.85rem", marginTop: 4, marginBottom: 0, lineHeight: 1.5 }}>{images[activeImg].desc}</p>
      </div>
    </div>
  );
}

/** Componente: ODS Grid Interativo */
function ODSInteractiveGrid() {
  const [selectedODS, setSelectedODS] = useState<number | null>(null);

  const odsGoals = [
    { n: 1, label: "Erradicação da Pobreza", hex: "#E5243B", desc: "Mapeamento territorial de vulnerabilidades e squads focados em infraestrutura social." },
    { n: 2, label: "Fome Zero e Agricultura", hex: "#DDA63A", desc: "Simulação de cadeias de suprimentos agrícolas e combate ao desperdício regional." },
    { n: 3, label: "Saúde e Bem-Estar", hex: "#4C9F38", desc: "Digitalização e otimização dos tempos de espera em postos municipais parceiros." },
    { n: 4, label: "Educação de Qualidade", hex: "#C5192D", desc: "Onboarding de jovens talentos universitários e desenvolvimento de capacitação técnica." },
    { n: 5, label: "Igualdade de Gênero", hex: "#FF3A21", desc: "Auditoria de equidade salarial em empresas do HUB e incentivo à liderança feminina." },
    { n: 6, label: "Água Potável e Saneamento", hex: "#26BDE2", desc: "Projetos de engenharia ambiental voltados a reuso e medição de poluentes fluviais." },
    { n: 7, label: "Energia Limpa e Acessível", hex: "#FCC30B", desc: "Transição energética para pequenas indústrias baseada em biomassa e solar." },
    { n: 8, label: "Trabalho Decente e Crescimento", hex: "#A21942", desc: "Matching por IA com Fit Score para inserção direta de talentos no mercado de impacto." },
    { n: 9, label: "Indústria, Inovação e Infraestrutura", hex: "#FD6925", desc: "Modelagem de gêmeos digitais urbanos para otimização de fluxos industriais." },
    { n: 10, label: "Redução das Desigualdades", hex: "#DD1367", desc: "Ações inclusivas corporativas orientadas a inclusão social nos territórios periféricos." },
    { n: 11, label: "Cidades e Comunidades Sustentáveis", hex: "#FD9D24", desc: "O coração da nossa marca: presença em HUBs locais integrando prefeituras." },
    { n: 12, label: "Consumo e Produção Responsáveis", hex: "#BF8B2E", desc: "Logística reversa e implementação prática de processos de economia circular." },
    { n: 13, label: "Ação Contra a Mudança Global do Clima", hex: "#3F7E44", desc: "Simulador territorial de créditos de carbono urbanos e controle de emissões." },
    { n: 14, label: "Vida na Água", hex: "#0A97D9", desc: "Preservação de ecossistemas costeiros nos domínios estaduais portuários." },
    { n: 15, label: "Vida Terrestre", hex: "#56C02B", desc: "Preservação da biodiversidade nativa através de parcerias com campi florestais." },
    { n: 16, label: "Paz, Justiça e Instituições Eficazes", hex: "#00689D", desc: "Blockchain de evidências de impacto ESG para garantir auditoria transparente." },
    { n: 17, label: "Parcerias e Meios de Implementação", hex: "#19486A", desc: "Master brand atuando como catalisador B2B, B2G e universitário em escala." },
    { n: 18, label: "Igualdade Étnico-Racial", hex: "#795548", desc: "Inclusão proativa em squads de lideranças étnico-raciais universitárias." }
  ];

  return (
    <div style={{ marginTop: "2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "0.75rem" }}>
        {odsGoals.map((g) => {
          const isSelected = selectedODS === g.n;
          return (
            <button
              key={g.n}
              onClick={() => setSelectedODS(isSelected ? null : g.n)}
              className="bs-card"
              style={{
                background: isSelected ? g.hex : "#0D0E0E",
                border: isSelected ? `2px solid #fff` : "1px solid var(--color-border)",
                borderRadius: 12,
                padding: "1rem 0.5rem",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                transition: "all 0.25s",
                boxShadow: isSelected ? `0 0 16px ${g.hex}80` : "none"
              }}
            >
              <ODSBadge n={g.n} hex={g.hex} label={g.label} />
              <span className="font-mono" style={{ fontSize: "0.625rem", fontWeight: 700, color: isSelected ? "#050505" : "#9CA3AF" }}>
                ODS {g.n}
              </span>
            </button>
          );
        })}
      </div>
      
      <div style={{ marginTop: "1.5rem", minHeight: 90 }}>
        <AnimatePresence mode="wait">
          {selectedODS !== null ? (
            <motion.div
              key={selectedODS}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ padding: "1.25rem 1.5rem", border: `1px solid ${odsGoals[selectedODS - 1].hex}`, borderRadius: 16, background: "rgba(255,255,255,0.01)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: odsGoals[selectedODS - 1].hex }} />
                <span className="font-mono" style={{ fontSize: "0.8rem", color: odsGoals[selectedODS - 1].hex, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  ODS {selectedODS} · {odsGoals[selectedODS - 1].label}
                </span>
              </div>
              <p style={{ color: "#F3F4F6", fontSize: "0.95rem", marginTop: 8, margin: "8px 0 0", lineHeight: 1.5 }}>
                {odsGoals[selectedODS - 1].desc}
              </p>
            </motion.div>
          ) : (
            <div style={{ padding: "1.25rem 1.5rem", border: "1px dashed var(--color-border)", borderRadius: 16, textAlign: "center", color: "#4B5563", fontSize: "0.85rem", fontFamily: "var(--font-mono)" }}>
              Clique em um dos ODS para ver os desafios e foco de impacto territorial.
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#050505", color: "#F3F4F6" }}>
      <Grain />
      <div style={{ position: "relative", zIndex: 2 }}>
        <TaxonomicMetadata />
        <Header />
        <Hero />

        {/* 01. VISÃO & MANIFESTO */}
        <div id="visao-manifesto">
          <Section id="negocio" eyebrow="01. Visão & Manifesto · O Negócio / Playbook" title={<>Inovação territorial que gera ROI socioambiental real.</>} intro="Substituímos o greenwashing e a teoria inócua das consultorias de slides por squads integrados (embedded) e auditáveis no território. O Brasil Sustenta é o matching engine de talentos e o compliance prático das suas metas ESG. Unimos o brilhantismo universitário sob governança de mercado para entregar em semanas o que o seu RH/Sustentabilidade levaria meses para estruturar.">
            <SectionGlow color="#00E676" position="10% 40%" opacity={0.06} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", position: "relative" }}>
              {[
                { t: "Modelo Embedded (Súper Teammates)", b: "Não entregamos relatórios teóricos e sumimos. Alocamos squads de impacto integrados ao seu fluxo, sob a governança da Tríade (Embaixador + Coordenador + Empresa)." },
                { t: "Engine Suzely (Fit Explicável)", b: "O matching de competências, disponibilidade e relevância ODS territorial é calculado via Inteligência Artificial baseada em dados reais das calçadas parceiras." },
                { t: "Talent Pool & Voluntariado v7", b: "Os squads atuam como funil prático de talentos e de voluntariado de mentoria corporativa (ESG Social). O RH assina a Suzely para contratar os jovens pré-avaliados em campo (Placement SaaS)." },
                { t: "Compliance & ROI Síncronos", b: "Lucro e impacto andam juntos. A entrega técnica atende às exigências de inovação da marca e gera as métricas ODS auditadas exigidas pela regulação de mercado." },
              ].map((x) => (
                <div key={x.t} className="bs-card" style={{ border: "1px solid var(--color-border)", borderRadius: 16, padding: "1.75rem", background: "#121417" }}>
                  <h3 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "#F3F4F6", margin: "0 0 0.75rem" }}>{x.t}</h3>
                  <p style={{ fontSize: "0.95rem", color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>{x.b}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "2.5rem", borderTop: "1px solid var(--color-border)", paddingTop: "2rem" }}>
              <Eyebrow>As Verticais de Squads de Impacto (Especialidades & Entregáveis)</Eyebrow>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem", marginTop: "1rem" }}>
                {[
                  { 
                    title: "Tech & Data (Código Real & IA)", 
                    color: "#2979FF", 
                    tag: "SQUADS DE ENGENHARIA",
                    what: "Construção de MVPs de alta performance, arquiteturas de dados territoriais com georreferenciamento e motores de matching alimentados por inteligência artificial explicável.",
                    how: "Através de sprints de 6 semanas no modelo de governança da Tríade. Usamos TypeScript, React, Next.js, tRPC e bancos de dados vetoriais (pgvector no Supabase) para ligar problemas de campo a soluções digitais rápidas e robustas, focando em acessibilidade digital (WCAG) nas periferias.",
                    deliverables: [
                      "Plataformas Web & Mobile PWA (React 19 / Vite / Tailwind)",
                      "Motores de Inteligência e Recomendação (Suzely Vector Matching)",
                      "Pipelines de ETL e Dashboards de Métricas ESG em Tempo Real",
                      "Auditorias Técnicas de Código e Acessibilidade Digital"
                    ]
                  },
                  { 
                    title: "Território & Campo (Mapeamento & MEC 10%)", 
                    color: "#00E676", 
                    tag: "SQUADS DE EXTENSÃO & IMPACTO",
                    what: "Diagnóstico in loco de vulnerabilidades, aplicação de metodologias ágeis em comunidades e articulação institucional para curricularização de extensão (MEC 10%).",
                    how: "Squads multidisciplinares alocados diretamente em hubs parceiros e calçadas periféricas. Realizam escuta ativa, co-criação de soluções com lideranças locais e validação de hipóteses com metodologia científica, garantindo conformidade regulatória para as universidades envolvidas.",
                    deliverables: [
                      "Relatórios de Validação Territorial com Rastreabilidade Fotográfica",
                      "Dossiês de Curricularização de Extensão Universitária (MEC 10%)",
                      "Planos de Ação Comunitária e Mapeamento de Stakeholders",
                      "Workshops de Co-criação e Engajamento de Lideranças Locais"
                    ]
                  },
                  { 
                    title: "Gestão & Estratégia (Compliance & Finanças)", 
                    color: "#FFD600", 
                    tag: "SQUADS DE NEGÓCIOS & SUSTENTABILIDADE",
                    what: "Estruturação de modelos de negócios regenerativos, compliance com frameworks globais (GRI, SASB, ODS) e análise de viabilidade econômico-financeira de projetos sociais.",
                    how: "Aplicação do conceito de Shared Value (Valor Compartilhado) para demonstrar que lucro e impacto social são mutuamente reforçadores. Elaboração de matrizes de materialidade, projeções de ROI socioambiental e preparação para captação de recursos via blended finance.",
                    deliverables: [
                      "Matrizes de Materialidade e Alinhamento aos 18 ODS Brasileiros",
                      "Modelos Financeiros de Shared Value e Projeção de ROI Social",
                      "Relatórios de Sustentabilidade em Padrão Global (GRI / SASB)",
                      "Estruturação de Projetos para Editais e Captação de Financiamento"
                    ]
                  },
                  { 
                    title: "Design & Comunicação (Brutalismo Tropical)", 
                    color: "#FF9100", 
                    tag: "SQUADS DE IDENTIDADE & PRODUTO",
                    what: "Design de produtos digitais com estética Quiet Luxury Tech, campanhas de comunicação anti-greenwashing e narrativas de marca baseadas na verdade do território.",
                    how: "Criação de design systems modulares inspirados no brutalismo tropical com grid suíço de 1px. Desenvolvimento de interfaces intuitivas, tipografia monumental e identidades visuais de alta densidade que rejeitam clichês corporativos e valorizam a cultura local com elegância contemporânea.",
                    deliverables: [
                      "Design Systems Completos (Tokens, Componentes e Brand Books)",
                      "Protótipos de Alta Fidelidade (Figma) e Arquitetura de Informação",
                      "Guias de Tom de Voz e Diretrizes de Comunicação Anti-Greenwashing",
                      "Ativos Visuais e Tratamento Documental de Fotografia de Campo"
                    ]
                  }
                ].map((v) => (
                  <div key={v.title} className="bs-card" style={{ border: "1px solid var(--color-border)", borderRadius: 16, padding: "1.5rem", background: "#121417", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                        <span className="font-mono" style={{ fontSize: "0.625rem", color: v.color, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700 }}>
                          {v.tag}
                        </span>
                        <Dot color={v.color} size={6} />
                      </div>
                      <h4 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, color: "#F3F4F6", margin: "0 0 0.5rem" }}>
                        {v.title}
                      </h4>
                      <p style={{ fontSize: "0.85rem", color: "#9CA3AF", lineHeight: 1.5, margin: "0 0 1rem" }}>
                        {v.what}
                      </p>
                      <p style={{ fontSize: "0.8rem", color: "#6B7280", lineHeight: 1.5, margin: "0 0 1.25rem", fontStyle: "italic" }}>
                        {v.how}
                      </p>
                    </div>
                    
                    <div style={{ borderTop: "1px solid var(--color-border-strong)", paddingTop: "1rem" }}>
                      <span className="font-mono" style={{ fontSize: "0.55rem", color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>O que prestamos (Entregáveis):</span>
                      <ul className="font-mono" style={{ margin: 0, paddingLeft: 0, listStyle: "none", color: "#F3F4F6", fontSize: "0.7rem", display: "flex", flexDirection: "column", gap: 6 }}>
                        {v.deliverables.map((d) => (
                          <li key={d} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                            <span style={{ color: v.color }}>▪</span> {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* MANIFESTO — cartazes Gen Z de shared value */}
          <Section id="manifesto" eyebrow="Camada 1.5 · O Manifesto" title={<>A visão do Shared Value.</>} intro="Acreditamos que impacto socioambiental gera retorno financeiro legítimo, e que o retorno financeiro financia a escala do impacto. É assim que superamos o greenwashing e criamos soluções perpétuas.">
            <ManifestoSection />
          </Section>
        </div>

        {/* 02. LOGOMARCA & GEOMETRIA */}
        <div id="logo-geometria">
          <Section id="logo" eyebrow="02. Logomarca & Geometria" title="A assinatura visual." intro="A logo do Brasil Sustenta é empilhada, utilizando a fonte Antonio Black e finalizada com o ponto final verde amazônia tech. É minimalista, geométrica, de forte presença visual e inalterável.">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
              <LogoCard label="Principal" sub="Empilhado · fundo escuro" bg="#08090A">
                <Logo size={2.2} />
              </LogoCard>
              <LogoCard label="Negativo" sub="Fundo claro" bg="#F3F4F6" labelColor="#4B5563">
                <span className="font-display" style={{ display: "flex", flexDirection: "column", lineHeight: 0.88, fontSize: "2.2rem", fontWeight: 900 }}>
                  <span style={{ color: "#08090A" }}>BRASIL</span>
                  <span style={{ color: "#08090A" }}>SUSTENTA<span style={{ color: "#00E676" }}>.</span></span>
                </span>
              </LogoCard>
              <LogoCard label="Monocromático" sub="Tudo branco · sem ponto colorido" bg="#121417">
                <span className="font-display" style={{ display: "flex", flexDirection: "column", lineHeight: 0.88, fontSize: "2.2rem", fontWeight: 900 }}>
                  <span style={{ color: "#F3F4F6" }}>BRASIL</span>
                  <span style={{ color: "#F3F4F6" }}>SUSTENTA<span style={{ color: "#F3F4F6" }}>.</span></span>
                </span>
              </LogoCard>
              <LogoCard label="Símbolo Monograma (Match-Net)" sub="Monograma geométrico bioluminescente" bg="#08090A">
                <div style={{ position: "relative", width: 70, height: 70, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
                    <path d="M25 20H55C70 20 70 38 55 38C70 38 70 56 55 56H25V20Z" stroke="url(#paint0_linear_v7_original)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M25 56C25 70 38 80 50 80C65 80 75 70 75 56" stroke="url(#paint1_linear_v7_original)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"/>
                    <circle cx="55" cy="38" r="6" fill="#00E676" />
                    <circle cx="50" cy="80" r="6" fill="#FFD600" />
                    <circle cx="75" cy="56" r="6" fill="#2979FF" />
                    <defs>
                      <linearGradient id="paint0_linear_v7_original" x1="25" y1="20" x2="70" y2="56" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00E676"/>
                        <stop offset="0.5" stopColor="#FFD600"/>
                        <stop offset="1" stopColor="#2979FF"/>
                      </linearGradient>
                      <linearGradient id="paint1_linear_v7_original" x1="25" y1="56" x2="75" y2="80" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFD600"/>
                        <stop offset="1" stopColor="#2979FF"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </LogoCard>
              <LogoCard label="Favicon v8" sub="Aba de navegador · ícone de app" bg="#08090A">
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 64, height: 64, background: "#121417", border: "1px solid var(--color-border-strong)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(0, 230, 118, 0.15)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: 36, height: 36 }}>
                      <path d="M25 20H55C70 20 70 38 55 38C70 38 70 56 55 56H25V20Z" stroke="#00E676" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="55" cy="38" r="8" fill="#FFD600" />
                    </svg>
                  </div>
                  <CopyChip value='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M25 20H55C70 20 70 38 55 38C70 38 70 56 55 56H25V20Z" stroke="#00E676" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="55" cy="38" r="8" fill="#FFD600"/></svg>' label="Copiar SVG" />
                </div>
              </LogoCard>
            </div>
            <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ border: "1px solid rgba(0,230,118,0.2)", borderRadius: 12, padding: "1.25rem", background: "rgba(0,230,118,0.04)" }}>
                <div className="font-mono" style={{ fontSize: "0.6875rem", color: "#00E676", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>✓ Regras de Uso</div>
                <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.7 }}>
                  <li>BRASIL sempre empilhado sobre SUSTENTA.</li>
                  <li>Símbolo Match-Net sempre renderizado em alta definição SVG.</li>
                  <li>Cores semânticas do símbolo correspondem ao degradê verde-amarelo-azul Pátria.</li>
                </ul>
              </div>
              <div style={{ border: "1px solid rgba(255,23,68,0.2)", borderRadius: 12, padding: "1.25rem", background: "rgba(255,23,68,0.04)" }}>
                <div className="font-mono" style={{ fontSize: "0.6875rem", color: "#FF1744", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>✕ Proibido</div>
                <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.7 }}>
                  <li>Nunca escrever em linha horizontal única.</li>
                  <li>Nunca mudar o ponto final para outra cor.</li>
                  <li>Nunca aplicar sombras, gradientes ou contornos no texto.</li>
                </ul>
              </div>
            </div>
          </Section>
        </div>

        {/* 03. SISTEMA CROMÁTICO */}
        <div id="sistema-cromatico">
          <Section id="cores" eyebrow="03. Sistema Cromático & Elevação Tonal" title="A paleta semântica." intro="Dividimos a paleta de cores por persona de atuação. Cores puras servem como acentos dinâmicos em superfícies e detalhes, nunca como fundo de grandes blocos. Adicionamos gradientes premium para conferir profundidade e modernidade.">
            <Eyebrow>Por Persona</Eyebrow>
            <div style={{ marginTop: 12, marginBottom: 32 }}><ColorRow items={tokens.color.persona} /></div>
            <Eyebrow>Gradientes Premium</Eyebrow>
            <GradientShowcase />
            <div style={{ height: 32 }} />
            <Eyebrow>Base & Neutros</Eyebrow>
            <div style={{ marginTop: 12, marginBottom: 32 }}><ColorRow items={tokens.color.base} /></div>
            <Eyebrow>Status</Eyebrow>
            <div style={{ marginTop: 12 }}><ColorRow items={tokens.color.status} /></div>
          </Section>
        </div>

        {/* 04. TIPOGRAFIA ESCULTURAL */}
        <div id="tipografia-escultural">
          <Section id="tipografia" eyebrow="04. Tipografia Escultural" title="A escala monumentalista." intro="Antonio (Display/Cabeçalhos) · Outfit (Leitura/Corpo) · Geist Mono (Dados/Fórmulas/Eyebrows). No máximo duas famílias por tela ou peça. Mono é reservada estritamente para números de score, metadados e tags.">
            <TypographyPlayground />
            <div style={{ marginTop: "2.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {tokens.typography.scale.map((t) => (
                <div key={t.level} style={{ borderBottom: "1px solid var(--color-border)", padding: "1.25rem 0", display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{
                    fontFamily: t.family === "Antonio" ? "var(--font-display)" : t.family === "Geist Mono" ? "var(--font-mono)" : "var(--font-body)",
                    fontSize: `min(${t.size}, 12vw)`, fontWeight: parseInt(t.weight) || 700,
                    letterSpacing: t.tracking, textTransform: t.transform === "UPPERCASE" ? "uppercase" : "none",
                    color: "#F3F4F6", lineHeight: 1,
                  }}>
                    {t.level}
                  </span>
                  <span className="font-mono" style={{ fontSize: "0.75rem", color: "#9CA3AF" }}>
                    {t.family} · {t.weight} · {t.size} · {t.tracking}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* 05. TOM DE VOZ */}
        <div id="tom-de-voz">
          <Section id="tom" eyebrow="05. Tom de Voz & Anti-Greenwashing" title="Inconformismo e rigor real." intro="Falamos com soberania territorial e atitude pragmática: provocativo, focado em negócios, guiado por evidências científicas e desenhado para gerar valor econômico legítimo na comunidade de baixo para cima.">
            <ToneTranslator />

            <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div className="bs-card" style={{ border: "1px solid rgba(0, 230, 118, 0.2)", borderRadius: 16, padding: "1.5rem", background: "rgba(0, 230, 118, 0.02)" }}>
                <span className="font-mono" style={{ fontSize: "0.6875rem", color: "#00E676" }}>✓ O QUE DIZER (RIGOR E ATITUDE)</span>
                <ul style={{ color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.7, margin: "1rem 0 0", paddingLeft: "1.2rem" }}>
                  <li>Ancorar soluções em <span style={{ color: "#F3F4F6" }}>evidências quantificáveis</span> (ODS, Fit Scores).</li>
                  <li>Falar da base criativa e universitária com <span style={{ color: "#F3F4F6" }}>protagonismo e autoria</span>.</li>
                  <li>Usar a verdade nua e crua do território ("direto na calçada", "corre real").</li>
                  <li>Princípios operacionais: <span style={{ color: "#F3F4F6" }}>"Entrar Sem Viés"</span> (ouvir antes de projetar) e <span style={{ color: "#F3F4F6" }}>"Execução Rápida"</span> (sprints com risco calculado).</li>
                </ul>
              </div>
              <div className="bs-card" style={{ border: "1px solid rgba(255, 23, 68, 0.2)", borderRadius: 16, padding: "1.5rem", background: "rgba(255, 23, 68, 0.02)" }}>
                <span className="font-mono" style={{ fontSize: "0.6875rem", color: "#FF1744" }}>✕ O QUE EVITAR (FALTA DE EVIDÊNCIA / CLICHÊ)</span>
                <ul style={{ color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.7, margin: "1rem 0 0", paddingLeft: "1.2rem" }}>
                  <li>Termos abstratos e paternalistas: <span style={{ color: "#F3F4F6" }}>"capacitar jovens carentes"</span>, <span style={{ color: "#F3F4F6" }}>"ajudar o próximo"</span>.</li>
                  <li>Clichês corporativos vazios: <span style={{ color: "#F3F4F6" }}>"sinergia inovadora"</span>, <span style={{ color: "#F3F4F6" }}>"ecossistema disruptivo"</span>.</li>
                  <li>Fórmulas de greenwashing: <span style={{ color: "#F3F4F6" }}>"construir um amanhã verde"</span>, <span style={{ color: "#F3F4F6" }}>"salvar o planeta"</span>.</li>
                  <li>Paternalismo institucional tradicional que anule a voz ativa da comunidade.</li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: "1.5rem", border: "1px solid var(--color-border)", borderRadius: 16, padding: "1.5rem", background: "#121417" }}>
              <div className="font-mono" style={{ fontSize: "0.6875rem", color: "#FFD600", marginBottom: 10 }}>[ ATITUDE COMERCIAL: A VERDADE DO IMPACTO ]</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "1.5rem" }}>
                <p style={{ color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
                  Nossa atitude comercial rejeita o greenwashing e a teoria inócua das consultorias tradicionais. Entramos no território desprovidos de jargões de slides para encontrar a verdade prática das necessidades locais. Operamos de forma científica e com governança corporativa blindada, testando hipóteses em campo de maneira ágil.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div className="font-mono" style={{ fontSize: "0.75rem", color: "#F3F4F6", textTransform: "uppercase" }}>Os dois pilares inegociáveis de redação comercial:</div>
                  <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "#9CA3AF", fontSize: "0.8rem", lineHeight: 1.6 }}>
                    <li><strong style={{ color: "#FFD600" }}>Entrar Sem Viés (Desaprendizado de Slide):</strong> Nunca venda respostas prontas no slide de onboarding. Diga: *"Entramos no território para ouvir a comunidade e projetar a partir dos fatos locais, não de suposições corporativas."*</li>
                    <li><strong style={{ color: "#FFD600" }}>Execução de Campo Rápida (Sprints de Evidência):</strong> Valide rápido sob risco controlado. Diga: *"Construímos e testamos soluções em campo através de sprints de 6 semanas, corrigindo a rota de imediato a partir de dados reais da calçada."*</li>
                  </ul>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* 06. DIRETRIZ FOTOGRÁFICA */}
        <div id="diretriz-fotografica">
          <Section id="fotografia" eyebrow="06. Diretriz Fotográfica" title="Realidade documental." intro="Pessoas reais, estudantes no campus, bairros e cidades brasileiras. Baixo contraste de saturação, granulação orgânica e overlays escuros que permitem excelente legibilidade de texto sob a imagem.">
            <PhotoSlider />

            <div style={{ marginTop: "1.5rem", border: "1px solid var(--color-border)", borderRadius: 16, padding: "1.25rem", background: "#121417" }}>
              <div className="font-mono" style={{ fontSize: "0.6875rem", color: "#2979FF", marginBottom: 10 }}>[ CSS TOKENS PARA FOTOGRAFIA ]</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "1.5rem", alignItems: "center" }}>
                <p style={{ color: "#9CA3AF", fontSize: "0.8rem", lineHeight: 1.5, margin: 0 }}>
                  Todas as fotografias de pessoas ou do território devem ser dessaturadas para neutralizar cores estranhas ao design system e receber overlays sutis dos nossos gradientes semânticos (Leaf ou Atlantic) para fixar a assinatura visual da marca.
                </p>
                <pre style={{ margin: 0, padding: "1rem", background: "#08090A", borderRadius: 8, border: "1px solid var(--color-border-strong)", fontSize: "0.7rem", color: "#00E676", overflowX: "auto", fontFamily: "var(--font-mono)" }}>
{`.photo-brand-filter {
  filter: grayscale(0.15) contrast(1.05) brightness(0.9);
  /* Overlay Leaf/Atlantic */
  background: radial-gradient(circle at 10% 20%, rgba(0, 230, 118, 0.12) 0%, transparent 60%),
              radial-gradient(circle at 90% 80%, rgba(41, 121, 255, 0.12) 0%, transparent 60%);
}`}
                </pre>
              </div>
            </div>
          </Section>
        </div>

        {/* O MÉTODO — fluxo operacional */}
        <div id="metodo-fluxo">
          <Section id="metodo" eyebrow="Método de Engenharia Territorial" title="O pipeline de valor." intro="Rastreabilidade do início ao fim. Cada squad passa por checkpoints bem definidos no sistema que geram evidência digital. Transparência operacional completa.">
            <SectionGlow color="#2979FF" position="50% 50%" opacity={0.05} />
            <FlowDemo />
          </Section>
        </div>

        {/* 07. COMPONENTES & BENTO UI */}
        <div id="componentes-bento">
          <Section id="componentes" eyebrow="07. Componentes & Bento UI" title="Primitivos interativos." intro="Espelho de nossos componentes principais exportados de apps/web/src/components/. Hairlines, botões pílulas e fit scores explicados.">
            <div className="bento-grid" style={{ marginTop: "2rem" }}>
              {/* Coluna 1: Botoes (Bento span 2 colunas) */}
              <div className="glass-card bento-2col" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span className="font-mono" style={{ fontSize: "0.6875rem", color: "#00E676", letterSpacing: "0.15em", textTransform: "uppercase" }}>✓ Botões Cápsula High-End (Touch Target &gt; 44px)</span>
                  <p style={{ color: "#9CA3AF", fontSize: "0.85rem", margin: "0.5rem 0 1.5rem", lineHeight: 1.5 }}>
                    Botões pílula táteis (rounded-full) com transições elásticas naturais e acentos bioluminescentes contidos.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                  <button className="min-h-[44px] h-11 px-7 rounded-full bg-[#00E676] text-[#08090A] font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:bg-[#00FF87] active:scale-[0.98] shadow-[0_0_20px_rgba(0,230,118,0.25)] cursor-pointer">
                    Ativar Squad ESG
                  </button>
                  <button className="min-h-[44px] h-11 px-7 rounded-full bg-white/[0.04] text-white border border-white/[0.10] font-medium text-xs uppercase tracking-wider transition-all duration-200 hover:bg-white/[0.08] hover:border-white/[0.20] active:scale-[0.98] cursor-pointer">
                    Ver Casos de Sucesso
                  </button>
                  <button className="min-h-[44px] h-11 px-7 rounded-full bg-[#FFD600] text-[#08090A] font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:bg-[#FFE033] active:scale-[0.98] shadow-[0_0_20px_rgba(255,214,0,0.25)] cursor-pointer">
                    Inscrever Campus
                  </button>
                </div>
              </div>
              
              {/* Coluna 2: Fit Score Card */}
              <div className="glass-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span className="font-mono" style={{ fontSize: "0.6875rem", color: "#FFD600", letterSpacing: "0.15em", textTransform: "uppercase" }}>EXPLICAÇÃO DO FIT SCORE</span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "1.5rem 0 1rem" }}>
                    <span className="font-mono" style={{ fontSize: "3.5rem", fontWeight: 700, color: "#FFD600", lineHeight: 1 }}>87</span>
                    <span className="font-mono" style={{ color: "#9CA3AF", fontSize: "0.9rem" }}>/100</span>
                  </div>
                  <p style={{ color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.5, margin: "0 0 1.25rem" }}>
                    Cálculo em tempo real gerado pela Suzely baseado nas compatibilidades abaixo:
                  </p>
                </div>
                <div>
                  {[["Skills Técnicas", 82, "#00E676"], ["Objetivos ODS", 91, "#FFD600"], ["Contexto Territorial", 74, "#2979FF"]].map(([l, v, c]) => (
                    <div key={l as string} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", marginBottom: 4 }}>
                        <span className="font-mono" style={{ color: "#F3F4F6", textTransform: "uppercase" }}>{l as string}</span>
                        <span className="font-mono" style={{ color: c as string }}>{v as number}%</span>
                      </div>
                      <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 9999 }}>
                        <div style={{ width: `${v}%`, height: "100%", background: c as string, borderRadius: 9999 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* 08. AGENDA ODS 1-18 & GOVERNANÇA */}
        <div id="ods-governanca">
          {/* ODS GRID INTERATIVO */}
          <Section id="ods" eyebrow="08. Agenda ODS 1-18 & Governança" title="A ancoragem ODS." intro="Toda ação operacional é atrelada a uma das 18 metas de desenvolvimento sustentável ODS brasileiras. Selecione uma meta abaixo para ver os desafios práticos envolvidos.">
            <ODSInteractiveGrid />
          </Section>

          {/* GOVERNANÇA */}
          <Section id="governanca" eyebrow="Framework de Governança Soberana" title="Quem decide e evolui." intro="Tokens são a única fonte da verdade de cores, fontes e espaçamentos. Qualquer mudança estrutural deve ser proposta via Architecture Decision Records (ADRs) no Vault de Governança.">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {[
                { l: "🔴 Inalterável (Soberano)", c: "#FF1744", b: "Logo oficial, nome, paleta semântica principal e tom de voz anti-greenwashing. Apenas o Brand Owner decide." },
                { l: "🟡 Adaptável (Evolutivo)", c: "#FFD600", b: "Novos componentes do design system, gradientes secundários e escalas de texto. Propostas via PR de ADR." },
                { l: "🟢 Livre (Execução)", c: "#00E676", b: "Uso combinado de tokens existentes para criar novas páginas, posts e ilustrações no tom de voz oficial." },
              ].map((x) => (
                <div key={x.l} className="bs-card" style={{ border: "1px solid var(--color-border)", borderRadius: 16, padding: "1.5rem", background: "#121417" }}>
                  <div className="font-mono" style={{ fontWeight: 700, color: x.c, marginBottom: 8, fontSize: "0.85rem" }}>{x.l}</div>
                  <p style={{ fontSize: "0.85rem", color: "#9CA3AF", lineHeight: 1.6, margin: 0 }}>{x.b}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem", border: "1px solid var(--color-border)", borderRadius: 16, padding: "1.5rem", background: "#121417" }}>
              <EaseDemo />
            </div>

            <div style={{ marginTop: "2rem", borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
              <Eyebrow>Template de Proposta de Mudança (ADR)</Eyebrow>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "1.5rem", marginTop: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <p style={{ color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
                    Qualquer modificação estrutural na identidade de marca (ex: propor novos gradientes, introduzir fontes alternativas ou alterar lockups de logo) precisa seguir o fluxo formal de open-source do ecossistema. Use este padrão de ADR em formato markdown e envie um Pull Request para revisão da diretoria criativa (CPO).
                  </p>
                </div>
                <pre style={{ margin: 0, padding: "1.25rem", background: "#08090A", borderRadius: 12, border: "1px solid var(--color-border-strong)", fontSize: "0.7rem", color: "#F3F4F6", overflowX: "auto", fontFamily: "var(--font-mono)", lineHeight: 1.5 }}>
{`# ADR-002: [Título da Proposta de Mudança]
Status: Proposto | Data: 2026-06-18
Autor: @seu_github

## 1. Contexto e Motivação
[Descreva o problema ou a oportunidade encontrada no manual da marca]

## 2. Decisão Proposta
[Apresente a alteração visual ou de código de forma clara]

## 3. Impacto Operacional
- Visual: [Como afeta as landings]
- Técnico: [Novos tokens de CSS gerados]
- Narrativa: [Alinhamento com "Quem sustenta é nóis"]`}
                </pre>
              </div>
            </div>
          </Section>
        </div>

        <footer style={{ borderTop: "1px solid var(--color-border)", padding: "4rem 1.5rem", textAlign: "center" }}>
          <Logo size={1.0} />
          <p className="font-mono" style={{ color: "#4B5563", fontSize: "0.6875rem", marginTop: "1.5rem", textTransform: "uppercase", letterSpacing: "0.2em" }}>
            Brasil Sustenta Venture v{tokens._meta.version} · Snapshot {tokens._meta.snapshot} · Quem Sustenta é Nóis
          </p>
        </footer>
      </div>
    </div>
  );
}
