import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Sword, 
  Heart, 
  Zap, 
  Trash2, 
  Plus, 
  X, 
  Sparkles, 
  Clock, 
  Scale, 
  UserCheck,
  Search,
  Flame,
  Filter
} from 'lucide-react';

const SLOTS_CONFIG = [
  { 
    id: 'head', 
    name: 'Cabeza', 
    icon: '👑', 
    typeFilter: ['helmet', 'hat', 'coif', 'med helm'],
    subtypes: [
      { id: 'all', name: 'Todos los Cascos' },
      { id: 'heavy', name: '🛡️ Placas / Metal', keywords: ['helmet', 'helm', 'med helm'] },
      { id: 'ranged', name: '🏹 Cuero / Coif', keywords: ['coif', 'leather', 'dragonhide'] },
      { id: 'magic', name: '🧙 Magia / Sombreros', keywords: ['hat', 'hood', 'ancestral', 'apprentice'] }
    ]
  },
  { 
    id: 'neck', 
    name: 'Amuleto', 
    icon: '📿', 
    typeFilter: ['amulet', 'necklace'],
    subtypes: [
      { id: 'all', name: 'Todos los Amuletos' },
      { id: 'combat', name: '⚔️ Combate (Fuerza / Precisión)', keywords: ['strength', 'accuracy', 'glory'] },
      { id: 'defense', name: '🛡️ Defensa', keywords: ['defence', 'defense'] },
      { id: 'magic', name: '🔮 Magia y Especial', keywords: ['magic', 'bandosian', 'abraxus'] }
    ]
  },
  { 
    id: 'cape', 
    name: 'Capa', 
    icon: '🧣', 
    typeFilter: ['cape', 'accumulator'],
    subtypes: [
      { id: 'all', name: 'Todas las Capas' },
      { id: 'skill', name: '🎖️ Capas de Habilidad', keywords: ['cape'] },
      { id: 'ranged', name: '🏹 Munición (Acumulador)', keywords: ['accumulator'] }
    ]
  },
  { 
    id: 'body', 
    name: 'Pecho / Torso', 
    icon: '🥋', 
    typeFilter: ['platebody', 'body', 'robe', 'tunic'],
    subtypes: [
      { id: 'all', name: 'Todos los Torsos' },
      { id: 'heavy', name: '🛡️ Corazas de Metal', keywords: ['platebody', 'knight'] },
      { id: 'ranged', name: '🏹 Cueros de Dragón', keywords: ['dragonhide body', 'tunic', 'leather'] },
      { id: 'magic', name: '🧙 Ropajes Mágicos', keywords: ['robe', 'ancestral', 'apprentice'] }
    ]
  },
  { 
    id: 'mainhand', 
    name: 'Arma Principal', 
    icon: '⚔️', 
    typeFilter: ['weapon', 'sword', 'axe', 'bow', 'wand', 'staff', 'dagger', 'scimitar', 'whip', 'mace', 'crossbow', 'greataxe', 'greatsword', 'warhammer', 'arrow', 'bolt', 'ammunition'],
    subtypes: [
      { id: 'all', name: 'Todas las Armas' },
      { id: 'swords', name: '⚔️ Espadas y Cimitarras', keywords: ['sword', 'greatsword', 'scimitar'] },
      { id: 'axes', name: '🪓 Hachas de Guerra', keywords: ['greataxe', 'axe', 'warhammer', 'mace'] },
      { id: 'whips', name: '🐍 Látigos (Whips)', keywords: ['whip'] },
      { id: 'ranged', name: '🏹 Arcos y Ballestas', keywords: ['bow', 'shortbow', 'longbow', 'crossbow'] },
      { id: 'ammo', name: '🎯 Munición (Flechas y Pernos)', keywords: ['arrow', 'bolt', 'ammunition'] },
      { id: 'magic', name: '🔮 Varitas y Bastones', keywords: ['wand', 'staff', 'battlestaff'] },
      { id: 'daggers', name: '🗡️ Dagas y Cortas', keywords: ['dagger', 'blade'] }
    ]
  },
  { 
    id: 'offhand', 
    name: 'Escudo / Offhand', 
    icon: '🛡️', 
    typeFilter: ['shield'],
    subtypes: [
      { id: 'all', name: 'Todos los Escudos' },
      { id: 'metal', name: '🛡️ Escudos de Metal', keywords: ['shield'] },
      { id: 'dragon', name: '🐉 Anti-Dragón', keywords: ['anti-dragon'] }
    ]
  },
  { 
    id: 'legs', 
    name: 'Piernas', 
    icon: '👖', 
    typeFilter: ['platelegs', 'legs', 'chaps', 'leggings', 'robe legs'],
    subtypes: [
      { id: 'all', name: 'Todas las Perneras' },
      { id: 'heavy', name: '🛡️ Perneras de Placas', keywords: ['platelegs', 'knight'] },
      { id: 'ranged', name: '🏹 Pantalones de Cazador', keywords: ['chaps', 'leggings'] },
      { id: 'magic', name: '🧙 Faldas Mágicas', keywords: ['robe legs', 'ancestral', 'apprentice'] }
    ]
  },
  { 
    id: 'ring', 
    name: 'Anillo', 
    icon: '💍', 
    typeFilter: ['ring'],
    subtypes: [
      { id: 'all', name: 'Todos los Anillos' }
    ]
  },
  { 
    id: 'consumable1', 
    name: 'Poción / Comida 1', 
    icon: '🧪', 
    typeFilter: ['potion', 'food', 'consumable', 'stew', 'broth', 'pie', 'potato', 'fish'],
    subtypes: [
      { id: 'all', name: 'Todos los Consumibles' },
      { id: 'potions', name: '🧪 Pociones y Elixires', keywords: ['potion', 'antifire', 'antipoison', 'elixir'] },
      { id: 'food', name: '🍲 Comidas y Estofados', keywords: ['stew', 'broth', 'pie', 'potato', 'food', 'seared', 'compote', 'fish'] }
    ]
  },
  { 
    id: 'consumable2', 
    name: 'Poción / Comida 2', 
    icon: '🍲', 
    typeFilter: ['potion', 'food', 'consumable', 'stew', 'broth', 'pie', 'potato', 'fish'],
    subtypes: [
      { id: 'all', name: 'Todos los Consumibles' },
      { id: 'potions', name: '🧪 Pociones y Elixires', keywords: ['potion', 'antifire', 'antipoison', 'elixir'] },
      { id: 'food', name: '🍲 Comidas y Estofados', keywords: ['stew', 'broth', 'pie', 'potato', 'food', 'seared', 'compote', 'fish'] }
    ]
  }
];

