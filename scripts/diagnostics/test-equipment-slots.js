import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isEquipableItem, getSlotForItem, isItemForSlot } from '../../src/components/loadout/slotsConfig.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const itemsPath = path.resolve(__dirname, '../../src/data/items.json');
const items = JSON.parse(fs.readFileSync(itemsPath, 'utf8'));

console.log('🧪 Iniciando verificación de ranuras de equipamiento...');

// 1. Chatarra no debe ser equipable ni aparecer en ranura de cabeza (o ninguna otra)
const chatarra = items.find((i) => i.title === 'Chatarra de Metal Negro');
assert(chatarra, 'No se encontró Chatarra de Metal Negro en la base de datos');
assert.equal(isEquipableItem(chatarra), false, 'Chatarra de Metal Negro no debe ser equipable');
assert.equal(getSlotForItem(chatarra), null, 'Chatarra de Metal Negro no debe tener ranura asignada');
assert.equal(isItemForSlot(chatarra, 'head'), false, 'Chatarra de Metal Negro no debe aparecer en la cabeza');

// 2. Seta de Sombrero Amargo no debe ser equipable ni aparecer en ranura de cabeza
const seta = items.find((i) => i.title === 'Seta de Sombrero Amargo');
assert(seta, 'No se encontró Seta de Sombrero Amargo en la base de datos');
assert.equal(isEquipableItem(seta), false, 'Seta de Sombrero Amargo no debe ser equipable');
assert.equal(getSlotForItem(seta), null, 'Seta de Sombrero Amargo no debe tener ranura asignada');
assert.equal(isItemForSlot(seta, 'head'), false, 'Seta de Sombrero Amargo no debe aparecer en la cabeza');

// 3. Casco de Adamantita debe ser equipable en Cabeza
const casco = items.find((i) => i.title === 'Casco de Adamantita');
assert(casco, 'No se encontró Casco de Adamantita');
assert.equal(isEquipableItem(casco), true, 'Casco de Adamantita debe ser equipable');
assert.equal(getSlotForItem(casco), 'head', 'Casco de Adamantita debe pertenecer a la ranura head');
assert.equal(isItemForSlot(casco, 'head'), true);

// 4. Vestigios sin estadísticas de combate no deben ser equipables
const arcoRoto = items.find((i) => i.title === 'Arco Roto Simple (Vestigio)');
assert(arcoRoto, 'No se encontró Arco Roto Simple (Vestigio)');
assert.equal(isEquipableItem(arcoRoto), false, 'Arco roto vestigio no debe ser equipable');
assert.equal(isItemForSlot(arcoRoto, 'mainhand'), false);

const coronaVestigio = items.find((i) => i.title === 'Corona Portadora de Maldiciones (Vestigio)');
assert(coronaVestigio, 'No se encontró Corona Portadora de Maldiciones (Vestigio)');
assert.equal(isEquipableItem(coronaVestigio), false);
assert.equal(isItemForSlot(coronaVestigio, 'head'), false);

// 5. Consumibles válidos vs no consumibles (piel, piedra, sombrero de pescador)
const pocion = items.find((i) => i.title === 'Poción Antifuego');
assert(pocion, 'No se encontró Poción Antifuego');
assert.equal(isEquipableItem(pocion), true);
assert.equal(isItemForSlot(pocion, 'consumable1'), true);

const patata = items.find((i) => i.title === 'Patata Asada');
assert(patata, 'No se encontró Patata Asada');
assert.equal(isEquipableItem(patata), true);
assert.equal(isItemForSlot(patata, 'consumable2'), true);

const piel = items.find((i) => i.title === 'Piel de Animal');
assert(piel, 'No se encontró Piel de Animal');
assert.equal(isEquipableItem(piel), false);
assert.equal(isItemForSlot(piel, 'consumable1'), false);

const pescador = items.find((i) => i.title === 'Sombrero de Pescador');
assert(pescador, 'No se encontró Sombrero de Pescador');
assert.equal(isEquipableItem(pescador), true);
assert.equal(isItemForSlot(pescador, 'head'), true);
assert.equal(isItemForSlot(pescador, 'consumable1'), false, 'Sombrero de pescador no debe ser consumible');

console.log('✅ Todas las comprobaciones de ranuras y equipamiento pasaron satisfactoriamente.');

