import React from 'react';
import ItemCardTop from './ItemCardTop';
import ItemCardStats from './ItemCardStats';
import ItemCardActions from './ItemCardActions';

export default function ItemCard({ 
  item, 
  onSelect, 
  isFavorite, 
  onToggleFavorite,
  isInPlanner,
  onTogglePlanner
}) {
  if (!item) return null;

  return (
    <div className="item-card" onClick={() => onSelect(item)}>
      <ItemCardTop item={item} />

      {item.description && (
        <p className="item-desc-snippet">{item.description}</p>
      )}

      <ItemCardStats stats={item.stats} recipe={item.recipe} />

      <ItemCardActions
        item={item}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        isInPlanner={isInPlanner}
        onTogglePlanner={onTogglePlanner}
        onSelect={onSelect}
      />
    </div>
  );
}
