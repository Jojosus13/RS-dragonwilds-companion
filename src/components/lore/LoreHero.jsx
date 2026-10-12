import React from 'react';
import GameIcon from '../GameIcon';

export default function LoreHero({ title, intro }) {
  return (
    <div
      style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(20,25,35,0.95) 0%, rgba(30,15,20,0.85) 100%)',
        border: '1px solid var(--gold-border)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-400)', marginBottom: '8px' }}>
          <GameIcon name="feather" size={20} color="var(--gold-400)" />
          <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
            CRÓNICAS y TRASFONDO
          </span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.8rem', color: 'var(--gold-300)', marginBottom: '8px', letterSpacing: '1px' }}>
          {title}
        </h2>
        <p style={{ color: '#cbd5e0', fontSize: '0.95rem', lineHeight: 1.6 }}>
          {intro}
        </p>
      </div>
    </div>
  );
}
