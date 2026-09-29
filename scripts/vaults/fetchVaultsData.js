import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rawVaultsPath = path.resolve(__dirname, '../data/raw_vaults.json');

const VAULT_TITLES = [
  'Crasorak Kara',
  'Thishepen Kara',
  'Vertentis Kara',
  'Takla Kara',
  'Skeklac Kara',
  'Kletterbuja Kara',
  'Chaktan Kara',
  'Kalistrakthen Kara',
  'Skekven Kara',
  'Vekchenven Kara',
  'Uzzer Kara',
  'Manafem Kara'
];

async function fetchVault(title) {
  const url = `https://dragonwilds.runescape.wiki/api.php?action=parse&page=${encodeURIComponent(title)}&format=json&prop=wikitext|text|images`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.error) {
      console.log(`Error fetching ${title}:`, data.error.info);
      return { title, error: data.error.info };
    }
    return {
      title: data.parse.title,
      wikitext: data.parse.wikitext?.['*'] || '',
      html: data.parse.text?.['*'] || '',
      images: data.parse.images || []
    };
  } catch (err) {
    console.error(`Fetch failed for ${title}:`, err.message);
    return { title, error: err.message };
  }
}

async function run() {
  const results = [];
  for (const title of VAULT_TITLES) {
    console.log(`Fetching ${title}...`);
    const vaultData = await fetchVault(title);
    results.push(vaultData);
    await new Promise(r => setTimeout(r, 400));
  }
  fs.writeFileSync(rawVaultsPath, JSON.stringify(results, null, 2));
  console.log('Saved raw_vaults.json to scripts/data/raw_vaults.json');
}

run();
