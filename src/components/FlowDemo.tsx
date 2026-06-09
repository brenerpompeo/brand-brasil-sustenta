import { motion, useReducedMotion } from "framer-motion";
import { Dot } from "./Atmosphere";

const EASE = [0.16, 1, 0.3, 1] as const;

type Node = {
  label: string;
  hint: string;
  color: string;
  badge?: string;
};

const NODES: Node[] = [
  { label: "Brief", hint: "Desafio ESG entra", color: "#00E676" },
  { label: "Shortlist", hint: "IA filtra candidatos", color: "#FFD600" },
  { label: "Squad", hint: "Fit Score 87", color: "#FFD600", badge: "87" },
  { label: "Sprint", hint: "Execução territorial", color: "#2979FF" },
  { label: "Relatório", hint: "Evidência auditável", color: "#00E676" },
];

/**
 * Fluxo operacional animado — didática por movimento (lição n8n).
 * Cada nó acende em sequência; a linha conectora "preenche" via scaleX.
 * O sistema É a explicação: o leitor vê o método antes de ler sobre ele.
 */
export function FlowDemo() {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.18, delayChildren: 0.1 },
    },
  };

  const nodeVariant = {
    hidden: { opacity: 0, y: reduced ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 0,
        flexWrap: "wrap",
        border: "1px solid var(--color-border)",
        borderRadius: 24,
        padding: "2rem 1.5rem",
        background: "#0D0E0E",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {NODES.map((node, i) => (
        <div
          key={node.label}
          style={{
            display: "flex",
            alignItems: "center",
            flex: "1 1 160px",
            minWidth: 120,
          }}
        >
          <motion.div
            variants={nodeVariant}
            style={{ flex: 1, textAlign: "center", position: "relative" }}
          >
            <NodeDot color={node.color} active={!!node.badge} reduced={!!reduced} />
            <div
              className="font-display"
              style={{
                fontSize: "1.15rem",
                color: "#F3F4F6",
                marginTop: 14,
                letterSpacing: "-0.02em",
              }}
            >
              {node.label}
            </div>
            <div
              className="font-mono"
              style={{
                fontSize: "0.625rem",
                color: node.badge ? node.color : "#4B5563",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginTop: 6,
              }}
            >
              {node.badge ? `Fit Score ${node.badge}` : node.hint}
            </div>
          </motion.div>

          {i < NODES.length - 1 && (
            <div
              aria-hidden
              style={{
                position: "relative",
                height: 2,
                flex: "0 0 24px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 9999,
                alignSelf: "center",
                marginTop: 8,
                overflow: "hidden",
              }}
            >
              <motion.div
                variants={{
                  hidden: { scaleX: reduced ? 1 : 0 },
                  show: {
                    scaleX: 1,
                    transition: { duration: 0.45, ease: EASE },
                  },
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  transformOrigin: "left center",
                  background: `linear-gradient(90deg, ${node.color}, ${
                    NODES[i + 1].color
                  })`,
                  borderRadius: 9999,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}

function NodeDot({
  color,
  active,
  reduced,
}: {
  color: string;
  active: boolean;
  reduced: boolean;
}) {
  const rgb = hexToRgb(color);
  return (
    <div
      style={{
        width: active ? 52 : 40,
        height: active ? 52 : 40,
        margin: "0 auto",
        borderRadius: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: active
          ? `radial-gradient(circle, rgba(${rgb},0.18), transparent 70%)`
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${active ? color : "var(--color-border-strong)"}`,
        position: "relative",
      }}
    >
      {active && !reduced && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0.5, scale: 0.9 }}
          animate={{ opacity: [0.5, 0, 0.5], scale: [0.9, 1.6, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: -1,
            borderRadius: 9999,
            border: `1px solid ${color}`,
          }}
        />
      )}
      <Dot color={color} size={active ? 12 : 9} />
    </div>
  );
}

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const int = parseInt(h, 16);
  return `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
}
