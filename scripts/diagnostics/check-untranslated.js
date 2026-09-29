import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const items = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../src/data/items.json'), 'utf8'));

const untranslatedNames = [];
const untranslatedDescriptions = [];
const untranslatedItemTypes = new Set();
const untranslatedFacilities = new Set();
const untranslatedDamageTypes = new Set();
const untranslatedAttackStyles = new Set();

const englishWords = [' the ', ' of ', ' a ', ' and ', ' with ', ' to ', ' for ', ' from ', ' in ', ' on ', ' by ', ' an '];

items.forEach(it => {
  // Check name
  const nameIsEng = it.name === it.englishTitle || it.name === it.title;
  // Let's check if name contains english words or is standard english
  if (nameIsEng) {
    untranslatedNames.push({ id: it.id, name: it.name, category: it.category, itemType: it.itemType });
  }

  // Check description
  if (it.description) {
    const isEn = englishWords.some(w => it.description.toLowerCase().includes(w));
    if (isEn) {
      untranslatedDescriptions.push({ id: it.id, name: it.name, desc: it.description });
    }
  }

  if (it.itemType && /^[A-Za-z\s&]+$/.test(it.itemType) && !['Herramienta', 'Recurso', 'Armadura', 'Consumible'].includes(it.itemType)) {
    // check if english itemType
    if (['Arrow', 'Ammo', 'Melee Armour', 'Basic Item', 'Quest Item', 'Mage Armour', 'Seed', 'Raw Ingredient', 'Ranged Armour', 'Shield', 'Cape', 'Consumables & Potions', 'Special Material', 'Consumable Tome', 'Bow'].includes(it.itemType)) {
      untranslatedItemTypes.add(it.itemType);
    }
  }

  if (it.recipe?.facility) {
    if (['Armour Bench', 'Stone Range', 'Sawmill', 'Grindstone', 'Cooking Range', 'Advanced Tannery', 'Kiln', 'Grill', 'Pottery Wheel', 'Blacksmith Bench', 'Smithing Forge', 'Fletching Table', 'Stonecutter', 'Imbuing Barrel', 'Advanced Spinning Wheel'].includes(it.recipe.facility)) {
      untranslatedFacilities.add(it.recipe.facility);
    }
  }

  if (it.stats?.damageType) {
    if (['Arrow', 'Bolt', 'Water', 'Fire', 'Slash and Crush'].includes(it.stats.damageType)) {
      untranslatedDamageTypes.add(it.stats.damageType);
    }
  }

  if (it.stats?.attackStyle) {
    if (['2-Handed Weapon', 'Two Handed', 'Main Hand', 'Ranged Weapon', 'Maul'].includes(it.stats.attackStyle)) {
      untranslatedAttackStyles.add(it.stats.attackStyle);
    }
  }
});

console.log('Untranslated Names count:', untranslatedNames.length);
console.log('Sample untranslated names (first 25):', untranslatedNames.slice(0, 25).map(x => x.name));
console.log('Untranslated Descriptions count:', untranslatedDescriptions.length);
console.log('Sample untranslated descriptions (first 5):', untranslatedDescriptions.slice(0, 5));
console.log('Untranslated ItemTypes:', Array.from(untranslatedItemTypes));
console.log('Untranslated Facilities:', Array.from(untranslatedFacilities));
console.log('Untranslated DamageTypes:', Array.from(untranslatedDamageTypes));
console.log('Untranslated AttackStyles:', Array.from(untranslatedAttackStyles));
