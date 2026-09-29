import React from 'react';
import { Hammer } from 'lucide-react';

export default function ItemUsedInSection({ item, onSelectOtherItem }) {
  if (!item || !item.usedIn || item.usedIn.length === 0) return null;

  return (
    <div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', fontSize: '0.9rem' }}>
        Este material es un ingrediente clave para forjar o elaborar los siguientes objetos:
      </p>
      <div className="ingredients-grid">
        {item.usedIn.map((use, idx) => (
          <div
            key={idx}
            className="ingredient-chip"
            onClick={() => onSelectOtherItem(use.title)}
            title={`Ver receta de ${use.title}`}
          >
            <Hammer size={16} color="var(--gold-400)" />
            <div>
              <strong style={{ color: '#fff', display: 'block', fontSize: '0.9rem' }}>{use.title}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Requiere {use.quantityNeeded}x en {use.facility || 'Crafteo'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
