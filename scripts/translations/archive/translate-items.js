import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.join(__dirname, '..', 'src', 'data', 'items.json');
const items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf-8'));

// 1. Dictionaries for Names, Terms, Materials, and Facilities
const FACILITY_TRANSLATIONS = {
  "Blacksmith's Bench": "Banco del Herrero",
  "Mystic Forge": "Fragua Mística",
  "Spinning Wheel": "Rueda de Hilar",
  "Loom": "Telar",
  "Fletching Bench": "Mesa de Flechería",
  "Fletching Station": "Puesto de Plumería & Flechería",
  "Brewing Cauldron": "Caldero de Pociones",
  "Alchemist's Table": "Mesa de Alquimia",
  "Crafting Table": "Mesa de Artesanía",
  "Tannery": "Curtiduría",
  "Campfire": "Hoguera de Campamento",
  "Cooking Pot": "Olla de Cocina",
  "Jeweler's Bench": "Banco del Joyero",
  "Blast Furnace": "Alto Horno",
  "Furnace": "Horno de Fundición",
  "Rune Altar": "Altar de Runas"
};

const SKILL_TRANSLATIONS = {
  "Artisan": "Artesanía",
  "Attack": "Ataque",
  "Cooking": "Cocina",
  "Magic": "Magia",
  "Mining": "Minería",
  "Ranged": "A Distancia",
  "Runecrafting": "Creación de Runas",
  "Woodcutting": "Tala de Árboles",
  "Agility": "Agilidad",
  "Farming": "Agricultura",
  "Fishing": "Pesca",
  "Construction": "Construcción"
};

const DAMAGE_TYPE_TRANSLATIONS = {
  "Slash": "Corte",
  "Crush": "Aplastamiento",
  "Stab": "Estocada",
  "Magic": "Mágico",
  "Ranged": "A Distancia"
};

const ATTACK_STYLE_TRANSLATIONS = {
  "Whip": "Látigo",
  "Sword": "Espada",
  "Greatsword": "Espadón",
  "Scimitar": "Cimitarra",
  "Dagger": "Daga",
  "Greataxe": "Hacha de Guerra",
  "Battleaxe": "Hacha de Batalla",
  "Mace": "Maza",
  "Warhammer": "Martillo de Guerra",
  "Bow": "Arco",
  "Shortbow": "Arco Corto",
  "Longbow": "Arco Largo",
  "Crossbow": "Ballesta",
  "Wand": "Varita",
  "Staff": "Bastón",
  "Battlestaff": "Bastón de Combate"
};

const ITEM_TYPE_TRANSLATIONS = {
  "Melee Weapon": "Arma Cuerpo a Cuerpo",
  "Ranged Weapon": "Arma a Distancia",
  "Magic Weapon": "Arma Mágica",
  "Weapon": "Arma de Combate",
  "Armour": "Armadura",
  "Armor": "Armadura",
  "Tool": "Herramienta",
  "Potion": "Poción / Brebaje",
  "Drink": "Bebida / Hidratación",
  "Food": "Comida / Sustento",
  "Consumable": "Consumible",
  "Basic Material": "Material Básico",
  "Processed Material": "Material Procesado",
  "Material": "Material",
  "Resource": "Recurso",
  "Component": "Componente de Forja",
  "Vestige": "Vestigio Antiguo",
  "Pattern": "Patrón de Crafteo",
  "Rune": "Runa Mágica",
  "Trinket": "Joya / Amuleto",
  "General Item": "Objeto General",
  "Ammunition": "Munición"
};

