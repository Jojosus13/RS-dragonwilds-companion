import React from 'react';
import {
  Compass,
  Search,
  X,
  Navigation as NavIcon,
  Footprints,
  Clock,
  Flag,
  CheckCircle2,
  Circle,
  ChevronUp,
  ChevronDown,
  Trash2,
  Save
} from 'lucide-react';
import { PRESET_ROUTES } from '../../data/mapData';

export default function MapSidebar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categoryMeta,
  categoryCounts,
  isRouteDrawerOpen,
  onToggleRouteDrawer,
  activeWaypoints,
  checkedWaypoints,
  routeStats,
  onToggleCheckedWaypoint,
  onCenterCoord,
  onMoveWaypoint,
  onRemoveWaypoint,
  onLoadPresetRoute,
  routeTitleInput,
  onRouteTitleInputChange,
  onSaveCurrentRoute,
  onClearRoute
}) {
  return (
    <>
      {/* Category Filter Pills */}
      <div className="map-category-pills-bar">
        {Object.entries(categoryMeta).map(([key, meta]) => {
          const Icon = meta.icon;
          const count = categoryCounts[key] || 0;
          const isActive = selectedCategory === key;

          return (
            <button
              key={key}
              className={`map-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => onCategoryChange(key)}
            >
              <Icon size={14} style={{ color: isActive ? 'var(--gold-300)' : meta.color }} />
              <span>{meta.label}</span>
              <span className="map-pill-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* ROUTE PLANNER DRAWER */}
      {isRouteDrawerOpen && (
        <div className="map-route-drawer">
          <div className="map-route-drawer-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-400)' }}>
              <NavIcon size={18} />
              <h3 style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', letterSpacing: '1px' }}>
                PLANIFICADOR DE RUTAS ({activeWaypoints.length} Paradas)
              </h3>
            </div>
            <button className="btn-fantasy btn-icon" onClick={onToggleRouteDrawer} title="Cerrar">
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
                      onClick={() => onToggleCheckedWaypoint(wp.id)}
                      title={isChecked ? 'Marcar como pendiente' : 'Marcar como completado'}
                    >
                      {isChecked ? <CheckCircle2 size={18} color="#48bb78" /> : <Circle size={18} color="var(--text-muted)" />}
                    </button>

                    <div className="wp-info" onClick={() => onCenterCoord(wp.coords)}>
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
                        onClick={() => onMoveWaypoint(idx, 'up')}
                      >
                        <ChevronUp size={14} />
                      </button>
                      <button
                        className="wp-arrow-btn"
                        disabled={idx === activeWaypoints.length - 1}
                        onClick={() => onMoveWaypoint(idx, 'down')}
                      >
                        <ChevronDown size={14} />
                      </button>
                      <button
                        className="wp-delete-btn"
                        onClick={() => onRemoveWaypoint(idx)}
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
                  onClick={() => onLoadPresetRoute(preset)}
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
                  onChange={(e) => onRouteTitleInputChange(e.target.value)}
                  className="map-save-route-input"
                />
                <button
                  className="btn-fantasy gold"
                  onClick={onSaveCurrentRoute}
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
                onClick={onClearRoute}
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
    </>
  );
}
