import React from 'react';
import { Crown, Bookmark, Hammer, Shield, ChevronRight } from 'lucide-react';

export default function PersonalHub({
  favorites = [],
  plannerItems = [],
  equippedCount = 0,
  setActiveView
}) {
  if (favorites.length === 0 && plannerItems.length === 0 && equippedCount === 0) {
    return null;
  }

  return (
    <section className="menu-personal-hub">
      <div className="personal-hub-header">
        <div className="hub-title">
          <Crown size={18} color="var(--gold-400)" />
          <span>TU PROGRESO y HERRAMIENTAS ACTIVAS</span>
        </div>
      </div>

      <div className="personal-hub-grid">
        {favorites.length > 0 && (
          <div
            className="personal-card"
            onClick={() => setActiveView('favorites')}
          >
            <div className="personal-card-top">
              <div className="personal-badge gold">
                <Bookmark size={14} />
                <span>Favoritos</span>
              </div>
              <span className="personal-count">{favorites.length}</span>
            </div>
            <div className="personal-card-body">
              <p className="personal-card-title">Objetos Guardados</p>
              <span className="personal-card-desc">
                Accede a tus ítems preferidos para consultar sus recetas.
              </span>
            </div>
            <div className="personal-card-action">
              <span>Ver Favoritos</span>
              <ChevronRight size={15} />
            </div>
          </div>
        )}

        {plannerItems.length > 0 && (
          <div
            className="personal-card"
            onClick={() => setActiveView('planner')}
          >
            <div className="personal-card-top">
              <div className="personal-badge orange">
                <Hammer size={14} />
                <span>Crafteo</span>
              </div>
              <span className="personal-count">{plannerItems.length}</span>
            </div>
            <div className="personal-card-body">
              <p className="personal-card-title">Lista de Materiales</p>
              <span className="personal-card-desc">
                Tienes recetas agregadas para calcular menas y componentes.
              </span>
            </div>
            <div className="personal-card-action">
              <span>Abrir Calculadora</span>
              <ChevronRight size={15} />
            </div>
          </div>
        )}

        {equippedCount > 0 && (
          <div
            className="personal-card"
            onClick={() => setActiveView('loadout')}
          >
            <div className="personal-card-top">
              <div className="personal-badge green">
                <Shield size={14} />
                <span>Equipamiento</span>
              </div>
              <span className="personal-count">{equippedCount}/8</span>
            </div>
            <div className="personal-card-body">
              <p className="personal-card-title">Build de Combate</p>
              <span className="personal-card-desc">
                Ranuras equipadas activamente en el simulador.
              </span>
            </div>
            <div className="personal-card-action">
              <span>Ver Build</span>
              <ChevronRight size={15} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
