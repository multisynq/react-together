import AOS from 'aos'
import 'aos/dist/aos.css'
import { Button } from 'primereact/button'
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
      <div className='bg-white border-[1.5px] rounded-lg p-1 flex flex-col gap-0'>
        <div className='w-[140px] h-[140px] bg-slate-300 rounded-sm'>
          <QRCode value={urlLink} size={140} bgColor='#FFFFFF' fgColor='#000000' level='H' includeMargin={true} />
        </div>
        <div className='w-full rounded-sm flex gap-1 justify-center items-center flex-col'>
          <div className='w-full border border-black px-2 rounded-sm bg-slate-100'>
            <span className='w-full'>
              <p className='text-xs'>{displayText}</p>
            </span>
          </div>
          <Button
            icon='pi pi-check'
            size='small'
            pt={{
              root: { className: 'border-0 py-1 w-full' },
            }}
            label='Open New Tab'
            className='text-xs'
          />
          <Button
            icon='pi pi-check'
            size='small'
            pt={{
              root: { className: 'border-0 py-1 w-full' },
            }}
            label='Copy URL'
            className='text-xs'
          />

          {/* <button
            onClick={copyToClipboard}
            className='text-black font-bold p-1 w-6 h-6 rounded text-xs flex items-center justify-center'
            title={copySuccess ? 'Copied!' : 'Copy'}
          >
            <p>Copy URL</p>
            <i className={copySuccess ? 'pi pi-check' : 'pi pi-copy'} style={{ fontSize: '0.7rem' }}></i>
          </button> */}
        </div>
      </div>
    </div>
  )
}
