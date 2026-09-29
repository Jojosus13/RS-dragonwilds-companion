import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import FloatingSearchDropdown from '../common/FloatingSearchDropdown';

export default function ItemSortControls({
  searchQuery,
  onSearchChange,
  isFloatingOpen,
  setIsFloatingOpen,
  floatingSearchResults,
  searchWrapperRef,
  onSelectItem,
  onViewAllInCatalog,
  favorites,
  onToggleFavorite,
  plannerItems,
  onTogglePlanner,
  selectedPowerTier,
  onPowerTierChange,
  selectedDamageType,
  onDamageTypeChange,
  sortBy,
  onSortChange,
  totalResults
}) {
  return (
    <div className="catalog-search-filters-row">
      {/* Search Input with Live Floating Dropdown */}
      <div className="search-input-wrapper" ref={searchWrapperRef}>
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Buscar objetos..."
          value={searchQuery}
          onFocus={() => {
            if (searchQuery.trim()) setIsFloatingOpen(true);
          }}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsFloatingOpen(true);
          }}
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => {
              onSearchChange('');
              setIsFloatingOpen(false);
            }}
          >
            <X size={16} />
          </button>
        )}

        <FloatingSearchDropdown
          results={floatingSearchResults.slice(0, 25)}
          totalMatches={floatingSearchResults.length}
          searchQuery={searchQuery}
          isOpen={isFloatingOpen && searchQuery.trim().length > 0}
          onSelectItem={(item) => {
            onSelectItem(item);
          }}
          onViewAllInCatalog={onViewAllInCatalog}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          plannerItems={plannerItems}
          onTogglePlanner={onTogglePlanner}
          onClose={() => setIsFloatingOpen(false)}
        />
      </div>

      {/* Filter Selects */}
      <div className="catalog-selects-group">
        {/* Power Level Tier Filter */}
        <div className="select-wrapper">
          <SlidersHorizontal size={14} className="select-icon" />
          <select
            value={selectedPowerTier}
            onChange={(e) => onPowerTierChange(e.target.value)}
            className="fantasy-select"
          >
            <option value="all">Nivel de Poder (Todos)</option>
            <option value="t1-3">Nivel 1 - 3 (Básico)</option>
            <option value="t4-6">Nivel 4 - 6 (Avanzado)</option>
            <option value="t7">Nivel 7 (Élite)</option>
            <option value="t8-9">Nivel 8 - 9 (Legendario)</option>
          </select>
        </div>

        {/* Damage Type Filter */}
        <div className="select-wrapper">
          <select
            value={selectedDamageType}
            onChange={(e) => onDamageTypeChange(e.target.value)}
            className="fantasy-select"
          >
            <option value="all">Tipo de Daño (Todos)</option>
            <option value="Cortante">Cortante (Slash)</option>
            <option value="Perforante">Perforante (Stab/Pierce)</option>
            <option value="Contundente">Contundente (Crush)</option>
            <option value="Fuego">Fuego (Fire)</option>
            <option value="Mágico">Mágico (Magic)</option>
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="select-wrapper">
          <ArrowUpDown size={14} className="select-icon" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="fantasy-select"
          >
            <option value="name-asc">Nombre (A - Z)</option>
            <option value="name-desc">Nombre (Z - A)</option>
            <option value="power-desc">Mayor Nivel de Poder</option>
            <option value="power-asc">Menor Nivel de Poder</option>
            <option value="damage-desc">Mayor Daño Base</option>
          </select>
        </div>
      </div>
    </div>
  );
}
