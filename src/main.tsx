import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './routes'

// Render using HashRouter (via AppRouter) to support SCORM delivery
// Hash-based routing works reliably in file:// and iframe LMS contexts
// because the LMS never needs to resolve server-side paths
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element #root not found — check index.html')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
