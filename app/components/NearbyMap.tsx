"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { universities, type University } from "@/data/universities";

type Props = {
  onClose: () => void;
};

const uniIcon = L.divIcon({
  className: "",
  html: `<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;background:#ea4335;transform:rotate(-45deg);box-shadow:0 1px 4px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;">
    <div style="width:11px;height:11px;border-radius:50%;background:white;transform:rotate(45deg);"></div>
  </div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const userIcon = L.divIcon({
  className: "",
  html: `<div style="position:relative;width:20px;height:20px;">
    <div style="position:absolute;inset:-8px;border-radius:50%;background:rgba(66,133,244,0.25);"></div>
    <div style="width:20px;height:20px;border-radius:50%;background:#4285f4;border:3px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div>
  </div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function Recenter({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 12, { duration: 0.8 });
  }, [position, map]);
  return null;
}

export default function NearbyMap({ onClose }: Props) {
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [locError, setLocError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<University | null>(null);
  const [flyTo, setFlyTo] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      () => setLocError("Location access denied — showing all universities instead"),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const sorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? universities.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.city.toLowerCase().includes(q) ||
            u.country.toLowerCase().includes(q)
        )
      : universities;

    if (!userPos) return filtered.map((u) => ({ u, dist: null as number | null }));

    return filtered
      .map((u) => ({ u, dist: haversine(userPos[0], userPos[1], u.lat, u.lng) }))
      .sort((a, b) => (a.dist ?? Infinity) - (b.dist ?? Infinity));
  }, [query, userPos]);

  const center: [number, number] = userPos ?? [50.85, 4.5];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "white", display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: 360,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid oklch(90% 0.01 245)",
          boxShadow: "2px 0 12px rgba(0,0,0,0.06)",
          zIndex: 2,
        }}
      >
        <div style={{ padding: "16px 16px 12px", display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={onClose}
            aria-label="Close map"
            style={{
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: "50%",
              border: "none",
              background: "oklch(96% 0.01 245)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              color: "oklch(30% 0.02 245)",
              cursor: "pointer",
            }}
          >
            ←
          </button>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "white",
              border: "1px solid oklch(88% 0.01 245)",
              borderRadius: 24,
              padding: "10px 16px",
              boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
            }}
          >
            <span style={{ color: "oklch(55% 0.02 245)", fontSize: 15 }}>⌕</span>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search universities near you"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 14.5,
                background: "transparent",
                color: "oklch(18% 0.03 245)",
              }}
            />
          </div>
        </div>

        {locError && (
          <div
            style={{
              margin: "0 16px 10px",
              padding: "10px 12px",
              background: "oklch(96% 0.05 60)",
              color: "oklch(40% 0.1 60)",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 12.5,
              borderRadius: 8,
            }}
          >
            {locError}
          </div>
        )}

        <div style={{ overflowY: "auto", flex: 1, padding: "0 8px 16px" }}>
          {sorted.map(({ u, dist }) => (
            <button
              key={u.name}
              onClick={() => {
                setSelected(u);
                setFlyTo([u.lat, u.lng]);
              }}
              style={{
                width: "100%",
                textAlign: "left",
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                padding: "12px 10px",
                borderRadius: 10,
                border: "none",
                background: selected?.name === u.name ? "oklch(95% 0.04 245)" : "transparent",
                cursor: "pointer",
                marginBottom: 2,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  flexShrink: 0,
                  borderRadius: "50% 50% 50% 0",
                  background: "#ea4335",
                  transform: "rotate(-45deg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 2,
                }}
              >
                <span style={{ transform: "rotate(45deg)", color: "white", fontSize: 13, fontWeight: 700 }}>
                  🎓
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: "oklch(18% 0.03 245)",
                  }}
                >
                  {u.name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: 12.5,
                    color: "oklch(52% 0.02 245)",
                    marginTop: 2,
                  }}
                >
                  {u.city}, {u.country}
                  {dist !== null && (
                    <span style={{ color: "oklch(42% 0.14 245)", fontWeight: 600 }}>
                      {" "}
                      · {dist < 10 ? dist.toFixed(1) : Math.round(dist)} km
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
          {sorted.length === 0 && (
            <div
              style={{
                padding: "24px 12px",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 13.5,
                color: "oklch(55% 0.02 245)",
                textAlign: "center",
              }}
            >
              No universities match &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: "relative" }}>
        <MapContainer center={center} zoom={userPos ? 12 : 8} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {flyTo && <Recenter position={flyTo} />}
          {userPos && (
            <Marker position={userPos} icon={userIcon}>
              <Popup>You are here</Popup>
            </Marker>
          )}
          {universities.map((u) => (
            <Marker
              key={u.name}
              position={[u.lat, u.lng]}
              icon={uniIcon}
              eventHandlers={{ click: () => setSelected(u) }}
            >
              <Popup>
                <div style={{ fontFamily: "'DM Sans',sans-serif", minWidth: 180 }}>
                  <strong>{u.name}</strong>
                  <div style={{ fontSize: 12.5, color: "#666", margin: "4px 0" }}>
                    {u.city}, {u.country}
                  </div>
                  <div style={{ fontSize: 12.5, marginBottom: 6 }}>{u.scholarship}</div>
                  <a href={u.website} target="_blank" rel="noreferrer" style={{ fontSize: 12.5 }}>
                    Visit website →
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
