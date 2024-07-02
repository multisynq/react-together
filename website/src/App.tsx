import './App.scss'
import '@styles/globals.css'
import '@styles/mdx.css'

import { Helmet } from 'react-helmet'
import { useState, createContext } from 'react'

import { version } from '@package'
import { Layout } from '@pages'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { DocumentationPage } from './pages/DocumentationPage'

export const MainContext = createContext({} as any)

export default function App() {
  return (
    <div className='h-100 w-100'>
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'></link>
        {/* <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap" rel="stylesheet" /> */}
      </Helmet>

      <MainContext.Provider value={{}}>
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              path='/docs/*'
              element={
                <Layout>
                  <DocumentationPage />
                </Layout>
              }
            />
            {/* <Route path='/docs/components' element={<div>Components thingy</div>} /> */}
          </Routes>
        </BrowserRouter>
      </MainContext.Provider>

      <div className='version-num'>{version}</div>
    </div>
  )
}
