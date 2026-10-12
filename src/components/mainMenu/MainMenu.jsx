import React from 'react';
import HeroBanner from './HeroBanner';
import MetricsBar from './MetricsBar';
import PersonalHub from './PersonalHub';
import PortalsGrid from './PortalsGrid';
import CategoryExplorer from './CategoryExplorer';
import SurvivalTips from './SurvivalTips';
import MenuFooter from './MenuFooter';

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

      {/* Footer Info & App Updates */}
      <MenuFooter
        onCheckForUpdates={onCheckForUpdates}
        isCheckingUpdate={isCheckingUpdate}
        updateInfo={updateInfo}
        updateCheckMessage={updateCheckMessage}
        onOpenUpdateModal={onOpenUpdateModal}
      />
    </div>
  );
}