// Word replacements dictionary for item names
const NAME_REPLACEMENTS = [
  // Tiers & Materials
  [/\bBronze\b/gi, 'de Bronce'],
  [/\bIron\b/gi, 'de Hierro'],
  [/\bSteel\b/gi, 'de Acero'],
  [/\bMithril\b/gi, 'de Mithril'],
  [/\bAdamantite\b/gi, 'de Adamantita'],
  [/\bAdamant\b/gi, 'de Adamantita'],
  [/\bRune\b/gi, 'Rúnico/a'],
  [/\bBlack Knight\b/gi, 'de Caballero Negro'],
  [/\bBlack Metal\b/gi, 'de Metal Negro'],
  [/\bBlack\b/gi, 'Negro/a'],
  [/\bWhite Knight\b/gi, 'de Caballero Blanco'],
  [/\bWhite\b/gi, 'Blanco/a'],
  [/\bDragon\b/gi, 'de Dragón'],
  [/\bDragonhide\b/gi, 'de Cuero de Dragón'],
  [/\bDragonblight\b/gi, 'de Plaga de Dragón'],
  [/\bDragoncurse\b/gi, 'Maldición de Dragón'],
  [/\bDragonfire\b/gi, 'de Fuego de Dragón'],
  [/\bObsidian\b/gi, 'de Obsidiana'],
  [/\bBlurite\b/gi, 'de Blurita'],
  [/\bGranite\b/gi, 'de Granito'],
  [/\bLeather\b/gi, 'de Cuero'],
  [/\bHard Leather\b/gi, 'de Cuero Duro'],
  [/\bWooden\b/gi, 'de Madera'],
  [/\bWood\b/gi, 'de Madera'],
  [/\bOak\b/gi, 'de Roble'],
  [/\bWillow\b/gi, 'de Sauce'],
  [/\bMaple\b/gi, 'de Arce'],
  [/\bYew\b/gi, 'de Tejo'],
  [/\bAsh\b/gi, 'de Fresno'],
  [/\bMagic\b/gi, 'Mágico/a'],
  [/\bBlightwood\b/gi, 'de Madera Marchita'],
  [/\bSplitbark\b/gi, 'de Corteza Hendida'],
  [/\bAncestral\b/gi, 'Ancestral'],
  [/\bApprentice\b/gi, 'de Aprendiz'],
  [/\bAbyssal\b/gi, 'Abisal'],
  [/\bAbysmal\b/gi, 'Abismal'],
  [/\bNecromancer\b/gi, 'de Nigromante'],
  [/\bShadow\b/gi, 'Sombrío/a'],
  [/\bPoisoned\b/gi, 'Envenenado/a'],
  [/\bEnchanted\b/gi, 'Encantado/a'],
  [/\bBarbed\b/gi, 'Dentado/a'],
  [/\bFire\b/gi, 'de Fuego'],
  [/\bWater\b/gi, 'de Agua'],
  [/\bEarth\b/gi, 'de Tierra'],
  [/\bAir\b/gi, 'de Aire'],
  [/\bNature\b/gi, 'de la Naturaleza'],
  [/\bDeath\b/gi, 'de la Muerte'],
  [/\bBlood\b/gi, 'de Sangre'],
  [/\bAstral\b/gi, 'Astral'],
  [/\bLaw\b/gi, 'de la Ley'],
  [/\bChaos\b/gi, 'del Caos'],
  [/\bMind\b/gi, 'de la Mente'],
  [/\bBody\b/gi, 'del Cuerpo'],
  [/\bSoul\b/gi, 'del Alma'],
  [/\bCosmic\b/gi, 'Cósmico/a'],
  [/\bWrath\b/gi, 'de la Ira']
];

