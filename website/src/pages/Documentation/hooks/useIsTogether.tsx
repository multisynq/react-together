import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function UseIsTogetherDocumentationPage() {
  const content = (
    <GenericDocPage
      title='useIsTogether'
      description={'The useIsTogether hook returns true if the user is connected to a React Together session, and false otherwise.'}
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { useIsTogether } from 'react-together'`} />
          <CodeBlock language='javascript' code1={`const isTogether = useIsTogether()`} />
        </>
      }
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useIsTogether')} keyToLookupWith='' />
}
