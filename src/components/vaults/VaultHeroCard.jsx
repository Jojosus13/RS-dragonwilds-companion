import React from 'react';
import GameIcon from '../GameIcon';
import { POWER_LEVEL_COLORS } from './vaultsConstants';

export default function VaultHeroCard({ activeVault }) {
  const levelMeta = POWER_LEVEL_COLORS[activeVault.powerLevel] || POWER_LEVEL_COLORS[2];

  return (
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
              background: levelMeta.bg,
              color: levelMeta.text,
              borderColor: levelMeta.border
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
  );
}
