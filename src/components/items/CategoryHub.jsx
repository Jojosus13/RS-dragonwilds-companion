import React from 'react';
import { Sparkles, Search, X, ChevronRight } from 'lucide-react';
import FloatingSearchDropdown from '../FloatingSearchDropdown';
import GameIcon from '../GameIcon';
import { CATEGORY_DEFINITIONS } from './categoryConfig';

export default function CategoryHub({
  searchQuery,
  setSearchQuery,
  isFloatingOpen,
  setIsFloatingOpen,
  floatingSearchResults,
  searchWrapperRef,
  onSelectItem,
  setSelectedCategory,
  favorites,
  onToggleFavorite,
  plannerItems,
  onTogglePlanner,
  categoryCounts
}) {
  return (
    <div className="category-hub-container">
      {/* Hub Header */}
      <div className="category-hub-header">
        <div className="hub-header-badge">
          <Sparkles size={16} color="var(--gold-400)" />
          <span>ARMERÍA y CATÁLOGO</span>
        </div>
        <h1 className="category-hub-title">Tipos de Objetos</h1>
        <p className="category-hub-subtitle">
          Selecciona una categoría de objetos o usa el buscador general para explorar los 1,104 objetos de Dragonwilds.
        </p>

        {/* Quick Search on Hub with Floating Results */}
        <div className="search-input-wrapper hub-search" ref={searchWrapperRef}>
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar cualquier objeto (ej: Abyssal, Dragón, Poción)..."
            value={searchQuery}
            onFocus={() => {
              if (searchQuery.trim()) setIsFloatingOpen(true);
            }}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsFloatingOpen(true);
            }}
          />
          {searchQuery && (
            <button 
              className="search-clear-btn" 
              onClick={() => {
                setSearchQuery('');
                setIsFloatingOpen(false);
              }}
            >
              <X size={16} />
            </button>
          )}

          {/* Live Floating Search Dropdown */}
          <FloatingSearchDropdown
            results={floatingSearchResults.slice(0, 25)}
            totalMatches={floatingSearchResults.length}
            searchQuery={searchQuery}
            isOpen={isFloatingOpen && searchQuery.trim().length > 0}
            onSelectItem={(item) => {
              onSelectItem(item);
            }}
            onViewAllInCatalog={() => {
              setSelectedCategory('All');
              setIsFloatingOpen(false);
            }}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
            plannerItems={plannerItems}
            onTogglePlanner={onTogglePlanner}
            onClose={() => setIsFloatingOpen(false)}
          />
        </div>
      </div>

      {/* Grid of Category Cards */}
      <div className="category-hub-grid">
        {CATEGORY_DEFINITIONS.map((cat) => {
          const count = categoryCounts[cat.id] || 0;

          return (
            <div
              key={cat.id}
              className="category-hub-card"
              onClick={() => {
                setSelectedCategory(cat.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{
                '--cat-color': cat.color,
                '--cat-bg': cat.accentBg,
                '--cat-border': cat.accentBorder
              }}
            >
              <div className="category-card-top">
                <div className="category-icon-box">
                  <GameIcon name={cat.icon} size={24} color={cat.color} />
                </div>
                <span className="category-count-pill">{count} ítems</span>
              </div>

              <div className="category-card-body">
                <h3 className="category-card-name">{cat.name}</h3>
                <p className="category-card-desc">{cat.subtitle}</p>
              </div>

              <div className="category-card-footer">
                <div className="category-tags">
                  {cat.tags.map((tag, idx) => (
                    <span key={idx} className="category-tag-chip">{tag}</span>
                  ))}
                </div>
                <div className="category-arrow-btn">
                  <span>Explorar</span>
                  <ChevronRight size={15} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
