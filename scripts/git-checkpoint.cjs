const { execSync } = require('child_process');
const path = require('path');

const gitExe = 'C:\\Users\\Jojosus\\AppData\\Local\\MinGit\\cmd\\git.exe';
const cwd = path.resolve(__dirname, '..');

function runGit(cmd) {
  console.log(`> git ${cmd}`);
  try {
    const out = execSync(`"${gitExe}" ${cmd}`, { cwd, stdio: 'pipe' }).toString();
    if (out.trim()) console.log(out.trim());
    return out;
  } catch (err) {
    if (err.stdout && err.stdout.toString().trim()) {
      console.log(err.stdout.toString().trim());
    }
    if (err.stderr && err.stderr.toString().trim()) {
      console.error(err.stderr.toString().trim());
    }
    throw err;
  }
}

try {
  runGit('init');
  runGit('config user.name "Jojosus13"');
  runGit('config user.email "jojosus13@users.noreply.github.com"');
  runGit('branch -M main');
  
  // Try remote add or set-url
  try {
    runGit('remote add origin https://github.com/Jojosus13/RS-dragonwilds-companion.git');
  } catch (e) {
    runGit('remote set-url origin https://github.com/Jojosus13/RS-dragonwilds-companion.git');
  }

  runGit('add .');
  runGit('commit -m "feat: checkpoint wiki companion app with complete interactive map, vaults, items, and crafting"');
  console.log('\n--- Pushing to GitHub ---');
  runGit('push -u origin main');
  console.log('\nSUCCESS! Checkpoint pushed to GitHub.');
} catch (e) {
  console.error('\nGit operation finished with note/error:', e.message);
}
