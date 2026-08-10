# Plan 03-06 Summary — Speech System + Camera Transitions

**Status:** Complete (pending human checkpoint)  
**Automated tests:** 14 passed, 6 skipped  
**TypeScript:** Clean  
**Build:** Passes  

## Files Created
- `src/hooks/useTypewriter.ts` — `useTypewriter(text, charsPerSecond)` returns `{ displayedText, isComplete }`
- `src/hooks/__tests__/useTypewriter.test.ts` — 4 tests (empty, reveal, reset on change, empty text)
- `src/content/speech-data.ts` — `SPEECH_DATA: Record<Zone, string[]>`

## Files Modified
- `src/components/SpeechBubble.tsx` — `text` prop with typewriter + blinking cursor, `aria-live="polite"`, `direction` arrow, backward-compat `children`
- `src/store/useStore.ts` — `navigateTo` now resolves `cameraTarget` from `SCENE_REGISTRY.zone` and sets `transitionPhase`
- `src/components/three/CameraRig.tsx` — `'rest'` event listener on `CameraControls` calls `useStore.getState().setTransitionPhase('complete')`
- `src/components/dom/__tests__/SpeechBubble.test.tsx` — 4 tests (typewriter, aria-live, cursor, children compat)

## Verification
- `npx vitest run`: 14 passed, 6 skipped
- `npx tsc --noEmit`: Clean
- `npm run build`: Passes

## Human Checkpoint (blocking)
Before Phase 3 is complete, verify in browser:
1. Single Canvas element in devtools
2. ACES filmic + bloom + vignette visible
3. Camera dollies smoothly on scene navigation
4. Hub rings show on act1, hide on zones
5. SpeechBubble types character-by-character with blinking cursor
6. aria-live announces full text immediately
7. Lidar point cloud visible across all scenes
8. No console warnings (no setState-in-useFrame, no DOM-in-Canvas)
9. Render above 30fps with all effects active
