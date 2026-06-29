import { useState, useCallback, useRef } from "react";
import type { Dot } from "../types";
import { CITIES } from "../constants/map";

let idCounter = 0;
const HIGHLIGHT_DURATION = 2200;

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
  const [highlightedId, setHighlightedId] = useState<number | null>(null);
  const highlightTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const flashHighlight = useCallback((id: number) => {
    if (highlightTimer.current) clearTimeout(highlightTimer.current);
    setHighlightedId(id);
    highlightTimer.current = setTimeout(() => {
      setHighlightedId(null);
    }, HIGHLIGHT_DURATION);
  }, []);

  const addDot = useCallback(() => {
    const newDot = randomDot(Math.floor(Math.random() * CITIES.length));
    setDots((prev) => [...prev, newDot]);
    flashHighlight(newDot.id);
  }, [flashHighlight]);

  const clearDots = useCallback(() => {
    setDots([]);
    setHighlightedId(null);
  }, []);

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

  const removeAndReplace = useCallback(
    (idx: number) => {
      setDots((prev) => {
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      });
      setTimeout(() => {
        const newDot = randomDot(Math.floor(Math.random() * CITIES.length));
        setDots((prev) => [...prev, newDot]);
        flashHighlight(newDot.id);
      }, 1500);
    },
    [flashHighlight],
  );

  return { dots, highlightedId, addDot, clearDots, setCount, removeAndReplace };
}
