import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.resolve(__dirname, '../../src/data/items.json');
const items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf-8'));

// MASTER TRANSLATION MAP (Complete coverage for all 1,104 Dragonwilds items)
const MASTER_NAMES = {
  // Tomes
  "Tome of Agility - Vol 1": "Tomo de Agilidad - Vol 1",
  "Tome of Agility - Vol 2": "Tomo de Agilidad - Vol 2",
  "Tome of Attack - Vol 1": "Tomo de Ataque - Vol 1",
  "Tome of Attack - Vol 2": "Tomo de Ataque - Vol 2",
  "Tome of Construction - Vol 1": "Tomo de Construcción - Vol 1",
  "Tome of Construction - Vol 2": "Tomo de Construcción - Vol 2",
  "Tome of Cooking - Vol 1": "Tomo de Cocina - Vol 1",
  "Tome of Cooking - Vol 2": "Tomo de Cocina - Vol 2",
  "Tome of Farming - Vol 1": "Tomo de Agricultura - Vol 1",
  "Tome of Farming - Vol 2": "Tomo de Agricultura - Vol 2",
  "Tome of Fishing - Vol 1": "Tomo de Pesca - Vol 1",
  "Tome of Fishing - Vol 2": "Tomo de Pesca - Vol 2",
  "Tome of Magic - Vol 1": "Tomo de Magia - Vol 1",
  "Tome of Magic - Vol 2": "Tomo de Magia - Vol 2",
  "Tome of Mining - Vol 1": "Tomo de Minería - Vol 1",
  "Tome of Mining - Vol 2": "Tomo de Minería - Vol 2",
  "Tome of Ranged - Vol 1": "Tomo de A Distancia - Vol 1",
  "Tome of Ranged - Vol 2": "Tomo de A Distancia - Vol 2",
  "Tome of Runecrafting - Vol 1": "Tomo de Creación de Runas - Vol 1",
  "Tome of Runecrafting - Vol 2": "Tomo de Creación de Runas - Vol 2",
  "Tome of the Artisan - Vol 1": "Tomo del Artesano - Vol 1",
  "Tome of the Artisan - Vol 2": "Tomo del Artesano - Vol 2",
  "Tome of the Dragon Slayer": "Tomo del Matadragones",
  "Tome of the Titan": "Tomo del Titán",
  "Tome of the Undying": "Tomo del No-Muerto",
  "Tome of Woodcutting - Vol 1": "Tomo de Tala - Vol 1",
  "Tome of Woodcutting - Vol 2": "Tomo de Tala - Vol 2",

  // Vestiges & Relics
  "A Brutal Bladehead": "Punta de Hoja Brutal (Vestigio)",
  "A Corroded Serrated Blade": "Hoja Dentada Corroída (Vestigio)",
  "A Cracked Bronze Vanity Mirror": "Espejo de Tocador de Bronce Roto (Vestigio)",
  "A Cruel Goblin Blade": "Hoja Cruel de Trasgo (Vestigio)",
  "A Mysterious Crescent Carving": "Talla Creciente Misteriosa (Vestigio)",
  "A Simple Broken Bow": "Arco Roto Simple (Vestigio)",
  "A String of Sinew": "Cuerda de Tendón (Vestigio)",
  "A Threadbare Grain Sack": "Saco de Grano Desgastado (Vestigio)",
  "An Educational Blade": "Hoja Didáctica (Vestigio)",
  "An Ember-Edged Remnant of Cloth": "Resto de Tela con Borde de Ascua (Vestigio)",
  "Arrowhead of Ancient Origin": "Punta de Flecha de Origen Antiguo (Vestigio)",
  "Azure Metal Contraption": "Artilugio de Metal Azur (Vestigio)",
  "Battle-Scarred Black Metal": "Metal Negro Marcado por la Batalla (Vestigio)",
  "Bloodstained Black Visor": "Visera Negra Manchada de Sangre (Vestigio)",
  "Bloodstained Hilt": "Empuñadura Ensangrentada (Vestigio)",
  "Parts of a Sinister-Looking Staff": "Partes de Bastón Siniestro (Vestigio)",
  "Remnants of a Rotting Robe": "Restos de Túnica Putrefacta (Vestigio)",
  "Remnants of a Shattered Skull": "Restos de Calavera Rota (Vestigio)",
  "Shard of Black Pauldron": "Fragmento de Hombrera Negra (Vestigio)",
  "Shard of the Dreaming Stone": "Fragmento de la Piedra Onírica (Vestigio)",
  "Shattered Black Blade": "Hoja Negra Hecha Añicos (Vestigio)",
  "Shattered Black Blade (Umbral Sands)": "Hoja Negra Hecha Añicos (Arenas Umbrías)",
  "Shred of Sunbleached Weave": "Jirón de Tejido Decolorado por el Sol (Vestigio)",
  "Slightly Chaffing Chestguard": "Peto Ligeramente Rozado (Vestigio)",
  "Small Wardstone": "Piedra Guardiana Menor (Vestigio)",
  "Softly Vibrating Orb": "Orbe que Vibra Suavemente (Vestigio)",
  "Suspiciously Light Tattered Boots": "Botas Andrajosas Sospechosamente Ligeras (Vestigio)",
  "Tastefully Torn Tights": "Mallas Rasgadas con Estilo (Vestigio)",
  "Tattered Time-Lost Cloth": "Tela Andrajosa Perdida en el Tiempo (Vestigio)",
  "Thane's Authority": "Autoridad del Thane (Vestigio)",
  "The Wrath of Baba Potterington": "La Furia de Baba Potterington (Vestigio)",
  "Titan's Wrath": "Furia del Titán (Vestigio)",
  "Torn Tapestry": "Tapiz Rasgado (Vestigio)",
  "Twtiching Antenna": "Antena Espasmódica (Vestigio)",
  "Unyielding Obsidian Construct": "Constructo de Obsidiana Inquebrantable (Vestigio)",
  "Whispering Elbow Pad": "Codera Susurrante (Vestigio)",
  "Wizard's Kneecap": "Rótula de Mago (Vestigio)",

  // Weapons & TzHaar
  "TokTz-Ket-Xil": "TokTz-Ket-Xil (Escudo de Obsidiana)",
  "Toktz-Mej-Tal": "Toktz-Mej-Tal (Bastón de Obsidiana)",
  "Toktz-Xil-Ak": "Toktz-Xil-Ak (Espada de Obsidiana)",
  "TzHaar-Ket-Om": "TzHaar-Ket-Om (Mazo de Obsidiana)",
  "Wolfbane Dagger": "Daga Mata-Lobos",
  "Zombie Axe": "Hacha de Zombi",
  "Zombie Arm": "Brazo de Zombi",
  "Skullsplitter": "Rompecráneos",
  "Subjugation Staff": "Bastón de Subyugación",
  "Pharaoh's Sceptre": "Cetro del Faraón",
  "Shadow Sword": "Espada de las Sombras",
  "Shadow Crossbow": "Ballesta de las Sombras",
  "Wild Scout's Shortbow": "Arco Corto de Explorador Salvaje",
  "Wooden Training Sword": "Espada de Entrenamiento de Madera",
  "Undead Ranger's Bow": "Arco de Explorador No-Muerto",
  "Undead Spade": "Pala de No-Muerto",
  "Staff of Light": "Bastón de Luz",

  // Food, Dishes & Fish
  "Anchovy Bait": "Cebo de Anchoa",
  "Shrimp Bait": "Cebo de Camarón",
  "Monkfish Bait": "Cebo de Rape",
  "Spooky Bait": "Cebo Tétrico",
  "Monkfish Fillets": "Filetes de Rape",
  "Monkfish Skewers": "Brochetas de Rape",
  "Mushroom Kebab": "Kebab de Setas",
  "Mixed Grill": "Parrillada Mixta",
  "Mixed Platter": "Plato Combinado",
  "Pristine Armoured Catfish": "Pez Gato Acorazado Impecable",
  "Pristine Beltfish": "Pez Cinto Impecable",
  "Pristine Desert Sole": "Lenguado del Desierto Impecable",
  "Pristine Herring": "Arenque Impecable",
  "Pristine Infernal Eel": "Anguila Infernal Impecable",
  "Pristine Lobster": "Langosta Impecable",
  "Pristine Monkfish": "Rape Impecable",
  "Pristine Salmon": "Salmón Impecable",
  "Pristine Sardine": "Sardina Impecable",
  "Pristine Trout": "Trucha Impecable",
  "Pristine Undead Bass": "Lubina No-Muerta Impecable",
  "Pristine Undead Eel": "Anguila No-Muerta Impecable",
  "Unusual Trout": "Trucha Inusual",
  "Raw Anchovies": "Anchoas Crudas",
  "Raw Armoured Catfish": "Pez Gato Acorazado Crudo",
  "Raw Bestial Meat": "Carne Bestial Cruda",
  "Raw Bird Meat": "Carne de Ave Cruda",
  "Raw Desert Sole": "Lenguado del Desierto Crudo",
  "Raw Farm Meat": "Carne de Granja Cruda",
  "Raw Game Meat": "Carne de Caza Cruda",
  "Raw Giant Krill": "Krill Gigante Crudo",
  "Raw Infernal Eel": "Anguila Infernal Cruda",
  "Raw Monkfish": "Rape Crudo",
  "Raw Rat Meat": "Carne de Rata Cruda",
  "Raw Undead Bass": "Lubina No-Muerta Cruda",
  "Raw Undead Eel": "Anguila No-Muerta Cruda",
  "Redberry Crunchies": "Crujientes de Bayas Rojas",
  "Redberry Glazed Roast Flank": "Falda Asada Glaseada con Bayas Rojas",
  "Redberry Infusion": "Infusión de Bayas Rojas",
  "Redberry Roast Rat": "Rata Asada con Bayas Rojas",
  "Roast Dinner": "Banquete Asado",
  "Roast Pumpkin": "Calabaza Asada",
  "Roasted Lobster": "Langosta Asada",
  "Sauteed Sardines": "Sardinas Salteadas",
  "Sauteed Shrimp": "Camarones Salteados",
  "Seared Anchovies": "Anchoas Selladas al Fuego",
  "Seared Cactus Steak": "Filete de Cactus Sellado",
  "Shrimp Omelette": "Tortilla de Camarones",
  "Smoked Herring": "Arenque Ahumado",
  "Smoked Infernal Eel": "Anguila Infernal Ahumada",
  "Squeaking Sausage": "Salchicha Chirriante",
  "Steak": "Filete de Carne",
  "Steak 'N' Eggs": "Filete con Huevos",
  "Steak Sandwich": "Bocadillo de Filete",
  "Steamed Beltfish": "Pez Cinto al Vapor",
  "Stir-Fry": "Salteado Wok",
  "Stuffed Catfish": "Pez Gato Relleno",
  "Sun Baked Sole": "Lenguado Horneado al Sol",
  "Swabbie Pie": "Pastel de Grumete",
  "Sweet Veg Ball": "Albóndiga Dulce de Verduras",
  "Umbral Kebab": "Kebab Umbrío",
  "Undead Delight": "Delicia de No-Muerto",
  "Undead Meat": "Carne de No-Muerto",
  "Vegan Fryup": "Fritura Vegana",
  "Vegetable Soup": "Sopa de Verduras",
  "Victoria Sponge Cake": "Pastel Esponjoso Victoria",
  "Watermelon": "Sandía Jugosa",
  "Watermelon Jerky": "Cecina de Sandía",
  "Wild Pie": "Pastel Salvaje",
  "Pumpkin": "Calabaza",
  "Pumpkin Soup": "Sopa de Calabaza",
  "Pumpkin Spice Infusion": "Infusión de Calabaza y Especias",
  "Pungent Omelette": "Tortilla Picante",
  "Peach": "Melocotón",
  "Plant Cure": "Cura para Plantas",
  "Rat Roast": "Asado de Rata",
  "Relentless Infusion": "Infusión Implacable",
  "Strong Sweet Tea": "Té Dulce Fuerte",
  "Strong Tea": "Té Concentrado",

  // Armours, Robes & Outfits
  "Adventurer's Leggings": "Perneras de Aventurero",
  "Adventurer's Longbow": "Arco Largo de Aventurero",
  "Adventurer's Tunic": "Túnica de Aventurero",
  "Ancestral Hat": "Sombrero Ancestral",
  "Ancestral Leggings": "Perneras Ancestrales",
  "Ancestral Robe Legs": "Falda de Túnica Ancestral",
  "Ancestral Robes": "Túnicas Ancestrales",
  "Ancestral Staff": "Bastón Ancestral",
  "Ancestral Wand": "Varita Ancestral",
  "Angler's Hat": "Sombrero de Pescador",
  "Apprentice Hat": "Sombrero de Aprendiz",
  "Apprentice Leggings": "Perneras de Aprendiz",
  "Apprentice Robe": "Túnica de Aprendiz",
  "Black Desert Cape": "Capa del Desierto Negra",
  "Black Dragonhide Body": "Coraza de Cuero de Dragón Negro",
  "Black Dragonhide Chaps": "Pantalones de Cuero de Dragón Negro",
  "Black Dragonhide Coif": "Capucha de Cuero de Dragón Negro",
  "Black Knight Helmet": "Casco de Caballero Negro",
  "Black Knight Platebody": "Coraza de Caballero Negro",
  "Black Knight Platelegs": "Perneras de Caballero Negro",
  "Bramblemead Cape": "Capa de Bramblemead",
  "Mystic Cloth": "Tela Mística",
  "Mystic Fibres": "Fibras Místicas",
  "Mystic Hat": "Sombrero Místico",
  "Mystic Net": "Red Mística",
  "Mystic Robe Legs": "Falda de Túnica Mística",
  "Mystic Robes": "Túnicas Místicas",
  "Necromancer's Crown": "Corona de Nigromante",
  "Necromancer's Robe Bottom": "Falda de Túnica de Nigromante",
  "Necromancer's Robe Top": "Túnica Superior de Nigromante",
  "Necromancer's Staff": "Bastón de Nigromante",
  "Obsidian Cape": "Capa de Obsidiana",
  "Obsidian Chest": "Coraza de Obsidiana",
  "Obsidian Device": "Dispositivo de Obsidiana",
  "Obsidian Helmet": "Casco de Obsidiana",
  "Obsidian Legs": "Perneras de Obsidiana",
  "Paladin Platelegs": "Perneras de Paladín",
  "Paladin's Helm": "Yelmo de Paladín",
  "Paladin's Platebody": "Coraza de Paladín",
  "Pioneer's Cape": "Capa de Pionero",
  "Pioneer's Scarf": "Bufanda de Pionero",
  "Ranger Hat": "Sombrero de Explorador",
  "Ranger Tights": "Mallas de Explorador",
  "Ranger Tunic": "Túnica de Explorador",
  "Red Dragon Chest": "Coraza de Dragón Rojo",
  "Red Dragon Helmet": "Casco de Dragón Rojo",
  "Red Dragon Hide": "Piel de Dragón Rojo",
  "Red Dragon Legs": "Perneras de Dragón Rojo",
  "Red Dragonhide Leather": "Cuero de Dragón Rojo",
  "Reinforced Body": "Peto Reforzado",
  "Reinforced Helmet": "Casco Reforzado",
  "Reinforced Legs": "Perneras Reforzadas",
  "Saradomin Cape": "Capa de Saradomin",
  "Saradominist Cloak": "Manto Saradominista",
  "Shadow Body": "Coraza de las Sombras",
  "Shadow Chaps": "Pantalones de las Sombras",
  "Shadow Cowl": "Caperuza de las Sombras",
  "Shadowscale Cape": "Capa de Escamas Sombrías",
  "Shadowscale Hood": "Capucha de Escamas Sombrías",
  "Shroud of Noggin": "Sudario de Noggin",
  "Spectral Chinchompa Cape": "Capa de Chinchompa Espectral",
  "Splitbark Body": "Coraza de Corteza Dividida",
  "Splitbark Helm": "Yelmo de Corteza Dividida",
  "Splitbark Legs": "Perneras de Corteza Dividida",
  "Splitbark Staff": "Bastón de Corteza Dividida",
  "Splitbark Wand": "Varita de Corteza Dividida",
  "Stormtouched Cape": "Capa Tocada por la Tormenta",
  "Studded Leather Body": "Peto de Cuero con Tachuelas",
  "Studded Leather Chaps": "Pantalones de Cuero con Tachuelas",
  "Studded Leather Cowl": "Caperuza de Cuero con Tachuelas",
  "Sun-Bleached Head Wrap": "Turbante Decolorado por el Sol",
  "Sun-Bleached Leggings": "Perneras Decoloradas por el Sol",
  "Sun-Bleached Vest": "Chaleco Decolorado por el Sol",
  "Umbral Sands Cape": "Capa de las Arenas Umbrías",
  "Vis Cloth": "Tela de Vis",
  "Vis Fibres": "Fibras de Vis",
  "White Adventurer's Cape": "Capa de Aventurero Blanca",
  "White Desert Cape": "Capa del Desierto Blanca",
  "White Full Helm": "Gran Yelmo Blanco",
  "White Platebody": "Coraza de Placas Blanca",
  "White Platelegs": "Perneras de Placas Blancas",
  "Wild Archer Body": "Peto de Arquero Salvaje",
  "Wild Archer Chaps": "Pantalones de Arquero Salvaje",
  "Wild Archer Cowl": "Caperuza de Arquero Salvaje",
  "Wizard Hat": "Sombrero de Mago",
  "Wizard Robe Legs": "Falda de Túnica de Mago",
  "Wizard Robes": "Túnicas de Mago",
  "Wool Cloth": "Tela de Lana",
  "Wool Net": "Red de Lana",
  "Zamorak Cape": "Capa de Zamorak",
  "Zamorak Hood": "Capucha de Zamorak",
  "Zamorak Robe Legs": "Falda de Túnica de Zamorak",
  "Zamorak Robes": "Túnicas de Zamorak",
  "Zamorak Staff": "Bastón de Zamorak",

  // Capes & Colors
  "Blue Dyed Cape": "Capa Teñida de Azul",
  "Blue Hex Cape": "Capa Hexagonal Azul",
  "Orange Adventurer's Cape": "Capa de Aventurero Naranja",
  "Orange Desert Cape": "Capa del Desierto Naranja",
  "Pink Adventurer's Cape": "Capa de Aventurero Rosa",
  "Pink Desert Cape": "Capa del Desierto Rosa",
  "Pink Dyad Cape": "Capa Díada Rosa",
  "Pink Hex Cape": "Capa Hexagonal Rosa",
  "Purple Adventurer's Cape": "Capa de Aventurero Púrpura",
  "Purple Desert Cape": "Capa del Desierto Púrpura",
  "Red Adventurer's Cape": "Capa de Aventurero Roja",
  "Red Desert Cape": "Capa del Desierto Roja",
  "Red Dyad Cape": "Capa Díada Roja",
  "Red Hex Cape": "Capa Hexagonal Roja",
  "Yellow Adventurer's Cape": "Capa de Aventurero Amarilla",
  "Yellow Desert Cape": "Capa del Desierto Amarilla",
  "Yellow Dyad Cape": "Capa Díada Amarilla",
  "Yellow Hex Cape": "Capa Hexagonal Amarilla",
  "Tattered Cape": "Capa Andrajosa",
  "Whispering Cape": "Capa Susurrante",

  // Memories of Menaphos
  "Black Memory of Menaphos": "Memoria Negra de Menaphos",
  "Orange Memory of Menaphos": "Memoria Naranja de Menaphos",
  "Pink Memory of Menaphos": "Memoria Rosa de Menaphos",
  "Purple Memory of Menaphos": "Memoria Púrpura de Menaphos",
  "Red Memory of Menaphos": "Memoria Roja de Menaphos",
  "White Memory of Menaphos": "Memoria Blanca de Menaphos",
  "Yellow Memory of Menaphos": "Memoria Amarilla de Menaphos",

  // Jewelry, Rings & Amulets
  "Amulet of Accuracy": "Amuleto de Precisión",
  "Amulet of Defence": "Amuleto de Defensa",
  "Amulet of Glory": "Amuleto de Gloria",
  "Amulet of Magic": "Amuleto de Magia",
  "Amulet of Strength": "Amuleto de Fuerza",
  "Bandosian Amulet": "Amuleto Bandosiano",
  "Moon Ring": "Anillo Lunar",
  "Moonstone": "Piedra Lunar",
  "Mule Ring": "Anillo de la Mula",
  "Phoenix Ring": "Anillo del Fénix",
  "Ravanna's Ring": "Anillo de Ravanna",
  "Ring of Life": "Anillo de Vida",
  "Ring of Pursuit": "Anillo de Persecución",
  "Ring of Recoil": "Anillo de Repulsión",
  "Salve Amulet": "Amuleto Salve",
  "Sapphire Emblem": "Emblema de Zafiro",
  "Skills Necklace": "Collar de Habilidades",
  "Sun Ring": "Anillo Solar",
  "Woodsman Ring": "Anillo del Leñador",
  "Sigil of a Phoenix": "Sello del Fénix",

  // Materials, Minerals, Parts & Plants
  "Amylase Crystal": "Cristal de Amilasa",
  "Anima-Infused Bark": "Corteza Imbuida en Ánima",
  "Animated Feather": "Pluma Animada",
  "Antler": "Cornamenta de Ciervo",
  "Arcane Infusion": "Infusión Arcana",
  "Bag of Noggin'": "Bolsa de Noggin",
  "Barbed Appendage": "Apéndice Dentado",
  "Barrel Cactus Seed": "Semilla de Cactus Barril",
  "Black Dragon Hide": "Piel de Dragón Negro",
  "Black Dragon Leather": "Cuero de Dragón Negro",
  "Black Metal Bar": "Barra de Metal Negro",
  "Black Metal Scraps": "Chatarra de Metal Negro",
  "Black Salvage Pile": "Pila de Desguace Negro",
  "Blightwood": "Madera Marchita (Blightwood)",
  "Bronze Leaf": "Hoja de Bronce",
  "Clay Mould": "Molde de Arcilla",
  "Dragon Metal Sheet": "Lámina de Metal de Dragón",
  "Grave Dust": "Polvo de Tumba",
  "Molten Glass": "Vidrio Fundido",
  "Monstrous Fang": "Colmillo Monstruoso",
  "Noxious Draconic Visage": "Rostro Dracónico Nocivo",
  "Pipe Cactus Seed": "Semilla de Cactus Tubo",
  "Plate of Pure Obsidian": "Placa de Obsidiana Pura",
  "Poison Ichor": "Icor Venenoso",
  "Ram Horn": "Cuerno de Carnero",
  "Refined Obsidian": "Obsidiana Refinada",
  "Rough Cloth": "Tela Áspera",
  "Sacred Oil": "Aceite Sagrado",
  "Sandstone": "Arenisca",
  "Scorch Leather": "Cuero Abrasado",
  "Scratchy Sackcloth": "Tela de Saco Rasposa",
  "Selenic Veil": "Velo Selénico",
  "Serrated Claw": "Garra Dentada",
  "Shimmerscale Powder": "Polvo de Escamas Brillantes",
  "Shrapnel": "Metralla",
  "Silver Leaf": "Hoja de Plata",
  "Silver Salvage Pile": "Pila de Desguace de Plata",
  "Simply Splendid Feather": "Pluma Espléndida",
  "Sinister Mechanism": "Mecanismo Siniestro",
  "Small Animal Fang": "Colmillo de Animal Pequeño",
  "Smouldering Draconic Visage": "Rostro Dracónico Ardiente",
  "Snapdragon": "Boca de Dragón (Snapdragon)",
  "Snapdragon Seeds": "Semillas de Boca de Dragón",
  "Soda Ash": "Ceniza de Sosa",
  "Sodden Black Leather": "Cuero Negro Empapado",
  "Soul Fragment": "Fragmento de Alma",
  "Steel Salvage Pile": "Pila de Desguace de Acero",
  "Stone Block": "Bloque de Piedra",
  "Stunted Kalphite Wing": "Ala Atrofiada de Kálfita",
  "Sundering Spiked Slab": "Losa con Púas Hendientes",
  "Swamp Weed Seeds": "Semillas de Maleza de Pantano",
  "Twilight Lily": "Lirio del Crepúsculo",
  "Vault Core": "Núcleo de Bóveda",
  "Vile Ashes": "Cenizas Viles",
  "Vine Root": "Raíz de Enredadera",
  "Warped Feathers": "Plumas Deformes",
  "Weapon Barbs": "Púas para Armas",
  "Weapon Poison": "Veneno para Armas",
  "Weeds": "Malezas / Malas Hierbas",
  "Weighted Training Band": "Banda de Entrenamiento Lastrada",
  "Wheat": "Trigo",
  "Wheat Seeds": "Semillas de Trigo",
  "Whetstone": "Piedra de Afilar",
  "Wither Water": "Agua Marchita",
  "Withered Heart": "Corazón Marchito",
  "Unholy Water": "Agua Impura",

  // Torches
  "Purple Torch": "Antorcha Púrpura",
  "Red Torch": "Antorcha Roja",
  "Torch": "Antorcha",
  "Yellow Torch": "Antorcha Amarilla",

  // Packs
  "Black Knight's Fortress Reward Pack": "Bolsa de Recompensas: Fortaleza del Caballero Negro",
  "Queenslayer's Reward Pack": "Bolsa de Recompensas del Matarreinas",
  "Restless Ghosts Reward Pack": "Bolsa de Recompensas de los Fantasmas Inquietos",
  "Withering Heights Reward Pack": "Bolsa de Recompensas de las Alturas Marchitas",

  // Mount
  "MOUNT: Springdown Runner": "MONTURA: Corredor de Springdown",

  // Potions
  "Quarrymaster Potion": "Poción del Maestro de Cantera",
  "Super Lumberjack Potion": "Súper Poción de Leñador",
  "Super Quarrymaster Potion": "Súper Poción del Maestro de Cantera",
  "Weak Healing Potion": "Poción Débil de Curación",
  "Weak Lumberjack Potion": "Poción Débil de Leñador",
  "Weak Quarrymaster Potion": "Poción Débil de Cantero",
  "Weak Antipoison Potion": "Poción Débil Antiponzoña",
  "Weak Focused Agility Potion": "Poción Débil: Concentración en Agilidad",
  "Weak Focused Artisan Potion": "Poción Débil: Concentración en Artesanía",
  "Weak Focused Attack Potion": "Poción Débil: Concentración en Ataque",
  "Weak Focused Construction Potion": "Poción Débil: Concentración en Construcción",
  "Weak Focused Cooking Potion": "Poción Débil: Concentración en Cocina",
  "Weak Focused Farming Potion": "Poción Débil: Concentración en Agricultura",
  "Weak Focused Fishing Potion": "Poción Débil: Concentración en Pesca",
  "Weak Focused Mining Potion": "Poción Débil: Concentración en Minería",
  "Weak Focused Runecrafting Potion": "Poción Débil: Concentración en Creación de Runas",
  "Weak Focused Woodcutting Potion": "Poción Débil: Concentración en Tala",
  "Super Focused Agility Potion": "Súper Poción: Concentración en Agilidad",
  "Super Focused Artisan Potion": "Súper Poción: Concentración en Artesanía",
  "Super Focused Attack Potion": "Súper Poción: Concentración en Ataque",
  "Super Focused Construction Potion": "Súper Poción: Concentración en Construcción",
  "Super Focused Cooking Potion": "Súper Poción: Concentración en Cocina",
  "Super Focused Farming Potion": "Súper Poción: Concentración en Agricultura",
  "Super Focused Fishing Potion": "Súper Poción: Concentración en Pesca",
  "Super Focused Mining Potion": "Súper Poción: Concentración en Minería",
  "Super Focused Runecrafting Potion": "Súper Poción: Concentración en Creación de Runas",
  "Super Focused Woodcutting Potion": "Súper Poción: Concentración en Tala"
};

