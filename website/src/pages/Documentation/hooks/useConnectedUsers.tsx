import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import InterfaceApi from '../InterfaceApi'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'
import HookReturnApi from './HookReturnApi'

const codes = {
  demo: {
    basic: `
import { useConnectedUsers } from 'react-together';

export default function UseConnectedUsersDemo() {
  const connectedUsers = useConnectedUsers();

  return (
    <div>
      Connected users:
      <ul>
        {connectedUsers.map(({ userId, nickname, isYou }) => (
          <li key={userId}>
            {isYou ? (
              <strong>
                {userId}: {nickname}
              </strong>
            ) : (
              <span>
                {userId}: {nickname}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
`,
  },

  usage: {
    basic: `
import { useConnectedUsers } from 'react-together'

function YourComponent() {
  const connectedUsers = useConnectedUsers()

  return (
    <div>
      Connected users:
      <ul>
        {connectedUsers.map(({ userId, nickname, isYou }) => (
          <li key={userId}>
            {isYou ? <strong>{userId}: {nickname}</strong> : <span>{userId}: {nickname}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
`,
  },
}

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
            name: 'nickname',
            type: 'string',
            description: (
              <p>
                The nickname of the user. This can be changed using the <LinkSpan text='useNicknames' to='/useNicknames' /> hook.
              </p>
            ),
          },
          {
            name: 'name',
            type: 'string',
            description: 'Deprecated since 0.3.3. Use `nickname` instead.',
            deprecated: true,
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      {...{
        title: 'useConnectedUsers',
        description: (
          <>
            <p>
              The <CodeSpan text='useConnectedUsers' /> hook returns an array of objects representing all the users that are connected to
              the current session.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='useConnectedUsers' />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'useConnectedUsers' }).github_demo,
                      stackBlitz: 'https://stackblitz.com/edit/react-together-hello-world-3ybeuzy8?file=src%2FApp.tsx',
                    }}
                  />
                ),
              }}
            />
          </>
        ),
        usage: (
          <>
            <CodeBlock {...{ code: codes.usage }} />
          </>
        ),
        api,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useConnectedUsers') }} />
}
