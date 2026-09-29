import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.join(__dirname, '../src/data/items.json');

const REPAIR_TRANSLATIONS = [
  [/([0-9]+)\s+bronze bar/gi, '$1 barra de bronce'],
  [/([0-9]+)\s+iron bar/gi, '$1 barra de hierro'],
  [/([0-9]+)\s+steel bar/gi, '$1 barra de acero'],
  [/([0-9]+)\s+mithril bar/gi, '$1 barra de mithril'],
  [/([0-9]+)\s+adamantite bar/gi, '$1 barra de adamantita'],
  [/([0-9]+)\s+adamant bar/gi, '$1 barra de adamantita'],
  [/([0-9]+)\s+runite bar/gi, '$1 barra de runita'],
  [/([0-9]+)\s+rune bar/gi, '$1 barra de runita'],
  [/([0-9]+)\s+dragon bar/gi, '$1 barra de dragón'],
  [/([0-9]+)\s+orikalkum bar/gi, '$1 barra de orikalkum'],
  [/([0-9]+)\s+normal log/gi, '$1 tronco de madera'],
  [/([0-9]+)\s+logs?/gi, '$1 tronco de madera'],
  [/([0-9]+)\s+oak log/gi, '$1 tronco de roble'],
  [/([0-9]+)\s+willow log/gi, '$1 tronco de sauce'],
  [/([0-9]+)\s+maple log/gi, '$1 tronco de arce'],
  [/([0-9]+)\s+yew log/gi, '$1 tronco de tejo'],
  [/([0-9]+)\s+magic log/gi, '$1 tronco mágico'],
  [/([0-9]+)\s+blightwood log/gi, '$1 tronco de blightwood'],
  [/([0-9]+)\s+leather/gi, '$1 cuero'],
  [/([0-9]+)\s+hard leather/gi, '$1 cuero duro'],
  [/([0-9]+)\s+green dragonhide/gi, '$1 piel de dragón verde'],
  [/([0-9]+)\s+blue dragonhide/gi, '$1 piel de dragón azul'],
  [/([0-9]+)\s+red dragonhide/gi, '$1 piel de dragón rojo'],
  [/([0-9]+)\s+black dragonhide/gi, '$1 piel de dragón negro'],
  [/([0-9]+)\s+coins?/gi, '$1 monedas'],
  [/([0-9]+)\s+gold/gi, '$1 monedas de oro']
];

export function cleanAndTranslateRepairCosts() {
  if (!fs.existsSync(ITEMS_FILE)) return;
  const items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf8'));

  items.forEach(it => {
    // Clean repairCost
    if (it.repairCost && typeof it.repairCost === 'string') {
      let rc = it.repairCost.trim();
      rc = rc.replace(/\{\{sic\|[^\}]+\}\}/gi, '').replace(/\{\{[^\}]+\}\}/gi, '').trim();
      for (const [p, r] of REPAIR_TRANSLATIONS) {
        rc = rc.replace(p, r);
      }
      it.repairCost = rc;
    }

    // Clean description markup
    if (it.description && typeof it.description === 'string') {
      it.description = it.description
        .replace(/\{\{sic\|[^\}]+\}\}/gi, '')
        .replace(/\{\{[^\}]+\}\}/gi, '')
        .replace(/\[\[([^\]\|]+)\|([^\]]+)\]\]/g, '$2')
        .replace(/\[\[([^\]]+)\]\]/g, '$1')
        .replace(/&quot;/g, '"')
        .trim();
    }

    // Clean journal markup
    if (it.journal && typeof it.journal === 'string') {
      it.journal = it.journal
        .replace(/\{\{sic\|[^\}]+\}\}/gi, '')
        .replace(/\{\{[^\}]+\}\}/gi, '')
        .replace(/\[\[([^\]\|]+)\|([^\]]+)\]\]/g, '$2')
        .replace(/\[\[([^\]]+)\]\]/g, '$1')
        .replace(/&quot;/g, '"')
        .trim();
    }
  });

  fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf8');
  console.log('Costos de reparación y etiquetas wiki limpiadas en items.json');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  cleanAndTranslateRepairCosts();
}
