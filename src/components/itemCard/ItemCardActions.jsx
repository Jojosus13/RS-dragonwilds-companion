import React from 'react';
import { Plus, Check } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function ItemCardActions({
  item,
  isFavorite,
  onToggleFavorite,
  isInPlanner,
  onTogglePlanner,
  onSelect
}) {
  return (
    <div className="card-bottom-actions" onClick={(e) => e.stopPropagation()}>
      <div style={{ display: 'flex', gap: '6px' }}>
        {/* Añadir a la lista de Crafteo */}
        {item.recipe && (
          <button
            className={`btn-fantasy btn-icon ${isInPlanner ? 'gold' : ''}`}
            title={isInPlanner ? 'En lista de crafteo' : 'Añadir a lista de crafteo'}
            onClick={() => onTogglePlanner(item)}
          >
            {isInPlanner ? <Check size={16} /> : <Plus size={16} />}
          </button>
        )}

        {/* Marcador de Favorito */}
        <button
          className={`btn-fantasy btn-icon ${isFavorite ? 'gold' : ''}`}
          title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          onClick={() => onToggleFavorite(item)}
        >
          <GameIcon name="flat-star" size={16} color={isFavorite ? 'var(--gold-400)' : 'var(--text-muted)'} />
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
  );
}
