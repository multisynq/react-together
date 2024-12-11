import ReactGA from 'react-ga4'
import TagManager from 'react-gtm-module'

export const COOKIE_SETTINGS_LOCAL_STORAGE_KEY = 'consentMode'

export const COOKIE_POLICY_LAST_UPDATE = new Date('2024-10-24T15:01:00Z').getTime()

export interface CookieSettings {
  writtenAt?: number
  consentMode?: ConsentMode
}

export interface ConsentMode {
  ad_storage?: boolean
  ad_user_data?: boolean
  ad_personalization?: boolean
  analytics_storage?: boolean
}

/**
 * This function converts
 */
export function getGoogleConsent(consentMode: ConsentMode | null | undefined) {
  const consent = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  }
  if (consentMode) {
    Object.entries(consentMode).forEach(([key, value]) => {
      if (value === true) {
        consent[key] = 'granted'
      }
    })
  }
  return consent
}

export function setupGoogleAnalytics() {
  // If inside iframe, do nothing
  if (window.self !== window.top) return
  if (!import.meta.env.VITE_GA4_ID || !import.meta.env.VITE_GTM_ID) return

  let consent: ConsentMode | null = null
  const storedConsent = localStorage.getItem(COOKIE_SETTINGS_LOCAL_STORAGE_KEY)
  if (storedConsent !== null) {
    try {
      const json = JSON.parse(storedConsent) as CookieSettings
      if (json.writtenAt && json.writtenAt > COOKIE_POLICY_LAST_UPDATE) {
        consent = json.consentMode
      } else {
        console.warn('Outdated cookie policy')
      }
    } catch (e) {
      console.log('Failed to parse cookie settings')
      localStorage.setItem(COOKIE_SETTINGS_LOCAL_STORAGE_KEY, null)
    }
  }

  // Setup consent mode
  console.log('Setting cookie consent', consent)
  ReactGA.gtag('consent', 'default', getGoogleConsent(consent))

  // Initialize Google Tag Manager and Google Analytics
  TagManager.initialize({
    gtmId: import.meta.env.VITE_GTM_ID,
  })
  
  ReactGA.initialize(import.meta.env.VITE_GA4_ID)
}
