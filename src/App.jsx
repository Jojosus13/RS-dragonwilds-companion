import React, { useState, useEffect, useMemo } from 'react';
import rawItemsData from './data/items.json';
import questsData from './data/quests.json';
import spellsData from './data/spells.json';
import vaultsData from './data/vaults.json';
import Header from './components/Header';
import Navigation from './components/Navigation';
import MainMenu from './components/MainMenu';
import ItemCatalog from './components/ItemCatalog';
import ItemModal from './components/ItemModal';
import CraftingPlanner from './components/CraftingPlanner';
import LoadoutBuilder from './components/LoadoutBuilder';
import SkillsGuide from './components/SkillsGuide';
import QuestViewer from './components/QuestViewer';
import VaultsViewer from './components/VaultsViewer';
import SpellsViewer from './components/SpellsViewer';
import LoreViewer from './components/LoreViewer';
import InteractiveMap from './components/InteractiveMap';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import UpdateModal from './components/UpdateModal';
import { findLocationForQuest, findLocationsForMaterial, findLocationForVault } from './data/mapData';
import { APP_VERSION } from './utils/version';
import { fetchLatestRelease, isUpdateDismissed, recordLastCheckTime } from './utils/updateChecker';
import { Capacitor } from '@capacitor/core';

export default function App() {
  const isNativeApp = typeof window !== 'undefined' && (
    Capacitor.isNativePlatform() || 
    window.Capacitor?.isNativePlatform?.() || 
    (window.Capacitor && window.Capacitor.getPlatform() !== 'web') ||
    window.location.protocol === 'capacitor:' ||
    (window.location.protocol === 'https:' && window.location.hostname === 'localhost')
  );

  const [activeView, setActiveView] = useState('home'); // home, catalog, quests, vaults, spells, lore, map, loadout, planner, skills, favorites
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVaultId, setSelectedVaultId] = useState(null);
  const [selectedItemModal, setSelectedItemModal] = useState(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [mapFocusTarget, setMapFocusTarget] = useState(null);

  // Update Checker State
  const [updateInfo, setUpdateInfo] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [updateCheckMessage, setUpdateCheckMessage] = useState(null);

  // Auto-check for updates on app launch only in native APK
  useEffect(() => {
    if (!isNativeApp) return;

    const timer = setTimeout(async () => {
      try {
        const result = await fetchLatestRelease();
        if (result.success) {
          setUpdateInfo(result);
          if (result.hasUpdate && !isUpdateDismissed(result.latestVersion)) {
            setIsUpdateModalOpen(true);
          }
        }
        recordLastCheckTime();
      } catch (err) {
        // Silent error on background check
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isNativeApp]);

  // Manual check triggered by user
  const handleCheckForUpdates = async () => {
    setIsCheckingUpdate(true);
    setUpdateCheckMessage(null);
    try {
      const result = await fetchLatestRelease({ timeout: 8000 });
      setIsCheckingUpdate(false);
      if (result.success) {
        setUpdateInfo(result);
        if (result.hasUpdate) {
          setIsUpdateModalOpen(true);
        } else {
          setUpdateCheckMessage(`¡Estás al día! La versión v${APP_VERSION} es la más reciente.`);
          setTimeout(() => setUpdateCheckMessage(null), 4500);
        }
      } else {
        setUpdateCheckMessage(result.error || 'No se pudo verificar la actualización.');
        setTimeout(() => setUpdateCheckMessage(null), 4500);
      }
    } catch {
      setIsCheckingUpdate(false);
      setUpdateCheckMessage('No se pudo conectar para buscar actualizaciones.');
      setTimeout(() => setUpdateCheckMessage(null), 4500);
    }
  };

  // Jump to map from Quest
  const handleViewQuestOnMap = (quest) => {
    const loc = findLocationForQuest(quest.id, quest.name || quest.title);
    setMapFocusTarget({
      type: 'quest',
      markerId: loc?.id,
      title: quest.name || quest.title,
      coords: loc?.coords || { x: 450, y: 500 },
      region: loc?.region || 'Ashenfall',
      description: quest.startPoint || quest.summary
    });
    setActiveView('map');
  };

  // Jump to map from Vault
  const handleViewVaultOnMap = (vault) => {
    const loc = findLocationForVault(vault.id, vault.name || vault.title);
    setMapFocusTarget({
      type: 'vault',
      markerId: loc?.id || vault.mapMarkerId,
      vaultId: vault.id,
      title: vault.name || vault.title,
      coords: vault.coords || loc?.coords || { x: 377, y: 150 },
      region: vault.region,
      description: vault.summary
    });
    setActiveView('map');
  };

  // Select Vault and navigate to Vaults view
  const handleSelectVault = (vaultId) => {
    setSelectedVaultId(vaultId);
    setActiveView('vaults');
  };

  // Jump to map from Item / Material
  const handleViewItemOnMap = (item) => {
    setMapFocusTarget({
      type: 'material',
      materialName: item.name || item.title,
      category: item.category,
      autoRoute: true
    });
    setSelectedItemModal(null);
    setActiveView('map');
  };

  // Reset scroll to top whenever changing sections or categories
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const main = document.querySelector('.main-content');
    if (main) main.scrollTop = 0;
  }, [activeView, selectedCategory]);

  // Persistent Favorites in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_dw_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  // Persistent Crafting Planner in localStorage
  const [plannerItems, setPlannerItems] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_dw_planner');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_planner', JSON.stringify(plannerItems));
    } catch {}
  }, [plannerItems]);

  // Persistent Loadout in localStorage
  const [loadout, setLoadout] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_dw_loadout');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_loadout', JSON.stringify(loadout));
    } catch {}
  }, [loadout]);

  // Listen for PWA beforeinstallprompt
  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallModalOpen(false);
      }
    }
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: rawItemsData.length };
    rawItemsData.forEach((it) => {
      counts[it.category] = (counts[it.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Handlers
  const handleToggleFavorite = (item) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      if (exists) {
        return prev.filter((f) => f.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const handleTogglePlanner = (item) => {
    setPlannerItems((prev) => {
      const existing = prev.find((p) => p.item.id === item.id);
      if (existing) {
        return prev.filter((p) => p.item.id !== item.id);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdatePlannerQuantity = (itemId, quantity) => {
    setPlannerItems((prev) =>
      prev.map((p) => (p.item.id === itemId ? { ...p, quantity } : p))
    );
  };

  const handleRemovePlannerItem = (itemId) => {
    setPlannerItems((prev) => prev.filter((p) => p.item.id !== itemId));
  };

  const handleClearPlanner = () => {
    setPlannerItems([]);
  };

  const handleEquipSlot = (slotId, item) => {
    setLoadout((prev) => ({ ...prev, [slotId]: item }));
  };

  const handleUnequipSlot = (slotId) => {
    setLoadout((prev) => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  const handleClearLoadout = () => {
    setLoadout({});
  };

  // Direct item jump from recipes or search
  const handleSelectOtherItem = (itemTitle) => {
    const found = rawItemsData.find(
      (it) => it.title.toLowerCase() === itemTitle.toLowerCase() || it.name.toLowerCase() === itemTitle.toLowerCase()
    );
    if (found) {
      setSelectedItemModal(found);
    }
  };

  // Equip item directly from modal
  const handleEquipFromModal = (item) => {
    const type = (item.itemType || '').toLowerCase();
    const cat = (item.category || '').toLowerCase();

    let targetSlot = 'mainhand';
    if (type.includes('shield')) targetSlot = 'offhand';
    else if (type.includes('helmet') || type.includes('hat') || type.includes('coif')) targetSlot = 'head';
    else if (type.includes('platebody') || type.includes('body') || type.includes('robe') || type.includes('tunic')) targetSlot = 'body';
    else if (type.includes('legs') || type.includes('chaps') || type.includes('leggings')) targetSlot = 'legs';
    else if (type.includes('cape')) targetSlot = 'cape';
    else if (type.includes('amulet') || type.includes('necklace')) targetSlot = 'neck';
    else if (type.includes('ring')) targetSlot = 'ring';

    handleEquipSlot(targetSlot, item);
    setActiveView('loadout');
    setSelectedItemModal(null);
  };

  return (
    <div className="app-container">
      {/* Site Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        favoritesCount={favorites.length}
        plannerCount={plannerItems.length}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      <div className="app-body">
        {/* Navigation Sidebar y Mobile Dock */}
        <Navigation
          activeView={activeView}
          setActiveView={setActiveView}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
          questCount={questsData.length}
          spellCount={spellsData.length}
        />

        {/* Main Content Area */}
        <main className="main-content">
          {activeView === 'home' && (
            <MainMenu
              setActiveView={setActiveView}
              setSelectedCategory={setSelectedCategory}
              onSelectItem={(item) => setSelectedItemModal(item)}
              onSelectVault={handleSelectVault}
              favorites={favorites}
              plannerItems={plannerItems}
              loadout={loadout}
              allItems={rawItemsData}
              quests={questsData}
              spells={spellsData}
              onViewQuestOnMap={handleViewQuestOnMap}
              onCheckForUpdates={handleCheckForUpdates}
              isCheckingUpdate={isCheckingUpdate}
              updateInfo={updateInfo}
              updateCheckMessage={updateCheckMessage}
              onOpenUpdateModal={() => setIsUpdateModalOpen(true)}
            />
          )}

          {activeView === 'catalog' && (
            <ItemCatalog
              items={rawItemsData}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onSelectItem={(item) => setSelectedItemModal(item)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              plannerItems={plannerItems.map((p) => p.item)}
              onTogglePlanner={handleTogglePlanner}
            />
          )}

          {activeView === 'quests' && (
            <QuestViewer onViewQuestOnMap={handleViewQuestOnMap} />
          )}

          {activeView === 'vaults' && (
            <VaultsViewer
              selectedVaultId={selectedVaultId}
              onSelectVault={setSelectedVaultId}
              onViewVaultOnMap={handleViewVaultOnMap}
              onSelectItem={handleSelectOtherItem}
            />
          )}

          {activeView === 'spells' && <SpellsViewer />}

          {activeView === 'map' && (
            <InteractiveMap
              focusTarget={mapFocusTarget}
              onClearFocus={() => setMapFocusTarget(null)}
              onSelectQuest={(questId) => {
                setActiveView('quests');
              }}
              onSelectVault={handleSelectVault}
              onSelectItem={(itemName) => handleSelectOtherItem(itemName)}
            />
          )}

          {activeView === 'lore' && <LoreViewer />}

          {activeView === 'favorites' && (
            <ItemCatalog
              items={favorites}
              selectedCategory="All"
              setSelectedCategory={() => {}}
              onSelectItem={(item) => setSelectedItemModal(item)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              plannerItems={plannerItems.map((p) => p.item)}
              onTogglePlanner={handleTogglePlanner}
            />
          )}

          {activeView === 'planner' && (
            <CraftingPlanner
              plannerItems={plannerItems}
              onUpdateQuantity={handleUpdatePlannerQuantity}
              onRemoveItem={handleRemovePlannerItem}
              onClearPlanner={handleClearPlanner}
              allItems={rawItemsData}
              onSelectItem={(item) => setSelectedItemModal(item)}
            />
          )}

          {activeView === 'loadout' && (
            <LoadoutBuilder
              loadout={loadout}
              onEquipSlot={handleEquipSlot}
              onUnequipSlot={handleUnequipSlot}
              onClearLoadout={handleClearLoadout}
              allItems={rawItemsData}
              onSelectItem={(item) => setSelectedItemModal(item)}
            />
          )}

          {activeView === 'skills' && <SkillsGuide />}
        </main>
      </div>

      {/* Item Detail Modal */}
      {selectedItemModal && (
        <ItemModal
          item={selectedItemModal}
          onClose={() => setSelectedItemModal(null)}
          onSelectOtherItem={handleSelectOtherItem}
          isFavorite={favorites.some((f) => f.id === selectedItemModal.id)}
          onToggleFavorite={handleToggleFavorite}
          isInPlanner={plannerItems.some((p) => p.item.id === selectedItemModal.id)}
          onTogglePlanner={handleTogglePlanner}
          onEquipItem={handleEquipFromModal}
          onViewItemOnMap={handleViewItemOnMap}
        />
      )}

      {/* PWA Install Modal */}
      <PWAInstallPrompt
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        deferredPrompt={deferredPrompt}
        onInstallClick={handleInstallPWA}
      />

      {/* App Auto-Update Modal */}
      <UpdateModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        updateInfo={updateInfo}
      />
    </div>
  );
}
