import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Filter, 
  Flame, 
  Sword, 
  Shield, 
  Sparkles, 
  Pickaxe,
  ChevronDown,
  Layers,
  Scroll,
  Compass,
  FlaskConical,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import ItemCard from './ItemCard';
import FloatingSearchDropdown from './FloatingSearchDropdown';
import { scoreItemSearch, normalizeText } from '../utils/searchUtils';

const CATEGORY_DEFINITIONS = [
  {
    id: 'All',
    name: 'Todos los Ítems',
    subtitle: 'Catálogo completo de Dragonwilds con 1,120+ objetos',
    icon: Compass,
    color: 'var(--gold-400)',
    accentBg: 'rgba(212, 175, 55, 0.12)',
    accentBorder: 'rgba(212, 175, 55, 0.35)',
    tags: ['1,120+ objetos', 'Explorador General']
  },
  {
    id: 'Armas de Combate',
    name: 'Armas de Combate',
    subtitle: 'Espadas, cimitarras, látigos, arcos, bastones y dagas',
    icon: Sword,
    color: '#f87171',
    accentBg: 'rgba(239, 68, 68, 0.12)',
    accentBorder: 'rgba(239, 68, 68, 0.35)',
    tags: ['Cuerpo a Cuerpo', 'A Distancia', 'Magia']
  },
  {
    id: 'Armaduras y Ropa',
    name: 'Armaduras y Ropa',
    subtitle: 'Cascos, corazas, perneras, escudos, capas y joyería',
    icon: Shield,
    color: '#60a5fa',
    accentBg: 'rgba(96, 165, 250, 0.12)',
    accentBorder: 'rgba(96, 165, 250, 0.35)',
    tags: ['Defensa', 'Masterwork', 'Accesorios']
  },
  {
    id: 'Herramientas',
    name: 'Herramientas',
    subtitle: 'Picos de minería, hachas de tala, palas y regaderas',
    icon: Pickaxe,
    color: '#fbbf24',
    accentBg: 'rgba(251, 191, 36, 0.12)',
    accentBorder: 'rgba(251, 191, 36, 0.35)',
    tags: ['Minería', 'Tala', 'Supervivencia']
  },
  {
    id: 'Pociones y Comida',
    name: 'Pociones y Comida',
    subtitle: 'Elixires, antifuego, estofados, pescados y raciones',
    icon: FlaskConical,
    color: '#34d399',
    accentBg: 'rgba(52, 211, 153, 0.12)',
    accentBorder: 'rgba(52, 211, 153, 0.35)',
    tags: ['Herbolaria', 'Cocina', 'Bufos']
  },
  {
    id: 'Materiales y Minerales',
    name: 'Materiales y Minerales',
    subtitle: 'Barras de metal, menas, maderas, cueros y esencias',
    icon: Layers,
    color: '#a78bfa',
    accentBg: 'rgba(167, 139, 250, 0.12)',
    accentBorder: 'rgba(167, 139, 250, 0.35)',
    tags: ['Metalurgia', 'Crafteo', 'Artesanía']
  },
  {
    id: 'Vestigios y Patrones',
    name: 'Vestigios y Patrones',
    subtitle: 'Fragmentos rotos, esquemas, patrones y reliquias',
    icon: Scroll,
    color: '#f472b6',
    accentBg: 'rgba(244, 114, 182, 0.12)',
    accentBorder: 'rgba(244, 114, 182, 0.35)',
    tags: ['Reliquias', 'Planos Antiguos']
  },
  {
    id: 'Runas y Magia',
    name: 'Runas y Magia',
    subtitle: 'Runas elementales, catalizadoras, tomos y grimorios',
    icon: Sparkles,
    color: '#38bdf8',
    accentBg: 'rgba(56, 189, 248, 0.12)',
    accentBorder: 'rgba(56, 189, 248, 0.35)',
    tags: ['Alta Alquimia', 'Lanzamiento']
  }
];

