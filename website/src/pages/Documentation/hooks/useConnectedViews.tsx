import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
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
            description: 'A list containing all the views connected to the current React Together session.',
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
            description: 'The ID of the view to which the current entry corresponds.',
          },
          {
            name: 'isYou',
            type: 'boolean',
            description: 'Indicates whether this is the current view for the user.',
          },
          {
            name: 'name',
            type: 'string',
            description: 'An alias to make the view more easily identifiable by other users.',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useConnectedViews'
      description={
        <>
          <p>
            The <CodeSpan text='useConnectedViews' /> hook returns an array of objects representing all the views that are connected to the
            current session.
          </p>
          <DocumentationDemo url='ConnectedViews' />
        </>
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
