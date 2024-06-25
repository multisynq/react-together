import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactTogether } from '../react-together/index.ts'
import App from './App.tsx'
import './index.css'

const together = true
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      {together ? (
        <ReactTogether
          sessionParams={{
            appId: import.meta.env['VITE_APP_ID'],
            apiKey: import.meta.env['VITE_API_KEY'],
            name: import.meta.env['VITE_NAME'],
            password: import.meta.env['VITE_PASSWORD']
          }}
        >
          <App />
        </ReactTogether>
      ) : (
        <App />
      )}
    </PrimeReactProvider>
  </React.StrictMode>
)
