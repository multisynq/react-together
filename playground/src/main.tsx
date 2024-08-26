import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ReactTogether } from 'react-together'
import App from './App.tsx'
import './index.css'
import Chat from './pages/Chat.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <ReactTogether
        sessionParams={{
          appId: import.meta.env['VITE_APP_ID'],
          apiKey: import.meta.env['VITE_API_KEY']
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ReactTogether>
    </PrimeReactProvider>
  </React.StrictMode>
)
