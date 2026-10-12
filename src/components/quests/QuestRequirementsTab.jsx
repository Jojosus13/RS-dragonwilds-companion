import React from 'react';
import { ListChecks, Package, Sparkles } from 'lucide-react';

export default function QuestRequirementsTab({ quest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* General Requirements */}
      <div className="recipe-section" style={{ padding: '14px' }}>
        <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: 'var(--gold-400)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ListChecks size={16} />
          REQUISITOS PREVIOS DE LA MISIÓN
        </h4>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {quest.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Required Items */}
      <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid var(--color-combat)' }}>
        <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#fc8181', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Package size={16} />
          OBJETOS OBLIGATORIOS (NECESARIOS)
        </h4>
        {quest.itemsRequired && quest.itemsRequired.length > 0 ? (
          <ul style={{ paddingLeft: '20px', color: 'var(--text-primary)', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {quest.itemsRequired.map((item, i) => (
              <li key={i} style={{ fontWeight: 500 }}>{item}</li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
            No se requieren objetos específicos antes de comenzar.
          </p>
        )}
      </div>

      {/* Recommended Items */}
      {quest.itemsRecommended && quest.itemsRecommended.length > 0 && (
        <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid #4299e1' }}>
          <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#63b3ed', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} />
            OBJETOS RECOMENDADOS
          </h4>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {quest.itemsRecommended.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
