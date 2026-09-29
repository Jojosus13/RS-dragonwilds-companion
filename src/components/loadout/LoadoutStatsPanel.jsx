import React from 'react';
import { Zap } from 'lucide-react';

export default function LoadoutStatsPanel({ totals }) {
  return (
    <div className="loadout-stats-box">
      <h3
        style={{
          fontFamily: 'var(--font-title)',
          color: 'var(--gold-400)',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Zap size={18} />
        Estadísticas Totales del Personaje
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div className="recipe-section" style={{ padding: '14px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NIVEL DE PODER PROMEDIO</span>
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--tier-7)', fontFamily: 'var(--font-title)' }}>
            ★ {totals.avgPower}
          </p>
        </div>

        <div className="recipe-section" style={{ padding: '14px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DAÑO DE ARMA</span>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fc8181', fontFamily: 'var(--font-title)' }}>
            {totals.mainWeaponDmg}
          </p>
        </div>

        <div className="recipe-section" style={{ padding: '14px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ARMADURA TOTAL</span>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#63b3ed', fontFamily: 'var(--font-title)' }}>
            +{totals.totalArmour}
          </p>
        </div>

        <div className="recipe-section" style={{ padding: '14px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BLOQUEO COMBINADO</span>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#68d391', fontFamily: 'var(--font-title)' }}>
            {totals.totalBlock} pts
          </p>
        </div>

        <div className="recipe-section" style={{ padding: '14px', gridColumn: 'span 2' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PESO TOTAL DEL EQUIPO</span>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#e2e8f0' }}>
            {totals.totalWeight} kg
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: 'auto',
          background: 'rgba(212,175,55,0.06)',
          padding: '12px 16px',
          borderRadius: '8px',
          border: '1px solid var(--gold-border)'
        }}
      >
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          💡 <strong>Consejo:</strong> En RuneScape: Dragonwilds, el daño y la resistencia escalan fuertemente con el nivel de poder de los objetos y las ascensiones en la Fragua Mística.
        </p>
      </div>
    </div>
  );
}
