import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function RecipeTreeNode({
  node,
  depth = 0,
  onSelectItem,
  isRoot = false
}) {
  if (!node) return null;

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        marginLeft: depth > 0 ? '20px' : '0',
        paddingLeft: depth > 0 ? '12px' : '0',
        borderLeft: depth > 0 ? '2px dashed rgba(212, 175, 55, 0.25)' : 'none',
        marginTop: depth > 0 ? '6px' : '0'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: isRoot
            ? 'rgba(212, 175, 55, 0.12)'
            : hasChildren
              ? 'rgba(255, 255, 255, 0.04)'
              : 'rgba(0, 0, 0, 0.2)',
          padding: '6px 10px',
          borderRadius: '8px',
          border: isRoot
            ? '1px solid var(--gold-border)'
            : '1px solid rgba(255, 255, 255, 0.06)',
          width: 'fit-content'
        }}
      >
        {node.image && (
          <img
            src={node.image}
            alt={node.name}
            style={{ width: '20px', height: '20px', objectFit: 'contain' }}
            referrerPolicy="no-referrer"
          />
        )}

        <span
          style={{
            fontSize: '0.85rem',
            color: isRoot ? 'var(--gold-300)' : 'var(--text-primary)',
            fontWeight: isRoot ? '700' : '500',
            cursor: node.itemObj ? 'pointer' : 'default'
          }}
          onClick={() => node.itemObj && onSelectItem && onSelectItem(node.itemObj)}
        >
          {node.name}
        </span>

        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--gold-400)',
            background: 'rgba(0, 0, 0, 0.4)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontWeight: 'bold'
          }}
        >
          ×{node.quantity}
        </span>

        {node.facility && (
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            en {node.facility}
          </span>
        )}

        {node.skillxp > 0 && (
          <span style={{ fontSize: '0.7rem', color: '#68d391' }}>
            (+{node.skillxp} XP)
          </span>
        )}
      </div>

      {/* Render children nodes */}
      {hasChildren && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {node.children.map((child, idx) => (
            <RecipeTreeNode
              key={idx}
              node={child}
              depth={depth + 1}
              onSelectItem={onSelectItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}
