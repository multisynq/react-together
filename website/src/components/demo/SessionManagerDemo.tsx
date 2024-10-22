import { useCallback, useEffect, useState } from 'react'
import { CroquetReact, SessionManager, useIsTogether, useJoinUrl } from 'react-together'
import CountButtonTogether from './CountButtonTogether'

const { useSessionParams } = CroquetReact

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
    <div className='flex align-items-center gap-2 border rounded-xl border-gray-800 items-center py-2 px-4 w-full justify-between shadow-lineStyleDark hover:shadow-lineStyleMedium'>
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

export default function SessionManagerDemo() {
  const joinUrl = useJoinUrl()

  // Keep local URL up to date with joinUrl
  const [localUrl, setLocalUrl] = useState(joinUrl ?? window.location.href)

  const isTogether = useIsTogether()
  const { name } = useSessionParams()

  useEffect(() => {
    setLocalUrl(joinUrl ?? window.location.href)
  }, [joinUrl, setLocalUrl])

  const onSubmit = useCallback(() => {
    try {
      // Assert that users only change the searchParams
      const newSearchParams = new URL(localUrl).searchParams
      const newUrl = new URL(window.location.href)
      newSearchParams.forEach((value, key) => {
        newUrl.searchParams.set(key, value)
      })
      setLocalUrl(newUrl.toString())

      window.location.assign(newUrl)
    } catch (e) {
      console.error(`${localUrl} is not a valid URL`)
      setLocalUrl(joinUrl ?? window.location.href)
    }
  }, [localUrl, setLocalUrl, joinUrl])

  return (
    <div className='h-full w-full relative flex justify-center'>
      <div className='flex w-full flex-col gap-8 p-4 items-center'>
        <UrlContainer {...{ localUrl, setLocalUrl, onSubmit }} />
        <CountButtonTogether />
        <p className='text-xs px-12'>
          {isTogether
            ? `You are in session "${name}". You can invite your friends by sending them the URL in the bar above!`
            : `You are currently disconnected. Paste a Join URL in the bar above, or click on the button below to create a private session!`}
        </p>
      </div>
      <div className='fixed bottom-2 left-2'>
        <SessionManager />
      </div>
    </div>
  )
}
