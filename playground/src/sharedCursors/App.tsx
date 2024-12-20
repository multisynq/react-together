import { ReactTogether } from 'react-together'
import { Canvas } from './components/Canvas'

export default function App() {
  return (
    <ReactTogether
      sessionParams={{
        name: 'Shared Cursors',
        password: 'mandatory',
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY']
      }}
    >
      <Canvas />
    </ReactTogether>
  )
}
