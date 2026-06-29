import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import type { Dot, LayerVisibility, Theme } from "@/types";
import { MapView } from "@/components/map-view";

// Mock maplibre-gl
vi.mock("maplibre-gl", () => ({
  default: vi.fn(),
}));

// Mock react-map-gl
vi.mock("react-map-gl/maplibre", () => ({
  default: vi.fn(({ children }) => (
    <div data-testid="map-container">{children}</div>
  )),
  Source: ({ children, id }: any) => (
    <div data-testid={`source-${id}`}>{children}</div>
  ),
  Layer: ({ id }: any) => <div data-testid={`layer-${id}`} />,
}));

describe("MapView", () => {
  const defaultProps = {
    dots: [] as Dot[],
    theme: "dark" as Theme,
    layers: { motor: true, home: true } as LayerVisibility,
    clusteringEnabled: false,
  };

  const motorDots: Dot[] = [
    { id: 1, lat: 0, lng: 0, type: "motor" },
    { id: 2, lat: 10, lng: 10, type: "motor" },
  ];

  const homeDots: Dot[] = [
    { id: 3, lat: 20, lng: 20, type: "home" },
    { id: 4, lat: 30, lng: 30, type: "home" },
  ];

  it("should render map container", () => {
    const { getByTestId } = render(<MapView {...defaultProps} />);
    expect(getByTestId("map-container")).toBeInTheDocument();
  });

  it("should render motor source", () => {
    const { getByTestId } = render(
      <MapView
        {...defaultProps}
        dots={motorDots}
      />,
    );
    expect(getByTestId("source-motor-src")).toBeInTheDocument();
  });

  it("should render motor layer", () => {
    const { getByTestId } = render(
      <MapView
        {...defaultProps}
        dots={motorDots}
      />,
    );
    expect(getByTestId("layer-motor-dots")).toBeInTheDocument();
  });

  it("should render home source", () => {
    const { getByTestId } = render(
      <MapView
        {...defaultProps}
        dots={homeDots}
      />,
    );
    expect(getByTestId("source-home-src")).toBeInTheDocument();
  });

  it("should render home layer", () => {
    const { getByTestId } = render(
      <MapView
        {...defaultProps}
        dots={homeDots}
      />,
    );
    expect(getByTestId("layer-home-dots")).toBeInTheDocument();
  });

  it("should handle theme dark", () => {
    const { container } = render(
      <MapView
        {...defaultProps}
        theme="dark"
      />,
    );
    expect(container).toBeInTheDocument();
  });

  it("should handle theme light", () => {
    const { container } = render(
      <MapView
        {...defaultProps}
        theme="light"
      />,
    );
    expect(container).toBeInTheDocument();
  });

  it("should handle empty dots array", () => {
    const { container } = render(
      <MapView
        {...defaultProps}
        dots={[]}
      />,
    );
    expect(container).toBeInTheDocument();
  });

  it("should handle mixed dot types", () => {
    const allDots = [...motorDots, ...homeDots];
    const { getByTestId } = render(
      <MapView
        {...defaultProps}
        dots={allDots}
      />,
    );

    expect(getByTestId("layer-motor-dots")).toBeInTheDocument();
    expect(getByTestId("layer-home-dots")).toBeInTheDocument();
  });

  it("should disable clustering by default", () => {
    const { getByTestId } = render(
      <MapView
        {...defaultProps}
        dots={motorDots}
        clusteringEnabled={false}
      />,
    );
    expect(getByTestId("source-motor-src")).toBeInTheDocument();
  });

  it("should enable clustering when prop is true", () => {
    const { getByTestId } = render(
      <MapView
        {...defaultProps}
        dots={motorDots}
        clusteringEnabled={true}
      />,
    );
    expect(getByTestId("source-motor-src")).toBeInTheDocument();
  });

  it("should show motor layer when enabled", () => {
    const { getByTestId } = render(
      <MapView
        {...defaultProps}
        dots={motorDots}
        layers={{ motor: true, home: false }}
      />,
    );
    expect(getByTestId("layer-motor-dots")).toBeInTheDocument();
  });

  it("should show home layer when enabled", () => {
    const { getByTestId } = render(
      <MapView
        {...defaultProps}
        dots={homeDots}
        layers={{ motor: false, home: true }}
      />,
    );
    expect(getByTestId("layer-home-dots")).toBeInTheDocument();
  });

  it("should update when dots change", () => {
    const { rerender, getByTestId } = render(
      <MapView
        {...defaultProps}
        dots={motorDots}
      />,
    );

    rerender(
      <MapView
        {...defaultProps}
        dots={[...motorDots, ...homeDots]}
      />,
    );

    expect(getByTestId("layer-motor-dots")).toBeInTheDocument();
  });

  it("should update when theme changes", () => {
    const { rerender, container } = render(
      <MapView
        {...defaultProps}
        theme="dark"
      />,
    );

    rerender(
      <MapView
        {...defaultProps}
        theme="light"
      />,
    );

    expect(container).toBeInTheDocument();
  });

  it("should render cluster layers when clustering enabled", () => {
    const { getByTestId } = render(
      <MapView
        {...defaultProps}
        dots={motorDots}
        clusteringEnabled={true}
      />,
    );

    expect(getByTestId("layer-motor-cluster")).toBeInTheDocument();
  });

  it("should handle all layer combinations", () => {
    const allDots = [...motorDots, ...homeDots];
    const { getByTestId } = render(
      <MapView
        {...defaultProps}
        dots={allDots}
        layers={{ motor: true, home: true }}
        clusteringEnabled={true}
      />,
    );

    expect(getByTestId("layer-motor-dots")).toBeInTheDocument();
    expect(getByTestId("layer-home-dots")).toBeInTheDocument();
    expect(getByTestId("layer-motor-cluster")).toBeInTheDocument();
  });
});
