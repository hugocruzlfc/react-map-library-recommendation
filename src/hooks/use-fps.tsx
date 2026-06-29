import { useEffect, useState } from "react";

export function useFps() {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let raf: number;

    function tick(now: number) {
      frames++;
      if (now - last >= 500) {
        setFps(Math.round(frames / ((now - last) / 1000)));
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return fps;
}
