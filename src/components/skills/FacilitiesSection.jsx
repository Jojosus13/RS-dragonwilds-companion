import React from 'react';
import { Hammer } from 'lucide-react';

export default function FacilitiesSection({ facilities }) {
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
        <Hammer size={20} />
        Estaciones de Fabricación (Facilities)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
        {facilities.map((fac, idx) => (
          <div key={idx} className="recipe-section" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '1.5rem' }}>{fac.icon}</span>
              <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', fontSize: '1rem' }}>
                {fac.name}
              </h4>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              {fac.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
