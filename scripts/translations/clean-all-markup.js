import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.resolve(__dirname, '../../src/data/items.json');
const items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf8'));

items.forEach(it => {
  if (it.description && typeof it.description === 'string') {
    it.description = it.description
      .replace(/\{\{sic\|[^\}]*\}\}/gi, '')
      .replace(/\{\{sic\|[^\}]*$/gi, '')
      .replace(/\{\{[^\}]*\}\}/gi, '')
      .replace(/\[\[([^\]\|]+)\|([^\]]+)\]\]/g, '$2')
      .replace(/\[\[([^\]]+)\]\]/g, '$1')
      .replace(/&quot;/g, '"')
      .trim();

    if (it.description && !it.description.endsWith('.') && !it.description.endsWith('!') && !it.description.endsWith('?')) {
      it.description += '.';
    }
  }

  if (it.journal && typeof it.journal === 'string') {
    it.journal = it.journal
      .replace(/\{\{sic\|[^\}]*\}\}/gi, '')
      .replace(/\{\{sic\|[^\}]*$/gi, '')
      .replace(/\{\{[^\}]*\}\}/gi, '')
      .replace(/\[\[([^\]\|]+)\|([^\]]+)\]\]/g, '$2')
      .replace(/\[\[([^\]]+)\]\]/g, '$1')
      .replace(/&quot;/g, '"')
      .trim();
  }

  if (it.repairCost && typeof it.repairCost === 'string') {
    it.repairCost = it.repairCost
      .replace(/\{\{sic\|[^\}]*\}\}/gi, '')
      .replace(/\{\{sic\|[^\}]*$/gi, '')
      .replace(/\{\{[^\}]*\}\}/gi, '')
      .trim();
  }
});

fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf8');
console.log('Marcado wiki limpiado con éxito en items.json');
