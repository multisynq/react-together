import { CodeBlock, CodeSpan } from '@components/ui'
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
import { useEffect, useState } from 'react'
import { useConnectedUsers, useNicknames } from 'react-together'

export function UseNicknamesDemo() {
  const [nickname, setNickname, allNicknames] = useNicknames()
  const [localNickname, setLocalNickname] = useState(nickname)
  const connectedUsers = useConnectedUsers()

  useEffect(() => {
    setLocalNickname(nickname)
  }, [nickname])

  return (
    <div className='text-sm'>
      <div>
        <strong>All Nicknames:</strong>
        <ul>
          {connectedUsers.map(({ userId, isYou }) => (
            <li key={userId}>
              {userId}: {allNicknames[userId]}
              {isYou && ' (You)'}
            </li>
          ))}
        </ul>
      </div>
      <div className='mt-4'>
        <div className='flex items-center'>
          <input
            className='border border-gray-300 rounded-md px-2 py-1'
            value={localNickname}
            onChange={(e) => setLocalNickname(e.target.value)}
            placeholder='Enter your nickname'
          />
          <button
            className='ml-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-xs px-2 py-1 rounded-md'
            onClick={() => setNickname(localNickname)}
            disabled={localNickname === nickname}
          >
            Change nickname
          </button>
        </div>
      </div>
    </div>
  )
}
`,
  },

  usage: {
    basic: `
import { useEffect, useState } from 'react'
import { useConnectedUsers, useNicknames } from 'react-together'

export function UseNicknamesDemo() {
  const [nickname, setNickname, allNicknames] = useNicknames()
  const [localNickname, setLocalNickname] = useState(nickname)
  const connectedUsers = useConnectedUsers()

  useEffect(() => {
    setLocalNickname(nickname)
  }, [nickname])

  return (
    <div>
      <div>
        <strong>All Nicknames:</strong>
        <ul>
          {connectedUsers.map(({ userId, isYou }) => (
            <li key={userId}>
              {userId}: {allNicknames[userId]}
              {isYou && ' (You)'}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <div>
          <input
            value={localNickname}
            onChange={(e) => setLocalNickname(e.target.value)}
          />
          <button onClick={() => setNickname(localNickname)}>
            Change nickname
          </button>
        </div>
      </div>
    </div>
  )
}
`,
  },
}

export default function UseNicknamesDocumentationPage() {
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
          name: 'nickname',
          type: 'string',
          description: "The current user's nickname.",
        },
        {
          name: 'setNickname',
          type: '(nickname: string) => void',
          description: "A function to update the current user's nickname.",
        },
        {
          name: 'allNicknames',
          type: 'Record<string, string>',
          description: 'An object mapping all user IDs to their nicknames.',
        },
      ]}
    />
  )

  const content = (
    <GenericDocPage
      {...{
        title: 'useNicknames',
        description: (
          <>
            <p>
              The <CodeSpan text='useNicknames' /> hook provides functionality to manage user nicknames in a React Together session. It
              returns the current user's nickname, a function to update it, and a record of all users' nicknames.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='useNicknames' session1={sessionParams} session2={sessionParams} />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'useNicknames' }).github_demo,
                      // stackBlitz:
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
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useNicknames', { exclude: ['source'] }) }} />
}
