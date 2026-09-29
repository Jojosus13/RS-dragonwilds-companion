import React from 'react';
import { X } from 'lucide-react';

export default function EquipmentSlot({ slot, item, onOpenSlot, onUnequipSlot }) {
  return (
    <div
      className={`gear-slot ${item ? 'filled' : ''}`}
      onClick={() => onOpenSlot(slot.id)}
      title={item ? `${item.name} (Clic para cambiar)` : `Equipar ${slot.name}`}
    >
      {item ? (
        <>
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            style={{ width: '38px', height: '38px', objectFit: 'contain' }}
          />
          <span className="gear-slot-label" style={{ color: 'var(--gold-300)' }}>
            {item.name.length > 11 ? `${item.name.substring(0, 11)}..` : item.name}
          </span>
          <button
            className="btn-fantasy btn-icon"
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.7)',
              border: 'none'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onUnequipSlot(slot.id);
            }}
            title="Desequipar"
          >
            <X size={12} color="#fc8181" />
          </button>
        </>
      ) : (
        <>
          <span style={{ fontSize: '1.4rem' }}>{slot.icon}</span>
          <span className="gear-slot-label">{slot.name}</span>
        </>
      )}
    </div>
  );
}
