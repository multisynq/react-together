import { Button } from 'primereact/button'
import { useState } from 'react'
import { Chat, useCreateRandomSession, useJoinUrl, useLeaveSession } from 'react-together'
import { DynamicUrlWrapper } from './DynamicUrlWrapper'

export function ChatDemo() {
  return (
    <DynamicUrlWrapper>
      <div className='relative'>
        <div className='fixed bottom-0 left-2'>
          <Chat rtKey='chat' />
        </div>
        <SessionManagement />
      </div>
    </DynamicUrlWrapper>
  )
}

function ellipsify(text: string, maxLength = 30) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

function SessionManagement() {
  const createSession = useCreateRandomSession()
  const joinUrl = useJoinUrl()
  const leaveSession = useLeaveSession()

  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = (e: React.MouseEvent<unknown>) => {
    e.stopPropagation()
    e.preventDefault()
    navigator.clipboard
      .writeText(joinUrl)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch((err) => console.error('Failed to copy text: ', err))
  }

  return (
    <div className='text-center px-8'>
      <h3>Your Collaborative website</h3>
      <div className='mt-5 text-sm'>
        {joinUrl ? (
          <>
            <p>Invite your friends to this session using the link below</p>

            <p className='cursor-pointer underline mt-2 text-blue-600 hover:text-blue-600' onClick={(e) => copyToClipboard(e)}>
              {ellipsify(joinUrl)}
              <span className='ml-2'>
                <Button
                  icon={copySuccess ? 'pi pi-check' : 'pi pi-copy'}
                  text
                  rounded
                  severity='secondary'
                  aria-label='Bookmark'
                  className='w-7 h-6'
                />
              </span>
            </p>

            <p className='mt-2'>
              <span className='cursor-pointer underline text-red-500 hover:text-red-600' onClick={leaveSession}>
                Leave session
              </span>
            </p>
          </>
        ) : (
          <p>
            You are not inside a collaborative session.
            <br />
            <span onClick={createSession} className='cursor-pointer underline text-blue-600 hover:text-blue-800'>
              Create a new session
            </span>{' '}
            or paste an invite link in the bar above
          </p>
        )}
      </div>
    </div>
  )
}
