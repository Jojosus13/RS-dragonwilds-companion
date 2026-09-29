import React from 'react';
import { Compass, Scroll, Zap, Map } from 'lucide-react';

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
          <Compass size={22} />
        </div>
        <div className="metric-info">
          <span className="metric-number">{allItemsCount || 200}+</span>
          <span className="metric-label">Ítems y Objetos</span>
        </div>
      </div>

      <div className="metric-cell" onClick={() => setActiveView('quests')}>
        <div className="metric-icon-box orange">
          <Scroll size={22} />
        </div>
        <div className="metric-info">
          <span className="metric-number">{questsCount || 39}</span>
          <span className="metric-label">Misiones Guiadas</span>
        </div>
      </div>

      <div className="metric-cell" onClick={() => setActiveView('spells')}>
        <div className="metric-icon-box purple">
          <Zap size={22} />
        </div>
        <div className="metric-info">
          <span className="metric-number">{spellsCount || 42}</span>
          <span className="metric-label">Hechizos y Magia</span>
        </div>
      </div>

      <div className="metric-cell" onClick={() => setActiveView('map')}>
        <div className="metric-icon-box blue">
          <Map size={22} />
        </div>
        <div className="metric-info">
          <span className="metric-number">100%</span>
          <span className="metric-label">Mapa de Ashenfall</span>
        </div>
      </div>
    </section>
  );
}
