import React, { useState } from 'react';
import {
  Sparkles,
  Sword,
  Shield,
  Bookmark,
  Plus,
  Check,
  ChevronRight,
  Search,
  X
} from 'lucide-react';
import GameIcon from './GameIcon';

export default function FloatingSearchDropdown({
  results = [],
  totalMatches = 0,
  searchQuery = '',
  isOpen = false,
  onSelectItem,
  onViewAllInCatalog,
  favorites = [],
  onToggleFavorite,
  plannerItems = [],
  onTogglePlanner,
  onClose
}) {
  if (!isOpen || !searchQuery.trim()) return null;

  return (
    <div className="floating-search-dropdown" onClick={(e) => e.stopPropagation()}>
      {/* Dropdown Header */}
      <div className="floating-dropdown-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
          <Sparkles size={13} color="var(--gold-400)" style={{ flexShrink: 0 }} />
          <span className="floating-dropdown-title">RESULTADOS</span>
          <span className="floating-count-badge">({totalMatches})</span>
        </div>
        <button
          className="floating-close-hint-btn"
          onClick={onClose}
          title="Cerrar resultados"
        >
          <X size={15} />
          <span className="desktop-only-action">Cerrar</span>
        </button>
      </div>

      {/* Results List or Empty State */}
      {results.length === 0 ? (
        <div className="floating-empty-state">
          <Search size={28} color="var(--gold-500)" style={{ opacity: 0.6, margin: '0 auto 8px' }} />
          <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>
            No se encontraron objetos para "{searchQuery}"
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '4px' }}>
            Prueba buscando por tipo (ej: <em>Espada</em>, <em>Casco</em>), material (ej: <em>Dragón</em>, <em>Abyssal</em>) o poción.
          </p>
        </div>
      ) : (
        <>
          <div className="floating-results-list">
            {results.map((item) => (
              <FloatingResultItem
                key={item.id || item.title}
                item={item}
                onSelect={() => {
                  onSelectItem(item);
                }}
                isFavorite={favorites.some((f) => f.id === item.id)}
                onToggleFavorite={onToggleFavorite}
                isInPlanner={plannerItems.some((p) => (p.id ? p.id === item.id : p.item?.id === item.id))}
                onTogglePlanner={onTogglePlanner}
              />
            ))}
          </div>

          {/* Footer view all button */}
          {totalMatches > 0 && (
            <div className="floating-dropdown-footer">
              <button
                className="btn-fantasy gold floating-view-all-btn"
                onClick={onViewAllInCatalog}
              >
                <span>Ver los {totalMatches} resultados en el catálogo</span>
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FloatingResultItem({
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
    <div className="floating-result-row" onClick={onSelect}>
      {/* Icon Frame */}
      <div className="floating-item-icon-box">
        {imgError ? (
          <GameIcon name="plain-dagger" size={18} color="var(--gold-400)" />
        ) : (
          <img
            src={item.image}
            alt={item.name}
            className="floating-item-img"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Main Item Info */}
      <div className="floating-item-info">
        <div className="floating-item-title-row">
          <span className="floating-item-name">{item.name}</span>
          {item.powerLevel && (
            <span className={`power-level-crest ${getPowerTierClass(item.powerLevel)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <GameIcon name="flat-star" size={10} />
              <span>{item.powerLevel}</span>
            </span>
          )}
        </div>

        <div className="floating-item-meta-row">
          <span className="floating-category-tag">{item.category}</span>
          <span className="floating-dot-sep">•</span>
          <span className="floating-type-tag">{item.itemType}</span>

          {item.stats?.baseDamage && (
            <>
              <span className="floating-dot-sep">•</span>
              <span className="floating-stat-tag">
                <Sword size={11} color="#e53e3e" /> {item.stats.baseDamage}
              </span>
            </>
          )}

          {item.stats?.armourRating && (
            <>
              <span className="floating-dot-sep">•</span>
              <span className="floating-stat-tag">
                <Shield size={11} color="#4299e1" /> Def {item.stats.armourRating}
              </span>
            </>
          )}

          {item.recipe && (
            <>
              <span className="floating-dot-sep">•</span>
              <span className="floating-recipe-tag">
                <Sparkles size={11} color="var(--gold-400)" /> {item.recipe.facility || 'Crafteo'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="floating-item-actions" onClick={(e) => e.stopPropagation()}>
        {item.recipe && onTogglePlanner && (
          <button
            className={`floating-action-btn ${isInPlanner ? 'active' : ''}`}
            title={isInPlanner ? 'En lista de crafteo' : 'Añadir a crafteo'}
            onClick={() => onTogglePlanner(item)}
          >
            {isInPlanner ? <Check size={14} /> : <Plus size={14} />}
          </button>
        )}

        {onToggleFavorite && (
          <button
            className={`floating-action-btn ${isFavorite ? 'active' : ''}`}
            title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            onClick={() => onToggleFavorite(item)}
          >
            <Bookmark size={14} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        )}
      </div>
    </div>
  );
}
