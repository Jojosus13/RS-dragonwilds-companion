import React from 'react';
import { Rocket, X } from 'lucide-react';

export default function UpdateHeader({ onClose, canClose }) {
  return (
    <div className="modal-header" style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.25)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.05))',
          padding: '8px',
          borderRadius: '8px',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Rocket size={22} color="var(--gold-400)" />
        </div>
        <div>
          <h3 className="modal-title" style={{ fontSize: '1.15rem', color: '#f7fafc' }}>
            Nueva Actualización Disponible
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', letterSpacing: '0.5px' }}>
            COMPENDIO DRAGONWILDS
          </span>
        </div>
      </div>
      {canClose && (
        <button className="btn-fantasy btn-icon" onClick={onClose} title="Cerrar">
          <X size={18} />
        </button>
      )}
    </div>
  );
}
