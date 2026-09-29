import React from 'react';
import { AlertTriangle, Flame } from 'lucide-react';

export default function VaultHazards({ hazards }) {
  if (!hazards || hazards.length === 0) return null;

  return (
    <div className="vault-section-card">
      <div className="vault-section-header">
        <div className="vault-sec-title-wrap">
          <AlertTriangle size={20} color="#f6ad55" />
          <h2>Peligros y Trampas (Hazards)</h2>
        </div>
        <span className="vault-sec-count">{hazards.length} Trampas</span>
      </div>

      <div className="vault-hazards-grid">
        {hazards.map((hz, idx) => (
          <div key={idx} className="vault-hazard-item">
            <div className="hazard-icon-col">
              <Flame size={18} color="#fc8181" />
            </div>
            <div className="hazard-info-col">
              <div className="hazard-title-row">
                <h4>{hz.name}</h4>
                {hz.type && <span className="hazard-type-tag">{hz.type}</span>}
              </div>
              <p className="hazard-desc">{hz.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
