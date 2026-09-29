import React, { useState, useMemo } from 'react';
import { Hammer, Trash2, Package } from 'lucide-react';
import confetti from 'canvas-confetti';
import CraftingTargetCard from './CraftingTargetCard';
import MaterialsSummary from './MaterialsSummary';

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

  // Build fast item lookup map
  const itemMap = useMemo(() => {
    const map = new Map();
    allItems.forEach((it) => {
      if (it.title) map.set(it.title.toLowerCase().trim(), it);
      if (it.name) map.set(it.name.toLowerCase().trim(), it);
      if (it.id) map.set(it.id.toLowerCase().trim(), it);
      if (it.englishTitle) map.set(it.englishTitle.toLowerCase().trim(), it);
    });
    return map;
  }, [allItems]);

  const findItemByName = (name) => {
    if (!name) return null;
    return itemMap.get(name.toLowerCase().trim()) || null;
  };

  // Helper to build recursive tree for a given item
  const buildItemTree = (itemName, quantity, visited = new Set(), depth = 0) => {
    const itemObj = findItemByName(itemName);
    if (
      !itemObj ||
      !itemObj.recipe ||
      !itemObj.recipe.materials ||
      itemObj.recipe.materials.length === 0 ||
      visited.has(itemName.toLowerCase()) ||
      depth > 8
    ) {
      return {
        name: itemObj?.name || itemName,
        title: itemObj?.title || itemName,
        quantity,
        image: itemObj?.image || null,
        facility: null,
        skill: null,
        skillxp: 0,
        isRaw: true,
        children: [],
        itemObj
      };
    }

    const newVisited = new Set(visited);
    newVisited.add(itemName.toLowerCase());

    const safeQty = Number(quantity) || 1;
    const outputQty = Number(itemObj.recipe.outputQty) || 1;
    const craftRuns = Math.ceil(safeQty / outputQty);
    const totalXp = (Number(itemObj.recipe.skillxp) || 0) * craftRuns;

    const children = itemObj.recipe.materials.map((mat) => {
      const matQty = Number(mat.quantity) || Number(mat.count) || 1;
      const totalMatNeeded = craftRuns * matQty;
      return buildItemTree(mat.item, totalMatNeeded, newVisited, depth + 1);
    });

    return {
      name: itemObj.name || itemName,
      title: itemObj.title || itemName,
      quantity: safeQty,
      image: itemObj.image || null,
      facility: itemObj.recipe.facility || 'Mesa de Crafteo',
      skill: itemObj.recipe.skill || 'Artesanía',
      skillxp: totalXp,
      craftRuns,
      isRaw: false,
      children,
      itemObj
    };
  };

  // Compute Full Recipe Trees for all Planner Items
  const fullRecipeTrees = useMemo(() => {
    return plannerItems.map((target) => {
      const targetItem = target.item;
      const targetQuantity = target.quantity || 1;
      const tree = buildItemTree(targetItem.name || targetItem.title, targetQuantity);
      return { targetItem, targetQuantity, tree };
    });
  }, [plannerItems, itemMap]);

  // Compute Direct Materials (First Level)
  const directMaterials = useMemo(() => {
    const directTotals = {};
    plannerItems.forEach(({ item, quantity }) => {
      if (!item.recipe || !item.recipe.materials) return;
      const outputQty = Number(item.recipe.outputQty) || 1;
      const runs = Math.ceil(quantity / outputQty);

      item.recipe.materials.forEach((mat) => {
        const matName = mat.item;
        const matQty = (Number(mat.quantity) || 1) * runs;
        const matObj = findItemByName(matName);

        if (!directTotals[matName]) {
          directTotals[matName] = {
            item: matName,
            totalQuantity: 0,
            image: matObj?.image || null,
            facility: item.recipe.facility,
            usedIn: []
          };
        }
        directTotals[matName].totalQuantity += matQty;
        directTotals[matName].usedIn.push({
          forItem: item.name || item.title,
          qtyNeeded: matQty
        });
      });
    });
    return Object.values(directTotals).sort((a, b) => b.totalQuantity - a.totalQuantity);
  }, [plannerItems, itemMap]);

  // Compute Raw Base Materials (Leaf nodes of the recursive tree)
  const rawBaseMaterials = useMemo(() => {
    const rawTotals = {};

    function collectRaw(node, parentNode = null, targetItem = null) {
      if (node.isRaw || node.children.length === 0) {
        const matName = node.name;
        if (!rawTotals[matName]) {
          rawTotals[matName] = {
            item: matName,
            totalQuantity: 0,
            image: node.image,
            purposes: []
          };
        }
        rawTotals[matName].totalQuantity += node.quantity;
        if (parentNode) {
          rawTotals[matName].purposes.push({
            producesItem: parentNode.name,
            producesQty: parentNode.quantity,
            facility: parentNode.facility,
            finalTarget: targetItem?.name || targetItem?.title,
            isDirect: false
          });
        } else {
          rawTotals[matName].purposes.push({
            producesItem: node.name,
            producesQty: node.quantity,
            finalTarget: targetItem?.name || targetItem?.title,
            isDirect: true
          });
        }
      } else {
        node.children.forEach((child) => collectRaw(child, node, targetItem));
      }
    }

    fullRecipeTrees.forEach(({ targetItem, tree }) => {
      collectRaw(tree, null, targetItem);
    });

    return Object.values(rawTotals).sort((a, b) => b.totalQuantity - a.totalQuantity);
  }, [fullRecipeTrees]);

  // Compute Workstations y Step-by-Step Workflow
  const workstationSteps = useMemo(() => {
    const stations = {};

    function collectStations(node) {
      if (node.facility && node.children.length > 0) {
        const fac = node.facility;
        if (!stations[fac]) {
          stations[fac] = {
            facility: fac,
            skill: node.skill,
            crafts: []
          };
        }
        const existingCraft = stations[fac].crafts.find((c) => c.name === node.name);
        if (existingCraft) {
          existingCraft.totalQuantity += node.quantity;
          existingCraft.runs += node.craftRuns;
          existingCraft.totalXp += node.skillxp;
        } else {
          stations[fac].crafts.push({
            name: node.name,
            title: node.title,
            image: node.image,
            totalQuantity: node.quantity,
            runs: node.craftRuns,
            totalXp: node.skillxp,
            itemObj: node.itemObj,
            inputs: node.children.map((c) => ({
              name: c.name,
              quantity: c.quantity,
              image: c.image
            }))
          });
        }
      }
      node.children.forEach((c) => collectStations(c));
    }

    fullRecipeTrees.forEach(({ tree }) => {
      collectStations(tree);
    });

    return Object.values(stations);
  }, [fullRecipeTrees]);

  // Total XP calculation
  const totalCraftingXp = useMemo(() => {
    let xp = 0;
    function sumXp(node) {
      xp += node.skillxp || 0;
      node.children.forEach(sumXp);
    }
    fullRecipeTrees.forEach(({ tree }) => sumXp(tree));
    return xp;
  }, [fullRecipeTrees]);

  // Toggle checks for Raw checklist
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

  // Toggle checks for Direct checklist
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
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--gold-border)' }}>
        <Hammer size={54} color="var(--gold-500)" style={{ margin: '0 auto 16px' }} />
        <h2 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', marginBottom: '8px' }}>
          Tu Taller de Crafteo está Vacío
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 20px', lineHeight: '1.6' }}>
          Explora el catálogo y pulsa el botón <strong>+</strong> o <strong>"Añadir a Crafteo"</strong> en cualquier armadura, arma o ítem para ver el cálculo y desglose automático hasta sus materiales más simples.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header y Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.45rem', color: 'var(--gold-300)' }}>
              Calculadora de Crafteo y Desglose
            </h2>
            <span className="hub-header-badge" style={{ padding: '3px 10px', fontSize: '0.7rem' }}>
              Multi-Nivel
            </span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
            Calculando materiales completos para <strong>{plannerItems.length}</strong> objetivo{plannerItems.length > 1 ? 's' : ''} de fabricación
          </p>
        </div>

        <button
          className="btn-fantasy"
          onClick={onClearPlanner}
          style={{ color: '#fc8181', borderColor: 'rgba(245, 101, 101, 0.3)' }}
        >
          <Trash2 size={16} />
          <span>Vaciar Lista</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
        <div className="recipe-section" style={{ padding: '14px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', fontFamily: 'var(--font-title)' }}>
            RECURSOS BASE PUROS
          </span>
          <p style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
            {rawBaseMaterials.length} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>tipos</span>
          </p>
        </div>

        <div className="recipe-section" style={{ padding: '14px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: '#63b3ed', fontFamily: 'var(--font-title)' }}>
            ESTACIONES DE TRABAJO
          </span>
          <p style={{ fontSize: '1.4rem', fontWeight: '800', color: '#fff', marginTop: '4px' }}>
            {workstationSteps.length} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>bancos</span>
          </p>
        </div>

        <div className="recipe-section" style={{ padding: '14px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: '#48bb78', fontFamily: 'var(--font-title)' }}>
            EXPERIENCIA TOTAL (XP)
          </span>
          <p style={{ fontSize: '1.4rem', fontWeight: '800', color: '#68d391', marginTop: '4px' }}>
            +{totalCraftingXp.toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>XP</span>
          </p>
        </div>
      </div>

      {/* Target Items List */}
      <div className="craft-planner-list">
        <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Package size={18} />
          Objetos a Fabricar
        </h3>

        {fullRecipeTrees.map(({ targetItem, targetQuantity, tree }) => (
          <CraftingTargetCard
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

      {/* Materials Summary and Step-by-Step Sections */}
      <MaterialsSummary
        plannerMode={plannerMode}
        setPlannerMode={setPlannerMode}
        rawBaseMaterials={rawBaseMaterials}
        directMaterials={directMaterials}
        workstationSteps={workstationSteps}
        checkedRawMaterials={checkedRawMaterials}
        checkedDirectMaterials={checkedDirectMaterials}
        onToggleRawCheck={toggleRawCheck}
        onToggleDirectCheck={toggleDirectCheck}
        rawProgressPercent={rawProgressPercent}
        directProgressPercent={directProgressPercent}
        onSelectItem={onSelectItem}
      />
    </div>
  );
}
