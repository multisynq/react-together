import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

export default function UseHoveringUsersDocumentationPage() {
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
            description: (
              <p>
                An array containing all the user IDs that are currently hovering over the element with the returned <CodeSpan text='ref' />.
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useHoveringUsers'
      parameter='(rtKey, options)'
      description={
        <>
          <p>
            The <CodeSpan text='useHoveringUsers' /> hook identifies which users are hovering a given DOM element. If a user is hovering a
            component that is nested within other ‘hoverable’ components, only the innermost component will indicate that it's being
            hovered.
          </p>
          <DocumentationDemo url='PresenceDiv' />
        </>
      }
      usage={
        <>
          <CodeBlock language='jsx' code1={`import { useHoveringUsers } from 'react-together'`} />
          <CodeBlock
            language='jsx'
            code1={`const [ref, hoveringViews] = useHoveringUsers(‘hovering-views’)

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
  return <DocumentationPage content={content} navItems={GenericDocNav('useHoveringUsers')} />
}
