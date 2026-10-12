import React from 'react';
import GameIcon from '../GameIcon';

export default function VaultsHeroBanner({ totalVaults, totalChestsCount }) {
  return (
    <div className="vaults-header-banner">
      <div className="vaults-banner-content">
        <div className="vaults-banner-badge">
          <GameIcon name="shield" size={16} />
          <span>CÓDICE DRACONIS</span>
        </div>
        <h1 className="vaults-banner-title">Cámaras y Bóvedas Dragonkin</h1>
        <p className="vaults-banner-subtitle">
          Explora las 12 bóvedas ancestrales de Ashenfall. Guías completas con localización de cofres ilustrados, resolución de trampas, vestigios legendarios, recetas de forja y núcleos de tecnología perdida.
        </p>

        {/* Stats Bar */}
        <div className="vaults-stats-bar">
          <div className="vault-stat-item">
            <span className="stat-val">{totalVaults}</span>
            <span className="stat-lbl">Bóvedas Registradas</span>
          </div>
          <div className="vault-stat-divider" />
          <div className="vault-stat-item">
            <span className="stat-val">{totalChestsCount}+</span>
            <span className="stat-lbl">Cofres y Secretos</span>
          </div>
          <div className="vault-stat-divider" />
          <div className="vault-stat-item">
            <span className="stat-val">36</span>
            <span className="stat-lbl">Núcleos de Bóveda</span>
          </div>
          <div className="vault-stat-divider" />
          <div className="vault-stat-item">
            <span className="stat-val">10+</span>
            <span className="stat-lbl">Recetas y Vestigios</span>
          </div>
        </div>
      </div>
    </div>
  );
}
