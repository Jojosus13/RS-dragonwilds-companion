import React from 'react';
import { Package, ShieldAlert, Check } from 'lucide-react';

export default function QuestRequirements({ quest }) {
  if (!quest) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Skill/Quest Requirements */}
      <div className="info-card">
        <h4 style={{ color: 'var(--gold-400)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
          <ShieldAlert size={16} />
          <span>Requisitos Previos de Habilidades y Misiones:</span>
        </h4>
        {quest.requirements && quest.requirements.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {quest.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#48bb78', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Check size={14} />
            <span>Sin requisitos previos específicos. ¡Apta para todos los aventureros!</span>
          </p>
        )}
      </div>

      {/* Items Required */}
      <div className="info-card">
        <h4 style={{ color: 'var(--gold-400)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
          <Package size={16} />
          <span>Objetos Necesarios (Requeridos):</span>
        </h4>
        {quest.itemsRequired && quest.itemsRequired.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {quest.itemsRequired.map((item, i) => (
              <li key={i} style={{ color: '#e2e8f0' }}>{item}</li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            No se requieren objetos previos para iniciar esta misión.
          </p>
        )}
      </div>

      {/* Recommended Items */}
      {quest.recommended && quest.recommended.length > 0 && (
        <div className="info-card">
          <h4 style={{ color: '#63b3ed', marginBottom: '8px', fontSize: '0.9rem' }}>
            💡 Objetos Recomendados:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {quest.recommended.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
