import React, { useState, useMemo } from 'react';
import spellsData from '../../data/spells.json';
import { normalizeText, getWordStems } from '../../utils/searchUtils';
import SpellFilterBar from './SpellFilterBar';
import SpellCard from './SpellCard';
import SpellDetailModal from './SpellDetailModal';
import GameIcon from '../GameIcon';

const SPELL_CATEGORIES = [
  { id: 'all', name: 'Todos los Hechizos', icon: 'wizard-staff' },
  { id: 'Combate', name: 'Combate y Daño', icon: 'crossed-swords' },
  { id: 'Encantamiento', name: 'Encantamiento de Armas', icon: 'sparkles' },
  { id: 'Transmutación', name: 'Transmutación y Alquimia', icon: 'potion-ball' },
  { id: 'Teletransporte', name: 'Teletransporte y Movilidad', icon: 'teleport' },
  { id: 'Defensa', name: 'Defensa y Protección', icon: 'shield' },
  { id: 'Utilidad', name: 'Utilidad y Recolección', icon: 'spade' }
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
  }, [searchQuery, selectedCategory]);

  return (
    <div className="spells-viewer-container">
      {/* Filters */}
      <SpellFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={SPELL_CATEGORIES}
      />

      {/* Overview Banner */}
      <div
        style={{
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
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <GameIcon name="sparkles" size={24} color="#b794f4" />
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
          <GameIcon name="lightning-arc" size={48} color="var(--gold-500)" style={{ margin: '0 auto 16px' }} />
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
            <SpellCard
              key={spell.id}
              spell={spell}
              onSelect={setSelectedSpellModal}
            />
          ))}
        </div>
      )}

      {/* Spell Detail Modal */}
      {selectedSpellModal && (
        <SpellDetailModal
          spell={selectedSpellModal}
          onClose={() => setSelectedSpellModal(null)}
        />
      )}
    </div>
  );
}
