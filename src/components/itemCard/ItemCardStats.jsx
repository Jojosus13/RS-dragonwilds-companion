import React from 'react';
import GameIcon from '../GameIcon';

export default function ItemCardStats({ stats, recipe }) {
  if (!stats && !recipe) return null;

  return (
    <div className="card-stats-preview">
      {stats?.baseDamage && (
        <span className="stat-pill" title="Daño Base">
          <GameIcon name="crossed-swords" size={12} color="#e53e3e" />
          <span>Daño: <strong>{stats.baseDamage}</strong></span>
        </span>
      )}
      {stats?.armourRating && (
        <span className="stat-pill" title="Armadura">
          <GameIcon name="shield" size={12} color="#4299e1" />
          <span>Def: <strong>{stats.armourRating}</strong></span>
        </span>
      )}
      {stats?.block && (
        <span className="stat-pill" title="Bloqueo">
          <GameIcon name="shield" size={12} color="#48bb78" />
          <span>Bloq: <strong>{stats.block}</strong></span>
        </span>
      )}
      {stats?.durability && (
        <span className="stat-pill" title="Durabilidad">
          <GameIcon name="sands-of-time" size={12} color="#a0aec0" />
          <span>Dur: <strong>{stats.durability}</strong></span>
        </span>
      )}
      {recipe && (
        <span className="stat-pill" style={{ color: '#d4af37' }} title="Tiene Receta de Fabricación">
          <GameIcon name="hammer-drop" size={12} color="#d4af37" />
          <span>{recipe.facility || 'Crafteable'}</span>
        </span>
      )}
    </div>
  );
}
