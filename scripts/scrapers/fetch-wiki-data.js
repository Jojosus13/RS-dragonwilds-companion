import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://dragonwilds.runescape.wiki/api.php';

async function fetchJSON(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'RSDragonwildsPWA/1.0 (Personal wiki helper app)'
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  }
  return res.json();
}

// 1. Get all page titles from Category:Items and subcategories
async function getAllItemTitles() {
  const titles = new Set();
  const categories = [
    'Category:Items',
    'Category:Equipment',
    'Category:Weapons',
    'Category:Armour',
    'Category:Tools',
    'Category:Potions',
    'Category:Basic_Materials',
    'Category:Vestiges',
    'Category:Consumable',
    'Category:Patterns'
  ];

  for (const cat of categories) {
    let cmcontinue = '';
    do {
      const url = `${BASE_URL}?action=query&list=categorymembers&cmtitle=${encodeURIComponent(
        cat
      )}&cmlimit=500&format=json${cmcontinue ? `&cmcontinue=${encodeURIComponent(cmcontinue)}` : ''}`;
      try {
        const data = await fetchJSON(url);
        if (data.query?.categorymembers) {
          for (const member of data.query.categorymembers) {
            // Only normal pages (ns === 0)
            if (member.ns === 0) {
              titles.add(member.title);
            }
          }
        }
        cmcontinue = data.continue?.cmcontinue || '';
      } catch (err) {
        console.error(`Error fetching category ${cat}:`, err.message);
        break;
      }
    } while (cmcontinue);
  }

  console.log(`Found ${titles.size} unique item pages.`);
  return Array.from(titles);
}

