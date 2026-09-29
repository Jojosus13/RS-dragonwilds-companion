import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.join(__dirname, '..', 'src', 'data', 'items.json');
const items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf-8'));

// Dictionaries
const ADJECTIVES_MAP = {
  'Burnt': 'Quemado/a',
  'Raw': 'Crudo/a',
  'Cooked': 'Cocinado/a',
  'Smoked': 'Ahumado/a',
  'Pristine': 'Impecable',
  'Corroded': 'Corroído/a',
  'Tattered': 'Andrajoso/a',
  'Ancient': 'Antiguo/a',
  'Cursed': 'Maldito/a',
  'Blessed': 'Bendito/a',
  'Cooling': 'Refrescante',
  'Soiled': 'Manchado/a',
  'Chewed': 'Masticado/a',
  'Moth Eaten': 'Comido/a por Polillas',
  'Unfired': 'sin Cocer'
};

const COLORS_MAP = {
  'Black': 'Negro/a', 'White': 'Blanco/a', 'Red': 'Rojo/a', 'Blue': 'Azul',
  'Green': 'Verde', 'Yellow': 'Amarillo/a', 'Orange': 'Naranja', 'Purple': 'Púrpura',
  'Pink': 'Rosa', 'Grey': 'Gris', 'Gray': 'Gris', 'Brown': 'Marrón'
};

const SPECIFIC_DICT = {
  // Amulets & Jewelry
  "Amulet of Accuracy": "Amuleto de Precisión",
  "Amulet of Defence": "Amuleto de Defensa",
  "Amulet of Glory": "Amuleto de Gloria",
  "Amulet of Magic": "Amuleto de Magia",
  "Amulet of Strength": "Amuleto de Fuerza",
  "Amulet of Power": "Amuleto de Poder",
  "Bandosian Amulet": "Amuleto Bandosiano",
  "Salve Amulet": "Amuleto Salve",
  "Skills Necklace": "Collar de Habilidades",
  "Moon Ring": "Anillo Lunar",
  "Sun Ring": "Anillo Solar",
  "Phoenix Ring": "Anillo del Fénix",
  "Ravanna's Ring": "Anillo de Ravanna",
  "Mule Ring": "Anillo de la Mula",
  "Ring of Life": "Anillo de Vida",
  "Ring of Pursuit": "Anillo de Persecución",
  "Ring of Recoil": "Anillo de Repulsión",
  "Woodsman Ring": "Anillo del Leñador",
  "Sapphire Emblem": "Emblema de Zafiro",
  "Corroded Jewellery": "Joyería Corroída",

  // Outfits & Armours
  "Adventurer's Leggings": "Perneras de Aventurero",
  "Adventurer's Longbow": "Arco Largo de Aventurero",
  "Adventurer's Tunic": "Túnica de Aventurero",
  "Chef's Hat": "Gorro de Cocinero",
  "Chieftain's Blade": "Hoja del Cacique",
  "Chitinous Carapace": "Caparazón Quitinoso",
  "Cloying Damp Cowl": "Caperuza Húmeda Sofocante",
  "Coarse Net": "Red Gruesa de Pesca",
  "Coarse Thread": "Hilo Grueso",
  "Coarse Animal Fur": "Piel Gruesa de Animal",
  "Commemorative Coin": "Moneda Conmemorativa",
  "Compost Bucket": "Cubo de Abono / Compost",
  "Copper Ore": "Mena de Cobre",
  "Corpse Cotton Seeds": "Semillas de Algodón Cadavérico",
  "Corroded Curved Blade": "Hoja Curva Corroída",
  "Corroded White Visor": "Visera Blanca Corroída",

  // Clay & Pottery
  "Clay": "Arcilla Natural",
  "Clay Decoration": "Decoración de Arcilla",
  "Clay Decoration (Unfired)": "Decoración de Arcilla (Sin Cocer)",
  "Clay Mould (Unfired)": "Molde de Arcilla (Sin Cocer)",
  "Clay Vessel": "Vasija de Arcilla",
  "Clay Vessel (Unfired)": "Vasija de Arcilla (Sin Cocer)",
  "Clean Water": "Agua Limpia",

  // Salvage Piles
  "Black Salvage Pile": "Pila de Desguace Negro",
  "Bronze Salvage Pile": "Pila de Desguace de Bronce",
  "Iron Salvage Pile": "Pila de Desguace de Hierro",
  "Steel Salvage Pile": "Pila de Desguace de Acero",
  "Silver Salvage Pile": "Pila de Desguace de Plata",
  "Gold Salvage Pile": "Pila de Desguace de Oro",
  "Mithril Salvage Pile": "Pila de Desguace de Mithril",
  "Adamant Salvage Pile": "Pila de Desguace de Adamantita",
  "Rune Salvage Pile": "Pila de Desguace Rúnico",

  // Cactus, Berries & Plants
  "Bunny Cactus Seed": "Semilla de Cactus Conejo",
  "Barrel Cactus Seed": "Semilla de Cactus Barril",
  "Pipe Cactus Seed": "Semilla de Cactus Tubo",
  "Burnished Belt Buckle": "Hebilla de Cinturón Bruñida",
  "Cabbage Seeds": "Semillas de Col",
  "Cactus Fibres": "Fibras de Cactus",
  "Cactus Steak": "Filete de Cactus",
  "Cactus Water": "Agua de Cactus",
  "Cadavaberries": "Bayas Cadava",
  "Cadavaberry Infusion": "Infusión de Bayas Cadava",
  "Cadavaberry Seeds": "Semillas de Bayas Cadava",
  "Carved Bone Animal Lure": "Señuelo de Hueso Tallado",
  "Cauterised Undead Steak": "Filete de No-Muerto Cauterizado",
  "Cheeky Fryup": "Fritura Pícara",
  "Chipped Obsidian Construct": "Constructo de Obsidiana Desconchado",

  // Engrams
  "Crucible Engram of Betrayal": "Engrama del Crisol: Traición",
  "Crucible Engram of Helplessness": "Engrama del Crisol: Impotencia",
  "Crucible Engram of Humiliation": "Engrama del Crisol: Humillación",
  "Crucible Engram of Isolation": "Engrama del Crisol: Aislamiento",
  "Crucible Engram of Loss": "Engrama del Crisol: Pérdida",
  "Crucible Engram of Paranoia": "Engrama del Crisol: Paranoia",
  "Crucible Engram of Regret": "Engrama del Crisol: Arrepentimiento",
  "Crucible Engram of Terror": "Engrama del Crisol: Terror",

  // Infusions
  "Cooling Arcane Infusion": "Infusión Refrescante Arcana",
  "Cooling Evasive Infusion": "Infusión Refrescante de Evasión",
  "Cooling Ferocious Infusion": "Infusión Refrescante Feroz",
  "Cooling Fleet-Footed Infusion": "Infusión Refrescante de Pies Ligeros",
  "Cooling Relentless Infusion": "Infusión Refrescante Implacable",

  // Torches & Metals
  "Blue Torch": "Antorcha Azul",
  "Green Torch": "Antorcha Verde",
  "Black Metal Bar": "Barra de Metal Negro",
  "Black Metal Scraps": "Chatarra de Metal Negro",
  "Blue Dragonhide": "Cuero de Dragón Azul",
  "Blue Memory of Menaphos": "Memoria Azul de Menaphos",
  "Green Memory of Menaphos": "Memoria Verde de Menaphos"
};

