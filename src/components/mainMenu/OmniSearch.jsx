import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { MAP_MARKERS } from '../../data/mapData';
import vaultsData from '../../data/vaults.json';
import SearchDropdownResults from './SearchDropdownResults';

export default function OmniSearch({
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
    <div className="menu-search-wrapper">
      <div className={`menu-search-bar ${isSearchFocused ? 'focused' : ''}`}>
        <Search size={20} className="menu-search-icon" />
        <input
          type="text"
          placeholder="Busca armas, armaduras, misiones, hechizos, lugares..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => {
            // Delay to allow clicking result items
            setTimeout(() => setIsSearchFocused(false), 200);
          }}
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

      <SearchDropdownResults
        searchQuery={searchQuery}
        searchResults={searchResults}
        onSelectItem={onSelectItem}
        onSelectVault={onSelectVault}
        setActiveView={setActiveView}
        setSelectedCategory={setSelectedCategory}
        onClose={() => setSearchQuery('')}
      />
    </div>
  );
}
