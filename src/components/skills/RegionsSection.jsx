import React from 'react';
import { MapPin } from 'lucide-react';

export default function RegionsSection({ regions }) {
  return (
    <div>
      <h3
        style={{
          fontFamily: 'var(--font-title)',
          color: 'var(--gold-400)',
          fontSize: '1.15rem',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <MapPin size={20} />
        Regiones de Ashenfall y Niveles de Peligro
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
        {regions.map((reg, idx) => (
          <div key={idx} className="recipe-section" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', fontSize: '1rem' }}>
                {reg.name}
              </h4>
              <span className="power-level-crest tier-8-9" style={{ fontSize: '0.7rem' }}>
                {reg.danger}
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              {reg.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