// Auto Translator Function
function translateEngTitle(title) {
  if (!title) return '';
  const t = title.trim();

  // 1. Direct Map
  if (SPECIFIC_DICT[t]) return SPECIFIC_DICT[t];

  // 2. Burnt foods
  if (t.startsWith('Burnt ')) {
    const food = t.replace('Burnt ', '');
    const foodMap = {
      'Anchovies': 'Anchoas', 'Beltfish': 'Pez Cinto', 'Bread': 'Pan', 'Cabbage': 'Col',
      'Cadavaberries': 'Bayas Cadava', 'Catfish': 'Pez Gato', 'Desert Sole': 'Lenguado del Desierto',
      'Dwellberries': 'Bayas Dwell', 'Egg': 'Huevo', 'Fillet': 'Filete', 'Flank': 'Falda de Carne',
      'Giant Krill': 'Krill Gigante', 'Haunch': 'Anca de Carne', 'Herring': 'Arenque',
      'Infernal Eel': 'Anguila Infernal', 'Lobster': 'Langosta', 'Maple Syrup': 'Sirope de Arce',
      'Monkfish': 'Rape', 'Mushroom': 'Seta', 'Onion': 'Cebolla', 'Peach': 'Melocotón',
      'Potato': 'Patata', 'Pumpkin': 'Calabaza', 'Rat Roast': 'Asado de Rata', 'Redberries': 'Bayas Rojas',
      'Salmon': 'Salmón', 'Sardine': 'Sardina', 'Shrimp': 'Camarón', 'Steak': 'Filete',
      'Tomato': 'Tomate', 'Trout': 'Trucha', 'Undead Bass': 'Lubina No-Muerta', 'Undead Eel': 'Anguila No-Muerta',
      'Undead Steak': 'Filete de No-Muerto', 'Watermelon': 'Sandía'
    };
    const translatedFood = foodMap[food] || food;
    const isFem = ['Anchoas', 'Col', 'Bayas Cadava', 'Falda de Carne', 'Anca de Carne', 'Anguila Infernal', 'Langosta', 'Seta', 'Cebolla', 'Patata', 'Calabaza', 'Bayas Rojas', 'Sardina', 'Trucha', 'Lubina No-Muerta', 'Anguila No-Muerta', 'Sandía'].includes(food);
    return `${translatedFood} ${isFem ? 'Quemada' : 'Quemado'}`;
  }

  // 3. Chewed / Moth Eaten / Soiled Cloth
  for (const [adjEng, adjEsp] of Object.entries({ 'Chewed': 'Masticada', 'Soiled': 'Manchada', 'Moth Eaten': 'Comida por Polillas' })) {
    for (const [colEng, colEsp] of Object.entries({ 'Black': 'Negra', 'White': 'Blanca', 'Red': 'Roja', 'Blue': 'Azul', 'Green': 'Verde', 'Yellow': 'Amarilla', 'Orange': 'Naranja', 'Purple': 'Púrpura', 'Pink': 'Rosa' })) {
      if (t === `${adjEng} ${colEng} Cloth`) {
        return `Tela ${colEsp} ${adjEsp}`;
      }
    }
  }

  // 4. Memory of Menaphos
  if (t.endsWith(' Memory of Menaphos')) {
    const col = t.replace(' Memory of Menaphos', '');
    const colMap = { 'Black': 'Negra', 'White': 'Blanca', 'Red': 'Roja', 'Blue': 'Azul', 'Green': 'Verde', 'Yellow': 'Amarilla', 'Orange': 'Naranja', 'Purple': 'Púrpura', 'Pink': 'Rosa' };
    return `Memoria ${colMap[col] || col} de Menaphos`;
  }

  // 5. Seeds
  if (t.endsWith(' Seeds')) {
    const plant = t.replace(' Seeds', '');
    return `Semillas de ${plant}`;
  }
  if (t.endsWith(' Seed')) {
    const plant = t.replace(' Seed', '');
    return `Semilla de ${plant}`;
  }

  return t;
}

