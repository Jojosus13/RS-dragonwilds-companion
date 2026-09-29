import React from 'react';
import { X, ExternalLink } from 'lucide-react';

export default function SpellDetailModal({ spell, onClose }) {
  if (!spell) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="item-icon-frame" style={{ width: '48px', height: '48px', padding: '4px' }}>
              <img
                src={spell.image}
                alt={spell.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onError={(e) => {
                  if (spell.remoteImage && e.target.src !== spell.remoteImage) {
                    e.target.src = spell.remoteImage;
                  } else {
                    e.target.style.display = 'none';
                  }
                }}
              />
            </div>
            <div>
              <h3 className="modal-title" style={{ margin: 0 }}>{spell.name}</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                {spell.englishTitle} • Nivel de Magia {spell.magicLevel}
              </span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid #9f7aea' }}>
            <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#d6bcfa', marginBottom: '6px' }}>
              EFECTO DEL HECHIZO
            </h4>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
              {spell.effect}
            </p>
          </div>

          <div className="recipe-section" style={{ padding: '14px' }}>
            <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: 'var(--gold-400)', marginBottom: '8px' }}>
              COSTE DE RUNAS POR LANZAMIENTO
            </h4>
            {spell.runes && spell.runes.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {spell.runes.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 12px',
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}
                  >
                    <span style={{ color: '#fff', fontSize: '0.9rem' }}>{r.rune}</span>
                    <strong style={{ color: 'var(--gold-400)', fontSize: '0.95rem' }}>{r.qty} unidades</strong>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#68d391', fontSize: '0.9rem', margin: 0 }}>
                Este hechizo no consume runas (habilidad básica o teletransporte de retorno).
              </p>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <a
              href={spell.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fantasy"
              style={{
                width: '100%',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                textDecoration: 'none'
              }}
            >
              <span>Ver en Dragonwilds Wiki</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
