export type Theme = "dark" | "light";
export type DotType = "motor" | "home";

export interface Dot {
  id: number;
  lng: number;
  lat: number;
  type: DotType;
}

export interface LayerVisibility {
  motor: boolean;
  home: boolean;
}

export interface BenchmarkResult {
  count: number;
  fps: number;
}
