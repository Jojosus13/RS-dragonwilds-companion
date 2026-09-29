import React from 'react';
import {
  ArrowLeft,
  ExternalLink,
  X
} from 'lucide-react';
import { POWER_LEVEL_COLORS } from './VaultFilterBar';
import VaultHazards from './VaultHazards';
import VaultEnemies from './VaultEnemies';
import VaultChests from './VaultChests';
import GameIcon from '../GameIcon';

export default function VaultDetailModal({
  activeVault,
  onClose,
  onViewVaultOnMap,
  zoomImage,
  setZoomImage
}) {
  if (!activeVault) return null;

  return (
    <div className="vault-detail-view fade-in">
      {/* Top Sticky Navigation Bar */}
      <div className="vault-detail-topbar">
        <button
          className="btn-fantasy btn-back"
          onClick={onClose}
        >
          <ArrowLeft size={16} />
          <span>Volver al Índice de Bóvedas</span>
        </button>

        <div className="vault-topbar-actions">
          <button
            className="btn-fantasy gold"
            onClick={() => onViewVaultOnMap(activeVault)}
            title="Ver ubicación exacta en el mapa de Ashenfall"
          >
            <GameIcon name="position-marker" size={16} />
            <span>Ver en el Mapa</span>
          </button>
          {activeVault.wikiUrl && (
            <a
              href={activeVault.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fantasy"
              title="Abrir página oficial de la Wiki"
            >
              <ExternalLink size={15} />
              <span>Wiki Oficial</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Vault Hero / Infobox Header */}
      <div className="vault-hero-card">
        <div className="vault-hero-bg">
          {activeVault.mainImage && (
            <img
              src={activeVault.mainImage}
              alt={activeVault.title}
              className="vault-hero-banner-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <div className="vault-hero-overlay" />
        </div>

        <div className="vault-hero-content">
          <div className="vault-badges-row">
            <span
              className="vault-level-badge"
              style={{
                background: POWER_LEVEL_COLORS[activeVault.powerLevel]?.bg || 'rgba(66, 153, 225, 0.2)',
                color: POWER_LEVEL_COLORS[activeVault.powerLevel]?.text || '#63b3ed',
                borderColor: POWER_LEVEL_COLORS[activeVault.powerLevel]?.border || 'rgba(66, 153, 225, 0.4)'
              }}
            >
              <GameIcon name="shield" size={14} />
              Nivel de Poder: {activeVault.powerLevel}
            </span>

            <span className="vault-region-badge">
              <GameIcon name="treasure-map" size={14} />
              {activeVault.region}
            </span>

            <span className="vault-danger-badge">
              <GameIcon name="skull-crossed-bones" size={14} />
              Peligro: {activeVault.dangerLevel || 'Medio'}
            </span>
          </div>

          <h1 className="vault-hero-title">{activeVault.title}</h1>
          <p className="vault-hero-summary">{activeVault.summary}</p>

          {/* Quick Infobox Metadata Row */}
          <div className="vault-infobox-strip">
            <div className="vault-info-pill">
              <span className="pill-label">Lanzamiento:</span>
              <span className="pill-value">{activeVault.releaseDate || '15 de Abril 2025'}</span>
            </div>
            <div className="vault-info-pill">
              <span className="pill-label">Actualización:</span>
              <span className="pill-value">{activeVault.update || 'Dragonwilds'}</span>
            </div>
            <div className="vault-info-pill">
              <span className="pill-label">Cofres del Tesoro:</span>
              <span className="pill-value">{activeVault.chests?.length || 1} localizados</span>
            </div>
            <div className="vault-info-pill">
              <span className="pill-label">Núcleos de Bóveda:</span>
              <span className="pill-value">3 (50 kg c/u)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Hazards y Traps */}
      <VaultHazards hazards={activeVault.hazards} />

      {/* Section 2: Enemies */}
      <VaultEnemies enemies={activeVault.enemies} powerLevel={activeVault.powerLevel} />

      {/* Section 3: Notable Loot y Recipes */}
      {((activeVault.notableLoot && activeVault.notableLoot.length > 0) || (activeVault.recipes && activeVault.recipes.length > 0)) && (
        <div className="vault-section-card">
          <div className="vault-section-header">
            <div className="vault-sec-title-wrap">
              <GameIcon name="medal" size={20} color="var(--gold-400)" />
              <h2>Botín Destacado y Recetas (Notable Loot)</h2>
            </div>
          </div>

          <div className="vault-loot-grid">
            {activeVault.notableLoot && activeVault.notableLoot.map((lt, idx) => (
              <div key={idx} className="vault-loot-card">
                <div className="loot-card-icon">
                  <GameIcon name="sparkles" size={20} color="var(--gold-400)" />
                </div>
                <div className="loot-card-content">
                  <div className="loot-card-header">
                    <h4>{lt.name}</h4>
                    {lt.type && <span className="loot-type-badge">{lt.type}</span>}
                  </div>
                  <p className="loot-desc">{lt.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recipe List */}
          {activeVault.recipes && activeVault.recipes.length > 0 && (
            <div className="vault-recipes-subblock">
              <h4 className="recipes-subtitle">
                <GameIcon name="scroll-unfurled" size={16} color="#63b3ed" />
                <span>Recetas de Forja Aprendibles en Efigies de Dragonkin:</span>
              </h4>
              <div className="recipes-chips-wrap">
                {activeVault.recipes.map((rc, idx) => (
                  <div key={idx} className="recipe-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <GameIcon name="sparkles" size={12} color="var(--gold-400)" />
                    <span className="recipe-name">{rc.name}</span>
                    {rc.type && <span className="recipe-cat">({rc.type})</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Section 4: Chests Guide */}
      <VaultChests chests={activeVault.chests} onZoomImage={setZoomImage} />

      {/* Section 5: Resources in the Vault */}
      {activeVault.resources && (
        <div className="vault-section-card">
          <div className="vault-section-header">
            <div className="vault-sec-title-wrap">
              <GameIcon name="sprout" size={20} color="#48bb78" />
              <h2>Recursos Extraíbles (Resources)</h2>
            </div>
          </div>

          <div className="vault-resources-grid">
            {activeVault.resources.nodes && (
              <div className="resource-group-col">
                <h4>Yacimientos y Ventilas:</h4>
                <ul>
                  {activeVault.resources.nodes.map((node, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <GameIcon name="mining" size={14} color="var(--gold-400)" />
                      <span>{node}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeVault.resources.plants && activeVault.resources.plants.length > 0 && (
              <div className="resource-group-col">
                <h4>Plantas y Hierbas:</h4>
                <ul>
                  {activeVault.resources.plants.map((plant, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <GameIcon name="herbs-bundle" size={14} color="#48bb78" />
                      <span>{plant}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeVault.resources.other && (
              <div className="resource-group-col">
                <h4>Objetos Especiales:</h4>
                <ul>
                  {activeVault.resources.other.map((oth, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <GameIcon name="sparkles" size={14} color="var(--gold-400)" />
                      <span>{oth}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Action Bar */}
      <div className="vault-detail-bottom-actions">
        <button
          className="btn-fantasy gold btn-large"
          onClick={() => onViewVaultOnMap(activeVault)}
        >
          <GameIcon name="position-marker" size={18} />
          <span>Ver Ubicación Exacta en el Mapa de Ashenfall</span>
        </button>
        <button
          className="btn-fantasy btn-large"
          onClick={onClose}
        >
          <ArrowLeft size={18} />
          <span>Volver a la Lista de Bóvedas</span>
        </button>
      </div>

      {/* Image Zoom Modal */}
      {zoomImage && (
        <div className="vault-image-zoom-modal" onClick={() => setZoomImage(null)}>
          <div className="zoom-modal-backdrop" />
          <div className="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="zoom-close-btn" onClick={() => setZoomImage(null)}>
              <X size={20} />
            </button>
            <img src={zoomImage.src} alt={zoomImage.caption || 'Captura ampliada'} className="zoomed-img" />
            {zoomImage.caption && <p className="zoom-caption">{zoomImage.caption}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
