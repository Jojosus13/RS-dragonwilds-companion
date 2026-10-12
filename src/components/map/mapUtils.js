import { normalizeText } from '../../utils/searchUtils';
import { MAP_SCALE } from './mapConstants';

/**
 * Calculates total route distance and estimated walking/running travel time
 */
export function calculateRouteStats(activeWaypoints = []) {
  if (activeWaypoints.length < 2) {
    return { totalDistMeters: 0, totalDistKm: '0.0', estMinutes: 0, stops: activeWaypoints.length };
  }

  let totalPixels = 0;
  for (let i = 0; i < activeWaypoints.length - 1; i++) {
    const p1 = activeWaypoints[i].coords;
    const p2 = activeWaypoints[i + 1].coords;
    const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    totalPixels += dist;
  }

  const meters = Math.round(totalPixels * MAP_SCALE.METERS_PER_PIXEL);
  const km = (meters / 1000).toFixed(1);
  const minutes = Math.max(1, Math.round(meters / MAP_SCALE.METERS_PER_MINUTE));

  return {
    totalDistMeters: meters,
    totalDistKm: km,
    estMinutes: minutes,
    stops: activeWaypoints.length
  };
}

/**
 * Filters markers according to the active category and search term
 */
export function filterVisibleMarkers(allMarkers = [], selectedCategory = 'all', searchQuery = '') {
  return allMarkers.filter((m) => {
    // Category Filter
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'custom' && !m.isCustom) return false;
      if (selectedCategory !== 'custom' && m.category !== selectedCategory) return false;
    }

    // Search Query
    if (searchQuery.trim()) {
      const normQ = normalizeText(searchQuery);
      const searchTarget = normalizeText(
        `${m.title} ${m.region || ''} ${m.description || ''} ${m.materialNames?.join(' ') || ''} ${m.drops?.join(' ') || ''}`
      );
      if (!searchTarget.includes(normQ)) return false;
    }

    return true;
  });
}

/**
 * Computes marker counts for each category
 */
export function calculateCategoryCounts(allMarkers = [], customMarkers = [], mapMarkers = []) {
  const counts = { all: allMarkers.length, custom: customMarkers.length };
  mapMarkers.forEach((m) => {
    counts[m.category] = (counts[m.category] || 0) + 1;
  });
  return counts;
}
