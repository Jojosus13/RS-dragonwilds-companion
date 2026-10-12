import React from 'react';
import { Search, X } from 'lucide-react';

export default function VaultFilterBar({
  searchQuery,
  setSearchQuery,
  regionFilter,
  setRegionFilter,
  levelFilter,
  setLevelFilter
}) {
  return (
    <div className="vaults-filters-bar">
      {/* Search Input */}
      <div className="vaults-search-input-wrap">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="vaults-search-input"
          placeholder="Buscar bóveda por nombre, región, botín (ej. Látigo Abisal, Escudo Anti-dragón, Vekchenven)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => setSearchQuery('')}
            title="Limpiar búsqueda"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Quick Filters */}
      <div className="vaults-filter-controls">
        {/* Region Filter */}
        <div className="filter-select-wrap">
          <label>Región:</label>
          <select
            className="custom-select vaults-filter-select"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="all">Todas las Regiones</option>
            <option value="Brynmoor">Brynmoor y Bosque del Templo</option>
            <option value="Whispering">Pantano Susurrante</option>
            <option value="Fractured">Llanura Quebrada (Fractured Plains)</option>
            <option value="Bloodblight">Pantano Malasangre (Bloodblight)</option>
            <option value="Stormtouched">Tierras Altas (Highlands)</option>
            <option value="Fellhollow">Fellhollow y Lago de las Almas</option>
            <option value="Umbral">Arenas Sombrías (Umbral Sands)</option>
          </select>
        </div>

        {/* Level Filter */}
        <div className="filter-select-wrap">
          <label>Nivel:</label>
          <select
            className="custom-select vaults-filter-select"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="all">Todos los Niveles</option>
            <option value="2">Nivel 2 (Básico / Starter)</option>
            <option value="3">Nivel 3 (Intermedio)</option>
            <option value="4">Nivel 4 (Avanzado)</option>
            <option value="5">Nivel 5 (Maestro / Fellhollow)</option>
            <option value="7">Nivel 7 (Élite / Arenas Sombrías)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
