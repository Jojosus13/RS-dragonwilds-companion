import React from 'react';
import { 
  Rocket, 
  Download, 
  X, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  FileText,
  Calendar,
  HardDrive
} from 'lucide-react';
import { dismissUpdateVersion, getApkDirectDownloadUrl } from '../utils/updateChecker';

export default function UpdateModal({ 
  isOpen, 
  onClose, 
  updateInfo,
  onDismiss 
}) {
  const [isDownloading, setIsDownloading] = React.useState(false);

  if (!isOpen || !updateInfo) return null;

  const {
    currentVersion,
    latestVersion,
    releaseName,
    releaseNotes,
    publishedAt,
    assetApiUrl,
    apkDownloadUrl,
    apkFileName,
    apkFileSize,
    hasDirectApk,
    releaseUrl
  } = updateInfo;

  const handleDownload = () => {
    const targetUrl = apkDownloadUrl || releaseUrl;
    if (!targetUrl) return;

    // Marcar version como descargada para evitar bucles si la app se reinicia durante la instalacion
    dismissUpdateVersion(latestVersion);
    if (onDismiss) onDismiss();
    onClose();

    try {
      const link = document.createElement('a');
      link.href = targetUrl;
      link.setAttribute('download', apkFileName || 'RS-Dragonwilds.apk');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.location.href = targetUrl;
    }
  };

  const handleDismissLater = () => {
    dismissUpdateVersion(latestVersion);
    if (onDismiss) onDismiss();
    onClose();
  };

  // Formatear notas de versión simples para que se vean organizadas
  const renderReleaseNotes = (notes) => {
    if (!notes) return <p style={{ color: 'var(--text-secondary)' }}>Mejoras de rendimiento y correcciones de estabilidad.</p>;

    // Dividir líneas y limpiar markdown básico (#, -, *)
    const lines = notes.split('\n').filter(l => l.trim().length > 0);

    return (
      <div className="update-notes-container" style={{
        maxHeight: '180px',
        overflowY: 'auto',
        background: 'rgba(5, 7, 10, 0.6)',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        fontSize: '0.88rem',
        lineHeight: '1.5',
        color: '#cbd5e1'
      }}>
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (trimmed.startsWith('#')) {
            return (
              <h5 key={idx} style={{ 
                color: 'var(--gold-400)', 
                margin: '8px 0 4px 0', 
                fontSize: '0.95rem',
                fontFamily: 'var(--font-title)'
              }}>
                {trimmed.replace(/^#+\s*/, '')}
              </h5>
            );
          }
          if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
            return (
              <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', margin: '4px 0' }}>
                <span style={{ color: 'var(--gold-400)', marginTop: '2px' }}>•</span>
                <span>{trimmed.replace(/^[-*]\s*/, '')}</span>
              </div>
            );
          }
          return <p key={idx} style={{ margin: '4px 0' }}>{trimmed}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '520px',
          border: '1px solid var(--gold-500)',
          boxShadow: '0 0 35px rgba(212, 175, 55, 0.25), 0 20px 40px rgba(0,0,0,0.8)'
        }}
      >
        {/* Modal Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25), rgba(212, 175, 55, 0.05))',
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Rocket size={22} color="var(--gold-400)" />
            </div>
            <div>
              <h3 className="modal-title" style={{ fontSize: '1.15rem', color: '#f7fafc' }}>
                Nueva Actualización Disponible
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--gold-400)', letterSpacing: '0.5px' }}>
                COMPENDIO DRAGONWILDS
              </span>
            </div>
          </div>
          <button className="btn-fantasy btn-icon" onClick={onClose} title="Cerrar">
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '18px 20px' }}>
          
          {/* Version comparison banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(90deg, rgba(26, 32, 44, 0.85), rgba(15, 20, 28, 0.95))',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '10px',
            padding: '12px 16px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.72rem', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Tu Versión
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: 'bold', color: '#e2e8f0' }}>
                v{currentVersion}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-400)' }}>
              <span>➔</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ 
                fontSize: '0.68rem', 
                background: 'rgba(72, 187, 120, 0.2)', 
                color: '#48bb78', 
                border: '1px solid #48bb78', 
                borderRadius: '4px',
                padding: '1px 6px',
                fontWeight: 'bold',
                marginBottom: '2px'
              }}>
                DISPONIBLE
              </span>
              <span style={{ fontSize: '1.05rem', fontWeight: 'bold', color: 'var(--gold-300)' }}>
                v{latestVersion}
              </span>
            </div>
          </div>

          {/* Release Info */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#a0aec0' }}>
            {publishedAt && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Calendar size={13} color="var(--gold-400)" />
                {publishedAt}
              </span>
            )}
            {apkFileSize && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <HardDrive size={13} color="var(--gold-400)" />
                {apkFileSize} ({apkFileName})
              </span>
            )}
          </div>

          {/* Changelog Header & Notes */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <FileText size={15} color="var(--gold-400)" />
              <h4 style={{ fontSize: '0.88rem', color: 'var(--gold-300)', fontFamily: 'var(--font-title)', margin: 0 }}>
                {releaseName || 'Novedades de la versión'}
              </h4>
            </div>
            {renderReleaseNotes(releaseNotes)}
          </div>

          {/* Installation note */}
          <div style={{
            background: 'rgba(66, 153, 225, 0.08)',
            border: '1px solid rgba(66, 153, 225, 0.3)',
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <CheckCircle2 size={18} color="#63b3ed" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '0.78rem', color: '#bee3f8', margin: 0, lineHeight: '1.3' }}>
              La descarga del APK se actualizará automáticamente sobre tu app instalada sin perder tus favoritos ni tu progreso de crafteo.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          display: 'flex',
          gap: '10px',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(10, 13, 18, 0.9)'
        }}>
          <button 
            className="btn-fantasy" 
            style={{ fontSize: '0.85rem', padding: '8px 14px' }} 
            onClick={handleDismissLater}
          >
            Recordar más tarde
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {releaseUrl && (
              <a 
                href={releaseUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-fantasy" 
                style={{ fontSize: '0.85rem', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '5px' }}
                title="Ver release en GitHub"
              >
                <ExternalLink size={14} />
                <span>GitHub</span>
              </a>
            )}

            <button 
              className="btn-fantasy gold" 
              style={{ fontSize: '0.9rem', padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={handleDownload}
            >
              <Download size={16} />
              <span>{hasDirectApk ? 'Descargar e Instalar APK' : 'Obtener Actualizacion'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
