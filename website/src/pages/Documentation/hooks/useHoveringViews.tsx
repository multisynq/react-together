import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

export default function UseHoveringViewsDocumentationPage() {
  const api = (
    <>
      <HookParamsApi
        items={[
          {
            name: 'rtKey',
            type: 'string',
            description: 'The key used to identify this state.',
          },
          // {
          //   name: 'options',
          //   type: 'UseHoveringViewOptions',
          //   description: 'An options object used to configure the behavior of this hook',
          // },
        ]}
      />
      <HookReturnApi
        items={[
          {
            name: '0',
            type: 'MutableRefObject',
            description: 'The current local state.',
          },
          {
            name: '1',
            type: 'string[]',
            description: 'An array containing all the view IDs that are currently hovering over the element with the returned ref.',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useHoveringViews'
      parameter='(rtKey, options)'
      description={
        <>
          <p>
            The useHoveringViews hook identifies which views are hovering over a given DOM element. If a view is hovering over a component
            that is nested within other ‘hoverable’ components, only the innermost component will register that the view is hovering over
            it.
          </p>
          <DocumentationDemo url='PresenceDiv' />
        </>
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
  return <DocumentationPage content={content} navItems={GenericDocNav('useHoveringViews')} />
}
