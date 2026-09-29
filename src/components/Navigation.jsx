import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import GameIcon from './common/GameIcon';

export default function Navigation({ 
  activeView, 
  setActiveView, 
  selectedCategory, 
  setSelectedCategory, 
  categoryCounts,
  questCount = 39,
  spellCount = 42
}) {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isItemsDropdownOpen, setIsItemsDropdownOpen] = useState(true);

  const categories = [
    { id: 'All', name: 'Todos los Ítems', icon: 'swap-bag', color: 'var(--gold-400)' },
    { id: 'Armas de Combate', name: 'Armas de Combate', icon: 'crossed-swords', color: '#f87171' },
    { id: 'Armaduras y Ropa', name: 'Armaduras y Ropa', icon: 'breastplate', color: '#60a5fa' },
    { id: 'Herramientas', name: 'Herramientas', icon: 'mining', color: '#fbbf24' },
    { id: 'Pociones y Comida', name: 'Pociones y Comida', icon: 'potion-ball', color: '#34d399' },
    { id: 'Materiales y Minerales', name: 'Materiales y Minerales', icon: 'anvil-impact', color: '#a78bfa' },
    { id: 'Vestigios y Patrones', name: 'Vestigios y Patrones', icon: 'scroll-unfurled', color: '#f472b6' },
    { id: 'Runas y Magia', name: 'Runas y Magia', icon: 'crystal-ball', color: '#38bdf8' }
  ];

  const isMoreActive = ['spells', 'vaults', 'loadout', 'planner', 'skills', 'lore', 'favorites'].includes(activeView);

  return (
    <>
      {/* Sidebar for Desktop y iPad */}
      <aside className="sidebar">
        <div className="nav-section-title">Contenido y Crónicas</div>

        {/* Explorador de Ítems with Collapsible Category Dropdown */}
        <div className="nav-group">
          <div className="nav-item-expandable">
            <button 
              className={`nav-item ${activeView === 'catalog' && !selectedCategory ? 'active' : ''}`}
              style={{ flex: 1 }}
              onClick={() => {
                setActiveView('catalog');
                setSelectedCategory(null);
                setIsItemsDropdownOpen(true);
              }}
            >
              <GameIcon name="swap-bag" size={18} color="var(--gold-400)" />
              <span>Explorador de Ítems</span>
            </button>

            <button
              className="nav-chevron-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsItemsDropdownOpen((prev) => !prev);
              }}
              title={isItemsDropdownOpen ? "Colapsar categorías" : "Desplegar categorías"}
              aria-label="Desplegar categorías"
            >
              <ChevronDown 
                size={16} 
                className={`nav-chevron ${isItemsDropdownOpen ? 'open' : ''}`} 
              />
            </button>
          </div>

          {/* Collapsible Sub-menu for Categories */}
          {isItemsDropdownOpen && (
            <div className="nav-submenu">
              {categories.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                const isSelected = activeView === 'catalog' && selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    className={`nav-subitem ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      setActiveView('catalog');
                      setSelectedCategory(cat.id);
                    }}
                  >
                    <GameIcon name={cat.icon} size={15} color={isSelected ? 'var(--gold-300)' : cat.color} />
                    <span className="subitem-name">{cat.name}</span>
                    <span className="badge">{count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button 
          className={`nav-item ${activeView === 'quests' ? 'active' : ''}`}
          onClick={() => setActiveView('quests')}
        >
          <GameIcon name="tied-scroll" size={18} color="var(--gold-400)" />
          <span>Misiones (Quests)</span>
          <span className="badge">{questCount}</span>
        </button>

        {/* New Bóvedas Dragonkin Nav Item */}
        <button 
          className={`nav-item ${activeView === 'vaults' ? 'active' : ''}`}
          onClick={() => setActiveView('vaults')}
        >
          <GameIcon name="shield" size={18} color="#63b3ed" />
          <span>Bóvedas Dragonkin</span>
          <span className="badge" style={{ background: 'rgba(66, 153, 225, 0.25)', color: '#63b3ed', borderColor: 'rgba(66, 153, 225, 0.4)' }}>12</span>
        </button>

        <button 
          className={`nav-item ${activeView === 'spells' ? 'active' : ''}`}
          onClick={() => setActiveView('spells')}
        >
          <GameIcon name="lightning-arc" size={18} color="#b794f4" />
          <span>Grimorio de Hechizos</span>
          <span className="badge">{spellCount}</span>
        </button>

        <button 
          className={`nav-item ${activeView === 'map' ? 'active' : ''}`}
          onClick={() => setActiveView('map')}
        >
          <GameIcon name="treasure-map" size={18} color="var(--gold-400)" />
          <span>Mapa de Ashenfall</span>
          <span className="badge" style={{ background: 'rgba(212, 175, 55, 0.25)', color: 'var(--gold-300)', borderColor: 'var(--gold-border)' }}>POIs</span>
        </button>

        <button 
          className={`nav-item ${activeView === 'lore' ? 'active' : ''}`}
          onClick={() => setActiveView('lore')}
        >
          <GameIcon name="book-cover" size={18} color="var(--gold-300)" />
          <span>Códice y Lore</span>
        </button>

        <div className="nav-section-title">Herramientas de Héroe</div>

        <button 
          className={`nav-item ${activeView === 'loadout' ? 'active' : ''}`}
          onClick={() => setActiveView('loadout')}
        >
          <GameIcon name="breastplate" size={18} color="#48bb78" />
          <span>Simulador de Equipo</span>
        </button>

        <button 
          className={`nav-item ${activeView === 'planner' ? 'active' : ''}`}
          onClick={() => setActiveView('planner')}
        >
          <GameIcon name="hammer-drop" size={18} color="#ecc94b" />
          <span>Calculadora Crafteo</span>
        </button>

        <button 
          className={`nav-item ${activeView === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveView('skills')}
        >
          <GameIcon name="campfire" size={18} color="#fc8181" />
          <span>Habilidades y Guías</span>
        </button>

        <button 
          className={`nav-item ${activeView === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveView('favorites')}
        >
          <GameIcon name="flat-star" size={18} color="var(--gold-400)" />
          <span>Mis Favoritos</span>
        </button>
      </aside>

      {/* Fixed 5-Tab Bottom Dock for Mobile with Elevated Golden Center Home Button */}
      <nav className="bottom-dock">
        {/* 1. Ítems */}
        <button 
          className={`dock-item ${activeView === 'catalog' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('catalog');
            setSelectedCategory(null);
            setIsMoreMenuOpen(false);
          }}
        >
          <GameIcon name="swap-bag" size={19} />
          <span>Ítems</span>
        </button>

        {/* 2. Misiones */}
        <button 
          className={`dock-item ${activeView === 'quests' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('quests');
            setIsMoreMenuOpen(false);
          }}
        >
          <GameIcon name="tied-scroll" size={19} />
          <span>Misiones</span>
        </button>

        {/* 3. Central Prominent Elevated Home Button */}
        <button 
          className={`dock-item dock-item-center-fab ${activeView === 'home' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('home');
            setIsMoreMenuOpen(false);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          title="Menú Principal (Inicio)"
        >
          <div className="center-fab-circle">
            <GameIcon name="castle" size={21} className="center-fab-icon" />
            <span className="center-fab-label">Inicio</span>
          </div>
        </button>

        {/* 4. Mapa */}
        <button 
          className={`dock-item ${activeView === 'map' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('map');
            setIsMoreMenuOpen(false);
          }}
        >
          <GameIcon name="treasure-map" size={19} />
          <span>Mapa</span>
        </button>

        {/* 5. Más */}
        <button 
          className={`dock-item ${isMoreActive || isMoreMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMoreMenuOpen((prev) => !prev)}
        >
          <Menu size={19} />
          <span>Más</span>
        </button>
      </nav>

      {/* Mobile "Más" Bottom Sheet Drawer */}
      {isMoreMenuOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => setIsMoreMenuOpen(false)}
          style={{ alignItems: 'flex-end', padding: 0 }}
        >
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ 
              width: '100%', 
              maxWidth: '100%', 
              borderBottomLeftRadius: 0, 
              borderBottomRightRadius: 0,
              paddingBottom: 'calc(var(--bottom-dock-height) + 20px)',
              background: 'rgba(14, 18, 24, 0.98)',
              borderTop: '2px solid var(--gold-500)',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.9)'
            }}
          >
            <div className="modal-header" style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-400)' }}>
                <GameIcon name="sparkles" size={18} color="var(--gold-400)" />
                <h3 className="modal-title" style={{ fontSize: '1.1rem' }}>MÁS SECCIONES y GUÍAS</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setIsMoreMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px 20px' }}>
              {/* Bóvedas Dragonkin */}
              <button
                className={`btn-fantasy ${activeView === 'vaults' ? 'gold' : ''}`}
                style={{ justifyContent: 'space-between', padding: '12px 16px', fontSize: '0.9rem', textAlign: 'left' }}
                onClick={() => {
                  setActiveView('vaults');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', flex: 1, minWidth: 0 }}>
                  <GameIcon name="shield" size={18} color="#63b3ed" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>Bóvedas Dragonkin (Cámaras)</span>
                </div>
                <span className="badge" style={{ background: 'rgba(66, 153, 225, 0.25)', color: '#63b3ed', borderColor: 'rgba(66, 153, 225, 0.4)', marginRight: '6px' }}>12</span>
                <ChevronRight size={16} style={{ flexShrink: 0 }} />
              </button>

              <button
                className={`btn-fantasy ${activeView === 'spells' ? 'gold' : ''}`}
                style={{ justifyContent: 'space-between', padding: '12px 16px', fontSize: '0.9rem', textAlign: 'left' }}
                onClick={() => {
                  setActiveView('spells');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', flex: 1, minWidth: 0 }}>
                  <GameIcon name="lightning-arc" size={18} color="#b794f4" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>Grimorio de Hechizos</span>
                </div>
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>

              <button
                className={`btn-fantasy ${activeView === 'loadout' ? 'gold' : ''}`}
                style={{ justifyContent: 'space-between', padding: '12px 16px', fontSize: '0.9rem', textAlign: 'left' }}
                onClick={() => {
                  setActiveView('loadout');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', flex: 1, minWidth: 0 }}>
                  <GameIcon name="breastplate" size={18} color="#48bb78" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>Simulador de Equipamiento</span>
                </div>
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>

              <button
                className={`btn-fantasy ${activeView === 'planner' ? 'gold' : ''}`}
                style={{ justifyContent: 'space-between', padding: '12px 16px', fontSize: '0.9rem', textAlign: 'left' }}
                onClick={() => {
                  setActiveView('planner');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', flex: 1, minWidth: 0 }}>
                  <GameIcon name="hammer-drop" size={18} color="#ecc94b" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>Calculadora de Crafteo</span>
                </div>
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>

              <button
                className={`btn-fantasy ${activeView === 'skills' ? 'gold' : ''}`}
                style={{ justifyContent: 'space-between', padding: '12px 16px', fontSize: '0.9rem', textAlign: 'left' }}
                onClick={() => {
                  setActiveView('skills');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', flex: 1, minWidth: 0 }}>
                  <GameIcon name="campfire" size={18} color="#fc8181" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>Habilidades y Guías</span>
                </div>
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>

              <button
                className={`btn-fantasy ${activeView === 'lore' ? 'gold' : ''}`}
                style={{ justifyContent: 'space-between', padding: '12px 16px', fontSize: '0.9rem', textAlign: 'left' }}
                onClick={() => {
                  setActiveView('lore');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', flex: 1, minWidth: 0 }}>
                  <GameIcon name="book-cover" size={18} color="#d69e2e" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>Códice y Lore de Ashenfall</span>
                </div>
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>

              <button
                className={`btn-fantasy ${activeView === 'favorites' ? 'gold' : ''}`}
                style={{ justifyContent: 'space-between', padding: '12px 16px', fontSize: '0.9rem', textAlign: 'left' }}
                onClick={() => {
                  setActiveView('favorites');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', flex: 1, minWidth: 0 }}>
                  <GameIcon name="flat-star" size={18} color="var(--gold-400)" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>Mis Objetos Favoritos</span>
                </div>
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
