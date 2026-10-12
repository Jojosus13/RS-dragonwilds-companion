import React from 'react';
import { Award } from 'lucide-react';

export default function QuestRewardsTab({ rewards }) {
  if (!rewards || rewards.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid var(--gold-500)' }}>
        <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: 'var(--gold-400)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Award size={16} />
          RECOMPENSAS POR COMPLETAR LA MISIÓN
        </h4>
        <ul style={{ paddingLeft: '20px', color: '#e2e8f0', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {rewards.map((rew, i) => (
            <li key={i} style={{ color: '#68d391', fontWeight: 500 }}>{rew}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
