import React from 'react';
import GameIcon from '../GameIcon';
import { CATEGORY_META } from './mapConstants';

export default function MapCategoryBar({
  selectedCategory = 'all',
  setSelectedCategory,
  categoryCounts = {}
}) {
  return (
    <div className="map-category-pills-bar">
      {Object.entries(CATEGORY_META).map(([key, meta]) => {
        const count = categoryCounts[key] || 0;
        const isActive = selectedCategory === key;
        const iconColor = isActive ? 'var(--gold-300)' : meta.color;
        const IconComponent = meta.icon;

        return (
          <button
            key={key}
            className={`map-pill-btn ${isActive ? 'active' : ''}`}
            onClick={() => setSelectedCategory(key)}
          >
            {meta.gameIcon ? (
              <GameIcon name={meta.gameIcon} size={14} style={{ color: iconColor }} />
            ) : IconComponent ? (
              <IconComponent size={14} style={{ color: iconColor }} />
            ) : null}
            <span>{meta.label}</span>
            <span className="map-pill-count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
