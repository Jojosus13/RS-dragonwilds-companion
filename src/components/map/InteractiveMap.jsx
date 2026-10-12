import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MAP_MARKERS, findLocationsForMaterial } from '../../data/mapData';
import { STORAGE_KEYS } from './mapConstants';
import { 
  calculateRouteStats, 
  filterVisibleMarkers, 
  calculateCategoryCounts 
} from './mapUtils';
import MapTopBar from './MapTopBar';
import MapCategoryBar from './MapCategoryBar';
import MapHudControls from './MapHudControls';
import MapTerrainSvg from './MapTerrainSvg';
import MapPoiDetailCard from './MapPoiDetailCard';
import MapRouteDrawer from './MapRouteDrawer';

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
  const [cursorCoords, setCursorCoords] = useState({ x: 500, y: 500 });
  
  // Filtering, Search & Layer View
  const [mapLayerType, setMapLayerType] = useState('satellite'); // 'satellite' | 'cartographic'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isRouteDrawerOpen, setIsRouteDrawerOpen] = useState(false);
  const [isAddingCustomPin, setIsAddingCustomPin] = useState(false);
  const [customPinName, setCustomPinName] = useState('');
  const [routeTitleInput, setRouteTitleInput] = useState('');

  // Custom User Saved Markers (localStorage)
  const [customMarkers, setCustomMarkers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_MARKERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_MARKERS, JSON.stringify(customMarkers));
    } catch {}
  }, [customMarkers]);

  // Active Waypoints Route (localStorage)
  const [activeWaypoints, setActiveWaypoints] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_WAYPOINTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_WAYPOINTS, JSON.stringify(activeWaypoints));
    } catch {}
  }, [activeWaypoints]);

  // Checked/Completed Waypoints (localStorage)
  const [checkedWaypoints, setCheckedWaypoints] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHECKED_WAYPOINTS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHECKED_WAYPOINTS, JSON.stringify(checkedWaypoints));
    } catch {}
  }, [checkedWaypoints]);

  // User Saved Routes Library (localStorage)
  const [savedRoutes, setSavedRoutes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_ROUTES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_ROUTES, JSON.stringify(savedRoutes));
    } catch {}
  }, [savedRoutes]);

  const mapContainerRef = useRef(null);
  const mapSvgRef = useRef(null);

  // Handle Focus Target from External Navigation (Quest, Material, Vault)
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
        setSelectedCategory('resources');
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

  // Combine static markers and custom markers
  const allMarkers = useMemo(() => {
    return [...MAP_MARKERS, ...customMarkers];
  }, [customMarkers]);

  // Filtered markers based on category and search
  const visibleMarkers = useMemo(() => {
    return filterVisibleMarkers(allMarkers, selectedCategory, searchQuery);
  }, [allMarkers, selectedCategory, searchQuery]);

  // Route statistics
  const routeStats = useMemo(() => {
    return calculateRouteStats(activeWaypoints);
  }, [activeWaypoints]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return calculateCategoryCounts(allMarkers, customMarkers, MAP_MARKERS);
  }, [allMarkers, customMarkers]);

  const isPointerDownRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const rafIdRef = useRef(null);
  const pendingPanRef = useRef(null);

  // High-performance pan updater synchronized with display refresh rate (rAF)
  const updatePan = (newPan) => {
    pendingPanRef.current = newPan;
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(() => {
        if (pendingPanRef.current) {
          setPan(pendingPanRef.current);
          pendingPanRef.current = null;
        }
        rafIdRef.current = null;
      });
    }
  };

  useEffect(() => {
    // Safety global mouseup listener so dragging never sticks outside container
    const handleGlobalMouseUp = () => {
      if (isPointerDownRef.current) {
        isPointerDownRef.current = false;
        setTimeout(() => setIsDragging(false), 40);
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Pan and Drag Handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
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
    // Only query getBoundingClientRect and update HUD coords when NOT dragging to prevent layout thrashing
    if (!isPointerDownRef.current) {
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
      return;
    }

    const dx = e.clientX - dragStartPosRef.current.x;
    const dy = e.clientY - dragStartPosRef.current.y;

    if (!isDragging && Math.hypot(dx, dy) > 5) {
      setIsDragging(true);
    }

    updatePan({
      x: dragStartPosRef.current.panX + dx,
      y: dragStartPosRef.current.panY + dy
    });
  };

  const handleMouseUp = () => {
    isPointerDownRef.current = false;
    setTimeout(() => {
      setIsDragging(false);
    }, 40);
  };

  // Touch Handlers for Mobile
  const touchStartRef = useRef({ dist: 0, pan: { x: 0, y: 0 }, touch: { x: 0, y: 0 } });

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartRef.current.touch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      touchStartRef.current.pan = { ...pan };
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartRef.current.dist = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      const dx = e.touches[0].clientX - touchStartRef.current.touch.x;
      const dy = e.touches[0].clientY - touchStartRef.current.touch.y;
      updatePan({
        x: touchStartRef.current.pan.x + dx,
        y: touchStartRef.current.pan.y + dy
      });
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.hypot(dx, dy);
      const ratio = newDist / (touchStartRef.current.dist || newDist);
      
      setZoom((prev) => Math.min(3.5, Math.max(0.6, prev * ratio)));
      touchStartRef.current.dist = newDist;
    }
  };

  // Wheel Zoom (registered as non-passive to allow e.preventDefault without console warnings)
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.88;
      setZoom((prev) => Math.min(3.5, Math.max(0.6, prev * zoomFactor)));
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Map Click (Custom Pin Placement)
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

  // Waypoints actions
  const handleAddWaypoint = (marker) => {
    setActiveWaypoints((prev) => [
      ...prev,
      {
        id: `wp-${Date.now()}`,
        title: marker.title,
        coords: marker.coords,
        note: marker.description
      }
    ]);
    setIsRouteDrawerOpen(true);
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

  const centerOnCoord = (coords) => {
    if (!mapContainerRef.current) return;
    const width = mapContainerRef.current.clientWidth;
    const height = mapContainerRef.current.clientHeight;
    setPan({
      x: width / 2 - coords.x * zoom,
      y: height / 2 - coords.y * zoom
    });
  };

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

  return (
    <div className="map-view-container">
      {/* Top Header & Search Bar */}
      <MapTopBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isRouteDrawerOpen={isRouteDrawerOpen}
        setIsRouteDrawerOpen={setIsRouteDrawerOpen}
        activeWaypointsCount={activeWaypoints.length}
        routeKm={routeStats.totalDistKm}
      />

      {/* Category Filter Pills */}
      <MapCategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
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
        style={{ cursor: isDragging ? 'grabbing' : (isAddingCustomPin ? 'crosshair' : 'grab') }}
      >
        {/* Floating Map HUD & Controls */}
        <MapHudControls
          cursorCoords={cursorCoords}
          isAddingCustomPin={isAddingCustomPin}
          setIsAddingCustomPin={setIsAddingCustomPin}
          zoom={zoom}
          setZoom={setZoom}
          onResetView={handleResetView}
          mapLayerType={mapLayerType}
          setMapLayerType={setMapLayerType}
        />

        {/* Map SVG & Terrain Vector Renderer */}
        <div 
          className="map-transform-layer"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transformOrigin: '0 0'
          }}
          onClick={handleMapClick}
        >
          <MapTerrainSvg
            mapSvgRef={mapSvgRef}
            mapLayerType={mapLayerType}
            visibleMarkers={visibleMarkers}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            activeWaypoints={activeWaypoints}
            checkedWaypoints={checkedWaypoints}
          />
        </div>
      </div>

      {/* Selected Marker Detail Card */}
      <MapPoiDetailCard
        marker={selectedMarker}
        onClose={() => setSelectedMarker(null)}
        onSelectVault={onSelectVault}
        onAddWaypoint={handleAddWaypoint}
        onCenter={centerOnCoord}
      />

      {/* Route Planner Drawer */}
      <MapRouteDrawer
        isOpen={isRouteDrawerOpen}
        onClose={() => setIsRouteDrawerOpen(false)}
        activeWaypoints={activeWaypoints}
        checkedWaypoints={checkedWaypoints}
        routeStats={routeStats}
        routeTitleInput={routeTitleInput}
        setRouteTitleInput={setRouteTitleInput}
        onToggleCheck={handleToggleCheckedWaypoint}
        onMoveWaypoint={handleMoveWaypoint}
        onRemoveWaypoint={handleRemoveWaypoint}
        onClearRoute={handleClearRoute}
        onLoadPresetRoute={handleLoadPresetRoute}
        onSaveCurrentRoute={handleSaveCurrentRoute}
        onCenterCoord={centerOnCoord}
      />
    </div>
  );
}
