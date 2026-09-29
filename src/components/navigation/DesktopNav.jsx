import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function DesktopNav({
  activeView,
  setActiveView,
  selectedCategory,
  setSelectedCategory,
  categoryCounts = {},
  questCount = 39,
  spellCount = 42
}) {
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

  return (
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
            title={isItemsDropdownOpen ? 'Colapsar categorías' : 'Desplegar categorías'}
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

      {/* Bóvedas Dragonkin Nav Item */}
      <button
        className={`nav-item ${activeView === 'vaults' ? 'active' : ''}`}
        onClick={() => setActiveView('vaults')}
      >
        <GameIcon name="shield" size={18} color="#63b3ed" />
        <span>Bóvedas Dragonkin</span>
        <span
          className="badge"
          style={{
            background: 'rgba(66, 153, 225, 0.25)',
            color: '#63b3ed',
            borderColor: 'rgba(66, 153, 225, 0.4)'
          }}
        >
          12
        </span>
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
        <span
          className="badge"
          style={{
            background: 'rgba(212, 175, 55, 0.25)',
            color: 'var(--gold-300)',
            borderColor: 'var(--gold-border)'
          }}
        >
          POIs
        </span>
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
  );
}
