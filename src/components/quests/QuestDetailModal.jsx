import React from 'react';
import { 
  X, 
  BookOpen, 
  Package, 
  Swords, 
  Award, 
  MapPin, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import GameIcon from '../GameIcon';
import { DIFFICULTY_COLORS } from './questConstants';
import QuestGuideTab from './QuestGuideTab';
import QuestRequirementsTab from './QuestRequirementsTab';
import QuestEnemiesTab from './QuestEnemiesTab';
import QuestRewardsTab from './QuestRewardsTab';

export default function QuestDetailModal({
  quest,
  activeTab = 'guide',
  setActiveTab,
  onClose,
  isCompleted,
  onToggleStatus,
  checkedStepsMap,
  onToggleStep,
  onViewOnMap
}) {
  if (!quest) return null;

  const diffStyle = DIFFICULTY_COLORS[quest.difficulty] || DIFFICULTY_COLORS['Intermedia'];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '780px' }}
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px' }}>
              <span 
                style={{ 
                  padding: '2px 8px', 
                  borderRadius: '10px', 
                  fontSize: '0.7rem', 
                  fontFamily: 'var(--font-title)',
                  fontWeight: 700,
                  background: quest.questType === 'Principal' ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                  color: quest.questType === 'Principal' ? 'var(--gold-300)' : 'var(--text-secondary)',
                  border: quest.questType === 'Principal' ? '1px solid var(--gold-border)' : '1px solid rgba(255,255,255,0.1)'
                }}
              >
                Misión {quest.questType}
              </span>
              <span 
                style={{ 
                  padding: '2px 8px', 
                  borderRadius: '10px', 
                  fontSize: '0.7rem', 
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
            <h3 className="modal-title" style={{ fontSize: '1.25rem', color: 'var(--gold-300)' }}>
              {quest.name}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {quest.englishTitle} • Wiki Dragonwilds
            </span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="modal-tabs">
          <button
            className={`modal-tab-btn ${activeTab === 'guide' ? 'active' : ''}`}
            onClick={() => setActiveTab('guide')}
          >
            <BookOpen size={14} />
            <span>Guía Paso a Paso</span>
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'requirements' ? 'active' : ''}`}
            onClick={() => setActiveTab('requirements')}
          >
            <Package size={14} />
            <span>Requisitos y Objetos ({quest.itemsRequired?.length || 0})</span>
          </button>
          {quest.enemies && quest.enemies.length > 0 && (
            <button
              className={`modal-tab-btn ${activeTab === 'enemies' ? 'active' : ''}`}
              onClick={() => setActiveTab('enemies')}
            >
              <Swords size={14} />
              <span>Enemigos ({quest.enemies.length})</span>
            </button>
          )}
          <button
            className={`modal-tab-btn ${activeTab === 'rewards' ? 'active' : ''}`}
            onClick={() => setActiveTab('rewards')}
          >
            <Award size={14} />
            <span>Recompensas</span>
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div className="modal-body">
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
                {quest.startPoint}
              </span>
            </div>
          </div>

          {activeTab === 'guide' && (
            <QuestGuideTab
              quest={quest}
              checkedStepsMap={checkedStepsMap}
              onToggleStep={onToggleStep}
            />
          )}

          {activeTab === 'requirements' && (
            <QuestRequirementsTab quest={quest} />
          )}

          {activeTab === 'enemies' && (
            <QuestEnemiesTab enemies={quest.enemies} />
          )}

          {activeTab === 'rewards' && (
            <QuestRewardsTab rewards={quest.rewards} />
          )}

          {/* Action Buttons in Modal Bottom */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
            <button
              className={`btn-fantasy ${isCompleted ? 'gold' : ''}`}
              style={{ flex: 1, minWidth: '180px', padding: '10px' }}
              onClick={onToggleStatus}
            >
              <Check size={16} />
              <span>
                {isCompleted ? 'Misión Completada' : 'Marcar como Completada'}
              </span>
            </button>

            <button
              className="btn-fantasy"
              style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-300)', borderColor: 'var(--gold-border)' }}
              onClick={onViewOnMap}
            >
              <GameIcon name="treasure-map" size={16} />
              <span>Ver en Mapa</span>
            </button>

            {quest.wikiUrl && (
              <a 
                href={quest.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fantasy"
                style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
              >
                <span>Wiki Oficial</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
