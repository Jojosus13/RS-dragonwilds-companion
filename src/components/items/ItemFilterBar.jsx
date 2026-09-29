import React from 'react';
import GameIcon from '../GameIcon';

export const CATEGORY_DEFINITIONS = [
  {
    id: 'All',
    name: 'Todos los Ítems',
    subtitle: 'Catálogo completo de Dragonwilds con 1,120+ objetos',
    icon: 'swap-bag',
    color: 'var(--gold-400)',
    accentBg: 'rgba(212, 175, 55, 0.12)',
    accentBorder: 'rgba(212, 175, 55, 0.35)',
    tags: ['1,120+ objetos', 'Explorador General']
  },
  {
    id: 'Armas de Combate',
    name: 'Armas de Combate',
    subtitle: 'Espadas, cimitarras, látigos, arcos, bastones y dagas',
    icon: 'crossed-swords',
    color: '#f87171',
    accentBg: 'rgba(239, 68, 68, 0.12)',
    accentBorder: 'rgba(239, 68, 68, 0.35)',
    tags: ['Cuerpo a Cuerpo', 'A Distancia', 'Magia']
  },
  {
    id: 'Armaduras y Ropa',
    name: 'Armaduras y Ropa',
    subtitle: 'Cascos, corazas, perneras, escudos, capas y joyería',
    icon: 'breastplate',
    color: '#60a5fa',
    accentBg: 'rgba(96, 165, 250, 0.12)',
    accentBorder: 'rgba(96, 165, 250, 0.35)',
    tags: ['Defensa', 'Masterwork', 'Accesorios']
  },
  {
    id: 'Herramientas',
    name: 'Herramientas',
    subtitle: 'Picos de minería, hachas de tala, palas y regaderas',
    icon: 'mining',
    color: '#fbbf24',
    accentBg: 'rgba(251, 191, 36, 0.12)',
    accentBorder: 'rgba(251, 191, 36, 0.35)',
    tags: ['Minería', 'Tala', 'Supervivencia']
  },
  {
    id: 'Pociones y Comida',
    name: 'Pociones y Comida',
    subtitle: 'Elixires, antifuego, estofados, pescados y raciones',
    icon: 'potion-ball',
    color: '#34d399',
    accentBg: 'rgba(52, 211, 153, 0.12)',
    accentBorder: 'rgba(52, 211, 153, 0.35)',
    tags: ['Herbolaria', 'Cocina', 'Bufos']
  },
  {
    id: 'Materiales y Minerales',
    name: 'Materiales y Minerales',
    subtitle: 'Barras de metal, menas, maderas, cueros y esencias',
    icon: 'anvil-impact',
    color: '#a78bfa',
    accentBg: 'rgba(167, 139, 250, 0.12)',
    accentBorder: 'rgba(167, 139, 250, 0.35)',
    tags: ['Metalurgia', 'Crafteo', 'Artesanía']
  },
  {
    id: 'Vestigios y Patrones',
    name: 'Vestigios y Patrones',
    subtitle: 'Fragmentos rotos, esquemas, patrones y reliquias',
    icon: 'scroll-unfurled',
    color: '#f472b6',
    accentBg: 'rgba(244, 114, 182, 0.12)',
    accentBorder: 'rgba(244, 114, 182, 0.35)',
    tags: ['Reliquias', 'Planos Antiguos']
  },
  {
    id: 'Runas y Magia',
    name: 'Runas y Magia',
    subtitle: 'Runas elementales, catalizadoras, tomos y grimorios',
    icon: 'crystal-ball',
    color: '#38bdf8',
    accentBg: 'rgba(56, 189, 248, 0.12)',
    accentBorder: 'rgba(56, 189, 248, 0.35)',
    tags: ['Alta Alquimia', 'Lanzamiento']
  }
];

