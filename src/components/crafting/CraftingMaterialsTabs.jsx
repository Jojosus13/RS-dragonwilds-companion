import React from 'react';
import GameIcon from '../GameIcon';

export default function CraftingMaterialsTabs({
  plannerMode,
  setPlannerMode,
  directCount = 0,
  workstationsCount = 0,
  progressPercent = 0
}) {
  const isChecklistMode = plannerMode === 'raw' || plannerMode === 'direct';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        {/* Mode Tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            className={`filter-chip ${plannerMode === 'raw' ? 'active' : ''}`}
            onClick={() => setPlannerMode('raw')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <GameIcon name="plant-seed" size={14} />
            <span>Materia Prima Base (Desglose Total)</span>
          </button>

          <button
            className={`filter-chip ${plannerMode === 'direct' ? 'active' : ''}`}
            onClick={() => setPlannerMode('direct')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <GameIcon name="cardboard-box-closed" size={14} />
            <span>Materiales Directos ({directCount})</span>
          </button>

          <button
            className={`filter-chip ${plannerMode === 'steps' ? 'active' : ''}`}
            onClick={() => setPlannerMode('steps')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <GameIcon name="hammer-drop" size={14} />
            <span>Guía por Estaciones ({workstationsCount})</span>
          </button>
        </div>

        {/* Progress Indicator for checkable modes */}
        {isChecklistMode && (
          <span 
            style={{ 
              fontSize: '0.85rem', 
              color: progressPercent === 100 ? '#68d391' : 'var(--gold-400)', 
              fontWeight: 'bold' 
            }}
          >
            Progreso: {progressPercent}%
          </span>
        )}
      </div>

      {/* Progress Bar for Shopping Lists */}
      {isChecklistMode && (
        <div 
          style={{ 
            width: '100%', 
            height: '8px', 
            background: 'rgba(0,0,0,0.5)', 
            borderRadius: '4px', 
            overflow: 'hidden', 
            marginBottom: '18px', 
            border: '1px solid rgba(255,255,255,0.08)' 
          }}
        >
          <div 
            style={{ 
              width: `${progressPercent}%`, 
              height: '100%', 
              background: progressPercent === 100 ? '#48bb78' : 'var(--gold-gradient)',
              transition: 'width 0.3s ease'
            }} 
          />
        </div>
      )}
    </div>
  );
}
