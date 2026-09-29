import React from 'react';
import { X, Search, Flame } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function SlotItemPickerModal({
  activeSlotConfig,
  onClose,
  slotCandidates,
  modalSearch,
  setModalSearch,
  modalSubtype,
  setModalSubtype,
  modalPowerTier,
  setModalPowerTier,
  onEquipItem
}) {
  if (!activeSlotConfig) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="item-icon-frame" style={{ width: '38px', height: '38px' }}>
              <GameIcon name={activeSlotConfig.icon} size={22} color="var(--gold-400)" />
            </div>
            <div>
              <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>
                Seleccionar {activeSlotConfig.name}
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {slotCandidates.length} objetos disponibles
              </span>
            </div>
          </div>
          <button className="btn-fantasy btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Subtype Filter Tabs / Separators */}
        {activeSlotConfig.subtypes && activeSlotConfig.subtypes.length > 1 && (
          <div
            style={{
              display: 'flex',
              gap: '6px',
              padding: '10px 16px',
              overflowX: 'auto',
              background: 'rgba(10,13,18,0.7)',
              borderBottom: '1px solid var(--gold-border)'
            }}
          >
            {activeSlotConfig.subtypes.map((st) => (
              <button
                key={st.id}
                className={`filter-chip ${modalSubtype === st.id ? 'active' : ''}`}
                onClick={() => setModalSubtype(st.id)}
                style={{ whiteSpace: 'nowrap', fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
              >
                {st.icon && <GameIcon name={st.icon} size={13} />}
                <span>{st.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Modal Quick Search y Power Level Filter */}
        <div
          style={{
            padding: '12px 16px',
            background: 'rgba(14,18,26,0.6)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
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
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-title)' }}>
              PODER:
            </span>
            <button
              className={`filter-chip ${modalPowerTier === 'all' ? 'active' : ''}`}
              style={{ padding: '3px 8px', fontSize: '0.72rem' }}
              onClick={() => setModalPowerTier('all')}
            >
              Todos
            </button>
            <button
              className={`filter-chip ${modalPowerTier === 't1-3' ? 'active' : ''}`}
              style={{ padding: '3px 8px', fontSize: '0.72rem', color: 'var(--tier-1-3)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
              onClick={() => setModalPowerTier('t1-3')}
            >
              <GameIcon name="flat-star" size={10} color="var(--tier-1-3)" />
              <span>T1-3</span>
            </button>
            <button
              className={`filter-chip ${modalPowerTier === 't4-6' ? 'active' : ''}`}
              style={{ padding: '3px 8px', fontSize: '0.72rem', color: 'var(--tier-4-6)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
              onClick={() => setModalPowerTier('t4-6')}
            >
              <GameIcon name="flat-star" size={10} color="var(--tier-4-6)" />
              <span>T4-6</span>
            </button>
            <button
              className={`filter-chip ${modalPowerTier === 't7' ? 'active' : ''}`}
              style={{ padding: '3px 8px', fontSize: '0.72rem', color: 'var(--tier-7)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
              onClick={() => setModalPowerTier('t7')}
            >
              <GameIcon name="flat-star" size={10} color="var(--tier-7)" />
              <span>T7</span>
            </button>
            <button
              className={`filter-chip ${modalPowerTier === 't8-9' ? 'active' : ''}`}
              style={{ padding: '3px 8px', fontSize: '0.72rem', color: 'var(--tier-8-9)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}
              onClick={() => setModalPowerTier('t8-9')}
            >
              <GameIcon name="flat-star" size={10} color="var(--tier-8-9)" />
              <span>T8-9</span>
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
                  onClick={() => onEquipItem(activeSlotConfig.id, cand)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                    <div className="item-icon-frame" style={{ width: '40px', height: '40px' }}>
                      <img
                        src={cand.image}
                        alt={cand.name}
                        className="item-icon-img"
                        referrerPolicy="no-referrer"
                        style={{ width: '30px', height: '30px' }}
                      />
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <h4
                          style={{
                            color: '#fff',
                            fontFamily: 'var(--font-title)',
                            fontSize: '0.95rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {cand.name}
                        </h4>
                        {cand.powerLevel && (
                          <span className="power-level-crest tier-7" style={{ fontSize: '0.68rem', padding: '1px 6px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <GameIcon name="flat-star" size={9} />
                            <span>{cand.powerLevel}</span>
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', display: 'block' }}>
                        {cand.stats?.baseDamage
                          ? `Daño: ${cand.stats.baseDamage}`
                          : cand.stats?.armourRating
                          ? `Defensa: +${cand.stats.armourRating}`
                          : cand.itemType}
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
  );
}
