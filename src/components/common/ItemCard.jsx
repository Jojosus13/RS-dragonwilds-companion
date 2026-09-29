import React, { useState } from 'react';
import {
  Bookmark,
  Sparkles,
  Sword,
  Shield,
  Clock,
  Plus,
  Check
} from 'lucide-react';
import GameIcon from './GameIcon';

export default function ItemCard({
  item,
  onSelect,
  isFavorite,
  onToggleFavorite,
  isInPlanner,
  onTogglePlanner
}) {
  const [imgError, setImgError] = useState(false);

  const getPowerTierClass = (pw) => {
    if (!pw) return '';
    if (pw <= 3) return 'tier-1-3';
    if (pw <= 6) return 'tier-4-6';
    if (pw === 7) return 'tier-7';
    return 'tier-8-9';
  };

  return (
    <div className="item-card" onClick={() => onSelect(item)}>
      <div className="card-top">
        <div className="item-icon-frame">
          {imgError ? (
            <GameIcon name="plain-dagger" size={24} color="var(--gold-400)" />
          ) : (
            <img
              src={item.image}
              alt={item.name}
              className="item-icon-img"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="card-info">
          <div className="card-title-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', minWidth: 0 }}>
            <h3 className="item-name" title={item.name || item.title}>
              {item.name || item.title}
            </h3>
            {item.powerLevel && (
              <span className={`power-level-crest ${getPowerTierClass(item.powerLevel)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <GameIcon name="flat-star" size={11} />
                <span>{item.powerLevel}</span>
              </span>
            )}
          </div>
          <span className="item-type-badge">{item.itemType}</span>
        </div>
      </div>

      {item.description && (
        <p className="item-desc-snippet">{item.description}</p>
      )}

      {/* Stats Preview */}
      <div className="card-stats-preview">
        {item.stats?.baseDamage && (
          <span className="stat-pill" title="Daño Base">
            <Sword size={12} color="#e53e3e" />
            <span>Daño: <strong>{item.stats.baseDamage}</strong></span>
          </span>
        )}
        {item.stats?.armourRating && (
          <span className="stat-pill" title="Armadura">
            <Shield size={12} color="#4299e1" />
            <span>Def: <strong>{item.stats.armourRating}</strong></span>
          </span>
        )}
        {item.stats?.block && (
          <span className="stat-pill" title="Bloqueo">
            <Shield size={12} color="#48bb78" />
            <span>Bloq: <strong>{item.stats.block}</strong></span>
          </span>
        )}
        {item.stats?.durability && (
          <span className="stat-pill" title="Durabilidad">
            <Clock size={12} color="#a0aec0" />
            <span>Dur: <strong>{item.stats.durability}</strong></span>
          </span>
        )}
        {item.recipe && (
          <span className="stat-pill" style={{ color: '#d4af37' }} title="Tiene Receta de Fabricación">
            <Sparkles size={12} />
            <span>{item.recipe.facility || 'Crafteable'}</span>
          </span>
        )}
      </div>

      {/* Bottom Card Actions */}
      <div className="card-bottom-actions" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {/* Add to Crafting Planner */}
          {item.recipe && (
            <button
              className={`btn-fantasy btn-icon ${isInPlanner ? 'gold' : ''}`}
              title={isInPlanner ? 'En lista de crafteo' : 'Añadir a lista de crafteo'}
              onClick={() => onTogglePlanner(item)}
            >
              {isInPlanner ? <Check size={16} /> : <Plus size={16} />}
            </button>
          )}

          {/* Favorite Bookmark */}
          <button
            className={`btn-fantasy btn-icon ${isFavorite ? 'gold' : ''}`}
            title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            onClick={() => onToggleFavorite(item)}
          >
            <Bookmark size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <button
          className="btn-fantasy"
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          onClick={() => onSelect(item)}
        >
          Ver Ficha
        </button>
      </div>
    </div>
  );
}
