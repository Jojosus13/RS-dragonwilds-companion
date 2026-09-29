import React, { useState, useMemo, useEffect } from 'react';
import { Shield } from 'lucide-react';
import vaultsData from '../../data/vaults.json';
import { normalizeText } from '../../utils/searchUtils';
import VaultFilterBar from './VaultFilterBar';
import VaultCard from './VaultCard';
import VaultDetailModal from './VaultDetailModal';

export default function VaultsViewer({
  selectedVaultId = null,
  onSelectVault = () => { },
  onViewVaultOnMap = () => { },
  onSelectItem = () => { }
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

  // Unique regions list for filter dropdown
  const regionsList = useMemo(() => {
    const set = new Set();
    vaultsData.forEach((v) => {
      const mainReg = v.region.split(' (')[0];
      set.add(mainReg);
    });
    return Array.from(set);
  }, []);

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
        const lootNorm = normalizeText((vault.notableLoot || []).map(l => l.name).join(' '));
        const recipesNorm = normalizeText((vault.recipes || []).map(r => r.name).join(' '));

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

  // Total chests count
  const totalChestsCount = useMemo(() => {
    return vaultsData.reduce((acc, v) => acc + (v.chests?.length || 0), 0);
  }, []);

  const handleCloseDetail = () => {
    setActiveVaultId(null);
    onSelectVault(null);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setRegionFilter('all');
    setLevelFilter('all');
  };

  return (
    <div className="vaults-viewer-container">
      {/* Detail View of Selected Vault */}
      {activeVault ? (
        <VaultDetailModal
          activeVault={activeVault}
          onClose={handleCloseDetail}
          onViewVaultOnMap={onViewVaultOnMap}
          zoomImage={zoomImage}
          setZoomImage={setZoomImage}
        />
      ) : (
        /* Overview / Catalog Grid of All 12 Vaults */
        <div className="vaults-catalog-view fade-in">
          {/* Header Banner */}
          <div className="vaults-header-banner">
            <div className="vaults-banner-content">
              <div className="vaults-banner-badge">
                <Shield size={16} />
                <span>CÓDICE DRACONIS</span>
              </div>
              <h1 className="vaults-banner-title">Cámaras y Bóvedas Dragonkin</h1>
              <p className="vaults-banner-subtitle">
                Explora las 12 bóvedas ancestrales de Ashenfall. Guías completas con localización de cofres ilustrados, resolución de trampas, vestigios legendarios, recetas de forja y núcleos de tecnología perdida.
              </p>

              {/* Stats Bar */}
              <div className="vaults-stats-bar">
                <div className="vault-stat-item">
                  <span className="stat-val">{vaultsData.length}</span>
                  <span className="stat-lbl">Bóvedas Registradas</span>
                </div>
                <div className="vault-stat-divider" />
                <div className="vault-stat-item">
                  <span className="stat-val">{totalChestsCount}+</span>
                  <span className="stat-lbl">Cofres y Secretos</span>
                </div>
                <div className="vault-stat-divider" />
                <div className="vault-stat-item">
                  <span className="stat-val">36</span>
                  <span className="stat-lbl">Núcleos de Bóveda</span>
                </div>
                <div className="vault-stat-divider" />
                <div className="vault-stat-item">
                  <span className="stat-val">10+</span>
                  <span className="stat-lbl">Recetas y Vestigios</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <VaultFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            regionFilter={regionFilter}
            onRegionChange={setRegionFilter}
            levelFilter={levelFilter}
            onLevelChange={setLevelFilter}
            regionsList={regionsList}
            totalResults={filteredVaults.length}
          />

          {/* Results Count Banner */}
          <div className="vaults-results-count">
            <span>Mostrando {filteredVaults.length} de {vaultsData.length} bóvedas</span>
            {(searchQuery || regionFilter !== 'all' || levelFilter !== 'all') && (
              <button
                className="btn-text-gold"
                onClick={handleResetFilters}
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
                onSelectVault={(id) => {
                  setActiveVaultId(id);
                  onSelectVault(id);
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
                onViewVaultOnMap={onViewVaultOnMap}
              />
            ))}
          </div>

          {filteredVaults.length === 0 && (
            <div className="vaults-empty-state">
              <Shield size={48} color="var(--gold-400)" />
              <h3>No se encontraron bóvedas</h3>
              <p>Prueba con otros términos de búsqueda o restablece los filtros de región y nivel.</p>
              <button
                className="btn-fantasy gold"
                onClick={handleResetFilters}
              >
                Restablecer Filtros
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
