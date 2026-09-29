import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Compass, 
  MapPin, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Navigation as NavIcon, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  Layers, 
  Shield, 
  Pickaxe, 
  Scroll, 
  Flame, 
  Sparkles, 
  Clock, 
  Footprints, 
  X, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown, 
  Download, 
  Save, 
  Eye, 
  ExternalLink,
  Sliders,
  Flag,
  Info
} from 'lucide-react';
import { ASHENFALL_REGIONS, MAP_MARKERS, PRESET_ROUTES, findLocationsForMaterial } from '../data/mapData';
import { normalizeText } from '../utils/searchUtils';

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
  onClearFocus = () => {},
  onSelectQuest = () => {},
  onSelectItem = () => {},
  onSelectVault = () => {}
}) {
  // Map Viewport Transformations
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: -100, y: -50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [cursorCoords, setCursorCoords] = useState({ x: 500, y: 500 });
  
  // Filtering, Search y Layer View
  const [mapLayerType, setMapLayerType] = useState('satellite'); // 'satellite' (official tiles) or 'cartographic'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isRouteDrawerOpen, setIsRouteDrawerOpen] = useState(false);
  const [isAddingCustomPin, setIsAddingCustomPin] = useState(false);
  
  // Custom User Saved Markers (in localStorage)
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
    } catch {}
  }, [customMarkers]);

  // Active Waypoints Route (in localStorage)
  const [activeWaypoints, setActiveWaypoints] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_dw_active_route_waypoints');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Checked/Completed Waypoints
  const [checkedWaypoints, setCheckedWaypoints] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_dw_checked_waypoints');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // User Saved Routes Library
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

  const mapContainerRef = useRef(null);
  const mapSvgRef = useRef(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_active_route_waypoints', JSON.stringify(activeWaypoints));
    } catch {}
  }, [activeWaypoints]);

  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_checked_waypoints', JSON.stringify(checkedWaypoints));
    } catch {}
  }, [checkedWaypoints]);

  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_saved_routes', JSON.stringify(savedRoutes));
    } catch {}
  }, [savedRoutes]);

  // Handle Focus Target from External Navigation (e.g. Clicking "Ver en Mapa" in Quest or Material)
  useEffect(() => {
    if (!focusTarget) return;

    if (focusTarget.coords) {
      // Center map on focusTarget coordinates
      const targetX = focusTarget.coords.x;
      const targetY = focusTarget.coords.y;
      
      const containerWidth = mapContainerRef.current ? mapContainerRef.current.clientWidth : 800;
      const containerHeight = mapContainerRef.current ? mapContainerRef.current.clientHeight : 600;
      
      const newPanX = containerWidth / 2 - targetX * 1.5;
      const newPanY = containerHeight / 2 - targetY * 1.5;
      
      setZoom(1.5);
      setPan({ x: newPanX, y: newPanY });

      // Match marker
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
      // Find all locations for material and generate a farming route!
      const nodes = findLocationsForMaterial(focusTarget.materialName);
      if (nodes.length > 0) {
        // Switch category to resources
        setSelectedCategory('resources');
        setSearchQuery(focusTarget.materialName);
        
        // Center on first node
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

  // Combine static markers and custom user markers
  const allMarkers = useMemo(() => {
    return [...MAP_MARKERS, ...customMarkers];
  }, [customMarkers]);

  // Filtered markers based on category and search
  const visibleMarkers = useMemo(() => {
    return allMarkers.filter((m) => {
      // Category Filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'custom' && !m.isCustom) return false;
        if (selectedCategory !== 'custom' && m.category !== selectedCategory) return false;
      }

      // Search Query
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

  // Route Calculations (Total Distance y Estimated Time)
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

    // Scaling: 1 pixel ~ 4.2 in-game meters
    const meters = Math.round(totalPixels * 4.2);
    const km = (meters / 1000).toFixed(1);
    // Running speed ~ 4.5 m/s (approx 270m per minute)
    const minutes = Math.max(1, Math.round(meters / 260));

    return {
      totalDistMeters: meters,
      totalDistKm: km,
      estMinutes: minutes,
      stops: activeWaypoints.length
    };
  }, [activeWaypoints]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: allMarkers.length, custom: customMarkers.length };
    MAP_MARKERS.forEach((m) => {
      counts[m.category] = (counts[m.category] || 0) + 1;
    });
    return counts;
  }, [allMarkers, customMarkers]);

  const isPointerDownRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Pan and Drag Handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only main left click
    isPointerDownRef.current = true;
    dragStartPosRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y
    };
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    // Update real-time map coordinates
    if (mapSvgRef.current) {
      const rect = mapSvgRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const rawX = ((e.clientX - rect.left) / rect.width) * 1024;
        const rawY = ((e.clientY - rect.top) / rect.height) * 1024;
        const clampedX = Math.max(0, Math.min(1024, Math.round(rawX)));
        const clampedY = Math.max(0, Math.min(1024, Math.round(rawY)));
        setCursorCoords({ x: clampedX, y: clampedY });
      }
    }

    if (!isPointerDownRef.current) return;
    const dx = e.clientX - dragStartPosRef.current.x;
    const dy = e.clientY - dragStartPosRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 5) {
      setIsDragging(true);
      setPan({
        x: dragStartPosRef.current.panX + dx,
        y: dragStartPosRef.current.panY + dy
      });
    }
  };

  const handleMouseUp = () => {
    isPointerDownRef.current = false;
    setTimeout(() => {
      setIsDragging(false);
    }, 40);
  };

  // Touch Handlers for Mobile (Pinch-to-zoom and Pan)
  const touchStartRef = useRef({ dist: 0, pan: { x: 0, y: 0 }, touch: { x: 0, y: 0 } });

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartRef.current.touch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      touchStartRef.current.pan = { ...pan };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartRef.current.dist = Math.sqrt(dx * dx + dy * dy);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      const dx = e.touches[0].clientX - touchStartRef.current.touch.x;
      const dy = e.touches[0].clientY - touchStartRef.current.touch.y;
      setPan({
        x: touchStartRef.current.pan.x + dx,
        y: touchStartRef.current.pan.y + dy
      });
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.sqrt(dx * dx + dy * dy);
      const ratio = newDist / (touchStartRef.current.dist || newDist);
      
      setZoom((prev) => Math.min(3.5, Math.max(0.6, prev * ratio)));
      touchStartRef.current.dist = newDist;
    }
  };

  // Zoom Handler (Wheel)
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.15 : 0.88;
    setZoom((prev) => Math.min(3.5, Math.max(0.6, prev * zoomFactor)));
  };

  // Map Click Handler (Adding custom waypoint or pin)
  const handleMapClick = (e) => {
    if (isDragging) return;

    if (mapSvgRef.current) {
      const rect = mapSvgRef.current.getBoundingClientRect();
      const clickX = Math.round(((e.clientX - rect.left) / rect.width) * 1024);
      const clickY = Math.round(((e.clientY - rect.top) / rect.height) * 1024);

      if (isAddingCustomPin) {
        const newPin = {
          id: `custom-${Date.now()}`,
          title: customPinName.trim() || `Marcador #${customMarkers.length + 1}`,
          category: 'custom',
          coords: { x: clickX, y: clickY },
          region: 'Marcador Personal',
          description: 'Punto de interés personalizado creado por el jugador.',
          icon: 'MapPin',
          color: '#ed8936',
          isCustom: true
        };
        setCustomMarkers((prev) => [...prev, newPin]);
        setIsAddingCustomPin(false);
        setCustomPinName('');
        setSelectedMarker(newPin);
      }
    }
  };

  // Waypoint actions
  const handleAddWaypoint = (wp) => {
    setActiveWaypoints((prev) => [...prev, wp]);
  };

  const handleRemoveWaypoint = (index) => {
    setActiveWaypoints((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveWaypoint = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === activeWaypoints.length - 1) return;
    
    setActiveWaypoints((prev) => {
      const copy = [...prev];
      const targetIdx = direction === 'up' ? index - 1 : index + 1;
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  const handleToggleCheckedWaypoint = (wpId) => {
    setCheckedWaypoints((prev) => ({
      ...prev,
      [wpId]: !prev[wpId]
    }));
  };

  const handleClearRoute = () => {
    setActiveWaypoints([]);
    setCheckedWaypoints({});
  };

  const handleLoadPresetRoute = (preset) => {
    setActiveWaypoints(preset.waypoints);
    setCheckedWaypoints({});
    setIsRouteDrawerOpen(true);
  };

  const handleSaveCurrentRoute = () => {
    if (!routeTitleInput.trim() || activeWaypoints.length === 0) return;
    const newSaved = {
      id: `saved-${Date.now()}`,
      title: routeTitleInput.trim(),
      waypoints: activeWaypoints,
      date: new Date().toLocaleDateString('es-ES')
    };
    setSavedRoutes((prev) => [...prev, newSaved]);
    setRouteTitleInput('');
  };

  const handleDeleteSavedRoute = (routeId) => {
    setSavedRoutes((prev) => prev.filter((r) => r.id !== routeId));
  };

  // Center camera on a specific coordinate
  const centerOnCoord = (coords) => {
    if (!mapContainerRef.current) return;
    const width = mapContainerRef.current.clientWidth;
    const height = mapContainerRef.current.clientHeight;
    setPan({
      x: width / 2 - coords.x * zoom,
      y: height / 2 - coords.y * zoom
    });
  };

  // Reset Map View
  const handleResetView = () => {
    setZoom(1);
    if (mapContainerRef.current) {
      const width = mapContainerRef.current.clientWidth;
      const height = mapContainerRef.current.clientHeight;
      setPan({ x: width / 2 - 500, y: height / 2 - 500 });
    } else {
      setPan({ x: -100, y: -50 });
    }
  };

  // Helper for marker icon
  const getMarkerIcon = (marker) => {
    switch (marker.category) {
      case 'lodestones': return <Compass size={14} color="#fff" />;
      case 'vaults': return <Shield size={14} color="#fff" />;
      case 'resources': return <Pickaxe size={14} color="#fff" />;
      case 'quests': return <Scroll size={14} color="#fff" />;
      case 'bosses': return <Flame size={14} color="#fff" />;
      default: return <MapPin size={14} color="#fff" />;
    }
  };

  return (
    <div className="map-view-container">
      {/* Top Header y Search Bar */}
      <div className="map-top-bar">
        <div className="map-title-wrap">
          <div className="map-title-icon">
            <Compass size={22} color="var(--gold-400)" />
          </div>
          <div>
            <h1 className="map-title">Mapa Interactivo de Ashenfall</h1>
            <p className="map-subtitle">Trazador de Rutas de Farmeo, Bóvedas Dragonkin y Puntos de Interés</p>
          </div>
        </div>

        <div className="map-actions-wrap">
          {/* Quick Search on Map */}
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

          {/* Route Drawer Toggle Button */}
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

      {/* Category Filter Pills */}
      <div className="map-category-pills-bar">
        {Object.entries(CATEGORY_META).map(([key, meta]) => {
          const Icon = meta.icon;
          const count = categoryCounts[key] || 0;
          const isActive = selectedCategory === key;

          return (
            <button
              key={key}
              className={`map-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedCategory(key)}
            >
              <Icon size={14} style={{ color: isActive ? 'var(--gold-300)' : meta.color }} />
              <span>{meta.label}</span>
              <span className="map-pill-count">{count}</span>
            </button>
          );
        })}
      </div>

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
        {/* Floating Map HUD y Controls */}
        <div className="map-hud-top-left">
          <div className="map-coord-badge">
            <NavIcon size={12} color="var(--gold-400)" />
            <span>X: {cursorCoords.x} · Y: {cursorCoords.y}</span>
          </div>
          {isAddingCustomPin && (
            <div className="map-pin-mode-alert">
              <MapPin size={14} />
              <span>Haz clic en el mapa para colocar el marcador</span>
              <button onClick={() => setIsAddingCustomPin(false)} className="btn-icon">
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        {/* Zoom y Camera Controls */}
        <div className="map-controls-floating">
          <button 
            className="map-ctrl-btn" 
            onClick={() => setZoom((prev) => Math.min(3.5, prev * 1.25))}
            title="Aumentar Zoom"
          >
            <ZoomIn size={18} />
          </button>
          <button 
            className="map-ctrl-btn" 
            onClick={() => setZoom((prev) => Math.max(0.6, prev * 0.8))}
            title="Disminuir Zoom"
          >
            <ZoomOut size={18} />
          </button>
          <button 
            className="map-ctrl-btn" 
            onClick={handleResetView}
            title="Centrar y Reiniciar Vista"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            className={`map-ctrl-btn ${mapLayerType === 'satellite' ? 'active' : ''}`}
            onClick={() => setMapLayerType((prev) => prev === 'satellite' ? 'cartographic' : 'satellite')}
            title={mapLayerType === 'satellite' ? 'Cambiar a Vista Pergamino / Cartográfica' : 'Cambiar a Terreno Oficial Wiki'}
          >
            <Layers size={18} />
          </button>
          <button 
            className={`map-ctrl-btn ${isAddingCustomPin ? 'active' : ''}`}
            onClick={() => setIsAddingCustomPin((prev) => !prev)}
            title="Añadir Marcador Personalizado"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Compass Rose (Rosa de los Vientos) */}
        <div className="map-compass-rose">
          <span className="compass-n">N</span>
          <div className="compass-pointer">✦</div>
          <span className="compass-region">ASHENFALL</span>
        </div>

        {/* Map SVG y Terrain Vector Renderer */}
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
          >
            <defs>
              {/* Parchment y Terrain Gradients */}
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
                    ★ {reg.tier} · Peligro: {reg.dangerLevel}
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
        </div>
      </div>

      {/* SELECTED MARKER DETAIL MODAL / POPUP CARD */}
      {selectedMarker && (
        <div className="map-poi-detail-card">
          <div className="map-poi-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="map-poi-category-tag" style={{ background: selectedMarker.color || 'var(--gold-500)' }}>
                {selectedMarker.category?.toUpperCase()}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                X: {selectedMarker.coords.x} · Y: {selectedMarker.coords.y}
              </span>
            </div>
            <button className="btn-fantasy btn-icon map-poi-close-btn" onClick={() => setSelectedMarker(null)} title="Cerrar">
              <X size={16} />
            </button>
          </div>

          {/* Dungeon / POI Banner Image */}
          {selectedMarker.image && (
            <div className="map-poi-img-wrap">
              <img
                src={selectedMarker.image}
                alt={selectedMarker.title}
                className="map-poi-img"
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e) => {
                  if (e.target && e.target.parentElement) {
                    e.target.parentElement.style.display = 'none';
                  }
                }}
              />
              {selectedMarker.wikiUrl && (
                <a
                  href={selectedMarker.wikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-poi-wiki-badge"
                  title="Ver en Dragonwilds Wiki"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={11} />
                  <span>Wiki</span>
                </a>
              )}
            </div>
          )}

          <h3 className="map-poi-title">{selectedMarker.title}</h3>
          <p className="map-poi-desc">{selectedMarker.description}</p>

          {/* Special Metadata by category */}
          {selectedMarker.loot && (
            <div className="map-poi-meta-block">
              <strong>Botín Clave y Patrones:</strong>
              <div className="map-poi-loot-chips">
                {selectedMarker.loot.map((lt, i) => (
                  <span key={i} className="map-loot-chip">✦ {lt}</span>
                ))}
              </div>
            </div>
          )}

          {selectedMarker.materialNames && (
            <div className="map-poi-meta-block">
              <strong>Materiales Extraíbles:</strong>
              <div className="map-poi-loot-chips">
                {selectedMarker.materialNames.map((mat, i) => (
                  <span key={i} className="map-loot-chip" style={{ background: 'rgba(66, 153, 225, 0.2)', color: '#63b3ed' }}>
                    ⛏️ {mat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedMarker.drops && (
            <div className="map-poi-meta-block">
              <strong>Recompensas de Combate ({selectedMarker.combatLevel}):</strong>
              <div className="map-poi-loot-chips">
                {selectedMarker.drops.map((drop, i) => (
                  <span key={i} className="map-loot-chip" style={{ background: 'rgba(229, 62, 62, 0.2)', color: '#fc8181' }}>
                    ⚔️ {drop}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Direct Link to Full Vault Guide if POI is a Vault */}
          {(selectedMarker.category === 'vaults' || selectedMarker.vaultId) && (
            <button
              className="btn-fantasy gold"
              style={{
                width: '100%',
                marginBottom: '10px',
                padding: '10px 14px',
                fontSize: '0.88rem',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(212, 175, 55, 0.25)'
              }}
              onClick={() => {
                onSelectVault(selectedMarker.vaultId || selectedMarker.id);
              }}
            >
              <Shield size={16} />
              <span>Ver Guía Completa de la Bóveda</span>
              <ChevronRight size={15} />
            </button>
          )}

          {/* Actions */}
          <div className="map-poi-actions">
            <button
              className="btn-fantasy gold"
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.85rem' }}
              onClick={() => {
                handleAddWaypoint({
                  id: `wp-${Date.now()}`,
                  title: selectedMarker.title,
                  coords: selectedMarker.coords,
                  note: selectedMarker.description
                });
                setIsRouteDrawerOpen(true);
              }}
            >
              <Plus size={14} />
              <span>Añadir a mi Ruta</span>
            </button>

            <button
              className="btn-fantasy"
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              onClick={() => centerOnCoord(selectedMarker.coords)}
            >
              <Compass size={14} />
              <span>Centrar</span>
            </button>
          </div>
        </div>
      )}

      {/* ROUTE PLANNER DRAWER (BOTTOM OR SIDEBAR) */}
      {isRouteDrawerOpen && (
        <div className="map-route-drawer">
          <div className="map-route-drawer-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-400)' }}>
              <NavIcon size={18} />
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', letterSpacing: '1px' }}>
                PLANIFICADOR DE RUTAS ({activeWaypoints.length} Paradas)
              </h3>
            </div>
            <button className="btn-fantasy btn-icon" onClick={() => setIsRouteDrawerOpen(false)} title="Cerrar">
              <X size={18} />
            </button>
          </div>

          {/* Route Metrics Summary */}
          {activeWaypoints.length > 0 && (
            <div className="map-route-summary-bar">
              <div className="route-metric-item">
                <Footprints size={16} color="var(--gold-400)" />
                <div>
                  <span className="metric-val">{routeStats.totalDistKm} km</span>
                  <span className="metric-label">Distancia Total</span>
                </div>
              </div>

              <div className="route-metric-item">
                <Clock size={16} color="#48bb78" />
                <div>
                  <span className="metric-val">~{routeStats.estMinutes} min</span>
                  <span className="metric-label">Tiempo Estimado</span>
                </div>
              </div>

              <div className="route-metric-item">
                <Flag size={16} color="#4299e1" />
                <div>
                  <span className="metric-val">{routeStats.stops}</span>
                  <span className="metric-label">Puntos Clave</span>
                </div>
              </div>
            </div>
          )}

          {/* Waypoints List */}
          <div className="map-waypoints-scroll-list">
            {activeWaypoints.length === 0 ? (
              <div className="empty-route-box">
                <NavIcon size={32} style={{ opacity: 0.3, marginBottom: '8px' }} />
                <p>No tienes ningún punto de ruta añadido.</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Haz clic en cualquier punto del mapa o selecciona una ruta predefinida abajo:
                </p>
              </div>
            ) : (
              activeWaypoints.map((wp, idx) => {
                const isChecked = checkedWaypoints[wp.id];
                return (
                  <div key={wp.id || idx} className={`map-waypoint-card ${isChecked ? 'completed' : ''}`}>
                    <button 
                      className="wp-check-btn"
                      onClick={() => handleToggleCheckedWaypoint(wp.id)}
                      title={isChecked ? 'Marcar como pendiente' : 'Marcar como completado'}
                    >
                      {isChecked ? <CheckCircle2 size={18} color="#48bb78" /> : <Circle size={18} color="var(--text-muted)" />}
                    </button>

                    <div className="wp-info" onClick={() => centerOnCoord(wp.coords)}>
                      <div className="wp-title-row">
                        <span className="wp-index-badge">{idx + 1}</span>
                        <h4 className="wp-name">{wp.title}</h4>
                      </div>
                      {wp.note && <p className="wp-note">{wp.note}</p>}
                    </div>

                    <div className="wp-actions">
                      <button 
                        className="wp-arrow-btn" 
                        disabled={idx === 0}
                        onClick={() => handleMoveWaypoint(idx, 'up')}
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button 
                        className="wp-arrow-btn" 
                        disabled={idx === activeWaypoints.length - 1}
                        onClick={() => handleMoveWaypoint(idx, 'down')}
                      >
                        <ChevronDown size={14} />
                      </button>
                      <button 
                        className="wp-delete-btn" 
                        onClick={() => handleRemoveWaypoint(idx)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Preset Routes Selection */}
          <div className="map-preset-routes-section">
            <h4 className="section-small-title">Rutas Recomendadas de Ashenfall:</h4>
            <div className="preset-route-chips">
              {PRESET_ROUTES.map((preset) => (
                <button
                  key={preset.id}
                  className="preset-chip-btn"
                  onClick={() => handleLoadPresetRoute(preset)}
                >
                  <span>{preset.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Save / Clear Route Actions */}
          <div className="map-route-footer-actions">
            {activeWaypoints.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', width: '100%', marginBottom: '8px' }}>
                <input
                  type="text"
                  placeholder="Nombre de mi ruta..."
                  value={routeTitleInput}
                  onChange={(e) => setRouteTitleInput(e.target.value)}
                  className="map-save-route-input"
                />
                <button 
                  className="btn-fantasy gold" 
                  onClick={handleSaveCurrentRoute}
                  disabled={!routeTitleInput.trim()}
                >
                  <Save size={14} />
                  <span>Guardar</span>
                </button>
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
              <button 
                className="btn-fantasy" 
                onClick={handleClearRoute} 
                disabled={activeWaypoints.length === 0}
                style={{ flex: 1 }}
              >
                <Trash2 size={14} />
                <span>Limpiar Ruta</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
