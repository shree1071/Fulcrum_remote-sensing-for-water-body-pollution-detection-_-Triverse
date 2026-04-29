import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle, Popup, Rectangle, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Pollution zones derived from rule-based GEE pixel analysis
const ZONES = [
  {
    bounds:  [[12.920, 77.645], [12.932, 77.658]],
    color:   "#ff3b3b",
    fill:    "rgba(255,59,59,0.22)",
    label:   "Severe — SW Inlet Zone",
    detail:  "Koramangala drain discharge. NDWI: 0.05"
  },
  {
    bounds:  [[12.945, 77.675], [12.958, 77.690]],
    color:   "#ff6b35",
    fill:    "rgba(255,107,53,0.22)",
    label:   "High — NE Industrial Zone",
    detail:  "Industrial effluent runoff. NDVI: 0.22"
  },
  {
    bounds:  [[12.932, 77.658], [12.945, 77.675]],
    color:   "#ffb800",
    fill:    "rgba(255,184,0,0.18)",
    label:   "Moderate — Central Lake",
    detail:  "Mixed zone. Turbidity: 1.1x threshold"
  },
  {
    bounds:  [[12.952, 77.645], [12.960, 77.660]],
    color:   "#00d9a3",
    fill:    "rgba(0,217,163,0.15)",
    label:   "Clean — NW Open Water",
    detail:  "Cleanest section. NDWI: 0.32"
  },
];

