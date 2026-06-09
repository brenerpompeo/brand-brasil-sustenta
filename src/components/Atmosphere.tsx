import type { CSSProperties } from "react";

/**
 * Grão de papel vegetal — overlay fixo, tátil, quase imperceptível.
 * feTurbulence em baseFrequency alto + blend overlay = textura orgânica
 * sobre o preto absoluto. pointer-events none, nunca intercepta clique.
 */
export function Grain() {
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        opacity: 0.04,
        mixBlendMode: "overlay",
      }}
    >
      <svg width="100%" height="100%" style={{ display: "block" }}>
        <filter id="bs-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bs-grain)" />
      </svg>
    </div>
  );
}

/**
 * Glow bioluminescente — fundo de seção, cor semântica por camada.
 * Verde = fundação/impacto · Azul = governança/compliance · Amarelo = talento/voz.
 * Posicionável; opacity contida entre 0.05–0.08 para nunca virar "fundo de bloco".
 */
export function SectionGlow({
  color = "#00E676",
  position = "70% 0%",
  opacity = 0.06,
  size = "55%",
  style,
}: {
  color?: string;
  position?: string;
  opacity?: number;
  size?: string;
  style?: CSSProperties;
}) {
  const rgb = hexToRgb(color);
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: `radial-gradient(ellipse at ${position}, rgba(${rgb},${opacity}) 0%, transparent ${size})`,
        ...style,
      }}
    />
  );
}

/**
 * O "." da assinatura como motivo recorrente — bullet / separador / âncora.
 * Reaparece em eyebrows e divisores; é a marca em miniatura.
 */
export function Dot({
  color = "#00E676",
  size = 6,
  glow = true,
  style,
}: {
  color?: string;
  size?: number;
  glow?: boolean;
  style?: CSSProperties;
}) {
  const rgb = hexToRgb(color);
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: 9999,
        background: color,
        boxShadow: glow ? `0 0 ${size * 1.6}px rgba(${rgb},0.55)` : undefined,
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const n =
    h.length === 3
      ? h.split("").map((c) => c + c).join("")
      : h;
  const int = parseInt(n, 16);
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
}
