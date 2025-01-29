import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '../DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

const codes = {
  usage: {
    basic: `
import { useMyId } from 'react-together'

function YourComponent() {
  const myId = useMyId()

  if (!myId) {
    return <p>You don't have an ID because you're not in a React Together session.</p>
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
            <CodeBlock {...{ code: codes.usage }} />
          </>
        ),
        api,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useMyId') }} />
}
