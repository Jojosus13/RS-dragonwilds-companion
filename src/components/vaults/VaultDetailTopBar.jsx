import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function VaultDetailTopBar({
  onBack,
  onViewVaultOnMap,
  activeVault
}) {
  return (
    <div className="vault-detail-topbar">
      <button
        className="btn-fantasy btn-back"
        onClick={onBack}
      >
        <ArrowLeft size={16} />
        <span>Volver al Índice de Bóvedas</span>
      </button>

      <div className="vault-topbar-actions">
        <button
          className="btn-fantasy gold"
          onClick={() => onViewVaultOnMap(activeVault)}
          title="Ver ubicación exacta en el mapa de Ashenfall"
        >
          <GameIcon name="position-marker" size={16} />
          <span>Ver en el Mapa</span>
        </button>
        {activeVault.wikiUrl && (
          <a
            href={activeVault.wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-fantasy"
            title="Abrir página oficial de la Wiki"
          >
            <ExternalLink size={15} />
            <span>Wiki Oficial</span>
          </a>
        )}
      </div>
    </div>
  );
}
