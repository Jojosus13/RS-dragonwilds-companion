import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import GameIcon from '../GameIcon';
import MobileMoreDrawer from './MobileMoreDrawer';

export default function MobileBottomNav({
  activeView,
  setActiveView,
  setSelectedCategory
}) {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const isMoreActive = [
    'spells',
    'vaults',
    'loadout',
    'planner',
    'skills',
    'lore',
    'favorites'
  ].includes(activeView);

  return (
    <>
      {/* Barra de Navegación Fija Inferior (5 Pestañas) */}
      <nav className="bottom-dock">
        {/* 1. Ítems */}
        <button
          className={`dock-item ${activeView === 'catalog' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('catalog');
            setSelectedCategory(null);
            setIsMoreMenuOpen(false);
          }}
        >
          <GameIcon name="swap-bag" size={19} />
          <span>Ítems</span>
        </button>

        {/* 2. Misiones */}
        <button
          className={`dock-item ${activeView === 'quests' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('quests');
            setIsMoreMenuOpen(false);
          }}
        >
          <GameIcon name="tied-scroll" size={19} />
          <span>Misiones</span>
        </button>

        {/* 3. Botón Central Flotante y Elevado de Inicio */}
        <button
          className={`dock-item dock-item-center-fab ${activeView === 'home' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('home');
            setIsMoreMenuOpen(false);
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          }}
          title="Menú Principal (Inicio)"
        >
          <div className="center-fab-circle">
            <GameIcon name="castle" size={21} className="center-fab-icon" />
            <span className="center-fab-label">Inicio</span>
          </div>
        </button>

        {/* 4. Mapa */}
        <button
          className={`dock-item ${activeView === 'map' ? 'active' : ''}`}
          onClick={() => {
            setActiveView('map');
            setIsMoreMenuOpen(false);
          }}
        >
          <GameIcon name="treasure-map" size={19} />
          <span>Mapa</span>
        </button>

        {/* 5. Más */}
        <button
          className={`dock-item ${isMoreActive || isMoreMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMoreMenuOpen((prev) => !prev)}
        >
          <Menu size={19} />
          <span>Más</span>
        </button>
      </nav>

      {/* Drawer Desplegable para Móvil */}
      {isMoreMenuOpen && (
        <MobileMoreDrawer
          activeView={activeView}
          setActiveView={setActiveView}
          onClose={() => setIsMoreMenuOpen(false)}
        />
      )}
    </>
  );
}
