import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Flame, 
  Zap, 
  Shield, 
  Compass, 
  Wind, 
  Droplets, 
  Mountain, 
  BookOpen, 
  X,
  ExternalLink
} from 'lucide-react';
import spellsData from '../data/spells.json';
import { normalizeText, getWordStems } from '../utils/searchUtils';

const SPELL_CATEGORIES = [
  { id: 'all', name: 'Todos los Hechizos' },
  { id: 'Combate', name: '⚔️ Combate y Daño' },
  { id: 'Encantamiento', name: '✨ Encantamiento de Armas' },
  { id: 'Transmutación', name: '🧪 Transmutación y Alquimia' },
  { id: 'Teletransporte', name: '🌀 Teletransporte y Movilidad' },
  { id: 'Defensa', name: '🛡️ Defensa y Protección' },
  { id: 'Utilidad', name: '🪴 Utilidad y Recolección' }
];

export default function SpellsViewer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSpellModal, setSelectedSpellModal] = useState(null);

  const filteredSpells = useMemo(() => {
    return spellsData.filter((s) => {
      // Category
      if (selectedCategory !== 'all') {
        const cat = normalizeText(s.category);
        const filterCat = normalizeText(selectedCategory);
        if (!cat.includes(filterCat)) return false;
      }

      // Search
      if (searchQuery.trim()) {
        const normQ = normalizeText(searchQuery);
        const qTokens = normQ.split(/\s+/).filter(Boolean);
        const searchTarget = normalizeText(
          `${s.name} ${s.englishTitle || ''} ${s.effect || ''} ${s.runes?.map((r) => r.rune).join(' ') || ''}`
        );

        const matchesAll = qTokens.every((token) => {
          const stems = getWordStems(token);
          return stems.some((stem) => searchTarget.includes(stem));
        });

        if (!matchesAll) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="spells-viewer-container">
      {/* Sticky Header with Search y Category Filters */}
      <div className="search-filter-section">
        {/* Search Bar */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text"
            className="search-input"
            placeholder="Buscar hechizo por nombre, runa o efecto (ej: Venganza, Fuego, Teletransporte...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="subcategories-bar" style={{ margin: 0, paddingBottom: 0 }}>
          {SPELL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`filter-chip ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '14px 20px',
        marginBottom: '20px',
        background: 'rgba(128, 90, 213, 0.1)',
        border: '1px solid rgba(159, 122, 234, 0.3)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={22} color="#b794f4" />
          <div>
            <h3 style={{ fontFamily: 'var(--font-title)', color: '#d6bcfa', fontSize: '1.05rem', margin: 0 }}>
              GRIMORIO ARCANO DE ASHENFALL
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Canalización de runas elementales y magia de combate
            </span>
          </div>
        </div>

        <div style={{ color: 'var(--gold-400)', fontFamily: 'var(--font-title)', fontSize: '0.85rem' }}>
          Mostrando <strong>{filteredSpells.length}</strong> de <strong>{spellsData.length}</strong> hechizos
        </div>
      </div>

      {/* Spells Grid */}
      {filteredSpells.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--gold-border)' }}>
          <Zap size={48} color="var(--gold-500)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', marginBottom: '8px' }}>
            No se encontraron hechizos
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
            Intenta con otros términos de búsqueda o selecciona otra categoría de magia.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filteredSpells.map((spell) => (
            <div 
              key={spell.id}
              className="spell-card"
              onClick={() => setSelectedSpellModal(spell)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--gold-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Header: Icon, Name y Magic Level Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="item-icon-frame" style={{ width: '42px', height: '42px', flexShrink: 0, padding: '3px' }}>
                    <img 
                      src={spell.image} 
                      alt={spell.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      loading="lazy"
                      onError={(e) => {
                        if (spell.remoteImage && e.target.src !== spell.remoteImage) {
                          e.target.src = spell.remoteImage;
                        } else {
                          e.target.style.display = 'none';
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1.02rem', color: 'var(--text-primary)', margin: 0 }}>
                      {spell.name}
                    </h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      {spell.englishTitle}
                    </span>
                  </div>
                </div>

                <span 
                  style={{ 
                    padding: '3px 8px', 
                    borderRadius: '8px', 
                    fontSize: '0.72rem', 
                    fontFamily: 'var(--font-title)',
                    fontWeight: 700,
                    background: 'rgba(128, 90, 213, 0.2)',
                    color: '#d6bcfa',
                    border: '1px solid rgba(159, 122, 234, 0.4)',
                    flexShrink: 0
                  }}
                >
                  Niv. {spell.magicLevel}
                </span>
              </div>

              {/* Category */}
              <span className="item-type-badge" style={{ alignSelf: 'flex-start' }}>
                {spell.category}
              </span>

              {/* Effect Description */}
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                {spell.effect}
              </p>

              {/* Rune Cost Chips */}
              <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--gold-400)', fontFamily: 'var(--font-title)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  RUNAS NECESARIAS:
                </span>
                {spell.runes && spell.runes.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {spell.runes.map((r, idx) => (
                      <span 
                        key={idx}
                        style={{
                          background: 'rgba(10, 13, 18, 0.8)',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          color: '#e2e8f0',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <strong style={{ color: 'var(--gold-400)' }}>{r.qty}x</strong> {r.rune}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span style={{ fontSize: '0.75rem', color: '#68d391', fontStyle: 'italic' }}>
                    Sin coste de runas (Gratuito)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Spell Detail Modal */}
      {selectedSpellModal && (
        <div className="modal-overlay" onClick={() => setSelectedSpellModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="item-icon-frame" style={{ width: '48px', height: '48px', padding: '4px' }}>
                  <img 
                    src={selectedSpellModal.image} 
                    alt={selectedSpellModal.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      if (selectedSpellModal.remoteImage && e.target.src !== selectedSpellModal.remoteImage) {
                        e.target.src = selectedSpellModal.remoteImage;
                      } else {
                        e.target.style.display = 'none';
                      }
                    }}
                  />
                </div>
                <div>
                  <h3 className="modal-title" style={{ margin: 0 }}>{selectedSpellModal.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    {selectedSpellModal.englishTitle} • Nivel de Magia {selectedSpellModal.magicLevel}
                  </span>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedSpellModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid #9f7aea' }}>
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#d6bcfa', marginBottom: '6px' }}>
                  EFECTO DEL HECHIZO
                </h4>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {selectedSpellModal.effect}
                </p>
              </div>

              <div className="recipe-section" style={{ padding: '14px' }}>
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: 'var(--gold-400)', marginBottom: '8px' }}>
                  COSTE DE RUNAS POR LANZAMIENTO
                </h4>
                {selectedSpellModal.runes && selectedSpellModal.runes.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedSpellModal.runes.map((r, i) => (
                      <div 
                        key={i}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          background: 'rgba(0,0,0,0.3)',
                          borderRadius: '6px',
                          border: '1px solid rgba(255,255,255,0.06)'
                        }}
                      >
                        <span style={{ color: '#fff', fontSize: '0.9rem' }}>{r.rune}</span>
                        <strong style={{ color: 'var(--gold-400)', fontSize: '0.95rem' }}>{r.qty} unidades</strong>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#68d391', fontSize: '0.9rem', margin: 0 }}>
                    Este hechizo no consume runas (habilidad básica o teletransporte de retorno).
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <a 
                  href={selectedSpellModal.wikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fantasy"
                  style={{ width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none' }}
                >
                  <span>Ver en Dragonwilds Wiki</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
