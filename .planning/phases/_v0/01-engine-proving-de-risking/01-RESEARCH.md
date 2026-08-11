# Phase 01 Research

## Key Findings
- **React Router v7**: The new standard focuses heavily on data loading, but since we are building a vertical empty shell with a distinct start gate (`/start`) and a Hub (`/`), standard route definitions will suffice. We must configure HashRouter due to SCORM execution requirements where modules often run from local `file://` protocols or varied relative directory paths.
- **Zod + Setup**: Defining schemas upfront ensures robust config passing. Our schemas will need to reflect the JSON payload structure that dictates "Ecosystem" and "Zone" details.
- **SCORM via Pipwerks**: Pipwerks is a well-tested vanilla JS wrapper for SCORM 1.2/2004 APIs. It requires a globally available API discovery method (often provided by the LMS in an iframe parent). Mocking this locally requires catching API failures and gracefully logging to console instead.
- **Vite SCORM Config**: SCORM packages need relative asset paths (`base: './'`). We must avoid absolute path imports for assets to ensure the built zip works flawlessly.
- **Transitions**: Framer Motion's `AnimatePresence` with `mode="wait"` manages overlapping DOM unmount/mount states cleanly and solves React Router transition complexities.
- **Visuals Sandbox**: While the explicit Jog Dial, Lidar shader, and Wayo character are core features of the domain, the decisions state this Phase is a "Vertical empty shell". Therefore, Phase 01 only needs to stage the architectural placeholder for these components and simple mock states, rather than full WebGL point clouds and physics right now.

## Technical Challenges
- **SCORM Local DX vs Prod Execution**: Providing a seamless dev experience locally without an LMS running, but cleanly succeeding when bundled and uploaded to Reach 360.
- **Autoplay Policies**: Browsers block media autoplay. Ensuring the `/start` route effectively captures a valid DOM user interaction before passing state to the main router to allow video/audio later.
- **State Store Architecture**: Initializing a Zustand store (representing the scrubber progress overlay and phase states) that can act as the single source of truth for both the DOM overlay layer and the future WebGL layer.

## Proposed Architecture
- **Root**: `src/main.tsx` initializing Vite + React + HashRouter.
- **Router Configuration**: `src/routes.tsx` mapping `/start`, `/` (Hub), and `/zone/:id` placeholders.
- **State**: `src/store/useAppStore.ts` (Zustand) for global app state, config flags, and SCORM connectivity status.
- **SCORM Layer**: `src/lib/scorm.ts` wrapper utilizing `pipwerks.SCORM` with local fallback logic (`if (!scorm.init()) console.warn('Local fallback')`).
- **Data Validation**: `src/schema/content.ts` (Zod schemas) tracking ecosystem logic.

## Component Strategy
- **Start Gate**: A simple splash screen demanding a user click. Upon click, triggers `navigate('/')` and initializes SCORM connection.
- **Hub Page**: Primary index point referencing the ecosystem schemas. Points towards Zone placeholders.
- **Animated Outlet**: Wrap the React Router `<Outlet />` inside Framer Motion's `<AnimatePresence mode="wait">` connected to the current `location.pathname` key to get seamless transitions.
- **Shell Layout**: An overlay container for future UI and 3D Canvas rendering, decoupled from traditional document flow.

## Validation Architecture
- **SCORM Init Test**: Console logs confirm SCORM API hunt succeeded (or explicitly degraded to mock).
- **Navigation Verification**: Clicking from Start -> Hub -> Zone uses Hash routes (`#/`) and animates smoothly without hard reloads.
- **Zod Data Feed**: The shell populates a minimal list of available zones derived from validated JSON, proving the config architecture.
