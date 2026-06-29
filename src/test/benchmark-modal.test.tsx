import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { BenchmarkResult } from "@/types";
import { BenchmarkModal } from "@/components/benchmark-modal";

describe("BenchmarkModal", () => {
  const defaultProps = {
    running: false,
    results: [] as BenchmarkResult[],
    progress: 0,
    currentStep: "",
    reset: vi.fn(),
    onClose: vi.fn(),
  };

  it("should render benchmark title", () => {
    render(<BenchmarkModal {...defaultProps} />);
    expect(screen.getByText(/📊 Benchmark de rendimiento/)).toBeInTheDocument();
  });

  it("should show close button when not running", () => {
    render(
      <BenchmarkModal
        {...defaultProps}
        running={false}
      />,
    );
    const closeBtn = screen.getByText("✕");
    expect(closeBtn).toBeInTheDocument();
  });

  it("should not show close button when running", () => {
    render(
      <BenchmarkModal
        {...defaultProps}
        running={true}
      />,
    );
    const buttons = screen.queryAllByText("✕");
    expect(buttons.length).toBe(0);
  });

  it("should call onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(
      <BenchmarkModal
        {...defaultProps}
        running={false}
        onClose={onClose}
      />,
    );

    const closeBtn = screen.getByText("✕");
    fireEvent.click(closeBtn);

    expect(onClose).toHaveBeenCalled();
  });

  it("should display current step when running", () => {
    render(
      <BenchmarkModal
        {...defaultProps}
        running={true}
        currentStep="Testing 500 dots..."
      />,
    );
    expect(screen.getByText("Testing 500 dots...")).toBeInTheDocument();
  });

  it("should show 'Completado' when not running and has results", () => {
    const results: BenchmarkResult[] = [{ count: 100, fps: 60 }];
    render(
      <BenchmarkModal
        {...defaultProps}
        running={false}
        results={results}
      />,
    );
    expect(screen.getByText("Completado")).toBeInTheDocument();
  });

  it("should show 'Listo para empezar' when no results", () => {
    render(
      <BenchmarkModal
        {...defaultProps}
        running={false}
        results={[]}
      />,
    );
    expect(screen.getByText("Listo para empezar")).toBeInTheDocument();
  });

  it("should display progress bar width based on progress prop", () => {
    const { container } = render(
      <BenchmarkModal
        {...defaultProps}
        progress={50}
      />,
    );

    const progressDiv = container.querySelector(
      "div[style*='width']",
    ) as HTMLElement;
    expect(progressDiv).toHaveStyle("width: 50%");
  });

  it("should render benchmark results", () => {
    const results: BenchmarkResult[] = [
      { count: 100, fps: 60 },
      { count: 500, fps: 45 },
      { count: 1000, fps: 30 },
    ];

    render(
      <BenchmarkModal
        {...defaultProps}
        running={false}
        results={results}
      />,
    );

    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("1000")).toBeInTheDocument();
  });

  it("should display FPS values in results", () => {
    const results: BenchmarkResult[] = [
      { count: 100, fps: 60 },
      { count: 500, fps: 45 },
    ];

    render(
      <BenchmarkModal
        {...defaultProps}
        running={false}
        results={results}
      />,
    );

    expect(screen.getByText("60")).toBeInTheDocument();
    expect(screen.getByText("45")).toBeInTheDocument();
  });

  it("should close modal when clicking outside when not running", () => {
    const onClose = vi.fn();
    const { container } = render(
      <BenchmarkModal
        {...defaultProps}
        running={false}
        onClose={onClose}
      />,
    );

    const backdrop = container.querySelector(
      "div[style*='position: absolute']",
    ) as HTMLElement;
    fireEvent.click(backdrop);

    expect(onClose).toHaveBeenCalled();
  });

  it("should not close modal when clicking outside while running", () => {
    const onClose = vi.fn();
    const { container } = render(
      <BenchmarkModal
        {...defaultProps}
        running={true}
        onClose={onClose}
      />,
    );

    const backdrop = container.querySelector(
      "div[style*='position: absolute']",
    ) as HTMLElement;
    fireEvent.click(backdrop);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("should render reset button", () => {
    const results: BenchmarkResult[] = [{ count: 100, fps: 60 }];
    render(
      <BenchmarkModal
        {...defaultProps}
        running={false}
        results={results}
      />,
    );

    const resetBtn = screen.getByText(/🔄 Reset/);
    expect(resetBtn).toBeInTheDocument();
  });

  it("should call reset when reset button is clicked", () => {
    const reset = vi.fn();
    const results: BenchmarkResult[] = [{ count: 100, fps: 60 }];

    render(
      <BenchmarkModal
        {...defaultProps}
        running={false}
        results={results}
        reset={reset}
      />,
    );

    const resetBtn = screen.getByText(/🔄 Reset/);
    fireEvent.click(resetBtn);

    expect(reset).toHaveBeenCalled();
  });
});
