import { CodeBlock, CodeSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

const codes = {
  usage_1: {
    basic: `import { useCreateRandomSession } from 'react-together'`,
  },

  usage_2: {
    basic: `
function YourComponent() {
  const createRandomSession = useCreateRandomSession()

  return (
    <button onClick={() => createRandomSession()}>
      Connect to a new session!
    </button>
  )
}
`,
  },
}

export default function UseCreateRandomSessionDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'createRandomSession',
            type: '() => void',
            description: 'A function that, when called, connects the user to a new React Together session',
          },
        ]}
      />
    </>
  )

  const content = (
    <GenericDocPage
      {...{
        title: 'useCreateRandomSession',
        description: (
          <p>
            The <CodeSpan text='useCreateRandomSession' /> hook returns a function that when called, connects to a new React Together
            session, with a random name and password.
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
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useCreateRandomSession', { exclude: ['source'] }) }} />
}
