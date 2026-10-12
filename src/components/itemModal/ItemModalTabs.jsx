import React from 'react';
import GameIcon from '../GameIcon';

export default function ItemModalTabs({
  activeTab,
  setActiveTab,
  hasRecipe,
  hasUsedIn,
  usedInCount,
  hasUpgrades,
  hasJournal
}) {
  return (
    <div className="modal-tabs">
      <button 
        className={`modal-tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
        onClick={() => setActiveTab('stats')}
      >
        <GameIcon name="crossed-swords" size={14} style={{ marginRight: '6px' }} />
        Estadísticas
      </button>

      {hasRecipe && (
        <button 
          className={`modal-tab-btn ${activeTab === 'recipe' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipe')}
        >
          <GameIcon name="hammer-drop" size={14} style={{ marginRight: '6px' }} />
          Receta
        </button>
      )}

      {hasUsedIn && (
        <button 
          className={`modal-tab-btn ${activeTab === 'usedIn' ? 'active' : ''}`}
          onClick={() => setActiveTab('usedIn')}
        >
          <GameIcon name="anvil-impact" size={14} style={{ marginRight: '6px' }} />
          Usado en ({usedInCount})
        </button>
      )}

      {hasUpgrades && (
        <button 
          className={`modal-tab-btn ${activeTab === 'upgrades' ? 'active' : ''}`}
          onClick={() => setActiveTab('upgrades')}
        >
          <GameIcon name="lightning-tear" size={14} style={{ marginRight: '6px' }} />
          Mejoras y Ascensión
        </button>
      )}

      {hasJournal && (
        <button 
          className={`modal-tab-btn ${activeTab === 'journal' ? 'active' : ''}`}
          onClick={() => setActiveTab('journal')}
        >
          <GameIcon name="tied-scroll" size={14} style={{ marginRight: '6px' }} />
          Códice y Diario
        </button>
      )}
    </div>
  );
}
