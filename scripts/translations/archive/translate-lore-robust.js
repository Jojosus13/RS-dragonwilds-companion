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

function postProcessSpanish(str) {
  if (!str) return str;
  let s = str;
  s = s.replace(/\{\{sic\|[^\}]+\}\}/gi, '');
  s = s.replace(/\{\{[^\}]+\}\}/gi, '');
  s = s.replace(/\[\[([^\]\|]+)\|([^\]]+)\]\]/g, '$2');
  s = s.replace(/\[\[([^\]]+)\]\]/g, '$1');
  s = s.replace(/&quot;/g, '"');
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

async function translateSingle(clean) {
  if (cache[clean]) return cache[clean];

  // Try Google GTX endpoint
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${encodeURIComponent(clean)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const translated = postProcessSpanish(data[0].map(s => s[0]).join(''));
        if (translated) {
          cache[clean] = translated;
          return translated;
        }
      } else if (res.status === 429) {
        // Delay on rate limit
        await new Promise(r => setTimeout(r, 2000 * attempt));
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000 * attempt));
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

async function main() {
  console.log('Iniciando traducción robusta con pacing controlado...');

  const pending = [];
  items.forEach(it => {
    if (it.journal && it.journal.trim() && !cache[it.journal.trim()]) {
      pending.push(it.journal.trim());
    }
    if (it.description && it.description.trim() && !cache[it.description.trim()]) {
      pending.push(it.description.trim());
    }
    if (it.stats?.specialAction && it.stats.specialAction.trim() && !cache[it.stats.specialAction.trim()]) {
      pending.push(it.stats.specialAction.trim());
    }
    if (it.stats?.specialEffect && it.stats.specialEffect.trim() && !cache[it.stats.specialEffect.trim()]) {
      pending.push(it.stats.specialEffect.trim());
    }
  });

  const uniquePending = Array.from(new Set(pending));
  console.log(`Textos pendientes por traducir: ${uniquePending.length} (de un total ya cacheado de ${Object.keys(cache).length})`);

  for (let i = 0; i < uniquePending.length; i++) {
    const text = uniquePending[i];
    await translateSingle(text);
    if ((i + 1) % 20 === 0 || i === uniquePending.length - 1) {
      console.log(`Completados ${i + 1}/${uniquePending.length} (${Math.round(((i + 1) / uniquePending.length) * 100)}%)...`);
      saveCache();
    }
    // Polite pacing: 250ms between requests
    await new Promise(r => setTimeout(r, 250));
  }

  saveCache();
  console.log('Aplicando traducciones a items.json...');

  let descCount = 0;
  let journalCount = 0;

  items.forEach(it => {
    // Repair cost
    if (it.repairCost && typeof it.repairCost === 'string') {
      let rc = it.repairCost.trim();
      rc = rc.replace(/\{\{sic\|[^\}]+\}\}/gi, '').replace(/\{\{[^\}]+\}\}/gi, '').trim();
      for (const [p, r] of REPAIR_TRANSLATIONS) {
        rc = rc.replace(p, r);
      }
      it.repairCost = rc;
    }

    // Journal (Lore)
    if (it.journal && it.journal.trim()) {
      const orig = it.journal.trim();
      if (cache[orig]) {
        it.journal = cache[orig];
        journalCount++;
      } else {
        it.journal = postProcessSpanish(it.journal);
      }
    }

    // Description
    if (it.description && it.description.trim()) {
      const orig = it.description.trim();
      if (cache[orig]) {
        it.description = cache[orig];
        descCount++;
      } else {
        it.description = postProcessSpanish(it.description);
      }
    }

    // Stats
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
  console.log('¡items.json actualizado con éxito con todas las descripciones y el Lore en castellano!');
}

main();
