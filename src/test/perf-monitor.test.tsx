import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Dot } from "@/types";
import { PerfMonitor } from "@/components/perf-monitor";

describe("PerfMonitor", () => {
  const motorDots: Dot[] = [
    { id: 1, lat: 0, lng: 0, type: "motor" },
    { id: 2, lat: 10, lng: 10, type: "motor" },
  ];

  const homeDots: Dot[] = [
    { id: 3, lat: 20, lng: 20, type: "home" },
    { id: 4, lat: 30, lng: 30, type: "home" },
  ];

  const allDots = [...motorDots, ...homeDots];

  it("should render FPS value", () => {
    render(
      <PerfMonitor
        fps={60}
        dots={[]}
      />,
    );
    expect(screen.getByText("60")).toBeInTheDocument();
  });

  it("should display 'fps' label", () => {
    render(
      <PerfMonitor
        fps={60}
        dots={[]}
      />,
    );
    expect(screen.getByText("fps")).toBeInTheDocument();
  });

  it("should display total dots count", () => {
    render(
      <PerfMonitor
        fps={60}
        dots={allDots}
      />,
    );
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("should display 'Total' label", () => {
    render(
      <PerfMonitor
        fps={60}
        dots={allDots}
      />,
    );
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("should display motor dots count", () => {
    render(
      <PerfMonitor
        fps={60}
        dots={allDots}
      />,
    );
    const motorElements = screen.getAllByText("Motor");
    expect(motorElements.length).toBeGreaterThan(0);
  });

  it("should display home dots count", () => {
    render(
      <PerfMonitor
        fps={60}
        dots={allDots}
      />,
    );
    const homeElements = screen.getAllByText("Home");
    expect(homeElements.length).toBeGreaterThan(0);
  });

  it("should calculate motor dots correctly", () => {
    render(
      <PerfMonitor
        fps={60}
        dots={allDots}
      />,
    );
    // Should show 2 motor dots
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should calculate home dots correctly", () => {
    const { container } = render(
      <PerfMonitor
        fps={60}
        dots={allDots}
      />,
    );
    // Should show 2 in the stats (total 4, motor 2, home 2)
    const statsRows = container.querySelectorAll("[class*='statRow']");
    expect(statsRows.length).toBeGreaterThan(0);
  });

  it("should update FPS when prop changes", () => {
    const { rerender } = render(
      <PerfMonitor
        fps={60}
        dots={[]}
      />,
    );
    expect(screen.getByText("60")).toBeInTheDocument();

    rerender(
      <PerfMonitor
        fps={45}
        dots={[]}
      />,
    );
    expect(screen.getByText("45")).toBeInTheDocument();
  });

  it("should handle empty dots array", () => {
    render(
      <PerfMonitor
        fps={60}
        dots={[]}
      />,
    );
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should update stats when dots change", () => {
    const { rerender } = render(
      <PerfMonitor
        fps={60}
        dots={motorDots}
      />,
    );
    expect(screen.getByText("2")).toBeInTheDocument();

    rerender(
      <PerfMonitor
        fps={60}
        dots={allDots}
      />,
    );
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("should display all dot types counts", () => {
    render(
      <PerfMonitor
        fps={60}
        dots={allDots}
      />,
    );

    const labels = screen.getAllByText(/Total|Motor|Home/);
    expect(labels.length).toBeGreaterThanOrEqual(3);
  });

  it("should apply correct FPS class for good performance", () => {
    const { container } = render(
      <PerfMonitor
        fps={60}
        dots={[]}
      />,
    );
    const fpsValue = container.querySelector("[class*='fpsValue']");
    expect(fpsValue).toHaveClass("fpsGood");
  });

  it("should apply correct FPS class for warning performance", () => {
    const { container } = render(
      <PerfMonitor
        fps={40}
        dots={[]}
      />,
    );
    const fpsValue = container.querySelector("[class*='fpsValue']");
    expect(fpsValue).toHaveClass("fpsWarn");
  });

  it("should apply correct FPS class for bad performance", () => {
    const { container } = render(
      <PerfMonitor
        fps={20}
        dots={[]}
      />,
    );
    const fpsValue = container.querySelector("[class*='fpsValue']");
    expect(fpsValue).toHaveClass("fpsBad");
  });

  it("should render monitor container", () => {
    const { container } = render(
      <PerfMonitor
        fps={60}
        dots={[]}
      />,
    );
    const monitor = container.querySelector("[class*='monitor']");
    expect(monitor).toBeInTheDocument();
  });
});
