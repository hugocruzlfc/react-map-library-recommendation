import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { LayerVisibility, Theme } from "@/types";
import { ControlPanel } from "@/components/control-panel";

describe("ControlPanel", () => {
  const defaultProps = {
    theme: "dark" as Theme,
    onThemeChange: vi.fn(),
    layers: { motor: true, home: true } as LayerVisibility,
    onToggleLayer: vi.fn(),
    clustering: false,
    onToggleClustering: vi.fn(),
    dotCount: 100,
    onStress: vi.fn(),
    onAddDot: vi.fn(),
    onClear: vi.fn(),
    onBenchmark: vi.fn(),
  };

  it("should render all theme buttons", () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText(/🌙 Dark/)).toBeInTheDocument();
    expect(screen.getByText(/☀️ Light/)).toBeInTheDocument();
  });

  it("should call onThemeChange when theme button is clicked", () => {
    const onThemeChange = vi.fn();
    render(
      <ControlPanel
        {...defaultProps}
        onThemeChange={onThemeChange}
      />,
    );

    const lightButton = screen.getByText(/☀️ Light/);
    fireEvent.click(lightButton);

    expect(onThemeChange).toHaveBeenCalledWith("light");
  });

  it("should highlight active theme button", () => {
    render(
      <ControlPanel
        {...defaultProps}
        theme="dark"
      />,
    );
    const darkButton = screen.getByText(/🌙 Dark/).closest("button");
    expect(darkButton).toHaveClass("btnActive");
  });

  it("should render layer toggle buttons", () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText(/🚗 Motor/)).toBeInTheDocument();
    expect(screen.getByText(/🏠 Home/)).toBeInTheDocument();
  });

  it("should call onToggleLayer when layer button is clicked", () => {
    const onToggleLayer = vi.fn();
    render(
      <ControlPanel
        {...defaultProps}
        onToggleLayer={onToggleLayer}
      />,
    );

    const motorButton = screen.getByText(/🚗 Motor/);
    fireEvent.click(motorButton);

    expect(onToggleLayer).toHaveBeenCalledWith("motor");
  });

  it("should render clustering toggle button", () => {
    render(
      <ControlPanel
        {...defaultProps}
        clustering={false}
      />,
    );
    expect(screen.getByText(/🧬 Clustering OFF/)).toBeInTheDocument();
  });

  it("should update clustering text when enabled", () => {
    render(
      <ControlPanel
        {...defaultProps}
        clustering={true}
      />,
    );
    expect(screen.getByText(/🧬 Clustering ON/)).toBeInTheDocument();
  });

  it("should call onToggleClustering when button is clicked", () => {
    const onToggleClustering = vi.fn();
    render(
      <ControlPanel
        {...defaultProps}
        onToggleClustering={onToggleClustering}
      />,
    );

    const clusterButton = screen.getByText(/🧬/);
    fireEvent.click(clusterButton);

    expect(onToggleClustering).toHaveBeenCalled();
  });

  it("should display dot count", () => {
    render(
      <ControlPanel
        {...defaultProps}
        dotCount={250}
      />,
    );
    expect(screen.getByText("250")).toBeInTheDocument();
  });

  it("should update dot count when prop changes", () => {
    const { rerender } = render(
      <ControlPanel
        {...defaultProps}
        dotCount={100}
      />,
    );
    expect(screen.getByText("100")).toBeInTheDocument();

    rerender(
      <ControlPanel
        {...defaultProps}
        dotCount={500}
      />,
    );
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("should render stress test select", () => {
    render(<ControlPanel {...defaultProps} />);
    const select = screen.getByDisplayValue("Stress test…");
    expect(select).toBeInTheDocument();
  });

  it("should call onStress with preset value when selected", () => {
    const onStress = vi.fn();
    render(
      <ControlPanel
        {...defaultProps}
        onStress={onStress}
      />,
    );

    const select = screen.getByDisplayValue(
      "Stress test…",
    ) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "500" } });

    expect(onStress).toHaveBeenCalledWith(500);
  });

  it("should render add dot and clear buttons", () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText(/➕ Add/)).toBeInTheDocument();
    expect(screen.getByText(/🗑️ Clear/)).toBeInTheDocument();
  });

  it("should call onAddDot when add button is clicked", () => {
    const onAddDot = vi.fn();
    render(
      <ControlPanel
        {...defaultProps}
        onAddDot={onAddDot}
      />,
    );

    const addButton = screen.getByText(/➕ Add/);
    fireEvent.click(addButton);

    expect(onAddDot).toHaveBeenCalled();
  });

  it("should call onClear when clear button is clicked", () => {
    const onClear = vi.fn();
    render(
      <ControlPanel
        {...defaultProps}
        onClear={onClear}
      />,
    );

    const clearButton = screen.getByText(/🗑️ Clear/);
    fireEvent.click(clearButton);

    expect(onClear).toHaveBeenCalled();
  });

  it("should call onBenchmark when benchmark button is clicked", () => {
    const onBenchmark = vi.fn();
    render(
      <ControlPanel
        {...defaultProps}
        onBenchmark={onBenchmark}
      />,
    );

    const benchmarkButton = screen.getByText(/📊 Benchmark/);
    fireEvent.click(benchmarkButton);

    expect(onBenchmark).toHaveBeenCalled();
  });

  it("should highlight active layers", () => {
    render(
      <ControlPanel
        {...defaultProps}
        layers={{ motor: true, home: false }}
      />,
    );

    const motorButton = screen.getByText(/🚗 Motor/).closest("button");
    expect(motorButton).toHaveClass("btnActive");
  });
});
