import React from 'react';
import GameIcon from '../../GameIcon';

export default function ItemStatsSection({ item }) {
  if (!item) return null;

  return (
    <>
      {item.description && (
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '8px', borderLeft: '3px solid var(--gold-500)' }}>
          <p style={{ fontStyle: 'italic', color: '#cbd5e0' }}>"{item.description}"</p>
        </div>
      )}

      {/* Combat y Item Properties Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
        {item.stats?.baseDamage && (
          <div className="recipe-section" style={{ padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DAÑO BASE</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fc8181' }}>{item.stats.baseDamage}</p>
          </div>
        )}
        {item.stats?.damageType && (
          <div className="recipe-section" style={{ padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TIPO DE DAÑO</span>
            <p style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.stats.damageType}</p>
          </div>
        )}
        {item.stats?.attackStyle && (
          <div className="recipe-section" style={{ padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ESTILO DE ATAQUE</span>
            <p style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.stats.attackStyle}</p>
          </div>
        )}
        {item.stats?.armourRating && (
          <div className="recipe-section" style={{ padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ARMADURA</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#63b3ed' }}>+{item.stats.armourRating}</p>
          </div>
        )}
        {item.stats?.block && (
          <div className="recipe-section" style={{ padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BLOQUEO</span>
            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#68d391' }}>{item.stats.block}</p>
          </div>
        )}
        {item.stats?.durability && (
          <div className="recipe-section" style={{ padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DURABILIDAD</span>
            <p style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#e2e8f0' }}>{item.stats.durability} pts</p>
          </div>
        )}
        {item.weight && (
          <div className="recipe-section" style={{ padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PESO</span>
            <p style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#e2e8f0' }}>{item.weight} kg</p>
          </div>
        )}
        {item.repairCost && (
          <div className="recipe-section" style={{ padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>COSTO DE REPARACIÓN</span>
            <p style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--gold-400)' }}>{item.repairCost}</p>
          </div>
        )}
      </div>

      {/* Special Actions / Special Effects */}
      {item.stats?.specialAction && (
        <div className="recipe-section">
          <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-400)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <GameIcon name="fire" size={16} /> Ataque Especial / Acción
          </h4>
          <p style={{ color: '#e2e8f0' }}>{item.stats.specialAction}</p>
        </div>
      )}

      {item.stats?.specialEffect && (
        <div className="recipe-section">
          <h4 style={{ fontFamily: 'var(--font-title)', color: '#68d391', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <GameIcon name="sparkles" size={16} /> Efecto Pasivo / Habilidad
          </h4>
          <p style={{ color: '#e2e8f0' }}>{item.stats.specialEffect}</p>
        </div>
      )}
    </>
  );
}
