import React from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Layers,
  MapPin,
  Navigation as NavIcon,
  Plus
} from 'lucide-react';

export default function MapControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggleFullscreen,
  mapLayerType,
  onToggleLayer,
  isAddingCustomPin,
  onToggleAddCustomPin,
  isRouteDrawerOpen,
  onToggleRouteDrawer,
  activeWaypointsCount
}) {
  return (
    <div className="map-floating-controls">
      <div className="map-control-btn-group">
        <button
          className="map-control-btn"
          onClick={onZoomIn}
          title="Acercar (Zoom +)"
        >
          <ZoomIn size={18} />
        </button>
        <button
          className="map-control-btn"
          onClick={onZoomOut}
          title="Alejar (Zoom -)"
        >
          <ZoomOut size={18} />
        </button>
        <button
          className="map-control-btn"
          onClick={onResetView}
          title="Centrar y reajustar mapa"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="map-control-btn-group">
        <button
          className={`map-control-btn ${mapLayerType === 'cartographic' ? 'active' : ''}`}
          onClick={onToggleLayer}
          title={mapLayerType === 'satellite' ? 'Cambiar a Modo Cartográfico' : 'Cambiar a Modo Satélite'}
        >
          <Layers size={18} />
        </button>
        <button
          className={`map-control-btn ${isAddingCustomPin ? 'active' : ''}`}
          onClick={onToggleAddCustomPin}
          title="Colocar marcador personalizado en el mapa"
        >
          <MapPin size={18} />
        </button>
        <button
          className={`map-control-btn ${isRouteDrawerOpen ? 'active' : ''}`}
          onClick={onToggleRouteDrawer}
          title="Gestor de Rutas y Waypoints"
        >
          <NavIcon size={18} />
          {activeWaypointsCount > 0 && (
            <span className="route-badge-count">{activeWaypointsCount}</span>
          )}
        </button>
        <button
          className="map-control-btn"
          onClick={onToggleFullscreen}
          title="Pantalla Completa"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </div>
  );
}
