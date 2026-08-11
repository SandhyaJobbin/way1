import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/outfit/400.css';
import '@fontsource/outfit/600.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/600.css';
import './index.css';
import App from './App.tsx';
import { initSCORM } from './lib/scorm.ts';

// Initialize SCORM connection to LMS if available
initSCORM();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);