import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import GameIcon from '../GameIcon';
import vaultsData from '../../data/vaults.json';
import { normalizeText } from '../../utils/searchUtils';

import VaultsHeroBanner from './VaultsHeroBanner';
import VaultFilterBar from './VaultFilterBar';
import VaultCard from './VaultCard';
import VaultDetailTopBar from './VaultDetailTopBar';
import VaultHeroCard from './VaultHeroCard';
import VaultHazards from './VaultHazards';
import VaultEnemies from './VaultEnemies';
import VaultLoot from './VaultLoot';
import VaultChests from './VaultChests';
import VaultResources from './VaultResources';
import VaultLightbox from './VaultLightbox';

export default function VaultsViewer({
  selectedVaultId = null,
  onSelectVault = () => {},
  onViewVaultOnMap = () => {},
  onSelectItem = () => {}
}) {
  const [activeVaultId, setActiveVaultId] = useState(selectedVaultId);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [zoomImage, setZoomImage] = useState(null);

  // Sync prop changes
  useEffect(() => {
    if (selectedVaultId) {
      setActiveVaultId(selectedVaultId);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [selectedVaultId]);

  const activeVault = useMemo(() => {
    if (!activeVaultId) return null;
    return vaultsData.find((v) => v.id === activeVaultId) || null;
  }, [activeVaultId]);

  // Filtered list of vaults
  const filteredVaults = useMemo(() => {
    return vaultsData.filter((vault) => {
      // Region filter
      if (regionFilter !== 'all' && !vault.region.toLowerCase().includes(regionFilter.toLowerCase())) {
        return false;
      }
      // Level filter
      if (levelFilter !== 'all' && String(vault.powerLevel) !== String(levelFilter)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = normalizeText(searchQuery);
        const titleNorm = normalizeText(vault.title);
        const regionNorm = normalizeText(vault.region);
        const summaryNorm = normalizeText(vault.summary);
        const lootNorm = normalizeText((vault.notableLoot || []).map((l) => l.name).join(' '));
        const recipesNorm = normalizeText((vault.recipes || []).map((r) => r.name).join(' '));

        const matches = titleNorm.includes(q) ||
          regionNorm.includes(q) ||
          summaryNorm.includes(q) ||
          lootNorm.includes(q) ||
          recipesNorm.includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [searchQuery, regionFilter, levelFilter]);

  // Total chests
  const totalChestsCount = useMemo(() => {
    return vaultsData.reduce((acc, v) => acc + (v.chests?.length || 0), 0);
  }, []);

  const handleBackToIndex = () => {
    setActiveVaultId(null);
    onSelectVault(null);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleSelectVaultCard = (vaultId) => {
    setActiveVaultId(vaultId);
    onSelectVault(vaultId);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setRegionFilter('all');
    setLevelFilter('all');
  };

  return (
    <div className="vaults-viewer-container">
      {/* Detail View of Selected Vault */}
      {activeVault ? (
        <div className="vault-detail-view fade-in">
          {/* Top Sticky Navigation Bar */}
          <VaultDetailTopBar
            onBack={handleBackToIndex}
            onViewVaultOnMap={onViewVaultOnMap}
            activeVault={activeVault}
          />

          {/* Main Vault Hero / Infobox Header */}
          <VaultHeroCard activeVault={activeVault} />

          {/* Section 1: Hazards y Traps */}
          <VaultHazards hazards={activeVault.hazards} />

          {/* Section 2: Enemies */}
          <VaultEnemies
            enemies={activeVault.enemies}
            powerLevel={activeVault.powerLevel}
          />

          {/* Section 3: Notable Loot y Recipes */}
          <VaultLoot
            notableLoot={activeVault.notableLoot}
            recipes={activeVault.recipes}
          />

          {/* Section 4: Chests Guide */}
          <VaultChests
            chests={activeVault.chests}
            onZoomImage={setZoomImage}
          />

          {/* Section 5: Resources */}
          <VaultResources resources={activeVault.resources} />

          {/* Bottom Action Bar */}
          <div className="vault-detail-bottom-actions">
            <button
              className="btn-fantasy gold btn-large"
              onClick={() => onViewVaultOnMap(activeVault)}
            >
              <GameIcon name="position-marker" size={18} />
              <span>Ver Ubicación Exacta en el Mapa de Ashenfall</span>
            </button>
            <button
              className="btn-fantasy btn-large"
              onClick={handleBackToIndex}
            >
              <ArrowLeft size={18} />
              <span>Volver a la Lista de Bóvedas</span>
            </button>
          </div>
        </div>
      ) : (
        /* Overview / Catalog Grid of All 12 Vaults */
        <div className="vaults-catalog-view fade-in">
          {/* Header Banner */}
          <VaultsHeroBanner
            totalVaults={vaultsData.length}
            totalChestsCount={totalChestsCount}
          />

          {/* Filter and Search Bar */}
          <VaultFilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            regionFilter={regionFilter}
            setRegionFilter={setRegionFilter}
            levelFilter={levelFilter}
            setLevelFilter={setLevelFilter}
          />

          {/* Results Count Banner */}
          <div className="vaults-results-count">
            <span>Mostrando {filteredVaults.length} de {vaultsData.length} bóvedas</span>
            {(searchQuery || regionFilter !== 'all' || levelFilter !== 'all') && (
              <button
                className="btn-text-gold"
                onClick={handleClearFilters}
              >
                Limpiar Filtros
              </button>
            )}
          </div>

          {/* Vaults Grid */}
          <div className="vaults-grid">
            {filteredVaults.map((vault) => (
              <VaultCard
                key={vault.id}
                vault={vault}
                onSelectVault={handleSelectVaultCard}
                onViewVaultOnMap={onViewVaultOnMap}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredVaults.length === 0 && (
            <div className="vaults-empty-state">
              <GameIcon name="shield" size={48} color="var(--gold-400)" />
              <h3>No se encontraron bóvedas</h3>
              <p>Prueba con otros términos de búsqueda o restablece los filtros de región y nivel.</p>
              <button
                className="btn-fantasy gold"
                onClick={handleClearFilters}
              >
                Restablecer Filtros
              </button>
            </div>
          )}
        </div>
      )}

      {/* Fullscreen Image Lightbox Modal for Chests */}
      <VaultLightbox
        zoomImage={zoomImage}
        onClose={() => setZoomImage(null)}
      />
    </div>
  );
}
