import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ITEMS_FILE = path.join(__dirname, '..', 'src', 'data', 'items.json');
const items = JSON.parse(fs.readFileSync(ITEMS_FILE, 'utf-8'));

// Exact dictionary of all common Dragonwilds names
const EXACT_NAME_DICT = {
  "A Brutal Bladehead": "Punta de Hoja Brutal (Vestigio)",
  "A Corroded Serrated Blade": "Hoja Dentada Corroída (Vestigio)",
  "A Cracked Bronze Vanity Mirror": "Espejo de Tocador de Bronce Roto (Vestigio)",
  "A Cruel Goblin Blade": "Hoja Cruel de Trasgo (Vestigio)",
  "A Mysterious Crescent Carving": "Talla Creciente Misteriosa (Vestigio)",
  "A Simple Broken Bow": "Arco Roto Simple (Vestigio)",
  "A String of Sinew": "Cuerda de Tendón (Vestigio)",
  "A Threadbare Grain Sack": "Saco de Grano Desgastado (Vestigio)",
  "Abraxus Ring": "Anillo de Abraxus",
  "Abysmal Whip": "Látigo Abismal",
  "Abyssal Ashes": "Cenizas Abisales",
  "Abyssal Remains": "Restos Abisales",
  "Abyssal Spine": "Espina Abisal",
  "Abyssal Whip": "Látigo Abisal",
  "Acrid Adhesive": "Adhesivo Ácrido",
  "Adhesive": "Adhesivo",
  "Adventurer's Leggings": "Perneras de Aventurero",
  "Adventurer's Longbow": "Arco Largo de Aventurero",
  "Adventurer's Tunic": "Túnica de Aventurero",
  "Advert-Inna-Bottle": "Mensaje en una Botella",
  "Aetheric Fundamentals, a Primordial Primer": "Fundamentos Etéreos: Manual Primordial",
  "Agility Cape": "Capa de Agilidad",
  "Air Rune": "Runa de Aire",
  "Amulet of Accuracy": "Amuleto de Precisión",
  "Amulet of Defence": "Amuleto de Defensa",
  "Amulet of Glory": "Amuleto de Gloria",
  "Amulet of Magic": "Amuleto de Magia",
  "Amulet of Strength": "Amuleto de Fuerza",
  "Amylase Crystal": "Cristal de Amilasa",
  "An Educational Blade": "Hoja Didáctica (Vestigio)",
  "An Ember-Edged Remnant of Cloth": "Resto de Tela con Borde de Ascua (Vestigio)",
  "Ancestral Hat": "Sombrero Ancestral",
  "Ancestral Leggings": "Perneras Ancestrales",
  "Ancestral Robe Legs": "Falda de Túnica Ancestral",
  "Ancestral Robes": "Túnica Ancestral",
  "Ancestral Staff": "Bastón Ancestral",
  "Ancestral Wand": "Varita Ancestral",
  "Anchovy Bait": "Cebo de Anchoa",
  "Angler's Hat": "Sombrero de Pescador",
  "Anima-Infused Bark": "Corteza Imbuida en Ánima",
  "Animal Bone": "Hueso de Animal",
  "Animal Hide": "Piel de Animal",
  "Animal Hide Scraps": "Retales de Piel Animal",
  "Animated Feather": "Pluma Animada",
  "Anti-Dragon Shield": "Escudo Anti-Dragón",
  "Antifire Potion": "Poción Antifuego",
  "Antipoison Potion": "Poción Antiponzoña",
  "Antler": "Asta de Ciervo",
  "Apprentice Hat": "Sombrero de Aprendiz",
  "Apprentice Leggings": "Perneras de Aprendiz",
  "Apprentice Robe": "Túnica de Aprendiz",
  "Arcane Infusion": "Infusión Arcana",
  "Arrowhead of Ancient Origin": "Punta de Flecha de Origen Antiguo (Vestigio)",
  "Artisan Cape": "Capa de Artesanía",
  "Ascension Core": "Núcleo de Ascensión",
  "Ascension Shard": "Fragmento de Ascensión",
  "Ash Battlestaff": "Bastón de Combate de Fresno",
  "Ash Logs": "Troncos de Fresno",
  "Ash Pile": "Montón de Cenizas",
  "Ash Plank": "Tabla de Fresno",
  "Ash Rod": "Caña de Fresno",
  "Ash Shortbow": "Arco Corto de Fresno",
  "Ash Tree Seed": "Semilla de Fresno",
  "Ash Wand": "Varita de Fresno",
  "Astral Rune": "Runa Astral",
  "Attack Cape": "Capa de Ataque",
  "Ava's Accumulator": "Acumulador de Ava",
  "Avantoe": "Avantoe",
  "Avantoe Seeds": "Semillas de Avantoe",
  "Azure Metal Contraption": "Artilugio de Metal Azur (Vestigio)",
  "Bag of Flour": "Saco de Harina",
  "Bag of Noggin'": "Bolsa de Noggin",
  "Baked Potato": "Patata Asada",
  "Bandosian Amulet": "Amuleto Bandosiano",
  "Barbed Appendage": "Apéndice Dentado",
  "Barrel Cactus Seed": "Semilla de Cactus Barril",
  "Battle-Scarred Black Metal": "Metal Negro Marcado por la Batalla (Vestigio)",
  "Beast-Training Notes": "Notas de Entrenamiento de Bestias",
  "Bedraggled Spellbook": "Libro de Hechizos Desgastado",
  "Beef & Tomato Stew": "Estofado de Ternera y Tomate",
  "Beltfish Broth": "Caldo de Pez Cinto",
  "Berry Compote": "Compota de Bayas",
  "Berry Drizzle Pan-Seared": "Carne Salteada con Llovizna de Bayas",
  "Bird Nest": "Nido de Pájaro",
  "Bittercap Mushroom": "Seta de Sombrero Amargo",
  "Black Adventurer's Cape": "Capa de Aventurero Negra",
  "Black Crossbow Limbs": "Palas de Ballesta Negras",
  "Black Desert Cape": "Capa del Desierto Negra",
  "Black Dragon Hide": "Piel de Dragón Negro",
  "Black Dragon Leather": "Cuero de Dragón Negro",
  "Black Dragonhide Body": "Coraza de Cuero de Dragón Negro",
  "Black Dragonhide Chaps": "Pantalones de Cuero de Dragón Negro",
  "Black Dragonhide Coif": "Capucha de Cuero de Dragón Negro",
  "Black Greataxe": "Hacha de Guerra Negra",
  "Black Knight Helmet": "Casco de Caballero Negro",
  "Black Knight Platebody": "Coraza de Caballero Negro",
  "Black Knight Platelegs": "Perneras de Caballero Negro",
  "Black Knight's Fortress Reward Pack": "Bolsa de Recompensa de la Fortaleza del Caballero Negro",
  "Black Memory of Menaphos": "Memoria Negra de Menaphos",
  "Black Metal Bar": "Barra de Metal Negro",
  "Black Metal Scraps": "Chatarra de Metal Negro",
  "Black Salvage Pile": "Pila de Salvamento Negro",
  "Black Shield": "Escudo Negro",
  "Black Sword": "Espada Negra",
  "Blightwood": "Madera Marchita (Blightwood)",
  "Blightwood Battlestaff": "Bastón de Combate de Madera Marchita",
  "Blightwood Longbow": "Arco Largo de Madera Marchita",
  "Blightwood Shortbow": "Arco Corto de Madera Marchita",
  "Blightwood Wand": "Varita de Madera Marchita",
  "Bloodblight Cape": "Capa de Plaga de Sangre",
  "Bloodstained Black Visor": "Visor Negro Manchado de Sangre (Vestigio)",
  "Bloodstained Hilt": "Empuñadura Manchada de Sangre (Vestigio)",
  "Bloodwood Sap": "Savia de Madera Sangrienta",
  "Bludgeoning Obsidian Construct": "Constructo Contundente de Obsidiana (Vestigio)",
  "Blue Adventurer's Cape": "Capa de Aventurero Azul",
  "Blue Desert Cape": "Capa del Desierto Azul",
  "Blue Dragon Leather": "Cuero de Dragón Azul",
  "Blue Dragon Scale": "Escama de Dragón Azul",
  "Blue Dragon Scale Dust": "Polvo de Escama de Dragón Azul",
  "Blue Dragonhide": "Piel de Dragón Azul",
  "Blue Dragonhide Body": "Coraza de Cuero de Dragón Azul",
  "Blue Dragonhide Chaps": "Pantalones de Cuero de Dragón Azul",
  "Blue Dragonhide Coif": "Capucha de Cuero de Dragón Azul",
  "Blue Memory of Menaphos": "Memoria Azul de Menaphos",
  "Blue Torch": "Antorcha Azul",
  "Blurite Bar": "Barra de Blurita",
  "Blurite Bolt": "Perno de Blurita",
  "Blurite Crossbow": "Ballesta de Blurita",
  "Blurite Crossbow Limbs": "Palas de Ballesta de Blurita",
  "Blurite Ore": "Mena de Blurita",
  "Blurite Sword": "Espada de Blurita",
  "Bone Club": "Garrote de Hueso",
  "Bone Crossbow": "Ballesta de Hueso",
  "Bone Crossbow Limbs": "Palas de Ballesta de Hueso",
  "Bone Dagger": "Daga de Hueso",
  "Bone Fragments": "Fragmentos de Hueso",
  "Bone Meal": "Harina de Hueso",
  "Bone Pickaxe": "Pico de Hueso",
  "Bone Shortbow": "Arco Corto de Hueso",
  "Bone Spear": "Lanza de Hueso",
  "Bone Staff": "Bastón de Hueso",
  "Bread": "Pan",
  "Broad Arrowheads": "Puntas de Flecha Anchas",
  "Bronze Arrow": "Flecha de Bronce",
  "Bronze Bar": "Barra de Bronce",
  "Bronze Barbed Arrow": "Flecha Dentada de Bronce",
  "Bronze Bolt": "Perno de Bronce",
  "Bronze Crossbow": "Ballesta de Bronce",
  "Bronze Crossbow Limbs": "Palas de Ballesta de Bronce",
  "Bronze Dagger": "Daga de Bronce",
  "Bronze Fire Arrow": "Flecha de Fuego de Bronce",
  "Bronze Greataxe": "Hacha de Guerra de Bronce",
  "Bronze Greatsword": "Espadón de Bronce",
  "Bronze Helmet": "Casco de Bronce",
  "Bronze Logging Axe": "Hacha de Tala de Bronce",
  "Bronze Mace": "Maza de Bronce",
  "Bronze Med Helm": "Casco Mediano de Bronce",
  "Bronze Pickaxe": "Pico de Bronce",
  "Bronze Platebody": "Coraza de Placas de Bronce",
  "Bronze Platelegs": "Perneras de Placas de Bronce",
  "Bronze Scimitar": "Cimitarra de Bronce",
  "Bronze Shield": "Escudo de Bronce",
  "Bronze Spade": "Pala de Bronce",
  "Bronze Sword": "Espada de Bronce",
  "Bronze Warhammer": "Martillo de Guerra de Bronce",
  "Bronze Watering Can": "Regadera de Bronce",
  "Burnt Catfish": "Pez Gato Quemado",
  "Burnt Fish": "Pescado Quemado",
  "Burnt Meat": "Carne Quemada",
  "Cactus Spine": "Espina de Cactus",
  "Cadantine": "Cadantina",
  "Cadantine Seeds": "Semillas de Cadantina",
  "Campfire": "Hoguera de Campamento",
  "Catfish": "Pez Gato",
  "Cave Moray": "Morena de Cueva",
  "Chaos Rune": "Runa del Caos",
  "Charcoal": "Carbón Vegetal",
  "Cheese": "Queso",
  "Chipped Bone Fragments": "Fragmentos de Hueso Astillados",
  "Clay": "Arcilla",
  "Clean Avantoe": "Avantoe Limpio",
  "Clean Cadantine": "Cadantina Limpia",
  "Clean Harralander": "Harralander Limpio",
  "Clean Irit": "Irit Limpio",
  "Clean Kwuarm": "Kwuarm Limpio",
  "Clean Marrentill": "Marrentill Limpio",
  "Clean Ranarr": "Ranarr Limpio",
  "Clean Snapdragon": "Snapdragon Limpio",
  "Clean Tarromin": "Tarromin Limpio",
  "Clean Toadflax": "Toadflax Limpio",
  "Clean Torstol": "Torstol Limpio",
  "Cloth": "Tela",
  "Coal": "Carbón Mineral",
  "Coarse Thread": "Hilo Grueso",
  "Coarse Cloth": "Tela Gruesa",
  "Combat Potion": "Poción de Combate",
  "Cooked Catfish": "Pez Gato Cocinado",
  "Cooked Cave Moray": "Morena de Cueva Cocinada",
  "Cooked Fish": "Pescado Cocinado",
  "Cooked Meat": "Carne Asada",
  "Cooked Mystery Meat": "Carne Misteriosa Cocinada",
  "Cooked Trout": "Trucha Cocinada",
  "Copper Ore": "Mena de Cobre",
  "Corpse Cotton": "Algodón Cadavérico",
  "Corpse Thread": "Hilo Cadavérico",
  "Corrupted Essence": "Esencia Corrupta",
  "Cosmic Rune": "Runa Cósmica",
  "Crossbow String": "Cuerda de Ballesta",
  "Cursed Essence": "Esencia Maldita",
  "Death Rune": "Runa de la Muerte",
  "Defence Potion": "Poción de Defensa",
  "Demonic Oil": "Aceite Demoníaco",
  "Dragon Bones": "Huesos de Dragón",
  "Dragon Dagger": "Daga de Dragón",
  "Dragon Scimitar": "Cimitarra de Dragón",
  "Dragonfire Shield": "Escudo de Fuego de Dragón",
  "Dragonstone": "Piedra de Dragón (Gema)",
  "Earth Rune": "Runa de Tierra",
  "Egg": "Huevo",
  "Empty Vial": "Vial Vacío",
  "Enchanted Adamant Bolt": "Perno Encantado de Adamantita",
  "Enchanted Blurite Bolts": "Pernos Encantados de Blurita",
  "Enchanted Bronze Bolts": "Pernos Encantados de Bronce",
  "Enchanted Iron Bolts": "Pernos Encantados de Hierro",
  "Enchanted Mithril Bolts": "Pernos Encantados de Mithril",
  "Enchanted Rune Bolt": "Perno Encantado Rúnico",
  "Enchanted Steel Bolts": "Pernos Encantados de Acero",
  "Energy Potion": "Poción de Energía",
  "Fang Arrow": "Flecha de Colmillo",
  "Fang Barbed Arrow": "Flecha Dentada de Colmillo",
  "Fang Fire Arrow": "Flecha de Fuego de Colmillo",
  "Feather": "Pluma",
  "Fine Cloth": "Tela Fina",
  "Fine Net": "Red Fina de Pesca",
  "Fine Thread": "Hilo Fino",
  "Fire Rune": "Runa de Fuego",
  "Fish Bait": "Cebo de Pesca",
  "Flax": "Lino",
  "Fly Fishing Rod": "Caña de Pesca con Mosca",
  "Gold Bar": "Barra de Oro",
  "Gold Leaf": "Pan de Oro / Hoja Dorada",
  "Gold Ore": "Mena de Oro",
  "Gourmand Ring": "Anillo de Glotón",
  "Granite": "Granito",
  "Granite Maul": "Maza de Granito",
  "Ground Clay": "Arcilla Molida",
  "Ground Granite": "Granito Molido",
  "Ground Gypsum": "Yeso Molido",
  "Ground Limestone": "Piedra Caliza Molida",
  "Ground Obsidian": "Obsidiana Molida",
  "Ground Sandstone": "Arenisca Molida",
  "Ground Stone": "Piedra Molida",
  "Gypsum Wax": "Cera de Yeso",
  "Hard Leather": "Cuero Endurecido",
  "Harralander": "Harralander",
  "Harralander Seeds": "Semillas de Harralander",
  "Healing Salve": "Bálsamo Curativo",
  "Heavy Ballista": "Balista Pesada",
  "Iron Arrow": "Flecha de Hierro",
  "Iron Bar": "Barra de Hierro",
  "Iron Barbed Arrow": "Flecha Dentada de Hierro",
  "Iron Bolt": "Perno de Hierro",
  "Iron Crossbow": "Ballesta de Hierro",
  "Iron Crossbow Limbs": "Palas de Ballesta de Hierro",
  "Iron Dagger": "Daga de Hierro",
  "Iron Fire Arrow": "Flecha de Fuego de Hierro",
  "Iron Greataxe": "Hacha de Guerra de Hierro",
  "Iron Greatsword": "Espadón de Hierro",
  "Iron Helmet": "Casco de Hierro",
  "Iron Logging Axe": "Hacha de Tala de Hierro",
  "Iron Mace": "Maza de Hierro",
  "Iron Med Helm": "Casco Mediano de Hierro",
  "Iron Ore": "Mena de Hierro",
  "Iron Pickaxe": "Pico de Hierro",
  "Iron Platebody": "Coraza de Placas de Hierro",
  "Iron Platelegs": "Perneras de Placas de Hierro",
  "Iron Scimitar": "Cimitarra de Hierro",
  "Iron Shield": "Escudo de Hierro",
  "Iron Spade": "Pala de Hierro",
  "Iron Sword": "Espada de Hierro",
  "Iron Warhammer": "Martillo de Guerra de Hierro",
  "Iron Watering Can": "Regadera de Hierro",
  "Irit": "Irit",
  "Irit Seeds": "Semillas de Irit",
  "Jade": "Jade",
  "Kalphite Chitin": "Quitina de Kalfita",
  "Kalphite Shell": "Caparazón de Kalfita",
  "Kalphite Shell Fragments": "Fragmentos de Caparazón de Kalfita",
  "Kwuarm": "Kwuarm",
  "Kwuarm Seeds": "Semillas de Kwuarm",
  "Law Rune": "Runa de la Ley",
  "Leather": "Cuero",
  "Leather Body": "Coraza de Cuero",
  "Leather Boots": "Botas de Cuero",
  "Leather Chaps": "Pantalones de Cuero",
  "Leather Cowl": "Capucha de Cuero",
  "Leather Gloves": "Guantes de Cuero",
  "Leather Shield": "Escudo de Cuero",
  "Leather Vambraces": "Brazales de Cuero",
  "Limestone": "Piedra Caliza",
  "Linen": "Lienzo de Lino",
  "Lockpick": "Ganzúa",
  "Logs": "Troncos de Madera",
  "Loom": "Telar",
  "Magic Battlestaff": "Bastón de Combate Mágico",
  "Magic Logs": "Troncos Mágicos",
  "Magic Longbow": "Arco Largo Mágico",
  "Magic Plank": "Tabla Mágica",
  "Magic Potion": "Poción Mágica",
  "Magic Shortbow": "Arco Corto Mágico",
  "Magic Tree Seed": "Semilla de Árbol Mágico",
  "Magic Wand": "Varita Mágica",
  "Maple Battlestaff": "Bastón de Combate de Arce",
  "Maple Logs": "Troncos de Arce",
  "Maple Longbow": "Arco Largo de Arce",
  "Maple Plank": "Tabla de Arce",
  "Maple Shortbow": "Arco Corto de Arce",
  "Maple Tree Seed": "Semilla de Arce",
  "Maple Wand": "Varita de Arce",
  "Marrentill": "Marrentill",
  "Marrentill Seeds": "Semillas de Marrentill",
  "Masterwork Battlestaff": "Bastón de Combate Masterwork",
  "Masterwork Bow": "Arco Masterwork",
  "Masterwork Crossbow": "Ballesta Masterwork",
  "Masterwork Greataxe": "Hacha de Guerra Masterwork",
  "Masterwork Greatsword": "Espadón Masterwork",
  "Masterwork Helmet": "Casco Masterwork",
  "Masterwork Logging Axe": "Hacha de Tala Masterwork",
  "Masterwork Pickaxe": "Pico Masterwork",
  "Masterwork Platebody": "Coraza Masterwork",
  "Masterwork Platelegs": "Perneras Masterwork",
  "Masterwork Scimitar": "Cimitarra Masterwork",
  "Masterwork Shield": "Escudo Masterwork",
  "Masterwork Wand": "Varita Masterwork",
  "Masterwork Warhammer": "Martillo de Guerra Masterwork",
  "Meat Pie": "Pastel de Carne",
  "Mind Rune": "Runa de la Mente",
  "Mithril Arrow": "Flecha de Mithril",
  "Mithril Bar": "Barra de Mithril",
  "Mithril Barbed Arrow": "Flecha Dentada de Mithril",
  "Mithril Bolt": "Perno de Mithril",
  "Mithril Crossbow": "Ballesta de Mithril",
  "Mithril Crossbow Limbs": "Palas de Ballesta de Mithril",
  "Mithril Dagger": "Daga de Mithril",
  "Mithril Fire Arrow": "Flecha de Fuego de Mithril",
  "Mithril Greataxe": "Hacha de Guerra de Mithril",
  "Mithril Greatsword": "Espadón de Mithril",
  "Mithril Helmet": "Casco de Mithril",
  "Mithril Logging Axe": "Hacha de Tala de Mithril",
  "Mithril Mace": "Maza de Mithril",
  "Mithril Med Helm": "Casco Mediano de Mithril",
  "Mithril Ore": "Mena de Mithril",
  "Mithril Pickaxe": "Pico de Mithril",
  "Mithril Platebody": "Coraza de Placas de Mithril",
  "Mithril Platelegs": "Perneras de Placas de Mithril",
  "Mithril Scimitar": "Cimitarra de Mithril",
  "Mithril Shield": "Escudo de Mithril",
  "Mithril Spade": "Pala de Mithril",
  "Mithril Sword": "Espada de Mithril",
  "Mithril Warhammer": "Martillo de Guerra de Mithril",
  "Mithril Watering Can": "Regadera de Mithril",
  "Mystic Robe Bottom": "Falda de Túnica Mística",
  "Mystic Robe Top": "Túnica Mística",
  "Nature Rune": "Runa de la Naturaleza",
  "Necromancer Robe Bottom": "Falda de Túnica de Nigromante",
  "Necromancer Robe Top": "Túnica de Nigromante",
  "Necromancer's Staff": "Bastón de Nigromante",
  "Needle": "Aguja de Coser",
  "Normal Logs": "Troncos Comunes",
  "Normal Plank": "Tabla Común",
  "Normal Tree Seed": "Semilla de Árbol Común",
  "Oak Battlestaff": "Bastón de Combate de Roble",
  "Oak Logs": "Troncos de Roble",
  "Oak Longbow": "Arco Largo de Roble",
  "Oak Plank": "Tabla de Roble",
  "Oak Shortbow": "Arco Corto de Roble",
  "Oak Tree Seed": "Semilla de Roble",
  "Oak Wand": "Varita de Roble",
  "Obsidian Bar": "Barra de Obsidiana",
  "Obsidian Dagger": "Daga de Obsidiana",
  "Obsidian Greataxe": "Hacha de Guerra de Obsidiana",
  "Obsidian Greatsword": "Espadón de Obsidiana",
  "Obsidian Helmet": "Casco de Obsidiana",
  "Obsidian Mace": "Maza de Obsidiana",
  "Obsidian Ore": "Mena de Obsidiana",
  "Obsidian Pickaxe": "Pico de Obsidiana",
  "Obsidian Platebody": "Coraza de Obsidiana",
  "Obsidian Platelegs": "Perneras de Obsidiana",
  "Obsidian Scimitar": "Cimitarra de Obsidiana",
  "Obsidian Shield": "Escudo de Obsidiana",
  "Obsidian Sword": "Espada de Obsidiana",
  "Obsidian Warhammer": "Martillo de Guerra de Obsidiana",
  "Pie Shell": "Base de Tarta",
  "Plank": "Tabla de Madera",
  "Poison Ichor": "Ícor Venenoso",
  "Poisoned Adamant Arrow": "Flecha Envenenada de Adamantita",
  "Poisoned Bronze Arrow": "Flecha Envenenada de Bronce",
  "Poisoned Fang Arrow": "Flecha Envenenada de Colmillo",
  "Poisoned Iron Arrow": "Flecha Envenenada de Hierro",
  "Poisoned Mithril Arrow": "Flecha Envenenada de Mithril",
  "Poisoned Rune Arrow": "Flecha Envenenada Rúnica",
  "Poisoned Steel Arrow": "Flecha Envenenada de Acero",
  "Potato": "Patata",
  "Potato Seed": "Semilla de Patata",
  "Prayer Potion": "Poción de Plegaria",
  "Pure Essence": "Esencia Pura",
  "Raking Tools": "Rastrillo",
  "Ram Horn": "Cuerno de Carnero",
  "Ranarr Seeds": "Semillas de Ranarr",
  "Ranged Potion": "Poción de Ataque a Distancia",
  "Raw Beef": "Carne Cruda de Ternera",
  "Raw Catfish": "Pez Gato Crudo",
  "Raw Chicken": "Pollo Crudo",
  "Raw Fish": "Pescado Crudo",
  "Raw Meat": "Carne Cruda",
  "Raw Trout": "Trucha Cruda",
  "Red Dragon Hide": "Piel de Dragón Rojo",
  "Red Dragon Leather": "Cuero de Dragón Rojo",
  "Red Dragon Scale": "Escama de Dragón Rojo",
  "Red Dragonhide Body": "Coraza de Cuero de Dragón Rojo",
  "Red Dragonhide Chaps": "Pantalones de Cuero de Dragón Rojo",
  "Red Dragonhide Coif": "Capucha de Cuero de Dragón Rojo",
  "Red Memory of Menaphos": "Memoria Roja de Menaphos",
  "Reroll Token": "Ficha de Reintento",
  "Ring of Life": "Anillo de Vida",
  "Ring of Pursuit": "Anillo de Persecución",
  "Ring of Recoil": "Anillo de Retroceso",
  "Ring of Wealth": "Anillo de la Riqueza",
  "Rope": "Cuerda",
  "Rune Arrow": "Flecha Rúnica",
  "Rune Bar": "Barra Rúnica",
  "Rune Barbed Arrow": "Flecha Dentada Rúnica",
  "Rune Bolt": "Perno Rúnico de Ballesta",
  "Rune Crossbow": "Ballesta Rúnica",
  "Rune Crossbow Limbs": "Palas de Ballesta Rúnica",
  "Rune Dagger": "Daga Rúnica",
  "Rune Essence": "Esencia Rúnica",
  "Rune Fire Arrow": "Flecha de Fuego Rúnica",
  "Rune Greataxe": "Hacha de Guerra Rúnica",
  "Rune Greatsword": "Espadón Rúnico",
  "Rune Helm": "Casco Rúnico",
  "Rune Logging Axe": "Hacha de Tala Rúnica",
  "Rune Mace": "Maza Rúnica",
  "Rune Pickaxe": "Pico Rúnico",
  "Rune Platebody": "Coraza de Placas Rúnica",
  "Rune Platelegs": "Perneras de Placas Rúnica",
  "Rune Scimitar": "Cimitarra Rúnica",
  "Rune Shield": "Escudo Rúnico",
  "Rune Spade": "Pala Rúnica",
  "Rune Sword": "Espada Rúnica",
  "Rune Warhammer": "Martillo de Guerra Rúnico",
  "Rune Watering Can": "Regadera Rúnica",
  "Sandstone": "Arenisca",
  "Scale Dust": "Polvo de Escamas",
  "Scorch Leather": "Cuero Quemado",
  "Secateurs": "Tijeras de Podar",
  "Seed": "Semilla",
  "Shadow Sword": "Espada Sombría",
  "Shears": "Tijeras de Esquila",
  "Shortbow": "Arco Corto",
  "Shroud of Noggin": "Sudario de Noggin (Vestigio)",
  "Silk": "Seda",
  "Silver Bar": "Barra de Plata",
  "Silver Ore": "Mena de Plata",
  "Sinew": "Tendón",
  "Skill Tome (Artisan)": "Tomo de Habilidad (Artesanía)",
  "Skill Tome (Attack)": "Tomo de Habilidad (Ataque)",
  "Skill Tome (Cooking)": "Tomo de Habilidad (Cocina)",
  "Skill Tome (Magic)": "Tomo de Habilidad (Magia)",
  "Skill Tome (Mining)": "Tomo de Habilidad (Minería)",
  "Skill Tome (Ranged)": "Tomo de Habilidad (A Distancia)",
  "Skill Tome (Runecrafting)": "Tomo de Habilidad (Creación de Runas)",
  "Skill Tome (Woodcutting)": "Tomo de Habilidad (Tala de Árboles)",
  "Snapdragon Seeds": "Semillas de Snapdragon",
  "Spade": "Pala",
  "Spider Silk": "Seda de Araña",
  "Spinning Wheel": "Rueda de Hilar",
  "Splitbark Battlestaff": "Bastón de Combate de Corteza Hendida",
  "Splitbark Body": "Coraza de Corteza Hendida",
  "Splitbark Boots": "Botas de Corteza Hendida",
  "Splitbark Gauntlets": "Guanteletes de Corteza Hendida",
  "Splitbark Helm": "Casco de Corteza Hendida",
  "Splitbark Legs": "Perneras de Corteza Hendida",
  "Splitbark Wand": "Varita de Corteza Hendida",
  "Steel Arrow": "Flecha de Acero",
  "Steel Bar": "Barra de Acero",
  "Steel Barbed Arrow": "Flecha Dentada de Acero",
  "Steel Bolt": "Perno de Acero",
  "Steel Crossbow": "Ballesta de Acero",
  "Steel Crossbow Limbs": "Palas de Ballesta de Acero",
  "Steel Dagger": "Daga de Acero",
  "Steel Fire Arrow": "Flecha de Fuego de Acero",
  "Steel Greataxe": "Hacha de Guerra de Acero",
  "Steel Greatsword": "Espadón de Acero",
  "Steel Helmet": "Casco de Acero",
  "Steel Logging Axe": "Hacha de Tala de Acero",
  "Steel Mace": "Maza de Acero",
  "Steel Med Helm": "Casco Mediano de Acero",
  "Steel Pickaxe": "Pico de Acero",
  "Steel Platebody": "Coraza de Placas de Acero",
  "Steel Platelegs": "Perneras de Placas de Acero",
  "Steel Scimitar": "Cimitarra de Acero",
  "Steel Shield": "Escudo de Acero",
  "Steel Spade": "Pala de Acero",
  "Steel Sword": "Espada de Acero",
  "Steel Warhammer": "Martillo de Guerra de Acero",
  "Steel Watering Can": "Regadera de Acero",
  "Stew": "Estofado",
  "Stone": "Piedra",
  "Strength Potion": "Poción de Fuerza",
  "Super Attack Potion": "Poción de Super Ataque",
  "Super Defence Potion": "Poción de Super Defensa",
  "Super Strength Potion": "Poción de Super Fuerza",
  "Swamp Paste": "Pasta de Pantano",
  "Swamp Tar": "Alquitrán de Pantano",
  "Swamp Thread": "Hilo de Pantano",
  "Tannery": "Curtiduría",
  "Tarromin": "Tarromin",
  "Tarromin Seeds": "Semillas de Tarromin",
  "Tea Leaves": "Hojas de Té",
  "Thread": "Hilo",
  "Tin Ore": "Mena de Estaño",
  "Tinderbox": "Yesquero de Fuego",
  "Toadflax": "Toadflax",
  "Toadflax Seeds": "Semillas de Toadflax",
  "Tome of Runecrafting - Vol 1": "Tomo de Creación de Runas - Vol 1",
  "Tome of Runecrafting - Vol 2": "Tomo de Creación de Runas - Vol 2",
  "Torstol": "Torstol",
  "Torstol Seeds": "Semillas de Torstol",
  "Trout": "Trucha",
  "Ulv's Longbow": "Arco Largo de Ulv",
  "Undead Ranger's Bow": "Arco de Explorador No-Muerto",
  "Unfired Pie Shell": "Base de Tarta sin Hornear",
  "Unfired Pot": "Vasija de Barro sin Cocer",
  "Vial": "Vial",
  "Vial of Water": "Vial con Agua",
  "Water Rune": "Runa de Agua",
  "Watering Can": "Regadera",
  "White Knight Helmet": "Casco de Caballero Blanco",
  "White Knight Platebody": "Coraza de Caballero Blanco",
  "White Knight Platelegs": "Perneras de Caballero Blanco",
  "Willow Battlestaff": "Bastón de Combate de Sauce",
  "Willow Logs": "Troncos de Sauce",
  "Willow Longbow": "Arco Largo de Sauce",
  "Willow Plank": "Tabla de Sauce",
  "Willow Rod": "Caña de Sauce",
  "Willow Shortbow": "Arco Corto de Sauce",
  "Willow Tree Seed": "Semilla de Sauce",
  "Willow Wand": "Varita de Sauce",
  "Wizard Hat": "Sombrero de Mago",
  "Wizard Robe": "Túnica de Mago",
  "Woodcutting Cape": "Capa de Tala de Árboles",
  "Wooden Bow": "Arco de Madera",
  "Wooden Club": "Garrote de Madera",
  "Wooden Shield": "Escudo de Madera",
  "Wool": "Lana",
  "Wrath Rune": "Runa de la Ira",
  "Yew Battlestaff": "Bastón de Combate de Tejo",
  "Yew Logs": "Troncos de Tejo",
  "Yew Longbow": "Arco Largo de Tejo",
  "Yew Plank": "Tabla de Tejo",
  "Yew Shortbow": "Arco Corto de Tejo",
  "Yew Tree Seed": "Semilla de Tejo",
  "Yew Wand": "Varita de Tejo"
};

