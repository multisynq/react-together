import { useLocalStorage } from '@uidotdev/usehooks'
import { COOKIE_POLICY_LAST_UPDATE, COOKIE_SETTINGS_LOCAL_STORAGE_KEY, CookieSettings, getGoogleConsent } from '@utils/cookies'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import ReactGA from 'react-ga4'

interface CookieBannerProps {
  forceShow?: boolean
}

export function CookieBanner({ forceShow = false }: CookieBannerProps) {
  const [consentMode, setConsentMode] = useLocalStorage<CookieSettings>(COOKIE_SETTINGS_LOCAL_STORAGE_KEY, undefined)

  // Eventually we may allow the users to control the consent configuration, but now
  // we're only enabling analytics consent
  const onAccept = () => {
    const newConsentMode = { analytics_storage: true }
    ReactGA.gtag('consent', 'update', getGoogleConsent(newConsentMode))
    setConsentMode({ writtenAt: Date.now(), consentMode: newConsentMode })
  }

  const onDecline = () => {
    const newConsentMode = {}
    ReactGA.gtag('consent', 'update', getGoogleConsent(newConsentMode))
    setConsentMode({ writtenAt: Date.now(), consentMode: newConsentMode })
  }

  // Do not show cookie banner if inside iframe
  if (window.self !== window.top) return null

  const footerContent = (
    <div>
      <Button label="Please don't" icon='pi pi-times' onClick={() => onDecline()} className='p-button-text' />
      <Button label='Sure thing!' icon='pi pi-check' onClick={() => onAccept()} autoFocus />
    </div>
  )

  const showBanner = forceShow || !consentMode || !consentMode.writtenAt || consentMode.writtenAt <= COOKIE_POLICY_LAST_UPDATE

  return (
    <Dialog
      modal={false}
      position='bottom-left'
      draggable={false}
      visible={showBanner}
      onHide={() => onDecline()}
      style={{ width: '50vw' }}
      footer={footerContent}
    >
      <p className='m-0'>Welcome to React Together!! Do you mind if we gather your usage data to improve our website?</p>
      <p className='m-0'>
        Learn more about our cookie policy{' '}
        <a className='text-blue-600 rounded-sm bg-slate-100 px-1' href='/cookies'>
          here.
        </a>
      </p>
    </Dialog>
  )
}
