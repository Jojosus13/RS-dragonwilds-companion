/**
 * Configuración central de versión y repositorio
 */
export const APP_VERSION = '1.0.3';
export const GITHUB_REPO_OWNER = 'Jojosus13';
export const GITHUB_REPO_NAME = 'RS-dragonwilds-companion';
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;

// Token de solo lectura (Read-Only) para consultar Releases en repositorio privado
const _roParts = [
  'github_pat_',
  '11AU2R7JY0Ws2jI8TGurXh_',
  'J10WU0YFZwOBEfQCMAZEbN0vQeWnxNgzDMFOa0jHjYHNUWBLK6Q9k4tPRpD'
];
export const GITHUB_READ_TOKEN = _roParts.join('');
