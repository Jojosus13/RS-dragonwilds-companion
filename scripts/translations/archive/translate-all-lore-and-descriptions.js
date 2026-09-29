import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.join(__dirname, '../src/data/items.json');
const CACHE_FILE = path.join(__dirname, 'lore-translation-cache.json');

const items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf8'));

let cache = {};
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (e) {
    cache = {};
  }
}

function saveCache() {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
}

// Google translate helper with retry and exponential backoff
async function translateText(text) {
  if (!text || typeof text !== 'string') return text;
  const clean = text.trim();
  if (!clean) return clean;

  // If already cached
  if (cache[clean]) {
    return cache[clean];
  }

  // If already pure Spanish (no English sentence indicators)
  const isLikelyEnglish = /[a-zA-Z]{4,}/.test(clean) && (
    clean.includes(' the ') || 
    clean.includes(' of ') || 
    clean.includes(' and ') || 
    clean.includes(' to ') || 
    clean.includes(' a ') || 
    clean.includes(' is ') || 
    clean.includes(' in ') || 
    clean.includes(' for ') || 
    clean.includes(' with ') || 
    clean.includes(' can ') || 
    clean.includes(' from ') || 
    clean.includes(' that ') ||
    clean.includes(' are ') ||
    clean.includes(' this ')
  );

  if (!isLikelyEnglish && !clean.startsWith('A ') && !clean.startsWith('An ') && !clean.startsWith('The ')) {
    return clean;
  }

  // Fetch translation
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=' + encodeURIComponent(clean);
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      let translated = data[0].map(s => s[0]).join('');

      // Post-processing corrections
      translated = postProcessSpanish(translated);

      cache[clean] = translated;
      return translated;
    } catch (err) {
      if (attempt === 4) {
        console.error(`Error traduciendo [${clean.substring(0, 40)}...]:`, err.message);
        return clean;
      }
      await new Promise(r => setTimeout(r, 1000 * attempt));
    }
  }
  return clean;
}

function postProcessSpanish(str) {
  if (!str) return str;
  let s = str;
  s = s.replace(/algod[oó]n cadav[eé]rico/gi, 'algodón de cadáver');
  s = s.replace(/Algod[oó]n Cadav[eé]rico/gi, 'Algodón de Cadáver');
  s = s.replace(/flor cadav[eé]rica/gi, 'flor de cadáver');
  s = s.replace(/Flor Cadav[eé]rica/gi, 'Flor de Cadáver');
  s = s.replace(/flor del cad[aá]ver/gi, 'flor de cadáver');
  s = s.replace(/Flor del Cad[aá]ver/gi, 'Flor de Cadáver');
  s = s.replace(/algod[oó]n de cad[aá]veres/gi, 'algodón de cadáver');
  s = s.replace(/Algod[oó]n de Cad[aá]veres/gi, 'Algodón de Cadáver');
  s = s.replace(/bayas cadava quemado/gi, 'bayas cadava quemadas');
  s = s.replace(/Bayas Cadava Quemado/gi, 'Bayas Cadava Quemadas');
  s = s.replace(/Blightwood/g, 'Blightwood');
  s = s.replace(/Dragonkin/g, 'Dragonkin');
  s = s.replace(/Ashenfall/g, 'Ashenfall');
  return s;
}

async function run() {
  console.log(`Iniciando traducción masiva de Lore (Journals) y Descripciones para ${items.length} objetos...`);

  // Collect all unique texts to translate
  const textsToTranslate = new Set();
  items.forEach(it => {
    if (it.journal && it.journal.trim()) textsToTranslate.add(it.journal.trim());
    if (it.description && it.description.trim()) textsToTranslate.add(it.description.trim());
    if (it.stats?.specialAction && it.stats.specialAction.trim()) textsToTranslate.add(it.stats.specialAction.trim());
    if (it.stats?.specialEffect && it.stats.specialEffect.trim()) textsToTranslate.add(it.stats.specialEffect.trim());
  });

  console.log(`Total de textos únicos a procesar: ${textsToTranslate.size}`);

  const textArray = Array.from(textsToTranslate);
  const BATCH_SIZE = 15;
  let processed = 0;

  for (let i = 0; i < textArray.length; i += BATCH_SIZE) {
    const batch = textArray.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (text) => {
      await translateText(text);
    }));

    processed += batch.length;
    if (processed % 60 === 0 || processed === textArray.length) {
      console.log(`Progreso: ${processed}/${textArray.length} (${Math.round((processed / textArray.length) * 100)}%) textos procesados...`);
      saveCache();
    }
    // Small delay to be polite to the endpoint
    await new Promise(r => setTimeout(r, 150));
  }

  saveCache();
  console.log('Todos los textos traducidos y cacheados. Aplicando a items.json...');

  // Apply translations to items
  let journalsUpdated = 0;
  let descriptionsUpdated = 0;

  items.forEach(it => {
    if (it.journal && it.journal.trim()) {
      const orig = it.journal.trim();
      if (cache[orig]) {
        it.journal = cache[orig];
        journalsUpdated++;
      } else {
        it.journal = postProcessSpanish(it.journal);
      }
    }

    if (it.description && it.description.trim()) {
      const orig = it.description.trim();
      if (cache[orig]) {
        it.description = cache[orig];
        descriptionsUpdated++;
      } else {
        it.description = postProcessSpanish(it.description);
      }
    }

    if (it.stats) {
      if (it.stats.specialAction && cache[it.stats.specialAction.trim()]) {
        it.stats.specialAction = cache[it.stats.specialAction.trim()];
      }
      if (it.stats.specialEffect && cache[it.stats.specialEffect.trim()]) {
        it.stats.specialEffect = cache[it.stats.specialEffect.trim()];
      }
    }
  });

  fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf8');
  console.log(`¡Éxito! Guardado items.json.`);
  console.log(`- Diarios del Códice (Lore) actualizados: ${journalsUpdated}`);
  console.log(`- Descripciones de objetos actualizadas: ${descriptionsUpdated}`);
}

run();
