import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '../DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

const codes = {
  usage_1: {
    basic: `import { useMyId } from 'react-together'`,
  },

  usage_2: {
    basic: `
function YourComponent() {
  const myId = useMyId()

  if (!myId) {
    return <p>You are not in a React Together session...</p>
  }

  return <p>My ID: {myId}</p>
}`,
  },
}

export default function UseMyIdDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'myId',
            type: 'string | null',
            description: 'The Id of the local user',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      {...{
        title: 'useMyId',
        description: (
          <p>
            The <CodeSpan text='useMyId' /> hook returns the <CodeSpan text='userId' /> of the local user. This ID is an alias for the{' '}
            <LinkSpan text='useViewId' to='https://multisynq.io/docs/croquet-react/global.html#useViewId' target='_blank' /> hook of{' '}
            <CodeSpan text='@croquet/react' />.
          </p>
        ),
        usage: (
          <>
            <CodeBlock code={codes.usage_1} />
            <CodeBlock code={codes.usage_2} />
          </>
        ),
        api,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useMyId') }} />
}
