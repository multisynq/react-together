import { useLeaveSession } from '@croquet/react'
import 'primeicons/primeicons.css'
import { Dialog } from 'primereact/dialog'
import QRCode from 'qrcode.react'
import { useCallback, useMemo, useState } from 'react'
import { useCreateRandomSession, useIsTogether, useJoinUrl } from '..'
import { Icons } from './icons'

export function SessionManager() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const leaveSession = useLeaveSession()
  const createRandomSession = useCreateRandomSession()
  const isTogether = useIsTogether()
  const joinUrl = useJoinUrl()
  const [showQRCode, setShowQRCode] = useState(false)

  const handleCreateSession = useCallback(() => {
    setIsOpen(false)

    // Schedule createRandomSession for "later" so that
    // React completes its lifecycle and closes the dialog
    // before joining the new session
    setTimeout(createRandomSession, 50)
  }, [createRandomSession, setIsOpen])

  const handleLeaveSession = useCallback(() => {
    leaveSession()
    setIsOpen(false)
  }, [leaveSession])

  const copyToClipboard = useCallback(() => {
    if (!joinUrl) return
    navigator.clipboard
      .writeText(joinUrl)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => console.error('Failed to copy text: ', err))
  }, [joinUrl])

  const toggleQRCode = useCallback(() => {
    setShowQRCode((prev) => !prev)
  }, [])

  const displayUrl = useMemo(() => {
    if (!joinUrl) return 'No URL available'
    if (joinUrl.length <= 8) return joinUrl
    return '...' + joinUrl.slice(-8)
  }, [joinUrl])

  return (
    <>
      <button
        className="border w-[2.5rem] h-[2.5rem] border-gray-800 rounded-lg shadow-lineStyleDark bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lineStyleMedium flex items-center justify-center p-2"
        onClick={() => setIsOpen(true)}
      >
        <Icons.logo className="w-[1.5rem] h-[1.5rem]" />
      </button>
      <Dialog
        position="bottom-right"
        visible={isOpen}
        draggable={false}
        resizable={false}
        onHide={() => setIsOpen(false)}
        pt={{
          root: {
            className:
              'border-gray-800 shadow-lineStyleDark rounded-xl overflow-hidden'
          },
          header: { className: 'p-2' },
          content: { className: 'pb-4' }
        }}
      >
        {isTogether ? (
          <div className="flex flex-col items-center gap-4 text-black">
            <div className="flex flex-col">
              <p className="font-bold leading-tight tracking-tight text-center">
                Send this url to your friends to
                <br /> join the current session!
              </p>
            </div>
            <div className="flex flex-col items-center w-full gap-4">
              {showQRCode && joinUrl && (
                <div className="p-5 rounded-xl bg-blue-50">
                  <QRCode
                    value={joinUrl}
                    size={130}
                    bgColor="#EFF6FF"
                    fgColor="#373b43"
                    level="H"
                    includeMargin={false}
                  />
                </div>
              )}
              <div className="flex items-center gap-3 border rounded-xl border-gray-800 py-2 px-4 w-full justify-between shadow-lineStyleDark hover:shadow-lineStyleMedium">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-3 justify-between w-full"
                  disabled={!joinUrl}
                >
                  <span className="w-[8rem] truncate">
                    {copied ? 'Copied!' : displayUrl}
                  </span>
                  <i className={copied ? 'pi pi-check' : 'pi pi-copy'}></i>
                </button>
                <button onClick={toggleQRCode} disabled={!joinUrl}>
                  <i className="pi pi-qrcode" />
                </button>
              </div>
            </div>
            <button
              className="border border-gray-800 px-4 rounded-xl py-2 shadow-lineStyleDark hover:bg-red-600 hover:shadow-lineStyleMedium bg-red-500 w-full"
              onClick={handleLeaveSession}
            >
              <span className="text-lg font-bold text-white">
                Leave Session
              </span>
            </button>
          </div>
        ) : (
          <button
            className="border border-gray-800 px-4 rounded-xl py-2 shadow-lineStyleDark hover:bg-blue-600 hover:shadow-lineStyleMedium bg-blue-500 w-full"
            onClick={handleCreateSession}
          >
            <span className="text-lg font-bold text-white">
              Create Private Session
            </span>
          </button>
        )}
      </Dialog>
    </>
  )
}
