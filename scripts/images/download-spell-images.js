import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPELLS_FILE = path.resolve(__dirname, '../../src/data/spells.json');
const SPELLS_DIR = path.resolve(__dirname, '../../public/spells');

if (!fs.existsSync(SPELLS_DIR)) {
  fs.mkdirSync(SPELLS_DIR, { recursive: true });
}

const spells = JSON.parse(fs.readFileSync(SPELLS_FILE, 'utf-8'));
const WIKI_API = 'https://dragonwilds.runescape.wiki/api.php';

async function fetchWikiJson(url) {
  const res = await fetch(url);
  return await res.json();
}

async function downloadImage(url, destPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (err) {
    console.error(`Error downloading image from ${url}:`, err.message);
    return false;
  }
}

async function main() {
  console.log(`Fetching spell image metadata and downloading icons for ${spells.length} spells...`);

  // Batch query titles
  const titles = spells.map(s => s.englishTitle);
  const chunks = [];
  for (let i = 0; i < titles.length; i += 20) {
    chunks.push(titles.slice(i, i + 20));
  }

  const imageMap = {};

  for (const chunk of chunks) {
    const titlesParam = chunk.map(t => encodeURIComponent(t)).join('|');
    const url = `${WIKI_API}?action=query&prop=pageprops|pageimages&titles=${titlesParam}&format=json`;
    const data = await fetchWikiJson(url);
    const pages = data.query?.pages || {};

    for (const pageId of Object.keys(pages)) {
      const page = pages[pageId];
      const title = page.title;
      const imgName = page.pageprops?.page_image_free || page.pageimage || `${title.replace(/\s+/g, '_')}.png`;
      if (imgName) {
        imageMap[title] = imgName;
      }
    }
  }

  let downloaded = 0;

  for (const spell of spells) {
    const imgName = imageMap[spell.englishTitle] || `${spell.englishTitle.replace(/\s+/g, '_')}.png`;
    const cleanFileName = `${spell.id}.png`;
    const localFilePath = path.join(SPELLS_DIR, cleanFileName);
    const localUrl = `/spells/${cleanFileName}`;
    const remoteRedirectUrl = `https://dragonwilds.runescape.wiki/w/Special:Redirect/file/${encodeURIComponent(imgName)}`;

    // Download image locally to public/spells/
    if (!fs.existsSync(localFilePath) || fs.statSync(localFilePath).size === 0) {
      console.log(`Downloading icon for: ${spell.name} (${imgName})...`);
      const ok = await downloadImage(remoteRedirectUrl, localFilePath);
      if (ok) downloaded++;
    } else {
      downloaded++;
    }

    spell.image = localUrl;
    spell.remoteImage = remoteRedirectUrl;
    spell.imageName = imgName;
  }

  fs.writeFileSync(SPELLS_FILE, JSON.stringify(spells, null, 2), 'utf-8');
  console.log(`\n🎉 Successfully downloaded and saved ${downloaded} spell icons to public/spells/ and updated spells.json!`);
}

main().catch(console.error);