// Translate specific item name intelligently
function translateItemName(engName) {
  if (!engName) return '';
  let name = engName;

  // Specific common mapping
  const DIRECT_NAMES = {
    "Abyssal Whip": "Látigo Abisal",
    "Abysmal Whip": "Látigo Abismal",
    "Abyssal Spine": "Espina Abisal",
    "Abyssal Ashes": "Cenizas Abisales",
    "Abyssal Remains": "Restos Abisales",
    "Anti-Dragon Shield": "Escudo Anti-Dragón",
    "Dragonfire Shield": "Escudo de Fuego de Dragón",
    "Ava's Accumulator": "Acumulador de Ava",
    "Amulet of Glory": "Amuleto de Gloria",
    "Amulet of Strength": "Amuleto de Fuerza",
    "Amulet of Defence": "Amuleto de Defensa",
    "Amulet of Magic": "Amuleto de Magia",
    "Amulet of Accuracy": "Amuleto de Precisión",
    "Ring of Life": "Anillo de Vida",
    "Ring of Recoil": "Anillo de Retroceso",
    "Ring of Pursuit": "Anillo de Persecución",
    "Fine Thread": "Hilo Fino",
    "Fine Cloth": "Tela Fina",
    "Corpse Cotton": "Algodón Cadavérico",
    "Air Rune": "Runa de Aire",
    "Water Rune": "Runa de Agua",
    "Earth Rune": "Runa de Tierra",
    "Fire Rune": "Runa de Fuego",
    "Nature Rune": "Runa de la Naturaleza",
    "Law Rune": "Runa de la Ley",
    "Chaos Rune": "Runa del Caos",
    "Death Rune": "Runa de la Muerte",
    "Blood Rune": "Runa de Sangre",
    "Astral Rune": "Runa Astral",
    "Mind Rune": "Runa de la Mente",
    "Body Rune": "Runa del Cuerpo",
    "Rune Essence": "Esencia Rúnica",
    "Ground Rune Essence": "Esencia Rúnica Molida",
    "Antifire Potion": "Poción Antifuego",
    "Antipoison Potion": "Poción Antiponzoña",
    "Tome of Runecrafting - Vol 1": "Tomo de Creación de Runas - Vol 1",
    "Tome of Runecrafting - Vol 2": "Tomo de Creación de Runas - Vol 2",
    "Bedraggled Spellbook": "Libro de Hechizos Desgastado",
    "Aetheric Fundamentals, a Primordial Primer": "Fundamentos Etéreos: Manual Primordial"
  };

  if (DIRECT_NAMES[engName]) return DIRECT_NAMES[engName];

  // Pattern-based rules
  // e.g. "Adamant Pickaxe" -> "Pico de Adamantita"
  const itemTypeWords = [
    [/Pickaxe/i, 'Pico'],
    [/Logging Axe/i, 'Hacha de Tala'],
    [/Greataxe/i, 'Hacha de Guerra'],
    [/Battleaxe/i, 'Hacha de Batalla'],
    [/Greatsword/i, 'Espadón'],
    [/Scimitar/i, 'Cimitarra'],
    [/Sword/i, 'Espada'],
    [/Dagger/i, 'Daga'],
    [/Warhammer/i, 'Martillo de Guerra'],
    [/Mace/i, 'Maza'],
    [/Whip/i, 'Látigo'],
    [/Crossbow Limbs/i, 'Palas de Ballesta'],
    [/Crossbow/i, 'Ballesta'],
    [/Shortbow/i, 'Arco Corto'],
    [/Longbow/i, 'Arco Largo'],
    [/Bow/i, 'Arco'],
    [/Battlestaff/i, 'Bastón de Combate'],
    [/Staff/i, 'Bastón'],
    [/Wand/i, 'Varita'],
    [/Platebody/i, 'Coraza de Placas'],
    [/Platelegs/i, 'Perneras de Placas'],
    [/Med Helm/i, 'Casco Mediano'],
    [/Helmet/i, 'Casco'],
    [/Helm/i, 'Casco'],
    [/Coif/i, 'Capucha de Cuero'],
    [/Shield/i, 'Escudo'],
    [/Cape/i, 'Capa'],
    [/Robe Legs/i, 'Falda de Túnica'],
    [/Leggings/i, 'Perneras'],
    [/Chaps/i, 'Pantalones de Cuero'],
    [/Robe/i, 'Túnica'],
    [/Tunic/i, 'Túnica'],
    [/Hat/i, 'Sombrero'],
    [/Barbed Arrow/i, 'Flecha Dentada'],
    [/Fire Arrow/i, 'Flecha de Fuego'],
    [/Poisoned Arrow/i, 'Flecha Envenenada'],
    [/Arrow/i, 'Flecha'],
    [/Bolt/i, 'Perno de Ballesta'],
    [/Bolts/i, 'Pernos de Ballesta'],
    [/Spade/i, 'Pala'],
    [/Watering Can/i, 'Regadera'],
    [/Bar/i, 'Barra'],
    [/Ore/i, 'Mena'],
    [/Logs/i, 'Troncos'],
    [/Log/i, 'Tronco'],
    [/Plank/i, 'Tabla'],
    [/Leather/i, 'Cuero'],
    [/Hide/i, 'Piel'],
    [/Scale/i, 'Escama'],
    [/Potion/i, 'Poción'],
    [/Seed/i, 'Semilla'],
    [/Seeds/i, 'Semillas'],
    [/Stew/i, 'Estofado'],
    [/Broth/i, 'Caldo'],
    [/Pie/i, 'Tarta'],
    [/Ring/i, 'Anillo'],
    [/Amulet/i, 'Amuleto'],
    [/Necklace/i, 'Collar']
  ];

  for (const [pattern, espWord] of itemTypeWords) {
    if (pattern.test(engName)) {
      let materialPart = engName.replace(pattern, '').trim();
      let prefix = '';
      if (materialPart.startsWith('A ')) {
        materialPart = materialPart.substring(2);
        prefix = 'Un/a ';
      }

      // Translate material
      let espMat = materialPart;
      if (materialPart.includes('Bronze')) espMat = 'de Bronce';
      else if (materialPart.includes('Iron')) espMat = 'de Hierro';
      else if (materialPart.includes('Steel')) espMat = 'de Acero';
      else if (materialPart.includes('Mithril')) espMat = 'de Mithril';
      else if (materialPart.includes('Adamantite') || materialPart.includes('Adamant')) espMat = 'de Adamantita';
      else if (materialPart.includes('Rune')) espMat = 'Rúnico/a';
      else if (materialPart.includes('Black Knight')) espMat = 'de Caballero Negro';
      else if (materialPart.includes('Black')) espMat = 'Negro/a';
      else if (materialPart.includes('White Knight')) espMat = 'de Caballero Blanco';
      else if (materialPart.includes('White')) espMat = 'Blanco/a';
      else if (materialPart.includes('Dragon')) espMat = 'de Dragón';
      else if (materialPart.includes('Obsidian')) espMat = 'de Obsidiana';
      else if (materialPart.includes('Willow')) espMat = 'de Sauce';
      else if (materialPart.includes('Oak')) espMat = 'de Roble';
      else if (materialPart.includes('Maple')) espMat = 'de Arce';
      else if (materialPart.includes('Yew')) espMat = 'de Tejo';
      else if (materialPart.includes('Ash')) espMat = 'de Fresno';
      else if (materialPart.includes('Magic')) espMat = 'Mágico/a';
      else if (materialPart.includes('Blightwood')) espMat = 'de Madera Marchita';
      else if (materialPart.includes('Leather')) espMat = 'de Cuero';

      return `${espWord} ${espMat}`.trim();
    }
  }

  // Vestiges translation (A Brutal Bladehead -> Hoja Brutal Rota, etc.)
  if (engName.startsWith('A ')) {
    let base = engName.substring(2);
    if (base.includes('Bladehead')) return 'Punta de Hoja Brutal (Vestigio)';
    if (base.includes('Serrated Blade')) return 'Hoja Dentada Corroída (Vestigio)';
    if (base.includes('Vanity Mirror')) return 'Espejo de Tocador de Bronce Roto (Vestigio)';
    if (base.includes('Goblin Blade')) return 'Hoja Cruel de Trasgo (Vestigio)';
    if (base.includes('Crescent Carving')) return 'Talla Creciente Misteriosa (Vestigio)';
    if (base.includes('Broken Bow')) return 'Arco Roto Simple (Vestigio)';
    if (base.includes('String of Sinew')) return 'Cuerda de Tendón (Vestigio)';
    if (base.includes('Grain Sack')) return 'Saco de Grano Desgastado (Vestigio)';
  }

  return engName;
}

