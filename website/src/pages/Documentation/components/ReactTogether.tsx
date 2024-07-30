import { CodeBlock } from '@components/ui/CodeBlock'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { Link } from 'react-router-dom'
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
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='ReactTogether'
      description='This component provides the context required to synchronize multiple users within the same session. Every React Together hook and component should be used within the scope of this component.'
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
