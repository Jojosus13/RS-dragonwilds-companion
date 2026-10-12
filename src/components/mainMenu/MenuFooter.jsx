import React from 'react';
import { Rocket, RefreshCw } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { APP_VERSION } from '../../utils/version';

export default function MenuFooter({
  onCheckForUpdates = () => {},
  isCheckingUpdate = false,
  updateInfo = null,
  updateCheckMessage = null,
  onOpenUpdateModal = () => {}
}) {
  const isNativeApp = typeof window !== 'undefined' && (
    Capacitor.isNativePlatform() || 
    window.Capacitor?.isNativePlatform?.() || 
    (window.Capacitor && window.Capacitor.getPlatform() !== 'web') ||
    window.location.protocol === 'capacitor:' ||
    (window.location.protocol === 'https:' && window.location.hostname === 'localhost')
  );

  return (
    <footer className="menu-footer">
      <div className="menu-footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src="/icon.svg" alt="Dragonwilds Logo" className="footer-logo" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <p className="footer-title" style={{ margin: 0 }}>RuneScape: Dragonwilds Companion</p>
              {isNativeApp && (
                <span style={{
                  fontSize: '0.72rem',
                  background: 'rgba(212, 175, 55, 0.15)',
                  color: 'var(--gold-400)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  padding: '1px 7px',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}>
                  v{APP_VERSION}
                </span>
              )}
            </div>
            <p className="footer-sub" style={{ margin: '4px 0 0 0' }}>
              Compendio no oficial y base de datos interactiva para Ashenfall.
            </p>
          </div>
        </div>

        {/* Update Action Button & Feedback (Only in native Android APK) */}
        {isNativeApp && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            {updateInfo?.hasUpdate ? (
              <button
                className="btn-fantasy gold"
                onClick={onOpenUpdateModal}
                style={{
                  fontSize: '0.82rem',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  animation: 'pulse 2s infinite'
                }}
                title="Nueva versión disponible en GitHub"
              >
                <Rocket size={15} />
                <span>Actualizar a v{updateInfo.latestVersion}</span>
              </button>
            ) : (
              <button
                className="btn-fantasy"
                onClick={onCheckForUpdates}
                disabled={isCheckingUpdate}
                style={{
                  fontSize: '0.8rem',
                  padding: '7px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  opacity: isCheckingUpdate ? 0.7 : 1
                }}
                title="Comprobar si hay nuevas releases en GitHub"
              >
                <RefreshCw size={14} className={isCheckingUpdate ? 'spin-animation' : ''} />
                <span>{isCheckingUpdate ? 'Buscando...' : 'Buscar Actualizaciones'}</span>
              </button>
            )}

            {updateCheckMessage && (
              <div style={{
                fontSize: '0.75rem',
                color: updateCheckMessage.includes('dia') || updateCheckMessage.includes('reciente') ? '#68d391' : 'var(--gold-300)',
                background: 'rgba(10, 15, 20, 0.8)',
                padding: '3px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {updateCheckMessage}
              </div>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
