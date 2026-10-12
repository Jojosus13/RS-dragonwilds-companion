import React from 'react';
import { ASHENFALL_REGIONS } from '../../data/mapData';

export default function MapTerrainSvg({
  mapSvgRef,
  mapLayerType = 'satellite',
  visibleMarkers = [],
  selectedMarker,
  setSelectedMarker,
  activeWaypoints = [],
  checkedWaypoints = {}
}) {
  return (
    <svg
      ref={mapSvgRef}
      width="1024"
      height="1024"
      viewBox="0 0 1024 1024"
      className="ashenfall-svg-map"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Parchment & Terrain Gradients */}
        <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0b111a" />
          <stop offset="100%" stopColor="#06090e" />
        </radialGradient>

        <radialGradient id="highlandsGrad" cx="25%" cy="20%" r="35%">
          <stop offset="0%" stopColor="rgba(66, 153, 225, 0.25)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <radialGradient id="dowdunGrad" cx="50%" cy="18%" r="30%">
          <stop offset="0%" stopColor="rgba(197, 48, 48, 0.28)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <radialGradient id="volcanoGrad" cx="80%" cy="18%" r="35%">
          <stop offset="0%" stopColor="rgba(237, 137, 54, 0.32)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <radialGradient id="fellhollowGrad" cx="22%" cy="42%" r="28%">
          <stop offset="0%" stopColor="rgba(107, 70, 193, 0.3)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <radialGradient id="swampGrad" cx="75%" cy="40%" r="30%">
          <stop offset="0%" stopColor="rgba(49, 151, 149, 0.28)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <radialGradient id="umbralGrad" cx="80%" cy="70%" r="38%">
          <stop offset="0%" stopColor="rgba(214, 158, 46, 0.3)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <radialGradient id="brynmoorGrad" cx="50%" cy="88%" r="30%">
          <stop offset="0%" stopColor="rgba(56, 178, 172, 0.25)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        <radialGradient id="citadelGrad" cx="48%" cy="35%" r="22%">
          <stop offset="0%" stopColor="rgba(159, 122, 234, 0.35)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Grid pattern */}
        <pattern id="coordGrid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
        </pattern>
      </defs>

      {/* MAP BASE LAYER */}
      {mapLayerType === 'satellite' ? (
        /* OFFICIAL HIGH-RESOLUTION COMPLETE CONTINENT MAP */
        <g className="wiki-tiles-layer">
          <rect width="1024" height="1024" fill="#080c12" />
          <image
            href="/map/ashenfall-full.jpg"
            x="0"
            y="0"
            width="1024"
            height="1024"
            preserveAspectRatio="none"
          />
          {/* Subtle fantasy grid on top */}
          <rect width="1024" height="1024" fill="url(#coordGrid)" opacity="0.35" pointerEvents="none" />
        </g>
      ) : (
        /* STYLIZED CARTOGRAPHIC / PERGAMINO VECTOR LAYER */
        <g className="cartographic-layer">
          {/* Ocean Background */}
          <rect width="1024" height="1024" fill="url(#oceanGrad)" />

          {/* Coordinate Grid Overlay */}
          <rect width="1024" height="1024" fill="url(#coordGrid)" />

          {/* Continental Landmass Shape of Ashenfall */}
          <path
            d="M 180 140 
               Q 350 80, 560 90 
               Q 780 100, 890 190 
               Q 960 300, 920 480 
               Q 940 660, 860 780 
               Q 720 900, 480 890 
               Q 260 880, 160 760 
               Q 80 620, 90 440 
               Q 100 260, 180 140 Z"
            fill="#141923"
            stroke="var(--gold-border)"
            strokeWidth="3"
            className="landmass-outline"
          />

          {/* Biome Color Atmosphere Overlays */}
          <rect x="0" y="0" width="1024" height="1024" fill="url(#highlandsGrad)" />
          <rect x="0" y="0" width="1024" height="1024" fill="url(#dowdunGrad)" />
          <rect x="0" y="0" width="1024" height="1024" fill="url(#volcanoGrad)" />
          <rect x="0" y="0" width="1024" height="1024" fill="url(#fellhollowGrad)" />
          <rect x="0" y="0" width="1024" height="1024" fill="url(#swampGrad)" />
          <rect x="0" y="0" width="1024" height="1024" fill="url(#umbralGrad)" />
          <rect x="0" y="0" width="1024" height="1024" fill="url(#brynmoorGrad)" />
          <rect x="0" y="0" width="1024" height="1024" fill="url(#citadelGrad)" />

          {/* Rivers and Magma Streams */}
          <path
            d="M 500 310 Q 540 460, 480 620 Q 440 760, 490 880"
            fill="none"
            stroke="#2b6cb0"
            strokeWidth="4"
            strokeDasharray="6 2"
            opacity="0.6"
          />
          <path
            d="M 780 160 Q 840 230, 890 320"
            fill="none"
            stroke="#dd6b20"
            strokeWidth="4"
            opacity="0.8"
          />

          {/* Ancient Roads / Main Trails */}
          <path
            d="M 480 620 L 490 880 M 480 620 L 190 640 M 480 620 L 230 440 M 230 440 L 260 220 M 480 620 L 530 190 M 480 620 L 500 380 M 480 620 L 740 410 M 740 410 L 820 690 M 530 190 L 810 180"
            fill="none"
            stroke="rgba(212, 175, 55, 0.25)"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
        </g>
      )}

      {/* Region Label Titles */}
      {ASHENFALL_REGIONS.map((reg) => {
        const centerX = reg.bounds.x + reg.bounds.width / 2;
        const centerY = reg.bounds.y + reg.bounds.height / 2;
        const lines = reg.lines || [reg.name.toUpperCase()];
        const isMultiLine = lines.length > 1;

        return (
          <g key={reg.id} className="map-region-label-group">
            <text
              x={centerX}
              y={isMultiLine ? centerY - (lines.length - 1) * 7 : centerY}
              textAnchor="middle"
              className="map-region-label"
            >
              {lines.map((line, lineIdx) => (
                <tspan
                  key={lineIdx}
                  x={centerX}
                  dy={lineIdx === 0 ? 0 : 15}
                >
                  {line}
                </tspan>
              ))}
            </text>
            <text
              x={centerX}
              y={isMultiLine ? centerY + 15 * lines.length - 2 : centerY + 18}
              textAnchor="middle"
              className="map-region-tier"
            >
              Tier {reg.tier} · Peligro: {reg.dangerLevel}
            </text>
          </g>
        );
      })}

      {/* ACTIVE ROUTE WAYPOINT CONNECTOR LINES */}
      {activeWaypoints.length > 1 && (
        <g className="route-polyline-group">
          {/* Glowing underlay line */}
          <polyline
            points={activeWaypoints.map((wp) => `${wp.coords.x},${wp.coords.y}`).join(' ')}
            fill="none"
            stroke="#ecc94b"
            strokeWidth="5"
            strokeOpacity="0.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Animated dash line */}
          <polyline
            points={activeWaypoints.map((wp) => `${wp.coords.x},${wp.coords.y}`).join(' ')}
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeDasharray="8 6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animated-route-line"
          />
        </g>
      )}

      {/* MAP MARKERS (POIs) */}
      {visibleMarkers.map((marker) => {
        const isSelected = selectedMarker?.id === marker.id;
        const isWaypoint = activeWaypoints.some((wp) => wp.coords.x === marker.coords.x && wp.coords.y === marker.coords.y);
        const waypointIndex = activeWaypoints.findIndex((wp) => wp.coords.x === marker.coords.x && wp.coords.y === marker.coords.y);

        return (
          <g
            key={marker.id}
            transform={`translate(${marker.coords.x}, ${marker.coords.y})`}
            className={`map-marker-pin-group ${isSelected ? 'selected' : ''}`}
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setSelectedMarker(marker);
            }}
          >
            {/* Outer Pulsing Aura when selected */}
            {isSelected && (
              <circle
                r="22"
                fill="none"
                stroke={marker.color || 'var(--gold-400)'}
                strokeWidth="2"
                className="marker-pulse-ring"
              />
            )}

            {/* Marker Pin Base */}
            <circle
              r="12"
              fill={marker.color || '#48bb78'}
              stroke="#fff"
              strokeWidth="1.5"
              className="map-marker-circle"
            />

            {/* Waypoint Sequence Number Badge */}
            {isWaypoint ? (
              <text
                y="4"
                textAnchor="middle"
                fill="#000"
                fontSize="11"
                fontWeight="bold"
                fontFamily="var(--font-sans)"
                pointerEvents="none"
              >
                {waypointIndex + 1}
              </text>
            ) : (
              <circle r="4" fill="#0b111a" pointerEvents="none" />
            )}

            {/* Hover Label */}
            <text
              y="-16"
              textAnchor="middle"
              className="marker-label-text"
              pointerEvents="none"
            >
              {marker.title}
            </text>
          </g>
        );
      })}

      {/* CUSTOM / STANDALONE ROUTE WAYPOINTS (NOT TIED TO A POI) */}
      {activeWaypoints.map((wp, idx) => {
        const isAlreadyMarker = visibleMarkers.some((m) => m.coords.x === wp.coords.x && m.coords.y === wp.coords.y);
        if (isAlreadyMarker) return null;

        const isChecked = checkedWaypoints[wp.id];

        return (
          <g
            key={wp.id || idx}
            transform={`translate(${wp.coords.x}, ${wp.coords.y})`}
            className="custom-route-pin"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setSelectedMarker({
                id: wp.id,
                title: wp.title || `Parada #${idx + 1}`,
                coords: wp.coords,
                description: wp.note || 'Punto de ruta personalizado.',
                category: 'custom',
                color: '#48bb78'
              });
            }}
          >
            <circle
              r="12"
              fill={isChecked ? '#38a169' : '#ed8936'}
              stroke="#fff"
              strokeWidth="1.5"
            />
            <text
              y="4"
              textAnchor="middle"
              fill="#fff"
              fontSize="11"
              fontWeight="bold"
              fontFamily="var(--font-sans)"
            >
              {idx + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
