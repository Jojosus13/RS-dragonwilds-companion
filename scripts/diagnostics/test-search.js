import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const itemsPath = path.resolve(__dirname, '../../src/data/items.json');
const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

function normalize(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function getWordStems(word) {
  const norm = normalize(word);
  if (!norm || norm.length <= 2) return [norm];
  const stems = new Set([norm]);

  if (norm.endsWith('ces') && norm.length > 3) {
    stems.add(norm.slice(0, -3) + 'z');
  } else if (norm.endsWith('ones') && norm.length > 4) {
    stems.add(norm.slice(0, -4) + 'on');
  } else if (norm.endsWith('anes') && norm.length > 4) {
    stems.add(norm.slice(0, -4) + 'an');
  } else if (norm.endsWith('enes') && norm.length > 4) {
    stems.add(norm.slice(0, -4) + 'en');
  } else if (norm.endsWith('es') && norm.length > 3) {
    stems.add(norm.slice(0, -2));
  } else if (norm.endsWith('s') && norm.length > 3 && !norm.endsWith('is') && !norm.endsWith('us')) {
    stems.add(norm.slice(0, -1));
  }

  return Array.from(stems);
}

function itemSearchString(item) {
  const parts = [
    item.name,
    item.title,
    item.englishTitle,
    item.category,
    item.itemType,
    item.description,
    item.journal,
    item.rarity,
    item.source,
    item.stats?.damageType,
    item.stats?.attackStyle,
    item.stats?.specialAction,
    item.recipe?.facility
  ];
  if (item.recipe?.materials) {
    item.recipe.materials.forEach(m => parts.push(m.item));
  }
  return normalize(parts.filter(Boolean).join(' '));
}

function scoreItem(item, query) {
  const normQuery = normalize(query);
  if (!normQuery) return 0;

  const queryTerms = normQuery.split(/\s+/).filter(Boolean);
  if (queryTerms.length === 0) return 0;

  const normName = normalize(item.name || item.title || '');
  const normSearchStr = itemSearchString(item);

  let totalScore = 0;

  for (const term of queryTerms) {
    const termVariations = getWordStems(term);
    let termMatched = false;
    let maxTermScore = 0;

    for (const v of termVariations) {
      if (normName === v) {
        maxTermScore = Math.max(maxTermScore, 100);
        termMatched = true;
      } else if (normName.startsWith(v + ' ') || normName.startsWith(v)) {
        maxTermScore = Math.max(maxTermScore, 60);
        termMatched = true;
      } else if (normName.includes(' ' + v) || normName.includes(v)) {
        maxTermScore = Math.max(maxTermScore, 40);
        termMatched = true;
      } else if (normSearchStr.includes(v)) {
        maxTermScore = Math.max(maxTermScore, 20);
        termMatched = true;
      }
    }

    if (!termMatched) {
      return 0;
    }
    totalScore += maxTermScore;
  }

  return totalScore;
}

function searchItems(query) {
  return items
    .map(it => ({ item: it, score: scoreItem(it, query) }))
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(res => res.item);
}

console.log('--- Search Test Results ---');
const testQueries = ['carbón', 'carbon', 'carbones', 'dragón', 'dragon', 'poción', 'pocion', 'pociones', 'espadas', 'espada'];
for (const q of testQueries) {
  const res = searchItems(q);
  console.log(`Query: "${q}" -> ${res.length} matches. Top 3: [${res.slice(0, 3).map(x => x.name).join(', ')}]`);
}
