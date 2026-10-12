import React from 'react';
import { Check } from 'lucide-react';

export default function QuestGuideTab({
  quest,
  checkedStepsMap,
  onToggleStep
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Synopsis */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px 14px' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-title)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
          SINOPSIS
        </span>
        <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
          {quest.summary}
        </p>
      </div>

      {/* Steps List */}
      {quest.walkthrough && quest.walkthrough.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontWeight: 600 }}>
              PASOS DE LA GUÍA ({quest.walkthrough.length})
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Marca los pasos a medida que avances
            </span>
          </div>

          {quest.walkthrough.map((step, idx) => {
            const stepKey = `${quest.id}_${idx}`;
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
                  onClick={() => onToggleStep(quest.id, idx)}
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

                {/* Step Description */}
                <div style={{ 
                  paddingLeft: '32px', 
                  color: isChecked ? 'var(--text-muted)' : 'var(--text-primary)', 
                  fontSize: '0.88rem', 
                  lineHeight: 1.55,
                  whiteSpace: 'pre-line' 
                }}>
                  {step.content}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
          No se encontraron pasos adicionales para esta misión.
        </div>
      )}
    </div>
  );
}
