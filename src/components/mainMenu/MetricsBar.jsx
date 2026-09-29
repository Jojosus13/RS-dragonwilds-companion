import React from 'react';
import GameIcon from '../GameIcon';

export default function MetricsBar({ allItemsCount, questsCount, spellsCount, setActiveView, setSelectedCategory }) {
  return (
    <section className="menu-metrics-bar">
      <div
        className="metric-cell"
        onClick={() => {
          setSelectedCategory(null);
          setActiveView('catalog');
        }}
      >
        <div className="metric-icon-box gold">
          <GameIcon name="swap-bag" size={22} color="var(--gold-400)" />
        </div>
        <div className="metric-info">
          <span className="metric-number">{allItemsCount || 200}+</span>
          <span className="metric-label">Ítems y Objetos</span>
        </div>
      </div>

      <div className="metric-cell" onClick={() => setActiveView('quests')}>
        <div className="metric-icon-box orange">
          <GameIcon name="tied-scroll" size={22} color="#ed8936" />
        </div>
        <div className="metric-info">
          <span className="metric-number">{questsCount || 39}</span>
          <span className="metric-label">Misiones Guiadas</span>
        </div>
      </div>

      <div className="metric-cell" onClick={() => setActiveView('spells')}>
        <div className="metric-icon-box purple">
          <GameIcon name="lightning-arc" size={22} color="#9f7aea" />
        </div>
        <div className="metric-info">
          <span className="metric-number">{spellsCount || 42}</span>
          <span className="metric-label">Hechizos y Magia</span>
        </div>
      </div>

      <div className="metric-cell" onClick={() => setActiveView('map')}>
        <div className="metric-icon-box blue">
          <GameIcon name="treasure-map" size={22} color="#63b3ed" />
        </div>
        <div className="metric-info">
          <span className="metric-number">100%</span>
          <span className="metric-label">Mapa de Ashenfall</span>
        </div>
      </div>
    </section>
  );
}
