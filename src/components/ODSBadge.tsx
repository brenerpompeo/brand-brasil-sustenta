export function ODSBadge({ n, hex, label, size = 40 }: { n: number; hex: string; label?: string; size?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }} title={label ? `ODS ${n}: ${label}` : `ODS ${n}`}>
      <div
        style={{
          width: size, height: size, borderRadius: 9999, background: hex, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700,
          fontSize: size * 0.36, fontFamily: "var(--font-mono)", flexShrink: 0,
        }}
      >
        {n}
      </div>
    </div>
  );
}
