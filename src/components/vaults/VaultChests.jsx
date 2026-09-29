import React from 'react';
import { Layers, Info, Maximize2, Shield } from 'lucide-react';

export default function VaultChests({ chests, onZoomImage }) {
  if (!chests || chests.length === 0) return null;

  return (
    <div className="vault-section-card">
      <div className="vault-section-header">
        <div className="vault-sec-title-wrap">
          <Layers size={20} color="#63b3ed" />
          <h2>Cofres del Tesoro y Secretos (Chests Guide)</h2>
        </div>
        <span className="vault-sec-count">{chests.length} Cofres</span>
      </div>

      <p className="vault-chests-intro">
        Cada cofre contiene planos arcanos, fragmentos de tecnología Dragonkin, runas y gemas. Haz clic en las imágenes para ampliarlas y ver los puntos de salto (Windstep) y caminos secretos.
      </p>

      <div className="vault-chests-list">
        {chests.map((ch, idx) => (
          <div key={ch.id || idx} className="vault-chest-card">
            <div className="chest-text-col">
              <div className="chest-number-badge">
                <span>COFRE #{ch.id || idx + 1}</span>
              </div>
              <h3 className="chest-title">{ch.title}</h3>
              <p className="chest-instructions">{ch.instructions}</p>

              {ch.caption && (
                <div className="chest-tip-pill">
                  <Info size={14} />
                  <span>{ch.caption}</span>
                </div>
              )}
            </div>

            {/* Chest Screenshot Column */}
            {ch.image ? (
              <div
                className="chest-image-col"
                onClick={() => onZoomImage({ src: ch.image, caption: ch.title || ch.caption })}
                title="Haz clic para ampliar la imagen"
              >
                <img
                  src={ch.image}
                  alt={ch.title || `Cofre ${idx + 1}`}
                  className="chest-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.parentElement.style.display = 'none';
                  }}
                />
                <div className="chest-zoom-overlay">
                  <Maximize2 size={18} />
                  <span>Ampliar</span>
                </div>
              </div>
            ) : (
              <div className="chest-no-image-placeholder">
                <Shield size={24} color="rgba(255,255,255,0.2)" />
                <span>Sin captura disponible</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
