import React, { useState } from 'react';
import {
  X,
  ExternalLink
} from 'lucide-react';
import { DIFFICULTY_COLORS } from './QuestFilterBar';
import QuestStepList from './QuestStepList';
import GameIcon from '../GameIcon';

export default function QuestDetailModal({
  quest,
  onClose,
  questStatus,
  onToggleStatus,
  checkedStepsMap,
  onToggleStep,
  onViewQuestOnMap
}) {
  const [activeModalTab, setActiveModalTab] = useState('guide');

  if (!quest) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
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
                  background: DIFFICULTY_COLORS[quest.difficulty]?.bg,
                  color: DIFFICULTY_COLORS[quest.difficulty]?.text,
                  border: `1px solid ${DIFFICULTY_COLORS[quest.difficulty]?.border}`
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
            style={{ borderRadius: '0', borderBottom: activeModalTab === 'guide' ? '2px solid var(--gold-400)' : 'none', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => setActiveModalTab('guide')}
          >
            <GameIcon name="book-cover" size={14} color="var(--gold-400)" />
            <span>Guía Paso a Paso</span>
          </button>
          <button
            className={`filter-chip ${activeModalTab === 'requirements' ? 'active' : ''}`}
            style={{ borderRadius: '0', borderBottom: activeModalTab === 'requirements' ? '2px solid var(--gold-400)' : 'none', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => setActiveModalTab('requirements')}
          >
            <GameIcon name="cardboard-box" size={14} color="#60a5fa" />
            <span>Requisitos y Objetos ({quest.itemsRequired?.length || 0})</span>
          </button>
          {quest.enemies && quest.enemies.length > 0 && (
            <button
              className={`filter-chip ${activeModalTab === 'enemies' ? 'active' : ''}`}
              style={{ borderRadius: '0', borderBottom: activeModalTab === 'enemies' ? '2px solid var(--gold-400)' : 'none', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={() => setActiveModalTab('enemies')}
            >
              <GameIcon name="crossed-swords" size={14} color="#f87171" />
              <span>Enemigos ({quest.enemies.length})</span>
            </button>
          )}
          <button
            className={`filter-chip ${activeModalTab === 'rewards' ? 'active' : ''}`}
            style={{ borderRadius: '0', borderBottom: activeModalTab === 'rewards' ? '2px solid var(--gold-400)' : 'none', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => setActiveModalTab('rewards')}
          >
            <GameIcon name="crown" size={14} color="var(--gold-400)" />
            <span>Recompensas</span>
          </button>
        </div>

        {/* Modal Body with Scroll */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', padding: '16px 20px', flex: 1 }}>
          {/* Start Point Callout Always Visible */}
          {quest.startPoint && (
            <div style={{
              background: 'rgba(212, 175, 55, 0.07)',
              border: '1px solid var(--gold-border)',
              borderRadius: '8px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <GameIcon name="position-marker" size={18} color="var(--gold-400)" style={{ flexShrink: 0 }} />
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--gold-400)', fontFamily: 'var(--font-title)', fontWeight: 600, display: 'block' }}>
                  PUNTO DE INICIO
                </span>
                <span style={{ fontSize: '0.85rem', color: '#f0f4f8' }}>
                  {quest.startPoint}
                </span>
              </div>
            </div>
          )}

          {/* TAB 1: GUIDE */}
          {activeModalTab === 'guide' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '12px 14px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-title)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  SINOPSIS
                </span>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                  {quest.summary}
                </p>
              </div>

              <QuestStepList
                questId={quest.id}
                walkthrough={quest.walkthrough}
                checkedStepsMap={checkedStepsMap}
                onToggleStep={onToggleStep}
              />
            </div>
          )}

          {/* TAB 2: REQUIREMENTS */}
          {activeModalTab === 'requirements' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="recipe-section" style={{ padding: '14px' }}>
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: 'var(--gold-400)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GameIcon name="shield" size={16} color="var(--gold-400)" />
                  REQUISITOS PREVIOS DE LA MISIÓN
                </h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {quest.requirements?.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid var(--color-combat)' }}>
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#fc8181', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GameIcon name="cardboard-box" size={16} color="#fc8181" />
                  OBJETOS OBLIGATORIOS (NECESARIOS)
                </h4>
                {quest.itemsRequired && quest.itemsRequired.length > 0 ? (
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-primary)', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {quest.itemsRequired.map((item, i) => (
                      <li key={i} style={{ fontWeight: 500 }}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                    No se requieren objetos específicos antes de comenzar.
                  </p>
                )}
              </div>

              {quest.itemsRecommended && quest.itemsRecommended.length > 0 && (
                <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid #4299e1' }}>
                  <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#63b3ed', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <GameIcon name="sparkles" size={16} color="#63b3ed" />
                    OBJETOS RECOMENDADOS
                  </h4>
                  <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {quest.itemsRecommended.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ENEMIES */}
          {activeModalTab === 'enemies' && quest.enemies && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="recipe-section" style={{ padding: '14px', borderLeft: '3px solid var(--color-combat)' }}>
                <h4 style={{ fontFamily: 'var(--font-title)', fontSize: '0.9rem', color: '#fc8181', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GameIcon name="crossed-swords" size={16} color="#fc8181" />
                  ENEMIGOS Y PELIGROS EN ESTA MISIÓN
                </h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--text-primary)', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {quest.enemies.map((enemy, i) => (
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
                  <GameIcon name="crown" size={16} color="var(--gold-400)" />
                  RECOMPENSAS POR COMPLETAR LA MISIÓN
                </h4>
                <ul style={{ paddingLeft: '20px', color: '#e2e8f0', fontSize: '0.88rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {quest.rewards?.map((rew, i) => (
                    <li key={i} style={{ color: '#68d391', fontWeight: 500 }}>{rew}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons in Modal Bottom */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
            <button
              className={`btn-fantasy ${questStatus === 'completed' ? 'gold' : ''}`}
              style={{ flex: 1, minWidth: '180px', padding: '10px' }}
              onClick={() => onToggleStatus(quest.id, questStatus)}
            >
              <GameIcon name="check-mark" size={16} color={questStatus === 'completed' ? 'var(--gold-400)' : '#48bb78'} />
              <span>
                {questStatus === 'completed' ? 'Misión Completada' : 'Marcar como Completada'}
              </span>
            </button>

            <button
              className="btn-fantasy"
              style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-300)', borderColor: 'var(--gold-border)' }}
              onClick={() => {
                onClose();
                onViewQuestOnMap && onViewQuestOnMap(quest);
              }}
            >
              <GameIcon name="treasure-map" size={16} color="var(--gold-400)" />
              <span>Ver en Mapa</span>
            </button>

            {quest.wikiUrl && (
              <a
                href={quest.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fantasy"
                style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <ExternalLink size={14} />
                <span>Wiki</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
