import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

export default function UseIsTogetherDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'isTogether',
            type: 'boolean',
            description: 'Indicates whether the user is connected to a React Together session.',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useIsTogether'
      description={'The useIsTogether hook returns true if the user is connected to a React Together session, and false otherwise.'}
      usage={
        <>
          <CodeBlock language='jsx' code1={`import { useIsTogether } from 'react-together'`} />
          <CodeBlock language='jsx' code1={`const isTogether = useIsTogether()`} />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useIsTogether')} />
}
