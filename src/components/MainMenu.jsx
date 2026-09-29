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
  X,
  RefreshCw,
  Rocket,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MAP_MARKERS } from '../data/mapData';
import vaultsData from '../data/vaults.json';
import { APP_VERSION } from '../utils/version';
import { Capacitor } from '@capacitor/core';
import GameIcon from './common/GameIcon';

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
  onViewQuestOnMap,
  onCheckForUpdates = () => {},
  isCheckingUpdate = false,
  updateInfo = null,
  updateCheckMessage = null,
  onOpenUpdateModal = () => {}
}) {
  const isNativeApp = typeof window !== 'undefined' && (
    Capacitor.isNativePlatform() || 
    window.Capacitor?.isNativePlatform?.() || 
    (window.Capacitor && window.Capacitor.getPlatform() !== 'web') ||
    window.location.protocol === 'capacitor:' ||
    (window.location.protocol === 'https:' && window.location.hostname === 'localhost')
  );

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
      icon: 'swap-bag',
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
      icon: 'treasure-map',
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
      icon: 'shield',
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
      icon: 'tied-scroll',
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
      icon: 'lightning-arc',
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
      icon: 'breastplate',
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
      icon: 'hammer-drop',
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
      icon: 'campfire',
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
      icon: 'book-cover',
      tag: 'Lore',
      accentColor: '#d69e2e',
      bgGlow: 'rgba(214, 158, 46, 0.15)',
      borderColor: 'rgba(214, 158, 46, 0.35)',
      onClick: () => setActiveView('lore')
    }
  ];

  // Fast Category Chips
  const categoryShortcuts = [
    { id: 'Armas de Combate', name: 'Armas', icon: 'crossed-swords', color: '#e53e3e' },
    { id: 'Armaduras y Ropa', name: 'Armaduras', icon: 'breastplate', color: '#4299e1' },
    { id: 'Herramientas', name: 'Herramientas', icon: 'mining', color: '#dd6b20' },
    { id: 'Pociones y Comida', name: 'Consumibles', icon: 'potion-ball', color: '#38a169' },
    { id: 'Materiales y Minerales', name: 'Materiales', icon: 'anvil-impact', color: '#d4af37' },
    { id: 'Runas y Magia', name: 'Runas', icon: 'crystal-ball', color: '#9f7aea' },
    { id: 'Vestigios y Patrones', name: 'Patrones', icon: 'scroll-unfurled', color: '#ecc94b' }
  ];

  const equippedCount = Object.keys(loadout).filter((k) => !!loadout[k]).length;

  const survivalTips = [
    {
      icon: 'treasure-map',
      title: 'Rutas y Teletransporte',
      text: 'Utiliza el Mapa Interactivo para localizar los pilares arcanos y desbloquear viajes rápidos por todo el territorio.'
    },
    {
      icon: 'hammer-drop',
      title: 'Crafteo Eficiente',
      text: 'Agrega múltiples recetas a la Calculadora de Crafteo para ver la suma total de menas brutas requeridas.'
    },
    {
      icon: 'shield',
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
                          <GameIcon name="swap-bag" size={13} color="var(--gold-400)" /> Objetos y Códice
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
                                <GameIcon name="crossed-swords" size={18} color="var(--gold-400)" />
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
                          <GameIcon name="shield" size={13} color="#63b3ed" /> Bóvedas Dragonkin
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
                              <GameIcon name="shield" size={16} color="#63b3ed" />
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
                          <GameIcon name="tied-scroll" size={13} color="var(--gold-400)" /> Misiones (Quests)
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
                            <div className="result-icon quest-icon">
                              <GameIcon name="tied-scroll" size={16} color="var(--gold-400)" />
                            </div>
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
                          <GameIcon name="lightning-arc" size={13} color="#b794f4" /> Hechizos
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
                            <div className="result-icon spell-icon">
                              <GameIcon name="lightning-arc" size={16} color="#b794f4" />
                            </div>
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
                          <GameIcon name="treasure-map" size={13} color="#63b3ed" /> Lugares en el Mapa
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
                            <div className="result-icon map-icon">
                              <GameIcon name="treasure-map" size={16} color="#63b3ed" />
                            </div>
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
            <GameIcon name="swap-bag" size={22} color="var(--gold-400)" />
          </div>
          <div className="metric-info">
            <span className="metric-number">{allItems.length || 200}+</span>
            <span className="metric-label">Ítems y Objetos</span>
          </div>
        </div>

        <div className="metric-cell" onClick={() => setActiveView('quests')}>
          <div className="metric-icon-box orange">
            <GameIcon name="tied-scroll" size={22} color="#ed8936" />
          </div>
          <div className="metric-info">
            <span className="metric-number">{quests.length || 39}</span>
            <span className="metric-label">Misiones Guiadas</span>
          </div>
        </div>

        <div className="metric-cell" onClick={() => setActiveView('spells')}>
          <div className="metric-icon-box purple">
            <GameIcon name="lightning-arc" size={22} color="#9f7aea" />
          </div>
          <div className="metric-info">
            <span className="metric-number">{spells.length || 42}</span>
            <span className="metric-label">Hechizos y Magia</span>
          </div>
        </div>

        <div className="metric-cell" onClick={() => setActiveView('map')}>
          <div className="metric-icon-box blue">
            <GameIcon name="treasure-map" size={22} color="#63b3ed" />
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
              <GameIcon name="crown" size={18} color="var(--gold-400)" />
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
                    <GameIcon name="flat-star" size={14} color="var(--gold-400)" />
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
                    <GameIcon name="hammer-drop" size={14} color="#ecc94b" />
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
                    <GameIcon name="breastplate" size={14} color="#48bb78" />
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
          {mainPortals.map((portal) => (
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
                  <GameIcon name={portal.icon} size={26} color={portal.accentColor} />
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
          ))}
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
          {categoryShortcuts.map((cat) => (
            <button
              key={cat.id}
              className="menu-category-btn"
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveView('catalog');
              }}
            >
              <div className="cat-icon-frame" style={{ color: cat.color }}>
                <GameIcon name={cat.icon} size={20} color={cat.color} />
              </div>
              <span className="cat-name">{cat.name}</span>
              <ChevronRight size={14} className="cat-arrow" />
            </button>
          ))}
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
                <span className="tip-icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
                  <GameIcon name={tip.icon} size={22} color="var(--gold-400)" />
                </span>
                <h4 className="tip-title">{tip.title}</h4>
              </div>
              <p className="tip-text">{tip.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info & App Updates */}
      <footer className="menu-footer">
        <div className="menu-footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img src="/icon.svg" alt="Dragonwilds Logo" className="footer-logo" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <p className="footer-title" style={{ margin: 0 }}>RuneScape: Dragonwilds Companion</p>
                {isNativeApp && (
                  <span style={{
                    fontSize: '0.72rem',
                    background: 'rgba(212, 175, 55, 0.15)',
                    color: 'var(--gold-400)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    padding: '1px 7px',
                    borderRadius: '12px',
                    fontWeight: '600'
                  }}>
                    v{APP_VERSION}
                  </span>
                )}
              </div>
              <p className="footer-sub" style={{ margin: '4px 0 0 0' }}>
                Compendio no oficial y base de datos interactiva para Ashenfall.
              </p>
            </div>
          </div>

          {/* Update Action Button & Feedback (Only in native Android APK) */}
          {isNativeApp && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
              {updateInfo?.hasUpdate ? (
                <button
                  className="btn-fantasy gold"
                  onClick={onOpenUpdateModal}
                  style={{
                    fontSize: '0.82rem',
                    padding: '8px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    animation: 'pulse 2s infinite'
                  }}
                  title="Nueva version disponible en GitHub"
                >
                  <Rocket size={15} />
                  <span>Actualizar a v{updateInfo.latestVersion}</span>
                </button>
              ) : (
                <button
                  className="btn-fantasy"
                  onClick={onCheckForUpdates}
                  disabled={isCheckingUpdate}
                  style={{
                    fontSize: '0.8rem',
                    padding: '7px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    opacity: isCheckingUpdate ? 0.7 : 1
                  }}
                  title="Comprobar si hay nuevas releases en GitHub"
                >
                  <RefreshCw size={14} className={isCheckingUpdate ? 'spin-animation' : ''} />
                  <span>{isCheckingUpdate ? 'Buscando...' : 'Buscar Actualizaciones'}</span>
                </button>
              )}

              {updateCheckMessage && (
                <div style={{
                  fontSize: '0.75rem',
                  color: updateCheckMessage.includes('dia') || updateCheckMessage.includes('reciente') ? '#68d391' : 'var(--gold-300)',
                  background: 'rgba(10, 15, 20, 0.8)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  {updateCheckMessage}
                </div>
              )}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
