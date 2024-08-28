import { ReactTogether } from 'react-together'
import { MultipleModels } from './components'
import { OverrideModel } from './models'

export default function App() {
  return (
    <ReactTogether
      sessionParams={{
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY'],
        model: OverrideModel
      }}
    >
      <MultipleModels />
    </ReactTogether>
  )
}
