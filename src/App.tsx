import { useState } from "react";
import type { Theme, LayerVisibility } from "./types";
import { BenchmarkModal } from "./components/benchmark-modal";
import { ControlPanel } from "./components/control-panel";
import { Legend } from "./components/legend";
import { MapView } from "./components/map-view";
import { PerfMonitor } from "./components/perf-monitor";
import { useBenchmark } from "./hooks/use-benchmark";
import { useDots } from "./hooks/use-dots";
import { useFps } from "./hooks/use-fps";

export default function App() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [layers, setLayers] = useState<LayerVisibility>({
    motor: true,
    home: true,
  });
  const [clustering, setClustering] = useState(false);
  const [showBench, setShowBench] = useState(false);

  const { dots, highlightedId, addDot, clearDots, setCount } = useDots(20);
  const fps = useFps();
  const benchmark = useBenchmark(setCount);

  const toggleLayer = (type: keyof LayerVisibility) =>
    setLayers((prev) => ({ ...prev, [type]: !prev[type] }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#0d0f14",
      }}
    >
      <ControlPanel
        theme={theme}
        onThemeChange={setTheme}
        layers={layers}
        onToggleLayer={toggleLayer}
        clustering={clustering}
        onToggleClustering={() => setClustering((v) => !v)}
        dotCount={dots.length}
        onStress={setCount}
        onAddDot={addDot}
        onClear={clearDots}
        onBenchmark={() => {
          setShowBench(true);
          benchmark.run();
        }}
      />

      <div style={{ flex: 1, position: "relative" }}>
        <MapView
          dots={dots}
          theme={theme}
          layers={layers}
          clusteringEnabled={clustering}
          highlightedId={highlightedId}
        />
        <Legend />
        <PerfMonitor
          fps={fps}
          dots={dots}
        />
        {showBench && (
          <BenchmarkModal
            {...benchmark}
            onClose={() => setShowBench(false)}
          />
        )}
      </div>
    </div>
  );
}
