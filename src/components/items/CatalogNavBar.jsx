import React from 'react';
import { ArrowLeft } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function CatalogNavBar({
  selectedCategory,
  setSelectedCategory,
  setSearchQuery,
  setIsFloatingOpen,
  currentCategoryConfig,
  currentCategoryIcon,
  searchQuery,
  filteredCount
}) {
  return (
    <div className="category-nav-bar">
      <button 
        className="btn-fantasy category-back-btn"
        onClick={() => {
          setSelectedCategory(null);
          setSearchQuery('');
          setIsFloatingOpen(false);
        }}
        title="Volver a Tipos de Objetos"
      >
        <ArrowLeft size={16} />
        <span>Tipos de Objetos</span>
      </button>

      <div className="category-nav-info">
        <div 
          className="category-nav-icon-badge"
          style={{ 
            color: currentCategoryConfig?.color || 'var(--gold-400)',
            background: currentCategoryConfig?.accentBg || 'rgba(212, 175, 55, 0.12)',
            borderColor: currentCategoryConfig?.accentBorder || 'rgba(212, 175, 55, 0.3)'
          }}
        >
          <GameIcon name={currentCategoryIcon} size={20} />
        </div>
        <div>
          <h2 className="category-nav-title">
            {selectedCategory === 'All' 
              ? 'Todos los Ítems' 
              : (selectedCategory || (searchQuery ? `Búsqueda: "${searchQuery}"` : 'Catálogo'))}
          </h2>
          <span className="category-nav-meta">
            {filteredCount} {filteredCount === 1 ? 'objeto' : 'objetos'} disponibles
          </span>
        </div>
      </div>
    </div>
  );
}
