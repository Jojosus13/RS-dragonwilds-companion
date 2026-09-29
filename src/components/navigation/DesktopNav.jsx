import React, { useState } from 'react';
import {
  Compass,
  Sword,
  Shield,
  Pickaxe,
  FlaskConical,
  Layers,
  Scroll,
  Sparkles,
  ChevronDown,
  Zap,
  Map,
  BookOpen,
  UserCheck,
  Hammer,
  Flame,
  Bookmark
} from 'lucide-react';

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
    { id: 'All', name: 'Todos los Ítems', icon: Compass },
    { id: 'Armas de Combate', name: 'Armas de Combate', icon: Sword },
    { id: 'Armaduras y Ropa', name: 'Armaduras y Ropa', icon: Shield },
    { id: 'Herramientas', name: 'Herramientas', icon: Pickaxe },
    { id: 'Pociones y Comida', name: 'Pociones y Comida', icon: FlaskConical },
    { id: 'Materiales y Minerales', name: 'Materiales y Minerales', icon: Layers },
    { id: 'Vestigios y Patrones', name: 'Vestigios y Patrones', icon: Scroll },
    { id: 'Runas y Magia', name: 'Runas y Magia', icon: Sparkles }
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
            <Compass size={18} color="var(--gold-400)" />
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
              const Icon = cat.icon;
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
                  <Icon size={15} />
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
        <Scroll size={18} color="var(--gold-400)" />
        <span>Misiones (Quests)</span>
        <span className="badge">{questCount}</span>
      </button>

      {/* Bóvedas Dragonkin Nav Item */}
      <button
        className={`nav-item ${activeView === 'vaults' ? 'active' : ''}`}
        onClick={() => setActiveView('vaults')}
      >
        <Shield size={18} color="#63b3ed" />
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
        <Zap size={18} color="#b794f4" />
        <span>Grimorio de Hechizos</span>
        <span className="badge">{spellCount}</span>
      </button>

      <button
        className={`nav-item ${activeView === 'map' ? 'active' : ''}`}
        onClick={() => setActiveView('map')}
      >
        <Map size={18} color="var(--gold-400)" />
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
        <BookOpen size={18} color="var(--gold-300)" />
        <span>Códice y Lore</span>
      </button>

      <div className="nav-section-title">Herramientas de Héroe</div>

      <button
        className={`nav-item ${activeView === 'loadout' ? 'active' : ''}`}
        onClick={() => setActiveView('loadout')}
      >
        <UserCheck size={18} />
        <span>Simulador de Equipo</span>
      </button>

      <button
        className={`nav-item ${activeView === 'planner' ? 'active' : ''}`}
        onClick={() => setActiveView('planner')}
      >
        <Hammer size={18} />
        <span>Calculadora Crafteo</span>
      </button>

      <button
        className={`nav-item ${activeView === 'skills' ? 'active' : ''}`}
        onClick={() => setActiveView('skills')}
      >
        <Flame size={18} />
        <span>Habilidades y Guías</span>
      </button>

      <button
        className={`nav-item ${activeView === 'favorites' ? 'active' : ''}`}
        onClick={() => setActiveView('favorites')}
      >
        <Bookmark size={18} />
        <span>Mis Favoritos</span>
      </button>
    </aside>
  );
}
