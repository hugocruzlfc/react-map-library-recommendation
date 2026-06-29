import { useMemo } from "react";
import type { Dot } from "../types";
import styles from "./perf-monitor.module.css";

interface Props {
  fps: number;
  dots: Dot[];
}

function fpsClass(fps: number) {
  if (fps >= 50) return styles.fpsGood;
  if (fps >= 30) return styles.fpsWarn;
  return styles.fpsBad;
}

export function PerfMonitor({ fps, dots }: Props) {
  const stats = useMemo(() => {
    const motor = dots.filter((d) => d.type === "motor").length;
    const home = dots.length - motor;
    return { total: dots.length, motor, home };
  }, [dots]);

  return (
    <div className={styles.monitor}>
      <div className={styles.fpsRow}>
        <span className={`${styles.fpsValue} ${fpsClass(fps)}`}>{fps}</span>
        <span className={styles.fpsLabel}>fps</span>
      </div>

      <div className={styles.stats}>
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
    <div className={styles.statRow}>
      <span className={styles.statLabel}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
