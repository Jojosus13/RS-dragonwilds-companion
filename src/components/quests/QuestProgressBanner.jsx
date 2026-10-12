import React from 'react';
import GameIcon from '../GameIcon';

export default function QuestProgressBanner({ completedCount, totalQuests }) {
  const percentage = totalQuests > 0 ? (completedCount / totalQuests) * 100 : 0;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      padding: '14px 20px',
      marginBottom: '20px',
      background: 'rgba(212, 175, 55, 0.08)',
      border: '1px solid var(--gold-border)',
      borderRadius: 'var(--radius-lg)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <GameIcon name="treasure-map" size={22} color="var(--gold-400)" />
        <div>
          <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', fontSize: '1.05rem', margin: 0 }}>
            GUÍAS Y DIARIO DE MISIONES DE ASHENFALL
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            39 Misiones traducidas al español con guías paso a paso, requisitos y recompensas
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>PROGRESO TOTAL</span>
          <strong style={{ fontSize: '1.1rem', color: 'var(--gold-400)' }}>
            {completedCount} / {totalQuests}
          </strong>
        </div>
        <div style={{ width: '120px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${percentage}%`, 
              background: 'var(--gold-gradient)',
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }} 
          />
        </div>
      </div>
    </div>
  );
}
