import { motion, useReducedMotion } from "framer-motion";
import tokens from "../data/tokens.json";
import { Eyebrow } from "./primitives";
import { Dot } from "./Atmosphere";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Demonstra a curva de easing oficial — cubic-bezier(0.16,1,0.3,1).
 * Um quadrado percorre o trilho em loop; a mesma curva que o produto usa.
 * Motion como princípio visível, não decoração.
 */
export function EaseDemo() {
  const reduced = useReducedMotion();

  return (
    <div
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: 16,
        padding: "1.5rem",
        background: "#0D0E0E",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "1.25rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Dot />
        <Eyebrow color="#00E676">Curva oficial</Eyebrow>
      </div>

      <div
        style={{
          position: "relative",
          height: 44,
          background: "rgba(255,255,255,0.03)",
          borderRadius: 9999,
          border: "1px solid var(--color-border)",
          overflow: "hidden",
          padding: 6,
        }}
      >
        <motion.div
          initial={{ x: 0 }}
          animate={reduced ? { x: 0 } : { x: "calc(100% - 32px)" }}
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 1.4,
                  ease: EASE,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.3,
                }
          }
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg,#00E676,#00FF87)",
            boxShadow: "0 0 16px rgba(0,230,118,0.5)",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <div>
          <div
            className="font-mono"
            style={{ fontSize: "0.8rem", color: "#F3F4F6" }}
          >
            {tokens.motion.ease}
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: "0.625rem",
              color: "#4B5563",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginTop: 4,
            }}
          >
            easing · ease-out-expo
          </div>
        </div>
        <div>
          <div
            className="font-mono"
            style={{ fontSize: "0.8rem", color: "#F3F4F6" }}
          >
            {tokens.motion.duration}
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: "0.625rem",
              color: "#4B5563",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginTop: 4,
            }}
          >
            duração
          </div>
        </div>
      </div>

      <p
        className="font-mono"
        style={{
          fontSize: "0.7rem",
          color: "#4B5563",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Anima só {tokens.motion.properties}. Tudo respeita prefers-reduced-motion.
      </p>
    </div>
  );
}
