import React from 'react';
import { Flame, ChevronDown } from 'lucide-react';
import ItemCard from '../common/ItemCard';

export default function ItemGrid({
  items,
  visibleCount,
  onLoadMore,
  totalItems,
  onSelectItem,
  favorites,
  onToggleFavorite,
  plannerItems,
  onTogglePlanner
}) {
  const visibleItems = items.slice(0, visibleCount);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--gold-border)' }}>
        <Flame size={48} color="var(--gold-500)" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', marginBottom: '8px' }}>
          No se encontraron objetos
        </h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
          Intenta cambiar los términos de búsqueda o los filtros de tipo para ver más resultados.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="items-grid">
        {visibleItems.map((item) => (
          <ItemCard
            key={item.id || item.title}
            item={item}
            onSelect={onSelectItem}
            isFavorite={favorites.some((f) => f.id === item.id)}
            onToggleFavorite={onToggleFavorite}
            isInPlanner={plannerItems.some((p) => p.id === item.id)}
            onTogglePlanner={onTogglePlanner}
          />
        ))}
      </div>

      {visibleItems.length < items.length && (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button
            className="btn-fantasy gold"
            style={{ padding: '12px 30px', fontSize: '0.95rem' }}
            onClick={onLoadMore}
          >
            <span>Cargar Más Objetos (+48)</span>
            <ChevronDown size={18} />
          </button>
        </div>
      )}
    </>
  );
}
