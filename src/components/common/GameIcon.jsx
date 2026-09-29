import React from 'react';
import { Icon, addCollection } from '@iconify/react';
import { icons as gameIcons } from '@iconify-json/game-icons';

// Register all game icons so they render 100% offline without API calls
try {
  addCollection(gameIcons);
} catch (e) {
  console.warn('GameIcons collection registration:', e);
}

// Master map from emojis, symbols, and keywords to game-icons names
export const EMOJI_TO_GAME_ICON = {
  // Combat & Weapons
  '⚔️': 'crossed-swords',
  '⚔': 'crossed-swords',
  '🗡️': 'plain-dagger',
  '🗡': 'plain-dagger',
  '🪓': 'battle-axe',
  '🐍': 'vine-whip',
  '🏹': 'bow-arrow',
  '🎯': 'target-arrows',
  '🔮': 'crystal-ball',
  '🧙': 'wizard-staff',

  // Armor & Slots
  '👑': 'crown',
  '🥋': 'breastplate',
  '👖': 'trousers',
  '🛡️': 'shield',
  '🛡': 'shield',
  '🧣': 'cloak',
  '📿': 'necklace',
  '💍': 'diamond-ring',
  '🎖️': 'medal',
  '🎖': 'medal',

  // Tools & Gathering
  '⛏️': 'mining',
  '⛏': 'mining',
  '🪴': 'spade',
  '🌿': 'herbs-bundle',
  '🎣': 'fishing-pole',

  // Crafting, Materials & Resources
  '🎒': 'swap-bag',
  '💼': 'swap-bag',
  '🔨': 'hammer-drop',
  '⚒️': 'anvil-impact',
  '⚒': 'anvil-impact',
  '🧵': 'sewing-needle',
  '🪙': 'gold-bar',
  '🪨': 'rock',
  '🪵': 'wood-pile',
  '🐉': 'dragon-head',
  '✨': 'sparkles',
  '✦': 'sparkles',
  '🏺': 'amphora',
  '📜': 'scroll-unfurled',
  '📦': 'cardboard-box',
  'items': 'swap-bag',

  // Consumables & Magic
  '🧪': 'potion-ball',
  '🍲': 'cooking-pot',
  '🐟': 'fish-cooked',
  '🥩': 'meat',
  '🔥': 'fire',
  '⚡': 'lightning-tear',
  '🌀': 'teleport',
  '🌑': 'eclipse',
  '👻': 'ghost',
  '💀': 'skull-crossed-bones',

  // UI, Navigation & Status
  '⭐': 'flat-star',
  '★': 'flat-star',
  '💡': 'light-bulb',
  '📍': 'position-marker',
  '🗺️': 'treasure-map',
  '🗺': 'treasure-map',
  '🧭': 'compass',
  '🚀': 'sprint',
  '✓': 'check-mark',
  '➔': 'fast-arrow',

  // Runescape / Game Skills Names
  'attack': 'crossed-swords',
  'strength': 'muscle-up',
  'defense': 'shield',
  'defence': 'shield',
  'ranged': 'bow-arrow',
  'prayer': 'holy-symbol',
  'magic': 'wizard-staff',
  'runecrafting': 'rune-stone',
  'hitpoints': 'health-normal',
  'crafting': 'sewing-needle',
  'mining_skill': 'mining',
  'smithing': 'anvil-impact',
  'fishing': 'fish-cooked',
  'cooking': 'cooking-pot',
  'firemaking': 'fire',
  'woodcutting': 'wood-pile',
  'agility': 'sprint',
  'herblore': 'potion-ball',
  'thieving': 'hood',
  'fletching': 'bowman',
  'slayer': 'skull-crossed-bones',
  'farming': 'sprout',
  'construction': 'hammer-drop',
  'hunting': 'target-arrows'
};

/**
 * Resolves any emoji, keyword or icon name into a full Iconify identifier (e.g. 'game-icons:crossed-swords')
 */
export function resolveGameIcon(input) {
  if (!input) return 'game-icons:sparkles';

  const clean = String(input).trim();

  // If already prefixed with game-icons: or another collection
  if (clean.includes(':')) {
    return clean;
  }

  // Exact emoji or keyword match
  if (EMOJI_TO_GAME_ICON[clean]) {
    return `game-icons:${EMOJI_TO_GAME_ICON[clean]}`;
  }

  // Check if clean is a known game-icons name directly
  if (gameIcons.icons[clean]) {
    return `game-icons:${clean}`;
  }

  // Case-insensitive match for keywords
  const lower = clean.toLowerCase();
  if (EMOJI_TO_GAME_ICON[lower]) {
    return `game-icons:${EMOJI_TO_GAME_ICON[lower]}`;
  }

  // Fallback to game-icons with same name
  return `game-icons:${lower.replace(/\s+/g, '-')}`;
}

export default function GameIcon({
  name,
  icon,
  size = 18,
  color,
  className = '',
  style = {},
  ...props
}) {
  const target = icon || name;
  const iconName = resolveGameIcon(target);

  return (
    <Icon
      icon={iconName}
      width={size}
      height={size}
      className={`game-icon ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        color: color || 'currentColor',
        flexShrink: 0,
        ...style
      }}
      {...props}
    />
  );
}
