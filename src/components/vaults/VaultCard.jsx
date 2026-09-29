import React from 'react';
import { Shield, Layers, Compass, ChevronRight, MapPin } from 'lucide-react';
import { POWER_LEVEL_COLORS } from './VaultFilterBar';
import GameIcon from '../GameIcon';

export default function VaultCard({
  vault,
  onSelectVault,
  onViewVaultOnMap
}) {
  const levelMeta = POWER_LEVEL_COLORS[vault.powerLevel] || POWER_LEVEL_COLORS[2];
  const chestsCount = vault.chests?.length || 0;

  return (
    <div
      className="vault-card-item"
      onClick={() => onSelectVault(vault.id)}
    >
      {/* Card Thumbnail / Banner */}
      <div className="vault-card-thumb">
        <img
          src={vault.mainImage || 'https://dragonwilds.runescape.wiki/images/Dungeon_entrance_icon.png'}
          alt={vault.title}
          className="vault-card-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://dragonwilds.runescape.wiki/images/Dungeon_entrance_icon.png';
          }}
        />
        <div className="vault-card-thumb-overlay" />

        {/* Top Badges */}
        <div className="vault-card-top-badges">
          <span
            className="vault-card-level-tag"
            style={{
              background: levelMeta.bg,
              color: levelMeta.text,
              borderColor: levelMeta.border
            }}
          >
            <GameIcon name="shield" size={12} />
            {levelMeta.label}
          </span>

          {chestsCount > 0 && (
            <span className="vault-card-chests-tag">
              <GameIcon name="sparkles" size={12} />
              {chestsCount} {chestsCount === 1 ? 'Cofre' : 'Cofres'}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="vault-card-body">
        <div className="vault-card-region">
          <GameIcon name="treasure-map" size={13} />
          <span>{vault.region}</span>
        </div>

        <h3 className="vault-card-title">{vault.title}</h3>
        <p className="vault-card-desc">{vault.summary}</p>

        {/* Notable Loot Tags */}
        {vault.notableLoot && vault.notableLoot.length > 0 && (
          <div className="vault-card-loot-chips">
            {vault.notableLoot.slice(0, 3).map((lt, i) => (
              <span key={i} className="card-loot-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <GameIcon name="sparkles" size={11} color="var(--gold-400)" />
                <span>{lt.name.split(' (')[0]}</span>
              </span>
            ))}
          </div>
        )}

        {/* Card Footer Actions */}
        <div className="vault-card-footer">
          <button
            className="btn-fantasy gold btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelectVault(vault.id);
            }}
          >
            <span>Ver Guía</span>
            <ChevronRight size={14} />
          </button>

          <button
            className="btn-fantasy btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewVaultOnMap(vault);
            }}
            title="Ver en el mapa interactivo"
          >
            <GameIcon name="position-marker" size={14} />
            <span>Mapa</span>
          </button>
        </div>
      </div>
    </div>
  );
}