// Translate descriptions
function translateDescription(desc, title) {
  if (!desc) return '';
  let d = desc;

  const phraseMaps = [
    [/A sturdy pickaxe made of adamant\./i, "Un resistente pico forjado en pura adamantita."],
    [/A brutal weapon crafted from the spine of a terrifying Abyssal Demon\./i, "Una brutal arma forjada a partir de la columna vertebral de un temible Demonio Abisal."],
    [/A powerful looking blade, broken beyond repair\. Still, perhaps you could learn something from it\./i, "Una hoja de aspecto imponente, rota sin remedio. Aun así, tal vez puedas aprender algo de ella."],
    [/The rusted remains of a symbol of authority\. Perhaps you could learn something from it\./i, "Los restos oxidados de un símbolo de autoridad. Quizás puedas aprender algo de ellos."],
    [/Shows the worst possible side of yourself\. Perhaps you could learn something from it\./i, "Muestra el peor lado posible de ti mismo. Quizás puedas aprender algo de él."],
    [/A rusted blade with a wicked edge\. Barely usable now, but perhaps you could learn something\.\./i, "Una hoja oxidada con un filo perverso. Casi inservible ahora, pero quizás puedas aprender algo..."],
    [/What's left of a staff that feels soaked in sorrow\. Perhaps you could learn something from it\./i, "Lo que queda de un bastón empapado en dolor. Quizás puedas aprender algo de él."],
    [/The remains of a longbow damaged in a dragon attack\. Perhaps you could learn something from\.\./i, "Los restos de un arco largo dañado en el ataque de un dragón. Quizás puedas aprender algo..."],
    [/Sinew, bound tightly enough to be dangerous\. Useless now, but perhaps you could learn\.\./i, "Tendón trenzado con suficiente fuerza para ser peligroso. Inútil ahora, pero quizás puedas aprender..."],
    [/An odd bundle of scratchy sackcloth\. It's unsettling to hold\. Still, perhaps you could learn\.\./i, "Un extraño fardo de tela áspera de saco. Inquieta sostenerlo, pero quizás puedas aprender..."],
    [/A mysterious porous rock used as a base for powerful runes\./i, "Una misteriosa roca porosa utilizada como base para imbuir poderosas runas."],
    [/A symbol of blustering winds\./i, "Un símbolo de vientos tempestuosos, esencial para la magia de aire."],
    [/A symbol of the earth's might, essential for earth-based magic\./i, "Un símbolo del poder de la tierra, esencial para la magia elemental terrestre."],
    [/A symbol of flowing waters, essential for water-based magic and other spells\./i, "Un símbolo de aguas fluidas, esencial para la magia de agua y otros conjuros."],
    [/Equippable as ammo when using a magic weapon\./i, "Equipable como munición al empuñar un arma mágica."],
    [/Resource needed for teleportation\./i, "Recurso necesario para hechizos de teletransporte y conjuros avanzados."],
    [/Nature runes are used for casting transmutation spells\./i, "Las runas de naturaleza se usan para lanzar hechizos de transmutación y alquimia."],
    [/Astral runes are used for casting advanced magic spells and attacks\./i, "Las runas astrales se usan para lanzar hechizos mágicos avanzados y ataques místicos."],
    [/A book filled with knowledge on how to bind anima within rune essence\./i, "Un libro repleto de sabiduría sobre cómo canalizar el ánima dentro de la esencia rúnica."],
    [/Made from spun corpse cotton\. Can be used as a bow string and in stitching weapons and gear\./i, "Fabricado a partir de algodón cadavérico hilado. Puede usarse como cuerda de arco y para confeccionar equipo y armas."],
    [/A refreshing, fruity drink\. Good for hydration\./i, "Una bebida refrescante y afrutada. Excelente para la hidratación en Ashenfall."],
    [/A source of hydration, tainted by the residue of a cataclysmic event\./i, "Una fuente de hidratación, contaminada por los residuos de un cataclismo."],
    [/A cloth shoulder bag, contains useful smithing materials\./i, "Una bolsa de tela para hombro que contiene útiles materiales de herrería."],
    [/Harvested from flax plants, essential for crafting linen and bowstrings\./i, "Cosechado de plantas de lino, esencial para elaborar lienzos y cuerdas de arco."],
    [/A dense stone used for construction and crafting\./i, "Una densa piedra utilizada para la construcción y la forja."],
    [/Fine limestone ground from limestone\./i, "Fina piedra caliza molida a partir de roca caliza."]
  ];

  for (const [regex, espText] of phraseMaps) {
    if (regex.test(d)) return espText;
  }

  return d;
}

// 2. Perform translation on all items
console.log(`Translating ${items.length} items to Spanish...`);

for (const item of items) {
  // Store original English title for search reference
  item.englishTitle = item.title;

  // Translate name
  item.name = translateItemName(item.title);

  // Translate Category
  const CAT_MAP = {
    'Weapons': 'Armas de Combate',
    'Armour': 'Armaduras & Ropa',
    'Tools': 'Herramientas',
    'Consumables & Potions': 'Pociones & Comida',
    'Materials': 'Materiales & Minerales',
    'Vestiges & Patterns': 'Vestigios & Patrones',
    'Runecrafting & Magic': 'Runas & Magia',
    'Other': 'Otros Objetos'
  };
  item.category = CAT_MAP[item.category] || item.category;

  // Translate itemType
  item.itemType = ITEM_TYPE_TRANSLATIONS[item.itemType] || item.itemType;

  // Translate description
  item.description = translateDescription(item.description, item.title);

  // Translate stats
  if (item.stats) {
    if (item.stats.damageType) {
      item.stats.damageType = DAMAGE_TYPE_TRANSLATIONS[item.stats.damageType] || item.stats.damageType;
    }
    if (item.stats.attackStyle) {
      item.stats.attackStyle = ATTACK_STYLE_TRANSLATIONS[item.stats.attackStyle] || item.stats.attackStyle;
    }
    if (item.stats.specialAction) {
      item.stats.specialAction = item.stats.specialAction
        .replace(/Special Attack/gi, 'Ataque Especial')
        .replace(/Special/gi, 'Especial');
    }
    if (item.stats.specialEffect) {
      item.stats.specialEffect = item.stats.specialEffect
        .replace(/Bleed on Enemies/gi, 'Sangrado a los enemigos')
        .replace(/Can BLOCK using UNARMED BLOCK/gi, 'Puede BLOQUEAR usando bloqueo desarmado')
        .replace(/Launches DEMONIC ENERGY that homes in on a target, dealing DAMAGE and KNOCKING them DOWN/gi, 'Lanza ENERGÍA DEMONÍACA teledirigida que inflige DAÑO y DERRIBA al objetivo');
    }
  }

  // Translate repairCost
  if (item.repairCost) {
    let rep = item.repairCost;
    rep = rep.replace(/adamant bar/gi, 'barra de adamantita')
      .replace(/iron bar/gi, 'barra de hierro')
      .replace(/steel bar/gi, 'barra de acero')
      .replace(/mithril bar/gi, 'barra de mithril')
      .replace(/bronze bar/gi, 'barra de bronce')
      .replace(/abyssal spine/gi, 'espina abisal')
      .replace(/rune bar/gi, 'barra rúnica')
      .replace(/dragon leather/gi, 'cuero de dragón');
    item.repairCost = rep;
  }

  // Translate recipe
  if (item.recipe) {
    item.recipe.facility = FACILITY_TRANSLATIONS[item.recipe.facility] || item.recipe.facility;
    item.recipe.skill = SKILL_TRANSLATIONS[item.recipe.skill] || item.recipe.skill;
    if (item.recipe.materials) {
      item.recipe.materials.forEach((mat) => {
        mat.englishItem = mat.item;
        mat.item = translateItemName(mat.item);
      });
    }
  }

  // Translate usedIn
  if (item.usedIn) {
    item.usedIn.forEach((u) => {
      u.englishTitle = u.title;
      u.title = translateItemName(u.title);
      u.category = CAT_MAP[u.category] || u.category;
      u.facility = FACILITY_TRANSLATIONS[u.facility] || u.facility;
    });
  }
}

// Save back to items.json
fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf-8');
console.log(`Successfully translated ${items.length} items to Spanish!`);
