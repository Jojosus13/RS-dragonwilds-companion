import React from 'react';
import { X, MapPin, Check } from 'lucide-react';

export default function CustomMarkerModal({
  isOpen,
  onClose,
  coords,
  pinName,
  onPinNameChange,
  pinColor,
  onPinColorChange,
  pinNote,
  onPinNoteChange,
  onSave
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '420px', width: '90vw' }}
      >
        <div className="modal-header">
          <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="var(--gold-400)" />
            <span>Nuevo Marcador Personal</span>
          </h3>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '16px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Coordenadas: <strong>X: {coords.x} · Y: {coords.y}</strong>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold-400)', marginBottom: '4px', fontFamily: 'var(--font-title)' }}>
              Nombre del Marcador:
            </label>
            <input
              type="text"
              placeholder="Ej: Mina de Mithril Secreta, Campamento Base..."
              value={pinName}
              onChange={(e) => onPinNameChange(e.target.value)}
              className="fantasy-input"
              style={{ width: '100%' }}
              autoFocus
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold-400)', marginBottom: '4px', fontFamily: 'var(--font-title)' }}>
              Color del Marcador:
            </label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
              {['#ed8936', '#48bb78', '#4299e1', '#9f7aea', '#f56565', '#ecc94b'].map((col) => (
                <button
                  key={col}
                  onClick={() => onPinColorChange(col)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: col,
                    border: pinColor === col ? '3px solid #fff' : '2px solid transparent',
                    cursor: 'pointer',
                    boxShadow: pinColor === col ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
                  }}
                />
              ))}
            </div>
          </div>

          {pinNote !== undefined && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--gold-400)', marginBottom: '4px', fontFamily: 'var(--font-title)' }}>
                Nota / Descripción:
              </label>
              <textarea
                placeholder="Notas adicionales..."
                value={pinNote}
                onChange={(e) => onPinNoteChange(e.target.value)}
                className="fantasy-input"
                style={{ width: '100%', minHeight: '60px', resize: 'vertical' }}
              />
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button
              className="btn-fantasy gold"
              style={{ flex: 1, padding: '10px' }}
              onClick={onSave}
              disabled={!pinName.trim()}
            >
              <Check size={16} />
              <span>Guardar Marcador</span>
            </button>
            <button
              className="btn-fantasy"
              style={{ padding: '10px 14px' }}
              onClick={onClose}
            >
              <span>Cancelar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