// Translate descriptions and journals
function translateLore(text) {
  if (!text) return '';
  let s = text;
  // Cleanup wiki templates
  s = s.replace(/\{\{sic\|[^}]*\}\}/gi, '')
       .replace(/\{\{[^}]*\}\}/g, '')
       .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
       .replace(/'''?/g, '')
       .trim();

  // Common sentence beginnings
  s = s
    .replace(/^A sharp /i, 'Una afilada ')
    .replace(/^A sturdy /i, 'Un resistente ')
    .replace(/^A heavy /i, 'Un pesado ')
    .replace(/^A lightweight /i, 'Un ligero ')
    .replace(/^A brutal /i, 'Un brutal ')
    .replace(/^A deadly /i, 'Un letal ')
    .replace(/^A ring that once belonged to a powerful necromancer\./i, 'Un anillo que perteneció a un poderoso nigromante.')
    .replace(/^The sinister remnants of an abyssal creature\./i, 'Los siniestros restos de una criatura abisal.')
    .replace(/^The spine from a deceased abyssal demon\./i, 'La columna vertebral de un demonio abisal caído.')
    .replace(/^Shows the worst possible side of yourself\. Perhaps you could learn from it\./i, 'Muestra el peor reflejo de ti mismo. Quizás puedas aprender algo de él.')
    .replace(/^A rusted blade with a wicked edge\. Barely usable now, but perhaps you could learn something from it\./i, 'Una hoja oxidada con un filo perverso. Casi inservible ahora, pero tal vez puedas aprender algo.')
    .replace(/^What's left of a staff that feels soaked in sorrow\. Perhaps you could learn something from it\./i, 'Lo que queda de un bastón empapado en tristeza. Quizás puedas aprender algo de él.')
    .replace(/^The remains of a longbow damaged in a dragon attack\. Perhaps you could learn something from it\./i, 'Los restos de un arco largo dañado en el ataque de un dragón. Quizás puedas aprender algo de él.')
    .replace(/^Sinew, bound tightly enough to be dangerous\. Useless now, but perhaps you could learn something from it\./i, 'Tendón tensado con fuerza letal. Inútil ahora, pero tal vez puedas aprender algo.')
    .replace(/^An odd bundle of scratchy sackcloth\. It's unsettling to hold\. Still, perhaps you could learn something from it\./i, 'Un extraño fardo de tela de saco áspera. Inquieta sostenerlo, pero quizás puedas aprender algo.')
    .replace(/^Perhaps you could learn from it/i, 'Quizás puedas aprender algo de ello al examinarlo.')
    .replace(/forged from/gi, 'forjado a partir de')
    .replace(/crafted from/gi, 'elaborado con')
    .replace(/restores ([0-9]+) hitpoints/gi, 'restaura $1 puntos de salud')
    .replace(/increases ([a-z]+) by ([0-9]+)/gi, 'aumenta $1 en $2');

  return s;
}

console.log('Running final deep pass on all 1104 items...');
let count = 0;
for (const item of items) {
  const transName = translateEngTitle(item.name || item.title);
  if (transName !== item.name) {
    item.name = transName;
    count++;
  }
  item.description = translateLore(item.description);
  if (item.journal) {
    item.journal = translateLore(item.journal);
  }
  if (item.recipe && item.recipe.materials) {
    item.recipe.materials.forEach(m => {
      m.item = translateEngTitle(m.englishItem || m.item);
    });
  }
  if (item.usedIn) {
    item.usedIn.forEach(u => {
      u.title = translateEngTitle(u.englishTitle || u.title);
    });
  }
}

fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf-8');
console.log(`Deep pass completed! Updated ${count} item names and synchronized all lore/materials.`);
