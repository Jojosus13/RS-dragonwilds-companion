import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import GameIcon from '../GameIcon';
import CraftingEmptyState from './CraftingEmptyState';
import CraftingPlannerHeader from './CraftingPlannerHeader';
import CraftingStatCards from './CraftingStatCards';
import CraftingTargetItemRow from './CraftingTargetItemRow';
import CraftingMaterialsTabs from './CraftingMaterialsTabs';
import CraftingRawMaterialsView from './CraftingRawMaterialsView';
import CraftingDirectMaterialsView from './CraftingDirectMaterialsView';
import CraftingWorkstationsView from './CraftingWorkstationsView';
import {
  buildItemMap,
  buildItemTree,
  calculateDirectMaterials,
  calculateRawBaseMaterials,
  calculateWorkstationSteps,
  calculateTotalCraftingXp
} from './craftingUtils';

export default function CraftingPlanner({ 
  plannerItems = [], 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearPlanner,
  allItems = [],
  onSelectItem 
}) {
  const [plannerMode, setPlannerMode] = useState('raw'); // 'raw' | 'direct' | 'steps'
  const [checkedRawMaterials, setCheckedRawMaterials] = useState({});
  const [checkedDirectMaterials, setCheckedDirectMaterials] = useState({});
  const [expandedItemTrees, setExpandedItemTrees] = useState({});

  // Fast item lookup map
  const itemMap = useMemo(() => buildItemMap(allItems), [allItems]);

  // Full trees for all planned items
  const fullRecipeTrees = useMemo(() => {
    return plannerItems.map(({ item, quantity }) => ({
      targetItem: item,
      targetQuantity: Number(quantity) || 1,
      tree: buildItemTree(itemMap, item.title || item.name, Number(quantity) || 1)
    }));
  }, [plannerItems, itemMap]);

  // Compute 1: Direct Recipe Materials
  const directMaterials = useMemo(
    () => calculateDirectMaterials(plannerItems, itemMap),
    [plannerItems, itemMap]
  );

  // Compute 2: Pure Raw Materials (Fully Decomposed)
  const rawBaseMaterials = useMemo(
    () => calculateRawBaseMaterials(fullRecipeTrees),
    [fullRecipeTrees]
  );

  // Compute 3: Workstations & Step-by-Step Workflow
  const workstationSteps = useMemo(
    () => calculateWorkstationSteps(fullRecipeTrees),
    [fullRecipeTrees]
  );

  // Total XP
  const totalCraftingXp = useMemo(
    () => calculateTotalCraftingXp(fullRecipeTrees),
    [fullRecipeTrees]
  );

  // Toggle checks for Raw checklist with confetti
  const toggleRawCheck = (matName) => {
    setCheckedRawMaterials((prev) => {
      const next = { ...prev, [matName]: !prev[matName] };
      const allChecked = rawBaseMaterials.length > 0 && rawBaseMaterials.every((m) => next[m.item]);
      if (allChecked && !prev[matName]) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      return next;
    });
  };

  // Toggle checks for Direct checklist with confetti
  const toggleDirectCheck = (matName) => {
    setCheckedDirectMaterials((prev) => {
      const next = { ...prev, [matName]: !prev[matName] };
      const allChecked = directMaterials.length > 0 && directMaterials.every((m) => next[m.item]);
      if (allChecked && !prev[matName]) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
      return next;
    });
  };

  // Progress Percentages
  const rawProgressPercent = useMemo(() => {
    if (rawBaseMaterials.length === 0) return 0;
    const checkedCount = rawBaseMaterials.filter((m) => checkedRawMaterials[m.item]).length;
    return Math.round((checkedCount / rawBaseMaterials.length) * 100);
  }, [rawBaseMaterials, checkedRawMaterials]);

  const directProgressPercent = useMemo(() => {
    if (directMaterials.length === 0) return 0;
    const checkedCount = directMaterials.filter((m) => checkedDirectMaterials[m.item]).length;
    return Math.round((checkedCount / directMaterials.length) * 100);
  }, [directMaterials, checkedDirectMaterials]);

  const toggleItemTree = (itemId) => {
    setExpandedItemTrees((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  if (plannerItems.length === 0) {
    return <CraftingEmptyState />;
  }

  const activeProgress = plannerMode === 'raw' ? rawProgressPercent : directProgressPercent;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header y Controls */}
      <CraftingPlannerHeader 
        itemCount={plannerItems.length} 
        onClearPlanner={onClearPlanner} 
      />

      {/* Summary Stat Cards */}
      <CraftingStatCards 
        rawCount={rawBaseMaterials.length}
        workstationCount={workstationSteps.length}
        totalXp={totalCraftingXp}
      />

      {/* Target Items List with Breakdown Toggles */}
      <div className="craft-planner-list">
        <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GameIcon name="cardboard-box" size={18} />
          Objetos a Fabricar
        </h3>

        {fullRecipeTrees.map(({ targetItem, targetQuantity, tree }) => (
          <CraftingTargetItemRow
            key={targetItem.id}
            targetItem={targetItem}
            targetQuantity={targetQuantity}
            tree={tree}
            isTreeOpen={!!expandedItemTrees[targetItem.id]}
            onToggleTree={toggleItemTree}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            onSelectItem={onSelectItem}
          />
        ))}
      </div>

      {/* Mode Selector Tabs for Breakdown y Shopping List */}
      <div className="recipe-section" style={{ padding: '20px' }}>
        <CraftingMaterialsTabs 
          plannerMode={plannerMode}
          setPlannerMode={setPlannerMode}
          directCount={directMaterials.length}
          workstationsCount={workstationSteps.length}
          progressPercent={activeProgress}
        />

        {/* VIEW 1: RAW BASE MATERIALS */}
        {plannerMode === 'raw' && (
          <CraftingRawMaterialsView 
            rawBaseMaterials={rawBaseMaterials}
            checkedRawMaterials={checkedRawMaterials}
            onToggleRawCheck={toggleRawCheck}
          />
        )}

        {/* VIEW 2: DIRECT MATERIALS */}
        {plannerMode === 'direct' && (
          <CraftingDirectMaterialsView 
            directMaterials={directMaterials}
            checkedDirectMaterials={checkedDirectMaterials}
            onToggleDirectCheck={toggleDirectCheck}
          />
        )}

        {/* VIEW 3: WORKSTATIONS WORKFLOW */}
        {plannerMode === 'steps' && (
          <CraftingWorkstationsView 
            workstationSteps={workstationSteps}
          />
        )}
      </div>
    </div>
  );
}
