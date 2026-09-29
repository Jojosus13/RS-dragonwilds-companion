import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Compass,
  Shield,
  Scroll,
  Zap,
  Map,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { MAP_MARKERS } from '../../data/mapData';
import vaultsData from '../../data/vaults.json';

export default function HeroBanner({
  allItems = [],
  quests = [],
  spells = [],
  onSelectItem,
  onSelectVault,
  setActiveView,
  setSelectedCategory
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Omnisearch across Items, Quests, Spells, Vaults, and Map POIs
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { items: [], quests: [], vaults: [], spells: [], pois: [], total: 0 };

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
        const loot = (v.notableLoot || []).map((l) => l.name).join(' ').toLowerCase();
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

    const total =
      matchingItems.length +
      matchingQuests.length +
      matchingVaults.length +
      matchingSpells.length +
      matchingPois.length;

    return {
      items: matchingItems,
      quests: matchingQuests,
      vaults: matchingVaults,
      spells: matchingSpells,
      pois: matchingPois,
      total
    };
  }, [searchQuery, allItems, quests, spells]);

  return (
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
                            <span className="result-meta">
                              {item.category} • {item.itemType}
                            </span>
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
                          <div
                            className="result-icon vault-icon"
                            style={{
                              background: 'rgba(66, 153, 225, 0.2)',
                              color: '#63b3ed',
                              borderRadius: '4px',
                              width: '28px',
                              height: '28px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            🛡️
                          </div>
                          <div className="result-details">
                            <span className="result-name">{vlt.name || vlt.title}</span>
                            <span className="result-meta">
                              {vlt.region} • Nivel {vlt.powerLevel}
                            </span>
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
                            <span className="result-meta">
                              {spl.type} • Nivel {spl.levelRequired || 1}
                            </span>
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
                            <span className="result-meta">
                              {poi.region} • {poi.category}
                            </span>
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
  );
}
