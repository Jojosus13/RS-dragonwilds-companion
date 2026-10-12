import React from 'react';
import GameIcon from '../GameIcon';

export default function VaultResources({ resources }) {
  if (!resources) return null;

  return (
    <div className="vault-section-card">
      <div className="vault-section-header">
        <div className="vault-sec-title-wrap">
          <GameIcon name="sprout" size={20} color="#48bb78" />
          <h2>Recursos Extraíbles (Resources)</h2>
        </div>
      </div>

      <div className="vault-resources-grid">
        {resources.nodes && (
          <div className="resource-group-col">
            <h4>Yacimientos y Ventilas:</h4>
            <ul>
              {resources.nodes.map((node, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GameIcon name="mining" size={14} color="var(--gold-400)" />
                  <span>{node}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {resources.plants && resources.plants.length > 0 && (
          <div className="resource-group-col">
            <h4>Plantas y Hierbas:</h4>
            <ul>
              {resources.plants.map((plant, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GameIcon name="herbs-bundle" size={14} color="#48bb78" />
                  <span>{plant}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {resources.other && (
          <div className="resource-group-col">
            <h4>Objetos Especiales:</h4>
            <ul>
              {resources.other.map((oth, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GameIcon name="sparkles" size={14} color="var(--gold-400)" />
                  <span>{oth}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
