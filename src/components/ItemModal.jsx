import React, { useState } from 'react';
import { 
  X, 
  Bookmark, 
  Sparkles, 
  ExternalLink, 
  Sword, 
  Shield, 
  Clock, 
  Layers, 
  BookOpen, 
  Hammer, 
  Feather,
  Plus,
  Check,
  Zap,
  Flame,
  Compass
} from 'lucide-react';

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
        <div className="modal-header">
          <div className="modal-header-info">
            <div className="item-icon-frame" style={{ width: '60px', height: '60px' }}>
              {imgError ? (
                <span style={{ fontSize: '1.6rem' }}>⚔️</span>
              ) : (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="item-icon-img"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)} 
                />
              )}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 className="modal-title">{item.name}</h2>
                {item.powerLevel && (
                  <span className={`power-level-crest ${getPowerTierClass(item.powerLevel)}`}>
                    ★ {item.powerLevel}
                  </span>
                )}
              </div>
              <span className="item-type-badge">{item.itemType} · {item.category}</span>
            </div>
          </div>

          <button className="btn-fantasy btn-icon" onClick={onClose} title="Cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="modal-tabs">
          <button 
            className={`modal-tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <Sword size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            Estadísticas
          </button>

          {hasRecipe && (
            <button 
              className={`modal-tab-btn ${activeTab === 'recipe' ? 'active' : ''}`}
              onClick={() => setActiveTab('recipe')}
            >
              <Hammer size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Receta
            </button>
          )}

          {hasUsedIn && (
            <button 
              className={`modal-tab-btn ${activeTab === 'usedIn' ? 'active' : ''}`}
              onClick={() => setActiveTab('usedIn')}
            >
              <Layers size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Usado en ({item.usedIn.length})
            </button>
          )}

          {hasUpgrades && (
            <button 
              className={`modal-tab-btn ${activeTab === 'upgrades' ? 'active' : ''}`}
              onClick={() => setActiveTab('upgrades')}
            >
              <Zap size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Mejoras y Ascensión
            </button>
          )}

          {hasJournal && (
            <button 
              className={`modal-tab-btn ${activeTab === 'journal' ? 'active' : ''}`}
              onClick={() => setActiveTab('journal')}
            >
              <BookOpen size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              Códice y Diario
            </button>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="modal-body">
          {/* TAB 1: STATS y DETAILS */}
          {activeTab === 'stats' && (
            <>
              {item.description && (
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '8px', borderLeft: '3px solid var(--gold-500)' }}>
                  <p style={{ fontStyle: 'italic', color: '#cbd5e0' }}>"{item.description}"</p>
                </div>
              )}

              {/* Combat y Item Properties Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                {item.stats?.baseDamage && (
                  <div className="recipe-section" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DAÑO BASE</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fc8181' }}>{item.stats.baseDamage}</p>
                  </div>
                )}
                {item.stats?.damageType && (
                  <div className="recipe-section" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TIPO DE DAÑO</span>
                    <p style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.stats.damageType}</p>
                  </div>
                )}
                {item.stats?.attackStyle && (
                  <div className="recipe-section" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ESTILO DE ATAQUE</span>
                    <p style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{item.stats.attackStyle}</p>
                  </div>
                )}
                {item.stats?.armourRating && (
                  <div className="recipe-section" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ARMADURA</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#63b3ed' }}>+{item.stats.armourRating}</p>
                  </div>
                )}
                {item.stats?.block && (
                  <div className="recipe-section" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>BLOQUEO</span>
                    <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#68d391' }}>{item.stats.block}</p>
                  </div>
                )}
                {item.stats?.durability && (
                  <div className="recipe-section" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DURABILIDAD</span>
                    <p style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#e2e8f0' }}>{item.stats.durability} pts</p>
                  </div>
                )}
                {item.weight && (
                  <div className="recipe-section" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PESO</span>
                    <p style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#e2e8f0' }}>{item.weight} kg</p>
                  </div>
                )}
                {item.repairCost && (
                  <div className="recipe-section" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>COSTO DE REPARACIÓN</span>
                    <p style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--gold-400)' }}>{item.repairCost}</p>
                  </div>
                )}
              </div>

              {/* Special Actions / Special Effects */}
              {item.stats?.specialAction && (
                <div className="recipe-section">
                  <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-400)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Flame size={16} /> Ataque Especial / Acción
                  </h4>
                  <p style={{ color: '#e2e8f0' }}>{item.stats.specialAction}</p>
                </div>
              )}

              {item.stats?.specialEffect && (
                <div className="recipe-section">
                  <h4 style={{ fontFamily: 'var(--font-title)', color: '#68d391', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} /> Efecto Pasivo / Habilidad
                  </h4>
                  <p style={{ color: '#e2e8f0' }}>{item.stats.specialEffect}</p>
                </div>
              )}
            </>
          )}

          {/* TAB 2: RECIPE */}
          {activeTab === 'recipe' && item.recipe && (
            <div className="recipe-section">
              <div className="recipe-header-row">
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ESTACIÓN DE TRABAJO</span>
                  <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontSize: '1.1rem' }}>
                    {item.recipe.facility || 'Mesa de Trabajo'}
                  </h4>
                </div>
                {item.recipe.skill && (
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>HABILIDAD y EXP</span>
                    <p style={{ fontFamily: 'var(--font-title)', color: '#63b3ed', fontWeight: 'bold' }}>
                      {item.recipe.skill} (+{item.recipe.skillxp} XP)
                    </p>
                  </div>
                )}
              </div>

              <h5 style={{ fontFamily: 'var(--font-title)', color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '0.85rem', textTransform: 'uppercase' }}>
                Ingredientes Requeridos:
              </h5>
              
              <div className="ingredients-grid">
                {item.recipe.materials.map((mat, idx) => (
                  <div 
                    key={idx} 
                    className="ingredient-chip"
                    onClick={() => onSelectOtherItem(mat.item)}
                    title={`Ver detalles de ${mat.item}`}
                  >
                    <span className="ingredient-qty">{mat.quantity || mat.count || 1}x</span>
                    <span style={{ color: '#edf2f7', fontSize: '0.9rem' }}>{mat.item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: USED IN OTHER RECIPES */}
          {activeTab === 'usedIn' && item.usedIn && (
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', fontSize: '0.9rem' }}>
                Este material es un ingrediente clave para forjar o elaborar los siguientes objetos:
              </p>
              <div className="ingredients-grid">
                {item.usedIn.map((use, idx) => (
                  <div 
                    key={idx} 
                    className="ingredient-chip"
                    onClick={() => onSelectOtherItem(use.title)}
                    title={`Ver receta de ${use.title}`}
                  >
                    <Hammer size={16} color="var(--gold-400)" />
                    <div>
                      <strong style={{ color: '#fff', display: 'block', fontSize: '0.9rem' }}>{use.title}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Requiere {use.quantityNeeded}x en {use.facility || 'Crafteo'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: UPGRADES y ASCENSION */}
          {activeTab === 'upgrades' && hasUpgrades && (
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', fontSize: '0.9rem' }}>
                Progresión de ascensión en la <strong>Fragua Mística (Mystic Forge)</strong>:
              </p>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'rgba(10,13,18,0.6)', borderRadius: '8px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--gold-border)', background: 'rgba(212,175,55,0.1)' }}>
                      <th style={{ padding: '10px 14px', fontFamily: 'var(--font-title)', color: 'var(--gold-400)' }}>Tier / Nivel</th>
                      <th style={{ padding: '10px 14px', fontFamily: 'var(--font-title)', color: 'var(--gold-400)' }}>Daño Base</th>
                      <th style={{ padding: '10px 14px', fontFamily: 'var(--font-title)', color: 'var(--gold-400)' }}>Núcleos de Ascensión</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.upgrades.map((upg, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '10px 14px', fontWeight: 'bold', color: '#f6ad55' }}>★ {upg.powerLevel}</td>
                        <td style={{ padding: '10px 14px', color: '#fc8181' }}>{upg.baseDamage}</td>
                        <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{upg.coresRequired || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: JOURNAL y LORE */}
          {activeTab === 'journal' && item.journal && (
            <div className="lore-box">
              <span className="lore-quote-icon">“</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--gold-400)' }}>
                <Feather size={18} />
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', letterSpacing: '1px' }}>
                  CRÓNICA DEL CÓDICE DE ASHENFALL
                </h4>
              </div>
              <p style={{ whiteSpace: 'pre-line' }}>{item.journal}</p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gold-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(10,13,18,0.92)', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Equip In Loadout */}
            {(item.category === 'Armas de Combate' || item.category === 'Armaduras y Ropa' || item.category === 'Weapons' || item.category === 'Armour' || item.category === 'Herramientas' || item.slot || (item.stats && Object.keys(item.stats).length > 0)) && (
              <button 
                className="btn-fantasy" 
                onClick={() => onEquipItem(item)}
                title="Equipar en el Simulador de Personaje"
              >
                <Shield size={16} />
                <span>Equipar</span>
              </button>
            )}

            {/* Add to Planner */}
            {item.recipe && (
              <button 
                className={`btn-fantasy ${isInPlanner ? 'gold' : ''}`}
                onClick={() => onTogglePlanner(item)}
              >
                {isInPlanner ? <Check size={16} /> : <Plus size={16} />}
                <span>{isInPlanner ? 'En Lista de Crafteo' : 'Añadir a Crafteo'}</span>
              </button>
            )}

            {/* Favorite */}
            <button 
              className={`btn-fantasy ${isFavorite ? 'gold' : ''}`}
              onClick={() => onToggleFavorite(item)}
            >
              <Bookmark size={16} fill={isFavorite ? 'currentColor' : 'none'} />
              <span>{isFavorite ? 'Guardado' : 'Favorito'}</span>
            </button>

            {/* View on Map */}
            <button 
              className="btn-fantasy"
              onClick={() => onViewItemOnMap && onViewItemOnMap(item)}
              title="Buscar yacimientos y ver en el mapa interactivo"
              style={{ color: '#63b3ed', borderColor: 'rgba(66, 153, 225, 0.4)' }}
            >
              <Compass size={16} />
              <span>Ver en Mapa</span>
            </button>
          </div>

          {item.wikiUrl && (
            <a 
              href={item.wikiUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-fantasy"
              style={{ fontSize: '0.8rem' }}
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
