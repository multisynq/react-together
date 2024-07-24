import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function ConnectedViewsDocumentationPage() {
  const content = (
    <GenericDocPage
      title='ConnectedViews'
      description='This component uses the useConnectedViews hook to display the views that are connected to the current React Together session.'
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { ConnectedViews } from 'react-together'`} />
          <CodeBlock language='javascript' code1={`return <ConnectedViews/>`} />
        </>
      }
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('ConnectedViews')} keyToLookupWith='' />
}
