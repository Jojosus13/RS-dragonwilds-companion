// ==========================================================================
// RuneScape: Dragonwilds - Complete Ashenfall Map y POI Dataset
// Calibrated to the official in-game map layout (1024x1024 coordinates)
// ==========================================================================

export const ASHENFALL_REGIONS = [
  {
    id: 'brynmoor',
    name: 'Valle de Zarzamel',
    lines: ['VALLE DE', 'ZARZAMEL'],
    tier: 'Tier 1 - 2',
    color: 'rgba(56, 161, 105, 0.2)',
    borderColor: 'rgba(56, 161, 105, 0.5)',
    bounds: { x: 50, y: 640, width: 200, height: 120 },
    description: 'Coastal coniferous woods and fertile vales. Starter region with oak logs, game hunting, fishing, and gold/silver veins.',
    dangerLevel: 'Muy bajo'
  },
  {
    id: 'whispering-wetlands',
    name: 'Pantano Susurrante',
    lines: ['PANTANO', 'SUSURRANTE'],
    tier: 'Tier 1 - 2',
    color: 'rgba(56, 161, 105, 0.2)',
    borderColor: 'rgba(56, 161, 105, 0.5)',
    bounds: { x: 80, y: 570, width: 210, height: 120 },
    description: 'Coastal coniferous woods and fertile vales. Starter region with oak logs, game hunting, fishing, and gold/silver veins.',
    dangerLevel: 'Muy bajo'
  },
  {
    id: 'ghornfell',
    name: 'Llanura Quebrada',
    lines: ['LLANURA', 'QUEBRADA'],
    tier: 'Tier 3 - 4',
    color: 'rgba(56, 161, 105, 0.2)',
    borderColor: 'rgba(56, 161, 105, 0.5)',
    bounds: { x: 170, y: 470, width: 200, height: 130 },
    description: 'Central crimson plateau crossed by ancient roads. Houses the central Spire (Velgar\'s Rise), Caratacus\' cabin, and flax meadows.',
    dangerLevel: 'Bajo - Medio'
  },
  {
    id: 'stormtouched-highlands',
    name: 'Tierras Altas de la Tormenta',
    lines: ['TIERRAS ALTAS', 'DE LA TORMENTA'],
    tier: 'Tier 4',
    color: 'rgba(214, 158, 46, 0.22)',
    borderColor: 'rgba(214, 158, 46, 0.5)',
    bounds: { x: 30, y: 440, width: 170, height: 120 },
    description: 'Craggy ocher mountain peaks swept by lightning storms. Stronghold of the Garou clan and rich mithril mines.',
    dangerLevel: 'Medio - Alto'
  },
  {
    id: 'badblood-wetlands',
    name: 'Pantano Malasangre',
    lines: ['PANTANO', 'MALASANGRE'],
    tier: 'Tier 3',
    color: 'rgba(72, 187, 120, 0.25)',
    borderColor: 'rgba(72, 187, 120, 0.55)',
    bounds: { x: 270, y: 580, width: 110, height: 130 },
    description: 'Pantano tóxico poblado por criaturas venenosas, rico en metales preciosos y arboles mustios.',
    dangerLevel: 'Medio - Alto'
  },
  {
    id: 'shattered-isles',
    name: 'Islas Fragmentadas',
    lines: ['ISLAS', 'FRAGMENTADAS'],
    tier: 'Tier 8',
    color: 'rgba(66, 153, 225, 0.22)',
    borderColor: 'rgba(66, 153, 225, 0.5)',
    bounds: { x: 50, y: 270, width: 180, height: 120 },
    description: 'Archipelago of floating sky islands tethered by arcane chains and celestial bridges in the northwest.',
    dangerLevel: 'Muy Alto'
  },
  {
    id: 'fellhollow-frostbound',
    name: 'Fellhollow',
    lines: ['FELLHOLLOW'],
    tier: 'Tier 5',
    color: 'rgba(128, 90, 213, 0.25)',
    borderColor: 'rgba(128, 90, 213, 0.55)',
    bounds: { x: 150, y: 90, width: 400, height: 200 },
    description: 'Colossal northern purple crescent spanning frozen canyons, Withered mist, and shadowy fortresses.',
    dangerLevel: 'Alto - Muy Alto'
  },
  {
    id: 'dowdun-reach',
    name: 'Dowdun Reach',
    lines: ['DOWDUN REACH'],
    tier: 'Tier 6',
    color: 'rgba(155, 44, 44, 0.28)',
    borderColor: 'rgba(155, 44, 44, 0.6)',
    bounds: { x: 450, y: 300, width: 210, height: 190 },
    description: 'Dark volcanic bastion surrounded by molten moats. Citadel of the Black Knights and the Titan of Dowdun.',
    dangerLevel: 'Alto'
  },
  {
    id: 'umbral-sands',
    name: 'Umbral Sands',
    lines: ['UMBRAL SANDS'],
    tier: 'Tier 7',
    color: 'rgba(237, 137, 54, 0.22)',
    borderColor: 'rgba(237, 137, 54, 0.5)',
    bounds: { x: 470, y: 480, width: 400, height: 320 },
    description: 'Vast southeastern golden desert afflicted with Sunscorch, Kot\'Haar sun pyramids, Kalphite hives, and the Vault of Skeklac.',
    dangerLevel: 'Muy Alto'
  },
];

