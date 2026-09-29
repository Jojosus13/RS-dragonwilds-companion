import React from 'react';
import GameIcon from '../GameIcon';

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
        <GameIcon name="hammer-drop" size={20} color="#ecc94b" />
        Estaciones de Fabricación (Facilities)
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
        {facilities.map((fac, idx) => (
          <div key={idx} className="recipe-section" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div className="item-icon-frame" style={{ width: '36px', height: '36px', flexShrink: 0 }}>
                <GameIcon name={fac.icon} size={22} color="var(--gold-400)" />
              </div>
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
