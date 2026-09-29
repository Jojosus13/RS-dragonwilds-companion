import React from 'react';
import DesktopNav from './DesktopNav';
import MobileBottomNav from './MobileBottomNav';

export default function Navigation({
  activeView,
  setActiveView,
  selectedCategory,
  setSelectedCategory,
  categoryCounts,
  questCount = 39,
  spellCount = 42
}) {
  return (
    <>
      {/* Sidebar for Desktop y iPad */}
      <DesktopNav
        activeView={activeView}
        setActiveView={setActiveView}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
        questCount={questCount}
        spellCount={spellCount}
      />

      {/* Mobile 5-Tab Bottom Dock y Drawer */}
      <MobileBottomNav
        activeView={activeView}
        setActiveView={setActiveView}
        setSelectedCategory={setSelectedCategory}
      />
    </>
  );
}
