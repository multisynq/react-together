import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import Link from '@components/ui/Link'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import ComponentPropsTable from './ComponentPropsTable'

export default function ReactTogetherManagerDocumentationPage() {
  const api = (
    <>
      <h4>Props</h4>
      <ComponentPropsTable
        items={[
          {
            name: 'sessionParams',
            type: <LinkSpan to='#ReactTogetherSessionParams' text='ReactTogetherSessionParams' />,
            description: 'The parameters passed to the Multisynq session.',
          },
        ]}
      />
      <h5 id='ReactTogetherSessionParams'>ReactTogetherSessionParams</h5>
      <ComponentPropsTable
        items={[
          {
            name: 'appId',
            type: 'string',
            description: "The owner's ID.",
          },
          {
            name: 'apiKey',
            type: 'string',
            description: (
              <p>
                The Multisynq API key. Get yours at{' '}
                <Link to='https://croquet.io/keys' target='_blank'>
                  croquet.io/keys
                </Link>
              </p>
            ),
          },
          {
            name: 'name?',
            type: 'string',
            description: (
              <p>If this parameter is defined, React Together will connect to a session with the given name when it first renders</p>
            ),
          },
          {
            name: 'password?',
            type: 'string',
            description: (
              <p>If this parameter is defined, React Together will connect to a session with the given password when it first renders</p>
            ),
          },
          {
            name: 'sessionIgnoresUrl?',
            type: 'boolean',
            default: 'false',
            description: (
              <p>
                Sessions with the same name are typically treated as separate if they are hosted at different URLs. However, if
                <CodeSpan text='sessionIgnoresUrl' /> is set to <CodeSpan text='true' />, sessions with the same name will be considered the
                same session regardless of their hosting URL.
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='ReactTogetherManager'
      description='This component provides a simple UI to manage the current React Together session, i.e. connecting to a new session, sharing it with other people, and leaving the current session. If you want to implement your own session manager component, feel free to checkout the useConnectNewSession, useLeaveSession, and useJoinSessionURL hooks!'
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { ReactTogetherManager } from 'react-together'`} />
          <CodeBlock language='javascript' code1={`return <ReactTogetherManager />`} />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('ReactTogether')} />
}
