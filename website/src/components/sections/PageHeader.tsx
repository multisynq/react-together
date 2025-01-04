import { Button } from 'primereact/button'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function PageHeader() {
  const npmLink = 'https://www.npmjs.com/package/react-together'
  const INSTALLCODE = `npm i react-together`

  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    navigator.clipboard
      .writeText(INSTALLCODE)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch((err) => console.error('Failed to copy text: ', err))
  }

  return (
    <div className='flex flex-col items-center max-w-[105rem]'>
      <div className='h-8'></div>
      <h1 className='flex flex-col sm:flex-row items-center gap-2 text-center sm:text-start'>
        {`Bring users together`} <span className='textEffect'>seamlessly</span>
      </h1>
      <div className='h-4'></div>
      <div className='max-w-[32rem] mx-[2rem]'>
        <p className='text-center text-gray-700 sm:text-base'>
          Foster real-time collaboration with our React library, enabling users to interact and work together seamlessly.
        </p>
      </div>
      <span className='h-8' />
      <div className='flex gap-2 flex-col sm:flex-row'>
        <Link to='/getting-started'>
          <div className='px-4 py-2 bg-blue-300 text-primary text-center flex items-center justify-center cursor-pointer line-border hover:shadow-lineStyleMedium hover:bg-blue-100'>
            <h6 className='font-semibold'>Getting Started</h6>
          </div>
        </Link>
        <a href={npmLink} target='_blank'>
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
        </a>
      </div>
      <span className='h-2'></span>
    </div>
  )
}
