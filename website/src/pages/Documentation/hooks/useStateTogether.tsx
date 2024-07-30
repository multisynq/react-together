import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

const description = (
  <>
    <p>
      The useStateTogether hook allows all users to see the same state simultaneously. If a user is not connected to any session, this hook
      behaves like a normal useState.
    </p>
    <DocumentationDemo url='CountButtonTogether' />
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
    <HookParamsApi
      items={[
        {
          name: 'rtid',
          type: 'string',
          description: 'The key used to identify this state.',
        },
        {
          name: 'initialValue',
          type: 'T',
          description: 'The initial value to use when the state is first created.',
        },
      ]}
    />
    <HookReturnApi
      items={[
        {
          name: '0',
          type: 'T',
          description: 'The current state, synchronized with everyone in the same React Together session.',
        },
        {
          name: '1',
          type: '(T | (T) => T) => void',
          description:
            'The setter function that allows updating the state to a different value, changing it for every user in the same session.',
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
  return <DocumentationPage content={content} navItems={GenericDocNav('useStateTogether')} />
}
