import React from 'react';
import { ArrowRight, Calendar, HardDrive } from 'lucide-react';

export default function UpdateVersionBanner({
  currentVersion,
  latestVersion,
  publishedAt,
  zipFileSize,
  apkFileSize,
  apkFileName
}) {
  return (
    <>
      {/* Banner de comparativa de versiones */}
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
          <ArrowRight size={18} />
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

      {/* Metadatos de fecha y tamano */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#a0aec0' }}>
        {publishedAt && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Calendar size={13} color="var(--gold-400)" />
            {publishedAt}
          </span>
        )}
        {(zipFileSize || apkFileSize) && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <HardDrive size={13} color="var(--gold-400)" />
            {zipFileSize ? `Paquete OTA: ${zipFileSize}` : `${apkFileSize} (${apkFileName})`}
          </span>
        )}
      </div>
    </>
  );
}
