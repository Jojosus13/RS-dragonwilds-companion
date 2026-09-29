import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Circle, 
  Award, 
  Scroll, 
  ShieldAlert, 
  ExternalLink, 
  Check, 
  Sparkles,
  ChevronRight,
  X,
  MapPin,
  Package,
  Swords,
  BookOpen,
  ListChecks,
  AlertTriangle
} from 'lucide-react';
import questsData from '../data/quests.json';
import { normalizeText, getWordStems } from '../utils/searchUtils';
import GameIcon from './GameIcon';

const DIFFICULTY_COLORS = {
  'Principiante': { bg: 'rgba(72, 187, 120, 0.15)', text: '#48bb78', border: 'rgba(72, 187, 120, 0.3)' },
  'Intermedia': { bg: 'rgba(66, 153, 225, 0.15)', text: '#4299e1', border: 'rgba(66, 153, 225, 0.3)' },
  'Maestra': { bg: 'rgba(159, 122, 234, 0.15)', text: '#9f7aea', border: 'rgba(159, 122, 234, 0.3)' },
  'Gran Maestra': { bg: 'rgba(237, 137, 54, 0.15)', text: '#ed8936', border: 'rgba(237, 137, 54, 0.3)' }
};

export default function QuestViewer({ onViewQuestOnMap }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all'); // all, Principal, Secundaria
  const [statusFilter, setStatusFilter] = useState('all'); // all, completed, in_progress, pending
  const [selectedQuestModal, setSelectedQuestModal] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('guide'); // guide, requirements, enemies, rewards

  // Persistent Quest Status in localStorage
  const [questStatusMap, setQuestStatusMap] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_dw_quest_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persistent Walkthrough Steps Checklist in localStorage
  const [checkedStepsMap, setCheckedStepsMap] = useState(() => {
    try {
      const saved = localStorage.getItem('rs_dw_quest_checked_steps');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_quest_progress', JSON.stringify(questStatusMap));
    } catch {}
  }, [questStatusMap]);

  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_quest_checked_steps', JSON.stringify(checkedStepsMap));
    } catch {}
  }, [checkedStepsMap]);

  const toggleQuestStatus = (questId, currentStatus) => {
    setQuestStatusMap((prev) => {
      let nextStatus = 'in_progress';
      if (!currentStatus || currentStatus === 'pending') nextStatus = 'in_progress';
      else if (currentStatus === 'in_progress') nextStatus = 'completed';
      else if (currentStatus === 'completed') nextStatus = 'pending';

      return {
        ...prev,
        [questId]: nextStatus
      };
    });
  };

  const toggleStepChecked = (questId, stepIndex) => {
    const key = `${questId}_${stepIndex}`;
    setCheckedStepsMap((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filtered Quests with smart Spanish search
  const filteredQuests = useMemo(() => {
    return questsData.filter((q) => {
      // Difficulty
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;

      // Type
      if (selectedType !== 'all' && q.questType !== selectedType) return false;

      // Status
      const status = questStatusMap[q.id] || 'pending';
      if (statusFilter !== 'all' && status !== statusFilter) return false;

      // Search
      if (searchQuery.trim()) {
        const normQ = normalizeText(searchQuery);
        const qTokens = normQ.split(/\s+/).filter(Boolean);
        const searchTarget = normalizeText(
          `${q.name} ${q.englishTitle || ''} ${q.summary || ''} ${q.startPoint || ''} ${q.requirements?.join(' ') || ''} ${q.itemsRequired?.join(' ') || ''}`
        );

        const matchesAll = qTokens.every((token) => {
          const stems = getWordStems(token);
          return stems.some((stem) => searchTarget.includes(stem));
        });

        if (!matchesAll) return false;
      }

      return true;
    });
  }, [selectedDifficulty, selectedType, statusFilter, searchQuery, questStatusMap]);

  // Completed count
  const completedCount = useMemo(() => {
    return Object.values(questStatusMap).filter((s) => s === 'completed').length;
  }, [questStatusMap]);

  const inProgressCount = useMemo(() => {
    return Object.values(questStatusMap).filter((s) => s === 'in_progress').length;
  }, [questStatusMap]);

  return (
    <div className="quest-viewer-container">
      {/* Sticky Header with Search y Filters */}
      <div className="search-filter-section">
        {/* Search Bar */}
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text"
            className="search-input"
            placeholder="Buscar misión o guía (ej: Dragon Slayer, Acumulador de Ava, Fortaleza, Caratacus...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="filters-row" style={{ flexWrap: 'wrap', gap: '12px' }}>
          {/* Difficulty Chips */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-title)', color: 'var(--text-muted)' }}>
              DIFICULTAD:
            </span>
            <button
              className={`filter-chip ${selectedDifficulty === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedDifficulty('all')}
            >
              Todas
            </button>
            <button
              className={`filter-chip ${selectedDifficulty === 'Principiante' ? 'active' : ''}`}
              style={{ color: '#48bb78' }}
              onClick={() => setSelectedDifficulty('Principiante')}
            >
              Principiante
            </button>
            <button
              className={`filter-chip ${selectedDifficulty === 'Intermedia' ? 'active' : ''}`}
              style={{ color: '#4299e1' }}
              onClick={() => setSelectedDifficulty('Intermedia')}
            >
              Intermedia
            </button>
            <button
              className={`filter-chip ${selectedDifficulty === 'Maestra' ? 'active' : ''}`}
              style={{ color: '#9f7aea' }}
              onClick={() => setSelectedDifficulty('Maestra')}
            >
              Maestra
            </button>
            <button
              className={`filter-chip ${selectedDifficulty === 'Gran Maestra' ? 'active' : ''}`}
              style={{ color: '#ed8936' }}
              onClick={() => setSelectedDifficulty('Gran Maestra')}
            >
              Gran Maestra
            </button>
          </div>

          {/* Type Filter */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-title)', color: 'var(--text-muted)' }}>
              TIPO:
            </span>
            <button
              className={`filter-chip ${selectedType === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedType('all')}
            >
              Todos
            </button>
            <button
              className={`filter-chip ${selectedType === 'Principal' ? 'active' : ''}`}
              style={{ color: 'var(--gold-400)' }}
              onClick={() => setSelectedType('Principal')}
            >
              Principales
            </button>
            <button
              className={`filter-chip ${selectedType === 'Secundaria' ? 'active' : ''}`}
              style={{ color: '#a0aec0' }}
              onClick={() => setSelectedType('Secundaria')}
            >
              Secundarias
            </button>
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginLeft: 'auto', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-title)', color: 'var(--text-muted)' }}>
              ESTADO:
            </span>
            <button
              className={`filter-chip ${statusFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              Todos
            </button>
            <button
              className={`filter-chip ${statusFilter === 'completed' ? 'active' : ''}`}
              style={{ color: 'var(--gold-400)' }}
              onClick={() => setStatusFilter('completed')}
            >
              <CheckCircle2 size={12} />
              Completadas ({completedCount})
            </button>
            <button
              className={`filter-chip ${statusFilter === 'in_progress' ? 'active' : ''}`}
              style={{ color: '#4299e1' }}
              onClick={() => setStatusFilter('in_progress')}
            >
              <Clock size={12} />
              En Curso ({inProgressCount})
            </button>
          </div>
        </div>
      </div>

      {/* Overview Tracker Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        padding: '14px 20px',
        marginBottom: '20px',
        background: 'rgba(212, 175, 55, 0.08)',
        border: '1px solid var(--gold-border)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <GameIcon name="treasure-map" size={22} color="var(--gold-400)" />
          <div>
            <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', fontSize: '1.05rem', margin: 0 }}>
              GUÍAS Y DIARIO DE MISIONES DE ASHENFALL
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              39 Misiones traducidas al español con guías paso a paso, requisitos y recompensas
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>PROGRESO TOTAL</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--gold-400)' }}>
              {completedCount} / {questsData.length}
            </strong>
          </div>
          <div style={{ width: '120px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${(completedCount / questsData.length) * 100}%`, 
                background: 'var(--gold-gradient)',
                borderRadius: '4px',
                transition: 'width 0.3s ease'
              }} 
            />
          </div>
        </div>
      </div>

      {/* Quest Cards Grid */}
      {filteredQuests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--gold-border)' }}>
          <Scroll size={48} color="var(--gold-500)" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', marginBottom: '8px' }}>
            No se encontraron misiones
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
            Intenta cambiar los términos de búsqueda o los filtros de dificultad y tipo.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '16px' }}>
          {filteredQuests.map((quest) => {
            const status = questStatusMap[quest.id] || 'pending';
            const diffStyle = DIFFICULTY_COLORS[quest.difficulty] || DIFFICULTY_COLORS['Intermedia'];
            const stepsCount = quest.walkthrough ? quest.walkthrough.length : 0;

            return (
              <div 
                key={quest.id} 
                className="quest-card"
                style={{
                  background: status === 'completed' ? 'rgba(20, 28, 22, 0.85)' : 'var(--bg-card)',
                  border: status === 'completed' ? '1px solid rgba(72, 187, 120, 0.4)' : '1px solid var(--gold-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative'
                }}
              >
                {/* Top Row: Title, English Subtitle y Status toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span 
                        style={{ 
                          padding: '2px 7px', 
                          borderRadius: '10px', 
                          fontSize: '0.68rem', 
                          fontFamily: 'var(--font-title)',
                          fontWeight: 700,
                          background: quest.questType === 'Principal' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.07)',
                          color: quest.questType === 'Principal' ? 'var(--gold-300)' : 'var(--text-secondary)',
                          border: quest.questType === 'Principal' ? '1px solid var(--gold-border)' : '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        {quest.questType}
                      </span>
                      <span 
                        style={{ 
                          padding: '2px 7px', 
                          borderRadius: '10px', 
                          fontSize: '0.68rem', 
                          fontFamily: 'var(--font-title)',
                          fontWeight: 700,
                          background: diffStyle.bg,
                          color: diffStyle.text,
                          border: `1px solid ${diffStyle.border}`
                        }}
                      >
                        {quest.difficulty}
                      </span>
                    </div>

                    <h4 
                      style={{ 
                        fontFamily: 'var(--font-title)', 
                        fontSize: '1.05rem', 
                        color: status === 'completed' ? '#68d391' : 'var(--text-primary)',
                        marginBottom: '2px',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        setSelectedQuestModal(quest);
                        setActiveModalTab('guide');
                      }}
                    >
                      {quest.name}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      {quest.englishTitle}
                    </span>
                  </div>

                  {/* Status Toggle Button */}
                  <button
                    onClick={() => toggleQuestStatus(quest.id, status)}
                    title={status === 'completed' ? 'Marcar como pendiente' : status === 'in_progress' ? 'Marcar como completada' : 'Marcar como en curso'}
                    style={{
                      background: status === 'completed' ? 'rgba(72, 187, 120, 0.2)' : status === 'in_progress' ? 'rgba(66, 153, 225, 0.2)' : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${status === 'completed' ? '#48bb78' : status === 'in_progress' ? '#4299e1' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '8px',
                      padding: '6px 10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '0.75rem',
                      color: status === 'completed' ? '#48bb78' : status === 'in_progress' ? '#4299e1' : 'var(--text-muted)',
                      fontFamily: 'var(--font-title)',
                      fontWeight: 600,
                      flexShrink: 0
                    }}
                  >
                    {status === 'completed' ? (
                      <>
                        <Check size={13} />
                        <span>Completada</span>
                      </>
                    ) : status === 'in_progress' ? (
                      <>
                        <Clock size={13} />
                        <span>En Curso</span>
                      </>
                    ) : (
                      <>
                        <Circle size={13} />
                        <span>Pendiente</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Summary */}
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                  {quest.summary}
                </p>

                {/* Start Point y Items Badges */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {quest.startPoint && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <MapPin size={13} color="var(--gold-400)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: '#cbd5e1', lineHeight: 1.3 }}>{quest.startPoint}</span>
                    </div>
                  )}

                  {quest.itemsRequired && quest.itemsRequired.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Package size={13} color="#4299e1" style={{ flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {quest.itemsRequired.length} {quest.itemsRequired.length === 1 ? 'objeto necesario' : 'objetos necesarios'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Rewards Snippet */}
                {quest.rewards && quest.rewards.length > 0 && (
                  <div style={{ background: 'rgba(0,0,0,0.25)', padding: '8px 12px', borderRadius: '8px', borderLeft: '2px solid var(--gold-500)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--gold-400)', fontFamily: 'var(--font-title)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                      RECOMPENSA:
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                      {quest.rewards[0]}
                    </span>
                  </div>
                )}

                {/* View Details / Guide and Map Buttons */}
                <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                  <button
                    className="btn-fantasy"
                    style={{ flex: 1, padding: '9px', fontSize: '0.82rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
                    onClick={() => {
                      setSelectedQuestModal(quest);
                      setActiveModalTab('guide');
                    }}
                  >
                    <BookOpen size={14} />
                    <span>Guía ({stepsCount})</span>
                    <ChevronRight size={14} />
                  </button>

                  <button
                    className="btn-fantasy"
                    style={{ padding: '9px 12px', fontSize: '0.82rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', color: 'var(--gold-300)', borderColor: 'var(--gold-border)' }}
                    title="Localizar punto de inicio en el Mapa Interactivo y trazar ruta"
                    onClick={() => onViewQuestOnMap && onViewQuestOnMap(quest)}
                  >
                    <GameIcon name="treasure-map" size={14} />
                    <span>Mapa</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quest Details y Full Walkthrough Modal */}
      {selectedQuestModal && (
        <div className="modal-overlay" onClick={() => setSelectedQuestModal(null)}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: '780px', width: '92vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
          >
            {/* Modal Header */}
            <div className="modal-header" style={{ paddingBottom: '12px' }}>
              <div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px' }}>
                  <span 
                    style={{ 
                      padding: '2px 8px', 
                      borderRadius: '10px', 
                      fontSize: '0.7rem', 
                      fontFamily: 'var(--font-title)',
                      fontWeight: 700,
                      background: selectedQuestModal.questType === 'Principal' ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                      color: selectedQuestModal.questType === 'Principal' ? 'var(--gold-300)' : 'var(--text-secondary)',
                      border: selectedQuestModal.questType === 'Principal' ? '1px solid var(--gold-border)' : '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    Misión {selectedQuestModal.questType}
                  </span>
                  <span 
                    style={{ 
                      padding: '2px 8px', 
                      borderRadius: '10px', 
                      fontSize: '0.7rem', 
                      fontFamily: 'var(--font-title)',
                      fontWeight: 700,
                      background: DIFFICULTY_COLORS[selectedQuestModal.difficulty]?.bg,
                      color: DIFFICULTY_COLORS[selectedQuestModal.difficulty]?.text,
                      border: `1px solid ${DIFFICULTY_COLORS[selectedQuestModal.difficulty]?.border}`
                    }}
                  >
                    {selectedQuestModal.difficulty}
                  </span>
                </div>
                <h3 className="modal-title" style={{ fontSize: '1.25rem', color: 'var(--gold-300)' }}>
                  {selectedQuestModal.name}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  {selectedQuestModal.englishTitle} • Wiki Dragonwilds
                </span>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedQuestModal(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div style={{ 
              display: 'flex', 
              gap: '4px', 
              padding: '0 16px', 
              borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
              background: 'rgba(0, 0, 0, 0.2)',
              overflowX: 'auto'
            }}>
              <button
                className={`filter-chip ${activeModalTab === 'guide' ? 'active' : ''}`}
                style={{ borderRadius: '0', borderBottom: activeModalTab === 'guide' ? '2px solid var(--gold-400)' : 'none', padding: '10px 14px' }}
                onClick={() => setActiveModalTab('guide')}
              >
                <BookOpen size={14} />
                <span>Guía Paso a Paso</span>
              </button>
              <button
                className={`filter-chip ${activeModalTab === 'requirements' ? 'active' : ''}`}
                style={{ borderRadius: '0', borderBottom: activeModalTab === 'requirements' ? '2px solid var(--gold-400)' : 'none', padding: '10px 14px' }}
                onClick={() => setActiveModalTab('requirements')}
              >
                <Package size={14} />
                <span>Requisitos y Objetos ({selectedQuestModal.itemsRequired?.length || 0})</span>
              </button>
              {selectedQuestModal.enemies && selectedQuestModal.enemies.length > 0 && (
                <button
                  className={`filter-chip ${activeModalTab === 'enemies' ? 'active' : ''}`}
                  style={{ borderRadius: '0', borderBottom: activeModalTab === 'enemies' ? '2px solid var(--gold-400)' : 'none', padding: '10px 14px' }}
                  onClick={() => setActiveModalTab('enemies')}
                >
                  <Swords size={14} />
                  <span>Enemigos ({selectedQuestModal.enemies.length})</span>
                </button>
              )}
              <button
                className={`filter-chip ${activeModalTab === 'rewards' ? 'active' : ''}`}
                style={{ borderRadius: '0', borderBottom: activeModalTab === 'rewards' ? '2px solid var(--gold-400)' : 'none', padding: '10px 14px' }}
                onClick={() => setActiveModalTab('rewards')}
              >
                <Award size={14} />
                <span>Recompensas</span>
              </button>
            </div>

            {/* Modal Body with Scroll */}
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', padding: '16px 20px', flex: 1 }}>
              
              {/* START POINT CALLOUT ALWAYS VISIBLE */}
              <div style={{
                background: 'rgba(212, 175, 55, 0.07)',
                border: '1px solid var(--gold-border)',
                borderRadius: '8px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <MapPin size={18} color="var(--gold-400)" style={{ flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', fontFamily: 'var(--font-title)', fontWeight: 600, display: 'block' }}>
                    PUNTO DE INICIO
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#f0f4f8' }}>
                    {selectedQuestModal.startPoint}
                  </span>
                </div>
              </div>

              {/* TAB 1: GUIDE / WALKTHROUGH */}
              {activeModalTab === 'guide' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Synopsis */}
                  <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px 14px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-title)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      SINOPSIS
                    </span>
                    <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                      {selectedQuestModal.summary}
                    </p>
                  </div>

                  {/* Steps List */}
                  {selectedQuestModal.walkthrough && selectedQuestModal.walkthrough.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-title)', color: 'var(--gold-400)', fontWeight: 600 }}>
                          PASOS DE LA GUÍA ({selectedQuestModal.walkthrough.length})
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Marca los pasos a medida que avances
                        </span>
                      </div>

                      {selectedQuestModal.walkthrough.map((step, idx) => {
                        const stepKey = `${selectedQuestModal.id}_${idx}`;
                        const isChecked = !!checkedStepsMap[stepKey];

                        return (
                          <div
                            key={idx}
                            style={{
                              background: isChecked ? 'rgba(72, 187, 120, 0.08)' : 'rgba(23, 29, 41, 0.9)',
                              border: isChecked ? '1px solid rgba(72, 187, 120, 0.3)' : '1px solid rgba(212, 175, 55, 0.2)',
                              borderRadius: '10px',
                              padding: '14px',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            <div 
                              style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'space-between', 
                                cursor: 'pointer',
                                marginBottom: '8px'
                              }}
                              onClick={() => toggleStepChecked(selectedQuestModal.id, idx)}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div
                                  style={{
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '50%',
                                    background: isChecked ? '#48bb78' : 'rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#000',
                                    flexShrink: 0
                                  }}
                                >
                                  {isChecked ? <Check size={14} color="#fff" /> : <span style={{ fontSize: '0.75rem', color: '#fff', fontWeight: 600 }}>{idx + 1}</span>}
                                </div>
                                <h4 style={{ 
                                  fontFamily: 'var(--font-title)', 
                                  fontSize: '0.95rem', 
                                  color: isChecked ? '#68d391' : 'var(--gold-300)',
                                  margin: 0,
                                  textDecoration: isChecked ? 'line-through' : 'none'
                                }}>
                                  {step.stepTitle}
                                </h4>
                              </div>

                              <button
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: isChecked ? '#48bb78' : 'var(--text-muted)',
                                  cursor: 'pointer',
                                  fontSize: '0.75rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                {isChecked ? 'Completado' : 'Marcar paso'}
                              </button>
                            </div>

                            {/* Step Description / paragraphs */}
                            <div style={{ 
                              paddingLeft: '32px', 
                              color: isChecked ? 'var(--text-muted)' : 'var(--text-primary)', 
                              fontSize: '0.88rem', 
                              lineHeight: 1.55,
                              whiteSpace: 'pre-line' 
                            }}>
                              {step.content}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                      No se encontraron pasos adicionales para esta misión.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: REQUIREMENTS y ITEMS */}
              {activeModalTab === 'requirements' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* General Requirements */}
                  <div className="recipe-section" style={{ padding: '14px' }}>
                    <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: 'var(--gold-400)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ListChecks size={16} />
                      REQUISITOS PREVIOS DE LA MISIÓN
                    </h4>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {selectedQuestModal.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Items */}
                  <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid var(--color-combat)' }}>
                    <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#fc8181', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Package size={16} />
                      OBJETOS OBLIGATORIOS (NECESARIOS)
                    </h4>
                    {selectedQuestModal.itemsRequired && selectedQuestModal.itemsRequired.length > 0 ? (
                      <ul style={{ paddingLeft: '20px', color: 'var(--text-primary)', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {selectedQuestModal.itemsRequired.map((item, i) => (
                          <li key={i} style={{ fontWeight: 500 }}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                        No se requieren objetos específicos antes de comenzar.
                      </p>
                    )}
                  </div>

                  {/* Recommended Items */}
                  {selectedQuestModal.itemsRecommended && selectedQuestModal.itemsRecommended.length > 0 && (
                    <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid #4299e1' }}>
                      <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#63b3ed', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={16} />
                        OBJETOS RECOMENDADOS
                      </h4>
                      <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {selectedQuestModal.itemsRecommended.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: ENEMIES */}
              {activeModalTab === 'enemies' && selectedQuestModal.enemies && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid var(--color-combat)' }}>
                    <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#fc8181', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Swords size={16} />
                      ENEMIGOS Y PELIGROS EN ESTA MISIÓN
                    </h4>
                    <ul style={{ paddingLeft: '20px', color: 'var(--text-primary)', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {selectedQuestModal.enemies.map((enemy, i) => (
                        <li key={i} style={{ color: '#feb2b2' }}>{enemy}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 4: REWARDS */}
              {activeModalTab === 'rewards' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid var(--gold-500)' }}>
                    <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: 'var(--gold-400)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Award size={16} />
                      RECOMPENSAS POR COMPLETAR LA MISIÓN
                    </h4>
                    <ul style={{ paddingLeft: '20px', color: '#e2e8f0', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {selectedQuestModal.rewards.map((rew, i) => (
                        <li key={i} style={{ color: '#68d391', fontWeight: 500 }}>{rew}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Action Buttons in Modal Bottom */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
                <button
                  className={`btn-fantasy ${questStatusMap[selectedQuestModal.id] === 'completed' ? 'gold' : ''}`}
                  style={{ flex: 1, minWidth: '180px', padding: '10px' }}
                  onClick={() => {
                    toggleQuestStatus(selectedQuestModal.id, questStatusMap[selectedQuestModal.id]);
                  }}
                >
                  <Check size={16} />
                  <span>
                    {questStatusMap[selectedQuestModal.id] === 'completed' ? 'Misión Completada' : 'Marcar como Completada'}
                  </span>
                </button>

                <button
                  className="btn-fantasy"
                  style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-300)', borderColor: 'var(--gold-border)' }}
                  onClick={() => {
                    const quest = selectedQuestModal;
                    setSelectedQuestModal(null);
                    onViewQuestOnMap && onViewQuestOnMap(quest);
                  }}
                >
                  <GameIcon name="treasure-map" size={16} />
                  <span>Ver en Mapa</span>
                </button>

                <a 
                  href={selectedQuestModal.wikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-fantasy"
                  style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                >
                  <span>Wiki Oficial</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
