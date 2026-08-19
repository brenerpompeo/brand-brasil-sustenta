import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionGlow } from "../components/Atmosphere";

const EASE = [0.16, 1, 0.3, 1] as const;

interface SwatchItem {
  name: string;
  role: string;
  hex: string;
  glowColor: string;
}

const PATRIA_SWATCHES: SwatchItem[] = [
  { name: "Leaf", role: "Verde Amazônia", hex: "#00E676", glowColor: "rgba(0,230,118,0.4)" },
  { name: "Atlantic", role: "Azul Atlântico", hex: "#2979FF", glowColor: "rgba(41,121,255,0.4)" },
  { name: "Sun", role: "Amarelo Solar", hex: "#FFD600", glowColor: "rgba(255,214,0,0.4)" },
  { name: "Clay", role: "Vermelho Alerta", hex: "#FF1744", glowColor: "rgba(255,23,68,0.4)" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => {
      setCopiedHex(null);
    }, 1500);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduced ? 0 : 25, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <section
      id="hero"
      aria-label="Introdução Hero Monumental Brasil Sustenta"
      className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden"
    >
      {/* Bioluminescência Atmosférica Suave Cirdia */}
      <SectionGlow color="#00E676" position="50% 15%" opacity={0.05} size="50%" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-[radial-gradient(circle_at_center,_rgba(0,230,118,0.07)_0%,_rgba(41,121,255,0.03)_50%,_transparent_75%)] blur-3xl"
      />

      <motion.div
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: reduced ? 0 : 0.08, delayChildren: 0.05 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 relative text-center"
      >
        {/* Eyebrow em Cápsula com Dot Bioluminescente Verde */}
        <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: EASE }} className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none">
            <span className="size-2 rounded-full bg-[#00E676] animate-pulse shadow-[0_0_8px_#00E676]" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.20em] text-white/80 font-medium">
              Obsidian V8 · Fonte Única de Marca
            </span>
          </div>
        </motion.div>

        {/* Headline Escultural Monumental em Antonio Display Puro Sólido (#F3F4F6) */}
        <motion.h1
          variants={fadeUp}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-black uppercase tracking-[-0.04em] leading-[0.88] text-[#F3F4F6] mb-6"
        >
          DESIGN SYSTEM<br />
          <span className="text-[#F3F4F6]">
            ALTO LUXO PÁTRIA<span className="text-[#00E676] inline-block ml-0.5">.</span>
          </span>
        </motion.h1>

        {/* Subtítulo Editorial em Outfit */}
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-base sm:text-lg md:text-xl text-[#9CA3AF] font-body font-light leading-[1.65] max-w-2xl mx-auto mb-10"
        >
          A arquitetura visual e os tokens definitivos do <strong className="text-white font-medium">Brasil Sustenta</strong>. 
          Onde a precisão algorítmica da inteligência territorial encontra o minimalismo contemporâneo de alto luxo.
        </motion.p>

        {/* Ações Primárias em Cápsula com Touch Target Mínimo de 44px */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-16"
        >
          <a
            href="#sistema-cromatico"
            style={{ textDecoration: "none" }}
            className="relative inline-flex items-center justify-center gap-2 px-8 min-h-[44px] h-12 rounded-full bg-white text-[#08090A] text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-[#00E676] active:scale-[0.98] shadow-[0_0_24px_rgba(255,255,255,0.12)] hover:shadow-[0_0_28px_rgba(0,230,118,0.35)] select-none"
          >
            <span>Explorar Tokens & Cores</span>
            <span className="text-sm" aria-hidden="true">↓</span>
          </a>

          <a
            href="#componentes-bento"
            style={{ textDecoration: "none" }}
            className="inline-flex items-center justify-center gap-2 px-7 min-h-[44px] h-12 rounded-full bg-white/[0.04] text-white/90 hover:text-white border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.07] text-xs font-medium uppercase tracking-wider transition-all duration-300 select-none"
          >
            <span>Biblioteca UI</span>
            <span className="text-sm text-white/50" aria-hidden="true">→</span>
          </a>
        </motion.div>

        {/* Bento Showcase Card ao Vivo (3 Colunas de Dados Visuais) */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative rounded-3xl bg-[#121417]/90 backdrop-blur-2xl border border-white/[0.08] p-6 md:p-8 text-left shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden"
        >
          {/* Iluminação de Fundo do Bento Card */}
          <div className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-[#00E676]/[0.05] blur-3xl" aria-hidden="true" />

          {/* Header do Bento Showcase Card */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/[0.06] mb-6">
            <div className="flex items-center gap-2.5">
              <span className="size-2 rounded-full bg-[#00E676] animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
                LIVESTACK · TOKENS V8.0
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-white/40">
              <span className="text-white/30">SHA-256:</span>
              <span className="text-[#00E676] font-medium bg-[#00E676]/10 px-2 py-0.5 rounded border border-[#00E676]/20">
                8cfea8b...verified
              </span>
            </div>
          </div>

          {/* 3 Colunas de Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Coluna 1: Cores Pátria & Swatches Interativos */}
            <div className="p-4 rounded-2xl bg-[#08090A]/60 border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 font-medium">
                    01 · CORES PÁTRIA
                  </span>
                  {copiedHex && (
                    <span className="font-mono text-[10px] text-[#00E676] font-medium animate-pulse">
                      HEX COPIADO!
                    </span>
                  )}
                </div>

                {/* Grid dos 4 Swatches Interativos com Touch Target Adequado */}
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {PATRIA_SWATCHES.map((swatch) => {
                    const isCopied = copiedHex === swatch.hex;
                    return (
                      <button
                        key={swatch.name}
                        type="button"
                        onClick={() => copyToClipboard(swatch.hex)}
                        title={`Clique para copiar ${swatch.role} (${swatch.hex})`}
                        className="group flex flex-col items-center gap-1.5 p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-white/[0.12] transition-all cursor-pointer select-none"
                      >
                        <div
                          className="size-7 rounded-full transition-transform group-hover:scale-110 group-active:scale-95 shadow-sm"
                          style={{
                            backgroundColor: swatch.hex,
                            boxShadow: `0 0 10px ${swatch.glowColor}`,
                          }}
                        />
                        <span className="font-mono text-[9px] text-white/70 group-hover:text-white font-medium">
                          {isCopied ? "✓" : swatch.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="text-[11px] text-white/40 font-light leading-relaxed pt-2 border-t border-white/[0.04]">
                Acentos de luminância cirúrgicos contidos em ≤5% da composição.
              </p>
            </div>

            {/* Coluna 2: Hierarquia Tipográfica */}
            <div className="p-4 rounded-2xl bg-[#08090A]/60 border border-white/[0.06] flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 block mb-3 font-medium">
                  02 · TIPOGRAFIA
                </span>
                
                <div className="space-y-2.5">
                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="font-display text-lg font-bold text-white tracking-tight uppercase leading-none">
                      ANTONIO DISPLAY
                    </div>
                    <span className="font-mono text-[9px] text-white/30 block mt-1">
                      700/900 · H1/H2 All-Caps (-0.04em)
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="font-body text-xs text-[#E5E7EB] font-light leading-snug">
                      Outfit Body · Editorial arejado (lh 1.65)
                    </div>
                    <span className="font-mono text-[9px] text-white/30 block mt-0.5">
                      300/400/500 · Leitura & Labels
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="font-mono text-[11px] text-[#00E676] font-medium tracking-wider">
                      LAT -22.9068° · 94.8% FIT
                    </div>
                    <span className="font-mono text-[9px] text-white/30 block mt-0.5">
                      Geist Mono · Scores & Metadados
                    </span>
                  </div>
                </div>
              </div>

              <span className="font-mono text-[10px] text-white/30 block mt-3 pt-2 border-t border-white/[0.04]">
                Matriz escultural sem conflito de pesos
              </span>
            </div>

            {/* Coluna 3: Elevação Tonal & Hairlines 1px */}
            <div className="p-4 rounded-2xl bg-[#08090A]/60 border border-white/[0.06] flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 block mb-3 font-medium">
                  03 · ELEVAÇÃO TONAL & HAIRLINES
                </span>

                {/* Camadas Físicas de Elevação */}
                <div className="space-y-1.5 mb-3">
                  <div className="p-2 rounded-lg bg-[#1C1F24] border border-white/[0.14] flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white font-medium">#1C1F24</span>
                    <span className="font-mono text-[9px] text-white/50 uppercase">Active / Hover</span>
                  </div>

                  <div className="p-2 rounded-lg bg-[#121417] border border-white/[0.08] flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white/80 font-medium">#121417</span>
                    <span className="font-mono text-[9px] text-white/40 uppercase">Card Surface</span>
                  </div>

                  <div className="p-2 rounded-lg bg-[#08090A] border border-white/[0.06] flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white/60 font-medium">#08090A</span>
                    <span className="font-mono text-[9px] text-white/30 uppercase">Base Canvas</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between font-mono text-[10px] text-white/40">
                <span>Hairline Grid:</span>
                <span className="text-[#F3F4F6] font-medium">1px suíço</span>
              </div>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
