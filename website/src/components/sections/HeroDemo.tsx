// import SyncedTabs from '@components/demo/SyncedTabs'
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
    <div className='w-full flex items-center flex-wrap gap-3 justify-center mt-8'>
      <Iframe url='/#/demos/HeroDemo' className='flex-[1_0_0]' styles={{ aspectRatio: '5 / 3' }} />

      <Iframe url='/#/demos/HeroDemo' className='flex-[1_0_0]' styles={{ aspectRatio: '5 / 3' }} />

      {/* sample */}
      {/* <FakeBrowser> */}
      {/* <Iframe url='/#/demos/HeroDemo' className='flex-[1_0_0] sm:min-w-[26rem]' styles={{ aspectRatio: '5 / 3' }} /> */}
      {/* </FakeBrowser> */}

      {/* <FakeBrowser> */}
      {/* <Iframe url='/#/demos/HeroDemo' className='flex-[1_0_0] sm:min-w-[26rem]' styles={{ aspectRatio: '5 / 3' }} /> */}
      {/* <Iframe url='/#/demos/HeroDemo' className='flex-[1_0_0] sm:min-w-[26rem]relative' /> */}
      {/* </FakeBrowser> */}
    </div>
  )
}
