import React from 'react';
import GameIcon from '../GameIcon';

export default function CandidateItemRow({ item, onEquip }) {
  return (
    <div 
      className="craft-item-row"
      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
      onClick={() => onEquip(item)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
        <div className="item-icon-frame" style={{ width: '40px', height: '40px' }}>
          <img
            src={item.image}
            alt={item.name}
            className="item-icon-img"
            referrerPolicy="no-referrer"
            style={{ width: '30px', height: '30px' }}
          />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h4 style={{ color: '#fff', fontFamily: 'var(--font-title)', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.name}
            </h4>
            {item.powerLevel && (
              <span className="power-level-crest tier-7" style={{ fontSize: '0.68rem', padding: '1px 6px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <GameIcon name="flat-star" size={10} color="var(--gold-300)" />
                <span>{item.powerLevel}</span>
              </span>
            )}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', display: 'block' }}>
            {item.stats?.baseDamage ? `Daño: ${item.stats.baseDamage}` : (item.stats?.armourRating ? `Defensa: +${item.stats.armourRating}` : item.itemType)}
            {item.stats?.damageType ? ` (${item.stats.damageType})` : ''}
            {item.stats?.durability ? ` · Dur: ${item.stats.durability}` : ''}
          </span>
        </div>
      </div>

      <button className="btn-fantasy gold" style={{ padding: '6px 14px', fontSize: '0.8rem', flexShrink: 0 }}>
        Equipar
      </button>
    </div>
  );
}
