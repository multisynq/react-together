import { CodeBlock, CodeSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

const codes = {
  usage: {
    basic: `
import { useIsTogether } from 'react-together';

function YourComponent() {
  const isTogether = useIsTogether();

  return isTogether ? (
    <div>You're in a React Together session and you values are synchronized!</div>
  ) : (
    <div>You're not in a React Together session or values are not synchronized yet!</div>
  );
}
`,
    typescript: `
import { useIsTogether } from 'react-together';

function YourComponent() {
  const isTogether = useIsTogether(false);

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
      <HookParamsApi
        items={[
          {
            name: 'synchronized',
            type: 'boolean',
            default: 'true',
            description:
              'Set to false to monitor if the user is connected to a React Together session, but not necessarily synchronized with the model yet.',
          },
        ]}
      />
      <HookReturnApi
        items={[
          {
            name: 'isTogether',
            type: 'boolean',
            description:
              'Indicates whether the user is connected to a React Together session and has local states up to date with the model.',
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
            <CodeBlock
              {...{
                code: codes.usage,
                github: 'https://github.com/multisynq/react-together/tree/develop/packages/react-together/src/hooks/useIsTogether',
              }}
            />
          </>
        ),
        api,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useJoinUrl', { exclude: ['source'] }) }} />
}
