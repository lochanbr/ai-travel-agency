"use client";

import { APIProvider, Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { Destination } from "./journey-map";

interface InteractiveMapProps {
  destination: Destination;
}

function MapInner({ destination }: InteractiveMapProps) {
  const map = useMap("travel-quest-map");

  useEffect(() => {
    if (map && destination.coordinates) {
      map.panTo(destination.coordinates);
      map.setZoom(11);
    }
  }, [map, destination]);

  return (
    <Map
      defaultZoom={11}
      defaultCenter={destination.coordinates}
      mapId="travel-quest-map"
      disableDefaultUI={true}
    >
      {/* Main Destination Marker */}
      <AdvancedMarker position={destination.coordinates}>
        <Pin background={"var(--primary)"} glyphColor={"#fff"} borderColor={"var(--primary)"} />
      </AdvancedMarker>

      {/* Attraction Markers */}
      {destination.attractions.map((attraction, i) => (
        <AdvancedMarker key={i} position={attraction.coordinates}>
          <Pin background={"var(--accent)"} glyphColor={"#fff"} borderColor={"var(--accent)"} />
        </AdvancedMarker>
      ))}
    </Map>
  );
}

export function InteractiveMap({ destination }: InteractiveMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  if (!apiKey) {
    return (
      <div className="w-full h-64 bg-secondary/30 rounded-xl flex items-center justify-center text-muted-foreground p-4 text-center">
        Google Maps API Key is missing.
      </div>
    );
  }

  return (
    <div className="w-full h-64 rounded-xl overflow-hidden mt-4 border border-border">
      <APIProvider apiKey={apiKey}>
        <MapInner destination={destination} />
      </APIProvider>
    </div>
  );
}
