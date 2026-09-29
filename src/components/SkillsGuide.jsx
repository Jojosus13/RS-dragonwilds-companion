import React from 'react';
import skillsData from '../data/skills.json';
import GameIcon from './GameIcon';

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
      <div>
        <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GameIcon name="sparkles" size={20} color="var(--gold-400)" />
          Habilidades de Dragón y Supervivencia (8)
        </h3>

        <div className="items-grid">
          {skills.map((skill) => (
            <div key={skill.id} className="item-card" style={{ cursor: 'default' }}>
              <div className="card-top">
                <div className="item-icon-frame" style={{ width: '48px', height: '48px' }}>
                  <GameIcon name={skill.icon} size={28} color="var(--gold-400)" />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', fontSize: '1.05rem' }}>
                    {skill.name}
                  </h4>
                  <span className="item-type-badge">{skill.category}</span>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                {skill.description}
              </p>

              <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold-500)', display: 'block', fontWeight: 'bold' }}>
                  Tomo: {skill.tomes}
                </span>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginTop: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <GameIcon name="light-bulb" size={14} color="var(--gold-400)" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{skill.tips}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. FACILITIES y WORKSTATIONS */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GameIcon name="hammer-drop" size={20} color="#ecc94b" />
          Estaciones de Fabricación (Facilities)
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {facilities.map((fac, idx) => (
            <div key={idx} className="recipe-section" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div className="item-icon-frame" style={{ width: '36px', height: '36px', flexShrink: 0 }}>
                  <GameIcon name={fac.icon} size={22} color="var(--gold-400)" />
                </div>
                <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', fontSize: '1rem' }}>
                  {fac.name}
                </h4>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                {fac.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. REGIONS OF ASHENFALL */}
      <div>
        <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GameIcon name="position-marker" size={20} color="#63b3ed" />
          Regiones de Ashenfall y Niveles de Peligro
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
          {regions.map((reg, idx) => (
            <div key={idx} className="recipe-section" style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', fontSize: '1rem' }}>
                  {reg.name}
                </h4>
                <span className="power-level-crest tier-8-9" style={{ fontSize: '0.7rem' }}>
                  {reg.danger}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                {reg.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
