import React from 'react';
import { X } from 'lucide-react';
import GameIcon from '../../GameIcon';

export default function ItemModalHeader({
  item,
  onClose,
  imgError,
  setImgError,
  getPowerTierClass
}) {
  return (
    <div className="modal-header">
      <div className="modal-header-info">
        <div className="item-icon-frame" style={{ width: '60px', height: '60px' }}>
          {imgError ? (
            <GameIcon name="crossed-swords" size={32} color="var(--gold-400)" />
          ) : (
            <img
              src={item.image}
              alt={item.name}
              className="item-icon-img"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 className="modal-title">{item.name}</h2>
            {item.powerLevel && (
              <span className={`power-level-crest ${getPowerTierClass(item.powerLevel)}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <GameIcon name="flat-star" size={12} />
                <span>{item.powerLevel}</span>
              </span>
            )}
          </div>
          <span className="item-type-badge">{item.itemType} · {item.category}</span>
        </div>
      </div>

      <button className="btn-fantasy btn-icon" onClick={onClose} title="Cerrar">
        <X size={20} />
      </button>
    </div>
  );
}
