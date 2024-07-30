import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

const api = (
  <>
    <HookParamsApi
      items={[
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
    <HookReturnApi
      items={[
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
      <>
        <p>
          The useStateTogetherWithValuesPerUser hook allows users to <strong>read the state of all of their peers</strong>. If the user is
          not connected to any session, then the hook will behave as a normal useState, and the peer state object will be empty.
        </p>
        <p>
          The example below illustrates what can be achieved with this hook: Each view displays a series of numbers, representing the{' '}
          <CodeSpan text='count' /> associated with each of the connected views. The local count is highlighted by the darker background.
          Although each view can only change its local count (by clicking on it), every view can see the count values associated with every
          connected view!
        </p>
        <DocumentationDemo url='useStateTogetherWithPerUserValues' />
      </>
    }
    usage={
      <>
        <CodeBlock language='jsx' code1={`import { useStateTogetherWithPerUserValues } from 'react-together'`} />
        <CodeBlock
          language='jsx'
          code1={`const [count, setCount, countPerUser] = useStateTogetherWithPerUserValues('unique-id', 0)

const increment = () => setCount((prev) => prev + 1)
const reset = () => setCount(0)`}
        />
      </>
    }
    api={api}
  />
)
export default function UseStateTogetherWithPerUserValuesDocumentationPage() {
  return <DocumentationPage content={content} navItems={GenericDocNav('useStateTogetherWithPerUserValues')} />
}
