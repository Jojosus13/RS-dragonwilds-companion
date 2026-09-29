import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.resolve(__dirname, '../../src/data/items.json');
const items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf8'));

const MATERIAL_MAP = {
  "Mystic Thread": "Hilo Místico",
  "mystic thread": "Hilo Místico",
  "Vis Cloth": "Tela Vis",
  "Padded Cloth": "Tela Acolchada",
  "Rough Cloth": "Tela Áspera",
  "Mystic Cloth": "Tela Mística",
  "Wool Thread": "Hilo de Lana",
  "Wool Cloth": "Tela de Lana",
  "Scorch Leather": "Cuero Abrasado",
  "Weapon Barbs": "Puntas Dentadas para Armas",
  "Vault Shard": "Fragmento de la Cámara",
  "Noxious Draconic Visage": "Semblante Dracónico Nocivo",
  "Undead Draconic Visage": "Semblante Dracónico No-Muerto",
  "Smouldering Draconic Visage": "Semblante Dracónico Humeante",
  "Sacred Oil": "Aceite Sagrado",
  "Warped Feathers": "Plumas Deformadas",
  "Shimmerscale Powder": "Polvo de Escama Brillante",
  "Soft Animal Fur": "Piel Suave de Animal",
  "Vis Fibres": "Fibras Vis",
  "Luminite Ore": "Mena de Luminita",
  "Soul Fragment": "Fragmento de Alma",
  "Ascension Shard (Power Level 4)": "Fragmento de Ascensión (Nivel de Poder 4)",
  "Ascension Shard (Power Level 5)": "Fragmento de Ascensión (Nivel de Poder 5)",
  "Ascension Shard (Power Level 6)": "Fragmento de Ascensión (Nivel de Poder 6)",
  "Ascension Shard (Power Level 7)": "Fragmento de Ascensión (Nivel de Poder 7)",
  "Ascension Shard (Power Level 8)": "Fragmento de Ascensión (Nivel de Poder 8)",
  "Ascension Shard (Power Level 9)": "Fragmento de Ascensión (Nivel de Poder 9)",
  "Poción de Focused Runecrafting": "Poción de Creación de Runas Concentrada",
  "Poción de Focused Woodcutting": "Poción de Tala Concentrada",
  "Poción de Focused Mining": "Poción de Minería Concentrada",
  "Poción de Focused Smithing": "Poción de Herrería Concentrada",
  "Poción de Focused Crafting": "Poción de Artesanía Concentrada",
  "Poción de Focused Cooking": "Poción de Cocina Concentrada",
  "Poción de Focused Fishing": "Poción de Pesca Concentrada",
  "Poción de Focused Farming": "Poción de Agricultura Concentrada",
  "Poción de Focused Agility": "Poción de Agilidad Concentrada",
  "Poción de Focused Attack": "Poción de Ataque Concentrada",
  "Poción de Focused Magic": "Poción de Magia Concentrada",
  "Poción de Focused Ranged": "Poción de A Distancia Concentrada"
};

let materialsReplaced = 0;
let itemsReplaced = 0;

items.forEach(it => {
  // If item name itself matches
  if (MATERIAL_MAP[it.name]) {
    it.name = MATERIAL_MAP[it.name];
    itemsReplaced++;
  }
  if (MATERIAL_MAP[it.title]) {
    it.name = MATERIAL_MAP[it.title];
  }

  // Materials in recipe
  if (it.recipe?.materials) {
    it.recipe.materials.forEach(mat => {
      if (MATERIAL_MAP[mat.item]) {
        mat.item = MATERIAL_MAP[mat.item];
        materialsReplaced++;
      }
    });
  }

  // UsedIn references
  if (it.usedIn) {
    it.usedIn.forEach(u => {
      if (MATERIAL_MAP[u.title]) {
        u.title = MATERIAL_MAP[u.title];
      }
    });
  }
});

fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf8');
console.log(`¡Completado!`);
console.log(`- Materiales de recetas actualizados: ${materialsReplaced}`);
console.log(`- Nombres de objeto actualizados: ${itemsReplaced}`);
