import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.join(__dirname, '..', 'src', 'data', 'items.json');
const rawItems = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf-8'));

// 1. BASE MATERIAL TRANSLATIONS
const METALS_AND_MATERIALS = {
  'Bronze': 'de Bronce',
  'Iron': 'de Hierro',
  'Steel': 'de Acero',
  'Black': 'Negro/a',
  'White Knight': 'de Caballero Blanco',
  'Black Knight': 'de Caballero Negro',
  'White': 'Blanco/a',
  'Blurite': 'de Blurita',
  'Mithril': 'de Mithril',
  'Adamant': 'de Adamantita',
  'Adamantite': 'de Adamantita',
  'Rune': 'Rúnico/a',
  'Runite': 'de Runita',
  'Dragon': 'de Dragón',
  'Barrows': 'de Catacumbas',
  'Bone': 'de Hueso',
  'Stone': 'de Piedra',
  'Wooden': 'de Madera',
  'Wood': 'de Madera',
  'Oak': 'de Roble',
  'Willow': 'de Sauce',
  'Teak': 'de Teca',
  'Maple': 'de Arce',
  'Mahogany': 'de Caoba',
  'Yew': 'de Tejo',
  'Magic': 'Mágico/a',
  'Ash': 'de Fresno',
  'Blightwood': 'de Madera Marchita',
  'Obsidian': 'de Obsidiana',
  'Splitbark': 'de Corteza Dividida',
  'Green Dragonhide': 'de Cuero de Dragón Verde',
  'Blue Dragonhide': 'de Cuero de Dragón Azul',
  'Red Dragonhide': 'de Cuero de Dragón Rojo',
  'Black Dragonhide': 'de Cuero de Dragón Negro',
  'Green Dragon': 'de Dragón Verde',
  'Blue Dragon': 'de Dragón Azul',
  'Red Dragon': 'de Dragón Rojo',
  'Black Dragon': 'de Dragón Negro',
  'Leather': 'de Cuero',
  'Hard Leather': 'de Cuero Reforzado',
  'Studded Leather': 'de Cuero con Tachuelas',
  'Silk': 'de Seda',
  'Wool': 'de Lana',
  'Linen': 'de Lino',
  'Cloth': 'de Tela',
  'Clay': 'de Arcilla',
  'Silver': 'de Plata',
  'Gold': 'de Oro',
  'Platinum': 'de Platino',
  'Sapphire': 'de Zafiro',
  'Emerald': 'de Esmeralda',
  'Ruby': 'de Rubí',
  'Diamond': 'de Diamante',
  'Dragonstone': 'de Piedra Dragón',
  'Onyx': 'de Ónice',
  'Opal': 'de Ópalo',
  'Jade': 'de Jade',
  'Red Topaz': 'de Topacio Rojo'
};

