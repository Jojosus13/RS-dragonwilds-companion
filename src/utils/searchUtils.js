/**
 * Normalizes text for search:
 * - Lowercase
 * - Strips accents / diacritics (á -> a, é -> e, í -> i, ó -> o, ú -> u, ü -> u, ñ -> n)
 * - Trims extra spaces
 */
export function normalizeText(str) {
  if (!str) return '';
  return str
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Returns stems/variations for Spanish words (handling plurals like -es, -s, -ces, -ones, etc.)
 */
export function getWordStems(word) {
  const norm = normalizeText(word);
  if (!norm || norm.length <= 2) return [norm];
  const stems = new Set([norm]);

  if (norm.endsWith('ces') && norm.length > 3) {
    stems.add(norm.slice(0, -3) + 'z'); // e.g. peces -> pez, luces -> luz
  } else if (norm.endsWith('ones') && norm.length > 4) {
    stems.add(norm.slice(0, -4) + 'on'); // e.g. carbones -> carbon, pociones -> pocion, dragones -> dragon
  } else if (norm.endsWith('anes') && norm.length > 4) {
    stems.add(norm.slice(0, -4) + 'an');
  } else if (norm.endsWith('enes') && norm.length > 4) {
    stems.add(norm.slice(0, -4) + 'en');
  } else if (norm.endsWith('es') && norm.length > 3) {
    stems.add(norm.slice(0, -2)); // e.g. minerales -> mineral, arboles -> arbol
  } else if (norm.endsWith('s') && norm.length > 3 && !norm.endsWith('is') && !norm.endsWith('us')) {
    stems.add(norm.slice(0, -1)); // e.g. espadas -> espada, cascos -> casco
  }

  return Array.from(stems);
}

/**
 * Builds searchable composite text for an item
 */
export function buildItemSearchString(item) {
  const parts = [
    item.name,
    item.title,
    item.englishTitle,
    item.category,
    item.itemType,
    item.description,
    item.journal,
    item.rarity,
    item.source,
    item.stats?.damageType,
    item.stats?.attackStyle,
    item.stats?.specialAction,
    item.recipe?.facility
  ];
  if (item.recipe?.materials) {
    item.recipe.materials.forEach((m) => {
      if (m?.item) parts.push(m.item);
    });
  }
  return normalizeText(parts.filter(Boolean).join(' '));
}

/**
 * Scores and matches an item against a search query
 * Returns score > 0 if matched, 0 if not matched
 */
export function scoreItemSearch(item, rawQuery) {
  const normQuery = normalizeText(rawQuery);
  if (!normQuery) return 0;

  const normName = normalizeText(item.name || '');
  const normEng = normalizeText(item.englishTitle || '');
  const normType = normalizeText(item.itemType || '');
  const normCat = normalizeText(item.category || '');

  // Exact full match on Spanish name or English title
  if (normName === normQuery || normEng === normQuery) return 1000;

  // Name starts with query
  if (normName.startsWith(normQuery) || normEng.startsWith(normQuery)) return 600;

  const queryStems = getWordStems(normQuery);
  const nameWords = normName.split(/\s+/);

  for (const qStem of queryStems) {
    if (normName === qStem) return 900;
    if (normName.startsWith(qStem)) return 550;
    if (nameWords.some((w) => w.startsWith(qStem))) return 450;
    if (nameWords.some((w) => getWordStems(w).some((ws) => ws === qStem))) return 400;
  }

  // Name contains substring
  if (normName.includes(normQuery)) return 300;

  // Multi-token match across all item metadata
  const queryTokens = normQuery.split(/\s+/).filter(Boolean);
  const searchStr = buildItemSearchString(item);

  const allTokensMatch = queryTokens.every((qToken) => {
    const stems = getWordStems(qToken);
    return stems.some((stem) => searchStr.includes(stem));
  });

  if (!allTokensMatch) return 0;

  let score = 100;
  if (normType.includes(normQuery)) score += 80;
  if (normCat.includes(normQuery)) score += 50;
  if (item.recipe?.materials?.some((m) => normalizeText(m.item).includes(normQuery))) score += 70;
  if (item.description && normalizeText(item.description).includes(normQuery)) score += 30;

  return score;
}

/**
 * Generic search filter function for collections
 */
export function searchFilter(items, rawQuery, getItemSearchString) {
  const normQuery = normalizeText(rawQuery);
  if (!normQuery) return items;

  const queryTokens = normQuery.split(/\s+/).filter(Boolean);

  return items.filter((item) => {
    const text = getItemSearchString ? getItemSearchString(item) : normalizeText(JSON.stringify(item));
    return queryTokens.every((token) => {
      const stems = getWordStems(token);
      return stems.some((stem) => text.includes(stem));
    });
  });
}