export const SUBCATEGORIES_CONFIG = {
  'Armas de Combate': [
    { id: 'all', name: 'Todas las Armas', icon: 'crossed-swords' },
    { id: 'swords', name: 'Espadas y Cimitarras', icon: 'crossed-swords', keywords: ['espada', 'espadón', 'cimitarra', 'sword', 'scimitar', 'greatsword'] },
    { id: 'axes', name: 'Hachas y Mazas', icon: 'battle-axe', keywords: ['hacha', 'maza', 'martillo', 'greataxe', 'axe', 'warhammer', 'mace'] },
    { id: 'whips', name: 'Látigos', icon: 'vine-whip', keywords: ['látigo', 'whip'] },
    { id: 'ranged', name: 'Arcos y Ballestas', icon: 'bow-arrow', keywords: ['arco', 'ballesta', 'bow', 'crossbow'] },
    { id: 'ammo', name: 'Munición (Flechas y Pernos)', icon: 'target-arrows', keywords: ['flecha', 'perno', 'arrow', 'bolt'] },
    { id: 'magic', name: 'Varitas y Bastones', icon: 'wizard-staff', keywords: ['varita', 'bastón', 'wand', 'staff'] },
    { id: 'daggers', name: 'Dagas y Cortas', icon: 'plain-dagger', keywords: ['daga', 'hoja', 'dagger', 'blade'] }
  ],
  'Armaduras y Ropa': [
    { id: 'all', name: 'Toda la Armadura', icon: 'shield' },
    { id: 'helmets', name: 'Cascos y Capuchas', icon: 'crown', keywords: ['casco', 'capucha', 'sombrero', 'helmet', 'helm', 'coif', 'hat'] },
    { id: 'bodies', name: 'Corazas y Túnicas', icon: 'breastplate', keywords: ['coraza', 'túnica', 'platebody', 'body', 'robe', 'tunic'] },
    { id: 'legs', name: 'Perneras y Pantalones', icon: 'trousers', keywords: ['perneras', 'pantalones', 'falda', 'platelegs', 'legs', 'chaps'] },
    { id: 'shields', name: 'Escudos', icon: 'shield', keywords: ['escudo', 'shield'] },
    { id: 'capes', name: 'Capas y Acumuladores', icon: 'cloak', keywords: ['capa', 'acumulador', 'cape', 'accumulator'] },
    { id: 'jewelry', name: 'Amuletos y Anillos', icon: 'necklace', keywords: ['anillo', 'amuleto', 'collar', 'ring', 'amulet'] }
  ],
  'Vestigios y Patrones': [
    { id: 'all', name: 'Todos los Vestigios y Patrones', icon: 'scroll-unfurled' },
    { id: 'vestiges', name: 'Vestigios Rotos', icon: 'amphora', keywords: ['vestigio', 'punta', 'hoja', 'espejo', 'talla', 'vestige', 'bladehead'] },
    { id: 'patterns', name: 'Patrones y Diseños', icon: 'scroll-unfurled', keywords: ['patrón', 'pattern'] },
    { id: 'masterwork', name: 'Masterwork y Reliquias', icon: 'flat-star', keywords: ['masterwork', 'reliquia', 'memoria', 'relic', 'memory'] }
  ],
  'Pociones y Comida': [
    { id: 'all', name: 'Todos los Consumibles', icon: 'potion-ball' },
    { id: 'potions', name: 'Pociones y Elixires', icon: 'potion-ball', keywords: ['poción', 'antifuego', 'antiponzoña', 'elixir', 'potion'] },
    { id: 'food', name: 'Comidas y Estofados', icon: 'cooking-pot', keywords: ['estofado', 'caldo', 'tarta', 'patata', 'comida', 'stew', 'broth', 'pie'] },
    { id: 'fish', name: 'Pescados y Carnes', icon: 'fish-cooked', keywords: ['pescado', 'carne', 'fish', 'beef'] }
  ],
  'Herramientas': [
    { id: 'all', name: 'Todas las Herramientas', icon: 'mining' },
    { id: 'pickaxes', name: 'Picos', icon: 'mining', keywords: ['pico', 'pickaxe'] },
    { id: 'axes', name: 'Hachas de Tala', icon: 'battle-axe', keywords: ['hacha de tala', 'hacha', 'logging axe', 'axe'] },
    { id: 'spades', name: 'Palas y Regaderas', icon: 'spade', keywords: ['pala', 'regadera', 'spade', 'watering can'] }
  ],
  'Materiales y Minerales': [
    { id: 'all', name: 'Todos los Materiales', icon: 'gold-bar' },
    { id: 'bars', name: 'Barras de Metal', icon: 'gold-bar', keywords: ['barra', 'bar'] },
    { id: 'ores', name: 'Menas y Minerales', icon: 'rock', keywords: ['mena', 'mineral', 'arcilla', 'piedra', 'ore', 'clay', 'stone'] },
    { id: 'logs', name: 'Maderas y Tablas', icon: 'wood-pile', keywords: ['tronco', 'tabla', 'madera', 'corteza', 'log', 'plank', 'bark'] },
    { id: 'leather', name: 'Cueros y Escamas', icon: 'dragon-head', keywords: ['cuero', 'piel', 'escama', 'leather', 'hide', 'scale'] },
    { id: 'essence', name: 'Esencias y Hilos', icon: 'sparkles', keywords: ['hilo', 'esencia', 'hueso', 'ceniza', 'espina', 'semilla', 'thread', 'essence'] }
  ],
  'Runas y Magia': [
    { id: 'all', name: 'Todas las Runas y Magia', icon: 'crystal-ball' },
    { id: 'runes', name: 'Runas Elementales', icon: 'sparkles', keywords: ['runa', 'rune'] },
    { id: 'staves', name: 'Bastones y Libros', icon: 'wizard-staff', keywords: ['tomo', 'libro', 'manual', 'tome', 'spellbook'] }
  ]
};

export default function ItemFilterBar({
  selectedCategory,
  onSelectCategory,
  selectedSubtype,
  onSelectSubtype,
  categoryCounts
}) {
  const activeSubtypes = selectedCategory ? SUBCATEGORIES_CONFIG[selectedCategory] || null : null;

  return (
    <div>
      {/* Category Pills Slider */}
      <div className="category-scroll-bar">
        {CATEGORY_DEFINITIONS.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              className={`category-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              <GameIcon name={cat.icon} size={16} color={isActive ? 'var(--gold-300)' : cat.color} />
              <span>{cat.name}</span>
              <span className="count-badge">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Subtype Filter Pills (if active category has subtypes) */}
      {activeSubtypes && (
        <div className="subtypes-bar fade-in">
          {activeSubtypes.map((sub) => (
            <button
              key={sub.id}
              className={`subtype-pill-btn ${selectedSubtype === sub.id ? 'active' : ''}`}
              onClick={() => onSelectSubtype(sub.id)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              {sub.icon && <GameIcon name={sub.icon} size={14} />}
              <span>{sub.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
