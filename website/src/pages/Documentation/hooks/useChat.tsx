import { CodeBlock, CodeSpan, LinkSpan } from '@components/ui'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { useLocalStorage } from '@uidotdev/usehooks'
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
import { useEffect, useRef, useState } from 'react';
import { useChat } from 'react-together';

export default function UseChatDemo() {
  const { messages, sendMessage } = useChat('use-chat-demo');

  const [message, setMessage] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  function handleSendMessage(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  }

  return (
    <div className="max-h-[50vh] py-2 flex flex-col border rounded-md p-2">
      {/* ---MESSAGE CONTAINER--- */}
      <div
        className="overflow-y-auto px-2 flex-grow text-left"
        ref={messagesContainerRef}
      >
        <ul className="flex gap-1 flex-col mb-2">
          {messages.map(({ id, senderId, message, sentAt }) => (
            <li key={id}>
              [{formatTime(sentAt)}] <strong>{senderId}</strong>: {message}
            </li>
          ))}
        </ul>
      </div>
      {/* ---INPUT CONTAINER--- */}
      <div className="flex gap-2 px-2">
        <input
          className="border rounded-md p-2 grow"
          type="text"
          value={message}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e);
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="rounded-md p-2 bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

function formatTime(time: number) {
  return new Date(time).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

`,
  },

  usage: {
    basic: `
import { useChat } from 'react-together'

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

export default function UseChatDocumentationPage() {
  // This is used to generate a random session per browser, so that each user has their own session
  // We're storing each session in local storate so that users can resume the chat they had previously
  const [chatSessionName] = useLocalStorage('chat-session-name', Math.random().toString(36).substring(2, 15))
  const sessionParams = {
    name: chatSessionName,
    password: 'secret-password',
  }

  const content = (
    <GenericDocPage
      {...{
        title: 'useChat',
        description: (
          <>
            <p>
              The <CodeSpan text='useChat' /> hook allows users within the same session to send and receive messages.
            </p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='useChat' session1={sessionParams} session2={sessionParams} />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'UseChat' }).github_demo,
                      stackBlitz: 'https://stackblitz.com/edit/react-together-hello-world-hkkvvjpv?file=src%2FApp.tsx',
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
  return <DocumentationPage {...{ content, navItems: GenericDocNav('useChat', { exclude: ['source'] }) }} />
}
