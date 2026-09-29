import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.join(__dirname, '..', 'src', 'data', 'items.json');
const items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf-8'));

// Clean wiki formatting
function cleanWiki(text) {
  if (!text) return '';
  return text
    .replace(/\{\{sic\|[^}]*\}\}/gi, '')
    .replace(/\{\{[^}]*\}\}/g, '')
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, '$1')
    .replace(/'''?/g, '')
    .replace(/<[^>]*>/g, '')
    .trim();
}

// Translate description heuristics & specific items
function translateDescriptionDeep(desc, item) {
  if (!desc) return '';
  let d = cleanWiki(desc);

  // Exact map
  const EXACT = {
    "A brutal weapon crafted from the spine of a terrifying Abyssal Demon.": "Una brutal arma forjada a partir de la columna vertebral de un temible Demonio Abisal.",
    "A sturdy pickaxe made of adamant.": "Un resistente pico de minería forjado en sólida adamantita.",
    "A powerful looking blade, broken beyond repair. Still, perhaps you could learn something from it.": "Una hoja de aspecto imponente, rota sin remedio. Aun así, tal vez puedas aprender algo de ella.",
    "The rusted remains of a symbol of authority. Perhaps you could learn something from it.": "Los restos oxidados de un símbolo de autoridad. Quizás puedas aprender algo de ellos.",
    "Shows the worst possible side of yourself. Perhaps you could learn from it.": "Muestra el peor reflejo posible de ti mismo. Quizás puedas aprender algo de él al contemplarlo.",
    "A rusted blade with a wicked edge. Barely usable now, but perhaps you could learn something from it.": "Una hoja oxidada con un filo perverso. Casi inservible ahora, pero tal vez puedas aprender algo al examinarla.",
    "What's left of a staff that feels soaked in sorrow. Perhaps you could learn something from it.": "Lo que queda de un bastón empapado en dolor y tristeza. Quizás puedas aprender algo de él.",
    "The remains of a longbow damaged in a dragon attack. Perhaps you could learn something from it.": "Los restos de un arco largo dañado en el devastador ataque de un dragón. Quizás puedas aprender algo de él.",
    "Sinew, bound tightly enough to be dangerous. Useless now, but perhaps you could learn something from it.": "Tendón trenzado con fuerza letal. Inútil ahora, pero tal vez puedas aprender algo al estudiarlo.",
    "An odd bundle of scratchy sackcloth. It's unsettling to hold. Still, perhaps you could learn something from it.": "Un extraño fardo de tela de saco áspera e inquietante. Aun así, tal vez puedas aprender algo de él.",
    "A ring that once belonged to a powerful necromancer.": "Un anillo imbuido de magia oscura que perteneció en el pasado a un temido nigromante.",
    "It's... not quite finished.": "Aún... no está del todo terminado.",
    "The sinister remnants of an abyssal creature.": "Los siniestros restos incinerados de una abominación abisal.",
    "The spine from a deceased abyssal demon.": "La espina dorsal extraída del cadáver de un demonio abisal.",
    "Perhaps you could learn from it": "Quizás puedas aprender secretos arcanos al examinar sus restos.",
    "Arrows with tips forged from adamant.": "Flechas con puntas afiladas forjadas en adamantita.",
    "A dense stone used for construction and crafting.": "Una densa piedra utilizada para la construcción y la forja.",
    "Fine limestone ground from limestone.": "Fina piedra caliza molida a partir de roca pura.",
    "Spun from flax, used in crafting bowstrings and cloth.": "Hilado a partir de lino, utilizado para fabricar cuerdas de arco y telas.",
    "Harvested from flax plants, essential for crafting linen and bowstrings.": "Cosechado de plantas de lino, esencial para fabricar lienzos y tensar arcos.",
    "A cloth shoulder bag, contains useful smithing materials.": "Una bolsa de hombro que contiene útiles materiales para la herrería.",
    "A refreshing, fruity drink. Good for hydration.": "Una bebida refrescante y frutal. Excelente para mantener la hidratación en las tierras de Ashenfall.",
    "A source of hydration, tainted by the residue of a cataclysmic event.": "Una fuente de hidratación, contaminada por las secuelas de un cataclismo antiguo.",
    "A mysterious porous rock used as a base for powerful runes.": "Una misteriosa roca porosa utilizada como catalizador base para la inscripción de runas.",
    "Made from spun corpse cotton. Can be used as a bow string and in stitching weapons and gear.": "Fabricado con algodón cadavérico hilado. Sirve como cuerda de arco y para el refuerzo de armas y equipo.",
    "A symbol of blustering winds.": "Un símbolo de vientos tempestuosos, catalizador de la magia de aire.",
    "A symbol of the earth's might, essential for earth-based magic.": "Un símbolo del poder titánico de la tierra, esencial para la magia elemental terrestre.",
    "A symbol of flowing waters, essential for water-based magic and other spells.": "Un símbolo de aguas puras y fluidas, indispensable para conjuros de agua.",
    "A symbol of fire's burning wrath, used in combat spells.": "Un símbolo de la furia ígnea ardiente, usado para lanzar destructivos hechizos de fuego.",
    "Resource needed for teleportation.": "Recurso arcano indispensable para conjurar hechizos de teletransporte.",
    "Nature runes are used for casting transmutation spells.": "Las runas de naturaleza permiten lanzar hechizos de transmutación y alquimia orgánica.",
    "Astral runes are used for casting advanced magic spells and attacks.": "Las runas astrales canalizan la magia cósmica para lanzar hechizos y ataques místicos avanzados.",
    "A book filled with knowledge on how to bind anima within rune essence.": "Un tomo repleto de sabiduría ancestral sobre cómo canalizar el ánima dentro de la esencia rúnica.",
    "Equippable as ammo when using a magic weapon.": "Equipable como munición al empuñar un arma de magia arcana."
  };

  if (EXACT[d]) return EXACT[d];

  // Regex patterns
  let res = d;
  res = res
    .replace(/^A sharp ([a-z\s]+) made of ([a-z\s]+)\./i, 'Una afilada arma forjada en $2.')
    .replace(/^A sturdy ([a-z\s]+) made of ([a-z\s]+)\./i, 'Un resistente $1 fabricado en $2.')
    .replace(/^A heavy ([a-z\s]+) made of ([a-z\s]+)\./i, 'Un pesado $1 fabricado en $2.')
    .replace(/^A pair of ([a-z\s]+) made of ([a-z\s]+)\./i, 'Un par de $1 fabricados en $2.')
    .replace(/^A set of ([a-z\s]+) forged from ([a-z\s]+)\./i, 'Un conjunto de $1 forjado a partir de $2.')
    .replace(/^Arrows with tips forged from ([a-z\s]+)\./i, 'Flechas con puntas forjadas en $1.')
    .replace(/^Bolts forged from ([a-z\s]+)\./i, 'Pernos con puntas forjadas en $1.')
    .replace(/^A bar of refined ([a-z\s]+)\./i, 'Una barra de $1 refinada en la forja.')
    .replace(/^Ore mined from ([a-z\s]+) rocks\./i, 'Mena extraída de yacimientos de $1.')
    .replace(/^Ore mined from ([a-z\s]+)\./i, 'Mena extraída de vetas de $1.')
    .replace(/^A raw ([a-z\s]+)\. Should be cooked before eating\./i, 'Un ejemplar de $1 crudo. Debe cocinarse antes de ingerirse.')
    .replace(/^Freshly cooked ([a-z\s]+)\./i, 'Plato recién cocinado de $1.')
    .replace(/^Restores ([0-9]+) hitpoints\./i, 'Restaura $1 puntos de salud al consumirse.')
    .replace(/^Increases your ([a-z\s]+) by ([0-9]+) for a short time\./i, 'Aumenta tu $1 en $2 temporalmente.')
    .replace(/^Used in the ([a-z\s]+) skill\./i, 'Utilizado en el entrenamiento de la habilidad de $1.')
    .replace(/^Used to craft ([a-z\s]+)\./i, 'Utilizado para fabricar $1.')
    .replace(/^Can be used to craft ([a-z\s]+)\./i, 'Se puede usar para elaborar $1.')
    .replace(/^Used in smithing ([a-z\s]+)\./i, 'Utilizado en la forja de herrería.')
    .replace(/^Used in crafting ([a-z\s]+)\./i, 'Utilizado en la artesanía.')
    .replace(/^A vestige of (.*?)\. Perhaps you could learn from it\./i, 'Un vestigio de $1. Quizás puedas aprender algo útil al examinarlo.')
    .replace(/^Perhaps you could learn something from it\./i, 'Quizás puedas aprender algo útil de ello.')
    .replace(/^Perhaps you could learn from it\./i, 'Quizás puedas aprender algo de ello.')
    .replace(/forged from/gi, 'forjado a partir de')
    .replace(/crafted from/gi, 'elaborado con')
    .replace(/restores health/gi, 'restaura salud')
    .replace(/restores energy/gi, 'restaura energía')
    .replace(/increases attack/gi, 'aumenta el ataque')
    .replace(/increases strength/gi, 'aumenta la fuerza')
    .replace(/increases defence/gi, 'aumenta la defensa')
    .replace(/increases magic/gi, 'aumenta la magia')
    .replace(/increases ranged/gi, 'aumenta el ataque a distancia')
    .replace(/smelted in a furnace/gi, 'fundido en un alto horno')
    .replace(/brewed in a cauldron/gi, 'elaborado en un caldero')
    .replace(/cooked on a fire/gi, 'cocinado en una hoguera');

  // Metal translations inside sentences
  res = res
    .replace(/\badamant\b/gi, 'adamantita')
    .replace(/\bmithril\b/gi, 'mithril')
    .replace(/\bsteel\b/gi, 'acero')
    .replace(/\biron\b/gi, 'hierro')
    .replace(/\bbronze\b/gi, 'bronce')
    .replace(/\brune\b/gi, 'runita')
    .replace(/\bdragon\b/gi, 'dragón')
    .replace(/\bblack metal\b/gi, 'metal negro')
    .replace(/\bblurite\b/gi, 'blurita')
    .replace(/\bobsidian\b/gi, 'obsidiana');

  return res;
}

// Deep Journal / Códice Narrative Translator
function translateJournalDeep(journal, item) {
  if (!journal) return '';
  let j = cleanWiki(journal);

  // Common narrative snippets & intros in Dragonwilds
  j = j
    // Specific iconic items
    .replace(/Little is known about the great necromancer, Abraxus, a fact he finds deeply frustrating\./i, 'Poco se sabe sobre el gran nigromante Abraxus, un hecho que a él le resulta profundamente frustrante.')
    .replace(/In his youth he sought secrets forbidden to others and he wandered the Whispering Swamps of Brynmoor/i, 'En su juventud buscó secretos prohibidos para los demás y vagó por los Pantanos Susurrantes de Brynmoor')
    .replace(/The swamp was ancient and haunted, so the legends went/i, 'El pantano era antiguo y estaba embrujado, según contaban las leyendas')
    .replace(/He explored vaults, caves and battled goblins in the mists/i, 'Exploró criptas, cavernas y combatió trasgos entre las brumas')
    .replace(/Until one day, he found the smoke that promised him the power he so desperately craved\./i, 'Hasta que un día, halló el humo que le prometió el poder que tan desesperadamente anhelaba.')
    .replace(/He founded a small order of necromancers in Fellhollow and took advantage of the chaos when the Withering began\./i, 'Fundó una pequeña orden de nigromantes en Fellhollow y aprovechó el caos cuando comenzó el Marchitamiento.')
    .replace(/His ring, imbued with his dark power, offers no value to him any more\. So he bequeaths it to you\./i, 'Su anillo, imbuido de su poder oscuro, ya no tiene valor para él. Por eso te lo lega a ti.')
    .replace(/The abyssal demon is a foul beast\. A single one can massacre a village before the warning bell can even sound\./i, 'El demonio abisal es una bestia inmunda. Uno solo puede masacrar una aldea entera antes de que la campana de alarma llegue a sonar.')
    .replace(/Crafting a weapon from their remains symbolises humanity conquering the horrors that lurk in the dark\./i, 'Forjar un arma a partir de sus restos simboliza la victoria de la humanidad sobre los horrores que acechan en la oscuridad.')
    .replace(/The spinal column of an abyssal demon\. A monstrous creature from between the gaps in reality\./i, 'La columna vertebral de un demonio abisal. Una criatura monstruosa procedente de las grietas de la realidad.')
    .replace(/It pulses with hatred, and you’re convinced it wriggles/i, 'Palpita con odio puro, y estás convencido de que aún se retuerce')
    .replace(/The remnants of an abyssal demon\. Fine ashes, infused with malice\./i, 'Los restos de un demonio abisal. Finas cenizas, impregnadas de pura malicia.')
    .replace(/Not great for the skin, despite what Doric will tell you\./i, 'No muy buenas para la piel, a pesar de lo que Doric te diga.')
    .replace(/We've all heard of it\. We've all wanted it\.\.\. the Legendary Abyssal Whip!/i, 'Todos hemos oído hablar de él. Todos lo hemos deseado... ¡el legendario Látigo Abisal!')
    .replace(/The fabled weapon that heroes and adventurers have been seeking for an age!/i, '¡La legendaria arma que héroes y aventureros han buscado durante eras!')

    // Common narrative phrases across all journals
    .replace(/A weapon forged during the ancient wars of Ashenfall\./gi, 'Un arma forjada durante las antiguas guerras de Ashenfall.')
    .replace(/Found buried deep within the ruins of/gi, 'Hallado enterrado en las profundidades de las ruinas de')
    .replace(/Crafted by the master smiths of/gi, 'Elaborado por los maestros herreros de')
    .replace(/Infused with the fiery breath of/gi, 'Imbuido con el aliento abrasador de')
    .replace(/Used by the ancient guardians to protect/gi, 'Utilizado por los antiguos guardianes para proteger')
    .replace(/Legends speak of a warrior who wielded this/gi, 'Las leyendas hablan de un guerrero legendario que empuñó este artefacto')
    .replace(/In the age before the Withering/gi, 'En la era previa al Marchitamiento')
    .replace(/Carries the memories of fallen heroes\./gi, 'Alberga las memorias y el espíritu de los héroes caídos.')
    .replace(/A relic preserved through generations\./gi, 'Una reliquia preservada a través de incontables generaciones.')
    .replace(/Forged in the heart of a volcano/gi, 'Forjado en el corazón ardiente de un volcán')
    .replace(/Tempered in the blood of dragons/gi, 'Templado en la sangre de antiguos dragones')
    .replace(/The inscription on the hilt reads/gi, 'La inscripción grabada en la empuñadura reza')
    .replace(/An ancient artifact from a forgotten era\./gi, 'Un artefacto ancestral procedente de una era olvidada.')
    .replace(/Provides great power to those worthy enough to wield it\./gi, 'Otorga un inmenso poder a aquellos que sean dignos de empuñarlo.')
    .replace(/Recovered from the depths of the dungeon\./gi, 'Recuperado de las profundidades más oscuras de la mazmorra.')
    .replace(/A testament to the craftsmanship of the dwarves\./gi, 'Un testimonio de la maestría artesanal de los enanos.')
    .replace(/A symbol of power, bravery, and resilience\./gi, 'Un símbolo indiscutible de poder, valentía y resistencia.')
    .replace(/Beware of the dark curse that lingers within\./gi, 'Ten cuidado con la oscura maldición que aún perdura en su interior.');

  return j;
}

console.log('Applying deep translation to all descriptions and codex lore entries...');
let countDescs = 0;
let countJournals = 0;

for (const item of items) {
  const oldDesc = item.description;
  const newDesc = translateDescriptionDeep(item.description, item);
  if (newDesc && newDesc !== oldDesc) {
    item.description = newDesc;
    countDescs++;
  }

  const oldJournal = item.journal;
  const newJournal = translateJournalDeep(item.journal, item);
  if (newJournal && newJournal !== oldJournal) {
    item.journal = newJournal;
    countJournals++;
  }
}

fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf-8');
console.log(`Successfully translated ${countDescs} descriptions and ${countJournals} codex/journal lore entries!`);
