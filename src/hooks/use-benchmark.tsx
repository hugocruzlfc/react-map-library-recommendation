import { useState, useCallback } from "react";
import type { BenchmarkResult } from "../types";
import { BENCHMARK_STEPS } from "../constants/map";

function sampleFps(duration: number): Promise<number> {
  return new Promise((resolve) => {
    let frames = 0;
    const start = performance.now();
    function f(now: number) {
      frames++;
      if (now - start < duration) requestAnimationFrame(f);
      else resolve(Math.round(frames / (duration / 1000)));
    }
    requestAnimationFrame(f);
  });
}

export function useBenchmark(setCount: (n: number) => void) {
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  const run = useCallback(async () => {
    setRunning(true);
    setResults([]);

    for (let i = 0; i < BENCHMARK_STEPS.length; i++) {
      const count = BENCHMARK_STEPS[i];
      setCurrentStep(`Testing ${count} dots…`);
      setProgress(Math.round((i / BENCHMARK_STEPS.length) * 100));
      setCount(count);

      await new Promise((r) => setTimeout(r, 1200)); // settle
      const fps = await sampleFps(800);
      setResults((prev) => [...prev, { count, fps }]);
    }

    setProgress(100);
    setCurrentStep("Complete");
    setRunning(false);
  }, [setCount]);

  const reset = useCallback(() => {
    setResults([]);
    setProgress(0);
    setCurrentStep("");
  }, []);

  return { run, running, results, progress, currentStep, reset };
}
