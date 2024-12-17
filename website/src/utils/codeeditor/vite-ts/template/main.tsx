import React from 'react'
import ReactDOM from 'react-dom/client'
import { ReactTogether } from 'react-together'
import './index.css'
import App from './src/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactTogether
      sessionParams={{
        appId: import.meta.env.VITE_APP_ID,
        apiKey: import.meta.env.VITE_API_KEY,
      }}
    >
      <App />
    </ReactTogether>
  </React.StrictMode>
)
