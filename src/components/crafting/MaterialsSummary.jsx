import React from 'react';
import {
  Pickaxe,
  Package,
  Hammer,
  Info,
  CheckSquare,
  Square,
  ArrowRight
} from 'lucide-react';
import GameIcon from '../GameIcon';

export default function MaterialsSummary({
  plannerMode,
  setPlannerMode,
  rawBaseMaterials,
  directMaterials,
  workstationSteps,
  checkedRawMaterials,
  checkedDirectMaterials,
  onToggleRawCheck,
  onToggleDirectCheck,
  rawProgressPercent,
  directProgressPercent,
  onSelectItem
}) {
  return (
    <div className="recipe-section" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            className={`filter-chip ${plannerMode === 'raw' ? 'active' : ''}`}
            onClick={() => setPlannerMode('raw')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <GameIcon name="plant-seed" size={14} />
            <span>Materia Prima Base (Desglose Total)</span>
          </button>

          <button
            className={`filter-chip ${plannerMode === 'direct' ? 'active' : ''}`}
            onClick={() => setPlannerMode('direct')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <GameIcon name="cardboard-box-closed" size={14} />
            <span>Materiales Directos ({directMaterials.length})</span>
          </button>

          <button
            className={`filter-chip ${plannerMode === 'steps' ? 'active' : ''}`}
            onClick={() => setPlannerMode('steps')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <GameIcon name="hammer-drop" size={14} />
            <span>Guía por Estaciones ({workstationSteps.length})</span>
          </button>
        </div>

        {/* Progress Indicator for checkable modes */}
        {(plannerMode === 'raw' || plannerMode === 'direct') && (
          <span style={{ fontSize: '0.85rem', color: (plannerMode === 'raw' ? rawProgressPercent : directProgressPercent) === 100 ? '#68d391' : 'var(--gold-400)', fontWeight: 'bold' }}>
            Progreso: {plannerMode === 'raw' ? rawProgressPercent : directProgressPercent}%
          </span>
        )}
      </div>

      {/* Progress Bar for Shopping Lists */}
      {(plannerMode === 'raw' || plannerMode === 'direct') && (
        <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.5)', borderRadius: '4px', overflow: 'hidden', marginBottom: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div
            style={{
              width: `${plannerMode === 'raw' ? rawProgressPercent : directProgressPercent}%`,
              height: '100%',
              background: (plannerMode === 'raw' ? rawProgressPercent : directProgressPercent) === 100 ? '#48bb78' : 'var(--gold-gradient)',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      )}

      {/* VIEW 1: RAW BASE MATERIALS */}
      {plannerMode === 'raw' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <Info size={16} color="var(--gold-400)" />
            <span>
              Estos son todos los <strong>recursos fundamentales y menas</strong> que debes recolectar en el mundo o minas antes de empezar a craftear:
            </span>
          </div>

          <div className="ingredients-grid">
            {rawBaseMaterials.map((mat) => {
              const isDone = !!checkedRawMaterials[mat.item];
              return (
                <div
                  key={mat.item}
                  className={`checklist-item ${isDone ? 'checked' : ''}`}
                  onClick={() => onToggleRawCheck(mat.item)}
                >
                  {isDone ? (
                    <CheckSquare size={20} color="#48bb78" />
                  ) : (
                    <Square size={20} color="var(--gold-500)" />
                  )}

                  {mat.image && (
                    <div className="item-icon-frame" style={{ width: '32px', height: '32px', flexShrink: 0 }}>
                      <img src={mat.image} alt={mat.item} className="item-icon-img" referrerPolicy="no-referrer" style={{ width: '24px', height: '24px' }} />
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', color: isDone ? 'var(--text-muted)' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {mat.item}
                      </span>
                      <span style={{ color: isDone ? '#48bb78' : 'var(--gold-400)', fontWeight: '800' }}>
                        {mat.totalQuantity}x
                      </span>
                    </div>

                    {/* Transformation purpose breakdown */}
                    <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {mat.purposes && mat.purposes.map((p, pIdx) => (
                        <div key={pIdx} style={{ fontSize: '0.72rem', color: isDone ? 'var(--text-muted)' : '#cbd5e0', lineHeight: '1.3' }}>
                          {p.isDirect ? (
                            <span>
                              <span style={{ color: 'var(--gold-400)' }}>•</span> Para fabricar <strong>{p.producesQty}x {p.producesItem}</strong>
                            </span>
                          ) : (
                            <span>
                              <span style={{ color: 'var(--gold-400)' }}>•</span> Para crear <strong>{p.producesQty}x {p.producesItem}</strong>
                              {p.facility && <span style={{ color: 'var(--gold-400)', opacity: 0.85 }}> ({p.facility})</span>}
                              <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', marginLeft: '4px' }}>
                                <ArrowRight size={11} style={{ marginRight: '4px' }} />
                                <em>{p.finalTarget}</em>
                              </span>
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: DIRECT MATERIALS */}
      {plannerMode === 'direct' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <Info size={16} color="var(--gold-400)" />
            <span>
              Materiales directos necesarios en la mesa de crafteo para ensamblar los ítems seleccionados:
            </span>
          </div>

          <div className="ingredients-grid">
            {directMaterials.map((mat) => {
              const isDone = !!checkedDirectMaterials[mat.item];
              return (
                <div
                  key={mat.item}
                  className={`checklist-item ${isDone ? 'checked' : ''}`}
                  onClick={() => onToggleDirectCheck(mat.item)}
                >
                  {isDone ? (
                    <CheckSquare size={20} color="#48bb78" />
                  ) : (
                    <Square size={20} color="var(--gold-500)" />
                  )}

                  {mat.image && (
                    <div className="item-icon-frame" style={{ width: '32px', height: '32px', flexShrink: 0 }}>
                      <img src={mat.image} alt={mat.item} className="item-icon-img" referrerPolicy="no-referrer" style={{ width: '24px', height: '24px' }} />
                    </div>
                  )}

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <span style={{ fontWeight: 'bold', color: isDone ? 'var(--text-muted)' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {mat.item}
                      </span>
                      <span style={{ color: isDone ? '#48bb78' : 'var(--gold-400)', fontWeight: '800' }}>
                        {mat.totalQuantity}x
                      </span>
                    </div>
                    {mat.facility && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--gold-400)' }}>
                        {mat.facility}
                      </span>
                    )}
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>
                      Para: {mat.usedIn.map((u) => `${u.forItem} (${u.qtyNeeded})`).join(', ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: WORKSTATIONS WORKFLOW */}
      {plannerMode === 'steps' && (
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
                        <img src={cr.image} alt={cr.name} style={{ width: '28px', height: '28px', objectFit: 'contain' }} referrerPolicy="no-referrer" />
                      )}
                      <div>
                        <span
                          style={{ fontWeight: 'bold', color: 'var(--text-primary)', cursor: cr.itemObj ? 'pointer' : 'default', fontSize: '0.9rem' }}
                          onClick={() => cr.itemObj && onSelectItem && onSelectItem(cr.itemObj)}
                        >
                          {cr.name}
                        </span>
                        <div style={{ display: 'flex', gap: '8px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          <span>Fabricar: <strong>{cr.totalQuantity}x</strong> ({cr.runs} ejecuciones)</span>
                          {cr.totalXp > 0 && <span style={{ color: '#68d391' }}>+{cr.totalXp} XP</span>}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Requiere:</span>
                      {cr.inputs.map((inp, iIdx) => (
                        <span
                          key={iIdx}
                          style={{
                            fontSize: '0.75rem',
                            background: 'rgba(0,0,0,0.3)',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            color: '#e2e8f0',
                            border: '1px solid rgba(255,255,255,0.06)'
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
      )}
    </div>
  );
}
