import React, { useState } from 'react';
import GameIcon from '../GameIcon';

export default function ItemCardTop({ item }) {
  const [imgError, setImgError] = useState(false);

  const getPowerTierClass = (pw) => {
    if (!pw) return '';
    if (pw <= 3) return 'tier-1-3';
    if (pw <= 6) return 'tier-4-6';
    if (pw === 7) return 'tier-7';
    return 'tier-8-9';
  };

  return (
    <div className="card-top">
      <div className="item-icon-frame">
        {imgError ? (
          <GameIcon name="plain-dagger" size={24} color="var(--gold-400)" />
        ) : (
          <img 
            src={item.image} 
            alt={item.name || item.title} 
            className="item-icon-img"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      <div className="card-info">
        <div className="card-title-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', minWidth: 0 }}>
          <h3 className="item-name" title={item.name || item.title}>
            {item.name || item.title}
          </h3>
          {item.powerLevel && (
            <span className={`power-level-crest ${getPowerTierClass(item.powerLevel)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <GameIcon name="flat-star" size={11} />
              <span>{item.powerLevel}</span>
            </span>
          )}
        </div>
        <span className="item-type-badge">{item.itemType}</span>
      </div>
    </div>
  );
}
