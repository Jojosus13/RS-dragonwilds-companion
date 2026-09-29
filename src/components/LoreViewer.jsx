import React, { useState } from 'react';
import { 
  BookOpen, 
  Feather, 
  MapPin, 
  Shield, 
  Sparkles, 
  Flame, 
  Scroll,
  Layers,
  ChevronRight
} from 'lucide-react';
import loreData from '../data/lore.json';

export default function LoreViewer() {
  const [activeChapterId, setActiveChapterId] = useState(loreData.chapters[0].id);

  const activeChapter = loreData.chapters.find((c) => c.id === activeChapterId) || loreData.chapters[0];

  return (
    <div className="lore-viewer-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
      <div style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(20,25,35,0.95) 0%, rgba(30,15,20,0.85) 100%)',
        border: '1px solid var(--gold-border)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-400)', marginBottom: '8px' }}>
            <Feather size={20} />
            <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              CRÓNICAS y TRASFONDO
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.8rem', color: 'var(--gold-300)', marginBottom: '8px', letterSpacing: '1px' }}>
            {loreData.overview.title}
          </h2>
          <p style={{ color: '#cbd5e0', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {loreData.overview.intro}
          </p>
        </div>
      </div>

      {/* Main Layout: Chapter Selector y Chronicle Parchment */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'start' }}>
        {/* Chapters Navigation List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-title)', color: 'var(--gold-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
            CAPÍTULOS DEL CÓDICE
          </span>
          {loreData.chapters.map((chap) => {
            const isActive = chap.id === activeChapterId;
            return (
              <button
                key={chap.id}
                onClick={() => setActiveChapterId(chap.id)}
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
                <div>
                  <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.95rem', margin: '0 0 4px 0' }}>
                    {chap.title}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {chap.category}
                  </span>
                </div>
                <ChevronRight size={16} color={isActive ? 'var(--gold-400)' : 'var(--text-muted)'} />
              </button>
            );
          })}
        </div>

        {/* Selected Chapter Content */}
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

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '8px', borderLeft: '3px solid var(--gold-500)', marginBottom: '20px' }}>
            <p style={{ fontStyle: 'italic', color: '#e2e8f0', fontSize: '0.95rem', margin: 0 }}>
              {activeChapter.summary}
            </p>
          </div>

          <div style={{ color: '#cbd5e0', fontSize: '1rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
            {activeChapter.content}
          </div>
        </div>
      </div>
    </div>
  );
}
