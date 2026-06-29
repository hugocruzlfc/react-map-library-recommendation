import type { Theme } from "../types";

export const CITIES: [number, number][] = [
  [-0.12, 51.5],
  [2.35, 48.85],
  [-3.7, 40.4],
  [13.4, 52.5],
  [-87.6, 41.8],
  [151.2, -33.8],
  [103.8, 1.35],
  [28.9, 41.0],
  [37.6, 55.7],
  [-99.1, 19.4],
  [18.1, 59.3],
  [4.9, 52.4],
  [-43.2, -22.9],
  [144.9, -37.8],
  [126.9, 37.5],
  [72.9, 19.1],
  [31.2, 30.1],
  [8.7, 47.4],
  [-0.2, 5.5],
  [55.3, 25.2],
  [-73.9, 40.7],
  [116.4, 39.9],
  [77.2, 28.6],
  [-46.6, -23.5],
  [139.7, 35.7],
  [24.9, 60.2],
  [14.5, 46.0],
  [-9.1, 38.7],
  [23.7, 37.9],
  [30.5, 50.4],
];

export const TILE_URLS: Record<Theme, string> = {
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",
};

export const COLORS = {
  motor: "#4f7eff",
  home: "#22c98e",
  cluster: "#b44fff",
  accent: "#4f7eff",
};

export const BENCHMARK_STEPS = [100, 250, 500, 750, 1000, 1500, 2000];
