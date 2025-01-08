import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../GenericDocPage'
import InterfaceApi from '../InterfaceApi'
import { PreviewSourceCodeTabs } from '../PreviewSourceCodeTabs'
import HookParamsApi from './HookParamsApi'
import HookReturnApi from './HookReturnApi'

const codes = {
  demo: {
    basic: `
import { useState } from 'react'
import { useChat } from 'react-together'
import { DynamicUrlWrapper } from './DynamicUrlWrapper'

export function UseChatDemo() {
  const { messages, sendMessage } = useChat('my-chat')

  const [message, setMessage] = useState('')

  function handleSendMessage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    sendMessage(message)
    setMessage('')
  }

  return (
    <DynamicUrlWrapper>
      <div className='p-4 h-full flex flex-col gap-2'>
        <div className='grow'>
          <ul>
            {messages.map(({ id, senderId, message, sentAt }) => (
              <li key={id}>
                [{formatTime(sentAt)}] <strong>{senderId}</strong>: {message}
              </li>
            ))}
          </ul>
        </div>
        <div className='flex gap-2'>
          <input
            className='border rounded-md p-2 grow'
            type='text'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className='rounded-md p-2 bg-blue-500 text-white'
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </DynamicUrlWrapper>
  )
}

function formatTime(time: number) {
  return new Date(time)
    .toLocaleTimeString(
      undefined,
      {
        hour: '2-digit',
        minute: '2-digit'
      }
    )
}
`,
  },

  usage_1: {
    basic: `import { useChat } from 'react-together'`,
  },

  usage_2: {
    basic: `
function YourComponent() {
  const { messages, sendMessage } = useChat('my-chat')

  const [message, setMessage] = useState('')

  function handleSendMessage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    sendMessage(message)
    setMessage('')
  }

  return (
    <div>
      <ul>
        {
          messages.map(({ senderId, message}) => (
            <li key={userId}>
              <strong>{senderId}</strong>: {message}
            </li>
          ))
        }
      </ul>
      <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => sendMessage(message)}>Send</button>
    </div>
  )
}
`,
  },
}

export default function UseConnectedUsersDocumentationPage() {
  const api = (
    <>
      <HookParamsApi
        items={[
          {
            name: 'rtKey',
            type: 'string',
            description: 'The key used to identify this chat',
          },
        ]}
      />
      <HookReturnApi
        items={[
          {
            name: 'messages',
            type: <LinkSpan text='ChatMessage[]' to='#chat-message' />,
            description: 'The list of messages sent to the chat.',
          },
          {
            name: 'sendMessage',
            type: '(message: string) => void',
            description: 'A function to send a message to the chat.',
          },
        ]}
      />
      <InterfaceApi
        title='ChatMessage'
        id='chat-message'
        items={[
          {
            name: 'id',
            type: 'number',
            description: 'The unique identifier of the message.',
          },
          {
            name: 'senderId',
            type: 'string',
            description: 'The userId of the user who sent the message.',
          },
          {
            name: 'message',
            type: 'string',
            description: 'The content of the message.',
          },
          {
            name: 'sentAt',
            type: 'number',
            description: 'The timestamp of when the message was sent.',
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
              The <CodeSpan text='useChat' /> hook returns an object containing the list of messages sent to the chat and a function to send
              a message to the chat.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='useChat' />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'UseChat' }).github_demo,
                    }}
                  />
                ),
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
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useChat', { exclude: ['source'] }) }} />
}
