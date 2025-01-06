import { useState } from 'react'
import { useChat } from '../../hooks'
import './Chat.css'
import ChatCollapsed from './ChatCollapsed'
import ChatExpanded from './ChatExpanded'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import Message from './Message'
import MessagesContainer from './MessagesContainer'
import { ChatProps } from './types'

export default function Chat({
  chatName = 'Group Chat',
  components
}: ChatProps) {
  const { messages, sendMessage } = useChat('chat')

  const CollapsedComponent = components?.collapsed ?? ChatCollapsed
  const HeaderComponent = components?.header ?? ChatHeader
  const MessageComponent = components?.message ?? Message
  const InputComponent = components?.input ?? ChatInput
  const MessagesContainerComponent =
    components?.messagesContainer ?? MessagesContainer
  const ExpandedComponent = components?.expanded ?? ChatExpanded

  const [isMinimized, setIsMinimized] = useState(false)

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev)
  }

  return (
    <div className="rt-chat">
      {isMinimized ? (
        <CollapsedComponent
          chatName={chatName}
          expandChat={() => toggleMinimize()}
        />
      ) : (
        <ExpandedComponent
          HeaderComponent={HeaderComponent}
          MessageComponent={MessageComponent}
          InputComponent={InputComponent}
          MessagesContainerComponent={MessagesContainerComponent}
          messages={messages}
          onSend={sendMessage}
          collapseChat={() => toggleMinimize()}
          chatName={chatName}
        />
      )}
    </div>
  )
}
