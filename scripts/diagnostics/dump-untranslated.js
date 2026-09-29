import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const itemsPath = path.resolve(__dirname, '../../src/data/items.json');
const outputPath = path.resolve(__dirname, '../data/untranslated_names.json');

const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

const untranslated = items.filter(it => it.name === it.englishTitle || it.name === it.title);
console.log('Total untranslated names:', untranslated.length);
fs.writeFileSync(outputPath, JSON.stringify(untranslated.map(it => ({ id: it.id, name: it.name, category: it.category, desc: it.description })), null, 2), 'utf8');
console.log(`Saved to ${outputPath}`);
