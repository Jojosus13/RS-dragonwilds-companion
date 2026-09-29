import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_FILE = path.resolve(__dirname, '../data/all_quests_raw.json');
const QUESTS_OUTPUT = path.resolve(__dirname, '../../src/data/quests.json');
const CACHE_FILE = path.resolve(__dirname, '../data/lore-translation-cache.json');

const raw = JSON.parse(fs.readFileSync(RAW_FILE, 'utf8'));

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

// Clean wikitext to clean readable text while preserving list structure and basic formatting
function cleanWikitext(text) {
  if (!text) return '';
  let str = text;

  // Remove templates that shouldn't appear
  str = str.replace(/\{\{External\|[^\}]*\}\}/gi, '');
  str = str.replace(/\{\{Infobox[^\}]*\}\}/gis, '');
  str = str.replace(/\{\{Hastranscript\|[^\}]*\}\}/gi, '');
  str = str.replace(/\{\{Quests\}\}/gi, '');
  str = str.replace(/\{\{sic\|([^\}]+)\}\}/gi, '$1');
  str = str.replace(/\{\{RSL\|([^\|\}]+)(?:\|([^\}]+))?\}\}/gi, (m, p1, p2) => p2 || p1);
  str = str.replace(/\{\{Map\|([^\}]+)\}\}/gi, '');
  str = str.replace(/\{\{Flexbox\s*\|\s*([^}]+)\}\}/gis, (m, content) => {
    return content.split('|').map(s => `• ${s.trim()}`).filter(Boolean).join('\n');
  });
  str = str.replace(/\{\{[^\}]*\}\}/g, ''); // remaining templates

  // Remove files/images
  str = str.replace(/\[\[File:[^\]]+\]\]/gi, '');
  str = str.replace(/\[\[Image:[^\]]+\]\]/gi, '');

  // Convert links [[Link|Text]] -> Text, [[Link]] -> Link
  str = str.replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1');

  // Convert bold and italic
  str = str.replace(/'''''/g, '');
  str = str.replace(/'''/g, '');
  str = str.replace(/''/g, '');

  // Convert HTML tables or tags
  str = str.replace(/\{\|[\s\S]*?\|\}/g, ''); // tables
  str = str.replace(/<ref[^>]*>.*?<\/ref>/gis, '');
  str = str.replace(/<br\s*\/?>/gi, '\n');
  str = str.replace(/<[^>]*>/g, '');

  // Clean bullet points
  str = str.replace(/^\*\*\s*/gm, '    • ');
  str = str.replace(/^\*\s*/gm, '• ');
  str = str.replace(/^#\s*/gm, '1. ');

  // Clean double newlines
  str = str.replace(/\n{3,}/g, '\n\n');

  return str.trim();
}

