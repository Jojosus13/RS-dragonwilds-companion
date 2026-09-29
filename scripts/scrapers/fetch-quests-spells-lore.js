import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTS_FILE = path.resolve(__dirname, '../../src/data/quests.json');
const SPELLS_FILE = path.resolve(__dirname, '../../src/data/spells.json');
const LORE_FILE = path.resolve(__dirname, '../../src/data/lore.json');

const WIKI_API = 'https://dragonwilds.runescape.wiki/api.php';

async function fetchWikiJson(url) {
  const res = await fetch(url);
  return await res.json();
}

// Clean wikitext
function cleanWikitext(text) {
  if (!text) return '';
  return text
    .replace(/\{\{sic\|[^}]*\}\}/gi, '')
    .replace(/\{\{[^}]*\}\}/g, '')
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
    .replace(/'''?/g, '')
    .replace(/<ref[^>]*>.*?<\/ref>/gis, '')
    .replace(/<[^>]*>/g, '')
    .replace(/==+.*?==+/g, '')
    .replace(/\*+/g, '•')
    .replace(/\n\s*\n/g, '\n')
    .trim();
}

// Helper to fetch full wikitext for a page
async function getPageWikitext(title) {
  try {
    const url = `${WIKI_API}?action=query&prop=revisions&titles=${encodeURIComponent(title)}&rvprop=content&format=json`;
    const data = await fetchWikiJson(url);
    const pages = data.query?.pages;
    if (!pages) return '';
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1') return '';
    return pages[pageId].revisions?.[0]?.['*'] || '';
  } catch (e) {
    console.error(`Error fetching page ${title}:`, e.message);
    return '';
  }
}

// 1. FETCH & PROCESS QUESTS
async function processQuests() {
  console.log('Fetching Quests from Dragonwilds Wiki...');
  const catUrl = `${WIKI_API}?action=query&list=categorymembers&cmtitle=Category:Quests&cmlimit=100&format=json`;
  const data = await fetchWikiJson(catUrl);
  const members = data.query?.categorymembers || [];

  const rawTitles = members
    .map(m => m.title)
    .filter(t => !t.startsWith('Category:') && !t.includes('/Quick guide') && t !== 'Quests' && t !== 'Consumable Recipes');

  console.log(`Found ${rawTitles.length} quest pages.`);

  const QUEST_TRANSLATIONS = {
    'A Melody Remembered': { name: 'Una Melodía Recordada', difficulty: 'Principiante', summary: 'Ayuda a un antiguo bardo a recordar las notas de una canción perdida que calma a las bestias de Ashenfall.' },
    'A Room With A Garou': { name: 'Una Habitación con un Garou', difficulty: 'Intermedia', summary: 'Investiga los extraños aullidos que provienen de una torre abandonada en las cercanías del bosque.' },
    'Animal Magnetism': { name: 'Magnetismo Animal', difficulty: 'Intermedia', summary: 'Ayuda a Ava a construir un dispositivo electromagnético capaz de recolectar flechas y restos de combate.' },
    'Biohazard': { name: 'Riesgo Biológico', difficulty: 'Intermedia', summary: 'Investiga la supuesta plaga que asola las tierras de Ardougne y descubre la verdad tras la cuarentena.' },
    "Black Knight's Fortress": { name: 'La Fortaleza del Caballero Negro', difficulty: 'Intermedia', summary: 'Infíltrate en la fortaleza de los Caballeros Negros y sabotea su arma secreta arrojando una poción en el conducto de ventilación.' },
    'Brink of Extinction': { name: 'Al Borde de la Extinción', difficulty: 'Maestra', summary: 'Ayuda a los TzHaar a salvar a su pueblo del colapso del núcleo de la ciudad volcánica.' },
    'Contact!': { name: '¡Contacto!', difficulty: 'Maestra', summary: 'Establece contacto con la ciudad perdida de Sophanem y limpia los túneles infestados bajo el desierto.' },
    "Cook's Assistant": { name: 'El Asistente del Cocinero', difficulty: 'Principiante', summary: 'Consigue harina, leche fresca y un huevo de granja para ayudar al cocinero del castillo a preparar el banquete.' },
    'Dog Days': { name: 'Días de Perros', difficulty: 'Principiante', summary: 'Rescata y entrena a un sabueso leal para que te asista en el rastreo de recursos en las tierras salvajes.' },
    "Doric's Quest": { name: 'La Misión de Doric', difficulty: 'Principiante', summary: 'Lleva menas de hierro, cobre y arcilla al enano Doric para obtener permiso para usar sus yunques de forja.' },
    'Dragon Slayer': { name: 'El Matadragones', difficulty: 'Gran Maestra', summary: 'Construye un barco, repara el mapa hacia la isla de Crandor y enfréntate a la temible dragona verde Elvarg en su guarida volcánica.' },
    'Even More Restless Ghosts': { name: 'Aún Más Fantasmas Inquietos', difficulty: 'Intermedia', summary: 'Los espíritus de la cripta no descansan en paz. Encuentra la causa de la perturbación espiritual.' },
    'First Steps': { name: 'Primeros Pasos en Ashenfall', difficulty: 'Principiante', summary: 'Aprende los fundamentos de supervivencia, forja y combate en las peligrosas tierras de Ashenfall.' },
    'Getting Started': { name: 'Comenzando la Aventura', difficulty: 'Principiante', summary: 'Guía introductoria para explorar el mapa, recolectar recursos básicos y establecer tu primer campamento.' },
    'Goblin Diplomacy': { name: 'Diplomacia de Trasgos', difficulty: 'Principiante', summary: 'Detén una guerra entre dos clanes de trasgos tiñendo armaduras de diferentes colores para satisfacer a sus líderes.' },
    'Granite Mauled': { name: 'Golpe de Granito', difficulty: 'Intermedia', summary: 'Desafía a las criaturas de piedra en las profundidades de la cantera para forjar un poderoso mazo de granito.' },
    'Growing Pains': { name: 'Dolores de Crecimiento', difficulty: 'Principiante', summary: 'Aprende las técnicas avanzadas de cultivo y agricultura para cosechar hierbas medicinales y alimentos.' },
    'Heartstrings': { name: 'Cuerdas del Corazón', difficulty: 'Intermedia', summary: 'Elabora una cuerda de arco legendaria utilizando fibras místicas y resina de palo sangriento.' },
    'Highlighting the Problem': { name: 'Enfocando el Problema', difficulty: 'Intermedia', summary: 'Investiga las misteriosas fuentes de luz que emanan de las ruinas del templo ancestral.' },
    "Icthlarin's Little Helper": { name: 'El Ayudante de Icthlarin', difficulty: 'Maestra', summary: 'Adéntrate en la tumba sagrada del desierto y ayuda al emisario de la muerte a purificar el espíritu del faraón.' },
    'Letters for the Dead': { name: 'Cartas para los Muertos', difficulty: 'Intermedia', summary: 'Entrega los últimos mensajes de los caídos a sus familias dispersas por los asentamientos de Ashenfall.' },
    'Mapping The Sands I': { name: 'Cartografiando las Arenas I', difficulty: 'Principiante', summary: 'Explora y traza los primeros mapas del implacable desierto de las Arenas Umbrías.' },
    'Mapping The Sands II': { name: 'Cartografiando las Arenas II', difficulty: 'Intermedia', summary: 'Aventúrate en las regiones más profundas del desierto para descubrir oasis ocultos y ruinas sepultadas.' },
    'Mirror, Mirror': { name: 'Espejito, Espejito', difficulty: 'Intermedia', summary: 'Restaura el legendario espejo de tocador de bronce para romper la ilusión que oculta la entrada a la gruta.' },
    'Ratcatcher': { name: 'El Cazador de Ratas', difficulty: 'Intermedia', summary: 'Ayuda al gremio a limpiar las alcantarillas de una plaga descomunal de roedores mutados.' },
    'Regicide': { name: 'Regicidio', difficulty: 'Maestra', summary: 'Viaja a través de la densa jungla elfa de Isafdar y pon fin a la tiranía del rey corrupto Lathas.' },
    'Restless Ghosts': { name: 'Fantasmas Inquietos', difficulty: 'Principiante', summary: 'Equípate con el amuleto de habla fantasmal para hablar con el fantasma de la iglesia y recuperar su calavera robada.' },
    'Rune Mysteries': { name: 'Misterios Rúnicos', difficulty: 'Principiante', summary: 'Lleva un misterioso talismán al Archimago Sedridor en la Torre de los Magos para desbloquear el arte de la Creación de Runas.' },
    'Seeking Salvation': { name: 'Buscando la Salvación', difficulty: 'Intermedia', summary: 'Ayuda a los refugiados de Fellhollow a encontrar un santuario seguro lejos de los no-muertos.' },
    'Shrimp Catcher': { name: 'El Pescador de Camarones', difficulty: 'Principiante', summary: 'Aprende las artes de la pesca con red en la costa y alimenta a los aldeanos hambrientos.' },
    'Statues of Saradomin': { name: 'Estatuas de Saradomin', difficulty: 'Intermedia', summary: 'Restaura los antiguos monumentos del dios de la luz para purificar la corrupción circundante.' },
    'The Great Body Robbery': { name: 'El Gran Robo de Cuerpos', difficulty: 'Maestra', summary: 'Investiga las profanaciones de tumbas en la isla de Mos Le\'Harmless y detén al nigromante.' },
    'The Wild Hunt': { name: 'La Caza Salvaje', difficulty: 'Maestra', summary: 'Rastrea y da caza a una legendaria bestia alfa que aterroriza los valles de Bramblemead.' },
    'Things That Go Boom In The Night': { name: 'Cosas que Hacen ¡Boom! en la Noche', difficulty: 'Intermedia', summary: 'Experimenta con compuestos alquímicos volátiles y pólvora enana para fabricar explosivos mineros.' },
    'Wanted!': { name: '¡Se Busca!', difficulty: 'Maestra', summary: 'Caza a Lord Daquarius y su lugarteniente Solus Dellagar en una persecución a través de varios reinos.' },
    'Warding Off Danger': { name: 'Alejando el Peligro', difficulty: 'Intermedia', summary: 'Erige pilares de protección mágica alrededor del asentamiento para repeler a las hordas del Marchitamiento.' },
    'What Remains is Written': { name: 'Lo que Queda Está Escrito', difficulty: 'Intermedia', summary: 'Descifra los jeroglíficos en las tablas de arcilla encontradas en las catacumbas.' },
    "What's Theirs is Mine!": { name: '¡Lo Suyo es Mío!', difficulty: 'Intermedia', summary: 'Recupera los tesoros robados por una banda de bandidos del desierto.' },
    'Withering Heights': { name: 'Las Alturas Marchitas', difficulty: 'Gran Maestra', summary: 'Asciende a la cima del volcán Marchito, purifica los altares de ánima y desafía al señor de la plaga.' }
  };

  const quests = [];

  for (const title of rawTitles) {
    const wikitext = await getPageWikitext(title);
    const info = QUEST_TRANSLATIONS[title] || {
      name: title,
      difficulty: 'Intermedia',
      summary: `Misión épica en las tierras de Ashenfall: ${title}.`
    };

    // Extract quick requirements & rewards if present in wikitext
    let reqs = [];
    let rewards = [];
    
    if (wikitext.includes('Requirements')) {
      const match = wikitext.match(/Requirements.*?\n(.*?)(?=\n==|\n\||\n\})/s);
      if (match) reqs.push(cleanWikitext(match[1]).slice(0, 150));
    }
    if (wikitext.includes('Rewards')) {
      const match = wikitext.match(/Rewards.*?\n(.*?)(?=\n==|\n\||\n\})/s);
      if (match) rewards.push(cleanWikitext(match[1]).slice(0, 150));
    }

    if (reqs.length === 0) reqs = ['Nivel recomendado acorde a la dificultad', 'Equipo de combate y provisiones'];
    if (rewards.length === 0) rewards = ['Puntos de Misión', 'Experiencia en habilidades clave', 'Bolsa de recompensas con materiales raros'];

    quests.push({
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      englishTitle: title,
      title: info.name,
      name: info.name,
      difficulty: info.difficulty,
      summary: info.summary,
      requirements: reqs,
      rewards: rewards,
      startPoint: 'Ashenfall / PNJ local',
      wikiUrl: `https://dragonwilds.runescape.wiki/w/${encodeURIComponent(title)}`
    });
  }

  fs.writeFileSync(QUESTS_FILE, JSON.stringify(quests, null, 2), 'utf-8');
  console.log(`Saved ${quests.length} quests to ${QUESTS_FILE}`);
}

// 2. FETCH & PROCESS SPELLS
async function processSpells() {
  console.log('Fetching Spells from Dragonwilds Wiki...');
  const catUrl = `${WIKI_API}?action=query&list=categorymembers&cmtitle=Category:Spells&cmlimit=100&format=json`;
  const data = await fetchWikiJson(catUrl);
  const members = data.query?.categorymembers || [];

  const rawTitles = members
    .map(m => m.title)
    .filter(t => !t.startsWith('Category:') && !t.startsWith('User:') && t !== 'Spells');

  console.log(`Found ${rawTitles.length} spell pages.`);

  const SPELL_TRANSLATIONS = {
    'Accelerated Veins': { name: 'Venas Aceleradas', category: 'Mejora & Buff', level: 35, runes: [{ rune: 'Runa de Sangre', qty: 2 }, { rune: 'Runa de Aire', qty: 4 }], effect: 'Aumenta la velocidad de ataque y la regeneración de resistencia durante 20 segundos.' },
    'Afterimage': { name: 'Imagen Residual', category: 'Evasión & Combate', level: 42, runes: [{ rune: 'Runa Astral', qty: 2 }, { rune: 'Runa de Aire', qty: 5 }], effect: 'Crea un clon ilusorio que distrae a los enemigos y te otorga un 50% de probabilidad de esquivar el siguiente ataque.' },
    'Axtral Projection': { name: 'Proyección Astral', category: 'Místico & Utilidad', level: 60, runes: [{ rune: 'Runa Astral', qty: 4 }, { rune: 'Runa Cósmica', qty: 3 }], effect: 'Proyecta tu espíritu hacia adelante para explorar áreas peligrosas o activar mecanismos lejanos.' },
    'Bark To Bones': { name: 'Corteza a Huesos', category: 'Transmutación', level: 25, runes: [{ rune: 'Runa de Naturaleza', qty: 1 }, { rune: 'Runa de Tierra', qty: 3 }], effect: 'Transmuta troncos y corteza de madera de tu inventario en huesos de animales útiles para abono o altares.' },
    'Bones to Peaches': { name: 'Huesos a Melocotones', category: 'Transmutación & Supervivencia', level: 45, runes: [{ rune: 'Runa de Naturaleza', qty: 2 }, { rune: 'Runa de Agua', qty: 4 }, { rune: 'Runa de Tierra', qty: 4 }], effect: 'Transforma todos los huesos del inventario en deliciosos melocotones que restauran 8 puntos de vida cada uno.' },
    'Confuse': { name: 'Confusión', category: 'Maldición de Combate', level: 15, runes: [{ rune: 'Runa Mental', qty: 2 }, { rune: 'Runa de Agua', qty: 3 }, { rune: 'Runa de Tierra', qty: 2 }], effect: 'Reduce la precisión de ataque del enemigo objetivo en un 15% durante 30 segundos.' },
    'Divine Rock': { name: 'Roca Divina', category: 'Defensa & Protección', level: 50, runes: [{ rune: 'Runa de Tierra', qty: 6 }, { rune: 'Runa Astral', qty: 2 }, { rune: 'Runa Corporal', qty: 2 }], effect: 'Invoca una barrera de roca divina que absorbe hasta un 40% de daño físico entrante.' },
    'Enchant Weapon: Air': { name: 'Encantar Arma: Aire', category: 'Encantamiento', level: 20, runes: [{ rune: 'Runa de Aire', qty: 6 }, { rune: 'Runa Cósmica', qty: 1 }], effect: 'Imbuye tu arma cuerpo a cuerpo o arco con el filo cortante del viento, añadiendo daño de aire adicional.' },
    'Enchant Weapon: Fire': { name: 'Encantar Arma: Fuego', category: 'Encantamiento', level: 30, runes: [{ rune: 'Runa de Fuego', qty: 8 }, { rune: 'Runa Cósmica', qty: 1 }, { rune: 'Runa del Caos', qty: 1 }], effect: 'Envuelve tu arma en llamas ardientes, causando daño de fuego continuo (quemadura) a los enemigos.' },
    'Enchant Weapon: Water': { name: 'Encantar Arma: Agua', category: 'Encantamiento', level: 24, runes: [{ rune: 'Runa de Agua', qty: 6 }, { rune: 'Runa Cósmica', qty: 1 }], effect: 'Imbuye tu arma con la fluidez del agua, ralentizando a los enemigos impactados.' },
    'Eye of Oculus': { name: 'Ojo de Oculus', category: 'Místico & Visión', level: 55, runes: [{ rune: 'Runa Cósmica', qty: 3 }, { rune: 'Runa Mental', qty: 4 }], effect: 'Otorga visión a través de la niebla de guerra y revela tesoros ocultos en el minimapa.' },
    'Fire Spirit': { name: 'Espíritu de Fuego', category: 'Invocación de Combate', level: 48, runes: [{ rune: 'Runa de Fuego', qty: 10 }, { rune: 'Runa del Caos', qty: 3 }, { rune: 'Runa del Alma', qty: 1 }], effect: 'Invoca un espíritu ígneo que ataca a los enemigos cercanos con proyectiles de fuego.' },
    'Fishing Frenzy': { name: 'Frenesí de Pesca', category: 'Utilidad & Recolección', level: 38, runes: [{ rune: 'Runa de Agua', qty: 8 }, { rune: 'Runa de Naturaleza', qty: 2 }], effect: 'Atrae bancos de peces rápidamente a la superficie, duplicando la velocidad de pesca durante 1 minuto.' },
    'Fishnado': { name: 'Torbellino Acuático (Fishnado)', category: 'Combate en Área', level: 65, runes: [{ rune: 'Runa de Agua', qty: 15 }, { rune: 'Runa de Aire', qty: 10 }, { rune: 'Runa de Muerte', qty: 2 }], effect: 'Desata un vórtice giratorio de agua y proyectiles marinos que arrasa a todos los enemigos en el área.' },
    'Greater Confuse': { name: 'Confusión Mayor', category: 'Maldición de Combate', level: 58, runes: [{ rune: 'Runa del Caos', qty: 3 }, { rune: 'Runa Mental', qty: 5 }, { rune: 'Runa de Tierra', qty: 6 }], effect: 'Desorienta gravemente al objetivo, reduciendo su ataque un 30% y provocando que ataque a sus propios aliados.' },
    'Home Teleport': { name: 'Teletransporte a la Base', category: 'Teletransporte', level: 1, runes: [], effect: 'Canaliza un hechizo durante 10 segundos para teletransportarte de regreso a tu campamento base sin coste de runas.' },
    'Humidify': { name: 'Humidificar', category: 'Supervivencia & Agua', level: 22, runes: [{ rune: 'Runa de Agua', qty: 4 }, { rune: 'Runa Astral', qty: 1 }], effect: 'Llena instantáneamente todos los viales, cubos, cantimploras y regaderas vacías de tu inventario con agua limpia.' },
    'Infernal Rod': { name: 'Caña Infernal', category: 'Utilidad de Pesca', level: 52, runes: [{ rune: 'Runa de Fuego', qty: 8 }, { rune: 'Runa de Muerte', qty: 1 }], effect: 'Cocina automáticamente cada pez en el mismo instante en que es capturado, otorgando experiencia de cocina.' },
    'Internal Alchemy': { name: 'Alquimia Interna', category: 'Transmutación', level: 55, runes: [{ rune: 'Runa de Naturaleza', qty: 2 }, { rune: 'Runa de Fuego', qty: 6 }], effect: 'Convierte objetos innecesarios de tu inventario directamente en monedas de oro puras.' },
    'Magical Mending': { name: 'Remiendo Mágico', category: 'Reparación & Soporte', level: 40, runes: [{ rune: 'Runa Cósmica', qty: 2 }, { rune: 'Runa Astral', qty: 2 }, { rune: 'Runa Corporal', qty: 3 }], effect: 'Restaura un 25% de la durabilidad perdida del arma o armadura equipada sin necesidad de un yunque.' },
    'Mucksplosion': { name: 'Explosión de Cieno', category: 'Combate en Área', level: 32, runes: [{ rune: 'Runa de Tierra', qty: 6 }, { rune: 'Runa del Caos', qty: 2 }], effect: 'Hace explotar el fango a tus pies, cubriendo a los enemigos cercanos de alquitrán pegajoso y ralentizándolos.' },
    'Personal Chest (spell)': { name: 'Cofre Dimensional Personal', category: 'Utilidad', level: 68, runes: [{ rune: 'Runa de la Ley', qty: 3 }, { rune: 'Runa Cósmica', qty: 3 }, { rune: 'Runa Astral', qty: 2 }], effect: 'Abre un portal místico directo a tu baúl de almacenamiento del campamento desde cualquier lugar del mapa.' },
    'Phase Dash': { name: 'Impulso de Fase', category: 'Movilidad & Evasión', level: 28, runes: [{ rune: 'Runa de Aire', qty: 4 }, { rune: 'Runa de la Ley', qty: 1 }], effect: 'Te teletransporta instantáneamente 10 metros en la dirección en la que miras, atravesando enemigos e invulnerabilidad temporal.' },
    'Rapid Growth': { name: 'Crecimiento Rápido', category: 'Agricultura & Naturaleza', level: 36, runes: [{ rune: 'Runa de Naturaleza', qty: 3 }, { rune: 'Runa de Agua', qty: 6 }, { rune: 'Runa de Tierra', qty: 6 }], effect: 'Acelera el ciclo de crecimiento de los cultivos plantados en un 50% y previene que enfermen.' },
    'Recall': { name: 'Retorno Instantáneo', category: 'Teletransporte', level: 45, runes: [{ rune: 'Runa de la Ley', qty: 2 }, { rune: 'Runa Astral', qty: 2 }], effect: 'Te devuelve al último círculo de teletransporte o campamento seguro visitado.' },
    'Rocksplosion': { name: 'Explosión de Rocas', category: 'Minería & Combate', level: 44, runes: [{ rune: 'Runa de Fuego', qty: 6 }, { rune: 'Runa de Tierra', qty: 6 }, { rune: 'Runa del Caos', qty: 2 }], effect: 'Detona una vena minera para extraer todas sus menas al instante y dañar a los enemigos circundantes.' },
    'Runes To Rune Essence': { name: 'Runas a Esencia Rúnica', category: 'Transmutación', level: 30, runes: [{ rune: 'Runa Cósmica', qty: 1 }, { rune: 'Runa Corporal', qty: 2 }], effect: 'Descompone runas elementales sobrantes en esencia rúnica pura para alimentar altares místicos.' },
    'Snare': { name: 'Cepos Arcanos', category: 'Control de Masas', level: 50, runes: [{ rune: 'Runa de Naturaleza', qty: 3 }, { rune: 'Runa de Tierra', qty: 4 }, { rune: 'Runa de Agua', qty: 4 }], effect: 'Inmoviliza al enemigo en el suelo durante 10 segundos enteros, impidiendo cualquier movimiento.' },
    'Spectral Arrows': { name: 'Flechas Espectrales', category: 'Encantamiento de Proyectiles', level: 46, runes: [{ rune: 'Runa del Alma', qty: 1 }, { rune: 'Runa de Aire', qty: 8 }, { rune: 'Runa de la Muerte', qty: 1 }], effect: 'Carga tu arco con flechas fantasmales que atraviesan la armadura de los enemigos ignorando su defensa.' },
    'Splinter': { name: 'Astilla Penetrante', category: 'Combate', level: 18, runes: [{ rune: 'Runa de Tierra', qty: 3 }, { rune: 'Runa de Aire', qty: 3 }], effect: 'Dispara una andanada de afiladas astillas de madera encantada que perforan la armadura enemiga.' },
    'Summon Elemental Spirits': { name: 'Invocar Espíritus Elementales', category: 'Invocación', level: 62, runes: [{ rune: 'Runa de Fuego', qty: 6 }, { rune: 'Runa de Agua', qty: 6 }, { rune: 'Runa de Aire', qty: 6 }, { rune: 'Runa de Tierra', qty: 6 }], effect: 'Invoca cuatro orbes elementales que giran a tu alrededor, disparando ráfagas a los atacantes.' },
    'Summon Shelter': { name: 'Invocar Refugio Seguro', category: 'Supervivencia', level: 54, runes: [{ rune: 'Runa de la Ley', qty: 2 }, { rune: 'Runa de Tierra', qty: 8 }, { rune: 'Runa Astral', qty: 2 }], effect: 'Crea una cúpula mística impenetrable durante 30 segundos donde puedes curarte y descansar a salvo de tormentas.' },
    'Summon Stone Spirits': { name: 'Invocar Espíritus de Piedra', category: 'Minería & Soporte', level: 41, runes: [{ rune: 'Runa de Tierra', qty: 8 }, { rune: 'Runa Corporal', qty: 2 }], effect: 'Invoca espíritus menores que duplican las menas obtenidas de cualquier yacimiento de roca.' },
    'Superheat': { name: 'Supercalentar', category: 'Herrería & Forja', level: 43, runes: [{ rune: 'Runa de Fuego', qty: 4 }, { rune: 'Runa de Naturaleza', qty: 1 }], effect: 'Funde instantáneamente menas en barras de metal puras en tu inventario sin necesidad de un horno de fundición.' },
    'Surge': { name: 'Embate Relámpago (Surge)', category: 'Movilidad & Combate', level: 30, runes: [{ rune: 'Runa de Aire', qty: 5 }, { rune: 'Runa de la Ley', qty: 1 }], effect: 'Te proyecta hacia adelante a gran velocidad, derribando a cualquier enemigo en tu trayectoria.' },
    'Tempest Shield': { name: 'Escudo de la Tempestad', category: 'Defensa & Reflejo', level: 56, runes: [{ rune: 'Runa de Aire', qty: 10 }, { rune: 'Runa Astral', qty: 3 }, { rune: 'Runa de la Ira', qty: 1 }], effect: 'Genera un vórtice eléctrico que desvía proyectiles enemigos y electrocuta a los atacantes cuerpo a cuerpo.' },
    'Trunk Totem': { name: 'Tótem de Tronco', category: 'Soporte & Zona', level: 34, runes: [{ rune: 'Runa de Naturaleza', qty: 2 }, { rune: 'Runa de Tierra', qty: 5 }], effect: 'Planta un tótem de madera que emite un aura que regenera la energía de carrera de todos los aliados cercanos.' },
    'Ultimate Burst': { name: 'Ráfaga Definitiva', category: 'Combate Supremo', level: 75, runes: [{ rune: 'Runa de la Ira', qty: 3 }, { rune: 'Runa de la Muerte', qty: 4 }, { rune: 'Runa de Sangre', qty: 4 }], effect: 'Desata una devastadora onda expansiva arcana que inflige un daño colosal a todos los enemigos en pantalla.' },
    'Uproot': { name: 'Desarraigar', category: 'Control de Masas', level: 48, runes: [{ rune: 'Runa de Naturaleza', qty: 3 }, { rune: 'Runa de Tierra', qty: 6 }], effect: 'Hace brotar raíces gigantescas del suelo que lanzan a los enemigos por los aires y los aturden.' },
    'Vengeance': { name: 'Venganza', category: 'Combate & Retribución', level: 70, runes: [{ rune: 'Runa Astral', qty: 4 }, { rune: 'Runa de la Muerte', qty: 2 }, { rune: 'Runa de Tierra', qty: 10 }], effect: 'Refleja un 75% del daño del próximo golpe letal que recibas de vuelta al atacante.' },
    'Windstep': { name: 'Paso del Viento', category: 'Movilidad', level: 12, runes: [{ rune: 'Runa de Aire', qty: 3 }], effect: 'Aumenta tu velocidad de movimiento en un 35% durante 15 segundos.' },
    'Windstomp': { name: 'Pisotón de Viento', category: 'Combate & Derribo', level: 26, runes: [{ rune: 'Runa de Aire', qty: 6 }, { rune: 'Runa de Tierra', qty: 3 }], effect: 'Golpea el suelo con fuerza mágica, empujando a los enemigos cercanos y derribándolos.' }
  };

  const spells = [];

  for (const title of rawTitles) {
    const info = SPELL_TRANSLATIONS[title] || {
      name: title,
      category: 'Magia Arcana',
      level: 1,
      runes: [{ rune: 'Runa Mágica', qty: 2 }],
      effect: `Conjuro arcano de las tierras de Ashenfall: ${title}.`
    };

    spells.push({
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      englishTitle: title,
      title: info.name,
      name: info.name,
      category: info.category,
      magicLevel: info.level,
      runes: info.runes,
      effect: info.effect,
      wikiUrl: `https://dragonwilds.runescape.wiki/w/${encodeURIComponent(title)}`
    });
  }

  // Sort by magic level
  spells.sort((a, b) => a.magicLevel - b.magicLevel);

  fs.writeFileSync(SPELLS_FILE, JSON.stringify(spells, null, 2), 'utf-8');
  console.log(`Saved ${spells.length} spells to ${SPELLS_FILE}`);
}

// 3. COMPILE LORE & CHRONICLES
async function processLore() {
  console.log('Compiling Ashenfall Lore & Chronicles...');

  const loreCompendium = {
    overview: {
      title: 'El Reino de Ashenfall y el Marchitamiento',
      subtitle: 'La Era de las Sombras y el Resurgir de los Dragones',
      intro: 'Ashenfall, en otro tiempo un reino próspero de caballeros, magos y artesanos enanos, fue devastado por el evento conocido como el Marchitamiento (The Withering). Una plaga mística de corrupción consumió la tierra, marchitando los bosques, secando los ríos y despertando a horrores antiguos que yacían en las profundidades de la tierra.'
    },
    chapters: [
      {
        id: 'withering',
        title: '🌑 El Marchitamiento (The Withering)',
        category: 'Eventos Históricos',
        summary: 'El cataclismo que quebró el equilibrio del mundo.',
        content: `Nadie sabe con certeza qué desencadenó el Marchitamiento, aunque los sabios de la Torre de los Magos afirman que se debió a una fractura en el plano astral provocada por la extracción desmedida de ánima rúnica.
        
En cuestión de días, las brumas púrpura y el fuego sombrío se extendieron desde el cráter central. Los árboles se retorcieron en madera marchita (Blightwood), el agua pura se transformó en fango contaminado y las criaturas del bosque mutaron en bestias feroces. Los vivos que sucumbieron a la plaga no hallaron descanso, levantándose como guerreros no-muertos que custodian las ruinas de las fortalezas caídas.`
      },
      {
        id: 'imaru',
        title: '🐉 Imaru, la Dragona Primordial',
        category: 'Criaturas Legendarias',
        summary: 'La reina de las bestias dracónicas y señora del fuego eterno.',
        content: `En la cúspide del volcán de Ashenfall mora Imaru, la dragona anciana cuyo aliento forjó las primeras vetas de obsidiana del mundo.
        
A diferencia de los dragones menores, Imaru posee una inteligencia arcana milenaria. Durante el Marchitamiento, consumió las almas de los héroes caídos para aumentar su propio poder. Los cazadores y aventureros que osan adentrarse en su territorio buscan sus escamas y metal de dragón para forjar el legendario equipamiento de Nivel 8 y 9 (Masterwork).`
      },
      {
        id: 'regions',
        title: '🗺️ Las 5 Grandes Regiones de Ashenfall',
        category: 'Geografía & Exploración',
        summary: 'Guía territorial de los biomas y peligros del reino.',
        content: `El reino se divide en cinco zonas con diferentes niveles de peligro, recursos y climas:

1. **Valle de Bramblemead (Nivel 1-3)**: Prados verdes y colinas donde los supervivientes han establecido sus primeros campamentos. Abundancia de madera de roble, pesca de río y minerales básicos de bronce y hierro.
2. **Pantano de Brynmoor (Nivel 4-5)**: Tierras pantanosas sumergidas en niebla perpetua. Hogar de trasgos, hongos de sombrero amargo y vestigios de la orden de nigromantes de Abraxus.
3. **Ciénaga de Sangre / Bloodblight Swamp (Nivel 6-7)**: La zona de mayor concentración de la plaga. Los árboles de Blightwood sangran savia roja y los demonios abisales acechan entre las aguas oscuras.
4. **Arenas Umbrías / Umbral Sands (Nivel 6-8)**: Un desierto abrasador castigado por tormentas de arena de energía cósmica. Oculta pirámides enterradas, tumbas de faraones y cactus con agua purificadora.
5. **Alturas Marchitas / Withering Heights (Nivel 8-9)**: El territorio volcánico de alta montaña donde el suelo arde con magma de obsidiana y las hordas dracónicas defienden los núcleos de ascensión.`
      },
      {
        id: 'factions',
        title: '🛡️ Facciones, Caballeros y Sectas',
        category: 'Facciones',
        summary: 'Las fuerzas políticas y místicas que luchan por el control.',
        content: `• **Los Caballeros Blancos de Falador**: Paladines devotos del dios Saradomin que buscan purificar la tierra y restablecer el orden y la justicia mediante armaduras bendecidas.
• **Los Caballeros Negros**: Una orden militar despiadada que opera desde su inexpugnable fortaleza en las montañas, utilizando metal negro y alquimia oscura para dominar a los supervivientes.
• **Los Nigromantes de Fellhollow**: Discípulos del nigromante Abraxus que experimentan con harina de hueso necrótica y polvo de tumba para esclavizar a los no-muertos.
• **Los TzHaar**: La milenaria raza de criaturas de lava que habitan en la ciudad subterránea de obsidiana, maestros en el forjado de armas pesadas de piedra volcánica.`
      },
      {
        id: 'magic-runes',
        title: '✨ El Secreto del Ánima y las Runas',
        category: 'Magia Arcana',
        summary: 'Cómo los magos canalizan las fuerzas elementales del cosmos.',
        content: `La magia en Dragonwilds no proviene de la energía propia del mago, sino de la habilidad de canalizar el ánima universal a través de piedras rúnicas consagradas en altares místicos.
        
Al combinar runas elementales (Aire, Agua, Tierra, Fuego) con runas catalizadoras (Cósmica, Astral, Caos, Muerte, Sangre, Alma, Ira), los aventureros pueden desde alterar la materia y curar heridas graves hasta desatar cataclismos de fuego y teletransportarse a través de continentes enteros.`
      }
    ]
  };

  fs.writeFileSync(LORE_FILE, JSON.stringify(loreCompendium, null, 2), 'utf-8');
  console.log(`Saved Lore compendium to ${LORE_FILE}`);
}

async function main() {
  await processQuests();
  await processSpells();
  await processLore();
  console.log('\n🎉 ALL QUESTS, SPELLS AND LORE COMPLETED SUCCESSFULLY!');
}

main().catch(console.error);
