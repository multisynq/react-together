import CountButtonTogether from '@components/demo/CountButtonTogether'
import { CodeBlock } from '@components/ui/CodeBlock'
import { TableContainer } from '@components/ui/TableContainer'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

const description = (
  <>
    <p>
      The useStateTogether hook makes every user <strong>see the same state simultaneously</strong>. If the user is not connected to any
      session, then this hook behaves as a normal useState.
    </p>
    <DocumentationDemo>
      <CountButtonTogether />
    </DocumentationDemo>
  </>
)

const usage = (
  <>
    <CodeBlock language='jsx' code1={`import { useStateTogether } from 'react-together'`} />
    <CodeBlock
      language='jsx'
      code1={`const [count, setCount] = useStateTogether('unique-id', 0)
        
const increment = () => setCount((prev) => prev + 1)
const reset = () => setCount(0)`}
    />
  </>
)

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
          description: 'The current state, synchronized with everyone within the same React Together session.',
        },
        {
          name: '1',
          type: '(T | (T) => T) => void',
          description:
            'The set function that lets you update the state to a different value, and change it in every user within the same session',
        },
      ]}
    />
  </>
)

const content = (
  <GenericDocPage
    title='useStateTogether'
    parameter='<T>(rtid, initial_value, options)'
    description={description}
    usage={usage}
    api={api}
  />
)
export default function UseStateTogetherDocumentationPage() {
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useStateTogether')} />
}
