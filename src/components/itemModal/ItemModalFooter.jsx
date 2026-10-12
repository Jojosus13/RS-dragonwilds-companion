import React from 'react';
import { Plus, Check, ExternalLink } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function ItemModalFooter({
  item,
  isFavorite,
  onToggleFavorite,
  isInPlanner,
  onTogglePlanner,
  onEquipItem,
  onViewItemOnMap
}) {
  const canEquip = (
    item.category === 'Armas de Combate' ||
    item.category === 'Armaduras y Ropa' ||
    item.category === 'Weapons' ||
    item.category === 'Armour' ||
    item.category === 'Herramientas' ||
    item.slot ||
    (item.stats && Object.keys(item.stats).length > 0)
  );

  return (
    <div style={{ padding: '16px 20px', borderTop: '1px solid var(--gold-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(10,13,18,0.92)', flexWrap: 'wrap', gap: '10px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Botón Equipar en Simulador */}
        {canEquip && (
          <button 
            className="btn-fantasy" 
            onClick={() => onEquipItem(item)}
            title="Equipar en el Simulador de Personaje"
          >
            <GameIcon name="shield" size={16} />
            <span>Equipar</span>
          </button>
        )}

        {/* Añadir a la lista de Crafteo */}
        {item.recipe && (
          <button 
            className={`btn-fantasy ${isInPlanner ? 'gold' : ''}`}
            onClick={() => onTogglePlanner(item)}
          >
            {isInPlanner ? <Check size={16} /> : <Plus size={16} />}
            <span>{isInPlanner ? 'En Lista de Crafteo' : 'Añadir a Crafteo'}</span>
          </button>
        )}

        {/* Guardar en Favoritos */}
        <button 
          className={`btn-fantasy ${isFavorite ? 'gold' : ''}`}
          onClick={() => onToggleFavorite(item)}
        >
          <GameIcon name="flat-star" size={16} color={isFavorite ? 'var(--gold-400)' : 'var(--text-muted)'} />
          <span>{isFavorite ? 'Guardado' : 'Favorito'}</span>
        </button>

        {/* Ver en Mapa */}
        <button 
          className="btn-fantasy"
          onClick={() => onViewItemOnMap && onViewItemOnMap(item)}
          title="Buscar yacimientos y ver en el mapa interactivo"
          style={{ color: '#63b3ed', borderColor: 'rgba(66, 153, 225, 0.4)' }}
        >
          <GameIcon name="position-marker" size={16} />
          <span>Ver en Mapa</span>
        </button>
      </div>

      {/* Enlace Wiki Oficial */}
      {item.wikiUrl && (
        <a 
          href={item.wikiUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-fantasy"
          style={{ fontSize: '0.8rem' }}
          title="Abrir página oficial de la Wiki"
        >
          <span>Wiki Oficial</span>
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}
