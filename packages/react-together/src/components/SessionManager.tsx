import 'primeicons/primeicons.css'
import { Dialog } from 'primereact/dialog'
import QRCode from 'qrcode.react'
import { useCallback, useState } from 'react'
import { useCreateRandomSession, useIsTogether, useJoinUrl } from '..'
import { useLeaveSession } from '../hooks'
import './ComponentStyles.css'
import { Icons } from './icons'

export default function SessionManager() {
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

  return (
    <>
      <button
        className="sessionMenu-button interactive-border"
        onClick={() => setIsOpen(true)}
      >
        <Icons.logo style={{ width: '1.5rem' }} />
      </button>
      <Dialog
        position="bottom-right"
        visible={isOpen}
        draggable={false}
        resizable={false}
        onHide={() => setIsOpen(false)}
        pt={{
          root: {
            style: { overflow: 'hidden', borderRadius: '1rem' },
            className: 'interactive-border'
          },
          header: { style: { padding: '0.5rem' } },
          content: { style: { paddingBottom: '1rem' } }
        }}
      >
        {isTogether ? (
          <div className="sessionMenuContent-container">
            <div className="flex flex-col">
              <p className="sessionMenu-description">
                Send this url to your friends to
                <br /> join the current session!
              </p>
            </div>
            <div
              className="sessionMenuContent-container"
              style={{ width: '100%' }}
            >
              {showQRCode && joinUrl && (
                <div className="qrCode-container">
                  <QRCode
                    value={joinUrl}
                    size={130}
                    bgColor="#fff"
                    fgColor="#373b43"
                    level="H"
                    includeMargin={false}
                  />
                </div>
              )}
              <div
                className="interactive-border input-container"
                style={{ display: 'flex' }}
              >
                <button
                  onClick={copyToClipboard}
                  className="input-button"
                  disabled={!joinUrl}
                >
                  <span className="url-container">
                    {copied ? 'Copied!' : joinUrl}
                  </span>
                  <i className={copied ? 'pi pi-check' : 'pi pi-copy'} />
                </button>
                <button onClick={toggleQRCode} disabled={!joinUrl}>
                  <i className="pi pi-qrcode" />
                </button>
              </div>
            </div>
            <button
              className="primary-button interactive-border"
              onClick={handleLeaveSession}
              style={{ width: '100%' }}
            >
              <span className="button-label">Leave Session</span>
            </button>
          </div>
        ) : (
          <button
            className="primary-button interactive-border"
            onClick={handleCreateSession}
            style={{ width: '100%' }}
          >
            <span className="button-label">Create Private Session</span>
          </button>
        )}
      </Dialog>
    </>
  )
}
