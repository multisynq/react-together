import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

export default function UseLeaveSessionDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'leaveSession',
            type: '() => void',
            description: 'Function that, when called, leaves the user from the current React Together session',
          },
        ]}
      />
    </>
  )

  const content = (
    <GenericDocPage
      title='useLeaveSession'
      description={
        <>
          <p>
            The <CodeSpan text='useLeaveSession' /> hook returns a function that when called, disconnects the user from the current React
            Together session. If the user is not connected to any session, calling that function has no effect.
            <br />
          </p>
          <p>
            When leaving a session, the state that comes from <LinkSpan to='useStateTogether' text='useStateTogether' /> and{' '}
            <LinkSpan to='useStateTogetherWithPerUserValues' text='useStateTogetherWithPerUserValues' /> will be kept locally.
          </p>
          <p>If there are session parameters in the window URL, they will be removed when leaving the session.</p>
        </>
      }
      usage={
        <>
          <CodeBlock language='jsx' code1={`import { useLeaveSession } from 'react-together'`} />
          <CodeBlock
            language='jsx'
            code1={`\
export default function YourComponent() {
  const leaveSession = useLeaveSession()

  return (
    <button onClick={() => leaveSession()}>
      Disconnect from current session
    </button>
  )
}
`}
          />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useLeaveSession')} />
}
