import React, { useState, useMemo } from 'react';
import { 
  Hammer, 
  Trash2, 
  Plus, 
  Minus, 
  CheckSquare, 
  Square, 
  Sparkles, 
  Package, 
  ListChecks, 
  Layers,
  ChevronDown,
  ChevronRight,
  Workflow,
  Pickaxe,
  Flame,
  ArrowRight,
  ExternalLink,
  Zap,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import GameIcon from './common/GameIcon';

export default function CraftingPlanner({ 
  plannerItems = [], 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearPlanner,
  allItems = [],
  onSelectItem 
}) {
  const [plannerMode, setPlannerMode] = useState('raw'); // 'raw' | 'direct' | 'steps' | 'tree'
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
      outputQty,
      craftRuns,
      isRaw: false,
      children,
      itemObj
    };
  };

  // Full trees for all planned items
  const fullRecipeTrees = useMemo(() => {
    return plannerItems.map(({ item, quantity }) => {
      return {
        targetItem: item,
        targetQuantity: Number(quantity) || 1,
        tree: buildItemTree(item.title || item.name, Number(quantity) || 1)
      };
    });
  }, [plannerItems, itemMap]);

  // Compute 1: Direct Recipe Materials (Intermediate)
  const directMaterials = useMemo(() => {
    const totals = {};

    plannerItems.forEach(({ item, quantity }) => {
      const safeItemQty = Number(quantity) || 1;
      if (item.recipe?.materials) {
        item.recipe.materials.forEach((mat) => {
          const matObj = findItemByName(mat.item);
          const matName = matObj?.name || mat.item;
          const matQty = Number(mat.quantity) || Number(mat.count) || 1;
          const totalRequired = matQty * safeItemQty;

          if (!totals[matName]) {
            totals[matName] = {
              item: matName,
              rawName: mat.item,
              totalQuantity: 0,
              image: matObj?.image || null,
              itemObj: matObj,
              hasRecipe: !!matObj?.recipe,
              facility: matObj?.recipe?.facility || null,
              usedIn: []
            };
          }
          totals[matName].totalQuantity += totalRequired;
          totals[matName].usedIn.push({
            forItem: item.name,
            qtyNeeded: totalRequired
          });
        });
      }
    });

    return Object.values(totals).sort((a, b) => b.totalQuantity - a.totalQuantity);
  }, [plannerItems, itemMap]);

  // Compute 2: Pure Raw Materials (Fully Decomposed to Base Resources)
  const rawBaseMaterials = useMemo(() => {
    const rawTotals = {};

    function collectRaw(node, parentNode, rootTarget) {
      if (node.children.length === 0) {
        const key = node.name || node.title;
        if (!rawTotals[key]) {
          rawTotals[key] = {
            item: key,
            totalQuantity: 0,
            image: node.image,
            itemObj: node.itemObj,
            purposes: []
          };
        }
        rawTotals[key].totalQuantity += node.quantity;

        const isDirect = !parentNode || parentNode.name === rootTarget.name;
        const purposeKey = isDirect 
          ? `direct_${rootTarget.name}`
          : `${parentNode.name}_${rootTarget.name}`;

        const existingPurpose = rawTotals[key].purposes.find((p) => p.key === purposeKey);
        if (existingPurpose) {
          existingPurpose.qty += node.quantity;
        } else {
          rawTotals[key].purposes.push({
            key: purposeKey,
            qty: node.quantity,
            isDirect,
            producesItem: isDirect ? rootTarget.name : parentNode.name,
            producesQty: isDirect ? rootTarget.quantity : parentNode.quantity,
            facility: isDirect ? (rootTarget.recipe?.facility || null) : parentNode.facility,
            finalTarget: rootTarget.name
          });
        }
      } else {
        node.children.forEach((child) => collectRaw(child, node, rootTarget));
      }
    }

    fullRecipeTrees.forEach(({ targetItem, tree }) => {
      collectRaw(tree, null, targetItem);
    });

    return Object.values(rawTotals).sort((a, b) => b.totalQuantity - a.totalQuantity);
  }, [fullRecipeTrees]);

  // Compute 3: Workstations y Step-by-Step Workflow
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
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--gold-border)' }}>
        <GameIcon name="hammer-drop" size={54} color="var(--gold-500)" style={{ margin: '0 auto 16px' }} />
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

      {/* Target Items List with Breakdown Toggles */}
      <div className="craft-planner-list">
        <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GameIcon name="cardboard-box" size={18} />
          Objetos a Fabricar
        </h3>

        {fullRecipeTrees.map(({ targetItem, targetQuantity, tree }) => {
          const isTreeOpen = !!expandedItemTrees[targetItem.id];

          return (
            <div 
              key={targetItem.id} 
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--gold-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                transition: 'border-color 0.2s'
              }}
            >
              {/* Item Main Row */}
              <div 
                className="craft-item-row"
                style={{ border: 'none', background: 'transparent' }}
              >
                <div 
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flex: 1, minWidth: 0 }}
                  onClick={() => onSelectItem(targetItem)}
                  title="Ver ficha completa del objeto"
                >
                  <div className="item-icon-frame" style={{ width: '44px', height: '44px' }}>
                    <img 
                      src={targetItem.image} 
                      alt={targetItem.name} 
                      className="item-icon-img" 
                      referrerPolicy="no-referrer" 
                      style={{ width: '34px', height: '34px' }} 
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h4 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-title)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {targetItem.name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)' }}>
                        {targetItem.recipe?.facility || 'Mesa de Crafteo'}
                      </span>
                      {targetItem.recipe?.skillxp > 0 && (
                        <span style={{ fontSize: '0.72rem', color: '#63b3ed' }}>
                          +{targetItem.recipe.skillxp * targetQuantity} XP
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Tree Toggle Button */}
                  <button
                    className={`btn-fantasy ${isTreeOpen ? 'gold' : ''}`}
                    style={{ padding: '6px 12px', fontSize: '0.78rem', gap: '4px' }}
                    onClick={() => toggleItemTree(targetItem.id)}
                    title="Ver árbol de ingredientes desglosados"
                  >
                    <Workflow size={14} />
                    <span className="desktop-only-action">Desglose</span>
                    {isTreeOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', border: '1px solid var(--gold-border)' }}>
                    <button 
                      className="btn-fantasy btn-icon" 
                      style={{ width: '30px', height: '30px', border: 'none' }}
                      onClick={() => onUpdateQuantity(targetItem.id, Math.max(1, targetQuantity - 1))}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ padding: '0 10px', fontWeight: 'bold', color: 'var(--gold-400)', minWidth: '24px', textAlign: 'center' }}>
                      {targetQuantity}
                    </span>
                    <button 
                      className="btn-fantasy btn-icon" 
                      style={{ width: '30px', height: '30px', border: 'none' }}
                      onClick={() => onUpdateQuantity(targetItem.id, targetQuantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Remove Item */}
                  <button 
                    className="btn-fantasy btn-icon" 
                    style={{ width: '34px', height: '34px' }}
                    onClick={() => onRemoveItem(targetItem.id)}
                    title="Quitar objetivo"
                  >
                    <Trash2 size={16} color="#fc8181" />
                  </button>
                </div>
              </div>

              {/* Nested Tree Breakdown View for this specific item */}
              {isTreeOpen && (
                <div 
                  style={{ 
                    padding: '14px 18px', 
                    background: 'rgba(10, 13, 18, 0.75)', 
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)' 
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <Workflow size={15} color="var(--gold-400)" />
                    <span style={{ fontFamily: 'var(--font-title)', fontSize: '0.8rem', color: 'var(--gold-300)', fontWeight: 'bold' }}>
                      ÁRBOL DE FABRICACIÓN PASO A PASO
                    </span>
                  </div>

                  <RecipeTreeNode node={tree} onSelectItem={onSelectItem} isRoot={true} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mode Selector Tabs for Breakdown y Shopping List */}
      <div className="recipe-section" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              className={`filter-chip ${plannerMode === 'raw' ? 'active' : ''}`}
              onClick={() => setPlannerMode('raw')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <GameIcon name="plant-seed" size={14} />
              <span>Materia Prima Base (Desglose Total)</span>
            </button>

            <button
              className={`filter-chip ${plannerMode === 'direct' ? 'active' : ''}`}
              onClick={() => setPlannerMode('direct')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <GameIcon name="cardboard-box-closed" size={14} />
              <span>Materiales Directos ({directMaterials.length})</span>
            </button>

            <button
              className={`filter-chip ${plannerMode === 'steps' ? 'active' : ''}`}
              onClick={() => setPlannerMode('steps')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <GameIcon name="hammer-drop" size={14} />
              <span>Guía por Estaciones ({workstationSteps.length})</span>
            </button>
          </div>

          {/* Progress Indicator for checkable modes */}
          {(plannerMode === 'raw' || plannerMode === 'direct') && (
            <span style={{ fontSize: '0.85rem', color: (plannerMode === 'raw' ? rawProgressPercent : directProgressPercent) === 100 ? '#68d391' : 'var(--gold-400)', fontWeight: 'bold' }}>
              Progreso: {plannerMode === 'raw' ? rawProgressPercent : directProgressPercent}%
            </span>
          )}
        </div>

        {/* Progress Bar for Shopping Lists */}
        {(plannerMode === 'raw' || plannerMode === 'direct') && (
          <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.5)', borderRadius: '4px', overflow: 'hidden', marginBottom: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div 
              style={{ 
                width: `${plannerMode === 'raw' ? rawProgressPercent : directProgressPercent}%`, 
                height: '100%', 
                background: (plannerMode === 'raw' ? rawProgressPercent : directProgressPercent) === 100 ? '#48bb78' : 'var(--gold-gradient)',
                transition: 'width 0.3s ease'
              }} 
            />
          </div>
        )}

        {/* VIEW 1: RAW BASE MATERIALS (Desglose a recursos elementales) */}
        {plannerMode === 'raw' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <Info size={16} color="var(--gold-400)" />
              <span>
                Estos son todos los <strong>recursos fundamentales y menas</strong> que debes recolectar en el mundo o minas antes de empezar a craftear:
              </span>
            </div>

            <div className="ingredients-grid">
              {rawBaseMaterials.map((mat) => {
                const isDone = !!checkedRawMaterials[mat.item];
                return (
                  <div 
                    key={mat.item}
                    className={`checklist-item ${isDone ? 'checked' : ''}`}
                    onClick={() => toggleRawCheck(mat.item)}
                  >
                    {isDone ? (
                      <CheckSquare size={20} color="#48bb78" />
                    ) : (
                      <Square size={20} color="var(--gold-500)" />
                    )}

                    {mat.image && (
                      <div className="item-icon-frame" style={{ width: '32px', height: '32px', flexShrink: 0 }}>
                        <img src={mat.image} alt={mat.item} className="item-icon-img" referrerPolicy="no-referrer" style={{ width: '24px', height: '24px' }} />
                      </div>
                    )}

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold', color: isDone ? 'var(--text-muted)' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {mat.item}
                        </span>
                        <span style={{ color: isDone ? '#48bb78' : 'var(--gold-400)', fontWeight: '800' }}>
                          {mat.totalQuantity}x
                        </span>
                      </div>

                      {/* Transformation purpose breakdown */}
                      <div style={{ marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {mat.purposes && mat.purposes.map((p, pIdx) => (
                          <div key={pIdx} style={{ fontSize: '0.72rem', color: isDone ? 'var(--text-muted)' : '#cbd5e0', lineHeight: '1.3' }}>
                            {p.isDirect ? (
                              <span>
                                <span style={{ color: 'var(--gold-400)' }}>•</span> Para fabricar <strong>{p.producesQty}x {p.producesItem}</strong>
                              </span>
                            ) : (
                              <span>
                                <span style={{ color: 'var(--gold-400)' }}>•</span> Para crear <strong>{p.producesQty}x {p.producesItem}</strong>
                                {p.facility && <span style={{ color: 'var(--gold-400)', opacity: 0.85 }}> ({p.facility})</span>}
                                <span style={{ color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', marginLeft: '4px' }}>
                                  <ArrowRight size={11} style={{ marginRight: '4px' }} />
                                  <em>{p.finalTarget}</em>
                                </span>
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 2: DIRECT MATERIALS (Ingredientes de montaje directo) */}
        {plannerMode === 'direct' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <Info size={16} color="var(--gold-400)" />
              <span>
                Materiales directos necesarios en la mesa de crafteo para ensamblar los ítems seleccionados:
              </span>
            </div>

            <div className="ingredients-grid">
              {directMaterials.map((mat) => {
                const isDone = !!checkedDirectMaterials[mat.item];
                return (
                  <div 
                    key={mat.item}
                    className={`checklist-item ${isDone ? 'checked' : ''}`}
                    onClick={() => toggleDirectCheck(mat.item)}
                  >
                    {isDone ? (
                      <CheckSquare size={20} color="#48bb78" />
                    ) : (
                      <Square size={20} color="var(--gold-500)" />
                    )}

                    {mat.image && (
                      <div className="item-icon-frame" style={{ width: '32px', height: '32px', flexShrink: 0 }}>
                        <img src={mat.image} alt={mat.item} className="item-icon-img" referrerPolicy="no-referrer" style={{ width: '24px', height: '24px' }} />
                      </div>
                    )}

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                        <span style={{ fontWeight: 'bold', color: isDone ? 'var(--text-muted)' : 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {mat.item}
                        </span>
                        <span style={{ color: isDone ? '#48bb78' : 'var(--gold-400)', fontWeight: '800' }}>
                          {mat.totalQuantity}x
                        </span>
                      </div>
                      {mat.facility && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--gold-400)' }}>
                          {mat.facility}
                        </span>
                      )}
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block' }}>
                        Para: {mat.usedIn.map((u) => `${u.forItem} (${u.qtyNeeded})`).join(', ')}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: WORKSTATIONS WORKFLOW (Guía paso a paso por estación) */}
        {plannerMode === 'steps' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <Info size={16} color="var(--gold-400)" />
              <span>
                Orden recomendado de estaciones de trabajo para transformar las materias primas en tus objetivos finales:
              </span>
            </div>

            {workstationSteps.map((ws, sIdx) => (
              <div 
                key={ws.facility}
                style={{
                  background: 'rgba(14, 18, 25, 0.9)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span 
                      style={{
                        background: 'var(--gold-500)',
                        color: '#000',
                        fontFamily: 'var(--font-title)',
                        fontWeight: '800',
                        fontSize: '0.75rem',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {sIdx + 1}
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', fontSize: '1rem' }}>
                      {ws.facility}
                    </h4>
                  </div>
                  {ws.skill && (
                    <span style={{ fontSize: '0.75rem', color: '#63b3ed', fontFamily: 'var(--font-title)' }}>
                      Habilidad: {ws.skill}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {ws.crafts.map((cr, cIdx) => (
                    <div 
                      key={cIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        background: 'rgba(20, 25, 36, 0.6)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(255,255,255,0.04)',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {cr.image && (
                          <img src={cr.image} alt={cr.name} style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                        )}
                        <div>
                          <strong style={{ color: '#fff', fontSize: '0.9rem' }}>
                            Fabricar {cr.totalQuantity}x {cr.name}
                          </strong>
                          {cr.totalXp > 0 && (
                            <span style={{ fontSize: '0.72rem', color: '#68d391', marginLeft: '8px' }}>
                              (+{cr.totalXp} XP)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Required inputs */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <span>Requiere:</span>
                        {cr.inputs.map((inp, iIdx) => (
                          <span 
                            key={iIdx}
                            style={{ 
                              background: 'rgba(0,0,0,0.4)', 
                              padding: '2px 8px', 
                              borderRadius: '6px', 
                              border: '1px solid rgba(255,255,255,0.08)',
                              color: 'var(--gold-400)' 
                            }}
                          >
                            {inp.quantity}x {inp.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Component for rendering recursive Tree Nodes
function RecipeTreeNode({ node, onSelectItem, isRoot = false }) {
  if (!node) return null;

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: isRoot ? 0 : '20px', marginTop: '8px', position: 'relative' }}>
      {!isRoot && (
        <div 
          style={{
            position: 'absolute',
            left: '-14px',
            top: '14px',
            width: '12px',
            height: '1px',
            background: 'var(--gold-border)'
          }}
        />
      )}

      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 12px',
          background: hasChildren ? 'rgba(20, 25, 36, 0.7)' : 'rgba(10, 14, 20, 0.5)',
          borderRadius: 'var(--radius-sm)',
          border: hasChildren ? '1px solid var(--gold-border)' : '1px dashed rgba(255,255,255,0.1)',
          cursor: node.itemObj ? 'pointer' : 'default',
          transition: 'all 0.15s'
        }}
        onClick={() => node.itemObj && onSelectItem(node.itemObj)}
        title={node.itemObj ? `Ver ficha de ${node.name}` : undefined}
      >
        {node.image && (
          <img 
            src={node.image} 
            alt={node.name} 
            style={{ width: '24px', height: '24px', objectFit: 'contain', flexShrink: 0 }} 
          />
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--gold-400)', fontWeight: 'bold', fontSize: '0.85rem' }}>
            {node.quantity}x
          </span>
          <span style={{ color: '#edf2f7', fontSize: '0.85rem', fontWeight: hasChildren ? '600' : 'normal' }}>
            {node.name}
          </span>

          {node.facility && (
            <span 
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-gold)',
                background: 'rgba(212,175,55,0.12)',
                padding: '2px 7px',
                borderRadius: '8px',
                border: '1px solid rgba(212,175,55,0.3)'
              }}
            >
              {node.facility}
            </span>
          )}

          {node.isRaw && (
            <span 
              style={{
                fontSize: '0.65rem',
                color: '#68d391',
                background: 'rgba(72,187,120,0.12)',
                padding: '2px 6px',
                borderRadius: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <GameIcon name="plant-seed" size={11} color="#68d391" />
              <span>Recurso Base</span>
            </span>
          )}
        </div>
      </div>

      {/* Children branches */}
      {hasChildren && (
        <div style={{ borderLeft: '1px solid var(--gold-border)', marginLeft: '12px', paddingLeft: '4px' }}>
          {node.children.map((child, idx) => (
            <RecipeTreeNode 
              key={idx} 
              node={child} 
              onSelectItem={onSelectItem} 
              isRoot={false} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
