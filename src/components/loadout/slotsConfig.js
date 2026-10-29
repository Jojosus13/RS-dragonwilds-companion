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
      { id: 'heavy', name: 'Corazas de Metal', icon: 'shield', keywords: ['platebody', 'knight', 'coraza', 'cota', 'placas'] },
      { id: 'ranged', name: 'Cueros de Dragón', icon: 'bow-arrow', keywords: ['dragonhide', 'tunic', 'leather', 'cuero', 'peto', 'dragón'] },
      { id: 'magic', name: 'Ropajes Mágicos', icon: 'wizard-staff', keywords: ['robe', 'ancestral', 'apprentice', 'túnica', 'ropaje', 'mágico', 'mago', 'hábito'] }
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
      { id: 'metal', name: 'Escudos de Metal', icon: 'shield', keywords: ['shield', 'kiteshield', 'escudo', 'lágrima', 'cuadrado', 'hierro', 'bronce', 'acero', 'mithril', 'adamantita', 'runita'] },
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
      { id: 'heavy', name: 'Perneras de Placas', icon: 'shield', keywords: ['platelegs', 'plateskirt', 'knight', 'perneras', 'placas', 'quijote'] },
      { id: 'ranged', name: 'Pantalones de Cazador', icon: 'bow-arrow', keywords: ['chaps', 'leggings', 'pantalones', 'cuero', 'dragón', 'mallas', 'tights'] },
      { id: 'magic', name: 'Faldas Mágicas', icon: 'wizard-staff', keywords: ['robe', 'ancestral', 'apprentice', 'falda', 'mágico', 'mago'] }
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
      { id: 'potions', name: 'Pociones y Elixires', icon: 'potion-ball', keywords: ['potion', 'antifire', 'antipoison', 'elixir', 'poción', 'antifuego', 'antiponzoña', 'brebaje', 'infusión', 'infusion', 'tea', 'té', 'brew', 'bebida'] },
      { id: 'food', name: 'Comidas y Estofados', icon: 'cooking-pot', keywords: ['stew', 'broth', 'pie', 'potato', 'food', 'seared', 'compote', 'fish', 'estofado', 'pastel', 'patata', 'carne', 'pescado', 'asado', 'brasa', 'caldo', 'arenque', 'sustento', 'chuleta', 'filete', 'salteada'] }
    ]
  },
  {
    id: 'consumable2',
    name: 'Poción / Comida 2',
    icon: 'cooking-pot',
    typeFilter: ['potion', 'food', 'consumable', 'stew', 'broth', 'pie', 'potato', 'fish', 'poción', 'elixir', 'brebaje', 'comida', 'estofado', 'pastel', 'patata', 'pescado', 'carne'],
    subtypes: [
      { id: 'all', name: 'Todos los Consumibles' },
      { id: 'potions', name: 'Pociones y Elixires', icon: 'potion-ball', keywords: ['potion', 'antifire', 'antipoison', 'elixir', 'poción', 'antifuego', 'antiponzoña', 'brebaje', 'infusión', 'infusion', 'tea', 'té', 'brew', 'bebida'] },
      { id: 'food', name: 'Comidas y Estofados', icon: 'cooking-pot', keywords: ['stew', 'broth', 'pie', 'potato', 'food', 'seared', 'compote', 'fish', 'estofado', 'pastel', 'patata', 'carne', 'pescado', 'asado', 'brasa', 'caldo', 'arenque', 'sustento', 'chuleta', 'filete', 'salteada'] }
    ]
  }
];

/**
 * Determina si un objeto del juego es realmente una pieza de equipamiento o consumible de combate.
 * Filtra vestigios, materiales básicos, chatarra, ingredientes crudos, semillas, runas y monturas.
 */