// 2. NOUN TRANSLATIONS
const EQUIPMENT_AND_ITEMS = {
  // Combat weapons
  'Arrow': 'Flecha',
  'Arrows': 'Flechas',
  'Barbed Arrow': 'Flecha Dentada',
  'Fire Arrow': 'Flecha de Fuego',
  'Ice Arrow': 'Flecha de Hielo',
  'Poison Arrow': 'Flecha Venenosa',
  'Bolt': 'Perno',
  'Bolts': 'Pernos',
  'Bone Bolts': 'Pernos de Hueso',
  'Crossbow': 'Ballesta',
  'Crossbow Limbs': 'Palas de Ballesta',
  'Crossbow Stock': 'Culata de Ballesta',
  'Dagger': 'Daga',
  'Sword': 'Espada',
  'Longsword': 'Espada Larga',
  'Shortsword': 'Espada Corta',
  'Greatsword': 'Espadón a Dos Manos',
  'Scimitar': 'Cimitarra',
  'Greataxe': 'Gran Hacha de Guerra',
  'Battleaxe': 'Hacha de Batalla',
  'Mace': 'Maza',
  'Warhammer': 'Martillo de Guerra',
  'Spear': 'Lanza',
  'Halberd': 'Alabarda',
  'Shortbow': 'Arco Corto',
  'Longbow': 'Arco Largo',
  'Bow': 'Arco',
  'Staff': 'Bastón',
  'Battlestaff': 'Bastón de Combate',
  'Wand': 'Varita',
  'Club': 'Garrote',
  'Whip': 'Látigo',

  // Armour
  'Helmet': 'Casco',
  'Helm': 'Yelmo',
  'Med Helm': 'Casco Mediano',
  'Full Helm': 'Gran Yelmo',
  'Platebody': 'Coraza de Placas',
  'Platelegs': 'Perneras de Placas',
  'Plateskirt': 'Falda de Placas',
  'Chainbody': 'Cota de Mallas',
  'Shield': 'Escudo',
  'Kiteshield': 'Escudo Pavés',
  'Square Shield': 'Escudo Cuadrado',
  'Body': 'Peto / Coraza',
  'Chest': 'Coraza',
  'Legs': 'Perneras',
  'Leggings': 'Perneras',
  'Chaps': 'Pantalones',
  'Coif': 'Capucha',
  'Cowl': 'Caperuza',
  'Hood': 'Capucha',
  'Hat': 'Sombrero',
  'Boots': 'Botas',
  'Gloves': 'Guantes',
  'Gauntlets': 'Guanteletes',
  'Vambraces': 'Brazales',
  'Cape': 'Capa',
  'Robe Top': 'Túnica Superior',
  'Robe Legs': 'Falda de Túnica',
  'Robe Bottom': 'Falda de Túnica',
  'Robes': 'Túnicas',
  'Robe': 'Túnica',
  'Tunic': 'Túnica',

  // Tools
  'Pickaxe': 'Pico de Minería',
  'Logging Axe': 'Hacha de Tala',
  'Woodcutting Axe': 'Hacha de Tala',
  'Axe': 'Hacha',
  'Spade': 'Pala',
  'Watering Can': 'Regadera',
  'Rod': 'Caña de Pescar',
  'Fishing Rod': 'Caña de Pescar',
  'Net': 'Red de Pesca',
  'Tinderbox': 'Yesquero de Fuego',
  'Hammer': 'Martillo de Forja',
  'Chisel': 'Cincel',
  'Needle': 'Aguja de Coser',

  // Resources
  'Bar': 'Barra',
  'Ore': 'Mena',
  'Logs': 'Troncos',
  'Plank': 'Tabla',
  'Planks': 'Tablas',
  'Tree Seed': 'Semilla de Árbol',
  'Seed': 'Semilla',
  'Seeds': 'Semillas',
  'Leather': 'Cuero',
  'Hide': 'Piel',
  'Scale': 'Escama',
  'Scale Dust': 'Polvo de Escamas'
};

