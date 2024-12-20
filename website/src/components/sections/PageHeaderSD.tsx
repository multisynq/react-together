import { Button } from 'primereact/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PageHeaderSD() {
  const navigate = useNavigate()
  const INSTALLCODE = `npm i react-together`

  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(INSTALLCODE)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch((err) => console.error('Failed to copy text: ', err))
  }

  return (
    <div className='flex flex-col items-center md:px-2 max-w-[38rem]'>
      <h1 className='flex flex-wrap items-center text-center justify-center'>
        Bring users together
        <strong className='textEffect ml-1'>seamlessly</strong>
      </h1>
      <div className='mt-4 px-2'>
        <p className='text-center text-gray-700 sm:text-base'>
          Foster real-time collaboration with our React library, enabling users to interact and work together seamlessly.
        </p>
      </div>
      <span className='h-8' />
      <div className='flex gap-2 flex-col sm:flex-row md:flex-col xl:flex-row mb-[2rem]'>
        <div
          className='px-4 py-2 bg-blue-300 text-primary text-center flex items-center justify-center cursor-pointer line-border hover:shadow-lineStyleMedium hover:bg-blue-100'
          onClick={() => navigate('/getting-started')}
        >
          <h6 className='font-semibold'>Getting Started</h6>
        </div>
        <div className='flex items-center bg-white px-4 line-border gap-1 h-11'>
          <span>
            <p className='font-mono'>{INSTALLCODE}</p>
          </span>
          <Button
            icon={copySuccess ? 'pi pi-check' : 'pi pi-copy'}
            text
            severity='secondary'
            aria-label='Bookmark'
            className='w-7 h-6'
            onClick={copyToClipboard}
          />
        </div>
      </div>
    </div>
  )
}
