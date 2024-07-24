import { CodeBlock } from '@components/ui/CodeBlock'
import { TableContainer } from '@components/ui/TableContainer'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
export default function UseStateTogetherWithPerUserValuesDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'default', label: 'Default Value' },
          { key: 'description', label: 'Description' },
        ]}
        data={[
          {
            name: 'rtid',
            type: 'string',
            description: 'The key used to identify this state',
          },
          {
            name: 'initialValue',
            type: 'T',
            description: 'The initial value to use the first time the state is created.',
          },
        ]}
      />
      <h5>Return</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'description', label: 'Description' },
        ]}
        data={[
          {
            name: '0',
            type: 'T',
            description: 'The current local state',
          },
          {
            name: '1',
            type: '(T | (T) => T) => void',
            description: 'The set function that lets you update the local state to a different value',
          },
          {
            name: '2',
            type: '[key: string]: T',
            description:
              'An object containing a mapping between each view and the state it currently has. The views that are not rendering this hook will not exist in this mapping, even though they are connected to the React Together session.',
          },
        ]}
      />
    </>
  )
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
      api={api}
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useStateTogetherWithPerUserValues')} keyToLookupWith='' />
}
