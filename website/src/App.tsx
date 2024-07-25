import '@styles/Comps.scss'
import '@styles/globals.css'
import '@styles/mdx.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import './App.scss'

import { SiteFooter, SiteHeader } from '@components'
import { version } from '@package'
import { Helmet } from 'react-helmet'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'

export default function App() {
  return (
    <div className='h-100 w-100'>
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap' rel='stylesheet' />
      </Helmet>
      <BrowserRouter>
        <SiteHeader />
        <AppRoutes />
        <SiteFooter />
      </BrowserRouter>

      <div className='version-num'>{version}</div>
    </div>
  )
}
