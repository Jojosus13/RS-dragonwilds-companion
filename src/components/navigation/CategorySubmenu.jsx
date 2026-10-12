import React from 'react';
import GameIcon from '../GameIcon';

export default function CategorySubmenu({
  categories,
  categoryCounts,
  activeView,
  selectedCategory,
  onSelectCategory
}) {
  return (
    <div className="nav-submenu">
      {categories.map((cat) => {
        const count = categoryCounts[cat.id] || 0;
        const isSelected = activeView === 'catalog' && selectedCategory === cat.id;

        return (
          <button
            key={cat.id}
            className={`nav-subitem ${isSelected ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            <GameIcon name={cat.icon} size={15} color={isSelected ? 'var(--gold-300)' : cat.color} />
            <span className="subitem-name">{cat.name}</span>
            <span className="badge">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
