import React from 'react';
import GameIcon from '../GameIcon';

export default function RecipeTreeNode({ node, onSelectItem, isRoot = false }) {
  if (!node) return null;

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: isRoot ? 0 : '20px', marginTop: '8px', position: 'relative' }}>
      {!isRoot && (
        <div 
          style={{
            position: 'absolute',
            left: '-14px',
            top: '14px',
            width: '12px',
            height: '1px',
            background: 'var(--gold-border)'
          }}
        />
      )}

      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 12px',
          background: hasChildren ? 'rgba(20, 25, 36, 0.7)' : 'rgba(10, 14, 20, 0.5)',
          borderRadius: 'var(--radius-sm)',
          border: hasChildren ? '1px solid var(--gold-border)' : '1px dashed rgba(255,255,255,0.1)',
          cursor: node.itemObj ? 'pointer' : 'default',
          transition: 'all 0.15s'
        }}
        onClick={() => node.itemObj && onSelectItem && onSelectItem(node.itemObj)}
        title={node.itemObj ? `Ver ficha de ${node.name}` : undefined}
      >
        {node.image && (
          <img 
            src={node.image} 
            alt={node.name} 
            style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0 }} 
          />
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--gold-400)', fontWeight: 'bold', fontSize: '0.85rem' }}>
            {node.quantity}x
          </span>
          <span style={{ color: '#edf2f7', fontSize: '0.85rem', fontWeight: hasChildren ? '600' : 'normal' }}>
            {node.name}
          </span>

          {node.facility && (
            <span 
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-gold)',
                background: 'rgba(212,175,55,0.12)',
                padding: '2px 7px',
                borderRadius: '8px',
                border: '1px solid rgba(212,175,55,0.3)'
              }}
            >
              {node.facility}
            </span>
          )}

          {node.isRaw && (
            <span 
              style={{
                fontSize: '0.65rem',
                color: '#68d391',
                background: 'rgba(72,187,120,0.12)',
                padding: '2px 6px',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <GameIcon name="plant-seed" size={11} color="#68d391" />
              <span>Recurso Base</span>
            </span>
          )}
        </div>
      </div>

      {/* Children branches */}
      {hasChildren && (
        <div style={{ borderLeft: '1px solid var(--gold-border)', marginLeft: '12px', paddingLeft: '4px' }}>
          {node.children.map((child, idx) => (
            <RecipeTreeNode 
              key={idx} 
              node={child} 
              onSelectItem={onSelectItem} 
              isRoot={false} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
