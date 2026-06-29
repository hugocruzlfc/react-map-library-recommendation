import type { BenchmarkResult } from "../types";

interface Props {
  running: boolean;
  results: BenchmarkResult[];
  progress: number;
  currentStep: string;
  reset: () => void;
  onClose: () => void;
}

function fpsColor(fps: number) {
  if (fps >= 50) return "#22c98e";
  if (fps >= 30) return "#e0b955";
  return "#e05555";
}

export function BenchmarkModal({
  running,
  results,
  progress,
  currentStep,
  reset,
  onClose,
}: Props) {
  const maxFps = Math.max(60, ...results.map((r) => r.fps));

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#000000aa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !running) onClose();
      }}
    >
      <div
        style={{
          background: "#12141c",
          border: "1px solid #ffffff1a",
          borderRadius: 14,
          padding: 24,
          width: 420,
          color: "#e8e9ed",
          fontFamily: "system-ui, sans-serif",
          boxShadow: "0 20px 60px #00000080",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h3 style={{ margin: 0, fontSize: 16 }}>
            📊 Benchmark de rendimiento
          </h3>
          {!running && (
            <button
              onClick={onClose}
              style={closeBtnStyle}
            >
              ✕
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: 8, fontSize: 12, opacity: 0.7 }}>
          {running
            ? currentStep
            : results.length
              ? "Completado"
              : "Listo para empezar"}
        </div>
        <div
          style={{
            height: 6,
            background: "#ffffff14",
            borderRadius: 3,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "#4f7eff",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* Results table */}
        {results.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginBottom: 20,
            }}
          >
            {results.map((r) => (
              <div
                key={r.count}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <span
                  style={{
                    width: 56,
                    fontSize: 12,
                    opacity: 0.6,
                    textAlign: "right",
                  }}
                >
                  {r.count}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 14,
                    background: "#ffffff0f",
                    borderRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(100, (r.fps / maxFps) * 100)}%`,
                      background: fpsColor(r.fps),
                      borderRadius: 4,
                    }}
                  />
                </div>
                <span
                  style={{
                    width: 40,
                    fontSize: 12,
                    fontWeight: 600,
                    color: fpsColor(r.fps),
                  }}
                >
                  {r.fps}
                </span>
              </div>
            ))}
          </div>
        )}

        {!running && results.length > 0 && (
          <button
            onClick={reset}
            style={resetBtnStyle}
          >
            ↺ Reiniciar benchmark
          </button>
        )}
      </div>
    </div>
  );
}

const closeBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#e8e9ed",
  opacity: 0.6,
  cursor: "pointer",
  fontSize: 14,
};

const resetBtnStyle: React.CSSProperties = {
  width: "100%",
  padding: "8px 0",
  borderRadius: 8,
  border: "1px solid #ffffff22",
  background: "#ffffff0a",
  color: "#e8e9ed",
  cursor: "pointer",
  fontSize: 13,
};
