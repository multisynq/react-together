import '@styles/globals.css'
import '@styles/mdx.css'
import 'react-json-view-lite/dist/index.css'
import './App.scss'

import '@styles/override.scss'

import { setupGoogleAnalytics } from '@utils/cookies'
import { Helmet } from 'react-helmet'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'

setupGoogleAnalytics()

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
    </div>
  )
}
