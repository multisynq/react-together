import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { useLocalStorage } from '@uidotdev/usehooks'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'
import HookReturnApi from './HookReturnApi'

const codes = {
  demo: {
    basic: `
import { useAllNicknames, useConnectedUsers } from 'react-together'

export function UseAllNicknamesDemo() {
  const allNicknames = useAllNicknames()
  const connectedUsers = useConnectedUsers()

  return (
    <div>
      <strong>All Nicknames:</strong>
      <ul>
        {connectedUsers.map(({ userId }) => (
          <li key={userId}>
            {userId}: {allNicknames[userId]}
          </li>
        ))}
      </ul>
    </div>
  )
}
`,
  },

  usage: {
    basic: `
import { useAllNicknames, useConnectedUsers } from 'react-together'

export function UseAllNicknamesDemo() {
  const allNicknames = useAllNicknames()
  const connectedUsers = useConnectedUsers()

  return (
    <div>
      <strong>All Nicknames:</strong>
      <ul>
        {connectedUsers.map(({ userId }) => (
          <li key={userId}>
            {userId}: {allNicknames[userId]}
          </li>
        ))}
      </ul>
    </div>
  )
}
`,
  },
}

export default function UseAllNicknamesDocumentationPage() {
  // This is used to generate a random session per browser, so that each user has their own session
  // We're storing each session in local storate so that users can resume the chat they had previously
  const [chatSessionName] = useLocalStorage('chat-session-name', Math.random().toString(36).substring(2, 15))
  const sessionParams = {
    name: chatSessionName,
    password: 'secret-password',
  }

  const api = (
    <HookReturnApi
      items={[
        {
          name: 'allNicknames',
          type: 'Record<string, string>',
          description: 'An object mapping user IDs to their nicknames for all users in the current React Together session.',
        },
      ]}
    />
  )

  const content = (
    <GenericDocPage
      {...{
        title: 'useAllNicknames',
        description: (
          <>
            <p>
              The <CodeSpan text='useAllNicknames' /> hook returns an object containing all user nicknames in the current session. This is a
              simplified version of the <LinkSpan text='useNicknames' to='/useNicknames' /> hook when you only need to read the nicknames of
              each user.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='useAllNicknames' session1={sessionParams} session2={sessionParams} />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'useAllNicknames' }).github_demo,
                      // stackBlitz: 'https://stackblitz.com/edit/react-together-hello-world?file=src%2FApp.tsx',
                    }}
                  />
                ),
              }}
            />
          </>
        ),
        usage: <CodeBlock {...{ code: codes.usage }} />,
        api,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useAllNicknames', { exclude: ['source'] }) }} />
}
