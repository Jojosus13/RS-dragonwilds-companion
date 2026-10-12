import React from 'react';
import { 
  Info, 
  CheckSquare, 
  Square, 
  ArrowRight 
} from 'lucide-react';

export default function CraftingRawMaterialsView({
  rawBaseMaterials = [],
  checkedRawMaterials = {},
  onToggleRawCheck
}) {
  return (
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
                  <img 
                    src={mat.image} 
                    alt={mat.item} 
                    className="item-icon-img" 
                    referrerPolicy="no-referrer" 
                    style={{ width: '24px', height: '24px' }} 
                  />
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
  );
}
