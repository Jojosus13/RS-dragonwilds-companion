import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Compass,
  MapPin,
  Search,
  X,
  Navigation as NavIcon,
  Shield,
  Scroll,
  Flame
} from 'lucide-react';
import { ASHENFALL_REGIONS, MAP_MARKERS, findLocationsForMaterial } from '../../data/mapData';
import { normalizeText } from '../../utils/searchUtils';
import MapControls from './MapControls';
import MapSidebar from './MapSidebar';
import MapMarkerPopup from './MapMarkerPopup';
import MapCoordinatesHUD from './MapCoordinatesHUD';
import CustomMarkerModal from './CustomMarkerModal';

const CATEGORY_META = {
  all: { label: 'Todos', icon: Compass, color: 'var(--gold-400)' },
  lodestones: { label: 'Piedras Guía', icon: Compass, color: '#48bb78' },
  vaults: { label: 'Bóvedas Dragonkin', icon: Shield, color: '#4299e1' },
  quests: { label: 'Misiones', icon: Scroll, color: '#ecc94b' },
  bosses: { label: 'Jefes y Élites', icon: Flame, color: '#e53e3e' },
  custom: { label: 'Mis Marcadores', icon: MapPin, color: '#ed8936' }
};

export default function InteractiveMap({
  focusTarget = null,
  onClearFocus = () => { },
  onSelectQuest = () => { },
  onSelectItem = () => { },
  onSelectVault = () => { }
}) {
  // Map Viewport Transformations
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: -100, y: -50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cursorCoords, setCursorCoords] = useState({ x: 500, y: 500 });

  // Filtering, Search y Layer View
  const [mapLayerType, setMapLayerType] = useState('satellite'); // 'satellite' | 'cartographic'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isRouteDrawerOpen, setIsRouteDrawerOpen] = useState(false);
  const [isAddingCustomPin, setIsAddingCustomPin] = useState(false);

  // Custom User Saved Markers (localStorage)
  const [customMarkers, setCustomMarkers] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_dw_custom_map_markers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_custom_map_markers', JSON.stringify(customMarkers));
    } catch { }
  }, [customMarkers]);

  // Active Waypoints Route (localStorage)
  const [activeWaypoints, setActiveWaypoints] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_dw_active_route_waypoints');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [checkedWaypoints, setCheckedWaypoints] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_dw_checked_waypoints');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [savedRoutes, setSavedRoutes] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_dw_saved_routes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [routeTitleInput, setRouteTitleInput] = useState('');
  const [customPinName, setCustomPinName] = useState('');
  const [customPinColor, setCustomPinColor] = useState('#ed8936');
  const [customPinNote, setCustomPinNote] = useState('');
  const [pendingPinCoords, setPendingPinCoords] = useState(null);

  const mapContainerRef = useRef(null);
  const mapSvgRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_active_route_waypoints', JSON.stringify(activeWaypoints));
    } catch { }
  }, [activeWaypoints]);

  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_checked_waypoints', JSON.stringify(checkedWaypoints));
    } catch { }
  }, [checkedWaypoints]);

  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_saved_routes', JSON.stringify(savedRoutes));
    } catch { }
  }, [savedRoutes]);

  // Handle Focus Target from External Navigation
  useEffect(() => {
    if (!focusTarget) return;

    if (focusTarget.coords) {
      const targetX = focusTarget.coords.x;
      const targetY = focusTarget.coords.y;

      const containerWidth = mapContainerRef.current ? mapContainerRef.current.clientWidth : 800;
      const containerHeight = mapContainerRef.current ? mapContainerRef.current.clientHeight : 600;

      const newPanX = containerWidth / 2 - targetX * 1.5;
      const newPanY = containerHeight / 2 - targetY * 1.5;

      setZoom(1.5);
      setPan({ x: newPanX, y: newPanY });

      if (focusTarget.type === 'vault') {
        if (selectedCategory !== 'all' && selectedCategory !== 'vaults') {
          setSelectedCategory('vaults');
        }
      }
      if (focusTarget.markerId || focusTarget.vaultId) {
        const targetId = focusTarget.markerId || focusTarget.vaultId;
        const found = MAP_MARKERS.find(m => m.id === targetId || m.vaultId === targetId || m.vaultId === focusTarget.vaultId);
        if (found) setSelectedMarker(found);
      } else if (focusTarget.title) {
        setSelectedMarker({
          id: 'focus-temp',
          title: focusTarget.title,
          coords: focusTarget.coords,
          description: focusTarget.description || 'Punto de interés seleccionado.',
          category: focusTarget.category || (focusTarget.type === 'vault' ? 'vaults' : 'quests'),
          region: focusTarget.region || 'Ashenfall',
          color: focusTarget.color || (focusTarget.type === 'vault' ? '#4299e1' : 'var(--gold-400)')
        });
      }
    } else if (focusTarget.materialName) {
      const nodes = findLocationsForMaterial(focusTarget.materialName);
      if (nodes.length > 0) {
        setSelectedCategory('all');
        setSearchQuery(focusTarget.materialName);

        const first = nodes[0];
        const containerWidth = mapContainerRef.current ? mapContainerRef.current.clientWidth : 800;
        const containerHeight = mapContainerRef.current ? mapContainerRef.current.clientHeight : 600;

        setZoom(1.35);
        setPan({
          x: containerWidth / 2 - first.coords.x * 1.35,
          y: containerHeight / 2 - first.coords.y * 1.35
        });
        setSelectedMarker(first);

        if (focusTarget.autoRoute) {
          const waypointsFromNodes = nodes.map((node, idx) => ({
            id: `wp-mat-${Date.now()}-${idx}`,
            title: `${idx + 1}. ${node.title}`,
            coords: node.coords,
            note: `${node.density || 'Nodo de recolección'} - ${node.region}`
          }));
          setActiveWaypoints(waypointsFromNodes);
          setIsRouteDrawerOpen(true);
        }
      }
    }
  }, [focusTarget]);

  const allMarkers = useMemo(() => {
    return [...MAP_MARKERS, ...customMarkers];
  }, [customMarkers]);

  const visibleMarkers = useMemo(() => {
    return allMarkers.filter((m) => {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'custom' && !m.isCustom) return false;
        if (selectedCategory !== 'custom' && m.category !== selectedCategory) return false;
      }

      if (searchQuery.trim()) {
        const normQ = normalizeText(searchQuery);
        const searchTarget = normalizeText(
          `${m.title} ${m.region || ''} ${m.description || ''} ${m.materialNames?.join(' ') || ''} ${m.drops?.join(' ') || ''}`
        );
        if (!searchTarget.includes(normQ)) return false;
      }

      return true;
    });
  }, [allMarkers, selectedCategory, searchQuery]);

  const routeStats = useMemo(() => {
    if (activeWaypoints.length < 2) {
      return { totalDistMeters: 0, totalDistKm: '0.0', estMinutes: 0, stops: activeWaypoints.length };
    }

    let totalPixels = 0;
    for (let i = 0; i < activeWaypoints.length - 1; i++) {
      const p1 = activeWaypoints[i].coords;
      const p2 = activeWaypoints[i + 1].coords;
      const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      totalPixels += dist;
    }

    const meters = Math.round(totalPixels * 4.2);
    const km = (meters / 1000).toFixed(1);
    const minutes = Math.max(1, Math.round(meters / 260));

    return { totalDistMeters: meters, totalDistKm: km, estMinutes: minutes, stops: activeWaypoints.length };
  }, [activeWaypoints]);

  const categoryCounts = useMemo(() => {
    const counts = { all: allMarkers.length, lodestones: 0, vaults: 0, quests: 0, bosses: 0, custom: customMarkers.length };
    allMarkers.forEach((m) => {
      if (counts[m.category] !== undefined) counts[m.category]++;
    });
    return counts;
  }, [allMarkers, customMarkers]);

  const centerOnCoord = (coords) => {
    const containerWidth = mapContainerRef.current ? mapContainerRef.current.clientWidth : 800;
    const containerHeight = mapContainerRef.current ? mapContainerRef.current.clientHeight : 600;

    setZoom(1.6);
    setPan({
      x: containerWidth / 2 - coords.x * 1.6,
      y: containerHeight / 2 - coords.y * 1.6
    });
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }

    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const mapX = Math.round((mouseX - pan.x) / zoom);
      const mapY = Math.round((mouseY - pan.y) / zoom);
      setCursorCoords({
        x: Math.max(0, Math.min(1024, mapX)),
        y: Math.max(0, Math.min(1024, mapY))
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
    const newZoom = Math.min(3.5, Math.max(0.6, zoom * zoomFactor));

    if (mapContainerRef.current) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newPanX = mouseX - (mouseX - pan.x) * (newZoom / zoom);
      const newPanY = mouseY - (mouseY - pan.y) * (newZoom / zoom);

      setZoom(newZoom);
      setPan({ x: newPanX, y: newPanY });
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length === 1) {
      setPan({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleResetView = () => {
    const containerWidth = mapContainerRef.current ? mapContainerRef.current.clientWidth : 800;
    const containerHeight = mapContainerRef.current ? mapContainerRef.current.clientHeight : 600;
    setZoom(1);
    setPan({
      x: (containerWidth - 1024) / 2,
      y: (containerHeight - 1024) / 2
    });
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapContainerRef.current?.requestFullscreen().catch(() => { });
    } else {
      document.exitFullscreen().catch(() => { });
    }
  };

  const handleMapClick = (e) => {
    if (isAddingCustomPin) {
      const rect = mapContainerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const mapX = Math.round((mouseX - pan.x) / zoom);
      const mapY = Math.round((mouseY - pan.y) / zoom);

      setPendingPinCoords({ x: mapX, y: mapY });
      setIsAddingCustomPin(false);
    }
  };

  const handleSaveCustomPin = () => {
    if (!customPinName.trim() || !pendingPinCoords) return;

    const newPin = {
      id: `custom-${Date.now()}`,
      title: customPinName.trim(),
      coords: pendingPinCoords,
      description: customPinNote.trim() || 'Marcador personalizado del aventurero.',
      category: 'custom',
      color: customPinColor,
      isCustom: true
    };

    setCustomMarkers((prev) => [...prev, newPin]);
    setSelectedMarker(newPin);
    setPendingPinCoords(null);
    setCustomPinName('');
    setCustomPinNote('');
  };

  const handleAddWaypoint = (wp) => {
    setActiveWaypoints((prev) => [...prev, wp]);
    setIsRouteDrawerOpen(true);
  };

  const handleToggleCheckedWaypoint = (wpId) => {
    setCheckedWaypoints((prev) => ({ ...prev, [wpId]: !prev[wpId] }));
  };

  const handleMoveWaypoint = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= activeWaypoints.length) return;
    const items = [...activeWaypoints];
    const [moved] = items.splice(index, 1);
    items.splice(newIndex, 0, moved);
    setActiveWaypoints(items);
  };

  const handleRemoveWaypoint = (index) => {
    setActiveWaypoints((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLoadPresetRoute = (preset) => {
    setActiveWaypoints(preset.waypoints);
    setCheckedWaypoints({});
    setIsRouteDrawerOpen(true);
    if (preset.waypoints.length > 0) {
      centerOnCoord(preset.waypoints[0].coords);
    }
  };

  const handleSaveCurrentRoute = () => {
    if (!routeTitleInput.trim()) return;
    const newRoute = {
      id: `saved-route-${Date.now()}`,
      title: routeTitleInput.trim(),
      waypoints: [...activeWaypoints]
    };
    setSavedRoutes((prev) => [...prev, newRoute]);
    setRouteTitleInput('');
  };

  const handleClearRoute = () => {
    setActiveWaypoints([]);
    setCheckedWaypoints({});
  };

  return (
    <div className="interactive-map-root">
      {/* Top Header Bar with Search y Route Toggle */}
      <div className="map-top-bar">
        <div className="map-title-wrap">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={22} color="var(--gold-400)" />
            <h2 className="map-title">Mapa Interactivo de Ashenfall</h2>
          </div>
          <span className="map-subtitle">Continente Ancestral de Dragonwilds</span>
        </div>

        <div className="map-actions-wrap">
          <div className="map-search-box">
            <Search size={16} className="map-search-icon" />
            <input
              type="text"
              placeholder="Buscar recurso, misión, bóveda o jefe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="map-search-input"
            />
            {searchQuery && (
              <button className="map-search-clear" onClick={() => setSearchQuery('')}>
                <X size={14} />
              </button>
            )}
          </div>

          <button
            className={`btn-fantasy map-route-toggle-btn ${activeWaypoints.length > 0 ? 'gold' : ''}`}
            onClick={() => setIsRouteDrawerOpen((prev) => !prev)}
          >
            <NavIcon size={16} />
            <span>Ruta ({activeWaypoints.length})</span>
            {activeWaypoints.length > 0 && (
              <span className="badge" style={{ background: '#48bb78', color: '#000', fontWeight: 'bold' }}>
                {routeStats.totalDistKm} km
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar y Route Drawer */}
      <MapSidebar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categoryMeta={CATEGORY_META}
        categoryCounts={categoryCounts}
        isRouteDrawerOpen={isRouteDrawerOpen}
        onToggleRouteDrawer={() => setIsRouteDrawerOpen((prev) => !prev)}
        activeWaypoints={activeWaypoints}
        checkedWaypoints={checkedWaypoints}
        routeStats={routeStats}
        onToggleCheckedWaypoint={handleToggleCheckedWaypoint}
        onCenterCoord={centerOnCoord}
        onMoveWaypoint={handleMoveWaypoint}
        onRemoveWaypoint={handleRemoveWaypoint}
        onLoadPresetRoute={handleLoadPresetRoute}
        routeTitleInput={routeTitleInput}
        onRouteTitleInputChange={setRouteTitleInput}
        onSaveCurrentRoute={handleSaveCurrentRoute}
        onClearRoute={handleClearRoute}
      />

      {/* Main Interactive Map Viewport */}
      <div
        className="map-canvas-wrapper"
        ref={mapContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? 'grabbing' : (isAddingCustomPin ? 'crosshair' : 'grab') }}
      >
        <MapCoordinatesHUD cursorCoords={cursorCoords} zoom={zoom} />

        <MapControls
          zoom={zoom}
          onZoomIn={() => setZoom((prev) => Math.min(3.5, prev * 1.25))}
          onZoomOut={() => setZoom((prev) => Math.max(0.6, prev * 0.8))}
          onResetView={handleResetView}
          onToggleFullscreen={handleToggleFullscreen}
          mapLayerType={mapLayerType}
          onToggleLayer={() => setMapLayerType((prev) => prev === 'satellite' ? 'cartographic' : 'satellite')}
          isAddingCustomPin={isAddingCustomPin}
          onToggleAddCustomPin={() => setIsAddingCustomPin((prev) => !prev)}
          isRouteDrawerOpen={isRouteDrawerOpen}
          onToggleRouteDrawer={() => setIsRouteDrawerOpen((prev) => !prev)}
          activeWaypointsCount={activeWaypoints.length}
        />

        {/* Compass Rose */}
        <div className="map-compass-rose">
          <span className="compass-n">N</span>
          <div className="compass-pointer">✦</div>
          <span className="compass-region">ASHENFALL</span>
        </div>

        {/* Map SVG Layer */}
        <div
          className="map-transform-layer"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0'
          }}
          onClick={handleMapClick}
        >
          <svg
            ref={mapSvgRef}
            width="1024"
            height="1024"
            viewBox="0 0 1024 1024"
            className="ashenfall-svg-map"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <radialGradient id="oceanGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0b111a" />
                <stop offset="100%" stopColor="#06090e" />
              </radialGradient>
              <pattern id="coordGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* MAP BASE LAYER */}
            {mapLayerType === 'satellite' ? (
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
                <rect width="1024" height="1024" fill="url(#coordGrid)" opacity="0.35" pointerEvents="none" />
              </g>
            ) : (
              <g className="cartographic-layer">
                <rect width="1024" height="1024" fill="url(#oceanGrad)" />
                <rect width="1024" height="1024" fill="url(#coordGrid)" />
                <path
                  d="M 180 140 Q 350 80, 560 90 Q 780 100, 890 190 Q 960 300, 920 480 Q 940 660, 860 780 Q 720 900, 480 890 Q 260 880, 160 760 Q 80 620, 90 440 Q 100 260, 180 140 Z"
                  fill="#141923"
                  stroke="var(--gold-border)"
                  strokeWidth="3"
                  className="landmass-outline"
                />
              </g>
            )}

            {/* Region Labels */}
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
                      <tspan key={lineIdx} x={centerX} dy={lineIdx === 0 ? 0 : 15}>
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
                    ★ {reg.tier} · Peligro: {reg.dangerLevel}
                  </text>
                </g>
              );
            })}

            {/* Route Connector Lines */}
            {activeWaypoints.length > 1 && (
              <g className="route-polyline-group">
                <polyline
                  points={activeWaypoints.map((wp) => `${wp.coords.x},${wp.coords.y}`).join(' ')}
                  fill="none"
                  stroke="#ecc94b"
                  strokeWidth="5"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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

            {/* POI Markers */}
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
                  {isSelected && (
                    <circle
                      r="22"
                      fill="none"
                      stroke={marker.color || 'var(--gold-400)'}
                      strokeWidth="2"
                      className="marker-pulse-ring"
                    />
                  )}

                  <circle
                    r="12"
                    fill={marker.color || '#48bb78'}
                    stroke="#fff"
                    strokeWidth="1.5"
                    className="map-marker-circle"
                  />

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
          </svg>
        </div>
      </div>

      {/* Selected Marker Popup */}
      {selectedMarker && (
        <MapMarkerPopup
          marker={selectedMarker}
          onClose={() => setSelectedMarker(null)}
          onAddWaypoint={handleAddWaypoint}
          onCenterCoord={centerOnCoord}
          onSelectVault={onSelectVault}
        />
      )}

      {/* Custom Marker Creation Modal */}
      <CustomMarkerModal
        isOpen={!!pendingPinCoords}
        onClose={() => setPendingPinCoords(null)}
        coords={pendingPinCoords || { x: 0, y: 0 }}
        pinName={customPinName}
        onPinNameChange={setCustomPinName}
        pinColor={customPinColor}
        onPinColorChange={setCustomPinColor}
        pinNote={customPinNote}
        onPinNoteChange={setCustomPinNote}
        onSave={handleSaveCustomPin}
      />
    </div>
  );
}
