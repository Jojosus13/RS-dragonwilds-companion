import React from 'react';
import { Search, Shield, Compass, X } from 'lucide-react';

export const POWER_LEVEL_COLORS = {
  2: { label: 'Nivel 2', bg: 'rgba(72, 187, 120, 0.15)', text: '#48bb78', border: 'rgba(72, 187, 120, 0.35)' },
  3: { label: 'Nivel 3', bg: 'rgba(66, 153, 225, 0.15)', text: '#4299e1', border: 'rgba(66, 153, 225, 0.35)' },
  4: { label: 'Nivel 4', bg: 'rgba(237, 137, 54, 0.15)', text: '#ed8936', border: 'rgba(237, 137, 54, 0.35)' },
  5: { label: 'Nivel 5', bg: 'rgba(159, 122, 234, 0.15)', text: '#9f7aea', border: 'rgba(159, 122, 234, 0.35)' },
  7: { label: 'Nivel 7 (Élite)', bg: 'rgba(245, 101, 101, 0.2)', text: '#fc8181', border: 'rgba(245, 101, 101, 0.4)' }
};

export default function VaultFilterBar({
  searchQuery,
  onSearchChange,
  regionFilter,
  onRegionChange,
  levelFilter,
  onLevelChange,
  regionsList,
  totalResults
}) {
  return (
    <div className="search-filter-section">
      {/* Search Input */}
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Buscar por nombre, botín, trampas, región..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button
            className="search-clear-btn"
            onClick={() => onSearchChange('')}
            title="Limpiar búsqueda"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Selects Row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Compass size={14} color="var(--gold-400)" />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-title)' }}>
              REGIÓN:
            </span>
            <select
              value={regionFilter}
              onChange={(e) => onRegionChange(e.target.value)}
              className="select-fantasy"
            >
              <option value="all">Todas las Regiones</option>
              {regionsList.map((reg) => (
                <option key={reg} value={reg}>{reg}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Shield size={14} color="#63b3ed" />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-title)' }}>
              PODER:
            </span>
            <select
              value={levelFilter}
              onChange={(e) => onLevelChange(e.target.value)}
              className="select-fantasy"
            >
              <option value="all">Todos los Niveles</option>
              <option value="2">Nivel de Poder 2</option>
              <option value="3">Nivel de Poder 3</option>
              <option value="4">Nivel de Poder 4</option>
              <option value="5">Nivel de Poder 5</option>
              <option value="7">Nivel de Poder 7 (Élite)</option>
            </select>
          </div>
        </div>

        <div style={{ color: 'var(--gold-400)', fontFamily: 'var(--font-title)', fontSize: '0.82rem' }}>
          <strong>{totalResults}</strong> Bóvedas
        </div>
      </div>
    </div>
  );
}
