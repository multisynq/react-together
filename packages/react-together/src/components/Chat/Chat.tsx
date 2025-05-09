import { useState } from 'react'
import { useChat, useIsTogether } from '../../hooks'
import './Chat.css'
import _ChatExpanded from './ChatExpanded'
import _ChatHeader from './ChatHeader'
import _ChatInput from './ChatInput'
import _ChatMinimized from './ChatMinimized'
import _ConnectPrompt from './ConnectPrompt'
import _MessageAvatar from './MessageAvatar'
import _MessageBody from './MessageBody'
import _MessagesList from './MessageList'
import _MessageRow from './MessageRow'
import _WelcomeMessage from './WelcomeMessage'
import { ChatProps } from './types'

export default function Chat({
  rtKey,
  chatName = 'Group Chat',
  components,
  hideWhenDisconnected = false
}: ChatProps) {
  const { messages, sendMessage } = useChat(rtKey)
  const isTogether = useIsTogether()

  const ChatMinimized = components?.ChatMinimized ?? _ChatMinimized
  const ChatExpanded = components?.ChatExpanded ?? _ChatExpanded
  const ChatHeader = components?.ChatHeader ?? _ChatHeader
  const MessageList = components?.MessageList ?? _MessagesList
  const MessageRow = components?.MessageRow ?? _MessageRow
  const MessageAvatar = components?.MessageAvatar ?? _MessageAvatar
  const MessageBody = components?.MessageBody ?? _MessageBody
  const ChatInput = components?.ChatInput ?? _ChatInput
  const ConnectPrompt = components?.ConnectPrompt ?? _ConnectPrompt
  const WelcomeMessage = components?.WelcomeMessage ?? _WelcomeMessage

  const [isMinimized, setIsMinimized] = useState(false)

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev)
  }

  return (
    (!hideWhenDisconnected || isTogether) && (
      <div className="rt-chat">
        {isMinimized ? (
          <ChatMinimized
            chatName={chatName}
            expandChat={() => toggleMinimize()}
          />
        ) : (
          <ChatExpanded
            {...{
              messages,
              chatName,
              ChatHeader,
              MessageRow,
              MessageBody,
              ChatInput,
              MessageList,
              MessageAvatar,
              ConnectPrompt,
              WelcomeMessage
            }}
            sendMessage={sendMessage}
            minimizeChat={() => toggleMinimize()}
          />
        )}
      </div>
    )
  )
}
