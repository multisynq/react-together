import { ReactTogether, SessionManager } from 'react-together'
import Chat from './components/ModelChat'
export default function App() {
  return (
    <ReactTogether
      sessionParams={{
        name: 'Playground Chat',
        password: 'mandatory',
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY']
      }}
    >
      <Chat />
      <SessionManager />
    </ReactTogether>
  )
}
