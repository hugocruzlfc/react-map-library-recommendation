import { COLORS } from "../constants/map";

export function Legend() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 16,
        left: 16,
        background: "#12141cdd",
        backdropFilter: "blur(6px)",
        border: "1px solid #ffffff14",
        borderRadius: 10,
        padding: "10px 14px",
        color: "#e8e9ed",
        fontSize: 12,
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minWidth: 120,
        pointerEvents: "none",
      }}
    >
      <div
        style={{ fontWeight: 600, opacity: 0.6, fontSize: 11, marginBottom: 2 }}
      >
        LEYENDA
      </div>

      <Row
        color={COLORS.motor}
        label="Motor"
      />
      <Row
        color={COLORS.home}
        label="Home"
      />
      <Row
        color={COLORS.cluster}
        label="Cluster (>10)"
      />
    </div>
  );
}

function Row({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 6px ${color}99`,
          flexShrink: 0,
        }}
      />
      <span>{label}</span>
    </div>
  );
}
