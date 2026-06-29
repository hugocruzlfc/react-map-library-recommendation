import { useRef } from "react";
import Map, { Source, Layer, type MapRef } from "react-map-gl/maplibre";
import type { Dot, Theme, LayerVisibility } from "../types";
import { TILE_URLS } from "../constants/map";

interface Props {
  dots: Dot[];
  theme: Theme;
  layers: LayerVisibility;
  clusteringEnabled: boolean;
}

function dotsToGeoJSON(dots: Dot[]) {
  return {
    type: "FeatureCollection" as const,
    features: dots.map((d) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [d.lng, d.lat] },
      properties: { id: d.id, type: d.type },
    })),
  };
}

function tileStyle(theme: Theme) {
  const url = TILE_URLS[theme];
  return {
    version: 8 as const,
    sources: {
      carto: {
        type: "raster" as const,
        tiles: ["a", "b", "c"].map((s) => url.replace("{s}", s)),
        tileSize: 256,
        attribution: "© OpenStreetMap © CARTO",
      },
    },
    layers: [{ id: "bg", type: "raster" as const, source: "carto" }],
  };
}

export function MapView({ dots, theme, layers, clusteringEnabled }: Props) {
  const mapRef = useRef<MapRef>(null);

  const motorDots = dots.filter((d) => d.type === "motor");
  const homeDots = dots.filter((d) => d.type === "home");

  return (
    <Map
      ref={mapRef}
      mapLib={import("maplibre-gl")}
      mapStyle={tileStyle(theme)}
      initialViewState={{ longitude: 0, latitude: 20, zoom: 2.2 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Motor layer */}
      <Source
        id="motor-src"
        type="geojson"
        data={dotsToGeoJSON(motorDots)}
        cluster={clusteringEnabled}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer
          id="motor-dots"
          type="circle"
          filter={["!", ["has", "point_count"]]}
          layout={{ visibility: layers.motor ? "visible" : "none" }}
          paint={{
            "circle-radius": 6,
            "circle-color": "#4f7eff",
            "circle-stroke-width": 1.5,
            "circle-stroke-color": "#ffffff66",
            "circle-opacity": 0.9,
          }}
        />
        <Layer
          id="motor-cluster"
          type="circle"
          filter={["has", "point_count"]}
          layout={{
            visibility: clusteringEnabled && layers.motor ? "visible" : "none",
          }}
          paint={{
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#4f7eff",
              10,
              "#b44fff",
              50,
              "#e05555",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              18,
              10,
              26,
              50,
              36,
            ],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff33",
          }}
        />
        <Layer
          id="motor-cluster-count"
          type="symbol"
          filter={["has", "point_count"]}
          layout={{
            visibility: clusteringEnabled && layers.motor ? "visible" : "none",
            "text-field": ["get", "point_count_abbreviated"],
            "text-size": 12,
          }}
          paint={{ "text-color": "#fff" }}
        />
      </Source>

      {/* Home layer — igual pero con color verde */}
      <Source
        id="home-src"
        type="geojson"
        data={dotsToGeoJSON(homeDots)}
        cluster={clusteringEnabled}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer
          id="home-dots"
          type="circle"
          filter={["!", ["has", "point_count"]]}
          layout={{ visibility: layers.home ? "visible" : "none" }}
          paint={{
            "circle-radius": 5,
            "circle-color": "#22c98e",
            "circle-stroke-width": 1.5,
            "circle-stroke-color": "#ffffff66",
            "circle-opacity": 0.9,
          }}
        />
        <Layer
          id="home-cluster"
          type="circle"
          filter={["has", "point_count"]}
          layout={{
            visibility: clusteringEnabled && layers.home ? "visible" : "none",
          }}
          paint={{
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#22c98e",
              10,
              "#b44fff",
              50,
              "#e05555",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              18,
              10,
              26,
              50,
              36,
            ],
            "circle-stroke-width": 2,
            "circle-stroke-color": "#ffffff33",
          }}
        />
        <Layer
          id="home-cluster-count"
          type="symbol"
          filter={["has", "point_count"]}
          layout={{
            visibility: clusteringEnabled && layers.home ? "visible" : "none",
            "text-field": ["get", "point_count_abbreviated"],
            "text-size": 12,
          }}
          paint={{ "text-color": "#fff" }}
        />
      </Source>
    </Map>
  );
}
