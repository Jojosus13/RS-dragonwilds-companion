import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.join(__dirname, '../src/data/items.json');
const items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf8'));

console.log('Iniciando corrección y traducción exhaustiva en items.json...');

// 1. REEMPLAZO ESPECÍFICO DE CORRECCIONES DE NOMBRES
const EXACT_ITEM_NAME_FIXES = {
  "Corpse Cotton": "Algodón de Cadáver",
  "Corpse Cotton Seeds": "Semillas de Algodón de Cadáver",
  "Algodón Cadavérico": "Algodón de Cadáver",
  "Semillas de Algodón Cadavérico": "Semillas de Algodón de Cadáver",
  "Burnt Cadavaberries": "Bayas Cadava Quemadas",
  "Bayas Cadava Quemado": "Bayas Cadava Quemadas",
  "Enchanted Bronze Bolts": "Pernos de Bronce Encantados",
  "Pernos de Bronze Encantados": "Pernos de Bronce Encantados",
  "Enchanted Iron Bolts": "Pernos de Hierro Encantados",
  "Pernos de Iron Encantados": "Pernos de Hierro Encantados",
  "Enchanted Steel Bolts": "Pernos de Acero Encantados",
  "Pernos de Steel Encantados": "Pernos de Acero Encantados",
  "Enchanted Mithril Bolts": "Pernos de Mithril Encantados",
  "Pernos de Mithril Encantados": "Pernos de Mithril Encantados",
  "Enchanted Adamant Bolt": "Pernos de Adamantita Encantados",
  "Enchanted Adamant Bolts": "Pernos de Adamantita Encantados",
  "Pernos de Adamant Encantados": "Pernos de Adamantita Encantados",
  "Enchanted Rune Bolt": "Pernos de Runita Encantados",
  "Enchanted Rune Bolts": "Pernos de Runita Encantados",
  "Pernos de Rune Encantados": "Pernos de Runita Encantados",
  "Enchanted Blurite Bolts": "Pernos de Blurita Encantados",

  "Fang Arrow": "Flecha de Colmillo",
  "Fang Barbed Arrow": "Flecha Dentada de Colmillo",
  "Fang Fire Arrow": "Flecha de Fuego de Colmillo",
  "Farmer's Hat": "Sombrero de Granjero",
  "Feather Bait": "Cebo de Plumas",
  "Feathered Lure": "Señuelo Emplumado",
  "Feathers": "Plumas de Ave",
  "Ferocious Infusion": "Infusión Feroz",
  "Fillet": "Filete de Pescado",
  "Fine Cloth": "Tela Fina",
  "Fine Net": "Red Fina de Pesca",
  "Fine Thread": "Hilo Fino",
  "Fire Oil": "Aceite de Fuego",
  "Fish Fry": "Fritura de Pescado",
  "Flank Steak": "Filete de Ijar",
  "Fleece": "Vellón de Lana",
  "Fleet-Footed Infusion": "Infusión de Pies Ligeros",
  "Forager's Sandwich": "Sándwich de Recolector",
  "Fortifying Crunchies": "Crujientes Fortificantes",
  "Fortifying Soup": "Sopa Fortificante",
  "Fractured Obsidian Construct": "Constructo de Obsidiana Fracturado (Vestigio)",
  "Fried Cabbage": "Col Salteada",
  "Fried Egg": "Huevo Frito",
  "Fried Sardine": "Sardina Frita",
  "Fruit Pie": "Pastel de Frutas",
  "Fuel Briquette": "Briquet de Combustible",
  "Fuel Pellet": "Pellet de Combustible",
  "Garou Artifact": "Artefacto Garou (Vestigio)",
  "Garou Chit": "Ficha Garou (Vestigio)",
  "Garou Highborn's Cloak": "Manto de Noble Garou",
  "Garou Weave": "Tejido Garou",
  "Giant Krill Bait": "Cebo de Krill Gigante",
  "Gilded Gyrhawk Amulet": "Amuleto Dorado de Halcón Girifalte",
  "Gilded Paladin Chestpiece": "Peto de Paladín Dorado",
  "Gilded Paladin Helmet": "Casco de Paladín Dorado",
  "Gilded Paladin Legs": "Perneras de Paladín Dorado",
  "Glass Decoration": "Decoración de Vidrio",
  "Glass Owl": "Búho de Vidrio",
  "Glass Pane": "Panel de Vidrio",
  "Glass Vessel": "Vasija de Vidrio",
  "Goblin \"Swingslash\"": "Golpe Cortante de Trasgo",
  "Goblin War Banner": "Estandarte de Guerra de Trasgo",
  "Gold Leaf": "Pan de Oro",
  "Gourmand Ring": "Anillo de Gourmet",
  "Granite": "Bloque de Granito",
  "Granite Maul": "Gran Mazo de Granito",
  "Greater Kalphite Wing": "Ala de Kalphite Mayor",
  "Grieving Moonstaff": "Bastón Lunar del Duelo",
  "Grilled Mushrooms": "Champiñones a la Parrilla",
  "Grilled Tomatoes": "Tomates a la Parrilla",
  "Grilled Undead Bass": "Lubina No-Muerta a la Parrilla",
  "Grim Black Codpiece": "Bragueta Negra Sombría (Vestigio)",
  "Ground Clay": "Arcilla Molida",
  "Ground Dragon Tooth": "Diente de Dragón Molido",
  "Ground Granite": "Granito Molido",
  "Ground Gypsum": "Yeso Molido",
  "Ground Rune Essence": "Esencia Rúnica Molida",
  "Ground Sandstone": "Arenisca Molida",
  "Ground Stone": "Piedra Molida",
  "Ground Tea Leaves": "Hojas de Té Molidas",
  "Gypsum": "Yeso Mineral",
  "Gypsum Wax": "Cera de Yeso",
  "Gyrhawk Amulet": "Amuleto de Halcón Girifalte",
  "Hardy Weathered Shell": "Caparazón Resistente Erosionado",
  "Harmonised Compound": "Compuesto Armonizado",
  "Haunch": "Anca Asada",
  "Hearty Crunchies": "Crujientes Contundentes",
  "Hearty Fortifying Soup": "Sopa Fortificante Contundente",
  "Hearty Soup": "Sopa Contundente",
  "Herd Ring": "Anillo de la Manada",
  "Hermit Ring": "Anillo del Ermitaño",
  "Hollow Bark": "Corteza Hueca",
  "Hunter Stagbow": "Arco de Ciervo de Cazador",
  "Icthlarian Fetish": "Fetiche de Icthlarin (Vestigio)",
  "Imaru's Talon": "Garra de Imaru (Vestigio)",
  "Imbued Granite Maul Head": "Cabeza de Mazo de Granito Imbuida",
  "Imbued Leather Wrappings": "Envolturas de Cuero Imbuido",
  "Infernal Fragment": "Fragmento Infernal",
  "Infinity Cloth": "Tela del Infinito",
  "Infinity Robe Body": "Túnica del Infinito",
  "Infinity Robe Hat": "Sombrero del Infinito",
  "Infinity Robe Legs": "Falda del Infinito",
  "Inspiring Amulet of Attack": "Amuleto Inspirador de Ataque",
  "Inspiring Amulet of Magic": "Amuleto Inspirador de Magia",
  "Inspiring Amulet of Ranged": "Amuleto Inspirador de A Distancia",
  "Inspiring Insignia": "Insignia Inspiradora",
  "Inspiring Ring of Agility": "Anillo Inspirador de Agilidad",
  "Inspiring Ring of Artisan": "Anillo Inspirador de Artesanía",
  "Inspiring Ring of Construction": "Anillo Inspirador de Construcción",
  "Inspiring Ring of Cooking": "Anillo Inspirador de Cocina",
  "Inspiring Ring of Farming": "Anillo Inspirador de Agricultura",
  "Inspiring Ring of Fishing": "Anillo Inspirador de Pesca",
  "Inspiring Ring of Mining": "Anillo Inspirador de Minería",
  "Inspiring Ring of Runecrafting": "Anillo Inspirador de Creación de Runas",
  "Inspiring Ring of Woodcutting": "Anillo Inspirador de Tala",
  "Inspiring Sigil": "Sigilo Inspirador",
  "Intricate Gear": "Engranaje Complejo",
  "Iron Barbed Arrow": "Flecha Dentada de Hierro",
  "Iron Fire Arrow": "Flecha de Fuego de Hierro",
  "Kalphite Chitin": "Quitina de Kalphite",
  "Kalphite Fang": "Colmillo de Kalphite",
  "Kalphite Needle": "Aguja de Kalphite",
  "Kalphite Queen Head": "Cabeza de Reina Kalphite",
  "Kalphite Thorn": "Espina de Kalphite",
  "Kalphite Wings": "Alas de Kalphite",
  "Knight's Platebody": "Coraza de Caballero",
  "Knight's Platelegs": "Perneras de Caballero",
  "Knight's Sword": "Espada de Caballero",
  "Leather Scrap": "Retal de Cuero",
  "Loom": "Telar",
  "Lunar Staff": "Bastón Lunar",
  "Mage's Book": "Libro de Mago",
  "Magic Bow": "Arco Mágico",
  "Magic Shortbow": "Arco Corto Mágico",
  "Magic Longbow": "Arco Largo Mágico",
  "Maple Shortbow": "Arco Corto de Arce",
  "Maple Longbow": "Arco Largo de Arce",
  "Masterwork Helm": "Casco Masterwork",
  "Masterwork Platebody": "Coraza Masterwork",
  "Masterwork Platelegs": "Perneras Masterwork",
  "Masterwork Spear": "Lanza Masterwork",
  "Masterwork Sword": "Espada Masterwork",
  "Mithril Barbed Arrow": "Flecha Dentada de Mithril",
  "Mithril Fire Arrow": "Flecha de Fuego de Mithril",
  "Mystic Robe Bottom": "Falda de Túnica Mística",
  "Mystic Robe Top": "Túnica Mística Superior",
  "Necromancer's Robe Top": "Túnica Superior de Nigromante",
  "Necromancer's Robe Bottom": "Falda de Nigromante",
  "Necromancer's Hood": "Capucha de Nigromante",
  "Necromancer's Staff": "Bastón de Nigromante",
  "Oak Shortbow": "Arco Corto de Roble",
  "Oak Longbow": "Arco Largo de Roble",
  "Obsidian Dagger": "Daga de Obsidiana",
  "Obsidian Mace": "Maza de Obsidiana",
  "Obsidian Maul": "Gran Maza de Obsidiana",
  "Obsidian Staff": "Bastón de Obsidiana",
  "Obsidian Sword": "Espada de Obsidiana",
  "Opal Bolt Tips": "Puntas de Perno de Ópalo",
  "Opal Bolts": "Pernos de Ópalo",
  "Orikalkum Bar": "Barra de Orikalkum",
  "Orikalkum Ore": "Mena de Orikalkum",
  "Pearl Bolt Tips": "Puntas de Perno de Perla",
  "Pearl Bolts": "Pernos de Perla",
  "Pharaoh's Sceptre": "Cetro del Faraón",
  "Poison Arrow": "Flecha Envenenada",
  "Poison Barbed Arrow": "Flecha Dentada Envenenada",
  "Red Dragonhide Body": "Peto de Dragón Rojo",
  "Red Dragonhide Chaps": "Perneras de Dragón Rojo",
  "Red Dragonhide Vambraces": "Brazales de Dragón Rojo",
  "Rune Barbed Arrow": "Flecha Dentada de Runita",
  "Rune Fire Arrow": "Flecha de Fuego de Runita",
  "Shadow Crossbow": "Ballesta de las Sombras",
  "Shadow Sword": "Espada de las Sombras",
  "Skullsplitter": "Rompecráneos",
  "Snakeskin Boots": "Botas de Piel de Serpiente",
  "Snakeskin Chaps": "Perneras de Piel de Serpiente",
  "Snakeskin Body": "Peto de Piel de Serpiente",
  "Staff of Light": "Bastón de Luz",
  "Steel Barbed Arrow": "Flecha Dentada de Acero",
  "Steel Fire Arrow": "Flecha de Fuego de Acero",
  "Subjugation Staff": "Bastón de Subyugación",
  "Titan's Maul": "Gran Maza del Titán",
  "TokTz-Ket-Xil": "TokTz-Ket-Xil (Escudo de Obsidiana)",
  "Toktz-Mej-Tal": "Toktz-Mej-Tal (Bastón de Obsidiana)",
  "Toktz-Xil-Ak": "Toktz-Xil-Ak (Espada de Obsidiana)",
  "Topaz Bolt Tips": "Puntas de Perno de Topacio",
  "Topaz Bolts": "Pernos de Topacio",
  "TzHaar-Ket-Om": "TzHaar-Ket-Om (Mazo de Obsidiana)",
  "Undead Ranger's Bow": "Arco de Explorador No-Muerto",
  "Undead Spade": "Pala de No-Muerto",
  "Weapon Poison": "Veneno para Armas",
  "Wild Scout's Shortbow": "Arco Corto de Explorador Salvaje",
  "Wolfbane Dagger": "Daga Mata-Lobos",
  "Wooden Training Sword": "Espada de Entrenamiento de Madera",
  "Yew Shortbow": "Arco Corto de Tejo",
  "Yew Longbow": "Arco Largo de Tejo",
  "Zombie Arm": "Brazo de Zombi",
  "Zombie Axe": "Hacha de Zombi"
};

