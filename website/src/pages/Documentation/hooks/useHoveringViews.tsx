import { CodeBlock } from '@components/ui/CodeBlock'
import { TableContainer } from '@components/ui/TableContainer'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'

export default function UseHoveringViewsDocumentationPage() {
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
            type: 'string',
            description: 'The key used to identify this state',
          },
          {
            name: 'initialValue',
            type: 'UseHoveringViewOptions',
            description: 'An options object used to configure the behavior of this hook',
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
            name: '0',
            type: 'MutableRefObject',
            description: 'The current local state.',
          },
          {
            name: '1',
            type: 'string[]',
            description: 'An array containing all the viewIds that are currently hovering the element with the returned ref.',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useHoveringViews'
      parameter='(rtid, options)'
      description={
        'The useHoveringViews hook is used to tell which views are hovering a given DOM element. If a view is hovering a component that is nested on other “hoverable” components, only the innermost will tell that view is hovering it.'
      }
      usage={
        <>
          <CodeBlock language='jsx' code1={`import { useHoveringViews } from 'react-together'`} />
          <CodeBlock
            language='jsx'
            code1={`const [ref, hoveringViews] = useHoveringViews(‘hovering-views’)

return (
  <div>
    <div ref={ref}>Hover me!</div>
    <h3>Hovering Ids:</h3>
    <ul>
      {hoveringViews.map((viewId) => (
        <li key={viewId}>{viewId}</li>
      )}
    </ul>
  </div>
)`}
          />
        </>
      }
      api={api}
    />
  )
  return <DocumentationSkeleton content={content} navItems={GenericDocNav('useHoveringViews')} keyToLookupWith='' />
}
