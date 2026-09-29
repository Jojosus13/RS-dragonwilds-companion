const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = path.resolve(process.env.LOCALAPPDATA || 'C:/Users/Jojosus/AppData/Local', 'MinGit');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const zipPath = path.join(targetDir, 'mingit.zip');
const url = 'https://github.com/git-for-windows/git/releases/download/v2.48.1.windows.1/MinGit-2.48.1-64-bit.zip';

console.log('Downloading MinGit portable from GitHub...');

function download(fileUrl, dest, cb) {
  https.get(fileUrl, (res) => {
    if (res.statusCode === 302 || res.statusCode === 301) {
      return download(res.headers.location, dest, cb);
    }
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => {
      file.close(cb);
    });
  }).on('error', (err) => {
    console.error('Download error:', err);
  });
}

download(url, zipPath, () => {
  console.log('Downloaded zip! Extracting with PowerShell...');
  try {
    execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${targetDir}' -Force"`, { stdio: 'inherit' });
    const gitExe = path.join(targetDir, 'cmd', 'git.exe');
    if (fs.existsSync(gitExe)) {
      console.log('MinGit ready at:', gitExe);
      const version = execSync(`"${gitExe}" --version`).toString();
      console.log('Git version:', version.trim());
    }
  } catch (e) {
    console.error('Extraction error:', e);
  }
});
