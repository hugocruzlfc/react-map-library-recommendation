import { Marker } from "react-map-gl/maplibre";
import type { DotType } from "../types";
import { COLORS } from "../constants/map";
import styles from "./glow-marker.module.css";

interface Props {
  lng: number;
  lat: number;
  type: DotType;
}

/**
 * Marker animado con efecto "glow/pulse", pensado para resaltar
 * dots recién agregados o reemplazados (ver useDots.removeAndReplace).
 * No se usa para renderizar todos los dots (eso lo hace la capa
 * circle en MapView por rendimiento) — solo para destacar puntos puntuales.
 */
export function GlowMarker({ lng, lat, type }: Props) {
  const color = COLORS[type];

  return (
    <Marker
      longitude={lng}
      latitude={lat}
    >
      <div className={styles.wrapper}>
        <span
          className={styles.ring}
          style={{ background: color }}
        />
        <span
          className={styles.core}
          style={{ background: color }}
        />
      </div>
    </Marker>
  );
}
