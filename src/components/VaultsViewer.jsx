import React, { useState, useMemo, useEffect } from 'react';
import GameIcon from './GameIcon';
import {
  Shield,
  MapPin,
  ExternalLink,
  Search,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Flame,
  AlertTriangle,
  Zap,
  Eye,
  Lock,
  Unlock,
  Award,
  Layers,
  Scroll,
  CheckCircle2,
  Maximize2,
  X,
  Compass,
  Footprints,
  Skull,
  Info
} from 'lucide-react';
import vaultsData from '../data/vaults.json';
import { normalizeText } from '../utils/searchUtils';

const POWER_LEVEL_COLORS = {
  2: { label: 'Nivel 2', bg: 'rgba(72, 187, 120, 0.15)', text: '#48bb78', border: 'rgba(72, 187, 120, 0.35)' },
  3: { label: 'Nivel 3', bg: 'rgba(66, 153, 225, 0.15)', text: '#4299e1', border: 'rgba(66, 153, 225, 0.35)' },
  4: { label: 'Nivel 4', bg: 'rgba(237, 137, 54, 0.15)', text: '#ed8936', border: 'rgba(237, 137, 54, 0.35)' },
  5: { label: 'Nivel 5', bg: 'rgba(159, 122, 234, 0.15)', text: '#9f7aea', border: 'rgba(159, 122, 234, 0.35)' },
  7: { label: 'Nivel 7 (Élite)', bg: 'rgba(245, 101, 101, 0.2)', text: '#fc8181', border: 'rgba(245, 101, 101, 0.4)' }
};