// Helper to clean wikitext formatting
function cleanWikitext(text) {
  if (!text) return '';
  return text
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1') // [[Target|Label]] -> Label or [[Target]] -> Target
    .replace(/\{\{plink\|([^}]+)\}\}/gi, '$1')
    .replace(/\{\{[^}]+\}\}/g, '') // remove remaining templates
    .replace(/'''?/g, '') // bold/italic
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTemplateContent(wikitext, templateName) {
  const regex = new RegExp(`\\{\\{${templateName}([\\s\\S]*?)\\}\\}`, 'i');
  const match = wikitext.match(regex);
  return match ? match[1] : null;
}

function parseTemplateParams(templateStr) {
  const params = {};
  if (!templateStr) return params;

  // Split tokens by pipe `|` while being mindful of nested `[[...]]` or `{{...}}`
  let currentToken = '';
  let bracketDepth = 0;
  let braceDepth = 0;
  const tokens = [];

  for (let i = 0; i < templateStr.length; i++) {
    const ch = templateStr[i];
    const nextCh = templateStr[i + 1] || '';

    if (ch === '[' && nextCh === '[') {
      bracketDepth += 2;
      currentToken += '[[';
      i++;
    } else if (ch === ']' && nextCh === ']') {
      bracketDepth = Math.max(0, bracketDepth - 2);
      currentToken += ']]';
      i++;
    } else if (ch === '{' && nextCh === '{') {
      braceDepth += 2;
      currentToken += '{{';
      i++;
    } else if (ch === '}' && nextCh === '}') {
      braceDepth = Math.max(0, braceDepth - 2);
      currentToken += '}}';
      i++;
    } else if (ch === '|' && bracketDepth === 0 && braceDepth === 0) {
      if (currentToken.trim()) tokens.push(currentToken.trim());
      currentToken = '';
    } else {
      currentToken += ch;
    }
  }
  if (currentToken.trim()) {
    tokens.push(currentToken.trim());
  }

  for (const token of tokens) {
    const eqIdx = token.indexOf('=');
    if (eqIdx !== -1) {
      const key = token.substring(0, eqIdx).trim().toLowerCase();
      let val = token.substring(eqIdx + 1).trim();
      params[key] = val;
    }
  }
  return params;
}

function parsePageContent(title, wikitext) {
  if (!wikitext) return null;

  // Extract Infobox Item
  const infoboxItemContent = extractTemplateContent(wikitext, 'Infobox Item');
  const itemParams = infoboxItemContent ? parseTemplateParams(infoboxItemContent) : {};

  // Extract Infobox Weapon
  const infoboxWeaponContent = extractTemplateContent(wikitext, 'Infobox Weapon');
  const weaponParams = infoboxWeaponContent ? parseTemplateParams(infoboxWeaponContent) : {};

  // Extract Infobox Armour
  const infoboxArmourContent = extractTemplateContent(wikitext, 'Infobox Armour');
  const armourParams = infoboxArmourContent ? parseTemplateParams(infoboxArmourContent) : {};

  // Extract Recipe
  const recipeContent = extractTemplateContent(wikitext, 'Recipe');
  let recipe = null;
  if (recipeContent) {
    const rParams = parseTemplateParams(recipeContent);
    const ingredients = [];
    for (let i = 1; i <= 10; i++) {
      if (rParams[`mat${i}`]) {
        ingredients.push({
          item: cleanWikitext(rParams[`mat${i}`]),
          quantity: parseInt(rParams[`mat${i}qty`]) || 1
        });
      }
    }
    recipe = {
      facility: cleanWikitext(rParams.facility || ''),
      skill: cleanWikitext(rParams.skill || ''),
      skillxp: parseInt(rParams.skillxp) || 0,
      materials: ingredients,
      outputQty: parseInt(rParams.output1qty) || 1
    };
  }

  // Extract Journal lore
  const journalContent = extractTemplateContent(wikitext, 'Journal entry');
  let journal = '';
  if (journalContent) {
    // Remove leading pipe if any
    journal = cleanWikitext(journalContent.replace(/^\s*\|\s*/, ''));
  }

  // Extract Upgrades table if any
  const upgrades = [];
  const upgradeTableMatch = wikitext.match(/=== Upgrades ===[\s\S]*?\{\|([\s\S]*?)\|\}/i);
  if (upgradeTableMatch) {
    const rows = upgradeTableMatch[1].split('|-');
    for (const row of rows) {
      const cells = row
        .split('\n')
        .filter((l) => l.startsWith('|') && !l.startsWith('|}'))
        .map((l) => cleanWikitext(l.replace(/^\|\s*/, '')));
      if (cells.length >= 2 && !isNaN(parseInt(cells[0]))) {
        upgrades.push({
          powerLevel: parseInt(cells[0]),
          baseDamage: cells[1] || '',
          coresRequired: cells[2] || ''
        });
      }
    }
  }

  // Determine Category / Item Type
  let itemType = cleanWikitext(itemParams.item_type || '');
  let category = 'Other';

  const lowerType = itemType.toLowerCase();
  const lowerTitle = title.toLowerCase();

  // 1. Vestiges & Patterns
  if (
    lowerType.includes('vestige') ||
    lowerType.includes('pattern') ||
    (title.startsWith('A ') && !title.includes('Cape') && !title.includes('Potion') && !title.includes('Rune') && !title.includes('Bar')) ||
    lowerTitle.includes('vestige') ||
    lowerTitle.includes('pattern') ||
    lowerTitle.includes('bladehead') ||
    lowerTitle.includes('crescent carving') ||
    lowerTitle.includes('broken bow') ||
    lowerTitle.includes('vanity mirror')
  ) {
    category = 'Vestiges & Patterns';
  }
  // 2. Tools
  else if (
    lowerType.includes('tool') ||
    lowerTitle.includes('pickaxe') ||
    lowerTitle.includes('logging axe') ||
    lowerTitle.includes('spade') ||
    lowerTitle.includes('watering can') ||
    lowerTitle.includes('fishing rod') ||
    lowerTitle.includes('tinderbox')
  ) {
    category = 'Tools';
  }
  // 3. Armour & Shields & Jewelry / Equipment (Even if named Rune Platebody or Ring of Runecrafting)
  else if (
    lowerTitle.includes('shield') ||
    lowerType.includes('shield') ||
    infoboxArmourContent ||
    lowerType.includes('armour') ||
    lowerType.includes('armor') ||
    lowerType.includes('trinket') ||
    lowerTitle.includes('helmet') ||
    lowerTitle.includes('med helm') ||
    lowerTitle.includes('coif') ||
    lowerTitle.includes('hat') ||
    lowerTitle.includes('hood') ||
    lowerTitle.includes('platebody') ||
    lowerTitle.includes('robe') ||
    lowerTitle.includes('tunic') ||
    lowerTitle.includes('platelegs') ||
    lowerTitle.includes('chaps') ||
    lowerTitle.includes('leggings') ||
    lowerTitle.includes('cape') ||
    lowerTitle.includes('accumulator') ||
    lowerTitle.includes('ring') ||
    lowerTitle.includes('amulet') ||
    lowerTitle.includes('necklace') ||
    lowerTitle.includes('pendant')
  ) {
    category = 'Armour';
  }
  // 4. Weapons & Ammunition (Swords, Bows, Wands, Staves, Arrows, Bolts)
  else if (
    (infoboxWeaponContent && !lowerTitle.includes('shield') && !lowerTitle.includes('limbs') && !lowerTitle.includes('stock')) ||
    lowerType.includes('weapon') ||
    lowerType.includes('ammunition') ||
    lowerTitle.includes('sword') ||
    lowerTitle.includes('scimitar') ||
    lowerTitle.includes('greatsword') ||
    lowerTitle.includes('greataxe') ||
    lowerTitle.includes('whip') ||
    lowerTitle.includes('dagger') ||
    lowerTitle.includes('mace') ||
    lowerTitle.includes('warhammer') ||
    lowerTitle.includes('wand') ||
    lowerTitle.includes('staff') ||
    lowerTitle.includes('battlestaff') ||
    lowerTitle.includes('arrow') ||
    lowerTitle.includes('bolt') ||
    (lowerTitle.includes('bow') && !lowerTitle.includes('broken') && !lowerTitle.includes('string') && !lowerTitle.includes('limbs')) ||
    (lowerTitle.includes('crossbow') && !lowerTitle.includes('limbs') && !lowerTitle.includes('stock'))
  ) {
    category = 'Weapons';
    if (lowerTitle.includes('arrow') || lowerTitle.includes('bolt')) {
      if (!itemType || itemType === 'Basic Item') itemType = 'Ammunition';
    }
  }
  // 5. Consumables & Potions (Food, Drinks, Potions, Infusions, Stews, Broths)
  else if (
    lowerType.includes('potion') ||
    lowerType.includes('food') ||
    lowerType.includes('consumable') ||
    lowerType.includes('drink') ||
    lowerType.includes('infusion') ||
    lowerTitle.includes('potion') ||
    lowerTitle.includes('infusion') ||
    lowerTitle.includes('stew') ||
    lowerTitle.includes('pie') ||
    lowerTitle.includes('broth') ||
    lowerTitle.includes('bread') ||
    lowerTitle.includes('potato') ||
    lowerTitle.includes('fish') ||
    lowerTitle.includes('catfish') ||
    lowerTitle.includes('compote') ||
    lowerTitle.includes('seared') ||
    lowerTitle.includes('water') ||
    lowerTitle.includes('tea')
  ) {
    category = 'Consumables & Potions';
  }
  // 6. Runecrafting & Magic (ONLY true Runes & Runecrafting tomes/talismans)
  else if (
    lowerTitle.endsWith(' rune') ||
    lowerTitle.endsWith(' runes') ||
    lowerTitle.includes('tome of runecrafting') ||
    lowerTitle.includes('spellbook') ||
    lowerTitle.includes('rune essence') ||
    lowerTitle.includes('pure essence') ||
    lowerTitle.includes('talisman') ||
    lowerTitle.includes('tiara') ||
    lowerTitle.includes('primer') ||
    lowerTitle.includes('aetheric')
  ) {
    category = 'Runecrafting & Magic';
  }
  // 7. Materials & Components (limbs, bars, ores, logs, leathers, resources, seeds, bones)
  else if (
    lowerType.includes('bar') ||
    lowerType.includes('ore') ||
    lowerType.includes('log') ||
    lowerType.includes('leather') ||
    lowerType.includes('material') ||
    lowerType.includes('hide') ||
    lowerType.includes('seed') ||
    lowerType.includes('bone') ||
    lowerType.includes('plank') ||
    lowerType.includes('resource') ||
    lowerType.includes('component') ||
    lowerType.includes('raw ingredient') ||
    lowerTitle.includes('bar') ||
    lowerTitle.includes('ore') ||
    lowerTitle.includes('log') ||
    lowerTitle.includes('leather') ||
    lowerTitle.includes('hide') ||
    lowerTitle.includes('limbs') ||
    lowerTitle.includes('scale') ||
    lowerTitle.includes('ashes') ||
    lowerTitle.includes('sap') ||
    lowerTitle.includes('wax') ||
    lowerTitle.includes('ichor') ||
    lowerTitle.includes('oil') ||
    lowerTitle.includes('seed') ||
    lowerTitle.includes('plank') ||
    lowerTitle.includes('clay') ||
    lowerTitle.includes('stone') ||
    lowerTitle.includes('granite') ||
    lowerTitle.includes('limestone') ||
    lowerTitle.includes('sandstone') ||
    lowerTitle.includes('flax') ||
    lowerTitle.includes('glass')
  ) {
    category = 'Materials';
  }

  // Power Level
  let powerLevel = null;
  if (weaponParams.power) {
    powerLevel = parseInt(weaponParams.power) || null;
  } else if (armourParams.power) {
    powerLevel = parseInt(armourParams.power) || null;
  }
  if (!powerLevel) {
    const pwMatch = wikitext.match(/\[\[power level\]\]\s*(\d+)/i) || wikitext.match(/power level (\d+)/i);
    if (pwMatch) {
      powerLevel = parseInt(pwMatch[1]);
    }
  }

  // Image URL
  const imageName = itemParams.image || `${title}.png`;
  const cleanImageName = imageName.replace(/\[\[File:|\]\]/gi, '').trim();
  const imageUrl = `https://dragonwilds.runescape.wiki/w/Special:Redirect/file/${encodeURIComponent(cleanImageName)}`;

  // Special effects
  const specialEffect = weaponParams.specialeffect || armourParams.specialeffect || '';
  const specialAction = weaponParams.specialaction || '';

  return {
    id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: title,
    name: itemParams.name || title,
    itemType: itemType || (category !== 'Other' ? category : 'General Item'),
    category,
    description: cleanWikitext(itemParams.description || ''),
    weight: parseFloat(itemParams.weight) || null,
    repairCost: cleanWikitext(itemParams.repaircost || ''),
    release: cleanWikitext(itemParams.release || ''),
    powerLevel,
    stats: {
      damageType: weaponParams.damagetype || '',
      attackStyle: weaponParams.attackstyle || '',
      baseDamage: weaponParams.basedmg || '',
      block: weaponParams.block ? parseInt(weaponParams.block) : null,
      combo: weaponParams.combo ? parseInt(weaponParams.combo) : null,
      durability: weaponParams.durability ? parseInt(weaponParams.durability) : (armourParams.durability ? parseInt(armourParams.durability) : null),
      armourRating: armourParams.armour ? parseInt(armourParams.armour) : (armourParams.armor ? parseInt(armourParams.armor) : null),
      specialAction: cleanWikitext(specialAction),
      specialEffect: cleanWikitext(specialEffect)
    },
    recipe,
    upgrades,
    journal: journal || null,
    image: imageUrl,
    imageName: cleanImageName,
    wikiUrl: `https://dragonwilds.runescape.wiki/w/${encodeURIComponent(title.replace(/\s+/g, '_'))}`
  };
}

// 2. Fetch pages in chunks of 50
async function fetchAllItemDetails(titles) {
  const items = [];
  const chunkSize = 50;

  for (let i = 0; i < titles.length; i += chunkSize) {
    const chunk = titles.slice(i, i + chunkSize);
    const url = `${BASE_URL}?action=query&prop=revisions&titles=${encodeURIComponent(
      chunk.join('|')
    )}&rvprop=content&rvslots=main&format=json`;

    console.log(`Fetching items ${i + 1} to ${Math.min(i + chunkSize, titles.length)} / ${titles.length}...`);
    try {
      const data = await fetchJSON(url);
      if (data.query?.pages) {
        for (const [pageId, page] of Object.entries(data.query.pages)) {
          if (page.missing) continue;
          const wikitext = page.revisions?.[0]?.slots?.main?.['*'] || '';
          const parsed = parsePageContent(page.title, wikitext);
          
          const isHubOrSetPage = 
            page.title.endsWith(' Equipment') ||
            (page.title.endsWith(' Armour') && !page.title.includes('Body') && !page.title.includes('Legs') && !page.title.includes('Coif') && !page.title.includes('Helmet')) ||
            page.title.endsWith(' Weapons') ||
            page.title.endsWith(' Tools') ||
            page.title === 'Weapons' ||
            page.title === 'Armour' ||
            page.title === 'Shields' ||
            page.title === 'Tools' ||
            page.title === 'Items' ||
            page.title === 'Potions' ||
            page.title === 'Consumable' ||
            page.title === 'Vestiges';

          const hasActualItemData = 
            parsed && (
              parsed.description || 
              parsed.recipe || 
              parsed.stats.baseDamage || 
              parsed.stats.armourRating || 
              parsed.stats.durability || 
              parsed.stats.block ||
              parsed.journal ||
              parsed.stats.specialEffect ||
              parsed.stats.specialAction
            );

          if (parsed && !isHubOrSetPage && hasActualItemData && parsed.category !== 'Other') {
            items.push(parsed);
          }
        }
      }
    } catch (err) {
      console.error(`Error fetching chunk at ${i}:`, err.message);
    }
  }

  // 3. Compute reverse-recipe links ("usedIn")
  console.log('Calculating reverse recipe dependencies...');
  const itemMap = new Map();
  items.forEach((it) => itemMap.set(it.title.toLowerCase(), it));

  // Build usedIn lists
  const usedInMap = new Map();
  for (const item of items) {
    if (item.recipe?.materials) {
      for (const mat of item.recipe.materials) {
        const matKey = mat.item.toLowerCase();
        if (!usedInMap.has(matKey)) {
          usedInMap.set(matKey, []);
        }
        usedInMap.get(matKey).push({
          id: item.id,
          title: item.title,
          category: item.category,
          quantityNeeded: mat.quantity,
          facility: item.recipe.facility
        });
      }
    }
  }

  for (const item of items) {
    const uses = usedInMap.get(item.title.toLowerCase()) || [];
    item.usedIn = uses;
  }

  // Sort items alphabetically
  items.sort((a, b) => a.title.localeCompare(b.title));

  console.log(`Processed ${items.length} valid game items with rich data!`);
  return items;
}

async function main() {
  console.log('=== RuneScape: Dragonwilds Wiki Data Extractor ===');
  const titles = await getAllItemTitles();
  const items = await fetchAllItemDetails(titles);

  const outputDir = path.resolve(__dirname, '../../src/data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'items.json');
  fs.writeFileSync(outputPath, JSON.stringify(items, null, 2), 'utf-8');
  console.log(`Successfully saved ${items.length} items to ${outputPath}`);
}

main().catch(console.error);
