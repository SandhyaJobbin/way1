import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(rootDir, 'src');
const distDir = path.resolve(rootDir, 'dist');
const publicDir = path.resolve(rootDir, 'public');

// List of terms that violate RFP neutrality
// Target client names, trademarks, or specific references
const BANNED_TERMS = [
  'Waymo',
  'waymo.com',
  'Alphabet',
  'Wayo'
];

function scanDirectory(dir, issues = []) {
  if (!fs.existsSync(dir)) return issues;

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath, issues);
    } else {
      // Only scan text files
      const ext = path.extname(fullPath).toLowerCase();
      if (['.html', '.js', '.ts', '.tsx', '.css', '.json', '.md'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        for (const term of BANNED_TERMS) {
          const regex = new RegExp(`\\b${term}\\b`, 'gi');
          let match;
          while ((match = regex.exec(content)) !== null) {
            // Find line number
            const lines = content.substring(0, match.index).split('\n');
            const lineNum = lines.length;
            issues.push(`Found restricted term "${term}" in ${path.relative(rootDir, fullPath)} at line ${lineNum}`);
          }
        }
      }
    }
  }
  return issues;
}

console.log('Starting Vendor Neutrality Verification...');

const allIssues = [
  ...scanDirectory(srcDir),
  ...scanDirectory(publicDir)
];

// Scan dist only if it exists
if (fs.existsSync(distDir)) {
  allIssues.push(...scanDirectory(distDir));
}

if (allIssues.length > 0) {
  console.error('\\nΓ¥î Neutrality verification FAILED. Found the following issues:\\n');
  allIssues.forEach(issue => console.error(`- ${issue}`));
  process.exit(1);
} else {
  console.log('\\nΓ£ö Neutrality verification PASSED. No restricted terms found.');
}
