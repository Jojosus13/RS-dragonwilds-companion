import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const debugDataPath = path.resolve(__dirname, '../data/debug_vault_data.json');
const outputPath = path.resolve(__dirname, '../../src/data/vaults.json');

// Helper script to compile rich vaults.json
async function generateVaultsJson() {
  const debugData = JSON.parse(fs.readFileSync(debugDataPath, 'utf8'));
  const imageMap = debugData.imageMap || {};

  function getImg(name) {
    if (!name) return '';
    const clean = name.replace(/^File:/, '').trim();
    return imageMap[clean] ||
      imageMap[clean.toLowerCase()] ||
      imageMap[clean.replace(/ /g, '_')] ||
      imageMap[clean.replace(/_/g, ' ')] ||
      `https://dragonwilds.runescape.wiki/images/${encodeURIComponent(clean)}`;
  }

  const vaults = [
    {
      id: 'crasorak-kara',
      name: 'Crasorak Kara',
      title: 'Crasorak Kara',
      region: 'Temple Woods (Bosque del Templo)',
      regionKey: 'brynmoor',
      powerLevel: 2,
      dangerLevel: 'Bajo',
      releaseDate: '15 de Abril 2025',
      update: 'RuneScape: Dragonwilds is out!',
      coords: { x: 138, y: 755 },
      mapMarkerId: 'vault-0',
      wikiUrl: 'https://dragonwilds.runescape.wiki/w/Crasorak_Kara',
      mainImage: getImg('Crasorak_Kara.png'),
      summary: 'Crasorak Kara es la primera bóveda de Dragonkin, situada en la parte suroriental del Bosque del Templo. Al ser la bóveda inicial de la región de Brynmoor, presenta enemigos más asequibles, peligros mecánicos básicos y 3 Núcleos de Bóveda (Vault Cores) esenciales para comenzar a desbloquear tecnología ancestral.',
      hazards: [
        {
          name: 'Chorros de Fuego (Fire Jets)',
          type: 'Trampa de Fuego',
          description: 'Llamaradas intermitentes en pasillos estrechos. Es necesario rodar en el momento justo para cruzar sin sufrir quemaduras graves.'
        },
        {
          name: 'Pinchos de Suelo (Spike Traps)',
          type: 'Trampa Mecánica',
          description: 'Placas de pinchos retráctiles en forma de diamante. Los laterales junto a la pared tienen menos densidad de pinchos y son más seguros para esquivar.'
        }
      ],
      enemies: {
        standard: [
          { name: 'Rata Gigante (Giant Rat)', amount: '9', level: '2' },
          { name: 'Guardián Coloso (Vault Guardian Hulk)', amount: '4', level: '2' },
          { name: 'Centinela de Bóveda (Vault Guardian Sentinel)', amount: '3', level: '2' },
          { name: 'Enano Goblin (Goblin Runt)', amount: '2', level: '2' }
        ],
        boss: {
          name: 'Señor Supremo de la Bóveda (Vault Overlord)',
          amount: '1',
          level: '2 (Jefe)',
          description: 'Versión titánica del Guardián Coloso con mayor reserva de vida y ataques demoledores en área.'
        }
      },
      notableLoot: [
        {
          name: 'Núcleos de Bóveda (Vault Cores)',
          type: 'Material de Forja Ancestral',
          description: '3 núcleos repartidos por la mazmorra (pesan 50 kg cada uno). Requeridos para piedras guía y recetas de alto nivel.'
        },
        {
          name: 'Fragmentos de Bóveda (Vault Shards)',
          type: 'Componente Mágico',
          description: 'Material arcanos obtenido al derrotar guardianes y abrir cofres.'
        }
      ],
      recipes: [],
      resources: {
        nodes: ['Ventila de Ánima (Anima Vent)', 'Roca de Esencia Rúnica', 'Peñasco de Piedra'],
        other: ['4 Cofres de Tesoro', '3 Núcleos de Bóveda (Vault Core)']
      },
      chests: [
        {
          id: 1,
          title: 'Cofre 1: Pasillo Sur (Bajo la Escalera)',
          instructions: 'Al avanzar por el pasillo sur, en la sala a la izquierda con dos ratas gigantes, encontrarás este cofre escondido tras las escaleras.',
          image: getImg('Crasorak Southern hallway.png'),
          caption: 'Cofre escondido tras los escalones de la sala sur'
        },
        {
          id: 2,
          title: 'Cofre 2: Sala Principal Multinivel',
          instructions: 'Debajo de la pasarela de entrada en la gran cámara de los 3 Colosos guardianes, hay un cofre en el rincón inferior.',
          image: getImg('Crasorak Large room chest.png'),
          caption: 'Cofre en el nivel inferior de la cámara principal'
        },
        {
          id: 3,
          title: 'Cofre 3: Sala del Núcleo y Estatua',
          instructions: 'Tras derrotar a los 3 centinelas a distancia, a la izquierda de la estatua de Dragonkin donde se encuentra el núcleo.',
          image: getImg('Crasorak Core Chest.png'),
          caption: 'Cofre en la esquina izquierda tras la columna'
        },
        {
          id: 4,
          title: 'Cofre 4: Tesoro Opcional de los Goblins',
          instructions: 'Tira de la palanca del camino sur, sortea las trampas de fuego y derrota a los 2 goblins para acceder a este cofre secreto.',
          image: getImg('Crasorak Goblin Treasure.png'),
          caption: 'Tesoro resguardado por goblins tras la reja opcional'
        },
        {
          id: 5,
          title: 'Cofre 5: Botín Final del Jefe',
          instructions: 'En la cámara del Señor Supremo de la Bóveda (Vault Overlord), junto al último Núcleo de Bóveda.',
          image: getImg('Crasorak Final Loot.png'),
          caption: 'Cofre del tesoro final tras vencer al Overlord'
        }
      ]
    },
    {
      id: 'thishepen-kara',
      name: 'Thishepen Kara',
      title: 'Thishepen Kara',
      region: 'Bramblemead Valley (Valle de Zarzamel)',
      regionKey: 'brynmoor',
      powerLevel: 2,
      dangerLevel: 'Bajo',
      releaseDate: '15 de Abril 2025',
      update: 'RuneScape: Dragonwilds is out!',
      coords: { x: 95, y: 659 },
      mapMarkerId: 'vault-1',
      wikiUrl: 'https://dragonwilds.runescape.wiki/w/Thishepen_Kara',
      mainImage: getImg('Thishepen_Kara.png'),
      summary: 'Thishepen Kara se encuentra en las inmediaciones del Gremio de Runecrafting en Bramblemead Valley. Su entrada requiere un salto acrobático (Leap) sobre un saliente rocoso. Es una bóveda compacta centrada en ratas y guardianes elementales.',
      hazards: [
        {
          name: 'Salto de Acceso (Leap Requirement)',
          type: 'Navegación',
          description: 'La entrada está en una cornisa elevada accesible mediante impulso de salto sobre la pared.'
        }
      ],
      enemies: {
        standard: [
          { name: 'Rata Gigante (Giant Rat)', amount: '6', level: '2' },
          { name: 'Guardián Coloso (Vault Guardian Hulk)', amount: '3', level: '2' },
          { name: 'Centinela de Bóveda (Vault Guardian Sentinel)', amount: '2', level: '2' }
        ],
        boss: {
          name: 'Arconte de la Bóveda (Vault Archon)',
          amount: '1',
          level: '2 (Jefe)',
          description: 'Guardián de combate que canaliza proyectiles arcanos y defiende el núcleo.'
        }
      },
      notableLoot: [
        {
          name: 'Núcleos de Bóveda (Vault Cores)',
          type: 'Material de Forja Ancestral',
          description: '3 Núcleos de tecnología Dragonkin.'
        },
        {
          name: 'Planos de Muebles & Decoración Garou',
          type: 'Planos de Construcción',
          description: 'Planos arcanos de antorchas y estandartes.'
        }
      ],
      recipes: [],
      resources: {
        nodes: ['Ventila de Ánima', 'Roca de Esencia Rúnica', 'Peñasco de Piedra'],
        other: ['Cofres de Bóveda', '3 Núcleos de Bóveda']
      },
      chests: [
        {
          id: 1,
          title: 'Cofre de Entrada Thishepen',
          instructions: 'En la primera antecámara tras el salto de entrada, custodiado por ratas.',
          image: getImg('Thishepen_Kara.png'),
          caption: 'Cofre inicial en la antecámara'
        }
      ]
    },
    {
      id: 'vertentis-kara',
      name: 'Vertentis Kara',
      title: 'Vertentis Kara',
      region: 'Whispering Swamp (Pantano Susurrante)',
      regionKey: 'whispering-wetlands',
      powerLevel: 2,
      dangerLevel: 'Bajo - Medio',
      releaseDate: '15 de Abril 2025',
      update: 'RuneScape: Dragonwilds is out!',
      coords: { x: 277, y: 647 },
      mapMarkerId: 'vault-2',
      wikiUrl: 'https://dragonwilds.runescape.wiki/w/Vertentis_Kara',
      mainImage: getImg('Vertentis_Kara.png'),
      summary: 'Ubicada en la parte oriental del Pantano Susurrante. Alberga una gran población de ratas de pantano, reyes rata y la codiciada receta del Escudo Anti-dragón (Anti-dragon shield).',
      hazards: [
        {
          name: 'Niebla del Pantano & Trampas de Espinas',
          type: 'Entorno Tóxico',
          description: 'Visibilidad reducida en ciertas cámaras y trampas mecánicas ocultas en el fango.'
        }
      ],
      enemies: {
        standard: [
          { name: 'Rata Gigante (Giant Rat)', amount: '12', level: '2' },
          { name: 'Guardián Coloso (Vault Guardian Hulk)', amount: '7', level: '2' },
          { name: 'Centinela de Bóveda (Vault Guardian Sentinel)', amount: '5', level: '2' },
          { name: 'Rey de la Plaga (Plague King)', amount: 'Varios', level: '2' },
          { name: 'Rey Rata (Rat King)', amount: '1', level: '2' }
        ],
        boss: {
          name: 'Rey Rata & Colosos de Vertentis',
          amount: '1',
          level: '2 (Jefe)',
          description: 'Encuentro combinado en la cámara central del pantano subterráneo.'
        }
      },
      notableLoot: [
        {
          name: 'Receta: Escudo Anti-dragón (Anti-dragon shield)',
          type: 'Receta de Herrería / Crafteo',
          description: 'Imprescindible para protegerse del aliento de dragones verdes y dragones ancianos.'
        }
      ],
      recipes: [
        {
          name: 'Escudo Anti-dragón (Anti-dragon shield)',
          type: 'Protección',
          description: 'Desbloqueable interactuando con la efigie de Dragonkin.'
        }
      ],
      resources: {
        nodes: ['Ventila de Ánima', 'Yacimiento de Arcilla (Clay node)', 'Roca de Esencia Rúnica', 'Peñasco de Piedra'],
        plants: ['Harralander', 'Marrentil'],
        other: ['Cofres de Bóveda', '3 Núcleos de Bóveda']
      },
      chests: [
        {
          id: 1,
          title: 'Cofre del Pantano Vertentis',
          instructions: 'En la cámara del fondo del pantano, custodiado por el Rey Rata.',
          image: getImg('Vertentis_Kara.png'),
          caption: 'Cofre del tesoro de Vertentis Kara'
        }
      ]
    },
    {
      id: 'takla-kara',
      name: 'Takla Kara',
      title: 'Takla Kara',
      region: 'Fractured Plains (Llanura Quebrada)',
      regionKey: 'ghornfell',
      powerLevel: 3,
      dangerLevel: 'Medio',
      releaseDate: '15 de Abril 2025',
      update: 'RuneScape: Dragonwilds is out!',
      coords: { x: 203, y: 576 },
      mapMarkerId: 'vault-3',
      wikiUrl: 'https://dragonwilds.runescape.wiki/w/Takla_Kara',
      mainImage: getImg('Takla_Kara.png'),
      summary: 'Situada en una meseta en la parte occidental de Llanura Quebrada. Su entrada está bloqueada por enormes rocas que deben ser minadas con pico. Es la única localización de todo Ashenfall donde se encuentran vetas de Mineral Blurita (Blurite Ore). Además, contiene las recetas del Set de Armadura de Paladín y el Arco Corto de Explorador.',
      hazards: [
        {
          name: 'Entrada Bloqueada por Rocas',
          type: 'Obstáculo Físico',
          description: 'Requiere llevar un pico equipado o en el inventario para minar las rocas de la entrada.'
        },
        {
          name: 'Incinerador Arcano',
          type: 'Trampas de Fuego Continuo',
          description: 'Zonas con llamaradas circulares activadas por palancas.'
        }
      ],
      enemies: {
        standard: [
          { name: 'Rata Gigante (Giant Rat)', amount: '5', level: '3' },
          { name: 'Guardián Coloso (Vault Guardian Hulk)', amount: '4', level: '3' },
          { name: 'Centinela de Bóveda (Vault Guardian Sentinel)', amount: '6', level: '3' }
        ],
        boss: {
          name: 'Incinerador de la Bóveda (Vault Incinerator)',
          amount: '1',
          level: '3 (Jefe)',
          description: 'Guardián con poderosos ataques ígneos y resistencia a proyectiles.'
        }
      },
      notableLoot: [
        {
          name: 'Vetas de Blurita (Blurite Ore Node)',
          type: 'Recurso Exclusivo',
          description: 'Único lugar de todo Ashenfall para extraer mineral de blurita.'
        },
        {
          name: 'Set de Paladín (Paladin Armour Set)',
          type: 'Set de Armadura Tier 3',
          description: 'Yelmo de Paladín, Coraza de Paladín y Perneras de Paladín.'
        },
        {
          name: 'Arco de Explorador Salvaje (Wild Scout Shortbow)',
          type: 'Arma a Distancia',
          description: 'Arco rápido de gran precisión para arqueros.'
        }
      ],
      recipes: [
        { name: 'Yelmo de Paladín (Paladin\'s helm)', type: 'Armadura' },
        { name: 'Coraza de Paladín (Paladin\'s platebody)', type: 'Armadura' },
        { name: 'Perneras de Paladín (Paladin platelegs)', type: 'Armadura' },
        { name: 'Arco Corto de Explorador (Wild scout\'s shortbow)', type: 'Arma' }
      ],
      resources: {
        nodes: ['Mineral de Blurita (Blurite Ore - Exclusivo)', 'Ventila de Ánima', 'Cobre', 'Hierro', 'Estaño', 'Esencia Rúnica'],
        plants: ['Arbusto de Dwellberry'],
        other: ['Cofres de Bóveda', '3 Núcleos de Bóveda']
      },
      chests: [
        {
          id: 1,
          title: 'Cofre de la Meseta de Takla',
          instructions: 'En la cámara profunda tras minar la entrada y derrotar al Vault Incinerator.',
          image: getImg('Takla_Kara.png'),
          caption: 'Cofre de Takla Kara'
        }
      ]
    },
    {
      id: 'skeklac-kara',
      name: 'Skeklac Kara',
      title: 'Skeklac Kara',
      region: "Fractured Plains (Puesto de Ashien / Ashien's Watch)",
      regionKey: 'ghornfell',
      powerLevel: 4,
      dangerLevel: 'Medio - Alto',
      releaseDate: '15 de Abril 2025',
      update: 'RuneScape: Dragonwilds is out!',
      coords: { x: 363, y: 482 },
      mapMarkerId: 'vault-4',
      wikiUrl: 'https://dragonwilds.runescape.wiki/w/Skeklac_Kara',
      mainImage: getImg('Skeklac_Kara.png'),
      summary: 'Situada al noreste de Llanura Quebrada, al norte del Puesto de Ashien. La puerta está sellada por un ritual y requiere activar 4 estatuas de Dragonkin en Ashien\'s Watch. Es clave en la misión "Granite Mauled", donde se recupera el plano del Mazo de Granito (Granite Maul) para Doric.',
      hazards: [
        {
          name: 'Plantas Explosivas (Exploding Plant Traps)',
          type: 'Trampa Biológica',
          description: 'Esporas que estallan al acercarse infligiendo daño y veneno. Se recomienda llevar pociones antiveneno o comida resistente.'
        },
        {
          name: 'Candado de Estatuas',
          type: 'Mecanismo de Apertura',
          description: 'Para abrir la entrada es obligatorio interactuar con las 4 estatuas alrededor de Ashien\'s Watch.'
        }
      ],
      enemies: {
        standard: [
          { name: 'Rata Pútrida (Putrid Rat)', amount: '8', level: '4' },
          { name: 'Guardián Coloso (Vault Guardian Hulk)', amount: '7', level: '4' },
          { name: 'Centinela de Bóveda (Vault Guardian Sentinel)', amount: '4', level: '4' }
        ],
        boss: {
          name: 'Corruptor de la Bóveda (Vault Corruptor)',
          amount: '1',
          level: '4 (Jefe)',
          description: 'Coloso imbuido de magia corrupta y veneno.'
        }
      },
      notableLoot: [
        {
          name: 'Receta: Mazo de Granito (Granite Maul)',
          type: 'Arma Contundente Pesada',
          description: 'Se desbloquea al completar la misión "Granite Mauled" con Doric tras obtener el plano en la bóveda.'
        }
      ],
      recipes: [
        {
          name: 'Mazo de Granito (Granite Maul)',
          type: 'Arma',
          description: 'Requiere completar la misión Granite Mauled.'
        }
      ],
      resources: {
        nodes: ['Ventila de Ánima', 'Cobre', 'Hierro', 'Estaño', 'Esencia Rúnica', 'Piedra'],
        other: ['Cofres de Bóveda', '3 Núcleos de Bóveda']
      },
      chests: [
        {
          id: 1,
          title: 'Cofre de Skeklac Kara',
          instructions: 'En la antecámara del jefe tras sortear las plantas explosivas y ratas pútridas.',
          image: getImg('Skeklac_Kara.png'),
          caption: 'Cofre de Skeklac Kara'
        }
      ]
    },
    {
      id: 'kletterbuja-kara',
      name: 'Kletterbuja Kara',
      title: 'Kletterbuja Kara',
      region: 'Bloodblight Swamp (Pantano Malasangre)',
      regionKey: 'badblood-wetlands',
      powerLevel: 3,
      dangerLevel: 'Medio',
      releaseDate: '15 de Abril 2025',
      update: 'RuneScape: Dragonwilds is out!',
      coords: { x: 314, y: 707 },
      mapMarkerId: 'vault-toxic-wetlands',
      wikiUrl: 'https://dragonwilds.runescape.wiki/w/Kletterbuja_Kara',
      mainImage: getImg('Kletterbuja_Kara.png'),
      summary: 'Bóveda oculta en el sur del Pantano Malasangre (Bloodblight Swamp). Contiene las recetas para el Set de Arquero Salvaje (Wild Archer Armour) y una efigie secreta de Dragonkin que enseña la receta del Látigo Abisal (Abyssal Whip) si llevas una Espina Abisal en tu inventario.',
      hazards: [
        {
          name: 'Fango Tóxico y Palancas de Compuerta',
          type: 'Mecanismo de Compuertas',
          description: 'Palancas temporizadas para drenar secciones y cruzar puertas de piedra.'
        }
      ],
      enemies: {
        standard: [
          { name: 'Rata Pútrida (Putrid Rat)', amount: '8', level: '3' },
          { name: 'Guardián Coloso (Vault Guardian Hulk)', amount: '8', level: '3' },
          { name: 'Centinela de Bóveda (Vault Guardian Sentinel)', amount: '6', level: '3' }
        ],
        boss: {
          name: 'Rey de la Plaga (Plague King)',
          amount: '1',
          level: '3 (Jefe)',
          description: 'Rata gigante infestada de miasma venenoso.'
        }
      },
      notableLoot: [
        {
          name: 'Receta Secreta: Látigo Abisal (Abyssal Whip)',
          type: 'Arma Legendaria',
          description: '¡Requiere llevar una Espina Abisal (Abyssal Spine) en el inventario al interactuar con la efigie de Dragonkin!'
        },
        {
          name: 'Set de Arquero Salvaje (Wild Archer Armour Set)',
          type: 'Set de Rango',
          description: 'Capucha, pechera y calzas de arquero salvaje.'
        }
      ],
      recipes: [
        { name: 'Látigo Abisal (Abyssal Whip)', type: 'Arma Especial' },
        { name: 'Capucha de Arquero Salvaje (Wild archer cowl)', type: 'Armadura' },
        { name: 'Cuerpo de Arquero Salvaje (Wild archer body)', type: 'Armadura' },
        { name: 'Perneras de Arquero Salvaje (Wild archer chaps)', type: 'Armadura' }
      ],
      resources: {
        nodes: ['Ventila de Ánima', 'Mineral de Oro', 'Mineral de Plata', 'Esencia Rúnica', 'Piedra'],
        plants: ['Boca de Dragón (Snapdragon)', 'Hierba de Pantano (Swamp weed)', 'Hierba de Sapo (Toadflax)'],
        other: ['Cofres de Bóveda', '3 Núcleos de Bóveda']
      },
      chests: [
        {
          id: 1,
          title: 'Cofre de Kletterbuja Kara',
          instructions: 'En la sala del Rey de la Plaga tras drenar las compuertas.',
          image: getImg('Kletterbuja_Kara.png'),
          caption: 'Cofre en Kletterbuja Kara'
        }
      ]
    },
    {
      id: 'chaktan-kara',
      name: 'Chaktan Kara',
      title: 'Chaktan Kara',
      region: 'Stormtouched Highlands (Tierras Altas de la Tormenta)',
      regionKey: 'stormtouched-highlands',
      powerLevel: 4,
      dangerLevel: 'Medio - Alto',
      releaseDate: '15 de Abril 2025',
      update: 'RuneScape: Dragonwilds is out!',
      coords: { x: 83, y: 493 },
      mapMarkerId: 'vault-highlands',
      wikiUrl: 'https://dragonwilds.runescape.wiki/w/Chaktan_Kara',
      mainImage: getImg('Chaktan_Kara.png'),
      summary: 'Chaktan Kara se encuentra en las montañas de las Tierras Altas de la Tormenta. Para llegar, sigue el río contracorriente hasta el final, corta las enredaderas con un arma cortante y destruye los peñascos. En su interior se aprenden las recetas del Set de Mago Dragonkin y la Daga de Hueso de Dragón.',
      hazards: [
        {
          name: 'Enredaderas y Peñascos de Entrada',
          type: 'Bloqueo Natural',
          description: 'Requiere machete/espada para cortar lianas y pico para demoler rocas.'
        },
        {
          name: 'Trampas de Fuego Piroclástico',
          type: 'Fuego Volcánico',
          description: 'Llamaradas rojas intermitentes en pasillos estrechos.'
        }
      ],
      enemies: {
        standard: [
          { name: 'Rata Gigante (Giant Rat)', amount: '7', level: '4' },
          { name: 'Guardián Coloso (Vault Guardian Hulk)', amount: '7', level: '4' },
          { name: 'Centinela de Bóveda (Vault Guardian Sentinel)', amount: '4', level: '4' }
        ],
        boss: {
          name: 'Piroclasto de la Bóveda (Vault Pyroclast)',
          amount: '1',
          level: '4 (Jefe)',
          description: 'Coloso ardiente que lanza proyectiles de magma.'
        }
      },
      notableLoot: [
        {
          name: 'Daga de Hueso de Dragón (Dragonbone Dagger)',
          type: 'Arma Punzante Rápida',
          description: 'Daga forjada con fragmentos óseos dracónicos.'
        },
        {
          name: 'Set de Togas del Mago Dragonkin',
          type: 'Set Mágico',
          description: 'Capucha, túnica superior y túnica inferior de mago de Dragonkin.'
        }
      ],
      recipes: [
        { name: 'Daga de Hueso de Dragón (Dragonbone dagger)', type: 'Arma' },
        { name: 'Capucha de Mago Dragonkin (Dragonkin mage hood)', type: 'Armadura Mágica' },
        { name: 'Túnica de Mago Dragonkin (Dragonkin mage robes)', type: 'Armadura Mágica' },
        { name: 'Faldón de Mago Dragonkin (Dragonkin mage robe legs)', type: 'Armadura Mágica' }
      ],
      resources: {
        nodes: ['Ventila de Ánima', 'Depósito de Granito', 'Hierro', 'Esencia Rúnica', 'Piedra'],
        plants: ['Arbusto de Dwellberry'],
        other: ['Cofres de Bóveda', '3 Núcleos de Bóveda']
      },
      chests: [
        {
          id: 1,
          title: 'Cofre de Chaktan Kara',
          instructions: 'En la cámara del Piroclasto, junto a las efigies que otorgan las togas de mago.',
          image: getImg('Chaktan Kara (location).png'),
          caption: 'Entrada y cofre de Chaktan Kara'
        }
      ]
    },
    {
      id: 'kalistrakthen-kara',
      name: 'Kalistrakthen Kara',
      title: 'Kalistrakthen Kara',
      region: 'Emberwood (Fellhollow)',
      regionKey: 'fellhollow-frostbound',
      powerLevel: 5,
      dangerLevel: 'Alto',
      releaseDate: '15 de Diciembre 2025',
      update: 'Eye on Ashenfall - 0.10',
      coords: { x: 98, y: 166 },
      mapMarkerId: 'vault-fellhollow-1',
      wikiUrl: 'https://dragonwilds.runescape.wiki/w/Kalistrakthen_Kara',
      mainImage: getImg('Kalistrakthen_Kara.png'),
      summary: 'Situada en el extremo occidental de Emberwood en Fellhollow, al norte de un pequeño estanque. Esta bóveda cuenta con complejas trampas de rayos eléctricos, fragmentos activos de bóveda que descargan energía y placas de presión. Contiene el Vestigio de la Coraza del Hoplita Caído.',
      hazards: [
        {
          name: 'Fragmento Activo de Bóveda (Active Vault Shard)',
          type: 'Trampa Eléctrica Continua',
          description: 'Cristal flotante que emite arcos eléctricos letales periódicamente. Pégate a las esquinas seguras para evitar las descargas.'
        },
        {
          name: 'Trampas de Rayos de Choque (Shock Ray Trap)',
          type: 'Barrera de Energía',
          description: 'Haces de electricidad que cruzan pasillos. Se desactivan pisando placas de presión.'
        },
        {
          name: 'Placas de Presión (Pressure Plates)',
          type: 'Interruptor de Suelo',
          description: 'Placas cuadradas en el suelo necesarias para abrir compuertas y deshabilitar rayos.'
        }
      ],
      enemies: {
        standard: [
          { name: 'Rata Gigante (Giant Rat)', amount: '9', level: '5' },
          { name: 'Rey Rata (Rat King)', amount: '1', level: '5' },
          { name: 'Guardián Coloso (Vault Guardian Hulk)', amount: '13', level: '5' },
          { name: 'Centinela de Bóveda (Vault Guardian Sentinel)', amount: '4', level: '5' }
        ],
        boss: {
          name: 'Golpeador de la Bóveda (Vault Striker)',
          amount: '1',
          level: '5 (Jefe)',
          description: 'Coloso ágil y letal que ejecuta embestidas de alto impacto.'
        }
      },
      notableLoot: [
        {
          name: 'Vestigio: Coraza del Hoplita Caído (Fallen Hoplite\'s Chest)',
          type: 'Armadura Pesada Tier 5',
          description: 'Oculto tras un muro rompible, se desbloquea hablando con la efigie de Dragonkin junto a la puerta de doble diamante.'
        },
        {
          name: 'Diarios de Lacrussa (Lacrussa Lore Scraps)',
          type: 'Documentos de Historia',
          description: 'Notas, diario y memorias de Lacrussa sobre la caída de los Dragonkin.'
        }
      ],
      recipes: [
        { name: 'Peto del Hoplita Caído (Fallen hoplite\'s chest)', type: 'Armadura' }
      ],
      resources: {
        nodes: ['Ventila de Ánima', 'Hierro', 'Esencia Rúnica', 'Piedra'],
        other: ['6 Cofres de Bóveda', '3 Núcleos de Bóveda']
      },
      chests: [
        {
          id: 1,
          title: 'Cofre 1: Frente a la Plataforma Rota',
          instructions: 'Cofre oculto frente a la plataforma del temporizador rota, custodiado por un coloso inactivo.',
          image: getImg('Kalistrakthen KaraChest1.png'),
          caption: 'Cofre 1 frente a la plataforma'
        },
        {
          id: 2,
          title: 'Cofre 2: Junto al Agujero del Muro',
          instructions: 'Junto a una abertura en la pared en la sección lateral.',
          image: getImg('Kalistrakthen Karachest2.png'),
          caption: 'Cofre 2 junto al orificio en la pared'
        },
        {
          id: 3,
          title: 'Cofre 3: Esquina del Fragmento Activo',
          instructions: 'Párate justo en la esquina para evitar ser electrocutado por el cristal flotante activo.',
          image: getImg('Kalistrakthen Karachest3.png'),
          caption: 'Cofre 3 en la esquina segura del cristal eléctrico'
        },
        {
          id: 4,
          title: 'Cofre 4: Pasillo de Trampas de Choque',
          instructions: 'Protegido por trampas de choque. Activa la placa de presión y el cofre queda a la izquierda.',
          image: getImg('Kalistrakthen Karachest4.png'),
          caption: 'Cofre 4 a la izquierda de la placa de presión'
        },
        {
          id: 5,
          title: 'Cofre 5: Junto a la Palanca',
          instructions: 'Situado inmediatamente a la derecha del mecanismo de palanca que abre el atajo.',
          image: getImg('Kalistrakthen Karachest5.png'),
          caption: 'Cofre 5 a la derecha de la palanca'
        }
      ]
    },
    {
      id: 'skekven-kara',
      name: 'Skekven Kara',
      title: 'Skekven Kara',
      region: 'Lake of Lost Souls Este (Fellhollow)',
      regionKey: 'fellhollow-frostbound',
      powerLevel: 5,
      dangerLevel: 'Alto',
      releaseDate: '15 de Diciembre 2025',
      update: 'Eye on Ashenfall - 0.10',
      coords: { x: 512, y: 177 },
      mapMarkerId: 'vault-fellhollow-3',
      wikiUrl: 'https://dragonwilds.runescape.wiki/w/Skekven_Kara',
      mainImage: getImg('Skekven_Kara.png'),
      summary: 'Situada entre Silverthorn Keep y el Lago de las Almas Perdidas. Doric tiene su campamento montado cerca al oeste. Para abrir la gran puerta de entrada, es imprescindible localizar y activar 4 estatuas/efigies de Dragonkin ocultas en los alrededores de la colina.',
      hazards: [
        {
          name: '4 Efigies Exteriores Requeridas',
          type: 'Puzle de Entrada',
          description: '1) Agujero tras la tienda de Doric (Salto de Viento y minar muro). 2) En altura en lo alto de la cornisa. 3) Tras la columna frente a Doric. 4) En la elevación al oeste.'
        },
        {
          name: 'Trampas de Fuego Ocultas',
          type: 'Llamaradas Dobles',
          description: 'Agáchate o rueda para cruzar; hay trampas en ambos extremos del corredor.'
        }
      ],
      enemies: {
        standard: [
          { name: 'Rata Gigante (Giant Rat)', amount: '4', level: '5' },
          { name: 'Guerrero Esqueleto (Skeletal Warrior)', amount: '5', level: '5' },
          { name: 'Arquero Esqueleto (Skeletal Archer)', amount: '5', level: '5' },
          { name: 'Merodeador Esqueleto (Skeletal Marauder)', amount: '3', level: '5' },
          { name: 'Hoplita Esqueleto (Skeletal Hoplite)', amount: '1', level: '5' },
          { name: 'Nigromante Esqueleto (Skeletal Necromancer)', amount: '1', level: '5' }
        ],
        boss: {
          name: 'Señor Supremo de la Bóveda (Vault Overlord)',
          amount: '1',
          level: '5 (Jefe)',
          description: 'Comandante de las fuerzas esqueléticas del Lago de las Almas.'
        }
      },
      notableLoot: [
        {
          name: 'Vestigio: Grebas del Hoplita Caído (Fallen Hoplite\'s Tassets)',
          type: 'Armadura de Piernas Tier 5',
          description: 'En la gran sala con escalera de caracol, salta a la izquierda antes del puente (junto al Cofre 3).'
        },
        {
          name: 'Vestigio: Arco del Forestal No-Muerto (Undead Ranger\'s Bow)',
          type: 'Arma a Distancia Tier 5',
          description: 'Se encuentra en la misma sala custodiada tras la trampa de fuego del Cofre 6.'
        }
      ],
      recipes: [
        { name: 'Grebas del Hoplita Caído (Fallen hoplite\'s tassets)', type: 'Armadura' },
        { name: 'Arco del Forestal No-Muerto (Undead ranger\'s bow)', type: 'Arma' }
      ],
      resources: {
        nodes: ['Ventila de Ánima', 'Hierro', 'Esencia Rúnica', 'Piedra'],
        other: ['6 Cofres de Bóveda', '3 Núcleos de Bóveda']
      },
      chests: [
        {
          id: 1,
          title: 'Cofre 1: Sala de la Emboscada Esquelética',
          instructions: 'En la gran sala con la emboscada de esqueletos, subiendo las escaleras de piedra.',
          image: getImg('SkekvenKara_chest1.png'),
          caption: 'Cofre 1 tras la emboscada de esqueletos'
        },
        {
          id: 2,
          title: 'Cofre 2: Junto a la Puerta Bloqueada',
          instructions: 'Justo a la derecha de la puerta de piedra bloqueada por escombros.',
          image: getImg('SkekvenKaraChest2.png'),
          caption: 'Cofre 2 junto al vano bloqueado'
        },
        {
          id: 3,
          title: 'Cofre 3: Escalera de Caracol & Grebas de Hoplita',
          instructions: 'En la sala principal con la escalera de caracol, salta a la izquierda justo antes del puente para el cofre y el Vestigio de Grebas de Hoplita Caído.',
          image: getImg('SkekvenKaraChest3.png'),
          caption: 'Cofre 3 con el Vestigio de Grebas de Hoplita'
        },
        {
          id: 4,
          title: 'Cofre 4: Sala Principal (Arriba del Jefe)',
          instructions: 'En la sala principal, arriba y a la izquierda de la gran puerta del jefe.',
          image: getImg('SkekvenKaraChest4.png'),
          caption: 'Cofre 4 sobre la entrada a la cámara del jefe'
        },
        {
          id: 5,
          title: 'Cofre 5: Sala de Estatuas Tras las Escaleras',
          instructions: 'En la cámara de estatuas de Dragonkin, oculta directamente detrás de las escaleras.',
          image: getImg('SkekvenKaraChest5.png'),
          caption: 'Cofre 5 tras las escaleras de la sala de estatuas'
        },
        {
          id: 6,
          title: 'Cofre 6: Tras la Trampa de Fuego & Arco No-Muerto',
          instructions: 'Más allá de la trampa de fuego; asegúrate de agacharte y no apresurarte. Aquí yace también el Vestigio del Arco del Forestal No-Muerto.',
          image: getImg('SkekvenKaraChest6.png'),
          caption: 'Cofre 6 tras la trampa de fuego con el Vestigio del Arco'
        }
      ]
    },
    {
      id: 'vekchenven-kara',
      name: 'Vekchenven Kara',
      title: 'Vekchenven Kara',
      region: 'Lake of Lost Souls Oeste (Fellhollow)',
      regionKey: 'fellhollow-frostbound',
      powerLevel: 5,
      dangerLevel: 'Muy Alto',
      releaseDate: '15 de Diciembre 2025',
      update: 'Eye on Ashenfall - 0.10',
      coords: { x: 377, y: 150 },
      mapMarkerId: 'vault-fellhollow-2',
      wikiUrl: 'https://dragonwilds.runescape.wiki/w/Vekchenven_Kara',
      mainImage: getImg('Vekchenven_Kara.png'),
      summary: 'Vekchenven Kara es una bóveda de Dragonkin oculta bajo una cascada en la región del Lago de las Almas Perdidas. Es relativamente corta pero sumamente técnica: requiere que el jugador entre en estado de Desgarro de Alma (Soul Rifted) a través del Miasma Marchito (Wither) para poder cruzar las Puertas Espectrales y puentes fantasmales. Contiene tres vestigios excepcionales: el Bastón del Nigromante, el Yelmo del Hoplita Caído y la Daga Colmillo de Lobo.',
      hazards: [
        {
          name: 'Miasma Marchito (Wither & Soul Rifting)',
          type: 'Mecánica Dimensional',
          description: 'Permanecer en la sustancia marchita transforma al jugador al estado Desgarrado (Soulrifted), permitiéndole ver y cruzar puertas espectrales, pero exponiéndolo a espíritus infinitos.'
        },
        {
          name: 'Plantas Explosivas Hacia el Vacío',
          type: 'Trampa de Empuje',
          description: 'Dos plantas explosivas colocadas estratégicamente para empujar al jugador directo al miasma o al abismo.'
        },
        {
          name: 'Chorros de Fuego & Pinchos de Lanza',
          type: 'Trampas Combinadas',
          description: 'Pasillos con lanzas emergentes combinadas con chorros continuos de fuego.'
        }
      ],
      enemies: {
        standard: [
          { name: 'Rata Carroñera (Rotridden Rat)', amount: '4', level: '5' },
          { name: 'Lobo Dracónico (Dragon Wolf)', amount: '5', level: '5' },
          { name: 'Nigromante Putrefacto (Rotsworn Necromancer)', amount: '1', level: '5' },
          { name: 'Guardián Coloso (Vault Guardian Hulk)', amount: '1', level: '5' },
          { name: 'Centinela de Bóveda (Vault Guardian Sentinel)', amount: '1', level: '5' },
          { name: 'Guerrero Esqueleto (Skeletal Warrior)', amount: '1', level: '5' },
          { name: 'Centinela de Piedra de Alma (Soulstone Sentinel)', amount: '2', level: '5' },
          { name: 'Zogre', amount: '1', level: '5' }
        ],
        soulrifted: [
          { name: 'Alma Perdida (Lost Soul)', amount: '∞ (Infinito mientras estés en Soul Rift)' },
          { name: 'Lobo Espectral (Ghost Wolf)', amount: '∞ (Infinito mientras estés en Soul Rift)' }
        ],
        boss: {
          name: 'Nigromante Putrefacto & Centinelas de Alma',
          amount: 'Encuentro Clave',
          level: '5',
          description: 'Canalizadores oscuros que protegen los accesos a las puertas espectrales.'
        }
      },
      notableLoot: [
        {
          name: 'Vestigio: Bastón del Nigromante (Necromancer\'s Staff)',
          type: 'Arma Mágica Ancestral',
          description: 'Encontrado en el reino espiritual tras cruzar la primera puerta espectral, custodiado por un centinela de piedra de alma. Interactúa con la efigie de Dragonkin para obtener el plano.'
        },
        {
          name: 'Vestigio: Yelmo del Hoplita Caído (Fallen Hoplite\'s Helm)',
          type: 'Armadura de Cabeza Tier 5',
          description: 'En la sala con la segunda puerta espectral, tras una reja cerrada. La ruta intencionada es cruzar el puente fantasmal en Soulrifted, pero jugadores expertos pueden usar Salto de Viento (Windstep) encadenado a una pequeña cornisa (Ruta Skip / Cheese).'
        },
        {
          name: 'Vestigio: Daga Colmillo de Lobo (Wolfbane Dagger)',
          type: 'Daga Rápida Especial',
          description: 'Se encuentra tras una larga escalada con saltos hasta la cima de la cámara de plataformas.'
        }
      ],
      recipes: [
        { name: 'Bastón del Nigromante (Necromancer\'s staff)', type: 'Arma Mágica' },
        { name: 'Yelmo del Hoplita Caído (Fallen hoplite\'s helm)', type: 'Armadura' },
        { name: 'Daga Colmillo de Lobo (Wolfbane dagger)', type: 'Arma' }
      ],
      resources: {
        nodes: ['Ventila de Ánima', 'Hierro', 'Esencia Rúnica', 'Piedra'],
        other: ['7 Cofres de Bóveda', '3 Núcleos de Bóveda']
      },
      chests: [
        {
          id: 1,
          title: 'Cofre 1: Alcoba Superior de la Entrada',
          instructions: 'Inmediatamente al entrar, mira hacia arriba y a la derecha en una pequeña alcoba. Usa Salto de Viento (Windstep) para alcanzarlo.',
          image: getImg('Vekchenven Karachest1.png'),
          caption: 'Cofre 1 en la alcoba alta de la entrada'
        },
        {
          id: 2,
          title: 'Cofre 2: Rocas Sobre el Miasma Marchito',
          instructions: 'Usa Salto de Viento para saltar sobre las grandes rocas; evita el miasma y sus enemigos espectrales. Hay un área limpia alrededor del cofre para saquearlo sin quedar Desgarrado (Soulrifted).',
          image: getImg('Vekchenven Karachest2.png'),
          caption: 'Cofre 2 sobre las rocas seguras'
        },
        {
          id: 3,
          title: 'Cofre 3: Junto al Puente Espectral',
          instructions: 'A la derecha del puente espectral en la cámara del reino de las almas.',
          image: getImg('Vekchenven Karachest4.png'),
          caption: 'Cofre 3 al lado del puente fantasmal'
        },
        {
          id: 4,
          title: 'Cofre 4: Alcoba Tras el Nigromante',
          instructions: 'Tras derrotar al Nigromante Putrefacto y cruzar el pasaje, mira a la izquierda y usa Salto de Viento hacia la alcoba elevada.',
          image: getImg('Vekchenven Karachest3.png'),
          caption: 'Cofre 4 en la alcoba tras el pasillo del nigromante'
        },
        {
          id: 5,
          title: 'Cofre 5: Pasillo de Lanzas y Fuego',
          instructions: 'A la derecha de las lanzas y chorros de fuego, custodiado por un centinela y un coloso guardián.',
          image: getImg('Vekchenven Karachest5.png'),
          caption: 'Cofre 5 tras el corredor de trampas de fuego'
        },
        {
          id: 6,
          title: 'Cofre 6: Sala de la Reja & Yelmo de Hoplita',
          instructions: 'En la misma sala enrejada donde se encuentra el Vestigio del Yelmo del Hoplita Caído. (Se puede saltar con la técnica de Windstep a la cornisa).',
          image: getImg('Vekchenven Kara cheese route.png'),
          caption: 'Ruta alternativa (Cheese skip) para el Cofre 6 y Yelmo de Hoplita'
        },
        {
          id: 7,
          title: 'Cofre 7: Primera Plataforma de la Cámara Vertical',
          instructions: 'En la sala de plataformas sobre la primera plataforma. Mira a la izquierda y salta a las rocas por el borde de la sala: encontrarás el cofre doblando la esquina.',
          image: getImg('Vekchenven Karachest6.png'),
          caption: 'Cofre 7 doblando la cornisa de la sala vertical'
        }
      ]
    },
    {
      id: 'uzzer-kara',
      name: 'Uzzer Kara (Bóveda de los Espejos)',
      title: 'Uzzer Kara (Pirámide de los Espejos)',
      region: 'Dunes of Uzzer (Umbral Sands)',
      regionKey: 'umbral-sands',
      powerLevel: 7,
      dangerLevel: 'Extremo (Tier 7)',
      releaseDate: '23 de Junio 2026',
      update: 'Eye on Ashenfall - 0.12.0',
      coords: { x: 873, y: 463 },
      mapMarkerId: 'vault-skeklac-east',
      wikiUrl: 'https://dragonwilds.runescape.wiki/w/Dragonkin_Vault',
      mainImage: 'https://dragonwilds.runescape.wiki/images/thumb/Dungeon_entrance_icon.png/300px-Dungeon_entrance_icon.png',
      summary: 'Bóveda ancestral de alta dificultad situada en el complejo de pirámides al norte de las Dunas de Uzzer en las Arenas Sombrías. Contiene tecnología de reflexión de luz mediante espejos solares de la dinastía Kot\'Haar, trampas térmicas y guardianes de nivel 7.',
      hazards: [
        {
          name: 'Calor Extremo & Golpes de Sol (Sunscorch)',
          type: 'Ambiente Desértico',
          description: 'Requiere protección térmica y agua para operar en el exterior de la pirámide.'
        },
        {
          name: 'Puzle de Espejos y Haces de Luz',
          type: 'Mecanismo de Refracción Solar',
          description: 'Gira los espejos de bronce para alinear los haces y desbloquear las compuertas del tesoro.'
        }
      ],
      enemies: {
        standard: [
          { name: 'Guardián del Sol Kot\'Haar', amount: '8', level: '7' },
          { name: 'Centinela de Bóveda Élite', amount: '6', level: '7' }
        ],
        boss: {
          name: 'Titán de los Espejos (Mirror Titan)',
          amount: '1',
          level: '7 (Jefe)',
          description: 'Guardián solar con ataques de radiación y escudos reflectantes.'
        }
      },
      notableLoot: [
        {
          name: 'Tesoros Kot\'Haar & Núcleos de Bóveda',
          type: 'Tecnología de las Arenas',
          description: 'Materiales arcanos para armaduras del desierto y encantamientos solares.'
        }
      ],
      recipes: [],
      resources: {
        nodes: ['Ventila de Ánima', 'Arenisca (Sandstone)', 'Granito', 'Esencia Rúnica'],
        other: ['Cofres de Bóveda Tier 7', '3 Núcleos de Bóveda']
      },
      chests: [
        {
          id: 1,
          title: 'Cofre de la Cámara de Espejos',
          instructions: 'En la cámara central tras resolver la alineación de los 4 espejos solares.',
          image: '',
          caption: 'Cofre de Uzzer Kara'
        }
      ]
    },
    {
      id: 'manafem-kara',
      name: 'Manafem Kara (Bóveda Kalphite)',
      title: 'Manafem Kara (Pirámide Kalphite)',
      region: 'Manafem Plains (Umbral Sands)',
      regionKey: 'umbral-sands',
      powerLevel: 7,
      dangerLevel: 'Extremo (Tier 7)',
      releaseDate: '23 de Junio 2026',
      update: 'Eye on Ashenfall - 0.12.0',
      coords: { x: 570, y: 869 },
      mapMarkerId: 'vault-skeklac-west',
      wikiUrl: 'https://dragonwilds.runescape.wiki/w/Dragonkin_Vault',
      mainImage: 'https://dragonwilds.runescape.wiki/images/thumb/Dungeon_entrance_icon.png/300px-Dungeon_entrance_icon.png',
      summary: 'Bóveda ancestral construida bajo la pirámide al sur de las Llanuras de Manafem. Infestada de enjambres de Kalphites del desierto y guardianes colosales corrompidos por el calor abrasador.',
      hazards: [
        {
          name: 'Nidos de Kalphites & Pozas de Ácido',
          type: 'Peligro Biológico Desértico',
          description: 'Suelos carcomidos por ácido corrosivo y emboscadas continuas de soldados kalphite.'
        }
      ],
      enemies: {
        standard: [
          { name: 'Obrero Kalphite (Kalphite Worker)', amount: '12', level: '7' },
          { name: 'Soldado Kalphite (Kalphite Soldier)', amount: '8', level: '7' },
          { name: 'Guardián Coloso del Desierto', amount: '6', level: '7' }
        ],
        boss: {
          name: 'Reina de la Bóveda de Manafem',
          amount: '1',
          level: '7 (Jefe)',
          description: 'Matriarca kalphite que custodia el relicario central de la pirámide.'
        }
      },
      notableLoot: [
        {
          name: 'Quitina de Kalphite Reforzada & Núcleos',
          type: 'Material de Forja Pesada',
          description: 'Componentes de alta resistencia física.'
        }
      ],
      recipes: [],
      resources: {
        nodes: ['Ventila de Ánima', 'Arenisca', 'Mineral de Oro', 'Esencia Rúnica'],
        other: ['Cofres de Bóveda Tier 7', '3 Núcleos de Bóveda']
      },
      chests: [
        {
          id: 1,
          title: 'Cofre del Relicario de Manafem',
          instructions: 'En la antecámara real tras neutralizar la guardia de soldados kalphite.',
          image: '',
          caption: 'Cofre de Manafem Kara'
        }
      ]
    }
  ];

  fs.writeFileSync(outputPath, JSON.stringify(vaults, null, 2));
  console.log(`Generated src/data/vaults.json with ${vaults.length} vaults!`);
}

generateVaultsJson();
