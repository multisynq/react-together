// import SyncedTabs from '@components/demo/SyncedTabs'
import { FakeBrowser } from '@components/ui/FakeBrowser'
import Iframe from 'react-iframe'
import { ReactTogether } from '../../../../react-together'

export function WithReactTogetherProvider({ children }) {
  return (
    <ReactTogether
      sessionParams={{
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY'],
      }}
    >
      {children}
    </ReactTogether>
  )
}

export function HeroDemo() {
  return (
    <div className='w-full flex items-center flex-wrap gap-3 justify-center bg-white-100 mt-8'>
      <FakeBrowser>
        <Iframe
          url='/demos/HeroDemo'
          // height='100%'
          // width='100%'
          styles={{ aspectRatio: '5/3' }}
        />
      </FakeBrowser>

      <FakeBrowser>
        <Iframe
          url='/demos/HeroDemo'
          // height='100%'
          // width='100%'
          styles={{ aspectRatio: '5/3' }}
        />
      </FakeBrowser>
    </div>
  )
}
