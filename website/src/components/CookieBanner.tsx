import { useLocalStorage } from '@uidotdev/usehooks'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import ReactGA from 'react-ga4'

interface ConsentMode {
  analytics_storage?: boolean
}

export function CookieBanner() {
  const [consentMode, setConsentMode] = useLocalStorage<ConsentMode>('consentMode', undefined)

  // Eventually we may allow the users to control the consent configuration, but now
  // we're only enabling analytics consent
  const onAccept = () => {
    setConsentMode({ analytics_storage: true })
    ReactGA.gtag('consent', 'update', {
      analytucs_storage: 'granted',
    })
  }

  const onDecline = () => {
    setConsentMode({})
  }

  // Do not show cookie banner if inside iframe
  if (window.self !== window.top) return null

  if (consentMode) return null

  const footerContent = (
    <div>
      <Button label="Please don't" icon='pi pi-times' onClick={() => onDecline()} className='p-button-text' />
      <Button label='Sure thing!' icon='pi pi-check' onClick={() => onAccept()} autoFocus />
    </div>
  )

  return (
    <Dialog
      modal={false}
      position='bottom-left'
      closeIcon={<></>}
      draggable={false}
      visible={consentMode === undefined}
      onHide={() => null}
      style={{ width: '50vw' }}
      footer={footerContent}
    >
      <p className='m-0'>Hey, welcome to React Together!! Do you mind if we gather your usage data to improve our website?</p>
    </Dialog>
  )
}
