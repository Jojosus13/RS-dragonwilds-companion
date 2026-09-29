import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import GameIcon from '../common/GameIcon';

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
      {/* Fixed 5-Tab Bottom Dock for Mobile with Elevated Golden Center Home Button */}
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

        {/* 3. Central Prominent Elevated Home Button */}
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

      {/* Mobile "Más" Bottom Sheet Drawer */}
      {isMoreMenuOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsMoreMenuOpen(false)}
          style={{ alignItems: 'flex-end', padding: 0 }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '100%',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              paddingBottom: 'calc(var(--bottom-dock-height) + 20px)',
              background: 'rgba(14, 18, 24, 0.98)',
              borderTop: '2px solid var(--gold-500)',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.9)'
            }}
          >
            <div
              className="modal-header"
              style={{
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--gold-400)'
                }}
              >
                <GameIcon name="sparkles" size={18} color="var(--gold-400)" />
                <h3 className="modal-title" style={{ fontSize: '1.1rem' }}>
                  MÁS SECCIONES y GUÍAS
                </h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setIsMoreMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                padding: '16px 20px'
              }}
            >
              {/* Bóvedas Dragonkin */}
              <button
                className={`btn-fantasy ${activeView === 'vaults' ? 'gold' : ''}`}
                style={{
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  fontSize: '0.9rem',
                  textAlign: 'left'
                }}
                onClick={() => {
                  setActiveView('vaults');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  <GameIcon name="shield" size={18} color="#63b3ed" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>
                    Bóvedas Dragonkin (Cámaras)
                  </span>
                </div>
                <span
                  className="badge"
                  style={{
                    background: 'rgba(66, 153, 225, 0.25)',
                    color: '#63b3ed',
                    borderColor: 'rgba(66, 153, 225, 0.4)',
                    marginRight: '6px'
                  }}
                >
                  12
                </span>
                <ChevronRight size={16} style={{ flexShrink: 0 }} />
              </button>

              <button
                className={`btn-fantasy ${activeView === 'spells' ? 'gold' : ''}`}
                style={{
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  fontSize: '0.9rem',
                  textAlign: 'left'
                }}
                onClick={() => {
                  setActiveView('spells');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  <GameIcon name="lightning-arc" size={18} color="#b794f4" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>
                    Grimorio de Hechizos
                  </span>
                </div>
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>

              <button
                className={`btn-fantasy ${activeView === 'loadout' ? 'gold' : ''}`}
                style={{
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  fontSize: '0.9rem',
                  textAlign: 'left'
                }}
                onClick={() => {
                  setActiveView('loadout');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  <GameIcon name="breastplate" size={18} color="#48bb78" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>
                    Simulador de Equipamiento
                  </span>
                </div>
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>

              <button
                className={`btn-fantasy ${activeView === 'planner' ? 'gold' : ''}`}
                style={{
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  fontSize: '0.9rem',
                  textAlign: 'left'
                }}
                onClick={() => {
                  setActiveView('planner');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  <GameIcon name="hammer-drop" size={18} color="#ecc94b" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>
                    Calculadora de Crafteo
                  </span>
                </div>
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>

              <button
                className={`btn-fantasy ${activeView === 'skills' ? 'gold' : ''}`}
                style={{
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  fontSize: '0.9rem',
                  textAlign: 'left'
                }}
                onClick={() => {
                  setActiveView('skills');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  <GameIcon name="campfire" size={18} color="#fc8181" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>
                    Habilidades y Guías
                  </span>
                </div>
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>

              <button
                className={`btn-fantasy ${activeView === 'lore' ? 'gold' : ''}`}
                style={{
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  fontSize: '0.9rem',
                  textAlign: 'left'
                }}
                onClick={() => {
                  setActiveView('lore');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  <GameIcon name="book-cover" size={18} color="#d69e2e" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>
                    Códice y Lore de Ashenfall
                  </span>
                </div>
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>

              <button
                className={`btn-fantasy ${activeView === 'favorites' ? 'gold' : ''}`}
                style={{
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  fontSize: '0.9rem',
                  textAlign: 'left'
                }}
                onClick={() => {
                  setActiveView('favorites');
                  setIsMoreMenuOpen(false);
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  <GameIcon name="flat-star" size={18} color="var(--gold-400)" />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>
                    Mis Objetos Favoritos
                  </span>
                </div>
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
