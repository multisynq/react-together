import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function ReactTogetherDocumentationPage() {
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
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('ReactTogether')} keyToLookupWith='' />
}
