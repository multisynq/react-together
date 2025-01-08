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
  ChatInput
}: ChatExpandedProps) {
  return (
    <div className="rt-chatContainer">
      <ChatHeader chatName={chatName} minimizeChat={() => minimizeChat()} />
      <MessageList
        messages={messages}
        {...{
          MessageRow,
          MessageBody,
          MessageAvatar
        }}
      />
      <ChatInput sendMessage={sendMessage} />
    </div>
  )
}
