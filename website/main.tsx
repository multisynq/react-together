import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@App'

// Previously we were using a hashrouter, but now we are using a regular one
// This code change urls that have their path on the url hash so that the
// path is set properly.
// (There are link on the internet that are using the hash path)
const url = new URL(window.location.href)
if (url.pathname === '/' && url.hash.startsWith('#/')) {
  url.pathname = url.hash.slice(1)
  url.hash = ''
  window.history.replaceState({}, '', url)
}

const container = document.getElementById('root')
createRoot(container!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
