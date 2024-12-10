import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

const description = (
  <>
    <p>
      The <CodeSpan text='useFunctionTogether' /> hook allows all users to execute the same function simultaneously, using the same
      arguments. Whenever any user calls the function returned by the hook, all users that are rendering this hook with the same{' '}
      <CodeSpan text='rtKey' /> will execute their local version of the function.
    </p>
    <p>
      Keep in mind that only the function arguments are guaranteed to be the same across every user. If the given function captures local
      variables, those may differ from user to user! If you want a perfectly synchronized state, with stronger guarantees, we invite you to
      take a look at the underlying library:{' '}
      <LinkSpan text='@croquet/react' to='https://www.npmjs.com/package/@croquet/react' target='_blank' /> 😉.
    </p>
    <DocumentationDemo url='useFunctionTogether' />
  </>
)

export default function UseFunctionTogetherDocumentationPage() {
  const api = (
    <>
      <HookParamsApi
        items={[
          {
            name: 'rtKey',
            type: 'string',
            description: 'The key used to identify this function.',
          },
          {
            name: 'fn',
            type: 'T extends (...args any[]) => any',
            description: 'The function to be synchronized',
          },
        ]}
      />
      <HookReturnApi
        items={[
          {
            name: 'synqFn',
            type: 'T',
            description: (
              <>
                The synchronized function. Whenever someone calls this function, everyone else executes it at the same time, with the same
                arguments.
              </>
            ),
          },
        ]}
      />
    </>
  )

  const content = (
    <GenericDocPage
      title='useFunctionTogether'
      description={description}
      usage={
        <>
          <CodeBlock language='jsx' codeShort={`import { useLeaveSession } from 'react-together'`} />
          <CodeBlock
            language='jsx'
            codeShort={`\
export default function YourComponent() {
  const ding = useFunctionTogether('ding', () => {
    alert('Dong!')
  })

  return (
    <button onClick={() => ding()}>
      Ring the bell!
    </button>
  )
}
`}
          />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useFunctionTogether')} />
}
