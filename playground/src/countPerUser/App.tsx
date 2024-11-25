import { ReactTogether } from 'react-together'
import { CountPerUserDemo } from './CountPerUserDemo'

export default function App() {
  return (
    <ReactTogether
      sessionParams={{
        name: 'CountPerUser Demo',
        password: 'super-secret-password',
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY']
      }}
    >
      <CountPerUserDemo />
    </ReactTogether>
  )
}
