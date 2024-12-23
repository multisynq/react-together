import { ReactTogether } from 'react-together'
import Gallery from './Gallery'

export default function App() {
  const searchParams = new URLSearchParams(window.location.search)
  const userId = searchParams.get('userId') ?? undefined
  return (
    <ReactTogether
      sessionParams={{
        name: 'Gallery Default session 2',
        password: 'super-secret-password',
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY']
      }}
      userId={userId}
    >
      <Gallery />
    </ReactTogether>
  )
}
