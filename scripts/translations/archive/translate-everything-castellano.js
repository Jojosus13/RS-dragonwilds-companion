import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.join(__dirname, '../src/data/items.json');
const items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf8'));

console.log(`Cargados ${items.length} objetos para traducción integral a castellano.`);

// 1. DICCIONARIO DE TIPOS DE OBJETO (itemType)
const ITEM_TYPE_MAP = {
  'Arrow': 'Flecha / Munición',
  'Ammo': 'Munición',
  'Melee Armour': 'Armadura Cuerpo a Cuerpo',
  'Basic Item': 'Objeto Básico',
  'Quest Item': 'Objeto de Misión',
  'Mage Armour': 'Ropaje Mágico',
  'Seed': 'Semilla de Cultivo',
  'Raw Ingredient': 'Ingrediente Crudo',
  'Ranged Armour': 'Armadura de Cazador',
  'Shield': 'Escudo Protector',
  'Cape': 'Capa de Héroe',
  'Consumables & Potions': 'Pociones & Consumibles',
  'Special Material': 'Material Especial',
  'Consumable Tome': 'Tomo de Aprendizaje',
  'Bow': 'Arma a Distancia (Arco)',
  'Armadura': 'Armadura Protectora',
  'Arma': 'Arma de Combate',
  'Herramienta': 'Herramienta de Trabajo',
  'Poción': 'Poción / Brebaje',
  'Comida': 'Comida / Sustento',
  'Material': 'Material de Forja',
  'Vestigio': 'Vestigio Antiguo',
  'Runa': 'Runa Mágica'
};

// 2. DICCIONARIO DE ESTACIONES DE TRABAJO (facility)
const FACILITY_MAP = {
  'Armour Bench': 'Banco de Armaduras',
  'Stone Range': 'Cocina de Piedra',
  'Sawmill': 'Aserradero de Madera',
  'Grindstone': 'Piedra de Afilar',
  'Cooking Range': 'Cocina de Hierro',
  'Advanced Tannery': 'Tenería Avanzada',
  'Curtiduría': 'Curtiduría',
  'Kiln': 'Horno de Cerámica',
  'Grill': 'Parrilla de Brasa',
  'Pottery Wheel': 'Torno de Alfarero',
  'Blacksmith Bench': 'Banco del Herrero',
  'Banco del Herrero': 'Banco del Herrero',
  'Smithing Forge': 'Forja de Herrería',
  'Fletching Table': 'Mesa de Flechería',
  'Mesa de Flechería': 'Mesa de Flechería',
  'Stonecutter': 'Cortador de Piedra',
  'Imbuing Barrel': 'Barril de Imbuir',
  'Advanced Spinning Wheel': 'Rueda de Hilar Avanzada',
  'Banco del Joyero': 'Banco del Joyero',
  'Alto Horno': 'Alto Horno',
  'Mesa de Artesanía': 'Mesa de Artesanía',
  'Altar de Runas': 'Altar de Runas',
  'Fragua Mística': 'Fragua Mística',
  'Caldero de Pociones': 'Caldero de Pociones',
  'Hoguera de Campamento': 'Hoguera de Campamento',
  'Olla de Cocina': 'Olla de Cocina',
  'Horno de Fundición': 'Horno de Fundición',
  'Rueda de Hilar': 'Rueda de Hilar',
  'Telar': 'Telar'
};

// 3. DICCIONARIO DE TIPOS DE DAÑO (damageType)
const DAMAGE_TYPE_MAP = {
  'Arrow': 'Flecha (Perforación)',
  'Bolt': 'Perno (Impacto)',
  'Water': 'Magia de Agua',
  'Fire': 'Magia de Fuego',
  'Slash and Crush': 'Corte y Aplastamiento',
  'Slash': 'Corte',
  'Crush': 'Aplastamiento',
  'Stab': 'Estocada',
  'Magic': 'Mágico',
  'Ranged': 'A Distancia'
};

// 4. DICCIONARIO DE ESTILOS DE ATAQUE (attackStyle)
const ATTACK_STYLE_MAP = {
  '2-Handed Weapon': 'Arma a Dos Manos',
  'Two Handed': 'A Dos Manos',
  'Main Hand': 'Mano Principal',
  'Ranged Weapon': 'Arma a Distancia',
  'Maul': 'Gran Maza',
  'Slash': 'Corte',
  'Crush': 'Aplastamiento',
  'Stab': 'Estocada'
};

