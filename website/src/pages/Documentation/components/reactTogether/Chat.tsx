import { CodeBlock, CodeSpan } from '@components/ui'
import ChatWireframe from '@images/chatWireframe.webp'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { PreviewSourceCodeTabs } from '@pages/Documentation/PreviewSourceCodeTabs'
import { useLocalStorage } from '@uidotdev/usehooks'
import getDocLinks from '@utils/getDocLinks'
import DocumentationDemo from '../../DocumentationDemo'
import { GenericDocNav, GenericDocPage } from '../../GenericDocPage'
import InterfaceApi from '../../InterfaceApi'
import ComponentPropsTable from '../ComponentPropsTable'

const codes = {
  usage_1: {
    basic: `import { Chat } from 'react-together'`,
  },

  usage_2: {
    basic: `return <Chat rtKey="chat" />`,
  },

  demo: {
    basic: `
import { Chat } from 'react-together';

export default function ChatDemo() {
  return (
    <div className="fixed bottom-0 right-2">
      <Chat rtKey="chat" />
    </div>
  );
}
`,
  },
}
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
          description: (
            <p>
              The component to use for the connect prompt. This component is displayed inside the <CodeSpan text='MessageList' />
              component when the user is not connected to a session.
            </p>
          ),
        },
        {
          name: 'WelcomeMessage',
          type: 'Component<unknown>',
          description: (
            <p>
              The component to use for the welcome message. This is displayed inside the <CodeSpan text='MessageList' /> component when the
              user is connected to a session, but there are no messages yet.
            </p>
          ),
        },
      ]}
    />
    <h5>Wireframe</h5>
    <img src={ChatWireframe} alt='React Together Chat Wireframe. Shows the placement of each component within the chat interface.' />
  </>
)

export default function ChatDocumentationPage() {
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
        title: 'Chat',
        description: (
          <>
            <p>This component renders a chat interface where users can communicate with each other, when connected to the same session.</p>
            <PreviewSourceCodeTabs
              {...{
                preview: <DocumentationDemo url='Chat' session1={sessionParams} session2={sessionParams} aspectRatio='3 / 4' />,
                code: (
                  <CodeBlock
                    {...{
                      code: codes.demo,
                      github: getDocLinks({ rt_name: 'Chat' }).github_demo,
                      stackBlitz: 'https://stackblitz.com/edit/react-together-chat?file=src%2FApp.tsx',
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
        // source: <CodeBlock {...{ code: codes.source, github: getDocLinks({ rt_path: 'components/ConnectedUsers.tsx' }).github_source }} />,
      }}
    />
  )
  return <DocumentationPage {...{ content, navItems: GenericDocNav('Chat', { exclude: ['source'] }) }} />
}
