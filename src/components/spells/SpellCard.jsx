import React from 'react';

export default function SpellCard({ spell, onSelect }) {
  return (
    <div
      className="spell-card"
      onClick={() => onSelect(spell)}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--gold-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Header: Icon, Name y Magic Level Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="item-icon-frame" style={{ width: '42px', height: '42px', flexShrink: 0, padding: '3px' }}>
            <img
              src={spell.image}
              alt={spell.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              loading="lazy"
              onError={(e) => {
                if (spell.remoteImage && e.target.src !== spell.remoteImage) {
                  e.target.src = spell.remoteImage;
                } else {
                  e.target.style.display = 'none';
                }
              }}
            />
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.02rem', color: 'var(--text-primary)', margin: 0 }}>
              {spell.name}
            </h4>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {spell.englishTitle}
            </span>
          </div>
        </div>

        <span
          style={{
            padding: '3px 8px',
            borderRadius: '8px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-title)',
            fontWeight: 700,
            background: 'rgba(128, 90, 213, 0.2)',
            color: '#d6bcfa',
            border: '1px solid rgba(159, 122, 234, 0.4)',
            flexShrink: 0
          }}
        >
          Niv. {spell.magicLevel}
        </span>
      </div>

      {/* Category */}
      <span className="item-type-badge" style={{ alignSelf: 'flex-start' }}>
        {spell.category}
      </span>

      {/* Effect Description */}
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
        {spell.effect}
      </p>

      {/* Rune Cost Chips */}
      <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span
          style={{
            fontSize: '0.7rem',
            color: 'var(--gold-400)',
            fontFamily: 'var(--font-title)',
            fontWeight: 600,
            display: 'block',
            marginBottom: '6px'
          }}
        >
          RUNAS NECESARIAS:
        </span>
        {spell.runes && spell.runes.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {spell.runes.map((r, idx) => (
              <span
                key={idx}
                style={{
                  background: 'rgba(10, 13, 18, 0.8)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  color: '#e2e8f0',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <strong style={{ color: 'var(--gold-400)' }}>{r.qty}x</strong> {r.rune}
              </span>
            ))}
          </div>
        ) : (
          <span style={{ fontSize: '0.75rem', color: '#68d391', fontStyle: 'italic' }}>
            Sin coste de runas (Gratuito)
          </span>
        )}
      </div>
    </div>
  );
}
