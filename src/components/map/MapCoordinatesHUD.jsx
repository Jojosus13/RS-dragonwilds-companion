import React from 'react';
import GameIcon from '../GameIcon';

export default function MapCoordinatesHUD({ cursorCoords, zoom }) {
  return (
    <div className="map-coordinates-hud">
      <GameIcon name="treasure-map" size={14} color="var(--gold-400)" />
      <span>X: {cursorCoords.x} · Y: {cursorCoords.y}</span>
      <span className="hud-zoom-badge">{Math.round(zoom * 100)}%</span>
    </div>
  );
}
