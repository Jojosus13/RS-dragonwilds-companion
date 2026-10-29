import React from 'react';
import { Download, ExternalLink, Zap } from 'lucide-react';

export default function UpdateFooter({
  status,
  isNative,
  hasOtaZip,
  zipDownloadUrl,
  hasDirectApk,
  apkDownloadUrl,
  apkFileName,
  releaseUrl,
  onDismissLater,
  onOtaUpdate,
  onManualApkDownload
}) {
  const isBusy = status === 'downloading' || status === 'installing';

  return (
    <div style={{
      padding: '14px 20px',
      borderTop: '1px solid rgba(212, 175, 55, 0.2)',
      display: 'flex',
      gap: '10px',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'rgba(10, 13, 18, 0.9)'
    }}>
      {!isBusy ? (
        <>
          <button 
            className="btn-fantasy" 
            style={{ fontSize: '0.85rem', padding: '8px 14px' }} 
            onClick={onDismissLater}
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

            {status === 'error' && (
              <a 
                href={apkDownloadUrl || releaseUrl} 
                download={apkFileName || 'RS-Dragonwilds.apk'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-fantasy" 
                style={{ fontSize: '0.85rem', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}
                title="Descargar instalador APK directo"
                onClick={() => {
                  if (onDismissLater) onDismissLater();
                }}
              >
                <Download size={14} />
                <span>Descargar APK</span>
              </a>
            )}

            {isNative && (hasOtaZip || zipDownloadUrl) ? (
              <button 
                className="btn-fantasy gold" 
                style={{ fontSize: '0.9rem', padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
                onClick={onOtaUpdate}
              >
                <Zap size={16} />
                <span>{status === 'error' ? 'Reintentar Actualización' : 'Actualizar en Caliente'}</span>
              </button>
            ) : (
              <a 
                href={apkDownloadUrl || releaseUrl}
                download={apkFileName || 'RS-Dragonwilds.apk'}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fantasy gold" 
                style={{ fontSize: '0.9rem', padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                onClick={() => {
                  if (onDismissLater) onDismissLater();
                }}
              >
                <Download size={16} />
                <span>{hasDirectApk ? 'Descargar e Instalar APK' : 'Obtener Actualización'}</span>
              </a>
            )}
          </div>
        </>
      ) : (
        <div style={{ width: '100%', textAlign: 'center', fontSize: '0.82rem', color: '#94a3b8' }}>
          Procesando actualización...
        </div>
      )}
    </div>
  );
}