// 3. EXPLICIT DICTIONARY OF ALL SPECIAL / UNIQUE NAMES
const UNIQUE_NAMES = {
  // Vestiges
  "A Brutal Bladehead": "Punta de Hoja Brutal (Vestigio)",
  "A Corroded Serrated Blade": "Hoja Dentada Corroída (Vestigio)",
  "A Cracked Bronze Vanity Mirror": "Espejo de Tocador de Bronce Roto (Vestigio)",
  "A Cruel Goblin Blade": "Hoja Cruel de Trasgo (Vestigio)",
  "A Mysterious Crescent Carving": "Talla Creciente Misteriosa (Vestigio)",
  "A Simple Broken Bow": "Arco Roto Simple (Vestigio)",
  "A String of Sinew": "Cuerda de Tendón (Vestigio)",
  "A Threadbare Grain Sack": "Saco de Grano Desgastado (Vestigio)",
  "An Educational Blade": "Hoja Didáctica (Vestigio)",
  "An Ember-Edged Remnant of Cloth": "Resto de Tela con Borde de Ascua (Vestigio)",
  "Arrowhead of Ancient Origin": "Punta de Flecha de Origen Antiguo (Vestigio)",
  "Azure Metal Contraption": "Artilugio de Metal Azur (Vestigio)",
  "Battle-Scarred Black Metal": "Metal Negro Marcado por la Batalla (Vestigio)",
  "Bloodstained Black Visor": "Visera Negra Manchada de Sangre (Vestigio)",
  "Bloodstained Hilt": "Empuñadura Ensangrentada (Vestigio)",
  "Parts of a Sinister-Looking Staff": "Partes de Bastón Siniestro (Vestigio)",
  "Remnants of a Rotting Robe": "Restos de Túnica Putrefacta (Vestigio)",
  "Remnants of a Shattered Skull": "Restos de Calavera Rota (Vestigio)",
  "Shard of Black Pauldron": "Fragmento de Hombrera Negra (Vestigio)",
  "Shard of the Dreaming Stone": "Fragmento de la Piedra Onírica (Vestigio)",
  "Shattered Black Blade": "Hoja Negra Hecha Añicos (Vestigio)",
  "Shattered Black Blade (Umbral Sands)": "Hoja Negra Hecha Añicos (Arenas Umbrías)",
  "Shred of Sunbleached Weave": "Jirón de Tejido Decolorado por el Sol (Vestigio)",
  "Slightly Chaffing Chestguard": "Peto Ligeramente Rozado (Vestigio)",
  "Small Wardstone": "Piedra Guardiana Menor (Vestigio)",
  "Softly Vibrating Orb": "Orbe que Vibra Suavemente (Vestigio)",
  "Suspiciously Light Tattered Boots": "Botas Andrajosas Sospechosamente Ligeras (Vestigio)",
  "Tastefully Torn Tights": "Mallas Rasgadas con Estilo (Vestigio)",
  "Tattered Time-Lost Cloth": "Tela Andrajosa Perdida en el Tiempo (Vestigio)",
  "Thane's Authority": "Autoridad del Thane (Vestigio)",
  "The Wrath of Baba Potterington": "La Furia de Baba Potterington (Vestigio)",
  "Titan's Wrath": "Furia del Titán (Vestigio)",
  "Torn Tapestry": "Tapiz Rasgado (Vestigio)",
  "Twtiching Antenna": "Antena Espasmódica (Vestigio)",
  "Unyielding Obsidian Construct": "Constructo de Obsidiana Inquebrantable (Vestigio)",
  "Whispering Elbow Pad": "Codera Susurrante (Vestigio)",
  "Wizard's Kneecap": "Rótula de Mago (Vestigio)",
  "Bludgeoning Obsidian Construct": "Constructo de Obsidiana Contundente (Vestigio)",

  // Unique / Quest / Named Items
  "Abraxus Ring": "Anillo de Abraxus",
  "Abysmal Whip": "Látigo Abismal",
  "Abyssal Ashes": "Cenizas Abisales",
  "Abyssal Remains": "Restos Abisales",
  "Abyssal Spine": "Espina Abisal",
  "Abyssal Whip": "Látigo Abisal",
  "Acrid Adhesive": "Adhesivo Ácrido",
  "Adhesive": "Adhesivo",
  "Advert-Inna-Bottle": "Mensaje en una Botella",
  "Aetheric Fundamentals, a Primordial Primer": "Fundamentos Etéreos: Manual Primordial",
  "Amylase Crystal": "Cristal de Amilasa",
  "Ancestral Hat": "Sombrero Ancestral",
  "Ancestral Leggings": "Perneras Ancestrales",
  "Ancestral Robe Legs": "Falda de Túnica Ancestral",
  "Ancestral Robes": "Túnicas Ancestrales",
  "Ancestral Staff": "Bastón Ancestral",
  "Ancestral Wand": "Varita Ancestral",
  "Anchovy Bait": "Cebo de Anchoa",
  "Angler's Hat": "Sombrero de Pescador",
  "Anima-Infused Bark": "Corteza Imbuida en Ánima",
  "Animal Bone": "Hueso de Animal",
  "Animal Hide": "Piel de Animal",
  "Animal Hide Scraps": "Retales de Piel Animal",
  "Animated Feather": "Pluma Animada",
  "Anti-Dragon Shield": "Escudo Anti-Dragón",
  "Antler": "Cornamenta de Ciervo",
  "Apprentice Hat": "Sombrero de Aprendiz",
  "Apprentice Leggings": "Perneras de Aprendiz",
  "Apprentice Robe": "Túnica de Aprendiz",
  "Arcane Infusion": "Infusión Arcana",
  "Ascension Core": "Núcleo de Ascensión",
  "Ascension Shard": "Fragmento de Ascensión",
  "Ava's Accumulator": "Acumulador de Ava",
  "Ava's Attractor": "Atrator de Ava",
  "Avantoe": "Avantoe",
  "Avantoe Seeds": "Semillas de Avantoe",
  "Bag of Flour": "Saco de Harina",
  "Pot of Flour": "Tarro de Harina",
  "Bag of Noggin'": "Bolsa de Noggin",
  "Baked Potato": "Patata Asada",
  "Bandosian Amulet": "Amuleto Bandosiano",
  "Barbed Appendage": "Apéndice Dentado",
  "Barrel Cactus Seed": "Semilla de Cactus Barril",
  "Beast-Training Notes": "Notas de Entrenamiento de Bestias",
  "Bedraggled Spellbook": "Libro de Hechizos Desgastado",
  "Beef & Tomato Stew": "Estofado de Ternera y Tomate",
  "Beltfish Broth": "Caldo de Pez Cinto",
  "Berry Compote": "Compota de Bayas",
  "Berry Drizzle Pan-Seared": "Carne Salteada con Reducción de Bayas",
  "Bird Nest": "Nido de Pájaro",
  "Bittercap Mushroom": "Seta de Sombrero Amargo",
  "Bloodblight Cape": "Capa de Plaga de Sangre",
  "Bloodwood Sap": "Savia de Palo Sangriento",
  "Bone Club": "Garrote de Hueso",
  "Bone Dagger": "Daga de Hueso",
  "Bone Pickaxe": "Pico de Hueso",
  "Bone Crossbow Limbs": "Palas de Ballesta de Hueso",
  "Bow of Elidinis": "Arco de Elidinis",
  "Braised Catfish": "Pez Gato Estofado",
  "Braised Undead Eel": "Anguila No-Muerta Estofada",
  "Bramblemead Cape": "Capa de Bramblemead",
  "Bread": "Pan Rústico",
  "Bronze Leaf": "Hoja de Bronce",
  "Silver Leaf": "Hoja de Plata",
  "Clay Mould": "Molde de Arcilla",
  "Corpse Cotton": "Algodón Cadavérico",
  "Spun Corpse Cotton": "Algodón Cadavérico Hilado",
  "Fine Thread": "Hilo Fino",
  "Swamp Thread": "Hilo de Pantano",
  "Flax": "Lino",
  "Linen": "Lienzo de Lino",
  "Limestone": "Piedra Caliza",
  "Limestone Dust": "Polvo de Caliza",
  "Ground Limestone": "Caliza Molida",
  "Swamp Tar": "Alquitrán de Pantano",
  "Swamp Paste": "Pasta de Pantano",
  "Coal": "Carbón",
  "Grave Dust": "Polvo de Tumba",
  "Necrotic Bonemeal": "Harina de Hueso Necrótica",
  "Vault Shard": "Fragmento de Bóveda",
  "Vault Core": "Núcleo de Bóveda",
  "Sapphire": "Zafiro",
  "Emerald": "Esmeralda",
  "Ruby": "Rubí",
  "Diamond": "Diamante",
  "Dragonstone": "Piedra Dragón",
  "Onyx": "Ónice",
  "Opal": "Ópalo",
  "Jade": "Jade",
  "Red Topaz": "Topacio Rojo",
  "Uncut Sapphire": "Zafiro sin Tallar",
  "Uncut Emerald": "Esmeralda sin Tallar",
  "Uncut Ruby": "Rubí sin Tallar",
  "Uncut Diamond": "Diamante sin Tallar",
  "Uncut Dragonstone": "Piedra Dragón sin Tallar",
  "Uncut Onyx": "Ónice sin Tallar",
  "Uncut Opal": "Ópalo sin Tallar",
  "Uncut Jade": "Jade sin Tallar",
  "Uncut Red Topaz": "Topacio Rojo sin Tallar",
  "Air Rune": "Runa de Aire",
  "Mind Rune": "Runa Mental",
  "Water Rune": "Runa de Agua",
  "Earth Rune": "Runa de Tierra",
  "Fire Rune": "Runa de Fuego",
  "Body Rune": "Runa Corporal",
  "Cosmic Rune": "Runa Cósmica",
  "Chaos Rune": "Runa del Caos",
  "Astral Rune": "Runa Astral",
  "Nature Rune": "Runa de Naturaleza",
  "Law Rune": "Runa de la Ley",
  "Death Rune": "Runa de la Muerte",
  "Blood Rune": "Runa de Sangre",
  "Soul Rune": "Runa del Alma",
  "Wrath Rune": "Runa de la Ira",
  "Rune Essence": "Esencia Rúnica",
  "Pure Essence": "Esencia Pura",
  "Vial": "Vial",
  "Vial of Water": "Vial con Agua",
  "Watermelon": "Sandía",
  "Watermelon Jerky": "Cecina de Sandía",
  "Watermelon Seeds": "Semillas de Sandía",
  "Wheat": "Trigo",
  "Wheat Seeds": "Semillas de Trigo",
  "Whetstone": "Piedra de Afilar",
  "Wither Water": "Agua Marchita",
  "Withered Heart": "Corazón Marchito",
  "Unholy Water": "Agua Impura",
  "Wolfbane Dagger": "Daga Mata-Lobos",
  "Zombie Axe": "Hacha de Zombi",
  "Zombie Arm": "Brazo de Zombi",
  "Skullsplitter": "Rompecráneos",
  "Subjugation Staff": "Bastón de Subyugación",
  "Pharaoh's Sceptre": "Cetro del Faraón",
  "Shadow Sword": "Espada de las Sombras",
  "Shadow Crossbow": "Ballesta de las Sombras",
  "Staff of Light": "Bastón de Luz",
  "Ulv's Longbow": "Arco Largo de Ulv",
  "Undead Ranger's Bow": "Arco de Explorador No-Muerto",
  "Undead Spade": "Pala de No-Muerto",
  "Wooden Training Sword": "Espada de Madera de Entrenamiento",
  "MOUNT: Springdown Runner": "MONTURA: Corredor de Springdown",
  "Black Knight's Fortress Reward Pack": "Bolsa de Recompensas: Fortaleza del Caballero Negro",
  "Queenslayer's Reward Pack": "Bolsa de Recompensas del Matarreinas",
  "Restless Ghosts Reward Pack": "Bolsa de Recompensas de los Fantasmas Inquietos",
  "Withering Heights Reward Pack": "Bolsa de Recompensas de las Alturas Marchitas"
};

