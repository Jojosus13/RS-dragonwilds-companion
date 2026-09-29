import React from 'react';
import { Search, X } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function SpellFilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories
}) {
  return (
    <div className="search-filter-section">
      {/* Search Bar */}
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Buscar hechizo por nombre, runa o efecto (ej: Venganza, Fuego, Teletransporte...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="subcategories-bar" style={{ margin: 0, paddingBottom: 0 }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-chip ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            {cat.icon && <GameIcon name={cat.icon} size={14} />}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
