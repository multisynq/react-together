import { CodeBlock } from '@components/ui/CodeBlock'
import NewPropSpan from '@components/ui/NewPropSpan'
import RemovedPropSpan from '@components/ui/RemovedPropSpan'
import { TableContainer } from '@components/ui/TableContainer'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
export default function UseConnectedViewsDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'description', label: 'Description' },
        ]}
        data={[
          {
            name: 'connectedViews',
            type: 'ConnectedView[]',
            description: 'A list containing all the views connected to the current React Together session',
          },
        ]}
      />

      <h5>Return</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type' },
          { key: 'description', label: 'Description' },
        ]}
        data={[
          {
            name: 'connectedViews',
            type: 'ConnectedView[]',
            description: 'A list containing all the views connected to the current React Together session',
          },
        ]}
      />

      <h5>ConnectedView</h5>
      <TableContainer
        keys={[
          { key: 'name', label: 'Property' },
          { key: 'type', label: 'Type' },
          { key: 'description', label: 'Description' },
        ]}
        data={[
          {
            name: <NewPropSpan text='viewId' />,
            type: 'string',
            description: 'The id of the view that this entry corresponds to',
          },
          {
            name: <RemovedPropSpan text='isYou' />,
            type: 'boolean',
            description: 'Indicates whether you are this view',
          },
          {
            name: 'name',
            type: 'string',
            description: 'An alias to make the view more human identifiable',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useConnectedViews'
      description={
        'The useConnectedViews hook returns an array of objects representing all the views that are connected to the current session.'
      }
      usage={
        <>
          <CodeBlock language='javascript' code1={`import { useConnectedViews } from 'react-together'`} />
          <CodeBlock
            language='javascript'
            code1={`const connectedViews = useConnectedViews()

 return (
   <div ref={ref}>
     Connected users:
     <ul>
       {hoveringViews.map((viewId) => <li key={viewId}>{viewId}</li> }
     </ul>
   </div>
  )`}
          />
        </>
      }
      api={api}
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useConnectedViews')} keyToLookupWith='' />
}
