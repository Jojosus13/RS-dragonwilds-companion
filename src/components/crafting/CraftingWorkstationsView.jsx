import React from 'react';
import { Info } from 'lucide-react';

export default function CraftingWorkstationsView({ workstationSteps = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        <Info size={16} color="var(--gold-400)" />
        <span>
          Orden recomendado de estaciones de trabajo para transformar las materias primas en tus objetivos finales:
        </span>
      </div>

      {workstationSteps.map((ws, sIdx) => (
        <div 
          key={ws.facility}
          style={{
            background: 'rgba(14, 18, 25, 0.9)',
            border: '1px solid var(--gold-border)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span 
                style={{
                  background: 'var(--gold-500)',
                  color: '#000',
                  fontFamily: 'var(--font-title)',
                  fontWeight: '800',
                  fontSize: '0.75rem',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {sIdx + 1}
              </span>
              <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', fontSize: '1rem' }}>
                {ws.facility}
              </h4>
            </div>
            {ws.skill && (
              <span style={{ fontSize: '0.75rem', color: '#63b3ed', fontFamily: 'var(--font-title)' }}>
                Habilidad: {ws.skill}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ws.crafts.map((cr, cIdx) => (
              <div 
                key={cIdx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'rgba(20, 25, 36, 0.6)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {cr.image && (
                    <img src={cr.image} alt={cr.name} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                  )}
                  <div>
                    <strong style={{ color: '#fff', fontSize: '0.9rem' }}>
                      Fabricar {cr.totalQuantity}x {cr.name}
                    </strong>
                    {cr.totalXp > 0 && (
                      <span style={{ fontSize: '0.72rem', color: '#68d391', marginLeft: '8px' }}>
                        (+{cr.totalXp} XP)
                      </span>
                    )}
                  </div>
                </div>

                {/* Required inputs */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Requiere:</span>
                  {cr.inputs.map((inp, iIdx) => (
                    <span 
                      key={iIdx}
                      style={{ 
                        background: 'rgba(0,0,0,0.4)', 
                        padding: '2px 8px', 
                        borderRadius: '6px', 
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'var(--gold-400)' 
                      }}
                    >
                      {inp.quantity}x {inp.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
