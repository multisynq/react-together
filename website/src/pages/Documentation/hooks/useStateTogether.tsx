import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function UseStateTogetherDocumentationPage() {
  const content = (
    <GenericDocPage
      title='useStateTogether'
      description='The useStateTogether hook makes every user see the same state simultaneously. If the user is not connected to any session, then this hook behaves as a normal useState.'
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { useStateTogether } from 'react-together'`} />
          <CodeBlock
            language='javascript'
            code1={`const [count, setCount] = useStateTogether('unique-id', 0)

const increment = () => setCount((prev) => prev + 1)
const reset = () => setCount(0)`}
          />
        </>
      }
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useStateTogether')} keyToLookupWith='' />
}
