import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const itemsPath = path.resolve(__dirname, '../../src/data/items.json');
const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

// 1. Mapeo de Nombres y Títulos pendientes
const titleReplacements = {
  "necromancer-s-crown": "Corona de Nigromante",
  "super-focused-agility-potion": "Súper Poción de Agilidad Concentrada",
  "super-focused-attack-potion": "Súper Poción de Ataque Concentrada",
  "super-focused-artisan-potion": "Súper Poción de Artesanía Concentrada",
  "super-focused-construction-potion": "Súper Poción de Construcción Concentrada",
  "super-focused-cooking-potion": "Súper Poción de Cocina Concentrada",
  "super-focused-farming-potion": "Súper Poción de Agricultura Concentrada",
  "super-focused-fishing-potion": "Súper Poción de Pesca Concentrada",
  "super-focused-mining-potion": "Súper Poción de Minería Concentrada",
  "super-focused-runecrafting-potion": "Súper Poción de Creación de Runas Concentrada",
  "super-focused-woodcutting-potion": "Súper Poción de Tala Concentrada",
  "lumberjack-potion": "Poción de Leñador",
  "black-greataxe": "Gran Hacha de Guerra Negra",
  "kuldra-s-wrath": "Ira de Kuldra",
  "lougrim-s-staff": "Bastón de Lougrim",
  "master-s-staff": "Bastón de Maestro",
  "paladin-s-helm": "Yelmo de Paladín",
  "paladin-s-platebody": "Coraza de Paladín",
  "pioneer-s-scarf": "Bufanda de Pionero",
  "plate-of-pure-obsidian": "Placa de Obsidiana Pura",
  "redberries": "Bayas Rojas",
  "sandstone": "Arenisca",
  "shrapnel": "Metralla",
  "shroud-of-noggin": "Sudario de Noggin",
  "sigil-of-a-phoenix": "Sigilo de Fénix",
  "steak": "Filete",
  "steak-n-eggs": "Filete con Huevos",
  "stir-fry": "Salteado",
  "stone": "Piedra",
  "sun-bleached-head-wrap": "Envoltura Abrasada por el Sol",
  "sun-bleached-leggings": "Polainas Abrasadas por el Sol",
  "sun-bleached-vest": "Chaleco Abrasado por el Sol",
  "torch": "Antorcha",
  "weeds": "Malas Hierbas",
  "item-jade": "Jade"
};

// 2. Mapeo de Materiales en Recetas
const materialReplacements = {
  "Redberries": "Bayas Rojas",
  "Syrup de Arce": "Jarabe de Arce",
  "Device de Obsidiana": "Mortero de Obsidiana",
  "Fried Salmón Cocinado": "Salmón Frito",
  "Poción de Lumberjack": "Poción de Leñador",
  "Poción de Focused Construction": "Poción de Construcción Concentrada",
  "Poción de Focused Artisan": "Poción de Artesanía Concentrada",
  "Poción de Focused Agility": "Poción de Agilidad Concentrada",
  "Poción de Focused Attack": "Poción de Ataque Concentrada",
  "Poción de Focused Cooking": "Poción de Cocina Concentrada",
  "Poción de Focused Farming": "Poción de Agricultura Concentrada",
  "Poción de Focused Fishing": "Poción de Pesca Concentrada",
  "Poción de Focused Mining": "Poción de Minería Concentrada",
  "Poción de Focused Runecrafting": "Poción de Creación de Runas Concentrada",
  "Poción de Focused Woodcutting": "Poción de Tala Concentrada",
  "Steak": "Filete",
  "Stone": "Piedra",
  "Sandstone": "Arenisca"
};

