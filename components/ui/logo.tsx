// Wordmark. The "V" carries the oxblood accent so the brand reads in one glance
// even at nav size, without needing an image file.
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span
      className="display"
      style={{
        fontSize: compact ? "1.05rem" : "1.25rem",
        letterSpacing: "-0.01em",
        lineHeight: 1,
        display: "inline-flex",
        alignItems: "baseline",
        gap: "0.28em",
      }}
    >
      <span>Rocky&rsquo;s</span>
      <span style={{ color: "var(--ox-300)" }}>Vision</span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62em",
          letterSpacing: "0.14em",
          color: "var(--cream-faint)",
          textTransform: "uppercase",
        }}
      >
        AI
      </span>
    </span>
  );
}
