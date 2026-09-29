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

function cleanMarkup(str) {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/\{\{sic\|[^\}]+\}\}/gi, '')
    .replace(/\{\{[^\}]+\}\}/gi, '')
    .replace(/\[\[([^\]\|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/&quot;/g, '"')
    .trim();
}

function postProcessSpanish(str) {
  if (!str) return str;
  let s = cleanMarkup(str);
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
  return s.trim();
}

async function translateText(rawText) {
  if (!rawText || typeof rawText !== 'string') return rawText;
  const clean = cleanMarkup(rawText);
  if (!clean) return clean;

  if (cache[clean]) {
    return postProcessSpanish(cache[clean]);
  }

  // Attempt using clients5 endpoint
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=es&q=${encodeURIComponent(clean)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const resText = Array.isArray(data) ? data[0] : data;
        const translated = postProcessSpanish(resText);
        if (translated) {
          cache[clean] = translated;
          return translated;
        }
      }
    } catch (err) {
      await new Promise(r => setTimeout(r, 400 * attempt));
    }
  }

  // Fallback endpoint
  try {
    const url2 = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean.substring(0, 450))}&langpair=en|es`;
    const res2 = await fetch(url2);
    if (res2.ok) {
      const data2 = await res2.json();
      if (data2.responseData?.translatedText) {
        const tr = postProcessSpanish(data2.responseData.translatedText);
        cache[clean] = tr;
        return tr;
      }
    }
  } catch (e) {}

  return postProcessSpanish(clean);
}

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

async function run() {
  console.log('Iniciando traducción y limpieza completa con clients5...');

  // Collect all unique texts to translate
  const uniqueTexts = new Set();
  items.forEach(it => {
    if (it.journal && it.journal.trim()) uniqueTexts.add(cleanMarkup(it.journal.trim()));
    if (it.description && it.description.trim()) uniqueTexts.add(cleanMarkup(it.description.trim()));
    if (it.stats?.specialAction && it.stats.specialAction.trim()) uniqueTexts.add(cleanMarkup(it.stats.specialAction.trim()));
    if (it.stats?.specialEffect && it.stats.specialEffect.trim()) uniqueTexts.add(cleanMarkup(it.stats.specialEffect.trim()));
  });

  const textList = Array.from(uniqueTexts);
  const pending = textList.filter(t => !cache[t]);
  console.log(`Textos totales: ${textList.length} | Ya en caché: ${textList.length - pending.length} | Pendientes: ${pending.length}`);

  // Process in small parallel chunks
  const CHUNK_SIZE = 5;
  for (let i = 0; i < pending.length; i += CHUNK_SIZE) {
    const chunk = pending.slice(i, i + CHUNK_SIZE);
    await Promise.all(chunk.map(t => translateText(t)));

    if ((i + CHUNK_SIZE) % 50 === 0 || i + CHUNK_SIZE >= pending.length) {
      console.log(`Traducidos ${Math.min(i + CHUNK_SIZE, pending.length)}/${pending.length}...`);
      saveCache();
    }
    await new Promise(r => setTimeout(r, 60));
  }

  saveCache();
  console.log('Aplicando traducciones a items.json...');

  let journalUpdated = 0;
  let descUpdated = 0;

  items.forEach(it => {
    // Repair cost
    if (it.repairCost && typeof it.repairCost === 'string') {
      let rc = cleanMarkup(it.repairCost);
      for (const [p, r] of REPAIR_TRANSLATIONS) {
        rc = rc.replace(p, r);
      }
      it.repairCost = rc;
    }

    // Description
    if (it.description && it.description.trim()) {
      const clean = cleanMarkup(it.description.trim());
      it.description = postProcessSpanish(cache[clean] || translateText(clean) || clean);
      descUpdated++;
    }

    // Journal (Lore)
    if (it.journal && it.journal.trim()) {
      const clean = cleanMarkup(it.journal.trim());
      it.journal = postProcessSpanish(cache[clean] || translateText(clean) || clean);
      journalUpdated++;
    }

    // Stats
    if (it.stats) {
      if (it.stats.specialAction && it.stats.specialAction.trim()) {
        const clean = cleanMarkup(it.stats.specialAction.trim());
        it.stats.specialAction = postProcessSpanish(cache[clean] || clean);
      }
      if (it.stats.specialEffect && it.stats.specialEffect.trim()) {
        const clean = cleanMarkup(it.stats.specialEffect.trim());
        it.stats.specialEffect = postProcessSpanish(cache[clean] || clean);
      }
    }
  });

  fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf8');
  console.log(`¡Traducción completada con éxito!`);
  console.log(`- Descripciones procesadas: ${descUpdated}`);
  console.log(`- Diarios del Códice (Lore) procesados: ${journalUpdated}`);
}

run();
