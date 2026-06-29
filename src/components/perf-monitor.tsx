import { useMemo } from "react";
import type { Dot } from "../types";

interface Props {
  fps: number;
  dots: Dot[];
}

function fpsColor(fps: number) {
  if (fps >= 50) return "#22c98e";
  if (fps >= 30) return "#e0b955";
  return "#e05555";
}

export function PerfMonitor({ fps, dots }: Props) {
  const stats = useMemo(() => {
    const motor = dots.filter((d) => d.type === "motor").length;
    const home = dots.length - motor;
    return { total: dots.length, motor, home };
  }, [dots]);

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        background: "#12141cdd",
        backdropFilter: "blur(6px)",
        border: "1px solid #ffffff14",
        borderRadius: 10,
        padding: "10px 14px",
        color: "#e8e9ed",
        fontSize: 12,
        fontFamily: "ui-monospace, monospace",
        minWidth: 140,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          marginBottom: 8,
        }}
      >
        <span style={{ fontSize: 20, fontWeight: 700, color: fpsColor(fps) }}>
          {fps}
        </span>
        <span style={{ opacity: 0.5 }}>fps</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          opacity: 0.8,
        }}
      >
        <StatRow
          label="Total"
          value={stats.total}
        />
        <StatRow
          label="Motor"
          value={stats.motor}
        />
        <StatRow
          label="Home"
          value={stats.home}
        />
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ opacity: 0.6 }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
