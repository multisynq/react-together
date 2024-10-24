import '@styles/Comps.scss'
import '@styles/globals.css'
import '@styles/mdx.css'
import 'react-json-view-lite/dist/index.css'
import './App.scss'

import { CookieBanner } from '@components/CookieBanner'
import ReactGA from 'react-ga4'
import TagManager from 'react-gtm-module'
import { Helmet } from 'react-helmet'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'

// Only load Google Analytics if inside iframe
if (window.self === window.top) {
  // Set up consent mode before initializing GTM and GA4
  const storedConsent = localStorage.getItem('consentMode')
  const defaultConsent = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  }
  if (storedConsent === null) {
    ReactGA.gtag('consent', 'default', defaultConsent)
  } else {
    const parsed = JSON.parse(storedConsent)
    const consent = { ...defaultConsent }
    Object.keys(defaultConsent).forEach((key) => {
      if (parsed[key]) consent[key] = 'granted'
    })
    ReactGA.gtag('consent', 'default', consent)
  }

  TagManager.initialize({
    gtmId: import.meta.env.VITE_GTM_ID,
  })
  ReactGA.initialize(import.meta.env.VITE_GA4_ID)
}

export default function App() {
  return (
    <div className='h-100 w-100'>
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;800&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' rel='stylesheet' />
      </Helmet>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <CookieBanner />
    </div>
  )
}
