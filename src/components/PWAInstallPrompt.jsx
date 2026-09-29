import React from 'react';
import { Download, X, Share, PlusSquare, Smartphone, Tablet, WifiOff, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PWAInstallPrompt({ isOpen, onClose, deferredPrompt, onInstallClick }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Download size={22} color="var(--gold-400)" />
            <h3 className="modal-title" style={{ fontSize: '1.2rem' }}>
              Instalar Dragonwilds PWA
            </h3>
          </div>
          <button className="btn-fantasy btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Offline benefit banner */}
          <div style={{ background: 'rgba(72, 187, 120, 0.1)', border: '1px solid #48bb78', padding: '14px', borderRadius: '10px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <WifiOff size={24} color="#48bb78" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: '1.4' }}>
              <strong>100% Offline y Sin Anuncios:</strong> Una vez instalada, la base de datos de 1,348 objetos, recetas y estadísticas funciona completamente sin conexión a internet.
            </p>
          </div>

          {/* Direct Install Button if Browser supports beforeinstallprompt (Android / Chrome) */}
          {deferredPrompt && (
            <div style={{ textAlign: 'center', margin: '8px 0' }}>
              <button 
                className="btn-fantasy gold" 
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
                onClick={onInstallClick}
              >
                <Download size={18} />
                <span>Instalar Ahora en este Dispositivo</span>
              </button>
            </div>
          )}

          {/* iPad / iOS Safari Instructions */}
          <div className="recipe-section" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Tablet size={20} color="var(--gold-400)" />
              <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', fontSize: '0.95rem' }}>
                Instalación en iPad / iPhone (Safari)
              </h4>
            </div>

            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li>
                Abre esta web en <strong>Safari</strong> en tu iPad o iPhone.
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Pulsa el botón de <strong>Compartir</strong> <Share size={16} color="#63b3ed" /> (icono en la barra de Safari).
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Desplázate hacia abajo y selecciona <strong>"Añadir a pantalla de inicio"</strong> <PlusSquare size={16} color="var(--gold-400)" />.
              </li>
              <li>
                Pulsa <strong>"Añadir"</strong> en la esquina superior derecha. ¡Se abrirá como una app independiente a pantalla completa!
              </li>
            </ol>
          </div>

          {/* Android Chrome Instructions */}
          <div className="recipe-section" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Smartphone size={20} color="var(--gold-400)" />
              <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', fontSize: '0.95rem' }}>
                Instalación en Android (Chrome / Brave)
              </h4>
            </div>

            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li>Pulsa el menú de <strong>tres puntos (⋮)</strong> en la esquina superior derecha de tu navegador.</li>
              <li>Selecciona <strong>"Instalar aplicación"</strong> o <strong>"Añadir a pantalla de inicio"</strong>.</li>
            </ol>
          </div>
        </div>

        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--gold-border)', textAlign: 'right', background: 'rgba(10,13,18,0.8)' }}>
          <button className="btn-fantasy" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
