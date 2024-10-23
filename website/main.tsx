import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@App'

const hashPath = window.location.hash
if (hashPath.startsWith('#/')) {
  // Routes:
  const newUrl = new URL(window.location.href)
  newUrl.hash = ''
  newUrl.pathname = hashPath.slice(1)
  window.history.replaceState({}, '', newUrl)
}

const container = document.getElementById('root')
createRoot(container!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
