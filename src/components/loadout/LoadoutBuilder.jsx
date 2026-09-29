import React, { useState, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import EquipmentDoll from './EquipmentDoll';
import LoadoutStatsPanel from './LoadoutStatsPanel';
import SlotItemPickerModal from './SlotItemPickerModal';

export const SLOTS_CONFIG = [
  {
    id: 'head',
    name: 'Cabeza',
    icon: '👑',
    typeFilter: ['helmet', 'hat', 'coif', 'med helm', 'casco', 'yelmo', 'capucha', 'sombrero', 'tiara', 'corona', 'caperuza'],
    subtypes: [
      { id: 'all', name: 'Todos los Cascos' },
      { id: 'heavy', name: '🛡️ Placas / Metal', keywords: ['helmet', 'helm', 'med helm', 'casco', 'yelmo', 'placas'] },
      { id: 'ranged', name: '🏹 Cuero / Coif', keywords: ['coif', 'leather', 'dragonhide', 'capucha', 'cuero', 'dragón'] },
      { id: 'magic', name: '🧙 Magia / Sombreros', keywords: ['hat', 'hood', 'ancestral', 'apprentice', 'sombrero', 'mágico', 'mago', 'tiara'] }
    ]
  },
  {
    id: 'neck',
    name: 'Amuleto',
    icon: '📿',
    typeFilter: ['amulet', 'necklace', 'pendant', 'choker', 'amuleto', 'collar'],
    subtypes: [
      { id: 'all', name: 'Todos los Amuletos' },
      { id: 'combat', name: '⚔️ Combate (Fuerza / Precisión)', keywords: ['strength', 'accuracy', 'glory', 'fuerza', 'precisión', 'gloria', 'poder'] },
      { id: 'defense', name: '🛡️ Defensa', keywords: ['defence', 'defense', 'defensa', 'protección'] },
      { id: 'magic', name: '🔮 Magia y Especial', keywords: ['magic', 'bandosian', 'abraxus', 'magia', 'místico'] }
    ]
  },
  {
    id: 'cape',
    name: 'Capa',
    icon: '🧣',
    typeFilter: ['cape', 'accumulator', 'cloak', 'capa', 'manto', 'acumulador'],
    subtypes: [
      { id: 'all', name: 'Todas las Capas' },
      { id: 'skill', name: '🎖️ Capas de Habilidad', keywords: ['cape', 'capa', 'manto'] },
      { id: 'ranged', name: '🏹 Munición (Acumulador)', keywords: ['accumulator', 'acumulador', 'ava'] }
    ]
  },
  {
    id: 'body',
    name: 'Pecho / Torso',
    icon: '🥋',
    typeFilter: ['platebody', 'chainbody', 'body', 'robe top', 'robe', 'tunic', 'cuirass', 'coraza', 'cota', 'peto', 'túnica'],
    subtypes: [
      { id: 'all', name: 'Todos los Torsos' },
      { id: 'heavy', name: '🛡️ Corazas de Metal', keywords: ['platebody', 'knight', 'coraza', 'cota de malla', 'placas'] },
      { id: 'ranged', name: '🏹 Cueros de Dragón', keywords: ['dragonhide body', 'tunic', 'leather', 'cuero', 'peto', 'dragón'] },
      { id: 'magic', name: '🧙 Ropajes Mágicos', keywords: ['robe', 'ancestral', 'apprentice', 'túnica', 'mágico', 'mago', 'hábito'] }
    ]
  },
  {
    id: 'mainhand',
    name: 'Arma Principal',
    icon: '⚔️',
    typeFilter: ['weapon', 'sword', 'axe', 'bow', 'wand', 'staff', 'dagger', 'scimitar', 'whip', 'mace', 'crossbow', 'greataxe', 'greatsword', 'warhammer', 'arrow', 'bolt', 'ammunition', 'espada', 'hacha', 'arco', 'varita', 'bastón', 'daga', 'cimitarra', 'látigo', 'maza', 'ballesta', 'martillo', 'lanza', 'alabarda', 'flecha', 'perno'],
    subtypes: [
      { id: 'all', name: 'Todas las Armas' },
      { id: 'swords', name: '⚔️ Espadas y Cimitarras', keywords: ['sword', 'greatsword', 'scimitar', 'espada', 'cimitarra', 'espadón', 'estoque'] },
      { id: 'axes', name: '🪓 Hachas de Guerra', keywords: ['greataxe', 'axe', 'warhammer', 'mace', 'hacha', 'martillo', 'maza'] },
      { id: 'whips', name: '🐍 Látigos (Whips)', keywords: ['whip', 'látigo'] },
      { id: 'ranged', name: '🏹 Arcos y Ballestas', keywords: ['bow', 'shortbow', 'longbow', 'crossbow', 'arco', 'ballesta', 'balista'] },
      { id: 'ammo', name: '🎯 Munición (Flechas y Pernos)', keywords: ['arrow', 'bolt', 'ammunition', 'flecha', 'perno', 'munición'] },
      { id: 'magic', name: '🔮 Varitas y Bastones', keywords: ['wand', 'staff', 'battlestaff', 'varita', 'bastón'] },
      { id: 'daggers', name: '🗡️ Dagas y Cortas', keywords: ['dagger', 'blade', 'daga', 'cuchillo'] }
    ]
  },
  {
    id: 'offhand',
    name: 'Escudo / Offhand',
    icon: '🛡️',
    typeFilter: ['shield', 'kiteshield', 'buckler', 'defender', 'escudo', 'broquel', 'defensor', 'áspis'],
    subtypes: [
      { id: 'all', name: 'Todos los Escudos' },
      { id: 'metal', name: '🛡️ Escudos de Metal', keywords: ['shield', 'kiteshield', 'escudo', 'lágrima', 'cuadrado'] },
      { id: 'dragon', name: '🐉 Anti-Dragón y Especiales', keywords: ['anti-dragon', 'dragonfire', 'dragón', 'fuego', 'espiritual'] }
    ]
  },
  {
    id: 'legs',
    name: 'Piernas',
    icon: '👖',
    typeFilter: ['platelegs', 'plateskirt', 'legs', 'chaps', 'leggings', 'robe legs', 'robe bottom', 'perneras', 'pantalones', 'falda', 'faldón', 'quijote'],
    subtypes: [
      { id: 'all', name: 'Todas las Perneras' },
      { id: 'heavy', name: '🛡️ Perneras de Placas', keywords: ['platelegs', 'knight', 'perneras', 'placas', 'quijote'] },
      { id: 'ranged', name: '🏹 Pantalones de Cazador', keywords: ['chaps', 'leggings', 'pantalones', 'cuero', 'dragón'] },
      { id: 'magic', name: '🧙 Faldas Mágicas', keywords: ['robe legs', 'ancestral', 'apprentice', 'falda', 'mágico', 'mago', 'túnica'] }
    ]
  },
  {
    id: 'ring',
    name: 'Anillo',
    icon: '💍',
    typeFilter: ['ring', 'anillo', 'band'],
    subtypes: [
      { id: 'all', name: 'Todos los Anillos' }
    ]
  },
  {
    id: 'consumable1',
    name: 'Poción / Comida 1',
    icon: '🧪',
    typeFilter: ['potion', 'food', 'consumable', 'stew', 'broth', 'pie', 'potato', 'fish', 'poción', 'elixir', 'brebaje', 'comida', 'estofado', 'pastel', 'patata', 'pescado', 'carne'],
    subtypes: [
      { id: 'all', name: 'Todos los Consumibles' },
      { id: 'potions', name: '🧪 Pociones y Elixires', keywords: ['potion', 'antifire', 'antipoison', 'elixir', 'poción', 'antifuego', 'antiponzoña', 'brebaje', 'infusión'] },
      { id: 'food', name: '🍲 Comidas y Estofados', keywords: ['stew', 'broth', 'pie', 'potato', 'food', 'seared', 'compote', 'fish', 'estofado', 'pastel', 'patata', 'carne', 'pescado', 'asado', 'brasa'] }
    ]
  },
  {
    id: 'consumable2',
    name: 'Poción / Comida 2',
    icon: '🍲',
    typeFilter: ['potion', 'food', 'consumable', 'stew', 'broth', 'pie', 'potato', 'fish', 'poción', 'elixir', 'brebaje', 'comida', 'estofado', 'pastel', 'patata', 'pescado', 'carne'],
    subtypes: [
      { id: 'all', name: 'Todos los Consumibles' },
      { id: 'potions', name: '🧪 Pociones y Elixires', keywords: ['potion', 'antifire', 'antipoison', 'elixir', 'poción', 'antifuego', 'antiponzoña', 'brebaje', 'infusión'] },
      { id: 'food', name: '🍲 Comidas y Estofados', keywords: ['stew', 'broth', 'pie', 'potato', 'food', 'seared', 'compote', 'fish', 'estofado', 'pastel', 'patata', 'carne', 'pescado', 'asado', 'brasa'] }
    ]
  }
];

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

    let candidates = allItems.filter((item) => {
      const combined = `${item.title} ${item.name} ${item.itemType} ${item.category}`.toLowerCase();
      return activeSlotConfig.typeFilter.some((f) => combined.includes(f));
    });

    // Subtype filter
    if (modalSubtype !== 'all' && activeSlotConfig.subtypes) {
      const currentSub = activeSlotConfig.subtypes.find((s) => s.id === modalSubtype);
      if (currentSub?.keywords) {
        candidates = candidates.filter((item) => {
          const combined = `${item.title} ${item.name} ${item.itemType} ${item.category}`.toLowerCase();
          return currentSub.keywords.some((kw) => combined.includes(kw));
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
