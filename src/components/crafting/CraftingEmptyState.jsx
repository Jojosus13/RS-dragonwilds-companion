import React from 'react';
import GameIcon from '../GameIcon';

export default function CraftingEmptyState() {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--gold-border)' }}>
      <GameIcon name="hammer-drop" size={54} color="var(--gold-500)" style={{ margin: '0 auto 16px' }} />
      <h2 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', marginBottom: '8px' }}>
        Tu Taller de Crafteo está Vacío
      </h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 20px', lineHeight: '1.6' }}>
        Explora el catálogo y pulsa el botón <strong>+</strong> o <strong>"Añadir a Crafteo"</strong> en cualquier armadura, arma o ítem para ver el cálculo y desglose automático hasta sus materiales más simples.
      </p>
    </div>
  );
}
