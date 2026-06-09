import { useState, type ReactNode } from "react";

export function Eyebrow({ children, color = "#9CA3AF" }: { children: ReactNode; color?: string }) {
  return (
    <p
      className="font-mono"
      style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em", color }}
    >
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="font-display"
      style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.0, color: "#F3F4F6", margin: "0.75rem 0 1.5rem" }}
    >
      {children}
    </h2>
  );
}

export function Section({ id, eyebrow, title, intro, children }: {
  id: string; eyebrow: string; title: ReactNode; intro?: ReactNode; children: ReactNode;
}) {
  return (
    <section id={id} style={{ borderTop: "1px solid var(--color-border)", padding: "5rem 0" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 1.5rem" }}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionTitle>{title}</SectionTitle>
        {intro && <p style={{ color: "#9CA3AF", fontSize: "1.0625rem", maxWidth: 640, lineHeight: 1.6, marginBottom: "2.5rem" }}>{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function CopyChip({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
      title="Copiar"
      className="font-mono"
      style={{
        cursor: "pointer", border: "1px solid var(--color-border-strong)", background: "rgba(255,255,255,0.02)",
        color: copied ? "#00E676" : "#9CA3AF", fontSize: "0.6875rem", padding: "0.25rem 0.6rem",
        borderRadius: 6, transition: "all 0.2s",
      }}
    >
      {copied ? "copiado ✓" : (label ?? value)}
    </button>
  );
}