// 5. TRADUCCIONES EXACTAS DE NOMBRES
const EXACT_NAMES = {
  // Ingredientes y Plantas
  'Avantoe': 'Avantoe (Hierba)',
  'Avantoe Seed': 'Semilla de Avantoe',
  'Grimy Avantoe': 'Avantoe Sucia',
  'Clean Avantoe': 'Avantoe Limpia',
  'Blightwood': 'Madera Marchita (Blightwood)',
  'Blightwood Log': 'Tronco de Blightwood',
  'Blightwood Logs': 'Troncos de Blightwood',
  'Blightwood Plank': 'Tabla de Blightwood',
  'Blightwood Bow': 'Arco de Blightwood',
  'Blightwood Shortbow': 'Arco Corto de Blightwood',
  'Blightwood Longbow': 'Arco Largo de Blightwood',
  'Blightwood Crossbow': 'Ballesta de Blightwood',
  'Blightwood Staff': 'Bastón de Blightwood',
  'Blightwood Shield': 'Escudo de Blightwood',
  'Cabbage': 'Col / Repollo',
  'Cabbage Seed': 'Semilla de Col',
  'Potato': 'Patata',
  'Potato Seed': 'Semilla de Patata',
  'Onion': 'Cebolla',
  'Onion Seed': 'Semilla de Cebolla',
  'Tomato': 'Tomate',
  'Tomato Seed': 'Semilla de Tomate',
  'Sweetcorn': 'Maíz Dulce',
  'Sweetcorn Seed': 'Semilla de Maíz Dulce',
  'Strawberry': 'Fresa Silvestre',
  'Strawberry Seed': 'Semilla de Fresa',
  'Watermelon': 'Sandía Jugosa',
  'Watermelon Seed': 'Semilla de Sandía',
  'Snape Grass': 'Hierba Snape',
  'Snape Grass Seed': 'Semilla de Hierba Snape',
  'Desert Weed': 'Hierba del Desierto',
  'Desert Thread': 'Hilo del Desierto',
  'Desert Cloth': 'Tela del Desierto',
  'Desert Hood': 'Capucha del Desierto',
  'Desert Net': 'Red del Desierto',
  'Desert Robes': 'Ropajes del Desierto',
  'Desert Robe Legs': 'Pantalones del Desierto',
  'Desert Boots': 'Botas del Desierto',
  'Desert Shirt': 'Camisa del Desierto',
  'Dire Wolf Hide': 'Piel de Huargo',
  'Dire Wolf Leather': 'Cuero de Huargo',
  'Dire Wolf Boots': 'Botas de Huargo',
  'Dire Wolf Coif': 'Capucha de Huargo',
  'Dire Wolf Chaps': 'Perneras de Huargo',
  'Dire Wolf Body': 'Peto de Huargo',
  'Cursed Essence': 'Esencia Maldita',
  'Cursed Leather': 'Cuero Maldito',
  'Dark Mage Hood': 'Capucha de Mago Oscuro',
  'Dark Mage Robe Legs': 'Falda de Mago Oscuro',
  'Dark Mage Robes': 'Túnica de Mago Oscuro',
  'Demonic Metal Rod': 'Vara de Metal Demoníaco',
  'Demonic Oil': 'Aceite Demoníaco',
  'Dented White Pauldron': 'Hombrera Blanca Abollada (Vestigio)',
  'Crucible Engram of the Hounded': 'Engrama del Crisol del Acosado (Vestigio)',
  'Crushed Obsidian Construct': 'Constructo de Obsidiana Aplastado (Vestigio)',
  'Crushed White Cuisse': 'Quijote Blanco Aplastado (Vestigio)',
  'Crystal Bow': 'Arco de Cristal Élfico',
  'Crystal Halberd': 'Alabarda de Cristal',
  'Crystal Shield': 'Escudo de Cristal',
  'Crystal Dagger': 'Daga de Cristal',
  'Crystal Staff': 'Bastón de Cristal',
  'Curse Carrying Crown': 'Corona Portadora de Maldiciones (Vestigio)',
  'Dragon Bones': 'Huesos de Dragón',
  'Big Bones': 'Huesos Grandes',
  'Bones': 'Huesos',
  'Flax': 'Lino',
  'Bow String': 'Cuerda de Arco',
  'Crossbow String': 'Cuerda de Ballesta',
  'Feather': 'Pluma',
  'Arrow Shaft': 'Astil de Flecha',
  'Headless Arrow': 'Flecha sin Punta',
  'Oak Logs': 'Troncos de Roble',
  'Willow Logs': 'Troncos de Sauce',
  'Maple Logs': 'Troncos de Arce',
  'Yew Logs': 'Troncos de Tejo',
  'Magic Logs': 'Troncos Mágicos',
  'Oak Plank': 'Tabla de Roble',
  'Willow Plank': 'Tabla de Sauce',
  'Maple Plank': 'Tabla de Arce',
  'Yew Plank': 'Tabla de Tejo',
  'Magic Plank': 'Tabla Mágica',
  'Plank': 'Tabla de Madera',
  'Logs': 'Troncos de Madera',
  'Copper Ore': 'Mena de Cobre',
  'Tin Ore': 'Mena de Estaño',
  'Iron Ore': 'Mena de Hierro',
  'Coal': 'Carbón',
  'Mithril Ore': 'Mena de Mithril',
  'Adamantite Ore': 'Mena de Adamantita',
  'Runite Ore': 'Mena de Runita',
  'Gold Ore': 'Mena de Oro',
  'Silver Ore': 'Mena de Plata',
  'Bronze Bar': 'Barra de Bronce',
  'Iron Bar': 'Barra de Hierro',
  'Steel Bar': 'Barra de Acero',
  'Mithril Bar': 'Barra de Mithril',
  'Adamantite Bar': 'Barra de Adamantita',
  'Runite Bar': 'Barra de Runita',
  'Gold Bar': 'Barra de Oro',
  'Silver Bar': 'Barra de Plata',
  'Leather': 'Cuero Curtido',
  'Hard Leather': 'Cuero Duro',
  'Cowhide': 'Piel de Vaca',
  'Snake Hide': 'Piel de Serpiente',
  'Snakeskin': 'Piel de Serpiente Curtida',
  'Green Dragon Leather': 'Cuero de Dragón Verde',
  'Blue Dragon Leather': 'Cuero de Dragón Azul',
  'Red Dragon Leather': 'Cuero de Dragón Rojo',
  'Black Dragon Leather': 'Cuero de Dragón Negro',
  'Green Dragonhide': 'Piel de Dragón Verde',
  'Blue Dragonhide': 'Piel de Dragón Azul',
  'Red Dragonhide': 'Piel de Dragón Rojo',
  'Black Dragonhide': 'Piel de Dragón Negro',
  'Raw Beef': 'Carne de Vaca Cruda',
  'Cooked Beef': 'Carne de Vaca Asada',
  'Raw Chicken': 'Pollo Crudo',
  'Cooked Chicken': 'Pollo Asado',
  'Raw Trout': 'Trucha Cruda',
  'Cooked Trout': 'Trucha Cocinada',
  'Raw Salmon': 'Salmón Crudo',
  'Cooked Salmon': 'Salmón Cocinado',
  'Raw Tuna': 'Atún Crudo',
  'Cooked Tuna': 'Atún Cocinado',
  'Raw Lobster': 'Langosta Cruda',
  'Cooked Lobster': 'Langosta Cocinada',
  'Raw Swordfish': 'Pez Espada Crudo',
  'Cooked Swordfish': 'Pez Espada Cocinado',
  'Raw Shark': 'Tiburón Crudo',
  'Cooked Shark': 'Tiburón Cocinado',
  'Raw Manta Ray': 'Manta Raya Cruda',
  'Cooked Manta Ray': 'Manta Raya Cocinada',
  'Raw Karambwan': 'Karambwan Crudo',
  'Cooked Karambwan': 'Karambwan Cocinado',
  'Bread': 'Pan Rústico',
  'Cake': 'Pastel Dulce',
  'Chocolate Cake': 'Pastel de Chocolate',
  'Meat Pie': 'Pastel de Carne',
  'Apple Pie': 'Pastel de Manzana',
  'Redberry Pie': 'Pastel de Frutos Rojos',
  'Stew': 'Estofado Casero',
  'Curry': 'Guiso de Curry',
  'Tinderbox': 'Caja de Yesca (Encendedor)',
  'Chisel': 'Cincel de Cantero',
  'Hammer': 'Martillo de Forja',
  'Spade': 'Pala de Excavación',
  'Shears': 'Tijeras de Esquilar',
  'Needle': 'Aguja de Coser',
  'Thread': 'Carrete de Hilo',
  'Pot': 'Olla de Barro',
  'Bowl': 'Cuenco de Madera',
  'Bucket': 'Cubo de Agua',
  'Vial': 'Vial Vacío',
  'Vial of Water': 'Vial de Agua Pura',
  'Pie Dish': 'Bandeja de Pastel',
  'Cake Tin': 'Molde de Pastel',
  'Pestle and Mortar': 'Mortero y Maja',
  'Fishing Rod': 'Caña de Pescar',
  'Fly Fishing Rod': 'Caña de Pesca con Mosca',
  'Harpoon': 'Arpón de Pesca',
  'Small Fishing Net': 'Red de Pesca Pequeña',
  'Big Fishing Net': 'Red de Pesca Grande',
  'Lobster Pot': 'Nasa para Langostas',
  'Fishing Bait': 'Cebo de Pesca',
  'Feather': 'Pluma de Ave',
  'Air Rune': 'Runa de Aire',
  'Water Rune': 'Runa de Agua',
  'Earth Rune': 'Runa de Tierra',
  'Fire Rune': 'Runa de Fuego',
  'Mind Rune': 'Runa Mental',
  'Body Rune': 'Runa de Cuerpo',
  'Cosmic Rune': 'Runa Cósmica',
  'Chaos Rune': 'Runa de Caos',
  'Nature Rune': 'Runa de Naturaleza',
  'Law Rune': 'Runa de Ley',
  'Death Rune': 'Runa de Muerte',
  'Blood Rune': 'Runa de Sangre',
  'Soul Rune': 'Runa de Alma',
  'Astral Rune': 'Runa Astral',
  'Wrath Rune': 'Runa de Ira',
  'Mist Rune': 'Runa de Niebla',
  'Dust Rune': 'Runa de Polvo',
  'Mud Rune': 'Runa de Lodo',
  'Smoke Rune': 'Runa de Humo',
  'Steam Rune': 'Runa de Vapor',
  'Lava Rune': 'Runa de Lava',
  'Rune Essence': 'Esencia Rúnica',
  'Pure Essence': 'Esencia Pura',
  'Uncut Sapphire': 'Zafiro sin Tallar',
  'Uncut Emerald': 'Esmeralda sin Tallar',
  'Uncut Ruby': 'Rubí sin Tallar',
  'Uncut Diamond': 'Diamante sin Tallar',
  'Uncut Dragonstone': 'Piedra de Dragón sin Tallar',
  'Uncut Onyx': 'Ónice sin Tallar',
  'Sapphire': 'Zafiro Tallado',
  'Emerald': 'Esmeralda Tallada',
  'Ruby': 'Rubí Tallado',
  'Diamond': 'Diamante Tallado',
  'Dragonstone': 'Piedra de Dragón Tallada',
  'Onyx': 'Ónice Tallado'
};

