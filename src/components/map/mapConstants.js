import { 
  Shield, 
  Scroll, 
  Flame, 
  MapPin 
} from 'lucide-react';

export const CATEGORY_META = {
  all: { label: 'Todos', gameIcon: 'treasure-map', color: 'var(--gold-400)' },
  lodestones: { label: 'Piedras Guía', gameIcon: 'treasure-map', color: '#48bb78' },
  vaults: { label: 'Bóvedas Dragonkin', icon: Shield, color: '#4299e1' },
  quests: { label: 'Misiones', icon: Scroll, color: '#ecc94b' },
  bosses: { label: 'Jefes y Élites', icon: Flame, color: '#e53e3e' },
  custom: { label: 'Mis Marcadores', icon: MapPin, color: '#ed8936' }
};

export const STORAGE_KEYS = {
  CUSTOM_MARKERS: 'rs_dw_custom_map_markers',
  ACTIVE_WAYPOINTS: 'rs_dw_active_route_waypoints',
  CHECKED_WAYPOINTS: 'rs_dw_checked_waypoints',
  SAVED_ROUTES: 'rs_dw_saved_routes'
};

export const MAP_SCALE = {
  METERS_PER_PIXEL: 4.2,
  METERS_PER_MINUTE: 260
};
