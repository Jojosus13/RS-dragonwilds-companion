import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { dismissUpdateVersion, getApkDirectDownloadUrl } from '../../utils/updateChecker';
import UpdateHeader from './UpdateHeader';
import UpdateVersionBanner from './UpdateVersionBanner';
import UpdateChangelog from './UpdateChangelog';
import UpdateProgress from './UpdateProgress';
import UpdateFooter from './UpdateFooter';

export default function UpdateModal({ 
  isOpen, 
  onClose, 
  updateInfo,
  onDismiss 
}) {
  const isNative = typeof window !== 'undefined' && Capacitor.isNativePlatform();

  const [status, setStatus] = useState('idle'); // 'idle' | 'downloading' | 'installing' | 'error'
  const [downloadPercent, setDownloadPercent] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setDownloadPercent(0);
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen || !updateInfo) return null;

  const {
    currentVersion,
    latestVersion,
    releaseName,
    releaseNotes,
    publishedAt,
    hasOtaZip,
    zipDownloadUrl,
    zipAssetApiUrl,
    zipFileSize,
    zipChecksum,
    assetApiUrl,
    apkDownloadUrl,
    apkFileName,
    apkFileSize,
    hasDirectApk,
    releaseUrl
  } = updateInfo;

  // Actualización OTA en caliente (sin navegador, reinicio instantáneo)
  const handleOtaUpdate = async () => {
    setStatus('downloading');
    setDownloadPercent(0);
    setErrorMessage(null);

    let downloadListener = null;

    try {
      // Escuchar progreso de descarga
      downloadListener = await CapacitorUpdater.addListener('download', (info) => {
        if (info && typeof info.percent === 'number') {
          setDownloadPercent(Math.min(100, Math.max(0, Math.round(info.percent))));
        }
      });

      // Obtener URL de descarga directa
      const rawUrl = zipDownloadUrl || apkDownloadUrl;
      const targetZipUrl = await getApkDirectDownloadUrl(zipAssetApiUrl || assetApiUrl, rawUrl);

      if (!targetZipUrl) {
        throw new Error('No se encontró una URL válida para la actualización.');
      }

      // Descargar paquete
      const bundle = await CapacitorUpdater.download({
        url: targetZipUrl,
        version: String(latestVersion),
        ...(zipChecksum ? { checksum: zipChecksum } : {})
      });

      if (!bundle || !bundle.id) {
        throw new Error('El paquete descargado no es válido.');
      }

      setStatus('installing');

      // Aplicar actualización y recargar la aplicación en caliente
      dismissUpdateVersion(latestVersion);
      if (onDismiss) onDismiss();

      // Pequeño timeout visual antes de reiniciar
      setTimeout(async () => {
        try {
          await CapacitorUpdater.set({ id: bundle.id });
        } catch (err) {
          console.error('Error al activar bundle:', err);
          setStatus('error');
          setErrorMessage('Error al reiniciar la aplicación con la nueva versión.');
        }
      }, 600);

    } catch (err) {
      console.error('Error durante la actualización OTA:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Ocurrió un fallo al descargar el paquete de actualización.');
    } finally {
      if (downloadListener && typeof downloadListener.remove === 'function') {
        downloadListener.remove();
      }
    }
  };

  // Descarga manual del APK como fallback
  const handleManualApkDownload = async () => {
    const targetUrl = apkDownloadUrl || releaseUrl;
    if (!targetUrl) return;

    dismissUpdateVersion(latestVersion);
    if (onDismiss) onDismiss();
    onClose();

    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.assign(targetUrl);
    }
  };

  const handleDismissLater = () => {
    dismissUpdateVersion(latestVersion);
    if (onDismiss) onDismiss();
    onClose();
  };

  const isBusy = status === 'downloading' || status === 'installing';

  return (
    <div className="modal-overlay" onClick={isBusy ? undefined : onClose} style={{ zIndex: 9999 }}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          maxWidth: '520px',
          border: '1px solid var(--gold-500)',
          boxShadow: '0 0 35px rgba(212, 175, 55, 0.25), 0 20px 40px rgba(0,0,0,0.8)'
        }}
      >
        {/* Cabecera del modal */}
        <UpdateHeader onClose={onClose} canClose={!isBusy} />

        {/* Cuerpo del modal */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '18px 20px' }}>
          <UpdateVersionBanner
            currentVersion={currentVersion}
            latestVersion={latestVersion}
            publishedAt={publishedAt}
            zipFileSize={zipFileSize}
            apkFileSize={apkFileSize}
            apkFileName={apkFileName}
          />

          {status === 'idle' && (
            <UpdateChangelog
              releaseName={releaseName}
              releaseNotes={releaseNotes}
            />
          )}

          <UpdateProgress
            status={status}
            downloadPercent={downloadPercent}
            errorMessage={errorMessage}
            isNative={isNative}
            hasOtaZip={hasOtaZip}
          />
        </div>

        {/* Acciones inferiores */}
        <UpdateFooter
          status={status}
          isNative={isNative}
          hasOtaZip={hasOtaZip}
          zipDownloadUrl={zipDownloadUrl}
          hasDirectApk={hasDirectApk}
          apkDownloadUrl={apkDownloadUrl}
          apkFileName={apkFileName}
          releaseUrl={releaseUrl}
          onDismissLater={handleDismissLater}
          onOtaUpdate={handleOtaUpdate}
          onManualApkDownload={handleManualApkDownload}
        />
      </div>
    </div>
  );
}
