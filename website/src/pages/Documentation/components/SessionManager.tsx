import { Icons } from '@components/icons'
import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'

const demoCode = `
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
`

export default function SessionManagerDocumentationPage() {
  const content = (
    <GenericDocPage
      title='SessionManager'
      description={
        <>
          <p>
            This component provides a simple UI to manage the current React Together session, i.e. connecting to a new session, sharing it
            with other people, and leaving the current session. If you want to implement your own session manager component, feel free to
            checkout the <LinkSpan to='/useCreateRandomSession' text='useCreateRandomSession' />,{' '}
            <LinkSpan to='/useLeaveSession' text='useLeaveSession' />, and <LinkSpan to='/useJoinUrl' text='useJoinUrl' /> hooks!
          </p>
          <p>
            In the example below, you can see how the <CodeSpan text='SessionManager' /> component works. Each window represents a separate
            browser. The browser on the left connects to the <CodeSpan text='ReactTogetherDemo' /> session, while the one on the right
            doesn’t connect to any session. As a result, the count values in each session are not synchronized.
          </p>
          <p>
            You can access the Session Manager by clicking the blue button (<Icons.logo className='h-4 w-4 inline mx-1' />) in the
            bottom-left corner of each browser. This component provides a UI to share or leave your current session or to create a private
            one. To join a session, you can paste the Join URL on the top bar (representing the browser URL bar) and press{' '}
            <CodeSpan text='Enter' />, or click on the arrow icon.
          </p>
          <PreviewSourceCodeTabs
            preview={<DocumentationDemo url='SessionManager' session2={null} />}
            code={<CodeBlock language='tsx' code1={demoCode} />}
          />
        </>
      }
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { SessionManager } from 'react-together'`} />
          <CodeBlock language='javascript' code1={`<SessionManager />`} />
        </>
      }
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('SessionManager', { exclude: ['api'] })} />
}
