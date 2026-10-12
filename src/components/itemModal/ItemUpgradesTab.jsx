import React from 'react';
import GameIcon from '../GameIcon';

export default function ItemUpgradesTab({ upgrades }) {
  if (!upgrades || upgrades.length === 0) return null;

  return (
    <div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', fontSize: '0.9rem' }}>
        Progresión de ascensión en la <strong>Fragua Mística (Mystic Forge)</strong>:
      </p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'rgba(10,13,18,0.6)', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--gold-border)', background: 'rgba(212,175,55,0.1)' }}>
              <th style={{ padding: '10px 14px', fontFamily: 'var(--font-title)', color: 'var(--gold-400)' }}>Tier / Nivel</th>
              <th style={{ padding: '10px 14px', fontFamily: 'var(--font-title)', color: 'var(--gold-400)' }}>Daño Base</th>
              <th style={{ padding: '10px 14px', fontFamily: 'var(--font-title)', color: 'var(--gold-400)' }}>Núcleos de Ascensión</th>
            </tr>
          </thead>
          <tbody>
            {upgrades.map((upg, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '10px 14px', fontWeight: 'bold', color: '#f6ad55' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    <GameIcon name="flat-star" size={11} />
                    <span>{upg.powerLevel}</span>
                  </span>
                </td>
                <td style={{ padding: '10px 14px', color: '#fc8181' }}>{upg.baseDamage}</td>
                <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{upg.coresRequired || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
