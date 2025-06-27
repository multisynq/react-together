// Shared utilities for ActivitySynq implementations

const USER_ID_LOCAL_STORAGE_KEY = '__activity-synq-userId'

/**
 * Generates a stable user ID that persists across sessions
 */
export const generateUserId = (): string => {
  let existing: string | null = null

  if (typeof window !== 'undefined') {
    existing = localStorage.getItem(USER_ID_LOCAL_STORAGE_KEY)
  }

  if (!existing) {
    existing = Math.random().toString(36).substring(2, 15)
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_ID_LOCAL_STORAGE_KEY, existing)
    }
  }
  return existing
}

/**
 * Generates a stable session name that won't change on remount
 * Uses URL path and optional suffix for uniqueness
 * 
 * Edge cases handled:
 * - Query parameters (?param=value) are ignored
 * - Hash fragments (#section) are ignored  
 * - Trailing slashes are normalized
 * - Special characters are replaced with dashes
 * - Multiple consecutive dashes are collapsed
 */
export const generateStableSessionName = (suffix?: string): string => {
  // Use URL pathname only (ignores query params and hash fragments)
  let urlPath = typeof window !== 'undefined' 
    ? window.location.pathname
    : '/default'
  
  // Normalize trailing slashes and clean up path
  urlPath = urlPath.replace(/\/+$/, '') || '/' // Remove trailing slashes, default to root
  urlPath = urlPath.replace(/[^a-zA-Z0-9]/g, '-') // Replace special chars (including /) with dashes
  urlPath = urlPath.replace(/-+/g, '-') // Collapse multiple dashes
  urlPath = urlPath.replace(/^-+|-+$/g, '') // Trim leading/trailing dashes
  
  const cleanPath = urlPath || 'root'
  const sessionSuffix = suffix ? `-${suffix}` : ''
  
  return `activity-session-${cleanPath}${sessionSuffix}`
}

/**
 * Creates stable default configuration values
 */
export const createStableActivityConfig = (config: any) => {
  // Safe access to import.meta.env that works in both browser and test environments
  const getEnvVar = (key: string) => {
    try {
      // Use globalThis to safely access env vars across environments
      return (globalThis as any)?.import?.meta?.env?.[key] || 
             (globalThis as any)?.__VITE_ENV__?.[key] ||
             process?.env?.[key]
    } catch {
      return undefined
    }
  }

  const appId = config.appId || getEnvVar('VITE_APP_ID')
  const apiKey = config.apiKey || getEnvVar('VITE_API_KEY') || getEnvVar('VITE_MULTISYNQ_API_KEY')
  
  return {
    userId: config.userId || generateUserId(),
    apiKey: apiKey || 'missing-api-key',
    appId: appId || 'missing-app-id',
    sessionName: config.sessionName || getEnvVar('VITE_SESSION_NAME') || generateStableSessionName('demo'),
    sessionPassword: config.sessionPassword || getEnvVar('VITE_SESSION_PASSWORD') || 'activity-session-password',
    onActivity: config.onActivity,
  }
}