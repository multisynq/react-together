import './App.scss'
import '@styles/Comps.scss'
import '@styles/globals.css'
import '@styles/mdx.css'

import { Helmet } from 'react-helmet'
import { createContext } from 'react'
import { SiteHeader, SiteFooter } from '@components'
import { version } from '@package'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { DocumentationPage } from './pages/DocumentationPage'
import { ReactTogether } from 'react-together'

export const MainContext = createContext({} as any)

export default function App() {
  return (
    <div className='h-100 w-100'>
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></link>
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
