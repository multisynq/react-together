import { useHover } from '@uidotdev/usehooks'
import { useState } from 'react'
import { DemoLink } from './DemoLink'
import { NavbarButton } from './NavbarButton'

interface BrowserWrapperProps {
  url: string
  children?: React.ReactElement
}
export function BrowserWrapper({ url, children }: BrowserWrapperProps) {
  const [pinQrCode, setPinQrCode] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [ref, hoveringQrCode] = useHover()

  const copyToClipboard = async () => {
    if (window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url)
      } catch (err) {
        console.error('Failed to copy text: ', err)
      }
    } else {
      console.error('Could not copy to clipboard: Not in a secure context')
    }
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const openNewTab = () => {
    window.open(url, '_blank').focus()
    window.focus()
  }

  const showQrCode = hoveringQrCode || pinQrCode

  return (
    <div className='line-border overflow-hidden h-full'>
      <div className='w-full flex items-center gap-4 bg-gray-200 h-14 border-b-[1.5px] border-black px-3'>
        <div className='flex gap-2'>
          <div className='bg-red-500 rounded-xl h-[10px] w-[10px] border border-black' />
          <div className='bg-yellow-400 rounded-xl h-[10px] w-[10px] border border-black' />
          <div className='bg-green-600 rounded-xl h-[10px] w-[10px] border border-black' />
        </div>
        <div className='w-full border border-black bg-white rounded-sm h-8 items-center flex items-center px-2 gap-1'>
          <p className='text-xs overflow-hidden whitespace-nowrap grow'>{url}</p>
          <div className='flex flex-row gap-1'>
            <NavbarButton icon={copySuccess ? 'pi-check' : 'pi-copy'} onClick={copyToClipboard} />
            <NavbarButton icon='pi-external-link' onClick={openNewTab} />
          </div>
        </div>
        <div className='flex flex-row gap-1 items-center'>
          <div ref={ref}>
            <NavbarButton icon='pi-user-plus' onClick={() => setPinQrCode((p) => !p)} />
          </div>
        </div>
      </div>
      <div className='h-100 relative'>
        {showQrCode && (
          <div className='absolute top-1 right-1 z-10'>
            <DemoLink urlLink={url} />
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
