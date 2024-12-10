import { CodeBlock } from '@components/ui/CodeBlock'
import CodeSpan from '@components/ui/CodeSpan'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import InterfaceApi from '../InterfaceApi'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'
import HookReturnApi from './HookReturnApi'

const demoCode = `
import { Avatar } from 'primereact/avatar'
import { AvatarGroup } from 'primereact/avatargroup'
import { useConnectedUsers } from '../hooks'

interface UserAvatarProps {
  name: string
}
function UserAvatar({ name }: UserAvatarProps) {
  return (
    <Avatar
      image={\`https://api.dicebear.com/8.x/initials/svg?seed=\${name}\`}
      size="normal"
      shape="circle"
      label={name}
      pt={{ root: { title: name } }}
    />
  )
}

type ConnectedUsersProps = {
  maxAvatars?: number
  debug?: boolean
}
export default function ConnectedUsers({
  maxAvatars = 3,
  debug = false
}: ConnectedUsersProps) {
  const users = useConnectedUsers()

  const size = 'normal'
  const nAvatars = Math.max(users.length - (maxAvatars - 1), 0)

  return (
    <>
      <AvatarGroup pt={{ root: { style: { gap: '10px' } } }}>
        {users.slice(0, maxAvatars - 1).map(({ name, userId }) => (
          <UserAvatar key={userId} name={name} />
        ))}
        {nAvatars > 0 &&
          (nAvatars === 1 ? (
            <UserAvatar name={users[users.length - 1].name} />
          ) : (
            <Avatar label={\`+\${nAvatars}\`} shape="circle" size={size} />
          ))}
      </AvatarGroup>
      {debug && (
        <div style={{ textAlign: 'left' }}>
          <p>Connected users:</p>
          <ul>
            {users.map(({ userId, name, isYou }) => (
              <li key={userId}>
                {isYou ? (
                  <strong>
                    {userId}: {name}
                  </strong>
                ) : (
                  <span>
                    {userId}: {name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
`

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
          <PreviewSourceCodeTabs
            preview={<DocumentationDemo url='ConnectedUsers' />}
            code={<CodeBlock language='tsx' code1={demoCode} />}
          />
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
