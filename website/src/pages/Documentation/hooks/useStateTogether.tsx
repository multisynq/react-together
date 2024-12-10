import { CodeBlock } from '@components/ui'
import CodeSpan from '@components/ui/CodeSpan'
import Link from '@components/ui/Link'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

const codes = {
  usage_1: { javascript: `import { useStateTogether } from 'react-together'` },
  usage_2: {
    javascript: `
const [count, setCount] = useStateTogether('unique-key', 0)
        
const increment = () => setCount((prev) => prev + 1)
const reset = () => setCount(0)
  `,
  },
}

const description = (
  <>
    <p>
      The <CodeSpan text='useStateTogether' /> hook allows all users to see the same state simultaneously. If a user is not connected to any
      session, this hook behaves like a normal{' '}
      <Link to='https://react.dev/reference/react/useState' target='_blank'>
        useState
      </Link>
      .
    </p>
    <DocumentationDemo url='CountButtonTogether' />
  </>
)

const usage = (
  <>
    <CodeBlock code={codes.usage_1} />
    <CodeBlock code={codes.usage_2} />
  </>
)

const api = (
  <>
    <HookParamsApi
      items={[
        {
          name: 'rtKey',
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
    {...{
      title: 'useStateTogether',
      parameter: '<T>(rtKey, initial_value, options)',
      description,
      usage,
      api,
    }}
  />
)
export default function UseStateTogetherDocumentationPage() {
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useStateTogether') }} />
}