// Translate with Google API + fallback
async function translateToSpanish(text) {
  if (!text || typeof text !== 'string') return text;
  const clean = text.trim();
  if (!clean) return clean;

  if (cache[clean]) {
    return cache[clean];
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=en&tl=es&q=${encodeURIComponent(clean)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const resText = Array.isArray(data) ? data[0] : data;
        if (resText) {
          cache[clean] = resText;
          return resText;
        }
      }
    } catch (err) {
      await new Promise(r => setTimeout(r, 300 * attempt));
    }
  }

  // Fallback endpoint
  try {
    const url2 = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean.substring(0, 450))}&langpair=en|es`;
    const res2 = await fetch(url2);
    if (res2.ok) {
      const data2 = await res2.json();
      if (data2.responseData?.translatedText) {
        const tr = data2.responseData.translatedText;
        cache[clean] = tr;
        return tr;
      }
    }
  } catch (e) {}

  return clean;
}

// Split walkthrough into logical parts / steps
function extractWalkthroughParts(walkthroughText) {
  if (!walkthroughText) return [];

  const parts = [];
  const lines = walkthroughText.split('\n');
  let currentPartTitle = 'Introducción & Comienzo';
  let currentLines = [];

  for (let line of lines) {
    const headerMatch = line.match(/^={2,4}\s*([^=]+)\s*={2,4}$/);
    if (headerMatch) {
      if (currentLines.length > 0) {
        const cleanContent = cleanWikitext(currentLines.join('\n'));
        if (cleanContent.length > 5) {
          parts.push({
            title: currentPartTitle,
            content: cleanContent
          });
        }
        currentLines = [];
      }
      currentPartTitle = headerMatch[1].trim();
    } else {
      currentLines.push(line);
    }
  }

  if (currentLines.length > 0) {
    const cleanContent = cleanWikitext(currentLines.join('\n'));
    if (cleanContent.length > 5) {
      parts.push({
        title: currentPartTitle,
        content: cleanContent
      });
    }
  }

  return parts;
}

// Parse infobox / details
function extractInfoboxField(wikitext, fieldName) {
  const reg = new RegExp(`\\|\\s*${fieldName}\\s*=\\s*([^\\n\\|\\}]+(?:\\n(?!\\||\\})[^\\n\\|\\}]+)*)`, 'i');
  const m = wikitext.match(reg);
  return m ? m[1].trim() : '';
}

// Extract list from wikitext (like items, enemies, requirements)
function extractList(rawText) {
  if (!rawText) return [];
  const cleaned = cleanWikitext(rawText);
  return cleaned
    .split(/\n|•/)
    .map(s => s.replace(/^[•\-\*]\s*/, '').trim())
    .filter(s => s && s.length > 1 && !s.startsWith('{'));
}

async function run() {
  console.log(`Processing ${raw.length} quests...`);
  const processedQuests = [];

  const KNOWN_SPANISH_NAMES = {
    'A Melody Remembered': { name: 'Una Melodía Recordada', difficulty: 'Principiante' },
    'A Room With A Garou': { name: 'Una Habitación con un Garou', difficulty: 'Intermedia' },
    'Animal Magnetism': { name: 'Magnetismo Animal', difficulty: 'Intermedia' },
    'Biohazard': { name: 'Riesgo Biológico', difficulty: 'Intermedia' },
    "Black Knight's Fortress": { name: 'La Fortaleza del Caballero Negro', difficulty: 'Intermedia' },
    'Brink of Extinction': { name: 'Al Borde de la Extinción', difficulty: 'Maestra' },
    'Contact!': { name: '¡Contacto!', difficulty: 'Maestra' },
    "Cook's Assistant": { name: 'El Asistente del Cocinero', difficulty: 'Principiante' },
    'Dog Days': { name: 'Días de Perros', difficulty: 'Principiante' },
    "Doric's Quest": { name: 'La Misión de Doric', difficulty: 'Principiante' },
    'Dragon Slayer': { name: 'El Matadragones', difficulty: 'Gran Maestra' },
    'Even More Restless Ghosts': { name: 'Aún Más Fantasmas Inquietos', difficulty: 'Intermedia' },
    'First Steps': { name: 'Primeros Pasos en Ashenfall', difficulty: 'Principiante' },
    'Getting Started': { name: 'Comenzando la Aventura', difficulty: 'Principiante' },
    'Goblin Diplomacy': { name: 'Diplomacia de Trasgos', difficulty: 'Principiante' },
    'Granite Mauled': { name: 'Golpe de Granito', difficulty: 'Intermedia' },
    'Growing Pains': { name: 'Dolores de Crecimiento', difficulty: 'Principiante' },
    'Heartstrings': { name: 'Cuerdas del Corazón', difficulty: 'Intermedia' },
    'Highlighting the Problem': { name: 'Enfocando el Problema', difficulty: 'Intermedia' },
    "Icthlarin's Little Helper": { name: 'El Ayudante de Icthlarin', difficulty: 'Maestra' },
    'Letters for the Dead': { name: 'Cartas para los Muertos', difficulty: 'Intermedia' },
    'Mapping The Sands I': { name: 'Cartografiando las Arenas I', difficulty: 'Principiante' },
    'Mapping The Sands II': { name: 'Cartografiando las Arenas II', difficulty: 'Intermedia' },
    'Mirror, Mirror': { name: 'Espejito, Espejito', difficulty: 'Intermedia' },
    'Ratcatcher': { name: 'El Cazador de Ratas', difficulty: 'Intermedia' },
    'Regicide': { name: 'Regicidio', difficulty: 'Maestra' },
    'Restless Ghosts': { name: 'Fantasmas Inquietos', difficulty: 'Principiante' },
    'Rune Mysteries': { name: 'Misterios Rúnicos', difficulty: 'Principiante' },
    'Seeking Salvation': { name: 'Buscando la Salvación', difficulty: 'Intermedia' },
    'Shrimp Catcher': { name: 'El Pescador de Camarones', difficulty: 'Principiante' },
    'Statues of Saradomin': { name: 'Estatuas de Saradomin', difficulty: 'Intermedia' },
    'The Great Body Robbery': { name: 'El Gran Robo de Cuerpos', difficulty: 'Maestra' },
    'The Wild Hunt': { name: 'La Caza Salvaje', difficulty: 'Maestra' },
    'Things That Go Boom In The Night': { name: 'Cosas que Hacen ¡Boom! en la Noche', difficulty: 'Intermedia' },
    'Wanted!': { name: '¡Se Busca!', difficulty: 'Maestra' },
    'Warding Off Danger': { name: 'Alejando el Peligro', difficulty: 'Intermedia' },
    'What Remains is Written': { name: 'Lo que Queda Está Escrito', difficulty: 'Intermedia' },
    "What's Theirs is Mine!": { name: '¡Lo Suyo es Mío!', difficulty: 'Intermedia' },
    'Withering Heights': { name: 'Las Alturas Marchitas', difficulty: 'Gran Maestra' }
  };

  for (let i = 0; i < raw.length; i++) {
    const q = raw[i];
    const known = KNOWN_SPANISH_NAMES[q.title] || { name: q.title, difficulty: 'Intermedia' };
    console.log(`[${i+1}/${raw.length}] Processing "${q.title}" -> "${known.name}"`);

    const rawDesc = extractInfoboxField(q.wikitext, 'desc');
    const rawStart = extractInfoboxField(q.wikitext, 'start');
    const rawReq = extractInfoboxField(q.wikitext, 'req');
    const rawItemReq = extractInfoboxField(q.wikitext, 'item_req');
    const rawRec = extractInfoboxField(q.wikitext, 'rec');
    const rawEnemies = extractInfoboxField(q.wikitext, 'enemies');
    const qtype = extractInfoboxField(q.wikitext, 'qtype') || 'secondary';

    // Walkthrough section
    const wtMatch = q.wikitext.match(/==\s*Walkthrough\s*==\s*\n(.*?)(?=\n==\s*(?:Rewards?|Trivia|Transcript|References|See also)|$)/si);
    const rawWalkthrough = wtMatch ? wtMatch[1] : '';

    // Rewards section
    const rewardMatch = q.wikitext.match(/==\s*Rewards?\s*==\s*\n(.*?)(?=\n==\s*(?:Trivia|Transcript|References|See also)|$)/si);
    const rawRewards = rewardMatch ? rewardMatch[1] : '';

    // Translate description / summary
    const summary = rawDesc ? await translateToSpanish(cleanWikitext(rawDesc)) : `Misión en Ashenfall: ${known.name}.`;
    const startPoint = rawStart ? await translateToSpanish(cleanWikitext(rawStart)) : 'Ashenfall / PNJ local';

    // Parse lists
    const rawReqList = extractList(rawReq);
    const requirements = [];
    for (const item of rawReqList) {
      if (item && !item.toLowerCase().includes('none') && !item.toLowerCase().includes('ninguno')) {
        requirements.push(await translateToSpanish(item));
      }
    }
    if (requirements.length === 0) {
      requirements.push('Sin requisitos previos especiales');
    }

    const rawItemList = extractList(rawItemReq);
    const itemsRequired = [];
    for (const item of rawItemList) {
      if (item && !item.toLowerCase().includes('none') && !item.toLowerCase().includes('ninguno')) {
        itemsRequired.push(await translateToSpanish(item));
      }
    }

    const rawRecList = extractList(rawRec);
    const itemsRecommended = [];
    for (const item of rawRecList) {
      if (item && !item.toLowerCase().includes('none') && !item.toLowerCase().includes('ninguno')) {
        itemsRecommended.push(await translateToSpanish(item));
      }
    }

    const rawEnemiesList = extractList(rawEnemies);
    const enemies = [];
    for (const item of rawEnemiesList) {
      if (item && !item.toLowerCase().includes('none') && !item.toLowerCase().includes('ninguno')) {
        enemies.push(await translateToSpanish(item));
      }
    }

    const rawRewardsList = extractList(rawRewards);
    const rewards = [];
    for (const item of rawRewardsList) {
      if (item && !item.toLowerCase().includes('none') && !item.toLowerCase().includes('ninguno')) {
        rewards.push(await translateToSpanish(item));
      }
    }
    if (rewards.length === 0) {
      rewards.push('Puntos de Misión y Exp en Habilidades');
    }

    // Process Walkthrough parts
    const rawParts = extractWalkthroughParts(rawWalkthrough);
    const walkthrough = [];

    if (rawParts.length === 0 && rawWalkthrough.trim()) {
      const cleanSingle = cleanWikitext(rawWalkthrough);
      if (cleanSingle) {
        walkthrough.push({
          stepTitle: 'Guía de la Misión',
          content: await translateToSpanish(cleanSingle)
        });
      }
    } else {
      for (const part of rawParts) {
        const trTitle = await translateToSpanish(part.title);
        const trContent = await translateToSpanish(part.content);
        walkthrough.push({
          stepTitle: trTitle,
          content: trContent
        });
      }
    }

    processedQuests.push({
      id: q.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      englishTitle: q.title,
      title: known.name,
      name: known.name,
      difficulty: known.difficulty,
      questType: qtype === 'primary' ? 'Principal' : 'Secundaria',
      summary: summary,
      startPoint: startPoint,
      requirements: requirements,
      itemsRequired: itemsRequired,
      itemsRecommended: itemsRecommended,
      enemies: enemies,
      rewards: rewards,
      walkthrough: walkthrough,
      wikiUrl: `https://dragonwilds.runescape.wiki/w/${encodeURIComponent(q.title.replace(/ /g, '_'))}`
    });

    if (i % 5 === 0) {
      saveCache();
    }
  }

  saveCache();
  fs.writeFileSync(QUESTS_OUTPUT, JSON.stringify(processedQuests, null, 2), 'utf8');
  console.log(`Successfully parsed, translated, and saved all ${processedQuests.length} quest guides to ${QUESTS_OUTPUT}`);
}

run();