// 3. Diccionario de Costes de Reparación
function translateRepairCost(cost) {
  if (!cost || typeof cost !== 'string') return cost;
  return cost
    .replace(/\b(\d+)\s+ram horns?\b/gi, (m, n) => `${n} ${n > 1 ? 'cuernos' : 'cuerno'} de carnero`)
    .replace(/\b(\d+)\s+smouldering draconic visage\b/gi, (m, n) => `${n} semblante dracónico ardiente`)
    .replace(/\b(\d+)\s+undead draconic visage\b/gi, (m, n) => `${n} semblante dracónico no-muerto`)
    .replace(/\b(\d+)\s+noxious draconic visage\b/gi, (m, n) => `${n} semblante dracónico nocivo`)
    .replace(/\b(\d+)\s+animal bones?\b/gi, (m, n) => `${n} ${n > 1 ? 'huesos' : 'hueso'} de animal`)
    .replace(/\b(\d+)\s+undead bones?\b/gi, (m, n) => `${n} ${n > 1 ? 'huesos' : 'hueso'} no-muerto${n > 1 ? 's' : ''}`)
    .replace(/\b(\d+)\s+leather scraps?\b/gi, (m, n) => `${n} ${n > 1 ? 'retales' : 'retal'} de cuero`)
    .replace(/\b(\d+)\s+hard leather\b/gi, (m, n) => `${n} cuero duro`)
    .replace(/\b(\d+)\s+scorch leather\b/gi, (m, n) => `${n} cuero abrasado`)
    .replace(/\b(\d+)\s+draconic leather\b/gi, (m, n) => `${n} cuero dracónico`)
    .replace(/\b(\d+)\s+garou weave\b/gi, (m, n) => `${n} tejido garou`)
    .replace(/\b(\d+)\s+vault shards?\b/gi, (m, n) => `${n} ${n > 1 ? 'fragmentos' : 'fragmento'} de la cámara`)
    .replace(/\b(\d+)\s+vault cores?\b/gi, (m, n) => `${n} ${n > 1 ? 'núcleos' : 'núcleo'} de bóveda`)
    .replace(/\b(\d+)\s+antlers?\b/gi, (m, n) => `${n} ${n > 1 ? 'cornamentas' : 'cornamenta'} de ciervo`)
    .replace(/\b(\d+)\s+monstrous fangs?\b/gi, (m, n) => `${n} ${n > 1 ? 'colmillos monstruosos' : 'colmillo monstruoso'}`)
    .replace(/\b(\d+)\s+small animal fangs?\b/gi, (m, n) => `${n} ${n > 1 ? 'colmillos' : 'colmillo'} de animal pequeño`)
    .replace(/\b(\d+)\s+kalphite shells?\b/gi, (m, n) => `${n} ${n > 1 ? 'caparazones' : 'caparazón'} de kalphite`)
    .replace(/\b(\d+)\s+kalphite wings?\b/gi, (m, n) => `${n} ${n > 1 ? 'alas' : 'ala'} de kalphite`)
    .replace(/\b(\d+)\s+iron bars?\b/gi, (m, n) => `${n} ${n > 1 ? 'barras' : 'barra'} de hierro`)
    .replace(/\b(\d+)\s+steel bars?\b/gi, (m, n) => `${n} ${n > 1 ? 'barras' : 'barra'} de acero`)
    .replace(/\b(\d+)\s+mithril bars?\b/gi, (m, n) => `${n} ${n > 1 ? 'barras' : 'barra'} de mithril`)
    .replace(/\b(\d+)\s+adamant bars?\b/gi, (m, n) => `${n} ${n > 1 ? 'barras' : 'barra'} de adamantita`)
    .replace(/\b(\d+)\s+rune bars?\b/gi, (m, n) => `${n} ${n > 1 ? 'barras' : 'barra'} de runita`)
    .replace(/\b(\d+)\s+bronze bars?\b/gi, (m, n) => `${n} ${n > 1 ? 'barras' : 'barra'} de bronce`)
    .replace(/\b(\d+)\s+gold bars?\b/gi, (m, n) => `${n} ${n > 1 ? 'barras' : 'barra'} de oro`)
    .replace(/\b(\d+)\s+silver bars?\b/gi, (m, n) => `${n} ${n > 1 ? 'barras' : 'barra'} de plata`)
    .replace(/\b(\d+)\s+wool cloth\b/gi, (m, n) => `${n} tela de lana`)
    .replace(/\b(\d+)\s+fine cloth\b/gi, (m, n) => `${n} tela fina`)
    .replace(/\b(\d+)\s+padded cloth\b/gi, (m, n) => `${n} tela acolchada`)
    .replace(/\b(\d+)\s+oak logs?\b/gi, (m, n) => `${n} troncos de roble`)
    .replace(/\b(\d+)\s+willow logs?\b/gi, (m, n) => `${n} troncos de sauce`)
    .replace(/\b(\d+)\s+maple logs?\b/gi, (m, n) => `${n} troncos de arce`)
    .replace(/\b(\d+)\s+yew logs?\b/gi, (m, n) => `${n} troncos de tejo`)
    .replace(/\b(\d+)\s+magic logs?\b/gi, (m, n) => `${n} troncos mágicos`);
}

// 4. Aplicar cambios a cada ítem
const idToTitleMap = new Map();

items.forEach(it => {
  // Título y Nombre
  if (titleReplacements[it.id]) {
    it.title = titleReplacements[it.id];
    it.name = titleReplacements[it.id];
  }

  // Costes de reparación
  if (it.repairCost) {
    it.repairCost = translateRepairCost(it.repairCost);
  }

  // Materiales en receta
  if (it.recipe?.materials) {
    it.recipe.materials.forEach(mat => {
      if (materialReplacements[mat.item]) {
        mat.item = materialReplacements[mat.item];
      }
    });
  }

  // Limpieza de marcado wiki residual en stats
  if (it.stats?.specialAction) {
    it.stats.specialAction = it.stats.specialAction
      .replace(/\s*\(sin marco\|[^\)]*\)/gi, '')
      .replace(/\s*\(frameless\|[^\)]*\)/gi, '')
      .trim();
  }

  idToTitleMap.set(it.id, it.title);
});

// 5. Re-sincronizar array inverso usedIn
items.forEach(it => {
  if (Array.isArray(it.usedIn)) {
    it.usedIn.forEach(u => {
      if (idToTitleMap.has(u.id)) {
        u.title = idToTitleMap.get(u.id);
      }
    });
  }
});

fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), 'utf8');
console.log('✅ items.json actualizado correctamente con todas las correcciones!');
