import { ChatMessage } from '../../models/ChatModel'

export type Component<P> =
  | React.ComponentType<P>
  | React.ForwardRefExoticComponent<P>
  | React.FC<P>
  | keyof React.ReactHTML

export interface ChatComponents {
  ChatMinimized?: Component<ChatMinimizedProps>
  ChatExpanded?: Component<ChatExpandedProps>
  ChatHeader?: Component<ChatHeaderProps>
  MessageList?: Component<MessageListProps>
  MessageRow?: Component<MessageRowProps>
  MessageAvatar?: Component<MessageAvatarProps>
  MessageBody?: Component<MessageBodyProps>
  ChatInput?: Component<ChatInputProps>
  ConnectPrompt?: Component<unknown>
  WelcomeMessage?: Component<unknown>
}

export interface ChatProps {
  rtKey: string
  chatName?: string | React.ReactElement
  components?: ChatComponents
  hideWhenDisconnected?: boolean
}

export interface ChatMinimizedProps {
  chatName: string | React.ReactElement
  expandChat: () => void
}

export interface ChatExpandedProps
  extends ChatHeaderProps,
    ChatInputProps,
    MessageListProps {
  ChatHeader: Component<ChatHeaderProps>
  MessageList: Component<MessageListProps>
  MessageRow: Component<MessageRowProps>
  MessageAvatar: Component<MessageAvatarProps>
  MessageBody: Component<MessageBodyProps>
  ChatInput: Component<ChatInputProps>
}

export interface ChatHeaderProps {
  chatName: string | React.ReactElement
  minimizeChat: () => void
}

export interface MessageRowProps extends MessageBodyProps, MessageAvatarProps {
  MessageAvatar: Component<MessageAvatarProps>
  MessageBody: Component<MessageBodyProps>
}

export interface MessageListProps {
  messages: ChatMessage[]
  MessageRow: Component<MessageRowProps>
  MessageAvatar: Component<MessageAvatarProps>
  MessageBody: Component<MessageBodyProps>
  ConnectPrompt: Component<unknown>
  WelcomeMessage: Component<unknown>
}

export interface MessageAvatarProps {
  senderId: string
  isMe: boolean
}

export interface MessageBodyProps {
  senderId: string
  message: string
  sentAt: number
  isMe: boolean
  formatTime?: (ts: number) => string
}

export interface ChatInputProps {
  sendMessage: (message: string) => void
}
