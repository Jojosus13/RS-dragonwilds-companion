import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const items = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/data/items.json'), 'utf8'));

// Nombres propios canónicos de RuneScape que se conservan en castellano
const ALLOWED_PROPER_NAMES = new Set([
  'Keris', 'Moonstone', 'Vis Wax', 'Draconic Vis Wax',
  'Irit', 'Marrentill', 'Marrentil', 'Harralander', 'Tarromin', 'Guam',
  'Ranarr', 'Avantoe', 'Kwuarm', 'Cadantine', 'Lantadyme',
  'Torstol', 'Snapdragon', 'Toadflax', 'Victoria Sponge Cake', 'Guthix Rest', 'Jade'
]);

const untranslatedNames = [];
const untranslatedDescriptions = [];
const untranslatedRepairCosts = [];
const untranslatedMaterials = [];
const untranslatedItemTypes = new Set();
const untranslatedFacilities = new Set();
const untranslatedDamageTypes = new Set();
const untranslatedAttackStyles = new Set();

const englishWords = [' the ', ' of ', ' a ', ' and ', ' with ', ' to ', ' for ', ' from ', ' in ', ' on ', ' by ', ' an '];

items.forEach(it => {
  // Comprobación de Nombre: Solo si coincide con el título en inglés y no es nombre propio permitido,
  // o si contiene patrones evidentes en inglés sin traducir
  const isEngTitle = it.englishTitle && it.name === it.englishTitle && !ALLOWED_PROPER_NAMES.has(it.name);
  const hasEngMarkers = /\b(Super Focused|Focused [A-Z]|Potion of)\b/i.test(it.name);
  if (isEngTitle || hasEngMarkers) {
    untranslatedNames.push({ id: it.id, name: it.name, englishTitle: it.englishTitle });
  }

  // Comprobación de Descripción
  if (it.description) {
    const isEn = englishWords.some(w => it.description.toLowerCase().includes(w));
    if (isEn) {
      untranslatedDescriptions.push({ id: it.id, name: it.name, desc: it.description });
    }
  }

  // Comprobación de repairCost
  if (it.repairCost && typeof it.repairCost === 'string' && it.repairCost.trim().length > 0) {
    if (/\b(horn|visage|bone|bones|scrap|scraps|leather scrap)\b/i.test(it.repairCost)) {
      untranslatedRepairCosts.push({ id: it.id, name: it.name, repairCost: it.repairCost });
    }
  }

  // Comprobación de Materiales de Receta
  if (it.recipe?.materials) {
    it.recipe.materials.forEach(m => {
      if (['Redberries', 'Syrup de Arce', 'Device de Obsidiana'].includes(m.item) || /\b(Super Focused|Focused Construction|Focused Artisan)\b/i.test(m.item)) {
        untranslatedMaterials.push({ id: it.id, material: m.item });
      }
    });
  }

  // Comprobación de itemType
  if (it.itemType && ['Arrow', 'Ammo', 'Melee Armour', 'Basic Item', 'Quest Item', 'Mage Armour', 'Seed', 'Raw Ingredient', 'Ranged Armour', 'Shield', 'Cape', 'Consumables & Potions', 'Special Material', 'Consumable Tome', 'Bow'].includes(it.itemType)) {
    untranslatedItemTypes.add(it.itemType);
  }

  // Comprobación de Instalaciones
  if (it.recipe?.facility && ['Armour Bench', 'Stone Range', 'Sawmill', 'Grindstone', 'Cooking Range', 'Advanced Tannery', 'Kiln', 'Grill', 'Pottery Wheel', 'Blacksmith Bench', 'Smithing Forge', 'Fletching Table', 'Stonecutter', 'Imbuing Barrel', 'Advanced Spinning Wheel'].includes(it.recipe.facility)) {
    untranslatedFacilities.add(it.recipe.facility);
  }

  // Comprobación de Tipos de Daño
  if (it.stats?.damageType && ['Arrow', 'Bolt', 'Water', 'Fire', 'Slash and Crush'].includes(it.stats.damageType)) {
    untranslatedDamageTypes.add(it.stats.damageType);
  }

  // Comprobación de Estilos de Ataque
  if (it.stats?.attackStyle && ['2-Handed Weapon', 'Two Handed', 'Main Hand', 'Ranged Weapon', 'Maul'].includes(it.stats.attackStyle)) {
    untranslatedAttackStyles.add(it.stats.attackStyle);
  }
});

console.log('=== Verificación de Textos No Traducidos ===');
console.log('Nombres no traducidos:', untranslatedNames.length, untranslatedNames);
console.log('Descripciones en inglés:', untranslatedDescriptions.length);
console.log('Costes de reparación en inglés:', untranslatedRepairCosts.length);
console.log('Materiales en inglés:', untranslatedMaterials.length);
console.log('ItemTypes en inglés:', Array.from(untranslatedItemTypes));
console.log('Instalaciones en inglés:', Array.from(untranslatedFacilities));
console.log('Tipos de daño en inglés:', Array.from(untranslatedDamageTypes));
console.log('Estilos de ataque en inglés:', Array.from(untranslatedAttackStyles));
