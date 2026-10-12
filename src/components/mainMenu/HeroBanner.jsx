import React from 'react';
import OmniSearch from './OmniSearch';

export default function HeroBanner({
  allItems = [],
  quests = [],
  spells = [],
  onSelectItem,
  onSelectVault,
  setActiveView,
  setSelectedCategory
}) {
  return (
    <section className="menu-hero-banner">
      <div className="menu-hero-glow-orb" />

      <div className="menu-hero-content">
        <h1 className="menu-hero-title">
          RUNESCAPE: <span>DRAGONWILDS</span>
        </h1>

        <p className="menu-hero-subtitle">
          Tu guía de referencia interactiva para explorar Ashenfall, forjar equipamiento de élite, descifrar misiones arcanas y dominar las tierras salvajes.
        </p>

        <OmniSearch
          allItems={allItems}
          quests={quests}
          spells={spells}
          onSelectItem={onSelectItem}
          onSelectVault={onSelectVault}
          setActiveView={setActiveView}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </section>
  );
}
