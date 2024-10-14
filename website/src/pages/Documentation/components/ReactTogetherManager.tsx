import { CodeBlock } from '@components/ui/CodeBlock'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function ReactTogetherManagerDocumentationPage() {
  const content = (
    <GenericDocPage
      title='ReactTogetherManager'
      description={
        <p>
          This component provides a simple UI to manage the current React Together session, i.e. connecting to a new session, sharing it
          with other people, and leaving the current session. If you want to implement your own session manager component, feel free to
          checkout the <LinkSpan to='/useCreateRandomSession' text='useCreateRandomSession' />,{' '}
          <LinkSpan to='/useLeaveSession' text='useLeaveSession' />, and <LinkSpan to='/useJoinUrl' text='useJoinUrl' /> hooks!
        </p>
      }
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { ReactTogetherManager } from 'react-together'`} />
          <CodeBlock language='javascript' code1={`return <ReactTogetherManager />`} />
        </>
      }
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('ReactTogether')} />
}
