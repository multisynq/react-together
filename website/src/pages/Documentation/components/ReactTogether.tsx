import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import Link from '@components/ui/Link'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import ComponentPropsTable from './ComponentPropsTable'

export default function ReactTogetherDocumentationPage() {
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
            description: (
              <p>
                Unique application identifier as{' '}
                <Link to='https://developer.android.com/studio/build/application-id' target='_blank'>
                  dot-separated
                </Link>{' '}
                words (e.g. "com.example.myapp")
              </p>
            ),
          },
          {
            name: 'apiKey',
            type: 'string',
            description: (
              <p>
                The Multisynq API key. Get yours at{' '}
                <Link to='https://multisynq.io/account' target='_blank'>
                  multisynq.io/account
                </Link>
              </p>
            ),
          },
          {
            name: 'name?',
            type: 'string',
            description: (
              <p>
                If this parameter and <CodeSpan text='password' /> are defined, React Together will connect to a session with the given name
                when it first renders
              </p>
            ),
          },
          {
            name: 'password?',
            type: 'string',
            description: (
              <p>
                If this parameter and <CodeSpan text='name' /> are defined, React Together will connect to a session with the given password
                when it first renders
              </p>
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
      title='ReactTogether'
      description={
        <>
          <p>
            This component provides the context required to synchronize multiple users within the same session. Every React Together hook
            and component should be used within the scope of this component.
          </p>
          <p>
            If <CodeSpan text='name' /> and <CodeSpan text='password' /> are passed in the <CodeSpan text='sessionParams' /> prop,{' '}
            <CodeSpan text='ReactTogether' /> will immediately connect to a session with the given <CodeSpan text='name' /> and{' '}
            <CodeSpan text='password' />.
          </p>
          <p>
            If <CodeSpan text='rtName' /> and <CodeSpan text='rtPwd' /> are specified in the URL search parameters, those values will
            override the ones passed in <CodeSpan text='sessionParams' />.
          </p>
        </>
      }
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { ReactTogether } from 'react-together'`} />
          <CodeBlock
            language='javascript'
            code1={`ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactTogether
      sessionParams={{
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY']
      }}
    >
      <App />
    </ReactTogether>
  </React.StrictMode>
)`}
          />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('ReactTogether')} />
}
