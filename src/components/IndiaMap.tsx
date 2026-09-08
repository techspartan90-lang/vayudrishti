import React, { useState } from 'react';
import { WeatherEvent } from '../types';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Radio,
  Eye,
  Activity,
  Wind,
  CloudRain,
  MapPin,
  Check,
  Compass,
} from 'lucide-react';

interface IndiaMapProps {
  events: WeatherEvent[];
  selectedEvent: WeatherEvent;
  onSelectEvent: (event: WeatherEvent) => void;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({
  events,
  selectedEvent,
  onSelectEvent,
}) => {
  // Map zoom and pan state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isLayersOpen, setIsLayersOpen] = useState<boolean>(false);

  // Layer toggles: Satellite, Radar, Rainfall, Flood, Infrastructure, Population
  const [layers, setLayers] = useState({
    satellite: true,
    radar: true,
    rainfall: true,
    flood: true,
    infrastructure: true,
    population: true,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Convert Indian Latitude/Longitude roughly to SVG coordinates (width 700, height 780)
  // Latitude spans roughly 8°N to 36°N, Longitude spans roughly 68°E to 96°E
  const projectCoords = (lat: number, lng: number): { x: number; y: number } => {
    const minLng = 67;
    const maxLng = 98;
    const minLat = 7.5;
    const maxLat = 37.5;

    const width = 640;
    const height = 700;

    const x = ((lng - minLng) / (maxLng - minLng)) * width + 20;
    // Invert Y because latitude goes South -> North while SVG Y goes Top -> Bottom
    const y = ((maxLat - lat) / (maxLat - minLat)) * height + 10;
    return { x, y };
  };

  // Map coordinates of the 5 events
  const chennaiPos = projectCoords(13.0827, 80.2707); // ~ x: 294, y: 579
  const cyclonePos = projectCoords(16.5, 84.8); // ~ x: 387, y: 500
  const wayanadPos = projectCoords(11.55, 76.13); // ~ x: 208, y: 615
  const rajasthanPos = projectCoords(26.9, 71.9); // ~ x: 121, y: 257
  const uttarakhandPos = projectCoords(30.28, 78.98); // ~ x: 268, y: 178

  // Helper to retrieve the current active marker position
  const getEventPosition = (eventId: string) => {
    switch (eventId) {
      case 'evt-1':
        return chennaiPos;
      case 'evt-2':
        return cyclonePos;
      case 'evt-3':
        return wayanadPos;
      case 'evt-4':
        return rajasthanPos;
      case 'evt-5':
        return uttarakhandPos;
      default:
        return chennaiPos;
    }
  };
  const activeMarkerPos = getEventPosition(selectedEvent.id);

  return (
    <div
      id="india-map-column"
      className="flex flex-col h-full bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden relative select-none"
    >
      {/* Map Header Bar (Clean Minimalism) */}
      <div className="px-4 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <h3 className="text-xs font-bold text-[#0A192F] tracking-widest uppercase font-mono">
            Live Event Map — India
          </h3>
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE
          </span>
        </div>

        {/* Severity Legend Pill */}
        <div className="hidden sm:flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md text-[10px] font-medium text-slate-600">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-600"></span> Critical
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span> High
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Moderate
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Low
          </span>
        </div>

        {/* Map Controls */}
        <div className="flex items-center gap-1.5">
          <button
            id="map-zoom-in"
            onClick={handleZoomIn}
            className="w-7 h-7 rounded bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-2xs flex items-center justify-center font-bold text-sm transition-colors"
            title="Zoom In"
          >
            +
          </button>
          <button
            id="map-zoom-out"
            onClick={handleZoomOut}
            className="w-7 h-7 rounded bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-2xs flex items-center justify-center font-bold text-sm transition-colors"
            title="Zoom Out"
          >
            -
          </button>
          <button
            id="map-zoom-reset"
            onClick={handleReset}
            className="p-1.5 rounded bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-2xs transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Layers Dropdown Button */}
          <div className="relative">
            <button
              id="map-layers-toggle"
              onClick={() => setIsLayersOpen(!isLayersOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border transition-colors shadow-2xs ${
                isLayersOpen
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Layers</span>
            </button>

            {/* Layers Dropdown Menu */}
            {isLayersOpen && (
              <div
                id="map-layers-dropdown"
                className="absolute right-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-lg shadow-xl p-2 z-30 text-xs text-slate-800 space-y-1"
              >
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                  <span>Active Data Overlays</span>
                  <span className="font-mono text-[9px] text-blue-600">6 Layers</span>
                </div>
                {[
                  { key: 'satellite', label: 'Satellite (INSAT-3DR)', color: 'text-purple-700' },
                  { key: 'radar', label: 'Radar (DWR Reflectivity)', color: 'text-red-700' },
                  { key: 'rainfall', label: 'Rainfall (IMD Telemetry)', color: 'text-blue-700' },
                  { key: 'flood', label: 'Flood (CWC Inundation)', color: 'text-cyan-700' },
                  { key: 'infrastructure', label: 'Infrastructure', color: 'text-indigo-700' },
                  { key: 'population', label: 'Population (Exposure)', color: 'text-amber-700' },
                ].map((l) => (
                  <button
                    key={l.key}
                    onClick={() => toggleLayer(l.key as keyof typeof layers)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-slate-50 text-left transition-colors"
                  >
                    <span className={`font-medium ${l.color}`}>{l.label}</span>
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center border ${
                        layers[l.key as keyof typeof layers]
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {layers[l.key as keyof typeof layers] && (
                        <Check className="w-3 h-3 stroke-[3]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main SVG Map Canvas */}
      <div className="flex-1 relative w-full h-full min-h-[460px] flex items-center justify-center overflow-hidden bg-radial from-slate-900 to-slate-950">
        {/* Ocean Labels */}
        <div className="absolute left-8 bottom-28 text-[11px] font-mono tracking-widest text-slate-700/80 pointer-events-none uppercase">
          Arabian Sea
        </div>
        <div className="absolute right-12 bottom-36 text-[11px] font-mono tracking-widest text-slate-700/80 pointer-events-none uppercase">
          Bay of Bengal
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 text-[11px] font-mono tracking-widest text-slate-700/80 pointer-events-none uppercase">
          Indian Ocean
        </div>

        {/* GIS Grid Coordinates Legend */}
        <div className="absolute top-3 left-3 bg-slate-950/70 border border-slate-800/80 rounded px-2 py-1 text-[9px] font-mono text-slate-400 pointer-events-none">
          CRS: EPSG:4326 • India Operational Mesh
        </div>

        <svg
          viewBox="0 0 680 720"
          className="w-full h-full max-h-[580px] transition-transform duration-200"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: 'center center',
          }}
        >
          <defs>
            {/* Radar Pulse Animation Gradient */}
            <radialGradient id="radarScan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#f97316" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="cycloneVortex" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#dc2626" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#ea580c" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </radialGradient>

            {/* Inundation Heat Gradient */}
            <radialGradient id="rainSwathe" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.65" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </radialGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Atmospheric Grid */}
          <g opacity="0.15">
            {[100, 200, 300, 400, 500, 600].map((y) => (
              <line
                key={`h-${y}`}
                x1="20"
                y1={y}
                x2="660"
                y2={y}
                stroke="#64748b"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            ))}
            {[100, 200, 300, 400, 500, 600].map((x) => (
              <line
                key={`v-${x}`}
                x1={x}
                y1="20"
                x2={x}
                y2="700"
                stroke="#64748b"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            ))}
          </g>

          {/* Detailed Accurate Schematic Contour of India & State Boundaries */}
          {/* Main Subcontinent Landmass Polygon */}
          <path
            d="
              M 270 35 
              L 305 45 
              L 330 80 
              L 320 120 
              L 360 145 
              L 410 160 
              L 470 170 
              L 540 165 
              L 600 170 
              L 625 210 
              L 580 230 
              L 535 220 
              L 480 240 
              L 450 250 
              L 440 280 
              L 415 315 
              L 410 375 
              L 395 440 
              L 375 510 
              L 335 580 
              L 310 635 
              L 280 670 
              L 260 680 
              L 245 660 
              L 230 610 
              L 205 550 
              L 185 470 
              L 170 410 
              L 125 390 
              L 95 380 
              L 115 340 
              L 155 330 
              L 125 280 
              L 105 240 
              L 145 200 
              L 185 180 
              L 225 150 
              L 245 100 
              Z
            "
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="2"
            className="filter drop-shadow-md"
          />

          {/* Internal State / Agro-Climatic Boundaries (Key Lines) */}
          <g stroke="#334155" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.65">
            {/* North Himalayas / Ladakh / J&K / Uttarakhand */}
            <path d="M 245 100 Q 290 110 320 120" />
            <path d="M 225 150 Q 275 145 360 145" />
            {/* Rajasthan / Gujarat border */}
            <path d="M 125 280 Q 170 270 230 260" />
            <path d="M 155 330 Q 190 320 230 330" />
            {/* Indo-Gangetic Basin */}
            <path d="M 230 260 Q 330 230 450 250" />
            <path d="M 230 330 Q 320 330 415 315" />
            {/* Maharashtra / Deccan boundary */}
            <path d="M 170 410 Q 260 410 395 440" />
            {/* Karnataka / Andhra / Tamil Nadu / Kerala boundaries */}
            <path d="M 185 470 Q 270 490 375 510" />
            <path d="M 205 550 Q 260 560 335 580" />
            <path d="M 230 610 Q 270 615 310 635" />
            {/* Odisha & West Bengal coast */}
            <path d="M 395 440 Q 420 380 440 280" />
            {/* North East Gateway */}
            <path d="M 450 250 Q 490 230 535 220" />
          </g>

          {/* Sri Lanka Outline (Geographical Context) */}
          <path
            d="M 305 685 C 315 680, 325 695, 320 710 C 310 720, 295 705, 305 685 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.2"
          />

          {/* Andaman & Nicobar Islands */}
          <g fill="#334155" stroke="#475569" strokeWidth="0.8">
            <ellipse cx="550" cy="540" rx="3.5" ry="12" />
            <ellipse cx="552" cy="570" rx="3" ry="10" />
            <circle cx="556" cy="610" r="4" />
          </g>

          {/* Lakshadweep Islands */}
          <g fill="#334155" stroke="#475569" strokeWidth="0.8">
            <circle cx="170" cy="580" r="2.5" />
            <circle cx="175" cy="610" r="2.5" />
            <circle cx="180" cy="635" r="2" />
          </g>

          {/* ======================================================== */}
          {/* DYNAMIC METEOROLOGICAL OVERLAY LAYERS */}
          {/* ======================================================== */}

          {/* 1. River Levels (CWC) & Flood Inundation Layer */}
          {layers.flood && (
            <g stroke="#38bdf8" strokeWidth="1.8" fill="none" opacity="0.85">
              {/* Adyar & Cooum Rivers (Chennai) */}
              <path
                d="M 255 570 Q 280 575 295 579"
                strokeWidth="2.4"
                className="animate-pulse"
              />
              <circle cx="280" cy="575" r="2.5" fill="#38bdf8" />
              {/* Godavari River */}
              <path d="M 210 420 Q 280 430 380 470" strokeDasharray="3 2" />
              {/* Krishna River */}
              <path d="M 220 490 Q 290 500 370 515" strokeDasharray="3 2" />
              {/* Cauvery River */}
              <path d="M 220 580 Q 270 590 325 605" strokeDasharray="3 2" />
              {/* Ganga / Yamuna Basin */}
              <path d="M 268 178 Q 340 240 440 280" strokeDasharray="4 2" strokeWidth="1.2" />
            </g>
          )}

          {/* 2. IMD Rainfall / Convective Precipitation Swathes */}
          {layers.rainfall && (
            <g opacity="0.7">
              {/* Heavy rain around Chennai / Northern Tamil Nadu */}
              <circle cx={chennaiPos.x} cy={chennaiPos.y} r="65" fill="url(#rainSwathe)" />
              {/* Western Ghats orographic rain plume (Wayanad) */}
              <ellipse
                cx={wayanadPos.x}
                cy={wayanadPos.y}
                rx="25"
                ry="45"
                fill="url(#rainSwathe)"
                transform={`rotate(-20 ${wayanadPos.x} ${wayanadPos.y})`}
              />
            </g>
          )}

          {/* 3. Doppler Radar (DWR) Reflectivity Rings */}
          {layers.radar && (
            <g>
              {/* Chennai DWR 250km Radar Range Scan */}
              <circle
                cx={chennaiPos.x}
                cy={chennaiPos.y}
                r="50"
                fill="none"
                stroke="#ef4444"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                opacity="0.75"
              />
              <circle
                cx={chennaiPos.x}
                cy={chennaiPos.y}
                r="30"
                fill="none"
                stroke="#f97316"
                strokeWidth="1.5"
                opacity="0.85"
              />
              <circle
                cx={chennaiPos.x}
                cy={chennaiPos.y}
                r="14"
                fill="#ef4444"
                fillOpacity="0.25"
              />
              {/* Machilipatnam Cyclone Radar Rings */}
              <circle
                cx={cyclonePos.x}
                cy={cyclonePos.y}
                r="55"
                fill="none"
                stroke="#ef4444"
                strokeWidth="1"
                strokeDasharray="6 4"
                opacity="0.7"
              />
            </g>
          )}

          {/* 4. Satellite INSAT-3DR Cloud Tops / Cyclone Spiral Track */}
          {layers.satellite && (
            <g>
              {/* Cyclone Track and Projected Cone in Bay of Bengal */}
              {/* Projected Cone of Uncertainty */}
              <path
                d={`
                  M ${cyclonePos.x} ${cyclonePos.y} 
                  L ${cyclonePos.x - 70} ${cyclonePos.y - 45} 
                  A 40 40 0 0 0 ${cyclonePos.x - 85} ${cyclonePos.y + 10} 
                  Z
                `}
                fill="#ef4444"
                fillOpacity="0.18"
                stroke="#ef4444"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Cyclone Past Track Dots */}
              <path
                d={`M ${cyclonePos.x + 60} ${cyclonePos.y + 35} Q ${cyclonePos.x + 30} ${cyclonePos.y + 20} ${cyclonePos.x} ${cyclonePos.y}`}
                fill="none"
                stroke="#f87171"
                strokeWidth="2"
              />
              <circle cx={cyclonePos.x + 60} cy={cyclonePos.y + 35} r="3" fill="#f87171" />
              <circle cx={cyclonePos.x + 30} cy={cyclonePos.y + 20} r="3.5" fill="#f87171" />

              {/* Cyclone Vortex Eye & Spiral bands */}
              <g className="animate-spin" style={{ transformOrigin: `${cyclonePos.x}px ${cyclonePos.y}px`, animationDuration: '18s' }}>
                <circle cx={cyclonePos.x} cy={cyclonePos.y} r="36" fill="url(#cycloneVortex)" />
                <path
                  d={`M ${cyclonePos.x - 30} ${cyclonePos.y} A 30 30 0 0 1 ${cyclonePos.x + 30} ${cyclonePos.y}`}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.6"
                />
              </g>
            </g>
          )}

          {/* 5. Population Exposure Density Layer (GIS Grid) */}
          {layers.population && (
            <g opacity="0.32">
              {/* Chennai Metropolitan Population Exposure Swathe */}
              <circle cx={chennaiPos.x} cy={chennaiPos.y} r="52" fill="#f59e0b" />
              <circle cx={chennaiPos.x} cy={chennaiPos.y} r="26" fill="#ef4444" opacity="0.5" />
              {/* Coastal Andhra / Odisha Population Corridor */}
              <circle cx={cyclonePos.x - 32} cy={cyclonePos.y} r="42" fill="#f59e0b" />
              {/* Wayanad Vulnerable Hill Settlements */}
              <circle cx={wayanadPos.x} cy={wayanadPos.y} r="28" fill="#f59e0b" />
            </g>
          )}

          {/* 6. Infrastructure Markers Layer */}
          {layers.infrastructure && (
            <g fill="#a855f7" stroke="#ffffff" strokeWidth="0.8">
              {/* Substations & Bridges (Chennai) */}
              <rect x={chennaiPos.x - 18} y={chennaiPos.y - 10} width="5" height="5" rx="1" />
              <rect x={chennaiPos.x + 12} y={chennaiPos.y + 6} width="5" height="5" rx="1" />
              {/* Port & Highway Corridor (East Coast) */}
              <rect x={cyclonePos.x - 35} y={cyclonePos.y + 18} width="5" height="5" rx="1" />
            </g>
          )}

          {/* ======================================================== */}
          {/* ACTIVE EVENT INTELLIGENCE CONNECTOR TO RIGHT PANEL       */}
          {/* Visual link from selected map event to Column 3          */}
          {/* ======================================================== */}
          <g className="pointer-events-none">
            {/* Target focus ring around active marker */}
            <circle
              cx={activeMarkerPos.x}
              cy={activeMarkerPos.y}
              r="20"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              className="animate-spin"
              style={{ transformOrigin: `${activeMarkerPos.x}px ${activeMarkerPos.y}px`, animationDuration: '6s' }}
            />
            {/* Directional beam pointing towards right edge / Event Intelligence panel */}
            <line
              x1={activeMarkerPos.x + 12}
              y1={activeMarkerPos.y}
              x2="665"
              y2={activeMarkerPos.y}
              stroke="#38bdf8"
              strokeWidth="1.2"
              strokeDasharray="4 3"
              opacity="0.85"
            />
            <polygon
              points={`665,${activeMarkerPos.y} 656,${activeMarkerPos.y - 4} 656,${activeMarkerPos.y + 4}`}
              fill="#38bdf8"
            />
            {/* Floating indicator tag on the line */}
            <rect
              x={Math.min(activeMarkerPos.x + 35, 510)}
              y={activeMarkerPos.y - 12}
              width="134"
              height="16"
              rx="3"
              fill="#0f172a"
              stroke="#38bdf8"
              strokeWidth="0.9"
              opacity="0.92"
            />
            <text
              x={Math.min(activeMarkerPos.x + 40, 515)}
              y={activeMarkerPos.y - 1}
              fill="#38bdf8"
              fontSize="7.5"
              fontFamily="monospace"
              fontWeight="bold"
            >
              ACTIVE INTELLIGENCE LINK →
            </text>
          </g>

          {/* ======================================================== */}
          {/* 5 WEATHER EVENT PINS WITH EXACT STATUS COLOR CODING */}
          {/* ======================================================== */}

          {/* EVENT 1: Chennai (Adyar-Cooum River Confluence Flood) - CRITICAL (RED) */}
          <g
            id="map-marker-evt-1"
            className="cursor-pointer group"
            onClick={() => onSelectEvent(events[0])}
          >
            {/* Concentric Pulsing Waves */}
            <circle
              cx={chennaiPos.x}
              cy={chennaiPos.y}
              r="22"
              fill="#ef4444"
              opacity="0.3"
              className="animate-ping"
              style={{ animationDuration: '2.5s' }}
            />
            <circle
              cx={chennaiPos.x}
              cy={chennaiPos.y}
              r={selectedEvent.id === 'evt-1' ? '12' : '9'}
              fill="#dc2626"
              stroke="#ffffff"
              strokeWidth="2.5"
              filter="url(#glow)"
            />
            {/* Event Label Tag */}
            <g transform={`translate(${chennaiPos.x + 14}, ${chennaiPos.y - 12})`}>
              <rect
                x="0"
                y="-10"
                width="132"
                height="28"
                rx="4"
                fill="#0f172a"
                stroke={selectedEvent.id === 'evt-1' ? '#38bdf8' : '#ef4444'}
                strokeWidth={selectedEvent.id === 'evt-1' ? '1.8' : '1'}
                className="shadow-lg"
              />
              <text x="6" y="2" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
                EVT-089: CHENNAI FLOOD
              </text>
              <text x="6" y="13" fill="#f87171" fontSize="8" fontWeight="bold">
                ● CRITICAL (68.4 mm/h)
              </text>
            </g>
          </g>

          {/* EVENT 2: Cyclone Wind & Rain (East Coast / Bay of Bengal) - CRITICAL (RED) */}
          <g
            id="map-marker-evt-2"
            className="cursor-pointer group"
            onClick={() => onSelectEvent(events[1])}
          >
            <circle
              cx={cyclonePos.x}
              cy={cyclonePos.y}
              r="18"
              fill="#ef4444"
              opacity="0.25"
              className="animate-ping"
              style={{ animationDuration: '3s' }}
            />
            <circle
              cx={cyclonePos.x}
              cy={cyclonePos.y}
              r={selectedEvent.id === 'evt-2' ? '12' : '9'}
              fill="#dc2626"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            <g transform={`translate(${cyclonePos.x + 14}, ${cyclonePos.y - 8})`}>
              <rect
                x="0"
                y="-10"
                width="134"
                height="28"
                rx="4"
                fill="#0f172a"
                stroke={selectedEvent.id === 'evt-2' ? '#38bdf8' : '#ef4444'}
                strokeWidth={selectedEvent.id === 'evt-2' ? '1.8' : '1'}
              />
              <text x="6" y="2" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
                EVT-092: CYCLONE TRACK
              </text>
              <text x="6" y="13" fill="#f87171" fontSize="8" fontWeight="bold">
                ● CRITICAL (120 km/h)
              </text>
            </g>
          </g>

          {/* EVENT 3: Wayanad Debris Flow - HIGH (ORANGE) */}
          <g
            id="map-marker-evt-3"
            className="cursor-pointer group"
            onClick={() => onSelectEvent(events[2])}
          >
            <circle
              cx={wayanadPos.x}
              cy={wayanadPos.y}
              r={selectedEvent.id === 'evt-3' ? '11' : '8'}
              fill="#ea580c"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <g transform={`translate(${wayanadPos.x - 138}, ${wayanadPos.y - 12})`}>
              <rect
                x="0"
                y="-10"
                width="128"
                height="28"
                rx="4"
                fill="#0f172a"
                stroke={selectedEvent.id === 'evt-3' ? '#38bdf8' : '#ea580c'}
                strokeWidth={selectedEvent.id === 'evt-3' ? '1.8' : '1'}
              />
              <text x="6" y="2" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
                EVT-084: WAYANAD SLIP
              </text>
              <text x="6" y="13" fill="#fb923c" fontSize="8" fontWeight="bold">
                ● HIGH (94 mm/h)
              </text>
            </g>
          </g>

          {/* EVENT 4: Heatwave Conditions (Rajasthan) - MODERATE (YELLOW) */}
          <g
            id="map-marker-evt-4"
            className="cursor-pointer group"
            onClick={() => onSelectEvent(events[3])}
          >
            <circle
              cx={rajasthanPos.x}
              cy={rajasthanPos.y}
              r={selectedEvent.id === 'evt-4' ? '11' : '8'}
              fill="#ca8a04"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <g transform={`translate(${rajasthanPos.x + 12}, ${rajasthanPos.y - 8})`}>
              <rect
                x="0"
                y="-10"
                width="126"
                height="28"
                rx="4"
                fill="#0f172a"
                stroke={selectedEvent.id === 'evt-4' ? '#38bdf8' : '#ca8a04'}
                strokeWidth={selectedEvent.id === 'evt-4' ? '1.8' : '1'}
              />
              <text x="6" y="2" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
                EVT-077: RAJASTHAN HEAT
              </text>
              <text x="6" y="13" fill="#facc15" fontSize="8" fontWeight="bold">
                ● MODERATE (42°C)
              </text>
            </g>
          </g>

          {/* EVENT 5: Landslide Risk (Uttarakhand) - LOW (BLUE/GREEN) */}
          <g
            id="map-marker-evt-5"
            className="cursor-pointer group"
            onClick={() => onSelectEvent(events[4])}
          >
            <circle
              cx={uttarakhandPos.x}
              cy={uttarakhandPos.y}
              r={selectedEvent.id === 'evt-5' ? '11' : '8'}
              fill="#059669"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <g transform={`translate(${uttarakhandPos.x + 12}, ${uttarakhandPos.y - 8})`}>
              <rect
                x="0"
                y="-10"
                width="130"
                height="28"
                rx="4"
                fill="#0f172a"
                stroke={selectedEvent.id === 'evt-5' ? '#38bdf8' : '#059669'}
                strokeWidth={selectedEvent.id === 'evt-5' ? '1.8' : '1'}
              />
              <text x="6" y="2" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
                EVT-065: UTTARAKHAND
              </text>
              <text x="6" y="13" fill="#34d399" fontSize="8" fontWeight="bold">
                ● LOW (61% Saturation)
              </text>
            </g>
          </g>
        </svg>

        {/* Floating Legend / Cluster Summary */}
        <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-slate-800 rounded-lg p-2.5 text-[10px] text-slate-300 font-mono shadow-xl backdrop-blur-xs flex flex-col gap-1.5">
          <div className="font-bold text-white uppercase tracking-wider text-[9px] border-b border-slate-800 pb-1 flex items-center justify-between">
            <span>Operational Legend</span>
            <span className="text-slate-400">5 Clusters</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 ring-2 ring-red-400/30"></span>
              <span>Critical (2)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              <span>High (1)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span>Moderate (1)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Low (1)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Bottom Attribution */}
      <div className="px-3 py-1.5 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between font-mono">
        <span className="flex items-center gap-2">
          <span className="text-blue-400 font-bold">Selected:</span>
          <span className="text-white font-semibold">{selectedEvent.code} — {selectedEvent.location}</span>
        </span>
        <span>Projection: LCC India • 10:45 AM Sync</span>
      </div>
    </div>
  );
};
