// Utility calculations and tree algorithms for CraftingPlanner

/**
 * Builds a fast lookup map for items by title, name, id and englishTitle
 */
export function buildItemMap(allItems = []) {
  const map = new Map();
  allItems.forEach((it) => {
    if (it.title) map.set(it.title.toLowerCase().trim(), it);
    if (it.name) map.set(it.name.toLowerCase().trim(), it);
    if (it.id) map.set(it.id.toLowerCase().trim(), it);
    if (it.englishTitle) map.set(it.englishTitle.toLowerCase().trim(), it);
  });
  return map;
}

/**
 * Finds an item object in itemMap by name/title
 */
export function findItemByName(itemMap, name) {
  if (!name || !itemMap) return null;
  return itemMap.get(name.toLowerCase().trim()) || null;
}

/**
 * Recursively builds the recipe breakdown tree for a given item up to depth 8
 */
export function buildItemTree(itemMap, itemName, quantity, visited = new Set(), depth = 0) {
  const itemObj = findItemByName(itemMap, itemName);
  if (
    !itemObj || 
    !itemObj.recipe || 
    !itemObj.recipe.materials || 
    itemObj.recipe.materials.length === 0 || 
    visited.has(itemName.toLowerCase()) || 
    depth > 8
  ) {
    return {
      name: itemObj?.name || itemName,
      title: itemObj?.title || itemName,
      quantity,
      image: itemObj?.image || null,
      facility: null,
      skill: null,
      skillxp: 0,
      isRaw: true,
      children: [],
      itemObj
    };
  }

  const newVisited = new Set(visited);
  newVisited.add(itemName.toLowerCase());

  const safeQty = Number(quantity) || 1;
  const outputQty = Number(itemObj.recipe.outputQty) || 1;
  const craftRuns = Math.ceil(safeQty / outputQty);
  const totalXp = (Number(itemObj.recipe.skillxp) || 0) * craftRuns;

  const children = itemObj.recipe.materials.map((mat) => {
    const matQty = Number(mat.quantity) || Number(mat.count) || 1;
    const totalMatNeeded = craftRuns * matQty;
    return buildItemTree(itemMap, mat.item, totalMatNeeded, newVisited, depth + 1);
  });

  return {
    name: itemObj.name || itemName,
    title: itemObj.title || itemName,
    quantity: safeQty,
    image: itemObj.image || null,
    facility: itemObj.recipe.facility || 'Mesa de Crafteo',
    skill: itemObj.recipe.skill || 'Artesanía',
    skillxp: totalXp,
    outputQty,
    craftRuns,
    isRaw: false,
    children,
    itemObj
  };
}

/**
 * Computes direct (first-level intermediate) materials required for planned items
 */
export function calculateDirectMaterials(plannerItems = [], itemMap) {
  const totals = {};

  plannerItems.forEach(({ item, quantity }) => {
    const safeItemQty = Number(quantity) || 1;
    if (item.recipe?.materials) {
      item.recipe.materials.forEach((mat) => {
        const matObj = findItemByName(itemMap, mat.item);
        const matName = matObj?.name || mat.item;
        const matQty = Number(mat.quantity) || Number(mat.count) || 1;
        const totalRequired = matQty * safeItemQty;

        if (!totals[matName]) {
          totals[matName] = {
            item: matName,
            rawName: mat.item,
            totalQuantity: 0,
            image: matObj?.image || null,
            itemObj: matObj,
            hasRecipe: !!matObj?.recipe,
            facility: matObj?.recipe?.facility || null,
            usedIn: []
          };
        }
        totals[matName].totalQuantity += totalRequired;
        totals[matName].usedIn.push({
          forItem: item.name,
          qtyNeeded: totalRequired
        });
      });
    }
  });

  return Object.values(totals).sort((a, b) => b.totalQuantity - a.totalQuantity);
}

/**
 * Computes fully decomposed leaf raw materials with transformation purposes
 */
export function calculateRawBaseMaterials(fullRecipeTrees = []) {
  const rawTotals = {};

  function collectRaw(node, parentNode, rootTarget) {
    if (node.children.length === 0) {
      const key = node.name || node.title;
      if (!rawTotals[key]) {
        rawTotals[key] = {
          item: key,
          totalQuantity: 0,
          image: node.image,
          itemObj: node.itemObj,
          purposes: []
        };
      }
      rawTotals[key].totalQuantity += node.quantity;

      const isDirect = !parentNode || parentNode.name === rootTarget.name;
      const purposeKey = isDirect 
        ? `direct_${rootTarget.name}`
        : `${parentNode.name}_${rootTarget.name}`;

      const existingPurpose = rawTotals[key].purposes.find((p) => p.key === purposeKey);
      if (existingPurpose) {
        existingPurpose.qty += node.quantity;
      } else {
        rawTotals[key].purposes.push({
          key: purposeKey,
          qty: node.quantity,
          isDirect,
          producesItem: isDirect ? rootTarget.name : parentNode.name,
          producesQty: isDirect ? rootTarget.quantity : parentNode.quantity,
          facility: isDirect ? (rootTarget.recipe?.facility || null) : parentNode.facility,
          finalTarget: rootTarget.name
        });
      }
    } else {
      node.children.forEach((child) => collectRaw(child, node, rootTarget));
    }
  }

  fullRecipeTrees.forEach(({ targetItem, tree }) => {
    collectRaw(tree, null, targetItem);
  });

  return Object.values(rawTotals).sort((a, b) => b.totalQuantity - a.totalQuantity);
}

/**
 * Groups crafts by workstation facility in sequential workflow
 */
export function calculateWorkstationSteps(fullRecipeTrees = []) {
  const stations = {};

  function collectStations(node) {
    if (node.facility && node.children.length > 0) {
      const fac = node.facility;
      if (!stations[fac]) {
        stations[fac] = {
          facility: fac,
          skill: node.skill,
          crafts: []
        };
      }
      const existingCraft = stations[fac].crafts.find((c) => c.name === node.name);
      if (existingCraft) {
        existingCraft.totalQuantity += node.quantity;
        existingCraft.runs += node.craftRuns;
        existingCraft.totalXp += node.skillxp;
      } else {
        stations[fac].crafts.push({
          name: node.name,
          title: node.title,
          image: node.image,
          totalQuantity: node.quantity,
          runs: node.craftRuns,
          totalXp: node.skillxp,
          itemObj: node.itemObj,
          inputs: node.children.map((c) => ({
            name: c.name,
            quantity: c.quantity,
            image: c.image
          }))
        });
      }
    }
    node.children.forEach((c) => collectStations(c));
  }

  fullRecipeTrees.forEach(({ tree }) => {
    collectStations(tree);
  });

  return Object.values(stations);
}

/**
 * Calculates total crafting experience points across all recipe trees
 */
export function calculateTotalCraftingXp(fullRecipeTrees = []) {
  let xp = 0;
  function sumXp(node) {
    xp += node.skillxp || 0;
    node.children.forEach(sumXp);
  }
  fullRecipeTrees.forEach(({ tree }) => sumXp(tree));
  return xp;
}
