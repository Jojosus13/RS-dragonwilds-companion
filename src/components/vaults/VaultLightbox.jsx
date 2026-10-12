import React from 'react';
import { X } from 'lucide-react';

export default function VaultLightbox({ zoomImage, onClose }) {
  if (!zoomImage) return null;

  return (
    <div
      className="modal-overlay lightbox-overlay"
      onClick={onClose}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-header">
          <span className="lightbox-caption">{zoomImage.caption}</span>
          <button
            className="btn-fantasy btn-icon"
            onClick={onClose}
            title="Cerrar imagen"
          >
            <X size={20} />
          </button>
        </div>
        <div className="lightbox-img-wrap">
          <img
            src={zoomImage.src}
            alt={zoomImage.caption}
            className="lightbox-full-img"
          />
        </div>
      </div>
    </div>
  );
}
