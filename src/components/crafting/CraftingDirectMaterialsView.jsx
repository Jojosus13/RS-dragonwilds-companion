import React from 'react';
import { Info, CheckSquare, Square } from 'lucide-react';

export default function CraftingDirectMaterialsView({
  directMaterials = [],
  checkedDirectMaterials = {},
  onToggleDirectCheck
}) {
  return (
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
  );
}
