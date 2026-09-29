const fs = require('fs');
const path = require('path');
const https = require('https');
const archiver = require('archiver');

// Leer version dinamica desde src/utils/version.js si es posible
let APP_VERSION = '1.0.5';
try {
  const versionFile = fs.readFileSync(path.resolve(__dirname, '../src/utils/version.js'), 'utf-8');
  const match = versionFile.match(/APP_VERSION\s*=\s*['"]([^'"]+)['"]/);
  if (match) APP_VERSION = match[1];
} catch (e) {}

const GITHUB_OWNER = 'Jojosus13';
const GITHUB_REPO = 'RS-dragonwilds-companion';
const TAG_NAME = `v${APP_VERSION}`;
const RELEASE_NAME = `Dragonwilds Companion v${APP_VERSION} - Iconos RPG y Optimizaciones`;
const RELEASE_BODY = `## Novedades y Mejoras en v${APP_VERSION}

- **Iconos RPG Mejorados**: Integración del nuevo icono \`swap-bag\` para la sección de Objetos, Códice y catálogo de ítems.
- **Rosa de los Vientos y Mapa**: Se unificaron los accesos y visualizadores del mapa con \`treasure-map\`, y se añadió la brújula náutica a la Rosa de los Vientos flotante de Ashenfall.
- **Actualizaciones OTA en Caliente**: Descarga y aplicación de actualizaciones en segundo plano con reinicio instantáneo sin reinstalar el APK.
- Optimizaciones de rendimiento y navegación fluida.
`;

const APK_PATH = path.resolve(__dirname, `../dist-apk/RS-Dragonwilds-v${APP_VERSION}.apk`);
const DIST_DIR = path.resolve(__dirname, '../dist');
const ZIP_PATH = path.resolve(__dirname, `../dist-zip/RS-Dragonwilds-bundle-v${APP_VERSION}.zip`);

function zipDistDirectory(sourceDir, outPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(outPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const output = fs.createWriteStream(outPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`[OK] Paquete OTA comprimido (${(archive.pointer() / (1024 * 1024)).toFixed(2)} MB): ${outPath}`);
      resolve();
    });

    archive.on('error', (err) => reject(err));
    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

async function uploadAsset(uploadUrlBase, filePath, assetName, contentType, token) {
  const fileStats = fs.statSync(filePath);
  const uploadUrl = uploadUrlBase.replace(/\{(\?name,label)?\}/, '') + `?name=${encodeURIComponent(assetName)}`;
  const urlObj = new URL(uploadUrl);

  const fileStream = fs.createReadStream(filePath);

  const uploadOptions = {
    hostname: urlObj.hostname,
    path: urlObj.pathname + urlObj.search,
    method: 'POST',
    headers: {
      'User-Agent': 'Node-Release-Publisher',
      'Authorization': `Bearer ${token.trim()}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': contentType,
      'Content-Length': fileStats.size
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(uploadOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          const json = JSON.parse(body);
          console.log(`[OK] Asset subido: ${assetName} -> ${json.browser_download_url}`);
          resolve(json);
        } else {
          console.error(`[ERROR] Fallo al subir ${assetName} (HTTP ${res.statusCode}):`, body);
          reject(new Error(`Fallo HTTP ${res.statusCode} al subir asset`));
        }
      });
    });
    req.on('error', reject);
    fileStream.pipe(req);
  });
}

async function main() {
  const token = process.argv[2] || process.env.GITHUB_TOKEN;

  if (!token) {
    console.error('ERROR: Debes proporcionar el token de GitHub. Ejemplo: node scripts/publish-release.cjs <TU_TOKEN>');
    process.exit(1);
  }

  // 1. Verificar y comprimir dist/
  if (!fs.existsSync(DIST_DIR) || !fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    console.error(`ERROR: No se encontro el directorio build dist/ o falta index.html. Ejecuta npm run build primero.`);
    process.exit(1);
  }

  console.log(`[INFO] Comprimiendo paquete OTA desde ${DIST_DIR}...`);
  await zipDistDirectory(DIST_DIR, ZIP_PATH);

  // 2. Comprobar si existe APK
  const hasApk = fs.existsSync(APK_PATH);
  if (hasApk) {
    const apkStats = fs.statSync(APK_PATH);
    console.log(`[INFO] APK encontrado: ${path.basename(APK_PATH)} (${(apkStats.size / (1024 * 1024)).toFixed(2)} MB)`);
  } else {
    console.warn(`[WARN] No se encontro APK en ${APK_PATH}. Se publicara solo el paquete OTA.`);
  }

  console.log(`\n[INFO] Creando Release ${TAG_NAME} en GitHub (${GITHUB_OWNER}/${GITHUB_REPO})...`);

  // 3. Crear Release en GitHub
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

  // 4. Subir paquete OTA ZIP
  console.log(`[INFO] Subiendo paquete OTA ZIP...`);
  await uploadAsset(
    releaseJson.upload_url,
    ZIP_PATH,
    `RS-Dragonwilds-bundle-v${APP_VERSION}.zip`,
    'application/zip',
    token
  );

  // 5. Subir archivo APK si existe
  if (hasApk) {
    console.log(`[INFO] Subiendo instalador APK...`);
    await uploadAsset(
      releaseJson.upload_url,
      APK_PATH,
      `RS-Dragonwilds-v${APP_VERSION}.apk`,
      'application/vnd.android.package-archive',
      token
    );
  }

  console.log(`\n[EXITO] Release v${APP_VERSION} publicada correctamente con soporte OTA y APK.`);
  console.log(`Release URL: ${releaseJson.html_url}`);
}

main().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
