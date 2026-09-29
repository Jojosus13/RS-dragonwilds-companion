import React from 'react';
import {
  Check,
  Clock,
  Circle,
  MapPin,
  Package,
  BookOpen,
  ChevronRight,
  Compass
} from 'lucide-react';
import { DIFFICULTY_COLORS } from './QuestFilterBar';

export default function QuestCard({
  quest,
  status,
  onToggleStatus,
  onOpenModal,
  onViewQuestOnMap
}) {
  const diffStyle = DIFFICULTY_COLORS[quest.difficulty] || DIFFICULTY_COLORS['Principiante'];
  const stepsCount = quest.walkthrough?.length || 0;

  return (
    <div
      className={`card ${status === 'completed' ? 'quest-completed-card' : ''}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '16px',
        background: status === 'completed' ? 'rgba(72, 187, 120, 0.05)' : 'var(--bg-card)',
        borderColor: status === 'completed' ? 'rgba(72, 187, 120, 0.4)' : status === 'in_progress' ? 'rgba(66, 153, 225, 0.4)' : 'var(--gold-border)'
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
            onClick={() => onOpenModal(quest, 'guide')}
          >
            {quest.name}
          </h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            {quest.englishTitle}
          </span>
        </div>

        {/* Status Toggle Button */}
        <button
          onClick={() => onToggleStatus(quest.id, status)}
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
          onClick={() => onOpenModal(quest, 'guide')}
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
          <Compass size={14} />
          <span>Mapa</span>
        </button>
      </div>
    </div>
  );
}