export function isEquipableItem(it) {
  if (!it) return false;
  if (it.category === 'Vestigios y Patrones' || it.itemType === 'Vestigio Antiguo') return false;
  if (it.title && it.title.includes('(Vestigio)') && (!it.stats || (!it.stats.baseDamage && !it.stats.armourRating))) return false;
  if (it.title && (it.title.startsWith('MONTURA:') || it.title.startsWith('MOUNT:'))) return false;
  if (it.category === 'Materiales y Minerales' || it.category === 'Runas y Magia') return false;
  if (['Ingrediente Crudo', 'Semilla de Cultivo', 'Componente de Forja', 'Material Básico', 'Material Procesado', 'Recurso', 'Tomo de Aprendizaje'].includes(it.itemType)) {
    return false;
  }
  return true;
}

/**
 * Devuelve la ranura (slotId) adecuada para equipar un objeto dado, o null si no es equipable.
 */
export function getSlotForItem(it) {
  if (!isEquipableItem(it)) return null;

  const t = `${it.title || ''} ${it.englishTitle || ''}`.toLowerCase();
  const cat = it.category || '';
  const itemType = it.itemType || '';

  // Consumibles: Pociones y Comida cocinada / bebidas
  if (cat === 'Pociones y Comida' || itemType === 'Comida / Sustento') {
    const validConsumableTypes = ['Poción / Brebaje', 'Bebida / Hidratación', 'Comida / Sustento', 'Consumible', 'Pociones y Consumibles'];
    if (!validConsumableTypes.includes(itemType)) return null;
    if (it.title && (it.title.includes('Semillas') || it.title.includes('Tomo') || it.title.includes('Joyería Corroída'))) return null;
    return 'consumable1';
  }

  // Armas de Combate y herramientas de tala/minería empuñables
  if (cat === 'Armas de Combate') return 'mainhand';
  if (cat === 'Herramientas') {
    if (it.stats && (it.stats.attackStyle || (it.stats.baseDamage && String(it.stats.baseDamage).trim() !== ''))) {
      return 'mainhand';
    }
    return null;
  }

  // Todo el resto de armaduras y prendas
  if (cat !== 'Armaduras y Ropa') return null;

  // Cabeza (cascos, yelmos, sombreros, capuchas, tiaras, coronas, caperuzas)
  if (/\b(casco|yelmo|sombrero|capucha|tiara|corona|caperuza|coif|helmet|helm|hat|hood|crown)\b/i.test(t) || t.includes('bolsa de noggin') || t.includes('bag of noggin')) {
    return 'head';
  }

  // Escudo / Offhand
  if (/\b(escudo|broquel|defensor|áspis|shield|kiteshield|buckler|defender)\b/i.test(t)) {
    return 'offhand';
  }

  // Cuello / Amuletos / Bufandas
  if (/\b(amuleto|amulet|collar|necklace|pendant|choker|bufanda|scarf)\b/i.test(t)) {
    return 'neck';
  }

  // Capa / Acumulador / Manto / Estandarte
  if (/\b(capa|manto|acumulador|cape|cloak|accumulator)\b/i.test(t) || t.includes('estandarte de guerra') || t.includes('war banner')) {
    return 'cape';
  }

  // Piernas (perneras, pantalones, faldas, quijotes, mallas)
  if (/\b(perneras|pantalones|falda|faldón|quijote|mallas|platelegs|plateskirt|legs|chaps|leggings|tights)\b/i.test(t) || /\brobe bottoms?\b/i.test(t)) {
    return 'legs';
  }

  // Torso / Pecho (corazas, cotas, petos, túnicas, ropajes)
  if (/\b(coraza|cota|peto|platebody|chainbody|cuirass|body|torso|túnica|túnicas|ropaje|ropajes|robe|robes)\b/i.test(t)) {
    return 'body';
  }

  // Anillos
  if (/\b(anillo|ring)\b/i.test(t)) {
    return 'ring';
  }

  return null;
}

/**
 * Comprueba si un objeto corresponde a una ranura específica del simulador.
 */
export function isItemForSlot(it, slotId) {
  const slot = getSlotForItem(it);
  if (!slot) return false;
  if (slotId === 'consumable1' || slotId === 'consumable2') {
    return slot === 'consumable1';
  }
  return slot === slotId;
}
