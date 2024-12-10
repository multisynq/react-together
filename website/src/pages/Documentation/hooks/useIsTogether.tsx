import { CodeBlock } from '@components/ui'
import CodeSpan from '@components/ui/CodeSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

const codes = {
  usage_1: {
    basic: `import { useIsTogether } from 'react-together'`,
  },

  usage_2: {
    basic: `const isTogether = useIsTogether()`,
  },
}

export default function UseJoinUrlDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'isTogether',
            type: 'boolean',
            description: 'Indicates whether the user is connected to a React Together session.',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      {...{
        title: 'useIsTogether',
        description: (
          <p>
            The <CodeSpan text='useIsTogether' /> hook returns <CodeSpan text='true' /> if the user is connected to a React Together
            session, and <CodeSpan text='false' /> otherwise.
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
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useJoinUrl') }} />
}
