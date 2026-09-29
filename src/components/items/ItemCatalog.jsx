import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowUpDown,
  ChevronRight,
  Search,
  X
} from 'lucide-react';
import FloatingSearchDropdown from '../common/FloatingSearchDropdown';
import ItemFilterBar, { CATEGORY_DEFINITIONS, SUBCATEGORIES_CONFIG } from './ItemFilterBar';
import ItemSortControls from './ItemSortControls';
import ItemGrid from './ItemGrid';
import { scoreItemSearch, normalizeText } from '../../utils/searchUtils';
import GameIcon from '../GameIcon';

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
  const [selectedPowerTier, setSelectedPowerTier] = useState('all');
  const [selectedDamageType, setSelectedDamageType] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [displayCount, setDisplayCount] = useState(48);

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

  const categoryCounts = useMemo(() => {
    const counts = { All: items.length };
    items.forEach((it) => {
      counts[it.category] = (counts[it.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  useEffect(() => {
    setSelectedSubtype('all');
    setDisplayCount(48);
  }, [selectedCategory]);

  const activeSubtypes = selectedCategory ? SUBCATEGORIES_CONFIG[selectedCategory] || null : null;
  const currentCategoryConfig = CATEGORY_DEFINITIONS.find((c) => c.id === selectedCategory);

  const floatingSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return items
      .map((it) => ({ it, score: scoreItemSearch(it, searchQuery) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || (b.it.powerLevel || 0) - (a.it.powerLevel || 0) || a.it.name.localeCompare(b.it.name))
      .map((r) => r.it);
  }, [items, searchQuery]);

  const filteredItems = useMemo(() => {
    let result = items;

    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter((it) => it.category === selectedCategory);
    }

    if (selectedSubtype !== 'all' && activeSubtypes) {
      const currentSub = activeSubtypes.find((s) => s.id === selectedSubtype);
      if (currentSub?.keywords) {
        result = result.filter((item) => {
          const combined = normalizeText(`${item.title || ''} ${item.name || ''} ${item.itemType || ''} ${item.category || ''}`);
          return currentSub.keywords.some((kw) => combined.includes(normalizeText(kw)));
        });
      }
    }

    let searchScores = null;
    if (searchQuery.trim()) {
      searchScores = new Map();
      result = result.filter((item) => {
        const sc = scoreItemSearch(item, searchQuery);
        if (sc > 0) {
          searchScores.set(item.id || item.name, sc);
          return true;
        }
        return false;
      });
    }

    if (selectedPowerTier !== 'all') {
      result = result.filter((item) => {
        const pw = item.powerLevel || 0;
        if (selectedPowerTier === 't1-3') return pw >= 1 && pw <= 3;
        if (selectedPowerTier === 't4-6') return pw >= 4 && pw <= 6;
        if (selectedPowerTier === 't7') return pw === 7;
        if (selectedPowerTier === 't8-9') return pw >= 8;
        return true;
      });
    }

    if (selectedDamageType !== 'all') {
      result = result.filter((item) => item.stats?.damageType?.toLowerCase().includes(selectedDamageType.toLowerCase()));
    }

    result = [...result].sort((a, b) => {
      if (searchScores && sortBy === 'relevance') {
        const scA = searchScores.get(a.id || a.name) || 0;
        const scB = searchScores.get(b.id || b.name) || 0;
        if (scB !== scA) return scB - scA;
      }
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'power-desc') return (b.powerLevel || 0) - (a.powerLevel || 0);
      if (sortBy === 'power-asc') return (a.powerLevel || 0) - (b.powerLevel || 0);
      if (sortBy === 'damage-desc') return (b.stats?.baseDamage || 0) - (a.stats?.baseDamage || 0);
      return 0;
    });

    return result;
  }, [items, selectedCategory, selectedSubtype, activeSubtypes, searchQuery, selectedPowerTier, selectedDamageType, sortBy]);

  // CATEGORY HUB VIEW
  if (!selectedCategory) {
    return (
      <div className="category-hub-container">
        <div className="category-hub-header">
          <div className="hub-header-badge">
            <Sparkles size={16} color="var(--gold-400)" />
            <span>ARMERÍA y CATÁLOGO</span>
          </div>
          <h1 className="category-hub-title">Tipos de Objetos</h1>
          <p className="category-hub-subtitle">
            Selecciona una categoría de objetos o usa el buscador general para explorar los 1,104 objetos de Dragonwilds.
          </p>

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

            <FloatingSearchDropdown
              results={floatingSearchResults.slice(0, 25)}
              totalMatches={floatingSearchResults.length}
              searchQuery={searchQuery}
              isOpen={isFloatingOpen && searchQuery.trim().length > 0}
              onSelectItem={onSelectItem}
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

        <div className="category-hub-grid">
          {CATEGORY_DEFINITIONS.map((cat) => {
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
                    <GameIcon name={cat.icon} size={24} color={cat.color} />
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

  const currentCategoryIcon = currentCategoryConfig?.icon || (selectedCategory === 'All' ? 'swap-bag' : 'sparkles');

  return (
    <div className="item-catalog-container">
      {/* Category Navigation Bar */}
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
            <GameIcon name={currentCategoryIcon} size={20} />
          </div>
          <div>
            <h2 className="category-nav-title">{currentCategoryConfig?.name || selectedCategory}</h2>
            <span className="category-nav-count">
              {filteredItems.length} objetos disponibles
            </span>
          </div>
        </div>
      </div>

      {/* Filter Category y Subtypes */}
      <ItemFilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedSubtype={selectedSubtype}
        onSelectSubtype={setSelectedSubtype}
        categoryCounts={categoryCounts}
      />

      {/* Sort y Search Controls */}
      <ItemSortControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isFloatingOpen={isFloatingOpen}
        setIsFloatingOpen={setIsFloatingOpen}
        floatingSearchResults={floatingSearchResults}
        searchWrapperRef={searchWrapperRef}
        onSelectItem={onSelectItem}
        onViewAllInCatalog={() => setSelectedCategory('All')}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        plannerItems={plannerItems}
        onTogglePlanner={onTogglePlanner}
        selectedPowerTier={selectedPowerTier}
        onPowerTierChange={setSelectedPowerTier}
        selectedDamageType={selectedDamageType}
        onDamageTypeChange={setSelectedDamageType}
        sortBy={sortBy}
        onSortChange={setSortBy}
        totalResults={filteredItems.length}
      />

      {/* Results Count y Scope */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Mostrando <strong style={{ color: 'var(--gold-400)' }}>{Math.min(displayCount, filteredItems.length)}</strong> de{' '}
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
      <ItemGrid
        items={filteredItems}
        visibleCount={displayCount}
        onLoadMore={() => setDisplayCount((prev) => prev + 48)}
        totalItems={filteredItems.length}
        onSelectItem={onSelectItem}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        plannerItems={plannerItems}
        onTogglePlanner={onTogglePlanner}
      />
    </div>
  );
}
