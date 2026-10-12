import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CATEGORY_DEFINITIONS, SUBCATEGORIES_CONFIG } from './categoryConfig';
import CategoryHub from './CategoryHub';
import CatalogNavBar from './CatalogNavBar';
import CatalogFilters from './CatalogFilters';
import CatalogResultsHeader from './CatalogResultsHeader';
import ItemGrid from './ItemGrid';

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

  // Reset subtype and display count when category changes
  useEffect(() => {
    setSelectedSubtype('all');
    setDisplayCount(48);
  }, [selectedCategory]);

  const activeSubtypes = selectedCategory ? SUBCATEGORIES_CONFIG[selectedCategory] || null : null;
  const currentCategoryConfig = CATEGORY_DEFINITIONS.find((c) => c.id === selectedCategory);
  const currentCategoryIcon = currentCategoryConfig?.icon || (selectedCategory === 'All' ? 'swap-bag' : 'sparkles');

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
          const combined = `${item.title || item.name} ${item.itemType || ''} ${item.category || ''}`.toLowerCase();
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

  // CATEGORY HUB VIEW (When no category is selected)
  if (!selectedCategory) {
    return (
      <CategoryHub
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isFloatingOpen={isFloatingOpen}
        setIsFloatingOpen={setIsFloatingOpen}
        floatingSearchResults={floatingSearchResults}
        searchWrapperRef={searchWrapperRef}
        onSelectItem={onSelectItem}
        setSelectedCategory={setSelectedCategory}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        plannerItems={plannerItems}
        onTogglePlanner={onTogglePlanner}
        categoryCounts={categoryCounts}
      />
    );
  }

  const isFiltered = Boolean(
    selectedCategory !== 'All' || 
    selectedSubtype !== 'all' || 
    selectedPowerTier !== 'all' || 
    searchQuery
  );

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedSubtype('all');
    setSelectedPowerTier('all');
    setSelectedDamageType('all');
    setSearchQuery('');
  };

  return (
    <div className="item-catalog-container">
      {/* Category Navigation Bar (Back Button y Category Title) */}
      <CatalogNavBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSearchQuery={setSearchQuery}
        setIsFloatingOpen={setIsFloatingOpen}
        currentCategoryConfig={currentCategoryConfig}
        currentCategoryIcon={currentCategoryIcon}
        searchQuery={searchQuery}
        filteredCount={filteredItems.length}
      />

      {/* Search y Filter Header */}
      <CatalogFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setDisplayCount={setDisplayCount}
        activeSubtypes={activeSubtypes}
        selectedSubtype={selectedSubtype}
        setSelectedSubtype={setSelectedSubtype}
        selectedPowerTier={selectedPowerTier}
        setSelectedPowerTier={setSelectedPowerTier}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Results Count y Current Scope */}
      <CatalogResultsHeader
        visibleCount={visibleItems.length}
        totalCount={filteredItems.length}
        isFiltered={isFiltered}
        onClearFilters={handleClearFilters}
      />

      {/* Grid of Items */}
      <ItemGrid
        visibleItems={visibleItems}
        totalFilteredCount={filteredItems.length}
        onLoadMore={() => setDisplayCount((prev) => prev + 48)}
        onSelectItem={onSelectItem}
        favorites={favorites}
        onToggleFavorite={onToggleFavorite}
        plannerItems={plannerItems}
        onTogglePlanner={onTogglePlanner}
      />
    </div>
  );
}
