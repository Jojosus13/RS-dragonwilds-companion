import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import HeaderBrand from './HeaderBrand';
import HeaderActions from './HeaderActions';

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

  const handleNavigateHome = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <header className="site-header">
      <HeaderBrand onNavigateHome={handleNavigateHome} />
      <HeaderActions
        activeView={activeView}
        setActiveView={setActiveView}
        favoritesCount={favoritesCount}
        plannerCount={plannerCount}
        isInstalled={isInstalled}
        onOpenInstallModal={onOpenInstallModal}
      />
    </header>
  );
}
