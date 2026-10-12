import React from 'react';
import { 
  Navigation as NavIcon, 
  MapPin, 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Plus 
} from 'lucide-react';
import GameIcon from '../GameIcon';

export default function MapHudControls({
  cursorCoords = { x: 500, y: 500 },
  isAddingCustomPin = false,
  setIsAddingCustomPin,
  zoom = 1,
  setZoom,
  onResetView,
  mapLayerType = 'satellite',
  setMapLayerType
}) {
  return (
    <>
      {/* Floating Map HUD Top Left */}
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

      {/* Zoom and Camera Controls */}
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
          onClick={onResetView}
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
        <div className="compass-pointer">
          <GameIcon name="compass" size={24} color="var(--gold-400)" />
        </div>
        <span className="compass-region">ASHENFALL</span>
      </div>
    </>
  );
}
