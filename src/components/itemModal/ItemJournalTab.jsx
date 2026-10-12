import React from 'react';
import { Feather } from 'lucide-react';

export default function ItemJournalTab({ journal }) {
  if (!journal) return null;

  return (
    <div className="lore-box">
      <span className="lore-quote-icon">“</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--gold-400)' }}>
        <Feather size={18} />
        <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '1rem', letterSpacing: '1px' }}>
          CRÓNICA DEL CÓDICE DE ASHENFALL
        </h4>
      </div>
      <p style={{ whiteSpace: 'pre-line' }}>{journal}</p>
    </div>
  );
}
