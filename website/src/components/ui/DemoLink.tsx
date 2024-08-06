import AOS from 'aos'
import 'aos/dist/aos.css'
import { Button } from 'primereact/button'
import QRCode from 'qrcode.react'
import { useEffect } from 'react'

export function DemoLink() {
  useEffect(() => {
    AOS.init({ duration: 500 })
  }, [])

  const urlLink = 'https://dev.reacttogether.dev/#/demos/HeroDemo'
  const displayText = '...' + urlLink.split('/').slice(-2).join('/')

  const copyToClipboard = () => {
    navigator.clipboard.writeText(urlLink).catch((err) => console.error('Failed to copy text: ', err))
  }

  const openInNewTab = () => {
    window.open(urlLink, '_blank', 'noopener,noreferrer')
  }

  return (
    <div data-aos='fade-up' data-aos-anchor-placement='top-bottom'>
      <div className='bg-white border-[1.5px] rounded-lg p-1 flex flex-col'>
        <div className='w-[140px] h-[140px] rounded-sm flex justify-center items-center'>
          <QRCode value={urlLink} size={130} bgColor='#FFFFFF' fgColor='#6b7280' level='H' includeMargin={false} />
        </div>
        <div className='w-full rounded-sm flex gap-1 justify-center items-center flex-col'>
          <div className='w-full border border-gray-200 px-1 py-[1.5px] rounded-md bg-white'>
            <span className='w-full'>
              <p className='text-xs'>{displayText}</p>
            </span>
          </div>
          <div className='flex w-full gap-1'>
            <Button
              icon='pi pi-external-link'
              size='small'
              pt={{
                root: { className: 'border-0 py-1 w-full' },
              }}
              label='Open New Tab'
              className='text-xs'
              onClick={openInNewTab}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
