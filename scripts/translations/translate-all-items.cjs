import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const itemsPath = path.resolve(__dirname, '../../src/data/items.json');
let items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

// Specific translations map for any remaining English or awkward item names
const nameTranslations = {
  // Kalphite & Monster parts
  "Kalphite Ichor": "Icor de Kalphite",
  "Kalphite Wing": "Ala de Kalphite",
  "Kalphite Bait": "Cebo para Kalphite",
  "Kalphite Carapace Chest": "Coraza de Kalphite",
  "Kalphite Carapace Helmet": "Casco de Kalphite",
  "Kalphite Carapace Legs": "Perneras de Kalphite",
  "Large Wardstone": "Piedra Guardiana Mayor",
  "Medium Wardstone": "Piedra Guardiana Mediana",
  "Leggings Of Lightness": "Perneras de Ligereza",
  "Limp Black Lining": "Forro Negro Desgastado (Vestigio)",
  "Lobster Bait": "Cebo para Langostas",
  "Lunar Garou Hat": "Sombrero Garou Lunar",
  "Lunar Garou Robe Legs": "Falda de Túnica Garou Lunar",
  "Lunar Garou Robes": "Túnica Garou Lunar",
  "Lunate Shawl": "Chal Lunar (Vestigio)",
  "Lunular Wrappings": "Envolturas Lunulares (Vestigio)",
  "Master Wand": "Varita de Maestro",
  "Meat Pizza": "Pizza de Carne",
  "Meat Sandwich": "Sándwich de Carne",
  "Meat Estofado Rústico": "Estofado Rústico de Carne",
  "Meat Twist Sandwich": "Sándwich Enrollado de Carne",
  "Miner Ring": "Anillo de Minero",
  "Mixed Grill": "Parrillada Mixta",
  "Mixed Platter": "Plato Combinado",
  "Monkfish Bait": "Cebo para Rape",
  "Monkfish Fillets": "Filetes de Rape",
  "Monkfish Skewers": "Brochetas de Rape",
  "Monstrous Fang": "Colmillo Monstruoso",
  "Mushroom Kebab": "Kebab de Champiñones",
  "Mystic Fibres": "Fibras Místicas",
  "Mystic Net": "Red Mística",
  "Mystic Robe Legs": "Falda de Túnica Mística",
  "Mystic Robes": "Túnica Mística",
  "Paladin Platelegs": "Perneras de Paladín",
  "Plant Cure": "Cura para Plantas",
  "Poison Ichor": "Icor Venenoso",
  "Poisoned Adamant Arrow": "Flecha de Adamantita Envenenada",
  "Poisoned Bronze Arrow": "Flecha de Bronce Envenenada",
  "Poisoned Fang Arrow": "Flecha de Colmillo Envenenada",
  "Poisoned Iron Arrow": "Flecha de Hierro Envenenada",
  "Poisoned Mithril Arrow": "Flecha de Mithril Envenenada",
  "Poisoned Rune Arrow": "Flecha Rúnica Envenenada",
  "Poisoned Steel Arrow": "Flecha de Acero Envenenada",
  "Pristine Armoured Catfish": "Pez Gato Acorazado Prístino",
  "Pristine Beltfish": "Pez Cinto Prístino",
  "Pristine Desert Sole": "Lenguado del Desierto Prístino",
  "Pristine Herring": "Arenque Prístino",
  "Pristine Infernal Eel": "Anguila Infernal Prístina",
  "Pristine Lobster": "Langosta Prístina",
  "Pristine Monkfish": "Rape Prístino",
  "Pristine Salmón Cocinado": "Salmón Cocinado Prístino",
  "Pristine Sardine": "Sardina Prístina",
  "Pristine Trucha Cocinada": "Trucha Cocinada Prístina",
  "Pristine Undead Bass": "Lubina No-Muerta Prístina",
  "Pristine Undead Eel": "Anguila No-Muerta Prístina",
  "Calabaza Soup": "Sopa de Calabaza",
  "Calabaza Spice Infusion": "Infusión de Calabaza con Especias",
  "Pungent Omelette": "Tortilla Olorosa",
  "Purple Torch": "Antorcha Morada",
  "Ram Horn": "Cuerno de Carnero",
  "Ranger Hat": "Sombrero de Explorador",
  "Ranger Tights": "Mallas de Explorador",
  "Ranger Tunic": "Túnica de Explorador",
  "Rat Roast": "Asado de Rata",
  "Red Torch": "Antorcha Roja",
  "Redberry Crunchies": "Crujientes de Bayas Rojas",
  "Redberry Glazed Roast Flank": "Falda Asada Glaseada con Bayas Rojas",
  "Redberry Infusion": "Infusión de Bayas Rojas",
  "Redberry Roast Rat": "Rata Asada con Bayas Rojas",
  "Refined Obsidian": "Obsidiana Refinada",
  "Reinforced Body": "Peto Reforzado",
  "Reinforced Helmet": "Casco Reforzado",
  "Reinforced Legs": "Perneras Reforzadas",
  "Relentless Infusion": "Infusión Implacable",
  "Roast Dinner": "Cena Asada",
  "Roast Calabaza": "Calabaza Asada",
  "Roasted Lobster": "Langosta Asada",
  "Saradominist Cloak": "Capa Saradominista",
  "Sauteed Sardines": "Sardinas Salteadas",
  "Sauteed Shrimp": "Camarones Salteados",
  "Scratchy Sackcloth": "Saco Áspero (Vestigio)",
  "Seared Anchovies": "Anchoas Selladas",
  "Seared Cactus Steak": "Filete de Cactus Sellado",
  "Selenic Veil": "Velo Selénico (Vestigio)",
  "Serrated Claw": "Garra Dentada (Vestigio)",
  "Shadow Body": "Peto Sombrío",
  "Shadow Chaps": "Perneras Sombrías",
  "Shadow Cowl": "Capucha Sombría",
  "Shadowscale Hood": "Capucha de Escama Sombría",
  "Shrimp Bait": "Cebo para Camarones",
  "Shrimp Omelette": "Tortilla de Camarones",
  "Simply Splendid Feather": "Pluma Simplemente Espléndida (Vestigio)",
  "Sinister Mechanism": "Mecanismo Siniestro (Vestigio)",
  "Small Animal Fang": "Colmillo de Animal Pequeño",
  "Smoked Herring": "Arenque Ahumado",
  "Smoked Infernal Eel": "Anguila Infernal Ahumada",
  "Soda Ash": "Ceniza de Sosa",
  "Sodden Black Leather": "Cuero Negro Empapado (Vestigio)",
  "Spooky Bait": "Cebo Fantasmagórico",
  "Squeaking Sausage": "Salchicha Chillona",
  "Steak Sandwich": "Sándwich de Bistec",
  "Steamed Beltfish": "Pez Cinto al Vapor",
  "Stone Block": "Bloque de Piedra",
  "Strong Sweet Tea": "Té Dulce Fuerte",
  "Strong Tea": "Té Fuerte",
  "Stuffed Catfish": "Pez Gato Relleno",
  "Stunted Kalphite Wing": "Ala de Kalphite Atrofiada",
  "Sun Baked Sole": "Lenguado Horneado al Sol",
  "Swabbie Pie": "Pastel de Marinero",
  "Sweet Veg Ball": "Albóndiga Vegetal Dulce",
  "Twilight Lily": "Lirio del Crepúsculo",
  "Kebab Umbrío/a": "Kebab Umbrío",
  "Undead Bone": "Hueso No-Muerto",
  "Undead Delight": "Delicia No-Muerta",
  "Undead Meat": "Carne No-Muerta",
  "Vegan Fryup": "Fritura Vegana",
  "Vegetable Soup": "Sopa de Verduras",
  "Victoria Sponge Cake": "Bizcocho Victoria",
  "Vine Root": "Raíz de Enredadera",
  "Weighted Training Band": "Banda de Entrenamiento Lastrada (Vestigio)",
  "Wild Archer Body": "Peto de Arquero Salvaje",
  "Wild Archer Chaps": "Perneras de Arquero Salvaje",
  "Wild Archer Cowl": "Capucha de Arquero Salvaje",
  "Wizard Hat": "Sombrero de Mago",
  "Wizard Robe Legs": "Falda de Túnica de Mago",
  "Wizard Robes": "Túnica de Mago",
  "Yellow Torch": "Antorcha Amarilla",
  "Zamorak Hood": "Capucha de Zamorak",
  "Zamorak Robe Legs": "Falda de Túnica de Zamorak",
  "Zamorak Robes": "Túnica de Zamorak",
  "Zamorak Staff": "Báculo de Zamorak",
  "Gran Yelmo Blancoo": "Gran Yelmo Blanco",
  "Semilla de Árbol Mágicoo": "Semilla de Árbol Mágico",
  // Cloaks
  "Capa Orange Adventurer's": "Capa Naranja de Aventurero",
  "Capa Orange Desert": "Capa Naranja del Desierto",
  "Capa Pink Adventurer's": "Capa Rosa de Aventurero",
  "Capa Pink Desert": "Capa Rosa del Desierto",
  "Capa Pink Dyad": "Capa Rosa Diada",
  "Capa Pink Hex": "Capa Rosa Hex",
  "Capa Purple Adventurer's": "Capa Morada de Aventurero",
  "Capa Purple Desert": "Capa Morada del Desierto",
  "Capa Red Adventurer's": "Capa Roja de Aventurero",
  "Capa Red Desert": "Capa Roja del Desierto",
  "Capa Red Dyad": "Capa Roja Diada",
  "Capa Red Hex": "Capa Roja Hex",
  "Capa White Adventurer's": "Capa Blanca de Aventurero",
  "Capa White Desert": "Capa Blanca del Desierto",
  "Capa Yellow Adventurer's": "Capa Amarilla de Aventurero",
  "Capa Yellow Desert": "Capa Amarilla del Desierto",
  "Capa Yellow Dyad": "Capa Amarilla Diada",
  "Capa Yellow Hex": "Capa Amarilla Hex",
  "Plant Cure": "Cura para Plantas"
};

