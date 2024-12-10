import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import InterfaceApi from '../InterfaceApi'
import HookReturnApi from './HookReturnApi'
export default function UseConnectedUsersDocumentationPage() {
  const api = (
    <>
      <HookReturnApi
        items={[
          {
            name: 'connectedUsers',
            type: <LinkSpan text='ConnectedView[]' to='#connected-view' />,
            description: 'A list containing all the users connected to the current React Together session.',
          },
        ]}
      />
      <InterfaceApi
        title='ConnectedUser'
        id='connected-user'
        items={[
          {
            name: 'userId',
            type: 'string',
            description: 'The ID of the user to which the current entry corresponds.',
          },
          {
            name: 'isYou',
            type: 'boolean',
            description: 'Indicates whether this is the current user.',
          },
          {
            name: 'name',
            type: 'string',
            description: 'An alias to make the user more easily identifiable by other users.',
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      title='useConnectedUsers'
      description={
        <>
          <p>
            The <CodeSpan text='useConnectedUsers' /> hook returns an array of objects representing all the users that are connected to the
            current session.
          </p>
          <DocumentationDemo url='ConnectedUsers' />
        </>
      }
      usage={
        <>
          <CodeBlock language='jsx' codeShort={`import { useConnectedUsers } from 'react-together'`} />
          <CodeBlock
            language='jsx'
            codeShort={`const connectedUsers = useConnectedUsers()

return (
  <div ref={ref}>
    Connected views:
    <ul>{hoveringUsers.map(
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
  return <DocumentationPage content={content} navItems={GenericDocNav('useConnectedUsers')} />
}
