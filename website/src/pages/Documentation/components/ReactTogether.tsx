import { CodeBlock } from '@components/ui/CodeBlock'
import LinkSpan from '@components/ui/LinkSpan'
import { TableContainer } from '@components/ui/TableContainer'
import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { Link } from 'react-router-dom'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function ReactTogetherDocumentationPage() {
  const api = (
    <>
      <h4>Params</h4>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'default', label: 'Default Value' },
          { key: 'description', label: 'Description' },
        ]}
        data={[
          {
            name: 'sessionParams',
            type: <LinkSpan to='#ReactTogetherSessionParams' text='ReactTogetherSessionParams' />,
            description: 'The parameters passed to the Multisynq session',
          },
        ]}
      />
      <h5 id='ReactTogetherSessionParams'>ReactTogetherSessionParams</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'default', label: 'Default Value' },
          { key: 'description', label: 'Description' },
        ]}
        data={[
          {
            name: 'appId',
            type: 'string',
            description: 'The ID of your app',
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
      description='This component provides the context required to synchronize multiple users within the same session. Every React Together hook and component you use should be inside the scope of this component.'
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
