import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import GameIcon from '../GameIcon';

export default function SearchDropdownResults({
  isOpen = true,
  searchQuery,
  searchResults,
  onSelectItem,
  onSelectVault,
  setActiveView,
  setSelectedCategory,
  onClose
}) {
  if (!isOpen || !searchQuery.trim()) return null;

  return (
    <div className="menu-search-dropdown-results">
      <div className="menu-results-header">
        <span>Resultados para "{searchQuery}"</span>
        <span className="results-count-badge">{searchResults.total} encontrados</span>
      </div>

      {searchResults.total === 0 ? (
        <div className="menu-search-empty">
          <p>No se encontraron resultados directos.</p>
          <button
            className="btn-fantasy gold btn-sm"
            style={{ marginTop: '8px' }}
            onClick={() => {
              setSelectedCategory('All');
              setActiveView('catalog');
              onClose();
            }}
          >
            Buscar en el Catálogo Completo
          </button>
        </div>
      ) : (
        <div className="menu-results-list">
          {/* Items */}
          {searchResults.items.length > 0 && (
            <div className="menu-results-group">
              <div className="group-title">
                <GameIcon name="swap-bag" size={13} color="var(--gold-400)" /> Objetos y Códice
              </div>
              {searchResults.items.map((item) => (
                <div
                  key={item.id || item.title}
                  className="menu-result-item"
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                >
                  <div className="result-icon">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <GameIcon name="crossed-swords" size={18} color="var(--gold-400)" />
                    )}
                  </div>
                  <div className="result-details">
                    <span className="result-name">{item.name || item.title}</span>
                    <span className="result-meta">{item.category} • {item.itemType}</span>
                  </div>
                  <ChevronRight size={16} className="result-arrow" />
                </div>
              ))}
            </div>
          )}

          {/* Vaults */}
          {searchResults.vaults && searchResults.vaults.length > 0 && (
            <div className="menu-results-group">
              <div className="group-title">
                <GameIcon name="shield" size={13} color="#63b3ed" /> Bóvedas Dragonkin
              </div>
              {searchResults.vaults.map((vlt) => (
                <div
                  key={vlt.id || vlt.name}
                  className="menu-result-item"
                  onClick={() => {
                    onSelectVault(vlt.id);
                    setActiveView('vaults');
                    onClose();
                  }}
                >
                  <div className="result-icon vault-icon" style={{ background: 'rgba(66, 153, 225, 0.2)', color: '#63b3ed', borderRadius: '4px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GameIcon name="shield" size={16} color="#63b3ed" />
                  </div>
                  <div className="result-details">
                    <span className="result-name">{vlt.name || vlt.title}</span>
                    <span className="result-meta">{vlt.region} • Nivel {vlt.powerLevel}</span>
                  </div>
                  <ChevronRight size={16} className="result-arrow" />
                </div>
              ))}
            </div>
          )}

          {/* Quests */}
          {searchResults.quests.length > 0 && (
            <div className="menu-results-group">
              <div className="group-title">
                <GameIcon name="tied-scroll" size={13} color="var(--gold-400)" /> Misiones (Quests)
              </div>
              {searchResults.quests.map((qst) => (
                <div
                  key={qst.id || qst.name}
                  className="menu-result-item"
                  onClick={() => {
                    setActiveView('quests');
                    onClose();
                  }}
                >
                  <div className="result-icon quest-icon">
                    <GameIcon name="tied-scroll" size={16} color="var(--gold-400)" />
                  </div>
                  <div className="result-details">
                    <span className="result-name">{qst.name || qst.title}</span>
                    <span className="result-meta">Misión • {qst.startPoint || 'Ashenfall'}</span>
                  </div>
                  <ChevronRight size={16} className="result-arrow" />
                </div>
              ))}
            </div>
          )}

          {/* Spells */}
          {searchResults.spells.length > 0 && (
            <div className="menu-results-group">
              <div className="group-title">
                <GameIcon name="lightning-arc" size={13} color="#b794f4" /> Hechizos
              </div>
              {searchResults.spells.map((spl) => (
                <div
                  key={spl.id || spl.name}
                  className="menu-result-item"
                  onClick={() => {
                    setActiveView('spells');
                    onClose();
                  }}
                >
                  <div className="result-icon spell-icon">
                    <GameIcon name="lightning-arc" size={16} color="#b794f4" />
                  </div>
                  <div className="result-details">
                    <span className="result-name">{spl.name}</span>
                    <span className="result-meta">{spl.type} • Nivel {spl.levelRequired || 1}</span>
                  </div>
                  <ChevronRight size={16} className="result-arrow" />
                </div>
              ))}
            </div>
          )}

          {/* POIs */}
          {searchResults.pois.length > 0 && (
            <div className="menu-results-group">
              <div className="group-title">
                <GameIcon name="treasure-map" size={13} color="#63b3ed" /> Lugares en el Mapa
              </div>
              {searchResults.pois.map((poi) => (
                <div
                  key={poi.id}
                  className="menu-result-item"
                  onClick={() => {
                    setActiveView('map');
                    onClose();
                  }}
                >
                  <div className="result-icon map-icon">
                    <GameIcon name="treasure-map" size={16} color="#63b3ed" />
                  </div>
                  <div className="result-details">
                    <span className="result-name">{poi.title || poi.name}</span>
                    <span className="result-meta">{poi.region} • {poi.category}</span>
                  </div>
                  <ChevronRight size={16} className="result-arrow" />
                </div>
              ))}
            </div>
          )}

          <div className="menu-dropdown-footer">
            <button
              className="btn-fantasy gold w-full"
              onClick={() => {
                setSelectedCategory('All');
                setActiveView('catalog');
                onClose();
              }}
            >
              Explorar catálogo completo <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
