import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const debugDataPath = path.resolve(__dirname, '../data/debug_vault_data.json');

// All known Dragonkin Vaults
const VAULTS_CONFIG = [
  {
    id: 'crasorak-kara',
    title: 'Crasorak Kara',
    region: 'Temple Woods (Brynmoor)',
    regionKey: 'brynmoor',
    powerLevel: 2,
    coords: { x: 138, y: 755 },
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Crasorak_Kara',
    mapMarkerId: 'vault-0'
  },
  {
    id: 'thishepen-kara',
    title: 'Thishepen Kara',
    region: 'Bramblemead Valley (Brynmoor)',
    regionKey: 'brynmoor',
    powerLevel: 2,
    coords: { x: 95, y: 659 },
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Thishepen_Kara',
    mapMarkerId: 'vault-1'
  },
  {
    id: 'vertentis-kara',
    title: 'Vertentis Kara',
    region: 'Whispering Swamp (Pantano Susurrante)',
    regionKey: 'whispering-wetlands',
    powerLevel: 2,
    coords: { x: 277, y: 647 },
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Vertentis_Kara',
    mapMarkerId: 'vault-2'
  },
  {
    id: 'takla-kara',
    title: 'Takla Kara',
    region: 'Fractured Plains (Llanura Quebrada)',
    regionKey: 'ghornfell',
    powerLevel: 3,
    coords: { x: 203, y: 576 },
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Takla_Kara',
    mapMarkerId: 'vault-3'
  },
  {
    id: 'skeklac-kara',
    title: 'Skeklac Kara',
    region: "Fractured Plains (Ashien's Watch)",
    regionKey: 'ghornfell',
    powerLevel: 4,
    coords: { x: 363, y: 482 },
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Skeklac_Kara',
    mapMarkerId: 'vault-4'
  },
  {
    id: 'kletterbuja-kara',
    title: 'Kletterbuja Kara',
    region: 'Bloodblight Swamp (Pantano Malasangre)',
    regionKey: 'badblood-wetlands',
    powerLevel: 3,
    coords: { x: 314, y: 707 },
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Kletterbuja_Kara',
    mapMarkerId: 'vault-toxic-wetlands'
  },
  {
    id: 'chaktan-kara',
    title: 'Chaktan Kara',
    region: 'Stormtouched Highlands (Tierras Altas)',
    regionKey: 'stormtouched-highlands',
    powerLevel: 4,
    coords: { x: 83, y: 493 },
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Chaktan_Kara',
    mapMarkerId: 'vault-highlands'
  },
  {
    id: 'kalistrakthen-kara',
    title: 'Kalistrakthen Kara',
    region: 'Emberwood (Fellhollow)',
    regionKey: 'fellhollow-frostbound',
    powerLevel: 5,
    coords: { x: 98, y: 166 },
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Kalistrakthen_Kara',
    mapMarkerId: 'vault-fellhollow-1'
  },
  {
    id: 'skekven-kara',
    title: 'Skekven Kara',
    region: 'Lake of Lost Souls Este (Fellhollow)',
    regionKey: 'fellhollow-frostbound',
    powerLevel: 5,
    coords: { x: 512, y: 177 },
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Skekven_Kara',
    mapMarkerId: 'vault-fellhollow-3'
  },
  {
    id: 'vekchenven-kara',
    title: 'Vekchenven Kara',
    region: 'Lake of Lost Souls Oeste (Fellhollow)',
    regionKey: 'fellhollow-frostbound',
    powerLevel: 5,
    coords: { x: 377, y: 150 },
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Vekchenven_Kara',
    mapMarkerId: 'vault-fellhollow-2'
  },
  {
    id: 'uzzer-kara',
    title: 'Uzzer Kara (Bóveda de los Espejos)',
    region: 'Dunes of Uzzer (Umbral Sands)',
    regionKey: 'umbral-sands',
    powerLevel: 7,
    coords: { x: 873, y: 463 },
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Dragonkin_Vault#Vault_Locations',
    mapMarkerId: 'vault-skeklac-east'
  },
  {
    id: 'manafem-kara',
    title: 'Manafem Kara (Bóveda Kalphite)',
    region: 'Manafem Plains (Umbral Sands)',
    regionKey: 'umbral-sands',
    powerLevel: 7,
    coords: { x: 570, y: 869 },
    wikiUrl: 'https://dragonwilds.runescape.wiki/w/Dragonkin_Vault#Vault_Locations',
    mapMarkerId: 'vault-skeklac-west'
  }
];

async function getImageUrls(fileNames) {
  if (!fileNames || !fileNames.length) return {};
  const titles = fileNames.map(f => f.startsWith('File:') ? f : `File:${f}`).join('|');
  const url = `https://dragonwilds.runescape.wiki/api.php?action=query&titles=${encodeURIComponent(titles)}&prop=imageinfo&iiprop=url&format=json`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const map = {};
    if (data.query?.pages) {
      for (const p of Object.values(data.query.pages)) {
        if (p.imageinfo && p.imageinfo[0]) {
          const rawName = p.title.replace('File:', '').trim();
          map[rawName] = p.imageinfo[0].url;
          map[rawName.toLowerCase()] = p.imageinfo[0].url;
          map[rawName.replace(/ /g, '_')] = p.imageinfo[0].url;
        }
      }
    }
    return map;
  } catch (err) {
    console.error('Error fetching image info:', err.message);
    return {};
  }
}

async function fetchFullWikiText(pageTitle) {
  const url = `https://dragonwilds.runescape.wiki/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&format=json&prop=wikitext|text|images`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.error) return null;
    return data.parse;
  } catch {
    return null;
  }
}

async function build() {
  console.log('Building vaults database...');
  const allImagesToQuery = new Set();

  const parsedVaults = [];

  for (const cfg of VAULTS_CONFIG) {
    console.log(`Processing ${cfg.title}...`);
    const wikiData = await fetchFullWikiText(cfg.title.split(' (')[0]);
    parsedVaults.push({
      cfg,
      wikiData
    });
    if (wikiData?.images) {
      wikiData.images.forEach(img => allImagesToQuery.add(img));
    }
    // Also add standard vault images
    allImagesToQuery.add(`${cfg.title.split(' (')[0]}.png`);
  }

  // Get image URLs in batches
  const imageArray = Array.from(allImagesToQuery);
  const imageMap = {};
  for (let i = 0; i < imageArray.length; i += 30) {
    const batch = imageArray.slice(i, i + 30);
    const batchUrls = await getImageUrls(batch);
    Object.assign(imageMap, batchUrls);
  }

  fs.writeFileSync(debugDataPath, JSON.stringify({ parsedVaults, imageMap }, null, 2));
  console.log('Debug data saved to scripts/data/debug_vault_data.json.');
}

build();
