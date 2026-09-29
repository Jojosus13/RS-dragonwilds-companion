import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicItemsDir = path.resolve(__dirname, '../../public/items');
const itemsPath = path.resolve(__dirname, '../../src/data/items.json');
const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

// Map of missing items and their best wiki image URLs
const downloads = [
  {
    itemId: "item-carbon",
    fileName: "coal.png",
    urls: [
      "https://dragonwilds.runescape.wiki/images/Coal.png",
      "https://oldschool.runescape.wiki/images/Coal.png"
    ]
  },
  {
    itemId: "item-carbon-vegetal",
    fileName: "charcoal.png",
    urls: [
      "https://dragonwilds.runescape.wiki/images/Charcoal.png",
      "https://oldschool.runescape.wiki/images/Charcoal.png"
    ]
  },
  {
    itemId: "item-hilo-de-lana",
    fileName: "wool-string.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Ball_of_wool.png",
      "https://oldschool.runescape.wiki/images/Bow_string.png"
    ]
  },
  {
    itemId: "item-hilo-mistico",
    fileName: "mystic-thread.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Mystic_cloth.png",
      "https://dragonwilds.runescape.wiki/images/Fine_Thread.png",
      "https://oldschool.runescape.wiki/images/Spool_of_silk.png"
    ]
  },
  {
    itemId: "item-fragmento-de-la-camara",
    fileName: "chamber-shard.png",
    urls: [
      "https://dragonwilds.runescape.wiki/images/Ascension_Shard.png",
      "https://oldschool.runescape.wiki/images/Crystal_shard.png"
    ]
  },
  {
    itemId: "item-opalo",
    fileName: "uncut-opal.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Uncut_opal.png",
      "https://oldschool.runescape.wiki/images/Opal.png"
    ]
  },
  {
    itemId: "item-jade",
    fileName: "uncut-jade.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Uncut_jade.png",
      "https://oldschool.runescape.wiki/images/Jade.png"
    ]
  },
  {
    itemId: "item-topacio-rojo",
    fileName: "uncut-red-topaz.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Uncut_red_topaz.png",
      "https://oldschool.runescape.wiki/images/Red_topaz.png"
    ]
  },
  {
    itemId: "item-anima-salvaje",
    fileName: "wild-anima.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Anima_crystal.png",
      "https://oldschool.runescape.wiki/images/Wrath_rune.png",
      "https://dragonwilds.runescape.wiki/images/Soul_Rune.png"
    ]
  },
  {
    itemId: "item-adhesivo",
    fileName: "adhesive.png",
    urls: [
      "https://dragonwilds.runescape.wiki/images/Swamp_Tar.png",
      "https://oldschool.runescape.wiki/images/Swamp_tar.png",
      "https://oldschool.runescape.wiki/images/Supercompost.png"
    ]
  },
  {
    itemId: "item-adhesivo-acre",
    fileName: "acrid-adhesive.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Poison_ivy_berries.png",
      "https://dragonwilds.runescape.wiki/images/Poison_Ichor.png",
      "https://oldschool.runescape.wiki/images/Vial_of_poison.png"
    ]
  },
  {
    itemId: "item-caparazon-de-kalphite",
    fileName: "kalphite-shell.png",
    urls: [
      "https://dragonwilds.runescape.wiki/images/Kalphite_Wing.png",
      "https://oldschool.runescape.wiki/images/Kalphite_carapace.png",
      "https://oldschool.runescape.wiki/images/Chitin.png"
    ]
  },
  {
    itemId: "item-hierba-de-pantano",
    fileName: "swamp-weed.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Swamp_weed.png",
      "https://oldschool.runescape.wiki/images/Seaweed.png",
      "https://oldschool.runescape.wiki/images/Clean_tarromin.png"
    ]
  },
  {
    itemId: "item-bulbo-electrico",
    fileName: "shocking-plant-bulb.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Potato_cactus.png",
      "https://oldschool.runescape.wiki/images/Volcanic_ash.png",
      "https://oldschool.runescape.wiki/images/Torstol.png"
    ]
  },
  {
    itemId: "item-cristal-de-salve",
    fileName: "salve-crystal.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Salve_shard.png",
      "https://oldschool.runescape.wiki/images/Elysian_sigil.png",
      "https://oldschool.runescape.wiki/images/Diamond.png"
    ]
  },
  {
    itemId: "item-piel-suave-de-animal",
    fileName: "soft-animal-hide.png",
    urls: [
      "https://dragonwilds.runescape.wiki/images/Animal_Hide.png",
      "https://oldschool.runescape.wiki/images/Cowhide.png"
    ]
  },
  {
    itemId: "item-obsidiana-molida",
    fileName: "ground-obsidian.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Volcanic_ash.png",
      "https://oldschool.runescape.wiki/images/Ground_charcoal.png"
    ]
  },
  {
    itemId: "item-nafta",
    fileName: "naptha.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Naphtha.png",
      "https://oldschool.runescape.wiki/images/Oil_can.png"
    ]
  },
  {
    itemId: "item-mochila-trasgo",
    fileName: "goblin-pack.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Looting_bag.png",
      "https://oldschool.runescape.wiki/images/Small_pouch.png"
    ]
  },
  {
    itemId: "item-mochila-zombi",
    fileName: "zombie-pack.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Medium_pouch.png",
      "https://oldschool.runescape.wiki/images/Large_pouch.png"
    ]
  },
  {
    itemId: "item-prayer-cape",
    name: "Capa de Plegaria",
    fileName: "prayer-cape.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Prayer_cape.png",
      "https://oldschool.runescape.wiki/images/Prayer_cape(t).png",
      "https://dragonwilds.runescape.wiki/images/Attack_Cape.png"
    ]
  },
  {
    itemId: "item-saradomin-cape",
    name: "Capa de Saradomin",
    fileName: "saradomin-cape.png",
    urls: [
      "https://oldschool.runescape.wiki/images/Saradomin_cape.png",
      "https://oldschool.runescape.wiki/images/Saradomin_cloak.png",
      "https://dragonwilds.runescape.wiki/images/Saradominist_Cloak.png"
    ]
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) WikiRunescapeDW/1.0' } }, (res) => {
      if (res.statusCode === 200 && res.headers['content-type']?.includes('image')) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        file.close();
        try { fs.unlinkSync(dest); } catch {}
        resolve(false);
      }
    }).on('error', () => {
      file.close();
      try { fs.unlinkSync(dest); } catch {}
      resolve(false);
    });
  });
}