export const MAP_MARKERS = [
  // ==========================================
  // 1. RED DE PIEDRAS GUÍA (LODESTONES / FAST TRAVEL)
  // ==========================================
  {
    id: 'ls-brynmoor',
    title: 'Piedra Guía: Brynmoor',
    category: 'lodestones',
    coords: { x: 41, y: 754 },
    region: 'Brynmoor y Ghornfell',
    levelReq: 1,
    description: 'Punto de partida en la costa verde suroccidental. Campamentos de supervivientes.',
    icon: 'Compass',
    color: '#48bb78',
    isFastTravel: true
  },
  {
    id: 'ls-fellhollow-west',
    title: 'Piedra Guía: Fellhollow',
    category: 'lodestones',
    coords: { x: 350, y: 380 },
    region: 'Fellhollow y Frostbound Crags',
    levelReq: 35,
    description: 'Entrada a la guarida de la Muerte.',
    icon: 'Compass',
    color: '#48bb78',
    isFastTravel: true
  },
  {
    id: 'ls-dowdun',
    title: 'Piedra Guía: Puerta de Dowdun Reach',
    category: 'lodestones',
    coords: { x: 565, y: 359 },
    region: 'Dowdun Reach',
    levelReq: 45,
    description: 'Entrada a la fortaleza de Zamorak y los Caballeros Negros.',
    icon: 'Compass',
    color: '#48bb78',
    isFastTravel: true
  },
  {
    id: 'ls-umbral-oasis',
    title: 'Piedra Guía: Oasis de Arenas Sombrías',
    category: 'lodestones',
    coords: { x: 623, y: 528 },
    region: 'Umbral Sands',
    levelReq: 45,
    description: 'Oasis con palmeras y sombra en el corazón del gran desierto.',
    icon: 'Compass',
    color: '#48bb78',
    isFastTravel: true
  },

  // ==========================================
  // 2. BÓVEDAS DRAGONKIN (VAULTS)
  // ==========================================
  {
    id: 'vault-0',
    vaultId: 'crasorak-kara',
    title: 'Crasorak Kara',
    category: 'vaults',
    coords: { x: 138, y: 755 },
    region: 'Brynmoor',
    tier: 1,
    image: '/vaults/crasorak-kara.png',
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Crasorak_Kara',
    loot: ['Fragmento de bóveda', 'Núcleos de Bóveda'],
    description: 'Bóveda del bosque del Templo.',
    icon: 'Shield',
    color: '#4299e1'
  },
  {
    id: 'vault-1',
    vaultId: 'thishepen-kara',
    title: 'Thishepen Kara',
    category: 'vaults',
    coords: { x: 95, y: 659 },
    region: 'Brynmoor',
    tier: 1,
    image: '/vaults/thishepen-kara.png',
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Thishepen_Kara',
    loot: ['Fragmento de bóveda', 'Núcleos de Bóveda'],
    description: 'Bóveda localizada bajo la Academia del gremio de Hechiceros.',
    icon: 'Shield',
    color: '#4299e1'
  },
  {
    id: 'vault-2',
    vaultId: 'vertentis-kara',
    title: 'Vertentis Kara',
    category: 'vaults',
    coords: { x: 277, y: 647 },
    region: 'Whispering Wetlands',
    tier: 2,
    image: '/vaults/vertentis-kara.png',
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Vertentis_Kara',
    loot: ['Fragmento de bóveda', 'Núcleos de Bóveda', 'Receta: Escudo Anti-dragón'],
    description: 'Bóveda en el extremo oriental del Pantano Susurrante.',
    icon: 'Shield',
    color: '#4299e1'
  },
  {
    id: 'vault-3',
    vaultId: 'takla-kara',
    title: 'Takla Kara',
    category: 'vaults',
    coords: { x: 203, y: 576 },
    region: 'Fractured Plains',
    tier: 3,
    image: '/vaults/takla-kara.png',
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Takla_Kara',
    loot: ['Fragmento de bóveda', 'Núcleos de Bóveda', 'Receta: Armadura de Paladín', 'Receta: Arco de explorador'],
    description: 'Bóveda situada en una meseta tras rocas minables.',
    icon: 'Shield',
    color: '#4299e1'
  },
  {
    id: 'vault-4',
    vaultId: 'skeklac-kara',
    title: 'Skeklac Kara',
    category: 'vaults',
    coords: { x: 363, y: 482 },
    region: 'Fractured Plains',
    tier: 4,
    image: '/vaults/skeklac-kara.png',
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Skeklac_Kara',
    loot: ['Fragmento de bóveda', 'Núcleos de Bóveda'],
    description: 'Bóveda localizada en una fortaleza Garou protegida por un ritual mágico.',
    icon: 'Shield',
    color: '#4299e1'
  },
  {
    id: 'vault-highlands',
    vaultId: 'chaktan-kara',
    title: 'Chaktan Kara',
    category: 'vaults',
    coords: { x: 83, y: 493 },
    region: 'Stormtouched Highlands',
    tier: 4,
    image: '/vaults/chaktan-kara.png',
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Chaktan_Kara',
    loot: ['Fragmento de bóveda', 'Núcleos de Bóveda', 'Receta: Daga de hueso de dragón', 'Receta: Togas del mago Dracónido'],
    description: 'Bóveda localizada en una profunda cueva bajo la fortaleza del Rey Garou.',
    icon: 'Shield',
    color: '#4299e1'
  },
  {
    id: 'vault-toxic-wetlands',
    vaultId: 'kletterbuja-kara',
    title: 'Kletterbuja Kara',
    category: 'vaults',
    coords: { x: 314, y: 707 },
    region: 'Bloodblight Wetlands',
    tier: 3,
    image: '/vaults/kletterbuja-kara.png',
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Kletterbuja_Kara',
    loot: ['Fragmento de bóveda', 'Núcleos de Bóveda', 'Receta: Armadura de arquero Salvaje'],
    description: 'Bóveda sumergida en las aguas verde esmeralda del pantano.',
    icon: 'Shield',
    color: '#4299e1'
  },
  {
    id: 'vault-fellhollow-1',
    vaultId: 'kalistrakthen-kara',
    title: 'Kalistrakthen Kara',
    category: 'vaults',
    coords: { x: 98, y: 166 },
    region: 'Fellhollow y Frostbound Crags',
    tier: 5,
    image: '/vaults/kalistrakthen-kara.png',
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Kalistrakthen_Kara',
    loot: ['Fragmento de bóveda', 'Núcleos de Bóveda', 'Receta: Armadura de Hopolita caido'],
    description: 'Bóveda localizada en el extremo occidental de Fellhollow.',
    icon: 'Shield',
    color: '#4299e1'
  },
  {
    id: 'vault-fellhollow-2',
    vaultId: 'vekchenven-kara',
    title: 'Vekchenven Kara',
    category: 'vaults',
    coords: { x: 377, y: 150 },
    region: 'Fellhollow y Frostbound Crags',
    tier: 5,
    image: '/vaults/vekchenven-kara.png',
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Vekchenven_Kara',
    loot: ['Fragmento de bóveda', 'Núcleos de Bóveda', 'Fragmento de Maldición (Ira)', 'Receta: Yelmo de Hopolita caido', 'Receta: Daga colmillo de lobo', 'Receta: Bastón de nigromante'],
    description: 'Bóveda localizada tras la cascada en El lago de las almas.',
    icon: 'Shield',
    color: '#4299e1'
  },
  {
    id: 'vault-fellhollow-3',
    vaultId: 'skekven-kara',
    title: 'Skekven Kara',
    category: 'vaults',
    coords: { x: 512, y: 177 },
    region: 'Fellhollow y Frostbound Crags',
    tier: 5,
    image: '/vaults/skekven-kara.png',
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Skekven_Kara',
    loot: ['Fragmento de bóveda', 'Núcleos de Bóveda', 'Receta: Grebas de Hopolita caido', 'Receta: Arco del forestal no-muerto'],
    description: 'Bóveda localizada al este del lago de las almas.',
    icon: 'Shield',
    color: '#4299e1'
  },
  {
    id: 'vault-skeklac-east',
    vaultId: 'uzzer-kara',
    title: 'Uzzer Kara (Pirámide Este)',
    category: 'vaults',
    coords: { x: 873, y: 463 },
    region: 'Umbral Sands',
    tier: 7,
    image: '',
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Uzzer_Kara',
    loot: ['Fragmento de bóveda', 'Núcleos de Bóveda', 'Tesoros Kot\'Haar'],
    description: 'Bóveda ancestral en la pirámide oriental de las Arenas Sombrías.',
    icon: 'Shield',
    color: '#4299e1'
  },
  {
    id: 'vault-skeklac-west',
    vaultId: 'manafem-kara',
    title: 'Manafem Kara (Pirámide Oeste)',
    category: 'vaults',
    coords: { x: 570, y: 869 },
    region: 'Umbral Sands',
    tier: 7,
    image: '',
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Manafem_Kara',
    loot: ['Fragmento de bóveda', 'Núcleos de Bóveda', 'Tesoros Kot\'Haar'],
    description: 'Bóveda ancestral en la pirámide occidental de las Arenas Sombrías.',
    icon: 'Shield',
    color: '#4299e1'
  },

  // ==========================================
  // 3. JEFES DE MUNDO Y CRIATURAS DE ÉLITE (BOSSES)
  // ==========================================
  {
    id: 'boss-garou-king',
    title: 'Jefe: Rey Garou de la Tormenta',
    category: 'bosses',
    coords: { x: 70, y: 460 },
    region: 'Stormtouched Highlands',
    combatLevel: 'Nivel 85 (Élite)',
    drops: ['Maza del Trueno', 'Pieles de Garou Alfa', 'Corona de Hueso'],
    description: 'Líder feroz de la tribu Garou en su fortaleza de montaña.',
    icon: 'Flame',
    color: '#e53e3e'
  },
  {
    id: 'boss-black-knight-titan',
    title: 'Jefe: Titán de los Caballeros Negros',
    category: 'bosses',
    coords: { x: 570, y: 320 },
    region: 'Dowdun Reach',
    combatLevel: 'Nivel 95 (Élite)',
    drops: ['Espadón de Zamorak', 'Armadura de Mithril Negro', 'Sello Oscuro de Dowdun'],
    description: 'Coloso blindado en el patio interior de Dowdun Reach.',
    icon: 'Flame',
    color: '#e53e3e'
  },
  {
    id: 'boss-fuzan',
    title: 'Jefe de Mundo: Fuzan el Radiante (The Radiant)',
    category: 'bosses',
    coords: { x: 560, y: 840 },
    region: 'Umbral Sands',
    combatLevel: 'Nivel 115 (Jefe de Mundo)',
    drops: ['Cetro Solar de Fuzan', 'Coraza Dorada Kot\'Haar', 'Núcleo de Ascensión Solar T5'],
    description: 'Entidad solar colosal en la pirámide del sur de las Arenas Sombrías.',
    icon: 'Flame',
    color: '#e53e3e'
  },
  {
    id: 'boss-magma-dragon',
    title: 'Jefe Mundial: Dragón de Magma Ancestral',
    category: 'bosses',
    coords: { x: 820, y: 920 },
    region: 'Obsidian Caldera',
    combatLevel: 'Nivel 120 (Jefe de Mundo Supremo)',
    drops: ['Escamas de Dragón Puro', 'Corazón Ígneo', 'Espadón Dracónico', 'Núcleo de Ascensión T5'],
    description: 'El mayor terror alado de Ashenfall en el cráter de magma.',
    icon: 'Flame',
    color: '#e53e3e'
  },

  // ==========================================
  // 5. MISIONES Y PUNTOS DE INICIO (QUESTS)
  // ==========================================
  {
    id: 'quest-melody',
    questId: 'a-melody-remembered',
    title: 'Misión: Una Melodía Recordada',
    category: 'quests',
    coords: { x: 120, y: 470 },
    region: 'Stormtouched Highlands',
    difficulty: 'Principiante',
    startNpc: 'Caja de Música en escritorio en ruinas',
    description: 'Interactúa con la caja de música al sur de la fortaleza del Rey Garou.',
    icon: 'Scroll',
    color: '#ecc94b'
  },
  {
    id: 'quest-garou-room',
    questId: 'a-room-with-a-garou',
    title: 'Misión: Una Habitación con un Garou',
    category: 'quests',
    coords: { x: 210, y: 470 },
    region: 'Fractured Plains (Noroeste)',
    difficulty: 'Intermedia',
    startNpc: 'Caratacus el Garou Anciano',
    description: 'Construye una cabaña para Caratacus en las llanuras fracturadas.',
    icon: 'Scroll',
    color: '#ecc94b'
  },
  {
    id: 'quest-brynmoor-start',
    questId: 'survivors-awakening',
    title: 'Misión: El Despertar del Superviviente',
    category: 'quests',
    coords: { x: 62, y: 745 },
    region: 'Brynmoor',
    difficulty: 'Principiante',
    startNpc: 'Capitán del Barco Encallado',
    description: 'Aprende las mecánicas de supervivencia y construye tu primera fogata en la playa.',
    icon: 'Scroll',
    color: '#ecc94b'
  },
  {
    id: 'quest-dowdun-siege',
    questId: 'shadows-of-zamorak',
    title: 'Misión: Sombras de Zamorak (Dowdun)',
    category: 'quests',
    coords: { x: 530, y: 410 },
    region: 'Dowdun Reach',
    difficulty: 'Maestra',
    startNpc: 'Infiltrador Rebelde',
    description: 'Infiltra las murallas y sabotea las catapultas oscuras de Dowdun.',
    icon: 'Scroll',
    color: '#ecc94b'
  },
  {
    id: 'quest-umbral-fuzan',
    questId: 'the-scorched-path',
    title: 'Misión: La Senda Abrasada (Umbral Sands)',
    category: 'quests',
    coords: { x: 710, y: 680 },
    region: 'Umbral Sands',
    difficulty: 'Gran Maestra',
    startNpc: 'Eremita del Sol',
    description: 'Cruza el mar de dunas bajo el efecto Sunscorch y halla el templo de Fuzan.',
    icon: 'Scroll',
    color: '#ecc94b'
  }
];

