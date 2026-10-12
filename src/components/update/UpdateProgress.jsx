import React from 'react';
import { RefreshCw, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react';

export default function UpdateProgress({
  status,
  downloadPercent,
  errorMessage,
  isNative,
  hasOtaZip
}) {
  return (
    <>
      {/* Estado Descargando */}
      {status === 'downloading' && (
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '10px',
          padding: '18px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--gold-300)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={16} className="spinning" />
              Descargando actualización en segundo plano...
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#48bb78' }}>
              {downloadPercent > 0 ? `${downloadPercent}%` : 'Iniciando...'}
            </span>
          </div>

          <div style={{
            width: '100%',
            height: '10px',
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '5px',
            overflow: 'hidden',
            border: '1px solid rgba(212, 175, 55, 0.2)'
          }}>
            <div style={{
              width: `${downloadPercent > 0 ? downloadPercent : 15}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--gold-500), #48bb78)',
              borderRadius: '5px',
              transition: 'width 0.3s ease'
            }} />
          </div>

          <span style={{ fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center' }}>
            La descarga se realiza dentro de la app. No cierres la aplicación.
          </span>
        </div>
      )}

      {/* Estado Instalando */}
      {status === 'installing' && (
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(72, 187, 120, 0.4)',
          borderRadius: '10px',
          padding: '20px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          <RefreshCw size={24} color="#48bb78" className="spinning" />
          <span style={{ fontSize: '0.95rem', color: '#f7fafc', fontWeight: 'bold' }}>
            Aplicando actualización...
          </span>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Reiniciando la aplicación en un instante...
          </span>
        </div>
      )}

      {/* Estado Error */}
      {status === 'error' && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: '8px',
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f87171' }}>
            <AlertTriangle size={18} />
            <span style={{ fontWeight: 'bold', fontSize: '0.88rem' }}>Error al actualizar</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#fca5a5', margin: 0 }}>
            {errorMessage || 'Ocurrió un problema durante la instalación en caliente.'}
          </p>
        </div>
      )}

      {/* Caja de información en estado reposo (idle) */}
      {status === 'idle' && (
        <div style={{
          background: 'rgba(66, 153, 225, 0.08)',
          border: '1px solid rgba(66, 153, 225, 0.3)',
          borderRadius: '8px',
          padding: '10px 14px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          {isNative && hasOtaZip ? (
            <>
              <Zap size={18} color="var(--gold-400)" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.78rem', color: '#bee3f8', margin: 0, lineHeight: '1.3' }}>
                Actualización instantánea: Se descargará y reiniciará automáticamente dentro de la app sin abrir el navegador ni perder tus datos.
              </p>
            </>
          ) : (
            <>
              <CheckCircle2 size={18} color="#63b3ed" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.78rem', color: '#bee3f8', margin: 0, lineHeight: '1.3' }}>
                Tus datos guardados, favoritos y progresos se mantendrán intactos tras la actualización.
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
