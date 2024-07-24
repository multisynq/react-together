import { CodeBlock } from '@components/ui/CodeBlock'
import { TableContainer } from '@components/ui/TableContainer'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function ConnectedViewsDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'default', label: 'Default Value' },
          { key: 'description', label: 'Description' },
        ]}
        data={[
          {
            name: 'rtid',
            type: 'number',
            default: '3',
            description:
              'The maximum number of circles rendered by this component. If maxAvatars is 3 and there are 3 views connected, it will render three circles, one for each view. If there are four views connected, it will render the circles for two views, and one circle with “+2”.',
          },
        ]}
      />
    </>
  )
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
      api={api}
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('ConnectedViews')} keyToLookupWith='' />
}