// ==========================================
// PRESET FARMING y EXPLORATION ROUTES
// ==========================================
export const PRESET_ROUTES = [
  {
    id: 'route-lodestones',
    icon: 'sprint',
    title: 'Ruta Completa: Red de Lodestones de Ashenfall',
    description: 'Recorrido para activar las Piedras Guía a través de las regiones de Ashenfall.',
    color: '#4299e1',
    waypoints: [
      { id: 'wp-ls-1', title: '1. Lodestone Brynmoor', coords: { x: 41, y: 754 }, note: 'Playa inicial sur' },
      { id: 'wp-ls-6', title: '6. Lodestone Fellhollow West', coords: { x: 200, y: 180 }, note: 'Tierras marchitas' },
      { id: 'wp-ls-7', title: '7. Lodestone Dowdun Reach', coords: { x: 550, y: 390 }, note: 'Fortaleza Zamorak' },
      { id: 'wp-ls-8', title: '8. Lodestone Umbral Sands Oasis', coords: { x: 680, y: 640 }, note: 'Desierto sur' },
      { id: 'wp-ls-9', title: '9. Lodestone Obsidian Caldera', coords: { x: 800, y: 820 }, note: 'Cráter de magma' }
    ]
  },
  {
    id: 'route-vaults',
    icon: 'shield',
    title: 'Travesía de Bóvedas Dragonkin (Tier 1 a Tier 5)',
    description: 'Ruta secuencial por los santuarios y bóvedas Dragonkin de Ashenfall.',
    color: '#ecc94b',
    waypoints: [
      { id: 'wp-v-1', title: '1. Bóveda Brynmoor (T1)', coords: { x: 120, y: 680 }, note: 'Cuna de Bronce' },
      { id: 'wp-v-2', title: '2. Bóveda Fractured Plains (T2)', coords: { x: 230, y: 580 }, note: 'Cónclave de Hierro' },
      { id: 'wp-v-3', title: '3. Bóveda Highlands (T3)', coords: { x: 90, y: 440 }, note: 'Bóveda de la Tormenta' },
      { id: 'wp-v-4', title: '4. Bóveda Wetlands (T3-4)', coords: { x: 320, y: 670 }, note: 'Foso de Ánima' },
      { id: 'wp-v-5', title: '5. Bóveda Fellhollow (T4)', coords: { x: 420, y: 150 }, note: 'Bóveda Corrupta' },
      { id: 'wp-v-6', title: '6. Bóveda Dowdun Reach (T4)', coords: { x: 590, y: 350 }, note: 'Santuario Negro' },
      { id: 'wp-v-7', title: '7. Bóveda Skeklac (T5)', coords: { x: 880, y: 600 }, note: 'Tumba Solar de Umbral' },
      { id: 'wp-v-8', title: '8. Bóveda de Magma (T5)', coords: { x: 820, y: 890 }, note: 'Fragua Profunda' }
    ]
  },
  {
    id: 'route-bosses',
    icon: 'fire',
    title: 'Desafío de Jefes Mundiales y Élites',
    description: 'Circuito para desafiar a los grandes líderes y jefes de mundo.',
    color: '#e53e3e',
    waypoints: [
      { id: 'wp-b-1', title: '1. Rey Garou de la Tormenta (Nv. 85)', coords: { x: 70, y: 460 }, note: 'Highlands' },
      { id: 'wp-b-2', title: '2. Titán de los Caballeros Negros (Nv. 95)', coords: { x: 570, y: 320 }, note: 'Dowdun Reach' },
      { id: 'wp-b-3', title: '3. Fuzan el Radiante (Nv. 115)', coords: { x: 560, y: 840 }, note: 'Umbral Sands' },
      { id: 'wp-b-4', title: '4. Dragón de Magma Ancestral (Nv. 120)', coords: { x: 820, y: 920 }, note: 'Obsidian Caldera' }
    ]
  }
];

