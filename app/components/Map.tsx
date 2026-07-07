"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  query: string;
  height?: number;
};

const defaultMarkerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Avoid TypeScript prototype typing issues
;(L.Marker as any).prototype.options.icon = defaultMarkerIcon;

export default function Map({ query, height = 400 }: Props) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setPosition(null);
      setLabel(null);
      return;
    }

    const controller = new AbortController();

    fetch(`/api/geocode?q=${encodeURIComponent(query)}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.lat && data.lon) {
          setPosition([parseFloat(data.lat), parseFloat(data.lon)]);
          setLabel(data.display_name ?? query);
        } else {
          setPosition(null);
          setLabel("Location not found");
        }
      })
      .catch(() => {
        setPosition(null);
        setLabel("Error fetching location");
      });

    return () => controller.abort();
  }, [query]);

  return (
    <div style={{ height, width: "100%" }}>
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>{label}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <div style={{ padding: 16 }}>{label ?? "Searching..."}</div>
      )}
    </div>
  );
}
