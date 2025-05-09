import { CodeBlock, CodeSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookReturnApi from './HookReturnApi'

const codes = {
  usage: {
    basic: `
import { useIsSynchronized } from 'react-together';

function YourComponent() {
  const isSynchronized = useIsSynchronized();

  return isSynchronized ? (
    <div>You're in a React Together session and you values are synchronized!</div>
  ) : (
    <div>You're not in a React Together session or values are not synchronized yet!</div>
  );
}
`,
  },
}

export default function UseJoinUrlDocumentationPage() {
  const api = (
    <HookReturnApi
      items={[
        {
          name: 'isSynchronized',
          type: 'boolean',
          description: 'Indicates whether the useStateTogether(s) and other react-together components/hooks are up to date with the model.',
        },
      ]}
    />
  )
  const content = (
    <GenericDocPage
      {...{
        title: 'useIsSynchronized',
        description: (
          <>
            <p>
              The <CodeSpan text='useIsSynchronized' /> hook returns <CodeSpan text='true' /> if the local states are synchronized with the
              model, and <CodeSpan text='false' /> otherwise.
            </p>
            <p>
              If the user is not connected to a session this will return <CodeSpan text='false' />
            </p>
          </>
        ),
        usage: (
          <>
            <CodeBlock
              {...{
                code: codes.usage,
                github: 'https://github.com/multisynq/react-together/tree/develop/packages/react-together/src/hooks/useIsSynchronized',
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
