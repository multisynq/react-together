import { CodeBlock, CodeSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

const codes = {
  usage: {
    basic: `
import { useIsTogether } from 'react-together';

function YourComponent() {
  const isTogether = useIsTogether();

  return isTogether ? (
    <div>You're in a React Together session!</div>
  ) : (
    <div>You're not in a React Together session.</div>
  );
}
`,
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
            <CodeBlock {...{ code: codes.usage }} />
          </>
        ),
        api,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useJoinUrl', { exclude: ['source'] }) }} />
}
