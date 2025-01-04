import { Icons } from '@components/icons'
import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'

const codes = {
  demo: {
    basic: `
import { CroquetReact, SessionManager, useIsTogether } from 'react-together'
import CountButtonTogether from './CountButtonTogether'

const { useSessionParams } = CroquetReact

function ConnectionStatus({ connectionStatus, name }: { connectionStatus: boolean; name: string | null }) {
  return (
    <div className='flex gap-2 items-center justify-center border border-gray-400 rounded-xl py-1 px-2 bg-gray-50 h-[2rem]'>
      <div className={\`w-3 h-3 rounded-3xl \${connectionStatus ? 'bg-green-500' : 'bg-red-500'}\`} />
      <label className='text-xs font-semibold'>{connectionStatus ? \`Connected: \${name}\` : 'Disconnected'}</label>
    </div>
  )
}

export function SessionManagerDemo() {
  const isTogether = useIsTogether()
  const { name } = useSessionParams()

  return (
    <div className='h-full w-full relative flex justify-center'>
      <div className='flex w-full flex-col gap-8 p-4 items-center justify-center'>
        <div>
          <CountButtonTogether />
          <div className='h-[1rem]' />
        </div>
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
    `,
  },

  usage_1: {
    basic: `import { SessionManager } from 'react-together'`,
  },

  usage_2: {
    basic: `return <SessionManager />`,
  },

  source: {
    basic: `
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
`,
  },
}

export default function SessionManagerDocumentationPage() {
  const content = (
    <GenericDocPage
      {...{
        title: 'SessionManager',
        description: (
          <>
            <p>
              This component provides a simple UI to manage the current React Together session, i.e. connecting to a new session, sharing it
              with other people, and leaving the current session. If you want to implement your own session manager component, feel free to
              checkout the <LinkSpan to='/useCreateRandomSession' text='useCreateRandomSession' />,{' '}
              <LinkSpan to='/useLeaveSession' text='useLeaveSession' />, and <LinkSpan to='/useJoinUrl' text='useJoinUrl' /> hooks!
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='SessionManager' session2={null} />,
                code: <CodeBlock {...{ code: codes.demo, github: getDocLinks({ rt_name: 'SessionManager' }).github_demo }} />,
              }}
            />
            <p>
              In the example above, you can see how the <CodeSpan text='SessionManager' /> component works. Each window represents a
              separate browser. The browser on the left connects to the <CodeSpan text='ReactTogetherDemo' /> session, while the one on the
              right doesn’t connect to any session. As a result, the count values in each session are not synchronized.
            </p>
            <p>
              You can access the Session Manager by clicking the blue button (<Icons.logo className='h-4 w-4 inline mx-1' />) in the
              bottom-left corner of each browser. This component provides a UI to share or leave your current session or to create a private
              one. To join a session, you can paste the Join URL on the top bar (representing the browser URL bar) and press{' '}
              <CodeSpan text='Enter' />, or click on the arrow icon.
            </p>
          </>
        ),
        usage: (
          <>
            <CodeBlock {...{ code: codes.usage_1 }} />
            <CodeBlock {...{ code: codes.usage_2 }} />
          </>
        ),
        source: (
          <>
            <p>
              This component is one of many possible ways to use the session management hooks. Below you have the source code for this
              component as inspiration for you to create your own session manager component, tailor made to your needs.
            </p>
            <CodeBlock {...{ code: codes.source, github: getDocLinks({ rt_path: 'components/SessionManager.tsx' }).github_source }} />
          </>
        ),
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('SessionManager', { exclude: ['api'] }) }} />
}
