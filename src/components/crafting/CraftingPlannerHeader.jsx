import React from 'react';
import { Trash2 } from 'lucide-react';

export default function CraftingPlannerHeader({ itemCount = 0, onClearPlanner }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.45rem', color: 'var(--gold-300)' }}>
            Calculadora de Crafteo y Desglose
          </h2>
          <span className="hub-header-badge" style={{ padding: '3px 10px', fontSize: '0.7rem' }}>
            Multi-Nivel
          </span>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
          Calculando materiales completos para <strong>{itemCount}</strong> objetivo{itemCount > 1 ? 's' : ''} de fabricación
        </p>
      </div>

      <button 
        className="btn-fantasy" 
        onClick={onClearPlanner}
        style={{ color: '#fc8181', borderColor: 'rgba(245, 101, 101, 0.3)' }}
      >
        <Trash2 size={16} />
        <span>Vaciar Lista</span>
      </button>
    </div>
  );
}
