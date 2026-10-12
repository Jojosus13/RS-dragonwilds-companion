import React from 'react';

export default function CraftingStatCards({ rawCount = 0, workstationCount = 0, totalXp = 0 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
      <div className="recipe-section" style={{ padding: '14px', textAlign: 'center' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', fontFamily: 'var(--font-title)' }}>
          RECURSOS BASE PUROS
        </span>
        <p style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
          {rawCount} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>tipos</span>
        </p>
      </div>

      <div className="recipe-section" style={{ padding: '14px', textAlign: 'center' }}>
        <span style={{ fontSize: '0.72rem', color: '#63b3ed', fontFamily: 'var(--font-title)' }}>
          ESTACIONES DE TRABAJO
        </span>
        <p style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
          {workstationCount} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>bancos</span>
        </p>
      </div>

      <div className="recipe-section" style={{ padding: '14px', textAlign: 'center' }}>
        <span style={{ fontSize: '0.72rem', color: '#48bb78', fontFamily: 'var(--font-title)' }}>
          EXPERIENCIA TOTAL (XP)
        </span>
        <p style={{ fontSize: '1.4rem', fontWeight: '800', color: '#68d391', marginTop: '4px' }}>
          +{totalXp.toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>XP</span>
        </p>
      </div>
    </div>
  );
}
