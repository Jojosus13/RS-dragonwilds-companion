const fs = require('fs');
const path = require('path');
const https = require('https');

const GITHUB_OWNER = 'Jojosus13';
const GITHUB_REPO = 'RS-dragonwilds-companion';
const TAG_NAME = 'v1.0.2';
const RELEASE_NAME = 'Dragonwilds Companion v1.0.2 - Actualizacion y Mejoras';
const RELEASE_BODY = `## Novedades y Correcciones en v1.0.2

- Correccion del boton de instalacion PWA en la aplicacion nativa de Android.
- Integracion del sistema de comprobacion y descarga de actualizaciones en repositorio privado.
- Optimizacion general de rendimiento en mapas, codice y bovedas.
`;

const APK_PATH = path.resolve(__dirname, '../dist-apk/RS-Dragonwilds-v1.0.2.apk');

async function main() {
  const token = process.argv[2] || process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('ERROR: Debes proporcionar el token de GitHub. Ejemplo: node scripts/publish-release.cjs <TU_TOKEN>');
    process.exit(1);
  }

  if (!fs.existsSync(APK_PATH)) {
    console.error(`ERROR: No se encontro el archivo APK en ${APK_PATH}`);
    process.exit(1);
  }

  const apkStats = fs.statSync(APK_PATH);
  console.log(`[INFO] APK encontrado: RS-Dragonwilds-v1.0.2.apk (${(apkStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`[INFO] Creando Release ${TAG_NAME} en GitHub (${GITHUB_OWNER}/${GITHUB_REPO})...\n`);

  // 1. Crear la Release
  const releaseData = JSON.stringify({
    tag_name: TAG_NAME,
    target_commitish: 'main',
    name: RELEASE_NAME,
    body: RELEASE_BODY,
    draft: false,
    prerelease: false
  });

  const releaseOptions = {
    hostname: 'api.github.com',
    path: `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases`,
    method: 'POST',
    headers: {
      'User-Agent': 'Node-Release-Publisher',
      'Authorization': `Bearer ${token.trim()}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(releaseData)
    }
  };

  const releaseRes = await new Promise((resolve, reject) => {
    const req = https.request(releaseOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    });
    req.on('error', reject);
    req.write(releaseData);
    req.end();
  });

  if (releaseRes.statusCode !== 201) {
    console.error(`[ERROR] Error al crear release (HTTP ${releaseRes.statusCode}):`, releaseRes.body);
    process.exit(1);
  }

  const releaseJson = JSON.parse(releaseRes.body);
  console.log(`[OK] Release creada con exito: ${releaseJson.html_url}`);
  console.log(`[INFO] Subiendo archivo APK a los assets de la release...`);

  // 2. Subir el APK como asset
  const uploadUrl = releaseJson.upload_url.replace(/\{(\?name,label)?\}/, '') + `?name=RS-Dragonwilds-v1.0.2.apk`;
  const urlObj = new URL(uploadUrl);

  const fileStream = fs.createReadStream(APK_PATH);

  const uploadOptions = {
    hostname: urlObj.hostname,
    path: urlObj.pathname + urlObj.search,
    method: 'POST',
    headers: {
      'User-Agent': 'Node-Release-Publisher',
      'Authorization': `Bearer ${token.trim()}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/vnd.android.package-archive',
      'Content-Length': apkStats.size
    }
  };

  const uploadRes = await new Promise((resolve, reject) => {
    const req = https.request(uploadOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body }));
    });
    req.on('error', reject);
    fileStream.pipe(req);
  });

  if (uploadRes.statusCode !== 201) {
    console.error(`[ERROR] Error al subir APK (HTTP ${uploadRes.statusCode}):`, uploadRes.body);
    process.exit(1);
  }

  const assetJson = JSON.parse(uploadRes.body);
  console.log(`\n[EXITO] Release y APK publicados correctamente.`);
  console.log(`Release URL: ${releaseJson.html_url}`);
  console.log(`Direct APK Download: ${assetJson.browser_download_url}`);
}

main().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
