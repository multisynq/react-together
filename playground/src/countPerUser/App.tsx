import { ReactTogether } from 'react-together'
import { CountPerUserDemo } from './CountPerUserDemo'

export default function App() {
  const searchParams = new URLSearchParams(window.location.search)
  const userId = searchParams.get('userId') ?? undefined
  return (
    <ReactTogether
      sessionParams={{
        name: 'CountPerUser Demo',
        password: 'super-secret-password',
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY']
      }}
      userId={userId}
    >
      <CountPerUserDemo />
    </ReactTogether>
  )
}
