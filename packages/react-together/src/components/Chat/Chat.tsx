import { useState } from 'react'
import { useChat, useIsTogether } from '../../hooks'
import Avatar from './Avatar'
import './Chat.css'
import ChatCollapsed from './ChatCollapsed'
import ChatExpanded from './ChatExpanded'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import Message from './Message'
import MessageBody from './MessageBody'
import MessagesContainer from './MessagesContainer'
import { ChatProps } from './types'

export default function Chat({
  rtKey,
  chatName = 'Group Chat',
  components,
  showWhenDisconnected
}: ChatProps) {
  const { messages, sendMessage } = useChat(rtKey)
  const isTogether = useIsTogether()

  const CollapsedComponent = components?.collapsed ?? ChatCollapsed
  const HeaderComponent = components?.header ?? ChatHeader
  const MessageComponent = components?.message ?? Message
  const InputComponent = components?.input ?? ChatInput
  const MessagesContainerComponent =
    components?.messagesContainer ?? MessagesContainer
  const ExpandedComponent = components?.expanded ?? ChatExpanded
  const AvatarComponent = components?.avatar ?? Avatar
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
