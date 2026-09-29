import React from 'react';
import GameIcon from '../GameIcon';
import skillsData from '../../data/skills.json';
import SkillsSection from './SkillsSection';
import FacilitiesSection from './FacilitiesSection';
import RegionsSection from './RegionsSection';

export default function SkillsGuide() {
  const { skills, facilities, regions } = skillsData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      {/* Intro Hero */}
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

      {/* 1. SKILLS SECTION */}
      <SkillsSection skills={skills} />

      {/* 2. FACILITIES and WORKSTATIONS */}
      <FacilitiesSection facilities={facilities} />

      {/* 3. REGIONS OF ASHENFALL */}
      <RegionsSection regions={regions} />
    </div>
  );
}
