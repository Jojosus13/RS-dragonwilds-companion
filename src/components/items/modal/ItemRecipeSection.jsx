import React from 'react';

export default function ItemRecipeSection({ item, onSelectOtherItem }) {
  if (!item || !item.recipe) return null;

  return (
    <div className="recipe-section">
      <div className="recipe-header-row">
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ESTACIÓN DE TRABAJO</span>
          <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontSize: '1.1rem' }}>
            {item.recipe.facility || 'Mesa de Trabajo'}
          </h4>
        </div>
        {item.recipe.skill && (
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>HABILIDAD y EXP</span>
            <p style={{ fontFamily: 'var(--font-title)', color: '#63b3ed', fontWeight: 'bold' }}>
              {item.recipe.skill} (+{item.recipe.skillxp} XP)
            </p>
          </div>
        )}
      </div>

      <h5 style={{ fontFamily: 'var(--font-title)', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '0.85rem', textTransform: 'uppercase' }}>
        Ingredientes Requeridos:
      </h5>

      <div className="ingredients-grid">
        {item.recipe.materials?.map((mat, idx) => (
          <div
            key={idx}
            className="ingredient-chip"
            onClick={() => onSelectOtherItem(mat.item)}
            title={`Ver detalles de ${mat.item}`}
          >
            <span className="ingredient-qty">{mat.quantity || mat.count || 1}x</span>
            <span style={{ color: '#edf2f7', fontSize: '0.9rem' }}>{mat.item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
