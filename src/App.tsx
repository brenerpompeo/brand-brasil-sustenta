import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import tokens from "./data/tokens.json";
import { Section, Eyebrow, CopyChip } from "./components/primitives";
import { Logo } from "./components/Logo";
import { ODSBadge } from "./components/ODSBadge";
import { Grain, SectionGlow, Dot } from "./components/Atmosphere";
import { FlowDemo } from "./components/FlowDemo";
import { EaseDemo } from "./components/EaseDemo";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { id: "fundacao", label: "Fundação" },
  { id: "logo", label: "Logo" },
  { id: "cores", label: "Cores" },
  { id: "tipografia", label: "Tipografia" },
  { id: "fotografia", label: "Fotografia" },
  { id: "metodo", label: "Método" },
  { id: "componentes", label: "Componentes" },
  { id: "voz", label: "Voz" },
  { id: "governanca", label: "Governança" },
];

/** Scroll spy simples — a seção visível acende no menu, com o ponto verde. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function Nav() {
  const active = useActiveSection(NAV.map((n) => n.id));
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(5,5,5,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--color-border)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0.9rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        <Logo size={1} />
        <nav style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
          {NAV.map((n) => {
            const isActive = active === n.id;
            return (
              <a
                key={n.id}
                href={`#${n.id}`}
                data-active={isActive}
                className="font-mono bs-nav-link"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#9CA3AF", textDecoration: "none", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.12em" }}
              >
                {isActive && <Dot size={5} />}
                {n.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  const fadeUp = {
    hidden: { opacity: 0, y: reduced ? 0 : 18 },
    show: { opacity: 1, y: 0 },
  };
  return (
    <section style={{ padding: "6rem 0 4rem", position: "relative", overflow: "hidden" }}>
      <SectionGlow color="#00E676" position="70% 0%" opacity={0.06} />
      {/* Glow pulsante MUITO sutil atrás do título — respiração bioluminescente. */}
      {!reduced && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0.04 }}
          animate={{ opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 32% 38%, rgba(0,230,118,0.5) 0%, transparent 38%)" }}
        />
      )}
      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: reduced ? 0 : 0.09, delayChildren: 0.05 }}
        style={{ maxWidth: 1120, margin: "0 auto", padding: "0 1.5rem", position: "relative" }}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.6, ease: EASE }}>
          <p className="font-mono" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color: "#00E676" }}>
            <Dot /> Brand System · v{tokens._meta.version}
          </p>
        </motion.div>
        <motion.h1 variants={fadeUp} transition={{ duration: 0.7, ease: EASE }} className="font-display" style={{ fontSize: "clamp(3rem, 9vw, 7rem)", fontWeight: 900, lineHeight: 0.9, margin: "1rem 0", color: "#F3F4F6" }}>
          Sistema de marca<br />que <span style={{ color: "#00E676" }}>opera.</span>
        </motion.h1>
        <motion.p variants={fadeUp} transition={{ duration: 0.7, ease: EASE }} style={{ color: "#9CA3AF", fontSize: "1.125rem", maxWidth: 600, lineHeight: 1.6 }}>
          Guia vivo do Brasil Sustenta — tokens, identidade, componentes, voz e governança.
          Não é PDF: renderiza dos mesmos tokens que o produto usa. {tokens._meta.direction}.
        </motion.p>
        <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: EASE }} style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {tokens.color.persona.map((c) => (
            <span key={c.name} className="font-mono bs-card" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid var(--color-border-strong)", borderRadius: 9999, padding: "0.4rem 0.9rem", fontSize: "0.75rem", color: "#9CA3AF" }}>
              <span style={{ width: 10, height: 10, borderRadius: 9999, background: c.hex }} /> {c.persona}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function LogoCard({ label, sub, bg, labelColor = "#9CA3AF", children }: { label: string; sub: string; bg: string; labelColor?: string; children: ReactNode }) {
  return (
    <div className="bs-card" style={{ border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden", background: "#0D0E0E" }}>
      <div style={{ background: bg, padding: "2.75rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 150 }}>
        {children}
      </div>
      <div style={{ padding: "0.9rem 1rem", borderTop: "1px solid var(--color-border)", display: "flex", alignItems: "center", gap: 8 }}>
        <Dot size={5} />
        <div>
          <div className="font-mono" style={{ fontSize: "0.7rem", color: "#F3F4F6", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
          <div className="font-mono" style={{ fontSize: "0.625rem", color: labelColor, marginTop: 2 }}>{sub}</div>
        </div>
      </div>
    </div>
  );
}

function ColorRow({ items }: { items: { name: string; hex?: string; value?: string; label: string; use?: string; persona?: string }[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
      {items.map((c) => {
        const v = c.hex ?? c.value ?? "";
        return (
          <div key={c.name} style={{ border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden", background: "#0D0E0E" }}>
            <div style={{ height: 84, background: v, borderBottom: "1px solid var(--color-border)" }} />
            <div style={{ padding: "0.9rem" }}>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#F3F4F6" }}>{c.label}</div>
              {c.persona && <div className="font-mono" style={{ fontSize: "0.625rem", color: "#00E676", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 2 }}>{c.persona}</div>}
              {c.use && <div style={{ fontSize: "0.75rem", color: "#9CA3AF", marginTop: 4, lineHeight: 1.4 }}>{c.use}</div>}
              <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                <CopyChip value={v} />
                <CopyChip value={`var(${c.name.startsWith("--") ? c.name : tokenVar(c.name)})`} label="var" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function tokenVar(name: string) {
  const all = [...tokens.color.base, ...tokens.color.persona, ...tokens.color.status, ...tokens.color.border];
  return all.find((x) => x.name === name)?.var ?? `--color-${name}`;
}

export default function App() {
  return (
    <div style={{ position: "relative" }}>
      <Grain />
      <div style={{ position: "relative", zIndex: 2 }}>
      <Nav />
      <Hero />

      {/* FUNDAÇÃO — glow verde (impacto / B2B) */}
      <Section id="fundacao" eyebrow="Camada 1 · Fundação Estratégica"
        title={<>O porquê antes<br />de qualquer pixel.</>}
        intro="Transformar a Agenda 2030 de manifesto em operação. ESG como entrega medível — brief, sprint, evidência, relatório auditável.">
        <SectionGlow color="#00E676" position="15% 30%" opacity={0.05} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", position: "relative" }}>
          {[
            { t: "Proposta única", b: "Desafios ESG → squads universitários com matching por IA, presença territorial e entregas mensuráveis." },
            { t: "Território de marca", b: "Operação ESG real com presença territorial. Não somos consultoria, job board nem ONG." },
            { t: "Arquitetura", b: "Master brand + produtos endossados: Suzely, HUB Local, Programa Municipal ODS, University Partner." },
          ].map((x) => (
            <div key={x.t} className="bs-card" style={{ border: "1px solid var(--color-border)", borderRadius: 16, padding: "1.5rem", background: "#0D0E0E" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F3F4F6", margin: "0 0 0.5rem" }}>{x.t}</h3>
              <p style={{ fontSize: "0.9rem", color: "#9CA3AF", lineHeight: 1.55, margin: 0 }}>{x.b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* LOGO — 4 lockups */}
      <Section id="logo" eyebrow="Camada 2 · Logo" title="A assinatura."
        intro="Antonio Black, empilhada, ponto final verde bandeira. Único elemento colorido. Quatro lockups, um sistema.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
          {/* Principal */}
          <LogoCard label="Principal" sub="Empilhado · fundo escuro" bg="#050505">
            <Logo size={2.4} />
          </LogoCard>
          {/* Negativo */}
          <LogoCard label="Negativo" sub="Fundo claro" bg="#F3F4F6" labelColor="#4B5563">
            <span className="font-display" style={{ display: "flex", flexDirection: "column", lineHeight: 0.88, fontSize: "2.4rem", fontWeight: 900 }}>
              <span style={{ color: "#050505" }}>BRASIL</span>
              <span style={{ color: "#050505" }}>SUSTENTA<span style={{ color: "#00E676" }}>.</span></span>
            </span>
          </LogoCard>
          {/* Monocromático */}
          <LogoCard label="Monocromático" sub="Tudo branco · sem ponto colorido" bg="#0D0E0E">
            <span className="font-display" style={{ display: "flex", flexDirection: "column", lineHeight: 0.88, fontSize: "2.4rem", fontWeight: 900 }}>
              <span style={{ color: "#F3F4F6" }}>BRASIL</span>
              <span style={{ color: "#F3F4F6" }}>SUSTENTA<span style={{ color: "#F3F4F6" }}>.</span></span>
            </span>
          </LogoCard>
          {/* Ícone */}
          <LogoCard label="Ícone" sub='Reduzido · "BS." ' bg="#050505">
            <span className="font-display" style={{ display: "inline-flex", alignItems: "baseline", fontSize: "3.4rem", fontWeight: 900, color: "#F3F4F6", lineHeight: 1 }}>
              BS<Dot size={12} style={{ marginLeft: 4 }} />
            </span>
          </LogoCard>
        </div>
        <div style={{ marginTop: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ border: "1px solid rgba(0,230,118,0.2)", borderRadius: 12, padding: "1.25rem", background: "rgba(0,230,118,0.04)" }}>
            <div className="font-mono" style={{ fontSize: "0.625rem", color: "#00E676", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>✓ Sempre</div>
            <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.7 }}>
              <li>Empilhado (BRASIL em cima)</li><li>Ponto final verde #00E676</li><li>Fonte Antonio</li><li>Respiro ≥ 1× altura do logo</li>
            </ul>
          </div>
          <div style={{ border: "1px solid rgba(255,23,68,0.2)", borderRadius: 12, padding: "1.25rem", background: "rgba(255,23,68,0.04)" }}>
            <div className="font-mono" style={{ fontSize: "0.625rem", color: "#FF1744", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>✕ Nunca</div>
            <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "#9CA3AF", fontSize: "0.85rem", lineHeight: 1.7 }}>
              <li>Horizontal em um bloco</li><li>Fonte diferente de Antonio</li><li>Ponto em outra cor</li><li>Sombra / contorno / gradiente</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* CORES */}
      <Section id="cores" eyebrow="Camada 2 · Cores" title="Semânticas por persona."
        intro="Cada cor de persona domina uma superfície. Cores vivas são acento, nunca fundo de bloco grande. Clique para copiar.">
        <Eyebrow>Persona</Eyebrow>
        <div style={{ marginTop: 12, marginBottom: 28 }}><ColorRow items={tokens.color.persona} /></div>
        <Eyebrow>Base</Eyebrow>
        <div style={{ marginTop: 12, marginBottom: 28 }}><ColorRow items={tokens.color.base} /></div>
        <Eyebrow>Status</Eyebrow>
        <div style={{ marginTop: 12 }}><ColorRow items={tokens.color.status} /></div>
      </Section>

      {/* TIPOGRAFIA */}
      <Section id="tipografia" eyebrow="Camada 2 · Tipografia" title="Editorial monumentalista."
        intro="Antonio (display) · Outfit (corpo) · Geist Mono (scores). Máx 2 famílias por peça; mono só para números.">
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
              <span className="font-mono" style={{ fontSize: "0.7rem", color: "#9CA3AF" }}>
                {t.family} · {t.weight} · {t.size} · {t.tracking}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* MÉTODO — fluxo operacional animado (didática por movimento) */}
      <Section id="fotografia" eyebrow="Camada 2 · Fotografia" title="Documental. Territorial. Tratada."
        intro="Brasil real — cidade, campus, trabalho. Dessaturado, baixo contraste, sob overlay escuro e grão. Nunca stock corporativo. A imagem abaixo é Campinas (HUB-piloto), tratada nos termos do DS v6.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {[
            { src: "/imagery/territorio-campinas.jpg", cap: "Território · Campinas", credit: "Foto: Natália C. Terêncio / Wikimedia · CC BY-SA 4.0" },
            { src: "/imagery/juventude-cop30.jpg", cap: "Juventude · rumo à COP30", credit: "Foto: Agência Senado / Openverse · CC BY 2.0" },
            { src: "/imagery/campus-praia-vermelha.jpg", cap: "Campus · Praia Vermelha (UFRJ)", credit: "Foto: IE-UFRJ / Wikimedia · CC0" },
          ].map((img) => (
            <figure key={img.src} className="bs-card" style={{ margin: 0, position: "relative", overflow: "hidden", borderRadius: 16, border: "1px solid var(--color-border)", aspectRatio: "16/10" }}>
              <img src={img.src} alt={img.cap} loading="lazy" decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(0.92) brightness(0.85)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #050505 5%, rgba(5,5,5,0.35) 55%, rgba(5,5,5,0.1) 100%)", pointerEvents: "none" }} />
              <figcaption style={{ position: "absolute", left: 14, bottom: 12, right: 14 }}>
                <div className="font-mono" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "#F3F4F6" }}>
                  <Dot size={5} /> {img.cap}
                </div>
                <div className="font-mono" style={{ fontSize: "0.5625rem", color: "rgba(255,255,255,0.45)", marginTop: 4 }}>{img.credit}</div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ border: "1px solid rgba(0,230,118,0.2)", borderRadius: 12, padding: "1.1rem", background: "rgba(0,230,118,0.03)" }}>
            <div className="font-mono" style={{ fontSize: "0.625rem", color: "#00E676", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>+ Usar</div>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#9CA3AF", lineHeight: 1.6 }}>Documental, pessoas reais em contexto BR, dessaturado, luz natural, atmosfera séria, territorial.</p>
          </div>
          <div style={{ border: "1px solid rgba(255,23,68,0.2)", borderRadius: 12, padding: "1.1rem", background: "rgba(255,23,68,0.03)" }}>
            <div className="font-mono" style={{ fontSize: "0.625rem", color: "#FF1744", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>x Evitar</div>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#9CA3AF", lineHeight: 1.6 }}>Stock corporativo, aperto de mãos genérico, fundo branco infinito, bandeira literal, mockup de IA brilhante.</p>
          </div>
        </div>
      </Section>

      <Section id="metodo" eyebrow="Camada 2 · O Método" title="Audite, não acredite."
        intro="Cada etapa gera evidência. O fluxo abaixo não descreve a operação — ele é a operação, animada dos mesmos tokens. Prova antes de promessa.">
        <SectionGlow color="#FFD600" position="50% 50%" opacity={0.04} />
        <div style={{ position: "relative" }}>
          <FlowDemo />
        </div>
        <p className="font-mono" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.7rem", color: "#4B5563", marginTop: 20 }}>
          <Dot size={5} /> Brief → Shortlist → Squad → Sprint → Relatório · cinco nós, uma trilha de evidência.
        </p>
      </Section>

      {/* COMPONENTES */}
      <Section id="componentes" eyebrow="Camada 3 · Componentes" title="Vivos, não screenshots."
        intro="Renderizados dos mesmos tokens do produto. ODS Badges com cor oficial ONU, botões pílula, cards hairline.">
        <Eyebrow>ODS Badges (18)</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginTop: 14, marginBottom: 32 }}>
          {tokens.ods.map((o) => <ODSBadge key={o.n} n={o.n} hex={o.hex} label={o.label} />)}
        </div>
        <Eyebrow>Botões</Eyebrow>
        <div style={{ display: "flex", gap: "0.85rem", marginTop: 14, marginBottom: 32, flexWrap: "wrap" }}>
          <button style={{ background: "linear-gradient(135deg,#00E676,#00FF87)", color: "#050505", border: "none", borderRadius: 9999, padding: "0.8rem 1.75rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)" }}>Contratar Squad</button>
          <button style={{ background: "rgba(255,255,255,0.04)", color: "#F3F4F6", border: "1px solid var(--color-border-strong)", borderRadius: 9999, padding: "0.8rem 1.75rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)" }}>Ver metodologia</button>
          <button style={{ background: "#2979FF", color: "#fff", border: "none", borderRadius: 9999, padding: "0.8rem 1.75rem", fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)" }}>Agendar reunião</button>
        </div>
        <Eyebrow>Fit Score Card</Eyebrow>
        <div style={{ marginTop: 14, maxWidth: 360, border: "1px solid var(--color-border)", borderRadius: 16, padding: "1.5rem", background: "#0D0E0E" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
            <span className="font-mono" style={{ fontSize: "3rem", fontWeight: 700, color: "#FFD600", lineHeight: 1 }}>87</span>
            <span className="font-mono" style={{ color: "#4B5563", fontSize: "0.85rem" }}>/100</span>
          </div>
          {[["Skills", 82, "#00E676"], ["ODS", 91, "#FFD600"], ["Contexto", 74, "#2979FF"]].map(([l, v, c]) => (
            <div key={l as string} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", marginBottom: 4 }}>
                <span className="font-mono" style={{ color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l as string}</span>
                <span className="font-mono" style={{ color: c as string }}>{v as number}</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 9999 }}>
                <div style={{ width: `${v}%`, height: "100%", background: c as string, borderRadius: 9999 }} />
              </div>
            </div>
          ))}
        </div>
        <p className="font-mono" style={{ fontSize: "0.7rem", color: "#4B5563", marginTop: 24 }}>
          Componentes-fonte vivem em ../brasil-sustenta/apps/web/src/components/ — este guia espelha o DS v6.
        </p>
      </Section>

      {/* VOZ — glow amarelo (talento / voz encarnada) */}
      <Section id="voz" eyebrow="Camada 4 · Tom de Voz" title="Fala como quem criou a categoria."
        intro="Direto, concreto, categórico, anti-greenwashing, territorial.">
        <SectionGlow color="#FFD600" position="80% 20%" opacity={0.05} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div style={{ border: "1px solid rgba(255,23,68,0.2)", borderRadius: 16, padding: "1.5rem", background: "rgba(255,23,68,0.03)" }}>
            <div className="font-mono" style={{ fontSize: "0.625rem", color: "#FF1744", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>✕ Nunca dizer</div>
            {["startup de impacto", "nossa plataforma de IA", "conectamos talentos e empresas", "acreditamos num mundo melhor", "ecossistema de sustentabilidade"].map((s) => (
              <div key={s} style={{ color: "#9CA3AF", fontSize: "0.85rem", padding: "0.35rem 0", textDecoration: "line-through", textDecorationColor: "rgba(255,23,68,0.5)" }}>{s}</div>
            ))}
          </div>
          <div style={{ border: "1px solid rgba(0,230,118,0.2)", borderRadius: 16, padding: "1.5rem", background: "rgba(0,230,118,0.03)" }}>
            <div className="font-mono" style={{ fontSize: "0.625rem", color: "#00E676", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>✓ Sempre dizer</div>
            {["squad ESG com matching por IA", "Fit Score explicável", "brief → shortlist → squad → relatório", "presença territorial em [cidade]", "entrega auditável"].map((s) => (
              <div key={s} style={{ color: "#F3F4F6", fontSize: "0.85rem", padding: "0.35rem 0" }}>{s}</div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: "1.5rem", border: "1px solid var(--color-border)", borderRadius: 16, padding: "2rem", background: "#0D0E0E", textAlign: "center" }}>
          <Eyebrow>Frase de compra</Eyebrow>
          <p className="font-display" style={{ fontSize: "clamp(1.25rem,3vw,1.9rem)", fontWeight: 700, color: "#F3F4F6", margin: "0.75rem 0 0", lineHeight: 1.15, textTransform: "none", letterSpacing: "-0.02em" }}>
            Transformamos desafios ESG em squads universitários com matching por IA, presença territorial e entregas mensuráveis.
          </p>
        </div>

        {/* Reescrita ao vivo — voz encarnada em antes→depois */}
        <div style={{ marginTop: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Dot />
            <Eyebrow color="#00E676">Reescrita ao vivo</Eyebrow>
          </div>
          <div style={{ display: "grid", gap: "0.85rem" }}>
            {[
              { before: "Conectamos empresas e jovens", after: "Seu desafio ESG vira squad, sprint e relatório" },
              { before: "Nossa plataforma de IA", after: "Fit Score explicável: você vê por que cada match faz sentido" },
              { before: "Coloque sua empresa na vanguarda", after: "Coloque seu município no mapa das cidades ODS 2030" },
            ].map((pair) => (
              <div key={pair.before} className="bs-card" style={{ border: "1px solid var(--color-border)", borderRadius: 16, background: "#0D0E0E", display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "1rem", padding: "1.25rem 1.5rem" }}>
                <span style={{ color: "#4B5563", fontSize: "0.95rem", textDecoration: "line-through", textDecorationColor: "rgba(255,23,68,0.45)" }}>{pair.before}</span>
                <span className="font-mono" style={{ color: "#00E676", fontSize: "1.1rem", lineHeight: 1 }}>→</span>
                <span style={{ color: "#F3F4F6", fontSize: "0.95rem", fontWeight: 600 }}>{pair.after}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* GOVERNANÇA — glow azul (compliance / B2G) */}
      <Section id="governanca" eyebrow="Camada 6 · Governança" title="Quem decide. Como muda."
        intro="Tokens são fonte única. Estratégia/voz/governança vivem no Vault (Obsidian). Este guia renderiza dos tokens — zero drift.">
        <SectionGlow color="#2979FF" position="85% 10%" opacity={0.06} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "1rem", position: "relative" }}>
          {[
            { l: "🔴 Inegociável", c: "#FF1744", b: "Logo, nome, frase de compra, cores de persona, anti-greenwashing. Só Brand Owner via ADR." },
            { l: "🟡 Adaptável", c: "#FFD600", b: "Escala tipográfica, novos componentes, layout, copy por canal. Steward propõe → Owner co-aprova." },
            { l: "🟢 Livre", c: "#00E676", b: "Combinar tokens existentes, conteúdo de página, posts no tom. Executor, sem aprovação." },
          ].map((x) => (
            <div key={x.l} className="bs-card" style={{ border: "1px solid var(--color-border)", borderRadius: 16, padding: "1.5rem", background: "#0D0E0E" }}>
              <div style={{ fontWeight: 700, color: x.c, marginBottom: 8, fontSize: "0.95rem" }}>{x.l}</div>
              <p style={{ fontSize: "0.85rem", color: "#9CA3AF", lineHeight: 1.55, margin: 0 }}>{x.b}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1.5rem", border: "1px solid var(--color-border)", borderRadius: 16, padding: "1.5rem", background: "#0D0E0E" }}>
          <Eyebrow color="#00E676">Fonte da verdade</Eyebrow>
          <p style={{ fontSize: "0.9rem", color: "#9CA3AF", lineHeight: 1.6, margin: "0.5rem 0 0" }}>
            Tokens: <span className="font-mono" style={{ color: "#F3F4F6" }}>src/data/tokens.json</span> (este repo) · sincronizado com{" "}
            <span className="font-mono" style={{ color: "#F3F4F6" }}>../brasil-sustenta/apps/web/src/index.css</span> (produto).<br />
            Estratégia, voz e governança completas: Brand CMS no Obsidian → <span className="font-mono" style={{ color: "#F3F4F6" }}>20-Areas/20.02-Brasil-Sustenta-Venture/Brand/</span>
          </p>
        </div>

        {/* Princípios de movimento — easing oficial demonstrado */}
        <div style={{ marginTop: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <Dot />
            <Eyebrow>Princípios de movimento</Eyebrow>
          </div>
          <p style={{ color: "#9CA3AF", fontSize: "0.9rem", maxWidth: 560, lineHeight: 1.6, margin: "0.5rem 0 1rem" }}>
            Uma curva, todo o sistema. Entrada decisiva, desaceleração suave — confiança sem pressa.
          </p>
          <EaseDemo />
        </div>
      </Section>

      <footer style={{ borderTop: "1px solid var(--color-border)", padding: "3rem 1.5rem", textAlign: "center" }}>
        <Logo size={1.1} />
        <p className="font-mono" style={{ color: "#4B5563", fontSize: "0.7rem", marginTop: "1rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
          Brand System v{tokens._meta.version} · Snapshot {tokens._meta.snapshot} · Agenda 2030 · ODS
        </p>
      </footer>
      </div>
    </div>
  );
}
