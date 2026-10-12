import React from 'react';
import { Search, X, CheckCircle2, Clock } from 'lucide-react';

export default function QuestFilterBar({
  searchQuery,
  setSearchQuery,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedType,
  setSelectedType,
  statusFilter,
  setStatusFilter,
  completedCount,
  inProgressCount
}) {
  return (
    <div className="search-filter-section">
      {/* Search Bar */}
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input 
          type="text"
          className="search-input"
          placeholder="Buscar misión o guía (ej: Dragon Slayer, Acumulador de Ava, Fortaleza, Caratacus...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Controls Row */}
      <div className="filters-row" style={{ flexWrap: 'wrap', gap: '12px' }}>
        {/* Difficulty Chips */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-title)', color: 'var(--text-muted)' }}>
            DIFICULTAD:
          </span>
          <button
            className={`filter-chip ${selectedDifficulty === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedDifficulty('all')}
          >
            Todas
          </button>
          <button
            className={`filter-chip ${selectedDifficulty === 'Principiante' ? 'active' : ''}`}
            style={{ color: '#48bb78' }}
            onClick={() => setSelectedDifficulty('Principiante')}
          >
            Principiante
          </button>
          <button
            className={`filter-chip ${selectedDifficulty === 'Intermedia' ? 'active' : ''}`}
            style={{ color: '#4299e1' }}
            onClick={() => setSelectedDifficulty('Intermedia')}
          >
            Intermedia
          </button>
          <button
            className={`filter-chip ${selectedDifficulty === 'Maestra' ? 'active' : ''}`}
            style={{ color: '#9f7aea' }}
            onClick={() => setSelectedDifficulty('Maestra')}
          >
            Maestra
          </button>
          <button
            className={`filter-chip ${selectedDifficulty === 'Gran Maestra' ? 'active' : ''}`}
            style={{ color: '#ed8936' }}
            onClick={() => setSelectedDifficulty('Gran Maestra')}
          >
            Gran Maestra
          </button>
        </div>

        {/* Type Filter */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-title)', color: 'var(--text-muted)' }}>
            TIPO:
          </span>
          <button
            className={`filter-chip ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            Todos
          </button>
          <button
            className={`filter-chip ${selectedType === 'Principal' ? 'active' : ''}`}
            style={{ color: 'var(--gold-400)' }}
            onClick={() => setSelectedType('Principal')}
          >
            Principales
          </button>
          <button
            className={`filter-chip ${selectedType === 'Secundaria' ? 'active' : ''}`}
            style={{ color: '#a0aec0' }}
            onClick={() => setSelectedType('Secundaria')}
          >
            Secundarias
          </button>
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginLeft: 'auto', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-title)', color: 'var(--text-muted)' }}>
            ESTADO:
          </span>
          <button
            className={`filter-chip ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            Todos
          </button>
          <button
            className={`filter-chip ${statusFilter === 'completed' ? 'active' : ''}`}
            style={{ color: 'var(--gold-400)' }}
            onClick={() => setStatusFilter('completed')}
          >
            <CheckCircle2 size={12} />
            Completadas ({completedCount})
          </button>
          <button
            className={`filter-chip ${statusFilter === 'in_progress' ? 'active' : ''}`}
            style={{ color: '#4299e1' }}
            onClick={() => setStatusFilter('in_progress')}
          >
            <Clock size={12} />
            En Curso ({inProgressCount})
          </button>
        </div>
      </div>
    </div>
  );
}
