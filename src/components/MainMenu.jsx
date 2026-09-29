import React, { useState, useMemo } from 'react';
import {
  Compass,
  Map,
  Scroll,
  Zap,
  Shield,
  Hammer,
  Flame,
  BookOpen,
  Bookmark,
  Sword,
  Pickaxe,
  FlaskConical,
  Layers,
  Sparkles,
  Search,
  ChevronRight,
  ArrowRight,
  Crown,
  UserCheck,
  X
} from 'lucide-react';
import { MAP_MARKERS } from '../data/mapData';
import vaultsData from '../data/vaults.json';

export default function MainMenu({
  setActiveView,
  setSelectedCategory,
  onSelectItem,
  onSelectVault = () => {},
  favorites = [],
  plannerItems = [],
  loadout = {},
  allItems = [],
  quests = [],
  spells = [],
  onViewQuestOnMap
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Omnisearch across Items, Quests, Spells, and Map POIs
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { items: [], quests: [], spells: [], pois: [], total: 0 };

    const matchingItems = (allItems || [])
      .filter((it) => {
        const name = (it.name || it.title || '').toLowerCase();
        const cat = (it.category || '').toLowerCase();
        const type = (it.itemType || '').toLowerCase();
        return name.includes(q) || cat.includes(q) || type.includes(q);
      })
      .slice(0, 5);

    const matchingQuests = (quests || [])
      .filter((qst) => {
        const name = (qst.name || qst.title || '').toLowerCase();
        const desc = (qst.summary || qst.startPoint || '').toLowerCase();
        return name.includes(q) || desc.includes(q);
      })
      .slice(0, 3);

    const matchingVaults = (vaultsData || [])
      .filter((v) => {
        const name = (v.name || v.title || '').toLowerCase();
        const reg = (v.region || '').toLowerCase();
        const sum = (v.summary || '').toLowerCase();
        const loot = (v.notableLoot || []).map(l => l.name).join(' ').toLowerCase();
        return name.includes(q) || reg.includes(q) || sum.includes(q) || loot.includes(q);
      })
      .slice(0, 3);

    const matchingSpells = (spells || [])
      .filter((spl) => {
        const name = (spl.name || '').toLowerCase();
        const type = (spl.type || '').toLowerCase();
        const effect = (spl.effect || '').toLowerCase();
        return name.includes(q) || type.includes(q) || effect.includes(q);
      })
      .slice(0, 3);

    const matchingPois = (MAP_MARKERS || [])
      .filter((poi) => {
        const name = (poi.title || poi.name || '').toLowerCase();
        const desc = (poi.desc || poi.description || '').toLowerCase();
        const region = (poi.region || '').toLowerCase();
        return name.includes(q) || desc.includes(q) || region.includes(q);
      })
      .slice(0, 3);

    const total = matchingItems.length + matchingQuests.length + matchingVaults.length + matchingSpells.length + matchingPois.length;

    return {
      items: matchingItems,
      quests: matchingQuests,
      vaults: matchingVaults,
      spells: matchingSpells,
      pois: matchingPois,
      total
    };
  }, [searchQuery, allItems, quests, spells]);

  // Main Portals
  const mainPortals = [
    {
      id: 'catalog',
      title: 'Explorador de Ítems',
      subtitle: `${allItems.length || 200}+ Objetos y Equipos`,
      desc: 'Códice completo de armas, armaduras, herramientas, consumibles, recetas y estadísticas.',
      icon: Compass,
      tag: 'Códice',
      accentColor: 'var(--gold-400)',
      bgGlow: 'rgba(212, 175, 55, 0.15)',
      borderColor: 'rgba(212, 175, 55, 0.35)',
      onClick: () => {
        setSelectedCategory(null);
        setActiveView('catalog');
      }
    },
    {
      id: 'map',
      title: 'Mapa de Ashenfall',
      subtitle: 'POIs, Jefes y Rutas',
      desc: 'Mapa interactivo con capas de canteras, yacimientos, teletransportes y marcadores de misiones.',
      icon: Map,
      tag: 'Interactivo',
      accentColor: '#63b3ed',
      bgGlow: 'rgba(66, 153, 225, 0.15)',
      borderColor: 'rgba(66, 153, 225, 0.35)',
      onClick: () => setActiveView('map')
    },
    {
      id: 'vaults',
      title: 'Bóvedas Dragonkin',
      subtitle: '12 Cámaras y Cofres Secretos',
      desc: 'Guías de mazmorras ancestrales, trampas, efigies de forja, núcleos de tecnología y capturas de cofres.',
      icon: Shield,
      tag: 'Mazmorras',
      accentColor: '#63b3ed',
      bgGlow: 'rgba(66, 153, 225, 0.18)',
      borderColor: 'rgba(66, 153, 225, 0.4)',
      onClick: () => setActiveView('vaults')
    },
    {
      id: 'quests',
      title: 'Misiones y Aventuras',
      subtitle: `${quests.length || 39} Quests Disponibles`,
      desc: 'Guías de misiones paso a paso, ubicación de PNJs, requerimientos y recompensas de experiencia.',
      icon: Scroll,
      tag: 'Aventuras',
      accentColor: '#f6ad55',
      bgGlow: 'rgba(237, 137, 54, 0.15)',
      borderColor: 'rgba(237, 137, 54, 0.35)',
      onClick: () => setActiveView('quests')
    },
    {
      id: 'spells',
      title: 'Grimorio de Hechizos',
      subtitle: `${spells.length || 42} Conjuros Arcanos`,
      desc: 'Magia de combate, runas elementales requeridas, niveles necesarios y tiempos de recarga.',
      icon: Zap,
      tag: 'Magia',
      accentColor: '#b794f4',
      bgGlow: 'rgba(128, 90, 213, 0.15)',
      borderColor: 'rgba(128, 90, 213, 0.35)',
      onClick: () => setActiveView('spells')
    },
    {
      id: 'loadout',
      title: 'Simulador de Equipo',
      subtitle: 'Calculadora de Estadísticas',
      desc: 'Configura tus 8 ranuras de combate, armas, protecciones y optimiza tu build de personaje.',
      icon: UserCheck,
      tag: 'Builds',
      accentColor: '#48bb78',
      bgGlow: 'rgba(72, 187, 120, 0.15)',
      borderColor: 'rgba(72, 187, 120, 0.35)',
      onClick: () => setActiveView('loadout')
    },
    {
      id: 'planner',
      title: 'Calculadora de Crafteo',
      subtitle: 'Planificador de Materiales',
      desc: 'Calcula los ingredientes en cadena, lingotes y minerales necesarios para forjar tu equipamiento.',
      icon: Hammer,
      tag: 'Artesanía',
      accentColor: '#ecc94b',
      bgGlow: 'rgba(236, 201, 75, 0.15)',
      borderColor: 'rgba(236, 201, 75, 0.35)',
      onClick: () => setActiveView('planner')
    },
    {
      id: 'skills',
      title: 'Guía de Habilidades',
      subtitle: 'Entrenamiento y Supervivencia',
      desc: 'Aprende las mejores técnicas para subir Minería, Herrería, Combate, Cocina y Artesanía.',
      icon: Flame,
      tag: 'Guías',
      accentColor: '#fc8181',
      bgGlow: 'rgba(245, 101, 101, 0.15)',
      borderColor: 'rgba(245, 101, 101, 0.35)',
      onClick: () => setActiveView('skills')
    },
    {
      id: 'lore',
      title: 'Códice y Crónicas',
      subtitle: 'Historia de Ashenfall',
      desc: 'Descubre los misterios de los Dragones Ancestrales, el Rey de Ashenfall y las ruinas olvidadas.',
      icon: BookOpen,
      tag: 'Lore',
      accentColor: '#d69e2e',
      bgGlow: 'rgba(214, 158, 46, 0.15)',
      borderColor: 'rgba(214, 158, 46, 0.35)',
      onClick: () => setActiveView('lore')
    }
  ];

  // Fast Category Chips
  const categoryShortcuts = [
    { id: 'Armas de Combate', name: 'Armas', icon: Sword, color: '#e53e3e' },
    { id: 'Armaduras y Ropa', name: 'Armaduras', icon: Shield, color: '#4299e1' },
    { id: 'Herramientas', name: 'Herramientas', icon: Pickaxe, color: '#dd6b20' },
    { id: 'Pociones y Comida', name: 'Consumibles', icon: FlaskConical, color: '#38a169' },
    { id: 'Materiales y Minerales', name: 'Materiales', icon: Layers, color: '#d4af37' },
    { id: 'Runas y Magia', name: 'Runas', icon: Sparkles, color: '#9f7aea' },
    { id: 'Vestigios y Patrones', name: 'Patrones', icon: Scroll, color: '#ecc94b' }
  ];

  const equippedCount = Object.keys(loadout).filter((k) => !!loadout[k]).length;

  const survivalTips = [
    {
      icon: '🗺️',
      title: 'Rutas y Teletransporte',
      text: 'Utiliza el Mapa Interactivo para localizar los pilares arcanos y desbloquear viajes rápidos por todo el territorio.'
    },
    {
      icon: '🔨',
      title: 'Crafteo Eficiente',
      text: 'Agrega múltiples recetas a la Calculadora de Crafteo para ver la suma total de menas brutas requeridas.'
    },
    {
      icon: '🛡️',
      title: 'Optimización de Equipo',
      text: 'Prueba diferentes combinaciones en el Simulador de Equipo para maximizar la absorción de daño antes de un boss.'
    }
  ];

  return (
    <div className="main-menu-container">
      {/* Hero Banner */}
      <section className="menu-hero-banner">
        <div className="menu-hero-glow-orb" />
        
        <div className="menu-hero-content">
          <h1 className="menu-hero-title">
            RUNESCAPE: <span>DRAGONWILDS</span>
          </h1>

          <p className="menu-hero-subtitle">
            Tu guía de referencia interactiva para explorar Ashenfall, forjar equipamiento de élite, descifrar misiones arcanas y dominar las tierras salvajes.
          </p>

          {/* Omni-Search Box */}
          <div className="menu-search-wrapper">
            <div className={`menu-search-bar ${isSearchFocused ? 'focused' : ''}`}>
              <Search size={20} className="menu-search-icon" />
              <input
                type="text"
                placeholder="Busca armas, armaduras, misiones, hechizos, lugares..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              {searchQuery && (
                <button
                  className="menu-search-clear"
                  onClick={() => setSearchQuery('')}
                  title="Borrar búsqueda"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Live Search Autocomplete Results */}
            {searchQuery.trim() && (
              <div className="menu-search-dropdown-results">
                <div className="menu-results-header">
                  <span>Resultados para "{searchQuery}"</span>
                  <span className="results-count-badge">{searchResults.total} encontrados</span>
                </div>

                {searchResults.total === 0 ? (
                  <div className="menu-search-empty">
                    <p>No se encontraron resultados directos.</p>
                    <button
                      className="btn-fantasy gold btn-sm"
                      style={{ marginTop: '8px' }}
                      onClick={() => {
                        setSelectedCategory('All');
                        setActiveView('catalog');
                      }}
                    >
                      Buscar en el Catálogo Completo
                    </button>
                  </div>
                ) : (
                  <div className="menu-results-list">
                    {/* Items */}
                    {searchResults.items.length > 0 && (
                      <div className="menu-results-group">
                        <div className="group-title">
                          <Compass size={13} /> Objetos y Códice
                        </div>
                        {searchResults.items.map((item) => (
                          <div
                            key={item.id || item.title}
                            className="menu-result-item"
                            onClick={() => {
                              onSelectItem(item);
                              setSearchQuery('');
                            }}
                          >
                            <div className="result-icon">
                              {item.image ? (
                                <img src={item.image} alt={item.name} />
                              ) : (
                                <span>🗡️</span>
                              )}
                            </div>
                            <div className="result-details">
                              <span className="result-name">{item.name || item.title}</span>
                              <span className="result-meta">{item.category} • {item.itemType}</span>
                            </div>
                            <ChevronRight size={16} className="result-arrow" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Vaults */}
                    {searchResults.vaults && searchResults.vaults.length > 0 && (
                      <div className="menu-results-group">
                        <div className="group-title">
                          <Shield size={13} color="#63b3ed" /> Bóvedas Dragonkin
                        </div>
                        {searchResults.vaults.map((vlt) => (
                          <div
                            key={vlt.id || vlt.name}
                            className="menu-result-item"
                            onClick={() => {
                              onSelectVault(vlt.id);
                              setActiveView('vaults');
                              setSearchQuery('');
                            }}
                          >
                            <div className="result-icon vault-icon" style={{ background: 'rgba(66, 153, 225, 0.2)', color: '#63b3ed', borderRadius: '4px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              🛡️
                            </div>
                            <div className="result-details">
                              <span className="result-name">{vlt.name || vlt.title}</span>
                              <span className="result-meta">{vlt.region} • Nivel {vlt.powerLevel}</span>
                            </div>
                            <ChevronRight size={16} className="result-arrow" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quests */}
                    {searchResults.quests.length > 0 && (
                      <div className="menu-results-group">
                        <div className="group-title">
                          <Scroll size={13} color="var(--gold-400)" /> Misiones (Quests)
                        </div>
                        {searchResults.quests.map((qst) => (
                          <div
                            key={qst.id || qst.name}
                            className="menu-result-item"
                            onClick={() => {
                              setActiveView('quests');
                              setSearchQuery('');
                            }}
                          >
                            <div className="result-icon quest-icon">📜</div>
                            <div className="result-details">
                              <span className="result-name">{qst.name || qst.title}</span>
                              <span className="result-meta">Misión • {qst.startPoint || 'Ashenfall'}</span>
                            </div>
                            <ChevronRight size={16} className="result-arrow" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Spells */}
                    {searchResults.spells.length > 0 && (
                      <div className="menu-results-group">
                        <div className="group-title">
                          <Zap size={13} color="#b794f4" /> Hechizos
                        </div>
                        {searchResults.spells.map((spl) => (
                          <div
                            key={spl.id || spl.name}
                            className="menu-result-item"
                            onClick={() => {
                              setActiveView('spells');
                              setSearchQuery('');
                            }}
                          >
                            <div className="result-icon spell-icon">⚡</div>
                            <div className="result-details">
                              <span className="result-name">{spl.name}</span>
                              <span className="result-meta">{spl.type} • Nivel {spl.levelRequired || 1}</span>
                            </div>
                            <ChevronRight size={16} className="result-arrow" />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* POIs */}
                    {searchResults.pois.length > 0 && (
                      <div className="menu-results-group">
                        <div className="group-title">
                          <Map size={13} color="#63b3ed" /> Lugares en el Mapa
                        </div>
                        {searchResults.pois.map((poi) => (
                          <div
                            key={poi.id}
                            className="menu-result-item"
                            onClick={() => {
                              setActiveView('map');
                              setSearchQuery('');
                            }}
                          >
                            <div className="result-icon map-icon">📍</div>
                            <div className="result-details">
                              <span className="result-name">{poi.title || poi.name}</span>
                              <span className="result-meta">{poi.region} • {poi.category}</span>
                            </div>
                            <ChevronRight size={16} className="result-arrow" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="menu-dropdown-footer">
                      <button
                        className="btn-fantasy gold w-full"
                        onClick={() => {
                          setSelectedCategory('All');
                          setActiveView('catalog');
                        }}
                      >
                        Explorar catálogo completo <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Metrics Counter Bar */}
      <section className="menu-metrics-bar">
        <div className="metric-cell" onClick={() => { setSelectedCategory(null); setActiveView('catalog'); }}>
          <div className="metric-icon-box gold">
            <Compass size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-number">{allItems.length || 200}+</span>
            <span className="metric-label">Ítems y Objetos</span>
          </div>
        </div>

        <div className="metric-cell" onClick={() => setActiveView('quests')}>
          <div className="metric-icon-box orange">
            <Scroll size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-number">{quests.length || 39}</span>
            <span className="metric-label">Misiones Guiadas</span>
          </div>
        </div>

        <div className="metric-cell" onClick={() => setActiveView('spells')}>
          <div className="metric-icon-box purple">
            <Zap size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-number">{spells.length || 42}</span>
            <span className="metric-label">Hechizos y Magia</span>
          </div>
        </div>

        <div className="metric-cell" onClick={() => setActiveView('map')}>
          <div className="metric-icon-box blue">
            <Map size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-number">100%</span>
            <span className="metric-label">Mapa de Ashenfall</span>
          </div>
        </div>
      </section>

      {/* Personal Hero Tracker (If user has data) */}
      {(favorites.length > 0 || plannerItems.length > 0 || equippedCount > 0) && (
        <section className="menu-personal-hub">
          <div className="personal-hub-header">
            <div className="hub-title">
              <Crown size={18} color="var(--gold-400)" />
              <span>TU PROGRESO y HERRAMIENTAS ACTIVAS</span>
            </div>
          </div>

          <div className="personal-hub-grid">
            {favorites.length > 0 && (
              <div
                className="personal-card"
                onClick={() => setActiveView('favorites')}
              >
                <div className="personal-card-top">
                  <div className="personal-badge gold">
                    <Bookmark size={14} />
                    <span>Favoritos</span>
                  </div>
                  <span className="personal-count">{favorites.length}</span>
                </div>
                <div className="personal-card-body">
                  <p className="personal-card-title">Objetos Guardados</p>
                  <span className="personal-card-desc">Accede a tus ítems preferidos para consultar sus recetas.</span>
                </div>
                <div className="personal-card-action">
                  <span>Ver Favoritos</span>
                  <ChevronRight size={15} />
                </div>
              </div>
            )}

            {plannerItems.length > 0 && (
              <div
                className="personal-card"
                onClick={() => setActiveView('planner')}
              >
                <div className="personal-card-top">
                  <div className="personal-badge orange">
                    <Hammer size={14} />
                    <span>Crafteo</span>
                  </div>
                  <span className="personal-count">{plannerItems.length}</span>
                </div>
                <div className="personal-card-body">
                  <p className="personal-card-title">Lista de Materiales</p>
                  <span className="personal-card-desc">Tienes recetas agregadas para calcular menas y componentes.</span>
                </div>
                <div className="personal-card-action">
                  <span>Abrir Calculadora</span>
                  <ChevronRight size={15} />
                </div>
              </div>
            )}

            {equippedCount > 0 && (
              <div
                className="personal-card"
                onClick={() => setActiveView('loadout')}
              >
                <div className="personal-card-top">
                  <div className="personal-badge green">
                    <Shield size={14} />
                    <span>Equipamiento</span>
                  </div>
                  <span className="personal-count">{equippedCount}/8</span>
                </div>
                <div className="personal-card-body">
                  <p className="personal-card-title">Build de Combate</p>
                  <span className="personal-card-desc">Ranuras equipadas activamente en el simulador.</span>
                </div>
                <div className="personal-card-action">
                  <span>Ver Build</span>
                  <ChevronRight size={15} />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Main Portals Grid */}
      <section className="menu-portals-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-title">PORTALES PRINCIPALES</h2>
            <p className="section-main-desc">Selecciona un módulo para explorar el contenido del juego</p>
          </div>
        </div>

        <div className="menu-portals-grid">
          {mainPortals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.id}
                className="portal-card"
                onClick={portal.onClick}
                style={{
                  '--portal-accent': portal.accentColor,
                  '--portal-glow': portal.bgGlow,
                  '--portal-border': portal.borderColor
                }}
              >
                <div className="portal-card-glow" />
                
                <div className="portal-header">
                  <div className="portal-icon-wrapper">
                    <Icon size={26} />
                  </div>
                  <span className="portal-tag">{portal.tag}</span>
                </div>

                <div className="portal-content">
                  <h3 className="portal-title">{portal.title}</h3>
                  <span className="portal-subtitle">{portal.subtitle}</span>
                  <p className="portal-desc">{portal.desc}</p>
                </div>

                <div className="portal-footer">
                  <span className="portal-action-text">Entrar al módulo</span>
                  <div className="portal-arrow-circle">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Item Categories Quick Explorer */}
      <section className="menu-categories-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-title">EXPLORAR POR CATEGORÍA</h2>
            <p className="section-main-desc">Navegación directa a los tipos de objetos del Códice</p>
          </div>
        </div>

        <div className="menu-category-cards-grid">
          {categoryShortcuts.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className="menu-category-btn"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveView('catalog');
                }}
              >
                <div className="cat-icon-frame" style={{ color: cat.color }}>
                  <Icon size={20} />
                </div>
                <span className="cat-name">{cat.name}</span>
                <ChevronRight size={14} className="cat-arrow" />
              </button>
            );
          })}
        </div>
      </section>

      {/* Survival Guide y Tips */}
      <section className="menu-tips-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-title">CONSEJOS DE SUPERVIVENCIA</h2>
            <p className="section-main-desc">Recomendaciones esenciales para aventureros de Ashenfall</p>
          </div>
        </div>

        <div className="menu-tips-grid">
          {survivalTips.map((tip, idx) => (
            <div key={idx} className="tip-card">
              <div className="tip-header">
                <span className="tip-icon">{tip.icon}</span>
                <h4 className="tip-title">{tip.title}</h4>
              </div>
              <p className="tip-text">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <footer className="menu-footer">
        <div className="menu-footer-content">
          <img src="/icon.svg" alt="Dragonwilds Logo" className="footer-logo" />
          <div>
            <p className="footer-title">RuneScape: Dragonwilds Companion App</p>
            <p className="footer-sub">Compendio no oficial y base de datos interactiva. Diseñado para jugadores de PC, Móvil y Tablet.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