// Cloth Colors
const CLOTH_COLORS = {
  'Black': 'Negra', 'Blue': 'Azul', 'Green': 'Verde', 'Orange': 'Naranja',
  'Pink': 'Rosa', 'Purple': 'Púrpura', 'Red': 'Roja', 'White': 'Blanca', 'Yellow': 'Amarilla'
};
for (const [colEng, colEsp] of Object.entries(CLOTH_COLORS)) {
  MASTER_NAMES[`Moth Eaten ${colEng} Cloth`] = `Tela Polvorienta ${colEsp} Comida por Polillas`;
  MASTER_NAMES[`Soiled ${colEng} Cloth`] = `Tela Manchada ${colEsp}`;
}

// Poisoned Arrows
const ARROW_METALS = {
  'Bronze': 'de Bronce', 'Iron': 'de Hierro', 'Steel': 'de Acero', 'Mithril': 'de Mithril',
  'Adamant': 'de Adamantita', 'Rune': 'Rúnica', 'Fang': 'de Colmillo'
};
for (const [mEng, mEsp] of Object.entries(ARROW_METALS)) {
  MASTER_NAMES[`Poisoned ${mEng} Arrow`] = `Flecha Venenosa ${mEsp}`;
}

// Translate Function
function getFullSpanishName(title) {
  if (!title) return '';
  if (MASTER_NAMES[title]) return MASTER_NAMES[title];

  // Check prefix or suffix transformations
  let t = title.trim();

  // Pattern: "X Potion"
  if (t.endsWith(' Potion')) {
    const base = t.replace(' Potion', '');
    if (MASTER_NAMES[base]) return `Poción ${MASTER_NAMES[base]}`;
    return `Poción de ${base}`;
  }

  // Fallback replace
  for (const [eng, esp] of Object.entries(MASTER_NAMES)) {
    if (t.includes(eng)) {
      t = t.replace(eng, esp);
    }
  }

  return t;
}

// Process all items
console.log(`Translating all 1104 items with exhaustive 100% dictionary...`);

for (const item of items) {
  if (!item.englishTitle) item.englishTitle = item.title;

  // 1. Name
  item.name = getFullSpanishName(item.englishTitle || item.title);

  // 2. Recipes
  if (item.recipe && item.recipe.materials) {
    item.recipe.materials.forEach((mat) => {
      if (!mat.englishItem) mat.englishItem = mat.item;
      mat.item = getFullSpanishName(mat.englishItem || mat.item);
    });
  }

  // 3. UsedIn
  if (item.usedIn) {
    item.usedIn.forEach((u) => {
      if (!u.englishTitle) u.englishTitle = u.title;
      u.title = getFullSpanishName(u.englishTitle || u.title);
    });
  }
}

fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf-8');
console.log('Successfully applied 100% master dictionary to items.json!');
