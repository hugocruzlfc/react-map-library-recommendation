import type { Theme, LayerVisibility } from "../types";
import { BENCHMARK_STEPS } from "../constants/map";

interface Props {
  theme: Theme;
  onThemeChange: (t: Theme) => void;
  layers: LayerVisibility;
  onToggleLayer: (type: keyof LayerVisibility) => void;
  clustering: boolean;
  onToggleClustering: () => void;
  dotCount: number;
  onStress: (n: number) => void;
  onAddDot: () => void;
  onClear: () => void;
  onBenchmark: () => void;
}

const STRESS_PRESETS = [50, 200, 500, 1000, 2000];

export function ControlPanel({
  theme,
  onThemeChange,
  layers,
  onToggleLayer,
  clustering,
  onToggleClustering,
  dotCount,
  onStress,
  onAddDot,
  onClear,
  onBenchmark,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "10px 16px",
        background: "#12141c",
        borderBottom: "1px solid #ffffff14",
        color: "#e8e9ed",
        fontSize: 13,
        fontFamily: "system-ui, sans-serif",
        flexWrap: "wrap",
      }}
    >
      {/* Theme */}
      <div style={{ display: "flex", gap: 4 }}>
        {(["dark", "light"] as Theme[]).map((t) => (
          <button
            key={t}
            onClick={() => onThemeChange(t)}
            style={btnStyle(theme === t)}
          >
            {t === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        ))}
      </div>

      <Divider />

      {/* Layers */}
      <div style={{ display: "flex", gap: 4 }}>
        <button
          onClick={() => onToggleLayer("motor")}
          style={btnStyle(layers.motor)}
        >
          🚗 Motor
        </button>
        <button
          onClick={() => onToggleLayer("home")}
          style={btnStyle(layers.home)}
        >
          🏠 Home
        </button>
      </div>

      <Divider />

      {/* Clustering */}
      <button
        onClick={onToggleClustering}
        style={btnStyle(clustering)}
      >
        🧬 Clustering {clustering ? "ON" : "OFF"}
      </button>

      <Divider />

      {/* Dot count + stress test */}
      <span style={{ opacity: 0.7 }}>
        Dots: <strong style={{ color: "#fff" }}>{dotCount}</strong>
      </span>
      <select
        value=""
        onChange={(e) => {
          const v = Number(e.target.value);
          if (v) onStress(v);
        }}
        style={selectStyle}
      >
        <option value="">Stress test…</option>
        {STRESS_PRESETS.map((n) => (
          <option
            key={n}
            value={n}
          >
            {n} dots
          </option>
        ))}
      </select>

      <button
        onClick={onAddDot}
        style={btnStyle(false)}
      >
        + Add dot
      </button>
      <button
        onClick={onClear}
        style={btnStyle(false)}
      >
        🗑 Clear
      </button>

      <Divider />

      <button
        onClick={onBenchmark}
        style={{
          ...btnStyle(false),
          background: "#4f7eff22",
          borderColor: "#4f7eff66",
          fontWeight: 600,
        }}
      >
        📊 Run benchmark
      </button>

      <div style={{ marginLeft: "auto", opacity: 0.4, fontSize: 11 }}>
        steps: {BENCHMARK_STEPS.join(" · ")}
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 20, background: "#ffffff1a" }} />;
}

function btnStyle(active: boolean): React.CSSProperties {
  return {
    padding: "6px 10px",
    borderRadius: 6,
    border: `1px solid ${active ? "#4f7eff88" : "#ffffff22"}`,
    background: active ? "#4f7eff33" : "#ffffff0a",
    color: active ? "#fff" : "#c5c7cf",
    cursor: "pointer",
    fontSize: 13,
    transition: "all 0.15s ease",
  };
}

const selectStyle: React.CSSProperties = {
  padding: "6px 8px",
  borderRadius: 6,
  border: "1px solid #ffffff22",
  background: "#1a1c25",
  color: "#e8e9ed",
  fontSize: 13,
};
