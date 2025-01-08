import { useState } from 'react'
import { useChat, useIsTogether } from '../../hooks'
import './Chat.css'
import ChatExpanded from './ChatExpanded'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatMinimized from './ChatMinimized'
import MessageAvatar from './MessageAvatar'
import MessageBody from './MessageBody'
import MessagesList from './MessageList'
import MessageRow from './MessageRow'
import { ChatProps } from './types'

export default function Chat({
  rtKey,
  chatName = 'Group Chat',
  components,
  showWhenDisconnected
}: ChatProps) {
  const { messages, sendMessage } = useChat(rtKey)
  const isTogether = useIsTogether()

  const CollapsedComponent = components?.collapsed ?? ChatMinimized
  const HeaderComponent = components?.header ?? ChatHeader
  const MessageComponent = components?.message ?? MessageRow
  const InputComponent = components?.input ?? ChatInput
  const MessagesContainerComponent =
    components?.messagesContainer ?? MessagesList
  const ExpandedComponent = components?.expanded ?? ChatExpanded
  const AvatarComponent = components?.avatar ?? MessageAvatar
  const MessageBodyComponent = components?.messageBody ?? MessageBody

  const [isMinimized, setIsMinimized] = useState(false)

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev)
  }

  return (
    showWhenDisconnected ||
    (isTogether && (
      <div className="rt-chat">
        {isMinimized ? (
          <CollapsedComponent
            chatName={chatName}
            expandChat={() => toggleMinimize()}
          />
        ) : (
          <ExpandedComponent
            {...{
              HeaderComponent,
              MessageComponent,
              MessageBodyComponent,
              InputComponent,
              MessagesContainerComponent,
              AvatarComponent
            }}
            messages={messages}
            onSend={sendMessage}
            collapseChat={() => toggleMinimize()}
            chatName={chatName}
          />
        )}
      </div>
    ))
  )
}
