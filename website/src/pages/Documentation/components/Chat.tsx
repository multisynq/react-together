import { CodeBlock } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { PreviewSourceCodeTabs } from '@pages/Documentation/PreviewSourceCodeTabs'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import InterfaceApi from '../InterfaceApi'
import ComponentPropsTable from './ComponentPropsTable'

const codes = {
  usage_1: {
    basic: `import { Chat } from 'react-together'`,
  },

  usage_2: {
    basic: `return <Chat rtKey="chat" />`,
  },

  demo: {
    basic: `
import { useState } from 'react'
import { Chat, useCreateRandomSession, useJoinUrl, useLeaveSession } from 'react-together'
import { Button } from 'primereact/button'

export function ChatDemo() {
  return (
    <div className='relative h-full'>
      <div className='fixed bottom-0 left-2'>
        <Chat rtKey='chat' />
      </div>
      <SessionManagement />
    </div>
  )
}

function ellipsify(text: string, maxLength = 30) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

function SessionManagement() {
  const createSession = useCreateRandomSession()
  const joinUrl = useJoinUrl()
  const leaveSession = useLeaveSession()

  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = (e: React.MouseEvent<unknown>) => {
    e.stopPropagation()
    e.preventDefault()
    navigator.clipboard
      .writeText(joinUrl)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch((err) => console.error('Failed to copy text: ', err))
  }

  return (
    <div className='text-center px-8'>
      <h3>Your Collaborative website</h3>
      <div className='mt-5 text-sm'>
        {joinUrl ? (
          <>
            <p>Invite your friends to this session using the link below</p>

            <p className='cursor-pointer underline mt-2 text-blue-600 hover:text-blue-600' onClick={(e) => copyToClipboard(e)}>
              {ellipsify(joinUrl)}
              <span className='ml-2'>
                <Button
                  icon={copySuccess ? 'pi pi-check' : 'pi pi-copy'}
                  text
                  rounded
                  severity='secondary'
                  aria-label='Bookmark'
                  className='w-7 h-6'
                />
              </span>
            </p>

            <p className='mt-2'>
              <span className='cursor-pointer underline text-red-500 hover:text-red-600' onClick={leaveSession}>
                Leave session
              </span>
            </p>
          </>
        ) : (
          <p>
            You are not inside a collaborative session.
            <br />
            <span onClick={createSession} className='cursor-pointer underline text-blue-600 hover:text-blue-800'>
              Create a new session
            </span>{' '}
            or paste an invite link in the bar above
          </p>
        )}
      </div>
    </div>
  )
}`,
  },
}

export default function ChatDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <ComponentPropsTable
        items={[
          {
            name: 'rtKey',
            type: 'string',
            description: <p>The unique identifier for this chat.</p>,
          },
          {
            name: 'chatName',
            type: 'string',
            default: '"Group Chat"',
            description: <p>The name of the chat. This name will appear in the chat header.</p>,
          },
          {
            name: 'hideWhenDisconnected',
            type: 'boolean',
            default: 'false',
            description: <p>When this option is set, the chat will not be displayed when the user is not connected to a session.</p>,
          },
          {
            name: 'components',
            type: 'ChatComponents',
            description: <p>The components to use for the chat. This allows to customize the chat interface.</p>,
          },
        ]}
      />
      {/* <h5>Chat Components</h5> */}
      <InterfaceApi
        title='ChatComponents'
        items={[
          {
            name: 'ChatMinimized',
            type: 'Component<ChatMinimizedProps>',
            description: <p>The component to use for the minimized chat.</p>,
          },
          {
            name: 'ChatExpanded',
            type: 'Component<ChatExpandedProps>',
            description: <p>The component to use for the expanded chat.</p>,
          },
          {
            name: 'ChatHeader',
            type: 'Component<ChatHeaderProps>',
            description: <p>The component to use for the chat header.</p>,
          },
          {
            name: 'MessageList',
            type: 'Component<MessageListProps>',
            description: <p>The component to use for the message list.</p>,
          },
          {
            name: 'MessageRow',
            type: 'Component<MessageRowProps>',
            description: <p>The component to use for each message row.</p>,
          },
          {
            name: 'MessageAvatar',
            type: 'Component<MessageAvatarProps>',
            description: <p>The component to use for the message avatar.</p>,
          },
          {
            name: 'MessageBody',
            type: 'Component<MessageBodyProps>',
            description: <p>The component to use for the message body.</p>,
          },
          {
            name: 'ChatInput',
            type: 'Component<ChatInputProps>',
            description: <p>The component to use for the chat input.</p>,
          },
          {
            name: 'ConnectPrompt',
            type: 'Component<unknown>',
            description: <p>The component to use for the connect prompt.</p>,
          },
          {
            name: 'WelcomeMessage',
            type: 'Component<unknown>',
            description: <p>The component to use for the welcome message.</p>,
          },
        ]}
      />
    </>
  )
  const content = (
    <GenericDocPage
      {...{
        title: 'Chat',
        description: (
          <>
            <p>This component renders a chat interface where users can communicate with each other, when connected to the same session.</p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='Chat' session1={null} session2={null} aspectRatio='3 / 4' />,
                code: <CodeBlock {...{ code: codes.demo, github: getDocLinks({ rt_name: 'Chat' }).github_demo }} />,
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
        // source: <CodeBlock {...{ code: codes.source, github: getDocLinks({ rt_path: 'components/ConnectedUsers.tsx' }).github_source }} />,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('Chat', { exclude: ['source'] }) }} />
}