(async () => {
  for (const dl of downloads) {
    const targetPath = path.join(publicItemsDir, dl.fileName);
    let downloaded = false;
    for (const url of dl.urls) {
      downloaded = await downloadFile(url, targetPath);
      if (downloaded) {
        console.log(`✓ Downloaded ${dl.fileName} from ${url}`);
        break;
      }
    }

    if (!downloaded) {
      console.warn(`✗ Failed downloading ${dl.fileName}, using fallback duplicate`);
      const fallbackSrc = path.join(publicItemsDir, 'ascension-shard.png');
      if (fs.existsSync(fallbackSrc)) {
        fs.copyFileSync(fallbackSrc, targetPath);
      }
    }

    // Assign image in items.json
    const matchingItem = items.find(i => 
      (dl.itemId && i.id === dl.itemId) || 
      (dl.name && i.name === dl.name) ||
      (dl.name && i.title === dl.name)
    );

    if (matchingItem) {
      matchingItem.image = `/items/${dl.fileName}`;
      console.log(`Updated item ${matchingItem.name} -> ${matchingItem.image}`);
    }
  }

  // Also check if any item has a remote wiki URL and switch it to local
  items.forEach(i => {
    if (i.image && i.image.startsWith('http')) {
      if (i.name.includes('Plegaria') || i.name.includes('Prayer')) {
        i.image = '/items/prayer-cape.png';
      } else if (i.name.includes('Saradomin')) {
        i.image = '/items/saradomin-cape.png';
      }
    }
  });

  fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), 'utf8');
  console.log('Finished updating all item image paths!');
})();
