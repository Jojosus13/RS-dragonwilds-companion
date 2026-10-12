import React from 'react';
import { Swords } from 'lucide-react';

export default function QuestEnemiesTab({ enemies }) {
  if (!enemies || enemies.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid var(--color-combat)' }}>
        <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#fc8181', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Swords size={16} />
          ENEMIGOS Y PELIGROS EN ESTA MISIÓN
        </h4>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-primary)', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {enemies.map((enemy, i) => (
            <li key={i} style={{ color: '#feb2b2' }}>{enemy}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
