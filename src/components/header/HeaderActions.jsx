import React from 'react';
import GameIcon from '../GameIcon';

export default function HeaderActions({
  activeView,
  setActiveView,
  favoritesCount,
  plannerCount,
  isInstalled,
  onOpenInstallModal
}) {
  return (
    <div className="header-actions">
      {/* Botón rápido de Crafteo (escritorio y tablet) */}
      <button 
        className={`btn-fantasy desktop-only-action ${activeView === 'planner' ? 'gold' : ''}`}
        onClick={() => setActiveView('planner')}
        title="Calculadora de Crafteo / Lista de Materiales"
      >
        <GameIcon name="hammer-drop" size={16} />
        <span>Crafteo</span>
        {plannerCount > 0 && <span className="badge">{plannerCount}</span>}
      </button>

      {/* Botón rápido de Favoritos (escritorio y tablet) */}
      <button 
        className={`btn-fantasy desktop-only-action ${activeView === 'favorites' ? 'gold' : ''}`}
        onClick={() => setActiveView('favorites')}
        title="Ítems Guardados en Favoritos"
      >
        <GameIcon name="flat-star" size={16} />
        <span>Favoritos</span>
        {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
      </button>

      {/* Botón de Instalación PWA (visible solo si no está instalada la app) */}
      {!isInstalled && (
        <button 
          className="btn-fantasy gold install-header-btn" 
          onClick={onOpenInstallModal}
          title="Instalar en Móvil / iPad (Modo Offline)"
        >
          <GameIcon name="sprint" size={16} />
          <span>Instalar App</span>
        </button>
      )}
    </div>
  );
}
