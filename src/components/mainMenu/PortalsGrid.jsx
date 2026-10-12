import React from 'react';
import { ChevronRight } from 'lucide-react';
import GameIcon from '../GameIcon';
import { getMainPortals } from './portalsConfig';

export default function PortalsGrid({
  allItemsCount,
  questsCount,
  spellsCount,
  setActiveView,
  setSelectedCategory
}) {
  const mainPortals = getMainPortals({
    allItemsCount,
    questsCount,
    spellsCount,
    setActiveView,
    setSelectedCategory
  });

  return (
    <section className="menu-portals-section">
      <div className="section-header-row">
        <div>
          <h2 className="section-main-title">PORTALES PRINCIPALES</h2>
          <p className="section-main-desc">Selecciona un módulo para explorar el contenido del juego</p>
        </div>
      </div>

      <div className="menu-portals-grid">
        {mainPortals.map((portal) => (
          <div
            key={portal.id}
            className="portal-card"
            onClick={portal.onClick}
            style={{
              '--portal-accent': portal.accentColor,
              '--portal-glow': portal.bgGlow,
              '--portal-border': portal.borderColor
            }}
          >
            <div className="portal-card-glow" />
            
            <div className="portal-header">
              <div className="portal-icon-wrapper">
                <GameIcon name={portal.icon} size={26} color={portal.accentColor} />
              </div>
              <span className="portal-tag">{portal.tag}</span>
            </div>

            <div className="portal-content">
              <h3 className="portal-title">{portal.title}</h3>
              <span className="portal-subtitle">{portal.subtitle}</span>
              <p className="portal-desc">{portal.desc}</p>
            </div>

            <div className="portal-footer">
              <span className="portal-action-text">Entrar al módulo</span>
              <div className="portal-arrow-circle">
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
