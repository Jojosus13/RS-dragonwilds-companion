import { APP_VERSION, GITHUB_REPO_OWNER, GITHUB_REPO_NAME, GITHUB_READ_TOKEN } from './version';

const DISMISSED_UPDATE_KEY = 'rs_dw_dismissed_update_version';
const LAST_CHECK_KEY = 'rs_dw_last_update_check';

/**
 * Limpia y normaliza cadenas de versión (ej: 'v1.2.3-beta' -> [1, 2, 3])
 */
export function parseVersion(versionStr) {
  if (!versionStr) return [0, 0, 0];
  const cleaned = String(versionStr).trim().replace(/^v/i, '').split('-')[0];
  const parts = cleaned.split('.').map(p => parseInt(p, 10) || 0);
  while (parts.length < 3) parts.push(0);
  return parts.slice(0, 3);
}

/**
 * Compara dos versiones semánticas.
 * Retorna:
 *  1 si remoteVersion > currentVersion (Hay actualización)
 *  0 si son iguales
 * -1 si currentVersion > remoteVersion
 */
export function compareVersions(currentVersion, remoteVersion) {
  const [curMajor, curMinor, curPatch] = parseVersion(currentVersion);
  const [remMajor, remMinor, remPatch] = parseVersion(remoteVersion);

  if (remMajor > curMajor) return 1;
  if (remMajor < curMajor) return -1;

  if (remMinor > curMinor) return 1;
  if (remMinor < curMinor) return -1;

  if (remPatch > curPatch) return 1;
  if (remPatch < curPatch) return -1;

  return 0;
}

/**
 * Formatea bytes a MB legible
 */
function formatBytes(bytes) {
  if (!bytes || isNaN(bytes)) return '';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

/**
 * Obtiene la URL de descarga directa prefirmada para repositorios privados
 */
export async function getApkDirectDownloadUrl(assetApiUrl, fallbackUrl) {
  if (!assetApiUrl) return fallbackUrl;
  try {
    const headers = {
      'Accept': 'application/octet-stream'
    };
    if (GITHUB_READ_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_READ_TOKEN}`;
    }

    const response = await fetch(assetApiUrl, {
      method: 'GET',
      headers
    });

    if (response.ok || response.status === 200) {
      return response.url || fallbackUrl;
    }
    return fallbackUrl;
  } catch {
    return fallbackUrl;
  }
}

/**
 * Consulta la API de GitHub Releases para obtener la última versión publicada
 */
export async function fetchLatestRelease(options = {}) {
  const { timeout = 8000, repoOwner = GITHUB_REPO_OWNER, repoName = GITHUB_REPO_NAME } = options;
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
    };
    if (GITHUB_READ_TOKEN) {
      headers['Authorization'] = `Bearer ${GITHUB_READ_TOKEN}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.status === 404) {
      return {
        success: false,
        error: 'No se encontraron releases publicadas en el repositorio todavía.'
      };
    }

    if (response.status === 403) {
      return {
        success: false,
        error: 'Límite temporal de consultas a la API de GitHub alcanzado. Prueba más tarde.'
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: `Error al consultar GitHub: HTTP ${response.status}`
      };
    }

    const data = await response.json();
    const remoteTag = data.tag_name || data.name || '';
    const cleanRemoteVersion = remoteTag.replace(/^v/i, '').trim();
    const isNewer = compareVersions(APP_VERSION, cleanRemoteVersion) > 0;

    // Buscar el archivo APK en los assets de la release
    const apkAsset = Array.isArray(data.assets)
      ? data.assets.find(asset => asset.name && asset.name.toLowerCase().endsWith('.apk'))
      : null;

    const assetApiUrl = apkAsset?.url || null;
    const apkDownloadUrl = apkAsset?.browser_download_url || data.html_url;
    const apkFileName = apkAsset?.name || 'RS-Dragonwilds.apk';
    const apkFileSize = apkAsset ? formatBytes(apkAsset.size) : '';

    return {
      success: true,
      hasUpdate: isNewer,
      currentVersion: APP_VERSION,
      latestVersion: cleanRemoteVersion || remoteTag,
      tagName: remoteTag,
      releaseName: data.name || remoteTag,
      releaseNotes: data.body || 'Correcciones de errores y mejoras generales.',
      publishedAt: data.published_at ? new Date(data.published_at).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : '',
      releaseUrl: data.html_url,
      assetApiUrl,
      apkDownloadUrl,
      apkFileName,
      apkFileSize,
      hasDirectApk: !!apkAsset
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return {
        success: false,
        error: 'Tiempo de espera agotado al conectar con el servidor de actualizaciones.'
      };
    }
    return {
      success: false,
      error: 'No se pudo conectar a internet para verificar actualizaciones.'
    };
  }
}

/**
 * Guarda una versión como descartada por el usuario
 */
export function dismissUpdateVersion(version) {
  try {
    localStorage.setItem(DISMISSED_UPDATE_KEY, String(version));
  } catch {}
}

/**
 * Verifica si el usuario descartó esta versión previamente
 */
export function isUpdateDismissed(version) {
  try {
    const dismissed = localStorage.getItem(DISMISSED_UPDATE_KEY);
    return dismissed === String(version);
  } catch {
    return false;
  }
}

/**
 * Guarda la fecha del último chequeo
 */
export function recordLastCheckTime() {
  try {
    localStorage.setItem(LAST_CHECK_KEY, new Date().toISOString());
  } catch {}
}