export default function LoadoutBuilder({ 
  loadout, 
  onEquipSlot, 
  onUnequipSlot, 
  onClearLoadout,
  allItems, 
  onSelectItem 
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
        <div className="loadout-character-stage">
          <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserCheck size={18} />
            Ranuras de Equipamiento
          </h3>

          <div className="gear-slots-grid">
            {SLOTS_CONFIG.map((slot) => {
              const item = loadout[slot.id];

              return (
                <div 
                  key={slot.id}
                  className={`gear-slot ${item ? 'filled' : ''}`}
                  onClick={() => handleOpenSlot(slot.id)}
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
                        {item.name.substring(0, 11)}..
                      </span>
                      <button
                        className="btn-fantasy btn-icon"
                        style={{ position: 'absolute', top: '2px', right: '2px', width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(0,0,0,0.7)', border: 'none' }}
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
            })}
          </div>
        </div>

        {/* Aggregate Stats Summary */}
        <div className="loadout-stats-box">
          <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} />
            Estadísticas Totales del Personaje
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div className="recipe-section" style={{ padding: '14px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NIVEL DE PODER PROMEDIO</span>
              <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--tier-7)', fontFamily: 'var(--font-title)' }}>
                ★ {totals.avgPower}
              </p>
            </div>

            <div className="recipe-section" style={{ padding: '14px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DAÑO DE ARMA</span>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fc8181', fontFamily: 'var(--font-title)' }}>
                {totals.mainWeaponDmg}
              </p>
            </div>

            <div className="recipe-section" style={{ padding: '14px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ARMADURA TOTAL</span>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#63b3ed', fontFamily: 'var(--font-title)' }}>
                +{totals.totalArmour}
              </p>
            </div>

            <div className="recipe-section" style={{ padding: '14px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BLOQUEO COMBINADO</span>
              <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#68d391', fontFamily: 'var(--font-title)' }}>
                {totals.totalBlock} pts
              </p>
            </div>

            <div className="recipe-section" style={{ padding: '14px', gridColumn: 'span 2' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PESO TOTAL DEL EQUIPO</span>
              <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#e2e8f0' }}>
                {totals.totalWeight} kg
              </p>
            </div>
          </div>

          <div style={{ marginTop: 'auto', background: 'rgba(212,175,55,0.06)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--gold-border)' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              💡 <strong>Consejo:</strong> En RuneScape: Dragonwilds, el daño y la resistencia escalan fuertemente con el nivel de poder de los objetos y las ascensiones en la Fragua Mística.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Equip Item Selection Modal with Subtype Separators */}
      {activeSlotConfig && (
        <div className="modal-overlay" onClick={() => setActiveSlotModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            {/* Modal Header */}
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>{activeSlotConfig.icon}</span>
                <div>
                  <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>
                    Seleccionar {activeSlotConfig.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {slotCandidates.length} objetos disponibles
                  </span>
                </div>
              </div>
              <button className="btn-fantasy btn-icon" onClick={() => setActiveSlotModal(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Subtype Filter Tabs / Separators */}
            {activeSlotConfig.subtypes && activeSlotConfig.subtypes.length > 1 && (
              <div style={{ display: 'flex', gap: '6px', padding: '10px 16px', overflowX: 'auto', background: 'rgba(10,13,18,0.7)', borderBottom: '1px solid var(--gold-border)' }}>
                {activeSlotConfig.subtypes.map((st) => (
                  <button
                    key={st.id}
                    className={`filter-chip ${modalSubtype === st.id ? 'active' : ''}`}
                    onClick={() => setModalSubtype(st.id)}
                    style={{ whiteSpace: 'nowrap', fontSize: '0.78rem' }}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            )}

            {/* Modal Quick Search y Power Level Filter */}
            <div style={{ padding: '12px 16px', background: 'rgba(14,18,26,0.6)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="search-input-wrapper">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  className="search-input"
                  style={{ padding: '8px 12px 8px 38px', fontSize: '0.85rem' }}
                  placeholder="Buscar en esta ranura..."
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                />
                {modalSearch && (
                  <button className="search-clear-btn" onClick={() => setModalSearch('')}>
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Power Level mini chips */}
              <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-title)' }}>PODER:</span>
                <button
                  className={`filter-chip ${modalPowerTier === 'all' ? 'active' : ''}`}
                  style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                  onClick={() => setModalPowerTier('all')}
                >
                  Todos
                </button>
                <button
                  className={`filter-chip ${modalPowerTier === 't1-3' ? 'active' : ''}`}
                  style={{ padding: '3px 8px', fontSize: '0.72rem', color: 'var(--tier-1-3)' }}
                  onClick={() => setModalPowerTier('t1-3')}
                >
                  ★ T1-3
                </button>
                <button
                  className={`filter-chip ${modalPowerTier === 't4-6' ? 'active' : ''}`}
                  style={{ padding: '3px 8px', fontSize: '0.72rem', color: 'var(--tier-4-6)' }}
                  onClick={() => setModalPowerTier('t4-6')}
                >
                  ★ T4-6
                </button>
                <button
                  className={`filter-chip ${modalPowerTier === 't7' ? 'active' : ''}`}
                  style={{ padding: '3px 8px', fontSize: '0.72rem', color: 'var(--tier-7)' }}
                  onClick={() => setModalPowerTier('t7')}
                >
                  ★ T7
                </button>
                <button
                  className={`filter-chip ${modalPowerTier === 't8-9' ? 'active' : ''}`}
                  style={{ padding: '3px 8px', fontSize: '0.72rem', color: 'var(--tier-8-9)' }}
                  onClick={() => setModalPowerTier('t8-9')}
                >
                  ★ T8-9
                </button>
              </div>
            </div>

            {/* Modal Candidates List */}
            <div className="modal-body" style={{ maxHeight: '55vh', padding: '16px' }}>
              {slotCandidates.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px' }}>
                  <Flame size={32} color="var(--gold-500)" style={{ margin: '0 auto 10px' }} />
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    No se encontraron objetos con los filtros seleccionados.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {slotCandidates.map((cand) => (
                    <div 
                      key={cand.id}
                      className="craft-item-row"
                      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                      onClick={() => {
                        onEquipSlot(activeSlotModal, cand);
                        setActiveSlotModal(null);
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                        <div className="item-icon-frame" style={{ width: '40px', height: '40px' }}>
                          <img src={cand.image} alt={cand.name} className="item-icon-img" referrerPolicy="no-referrer" style={{ width: '30px', height: '30px' }} />
                        </div>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <h4 style={{ color: '#fff', fontFamily: 'var(--font-title)', fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {cand.name}
                            </h4>
                            {cand.powerLevel && (
                              <span className="power-level-crest tier-7" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                                ★ {cand.powerLevel}
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', display: 'block' }}>
                            {cand.stats?.baseDamage ? `Daño: ${cand.stats.baseDamage}` : (cand.stats?.armourRating ? `Defensa: +${cand.stats.armourRating}` : cand.itemType)}
                            {cand.stats?.damageType ? ` (${cand.stats.damageType})` : ''}
                            {cand.stats?.durability ? ` · Dur: ${cand.stats.durability}` : ''}
                          </span>
                        </div>
                      </div>

                      <button className="btn-fantasy gold" style={{ padding: '6px 14px', fontSize: '0.8rem', flexShrink: 0 }}>
                        Equipar
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
