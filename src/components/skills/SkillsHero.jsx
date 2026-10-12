import React from 'react';
import GameIcon from '../GameIcon';

export default function SkillsHero() {
  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--gold-border)', borderRadius: '16px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <GameIcon name="treasure-map" size={28} color="var(--gold-400)" />
        <h2 style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.4rem', color: 'var(--gold-300)' }}>
          Guía de Supervivencia y Habilidades en Ashenfall
        </h2>
      </div>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
        En <em>RuneScape: Dragonwilds</em>, el avance de tu personaje combina recolección, forja y combate en un mundo salvaje dominado por remanentes Dragonkin. Conoce las 8 disciplinas fundamentales, las estaciones de crafteo y las regiones de peligro.
      </p>
    </div>
  );
}
