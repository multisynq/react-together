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
        className="session-button button-primary interactive-border"
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
            <p className="sessionMenu-description">
              Send this url to your friends to
              <br /> join the current session!
            </p>
            <div className="sessionMenuContent-container">
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
              <div className="input-container interactive-border">
                <button
                  onClick={copyToClipboard}
                  className="input-button"
                  disabled={!joinUrl}
                >
                  <label className="url-container">
                    {copied ? 'Copied!' : joinUrl}
                  </label>
                  <i className={copied ? 'pi pi-check' : 'pi pi-copy'} />
                </button>
                <button onClick={toggleQRCode} disabled={!joinUrl}>
                  <i className="pi pi-qrcode" />
                </button>
              </div>
            </div>
            <button
              className="session-button button-caution interactive-border"
              onClick={handleLeaveSession}
              style={{ width: '100%' }}
            >
              <label>Leave Session</label>
            </button>
          </div>
        ) : (
          <button
            className="session-button button-primary interactive-border"
            onClick={handleCreateSession}
            style={{ width: '100%' }}
          >
            <label>Create Private Session</label>
          </button>
        )}
      </Dialog>
    </>
  )
}