const SUBCATEGORIES_CONFIG = {
  'Armas de Combate': [
    { id: 'all', name: 'Todas las Armas' },
    { id: 'swords', name: '⚔️ Espadas y Cimitarras', keywords: ['espada', 'espadón', 'cimitarra', 'sword', 'scimitar', 'greatsword'] },
    { id: 'axes', name: '🪓 Hachas y Mazas', keywords: ['hacha', 'maza', 'martillo', 'greataxe', 'axe', 'warhammer', 'mace'] },
    { id: 'whips', name: '🐍 Látigos', keywords: ['látigo', 'whip'] },
    { id: 'ranged', name: '🏹 Arcos y Ballestas', keywords: ['arco', 'ballesta', 'bow', 'crossbow'] },
    { id: 'ammo', name: '🎯 Munición (Flechas y Pernos)', keywords: ['flecha', 'perno', 'arrow', 'bolt'] },
    { id: 'magic', name: '🔮 Varitas y Bastones', keywords: ['varita', 'bastón', 'wand', 'staff'] },
    { id: 'daggers', name: '🗡️ Dagas y Cortas', keywords: ['daga', 'hoja', 'dagger', 'blade'] }
  ],
  'Armaduras y Ropa': [
    { id: 'all', name: 'Toda la Armadura' },
    { id: 'helmets', name: '👑 Cascos y Capuchas', keywords: ['casco', 'capucha', 'sombrero', 'helmet', 'helm', 'coif', 'hat'] },
    { id: 'bodies', name: '🥋 Corazas y Túnicas', keywords: ['coraza', 'túnica', 'platebody', 'body', 'robe', 'tunic'] },
    { id: 'legs', name: '👖 Perneras y Pantalones', keywords: ['perneras', 'pantalones', 'falda', 'platelegs', 'legs', 'chaps'] },
    { id: 'shields', name: '🛡️ Escudos', keywords: ['escudo', 'shield'] },
    { id: 'capes', name: '🧣 Capas y Acumuladores', keywords: ['capa', 'acumulador', 'cape', 'accumulator'] },
    { id: 'jewelry', name: '📿 Amuletos y Anillos', keywords: ['anillo', 'amuleto', 'collar', 'ring', 'amulet'] }
  ],
  'Vestigios y Patrones': [
    { id: 'all', name: 'Todos los Vestigios y Patrones' },
    { id: 'vestiges', name: '🏺 Vestigios Rotos', keywords: ['vestigio', 'punta', 'hoja', 'espejo', 'talla', 'vestige', 'bladehead'] },
    { id: 'patterns', name: '📜 Patrones y Diseños', keywords: ['patrón', 'pattern'] },
    { id: 'masterwork', name: '⭐ Masterwork y Reliquias', keywords: ['masterwork', 'reliquia', 'memoria', 'relic', 'memory'] }
  ],
  'Pociones y Comida': [
    { id: 'all', name: 'Todos los Consumibles' },
    { id: 'potions', name: '🧪 Pociones y Elixires', keywords: ['poción', 'antifuego', 'antiponzoña', 'elixir', 'potion'] },
    { id: 'food', name: '🍲 Comidas y Estofados', keywords: ['estofado', 'caldo', 'tarta', 'patata', 'comida', 'stew', 'broth', 'pie'] },
    { id: 'fish', name: '🐟 Pescados y Carnes', keywords: ['pescado', 'carne', 'fish', 'beef'] }
  ],
  'Herramientas': [
    { id: 'all', name: 'Todas las Herramientas' },
    { id: 'pickaxes', name: '⛏️ Picos', keywords: ['pico', 'pickaxe'] },
    { id: 'axes', name: '🪓 Hachas de Tala', keywords: ['hacha de tala', 'hacha', 'logging axe', 'axe'] },
    { id: 'spades', name: '🪴 Palas y Regaderas', keywords: ['pala', 'regadera', 'spade', 'watering can'] }
  ],
  'Materiales y Minerales': [
    { id: 'all', name: 'Todos los Materiales' },
    { id: 'bars', name: '🪙 Barras de Metal', keywords: ['barra', 'bar'] },
    { id: 'ores', name: '🪨 Menas y Minerales', keywords: ['mena', 'mineral', 'arcilla', 'piedra', 'ore', 'clay', 'stone'] },
    { id: 'logs', name: '🪵 Maderas y Tablas', keywords: ['tronco', 'tabla', 'madera', 'corteza', 'log', 'plank', 'bark'] },
    { id: 'leather', name: '🐉 Cueros y Escamas', keywords: ['cuero', 'piel', 'escama', 'leather', 'hide', 'scale'] },
    { id: 'essence', name: '✨ Esencias y Hilos', keywords: ['hilo', 'esencia', 'hueso', 'ceniza', 'espina', 'semilla', 'thread', 'essence'] }
  ],
  'Runas y Magia': [
    { id: 'all', name: 'Todas las Runas y Magia' },
    { id: 'runes', name: '✨ Runas Elementales', keywords: ['runa', 'rune'] },
    { id: 'staves', name: '🔮 Bastones y Libros', keywords: ['tomo', 'libro', 'manual', 'tome', 'spellbook'] }
  ]
};

