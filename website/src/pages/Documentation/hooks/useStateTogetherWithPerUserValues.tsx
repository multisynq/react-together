import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function UseStateTogetherWithPerUserValuesDocumentationPage() {
  const content = (
    <GenericDocPage
      title='useStateTogetherWithPerUserValues'
      description={
        'The useStateTogetherWithValuesPerUser hook allows users to read the state of all of their peers. ' +
        'If the user is not connected to any session, then the hook will behave as a normal useState, and the peer state object will be empty.'
      }
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { useStateTogetherWithPerUserValues } from 'react-together'`} />
          <CodeBlock
            language='javascript'
            code1={`const [count, setCount, countPerUser] = useStateTogetherWithPerUserValues('unique-id', 0)

const increment = () => setCount((prev) => prev + 1)
const reset = () => setCount(0)`}
          />
        </>
      }
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useStateTogetherWithPerUserValues')} keyToLookupWith='' />
}
