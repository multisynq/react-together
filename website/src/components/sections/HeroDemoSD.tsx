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

export default function HeroDemoSD() {
  const url = new URL(window.location.href)
  url.pathname = '/demos/HeroDemo'
  const demoUrl = getJoinUrl(url, 'heroDemo', 'welcome').toString()

  return (
    <>
      <BrowserWrapper url={demoUrl}>
        <Iframe url={demoUrl} className='w-full relative h-full border-none' styles={{ aspectRatio: '5 / 3' }} />
      </BrowserWrapper>

      <BrowserWrapper url={demoUrl}>
        <Iframe url={demoUrl} className='w-full relative h-full border-none' styles={{ aspectRatio: '5 / 3' }} />
      </BrowserWrapper>
    </>
  )
}
