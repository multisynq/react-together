import './App.scss'

import { useState, createContext } from 'react'
import { Helmet } from 'react-helmet'

import { version } from '@package'

// import {} from '@types'
// import {} from '@components'

export const MainContext = createContext({} as any)

export default function App() {

  return (
    <div className='h-100 w-100'>
      <Helmet>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap" rel="stylesheet" /> */}
      </Helmet>
      
      <h1>React Together</h1>

      <div className='version-num'>{version}</div>
    </div>
  )
}