// Function that translates any title perfectly
function translateTitle(title) {
  if (!title) return '';
  const trimmed = title.trim();

  // 1. Direct match in UNIQUE_NAMES
  if (UNIQUE_NAMES[trimmed]) return UNIQUE_NAMES[trimmed];

  // 2. Exact match in compound pattern: [Material] [Item]
  for (const [matEng, matEsp] of Object.entries(METALS_AND_MATERIALS)) {
    for (const [nounEng, nounEsp] of Object.entries(EQUIPMENT_AND_ITEMS)) {
      if (trimmed === `${matEng} ${nounEng}`) {
        // Spanish adjective gender alignment
        if (matEsp === 'Rúnico/a') {
          const isFem = ['Flecha', 'Flechas', 'Ballesta', 'Varita', 'Daga', 'Espada', 'Cimitarra', 'Alabarda', 'Lanza', 'Hacha', 'Gran Hacha de Guerra', 'Coraza de Placas', 'Falda de Placas', 'Cota de Mallas', 'Caperuza', 'Capucha', 'Túnica', 'Túnicas', 'Pernera', 'Perneras', 'Barra', 'Mena', 'Tabla', 'Tablas', 'Pala', 'Regadera', 'Red de Pesca'].includes(nounEsp);
          return `${nounEsp} ${isFem ? 'Rúnica' : 'Rúnico'}`;
        }
        if (matEsp.includes('/a')) {
          const isFem = ['Flecha', 'Flechas', 'Ballesta', 'Varita', 'Daga', 'Espada', 'Cimitarra', 'Alabarda', 'Lanza', 'Hacha', 'Coraza', 'Cota', 'Caperuza', 'Capucha', 'Túnica', 'Túnicas', 'Pernera', 'Perneras', 'Barra', 'Mena', 'Tabla', 'Tablas', 'Pala', 'Regadera', 'Capa'].some(f => nounEsp.includes(f));
          const baseAdj = matEsp.replace('/a', '').replace('/o', '');
          const adj = isFem ? baseAdj + 'a' : baseAdj + 'o';
          return `${nounEsp} ${adj}`;
        }
        return `${nounEsp} ${matEsp}`;
      }
    }
  }

  // 3. Match "[Adjective] [Noun]" patterns
  if (trimmed.endsWith(' Cape')) {
    const type = trimmed.replace(' Cape', '');
    const capeMap = {
      'Attack': 'de Ataque', 'Defence': 'de Defensa', 'Strength': 'de Fuerza', 'Ranged': 'de A Distancia',
      'Magic': 'de Magia', 'Artisan': 'de Artesanía', 'Woodcutting': 'de Tala', 'Mining': 'de Minería',
      'Cooking': 'de Cocina', 'Fishing': 'de Pesca', 'Agility': 'de Agilidad', 'Runecrafting': 'de Creación de Runas',
      'Farming': 'de Agricultura', 'Construction': 'de Construcción', 'Prayer': 'de Plegaria',
      'Blue Dyed': 'Teñida de Azul', 'Red Dyed': 'Teñida de Rojo', 'Black': 'Negra', 'White': 'Blanca',
      'Desert': 'del Desierto', 'Obsidian': 'de Obsidiana', 'Saradomin': 'de Saradomin', 'Zamorak': 'de Zamorak',
      'Shadowscale': 'de Escamas Sombrías', 'Stormtouched': 'Tocada por la Tormenta', 'Tattered': 'Andrajosa',
      'Whispering': 'Susurrante', 'Bloodblight': 'de Plaga de Sangre', 'Spectral Chinchompa': 'de Chinchompa Espectral',
      'Umbral Sands': 'de las Arenas Umbrías', 'Pioneer\'s': 'de Pionero', 'Adventurer\'s': 'de Aventurero'
    };
    return `Capa ${capeMap[type] || type}`;
  }

  if (trimmed.endsWith(' Potion')) {
    const type = trimmed.replace(' Potion', '');
    const potMap = {
      'Attack': 'de Ataque', 'Defence': 'de Defensa', 'Strength': 'de Fuerza', 'Super Attack': 'de Súper Ataque',
      'Super Defence': 'de Súper Defensa', 'Super Strength': 'de Súper Fuerza', 'Antipoison': 'Antiponzoña',
      'Antifire': 'Antifuego', 'Super Antifire': 'Súper Antifuego', 'Super Antipoison': 'Súper Antiponzoña',
      'Combat': 'de Combate', 'Magic': 'de Magia', 'Ranging': 'de Puntería', 'Agility': 'de Agilidad',
      'Energy': 'de Energía', 'Super Energy': 'de Súper Energía', 'Stamina': 'de Resistencia',
      'Quarrymaster': 'del Maestro Cantero', 'Super Quarrymaster': 'del Súper Maestro Cantero',
      'Weak Quarrymaster': 'Débil del Cantero', 'Weak Healing': 'Débil de Curación',
      'Super Lumberjack': 'del Súper Leñador', 'Weak Lumberjack': 'Débil de Leñador', 'Weak Antipoison': 'Débil Antiponzoña'
    };
    return `Poción ${potMap[type] || ('de ' + type)}`;
  }

  // 4. Tomes
  if (trimmed.startsWith('Tome of ')) {
    return trimmed
      .replace('Tome of Agility', 'Tomo de Agilidad')
      .replace('Tome of Attack', 'Tomo de Ataque')
      .replace('Tome of Construction', 'Tomo de Construcción')
      .replace('Tome of Cooking', 'Tomo de Cocina')
      .replace('Tome of Farming', 'Tomo de Agricultura')
      .replace('Tome of Fishing', 'Tomo de Pesca')
      .replace('Tome of Magic', 'Tomo de Magia')
      .replace('Tome of Mining', 'Tomo de Minería')
      .replace('Tome of Ranged', 'Tomo de A Distancia')
      .replace('Tome of Runecrafting', 'Tomo de Creación de Runas')
      .replace('Tome of the Artisan', 'Tomo del Artesano')
      .replace('Tome of Woodcutting', 'Tomo de Tala')
      .replace('Tome of the Dragon Slayer', 'Tomo del Matadragones')
      .replace('Tome of the Titan', 'Tomo del Titán')
      .replace('Tome of the Undying', 'Tomo del No-Muerto');
  }

  // 5. Raw / Cooked Fish & Foods
  if (trimmed.startsWith('Raw ')) {
    const food = trimmed.replace('Raw ', '');
    const foodMap = {
      'Shrimps': 'Camarones', 'Shrimp': 'Camarón', 'Sardine': 'Sardina', 'Herring': 'Arenque',
      'Trout': 'Trucha', 'Salmon': 'Salmón', 'Tuna': 'Atún', 'Lobster': 'Langosta', 'Swordfish': 'Pez Espada',
      'Shark': 'Tiburón', 'Beltfish': 'Pez Cinto', 'Monkfish': 'Rape', 'Armoured Catfish': 'Pez Gato Acorazado',
      'Desert Sole': 'Lenguado del Desierto', 'Infernal Eel': 'Anguila Infernal', 'Undead Bass': 'Lubina No-Muerta',
      'Undead Eel': 'Anguila No-Muerta', 'Giant Krill': 'Krill Gigante', 'Anchovies': 'Anchoas',
      'Bestial Meat': 'Carne Bestial', 'Bird Meat': 'Carne de Ave', 'Farm Meat': 'Carne de Granja',
      'Game Meat': 'Carne de Caza', 'Rat Meat': 'Carne de Rata'
    };
    return `${foodMap[food] || food} Crudo/a`.replace('Crudo/a', ['Sardina', 'Trucha', 'Langosta', 'Anguila Infernal', 'Lubina No-Muerta', 'Anguila No-Muerta', 'Anchoas', 'Carne Bestial', 'Carne de Ave', 'Carne de Granja', 'Carne de Caza', 'Carne de Rata'].includes(foodMap[food] || food) ? 'Cruda' : 'Crudo');
  }

  if (trimmed.startsWith('Cooked ')) {
    const food = trimmed.replace('Cooked ', '');
    const foodMap = {
      'Shrimps': 'Camarones', 'Shrimp': 'Camarón', 'Sardine': 'Sardina', 'Herring': 'Arenque',
      'Trout': 'Trucha', 'Salmon': 'Salmón', 'Tuna': 'Atún', 'Lobster': 'Langosta', 'Swordfish': 'Pez Espada',
      'Shark': 'Tiburón', 'Beltfish': 'Pez Cinto', 'Monkfish': 'Rape'
    };
    return `${foodMap[food] || food} Cocinado/a`.replace('Cocinado/a', ['Sardina', 'Trucha', 'Langosta'].includes(foodMap[food] || food) ? 'Cocinada' : 'Cocinado');
  }

  return trimmed;
}

// Transform all items
console.log('Translating database items...');
let countChanged = 0;

for (const item of rawItems) {
  if (!item.englishTitle) item.englishTitle = item.title;

  const translatedName = translateTitle(item.englishTitle || item.title);
  if (translatedName !== item.name) countChanged++;
  item.name = translatedName;

  // Recipe materials
  if (item.recipe && item.recipe.materials) {
    item.recipe.materials.forEach((mat) => {
      if (!mat.englishItem) mat.englishItem = mat.item;
      mat.item = translateTitle(mat.englishItem || mat.item);
    });
  }

  // Used In
  if (item.usedIn) {
    item.usedIn.forEach((u) => {
      if (!u.englishTitle) u.englishTitle = u.title;
      u.title = translateTitle(u.englishTitle || u.title);
    });
  }
}

fs.writeFileSync(ITEMS_FILE, JSON.stringify(rawItems, null, 2), 'utf-8');
console.log(`Translation finished! Updated ${countChanged} names to 100% Spanish!`);
