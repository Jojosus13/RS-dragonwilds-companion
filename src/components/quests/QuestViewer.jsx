import React, { useState, useEffect, useMemo } from 'react';
import { Compass, Scroll, AlertTriangle } from 'lucide-react';
import questsData from '../../data/quests.json';
import { normalizeText, getWordStems } from '../../utils/searchUtils';
import QuestFilterBar from './QuestFilterBar';
import QuestCard from './QuestCard';
import QuestDetailModal from './QuestDetailModal';

export default function QuestViewer({ onViewQuestOnMap }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all'); // all, Principal, Secundaria
  const [statusFilter, setStatusFilter] = useState('all'); // all, completed, in_progress, pending
  const [selectedQuestModal, setSelectedQuestModal] = useState(null);

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
    } catch { }
  }, [questStatusMap]);

  useEffect(() => {
    try {
      localStorage.setItem('rs_dw_quest_checked_steps', JSON.stringify(checkedStepsMap));
    } catch { }
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
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (selectedType !== 'all' && q.questType !== selectedType) return false;

      const status = questStatusMap[q.id] || 'pending';
      if (statusFilter !== 'all' && status !== statusFilter) return false;

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
  }, [searchQuery, selectedDifficulty, selectedType, statusFilter, questStatusMap]);

  // Overall Quest Statistics
  const stats = useMemo(() => {
    const total = questsData.length;
    let completed = 0;
    let inProgress = 0;

    questsData.forEach((q) => {
      const st = questStatusMap[q.id];
      if (st === 'completed') completed++;
      else if (st === 'in_progress') inProgress++;
    });

    const pending = total - completed - inProgress;
    const percent = Math.round((completed / total) * 100);

    return { total, completed, inProgress, pending, percent };
  }, [questStatusMap]);

  return (
    <div className="quest-viewer-container" style={{ padding: '0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner y Stats */}
      <div
        style={{
          padding: '24px',
          background: 'linear-gradient(135deg, rgba(20,25,35,0.95) 0%, rgba(30,22,15,0.85) 100%)',
          border: '1px solid var(--gold-border)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-400)', marginBottom: '6px' }}>
            <Compass size={20} />
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-title)', letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase' }}>
              DIARIO DE AVENTURAS
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-decorative)', fontSize: '1.8rem', color: 'var(--gold-300)', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>
            Misiones de Dragonwilds
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0, lineHeight: 1.5 }}>
            Guías detalladas paso a paso en español, requisitos, enemigos y registro de progreso persistente.
          </p>
        </div>

        {/* Progress Card */}
        <div
          style={{
            minWidth: '240px',
            flex: '1 1 240px',
            maxWidth: '320px',
            background: 'rgba(10, 13, 18, 0.85)',
            border: '1px solid var(--gold-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-title)', fontWeight: 700, letterSpacing: '1px' }}>
              PROGRESO TOTAL
            </span>
            <span style={{ fontSize: '1.3rem', fontFamily: 'var(--font-title)', color: stats.percent === 100 ? '#68d391' : 'var(--gold-300)', fontWeight: 800 }}>
              {stats.percent}%
            </span>
          </div>

          {/* Progress Bar with glowing gradient fill */}
          <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.6)', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div
              style={{
                width: `${stats.percent}%`,
                height: '100%',
                background: stats.percent === 100 ? 'linear-gradient(90deg, #48bb78 0%, #38a169 100%)' : 'var(--gold-gradient)',
                borderRadius: '4px',
                transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 0 8px var(--gold-glow)'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px', fontFamily: 'var(--font-title)' }}>
            <span><strong style={{ color: '#68d391' }}>{stats.completed}</strong> de {stats.total} Completadas</span>
            <span><strong style={{ color: '#63b3ed' }}>{stats.inProgress}</strong> En curso</span>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <QuestFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        stats={stats}
      />

      {/* Quests Grid */}
      {filteredQuests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px dashed var(--gold-border)' }}>
          <AlertTriangle size={36} color="var(--gold-400)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontFamily: 'var(--font-title)', color: 'var(--gold-300)', marginBottom: '6px' }}>
            No se encontraron misiones
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 14px auto' }}>
            No hay misiones que coincidan con los filtros o término de búsqueda seleccionado.
          </p>
          <button
            className="btn-fantasy"
            onClick={() => {
              setSearchQuery('');
              setSelectedDifficulty('all');
              setSelectedType('all');
              setStatusFilter('all');
            }}
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {filteredQuests.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              status={questStatusMap[quest.id] || 'pending'}
              onToggleStatus={toggleQuestStatus}
              onOpenModal={(q) => setSelectedQuestModal(q)}
              onViewQuestOnMap={onViewQuestOnMap}
            />
          ))}
        </div>
      )}

      {/* Quest Details y Full Walkthrough Modal */}
      {selectedQuestModal && (
        <QuestDetailModal
          quest={selectedQuestModal}
          onClose={() => setSelectedQuestModal(null)}
          questStatus={questStatusMap[selectedQuestModal.id] || 'pending'}
          onToggleStatus={toggleQuestStatus}
          checkedStepsMap={checkedStepsMap}
          onToggleStep={toggleStepChecked}
          onViewQuestOnMap={onViewQuestOnMap}
        />
      )}
    </div>
  );
}
