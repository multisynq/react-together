import AOS from 'aos'
import 'aos/dist/aos.css'
import QRCode from 'qrcode.react'
import { useEffect, useState } from 'react'

export function DemoLink() {
  useEffect(() => {
    AOS.init({ duration: 500 })
  }, [])

  const urlLink = 'https://dev.reacttogether.dev/#/demos/HeroDemo'
  const displayText = '...' + urlLink.split('/').pop()

  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(urlLink)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch((err) => console.error('Failed to copy text: ', err))
  }

  const openInNewTab = () => {
    window.open(urlLink, '_blank', 'noopener,noreferrer')
  }

  return (
    <div data-aos='fade-up' data-aos-anchor-placement='top-bottom'>
      <div className='bg-white border-[1.5px] rounded-lg p-1 flex flex-col gap-1'>
        <div className='w-[140px] h-[140px] bg-slate-300 rounded-sm'>
          <QRCode value={urlLink} size={140} bgColor='#FFFFFF' fgColor='#000000' level='H' includeMargin={true} />
        </div>
        <div className='w-full px-2 rounded-sm bg-gray-50 border-gray-300 flex gap-[0.5px] justify-center items-center'>
          <p className='text-xs m-0 flex-shrink-0 b-0'>{displayText}</p>
          <button
            onClick={openInNewTab}
            className='text-black font-bold p-1 w-6 h-6 rounded text-xs flex items-center justify-center'
            title='Open in new tab'
          >
            <i className='pi pi-external-link' style={{ fontSize: '0.7rem' }}></i>
          </button>
          <button
            onClick={copyToClipboard}
            className='text-black font-bold p-1 w-6 h-6 rounded text-xs flex items-center justify-center'
            title={copySuccess ? 'Copied!' : 'Copy'}
          >
            <i className={copySuccess ? 'pi pi-check' : 'pi pi-copy'} style={{ fontSize: '0.7rem' }}></i>
          </button>
        </div>
      </div>
    </div>
  )
}
