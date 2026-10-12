import React, { useState, useEffect, useMemo } from 'react';
import { Scroll } from 'lucide-react';
import questsData from '../../data/quests.json';
import { normalizeText, getWordStems } from '../../utils/searchUtils';

import QuestFilterBar from './QuestFilterBar';
import QuestProgressBanner from './QuestProgressBanner';
import QuestCard from './QuestCard';
import QuestDetailModal from './QuestDetailModal';

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
      <QuestFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        completedCount={completedCount}
        inProgressCount={inProgressCount}
      />

      {/* Overview Tracker Banner */}
      <QuestProgressBanner
        completedCount={completedCount}
        totalQuests={questsData.length}
      />

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
        <div className="quests-grid">
          {filteredQuests.map((quest) => {
            const status = questStatusMap[quest.id] || 'pending';

            return (
              <QuestCard
                key={quest.id}
                quest={quest}
                status={status}
                onToggleStatus={toggleQuestStatus}
                onOpenGuide={() => {
                  setSelectedQuestModal(quest);
                  setActiveModalTab('guide');
                }}
                onViewOnMap={() => onViewQuestOnMap && onViewQuestOnMap(quest)}
              />
            );
          })}
        </div>
      )}

      {/* Quest Details y Full Walkthrough Modal */}
      {selectedQuestModal && (
        <QuestDetailModal
          quest={selectedQuestModal}
          activeTab={activeModalTab}
          setActiveTab={setActiveModalTab}
          onClose={() => setSelectedQuestModal(null)}
          isCompleted={questStatusMap[selectedQuestModal.id] === 'completed'}
          onToggleStatus={() => {
            toggleQuestStatus(selectedQuestModal.id, questStatusMap[selectedQuestModal.id]);
          }}
          checkedStepsMap={checkedStepsMap}
          onToggleStep={toggleStepChecked}
          onViewOnMap={() => {
            const quest = selectedQuestModal;
            setSelectedQuestModal(null);
            onViewQuestOnMap && onViewQuestOnMap(quest);
          }}
        />
      )}
    </div>
  );
}
