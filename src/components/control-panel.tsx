import type { Theme, LayerVisibility } from "../types";
import { BENCHMARK_STEPS } from "../constants/map";
import styles from "./control-panel.module.css";

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

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

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
    <div className={styles.panel}>
      {/* Theme */}
      <div className={styles.group}>
        {(["dark", "light"] as Theme[]).map((t) => (
          <button
            key={t}
            onClick={() => onThemeChange(t)}
            className={cx(styles.btn, theme === t && styles.btnActive)}
          >
            {t === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        ))}
      </div>

      <div className={styles.divider} />

      {/* Layers */}
      <div className={styles.group}>
        <button
          onClick={() => onToggleLayer("motor")}
          className={cx(styles.btn, layers.motor && styles.btnActive)}
        >
          🚗 Motor
        </button>
        <button
          onClick={() => onToggleLayer("home")}
          className={cx(styles.btn, layers.home && styles.btnActive)}
        >
          🏠 Home
        </button>
      </div>

      <div className={styles.divider} />

      {/* Clustering */}
      <button
        onClick={onToggleClustering}
        className={cx(styles.btn, clustering && styles.btnActive)}
      >
        🧬 Clustering {clustering ? "ON" : "OFF"}
      </button>

      <div className={styles.divider} />

      {/* Dot count + stress test */}
      <span className={styles.count}>
        Dots: <strong className={styles.countValue}>{dotCount}</strong>
      </span>
      <select
        value=""
        onChange={(e) => {
          const v = Number(e.target.value);
          if (v) onStress(v);
        }}
        className={styles.select}
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
        className={styles.btn}
      >
        + Add dot
      </button>
      <button
        onClick={onClear}
        className={styles.btn}
      >
        🗑 Clear
      </button>

      <div className={styles.divider} />

      <button
        onClick={onBenchmark}
        className={cx(styles.btn, styles.btnBenchmark)}
      >
        📊 Run benchmark
      </button>

      <div className={styles.steps}>steps: {BENCHMARK_STEPS.join(" · ")}</div>
    </div>
  );
}
