import React from 'react';
import { ChevronRight } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function CategoryExplorer({ setSelectedCategory, setActiveView }) {
  const categoryShortcuts = [
    { id: 'Armas de Combate', name: 'Armas', icon: 'crossed-swords', color: '#e53e3e' },
    { id: 'Armaduras y Ropa', name: 'Armaduras', icon: 'breastplate', color: '#4299e1' },
    { id: 'Herramientas', name: 'Herramientas', icon: 'mining', color: '#dd6b20' },
    { id: 'Pociones y Comida', name: 'Consumibles', icon: 'potion-ball', color: '#38a169' },
    { id: 'Materiales y Minerales', name: 'Materiales', icon: 'anvil-impact', color: '#d4af37' },
    { id: 'Runas y Magia', name: 'Runas', icon: 'crystal-ball', color: '#9f7aea' },
    { id: 'Vestigios y Patrones', name: 'Patrones', icon: 'scroll-unfurled', color: '#ecc94b' }
  ];

  return (
    <section className="menu-categories-section">
      <div className="section-header-row">
        <div>
          <h2 className="section-main-title">EXPLORAR POR CATEGORÍA</h2>
          <p className="section-main-desc">Navegación directa a los tipos de objetos del Códice</p>
        </div>
      </div>

      <div className="menu-category-cards-grid">
        {categoryShortcuts.map((cat) => (
          <button
            key={cat.id}
            className="menu-category-btn"
            onClick={() => {
              setSelectedCategory(cat.id);
              setActiveView('catalog');
            }}
          >
            <div className="cat-icon-frame" style={{ color: cat.color }}>
              <GameIcon name={cat.icon} size={20} color={cat.color} />
            </div>
            <span className="cat-name">{cat.name}</span>
            <ChevronRight size={14} className="cat-arrow" />
          </button>
        ))}
      </div>
    </section>
  );
}
