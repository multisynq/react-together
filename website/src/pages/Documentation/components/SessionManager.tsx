import { Icons } from '@components/icons'
import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

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
          <DocumentationDemo url='SessionManager' session2={null} />
        </>
      }
      usage={
        <>
          <CodeBlock language='javascript' codeShort={`import { SessionManager } from 'react-together'`} />
          <CodeBlock language='javascript' codeShort={`return <SessionManager />`} />
        </>
      }
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('SessionManager', { exclude: ['api'] })} />
}
