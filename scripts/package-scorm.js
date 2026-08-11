import packager from 'simple-scorm-packager';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.resolve(rootDir, 'dist');
const destDir = path.resolve(rootDir, 'scorm');

packager({
  version: '1.2',
  organization: 'Waymo',
  title: 'AV Context Training - RFP Demo',
  language: 'en-US',
  masteryScore: 80,
  startingPage: 'index.html',
  source: sourceDir,
  package: {
    version: '1.0.0',
    zip: true,
    name: 'av_context_trainer_rfp_demo',
    author: 'Waymo Training',
    outputFolder: destDir,
    description: 'v1 - US Driving Context & AV Rules Training (RFP Demo)',
    keywords: ['scorm', 'training', 'av'],
    typicalDuration: 'PT0H30M0S',
    rights: `©${new Date().getFullYear()} Waymo. All rights reserved.`
  }
}, (msg) => {
  console.log('[SCORM Packager]', msg);
});
