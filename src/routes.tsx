import { createHashRouter, RouterProvider, Navigate } from 'react-router'
import ShellLayout from './layouts/ShellLayout'
import StartGate from './components/StartGate'
import Hub from './components/Hub'
import ZonePlaceholder from './components/ZonePlaceholder'

// HashRouter is required for SCORM delivery:
// - LMS iframes often serve from file:// or varied URL bases
// - Hash-based routing (/# prefix) means the server/LMS never receives path changes
// - This eliminates "route not found" 404 errors on page reload inside LMS iframes
//
// Route structure:
//   #/start        → StartGate (splash — captures first user gesture for autoplay)
//   #/             → Hub (ecosystem overview with zone navigation)
//   #/zone/:id     → ZonePlaceholder (per-role simulation chapter)
//
// All routes are children of ShellLayout which provides AnimatePresence wrapping.

const router = createHashRouter([
  {
    path: '/',
    element: <ShellLayout />,
    children: [
      {
        index: true,
        element: <Hub />,
      },
      {
        path: 'start',
        element: <StartGate />,
      },
      {
        path: 'zone/:id',
        element: <ZonePlaceholder />,
      },
      {
        // Catch-all: redirect unknown hashes back to start
        path: '*',
        element: <Navigate to="/start" replace />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
