import React from 'react';
import { Sparkles } from 'lucide-react';

export default function SkillsSection({ skills }) {
  return (
    <div>
      <h3
        style={{
          fontFamily: 'var(--font-title)',
          color: 'var(--gold-400)',
          fontSize: '1.15rem',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Sparkles size={20} />
        Habilidades de Dragón y Supervivencia ({skills.length})
      </h3>

      <div className="items-grid">
        {skills.map((skill) => (
          <div key={skill.id} className="item-card" style={{ cursor: 'default' }}>
            <div className="card-top">
              <div className="item-icon-frame" style={{ width: '48px', height: '48px', fontSize: '1.6rem' }}>
                {skill.icon}
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
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                💡 {skill.tips}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
