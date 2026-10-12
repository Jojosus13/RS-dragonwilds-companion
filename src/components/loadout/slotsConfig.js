export const SLOTS_CONFIG = [
  {
    id: 'head',
    name: 'Cabeza',
    icon: 'crown',
    typeFilter: ['helmet', 'hat', 'coif', 'med helm', 'casco', 'yelmo', 'capucha', 'sombrero', 'tiara', 'corona', 'caperuza'],
    subtypes: [
      { id: 'all', name: 'Todos los Cascos' },
      { id: 'heavy', name: 'Placas / Metal', icon: 'shield', keywords: ['helmet', 'helm', 'med helm', 'casco', 'yelmo', 'placas'] },
      { id: 'ranged', name: 'Cuero / Coif', icon: 'bow-arrow', keywords: ['coif', 'leather', 'dragonhide', 'capucha', 'cuero', 'dragón'] },
      { id: 'magic', name: 'Magia / Sombreros', icon: 'wizard-staff', keywords: ['hat', 'hood', 'ancestral', 'apprentice', 'sombrero', 'mágico', 'mago', 'tiara'] }
    ]
  },
  {
    id: 'neck',
    name: 'Amuleto',
    icon: 'necklace',
    typeFilter: ['amulet', 'necklace', 'pendant', 'choker', 'amuleto', 'collar'],
    subtypes: [
      { id: 'all', name: 'Todos los Amuletos' },
      { id: 'combat', name: 'Combate (Fuerza / Precisión)', icon: 'crossed-swords', keywords: ['strength', 'accuracy', 'glory', 'fuerza', 'precisión', 'gloria', 'poder'] },
      { id: 'defense', name: 'Defensa', icon: 'shield', keywords: ['defence', 'defense', 'defensa', 'protección'] },
      { id: 'magic', name: 'Magia y Especial', icon: 'crystal-ball', keywords: ['magic', 'bandosian', 'abraxus', 'magia', 'místico'] }
    ]
  },
  {
    id: 'cape',
    name: 'Capa',
    icon: 'cloak',
    typeFilter: ['cape', 'accumulator', 'cloak', 'capa', 'manto', 'acumulador'],
    subtypes: [
      { id: 'all', name: 'Todas las Capas' },
      { id: 'skill', name: 'Capas de Habilidad', icon: 'laurel-crown', keywords: ['cape', 'capa', 'manto'] },
      { id: 'ranged', name: 'Munición (Acumulador)', icon: 'bow-arrow', keywords: ['accumulator', 'acumulador', 'ava'] }
    ]
  },
  {
    id: 'body',
    name: 'Pecho / Torso',
    icon: 'breastplate',
    typeFilter: ['platebody', 'chainbody', 'body', 'robe top', 'robe', 'tunic', 'cuirass', 'coraza', 'cota', 'peto', 'túnica'],
    subtypes: [
      { id: 'all', name: 'Todos los Torsos' },
      { id: 'heavy', name: 'Corazas de Metal', icon: 'shield', keywords: ['platebody', 'knight', 'coraza', 'cota de malla', 'placas'] },
      { id: 'ranged', name: 'Cueros de Dragón', icon: 'bow-arrow', keywords: ['dragonhide body', 'tunic', 'leather', 'cuero', 'peto', 'dragón'] },
      { id: 'magic', name: 'Ropajes Mágicos', icon: 'wizard-staff', keywords: ['robe', 'ancestral', 'apprentice', 'túnica', 'mágico', 'mago', 'hábito'] }
    ]
  },
  {
    id: 'mainhand',
    name: 'Arma Principal',
    icon: 'crossed-swords',
    typeFilter: ['weapon', 'sword', 'axe', 'bow', 'wand', 'staff', 'dagger', 'scimitar', 'whip', 'mace', 'crossbow', 'greataxe', 'greatsword', 'warhammer', 'arrow', 'bolt', 'ammunition', 'espada', 'hacha', 'arco', 'varita', 'bastón', 'daga', 'cimitarra', 'látigo', 'maza', 'ballesta', 'martillo', 'lanza', 'alabarda', 'flecha', 'perno'],
    subtypes: [
      { id: 'all', name: 'Todas las Armas' },
      { id: 'swords', name: 'Espadas y Cimitarras', icon: 'crossed-swords', keywords: ['sword', 'greatsword', 'scimitar', 'espada', 'cimitarra', 'espadón', 'estoque'] },
      { id: 'axes', name: 'Hachas de Guerra', icon: 'battle-axe', keywords: ['greataxe', 'axe', 'warhammer', 'mace', 'hacha', 'martillo', 'maza'] },
      { id: 'whips', name: 'Látigos (Whips)', icon: 'snake', keywords: ['whip', 'látigo'] },
      { id: 'ranged', name: 'Arcos y Ballestas', icon: 'bow-arrow', keywords: ['bow', 'shortbow', 'longbow', 'crossbow', 'arco', 'ballesta', 'balista'] },
      { id: 'ammo', name: 'Munición (Flechas y Pernos)', icon: 'target-arrows', keywords: ['arrow', 'bolt', 'ammunition', 'flecha', 'perno', 'munición'] },
      { id: 'magic', name: 'Varitas y Bastones', icon: 'crystal-ball', keywords: ['wand', 'staff', 'battlestaff', 'varita', 'bastón'] },
      { id: 'daggers', name: 'Dagas y Cortas', icon: 'dagger', keywords: ['dagger', 'blade', 'daga', 'cuchillo'] }
    ]
  },
  {
    id: 'offhand',
    name: 'Escudo / Offhand',
    icon: 'shield',
    typeFilter: ['shield', 'kiteshield', 'buckler', 'defender', 'escudo', 'broquel', 'defensor', 'áspis'],
    subtypes: [
      { id: 'all', name: 'Todos los Escudos' },
      { id: 'metal', name: 'Escudos de Metal', icon: 'shield', keywords: ['shield', 'kiteshield', 'escudo', 'lágrima', 'cuadrado'] },
      { id: 'dragon', name: 'Anti-Dragón y Especiales', icon: 'dragon-head', keywords: ['anti-dragon', 'dragonfire', 'dragón', 'fuego', 'espiritual'] }
    ]
  },
  {
    id: 'legs',
    name: 'Piernas',
    icon: 'trousers',
    typeFilter: ['platelegs', 'plateskirt', 'legs', 'chaps', 'leggings', 'robe legs', 'robe bottom', 'perneras', 'pantalones', 'falda', 'faldón', 'quijote'],
    subtypes: [
      { id: 'all', name: 'Todas las Perneras' },
      { id: 'heavy', name: 'Perneras de Placas', icon: 'shield', keywords: ['platelegs', 'knight', 'perneras', 'placas', 'quijote'] },
      { id: 'ranged', name: 'Pantalones de Cazador', icon: 'bow-arrow', keywords: ['chaps', 'leggings', 'pantalones', 'cuero', 'dragón'] },
      { id: 'magic', name: 'Faldas Mágicas', icon: 'wizard-staff', keywords: ['robe legs', 'ancestral', 'apprentice', 'falda', 'mágico', 'mago', 'túnica'] }
    ]
  },
  {
    id: 'ring',
    name: 'Anillo',
    icon: 'diamond-ring',
    typeFilter: ['ring', 'anillo', 'band'],
    subtypes: [
      { id: 'all', name: 'Todos los Anillos' }
    ]
  },
  {
    id: 'consumable1',
    name: 'Poción / Comida 1',
    icon: 'potion-ball',
    typeFilter: ['potion', 'food', 'consumable', 'stew', 'broth', 'pie', 'potato', 'fish', 'poción', 'elixir', 'brebaje', 'comida', 'estofado', 'pastel', 'patata', 'pescado', 'carne'],
    subtypes: [
      { id: 'all', name: 'Todos los Consumibles' },
      { id: 'potions', name: 'Pociones y Elixires', icon: 'potion-ball', keywords: ['potion', 'antifire', 'antipoison', 'elixir', 'poción', 'antifuego', 'antiponzoña', 'brebaje', 'infusión'] },
      { id: 'food', name: 'Comidas y Estofados', icon: 'cooking-pot', keywords: ['stew', 'broth', 'pie', 'potato', 'food', 'seared', 'compote', 'fish', 'estofado', 'pastel', 'patata', 'carne', 'pescado', 'asado', 'brasa'] }
    ]
  },
  {
    id: 'consumable2',
    name: 'Poción / Comida 2',
    icon: 'cooking-pot',
    typeFilter: ['potion', 'food', 'consumable', 'stew', 'broth', 'pie', 'potato', 'fish', 'poción', 'elixir', 'brebaje', 'comida', 'estofado', 'pastel', 'patata', 'pescado', 'carne'],
    subtypes: [
      { id: 'all', name: 'Todos los Consumibles' },
      { id: 'potions', name: 'Pociones y Elixires', icon: 'potion-ball', keywords: ['potion', 'antifire', 'antipoison', 'elixir', 'poción', 'antifuego', 'antiponzoña', 'brebaje', 'infusión'] },
      { id: 'food', name: 'Comidas y Estofados', icon: 'cooking-pot', keywords: ['stew', 'broth', 'pie', 'potato', 'food', 'seared', 'compote', 'fish', 'estofado', 'pastel', 'patata', 'carne', 'pescado', 'asado', 'brasa'] }
    ]
  }
];