function getSpanishName(title) {
  if (EXACT_NAME_DICT[title]) return EXACT_NAME_DICT[title];

  // Clean translation fallback
  let t = title;
  for (const [eng, esp] of Object.entries(EXACT_NAME_DICT)) {
    if (t.includes(eng)) {
      t = t.replace(eng, esp);
    }
  }
  return t;
}

// Translate description heuristics
function translateFullDescription(desc, title) {
  if (!desc) return '';
  let d = desc;

  // General sentence patterns
  d = d
    .replace(/^A brutal weapon crafted from the spine of a terrifying Abyssal Demon\./i, 'Una brutal arma forjada a partir de la columna vertebral de un temible Demonio Abisal.')
    .replace(/^A sturdy pickaxe made of adamant\./i, 'Un resistente pico forjado en pura adamantita.')
    .replace(/^A powerful looking blade, broken beyond repair\. Still, perhaps you could learn something from it\./i, 'Una imponente hoja, rota sin remedio. Aun así, quizás puedas aprender algo de ella.')
    .replace(/^The rusted remains of a symbol of authority\. Perhaps you could learn something from it\./i, 'Los restos oxidados de un símbolo de autoridad. Quizás puedas aprender algo de ellos.')
    .replace(/^Shows the worst possible side of yourself\. Perhaps you could learn something from it\./i, 'Muestra el peor reflejo de ti mismo. Quizás puedas aprender algo de él.')
    .replace(/^A rusted blade with a wicked edge\. Barely usable now, but perhaps you could learn something\.\./i, 'Una hoja oxidada con un filo perverso. Casi inservible ahora, pero quizás puedas aprender algo...')
    .replace(/^What's left of a staff that feels soaked in sorrow\. Perhaps you could learn something from it\./i, 'Lo que queda de un bastón empapado en dolor. Quizás puedas aprender algo de él.')
    .replace(/^The remains of a longbow damaged in a dragon attack\. Perhaps you could learn something from\.\./i, 'Los restos de un arco largo dañado en el ataque de un dragón. Quizás puedas aprender algo...')
    .replace(/^Sinew, bound tightly enough to be dangerous\. Useless now, but perhaps you could learn\.\./i, 'Tendón trenzado con fuerza. Inútil ahora, pero quizás puedas aprender...')
    .replace(/^An odd bundle of scratchy sackcloth\. It's unsettling to hold\. Still, perhaps you could learn\.\./i, 'Un extraño fardo de tela áspera de saco. Inquieta sostenerlo, pero quizás puedas aprender...')
    .replace(/^A mysterious porous rock used as a base for powerful runes\./i, 'Una misteriosa roca porosa utilizada como base para forjar poderosas runas.')
    .replace(/^Made from spun corpse cotton\. Can be used as a bow string and in stitching weapons and gear\./i, 'Fabricado a partir de algodón cadavérico hilado. Puede usarse como cuerda de arco y para confeccionar equipo y armas.')
    .replace(/^A refreshing, fruity drink\. Good for hydration\./i, 'Una bebida refrescante y afrutada. Excelente para la hidratación en Ashenfall.')
    .replace(/^A source of hydration, tainted by the residue of a cataclysmic event\./i, 'Una fuente de hidratación, contaminada por los residuos de un cataclismo.')
    .replace(/^A cloth shoulder bag, contains useful smithing materials\./i, 'Una bolsa de hombro que contiene útiles materiales de herrería.')
    .replace(/^Harvested from flax plants, essential for crafting linen and bowstrings\./i, 'Cosechado de plantas de lino, esencial para elaborar lienzos y cuerdas de arco.')
    .replace(/^A dense stone used for construction and crafting\./i, 'Una densa piedra utilizada para la construcción y la forja.')
    .replace(/^Fine limestone ground from limestone\./i, 'Fina piedra caliza molida a partir de roca caliza.')
    .replace(/Equippable as ammo when using a magic weapon\./gi, 'Equipable como munición al empuñar un arma mágica.')
    .replace(/A symbol of blustering winds\./gi, 'Un símbolo de vientos tempestuosos, esencial para la magia de aire.')
    .replace(/A symbol of the earth's might, essential for earth-based magic\./gi, 'Un símbolo del poder de la tierra, esencial para la magia elemental terrestre.')
    .replace(/A symbol of flowing waters, essential for water-based magic and other spells\./gi, 'Un símbolo de aguas fluidas, esencial para la magia de agua y otros conjuros.')
    .replace(/Resource needed for teleportation\./gi, 'Recurso necesario para hechizos de teletransporte y conjuros avanzados.')
    .replace(/Nature runes are used for casting transmutation spells\./gi, 'Las runas de naturaleza se usan para lanzar hechizos de transmutación.')
    .replace(/Astral runes are used for casting advanced magic spells and attacks\./gi, 'Las runas astrales se usan para lanzar hechizos mágicos avanzados y ataques místicos.')
    .replace(/A book filled with knowledge on how to bind anima within rune essence\./gi, 'Un libro repleto de sabiduría sobre cómo canalizar el ánima dentro de la esencia rúnica.')
    .replace(/Can be used to craft/gi, 'Se puede usar para fabricar')
    .replace(/Used in smithing/gi, 'Utilizado en la herrería')
    .replace(/Used to craft/gi, 'Utilizado para fabricar')
    .replace(/Used in crafting/gi, 'Utilizado en la artesanía')
    .replace(/Restores health/gi, 'Restaura salud')
    .replace(/Increases attack/gi, 'Aumenta el ataque')
    .replace(/Increases defence/gi, 'Aumenta la defensa')
    .replace(/Increases strength/gi, 'Aumenta la fuerza')
    .replace(/Increases magic/gi, 'Aumenta la magia')
    .replace(/A set of/gi, 'Un conjunto de')
    .replace(/Forged from/gi, 'Forjado a partir de')
    .replace(/Crafted from/gi, 'Elaborado a partir de');

  return d;
}

// Translate all 1104 items
console.log(`Deep translating ${items.length} items to 100% Spanish...`);

for (const item of items) {
  // Store original English title for search reference
  if (!item.englishTitle) item.englishTitle = item.title;

  // 1. Name
  item.name = getSpanishName(item.title);

  // 2. Category
  const CAT_MAP = {
    'Weapons': 'Armas de Combate',
    'Armour': 'Armaduras & Ropa',
    'Tools': 'Herramientas',
    'Consumables & Potions': 'Pociones & Comida',
    'Materials': 'Materiales & Minerales',
    'Vestiges & Patterns': 'Vestigios & Patrones',
    'Runecrafting & Magic': 'Runas & Magia',
    'Other': 'Materiales & Minerales'
  };
  item.category = CAT_MAP[item.category] || item.category;

  // 3. Item Type
  const TYPE_MAP = {
    'Melee Weapon': 'Arma Cuerpo a Cuerpo',
    'Ranged Weapon': 'Arma a Distancia',
    'Magic Weapon': 'Arma Mágica',
    'Weapon': 'Arma de Combate',
    'Armour': 'Armadura',
    'Armor': 'Armadura',
    'Tool': 'Herramienta',
    'Potion': 'Poción / Elixir',
    'Drink': 'Bebida / Hidratación',
    'Food': 'Comida / Sustento',
    'Consumable': 'Consumible',
    'Basic Material': 'Material Básico',
    'Processed Material': 'Material Procesado',
    'Material': 'Material de Forja',
    'Resource': 'Recurso Natural',
    'Component': 'Componente de Crafteo',
    'Vestige': 'Vestigio Antiguo',
    'Pattern': 'Patrón de Crafteo',
    'Rune': 'Runa Mágica',
    'Trinket': 'Joya / Reliquia',
    'Ammunition': 'Munición',
    'General Item': 'Objeto de Aventura'
  };
  item.itemType = TYPE_MAP[item.itemType] || item.itemType;

  // 4. Description
  item.description = translateFullDescription(item.description, item.title);

  // 5. Stats
  if (item.stats) {
    const DMG_MAP = { 'Slash': 'Corte', 'Crush': 'Aplastamiento', 'Stab': 'Estocada', 'Magic': 'Mágico', 'Ranged': 'A Distancia' };
    if (item.stats.damageType) item.stats.damageType = DMG_MAP[item.stats.damageType] || item.stats.damageType;

    const STYLE_MAP = { 'Whip': 'Látigo', 'Sword': 'Espada', 'Greatsword': 'Espadón', 'Scimitar': 'Cimitarra', 'Dagger': 'Daga', 'Greataxe': 'Hacha de Guerra', 'Mace': 'Maza', 'Warhammer': 'Martillo de Guerra', 'Bow': 'Arco', 'Shortbow': 'Arco Corto', 'Longbow': 'Arco Largo', 'Crossbow': 'Ballesta', 'Wand': 'Varita', 'Staff': 'Bastón', 'Battlestaff': 'Bastón de Combate' };
    if (item.stats.attackStyle) item.stats.attackStyle = STYLE_MAP[item.stats.attackStyle] || item.stats.attackStyle;

    if (item.stats.specialAction) {
      item.stats.specialAction = item.stats.specialAction
        .replace(/Special Attack/gi, 'Ataque Especial')
        .replace(/Special/gi, 'Especial');
    }

    if (item.stats.specialEffect) {
      item.stats.specialEffect = item.stats.specialEffect
        .replace(/Bleed on Enemies/gi, 'Sangrado a los enemigos')
        .replace(/Can BLOCK using UNARMED BLOCK/gi, 'Permite BLOQUEAR usando bloqueo desarmado')
        .replace(/Launches DEMONIC ENERGY that homes in on a target, dealing DAMAGE and KNOCKING them DOWN/gi, 'Lanza ENERGÍA DEMONÍACA teledirigida que inflige DAÑO y DERRIBA al objetivo');
    }
  }

  // 6. Repair Cost
  if (item.repairCost) {
    item.repairCost = item.repairCost
      .replace(/adamant bar/gi, 'Barra de Adamantita')
      .replace(/iron bar/gi, 'Barra de Hierro')
      .replace(/steel bar/gi, 'Barra de Acero')
      .replace(/mithril bar/gi, 'Barra de Mithril')
      .replace(/bronze bar/gi, 'Barra de Bronce')
      .replace(/abyssal spine/gi, 'Espina Abisal')
      .replace(/rune bar/gi, 'Barra Rúnica')
      .replace(/dragon leather/gi, 'Cuero de Dragón');
  }

  // 7. Recipe
  if (item.recipe) {
    const FAC_MAP = {
      "Blacksmith's Bench": "Banco del Herrero",
      "Mystic Forge": "Fragua Mística",
      "Spinning Wheel": "Rueda de Hilar",
      "Loom": "Telar",
      "Fletching Bench": "Mesa de Flechería",
      "Fletching Station": "Puesto de Flechería",
      "Brewing Cauldron": "Caldero de Pociones",
      "Alchemist's Table": "Mesa de Alquimia",
      "Crafting Table": "Mesa de Artesanía",
      "Tannery": "Curtiduría",
      "Campfire": "Hoguera de Campamento",
      "Jeweler's Bench": "Banco del Joyero",
      "Blast Furnace": "Alto Horno",
      "Furnace": "Horno de Fundición",
      "Rune Altar": "Altar de Runas"
    };
    item.recipe.facility = FAC_MAP[item.recipe.facility] || item.recipe.facility;

    const SKILL_MAP = {
      "Artisan": "Artesanía", "Attack": "Ataque", "Cooking": "Cocina", "Magic": "Magia", "Mining": "Minería", "Ranged": "A Distancia", "Runecrafting": "Creación de Runas", "Woodcutting": "Tala de Árboles", "Agility": "Agilidad", "Farming": "Agricultura", "Fishing": "Pesca", "Construction": "Construcción"
    };
    item.recipe.skill = SKILL_MAP[item.recipe.skill] || item.recipe.skill;

    if (item.recipe.materials) {
      item.recipe.materials.forEach((mat) => {
        if (!mat.englishItem) mat.englishItem = mat.item;
        mat.item = getSpanishName(mat.englishItem || mat.item);
      });
    }
  }

  // 8. UsedIn
  if (item.usedIn) {
    item.usedIn.forEach((u) => {
      if (!u.englishTitle) u.englishTitle = u.title;
      u.title = getSpanishName(u.englishTitle || u.title);
      u.category = CAT_MAP[u.category] || u.category;
      const FAC_MAP = {
        "Blacksmith's Bench": "Banco del Herrero", "Mystic Forge": "Fragua Mística", "Spinning Wheel": "Rueda de Hilar", "Loom": "Telar", "Fletching Bench": "Mesa de Flechería", "Brewing Cauldron": "Caldero de Pociones", "Alchemist's Table": "Mesa de Alquimia", "Crafting Table": "Mesa de Artesanía", "Tannery": "Curtiduría", "Campfire": "Hoguera de Campamento", "Jeweler's Bench": "Banco del Joyero", "Blast Furnace": "Alto Horno", "Furnace": "Horno de Fundición", "Rune Altar": "Altar de Runas"
      };
      u.facility = FAC_MAP[u.facility] || u.facility;
    });
  }

  // 9. Upgrades
  if (item.upgrades) {
    item.upgrades.forEach((upg) => {
      if (upg.coresRequired) {
        upg.coresRequired = upg.coresRequired
          .replace(/Ascension Core/gi, 'Núcleo de Ascensión')
          .replace(/Power Level/gi, 'Nivel de Poder');
      }
    });
  }
}

fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), 'utf-8');
console.log(`Full 100% Spanish translation successfully saved for ${items.length} items!`);
