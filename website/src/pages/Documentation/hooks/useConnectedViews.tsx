import { CodeBlock } from '@components/ui/CodeBlock'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import InterfaceApi from '../InterfaceApi'
import HookReturnApi from './HookReturnApi'
export default function UseConnectedViewsDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'connectedViews',
            type: <LinkSpan text='ConnectedView[]' to='#connected-view' />,
            description: 'A list containing all the views connected to the current React Together session',
          },
        ]}
      />
      <InterfaceApi
        title='ConnectedView'
        id='connected-view'
        items={[
          {
            name: 'viewId',
            type: 'string',
            description: 'The id of the view that this entry corresponds to',
          },
          {
            name: 'isYou',
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
          <CodeBlock language='jsx' code1={`import { useConnectedViews } from 'react-together'`} />
          <CodeBlock
            language='jsx'
            code1={`const connectedViews = useConnectedViews()

return (
  <div ref={ref}>
    Connected views:
    <ul>{hoveringViews.map(
      (viewId) => (
        <li key={viewId}>{viewId}</li>
      )
    }</ul>
  </div>
)`}
          />
        </>
      }
      api={api}
    />
  )
  return <DocumentationPage content={content} navItems={GenericDocNav('useConnectedViews')} />
}
