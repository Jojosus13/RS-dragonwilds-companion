import React from 'react';
import { ChevronRight } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function ChapterSelector({ chapters, activeChapterId, onSelectChapter }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span
        style={{
          fontSize: '0.75rem',
          fontFamily: 'var(--font-title)',
          color: 'var(--gold-500)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '4px'
        }}
      >
        CAPÍTULOS DEL CÓDICE
      </span>
      {chapters.map((chap) => {
        const isActive = chap.id === activeChapterId;
        return (
          <button
            key={chap.id}
            onClick={() => onSelectChapter(chap.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              background: isActive ? 'rgba(212, 175, 55, 0.15)' : 'var(--bg-card)',
              border: isActive ? '1px solid var(--gold-400)' : '1px solid var(--gold-border)',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'var(--gold-300)' : 'var(--text-primary)',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isActive ? '0 0 12px var(--gold-glow)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {chap.icon && (
                <div style={{ color: isActive ? 'var(--gold-400)' : 'var(--text-muted)' }}>
                  <GameIcon name={chap.icon} size={20} />
                </div>
              )}
              <div>
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.95rem', margin: '0 0 4px 0' }}>
                  {chap.title}
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {chap.category}
                </span>
              </div>
            </div>
            <ChevronRight size={16} color={isActive ? 'var(--gold-400)' : 'var(--text-muted)'} />
          </button>
        );
      })}
    </div>
  );
}
