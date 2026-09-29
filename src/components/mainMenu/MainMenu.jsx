import React from 'react';
import HeroBanner from './HeroBanner';
import MetricsBar from './MetricsBar';
import PersonalHub from './PersonalHub';
import PortalsGrid from './PortalsGrid';
import CategoryExplorer from './CategoryExplorer';
import SurvivalTips from './SurvivalTips';

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
  spells = []
}) {
  const equippedCount = Object.keys(loadout).filter((k) => !!loadout[k]).length;

  return (
    <div className="main-menu-container">
      {/* Hero Banner with Omni-Search */}
      <HeroBanner
        allItems={allItems}
        quests={quests}
        spells={spells}
        onSelectItem={onSelectItem}
        onSelectVault={onSelectVault}
        setActiveView={setActiveView}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Metrics Counter Bar */}
      <MetricsBar
        allItemsCount={allItems.length}
        questsCount={quests.length}
        spellsCount={spells.length}
        setActiveView={setActiveView}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Personal Hero Tracker */}
      <PersonalHub
        favorites={favorites}
        plannerItems={plannerItems}
        equippedCount={equippedCount}
        setActiveView={setActiveView}
      />

      {/* Main Portals Grid */}
      <PortalsGrid
        allItemsCount={allItems.length}
        questsCount={quests.length}
        spellsCount={spells.length}
        setActiveView={setActiveView}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Item Categories Quick Explorer */}
      <CategoryExplorer
        setSelectedCategory={setSelectedCategory}
        setActiveView={setActiveView}
      />

      {/* Survival Guide y Tips */}
      <SurvivalTips />

      {/* Footer Info */}
      <footer className="menu-footer">
        <div className="menu-footer-content">
          <img src="/icon.svg" alt="Dragonwilds Logo" className="footer-logo" />
          <div>
            <p className="footer-title">RuneScape: Dragonwilds Companion App</p>
            <p className="footer-sub">
              Compendio no oficial y base de datos interactiva. Diseñado para jugadores de PC, Móvil y Tablet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
