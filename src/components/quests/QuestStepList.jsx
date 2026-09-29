import React from 'react';
import { Check } from 'lucide-react';

export default function QuestStepList({
  questId,
  walkthrough,
  checkedStepsMap,
  onToggleStep
}) {
  if (!walkthrough || walkthrough.length === 0) {
    return (
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        No hay pasos detallados disponibles para esta misión todavía.
      </p>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontWeight: 600 }}>
          PASOS DE LA GUÍA ({walkthrough.length})
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Marca los pasos a medida que avances
        </span>
      </div>

      {walkthrough.map((step, idx) => {
        const stepKey = `${questId}_${idx}`;
        const isChecked = !!checkedStepsMap[stepKey];

        return (
          <div
            key={idx}
            style={{
              background: isChecked ? 'rgba(72, 187, 120, 0.08)' : 'rgba(23, 29, 41, 0.9)',
              border: isChecked ? '1px solid rgba(72, 187, 120, 0.3)' : '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '10px',
              padding: '14px',
              transition: 'all 0.2s ease'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                marginBottom: '8px'
              }}
              onClick={() => onToggleStep(questId, idx)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: isChecked ? '#48bb78' : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    flexShrink: 0
                  }}
                >
                  {isChecked ? <Check size={14} color="#fff" /> : <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 600 }}>{idx + 1}</span>}
                </div>
                <h4 style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '0.95rem',
                  color: isChecked ? '#68d391' : 'var(--gold-300)',
                  margin: 0,
                  textDecoration: isChecked ? 'line-through' : 'none'
                }}>
                  {step.stepTitle}
                </h4>
              </div>

              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isChecked ? '#48bb78' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {isChecked ? 'Completado' : 'Marcar paso'}
              </button>
            </div>

            {/* Step Description / paragraphs */}
            <div style={{
              paddingLeft: '32px',
              color: isChecked ? 'var(--text-muted)' : 'var(--text-primary)',
              fontSize: '0.88rem',
              lineHeight: 1.55,
              whiteSpace: 'pre-line'
            }}>
              {step.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}
