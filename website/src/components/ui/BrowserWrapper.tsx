import { Button } from 'primereact/button'
import { useState } from 'react'

export function BrowserWrapper({ children }) {
  const WEBSITEURL = 'https://reacttogether.dev/#/demos/HeroDemo'

  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(WEBSITEURL)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch((err) => console.error('Failed to copy text: ', err))
  }

  return (
    <div className='line-border overflow-hidden h-full'>
      <div className='w-full flex items-center gap-4 bg-gray-200 h-14 border-b-[1.5px] border-black px-3'>
        <div className='flex gap-2'>
          <div className='bg-red-500 rounded-xl h-[10px] w-[10px] border border-black' />
          <div className='bg-yellow-400 rounded-xl h-[10px] w-[10px] border border-black' />
          <div className='bg-green-600 rounded-xl h-[10px] w-[10px] border border-black' />
        </div>
        <div className='w-full border border-black bg-white rounded-sm h-8 items-center flex px-2'>
          <p className='text-xs overflow-hidden whitespace-nowrap'>{WEBSITEURL}</p>
          <Button
            icon={copySuccess ? 'pi pi-check' : 'pi pi-copy'}
            size='small'
            text
            severity='secondary'
            onClick={copyToClipboard}
            className='w-0 h-0'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <div className='bg-gray-400 w-[22px] h-[3px] rounded-xl' />
          <div className='bg-gray-400 w-[22px] h-[3px] rounded-xl' />
          <div className='bg-gray-400 w-[22px] h-[3px] rounded-xl' />
        </div>
      </div>
      {children}
    </div>
  )
}
