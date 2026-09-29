import React from 'react';
import { Search, X, CheckCircle2, Clock, Circle } from 'lucide-react';

export const DIFFICULTY_COLORS = {
  'Principiante': { bg: 'rgba(72, 187, 120, 0.15)', text: '#48bb78', border: 'rgba(72, 187, 120, 0.3)' },
  'Intermedia': { bg: 'rgba(66, 153, 225, 0.15)', text: '#4299e1', border: 'rgba(66, 153, 225, 0.3)' },
  'Maestra': { bg: 'rgba(159, 122, 234, 0.15)', text: '#9f7aea', border: 'rgba(159, 122, 234, 0.3)' },
  'Gran Maestra': { bg: 'rgba(237, 137, 54, 0.15)', text: '#ed8936', border: 'rgba(237, 137, 54, 0.3)' }
};

export default function QuestFilterBar({
  searchQuery,
  onSearchChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedType,
  onTypeChange,
  statusFilter,
  onStatusChange,
  stats
}) {
  return (
    <div className="search-filter-section">
      {/* Search Input with standard design classes */}
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Buscar misiones por nombre, PNJ, lugar, requisitos o recompensas..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button className="search-clear-btn" onClick={() => onSearchChange('')} title="Limpiar búsqueda">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Selects Row y Status Filter Chips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-title)' }}>
              DIFICULTAD:
            </span>
            <select
              value={selectedDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
              className="select-fantasy"
            >
              <option value="all">Todas las Dificultades</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedia">Intermedia</option>
              <option value="Maestra">Maestra</option>
              <option value="Gran Maestra">Gran Maestra</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-title)' }}>
              TIPO:
            </span>
            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="select-fantasy"
            >
              <option value="all">Todas las Categorías</option>
              <option value="Principal">Misión Principal</option>
              <option value="Secundaria">Misión Secundaria</option>
            </select>
          </div>
        </div>

        {/* Status Filter Chips */}
        <div className="subcategories-bar" style={{ margin: 0, paddingBottom: 0 }}>
          <button
            className={`filter-chip ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => onStatusChange('all')}
          >
            Todas ({stats.total})
          </button>
          <button
            className={`filter-chip ${statusFilter === 'in_progress' ? 'active' : ''}`}
            onClick={() => onStatusChange('in_progress')}
          >
            <Clock size={13} color="#63b3ed" />
            <span>En Curso ({stats.inProgress})</span>
          </button>
          <button
            className={`filter-chip ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onStatusChange('completed')}
          >
            <CheckCircle2 size={13} color="#68d391" />
            <span>Completadas ({stats.completed})</span>
          </button>
          <button
            className={`filter-chip ${statusFilter === 'pending' ? 'active' : ''}`}
            onClick={() => onStatusChange('pending')}
          >
            <Circle size={13} color="var(--text-muted)" />
            <span>Pendientes ({stats.pending})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
