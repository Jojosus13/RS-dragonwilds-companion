import React from 'react';
import GameIcon from '../GameIcon';

export default function VaultEnemies({ enemies, powerLevel }) {
  if (!enemies) return null;

  return (
    <div className="vault-section-card">
      <div className="vault-section-header">
        <div className="vault-sec-title-wrap">
          <GameIcon name="skull-crossed-bones" size={20} color="#fc8181" />
          <h2>Enemigos de la Bóveda (Enemies)</h2>
        </div>
        <span className="vault-sec-count">Tier {powerLevel}</span>
      </div>

      {/* Standard Enemies Table */}
      {enemies.standard && enemies.standard.length > 0 && (
        <div className="vault-table-wrap">
          <table className="vault-wiki-table">
            <thead>
              <tr>
                <th>Enemigo (Enemy)</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Cantidad</th>
                <th style={{ width: '130px', textAlign: 'center' }}>Nivel de Poder</th>
              </tr>
            </thead>
            <tbody>
              {enemies.standard.map((en, idx) => (
                <tr key={idx}>
                  <td className="enemy-name-cell">
                    <span className="enemy-bullet">
                      <GameIcon name="crossed-swords" size={13} color="#fc8181" />
                    </span>
                    <span>{en.name}</span>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{en.amount}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className="level-chip">Nv. {en.level || powerLevel}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Soulrifted / Spiritual Realm Enemies */}
      {enemies.soulrifted && enemies.soulrifted.length > 0 && (
        <div className="vault-subtable-block">
          <div className="subtable-banner">
            <GameIcon name="lightning-tear" size={16} color="#b794f4" />
            <span>Enemigos del Reino Espiritual (Durante Soul Rifted)</span>
          </div>
          <table className="vault-wiki-table">
            <thead>
              <tr>
                <th>Enemigo Espectral</th>
                <th style={{ width: '180px', textAlign: 'center' }}>Frecuencia / Aparición</th>
              </tr>
            </thead>
            <tbody>
              {enemies.soulrifted.map((se, idx) => (
                <tr key={idx}>
                  <td className="enemy-name-cell" style={{ color: '#b794f4' }}>
                    <span className="enemy-bullet">
                      <GameIcon name="ghost" size={13} color="#b794f4" />
                    </span>
                    <span>{se.name}</span>
                  </td>
                  <td style={{ textAlign: 'center', color: '#b794f4', fontWeight: 'bold' }}>{se.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Boss / Guardian Elite */}
      {enemies.boss && (
        <div className="vault-boss-card">
          <div className="boss-header">
            <span className="boss-tag">JEFE DE LA CÁMARA</span>
            <h3 className="boss-name">{enemies.boss.name}</h3>
            {enemies.boss.level && (
              <span className="boss-level">{enemies.boss.level}</span>
            )}
          </div>
          {enemies.boss.description && (
            <p className="boss-desc">{enemies.boss.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
