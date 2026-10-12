import React from 'react';
import GameIcon from '../GameIcon';

export default function SpellsBanner({ filteredCount, totalCount }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '14px 20px',
        marginBottom: '20px',
        background: 'rgba(128, 90, 213, 0.1)',
        border: '1px solid rgba(159, 122, 234, 0.3)',
        borderRadius: 'var(--radius-lg)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <GameIcon name="sparkles" size={24} color="#b794f4" />
        <div>
          <h3 style={{ fontFamily: 'var(--font-title)', color: '#d6bcfa', fontSize: '1.05rem', margin: 0 }}>
            GRIMORIO ARCANO DE ASHENFALL
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Canalización de runas elementales y magia de combate
          </span>
        </div>
      </div>

      <div style={{ color: 'var(--gold-400)', fontFamily: 'var(--font-title)', fontSize: '0.85rem' }}>
        Mostrando <strong>{filteredCount}</strong> de <strong>{totalCount}</strong> hechizos
      </div>
    </div>
  );
}
