import React, { useState, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import EquipmentDoll from './EquipmentDoll';
import LoadoutStatsPanel from './LoadoutStatsPanel';
import SlotItemPickerModal from './SlotItemPickerModal';
import { SLOTS_CONFIG, isItemForSlot } from './slotsConfig';

export { SLOTS_CONFIG };

export default function LoadoutBuilder({
  loadout,
  onEquipSlot,
  onUnequipSlot,
  onClearLoadout,
  allItems
}) {
  const [activeSlotModal, setActiveSlotModal] = useState(null);
  const [modalSearch, setModalSearch] = useState('');
  const [modalSubtype, setModalSubtype] = useState('all');
  const [modalPowerTier, setModalPowerTier] = useState('all');

  // Compute total loadout stats
  const totals = useMemo(() => {
    let totalArmour = 0;
    let totalBlock = 0;
    let totalWeight = 0;
    let mainWeaponDmg = '';
    let totalPower = 0;
    let equippedCount = 0;

    Object.values(loadout).forEach((item) => {
      if (item) {
        equippedCount++;
        if (item.stats?.armourRating) totalArmour += item.stats.armourRating;
        if (item.stats?.block) totalBlock += item.stats.block;
        if (item.weight) totalWeight += item.weight;
        if (item.powerLevel) totalPower += item.powerLevel;
        if (item.stats?.baseDamage) mainWeaponDmg = item.stats.baseDamage;
      }
    });

    const avgPower = equippedCount > 0 ? (totalPower / equippedCount).toFixed(1) : '0';

    return {
      totalArmour,
      totalBlock,
      totalWeight: totalWeight.toFixed(1),
      mainWeaponDmg: mainWeaponDmg || '—',
      avgPower,
      equippedCount
    };
  }, [loadout]);

  const activeSlotConfig = useMemo(() => {
    return SLOTS_CONFIG.find((s) => s.id === activeSlotModal);
  }, [activeSlotModal]);

  // Filter items for currently opened slot modal with search and subtype
  const slotCandidates = useMemo(() => {
    if (!activeSlotConfig) return [];

    let candidates = allItems.filter((item) => isItemForSlot(item, activeSlotConfig.id));

    // Subtype filter
    if (modalSubtype !== 'all' && activeSlotConfig.subtypes) {
      const currentSub = activeSlotConfig.subtypes.find((s) => s.id === modalSubtype);
      if (currentSub?.keywords) {
        const pattern = new RegExp(`\\b(${currentSub.keywords.join('|')})`, 'i');
        candidates = candidates.filter((item) => {
          const combined = `${item.title} ${item.name} ${item.englishTitle || ''} ${item.itemType} ${item.category}`;
          return pattern.test(combined);
        });
      }
    }

    // Power Tier filter
    if (modalPowerTier !== 'all') {
      candidates = candidates.filter((it) => {
        const pw = it.powerLevel;
        if (!pw) return false;
        if (modalPowerTier === 't1-3') return pw >= 1 && pw <= 3;
        if (modalPowerTier === 't4-6') return pw >= 4 && pw <= 6;
        if (modalPowerTier === 't7') return pw === 7;
        if (modalPowerTier === 't8-9') return pw >= 8;
        return true;
      });
    }

    // Modal search query
    if (modalSearch.trim()) {
      const q = modalSearch.toLowerCase().trim();
      candidates = candidates.filter((it) =>
        it.title.toLowerCase().includes(q) ||
        it.name.toLowerCase().includes(q) ||
        (it.description && it.description.toLowerCase().includes(q)) ||
        (it.stats?.damageType && it.stats.damageType.toLowerCase().includes(q))
      );
    }

    return candidates;
  }, [activeSlotConfig, allItems, modalSubtype, modalPowerTier, modalSearch]);

  const handleOpenSlot = (slotId) => {
    setActiveSlotModal(slotId);
    setModalSearch('');
    setModalSubtype('all');
    setModalPowerTier('all');
  };

  const handleEquipItem = (slotId, item) => {
    onEquipSlot(slotId, item);
    setActiveSlotModal(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.4rem', color: 'var(--gold-300)' }}>
            Simulador de Personaje y Loadout
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Equipa armas divididas por tipo, armaduras y elixires para calcular tus estadísticas totales.
          </p>
        </div>

        {totals.equippedCount > 0 && (
          <button
            className="btn-fantasy"
            onClick={onClearLoadout}
            style={{ color: '#fc8181', borderColor: 'rgba(245, 101, 101, 0.3)' }}
          >
            <Trash2 size={16} />
            <span>Desequipar Todo</span>
          </button>
        )}
      </div>

      {/* Main Loadout Layout */}
      <div className="loadout-container">
        {/* Character Paperdoll / Slot Grid */}
        <EquipmentDoll
          slotsConfig={SLOTS_CONFIG}
          loadout={loadout}
          onOpenSlot={handleOpenSlot}
          onUnequipSlot={onUnequipSlot}
        />

        {/* Aggregate Stats Summary */}
        <LoadoutStatsPanel totals={totals} />
      </div>

      {/* Enhanced Equip Item Selection Modal */}
      <SlotItemPickerModal
        activeSlotConfig={activeSlotConfig}
        onClose={() => setActiveSlotModal(null)}
        slotCandidates={slotCandidates}
        modalSearch={modalSearch}
        setModalSearch={setModalSearch}
        modalSubtype={modalSubtype}
        setModalSubtype={setModalSubtype}
        modalPowerTier={modalPowerTier}
        setModalPowerTier={setModalPowerTier}
        onEquipItem={handleEquipItem}
      />
    </div>
  );
}
