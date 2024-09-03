import { ReactTogether } from 'react-together'
import Chat from './components/Chat'
export default function App() {
  return (
    <ReactTogether
      sessionParams={{
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY']
      }}
    >
      <Chat />
    </ReactTogether>
  )
}
