import React from 'react';
import { FileText } from 'lucide-react';

export default function UpdateChangelog({ releaseName, releaseNotes }) {
  const lines = releaseNotes 
    ? releaseNotes.split('\n').filter(l => l.trim().length > 0)
    : [];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
        <FileText size={15} color="var(--gold-400)" />
        <h4 style={{ fontSize: '0.88rem', color: 'var(--gold-300)', fontFamily: 'var(--font-title)', margin: 0 }}>
          {releaseName || 'Novedades de la versión'}
        </h4>
      </div>

      <div className="update-notes-container" style={{
        maxHeight: '160px',
        overflowY: 'auto',
        background: 'rgba(5, 7, 10, 0.6)',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        fontSize: '0.88rem',
        lineHeight: '1.5',
        color: '#cbd5e1'
      }}>
        {lines.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Mejoras de rendimiento y correcciones de estabilidad.
          </p>
        ) : (
          lines.map((line, idx) => {
            const trimmed = line.trim();
            if (trimmed.startsWith('#')) {
              return (
                <h5 key={idx} style={{ 
                  color: 'var(--gold-400)', 
                  margin: '8px 0 4px 0', 
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-title)'
                }}>
                  {trimmed.replace(/^#+\s*/, '')}
                </h5>
              );
            }
            if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
              return (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', margin: '4px 0' }}>
                  <span style={{ color: 'var(--gold-400)', marginTop: '2px' }}>•</span>
                  <span>{trimmed.replace(/^[-*]\s*/, '')}</span>
                </div>
              );
            }
            return <p key={idx} style={{ margin: '4px 0' }}>{trimmed}</p>;
          })
        )}
      </div>
    </div>
  );
}
