import { CodeBlock, CodeSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

const codes = {
  usage_1: {
    basic: `import { useJoinUrl } from 'react-together'`,
  },

  usage_2: {
    basic: `
function YourComponent() {
  const joinUrl = useJoinUrl()

  if (!joinUrl) {
    return <p>You are not in a React Together session...</p>
  }
  return (
    <>
      <p>Send this URL to your friends for them to join the session</p>
      <p>{joinUrl}</p>
    </>
}`,
  },
}

export default function UseJoinUrlDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'joinUrl',
            type: 'string | null',
            description: 'The join url',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      {...{
        title: 'useJoinUrl',
        description: (
          <p>
            The <CodeSpan text='useJoinUrl' /> hook returns the url other users should connect to to join the current session. If there is
            no current session, this hook returns <CodeSpan text='null' />.
          </p>
        ),
        usage: (
          <>
            <CodeBlock {...{ code: codes.usage_1 }} />
            <CodeBlock {...{ code: codes.usage_2 }} />
          </>
        ),
        api,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useJoinUrl') }} />
}
