import React from 'react';
import GameIcon from '../GameIcon';

export default function VaultLoot({ notableLoot, recipes }) {
  const hasLoot = notableLoot && notableLoot.length > 0;
  const hasRecipes = recipes && recipes.length > 0;

  if (!hasLoot && !hasRecipes) return null;

  return (
    <div className="vault-section-card">
      <div className="vault-section-header">
        <div className="vault-sec-title-wrap">
          <GameIcon name="medal" size={20} color="var(--gold-400)" />
          <h2>Botín Destacado y Recetas (Notable Loot)</h2>
        </div>
      </div>

      {hasLoot && (
        <div className="vault-loot-grid">
          {notableLoot.map((lt, idx) => (
            <div key={idx} className="vault-loot-card">
              <div className="loot-card-icon">
                <GameIcon name="sparkles" size={20} color="var(--gold-400)" />
              </div>
              <div className="loot-card-content">
                <div className="loot-card-header">
                  <h4>{lt.name}</h4>
                  {lt.type && <span className="loot-type-badge">{lt.type}</span>}
                </div>
                <p className="loot-desc">{lt.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recipe List */}
      {hasRecipes && (
        <div className="vault-recipes-subblock">
          <h4 className="recipes-subtitle">
            <GameIcon name="scroll-unfurled" size={16} color="#63b3ed" />
            <span>Recetas de Forja Aprendibles en Efigies de Dragonkin:</span>
          </h4>
          <div className="recipes-chips-wrap">
            {recipes.map((rc, idx) => (
              <div key={idx} className="recipe-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <GameIcon name="sparkles" size={12} color="var(--gold-400)" />
                <span className="recipe-name">{rc.name}</span>
                {rc.type && <span className="recipe-cat">({rc.type})</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
