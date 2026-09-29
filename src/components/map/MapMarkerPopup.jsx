import React from 'react';
import {
  X,
  ExternalLink,
  Shield,
  ChevronRight,
  Plus,
  Compass
} from 'lucide-react';
import GameIcon from '../GameIcon';

export default function MapMarkerPopup({
  marker,
  onClose,
  onAddWaypoint,
  onCenterCoord,
  onSelectVault
}) {
  if (!marker) return null;

  return (
    <div className="map-poi-detail-card">
      <div className="map-poi-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="map-poi-category-tag" style={{ background: marker.color || 'var(--gold-500)' }}>
            {marker.category?.toUpperCase()}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            X: {marker.coords.x} · Y: {marker.coords.y}
          </span>
        </div>
        <button className="btn-fantasy btn-icon map-poi-close-btn" onClick={onClose} title="Cerrar">
          <X size={16} />
        </button>
      </div>

      {/* Dungeon / POI Banner Image */}
      {marker.image && (
        <div className="map-poi-img-wrap">
          <img
            src={marker.image}
            alt={marker.title}
            className="map-poi-img"
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={(e) => {
              if (e.target && e.target.parentElement) {
                e.target.parentElement.style.display = 'none';
              }
            }}
          />
          {marker.wikiUrl && (
            <a
              href={marker.wikiUrl}
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

      <h3 className="map-poi-title">{marker.title}</h3>
      <p className="map-poi-desc">{marker.description}</p>

      {/* Special Metadata by category */}
      {marker.loot && (
        <div className="map-poi-meta-block">
          <strong>Botín Clave y Patrones:</strong>
          <div className="map-poi-loot-chips">
            {marker.loot.map((lt, i) => (
              <span key={i} className="map-loot-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <GameIcon name="sparkles" size={11} color="var(--gold-400)" />
                <span>{lt}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {marker.materialNames && (
        <div className="map-poi-meta-block">
          <strong>Materiales Extraíbles:</strong>
          <div className="map-poi-loot-chips">
            {marker.materialNames.map((mat, i) => (
              <span key={i} className="map-loot-chip" style={{ background: 'rgba(66, 153, 225, 0.2)', color: '#63b3ed', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <GameIcon name="mining" size={12} color="#63b3ed" />
                <span>{mat}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {marker.drops && (
        <div className="map-poi-meta-block">
          <strong>Recompensas de Combate ({marker.combatLevel}):</strong>
          <div className="map-poi-loot-chips">
            {marker.drops.map((drop, i) => (
              <span key={i} className="map-loot-chip" style={{ background: 'rgba(229, 62, 62, 0.2)', color: '#fc8181', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <GameIcon name="crossed-swords" size={12} color="#fc8181" />
                <span>{drop}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Direct Link to Full Vault Guide if POI is a Vault */}
      {(marker.category === 'vaults' || marker.vaultId) && (
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
            onSelectVault(marker.vaultId || marker.id);
          }}
        >
          <GameIcon name="shield" size={16} />
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
            onAddWaypoint({
              id: `wp-${Date.now()}`,
              title: marker.title,
              coords: marker.coords,
              note: marker.description
            });
          }}
        >
          <Plus size={14} />
          <span>Añadir a mi Ruta</span>
        </button>

        <button
          className="btn-fantasy"
          style={{ padding: '8px 12px', fontSize: '0.85rem' }}
          onClick={() => onCenterCoord(marker.coords)}
        >
          <GameIcon name="treasure-map" size={14} />
          <span>Centrar</span>
        </button>
      </div>
    </div>
  );
}
