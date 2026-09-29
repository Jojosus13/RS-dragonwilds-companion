import React from 'react';
import { Minus, Plus, Trash2, Workflow, ChevronDown, ChevronRight } from 'lucide-react';
import RecipeTreeNode from './RecipeTreeNode';

export default function CraftingTargetCard({
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
          onClick={() => onSelectItem(targetItem)}
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
            <span>Árbol</span>
            {isTreeOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>

          {/* Quantity Controls */}
          <div className="craft-quantity-controls">
            <button
              onClick={() => onUpdateQuantity(targetItem.id, Math.max(1, targetQuantity - 1))}
              disabled={targetQuantity <= 1}
              className="qty-btn"
            >
              <Minus size={14} />
            </button>
            <span className="qty-value">{targetQuantity}</span>
            <button
              onClick={() => onUpdateQuantity(targetItem.id, targetQuantity + 1)}
              className="qty-btn"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemoveItem(targetItem.id)}
            className="craft-remove-btn"
            title="Eliminar del planificador"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Collapsible Tree Breakdown */}
      {isTreeOpen && (
        <div
          style={{
            padding: '16px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderTop: '1px dashed rgba(212, 175, 55, 0.2)'
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', fontFamily: 'var(--font-title)' }}>
              DESGLOSE JERÁRQUICO DE PRODUCCIÓN:
            </span>
          </div>
          <RecipeTreeNode node={tree} isRoot onSelectItem={onSelectItem} />
        </div>
      )}
    </div>
  );
}
