import React from 'react';
import { 
  Search, 
  X, 
  Navigation as NavIcon 
} from 'lucide-react';
import GameIcon from '../GameIcon';

export default function MapTopBar({
  searchQuery,
  setSearchQuery,
  isRouteDrawerOpen,
  setIsRouteDrawerOpen,
  activeWaypointsCount = 0,
  routeKm = '0.0'
}) {
  return (
    <div className="map-top-bar">
      <div className="map-title-wrap">
        <div className="map-title-icon">
          <GameIcon name="treasure-map" size={22} color="var(--gold-400)" />
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
          className={`btn-fantasy map-route-toggle-btn ${activeWaypointsCount > 0 ? 'gold' : ''}`}
          onClick={() => setIsRouteDrawerOpen((prev) => !prev)}
        >
          <NavIcon size={16} />
          <span>Ruta ({activeWaypointsCount})</span>
          {activeWaypointsCount > 0 && (
            <span className="badge" style={{ background: '#48bb78', color: '#000', fontWeight: 'bold' }}>
              {routeKm} km
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
