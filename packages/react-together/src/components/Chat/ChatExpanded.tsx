import { useIsTogether } from '../../hooks'
import { ChatExpandedProps } from './types'

export default function ChatExpanded({
  messages,
  chatName,
  sendMessage,
  minimizeChat,
  ChatHeader,
  MessageList,
  MessageRow,
  MessageAvatar,
  MessageBody,
  ChatInput,
  ConnectPrompt,
  WelcomeMessage
}: ChatExpandedProps) {
  const isTogether = useIsTogether()

  return (
    <div className="rt-chatContainer">
      <ChatHeader chatName={chatName} minimizeChat={() => minimizeChat()} />
      <MessageList
        messages={messages}
        {...{
          MessageRow,
          MessageBody,
          MessageAvatar,
          ConnectPrompt,
          WelcomeMessage
        }}
      />
      {isTogether && <ChatInput sendMessage={sendMessage} />}
    </div>
  )
}
