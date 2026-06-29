import { useState, useCallback } from "react";
import type { Dot } from "../types";
import { CITIES } from "../constants/map";

let idCounter = 0;

function randomDot(index: number): Dot {
  const base = CITIES[index % CITIES.length];
  return {
    id: ++idCounter,
    lng: base[0] + (Math.random() - 0.5) * 8,
    lat: Math.max(-75, Math.min(75, base[1] + (Math.random() - 0.5) * 6)),
    type: Math.random() > 0.5 ? "motor" : "home",
  };
}

export function useDots(initialCount = 20) {
  const [dots, setDots] = useState<Dot[]>(() =>
    Array.from({ length: initialCount }, (_, i) => randomDot(i)),
  );

  const addDot = useCallback(() => {
    setDots((prev) => [
      ...prev,
      randomDot(Math.floor(Math.random() * CITIES.length)),
    ]);
  }, []);

  const clearDots = useCallback(() => setDots([]), []);

  const setCount = useCallback((target: number) => {
    setDots((prev) => {
      if (target > prev.length) {
        const extra = Array.from({ length: target - prev.length }, (_, i) =>
          randomDot(prev.length + i),
        );
        return [...prev, ...extra];
      }
      return prev.slice(0, target);
    });
  }, []);

  const removeAndReplace = useCallback((idx: number, newDot: Dot) => {
    setDots((prev) => {
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
    setTimeout(() => {
      setDots((prev) => [...prev, newDot]);
    }, 1500);
  }, []);

  return { dots, addDot, clearDots, setCount, removeAndReplace };
}
