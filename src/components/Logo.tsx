export function Logo({ size = 1.25 }: { size?: number }) {
  return (
    <span
      className="font-display"
      style={{ display: "flex", flexDirection: "column", lineHeight: 0.88, fontSize: `${size}rem`, fontWeight: 900 }}
    >
      <span style={{ color: "#F3F4F6" }}>BRASIL</span>
      <span style={{ color: "#F3F4F6" }}>
        SUSTENTA<span style={{ color: "#00E676" }}>.</span>
      </span>
    </span>
  );
}
