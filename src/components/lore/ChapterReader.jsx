import React from 'react';
import { Scroll } from 'lucide-react';

export default function ChapterReader({ activeChapter }) {
  if (!activeChapter) return null;

  return (
    <div
      className="lore-box"
      style={{
        gridColumn: 'span 2',
        padding: '30px',
        background: 'rgba(16, 20, 28, 0.95)',
        border: '1px solid var(--gold-border)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
        minHeight: '400px'
      }}
    >
      <span className="lore-quote-icon">“</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-400)', marginBottom: '8px' }}>
        <Scroll size={20} />
        <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-title)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          {activeChapter.category}
        </span>
      </div>

      <h3 style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.5rem', color: 'var(--gold-300)', marginBottom: '14px' }}>
        {activeChapter.title}
      </h3>

      <div
        style={{
          background: 'rgba(255,255,255,0.03)',
          padding: '12px 16px',
          borderRadius: '8px',
          borderLeft: '3px solid var(--gold-500)',
          marginBottom: '20px'
        }}
      >
        <p style={{ fontStyle: 'italic', color: '#e2e8f0', fontSize: '0.95rem', margin: 0 }}>
          {activeChapter.summary}
        </p>
      </div>

      <div style={{ color: '#cbd5e0', fontSize: '1rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
        {activeChapter.content}
      </div>
    </div>
  );
}
