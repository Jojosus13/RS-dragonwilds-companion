import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import GameIcon from './common/GameIcon';

export default function Header({ 
  activeView, 
  setActiveView, 
  favoritesCount, 
  plannerCount, 
  onOpenInstallModal 
}) {
  const isNative = typeof window !== 'undefined' && (
    Capacitor.isNativePlatform() || 
    window.Capacitor?.isNativePlatform?.() || 
    (window.Capacitor && window.Capacitor.getPlatform() !== 'web') ||
    window.location.protocol === 'capacitor:' ||
    (window.location.protocol === 'https:' && window.location.hostname === 'localhost')
  );

  const [isInstalled, setIsInstalled] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (isNative) return true;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://')
    );
  });

  useEffect(() => {
    if (isNative) {
      setIsInstalled(true);
      return;
    }

    const matchMedia = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e) => setIsInstalled(e.matches);
    try {
      matchMedia.addEventListener('change', handleChange);
    } catch {
      matchMedia.addListener?.(handleChange);
    }

    const handleAppInstalled = () => {
      setIsInstalled(true);
    };
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      try {
        matchMedia.removeEventListener('change', handleChange);
      } catch {
        matchMedia.removeListener?.(handleChange);
      }
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isNative]);

  return (
    <header className="site-header">
      <div 
        className="header-brand" 
        onClick={() => {
          setActiveView('home');
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }}
        title="Ir al Menú de Inicio"
      >
        <img src="/icon.svg" alt="Dragonwilds Logo" className="brand-icon" />
        <div>
          <h1 className="brand-title">DRAGONWILDS</h1>
          <span className="brand-subtitle">Códice y Guía PWA</span>
        </div>
      </div>

      <div className="header-actions">
        {/* Planner Quick Button (Desktop / Tablet only, since mobile has bottom dock) */}
        <button 
          className={`btn-fantasy desktop-only-action ${activeView === 'planner' ? 'gold' : ''}`}
          onClick={() => setActiveView('planner')}
          title="Calculadora de Crafteo / Lista de Materiales"
        >
          <GameIcon name="hammer-drop" size={16} />
          <span>Crafteo</span>
          {plannerCount > 0 && <span className="badge">{plannerCount}</span>}
        </button>

        {/* Favorites Quick Button (Desktop / Tablet only) */}
        <button 
          className={`btn-fantasy desktop-only-action ${activeView === 'favorites' ? 'gold' : ''}`}
          onClick={() => setActiveView('favorites')}
          title="Ítems Guardados en Favoritos"
        >
          <GameIcon name="flat-star" size={16} />
          <span>Favoritos</span>
          {favoritesCount > 0 && <span className="badge">{favoritesCount}</span>}
        </button>

        {/* PWA Install Button (Visible ONLY when not yet installed) */}
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
    </header>
  );
}
