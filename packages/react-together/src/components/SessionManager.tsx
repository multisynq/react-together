import { useLeaveSession } from '@croquet/react'
import 'primeicons/primeicons.css'
import { Dialog } from 'primereact/dialog'
import { useCallback, useState } from 'react'
import { useCreateRandomSession, useIsTogether, useJoinUrl } from '..'

export function SessionManager() {
  const [isOpen, setIsOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const leaveSession = useLeaveSession()
  const createRandomSession = useCreateRandomSession()
  const isTogether = useIsTogether()
  const joinUrl = useJoinUrl()

  const handleCreateSession = useCallback(() => {
    setIsOpen(false)
    createRandomSession()
  }, [createRandomSession, setIsOpen])

  const handleLeaveSession = useCallback(() => {
    leaveSession()
    setIsOpen(false)
  }, [leaveSession, setIsOpen])

  const handleCopy = useCallback(() => {
    if (!joinUrl) return
    navigator.clipboard
      .writeText(joinUrl)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch((err) => console.error('Failed to copy text: ', err))
  }, [joinUrl])

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      <Dialog
        header="Header"
        footer="Footer"
        position="bottom-right"
        visible={isOpen}
        draggable={false}
        resizable={false}
        onHide={() => setIsOpen(false)}
        // For some reason this is closing the dialog when the dialog is clidked
        // onMaskClick={(e) => {
        //   console.log('onMaskClick', e)
        //   if(e.target.className.includes('mask')){ setIsOpen(false) }
        // }}
        style={{ width: '50vw' }}
      >
        {isTogether ? (
          <>
            Join Url: {joinUrl}
            <br />
            <button onClick={handleCopy}>Copy to clipboard</button>
            {copySuccess && (
              <>
                <br />
                Copied!
              </>
            )}
            <br />
            <button onClick={handleLeaveSession}>LeaveSession</button>
          </>
        ) : (
          <button onClick={handleCreateSession}>Create private session</button>
        )}
      </Dialog>
    </>
  )
}
