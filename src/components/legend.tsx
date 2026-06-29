import { COLORS } from "../constants/map";
import styles from "./legend.module.css";

export function Legend() {
  return (
    <div className={styles.legend}>
      <div className={styles.title}>LEYENDA</div>

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
    <div className={styles.row}>
      <span
        className={styles.dot}
        style={{ background: color, boxShadow: `0 0 6px ${color}99` }}
      />
      <span>{label}</span>
    </div>
  );
}
