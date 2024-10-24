import { ReactTogether } from 'react-together'
import Gallery from './Gallery'

export default function App() {
  return (
    <ReactTogether
      sessionParams={{
        name: 'Gallery Default session',
        password: 'super-secret-password',
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY']
      }}
    >
      <Gallery />
    </ReactTogether>
  )
}
