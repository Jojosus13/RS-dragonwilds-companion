import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const itemsPath = path.resolve(__dirname, '../../src/data/items.json');
const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

const outDir = path.resolve(__dirname, '../../public/items');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const USER_AGENT = 'DragonwildsWikiPWA/1.0 (https://github.com/Antigravity; offline-app-archiver)';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 100) {
      return resolve(false); // already downloaded
    }

    const file = fs.createWriteStream(destPath);
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting image downloader for ${items.length} items...`);

  // Map of imageName -> list of items using it
  const imageNameToItems = new Map();
  for (const item of items) {
    if (item.imageName) {
      const list = imageNameToItems.get(item.imageName) || [];
      list.push(item);
      imageNameToItems.set(item.imageName, list);
    }
  }

  const allImageNames = Array.from(imageNameToItems.keys());
  console.log(`Found ${allImageNames.length} unique image files to query.`);

  // Query MediaWiki in batches of 50 to get direct image URLs
  const directUrls = new Map(); // imageName -> direct url

  const batchSize = 50;
  for (let i = 0; i < allImageNames.length; i += batchSize) {
    const batch = allImageNames.slice(i, i + batchSize);
    const titlesParam = batch.map(name => `File:${encodeURIComponent(name)}`).join('|');
    const apiUrl = `https://dragonwilds.runescape.wiki/api.php?action=query&titles=${titlesParam}&prop=imageinfo&iiprop=url&format=json`;

    try {
      const data = await fetchJson(apiUrl);
      if (data?.query?.pages) {
        for (const pageId of Object.keys(data.query.pages)) {
          const page = data.query.pages[pageId];
          if (page.imageinfo && page.imageinfo[0]?.url) {
            // Strip "File:" from title
            const rawTitle = page.title.replace(/^File:/, '');
            directUrls.set(rawTitle, page.imageinfo[0].url);
          }
        }
      }
      console.log(`Resolved direct URLs: ${directUrls.size} / ${allImageNames.length}`);
    } catch (e) {
      console.error(`Error querying batch starting at ${i}:`, e.message);
    }
  }

  // Download all images with concurrency
  console.log('Downloading item icons to public/items/...');
  const CONCURRENCY = 12;
  let activeDownloads = 0;
  let completed = 0;
  let failed = 0;

  async function processItem(item) {
    const fileName = `${item.id}.png`;
    const destPath = path.join(outDir, fileName);

    let directUrl = directUrls.get(item.imageName);
    if (!directUrl && item.imageName) {
      // Fallback direct guess URL
      const cleanName = encodeURIComponent(item.imageName.replace(/ /g, '_'));
      directUrl = `https://dragonwilds.runescape.wiki/images/${cleanName}`;
    }

    if (directUrl) {
      try {
        await downloadFile(directUrl, destPath);
        item.image = `/items/${fileName}`;
      } catch (e) {
        // Fallback to direct static wiki image URL
        item.image = directUrl;
        failed++;
      }
    }
    completed++;
    if (completed % 100 === 0 || completed === items.length) {
      console.log(`Progress: ${completed} / ${items.length} (Failed: ${failed})`);
    }
  }

  // Process in parallel chunks
  const queue = [...items];
  const workers = Array(CONCURRENCY).fill(null).map(async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      if (item) {
        await processItem(item);
      }
    }
  });

  await Promise.all(workers);

  // Save updated items.json
  fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), 'utf8');
  console.log(`Finished! Updated ${items.length} items in src/data/items.json.`);
}

run().catch(console.error);
