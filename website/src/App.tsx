import '@styles/Comps.scss'
import '@styles/globals.css'
import '@styles/mdx.css'
import 'react-json-view-lite/dist/index.css'
import './App.scss'

import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import TagManager from 'react-gtm-module'
import { Helmet } from 'react-helmet'
import { HashRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'

// Only load Google Analytics if inside iframe
if (window.self === window.top) {
  TagManager.initialize({
    gtmId: import.meta.env.VITE_GTM_ID,
  })
  ReactGA.initialize(import.meta.env.VITE_GA4_ID)
}

export default function App() {
  useEffect(() => {
    const newLocation = window.location.pathname + window.location.search
    console.log('Changed location!!', newLocation)
    // ReactGA.pageview(newLocation)
  }, [])

  return (
    <div className='h-100 w-100'>
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' rel='stylesheet' />
      </Helmet>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </div>
  )
}
