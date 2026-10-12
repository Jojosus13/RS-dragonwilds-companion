import React from 'react';
import { Search, X, ArrowUpDown } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function CatalogFilters({
  searchQuery,
  setSearchQuery,
  setDisplayCount,
  activeSubtypes,
  selectedSubtype,
  setSelectedSubtype,
  selectedPowerTier,
  setSelectedPowerTier,
  sortBy,
  setSortBy
}) {
  return (
    <div className="search-filter-section">
      {/* Search input (filters grid directly) */}
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre, tipo, daño, material, receta (ej: Abyssal, Adamant, Slash)..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setDisplayCount(48);
          }}
        />
        {searchQuery && (
          <button 
            className="search-clear-btn" 
            onClick={() => setSearchQuery('')}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Dynamic Subcategory Chips / Separators */}
      {activeSubtypes && activeSubtypes.length > 1 && (
        <div className="subcategories-bar">
          {activeSubtypes.map((st) => (
            <button
              key={st.id}
              className={`filter-chip ${selectedSubtype === st.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedSubtype(st.id);
                setDisplayCount(48);
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              {st.icon && <GameIcon name={st.icon} size={14} />}
              <span>{st.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Filters and Sort Row */}
      <div className="filters-row">
        {/* Power Level Chips */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-title)', color: 'var(--text-muted)' }}>
            PODER:
          </span>
          <button
            className={`filter-chip ${selectedPowerTier === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedPowerTier('all')}
          >
            Todos
          </button>
          <button
            className={`filter-chip ${selectedPowerTier === 't1-3' ? 'active' : ''}`}
            style={{ color: 'var(--tier-1-3)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            onClick={() => setSelectedPowerTier('t1-3')}
          >
            <GameIcon name="flat-star" size={12} color="var(--tier-1-3)" />
            <span>T1-3</span>
          </button>
          <button
            className={`filter-chip ${selectedPowerTier === 't4-6' ? 'active' : ''}`}
            style={{ color: 'var(--tier-4-6)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            onClick={() => setSelectedPowerTier('t4-6')}
          >
            <GameIcon name="flat-star" size={12} color="var(--tier-4-6)" />
            <span>T4-6</span>
          </button>
          <button
            className={`filter-chip ${selectedPowerTier === 't7' ? 'active' : ''}`}
            style={{ color: 'var(--tier-7)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            onClick={() => setSelectedPowerTier('t7')}
          >
            <GameIcon name="flat-star" size={12} color="var(--tier-7)" />
            <span>T7</span>
          </button>
          <button
            className={`filter-chip ${selectedPowerTier === 't8-9' ? 'active' : ''}`}
            style={{ color: 'var(--tier-8-9)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            onClick={() => setSelectedPowerTier('t8-9')}
          >
            <GameIcon name="flat-star" size={12} color="var(--tier-8-9)" />
            <span>T8-9 Masterwork</span>
          </button>
        </div>

        {/* Sort Dropdown */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowUpDown size={14} color="var(--gold-400)" />
          <select 
            className="select-fantasy" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            {searchQuery && <option value="relevance">Relevancia de Búsqueda</option>}
            <option value="name-asc">Nombre (A → Z)</option>
            <option value="name-desc">Nombre (Z → A)</option>
            <option value="power-desc">Tier / Poder (Mayor)</option>
            <option value="power-asc">Tier / Poder (Menor)</option>
            <option value="durability-desc">Mayor Durabilidad</option>
            <option value="weight-asc">Menor Peso</option>
          </select>
        </div>
      </div>
    </div>
  );
}
