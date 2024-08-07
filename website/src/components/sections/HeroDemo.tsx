import { BrowserWrapper } from '@components/ui/BrowserWrapper'
import Iframe from 'react-iframe'
import { ReactTogether } from 'react-together'

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
  const path = '/#/demos/HeroDemo'
  const origin = window.origin
  const url = `${origin}${path}`
  return (
    <div className='w-full flex items-center flex-wrap gap-3 justify-center mt-8'>
      <div className='flex-[1_0_0] min-w-[25rem]'>
        <BrowserWrapper url={url}>
          <Iframe url={url} className='w-full relative h-full border-none' styles={{ aspectRatio: '5 / 3' }} />
        </BrowserWrapper>
      </div>
      <div className='flex-[1_0_0] min-w-[25rem]'>
        <BrowserWrapper url={url}>
          <Iframe url={url} className='w-full relative h-full border-none' styles={{ aspectRatio: '5 / 3' }} />
        </BrowserWrapper>
      </div>
    </div>
  )
}
