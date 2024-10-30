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
      <Button
        label='no thanks...'
        onClick={() => onDecline()}
        className='p-button-text'
        severity='secondary'
        outlined
        size='small'
        rounded
        aria-label='Decline cookie consent'
      />
      <Button
        label='Sure thing!'
        icon='pi pi-check'
        onClick={() => onAccept()}
        autoFocus
        rounded
        size='small'
        aria-label='Accept cookie consent'
      />
    </div>
  )

  const showBanner = forceShow || !consentMode || !consentMode.writtenAt || consentMode.writtenAt <= COOKIE_POLICY_LAST_UPDATE

  return (
    <Dialog
      aria-labelledby='cookie-banner-header'
      aria-describedby='cookie-banner-description'
      modal={false}
      position='bottom-left'
      draggable={false}
      visible={showBanner}
      onHide={() => onDecline()}
      header={'Welcome to React Together'}
      className='w-full md:w-[32rem]'
      pt={{
        root: { className: 'bg-gray-50 overfill-none rounded-xl border border-gray-400' },
        header: { className: 'bg-transparent' },
        footer: { className: 'bg-transparent' },
        content: { className: 'bg-transparent' },
      }}
      footer={footerContent}
    >
      <div id='cookie-banner-description' className='flex gap-2 flex-col text-sm md:text-base text-gray-600 px-1'>
        <span>Would you mind if we gather a little information while you’re here?</span>
        <span>
          It’ll help us keep things running smoothly and make sure you have the best experience!
          <a className='text-blue-600 rounded-sm bg-slate-100 px-1 mx-2' href='/cookies' aria-label='Learn more about the policy here'>
            Learn more
          </a>
        </span>
      </div>
    </Dialog>
  )
}
