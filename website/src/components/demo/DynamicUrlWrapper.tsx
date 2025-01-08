import { useCallback, useEffect, useState } from 'react'
import { useJoinUrl } from 'react-together'

interface UrlContainerProps {
  localUrl: string
  setLocalUrl: (newUrl: string) => void
  onSubmit: () => void
}
function UrlContainer({ localUrl, setLocalUrl, onSubmit }: UrlContainerProps) {
  const [previousUrl, setPreviousUrl] = useState(localUrl)

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalUrl(e.target.value)
  }

  const handleSubmit = () => {
    setPreviousUrl(localUrl)
    onSubmit()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSubmit()
    }
    if (e.key === 'Escape') {
      setLocalUrl(previousUrl)
    }
  }

  return (
    <div className='flex align-items-center gap-2 border rounded-xl border-gray-800 items-center py-1 px-4 w-full justify-between shadow-lineStyleDark hover:shadow-lineStyleMedium text-xs'>
      <input
        type='text'
        value={localUrl ?? ''}
        onChange={handleUrlChange}
        className='w-full bg-transparent border-none outline-none'
        onClick={(e) => (e.target as HTMLInputElement).select()}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSubmit}>
        <i className='pi pi-arrow-right'></i>
      </button>
    </div>
  )
}

interface DynamicUrlWrapperProps {
  children: React.ReactNode
}
export function DynamicUrlWrapper({ children }: DynamicUrlWrapperProps) {
  const joinUrl = useJoinUrl()

  // Keep local URL up to date with joinUrl
  const [localUrl, setLocalUrl] = useState(joinUrl ?? window.location.href)

  useEffect(() => {
    setLocalUrl(joinUrl ?? window.location.href)
  }, [joinUrl, setLocalUrl])

  const onSubmit = useCallback(() => {
    try {
      // Assert that users only change the searchParams / hash
      const newUrl = new URL(localUrl)
      const result = new URL(window.location.href)
      result.search = newUrl.searchParams.toString()
      result.hash = newUrl.hash
      setLocalUrl(result.toString())

      window.location.assign(newUrl)
    } catch (e) {
      console.error(`${localUrl} is not a valid URL`)
      setLocalUrl(joinUrl ?? window.location.href)
    }
  }, [localUrl, setLocalUrl, joinUrl])

  return (
    <div className='h-full w-full relative flex flex-col justify-center py-2'>
      <div className='px-2'>
        <UrlContainer {...{ localUrl, setLocalUrl, onSubmit }} />
      </div>
      {children}
    </div>
  )
}
