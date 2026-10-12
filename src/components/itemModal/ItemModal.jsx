import React, { useState } from 'react';
import ItemModalHeader from './ItemModalHeader';
import ItemModalTabs from './ItemModalTabs';
import ItemStatsTab from './ItemStatsTab';
import ItemRecipeTab from './ItemRecipeTab';
import ItemUsedInTab from './ItemUsedInTab';
import ItemUpgradesTab from './ItemUpgradesTab';
import ItemJournalTab from './ItemJournalTab';
import ItemModalFooter from './ItemModalFooter';

export default function ItemModal({ 
  item, 
  onClose, 
  onSelectOtherItem,
  isFavorite, 
  onToggleFavorite,
  isInPlanner,
  onTogglePlanner,
  onEquipItem,
  onViewItemOnMap
}) {
  const [activeTab, setActiveTab] = useState('stats');

  if (!item) return null;

  const hasUpgrades = item.upgrades && item.upgrades.length > 0;
  const hasUsedIn = item.usedIn && item.usedIn.length > 0;
  const hasRecipe = !!item.recipe;
  const hasJournal = !!item.journal;

  const getPowerTierClass = (pw) => {
    if (!pw) return '';
    if (pw <= 3) return 'tier-1-3';
    if (pw <= 6) return 'tier-4-6';
    if (pw === 7) return 'tier-7';
    return 'tier-8-9';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera del modal */}
        <ItemModalHeader
          item={item}
          onClose={onClose}
          getPowerTierClass={getPowerTierClass}
        />

        {/* Pestañas de navegación */}
        <ItemModalTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          hasRecipe={hasRecipe}
          hasUsedIn={hasUsedIn}
          usedInCount={item.usedIn?.length || 0}
          hasUpgrades={hasUpgrades}
          hasJournal={hasJournal}
        />

        {/* Cuerpo del modal según la pestaña activa */}
        <div className="modal-body">
          {activeTab === 'stats' && <ItemStatsTab item={item} />}
          {activeTab === 'recipe' && (
            <ItemRecipeTab recipe={item.recipe} onSelectOtherItem={onSelectOtherItem} />
          )}
          {activeTab === 'usedIn' && (
            <ItemUsedInTab usedIn={item.usedIn} onSelectOtherItem={onSelectOtherItem} />
          )}
          {activeTab === 'upgrades' && hasUpgrades && (
            <ItemUpgradesTab upgrades={item.upgrades} />
          )}
          {activeTab === 'journal' && hasJournal && (
            <ItemJournalTab journal={item.journal} />
          )}
        </div>

        {/* Acciones inferiores */}
        <ItemModalFooter
          item={item}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          isInPlanner={isInPlanner}
          onTogglePlanner={onTogglePlanner}
          onEquipItem={onEquipItem}
          onViewItemOnMap={onViewItemOnMap}
        />
      </div>
    </div>
  );
}
