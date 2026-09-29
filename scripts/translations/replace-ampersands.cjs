const fs = require('fs');
const path = require('path');

function replaceInText(text) {
  // Line by line replacement of isolated & in text/strings
  const lines = text.split('\n');
  const result = lines.map(line => {
    // If line has && (logical operator) or URL with params, be selective
    if (line.includes('http://') || line.includes('https://') || line.includes('xmlns') || line.includes('import ') || line.includes('export {')) {
      return line;
    }
    
    // Replace isolated ' & ' in strings, JSX tags, titles, labels
    return line.replace(/(\s+)&(\s+)/g, (match, p1, p2, offset, str) => {
      // Check if preceded or followed by another &
      if (str[offset - 1] === '&' || str[offset + match.length] === '&') {
        return match;
      }
      return `${p1}y${p2}`;
    }).replace(/&amp;/g, 'y');
  });
  return result.join('\n');
}

function processDir(dir) {
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      processDir(full);
    } else if (item.name.endsWith('.jsx') || item.name.endsWith('.js') || item.name.endsWith('.json')) {
      const orig = fs.readFileSync(full, 'utf8');
      const updated = replaceInText(orig);
      if (orig !== updated) {
        fs.writeFileSync(full, updated, 'utf8');
        console.log('Updated ampersands in:', full);
      }
    }
  }
}

processDir(path.resolve(__dirname, '../../src'));

const indexHtmlPath = path.resolve(__dirname, '../../index.html');
if (fs.existsSync(indexHtmlPath)) {
  const orig = fs.readFileSync(indexHtmlPath, 'utf8');
  const updated = replaceInText(orig);
  if (orig !== updated) {
    fs.writeFileSync(indexHtmlPath, updated, 'utf8');
    console.log('Updated index.html');
  }
}

console.log('Finished replacing & with y across project!');
