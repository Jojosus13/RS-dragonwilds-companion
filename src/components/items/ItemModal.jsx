import React, { useState } from 'react';
import {
  Sword,
  Hammer,
  Layers,
  Zap,
  BookOpen,
  Shield,
  Plus,
  Check,
  Bookmark,
  Compass,
  ExternalLink
} from 'lucide-react';
import ItemModalHeader from './modal/ItemModalHeader';
import ItemStatsSection from './modal/ItemStatsSection';
import ItemRecipeSection from './modal/ItemRecipeSection';
import ItemUsedInSection from './modal/ItemUsedInSection';
import GameIcon from '../GameIcon';

export default function ItemModal({
  item,
  onClose,
  onSelectOtherItem,
  isFavorite,
  onToggleFavorite,
  isInPlanner,
  onTogglePlanner,
  onEquipItem,
  onViewItemOnMap
}) {
  const [activeTab, setActiveTab] = useState('stats');
  const [imgError, setImgError] = useState(false);

  if (!item) return null;

  const hasUpgrades = item.upgrades && item.upgrades.length > 0;
  const hasUsedIn = item.usedIn && item.usedIn.length > 0;
  const hasRecipe = !!item.recipe;
  const hasJournal = !!item.journal;

  const getPowerTierClass = (pw) => {
    if (!pw) return '';
    if (pw <= 3) return 'tier-1-3';
    if (pw <= 6) return 'tier-4-6';
    if (pw === 7) return 'tier-7';
    return 'tier-8-9';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <ItemModalHeader
          item={item}
          onClose={onClose}
          imgError={imgError}
          setImgError={setImgError}
          getPowerTierClass={getPowerTierClass}
        />

        {/* Modal Navigation Tabs */}
        <div className="modal-tabs">
          <button
            className={`modal-tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <GameIcon name="crossed-swords" size={14} style={{ marginRight: '6px' }} />
            Estadísticas
          </button>

          {hasRecipe && (
            <button
              className={`modal-tab-btn ${activeTab === 'recipe' ? 'active' : ''}`}
              onClick={() => setActiveTab('recipe')}
            >
              <GameIcon name="hammer-drop" size={14} style={{ marginRight: '6px' }} />
              Receta
            </button>
          )}

          {hasUsedIn && (
            <button
              className={`modal-tab-btn ${activeTab === 'usedIn' ? 'active' : ''}`}
              onClick={() => setActiveTab('usedIn')}
            >
              <GameIcon name="anvil-impact" size={14} style={{ marginRight: '6px' }} />
              Usado en ({item.usedIn.length})
            </button>
          )}

          {hasUpgrades && (
            <button
              className={`modal-tab-btn ${activeTab === 'upgrades' ? 'active' : ''}`}
              onClick={() => setActiveTab('upgrades')}
            >
              <GameIcon name="lightning-tear" size={14} style={{ marginRight: '6px' }} />
              Mejoras y Ascensión
            </button>
          )}

          {hasJournal && (
            <button
              className={`modal-tab-btn ${activeTab === 'journal' ? 'active' : ''}`}
              onClick={() => setActiveTab('journal')}
            >
              <GameIcon name="tied-scroll" size={14} style={{ marginRight: '6px' }} />
              Códice y Diario
            </button>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="modal-body">
          {/* TAB 1: STATS */}
          {activeTab === 'stats' && <ItemStatsSection item={item} />}

          {/* TAB 2: RECIPE */}
          {activeTab === 'recipe' && (
            <ItemRecipeSection item={item} onSelectOtherItem={onSelectOtherItem} />
          )}

          {/* TAB 3: USED IN */}
          {activeTab === 'usedIn' && (
            <ItemUsedInSection item={item} onSelectOtherItem={onSelectOtherItem} />
          )}

          {/* TAB 4: UPGRADES */}
          {activeTab === 'upgrades' && hasUpgrades && (
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', fontSize: '0.9rem' }}>
                Progresión de ascensión en la <strong>Fragua Mística (Mystic Forge)</strong>:
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'rgba(10,13,18,0.6)', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--gold-border)', background: 'rgba(212,175,55,0.1)' }}>
                      <th style={{ padding: '10px 14px', fontFamily: 'var(--font-title)', color: 'var(--gold-400)' }}>Nivel de Poder</th>
                      <th style={{ padding: '10px 14px', fontFamily: 'var(--font-title)', color: 'var(--gold-400)' }}>Daño Base</th>
                      <th style={{ padding: '10px 14px', fontFamily: 'var(--font-title)', color: 'var(--gold-400)' }}>Armadura</th>
                      <th style={{ padding: '10px 14px', fontFamily: 'var(--font-title)', color: 'var(--gold-400)' }}>Requisitos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.upgrades.map((upg, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 'bold', color: 'var(--gold-300)' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                            <GameIcon name="flat-star" size={11} />
                            <span>{upg.powerLevel || idx + 1}</span>
                          </span>
                        </td>
                        <td style={{ padding: '10px 14px', color: '#fc8181' }}>{upg.damage || '-'}</td>
                        <td style={{ padding: '10px 14px', color: '#63b3ed' }}>{upg.armour || '-'}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>{upg.materials || 'Fragmentos de Ánima'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: JOURNAL */}
          {activeTab === 'journal' && hasJournal && (
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid #b794f4' }}>
              <h4 style={{ fontFamily: 'var(--font-title)', color: '#d6bcfa', marginBottom: '8px' }}>
                Entrada del Códice de Dragonwilds:
              </h4>
              <p style={{ color: '#e2e8f0', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                {item.journal}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <div className="modal-footer-actions">
            {(item.category === 'Armas de Combate' || item.category === 'Armaduras y Ropa' || item.category === 'Weapons' || item.category === 'Armour') && (
              <button
                className="btn-fantasy btn-modal-action"
                onClick={() => onEquipItem(item)}
                title="Equipar en el Simulador de Personaje"
              >
                <GameIcon name="shield" size={16} />
                <span>Equipar</span>
              </button>
            )}

            {item.recipe && (
              <button
                className={`btn-fantasy btn-modal-action ${isInPlanner ? 'gold' : ''}`}
                onClick={() => onTogglePlanner(item)}
                title={isInPlanner ? 'Quitar de la lista de crafteo' : 'Añadir a la lista de crafteo'}
              >
                {isInPlanner ? <Check size={16} /> : <Plus size={16} />}
                <span>{isInPlanner ? 'En Crafteo' : 'A Crafteo'}</span>
              </button>
            )}

            <button
              className={`btn-fantasy btn-modal-action ${isFavorite ? 'gold' : ''}`}
              onClick={() => onToggleFavorite(item)}
              title={isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}
            >
              <GameIcon name="flat-star" size={16} color={isFavorite ? 'var(--gold-400)' : 'var(--text-muted)'} />
              <span>{isFavorite ? 'Guardado' : 'Favorito'}</span>
            </button>

            <button
              className="btn-fantasy btn-modal-action"
              onClick={() => onViewItemOnMap && onViewItemOnMap(item)}
              title="Buscar yacimientos y trazar ruta de farmeo en el mapa interactivo"
              style={{ color: '#63b3ed', borderColor: 'rgba(66, 153, 225, 0.35)' }}
            >
              <GameIcon name="position-marker" size={16} />
              <span>Ver en Mapa</span>
            </button>
          </div>

          {item.wikiUrl && (
            <a
              href={item.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fantasy modal-footer-wiki"
              title="Abrir página oficial de la Wiki"
            >
              <span>Wiki Oficial</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
