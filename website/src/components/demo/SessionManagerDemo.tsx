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

function ConnectionStatus({ connectionStatus, name }: { connectionStatus: boolean; name: string | null }) {
  return (
    <div className='flex gap-2 items-center justify-center border border-gray-400 rounded-xl py-1 px-2 bg-gray-50 h-[2rem]'>
      <div className={`w-3 h-3 rounded-3xl ${connectionStatus ? 'bg-green-500' : 'bg-red-500'}`} />
      <label className='text-xs font-semibold'>{connectionStatus ? `Connected: ${name}` : 'Disconnected'}</label>
    </div>
  )
}

export function SessionManagerDemo() {
  const joinUrl = useJoinUrl()
  const isTogether = useIsTogether()
  const { name } = useSessionParams()

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
    <div className='h-full w-full relative flex justify-center'>
      <div className='flex w-full flex-col gap-8 p-4 items-center justify-center'>
        <div>
          <CountButtonTogether />
          <div className='h-[1rem]' />
        </div>
      </div>
      <div className='fixed top-2 flex w-full flex-col px-2 gap-2'>
        <UrlContainer {...{ localUrl, setLocalUrl, onSubmit }} />
      </div>

      <div className='fixed bottom-2 flex w-full flex-col px-2 gap-2'>
        <div className='flex justify-between w-full items-center'>
          <SessionManager />
          <ConnectionStatus connectionStatus={isTogether} name={name} />
          <div className='w-[2rem]' />
        </div>
      </div>
    </div>
  )
}
