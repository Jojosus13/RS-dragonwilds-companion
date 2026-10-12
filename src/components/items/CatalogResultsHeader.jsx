import React from 'react';

export default function CatalogResultsHeader({
  visibleCount,
  totalCount,
  isFiltered,
  onClearFilters
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        Mostrando <strong style={{ color: 'var(--gold-400)' }}>{visibleCount}</strong> de{' '}
        <strong style={{ color: '#fff' }}>{totalCount}</strong> ítems encontrados
      </p>

      {isFiltered && (
        <button 
          className="btn-fantasy" 
          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
          onClick={onClearFilters}
        >
          Limpiar Filtros
        </button>
      )}
    </div>
  );
}