// 6. PATRONES REGLADOS PARA TRADUCIR CUALQUIER NOMBRE EN INGLÉS
function translateItemName(engName) {
  if (!engName) return engName;
  const trimmed = engName.trim();
  if (EXACT_NAMES[trimmed]) return EXACT_NAMES[trimmed];

  let name = trimmed;

  // Prefijos y materiales
  const prefixMap = [
    [/^Bronze\s+/i, 'de Bronce '],
    [/^Iron\s+/i, 'de Hierro '],
    [/^Steel\s+/i, 'de Acero '],
    [/^Black\s+/i, 'Negro/a '],
    [/^White\s+/i, 'Blanco/a '],
    [/^Mithril\s+/i, 'de Mithril '],
    [/^Adamant\s+/i, 'de Adamantita '],
    [/^Adamantite\s+/i, 'de Adamantita '],
    [/^Rune\s+/i, 'de Runita '],
    [/^Runite\s+/i, 'de Runita '],
    [/^Dragon\s+/i, 'de Dragón '],
    [/^Dragonkin\s+/i, 'Dragonkin '],
    [/^Abyssal\s+/i, 'Abisal '],
    [/^Crystal\s+/i, 'de Cristal '],
    [/^Obsidian\s+/i, 'de Obsidiana '],
    [/^Oak\s+/i, 'de Roble '],
    [/^Willow\s+/i, 'de Sauce '],
    [/^Maple\s+/i, 'de Arce '],
    [/^Yew\s+/i, 'de Tejo '],
    [/^Magic\s+/i, 'Mágico/a '],
    [/^Blightwood\s+/i, 'de Blightwood '],
    [/^Leather\s+/i, 'de Cuero '],
    [/^Hard Leather\s+/i, 'de Cuero Duro '],
    [/^Snakeskin\s+/i, 'de Serpiente '],
    [/^Green D'hide\s+/i, 'de Dragón Verde '],
    [/^Blue D'hide\s+/i, 'de Dragón Azul '],
    [/^Red D'hide\s+/i, 'de Dragón Rojo '],
    [/^Black D'hide\s+/i, 'de Dragón Negro '],
    [/^Green Dragonhide\s+/i, 'de Dragón Verde '],
    [/^Blue Dragonhide\s+/i, 'de Dragón Azul '],
    [/^Red Dragonhide\s+/i, 'de Dragón Rojo '],
    [/^Black Dragonhide\s+/i, 'de Dragón Negro ']
  ];

  // Tipos de arma y armadura base
  const suffixMap = [
    [/Dagger$/i, 'Daga'],
    [/Shortsword$/i, 'Espada Corta'],
    [/Longsword$/i, 'Espada Larga'],
    [/Sword$/i, 'Espada'],
    [/2h Sword$/i, 'Espadón a Dos Manos'],
    [/Greatsword$/i, 'Gran Espadón'],
    [/Scimitar$/i, 'Cimitarra'],
    [/Battleaxe$/i, 'Hacha de Guerra'],
    [/Greataxe$/i, 'Gran Hacha'],
    [/Axe$/i, 'Hacha'],
    [/Warhammer$/i, 'Martillo de Guerra'],
    [/Mace$/i, 'Maza'],
    [/Spear$/i, 'Lanza'],
    [/Halberd$/i, 'Alabarda'],
    [/Claws$/i, 'Garras de Combate'],
    [/Whip$/i, 'Látigo'],
    [/Shortbow$/i, 'Arco Corto'],
    [/Longbow$/i, 'Arco Largo'],
    [/Crossbow$/i, 'Ballesta'],
    [/Staff$/i, 'Bastón'],
    [/Battlestaff$/i, 'Bastón de Batalla'],
    [/Wand$/i, 'Varita Mágica'],
    [/Arrow$/i, 'Flecha'],
    [/Arrows$/i, 'Flechas'],
    [/Bolt$/i, 'Perno'],
    [/Bolts$/i, 'Pernos'],
    [/Dart$/i, 'Dardo'],
    [/Knife$/i, 'Cuchillo Arrojadizo'],
    [/Javelin$/i, 'Jabalina'],
    [/Thrownaxe$/i, 'Hacha Arrojadiza'],
    [/Full Helm$/i, 'Casco Completo'],
    [/Med Helm$/i, 'Casco Medio'],
    [/Helmet$/i, 'Casco'],
    [/Helm$/i, 'Yelmo'],
    [/Coif$/i, 'Capucha de Cuero'],
    [/Hood$/i, 'Capucha'],
    [/Hat$/i, 'Sombrero'],
    [/Platebody$/i, 'Coraza de Placas'],
    [/Chainbody$/i, 'Cota de Malla'],
    [/Body$/i, 'Peto'],
    [/Robe Top$/i, 'Túnica Superior'],
    [/Robe$/i, 'Túnica'],
    [/Tunic$/i, 'Túnica'],
    [/Platelegs$/i, 'Perneras de Placas'],
    [/Plateskirt$/i, 'Falda de Placas'],
    [/Chaps$/i, 'Pantalones de Cazador'],
    [/Robe Legs$/i, 'Falda de Mago'],
    [/Robe Bottom$/i, 'Falda Inferior'],
    [/Leggings$/i, 'Perneras'],
    [/Legs$/i, 'Perneras'],
    [/Skirt$/i, 'Falda'],
    [/Kiteshield$/i, 'Escudo Lágrima (Kiteshield)'],
    [/Sq Shield$/i, 'Escudo Cuadrado (Sq Shield)'],
    [/Shield$/i, 'Escudo'],
    [/Buckler$/i, 'Broquel'],
    [/Defender$/i, 'Defensor'],
    [/Cape$/i, 'Capa'],
    [/Cloak$/i, 'Manto'],
    [/Boots$/i, 'Botas'],
    [/Gloves$/i, 'Guantes'],
    [/Gauntlets$/i, 'Guanteletes'],
    [/Vambraces$/i, 'Brazales'],
    [/Bracers$/i, 'Brazales'],
    [/Amulet$/i, 'Amuleto'],
    [/Necklace$/i, 'Collar'],
    [/Ring$/i, 'Anillo'],
    [/Pickaxe$/i, 'Pico de Minería'],
    [/Bar$/i, 'Barra'],
    [/Ore$/i, 'Mena'],
    [/Seed$/i, 'Semilla'],
    [/Potion$/i, 'Poción'],
    [/Pie$/i, 'Pastel'],
    [/Stew$/i, 'Estofado']
  ];

  // Check matching regex
  for (const [pReg, pTrans] of prefixMap) {
    if (pReg.test(trimmed)) {
      const remainder = trimmed.replace(pReg, '').trim();
      for (const [sReg, sTrans] of suffixMap) {
        if (sReg.test(remainder)) {
          const mod = remainder.replace(sReg, '').trim();
          let base = sTrans;
          if (mod) base = `${base} (${mod})`;
          return `${base} ${pTrans.trim()}`.replace('Blanco/a', 'Blanco').replace('Negro/a', 'Negro').replace('Mágico/a', 'Mágico');
        }
      }
      return `${remainder} ${pTrans.trim()}`;
    }
  }

  // Tomes
  if (trimmed.startsWith('Tome of ')) {
    return trimmed.replace('Tome of ', 'Tomo de ');
  }
  if (trimmed.startsWith('Skill Tome ')) {
    return trimmed.replace('Skill Tome ', 'Tomo de Habilidad ');
  }

  return trimmed;
}

// 7. TRADUCCIÓN PROFUNDA DE DESCRIPCIONES
function translateDescription(desc, itemName) {
  if (!desc || typeof desc !== 'string') return desc;
  let d = desc.trim();

  // Reemplazo de fragmentos híbridos comunes generados en pasadas incompletas
  const phraseReplacements = [
    [/Arrows with tips Forjado a partir de ([^\.]+)/gi, 'Flechas con puntas forjadas a partir de $1.'],
    [/Lacerating arrows with barbed tips Forjado a partir de ([^\.]+)/gi, 'Flechas lacerantes con puntas dentadas forjadas a partir de $1.'],
    [/Un resistente metal used for crafting weapons and armour/gi, 'Un resistente lingote metálico utilizado para forjar armas y armaduras pesadas.'],
    [/A standard set of arrows for basic archery training/gi, 'Un conjunto estándar de flechas para entrenamiento de arquería.'],
    [/A potent brew that restores Sustenance and vitality/gi, 'Un potente brebaje que restaura el sustento y la vitalidad.'],
    [/Used for smelting into metal bars at a furnace/gi, 'Mineral utilizado para fundirse en lingotes de metal en un horno.'],
    [/Freshly harvested from the lands of Ashenfall/gi, 'Cosechado fresco de las tierras de Ashenfall.'],
    [/Essential for crafting and survival/gi, 'Esencial para la artesanía y la supervivencia.'],
    [/Provides protection against elemental and physical threats/gi, 'Otorga protección contra amenazas elementales y físicas.'],
    [/A finely crafted weapon imbued with combat prowess/gi, 'Un arma finamente elaborada e imbuida de destreza en combate.'],
    [/A sharp blade capable of delivering lethal strikes/gi, 'Una hoja afilada capaz de asestar golpes letales.'],
    [/Infused with ancient energies from the Dragonkin era/gi, 'Imbuido de energías ancestrales de la era Dragonkin.'],
    [/A sturdy shield designed to deflect incoming attacks/gi, 'Un escudo resistente diseñado para desviar ataques enemigos.'],
    [/A piece of protective armour worn by warriors/gi, 'Una pieza de armadura protectora vestida por guerreros.'],
    [/Cooked to perfection over an open fire/gi, 'Cocinado a la perfección sobre fuego abierto.'],
    [/A magical rune pulsating with elemental power/gi, 'Una runa mágica que pulsa con poder elemental.'],
    [/Raw meat that must be cooked before eating/gi, 'Carne cruda que debe cocinarse antes de consumirse.'],
    [/Can be spun into cloth or bow strings/gi, 'Se puede hilar en tela o cuerdas de arco.'],
    [/Used to shape and work hot metals/gi, 'Utilizado para dar forma y trabajar metales al rojo vivo.'],
    [/A tool used for extracting ores from mineral rocks/gi, 'Una herramienta utilizada para extraer minerales de las rocas.'],
    [/A logging axe used for felling trees/gi, 'Un hacha de tala utilizada para derribar árboles.'],
    [/Increases combat effectiveness when equipped/gi, 'Aumenta la efectividad en combate al equiparse.']
  ];

  for (const [pat, rep] of phraseReplacements) {
    d = d.replace(pat, rep);
  }

  // Si todavía tiene inglés básico, aplicar traducción de términos generales
  const wordMap = [
    [/\bUsed to\b/gi, 'Utilizado para'],
    [/\bused for\b/gi, 'utilizado para'],
    [/\bUsed for\b/gi, 'Utilizado para'],
    [/\bcrafted at\b/gi, 'elaborado en'],
    [/\bcrafted with\b/gi, 'elaborado con'],
    [/\bweapons and armour\b/gi, 'armas y armaduras'],
    [/\bweapons and armor\b/gi, 'armas y armaduras'],
    [/\bhealing\b/gi, 'curación'],
    [/\brequires\b/gi, 'requiere'],
    [/\bProvides\b/gi, 'Otorga'],
    [/\bprovides\b/gi, 'otorga'],
    [/\bIncreases\b/gi, 'Incrementa'],
    [/\bincreases\b/gi, 'incrementa'],
    [/\bRestores\b/gi, 'Restaura'],
    [/\brestores\b/gi, 'restaura'],
    [/\bprotection against\b/gi, 'protección contra'],
    [/\bforged from\b/gi, 'forjado a partir de'],
    [/\bForged from\b/gi, 'Forjado a partir de'],
    [/\bmade from\b/gi, 'hecho de'],
    [/\bMade from\b/gi, 'Hecho de'],
    [/\bancient\b/gi, 'ancestral'],
    [/\bAncient\b/gi, 'Ancestral'],
    [/\bpowerful\b/gi, 'poderoso'],
    [/\bPowerful\b/gi, 'Poderoso'],
    [/\bheavy\b/gi, 'pesado'],
    [/\bHeavy\b/gi, 'Pesado'],
    [/\blight\b/gi, 'ligero'],
    [/\bLight\b/gi, 'Ligero'],
    [/\bsharp\b/gi, 'afilado'],
    [/\bSharp\b/gi, 'Afilado'],
    [/\bdangerous\b/gi, 'peligroso'],
    [/\bDangerous\b/gi, 'Peligroso'],
    [/\bdeadly\b/gi, 'letal'],
    [/\bDeadly\b/gi, 'Letal'],
    [/\bessential for\b/gi, 'esencial para'],
    [/\bEssential for\b/gi, 'Esencial para'],
    [/\bsurvival\b/gi, 'supervivencia'],
    [/\bSurvival\b/gi, 'Supervivencia'],
    [/\bmining\b/gi, 'minería'],
    [/\bwoodcutting\b/gi, 'tala de madera'],
    [/\bcrafting\b/gi, 'artesanía'],
    [/\bsmithing\b/gi, 'herrería'],
    [/\bfishing\b/gi, 'pesca'],
    [/\bcooking\b/gi, 'cocina'],
    [/\bfarming\b/gi, 'agricultura'],
    [/\bA pair of\b/gi, 'Un par de'],
    [/\ba pair of\b/gi, 'un par de'],
    [/\bA set of\b/gi, 'Un conjunto de'],
    [/\ba set of\b/gi, 'un conjunto de'],
    [/\bA piece of\b/gi, 'Una pieza de'],
    [/\ba piece of\b/gi, 'una pieza de'],
    [/\bA portion of\b/gi, 'Una porción de'],
    [/\ba portion of\b/gi, 'una porción de'],
    [/\bAn ancient\b/gi, 'Un ancestral'],
    [/\ban ancient\b/gi, 'un ancestral'],
    [/\bA magical\b/gi, 'Un mágico'],
    [/\ba magical\b/gi, 'un mágico'],
    [/\bA sturdy\b/gi, 'Un resistente'],
    [/\ba sturdy\b/gi, 'un resistente'],
    [/\bA sharp\b/gi, 'Un afilado'],
    [/\ba sharp\b/gi, 'un afilado'],
    [/\bA finely\b/gi, 'Un finamente'],
    [/\ba finely\b/gi, 'un finamente']
  ];

  for (const [wPat, wRep] of wordMap) {
    d = d.replace(wPat, wRep);
  }

  return d;
}

// 8. MAPA GLOBAL DE NOMBRES ACTUALIZADOS
const idToSpanishNameMap = new Map();
items.forEach(it => {
  const spanish = translateItemName(it.name || it.title || it.englishTitle);
  idToSpanishNameMap.set(it.id, spanish);
  idToSpanishNameMap.set((it.title || '').toLowerCase().trim(), spanish);
  idToSpanishNameMap.set((it.name || '').toLowerCase().trim(), spanish);
  if (it.englishTitle) {
    idToSpanishNameMap.set(it.englishTitle.toLowerCase().trim(), spanish);
  }
});

// 9. PROCESAR CADA OBJETO
let updatedCount = 0;

items.forEach(it => {
  // Traducir nombre
  const newName = translateItemName(it.name || it.title || it.englishTitle);
  if (it.name !== newName) {
    it.name = newName;
    updatedCount++;
  }

  // ItemType
  if (it.itemType && ITEM_TYPE_MAP[it.itemType]) {
    it.itemType = ITEM_TYPE_MAP[it.itemType];
  }

  // Facility en receta
  if (it.recipe && it.recipe.facility && FACILITY_MAP[it.recipe.facility]) {
    it.recipe.facility = FACILITY_MAP[it.recipe.facility];
  }

  // Skill en receta
  if (it.recipe && it.recipe.skill) {
    if (it.recipe.skill === 'Artisan') it.recipe.skill = 'Artesanía';
    if (it.recipe.skill === 'Cooking') it.recipe.skill = 'Cocina';
    if (it.recipe.skill === 'Runecrafting') it.recipe.skill = 'Creación de Runas';
    if (it.recipe.skill === 'Crafting') it.recipe.skill = 'Artesanía';
  }

  // Materiales en receta
  if (it.recipe && it.recipe.materials) {
    it.recipe.materials.forEach(mat => {
      const match = idToSpanishNameMap.get(mat.item.toLowerCase().trim());
      if (match) {
        mat.item = match;
      } else {
        mat.item = translateItemName(mat.item);
      }
    });
  }

  // UsedIn references
  if (it.usedIn) {
    it.usedIn.forEach(u => {
      if (u.facility && FACILITY_MAP[u.facility]) {
        u.facility = FACILITY_MAP[u.facility];
      }
      const match = idToSpanishNameMap.get((u.title || '').toLowerCase().trim());
      if (match) {
        u.title = match;
      } else {
        u.title = translateItemName(u.title);
      }
    });
  }

  // Estadísticas
  if (it.stats) {
    if (it.stats.damageType && DAMAGE_TYPE_MAP[it.stats.damageType]) {
      it.stats.damageType = DAMAGE_TYPE_MAP[it.stats.damageType];
    }
    if (it.stats.attackStyle && ATTACK_STYLE_MAP[it.stats.attackStyle]) {
      it.stats.attackStyle = ATTACK_STYLE_MAP[it.stats.attackStyle];
    }
    if (it.stats.specialAction) {
      it.stats.specialAction = translateDescription(it.stats.specialAction);
    }
    if (it.stats.specialEffect) {
      it.stats.specialEffect = translateDescription(it.stats.specialEffect);
    }
  }

  // Descripción
  if (it.description) {
    it.description = translateDescription(it.description, it.name);
  }
});

// Guardar archivo
fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf8');
console.log(`¡Traducción completada! ${items.length} objetos actualizados con éxito en ${ITEMS_FILE}`);
