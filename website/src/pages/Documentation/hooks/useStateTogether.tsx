import { Markdown } from '@components/Markdown'
import { CodeBlock, CodeSpan, Link, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import InterfaceApi from '../InterfaceApi'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

const codes = {
  demo: {
    basic: ` 
import { useStateTogether } from 'react-together'

export default function CountButtonTogether() {
  const [count, set_count] = useStateTogether('count', 0)
  return (
    <div className='flex flex-row align-items-center gap-2'>
      <button
        className='bg-gray-400 py-2 px-4 rounded-md text-white'
        onClick={() => set_count(0)}
      >
        <i className='pi pi-refresh'></i>
      </button>
      <button
        className='bg-gray-400 py-2 px-4 rounded-md text-white'
        onClick={() => set_count((prev) => prev + 1)}
      >
        Count: {count}
      </button>
    </div>
  )
}
`,
  },

  usage: {
    basic: `
import { useStateTogether } from 'react-together'

function YourComponent() {
  const [count, setCount] = useStateTogether('unique-key', 0)
        
  const increment = () => setCount((prev) => prev + 1)
  const reset = () => setCount(0)

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
      <p>Count: {count}</p>
    </div>
  )
}
`,
  },
}

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
        {
          name: 'options',
          type: <LinkSpan text='UseStateTogetherOptions' to='#options' />,
          description: 'An option object that allows configuring the behavior of the hook. See more details below.',
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
    <InterfaceApi
      title='UseStateTogetherOptions'
      id='options'
      items={[
        {
          name: 'resetOnDisconnect',
          type: 'boolean',
          default: 'false',
          description: (
            <Markdown>
              If `true`, the user's state will be reset to `initialValue` after the user disconnects from the session. Note that this only
              affects the user's local state, *after* the user disconnects.
            </Markdown>
          ),
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
      description: (
        <>
          <p>
            The <CodeSpan text='useStateTogether' /> hook allows all users to see the same state simultaneously. If a user is not connected
            to any session, this hook behaves like a normal{' '}
            <Link to='https://react.dev/reference/react/useState' target='_blank'>
              useState
            </Link>
            .
          </p>
          <PreviewSourceCodeTabs
            {...{
              preview: <DocumentationDemo url='CountButtonTogether' />,
              code: (
                <CodeBlock
                  {...{
                    code: codes.demo,
                    github: getDocLinks({ rt_path: 'CountButtonTogether.tsx' }).github_demo,
                    stackBlitz: 'https://stackblitz.com/edit/react-together-hello-world?file=src%2FApp.tsx',
                  }}
                />
              ),
            }}
          />
        </>
      ),
      usage: (
        <>
          <CodeBlock code={codes.usage} />
        </>
      ),
      api,
    }}
  />
)
export default function UseStateTogetherDocumentationPage() {
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useStateTogether', { exclude: ['source'] }) }} />
}