export default function PollutionMap({ hotspots, lakeId = "bellandur", coordinates = { lat: 12.937, lon: 77.668 }, lakeName = "Bellandur Lake" }) {
  const [geeTiles, setGeeTiles] = useState(null);
  const [activeLayer, setActiveLayer] = useState("critical"); // 'baseline', 'warning', 'critical', 'critical_rgb', 'static'
  const [loadingGee, setLoadingGee] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/gee/tiles")
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setGeeTiles(data);
          setActiveLayer("critical"); // Default to critical when loaded
        } else {
          setActiveLayer("static");
        }
      })
      .catch(err => {
        console.error("GEE error:", err);
        setActiveLayer("static");
      })
      .finally(() => setLoadingGee(false));
  }, []);

  // Force static layer if not Bellandur since GEE tiles are Bellandur-specific
  useEffect(() => {
    if (lakeId !== "bellandur") {
      setActiveLayer("static");
    } else if (geeTiles) {
      setActiveLayer("critical");
    }
  }, [lakeId, geeTiles]);

  const getCurrentTileUrl = () => {
    if (activeLayer === "static" || !geeTiles) {
      return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    }
    return geeTiles[activeLayer];
  };

  return (
    <div className="glass-card" style={{ padding: "20px" }}>
      <div className="section-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <span>🗺️ Live Pollution Map — {lakeName}</span>
        
        <div style={{ display: "flex", gap: "8px" }}>
          {lakeId === "bellandur" && (
            loadingGee ? (
              <span style={{ fontSize: "12px", color: "var(--text-muted)", alignSelf: "center" }}>Connecting to GEE...</span>
            ) : geeTiles ? (
              <>
              <button 
                className="predict-btn" 
                style={{ padding: "4px 10px", fontSize: "11px", opacity: activeLayer === "baseline" ? 1 : 0.5, marginTop: 0 }}
                onClick={() => setActiveLayer("baseline")}
              >✅ Baseline (Oct 2016)</button>
              <button 
                className="predict-btn" 
                style={{ padding: "4px 10px", fontSize: "11px", opacity: activeLayer === "warning" ? 1 : 0.5, marginTop: 0 }}
                onClick={() => setActiveLayer("warning")}
              >⚠️ Warning (Apr 2017)</button>
              <button 
                className="predict-btn" 
                style={{ padding: "4px 10px", fontSize: "11px", opacity: activeLayer === "critical" ? 1 : 0.5, marginTop: 0 }}
                onClick={() => setActiveLayer("critical")}
              >🔴 Critical (Feb 2018)</button>
              <button 
                className="predict-btn" 
                style={{ padding: "4px 10px", fontSize: "11px", opacity: activeLayer === "critical_rgb" ? 1 : 0.5, marginTop: 0 }}
                onClick={() => setActiveLayer("critical_rgb")}
              >📷 RGB (Feb 2018)</button>
                <button 
                  className="predict-btn" 
                  style={{ padding: "4px 10px", fontSize: "11px", opacity: activeLayer === "static" ? 1 : 0.5, marginTop: 0 }}
                  onClick={() => setActiveLayer("static")}
                >🗺️ Static Zones</button>
              </>
            ) : (
              <span style={{ fontSize: "12px", color: "#ff3b3b", alignSelf: "center" }}>GEE Disconnected</span>
            )
          )}
        </div>
      </div>

      <MapContainer
        key={lakeId}
        center={[coordinates.lat, coordinates.lon]}
        zoom={14}
        style={{ height: "340px", borderRadius: "10px" }}
        zoomControl={true}
      >
        {/* If using GEE, we still want a dark base map underneath the transparent overlays */}
        {activeLayer !== "critical_rgb" && activeLayer !== "static" && (
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                maxZoom={19}
            />
        )}

        {/* Dynamic Tile Layer (Base or GEE) */}
        <TileLayer
          key={activeLayer}
          url={getCurrentTileUrl()}
          attribution={activeLayer === "static" ? '&copy; <a href="https://carto.com/">CARTO</a>' : '&copy; Google Earth Engine'}
          maxZoom={19}
          opacity={activeLayer === "critical_rgb" ? 1 : (activeLayer === "static" ? 1 : 0.85)}
        />

        {/* Pollution classification zones (Static Mode Only - Bellandur specific) */}
        {activeLayer === "static" && lakeId === "bellandur" && ZONES.map((zone) => (
          <Rectangle
            key={zone.label}
            bounds={zone.bounds}
            pathOptions={{
              color:       zone.color,
              fillColor:   zone.color,
              fillOpacity: 0.25,
              weight:      1.5,
              dashArray:   zone.color === "#00d9a3" ? "5 5" : null
            }}
          >
            <Tooltip sticky>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}>
                <strong>{zone.label}</strong><br />
                <span style={{ color: "#aaa" }}>{zone.detail}</span>
              </div>
            </Tooltip>
            <Popup>
              <div style={{ fontFamily: "Inter, sans-serif" }}>
                <strong>{zone.label}</strong><br />
                {zone.detail}
              </div>
            </Popup>
          </Rectangle>
        ))}

        {/* Sewage inlet hotspot circles */}
        {hotspots?.map((h) => (
          <Circle
            key={h.id}
            center={[h.lat, h.lon]}
            radius={250}
            pathOptions={{
              color:       h.color,
              fillColor:   h.color,
              fillOpacity: 0.75,
              weight:      2
            }}
          >
            <Tooltip>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}>
                <strong>{h.name}</strong><br />
                Status: <span style={{ color: h.color }}>{h.status}</span><br />
                Flow: {h.daily_flow_mgd} MGD
              </div>
            </Tooltip>
            <Popup>
              <div style={{ fontFamily: "Inter, sans-serif" }}>
                <strong>{h.name}</strong><br />
                Status: {h.status}<br />
                NDWI: {h.ndwi_reading}<br />
                Daily flow: {h.daily_flow_mgd} million gallons<br />
                <em style={{ color: "#888", fontSize: "11px" }}>{h.description}</em>
              </div>
            </Popup>
          </Circle>
        ))}
      </MapContainer>

      {/* Legend */}
      <div style={{
        display: "flex", gap: "16px", marginTop: "12px",
        flexWrap: "wrap", fontSize: "11px", color: "var(--text-muted)"
      }}>
        {activeLayer === "static" || lakeId !== "bellandur" ? (
          [
            { color: "#ff3b3b", label: "Severe zones" },
            { color: "#ffb800", label: "Moderate zones" },
            { color: "#00d9a3", label: "Clean zones" },
            { color: "#ff3b3b", label: "Sewage inlets (circles)" },
          ].map(({ color, label }) => (
            <span key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{
                width: "10px", height: "10px", borderRadius: "2px",
                background: color, display: "inline-block"
              }} />
              {label}
            </span>
          ))
        ) : (
          <>
            <strong style={{ color: "#fff" }}>Pollution Index:</strong>
            {[
              { color: "#0000ff", label: "Clean water" },
              { color: "#00ffff", label: "Low organic load" },
              { color: "#88ff00", label: "Moderate pollution" },
              { color: "#ffff00", label: "High algae bloom" },
              { color: "#ff8800", label: "Severe — foam zones" },
              { color: "#ff0000", label: "Critical — fire risk" },
            ].map(({ color, label }) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{
                  width: "10px", height: "10px", borderRadius: "2px",
                  background: color, display: "inline-block"
                }} />
                {label}
              </span>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
