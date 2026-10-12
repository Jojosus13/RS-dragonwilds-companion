import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function MobileMoreDrawer({ activeView, setActiveView, onClose }) {
  const sections = [
    {
      id: 'vaults',
      name: 'Bóvedas Dragonkin (Cámaras)',
      icon: 'shield',
      color: '#63b3ed',
      badge: '12',
      badgeBg: 'rgba(66, 153, 225, 0.25)',
      badgeBorder: 'rgba(66, 153, 225, 0.4)'
    },
    {
      id: 'spells',
      name: 'Grimorio de Hechizos',
      icon: 'lightning-arc',
      color: '#b794f4'
    },
    {
      id: 'loadout',
      name: 'Simulador de Equipamiento',
      icon: 'breastplate',
      color: '#48bb78'
    },
    {
      id: 'planner',
      name: 'Calculadora de Crafteo',
      icon: 'hammer-drop',
      color: '#ecc94b'
    },
    {
      id: 'skills',
      name: 'Habilidades y Guías',
      icon: 'campfire',
      color: '#fc8181'
    },
    {
      id: 'lore',
      name: 'Códice y Lore de Ashenfall',
      icon: 'book-cover',
      color: '#d69e2e'
    },
    {
      id: 'favorites',
      name: 'Mis Objetos Favoritos',
      icon: 'flat-star',
      color: 'var(--gold-400)'
    }
  ];

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-400)' }}>
            <GameIcon name="sparkles" size={18} color="var(--gold-400)" />
            <h3 className="modal-title" style={{ fontSize: '1.1rem' }}>
              MÁS SECCIONES y GUÍAS
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px 20px' }}>
          {sections.map((sec) => {
            const isActive = activeView === sec.id;
            return (
              <button
                key={sec.id}
                className={`btn-fantasy ${isActive ? 'gold' : ''}`}
                style={{ justifyContent: 'space-between', padding: '12px 16px', fontSize: '0.9rem', textAlign: 'left' }}
                onClick={() => {
                  setActiveView(sec.id);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left', flex: 1, minWidth: 0 }}>
                  <GameIcon name={sec.icon} size={18} color={sec.color} />
                  <span style={{ textAlign: 'left', lineHeight: 1.3 }}>{sec.name}</span>
                </div>
                {sec.badge && (
                  <span
                    className="badge"
                    style={{
                      background: sec.badgeBg,
                      color: sec.color,
                      borderColor: sec.badgeBorder,
                      marginRight: '6px'
                    }}
                  >
                    {sec.badge}
                  </span>
                )}
                <ChevronRight size={16} style={{ flexShrink: 0, marginLeft: '8px' }} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
