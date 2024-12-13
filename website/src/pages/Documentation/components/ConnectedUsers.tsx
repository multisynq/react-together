import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { PreviewSourceCodeTabs } from '@pages/Documentation/PreviewSourceCodeTabs'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import ComponentPropsTable from './ComponentPropsTable'

const codes = {
  demo: {
    basic: `
import { ConnectedUsers } from 'react-together'

export function ConnectedUsersDemo() {
  return <ConnectedUsers />
}
`,
  },

  usage_1: {
    basic: `import { ConnectedUsers } from 'react-together'`,
  },

  usage_2: {
    basic: `return <ConnectedUsers />`,
  },

  source: {
    basic: `
  import { Avatar } from 'primereact/avatar'
import { AvatarGroup } from 'primereact/avatargroup'
import { useConnectedUsers } from '../hooks'

function UserAvatar({ name }) {
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

export default function ConnectedUsers({ maxAvatars = 3, debug = false }) {
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
`,
  },
}

export default function ConnectedUsersDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <ComponentPropsTable
        items={[
          {
            name: 'maxAvatars',
            type: 'number',
            default: '3',
            description: (
              <p>
                The maximum number of circles rendered by this component. If <CodeSpan text='maxAvatars' /> is 3 and there are 3 users
                connected, it will render three circles, one for each user. If there are four users connected, it will render the circles
                for two users, and one circle displaying <CodeSpan text='+2' />.
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      {...{
        title: 'ConnectedUsers',
        description: (
          <>
            <p>
              This component uses the <LinkSpan to='/useConnectedUsers' text='useConnectedUsers' /> hook to display the users connected to
              the current React Together session.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='ConnectedUsers' />,
                code: <CodeBlock {...{ code: codes.demo, github: getDocLinks({ rt_name: 'ConnectedUsers' }).github_demo }} />,
              }}
            />
          </>
        ),
        usage: (
          <>
            <CodeBlock {...{ code: codes.usage_1 }} />
            <CodeBlock {...{ code: codes.usage_2 }} />
          </>
        ),
        api,
        source: <CodeBlock {...{ code: codes.source, github: getDocLinks({ rt_path: 'components/ConnectedUsers.tsx' }).github_source }} />,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('ConnectedUsers') }} />
}
