import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'

import App from './src/App'

import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'react-json-view-lite/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const container = document.getElementById('root')
createRoot(container!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />    
    </PrimeReactProvider>
  </StrictMode>
)
