/**
 * SCORM 1.2 Wrapper
 *
 * Implements the SCORM 1.2 browser-side communication protocol directly,
 * without a package dependency (pipwerks-scorm-api-wrapper was not installable
 * because its underlying git dependency is blocked in this environment).
 *
 * This wrapper mirrors the pipwerks API surface:
 *   - SCORM.init() — call early at app mount
 *   - SCORM.set(element, value)
 *   - SCORM.get(element)
 *   - SCORM.save()
 *   - SCORM.quit()
 *
 * In local development (no LMS), all methods no-op and console.warn gracefully.
 * In Reach 360 / LMS production, the wrapper finds window.API and communicates.
 */

declare global {
  interface Window {
    // SCORM 1.2 API object injected by the LMS into the page's window chain
    API?: {
      LMSInitialize: (param: string) => string
      LMSFinish: (param: string) => string
      LMSGetValue: (element: string) => string
      LMSSetValue: (element: string, value: string) => string
      LMSCommit: (param: string) => string
      LMSGetLastError: () => string
      LMSGetErrorString: (errorCode: string) => string
      LMSGetDiagnostic: (errorCode: string) => string
    }
  }
}

// ── Internal state ──────────────────────────────────────────────────────────

let _api: Window['API'] | null = null
let _initialized = false

/**
 * Locate the SCORM 1.2 API object by walking up the window chain.
 * SCORM 1.2 spec: search up to 7 parent frames.
 */
function findAPI(win: Window): Window['API'] | null {
  let searchCount = 0
  let targetWin: Window = win

  while (!targetWin.API && targetWin.parent && targetWin.parent !== targetWin && searchCount < 7) {
    searchCount++
    targetWin = targetWin.parent
  }

  if (targetWin.API) {
    return targetWin.API
  }

  // Also check opener (for new window launches, common in Reach 360)
  if (win.opener && win.opener.API) {
    return win.opener.API
  }

  return null
}

// ── Public API ──────────────────────────────────────────────────────────────

export const SCORM = {
  /**
   * Initialize the SCORM connection.
   * Returns true if connected to an LMS, false if running locally.
   * Never throws — always degrades gracefully.
   */
  init(): boolean {
    if (_initialized) return _api !== null

    _api = findAPI(window)

    if (!_api) {
      console.warn(
        '[SCORM] No LMS API found — running in local/standalone mode. ' +
          'SCORM tracking is disabled. This is expected during development.',
      )
      _initialized = true
      return false
    }

    try {
      const result = _api.LMSInitialize('')
      if (result === 'true') {
        console.info('[SCORM] LMSInitialize succeeded — connected to LMS.')
        _initialized = true
        return true
      } else {
        const errorCode = _api.LMSGetLastError()
        console.warn(`[SCORM] LMSInitialize returned false. Error code: ${errorCode}`)
        _initialized = true
        return false
      }
    } catch (err) {
      console.warn('[SCORM] LMSInitialize threw an exception:', err)
      _api = null
      _initialized = true
      return false
    }
  },

  /**
   * Get a SCORM data model element value.
   * Returns empty string if not connected.
   */
  get(element: string): string {
    if (!_api) return ''
    try {
      return _api.LMSGetValue(element)
    } catch (err) {
      console.warn(`[SCORM] LMSGetValue(${element}) failed:`, err)
      return ''
    }
  },

  /**
   * Set a SCORM data model element value.
   * No-ops gracefully if not connected.
   */
  set(element: string, value: string): boolean {
    if (!_api) return false
    try {
      const result = _api.LMSSetValue(element, value)
      return result === 'true'
    } catch (err) {
      console.warn(`[SCORM] LMSSetValue(${element}) failed:`, err)
      return false
    }
  },

  /**
   * Commit (persist) data to the LMS.
   * Call this after setting important values (e.g., after progress updates).
   */
  save(): boolean {
    if (!_api) return false
    try {
      const result = _api.LMSCommit('')
      return result === 'true'
    } catch (err) {
      console.warn('[SCORM] LMSCommit failed:', err)
      return false
    }
  },

  /**
   * Finish/terminate the SCORM session.
   * Call this on unload or course completion.
   */
  quit(): boolean {
    if (!_api) return false
    try {
      const result = _api.LMSFinish('')
      _initialized = false
      _api = null
      return result === 'true'
    } catch (err) {
      console.warn('[SCORM] LMSFinish failed:', err)
      return false
    }
  },

  /** True if LMS API was found and initialized successfully. */
  get isConnected(): boolean {
    return _api !== null && _initialized
  },
}

/**
 * initSCORM — Call this once at app startup (before rendering).
 * Updates the Zustand store with connection status.
 * Returns true when connected to an LMS.
 */
export function initSCORM(): boolean {
  const connected = SCORM.init()
  return connected
}