// Helper: Find locations by item / material name
export function findLocationsForMaterial(materialName) {
  if (!materialName) return [];
  const query = materialName.toLowerCase().trim();

  return MAP_MARKERS.filter((marker) => {
    if (marker.category !== 'resources') return false;
    if (marker.materialNames && marker.materialNames.some(m => m.toLowerCase().includes(query) || query.includes(m.toLowerCase()))) {
      return true;
    }
    if (marker.title.toLowerCase().includes(query) || marker.description.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  });
}

// Helper: Find location for quest
export function findLocationForQuest(questId, questTitle) {
  if (questId) {
    const direct = MAP_MARKERS.find(m => m.category === 'quests' && m.questId === questId);
    if (direct) return direct;
  }
  if (questTitle) {
    const qNorm = questTitle.toLowerCase();
    const found = MAP_MARKERS.find(m => m.category === 'quests' && m.title.toLowerCase().includes(qNorm));
    if (found) return found;
  }
  // Default central fallback
  return {
    id: `quest-generic-${questId}`,
    title: questTitle || 'Ubicación de Misión',
    category: 'quests',
    coords: { x: 260, y: 520 },
    region: 'Fractured Plains',
    description: 'Ubicación principal estimada en Ashenfall.',
    icon: 'Scroll',
    color: '#ecc94b'
  };
}

// Helper: Find location for vault
export function findLocationForVault(vaultId, vaultTitle) {
  if (vaultId) {
    const direct = MAP_MARKERS.find(
      (m) =>
        m.category === 'vaults' &&
        (m.vaultId === vaultId || m.id === vaultId || m.id === `vault-${vaultId}`)
    );
    if (direct) return direct;
  }
  if (vaultTitle) {
    const vNorm = vaultTitle.toLowerCase();
    const found = MAP_MARKERS.find(
      (m) =>
        m.category === 'vaults' &&
        (m.title.toLowerCase().includes(vNorm) || vNorm.includes(m.title.toLowerCase()))
    );
    if (found) return found;
  }
  return {
    id: `vault-generic-${vaultId || 'unknown'}`,
    title: vaultTitle || 'Bóveda Dragonkin',
    category: 'vaults',
    coords: { x: 377, y: 150 },
    region: 'Fellhollow',
    description: 'Bóveda oculta en Ashenfall.',
    icon: 'Shield',
    color: '#ecc94b'
  };
}
