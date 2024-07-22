import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactTogether } from '../react-together/index.ts'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <ReactTogether
        sessionParams={{
          appId: import.meta.env['VITE_APP_ID'],
          apiKey: import.meta.env['VITE_API_KEY']
        }}
      >
        <App />
      </ReactTogether>
    </PrimeReactProvider>
  </React.StrictMode>
)