// 2. FUNCIÓN DE LIMPIEZA TOTAL DE NOMBRES Y DESCRIPCIONES
function translateItemText(str) {
  if (!str || typeof str !== 'string') return str;
  let s = str.trim();

  // Reemplazo directo de frases con "cadavérico"
  s = s.replace(/algod[oó]n cadav[eé]rico/gi, 'algodón de cadáver');
  s = s.replace(/Algod[oó]n Cadav[eé]rico/gi, 'Algodón de Cadáver');
  s = s.replace(/Semillas de Algod[oó]n Cadav[eé]rico/gi, 'Semillas de Algodón de Cadáver');
  s = s.replace(/corpse cotton/gi, 'algodón de cadáver');
  s = s.replace(/Corpse Cotton/gi, 'Algodón de Cadáver');
  s = s.replace(/corpse flower/gi, 'flor de cadáver');
  s = s.replace(/Corpse Flower/gi, 'Flor de Cadáver');

  return s;
}

// 3. APLICAR TRADUCCIONES EN CADA OBJETO
items.forEach(it => {
  // Corregir nombre
  if (EXACT_ITEM_NAME_FIXES[it.name]) {
    it.name = EXACT_ITEM_NAME_FIXES[it.name];
  } else if (EXACT_ITEM_NAME_FIXES[it.title]) {
    it.name = EXACT_ITEM_NAME_FIXES[it.title];
  } else if (EXACT_ITEM_NAME_FIXES[it.englishTitle]) {
    it.name = EXACT_ITEM_NAME_FIXES[it.englishTitle];
  } else {
    it.name = translateItemText(it.name);
  }

  // Corregir descripción
  if (it.description) {
    it.description = translateItemText(it.description);
  }

  // Corregir journal
  if (it.journal) {
    it.journal = translateItemText(it.journal);
  }

  // Corregir stats
  if (it.stats) {
    if (it.stats.specialAction) it.stats.specialAction = translateItemText(it.stats.specialAction);
    if (it.stats.specialEffect) it.stats.specialEffect = translateItemText(it.stats.specialEffect);
  }
});

// 4. MAPA COMPLETO DE RECETAS Y MATERIALES
const nameMap = new Map();
items.forEach(it => {
  if (it.id) nameMap.set(it.id.toLowerCase().trim(), it.name);
  if (it.title) nameMap.set(it.title.toLowerCase().trim(), it.name);
  if (it.englishTitle) nameMap.set(it.englishTitle.toLowerCase().trim(), it.name);
  if (it.name) nameMap.set(it.name.toLowerCase().trim(), it.name);
});

items.forEach(it => {
  if (it.recipe?.materials) {
    it.recipe.materials.forEach(mat => {
      mat.item = nameMap.get(mat.item.toLowerCase().trim()) || EXACT_ITEM_NAME_FIXES[mat.item] || translateItemText(mat.item);
    });
  }
  if (it.usedIn) {
    it.usedIn.forEach(u => {
      u.title = nameMap.get((u.title || '').toLowerCase().trim()) || EXACT_ITEM_NAME_FIXES[u.title] || translateItemText(u.title);
    });
  }
});

fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf8');
console.log('¡Traducción limpia y consistente guardada!');
