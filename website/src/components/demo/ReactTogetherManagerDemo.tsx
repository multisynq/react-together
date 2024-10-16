import { SetStateAction, useState } from 'react'
import { ReactTogetherManager } from 'react-together'
import CountButtonTogether from './CountButtonTogether'

function UrlContainer() {
  const [url, setUrl] = useState('https://current-address.com/294spwd') // Replace with your dynamic URL

  function handleUrlChange(e: { target: { value: SetStateAction<string> } }) {
    setUrl(e.target.value)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSummit()
    }
  }
  function handleSummit() {
    console.log('Summit')
  }

  return (
    <div className='flex align-items-center gap-2 border rounded-xl border-gray-800 items-center py-2 px-4 w-full justify-between shadow-lineStyleDark hover:shadow-lineStyleMedium'>
      <input
        type='text'
        value={url}
        onChange={handleUrlChange}
        className='w-full bg-transparent border-none outline-none'
        onClick={(e) => (e.target as HTMLInputElement).select()}
        onKeyDown={handleKeyDown}
        onBlur={handleSummit}
      />
      <button onClick={handleSummit}>
        <i className='pi pi-arrow-right'></i>
      </button>
    </div>
  )
}

export default function ReactTogetherManagerDemo() {
  return (
    <div className='h-full w-full relative flex justify-center'>
      <div className='flex flex-col gap-8 p-4 items-center'>
        <UrlContainer />
        <CountButtonTogether />
        <div />
      </div>
      <div className='absolute bottom-2 left-2'>
        <ReactTogetherManager />
      </div>
    </div>
  )
}
