import React from 'react';
import { Compass } from 'lucide-react';

export default function MapCoordinatesHUD({ cursorCoords, zoom }) {
  return (
    <div className="map-coordinates-hud">
      <Compass size={14} color="var(--gold-400)" />
      <span>X: {cursorCoords.x} · Y: {cursorCoords.y}</span>
      <span className="hud-zoom-badge">{Math.round(zoom * 100)}%</span>
    </div>
  );
}