// Apply name translations
items.forEach(item => {
  if (nameTranslations[item.name]) {
    item.name = nameTranslations[item.name];
    item.title = item.name;
  }
  // Double letter fixes
  item.name = item.name.replace(/Mágicoo/g, 'Mágico').replace(/Blancoo/g, 'Blanco');
  item.title = item.name;
  if (item.description) {
    item.description = item.description.replace(/Mágicoo/g, 'Mágico').replace(/Blancoo/g, 'Blanco');
  }
  if (item.journal) {
    item.journal = item.journal.replace(/Mágicoo/g, 'Mágico').replace(/Blancoo/g, 'Blanco');
  }
});

// Missing base materials to explicitly add
const newMaterials = [
  {
    id: "item-carbon",
    name: "Carbón",
    title: "Carbón",
    englishTitle: "Coal",
    category: "Materiales & Minerales",
    itemType: "Material Básico",
    description: "Mineral combustible indispensable para la fundición de lingotes y barras metálicas avanzadas (acero, mithril, adamantita y runita) en el horno de herrería.",
    journal: "Un trozo denso de carbón mineral extraído de vetas subterráneas. Al arder en la fragua genera el calor ardiente necesario para purificar y forjar aleaciones de metal resistentes.",
    powerLevel: 3,
    weight: 2.2,
    rarity: "Común",
    source: "Minería (Nivel 30+), Minería en Minas de Carbón",
    recipe: null
  },
  {
    id: "item-carbon-vegetal",
    name: "Carbón Vegetal",
    title: "Carbón Vegetal",
    englishTitle: "Charcoal",
    category: "Materiales & Minerales",
    itemType: "Material Procesado",
    description: "Carbón obtenido mediante la carbonización lenta de madera. Utilizado en alquimia, pólvora y fabricación de pellets de combustible.",
    journal: "Residuo de madera sometida a combustión sin oxígeno. Arde de manera constante, limpia y sin humo denso, siendo muy apreciado por alquimistas y artesanos.",
    powerLevel: 2,
    weight: 1.0,
    rarity: "Común",
    source: "Fabricación de Fuego / Quemado de Leña",
    recipe: {
      facility: "Hoguera",
      materials: [{ item: "Troncos de Roble", count: 1 }]
    }
  },
  {
    id: "item-hilo-de-lana",
    name: "Hilo de Lana",
    title: "Hilo de Lana",
    englishTitle: "Wool String",
    category: "Materiales & Minerales",
    itemType: "Material Procesado",
    description: "Hebras hiladas a partir de vellón de lana ovina. Utilizado para confeccionar prendas básicas de tela, arcos y artesanías.",
    journal: "Fibras de lana retorcidas con precisión en una rueca para crear una hebra resistente y flexible apta para el telar.",
    powerLevel: 1,
    weight: 0.1,
    rarity: "Común",
    source: "Rueca / Artesanía",
    recipe: {
      facility: "Rueca",
      materials: [{ item: "Vellón de Lana", count: 1 }]
    }
  },
  {
    id: "item-hilo-mistico",
    name: "Hilo Místico",
    title: "Hilo Místico",
    englishTitle: "Mystic Thread",
    category: "Materiales & Minerales",
    itemType: "Material Procesado",
    description: "Hilo impregnado de energía arcana para tejer túnicas y vestimentas mágicas de alto nivel.",
    journal: "Hebras imbuidas con el fulgor de runas arcanas, capaces de canalizar y retener encantamientos protectores en las vestiduras de los hechiceros.",
    powerLevel: 5,
    weight: 0.1,
    rarity: "Raro",
    source: "Artesanía Arcana / Mazmorras",
    recipe: {
      facility: "Rueca",
      materials: [{ item: "Fibras Místicas", count: 2 }]
    }
  },
  {
    id: "item-fragmento-de-la-camara",
    name: "Fragmento de la Cámara",
    title: "Fragmento de la Cámara",
    englishTitle: "Chamber Shard",
    category: "Materiales & Minerales",
    itemType: "Material Especial",
    description: "Fragmento cristalino obtenido en las cámaras ancestrales de Dragonwilds. Requerido para restaurar vestigios y artefactos legendarios.",
    journal: "Un cristal resonante que guarda memorias de los constructores de las cámaras profundas. Vibra al aproximarse a vestigios antiguos.",
    powerLevel: 6,
    weight: 0.5,
    rarity: "Épico",
    source: "Cámaras Antiguas / Jefes de Mazmorra",
    recipe: null
  },
  {
    id: "item-opalo",
    name: "Ópalo",
    title: "Ópalo",
    englishTitle: "Opal",
    category: "Materiales & Minerales",
    itemType: "Material Básico",
    description: "Gema semipreciosa iridiscente extraída de rocas y vetas. Puede ser tallada para joyería y encantamientos.",
    journal: "Una gema que refleja destellos de múltiples colores bajo la luz del sol. Muy codiciada por orfebres novicios.",
    powerLevel: 2,
    weight: 0.2,
    rarity: "Poco común",
    source: "Minería de Gemas",
    recipe: null
  },
  {
    id: "item-jade",
    name: "Jade",
    title: "Jade",
    englishTitle: "Jade",
    category: "Materiales & Minerales",
    itemType: "Material Básico",
    description: "Gema de color verde intenso utilizada en artesanía, joyería y confección de amuletos mágicos.",
    journal: "Piedra pulida de suave tacto y color verde profundo, asociada a la vitalidad y la conexión con la naturaleza.",
    powerLevel: 3,
    weight: 0.2,
    rarity: "Poco común",
    source: "Minería de Gemas",
    recipe: null
  },
  {
    id: "item-topacio-rojo",
    name: "Topacio Rojo",
    title: "Topacio Rojo",
    englishTitle: "Red Topaz",
    category: "Materiales & Minerales",
    itemType: "Material Básico",
    description: "Gema de intenso fulgor carmesí empleada en orfebrería de alta gama y anillos imbuidos.",
    journal: "Un cristal ígneo de brillo rojizo que parece almacenar calor en su interior. Excelente conductor para encantamientos ofensivos.",
    powerLevel: 4,
    weight: 0.2,
    rarity: "Raro",
    source: "Minería de Gemas",
    recipe: null
  },
  {
    id: "item-anima-salvaje",
    name: "Ánima Salvaje",
    title: "Ánima Salvaje",
    englishTitle: "Wild Anima",
    category: "Materiales & Minerales",
    itemType: "Material Especial",
    description: "Esencia pura de vida y energía desatada en las tierras salvajes. Vital para infundir equipo de combate de alto nivel.",
    journal: "Energía primordial concentrada en forma etérea. Palpita con el poder incontrolable del mundo natural.",
    powerLevel: 7,
    weight: 0.1,
    rarity: "Épico",
    source: "Criaturas Salvajes de Élite / Mazmorras",
    recipe: null
  },
  {
    id: "item-adhesivo",
    name: "Adhesivo",
    title: "Adhesivo",
    englishTitle: "Adhesive",
    category: "Materiales & Minerales",
    itemType: "Material Procesado",
    description: "Pegamento viscoso y tenaz utilizado en ensamblaje de piezas de forja, arcos y armaduras.",
    journal: "Compuesto aglutinante de máxima resistencia que une metales, maderas y cueros con una firmeza inquebrantable.",
    powerLevel: 2,
    weight: 0.5,
    rarity: "Común",
    source: "Alquimia / Fabricación",
    recipe: null
  },
  {
    id: "item-adhesivo-acre",
    name: "Adhesivo Ácre",
    title: "Adhesivo Ácre",
    englishTitle: "Acrid Adhesive",
    category: "Materiales & Minerales",
    itemType: "Material Procesado",
    description: "Adhesivo alquímico penetrante y de secado instantáneo para armamento especializado.",
    journal: "Una resina de olor penetrante formulada para fijar componentes bajo condiciones de calor y presión extremas.",
    powerLevel: 5,
    weight: 0.5,
    rarity: "Raro",
    source: "Alquimia Avanzada",
    recipe: null
  },
  {
    id: "item-caparazon-de-kalphite",
    name: "Caparazón de Kalphite",
    title: "Caparazón de Kalphite",
    englishTitle: "Kalphite Shell",
    category: "Materiales & Minerales",
    itemType: "Material Básico",
    description: "Quitina endurecida obtenida de las criaturas kalphite de las profundidades del desierto.",
    journal: "Placas quitinosas ultraligeras y resistentes a impactos penetrantes, ideales para forjar armaduras de combate ágiles.",
    powerLevel: 5,
    weight: 1.5,
    rarity: "Poco común",
    source: "Kalphites del Desierto",
    recipe: null
  },
  {
    id: "item-hierba-de-pantano",
    name: "Hierba de Pantano",
    title: "Hierba de Pantano",
    englishTitle: "Swamp Weed",
    category: "Materiales & Minerales",
    itemType: "Material Básico",
    description: "Vegetación densa y húmeda recolectada en zonas pantanosas, utilizada en pócimas y fibras resistentes.",
    journal: "Hierba que absorbe los minerales de aguas estancadas, confiriéndole propiedades químicas únicas para la alquimia.",
    powerLevel: 3,
    weight: 0.2,
    rarity: "Común",
    source: "Recolección en Pantano",
    recipe: null
  },
  {
    id: "item-bulbo-electrico",
    name: "Bulbo Eléctrico",
    title: "Bulbo Eléctrico",
    englishTitle: "Shocking Plant Bulb",
    category: "Materiales & Minerales",
    itemType: "Material Básico",
    description: "Bulbo vegetal que acumula y descarga electricidad estática. Usado en alquimia y trampas.",
    journal: "Un bulbo que chisporrotea al tacto. Se debe manipular con guantes aislantes para evitar descargas.",
    powerLevel: 4,
    weight: 0.3,
    rarity: "Poco común",
    source: "Plantas Eléctricas Silvestres",
    recipe: null
  },
  {
    id: "item-cristal-de-salve",
    name: "Cristal de Salve",
    title: "Cristal de Salve",
    englishTitle: "Salve Crystal",
    category: "Materiales & Minerales",
    itemType: "Material Especial",
    description: "Cristal sagrado bendecido por los sacerdotes de Saradomin para combatir fuerzas no-muertas.",
    journal: "Emite un fulgor cálido y pacífico que debilita y repele a los seres del inframundo y espíritus atormentados.",
    powerLevel: 6,
    weight: 0.4,
    rarity: "Épico",
    source: "Tarn's Lair / Criptas Sagradas",
    recipe: null
  },
  {
    id: "item-piel-suave-de-animal",
    name: "Piel Suave de Animal",
    title: "Piel Suave de Animal",
    englishTitle: "Soft Animal Hide",
    category: "Materiales & Minerales",
    itemType: "Material Básico",
    description: "Piel suave y flexible obtenida de animales de caza, tratada para la confección de vestimentas cómodas.",
    journal: "Piel seleccionada cuidadosamente por su textura agradable y elasticidad para trajes de exploración y forros de armadura.",
    powerLevel: 2,
    weight: 1.0,
    rarity: "Común",
    source: "Caza / Curtido",
    recipe: null
  },
  {
    id: "item-obsidiana-molida",
    name: "Obsidiana Molida",
    title: "Obsidiana Molida",
    englishTitle: "Ground Obsidian",
    category: "Materiales & Minerales",
    itemType: "Material Procesado",
    description: "Polvo fino de roca volcánica de obsidiana utilizado en aleaciones cerámicas y forja de élite.",
    journal: "Microfragmentos de cristal volcánico con bordes afilados a nivel microscópico, ideales para endurecer el acero.",
    powerLevel: 5,
    weight: 0.8,
    rarity: "Raro",
    source: "Mortero y Mano con Obsidiana",
    recipe: {
      facility: "Mortero",
      materials: [{ item: "Device de Obsidiana", count: 1 }]
    }
  }
];

