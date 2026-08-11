import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const patterns = [/waymo/i, /wayo/i];
const directoriesToScan = ['src', 'dist'];
const filesToScan = ['index.html', 'package.json'];

let hits = 0;

function scanFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    const files = fs.readdirSync(filePath);
    for (const file of files) {
      scanFile(path.join(filePath, file));
    }
  } else if (stat.isFile()) {
    const ext = path.extname(filePath);
    // Only scan text files
    if (['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.json', '.md'].includes(ext)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        for (const pattern of patterns) {
          if (pattern.test(line)) {
            console.error(`Found vendor reference in ${path.relative(rootDir, filePath)}:${index + 1}`);
            console.error(`  Line: ${line.trim()}`);
            hits++;
          }
        }
      });
    }
  }
}

console.log('Running vendor scrub check...');
for (const dir of directoriesToScan) {
  scanFile(path.join(rootDir, dir));
}
for (const file of filesToScan) {
  scanFile(path.join(rootDir, file));
}

if (hits > 0) {
  console.error(`\nScrub failed: found ${hits} vendor references.`);
  process.exit(1);
} else {
  console.log('\nScrub passed: zero vendor references found.');
  process.exit(0);
}
