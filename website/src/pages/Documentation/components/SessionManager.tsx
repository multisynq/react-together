import { CodeBlock } from '@components/ui/CodeBlock'
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
          <DocumentationDemo url='SessionManager' session2={null} />
        </>
      }
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { SessionManager } from 'react-together'`} />
          <CodeBlock language='javascript' code1={`return <SessionManager />`} />
        </>
      }
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('ReactTogether')} />
}
