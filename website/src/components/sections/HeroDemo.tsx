import { BrowserWrapper } from '@components/ui/BrowserWrapper'
import Iframe from 'react-iframe'
import { ReactTogether, utils } from 'react-together'
const { getJoinUrl } = utils

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
  const url = new URL(window.location.href)
  url.pathname = '/demos/HeroDemo'
  const demoUrl = getJoinUrl(url, 'heroDemo', 'welcome').toString()

  return (
    <div className='w-full flex items-center flex-wrap gap-3 justify-center mt-8'>
      <div className='flex-[1_0_0] min-w-[25rem]'>
        <BrowserWrapper url={demoUrl}>
          <Iframe url={demoUrl} className='w-full relative h-full border-none' styles={{ aspectRatio: '5 / 3' }} />
        </BrowserWrapper>
      </div>
      <div className='flex-[1_0_0] min-w-[25rem]'>
        <BrowserWrapper url={demoUrl}>
          <Iframe url={demoUrl} className='w-full relative h-full border-none' styles={{ aspectRatio: '5 / 3' }} />
        </BrowserWrapper>
      </div>
    </div>
  )
}