// Add missing items if not already present
newMaterials.forEach(mat => {
  const exists = items.some(i => i.id === mat.id || i.name.toLowerCase() === mat.name.toLowerCase());
  if (!exists) {
    items.push(mat);
    console.log('Added missing material:', mat.name);
  }
});

// Harmonize recipe materials to exact Spanish item names
const recipeMaterialMap = {
  "Coal": "Carbón",
  "Charcoal": "Carbón Vegetal",
  "Opal": "Ópalo",
  "Jade": "Jade",
  "Red Topaz": "Topacio Rojo",
  "Wild Anima": "Ánima Salvaje",
  "Adhesive": "Adhesivo",
  "Acrid Adhesive": "Adhesivo Ácre",
  "Kalphite Shell": "Caparazón de Kalphite",
  "Swamp Weed": "Hierba de Pantano",
  "Shocking Plant Bulb": "Bulbo Eléctrico",
  "Fibrous Pipe Cactus": "Cactus Tubo",
  "Barra Rúnica": "Barra de Runita",
  "Troncos Mágicoo": "Troncos Mágicos",
  "Anchoas Cruda": "Anchoas Crudas",
  "Runa de la Ley": "Runa de Ley",
  "Flecha Rúnica": "Flecha de Runita",
  "Marrentill": "Marrentil",
  "Harralander": "Semillas de Harralander",
  "Zafiro": "Zafiro Tallado",
  "Rubí": "Rubí Tallado",
  "Ground Obsidian": "Obsidiana Molida",
  "Salve Crystal": "Cristal de Salve",
  "Broken Titan's Wrath": "Furia del Titán (Vestigio)",
  "Ornate Maul Handle": "Cabeza de Mazo de Granito Imbuida",
  "Dihydrogen Monoxide": "Agua Pura",
  "Piel Suave de Animal": "Piel Suave de Animal"
};

items.forEach(item => {
  if (item.recipe && item.recipe.materials) {
    item.recipe.materials.forEach(m => {
      if (recipeMaterialMap[m.item]) {
        m.item = recipeMaterialMap[m.item];
      }
    });
  }
});

fs.writeFileSync(itemsPath, JSON.stringify(items, null, 2), 'utf8');
console.log('Successfully updated items.json! Total items:', items.length);
