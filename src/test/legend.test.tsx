import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Legend } from "@/components/legend";

describe("Legend", () => {
  it("should render legend title", () => {
    render(<Legend />);
    expect(screen.getByText("LEYENDA")).toBeInTheDocument();
  });

  it("should render Motor row", () => {
    render(<Legend />);
    expect(screen.getByText("Motor")).toBeInTheDocument();
  });

  it("should render Home row", () => {
    render(<Legend />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should render Cluster row", () => {
    render(<Legend />);
    expect(screen.getByText(/Cluster/)).toBeInTheDocument();
  });

  it("should render all three legend items", () => {
    const { container } = render(<Legend />);
    const rows = container.querySelectorAll("[class*='row']");
    expect(rows.length).toBeGreaterThanOrEqual(3);
  });

  it("should render colored dots for each row", () => {
    const { container } = render(<Legend />);
    const dots = container.querySelectorAll("[class*='dot']");
    expect(dots.length).toBeGreaterThanOrEqual(3);
  });

  it("should apply correct styling to dots", () => {
    const { container } = render(<Legend />);
    const dots = container.querySelectorAll("[class*='dot']");

    dots.forEach((dot) => {
      const style = window.getComputedStyle(dot);
      expect(style.background).toBeTruthy();
    });
  });

  it("should have legend container", () => {
    const { container } = render(<Legend />);
    const legend = container.querySelector("[class*='legend']");
    expect(legend).toBeInTheDocument();
  });

  it("should have motor dot with glow effect", () => {
    const { container } = render(<Legend />);
    const dots = container.querySelectorAll("[class*='dot']");

    expect(dots.length).toBeGreaterThan(0);
    dots.forEach((dot) => {
      const boxShadow = dot.getAttribute("style");
      expect(boxShadow).toContain("boxShadow");
    });
  });

  it("should render rows with labels and dots", () => {
    const { container } = render(<Legend />);
    const rows = container.querySelectorAll("[class*='row']");

    rows.forEach((row) => {
      const dot = row.querySelector("[class*='dot']");
      const label = row.textContent;

      expect(dot).toBeInTheDocument();
      expect(label).toBeTruthy();
    });
  });
});
