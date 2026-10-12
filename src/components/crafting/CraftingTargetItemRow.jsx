import React from 'react';
import { 
  Minus, 
  Plus, 
  Trash2, 
  Workflow, 
  ChevronDown, 
  ChevronRight 
} from 'lucide-react';
import RecipeTreeNode from './RecipeTreeNode';

export default function CraftingTargetItemRow({
  targetItem,
  targetQuantity,
  tree,
  isTreeOpen,
  onToggleTree,
  onUpdateQuantity,
  onRemoveItem,
  onSelectItem
}) {
  return (
    <div 
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--gold-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'border-color 0.2s'
      }}
    >
      {/* Item Main Row */}
      <div 
        className="craft-item-row"
        style={{ border: 'none', background: 'transparent' }}
      >
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1, minWidth: 0 }}
          onClick={() => onSelectItem && onSelectItem(targetItem)}
          title="Ver ficha completa del objeto"
        >
          <div className="item-icon-frame" style={{ width: '44px', height: '44px' }}>
            <img 
              src={targetItem.image} 
              alt={targetItem.name} 
              className="item-icon-img" 
              referrerPolicy="no-referrer" 
              style={{ width: '34px', height: '34px' }} 
            />
          </div>
          <div style={{ minWidth: 0 }}>
            <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-title)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {targetItem.name}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)' }}>
                {targetItem.recipe?.facility || 'Mesa de Crafteo'}
              </span>
              {targetItem.recipe?.skillxp > 0 && (
                <span style={{ fontSize: '0.72rem', color: '#63b3ed' }}>
                  +{targetItem.recipe.skillxp * targetQuantity} XP
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Tree Toggle Button */}
          <button
            className={`btn-fantasy ${isTreeOpen ? 'gold' : ''}`}
            style={{ padding: '6px 12px', fontSize: '0.78rem', gap: '4px' }}
            onClick={() => onToggleTree(targetItem.id)}
            title="Ver árbol de ingredientes desglosados"
          >
            <Workflow size={14} />
            <span className="desktop-only-action">Desglose</span>
            {isTreeOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {/* Quantity Controls */}
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', border: '1px solid var(--gold-border)' }}>
            <button 
              className="btn-fantasy btn-icon" 
              style={{ width: '30px', height: '30px', border: 'none' }}
              onClick={() => onUpdateQuantity(targetItem.id, Math.max(1, targetQuantity - 1))}
            >
              <Minus size={14} />
            </button>
            <span style={{ padding: '0 10px', fontWeight: 'bold', color: 'var(--gold-400)', minWidth: '24px', textAlign: 'center' }}>
              {targetQuantity}
            </span>
            <button 
              className="btn-fantasy btn-icon" 
              style={{ width: '30px', height: '30px', border: 'none' }}
              onClick={() => onUpdateQuantity(targetItem.id, targetQuantity + 1)}
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Remove Item */}
          <button 
            className="btn-fantasy btn-icon" 
            style={{ width: '34px', height: '34px' }}
            onClick={() => onRemoveItem(targetItem.id)}
            title="Quitar objetivo"
          >
            <Trash2 size={16} color="#fc8181" />
          </button>
        </div>
      </div>

      {/* Nested Tree Breakdown View for this specific item */}
      {isTreeOpen && (
        <div 
          style={{ 
            padding: '14px 18px', 
            background: 'rgba(10, 13, 18, 0.75)', 
            borderTop: '1px solid rgba(255, 255, 255, 0.08)' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Workflow size={15} color="var(--gold-400)" />
            <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.8rem', color: 'var(--gold-300)', fontWeight: 'bold' }}>
              ÁRBOL DE FABRICACIÓN PASO A PASO
            </span>
          </div>

          <RecipeTreeNode node={tree} onSelectItem={onSelectItem} isRoot={true} />
        </div>
      )}
    </div>
  );
}
