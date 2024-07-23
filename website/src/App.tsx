import '@styles/Comps.scss'
import '@styles/globals.css'
import '@styles/mdx.css'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import './App.scss'

import { SiteFooter, SiteHeader } from '@components'
import { version } from '@package'
import { createContext } from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { DocumentationPage } from './pages/DocumentationPage'
import { HomePage } from './pages/HomePage'

export const MainContext = createContext({} as any)

export default function App() {
  return (
    <div className='h-100 w-100'>
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap' rel='stylesheet' />
      </Helmet>
      <MainContext.Provider value={{}}>
        <BrowserRouter>
          <SiteHeader />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/docs/:slug1/:slug2?' element={<DocumentationPage />} />
          </Routes>
          <SiteFooter />
        </BrowserRouter>
      </MainContext.Provider>

      <div className='version-num'>{version}</div>
    </div>
  )
}
