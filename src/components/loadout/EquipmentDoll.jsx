import React from 'react';
import { UserCheck } from 'lucide-react';
import EquipmentSlot from './EquipmentSlot';

export default function EquipmentDoll({
  slotsConfig,
  loadout,
  onOpenSlot,
  onUnequipSlot
}) {
  return (
    <div className="loadout-character-stage">
      <h3
        style={{
          fontFamily: 'var(--font-title)',
          color: 'var(--gold-400)',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <UserCheck size={18} />
        Ranuras de Equipamiento
      </h3>

      <div className="gear-slots-grid">
        {slotsConfig.map((slot) => (
          <EquipmentSlot
            key={slot.id}
            slot={slot}
            item={loadout[slot.id]}
            onOpenSlot={onOpenSlot}
            onUnequipSlot={onUnequipSlot}
          />
        ))}
      </div>
    </div>
  );
}