export default function ItemCatalog({ 
  items, 
  selectedCategory, 
  setSelectedCategory,
  onSelectItem, 
  favorites, 
  onToggleFavorite,
  plannerItems,
  onTogglePlanner
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const searchWrapperRef = useRef(null);
  const [selectedSubtype, setSelectedSubtype] = useState('all');
  const [selectedPowerTier, setSelectedPowerTier] = useState('all'); // all, t1-3, t4-6, t7, t8-9
  const [selectedDamageType, setSelectedDamageType] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [displayCount, setDisplayCount] = useState(48);

  // Close floating dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target)) {
        setIsFloatingOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsFloatingOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts = { All: items.length };
    items.forEach((it) => {
      counts[it.category] = (counts[it.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  // Reset subtype when category changes
  useEffect(() => {
    setSelectedSubtype('all');
    setDisplayCount(48);
  }, [selectedCategory]);

  const activeSubtypes = selectedCategory ? SUBCATEGORIES_CONFIG[selectedCategory] || null : null;
  const currentCategoryConfig = CATEGORY_DEFINITIONS.find((c) => c.id === selectedCategory);

  // Global floating search results across all items
  const floatingSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();

    const matches = items.filter((it) => {
      if (it.name.toLowerCase().includes(q)) return true;
      if (it.itemType && it.itemType.toLowerCase().includes(q)) return true;
      if (it.category && it.category.toLowerCase().includes(q)) return true;
      if (it.description && it.description.toLowerCase().includes(q)) return true;
      if (it.stats?.damageType && it.stats.damageType.toLowerCase().includes(q)) return true;
      if (it.recipe?.facility && it.recipe.facility.toLowerCase().includes(q)) return true;
      if (it.recipe?.materials?.some((m) => m.item.toLowerCase().includes(q))) return true;
      return false;
    });

    return matches.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(q);
      const bStarts = b.name.toLowerCase().startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return (b.powerLevel || 0) - (a.powerLevel || 0) || a.name.localeCompare(b.name);
    });
  }, [items, searchQuery]);

  // Filter items for current category view
  const filteredItems = useMemo(() => {
    let result = items;

    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter((it) => it.category === selectedCategory);
    }

    // Subtype filter
    if (selectedSubtype !== 'all' && activeSubtypes) {
      const currentSub = activeSubtypes.find((s) => s.id === selectedSubtype);
      if (currentSub?.keywords) {
        result = result.filter((item) => {
          const combined = `${item.title} ${item.itemType} ${item.category}`.toLowerCase();
          return currentSub.keywords.some((kw) => combined.includes(kw));
        });
      }
    }

    // Search query filter (matches name, description, itemType, recipe facility, materials)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((it) => {
        if (it.name.toLowerCase().includes(q)) return true;
        if (it.itemType && it.itemType.toLowerCase().includes(q)) return true;
        if (it.description && it.description.toLowerCase().includes(q)) return true;
        if (it.stats?.damageType && it.stats.damageType.toLowerCase().includes(q)) return true;
        if (it.stats?.specialAction && it.stats.specialAction.toLowerCase().includes(q)) return true;
        if (it.recipe?.facility && it.recipe.facility.toLowerCase().includes(q)) return true;
        if (it.recipe?.materials?.some((m) => m.item.toLowerCase().includes(q))) return true;
        return false;
      });
    }

    // Power Tier filter
    if (selectedPowerTier !== 'all') {
      result = result.filter((it) => {
        const pw = it.powerLevel;
        if (!pw) return false;
        if (selectedPowerTier === 't1-3') return pw >= 1 && pw <= 3;
        if (selectedPowerTier === 't4-6') return pw >= 4 && pw <= 6;
        if (selectedPowerTier === 't7') return pw === 7;
        if (selectedPowerTier === 't8-9') return pw >= 8;
        return true;
      });
    }

    // Damage type filter
    if (selectedDamageType !== 'all') {
      result = result.filter(
        (it) => it.stats?.damageType && it.stats.damageType.toLowerCase() === selectedDamageType.toLowerCase()
      );
    }

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'power-desc') return (b.powerLevel || 0) - (a.powerLevel || 0);
      if (sortBy === 'power-asc') return (a.powerLevel || 0) - (b.powerLevel || 0);
      if (sortBy === 'durability-desc') return (b.stats?.durability || 0) - (a.stats?.durability || 0);
      if (sortBy === 'weight-asc') return (a.weight || 999) - (b.weight || 999);
      return 0;
    });

    return result;
  }, [items, selectedCategory, selectedSubtype, activeSubtypes, searchQuery, selectedPowerTier, selectedDamageType, sortBy]);

  const visibleItems = filteredItems.slice(0, displayCount);

  // CATEGORY HUB VIEW (When no category is selected on mobile/desktop)
  if (!selectedCategory) {
    return (
      <div className="category-hub-container">
        {/* Hub Header */}
        <div className="category-hub-header">
          <div className="hub-header-badge">
            <Sparkles size={16} color="var(--gold-400)" />
            <span>ARMERÍA y CATÁLOGO</span>
          </div>
          <h1 className="category-hub-title">Tipos de Objetos</h1>
          <p className="category-hub-subtitle">
            Selecciona una categoría de objetos o usa el buscador general para explorar los 1,104 objetos de Dragonwilds.
          </p>

          {/* Quick Search on Hub with Floating Results */}
          <div className="search-input-wrapper hub-search" ref={searchWrapperRef}>
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar cualquier objeto (ej: Abyssal, Dragón, Poción)..."
              value={searchQuery}
              onFocus={() => {
                if (searchQuery.trim()) setIsFloatingOpen(true);
              }}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsFloatingOpen(true);
              }}
            />
            {searchQuery && (
              <button 
                className="search-clear-btn" 
                onClick={() => {
                  setSearchQuery('');
                  setIsFloatingOpen(false);
                }}
              >
                <X size={16} />
              </button>
            )}

            {/* Live Floating Search Dropdown */}
            <FloatingSearchDropdown
              results={floatingSearchResults.slice(0, 25)}
              totalMatches={floatingSearchResults.length}
              searchQuery={searchQuery}
              isOpen={isFloatingOpen && searchQuery.trim().length > 0}
              onSelectItem={(item) => {
                onSelectItem(item);
              }}
              onViewAllInCatalog={() => {
                setSelectedCategory('All');
                setIsFloatingOpen(false);
              }}
              favorites={favorites}
              onToggleFavorite={onToggleFavorite}
              plannerItems={plannerItems}
              onTogglePlanner={onTogglePlanner}
              onClose={() => setIsFloatingOpen(false)}
            />
          </div>
        </div>

        {/* Grid of Category Cards */}
        <div className="category-hub-grid">
          {CATEGORY_DEFINITIONS.map((cat) => {
            const Icon = cat.icon;
            const count = categoryCounts[cat.id] || 0;

            return (
              <div
                key={cat.id}
                className="category-hub-card"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  '--cat-color': cat.color,
                  '--cat-bg': cat.accentBg,
                  '--cat-border': cat.accentBorder
                }}
              >
                <div className="category-card-top">
                  <div className="category-icon-box">
                    <Icon size={24} color={cat.color} />
                  </div>
                  <span className="category-count-pill">{count} ítems</span>
                </div>

                <div className="category-card-body">
                  <h3 className="category-card-name">{cat.name}</h3>
                  <p className="category-card-desc">{cat.subtitle}</p>
                </div>

                <div className="category-card-footer">
                  <div className="category-tags">
                    {cat.tags.map((tag, idx) => (
                      <span key={idx} className="category-tag-chip">{tag}</span>
                    ))}
                  </div>
                  <div className="category-arrow-btn">
                    <span>Explorar</span>
                    <ChevronRight size={15} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const CurrentIcon = currentCategoryConfig?.icon || (selectedCategory === 'All' ? Compass : Sparkles);

  return (
    <div className="item-catalog-container">
      {/* Category Navigation Bar (Back Button y Category Title) */}
      <div className="category-nav-bar">
        <button 
          className="btn-fantasy category-back-btn"
          onClick={() => {
            setSelectedCategory(null);
            setSearchQuery('');
            setIsFloatingOpen(false);
          }}
          title="Volver a Tipos de Objetos"
        >
          <ArrowLeft size={16} />
          <span>Tipos de Objetos</span>
        </button>

        <div className="category-nav-info">
          <div 
            className="category-nav-icon-badge"
            style={{ 
              color: currentCategoryConfig?.color || 'var(--gold-400)',
              background: currentCategoryConfig?.accentBg || 'rgba(212, 175, 55, 0.12)',
              borderColor: currentCategoryConfig?.accentBorder || 'rgba(212, 175, 55, 0.3)'
            }}
          >
            <CurrentIcon size={20} />
          </div>
          <div>
            <h2 className="category-nav-title">
              {selectedCategory === 'All' 
                ? 'Todos los Ítems' 
                : (selectedCategory || (searchQuery ? `Búsqueda: "${searchQuery}"` : 'Catálogo'))}
            </h2>
            <span className="category-nav-meta">
              {filteredItems.length} {filteredItems.length === 1 ? 'objeto' : 'objetos'} disponibles
            </span>
          </div>
        </div>
      </div>

      {/* Search y Filter Header */}
      <div className="search-filter-section">
        {/* Search input (filters grid directly) */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por nombre, tipo, daño, material, receta (ej: Abyssal, Adamant, Slash)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDisplayCount(48);
            }}
          />
          {searchQuery && (
            <button 
              className="search-clear-btn" 
              onClick={() => setSearchQuery('')}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Dynamic Subcategory Chips / Separators */}
        {activeSubtypes && activeSubtypes.length > 1 && (
          <div className="subcategories-bar">
            {activeSubtypes.map((st) => (
              <button
                key={st.id}
                className={`filter-chip ${selectedSubtype === st.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedSubtype(st.id);
                  setDisplayCount(48);
                }}
              >
                {st.name}
              </button>
            ))}
          </div>
        )}

        {/* Filters and Sort Row */}
        <div className="filters-row">
          {/* Power Level Chips */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-title)', color: 'var(--text-muted)' }}>
              PODER:
            </span>
            <button
              className={`filter-chip ${selectedPowerTier === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedPowerTier('all')}
            >
              Todos
            </button>
            <button
              className={`filter-chip ${selectedPowerTier === 't1-3' ? 'active' : ''}`}
              style={{ color: 'var(--tier-1-3)' }}
              onClick={() => setSelectedPowerTier('t1-3')}
            >
              ★ T1-3
            </button>
            <button
              className={`filter-chip ${selectedPowerTier === 't4-6' ? 'active' : ''}`}
              style={{ color: 'var(--tier-4-6)' }}
              onClick={() => setSelectedPowerTier('t4-6')}
            >
              ★ T4-6
            </button>
            <button
              className={`filter-chip ${selectedPowerTier === 't7' ? 'active' : ''}`}
              style={{ color: 'var(--tier-7)' }}
              onClick={() => setSelectedPowerTier('t7')}
            >
              ★ T7
            </button>
            <button
              className={`filter-chip ${selectedPowerTier === 't8-9' ? 'active' : ''}`}
              style={{ color: 'var(--tier-8-9)' }}
              onClick={() => setSelectedPowerTier('t8-9')}
            >
              ★ T8-9 Masterwork
            </button>
          </div>

          {/* Sort Dropdown */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUpDown size={14} color="var(--gold-400)" />
            <select 
              className="select-fantasy" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              {searchQuery && <option value="relevance">Relevancia de Búsqueda</option>}
              <option value="name-asc">Nombre (A → Z)</option>
              <option value="name-desc">Nombre (Z → A)</option>
              <option value="power-desc">Tier / Poder (Mayor)</option>
              <option value="power-asc">Tier / Poder (Menor)</option>
              <option value="durability-desc">Mayor Durabilidad</option>
              <option value="weight-asc">Menor Peso</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count y Current Scope */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Mostrando <strong style={{ color: 'var(--gold-400)' }}>{visibleItems.length}</strong> de{' '}
          <strong style={{ color: '#fff' }}>{filteredItems.length}</strong> ítems encontrados
        </p>

        {(selectedCategory !== 'All' || selectedSubtype !== 'all' || selectedPowerTier !== 'all' || searchQuery) && (
          <button 
            className="btn-fantasy" 
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSubtype('all');
              setSelectedPowerTier('all');
              setSelectedDamageType('all');
              setSearchQuery('');
            }}
          >
            Limpiar Filtros
          </button>
        )}
      </div>

      {/* Grid of Items */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--gold-border)' }}>
          <Flame size={48} color="var(--gold-500)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', marginBottom: '8px' }}>
            No se encontraron objetos
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
            Intenta cambiar los términos de búsqueda o los separadores de tipo para ver más resultados.
          </p>
        </div>
      ) : (
        <>
          <div className="items-grid">
            {visibleItems.map((item) => (
              <ItemCard
                key={item.id || item.title}
                item={item}
                onSelect={onSelectItem}
                isFavorite={favorites.some((f) => f.id === item.id)}
                onToggleFavorite={onToggleFavorite}
                isInPlanner={plannerItems.some((p) => p.id === item.id)}
                onTogglePlanner={onTogglePlanner}
              />
            ))}
          </div>

          {/* Load More Button */}
          {visibleItems.length < filteredItems.length && (
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button 
                className="btn-fantasy gold"
                style={{ padding: '12px 30px', fontSize: '0.95rem' }}
                onClick={() => setDisplayCount((prev) => prev + 48)}
              >
                <span>Cargar Más Objetos (+48)</span>
                <ChevronDown size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
