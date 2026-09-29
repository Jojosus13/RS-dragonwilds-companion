import React from 'react';
import { ChevronRight } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function PortalsGrid({
  allItemsCount,
  questsCount,
  spellsCount,
  setActiveView,
  setSelectedCategory
}) {
  const mainPortals = [
    {
      id: 'catalog',
      title: 'Explorador de Ítems',
      subtitle: `${allItemsCount || 200}+ Objetos y Equipos`,
      desc: 'Códice completo de armas, armaduras, herramientas, consumibles, recetas y estadísticas.',
      icon: 'swap-bag',
      tag: 'Códice',
      accentColor: 'var(--gold-400)',
      bgGlow: 'rgba(212, 175, 55, 0.15)',
      borderColor: 'rgba(212, 175, 55, 0.35)',
      onClick: () => {
        setSelectedCategory(null);
        setActiveView('catalog');
      }
    },
    {
      id: 'map',
      title: 'Mapa de Ashenfall',
      subtitle: 'POIs, Jefes y Rutas',
      desc: 'Mapa interactivo con capas de canteras, yacimientos, teletransportes y marcadores de misiones.',
      icon: 'treasure-map',
      tag: 'Interactivo',
      accentColor: '#63b3ed',
      bgGlow: 'rgba(66, 153, 225, 0.15)',
      borderColor: 'rgba(66, 153, 225, 0.35)',
      onClick: () => setActiveView('map')
    },
    {
      id: 'vaults',
      title: 'Bóvedas Dragonkin',
      subtitle: '12 Cámaras y Cofres Secretos',
      desc: 'Guías de mazmorras ancestrales, trampas, efigies de forja, núcleos de tecnología y capturas de cofres.',
      icon: 'shield',
      tag: 'Mazmorras',
      accentColor: '#63b3ed',
      bgGlow: 'rgba(66, 153, 225, 0.18)',
      borderColor: 'rgba(66, 153, 225, 0.4)',
      onClick: () => setActiveView('vaults')
    },
    {
      id: 'quests',
      title: 'Misiones y Aventuras',
      subtitle: `${questsCount || 39} Quests Disponibles`,
      desc: 'Guías de misiones paso a paso, ubicación de PNJs, requerimientos y recompensas de experiencia.',
      icon: 'tied-scroll',
      tag: 'Aventuras',
      accentColor: '#f6ad55',
      bgGlow: 'rgba(237, 137, 54, 0.15)',
      borderColor: 'rgba(237, 137, 54, 0.35)',
      onClick: () => setActiveView('quests')
    },
    {
      id: 'spells',
      title: 'Grimorio de Hechizos',
      subtitle: `${spellsCount || 42} Conjuros Arcanos`,
      desc: 'Magia de combate, runas elementales requeridas, niveles necesarios y tiempos de recarga.',
      icon: 'lightning-arc',
      tag: 'Magia',
      accentColor: '#b794f4',
      bgGlow: 'rgba(128, 90, 213, 0.15)',
      borderColor: 'rgba(128, 90, 213, 0.35)',
      onClick: () => setActiveView('spells')
    },
    {
      id: 'loadout',
      title: 'Simulador de Equipo',
      subtitle: 'Calculadora de Estadísticas',
      desc: 'Configura tus 8 ranuras de combate, armas, protecciones y optimiza tu build de personaje.',
      icon: 'breastplate',
      tag: 'Builds',
      accentColor: '#48bb78',
      bgGlow: 'rgba(72, 187, 120, 0.15)',
      borderColor: 'rgba(72, 187, 120, 0.35)',
      onClick: () => setActiveView('loadout')
    },
    {
      id: 'planner',
      title: 'Calculadora de Crafteo',
      subtitle: 'Planificador de Materiales',
      desc: 'Calcula los ingredientes en cadena, lingotes y minerales necesarios para forjar tu equipamiento.',
      icon: 'hammer-drop',
      tag: 'Artesanía',
      accentColor: '#ecc94b',
      bgGlow: 'rgba(236, 201, 75, 0.15)',
      borderColor: 'rgba(236, 201, 75, 0.35)',
      onClick: () => setActiveView('planner')
    },
    {
      id: 'skills',
      title: 'Guía de Habilidades',
      subtitle: 'Entrenamiento y Supervivencia',
      desc: 'Aprende las mejores técnicas para subir Minería, Herrería, Combate, Cocina y Artesanía.',
      icon: 'campfire',
      tag: 'Guías',
      accentColor: '#fc8181',
      bgGlow: 'rgba(245, 101, 101, 0.15)',
      borderColor: 'rgba(245, 101, 101, 0.35)',
      onClick: () => setActiveView('skills')
    },
    {
      id: 'lore',
      title: 'Códice y Crónicas',
      subtitle: 'Historia de Ashenfall',
      desc: 'Descubre los misterios de los Dragones Ancestrales, el Rey de Ashenfall y las ruinas olvidadas.',
      icon: 'book-cover',
      tag: 'Lore',
      accentColor: '#d69e2e',
      bgGlow: 'rgba(214, 158, 46, 0.15)',
      borderColor: 'rgba(214, 158, 46, 0.35)',
      onClick: () => setActiveView('lore')
    }
  ];

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
