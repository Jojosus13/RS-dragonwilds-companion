import React from 'react';

export default function HeaderBrand({ onNavigateHome }) {
  return (
    <div 
      className="header-brand" 
      onClick={onNavigateHome}
      title="Ir al Menú de Inicio"
    >
      <img src="/icon.svg" alt="Dragonwilds Logo" className="brand-icon" />
      <div>
        <h1 className="brand-title">DRAGONWILDS</h1>
        <span className="brand-subtitle">Códice y Guía PWA</span>
      </div>
    </div>
  );
}
