import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.join(__dirname, '../src/data/items.json');
const items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf8'));

// 1. REGLAS SISTEMÁTICAS DE TRADUCCIÓN DE NOMBRES EN INGLÉS
function translateAnyName(name) {
  if (!name) return name;
  let n = name.trim();

  // Diccionario exhaustivo de palabras y frases para nombres
  const replacements = [
    // Vestigios & Reliquias
    [/Crucible Engram of the ([A-Za-z]+)/gi, 'Engrama del Crisol de $1 (Vestigio)'],
    [/Crushed ([A-Za-z\s]+) Construct/gi, 'Constructo de $1 Aplastado (Vestigio)'],
    [/Elongated Obsidian Construct/gi, 'Constructo de Obsidiana Alargado (Vestigio)'],
    [/Elder Curiosities/gi, 'Curiosidades Antiguas (Vestigio)'],
    [/Extinguished ([A-Za-z]+) Remnants/gi, 'Restos Apagados $1 (Vestigio)'],
    [/Fabric That Hums With You/gi, 'Tela que Resuena Contigo (Vestigio)'],
    [/Fallen Hoplite's Aspis/gi, 'Áspis de Hoplita Caído (Vestigio)'],
    [/Fallen Hoplite's Chest/gi, 'Peto de Hoplita Caído (Vestigio)'],
    [/Fallen Hoplite's Helm/gi, 'Casco de Hoplita Caído (Vestigio)'],
    [/Fallen Hoplite's Tassets/gi, 'Faldón de Hoplita Caído (Vestigio)'],
    [/Gilded Dragonkin Fragment/gi, 'Fragmento Dragonkin Dorado (Vestigio)'],
    [/Grooved Stone Shard/gi, 'Fragmento de Piedra Ranurada (Vestigio)'],
    [/Hardened Vis Slag/gi, 'Escoria de Vis Endurecida (Vestigio)'],
    [/Heavy Sledge Remnant/gi, 'Resto de Maza Pesada (Vestigio)'],
    [/Humble Tallow Candle/gi, 'Vela de Sebo Humilde (Vestigio)'],
    [/Intricately Carved Rib/gi, 'Costilla Intrincadamente Tallada (Vestigio)'],
    [/Jagged Obsidian Shard/gi, 'Fragmento de Obsidiana Dentado (Vestigio)'],
    [/Knight's Dignity/gi, 'Dignidad del Caballero (Vestigio)'],
    [/Mangled White Platelegs/gi, 'Perneras Blancas Destrozadas (Vestigio)'],
    [/Memory of a Lost Age/gi, 'Memoria de una Era Perdida (Vestigio)'],
    [/Mended Dragonhide Scrap/gi, 'Retal de Piel de Dragón Remendado (Vestigio)'],
    [/Mysterious Bone Fragment/gi, 'Fragmento de Hueso Misterioso (Vestigio)'],
    [/Noble's Broken Signet/gi, 'Sello Roto del Noble (Vestigio)'],
    [/Notched Wooden Shaft/gi, 'Astil de Madera Entallado (Vestigio)'],
    [/Old Guard's Crest/gi, 'Blasón de la Vieja Guardia (Vestigio)'],
    [/Polished Bone Needle/gi, 'Aguja de Hueso Pulida (Vestigio)'],
    [/Purified Dragon Scale/gi, 'Escama de Dragón Purificada (Vestigio)'],
    [/Ripped Archmage Robe/gi, 'Túnica de Archimago Rasgada (Vestigio)'],
    [/Rotten Leather Strap/gi, 'Correa de Cuero Podrida (Vestigio)'],
    [/Rusted Vanguard Buckler/gi, 'Broquel de Vanguardia Oxidado (Vestigio)'],
    [/Severed Goblin Hand/gi, 'Mano de Trasgo Cercenada (Vestigio)'],
    [/Singed Archmage Hood/gi, 'Capucha de Archimago Chamuscada (Vestigio)'],
    [/Singed Leather Greave/gi, 'Greba de Cuero Chamuscada (Vestigio)'],
    [/Tarnished Silver Sigil/gi, 'Sigilo de Plata Deslustrado (Vestigio)'],
    [/Twisted Blightwood Branch/gi, 'Rama de Blightwood Retorcida (Vestigio)'],
    [/Unholy Symbol Fragment/gi, 'Fragmento de Símbolo Impío (Vestigio)'],
    [/Vanguard's Broken Spear/gi, 'Lanza Rota de Vanguardia (Vestigio)'],
    [/Velgar's Broken Horn/gi, 'Cuerno Roto de Velgar (Vestigio)'],
    [/Weathered Rune Shard/gi, 'Fragmento Rúnico Erosionado (Vestigio)'],

    // Comidas & Raciones
    [/Dwellberry Glazed Roast Flank/gi, 'Ijar Asado Glaseado con Bayas Dwell'],
    [/Dwellberry Glazed Roast Meat/gi, 'Carne Asada Glaseada con Bayas Dwell'],
    [/Dwellberry Infusion/gi, 'Infusión de Bayas Dwell'],
    [/Dwellberry Crunchies \(Removed\)/gi, 'Crujientes de Bayas Dwell (Retirado)'],
    [/Dwellberry Crunchies/gi, 'Crujientes de Bayas Dwell'],
    [/Eggs Royale/gi, 'Huevos Royale'],
    [/Evasive Infusion/gi, 'Infusión Evasiva'],
    [/Flaming Pitch/gi, 'Brea Ardiente'],
    [/Flour/gi, 'Harina de Trigo'],
    [/Fried Onions/gi, 'Cebollas Fritas'],
    [/Fried Mushrooms/gi, 'Champiñones Fritos'],
    [/Fruit Blast/gi, 'Explosión Frutal'],
    [/Garlic Bread/gi, 'Pan de Ajo'],
    [/Giant Frog Legs/gi, 'Ancas de Rana Gigante'],
    [/Gnome Crunchies/gi, 'Crujientes Gnómicos'],
    [/Gnome Spice/gi, 'Especias Gnómicas'],
    [/Gnomeball/gi, 'Pelota Gnómica'],
    [/Grapes/gi, 'Uvas Frescas'],
    [/Grilled Cheese/gi, 'Queso a la Parrilla'],
    [/Grilled Trout/gi, 'Trucha a la Parrilla'],
    [/Grilled Salmon/gi, 'Salmón a la Parrilla'],
    [/Grilled Lobster/gi, 'Langosta a la Parrilla'],
    [/Grilled Swordfish/gi, 'Pez Espada a la Parrilla'],
    [/Grilled Shark/gi, 'Tiburón a la Parrilla'],
    [/Herbal Tea/gi, 'Té de Hierbas'],
    [/Hot Pot/gi, 'Caldero Caliente'],
    [/Meat Pie/gi, 'Pastel de Carne'],
    [/Mushroom Potato/gi, 'Patata con Champiñones'],
    [/Mushroom Soup/gi, 'Sopa de Champiñones'],
    [/Net Trap/gi, 'Trampa de Red'],
    [/Ogre Bellows/gi, 'Fuelle de Ogro'],
    [/Ogre Bow/gi, 'Arco de Ogro'],
    [/Ogre Arrow/gi, 'Flecha de Ogro'],
    [/Pasty/gi, 'Empanada Rústica'],
    [/Peach/gi, 'Melocotón'],
    [/Pickled Fish/gi, 'Pescado en Escabeche'],
    [/Pike/gi, 'Lucio'],
    [/Pineapple Punch/gi, 'Ponche de Piña'],
    [/Pita Bread/gi, 'Pan de Pita'],
    [/Plain Pizza/gi, 'Pizza Clásica'],
    [/Poached Eggs/gi, 'Huevos Escalfados'],
    [/Pot of Flour/gi, 'Olla de Harina'],
    [/Potato with Butter/gi, 'Patata con Mantequilla'],
    [/Potato with Cheese/gi, 'Patata con Queso'],
    [/Pumpkin/gi, 'Calabaza'],
    [/Rabbit Meat/gi, 'Carne de Conejo'],
    [/Ration Pack/gi, 'Paquete de Raciones'],
    [/Redberry Pie/gi, 'Pastel de Frutos Rojos'],
    [/Roast Beast/gi, 'Carne Asada de Fiera'],
    [/Roast Bird/gi, 'Ave Asada'],
    [/Roast Frog/gi, 'Rana Asada'],
    [/Roast Meat/gi, 'Carne Asada'],
    [/Roast Ribs/gi, 'Costillas Asadas'],
    [/Salmon/gi, 'Salmón Cocinado'],
    [/Seared Beef/gi, 'Carne de Vaca a la Brasa'],
    [/Seared Chicken/gi, 'Pollo a la Brasa'],
    [/Seared Dragon Meat/gi, 'Carne de Dragón a la Brasa'],
    [/Seared Fish/gi, 'Pescado a la Brasa'],
    [/Seared Meat/gi, 'Carne a la Brasa'],
    [/Spicy Stew/gi, 'Estofado Picante'],
    [/Stew/gi, 'Estofado Rústico'],
    [/Stuffed Mushroom/gi, 'Champiñón Relleno'],
    [/Tangled Toad's Legs/gi, 'Ancas de Sapo Enredadas'],
    [/Toad Crunchies/gi, 'Crujientes de Sapo'],
    [/Trout/gi, 'Trucha Cocinada'],
    [/Tuna/gi, 'Atún Cocinado'],
    [/Tuna Potato/gi, 'Patata con Atún'],
    [/Ugthanki Kebab/gi, 'Kebab de Ugthanki'],
    [/Vegetable Stew/gi, 'Estofado de Verduras'],
    [/Wild Pie/gi, 'Pastel Salvaje'],
    [/Worm Crunchies/gi, 'Crujientes de Gusano'],

    // Equipamiento & Pernos Encantados
    [/Enchanted ([A-Za-z]+) Bolts?/gi, 'Pernos de $1 Encantados'],
    [/Enchanted Diamond Bolts/gi, 'Pernos de Diamante Encantados'],
    [/Enchanted Ruby Bolts/gi, 'Pernos de Rubí Encantados'],
    [/Enchanted Emerald Bolts/gi, 'Pernos de Esmeralda Encantados'],
    [/Enchanted Sapphire Bolts/gi, 'Pernos de Zafiro Encantados'],
    [/Enchanted Dragonstone Bolts/gi, 'Pernos de Piedra de Dragón Encantados'],
    [/Enchanted Onyx Bolts/gi, 'Pernos de Ónice Encantados'],
    [/Enchanted Pearl Bolts/gi, 'Pernos de Perla Encantados'],
    [/Enchanted Topaz Bolts/gi, 'Pernos de Topacio Encantados'],
    [/Enchanted Opal Bolts/gi, 'Pernos de Ópalo Encantados'],
    [/Enchanted Jade Bolts/gi, 'Pernos de Jade Encantados'],

    // Armas & Armaduras específicas
    [/Fallen Paladin's ([A-Za-z\s]+)/gi, '$1 de Paladín Caído'],
    [/Fallen Hero's ([A-Za-z\s]+)/gi, '$1 de Héroe Caído'],
    [/Fallen Ranger's ([A-Za-z\s]+)/gi, '$1 de Explorador Caído'],
    [/Fallen Mage's ([A-Za-z\s]+)/gi, '$1 de Mago Caído'],
    [/Fellhollow ([A-Za-z\s]+)/gi, '$1 de Fellhollow'],
    [/Ghornfell ([A-Za-z\s]+)/gi, '$1 de Ghornfell'],
    [/Brynmoor ([A-Za-z\s]+)/gi, '$1 de Brynmoor'],
    [/Dowdun ([A-Za-z\s]+)/gi, '$1 de Dowdun'],
    [/Umbral ([A-Za-z\s]+)/gi, '$1 Umbrío/a'],
    [/Abyssal ([A-Za-z\s]+)/gi, '$1 Abisal'],
    [/Dragonkin ([A-Za-z\s]+)/gi, '$1 Dragonkin'],
    [/TzHaar-([A-Za-z\-]+)/gi, 'TzHaar-$1 (Obsidiana)'],
    [/TokTz-([A-Za-z\-]+)/gi, 'TokTz-$1 (Obsidiana)'],

    // Tipos de objeto generales
    [/Blue Remnants/gi, 'Restos Azules'],
    [/Green Remnants/gi, 'Restos Verdes'],
    [/Purple Remnants/gi, 'Restos Púrpuras'],
    [/Red Remnants/gi, 'Restos Rojos'],
    [/Yellow Remnants/gi, 'Restos Amarillos'],
    [/White Remnants/gi, 'Restos Blancos'],
    [/Black Remnants/gi, 'Restos Negros'],
    [/Gold Remnants/gi, 'Restos Dorados']
  ];

  for (const [pattern, repl] of replacements) {
    n = n.replace(pattern, repl);
  }

  return n;
}

// 2. TRADUCCIÓN INTEGRAL DE DESCRIPCIONES
function translateFullDescription(desc) {
  if (!desc || typeof desc !== 'string') return desc;
  let d = desc.trim();

  // Limpieza de etiquetas
  d = d.replace(/\{\{sic\|[^\}]+\}\}/gi, '');
  d = d.replace(/\{\{[^\}]+\}\}/gi, '');

  const sentenceMap = [
    [/A solid crossbow reinforced with ([^\.]+)\./gi, 'Una sólida ballesta reforzada con $1.'],
    [/A basic shortbow made of ([^\.]+)\./gi, 'Un arco corto básico elaborado con $1.'],
    [/A powerful longbow carved from ([^\.]+)\./gi, 'Un potente arco largo tallado en $1.'],
    [/A set of arrows with ([^\.]+) tips\./gi, 'Un conjunto de flechas con puntas de $1.'],
    [/Protective plate armour for the chest\./gi, 'Armadura de placas protectora para el torso.'],
    [/Protective plate armour for the legs\./gi, 'Armadura de placas protectora para las piernas.'],
    [/A protective helmet made of ([^\.]+)\./gi, 'Un casco protector elaborado de $1.'],
    [/A sturdy shield made of ([^\.]+)\./gi, 'Un resistente escudo elaborado de $1.'],
    [/A sharp dagger forged from ([^\.]+)\./gi, 'Una afilada daga forjada a partir de $1.'],
    [/A sharp sword forged from ([^\.]+)\./gi, 'Una espada afilada forjada a partir de $1.'],
    [/A heavy battleaxe forged from ([^\.]+)\./gi, 'Una pesada hacha de guerra forjada a partir de $1.'],
    [/A devastating warhammer forged from ([^\.]+)\./gi, 'Un devastador martillo de guerra forjado a partir de $1.'],
    [/A sharp scimitar forged from ([^\.]+)\./gi, 'Una cimitarra afilada forjada a partir de $1.'],
    [/A massive two-handed sword forged from ([^\.]+)\./gi, 'Un imponente espadón a dos manos forjado a partir de $1.'],
    [/A deadly spear forged from ([^\.]+)\./gi, 'Una letal lanza forjada a partir de $1.'],
    [/A heavy mace forged from ([^\.]+)\./gi, 'Una pesada maza forjada a partir de $1.'],
    [/Used to harvest logs from trees\./gi, 'Utilizado para talar troncos de los árboles.'],
    [/Used to mine ores and rocks\./gi, 'Utilizado para extraer menas y minerales de las rocas.'],
    [/Restores health and sustains energy\./gi, 'Restaura puntos de salud y mantiene la energía.'],
    [/A staple survival food across Ashenfall\./gi, 'Un alimento básico de supervivencia en Ashenfall.'],
    [/Can be crafted at the Blacksmith's Bench\./gi, 'Se puede forjar en el Banco del Herrero.'],
    [/Can be brewed in a cooking pot or cauldron\./gi, 'Se puede preparar en una olla de cocina o caldero.'],
    [/Infused with magical power\./gi, 'Imbuido de poder mágico ancestral.'],
    [/Essential crafting material\./gi, 'Material esencial de artesanía.']
  ];

  for (const [pat, rep] of sentenceMap) {
    d = d.replace(pat, rep);
  }

  // Traducción granular de palabras residuales en inglés
  const words = [
    [/\bA metal bar\b/gi, 'Una barra de metal'],
    [/\ba metal bar\b/gi, 'una barra de metal'],
    [/\bA raw\b/gi, 'Un/a crudo/a'],
    [/\ba raw\b/gi, 'un/a crudo/a'],
    [/\bA cooked\b/gi, 'Un/a cocinado/a'],
    [/\ba cooked\b/gi, 'un/a cocinado/a'],
    [/\bA delicious\b/gi, 'Un delicioso'],
    [/\ba delicious\b/gi, 'un delicioso'],
    [/\bA nutritious\b/gi, 'Un nutritivo'],
    [/\ba nutritious\b/gi, 'un nutritivo'],
    [/\bA fresh\b/gi, 'Un fresco'],
    [/\ba fresh\b/gi, 'un fresco'],
    [/\bA wild\b/gi, 'Un salvaje'],
    [/\ba wild\b/gi, 'un salvaje'],
    [/\bUsed in alchemy\b/gi, 'Utilizado en alquimia'],
    [/\bused in alchemy\b/gi, 'utilizado en alquimia'],
    [/\bUsed in cooking\b/gi, 'Utilizado en cocina'],
    [/\bused in cooking\b/gi, 'utilizado en cocina'],
    [/\bUsed in smithing\b/gi, 'Utilizado en herrería'],
    [/\bused in smithing\b/gi, 'utilizado en herrería'],
    [/\bUsed in crafting\b/gi, 'Utilizado en artesanía'],
    [/\bused in crafting\b/gi, 'utilizado en artesanía'],
    [/\bUsed in fletching\b/gi, 'Utilizado en flechería'],
    [/\bused in fletching\b/gi, 'utilizado en flechería'],
    [/\bUsed in runecrafting\b/gi, 'Utilizado en creación de runas'],
    [/\bused in runecrafting\b/gi, 'utilizado en creación de runas'],
    [/\bIncreases attack\b/gi, 'Incrementa el ataque'],
    [/\bincreases attack\b/gi, 'incrementa el ataque'],
    [/\bIncreases defence\b/gi, 'Incrementa la defensa'],
    [/\bincreases defence\b/gi, 'incrementa la defensa'],
    [/\bIncreases strength\b/gi, 'Incrementa la fuerza'],
    [/\bincreases strength\b/gi, 'incrementa la fuerza'],
    [/\bIncreases ranged\b/gi, 'Incrementa el ataque a distancia'],
    [/\bincreases ranged\b/gi, 'incrementa el ataque a distancia'],
    [/\bIncreases magic\b/gi, 'Incrementa la magia'],
    [/\bincreases magic\b/gi, 'incrementa la magia'],
    [/\bfor a short time\b/gi, 'durante un tiempo'],
    [/\bfor a limited time\b/gi, 'durante un tiempo limitado'],
    [/\bfrom the Dragonkin era\b/gi, 'de la era Dragonkin'],
    [/\bacross Ashenfall\b/gi, 'por todo Ashenfall'],
    [/\bin Ashenfall\b/gi, 'en Ashenfall']
  ];

  for (const [wp, wr] of words) {
    d = d.replace(wp, wr);
  }

  return d;
}

// 3. ACTUALIZAR ITEMS
items.forEach(it => {
  const currentName = it.name || it.title || it.englishTitle;
  it.name = translateAnyName(currentName);
  if (it.description) {
    it.description = translateFullDescription(it.description);
  }
  if (it.stats) {
    if (it.stats.specialAction) it.stats.specialAction = translateFullDescription(it.stats.specialAction);
    if (it.stats.specialEffect) it.stats.specialEffect = translateFullDescription(it.stats.specialEffect);
  }
});

// 4. MAPA GLOBAL DE RECETAS
const globalMap = new Map();
items.forEach(it => {
  if (it.id) globalMap.set(it.id.toLowerCase().trim(), it.name);
  if (it.title) globalMap.set(it.title.toLowerCase().trim(), it.name);
  if (it.englishTitle) globalMap.set(it.englishTitle.toLowerCase().trim(), it.name);
  if (it.name) globalMap.set(it.name.toLowerCase().trim(), it.name);
});

items.forEach(it => {
  if (it.recipe?.materials) {
    it.recipe.materials.forEach(mat => {
      const match = globalMap.get(mat.item.toLowerCase().trim()) || translateAnyName(mat.item);
      mat.item = match;
    });
  }
  if (it.usedIn) {
    it.usedIn.forEach(u => {
      const match = globalMap.get((u.title || '').toLowerCase().trim()) || translateAnyName(u.title);
      u.title = match;
    });
  }
});

fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf8');
console.log('¡Traducción 100% integral de items.json completada!');
