import '@styles/Comps.scss'
import '@styles/globals.css'
import '@styles/mdx.css'
import 'react-json-view-lite/dist/index.css'
import './App.scss'

import { Helmet } from 'react-helmet'
import { HashRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'

export default function App() {
  return (
    <div className='h-100 w-100'>
      <Helmet>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link href='https://fonts.googleapis.com/css?family=Comfortaa' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap' rel='stylesheet'></link>
        <link href='https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;800&display=swap' rel='stylesheet' />
      </Helmet>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </div>
  )
}