export default function VaultsViewer({
  selectedVaultId = null,
  onSelectVault = () => { },
  onViewVaultOnMap = () => { },
  onSelectItem = () => { }
}) {
  const [activeVaultId, setActiveVaultId] = useState(selectedVaultId);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [zoomImage, setZoomImage] = useState(null);

  // Sync prop changes
  useEffect(() => {
    if (selectedVaultId) {
      setActiveVaultId(selectedVaultId);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [selectedVaultId]);

  const activeVault = useMemo(() => {
    if (!activeVaultId) return null;
    return vaultsData.find((v) => v.id === activeVaultId) || null;
  }, [activeVaultId]);

  // Unique regions list for filter dropdown
  const regionsList = useMemo(() => {
    const set = new Set();
    vaultsData.forEach((v) => {
      const mainReg = v.region.split(' (')[0];
      set.add(mainReg);
    });
    return Array.from(set);
  }, []);

  // Filtered list of vaults
  const filteredVaults = useMemo(() => {
    return vaultsData.filter((vault) => {
      // Region filter
      if (regionFilter !== 'all' && !vault.region.toLowerCase().includes(regionFilter.toLowerCase())) {
        return false;
      }
      // Level filter
      if (levelFilter !== 'all' && String(vault.powerLevel) !== String(levelFilter)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = normalizeText(searchQuery);
        const titleNorm = normalizeText(vault.title);
        const regionNorm = normalizeText(vault.region);
        const summaryNorm = normalizeText(vault.summary);
        const lootNorm = normalizeText((vault.notableLoot || []).map(l => l.name).join(' '));
        const recipesNorm = normalizeText((vault.recipes || []).map(r => r.name).join(' '));

        const matches = titleNorm.includes(q) ||
          regionNorm.includes(q) ||
          summaryNorm.includes(q) ||
          lootNorm.includes(q) ||
          recipesNorm.includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [searchQuery, regionFilter, levelFilter]);

  // Total chests y core stats
  const totalChestsCount = useMemo(() => {
    return vaultsData.reduce((acc, v) => acc + (v.chests?.length || 0), 0);
  }, []);

  return (
    <div className="vaults-viewer-container">
      {/* Detail View of Selected Vault */}
      {activeVault ? (
        <div className="vault-detail-view fade-in">
          {/* Top Sticky Navigation Bar */}
          <div className="vault-detail-topbar">
            <button
              className="btn-fantasy btn-back"
              onClick={() => {
                setActiveVaultId(null);
                onSelectVault(null);
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }}
            >
              <ArrowLeft size={16} />
              <span>Volver al Índice de Bóvedas</span>
            </button>

            <div className="vault-topbar-actions">
              <button
                className="btn-fantasy gold"
                onClick={() => onViewVaultOnMap(activeVault)}
                title="Ver ubicación exacta en el mapa de Ashenfall"
              >
                <GameIcon name="position-marker" size={16} />
                <span>Ver en el Mapa</span>
              </button>
              {activeVault.wikiUrl && (
                <a
                  href={activeVault.wikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fantasy"
                  title="Abrir página oficial de la Wiki"
                >
                  <ExternalLink size={15} />
                  <span>Wiki Oficial</span>
                </a>
              )}
            </div>
          </div>

          {/* Main Vault Hero / Infobox Header */}
          <div className="vault-hero-card">
            <div className="vault-hero-bg">
              {activeVault.mainImage && (
                <img
                  src={activeVault.mainImage}
                  alt={activeVault.title}
                  className="vault-hero-banner-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
              <div className="vault-hero-overlay" />
            </div>

            <div className="vault-hero-content">
              <div className="vault-badges-row">
                <span
                  className="vault-level-badge"
                  style={{
                    background: POWER_LEVEL_COLORS[activeVault.powerLevel]?.bg || 'rgba(66, 153, 225, 0.2)',
                    color: POWER_LEVEL_COLORS[activeVault.powerLevel]?.text || '#63b3ed',
                    borderColor: POWER_LEVEL_COLORS[activeVault.powerLevel]?.border || 'rgba(66, 153, 225, 0.4)'
                  }}
                >
                  <GameIcon name="shield" size={14} />
                  Nivel de Poder: {activeVault.powerLevel}
                </span>

                <span className="vault-region-badge">
                  <GameIcon name="treasure-map" size={14} />
                  {activeVault.region}
                </span>

                <span className="vault-danger-badge">
                  <GameIcon name="skull-crossed-bones" size={14} />
                  Peligro: {activeVault.dangerLevel || 'Medio'}
                </span>
              </div>

              <h1 className="vault-hero-title">{activeVault.title}</h1>
              <p className="vault-hero-summary">{activeVault.summary}</p>

              {/* Quick Infobox Metadata Row */}
              <div className="vault-infobox-strip">
                <div className="vault-info-pill">
                  <span className="pill-label">Lanzamiento:</span>
                  <span className="pill-value">{activeVault.releaseDate || '15 de Abril 2025'}</span>
                </div>
                <div className="vault-info-pill">
                  <span className="pill-label">Actualización:</span>
                  <span className="pill-value">{activeVault.update || 'Dragonwilds'}</span>
                </div>
                <div className="vault-info-pill">
                  <span className="pill-label">Cofres del Tesoro:</span>
                  <span className="pill-value">{activeVault.chests?.length || 1} localizados</span>
                </div>
                <div className="vault-info-pill">
                  <span className="pill-label">Núcleos de Bóveda:</span>
                  <span className="pill-value">3 (50 kg c/u)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 1: Hazards y Traps (Peligros y Mecánicas) */}
          {activeVault.hazards && activeVault.hazards.length > 0 && (
            <div className="vault-section-card">
              <div className="vault-section-header">
                <div className="vault-sec-title-wrap">
                  <GameIcon name="hazard-sign" size={20} color="#f6ad55" />
                  <h2>Peligros y Trampas (Hazards)</h2>
                </div>
                <span className="vault-sec-count">{activeVault.hazards.length} Trampas</span>
              </div>

              <div className="vault-hazards-grid">
                {activeVault.hazards.map((hz, idx) => (
                  <div key={idx} className="vault-hazard-item">
                    <div className="hazard-icon-col">
                      <GameIcon name="fire" size={18} color="#fc8181" />
                    </div>
                    <div className="hazard-info-col">
                      <div className="hazard-title-row">
                        <h4>{hz.name}</h4>
                        {hz.type && <span className="hazard-type-tag">{hz.type}</span>}
                      </div>
                      <p className="hazard-desc">{hz.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Enemies (Enemigos y Jefes) */}
          {activeVault.enemies && (
            <div className="vault-section-card">
              <div className="vault-section-header">
                <div className="vault-sec-title-wrap">
                  <GameIcon name="skull-crossed-bones" size={20} color="#fc8181" />
                  <h2>Enemigos de la Bóveda (Enemies)</h2>
                </div>
                <span className="vault-sec-count">Tier {activeVault.powerLevel}</span>
              </div>

              {/* Standard Enemies Table */}
              {activeVault.enemies.standard && activeVault.enemies.standard.length > 0 && (
                <div className="vault-table-wrap">
                  <table className="vault-wiki-table">
                    <thead>
                      <tr>
                        <th>Enemigo (Enemy)</th>
                        <th style={{ width: '120px', textAlign: 'center' }}>Cantidad</th>
                        <th style={{ width: '130px', textAlign: 'center' }}>Nivel de Poder</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeVault.enemies.standard.map((en, idx) => (
                        <tr key={idx}>
                          <td className="enemy-name-cell">
                            <span className="enemy-bullet">
                              <GameIcon name="crossed-swords" size={13} color="#fc8181" />
                            </span>
                            <span>{en.name}</span>
                          </td>
                          <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{en.amount}</td>
                          <td style={{ textAlign: 'center' }}>
                            <span className="level-chip">Nv. {en.level || activeVault.powerLevel}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Soulrifted / Spiritual Realm Enemies (if applicable, e.g. Vekchenven Kara) */}
              {activeVault.enemies.soulrifted && activeVault.enemies.soulrifted.length > 0 && (
                <div className="vault-subtable-block">
                  <div className="subtable-banner">
                    <GameIcon name="lightning-tear" size={16} color="#b794f4" />
                    <span>Enemigos del Reino Espiritual (Durante Soul Rifted)</span>
                  </div>
                  <table className="vault-wiki-table">
                    <thead>
                      <tr>
                        <th>Enemigo Espectral</th>
                        <th style={{ width: '180px', textAlign: 'center' }}>Frecuencia / Aparición</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeVault.enemies.soulrifted.map((se, idx) => (
                        <tr key={idx}>
                          <td className="enemy-name-cell" style={{ color: '#b794f4' }}>
                            <span className="enemy-bullet">
                              <GameIcon name="ghost" size={13} color="#b794f4" />
                            </span>
                            <span>{se.name}</span>
                          </td>
                          <td style={{ textAlign: 'center', color: '#b794f4', fontWeight: 'bold' }}>{se.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Boss / Guardian Elite */}
              {activeVault.enemies.boss && (
                <div className="vault-boss-card">
                  <div className="boss-header">
                    <span className="boss-tag">JEFE DE LA CÁMARA</span>
                    <h3 className="boss-name">{activeVault.enemies.boss.name}</h3>
                    {activeVault.enemies.boss.level && (
                      <span className="boss-level">{activeVault.enemies.boss.level}</span>
                    )}
                  </div>
                  {activeVault.enemies.boss.description && (
                    <p className="boss-desc">{activeVault.enemies.boss.description}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Section 3: Notable Loot y Recipes (Botín Destacado y Recetas) */}
          {((activeVault.notableLoot && activeVault.notableLoot.length > 0) || (activeVault.recipes && activeVault.recipes.length > 0)) && (
            <div className="vault-section-card">
              <div className="vault-section-header">
                <div className="vault-sec-title-wrap">
                  <GameIcon name="medal" size={20} color="var(--gold-400)" />
                  <h2>Botín Destacado y Recetas (Notable Loot)</h2>
                </div>
              </div>

              <div className="vault-loot-grid">
                {activeVault.notableLoot && activeVault.notableLoot.map((lt, idx) => (
                  <div key={idx} className="vault-loot-card">
                    <div className="loot-card-icon">
                      <GameIcon name="sparkles" size={20} color="var(--gold-400)" />
                    </div>
                    <div className="loot-card-content">
                      <div className="loot-card-header">
                        <h4>{lt.name}</h4>
                        {lt.type && <span className="loot-type-badge">{lt.type}</span>}
                      </div>
                      <p className="loot-desc">{lt.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recipe List */}
              {activeVault.recipes && activeVault.recipes.length > 0 && (
                <div className="vault-recipes-subblock">
                  <h4 className="recipes-subtitle">
                    <GameIcon name="scroll-unfurled" size={16} color="#63b3ed" />
                    <span>Recetas de Forja Aprendibles en Efigies de Dragonkin:</span>
                  </h4>
                  <div className="recipes-chips-wrap">
                    {activeVault.recipes.map((rc, idx) => (
                      <div key={idx} className="recipe-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <GameIcon name="sparkles" size={12} color="var(--gold-400)" />
                        <span className="recipe-name">{rc.name}</span>
                        {rc.type && <span className="recipe-cat">({rc.type})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 4: Chests Guide (Guía de Cofres con Imágenes) */}
          {activeVault.chests && activeVault.chests.length > 0 && (
            <div className="vault-section-card">
              <div className="vault-section-header">
                <div className="vault-sec-title-wrap">
                  <GameIcon name="sparkles" size={20} color="#63b3ed" />
                  <h2>Cofres del Tesoro y Secretos (Chests Guide)</h2>
                </div>
                <span className="vault-sec-count">{activeVault.chests.length} Cofres</span>
              </div>

              <p className="vault-chests-intro">
                Cada cofre contiene planos arcanos, fragmentos de tecnología Dragonkin, runas y gemas. Haz clic en las imágenes para ampliarlas y ver los puntos de salto (Windstep) y caminos secretos.
              </p>

              <div className="vault-chests-list">
                {activeVault.chests.map((ch, idx) => (
                  <div key={ch.id || idx} className="vault-chest-card">
                    <div className="chest-text-col">
                      <div className="chest-number-badge">
                        <span>COFRE #{ch.id || idx + 1}</span>
                      </div>
                      <h3 className="chest-title">{ch.title}</h3>
                      <p className="chest-instructions">{ch.instructions}</p>

                      {ch.caption && (
                        <div className="chest-tip-pill">
                          <Info size={14} />
                          <span>{ch.caption}</span>
                        </div>
                      )}
                    </div>

                    {/* Chest Screenshot Column */}
                    {ch.image ? (
                      <div
                        className="chest-image-col"
                        onClick={() => setZoomImage({ src: ch.image, caption: ch.title || ch.caption })}
                        title="Haz clic para ampliar la imagen"
                      >
                        <img
                          src={ch.image}
                          alt={ch.title || `Cofre ${idx + 1}`}
                          className="chest-img"
                          loading="lazy"
                          onError={(e) => {
                            e.target.parentElement.style.display = 'none';
                          }}
                        />
                        <div className="chest-zoom-overlay">
                          <Maximize2 size={18} />
                          <span>Ampliar</span>
                        </div>
                      </div>
                    ) : (
                      <div className="chest-no-image-placeholder">
                        <GameIcon name="shield" size={24} color="rgba(255,255,255,0.2)" />
                        <span>Sin captura disponible</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Resources in the Vault (Recursos Extraíbles) */}
          {activeVault.resources && (
            <div className="vault-section-card">
              <div className="vault-section-header">
                <div className="vault-sec-title-wrap">
                  <GameIcon name="sprout" size={20} color="#48bb78" />
                  <h2>Recursos Extraíbles (Resources)</h2>
                </div>
              </div>

              <div className="vault-resources-grid">
                {activeVault.resources.nodes && (
                  <div className="resource-group-col">
                    <h4>Yacimientos y Ventilas:</h4>
                    <ul>
                      {activeVault.resources.nodes.map((node, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <GameIcon name="mining" size={14} color="var(--gold-400)" />
                          <span>{node}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeVault.resources.plants && activeVault.resources.plants.length > 0 && (
                  <div className="resource-group-col">
                    <h4>Plantas y Hierbas:</h4>
                    <ul>
                      {activeVault.resources.plants.map((plant, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <GameIcon name="herbs-bundle" size={14} color="#48bb78" />
                          <span>{plant}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeVault.resources.other && (
                  <div className="resource-group-col">
                    <h4>Objetos Especiales:</h4>
                    <ul>
                      {activeVault.resources.other.map((oth, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <GameIcon name="sparkles" size={14} color="var(--gold-400)" />
                          <span>{oth}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Action Bar */}
          <div className="vault-detail-bottom-actions">
            <button
              className="btn-fantasy gold btn-large"
              onClick={() => onViewVaultOnMap(activeVault)}
            >
              <GameIcon name="position-marker" size={18} />
              <span>Ver Ubicación Exacta en el Mapa de Ashenfall</span>
            </button>
            <button
              className="btn-fantasy btn-large"
              onClick={() => {
                setActiveVaultId(null);
                onSelectVault(null);
                window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              }}
            >
              <ArrowLeft size={18} />
              <span>Volver a la Lista de Bóvedas</span>
            </button>
          </div>
        </div>
      ) : (
        /* Overview / Catalog Grid of All 12 Vaults */
        <div className="vaults-catalog-view fade-in">
          {/* Header Banner */}
          <div className="vaults-header-banner">
            <div className="vaults-banner-content">
              <div className="vaults-banner-badge">
                <GameIcon name="shield" size={16} />
                <span>CÓDICE DRACONIS</span>
              </div>
              <h1 className="vaults-banner-title">Cámaras y Bóvedas Dragonkin</h1>
              <p className="vaults-banner-subtitle">
                Explora las 12 bóvedas ancestrales de Ashenfall. Guías completas con localización de cofres ilustrados, resolución de trampas, vestigios legendarios, recetas de forja y núcleos de tecnología perdida.
              </p>

              {/* Stats Bar */}
              <div className="vaults-stats-bar">
                <div className="vault-stat-item">
                  <span className="stat-val">{vaultsData.length}</span>
                  <span className="stat-lbl">Bóvedas Registradas</span>
                </div>
                <div className="vault-stat-divider" />
                <div className="vault-stat-item">
                  <span className="stat-val">{totalChestsCount}+</span>
                  <span className="stat-lbl">Cofres y Secretos</span>
                </div>
                <div className="vault-stat-divider" />
                <div className="vault-stat-item">
                  <span className="stat-val">36</span>
                  <span className="stat-lbl">Núcleos de Bóveda</span>
                </div>
                <div className="vault-stat-divider" />
                <div className="vault-stat-item">
                  <span className="stat-val">10+</span>
                  <span className="stat-lbl">Recetas y Vestigios</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="vaults-filters-bar">
            {/* Search Input */}
            <div className="vaults-search-input-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="vaults-search-input"
                placeholder="Buscar bóveda por nombre, región, botín (ej. Látigo Abisal, Escudo Anti-dragón, Vekchenven)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  title="Limpiar búsqueda"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="vaults-filter-controls">
              {/* Region Filter */}
              <div className="filter-select-wrap">
                <label>Región:</label>
                <select
                  className="custom-select vaults-filter-select"
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                >
                  <option value="all">Todas las Regiones</option>
                  <option value="Brynmoor">Brynmoor y Bosque del Templo</option>
                  <option value="Whispering">Pantano Susurrante</option>
                  <option value="Fractured">Llanura Quebrada (Fractured Plains)</option>
                  <option value="Bloodblight">Pantano Malasangre (Bloodblight)</option>
                  <option value="Stormtouched">Tierras Altas (Highlands)</option>
                  <option value="Fellhollow">Fellhollow y Lago de las Almas</option>
                  <option value="Umbral">Arenas Sombrías (Umbral Sands)</option>
                </select>
              </div>

              {/* Level Filter */}
              <div className="filter-select-wrap">
                <label>Nivel:</label>
                <select
                  className="custom-select vaults-filter-select"
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                >
                  <option value="all">Todos los Niveles</option>
                  <option value="2">Nivel 2 (Básico / Starter)</option>
                  <option value="3">Nivel 3 (Intermedio)</option>
                  <option value="4">Nivel 4 (Avanzado)</option>
                  <option value="5">Nivel 5 (Maestro / Fellhollow)</option>
                  <option value="7">Nivel 7 (Élite / Arenas Sombrías)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count Banner */}
          <div className="vaults-results-count">
            <span>Mostrando {filteredVaults.length} de {vaultsData.length} bóvedas</span>
            {(searchQuery || regionFilter !== 'all' || levelFilter !== 'all') && (
              <button
                className="btn-text-gold"
                onClick={() => {
                  setSearchQuery('');
                  setRegionFilter('all');
                  setLevelFilter('all');
                }}
              >
                Limpiar Filtros
              </button>
            )}
          </div>

          {/* Vaults Grid */}
          <div className="vaults-grid">
            {filteredVaults.map((vault) => {
              const levelMeta = POWER_LEVEL_COLORS[vault.powerLevel] || POWER_LEVEL_COLORS[2];
              const chestsCount = vault.chests?.length || 0;

              return (
                <div
                  key={vault.id}
                  className="vault-card-item"
                  onClick={() => {
                    setActiveVaultId(vault.id);
                    onSelectVault(vault.id);
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                  }}
                >
                  {/* Card Thumbnail / Banner */}
                  <div className="vault-card-thumb">
                    <img
                      src={vault.mainImage || 'https://dragonwilds.runescape.wiki/images/Dungeon_entrance_icon.png'}
                      alt={vault.title}
                      className="vault-card-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://dragonwilds.runescape.wiki/images/Dungeon_entrance_icon.png';
                      }}
                    />
                    <div className="vault-card-thumb-overlay" />

                    {/* Top Badges */}
                    <div className="vault-card-top-badges">
                      <span
                        className="vault-card-level-tag"
                        style={{
                          background: levelMeta.bg,
                          color: levelMeta.text,
                          borderColor: levelMeta.border
                        }}
                      >
                        <GameIcon name="shield" size={12} />
                        {levelMeta.label}
                      </span>

                      {chestsCount > 0 && (
                        <span className="vault-card-chests-tag">
                          <GameIcon name="sparkles" size={12} />
                          {chestsCount} {chestsCount === 1 ? 'Cofre' : 'Cofres'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="vault-card-body">
                    <div className="vault-card-region">
                      <GameIcon name="treasure-map" size={13} />
                      <span>{vault.region}</span>
                    </div>

                    <h3 className="vault-card-title">{vault.title}</h3>
                    <p className="vault-card-desc">{vault.summary}</p>

                    {/* Notable Loot Tags */}
                    {vault.notableLoot && vault.notableLoot.length > 0 && (
                      <div className="vault-card-loot-chips">
                        {vault.notableLoot.slice(0, 3).map((lt, i) => (
                          <span key={i} className="card-loot-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <GameIcon name="sparkles" size={11} color="var(--gold-400)" />
                            <span>{lt.name.split(' (')[0]}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Footer Actions */}
                    <div className="vault-card-footer">
                      <button
                        className="btn-fantasy gold btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveVaultId(vault.id);
                          onSelectVault(vault.id);
                          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                        }}
                      >
                        <span>Ver Guía</span>
                        <ChevronRight size={14} />
                      </button>

                      <button
                        className="btn-fantasy btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewVaultOnMap(vault);
                        }}
                        title="Ver en el mapa interactivo"
                      >
                        <GameIcon name="position-marker" size={14} />
                        <span>Mapa</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredVaults.length === 0 && (
            <div className="vaults-empty-state">
              <GameIcon name="shield" size={48} color="var(--gold-400)" />
              <h3>No se encontraron bóvedas</h3>
              <p>Prueba con otros términos de búsqueda o restablece los filtros de región y nivel.</p>
              <button
                className="btn-fantasy gold"
                onClick={() => {
                  setSearchQuery('');
                  setRegionFilter('all');
                  setLevelFilter('all');
                }}
              >
                Restablecer Filtros
              </button>
            </div>
          )}
        </div>
      )}

      {/* Fullscreen Image Lightbox Modal for Chests */}
      {zoomImage && (
        <div
          className="modal-overlay lightbox-overlay"
          onClick={() => setZoomImage(null)}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-header">
              <span className="lightbox-caption">{zoomImage.caption}</span>
              <button
                className="btn-fantasy btn-icon"
                onClick={() => setZoomImage(null)}
                title="Cerrar imagen"
              >
                <X size={20} />
              </button>
            </div>
            <div className="lightbox-img-wrap">
              <img
                src={zoomImage.src}
                alt={zoomImage.caption}
                className="lightbox-full-img"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
